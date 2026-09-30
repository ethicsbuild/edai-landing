// src/app/field-tests/001-jev-calibration/page.tsx
// Rendered from the frozen PROTOCOL.md (sha256 3121c204d9cfa8535ba322e91b15386b7180a3e04fcdfa7c6b3a103f17f4c185).
// The markdown file at /field-tests/001/PROTOCOL.md is the artifact of record; this page is a rendering of it.

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Field Test 001 — Jev Calibration, Pre-Registration | E.D.A.I.',
  description:
    'A pre-registered calibration test of TypeSafe AI\'s Jev model. Protocol, item-set hashes, and the Hedera record, published before the first request.',
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-amber-100/80 leading-relaxed">{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-amber-500 pt-6">{children}</h2>
);
const Pre = ({ children }: { children: React.ReactNode }) => (
  <pre className="text-left overflow-x-auto bg-amber-500/5 border border-amber-900/40 rounded-lg p-4 font-mono text-xs md:text-sm text-amber-200/90 whitespace-pre-wrap break-all">{children}</pre>
);

const HEDERA = {
  topic: '0.0.9376001',
  topicMemo: 'E.D.A.I. Verification Events',
  sequence: '1',
  consensus: '1790760619.615324582',
  consensusUtc: '2026-09-30 09:30:19 UTC',
  txId: '0.0.9083680@1790760611.884559779',
  hashscanTx: 'https://hashscan.io/mainnet/transaction/0.0.9083680@1790760611.884559779',
  hashscanTopic: 'https://hashscan.io/mainnet/topic/0.0.9376001',
  mirrorTx: 'https://mainnet.mirrornode.hedera.com/api/v1/transactions/0.0.9083680-1790760611-884559779',
};

const FILES = [
  ['PROTOCOL.md', '3121c204d9cfa8535ba322e91b15386b7180a3e04fcdfa7c6b3a103f17f4c185'],
  ['MANIFEST.json', 'c2cdf99ca41a56d93335da357797ff96dd1d2a4accb02637910618adecea3bda'],
  ['questions.json', '8d26e61a58b87ef60c0acb1f48d1bc1e15911d308a27b782e52977143e65aff6'],
  ['build_items.py', '3a4a2b75ba8858f5c468d088a5125fc4c6bd12c3617a971cf378624901ce0bf3'],
  ['FROZEN.sha256', ''],
  ['hedera_receipt.json', ''],
];

