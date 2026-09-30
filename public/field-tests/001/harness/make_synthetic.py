#!/usr/bin/env python3
"""Synthetic responses to test analyze.py end to end before any real run. Never used
for anything else. Writes files in the exact shape jev_run.py and baseline_run.py write.

  python3 make_synthetic.py --data ../ --profile calibrated --out syn_cal
  profiles: calibrated | overconfident | biased | noisy
"""
import argparse, json, os, random
import numpy as np
from common import load_items, load_jsonl, load_questions, build_questions, REPEAT_IDS, REPEAT_PASSES, positive_choice_key


def sigmoid(x): return 1 / (1 + np.exp(-x))


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--data", default=".."); ap.add_argument("--profile", default="calibrated"); ap.add_argument("--out", default="syn")
    a = ap.parse_args(); rng = np.random.default_rng(7)
    items = load_items(a.data); Q = load_questions(a.data)
    labels = {it["id"]: it["label"] for it in load_jsonl(os.path.join(a.data, "items_labeled.jsonl"))}
    os.makedirs(a.out, exist_ok=True)

    def true_prob(it):
        y = labels[it["id"]]
        sep = 1.6 if it["condition"] == "asym" else 0.25          # asym learnable, equal near chance
        if it["term"] == "2015": sep *= 1.3                        # a little "memorization"
        z = (2 * y - 1) * sep + rng.normal(0, 1.0)     # observed evidence
        return float(sigmoid(2 * sep * z))              # the true posterior P(y=1 | z): a calibrated report

    def report(pt, it):
        if a.profile == "calibrated": p = pt
        elif a.profile == "overconfident": p = float(sigmoid(3.0 * np.log(pt / (1 - pt))))
        elif a.profile == "biased": p = float(sigmoid(np.log(pt / (1 - pt)) + (0.9 if it["condition"] == "asym" else 0.0)))
        else: p = float(np.clip(pt + rng.normal(0, 0.15), 0.001, 0.999))
        return float(np.clip(p, 0.001, 0.999))

    def jev_resp(it, which, p):
        ans = {}
        if "primary" in which: ans["primary"] = {"type": "noul", "noul": round(p, 4)}
        if "paraphrase" in which: ans["paraphrase"] = {"type": "noul", "noul": round(float(np.clip(p + rng.normal(0, 0.03), 0, 1)), 4)}
        if "choice" in which:
            key = positive_choice_key(it["condition"]); other = "attorney" if key == "justice" else "second"
            pc = float(np.clip(p + rng.normal(0, 0.02), 0, 1)); probs = {key: round(pc, 4), other: round(1 - pc, 4)}
            ans["choice"] = {"type": "choice", "choice": key if pc >= 0.5 else other, "confidence": round(abs(2 * pc - 1), 4), "probabilities": probs}
        return {"model": "jev-synthetic", "answers": ans, "usage": {"input_tokens": 110 + len(it["state"]) // 4, "output_tokens": 12}}

    with open(os.path.join(a.out, "responses_jev.jsonl"), "w") as f:
        for it in items:
            pt = true_prob(it); p = report(pt, it)
            body = {"state": it["state"], "model": "jev-latest", "questions": build_questions(it, Q)}
            f.write(json.dumps({"id": it["id"], "term": it["term"], "condition": it["condition"], "pass": "main", "sent_at": "synthetic", "latency_ms": float(rng.gamma(9, 30)), "http_status": 200, "attempts": 1, "ok": True, "request": body, "response": jev_resp(it, ("primary", "paraphrase", "choice"), p)}) + "\n")
            if it["id"] in set(REPEAT_IDS):
                for rp in REPEAT_PASSES:
                    pr = float(np.clip(p + rng.normal(0, 0.01 if a.profile != "noisy" else 0.12), 0, 1))
                    f.write(json.dumps({"id": it["id"], "term": it["term"], "condition": it["condition"], "pass": rp, "sent_at": "synthetic", "latency_ms": 250.0, "http_status": 200, "attempts": 1, "ok": True, "request": {}, "response": jev_resp(it, ("primary",), pr)}) + "\n")

    with open(os.path.join(a.out, "responses_baseline.jsonl"), "w") as f:
        for it in items:
            pt = true_prob(it); p = float(sigmoid(2.2 * np.log(pt / (1 - pt))))      # an overconfident baseline
            for qn in ("primary", "paraphrase"):
                pv = round(float(np.clip(p + rng.normal(0, 0.08), 0, 1)), 2)
                f.write(json.dumps({"id": it["id"], "term": it["term"], "condition": it["condition"], "pass": "main", "question": qn, "sent_at": "synthetic", "latency_ms": float(rng.gamma(4, 300)), "http_status": 200, "attempts": 1, "ok": True, "request": {}, "response": {"text": f"{pv}", "p": pv, "model": "claude-synthetic", "usage": {}}}) + "\n")
            if it["id"] in set(REPEAT_IDS):
                for rp in REPEAT_PASSES:
                    pv = round(float(np.clip(p + rng.normal(0, 0.08), 0, 1)), 2)
                    f.write(json.dumps({"id": it["id"], "term": it["term"], "condition": it["condition"], "pass": rp, "question": "primary", "sent_at": "synthetic", "latency_ms": 900.0, "http_status": 200, "attempts": 1, "ok": True, "request": {}, "response": {"text": f"{pv}", "p": pv, "model": "claude-synthetic", "usage": {}}}) + "\n")
    print("wrote synthetic", a.profile, "to", a.out)


if __name__ == "__main__":
    main()
