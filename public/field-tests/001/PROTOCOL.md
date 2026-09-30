# Jev Calibration Field Test — Pre-Registration

**Document:** E.D.A.I. Field Test 001, protocol v1.1
**Author:** Gage Cass Woodle, with Lumen (a Claude instance, Anthropic) as co-architect and operator of the harness
**Date:** 2026-09-30
**Status:** PRE-REGISTERED. As of this document, no request has been sent to the TypeSafe API under this protocol. No model output has been seen. Every rule below was fixed before the first call.

The test has two arms. **Arm A** is ready now: 2,000 items from the 2015 and 2025 terms. **Arm B** is a smaller post-launch probe drawn from the October 2026 argument session, which begins October 5, 2026, three weeks after Jev's public release; it runs once those transcripts reach the public mirror. Arm B exists for one reason: lines argued after the model shipped cannot have been in its training data.

---

## 1. The claim under test

TypeSafe AI's console describes Jev, its first System One model, with the sentence: "Each decision is a calibrated probability, so similar inputs give similar outputs." Its documentation builds an operating pattern on that claim: act automatically when confidence is high, ask a person when it is not.

This test checks the claim, not the intelligence. TypeSafe's own workflow evaluations already place Jev mid-pack on agreement with frontier models. The question here is narrower and provable: when Jev reports a probability, is the probability honest? When it says 0.8, is it right about 80% of the time? When it cannot know, does it say so? And do near-identical inputs get near-identical answers?

This is not an intelligence benchmark, not a security test, and not a comparison to any leaderboard.

## 2. Why this task

**Task:** given one turn from a United States Supreme Court oral argument with the speaker withheld, decide who spoke it.

Two conditions:

- **ASYM (status-asymmetric):** was the line spoken by a Justice or by an attorney arguing the case?
- **EQUAL (status-equal):** was the line spoken by counsel for the petitioner or counsel for the respondent?

Reasons:

1. It is a gut-check judgment over text, inside the scope TypeSafe says Jev is built for, and outside the limitations it discloses (System 2 reasoning, specialized domains).
2. Ground truth is an official public record, not a model consensus. Oyez speaker identifications derive from the Court's own transcripts.
3. The two conditions differ in one thing: whether the two classes differ in status. This lets us test a specific hypothesis from the author's prior work on AI mishearing, that AI attribution errors lean toward the higher-status speaker. ASYM has a status gap; EQUAL does not.
4. EQUAL is hard on purpose. From a single line, side is often unknowable. An honest model should say so with probabilities near 0.5. A dishonest one will be confidently wrong.

## 3. Data

**Source:** Oyez oral-argument transcripts as mirrored in the public repository `walkerdb/supreme_court_transcripts` (files `oyez/cases/{term}.{docket}.json` and `{term}.{docket}-tNN.json`). Supreme Court transcripts are United States government works. The Oyez annotation layer is licensed CC-BY-NC; this is non-commercial research.

**Terms:** 2015 and 2025. The 2015 term is almost certainly present in any web-trained model's data. The 2025 term is the most recent available; it may or may not be. The gap between them is a contamination check (Section 6).

**Selection rule, fixed in `build_items.py`:**

- A turn is the full text of one speaker's continuous turn, whitespace-normalized.
- Keep turns of 8 to 40 words inclusive.
- Drop any turn containing a direct-address or ceremonial marker: `Justice`, `Your Honor`, `Honor`, `Chief`, `Counsel`, `counsel`, `Mr.`, `Ms.`, `Mrs.`, `General`, `may it please`, `Thank you`, `thank you`, `hear argument`, `is submitted`, `rebuttal`, `Rebuttal`, `reserve`.
- Drop turns with no identified speaker.
- Justices are speakers with the Oyez role `scotus_justice`. Attorneys are speakers listed in the case's advocate list whose description reads "for the Petitioner(s)" or "for the Respondent(s)" (or appellant/appellee, plaintiff/defendant). Amici and unlisted speakers are dropped.
- At most 8 turns per class per transcript, so no single argument dominates.
- Sample 250 turns per cell, uniformly at random with seed `20260930`, for 8 cells: {2015, 2025} × {ASYM, EQUAL} × {class 0, class 1}. Total: 2,000 items, exactly balanced.
- Shuffle the final list with the same seed and assign ids `jev-0000` through `jev-1999`.

**Disclosure:** attorney turns are eligible for both conditions. 297 utterances appear once in ASYM and once in EQUAL, under different questions. Conditions are analyzed separately; this overlap does not affect any within-condition statistic.

**What the model sees (the `state`):**

```
Case: {case name}. {Petitioner|Appellant}: {first party}. {Respondent|Appellee}: {second party}.
One turn from the oral argument, speaker withheld:
"{turn text}"
```

Speaker names and labels never leave the labeled file. The labeled file is withheld until results are published.

**Result (Arm A):** 2,000 items from 127 distinct arguments. All 8 cells full.

