"""Shared loading and question-building for the Jev calibration field test harness.

Everything here is fixed by the frozen artifacts (items_public.jsonl, items_labeled.jsonl,
questions.json). The harness never edits them; analyze.py verifies their hashes first.
"""
import hashlib, json, os

FROZEN = {
    "items_public.jsonl":  "b97e66b1b30852ad0af58724c844c578335e4d4b6768335a8ab767df51ffffd6",
    "items_labeled.jsonl": "5a12c05c3a5f2fdacadefa619e2b20803fb2d2ecbf827daa76e2bc69e835ef66",
    "questions.json":      "8d26e61a58b87ef60c0acb1f48d1bc1e15911d308a27b782e52977143e65aff6",
}
REPEAT_IDS = [f"jev-{i:04d}" for i in range(200)]   # protocol §5.2
REPEAT_PASSES = ["repeat1", "repeat2", "repeat3"]


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        h.update(f.read())
    return h.hexdigest()


def verify_frozen(data_dir):
    bad = []
    for name, want in FROZEN.items():
        p = os.path.join(data_dir, name)
        got = sha256(p) if os.path.exists(p) else "MISSING"
        if got != want:
            bad.append((name, want, got))
    if bad:
        lines = "\n".join(f"  {n}: expected {w} got {g}" for n, w, g in bad)
        raise SystemExit(f"Frozen artifact check FAILED. Refusing to proceed.\n{lines}")


def load_jsonl(path):
    with open(path) as f:
        return [json.loads(line) for line in f if line.strip()]


def load_items(data_dir):
    """Returns items in id order with state, condition, term, and the party labels
    (which are already inside the public state text). Ground-truth labels are NOT
    attached here; analyze.py joins them separately."""
    pub = {it["id"]: it for it in load_jsonl(os.path.join(data_dir, "items_public.jsonl"))}
    lab = {it["id"]: it for it in load_jsonl(os.path.join(data_dir, "items_labeled.jsonl"))}
    items = []
    for iid in sorted(pub):
        p, l = pub[iid], lab[iid]
        items.append({
            "id": iid, "term": p["term"], "condition": p["condition"], "state": p["state"],
            "first_party_label": l["first_party_label"], "second_party_label": l["second_party_label"],
        })
    return items


def load_questions(data_dir):
    with open(os.path.join(data_dir, "questions.json")) as f:
        return json.load(f)


def build_questions(item, Q, which=("primary", "paraphrase", "choice")):
    """Build the TypeSafe `questions` dict for one item. EQUAL wordings are formatted with
    the item's party labels, exactly as questions.json specifies."""
    q = Q[item["condition"]]
    fmt = {"first_party_label": item["first_party_label"], "second_party_label": item["second_party_label"]}
    out = {}
    if "primary" in which:
        out["primary"] = {"type": "noul", "instructions": q["primary"].format(**fmt)}
    if "paraphrase" in which:
        out["paraphrase"] = {"type": "noul", "instructions": q["paraphrase"].format(**fmt)}
    if "choice" in which:
        out["choice"] = {"type": "choice", "instructions": q["choice"]["instructions"].format(**fmt),
                         "criteria": {k: v.format(**fmt) for k, v in q["choice"]["criteria"].items()}}
    return out


def positive_choice_key(condition):
    """Which choice key corresponds to the positive label (protocol §4)."""
    return "justice" if condition == "asym" else "first"


def existing_keys(out_path):
    """(id, pass) pairs already logged with a successful response, for resumption after
    a transport failure. A success is never re-requested (protocol §5.3)."""
    done = set()
    if os.path.exists(out_path):
        for r in load_jsonl(out_path):
            if r.get("ok"):
                done.add((r["id"], r["pass"]))
    return done
