# [System under test] [Property under test] Field Test, Pre-Registration

**Document:** E.D.A.I. Field Test [NNN], protocol v[X.Y]
**Author:** [name, and any AI collaborator named with its role]
**Date:** [YYYY-MM-DD]
**Status:** PRE-REGISTERED. As of this document, no request has been sent to [system]. No model output has been seen. Every rule below was fixed before the first call.

Status must be one of: pre-registered, consent requested, consent refused, run, results published, withdrawn. The index at /field-tests carries the current status. This file is frozen at registration and is not edited afterward; status changes go on the index only.

---

## 1. The claim under test

Quote the vendor's own sentence. State what this test checks and what it does not. Say what it is not (an intelligence benchmark, a security test, a leaderboard comparison).

## 2. Why this task

The task, the conditions, and why ground truth is an outside public record rather than model consensus. If a hypothesis of the author's is being tested, say so here and say it is the author's.

## 3. Data

Source, license, selection rule (reproducible from a script that is itself hashed), sampling seed, sizes, and any overlap between conditions. State what the model sees and what never leaves the labeled file.

## 4. Questions

Exact wordings, frozen. Model identifier requested and the version string recorded from the response.

## 5. Procedure

How requests are sent, how many runs per arm (one), retry rules, what counts as a failed call, and what is recorded.

## 6. Analysis, pre-registered

Every statistic, interval, and threshold, fixed before the first request. What would count as a finding and what would not.

## 7. Baseline

What the system is compared against and why. State any relationship between the baseline and the people who designed the test.

## 8. What could make this look bad for us

Listed before the data. Include conflicts of interest, small samples, contamination risk, label error, and anything about the vendor's terms that limits publication.

## 9. Publication commitment

Results are published whether they favor the system or not. State any consent the vendor's terms require. State that a refused test stays on the index with its reason. List what is released with results: labeled items, questions, responses in full, analysis code.

## 10. Frozen artifacts

SHA-256 of every file fixed before the first request. The hash of this document and the manifest goes to the public ledger before the first request. The consensus timestamp of that message is the pre-registration time.

---

Checklist before registering:
- [ ] Every number in Sections 5 and 6 is final.
- [ ] Section 8 was written before looking at any output.
- [ ] If the vendor's terms require consent to publish, the request is sent before the run and its status is on the index.
- [ ] Item files are hashed and listed in the manifest.
- [ ] The index entry exists with status "pre-registered".