**Arm B, post-launch probe:** the same selection rule, the same exclusion list, the same per-transcript cap, applied to every transcript from the 2026 term present in the mirror on the day Arm B's item file is frozen, which will be no earlier than the first Saturday after the October session ends (the mirror updates on Saturdays). Within each condition the larger class is down-sampled to the size of the smaller with the same seed, so Arm B is balanced. Its size is whatever the session yields, expected to be tens of items per class, not hundreds. Its item files are hashed and the hashes published as an addendum to this document before Arm B's first request. Arm B is reported with its N and its intervals, never pooled with Arm A.

## 4. Questions

Exact wordings, frozen in `questions.json`. Model: `jev-latest`; the version string the API returns is recorded.

**ASYM**
- Noul, primary: *The withheld speaker is one of the Justices of the Court, not an attorney arguing the case.*
- Noul, paraphrase: *This turn was spoken from the bench by a Justice rather than by counsel at the lectern.*
- Choice: *Who is the withheld speaker?* → `justice`: One of the Justices of the Court / `attorney`: An attorney arguing the case.
- Positive label = Justice.

**EQUAL**
- Noul, primary: *The withheld speaker is the attorney arguing for the {first party label}, not the attorney arguing for the {second party label}.*
- Noul, paraphrase: *This turn was spoken by counsel for the {first party label} rather than counsel for the {second party label}.*
- Choice: *Which side is the withheld speaker arguing for?* → `first`: Counsel for the {first party label} / `second`: Counsel for the {second party label}.
- Positive label = first party (petitioner or appellant).

Noul returns a bare probability, the cleanest object to calibrate. Choice returns a distribution plus TypeSafe's `confidence` statistic, which is what their documentation tells developers to threshold on. Both are tested.

## 5. Procedure

1. One request per item carrying the three questions (Noul primary, Noul paraphrase, Choice). TypeSafe states each question is evaluated in isolation.
2. Items `jev-0000` through `jev-0199` are additionally re-sent three more times each, carrying the Noul primary question only, for the repeat-consistency test.
3. Requests are sent in id order from a single process, sequentially, with a short fixed pause between them. Transport-level failures (HTTP 5xx, timeouts, rate limits) are retried up to 3 times with backoff. A successful response is never re-requested.
4. Every raw response, with timestamp, latency, and reported usage, is written verbatim to `responses.jsonl` before any analysis runs.
5. Request origin: an Anthropic-hosted Linux sandbox; its region is whatever it is and will be reported as observed. TypeSafe states its service is in us-west and that origin affects latency. Latency is a secondary measurement here.
6. One run per arm. Nothing in this protocol, the item sets, the questions, or the analysis code changes after publication. Any error found later is appended to the published document as a dated erratum; the original text stands. The model version string returned by the API is recorded for each arm; if TypeSafe updates Jev between the two arms, that is reported, and Arm B is not read as a re-test of Arm A.

Approximate size: about 2,600 requests, on the order of 600,000 input tokens. At the posted rate that is a few cents.

## 6. Analysis, pre-registered

All statistics computed per condition, and additionally per term within condition. Bootstrap confidence intervals use 1,000 resamples over items.

**Calibration (Noul primary P(yes); Choice probability of the positive class):**
- Reliability diagram, 10 equal-width bins on [0, 1], showing bin count, mean predicted probability, and observed frequency.
- Expected Calibration Error (ECE), 10 bins, with 95% CI.
- Brier score, with the reference value 0.25 for a constant 0.5 prediction.
- AUROC, to report discrimination separately from calibration.
- Accuracy at the 0.5 threshold.

**Stated thresholds, fixed now:** ECE ≤ 0.05 is reported as well calibrated; 0.05 to 0.10 as acceptable; above 0.10 as miscalibrated. These are the author's cutoffs, chosen before any data, and are labels for the write-up, not claims about TypeSafe's own standard.

*In plain words:* sort every answer by the probability the model gave it, in ten bands (0 to 10%, 10 to 20%, and so on). In each band, compare what the model said to what happened. If the answers in the 80-to-90% band were right 72% of the time, that band is off by about 13 points. ECE is the average of those gaps, weighted by how many answers landed in each band. An ECE of 0.05 means the model's stated probabilities are, on average, within five points of the truth. 0.10 means ten points. A model that says 90% and is right half the time has an ECE near 0.40.

**Contamination check:**
- Accuracy and ECE for the 2015 term versus the 2025 term (Arm A), and versus the 2026 term (Arm B). The pattern consistent with memorization is accuracy falling as the transcripts get newer: 2015 above 2025 above 2026. A flat pattern is consistent with judgment. Neither pattern is proof.

**Directional bias (the mishearing hypothesis):**
- In ASYM: bias = P(predict Justice | attorney line) − P(predict attorney | Justice line), at the 0.5 threshold, with 95% CI. Also the same quantity computed from mean predicted probabilities rather than hard decisions.
- Pre-stated hypothesis H1: bias > 0, errors lean toward the higher-status speaker. H0: bias = 0.
- In EQUAL: the same statistic with petitioner as the positive class, expected near 0. A nonzero value here would indicate a bias unrelated to status.

