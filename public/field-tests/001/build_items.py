#!/usr/bin/env python3
"""
Build the frozen item set for the Jev calibration test.

Source: Oyez oral-argument transcripts as mirrored by walkerdb/supreme_court_transcripts
(oyez/cases/{term}.{docket}.json and {term}.{docket}-t0N.json).

Rules below are fixed BEFORE any model output exists. Changing any of them after
the protocol is published invalidates the run.
"""
import json, glob, os, re, random, hashlib, sys
from collections import defaultdict

REPO = sys.argv[1] if len(sys.argv) > 1 else "scotus/oyez/cases"
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else "."
TERMS = ["2015", "2025"]          # one likely-in-training term, one post-launch term
SEED = 20260930                   # today's date; published in the protocol
MIN_WORDS, MAX_WORDS = 8, 40      # short enough to be ambiguous, long enough to carry signal
PER_CELL = 250                    # items per (term, condition, class) cell
MAX_PER_TRANSCRIPT_CLASS = 8      # spread across cases; no single argument dominates

# Direct-address markers and ceremonial phrases that give the speaker away.
# A turn containing ANY of these is excluded (case-sensitive where capitalized).
EXCLUDE_SUBSTRINGS = [
    "Justice", "Your Honor", "Honor", "Chief", "Counsel", "counsel",
    "Mr.", "Ms.", "Mrs.", "General", "may it please", "Thank you", "thank you",
    "hear argument", "is submitted", "rebuttal", "Rebuttal", "reserve",
]

SIDE_PATTERNS = {
    "petitioner": re.compile(r"\bfor the (Petitioner|Petitioners|Appellant|Appellants|Plaintiff|Plaintiffs)\b", re.I),
    "respondent": re.compile(r"\bfor the (Respondent|Respondents|Appellee|Appellees|Defendant|Defendants)\b", re.I),
}
AMICUS = re.compile(r"amic", re.I)


def load_term(term):
    cases = {}
    for path in sorted(glob.glob(os.path.join(REPO, f"{term}.*.json"))):
        base = os.path.basename(path)
        if re.search(r"-t\d+\.json$", base):
            continue
        with open(path) as f:
            c = json.load(f)
        docket = base[len(term) + 1:-5]
        cases[docket] = c
    return cases


def advocate_sides(case):
    """name -> 'petitioner' | 'respondent' | None (amicus or unknown)"""
    sides = {}
    for a in case.get("advocates") or []:
        adv = a.get("advocate") or {}
        name = adv.get("name")
        desc = a.get("advocate_description") or ""
        if not name:
            continue
        if AMICUS.search(desc):
            sides[name] = None
            continue
        side = None
        for k, pat in SIDE_PATTERNS.items():
            if pat.search(desc):
                side = k
        sides[name] = side
    return sides


def turns_from_transcript(path):
    with open(path) as f:
        t = json.load(f)
    tr = t.get("transcript") or {}
    for sec in tr.get("sections") or []:
        for turn in sec.get("turns") or []:
            sp = turn.get("speaker") or {}
            name = sp.get("name")
            roles = [r.get("type") for r in (sp.get("roles") or [])]
            text = " ".join((tb.get("text") or "").strip() for tb in turn.get("text_blocks") or [])
            text = re.sub(r"\s+", " ", text).strip()
            yield name, roles, text


def eligible(text):
    n = len(text.split())
    if n < MIN_WORDS or n > MAX_WORDS:
        return False
    for s in EXCLUDE_SUBSTRINGS:
        if s in text:
            return False
    return True


def build():
    rng = random.Random(SEED)
    pools = defaultdict(list)   # (term, condition, cls) -> list of candidate dicts
    stats = defaultdict(int)
    for term in TERMS:
        cases = load_term(term)
        for docket, case in cases.items():
            sides = advocate_sides(case)
            name = case.get("name")
            pet = case.get("first_party"); resp = case.get("second_party")
            pet_label = case.get("first_party_label") or "Petitioner"
            resp_label = case.get("second_party_label") or "Respondent"
            for tpath in sorted(glob.glob(os.path.join(REPO, f"{term}.{docket}-t*.json"))):
                per_class = defaultdict(int)
                for spk, roles, text in turns_from_transcript(tpath):
                    stats["turns"] += 1
                    if not spk or not eligible(text):
                        continue
                    is_justice = "scotus_justice" in roles
                    side = sides.get(spk, "unlisted")
                    base = dict(term=term, docket=docket, transcript=os.path.basename(tpath),
                                case_name=name, first_party=pet, second_party=resp,
                                first_party_label=pet_label, second_party_label=resp_label,
                                text=text, word_count=len(text.split()), speaker=spk)
                    if is_justice:
                        cls = "justice"
                        if per_class[("asym", cls)] < MAX_PER_TRANSCRIPT_CLASS:
                            pools[(term, "asym", cls)].append(dict(base, condition="asym", label=1))
                            per_class[("asym", cls)] += 1
                    elif side in ("petitioner", "respondent"):
                        if per_class[("asym", "advocate")] < MAX_PER_TRANSCRIPT_CLASS:
                            pools[(term, "asym", "advocate")].append(dict(base, condition="asym", label=0))
                            per_class[("asym", "advocate")] += 1
                        if per_class[("equal", side)] < MAX_PER_TRANSCRIPT_CLASS:
                            pools[(term, "equal", side)].append(dict(base, condition="equal", label=1 if side == "petitioner" else 0))
                            per_class[("equal", side)] += 1
                    # amici, unlisted speakers, and unknown sides are dropped
    items = []
    for key in sorted(pools):
        pool = pools[key]
        rng.shuffle(pool)
        take = pool[:PER_CELL]
        stats[f"pool {key}"] = len(pool)
        if len(take) < PER_CELL:
            stats[f"SHORT {key}"] = len(take)
        items.extend(take)
    rng.shuffle(items)
    for i, it in enumerate(items):
        it["id"] = f"jev-{i:04d}"
    return items, stats


def state_text(it):
    return (f"Case: {it['case_name']}. {it['first_party_label']}: {it['first_party']}. "
            f"{it['second_party_label']}: {it['second_party']}.\n"
            f"One turn from the oral argument, speaker withheld:\n\"{it['text']}\"")


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        h.update(f.read())
    return h.hexdigest()


if __name__ == "__main__":
    items, stats = build()
    pub = os.path.join(OUT_DIR, "items_public.jsonl")     # what the model sees; no labels, no speaker
    lab = os.path.join(OUT_DIR, "items_labeled.jsonl")    # ground truth; released after the run
    with open(pub, "w") as fp, open(lab, "w") as fl:
        for it in items:
            fp.write(json.dumps({"id": it["id"], "term": it["term"], "condition": it["condition"],
                                 "state": state_text(it)}, ensure_ascii=False) + "\n")
            fl.write(json.dumps(dict(it, state=state_text(it)), ensure_ascii=False) + "\n")
    print(json.dumps(stats, indent=1))
    print("items:", len(items))
    print("sha256 items_public.jsonl :", sha256(pub))
    print("sha256 items_labeled.jsonl:", sha256(lab))