export default function FieldTest001Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-amber-900/30 bg-gradient-to-b from-black via-amber-950/10 to-black py-16 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <p className="text-amber-500 font-mono text-sm">FIELD TEST 001 · PRE-REGISTERED 2026-09-30</p>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500 tracking-tight">
            Jev Calibration Field Test
          </h1>
          <p className="text-xl text-amber-200/80 font-light">Gage Cass Woodle, with Lumen</p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded">
              <span className="text-amber-500 font-mono text-sm">STATUS: PRE-REGISTERED · NO REQUEST SENT</span>
            </div>
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded">
              <span className="text-amber-500 font-mono text-sm">RECORD: HEDERA MAINNET · TOPIC {HEDERA.topic} · SEQ {HEDERA.sequence}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 space-y-3">
            <p className="text-amber-500 font-mono text-sm">THE RECORD</p>
            <P>
              {"The SHA-256 of the protocol below and of its manifest were written to the E.D.A.I. Verification Events topic on Hedera mainnet before the first request to TypeSafe's API. This is the first message that topic has ever carried. Its consensus timestamp is the pre-registration time."}
            </P>
            <Pre>{`topic      ${HEDERA.topic}  (${HEDERA.topicMemo})
sequence   ${HEDERA.sequence}
consensus  ${HEDERA.consensus}  (${HEDERA.consensusUtc})
tx         ${HEDERA.txId}`}</Pre>
            <p className="text-sm text-amber-200/70 font-mono flex flex-wrap gap-x-6 gap-y-2">
              <a className="underline text-amber-400" href={HEDERA.hashscanTx} target="_blank" rel="noreferrer">transaction on HashScan</a>
              <a className="underline text-amber-400" href={HEDERA.hashscanTopic} target="_blank" rel="noreferrer">topic on HashScan</a>
              <a className="underline text-amber-400" href={HEDERA.mirrorTx} target="_blank" rel="noreferrer">mirror node record</a>
            </p>
          </div>

          <div className="bg-amber-500/5 border border-amber-900/40 rounded-lg p-6 space-y-3">
            <p className="text-amber-500 font-mono text-sm">FROZEN FILES</p>
            <P>{"Download and hash them yourself. The item files are sealed until results publish; their hashes are in the manifest."}</P>
            <ul className="font-mono text-xs md:text-sm text-amber-200/80 space-y-2 break-all">
              {FILES.map(([name, hash]) => (
                <li key={name}>
                  <a className="underline text-amber-400" href={`/field-tests/001/${name}`}>{name}</a>
                  {hash ? <span className="text-amber-200/50">{'  '}{hash}</span> : null}
                </li>
              ))}
            </ul>
          </div>

          <P><strong className="text-amber-200">{"Document:"}</strong>{" E.D.A.I. Field Test 001, protocol v1.1"}</P>
          <P><strong className="text-amber-200">{"Author:"}</strong>{" Gage Cass Woodle, with Lumen (a Claude instance, Anthropic) as co-architect and operator of the harness"}</P>
          <P><strong className="text-amber-200">{"Date:"}</strong>{" 2026-09-30"}</P>
          <P><strong className="text-amber-200">{"Status:"}</strong>{" PRE-REGISTERED. As of this document, no request has been sent to the TypeSafe API under this protocol. No model output has been seen. Every rule below was fixed before the first call."}</P>
          <P>{"The test has two arms. "}<strong className="text-amber-200">{"Arm A"}</strong>{" is ready now: 2,000 items from the 2015 and 2025 terms. "}<strong className="text-amber-200">{"Arm B"}</strong>{" is a smaller post-launch probe drawn from the October 2026 argument session, which begins October 5, 2026, three weeks after Jev's public release; it runs once those transcripts reach the public mirror. Arm B exists for one reason: lines argued after the model shipped cannot have been in its training data."}</P>
          <hr className="border-amber-900/40 my-6" />
          <H2>{"1. The claim under test"}</H2>
          <P>{"TypeSafe AI's console describes Jev, its first System One model, with the sentence: \"Each decision is a calibrated probability, so similar inputs give similar outputs.\" Its documentation builds an operating pattern on that claim: act automatically when confidence is high, ask a person when it is not."}</P>
          <P>{"This test checks the claim, not the intelligence. TypeSafe's own workflow evaluations already place Jev mid-pack on agreement with frontier models. The question here is narrower and provable: when Jev reports a probability, is the probability honest? When it says 0.8, is it right about 80% of the time? When it cannot know, does it say so? And do near-identical inputs get near-identical answers?"}</P>
          <P>{"This is not an intelligence benchmark, not a security test, and not a comparison to any leaderboard."}</P>
          <H2>{"2. Why this task"}</H2>
          <P><strong className="text-amber-200">{"Task:"}</strong>{" given one turn from a United States Supreme Court oral argument with the speaker withheld, decide who spoke it."}</P>
          <P>{"Two conditions:"}</P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li><strong className="text-amber-200">{"ASYM (status-asymmetric):"}</strong>{" was the line spoken by a Justice or by an attorney arguing the case?"}</li>
            <li><strong className="text-amber-200">{"EQUAL (status-equal):"}</strong>{" was the line spoken by counsel for the petitioner or counsel for the respondent?"}</li>
          </ul>
          <P>{"Reasons:"}</P>
          <ol className="list-decimal list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"It is a gut-check judgment over text, inside the scope TypeSafe says Jev is built for, and outside the limitations it discloses (System 2 reasoning, specialized domains)."}</li>
            <li>{"Ground truth is an official public record, not a model consensus. Oyez speaker identifications derive from the Court's own transcripts."}</li>
            <li>{"The two conditions differ in one thing: whether the two classes differ in status. This lets us test a specific hypothesis from the author's prior work on AI mishearing, that AI attribution errors lean toward the higher-status speaker. ASYM has a status gap; EQUAL does not."}</li>
            <li>{"EQUAL is hard on purpose. From a single line, side is often unknowable. An honest model should say so with probabilities near 0.5. A dishonest one will be confidently wrong."}</li>
          </ol>
          <H2>{"3. Data"}</H2>
          <P><strong className="text-amber-200">{"Source:"}</strong>{" Oyez oral-argument transcripts as mirrored in the public repository "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"walkerdb/supreme_court_transcripts"}</code>{" (files "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"oyez/cases/{term}.{docket}.json"}</code>{" and "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"{term}.{docket}-tNN.json"}</code>{"). Supreme Court transcripts are United States government works. The Oyez annotation layer is licensed CC-BY-NC; this is non-commercial research."}</P>
          <P><strong className="text-amber-200">{"Terms:"}</strong>{" 2015 and 2025. The 2015 term is almost certainly present in any web-trained model's data. The 2025 term is the most recent available; it may or may not be. The gap between them is a contamination check (Section 6)."}</P>
          <P><strong className="text-amber-200">{"Selection rule, fixed in `build_items.py`:"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"A turn is the full text of one speaker's continuous turn, whitespace-normalized."}</li>
            <li>{"Keep turns of 8 to 40 words inclusive."}</li>
            <li>{"Drop any turn containing a direct-address or ceremonial marker: "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Justice"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Your Honor"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Honor"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Chief"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Counsel"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"counsel"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Mr."}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Ms."}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Mrs."}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"General"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"may it please"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Thank you"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"thank you"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"hear argument"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"is submitted"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"rebuttal"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"Rebuttal"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"reserve"}</code>{"."}</li>
            <li>{"Drop turns with no identified speaker."}</li>
            <li>{"Justices are speakers with the Oyez role "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"scotus_justice"}</code>{". Attorneys are speakers listed in the case's advocate list whose description reads \"for the Petitioner(s)\" or \"for the Respondent(s)\" (or appellant/appellee, plaintiff/defendant). Amici and unlisted speakers are dropped."}</li>
            <li>{"At most 8 turns per class per transcript, so no single argument dominates."}</li>
            <li>{"Sample 250 turns per cell, uniformly at random with seed "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"20260930"}</code>{", for 8 cells: {2015, 2025} \u00d7 {ASYM, EQUAL} \u00d7 {class 0, class 1}. Total: 2,000 items, exactly balanced."}</li>
            <li>{"Shuffle the final list with the same seed and assign ids "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"jev-0000"}</code>{" through "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"jev-1999"}</code>{"."}</li>
          </ul>
          <P><strong className="text-amber-200">{"Disclosure:"}</strong>{" attorney turns are eligible for both conditions. 297 utterances appear once in ASYM and once in EQUAL, under different questions. Conditions are analyzed separately; this overlap does not affect any within-condition statistic."}</P>
          <P><strong className="text-amber-200">{"What the model sees (the `state`):"}</strong></P>
          <Pre>{"Case: {case name}. {Petitioner|Appellant}: {first party}. {Respondent|Appellee}: {second party}.\nOne turn from the oral argument, speaker withheld:\n\"{turn text}\""}</Pre>
          <P>{"Speaker names and labels never leave the labeled file. The labeled file is withheld until results are published."}</P>
          <P><strong className="text-amber-200">{"Result (Arm A):"}</strong>{" 2,000 items from 127 distinct arguments. All 8 cells full."}</P>
          <P><strong className="text-amber-200">{"Arm B, post-launch probe:"}</strong>{" the same selection rule, the same exclusion list, the same per-transcript cap, applied to every transcript from the 2026 term present in the mirror on the day Arm B's item file is frozen, which will be no earlier than the first Saturday after the October session ends (the mirror updates on Saturdays). Within each condition the larger class is down-sampled to the size of the smaller with the same seed, so Arm B is balanced. Its size is whatever the session yields, expected to be tens of items per class, not hundreds. Its item files are hashed and the hashes published as an addendum to this document before Arm B's first request. Arm B is reported with its N and its intervals, never pooled with Arm A."}</P>
          <H2>{"4. Questions"}</H2>
          <P>{"Exact wordings, frozen in "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"questions.json"}</code>{". Model: "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"jev-latest"}</code>{"; the version string the API returns is recorded."}</P>
          <P><strong className="text-amber-200">{"ASYM"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"Noul, primary: "}<em>{"The withheld speaker is one of the Justices of the Court, not an attorney arguing the case."}</em></li>
            <li>{"Noul, paraphrase: "}<em>{"This turn was spoken from the bench by a Justice rather than by counsel at the lectern."}</em></li>
            <li>{"Choice: "}<em>{"Who is the withheld speaker?"}</em>{" \u2192 "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"justice"}</code>{": One of the Justices of the Court / "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"attorney"}</code>{": An attorney arguing the case."}</li>
            <li>{"Positive label = Justice."}</li>
          </ul>
          <P><strong className="text-amber-200">{"EQUAL"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"Noul, primary: "}<em>{"The withheld speaker is the attorney arguing for the {first party label}, not the attorney arguing for the {second party label}."}</em></li>
            <li>{"Noul, paraphrase: "}<em>{"This turn was spoken by counsel for the {first party label} rather than counsel for the {second party label}."}</em></li>
            <li>{"Choice: "}<em>{"Which side is the withheld speaker arguing for?"}</em>{" \u2192 "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"first"}</code>{": Counsel for the {first party label} / "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"second"}</code>{": Counsel for the {second party label}."}</li>
            <li>{"Positive label = first party (petitioner or appellant)."}</li>
          </ul>
          <P>{"Noul returns a bare probability, the cleanest object to calibrate. Choice returns a distribution plus TypeSafe's "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"confidence"}</code>{" statistic, which is what their documentation tells developers to threshold on. Both are tested."}</P>
          <H2>{"5. Procedure"}</H2>
          <ol className="list-decimal list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"One request per item carrying the three questions (Noul primary, Noul paraphrase, Choice). TypeSafe states each question is evaluated in isolation."}</li>
            <li>{"Items "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"jev-0000"}</code>{" through "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"jev-0199"}</code>{" are additionally re-sent three more times each, carrying the Noul primary question only, for the repeat-consistency test."}</li>
            <li>{"Requests are sent in id order from a single process, sequentially, with a short fixed pause between them. Transport-level failures (HTTP 5xx, timeouts, rate limits) are retried up to 3 times with backoff. A successful response is never re-requested."}</li>
            <li>{"Every raw response, with timestamp, latency, and reported usage, is written verbatim to "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"responses.jsonl"}</code>{" before any analysis runs."}</li>
            <li>{"Request origin: an Anthropic-hosted Linux sandbox; its region is whatever it is and will be reported as observed. TypeSafe states its service is in us-west and that origin affects latency. Latency is a secondary measurement here."}</li>
            <li>{"One run per arm. Nothing in this protocol, the item sets, the questions, or the analysis code changes after publication. Any error found later is appended to the published document as a dated erratum; the original text stands. The model version string returned by the API is recorded for each arm; if TypeSafe updates Jev between the two arms, that is reported, and Arm B is not read as a re-test of Arm A."}</li>
          </ol>
          <P>{"Approximate size: about 2,600 requests, on the order of 600,000 input tokens. At the posted rate that is a few cents."}</P>
          <H2>{"6. Analysis, pre-registered"}</H2>
          <P>{"All statistics computed per condition, and additionally per term within condition. Bootstrap confidence intervals use 1,000 resamples over items."}</P>
          <P><strong className="text-amber-200">{"Calibration (Noul primary P(yes); Choice probability of the positive class):"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"Reliability diagram, 10 equal-width bins on [0, 1], showing bin count, mean predicted probability, and observed frequency."}</li>
            <li>{"Expected Calibration Error (ECE), 10 bins, with 95% CI."}</li>
            <li>{"Brier score, with the reference value 0.25 for a constant 0.5 prediction."}</li>
            <li>{"AUROC, to report discrimination separately from calibration."}</li>
            <li>{"Accuracy at the 0.5 threshold."}</li>
          </ul>
          <P><strong className="text-amber-200">{"Stated thresholds, fixed now:"}</strong>{" ECE \u2264 0.05 is reported as well calibrated; 0.05 to 0.10 as acceptable; above 0.10 as miscalibrated. These are the author's cutoffs, chosen before any data, and are labels for the write-up, not claims about TypeSafe's own standard."}</P>
          <P><em>{"In plain words:"}</em>{" sort every answer by the probability the model gave it, in ten bands (0 to 10%, 10 to 20%, and so on). In each band, compare what the model said to what happened. If the answers in the 80-to-90% band were right 72% of the time, that band is off by about 13 points. ECE is the average of those gaps, weighted by how many answers landed in each band. An ECE of 0.05 means the model's stated probabilities are, on average, within five points of the truth. 0.10 means ten points. A model that says 90% and is right half the time has an ECE near 0.40."}</P>
          <P><strong className="text-amber-200">{"Contamination check:"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"Accuracy and ECE for the 2015 term versus the 2025 term (Arm A), and versus the 2026 term (Arm B). The pattern consistent with memorization is accuracy falling as the transcripts get newer: 2015 above 2025 above 2026. A flat pattern is consistent with judgment. Neither pattern is proof."}</li>
          </ul>
          <P><strong className="text-amber-200">{"Directional bias (the mishearing hypothesis):"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"In ASYM: bias = P(predict Justice | attorney line) \u2212 P(predict attorney | Justice line), at the 0.5 threshold, with 95% CI. Also the same quantity computed from mean predicted probabilities rather than hard decisions."}</li>
            <li>{"Pre-stated hypothesis H1: bias > 0, errors lean toward the higher-status speaker. H0: bias = 0."}</li>
            <li>{"In EQUAL: the same statistic with petitioner as the positive class, expected near 0. A nonzero value here would indicate a bias unrelated to status."}</li>
          </ul>
          <P><strong className="text-amber-200">{"Confidence usefulness (Choice):"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"Accuracy within TypeSafe "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"confidence"}</code>{" bins."}</li>
            <li>{"Selective prediction: for thresholds 0.5, 0.7, 0.9, the fraction of items above threshold (coverage) and the accuracy on those items. This is the operational test of \"act when confidence is high.\""}</li>
          </ul>
          <P><strong className="text-amber-200">{"Consistency (\"similar inputs give similar outputs\"):"}</strong></P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"Repeat: for the 200 repeat items, spread = max \u2212 min of the four Noul primary probabilities. Report the distribution, and the fraction with spread > 0.05 and > 0.10. Pre-stated cutoff: at least 95% of items within 0.05 is reported as consistent."}</li>
            <li>{"Paraphrase: |P(primary) \u2212 P(paraphrase)| across all 2,000 items. Report the distribution, and the fraction within 0.10. Pre-stated cutoff: at least 90% within 0.10 is reported as consistent under rewording."}</li>
          </ul>
          <P><strong className="text-amber-200">{"Secondary:"}</strong>{" latency (median, p95) and observed cost from reported usage."}</P>
          <H2>{"7. Baseline"}</H2>
          <P>{"The same items and the same primary questions are sent to the smallest current Claude model available on the author's own Anthropic API key at run time, expected to be Claude Haiku 4.5, with an instruction to answer the proposition with a probability between 0 and 1 and nothing else. Each item is sent once, and the paraphrase question is sent once, so the same calibration and rewording-consistency statistics can be computed; the repeat test is also run on the same 200 items. The baseline is run after the Jev arm it accompanies, from the same sandbox. It never changes anything about the Jev run. No API key is stored in any published file."}</P>
          <H2>{"8. What could make this look bad for us"}</H2>
          <P>{"Listed before the data, as the rule requires."}</P>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>{"One task family. A model calibrated here may be miscalibrated elsewhere, and the reverse."}</li>
            <li>{"Both Arm A terms may be in the model's training data. The state includes the case name, which adds memorization leverage. The term-by-term comparison is a check, not a proof."}</li>
            <li>{"Arm B is small. Tens of items per class cannot resolve small effects; it can only catch a large one. Oyez's speaker labels on brand-new transcripts may be less mature than on old ones, and the model may have been updated between the arms."}</li>
            <li>{"Claude helped design this test and will operate the harness, and Claude is also the baseline model. Claude is made by Anthropic, a competitor of TypeSafe. The design is public so anyone can judge whether that shaped it, and the baseline is held to the same pre-registered statistics as Jev."}</li>
            <li>{"Fragmentary turns (interrupted lines ending in \"--\") are eligible and may be unanswerable. That depresses accuracy. Calibration should absorb it; an honest model reports near 0.5 on such lines. If it does not, that is a finding, not a flaw in the test."}</li>
            <li>{"Ground truth is Oyez's speaker identification. Its error rate is unknown to us. Any label error counts against the model in our statistics."}</li>
            <li>{"The exclusion list removes address markers. Residual stylistic cues (question marks, sentence shape) remain and may favor one class in ASYM. That affects difficulty, not calibration."}</li>
            <li>{"EQUAL may be close to unanswerable from a single line. If so, the informative result is whether the model knows that, not whether it is right."}</li>
            <li>{"The status-bias hypothesis is ours. Speaker attribution is a proxy for the summary-reassignment behavior observed in prior work, not a direct replication."}</li>
            <li>{"The authors have an interest in an interesting result. The mitigations are this document, the fixed seed, the published hashes, and the one-run-per-arm rule."}</li>
            <li>{"N = 1,000 per condition in Arm A. Effects smaller than a few percentage points will not be resolvable."}</li>
            <li>{"Latency measured from a cloud sandbox is not what a us-west customer would see."}</li>
            <li>{"TypeSafe's customer agreement (Section 16.4) requires its consent before the author publicly states that he used the API. Consent is being requested in writing before the run. If it is refused, the results will not be published and this document will say so."}</li>
          </ul>
          <H2>{"9. Publication commitment"}</H2>
          <P>{"Results are published on edai.quest whether they favor Jev or not, subject only to the consent noted above. With the results: the labeled item files for both arms, "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"questions.json"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"build_items.py"}</code>{", "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"responses.jsonl"}</code>{" in full for Jev and for the baseline, and the analysis code. Each item set is treated as burned after its run; TypeSafe's telemetry license means it may learn from the queries, so no later run on these items will be reported as held-out."}</P>
          <H2>{"10. Frozen artifacts"}</H2>
          <P>{"SHA-256 of the files fixed before the first request ("}<code className="font-mono text-amber-300/90 text-[0.95em]">{"MANIFEST.json"}</code>{"):"}</P>
          <Pre>{"items_public.jsonl   b97e66b1b30852ad0af58724c844c578335e4d4b6768335a8ab767df51ffffd6\nitems_labeled.jsonl  5a12c05c3a5f2fdacadefa619e2b20803fb2d2ecbf827daa76e2bc69e835ef66\nquestions.json       8d26e61a58b87ef60c0acb1f48d1bc1e15911d308a27b782e52977143e65aff6\nbuild_items.py       3a4a2b75ba8858f5c468d088a5125fc4c6bd12c3617a971cf378624901ce0bf3\nMANIFEST.json        c2cdf99ca41a56d93335da357797ff96dd1d2a4accb02637910618adecea3bda"}</Pre>
          <P>{"The SHA-256 of this document, and of "}<code className="font-mono text-amber-300/90 text-[0.95em]">{"MANIFEST.json"}</code>{", are recorded on the Hedera Consensus Service on the E.D.A.I. topic before the first request is sent. The consensus timestamp of that message is the pre-registration time."}</P>

          <div className="pt-10 flex flex-wrap gap-4">
            <Link href="/state-of-the-work" className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors">
              State of the Work
            </Link>
            <Link href="/protocol" className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors">
              The Protocol
            </Link>
            <Link href="/" className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
