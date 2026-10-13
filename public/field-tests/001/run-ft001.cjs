// E.D.A.I. Field Test 001, Arm A harness (protocol v1.1, edai.quest/field-tests/001-jev-calibration)
//
//   node run-ft001.cjs verify            check frozen-file hashes and build every request; sends nothing
//   node run-ft001.cjs check             one connectivity request per service, on a dummy text that is NOT a test item
//   node run-ft001.cjs jev               the Jev run (resumes if interrupted; never re-sends a successful request)
//   node run-ft001.cjs baseline          the Claude baseline, run after Jev, same items
//   node run-ft001.cjs seal              SHA-256 of the response files, for anchoring
//
// Keys are read from .env in this folder (TYPESAFE_API_KEY, ANTHROPIC_API_KEY) and never printed.
// This script never opens items_labeled.jsonl. The run is blind to the answer key.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DIR = __dirname;
const ITEMS = path.join(DIR, "items_public.jsonl");
const QUESTIONS = path.join(DIR, "questions.json");
const FROZEN = {
  "items_public.jsonl": "b97e66b1b30852ad0af58724c844c578335e4d4b6768335a8ab767df51ffffd6",
  "questions.json": "8d26e61a58b87ef60c0acb1f48d1bc1e15911d308a27b782e52977143e65aff6",
};
const JEV_OUT = path.join(DIR, "responses_jev.jsonl");
const BASE_OUT = path.join(DIR, "responses_baseline.jsonl");
const JEV_URL = "https://api.typesafe.ai/v1/systemone";
const JEV_MODEL = "jev-latest";
const BASE_MODEL = "claude-haiku-4-5-20251001";
const PAUSE_MS = 250;            // fixed pause between requests
const MAX_RETRIES = 3;           // transport failures only
const TIMEOUT_MS = 60000;
const REPEAT_IDS = 200;          // jev-0000 .. jev-0199
const REPEAT_ROUNDS = 3;

const sha256File = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv() {
  const f = path.join(DIR, ".env");
  if (!fs.existsSync(f)) throw new Error("No .env in this folder");
  process.loadEnvFile(f);
}

function verifyFrozen() {
  for (const [name, want] of Object.entries(FROZEN)) {
    const got = sha256File(path.join(DIR, name));
    if (got !== want) throw new Error(`${name} does not match the frozen hash. Stop.`);
  }
}

function loadItems() {
  return fs.readFileSync(ITEMS, "utf8").trim().split("\n").map((l) => JSON.parse(l));
}

// Party labels come from the public state line, never from the labeled file.
function partyLabels(item) {
  const head = item.state.split("\n")[0];
  if (head.includes(". Appellant: ") && head.includes(". Appellee: ")) return ["Appellant", "Appellee"];
  if (head.includes(". Petitioner: ") && head.includes(". Respondent: ")) return ["Petitioner", "Respondent"];
  throw new Error(`Cannot read party labels for ${item.id}`);
}

function fill(s, first, second) {
  return s.replaceAll("{first_party_label}", first).replaceAll("{second_party_label}", second);
}

function itemQuestions(item, Q) {
  const q = Q[item.condition];
  const [first, second] = item.condition === "equal" ? partyLabels(item) : ["", ""];
  const f = (s) => fill(s, first, second);
  const criteria = Object.fromEntries(Object.entries(q.choice.criteria).map(([k, v]) => [k, f(v)]));
  return {
    primary: { type: "noul", instructions: f(q.primary) },
    paraphrase: { type: "noul", instructions: f(q.paraphrase) },
    choice: { type: "choice", instructions: f(q.choice.instructions), criteria },
  };
}

// The full request plan, in protocol order: 2,000 main requests in id order, then 3 repeat rounds over jev-0000..0199.
function plan(items, Q) {
  const out = [];
  for (const it of items) out.push({ key: `${it.id}:main`, item: it, questions: itemQuestions(it, Q) });
  for (let r = 1; r <= REPEAT_ROUNDS; r++)
    for (const it of items.slice(0, REPEAT_IDS))
      out.push({ key: `${it.id}:repeat${r}`, item: it, questions: { primary: itemQuestions(it, Q).primary } });
  return out;
}

function doneKeys(file) {
  if (!fs.existsSync(file)) return new Set();
  const s = new Set();
  for (const l of fs.readFileSync(file, "utf8").split("\n")) {
    if (!l.trim()) continue;
    const r = JSON.parse(l);
    if (r.ok) s.add(r.key);
  }
  return s;
}

async function timedFetch(url, opts) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const t0 = Date.now();
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    const text = await res.text();
    return { status: res.status, text, latency_ms: Date.now() - t0 };
  } finally {
    clearTimeout(t);
  }
}