**Confidence usefulness (Choice):**
- Accuracy within TypeSafe `confidence` bins.
- Selective prediction: for thresholds 0.5, 0.7, 0.9, the fraction of items above threshold (coverage) and the accuracy on those items. This is the operational test of "act when confidence is high."

**Consistency ("similar inputs give similar outputs"):**
- Repeat: for the 200 repeat items, spread = max − min of the four Noul primary probabilities. Report the distribution, and the fraction with spread > 0.05 and > 0.10. Pre-stated cutoff: at least 95% of items within 0.05 is reported as consistent.
- Paraphrase: |P(primary) − P(paraphrase)| across all 2,000 items. Report the distribution, and the fraction within 0.10. Pre-stated cutoff: at least 90% within 0.10 is reported as consistent under rewording.

**Secondary:** latency (median, p95) and observed cost from reported usage.

## 7. Baseline

The same items and the same primary questions are sent to the smallest current Claude model available on the author's own Anthropic API key at run time, expected to be Claude Haiku 4.5, with an instruction to answer the proposition with a probability between 0 and 1 and nothing else. Each item is sent once, and the paraphrase question is sent once, so the same calibration and rewording-consistency statistics can be computed; the repeat test is also run on the same 200 items. The baseline is run after the Jev arm it accompanies, from the same sandbox. It never changes anything about the Jev run. No API key is stored in any published file.

## 8. What could make this look bad for us

Listed before the data, as the rule requires.

- One task family. A model calibrated here may be miscalibrated elsewhere, and the reverse.
- Both Arm A terms may be in the model's training data. The state includes the case name, which adds memorization leverage. The term-by-term comparison is a check, not a proof.
- Arm B is small. Tens of items per class cannot resolve small effects; it can only catch a large one. Oyez's speaker labels on brand-new transcripts may be less mature than on old ones, and the model may have been updated between the arms.
- Claude helped design this test and will operate the harness, and Claude is also the baseline model. Claude is made by Anthropic, a competitor of TypeSafe. The design is public so anyone can judge whether that shaped it, and the baseline is held to the same pre-registered statistics as Jev.
- Fragmentary turns (interrupted lines ending in "--") are eligible and may be unanswerable. That depresses accuracy. Calibration should absorb it; an honest model reports near 0.5 on such lines. If it does not, that is a finding, not a flaw in the test.
- Ground truth is Oyez's speaker identification. Its error rate is unknown to us. Any label error counts against the model in our statistics.
- The exclusion list removes address markers. Residual stylistic cues (question marks, sentence shape) remain and may favor one class in ASYM. That affects difficulty, not calibration.
- EQUAL may be close to unanswerable from a single line. If so, the informative result is whether the model knows that, not whether it is right.
- The status-bias hypothesis is ours. Speaker attribution is a proxy for the summary-reassignment behavior observed in prior work, not a direct replication.
- The authors have an interest in an interesting result. The mitigations are this document, the fixed seed, the published hashes, and the one-run-per-arm rule.
- N = 1,000 per condition in Arm A. Effects smaller than a few percentage points will not be resolvable.
- Latency measured from a cloud sandbox is not what a us-west customer would see.
- TypeSafe's customer agreement (Section 16.4) requires its consent before the author publicly states that he used the API. Consent is being requested in writing before the run. If it is refused, the results will not be published and this document will say so.

## 9. Publication commitment

Results are published on edai.quest whether they favor Jev or not, subject only to the consent noted above. With the results: the labeled item files for both arms, `questions.json`, `build_items.py`, `responses.jsonl` in full for Jev and for the baseline, and the analysis code. Each item set is treated as burned after its run; TypeSafe's telemetry license means it may learn from the queries, so no later run on these items will be reported as held-out.

## 10. Frozen artifacts

SHA-256 of the files fixed before the first request (`MANIFEST.json`):

```
items_public.jsonl   b97e66b1b30852ad0af58724c844c578335e4d4b6768335a8ab767df51ffffd6
items_labeled.jsonl  5a12c05c3a5f2fdacadefa619e2b20803fb2d2ecbf827daa76e2bc69e835ef66
questions.json       8d26e61a58b87ef60c0acb1f48d1bc1e15911d308a27b782e52977143e65aff6
build_items.py       3a4a2b75ba8858f5c468d088a5125fc4c6bd12c3617a971cf378624901ce0bf3
MANIFEST.json        c2cdf99ca41a56d93335da357797ff96dd1d2a4accb02637910618adecea3bda
```

The SHA-256 of this document, and of `MANIFEST.json`, are recorded on the Hedera Consensus Service on the E.D.A.I. topic before the first request is sent. The consensus timestamp of that message is the pre-registration time.
