# Field Test 001 harness

Code that runs and scores the pre-registered test. Frozen before the first request; hashes in `HARNESS.sha256`. The protocol (`../PROTOCOL.md`, sha256 3121c204…) governs; where this code and the protocol disagree, the protocol wins and the disagreement is an erratum.

## Files

- `common.py` — loads the frozen artifacts, verifies their hashes, builds the exact questions from `questions.json`. Refuses to run if any frozen file has changed.
- `jev_run.py` — the Jev run. One request per item with the three questions, then three primary-only repeats for items jev-0000 to jev-0199. 2,600 requests. Raw responses logged verbatim to `responses_jev.jsonl` before any analysis. Transport failures retried up to three times; a successful response is never re-requested. Resumable after an interruption without re-asking anything that succeeded.
- `baseline_run.py` — the Claude baseline (protocol §7): same items, same propositions, the model asked for a probability and nothing else. 4,600 calls.
- `analyze.py` — every statistic in protocol §6, computed once, with the pre-registered cutoffs applied as labels. Writes `results.json`, `SUMMARY.md`, and three figures.
- `make_synthetic.py` — fake responses in the exact file shape, used only to prove `analyze.py` behaves before real data existed. Four profiles: calibrated, overconfident, biased, noisy. The analyzer labeled each correctly.

## Run order (run day)

```
python3 jev_run.py --data .. --dry-run                 # prints the first request, sends nothing
TYPESAFE_API_KEY=... python3 jev_run.py --data .. --out responses_jev.jsonl
ANTHROPIC_API_KEY=... python3 baseline_run.py --data .. --out responses_baseline.jsonl
python3 analyze.py --data .. --jev responses_jev.jsonl --baseline responses_baseline.jsonl --out results
```

Keys come from the environment only. Nothing in this folder stores or prints them.

## Dependencies

Python 3.10+, `requests`, `numpy`, `matplotlib`.