// Sends one request with transport-level retries. Every attempt is logged.
async function send(file, key, doRequest) {
  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const sent_at = new Date().toISOString();
    let r, err = null;
    try { r = await doRequest(); } catch (e) { err = e.name === "AbortError" ? "timeout" : String(e.message || e); }
    const transient = err || r.status >= 500 || r.status === 429;
    const ok = !err && r.status >= 200 && r.status < 300;
    fs.appendFileSync(file, JSON.stringify({
      key, attempt, sent_at, ok, status: r ? r.status : null, latency_ms: r ? r.latency_ms : null,
      error: err, body: r ? r.text : null,
    }) + "\n");
    if (ok) return true;
    if (!transient) throw new Error(`${key}: HTTP ${r.status}, not retryable. Stopped. See the log.`);
    if (attempt <= MAX_RETRIES) await sleep(2000 * 2 ** (attempt - 1));
  }
  throw new Error(`${key}: failed after ${MAX_RETRIES} retries. Stopped. Rerun to resume.`);
}

function jevRequest(state, questions) {
  return () => timedFetch(JEV_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.TYPESAFE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ state, model: JEV_MODEL, questions }),
  });
}

const BASE_SYSTEM =
  "You will be given a passage and a proposition about it. Reply with the probability, between 0 and 1, " +
  "that the proposition is true. Reply with the number only and nothing else.";

function baseRequest(state, proposition) {
  return () => timedFetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json",
    },
    body: JSON.stringify({
      model: BASE_MODEL, max_tokens: 16, system: BASE_SYSTEM,
      messages: [{ role: "user", content: `Passage:\n${state}\n\nProposition: ${proposition}` }],
    }),
  });
}

async function runPlan(file, steps, label) {
  const done = doneKeys(file);
  const todo = steps.filter((s) => !done.has(s.key));
  console.log(`${label}: ${steps.length} requests planned, ${done.size} already done, ${todo.length} to send.`);
  let n = 0;
  for (const s of todo) {
    await send(file, s.key, s.request);
    if (++n % 100 === 0) console.log(`  ${n}/${todo.length}`);
    await sleep(PAUSE_MS);
  }
  console.log(`${label}: complete.`);
}

(async () => {
  const cmd = process.argv[2];
  verifyFrozen();
  const items = loadItems();
  const Q = JSON.parse(fs.readFileSync(QUESTIONS, "utf8"));
  if (items.length !== 2000) throw new Error("Expected 2,000 items");
  const P = plan(items, Q);

  if (cmd === "verify") {
    console.log("Frozen hashes: match.");
    console.log(`Jev plan: ${P.length} requests (2,000 main + ${REPEAT_IDS * REPEAT_ROUNDS} repeats).`);
    console.log("First request body:\n" + JSON.stringify({ state: P[0].item.state, model: JEV_MODEL, questions: P[0].questions }, null, 2));
    const asym = P.find((p) => p.item.condition === "asym" && p.key.endsWith(":main"));
    console.log("First ASYM questions:\n" + JSON.stringify(asym.questions, null, 2));
    console.log(`Baseline plan: ${2000 * 2 + REPEAT_IDS * REPEAT_ROUNDS} requests to ${BASE_MODEL}.`);
    return;
  }

  loadEnv();
  if (cmd === "check") {
    const dummy = "Case: Example v. Sample. Petitioner: Example. Respondent: Sample.\nOne turn from the oral argument, speaker withheld:\n\"This is a connectivity check, not a test item.\"";
    const r1 = await jevRequest(dummy, { primary: { type: "noul", instructions: Q.asym.primary } })();
    console.log("Jev:", r1.status, r1.text.slice(0, 400));
    if (process.env.ANTHROPIC_API_KEY) {
      const r2 = await baseRequest(dummy, Q.asym.primary)();
      console.log("Baseline:", r2.status, r2.text.slice(0, 400));
    }
    return;
  }
  if (cmd === "jev") {
    if (!process.env.TYPESAFE_API_KEY) throw new Error("TYPESAFE_API_KEY missing from .env");
    const steps = P.map((p) => ({ key: p.key, request: jevRequest(p.item.state, p.questions) }));
    return runPlan(JEV_OUT, steps, "Jev");
  }
  if (cmd === "baseline") {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY missing from .env");
    if (doneKeys(JEV_OUT).size < P.length) throw new Error("The protocol runs the baseline after Jev. Jev is not complete.");
    const steps = [];
    for (const p of P.filter((p) => p.key.endsWith(":main"))) {
      const q = itemQuestions(p.item, Q);
      steps.push({ key: `${p.item.id}:primary`, request: baseRequest(p.item.state, q.primary.instructions) });
      steps.push({ key: `${p.item.id}:paraphrase`, request: baseRequest(p.item.state, q.paraphrase.instructions) });
    }
    for (const p of P.filter((p) => !p.key.endsWith(":main")))
      steps.push({ key: p.key, request: baseRequest(p.item.state, p.questions.primary.instructions) });
    return runPlan(BASE_OUT, steps, "Baseline");
  }
  if (cmd === "seal") {
    for (const f of [JEV_OUT, BASE_OUT])
      if (fs.existsSync(f)) console.log(path.basename(f), sha256File(f), `${doneKeys(f).size} successful requests`);
    return;
  }
  console.log("Usage: node run-ft001.cjs verify | check | jev | baseline | seal");
})().catch((e) => { console.error("STOPPED:", e.message); process.exit(1); });
