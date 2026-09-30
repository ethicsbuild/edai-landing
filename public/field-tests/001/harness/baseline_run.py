#!/usr/bin/env python3
"""Claude baseline for E.D.A.I. Field Test 001 (protocol §7). Same items, same primary and
paraphrase propositions, the model asked for a probability between 0 and 1 and nothing
else. Repeats on the same 200 items. Raw responses logged verbatim.

Usage:
  ANTHROPIC_API_KEY=... python3 baseline_run.py --data ../ --out responses_baseline.jsonl
  python3 baseline_run.py --data ../ --dry-run
"""
import argparse, json, os, re, socket, sys, time
from datetime import datetime, timezone
import requests
from common import (verify_frozen, load_items, load_questions, build_questions,
                    REPEAT_IDS, REPEAT_PASSES, existing_keys)

API = os.environ.get("ANTHROPIC_API_URL", "https://api.anthropic.com/v1/messages")
MODEL = os.environ.get("BASELINE_MODEL", "claude-haiku-4-5-20251001")
SYSTEM = ("You will be shown a piece of text and a proposition about it. Reply with a single "
          "decimal number between 0 and 1: the probability that the proposition is true. "
          "No words, no explanation, only the number.")
NUM = re.compile(r"(?<![\d.])(1(?:\.0+)?|0(?:\.\d+)?|\.\d+)(?![\d.])")


def now():
    return datetime.now(timezone.utc).isoformat()


def ask(session, key, state, proposition, timeout=60):
    body = {"model": MODEL, "max_tokens": 8, "system": SYSTEM,
            "messages": [{"role": "user", "content": f"Text:\n{state}\n\nProposition: {proposition}\n\nProbability the proposition is true (0 to 1):"}]}
    delays = [2, 4, 8]
    for attempt in range(1, 5):
        t0 = time.perf_counter()
        try:
            r = session.post(API, json=body, timeout=timeout,
                             headers={"x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json"})
            ms = round((time.perf_counter() - t0) * 1000, 1)
            if r.status_code == 200:
                j = r.json()
                text = "".join(b.get("text", "") for b in j.get("content", []) if b.get("type") == "text").strip()
                m = NUM.search(text)
                p = float(m.group(1)) if m else None
                return True, 200, {"text": text, "p": p, "model": j.get("model"), "usage": j.get("usage")}, ms, attempt, body
            if not (r.status_code == 429 or r.status_code >= 500) or attempt == 4:
                return False, r.status_code, r.text[:2000], ms, attempt, body
        except (requests.Timeout, requests.ConnectionError) as e:
            ms = round((time.perf_counter() - t0) * 1000, 1)
            if attempt == 4:
                return False, 0, f"{type(e).__name__}: {e}"[:2000], ms, attempt, body
        time.sleep(delays[attempt - 1])
    return False, 0, "unreachable", 0, 4, body


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default="..")
    ap.add_argument("--out", default="responses_baseline.jsonl")
    ap.add_argument("--pause", type=float, default=0.1)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    verify_frozen(a.data)
    items = load_items(a.data)
    Q = load_questions(a.data)
    if a.limit:
        items = items[:a.limit]

    # plan: (item, pass, question_name) ; pass "main" carries primary and paraphrase as two calls
    plan = []
    rep_ids = set(REPEAT_IDS)
    for it in items:
        plan.append((it, "main", "primary"))
        plan.append((it, "main", "paraphrase"))
        if it["id"] in rep_ids:
            for p in REPEAT_PASSES:
                plan.append((it, p, "primary"))

    if a.dry_run:
        it, p, qn = plan[0]
        prop = build_questions(it, Q, (qn,))[qn]["instructions"]
        print(json.dumps({"model": MODEL, "system": SYSTEM, "state": it["state"], "proposition": prop}, indent=1, ensure_ascii=False))
        print(f"\nplanned calls: {len(plan)}\ndry run: nothing sent")
        return

    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        sys.exit("set ANTHROPIC_API_KEY")
    done = set()
    if os.path.exists(a.out):
        for line in open(a.out):
            r = json.loads(line)
            if r.get("ok"):
                done.add((r["id"], r["pass"], r["question"]))
    todo = [x for x in plan if (x[0]["id"], x[1], x[2]) not in done]
    print(f"origin host: {socket.gethostname()}  model: {MODEL}\nplanned {len(plan)}, done {len(done)}, to send {len(todo)}")

    session = requests.Session(); n_ok = n_fail = n_unparsed = 0
    with open(a.out, "a") as out:
        for i, (it, p, qn) in enumerate(todo, 1):
            prop = build_questions(it, Q, (qn,))[qn]["instructions"]
            sent_at = now()
            ok, status, resp, ms, attempts, body = ask(session, key, it["state"], prop)
            rec = {"id": it["id"], "term": it["term"], "condition": it["condition"], "pass": p, "question": qn,
                   "sent_at": sent_at, "latency_ms": ms, "http_status": status, "attempts": attempts,
                   "ok": ok, "request": body, "response": resp}
            out.write(json.dumps(rec, ensure_ascii=False) + "\n"); out.flush()
            if ok:
                n_ok += 1
                if resp.get("p") is None:
                    n_unparsed += 1
            else:
                n_fail += 1
                print(f"  FAIL {it['id']} {p} {qn}: http {status}: {str(resp)[:160]}")
            if i % 200 == 0 or i == len(todo):
                print(f"{i}/{len(todo)}  ok={n_ok} fail={n_fail} unparsed={n_unparsed}")
            time.sleep(a.pause)
    print("done. output:", a.out)


if __name__ == "__main__":
    main()
