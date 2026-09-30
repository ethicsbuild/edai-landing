#!/usr/bin/env python3
"""Jev run for E.D.A.I. Field Test 001. One request per item carrying the three questions,
then three extra primary-only requests for the 200 repeat items (protocol §5).

Usage:
  TYPESAFE_API_KEY=... python3 jev_run.py --data ../ --out responses_jev.jsonl
  python3 jev_run.py --data ../ --dry-run          # builds the first request, sends nothing
  python3 jev_run.py --data ../ --limit 5 --out smoke.jsonl   # smoke test on 5 items

Every raw response is written verbatim before anything is analyzed. Transport failures
(HTTP 5xx, 429, timeouts) are retried up to 3 times with backoff; a successful response is
never re-requested. Other 4xx are logged once and skipped.
"""
import argparse, json, os, socket, sys, time
from datetime import datetime, timezone
import requests
from common import (verify_frozen, load_items, load_questions, build_questions,
                    REPEAT_IDS, REPEAT_PASSES, existing_keys)

ENDPOINT = os.environ.get("TYPESAFE_ENDPOINT", "https://api.typesafe.ai/v1/systemone")
MODEL = "jev-latest"


def now():
    return datetime.now(timezone.utc).isoformat()


def send(session, key, body, timeout=60):
    """Returns (ok, http_status, response_json_or_text, latency_ms, attempts)."""
    delays = [2, 4, 8]
    for attempt in range(1, 5):
        t0 = time.perf_counter()
        try:
            r = session.post(ENDPOINT, json=body, timeout=timeout,
                             headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
            ms = round((time.perf_counter() - t0) * 1000, 1)
            if r.status_code == 200:
                return True, 200, r.json(), ms, attempt
            retryable = r.status_code == 429 or r.status_code >= 500
            if not retryable or attempt == 4:
                return False, r.status_code, r.text[:2000], ms, attempt
        except (requests.Timeout, requests.ConnectionError) as e:
            ms = round((time.perf_counter() - t0) * 1000, 1)
            if attempt == 4:
                return False, 0, f"{type(e).__name__}: {e}"[:2000], ms, attempt
        time.sleep(delays[attempt - 1])
    return False, 0, "unreachable", 0, 4


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default="..", help="folder holding the frozen artifacts")
    ap.add_argument("--out", default="responses_jev.jsonl")
    ap.add_argument("--pause", type=float, default=0.2, help="seconds between requests")
    ap.add_argument("--limit", type=int, default=0, help="only the first N items (smoke test)")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    verify_frozen(a.data)
    items = load_items(a.data)
    Q = load_questions(a.data)
    if a.limit:
        items = items[:a.limit]

    plan = [(it, "main", ("primary", "paraphrase", "choice")) for it in items]
    rep_ids = set(REPEAT_IDS)
    for it in items:
        if it["id"] in rep_ids:
            for p in REPEAT_PASSES:
                plan.append((it, p, ("primary",)))

    if a.dry_run:
        it, p, which = plan[0]
        body = {"state": it["state"], "model": MODEL, "questions": build_questions(it, Q, which)}
        print(json.dumps(body, indent=1, ensure_ascii=False))
        print(f"\nplanned requests: {len(plan)}  (items {len(items)}, repeats {len(plan) - len(items)})")
        print("dry run: nothing sent")
        return

    key = os.environ.get("TYPESAFE_API_KEY")
    if not key:
        sys.exit("set TYPESAFE_API_KEY")

    done = existing_keys(a.out)
    todo = [(it, p, w) for it, p, w in plan if (it["id"], p) not in done]
    print(f"origin host: {socket.gethostname()}  endpoint: {ENDPOINT}  model: {MODEL}")
    print(f"planned {len(plan)}, already done {len(done)}, to send {len(todo)}")

    session = requests.Session()
    n_ok = n_fail = 0; tokens_in = tokens_out = 0; versions = set()
    with open(a.out, "a") as out:
        for i, (it, p, which) in enumerate(todo, 1):
            body = {"state": it["state"], "model": MODEL, "questions": build_questions(it, Q, which)}
            sent_at = now()
            ok, status, resp, ms, attempts = send(session, key, body)
            rec = {"id": it["id"], "term": it["term"], "condition": it["condition"], "pass": p,
                   "sent_at": sent_at, "latency_ms": ms, "http_status": status, "attempts": attempts,
                   "ok": ok, "request": body, "response": resp}
            out.write(json.dumps(rec, ensure_ascii=False) + "\n"); out.flush()
            if ok:
                n_ok += 1
                u = resp.get("usage", {}); tokens_in += u.get("input_tokens", 0); tokens_out += u.get("output_tokens", 0)
                versions.add(resp.get("model"))
            else:
                n_fail += 1
                print(f"  FAIL {it['id']} {p}: http {status} after {attempts} attempts: {str(resp)[:160]}")
            if i % 100 == 0 or i == len(todo):
                print(f"{i}/{len(todo)}  ok={n_ok} fail={n_fail}  tokens in={tokens_in} out={tokens_out}  models={sorted(v for v in versions if v)}")
            time.sleep(a.pause)
    print("done. output:", a.out)


if __name__ == "__main__":
    main()
