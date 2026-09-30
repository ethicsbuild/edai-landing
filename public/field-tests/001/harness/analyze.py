#!/usr/bin/env python3
"""Pre-registered analysis for E.D.A.I. Field Test 001 (protocol §6).

Usage:
  python3 analyze.py --data ../ --jev responses_jev.jsonl [--baseline responses_baseline.jsonl] --out results/

Verifies the frozen artifacts first. Computes, per condition and per (condition, term):
reliability diagram data, ECE (10 equal-width bins) with bootstrap 95% CI, Brier, AUROC,
accuracy at 0.5, directional bias (hard and soft) with CI; confidence-bin accuracy and
selective prediction for Choice; repeat and paraphrase consistency; latency and cost.
Writes results.json, SUMMARY.md and figures/*.png. Nothing in here changes after
publication except by dated erratum.
"""
import argparse, json, os, statistics
import numpy as np
from common import verify_frozen, load_jsonl, positive_choice_key

SEED = 20260930
BOOT = 1000
BINS = 10
PRICE_PER_INPUT_TOKEN = 0.042 / 1_000_000   # posted: $0.042 per million input tokens; output free
ECE_WELL, ECE_ACCEPT = 0.05, 0.10          # protocol §6 cutoffs
REPEAT_TOL, REPEAT_FRAC = 0.05, 0.95
PARA_TOL, PARA_FRAC = 0.10, 0.90
CONF_THRESHOLDS = (0.5, 0.7, 0.9)

# Validated default palette, categorical slots in fixed order (dataviz reference instance).
SERIES = {"jev_primary": "#2a78d6", "jev_choice": "#1baf7a", "baseline": "#eb6834", "jev_paraphrase": "#4a3aa7"}
INK, INK2, GRID = "#0b0b0b", "#52514e", "#e3e2dd"


# ---------- metrics ----------
def ece(p, y, bins=BINS):
    p = np.asarray(p, float); y = np.asarray(y, float)
    edges = np.linspace(0, 1, bins + 1)
    idx = np.clip(np.digitize(p, edges[1:-1], right=False), 0, bins - 1)
    total = 0.0; rows = []
    for b in range(bins):
        m = idx == b
        n = int(m.sum())
        if n == 0:
            rows.append({"bin": b, "lo": edges[b], "hi": edges[b + 1], "n": 0, "mean_p": None, "frac_pos": None}); continue
        mp, fp = float(p[m].mean()), float(y[m].mean())
        total += n / len(p) * abs(fp - mp)
        rows.append({"bin": b, "lo": float(edges[b]), "hi": float(edges[b + 1]), "n": n, "mean_p": mp, "frac_pos": fp})
    return float(total), rows


def brier(p, y):
    p = np.asarray(p, float); y = np.asarray(y, float)
    return float(np.mean((p - y) ** 2))


def auroc(p, y):
    p = np.asarray(p, float); y = np.asarray(y, int)
    pos, neg = p[y == 1], p[y == 0]
    if len(pos) == 0 or len(neg) == 0:
        return None
    # rank-based with ties: Mann-Whitney U
    allp = np.concatenate([pos, neg]); order = allp.argsort(kind="mergesort"); ranks = np.empty(len(allp));
    sorted_p = allp[order]; i = 0; r = 1
    while i < len(sorted_p):
        j = i
        while j + 1 < len(sorted_p) and sorted_p[j + 1] == sorted_p[i]:
            j += 1
        ranks[order[i:j + 1]] = (i + 1 + j + 1) / 2
        i = j + 1
    rpos = ranks[:len(pos)].sum()
    return float((rpos - len(pos) * (len(pos) + 1) / 2) / (len(pos) * len(neg)))


def accuracy(p, y):
    p = np.asarray(p, float); y = np.asarray(y, int)
    return float(np.mean((p > 0.5).astype(int) == y))


def bias_hard(p, y):
    """FPR - FNR: rate of calling a negative line positive minus rate of calling a positive line negative."""
    p = np.asarray(p, float); y = np.asarray(y, int)
    fpr = float(np.mean(p[y == 0] > 0.5)) if (y == 0).any() else 0.0
    fnr = float(np.mean(p[y == 1] <= 0.5)) if (y == 1).any() else 0.0
    return fpr - fnr


def bias_soft(p, y):
    p = np.asarray(p, float); y = np.asarray(y, int)
    return float(p[y == 0].mean() - (1 - p[y == 1]).mean())


def boot_ci(fn, p, y, seed=SEED, n=BOOT):
    rng = np.random.default_rng(seed)
    p = np.asarray(p, float); y = np.asarray(y, int); N = len(p)
    vals = []
    for _ in range(n):
        ix = rng.integers(0, N, N)
        v = fn(p[ix], y[ix])
        if isinstance(v, tuple):
            v = v[0]
        if v is not None:
            vals.append(v)
    return [float(np.percentile(vals, 2.5)), float(np.percentile(vals, 97.5))] if vals else [None, None]


def calib_label(e):
    return "well calibrated" if e <= ECE_WELL else ("acceptable" if e <= ECE_ACCEPT else "miscalibrated")


def full_metrics(p, y):
    p = np.asarray(p, float); y = np.asarray(y, int)
    e, rows = ece(p, y)
    out = {"n": int(len(p)), "ece": e, "ece_ci": boot_ci(lambda a, b: ece(a, b)[0], p, y), "ece_label": calib_label(e),
           "brier": brier(p, y), "brier_ci": boot_ci(brier, p, y), "brier_constant_half": 0.25,
           "auroc": auroc(p, y), "auroc_ci": boot_ci(auroc, p, y),
           "accuracy": accuracy(p, y), "accuracy_ci": boot_ci(accuracy, p, y),
           "bias_hard": bias_hard(p, y), "bias_hard_ci": boot_ci(bias_hard, p, y),
           "bias_soft": bias_soft(p, y), "bias_soft_ci": boot_ci(bias_soft, p, y),
           "mean_p": float(p.mean()), "reliability": rows}
    lo, hi = out["bias_hard_ci"]
    out["bias_label"] = ("bias toward the positive class" if lo > 0 else "bias toward the negative class" if hi < 0 else "no directional bias detected") if lo is not None else "n/a"
    return out


# ---------- parsing ----------
def parse_jev(path, labels):
    """Returns dict id -> {p_primary, p_para, p_choice, conf, choice_correct, latency_ms, tokens_in, repeats:[...]}, plus run info."""
    rows = load_jsonl(path); per = {}; info = {"n_records": len(rows), "n_ok": 0, "n_fail": 0, "models": {}, "tokens_in": 0, "tokens_out": 0}
    for r in rows:
        if not r.get("ok"):
            info["n_fail"] += 1; continue
        info["n_ok"] += 1
        resp = r["response"]; ans = resp["answers"]; iid = r["id"]
        info["models"][resp.get("model")] = info["models"].get(resp.get("model"), 0) + 1
        u = resp.get("usage", {}); info["tokens_in"] += u.get("input_tokens", 0); info["tokens_out"] += u.get("output_tokens", 0)
        d = per.setdefault(iid, {"repeats": []})
        if r["pass"] == "main":
            d["p_primary"] = ans["primary"]["noul"]; d["p_para"] = ans["paraphrase"]["noul"]
            ch = ans["choice"]; key = positive_choice_key(r["condition"])
            d["p_choice"] = ch["probabilities"].get(key, 0.0); d["conf"] = ch["confidence"]; d["choice_pick"] = ch["choice"]
            d["latency_ms"] = r["latency_ms"]; d["tokens_in"] = u.get("input_tokens", 0)
        else:
            d["repeats"].append(ans["primary"]["noul"])
    return per, info


def parse_baseline(path):
    rows = load_jsonl(path); per = {}; info = {"n_records": len(rows), "n_ok": 0, "n_fail": 0, "n_unparsed": 0, "models": {}}
    for r in rows:
        if not r.get("ok"):
            info["n_fail"] += 1; continue
        info["n_ok"] += 1; resp = r["response"]
        info["models"][resp.get("model")] = info["models"].get(resp.get("model"), 0) + 1
        if resp.get("p") is None:
            info["n_unparsed"] += 1; continue
        d = per.setdefault(r["id"], {"repeats": []})
        if r["pass"] == "main" and r["question"] == "primary":
            d["p_primary"] = resp["p"]; d["latency_ms"] = r["latency_ms"]
        elif r["pass"] == "main" and r["question"] == "paraphrase":
            d["p_para"] = resp["p"]
        else:
            d["repeats"].append(resp["p"])
    return per, info


# ---------- consistency / confidence ----------
def consistency(per, key="p_primary"):
    spreads = []; para = []
    for iid, d in per.items():
        if key in d and len(d["repeats"]) >= 3:
            vals = [d[key]] + d["repeats"][:3]
            spreads.append(max(vals) - min(vals))
        if "p_primary" in d and "p_para" in d:
            para.append(abs(d["p_primary"] - d["p_para"]))
    def summ(x, tol):
        x = np.asarray(x, float)
        if len(x) == 0:
            return {"n": 0}
        return {"n": int(len(x)), "median": float(np.median(x)), "p90": float(np.percentile(x, 90)), "max": float(x.max()),
                "frac_within_0_05": float(np.mean(x <= 0.05)), "frac_within_0_10": float(np.mean(x <= 0.10)),
                "frac_exactly_zero": float(np.mean(x == 0))}
    rep = summ(spreads, REPEAT_TOL); pa = summ(para, PARA_TOL)
    if rep.get("n"):
        rep["label"] = "consistent" if rep["frac_within_0_05"] >= REPEAT_FRAC else "inconsistent"
    if pa.get("n"):
        pa["label"] = "consistent under rewording" if pa["frac_within_0_10"] >= PARA_FRAC else "inconsistent under rewording"
    return {"repeat": rep, "paraphrase": pa}


def confidence_usefulness(per, labels):
    conf = []; correct = []
    for iid, d in per.items():
        if "conf" in d:
            conf.append(d["conf"]); correct.append(int((d["p_choice"] > 0.5) == (labels[iid]["label"] == 1)))
    conf = np.asarray(conf); correct = np.asarray(correct)
    if len(conf) == 0:
        return None
    edges = [0, 0.2, 0.4, 0.6, 0.8, 1.0001]; bins = []
    for lo, hi in zip(edges[:-1], edges[1:]):
        m = (conf >= lo) & (conf < hi)
        bins.append({"lo": lo, "hi": min(hi, 1.0), "n": int(m.sum()), "accuracy": float(correct[m].mean()) if m.any() else None})
    sel = []
    for t in CONF_THRESHOLDS:
        m = conf >= t
        sel.append({"threshold": t, "coverage": float(m.mean()), "n": int(m.sum()), "accuracy": float(correct[m].mean()) if m.any() else None})
    return {"n": int(len(conf)), "mean_confidence": float(conf.mean()), "bins": bins, "selective": sel}


# ---------- figures ----------
def reliability_figure(path, series, title):
    import matplotlib; matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(5.2, 5.2), dpi=150)
    ax.plot([0, 1], [0, 1], color=GRID, lw=1.5, zorder=1)
    for name, rows in series:
        xs = [r["mean_p"] for r in rows if r["n"] > 0]; ys = [r["frac_pos"] for r in rows if r["n"] > 0]
        ns = [r["n"] for r in rows if r["n"] > 0]
        ax.plot(xs, ys, color=SERIES.get(name, INK), lw=2, zorder=3)
        ax.scatter(xs, ys, s=[max(24, 6 * (n ** 0.5)) for n in ns], color=SERIES.get(name, INK), edgecolor="white", lw=1.5, zorder=4, label=name.replace("_", " "))
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.set_xlabel("stated probability", color=INK2); ax.set_ylabel("observed frequency", color=INK2)
    ax.set_title(title, color=INK, fontsize=11, loc="left")
    ax.grid(True, color=GRID, lw=0.8); ax.set_axisbelow(True)
    for s in ax.spines.values(): s.set_color(GRID)
    ax.tick_params(colors=INK2)
    if len(series) > 1:
        ax.legend(frameon=False, fontsize=8, loc="upper left")
    fig.tight_layout(); fig.savefig(path); plt.close(fig)


def spread_figure(path, spreads_by_name, title):
    import matplotlib; matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(5.6, 3.4), dpi=150)
    edges = np.linspace(0, 1, 21)
    for name, x in spreads_by_name:
        if len(x) == 0: continue
        h, _ = np.histogram(x, bins=edges); h = h / max(1, len(x))
        ax.step(edges[:-1], h, where="post", color=SERIES.get(name, INK), lw=2, label=name.replace("_", " "))
    ax.set_xlabel("max − min of four answers to the same item", color=INK2); ax.set_ylabel("share of items", color=INK2)
    ax.set_title(title, color=INK, fontsize=11, loc="left"); ax.grid(True, color=GRID, lw=0.8); ax.set_axisbelow(True)
    for s in ax.spines.values(): s.set_color(GRID)
    ax.tick_params(colors=INK2)
    if len(spreads_by_name) > 1: ax.legend(frameon=False, fontsize=8)
    fig.tight_layout(); fig.savefig(path); plt.close(fig)


# ---------- main ----------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default=".."); ap.add_argument("--jev", required=True); ap.add_argument("--baseline")
    ap.add_argument("--out", default="results")
    a = ap.parse_args()
    verify_frozen(a.data)
    os.makedirs(os.path.join(a.out, "figures"), exist_ok=True)
    labels = {it["id"]: it for it in load_jsonl(os.path.join(a.data, "items_labeled.jsonl"))}

    jev, jinfo = parse_jev(a.jev, labels)
    base, binfo = (parse_baseline(a.baseline) if a.baseline else ({}, None))
    results = {"jev_run": jinfo, "baseline_run": binfo, "conditions": {}, "consistency": {}, "confidence_usefulness": {}, "latency_cost": {}}

    def subset(per, key, cond, term=None):
        ids = [i for i, d in per.items() if key in d and labels[i]["condition"] == cond and (term is None or labels[i]["term"] == term)]
        return [per[i][key] for i in ids], [labels[i]["label"] for i in ids], ids

    for cond in ("asym", "equal"):
        block = {}
        for src, per, key in (("jev_primary", jev, "p_primary"), ("jev_paraphrase", jev, "p_para"), ("jev_choice", jev, "p_choice"), ("baseline", base, "p_primary"), ("baseline_paraphrase", base, "p_para")):
            p, y, ids = subset(per, key, cond)
            if len(p) == 0: continue
            m = full_metrics(p, y); m["by_term"] = {}
            for term in sorted({labels[i]["term"] for i in ids}):
                pt, yt, _ = subset(per, key, cond, term)
                mt = full_metrics(pt, yt); mt.pop("reliability", None); m["by_term"][term] = mt
            block[src] = m
        results["conditions"][cond] = block
        series = [(s, block[s]["reliability"]) for s in ("jev_primary", "jev_choice", "baseline") if s in block]
        if series:
            reliability_figure(os.path.join(a.out, "figures", f"reliability_{cond}.png"), series, f"Reliability, {cond.upper()} (n={block[series[0][0]]['n']})")

    results["consistency"]["jev"] = consistency(jev)
    if base: results["consistency"]["baseline"] = consistency(base)
    for cond in ("asym", "equal"):
        sub = {i: d for i, d in jev.items() if labels[i]["condition"] == cond}
        results["confidence_usefulness"][cond] = confidence_usefulness(sub, labels)
    lat = [d["latency_ms"] for d in jev.values() if "latency_ms" in d]
    results["latency_cost"]["jev"] = {"n": len(lat), "median_ms": float(np.median(lat)) if lat else None, "p95_ms": float(np.percentile(lat, 95)) if lat else None,
                                      "input_tokens": jinfo["tokens_in"], "output_tokens": jinfo["tokens_out"], "cost_usd_at_posted_rate": jinfo["tokens_in"] * PRICE_PER_INPUT_TOKEN}
    if base:
        blat = [d["latency_ms"] for d in base.values() if "latency_ms" in d]
        results["latency_cost"]["baseline"] = {"n": len(blat), "median_ms": float(np.median(blat)) if blat else None, "p95_ms": float(np.percentile(blat, 95)) if blat else None}
    spreads = [("jev_primary", [max([d["p_primary"]] + d["repeats"][:3]) - min([d["p_primary"]] + d["repeats"][:3]) for d in jev.values() if "p_primary" in d and len(d["repeats"]) >= 3])]
    if base:
        spreads.append(("baseline", [max([d["p_primary"]] + d["repeats"][:3]) - min([d["p_primary"]] + d["repeats"][:3]) for d in base.values() if "p_primary" in d and len(d["repeats"]) >= 3]))
    spread_figure(os.path.join(a.out, "figures", "repeat_spread.png"), spreads, "Repeat consistency, 200 items × 4 asks")

    with open(os.path.join(a.out, "results.json"), "w") as f:
        json.dump(results, f, indent=1)
    write_summary(results, os.path.join(a.out, "SUMMARY.md"))
    print("wrote", os.path.join(a.out, "results.json"), "and SUMMARY.md")


def fmt(x, d=3):
    return "n/a" if x is None else f"{x:.{d}f}"


def ci(c, d=3):
    return "n/a" if not c or c[0] is None else f"[{c[0]:.{d}f}, {c[1]:.{d}f}]"


def write_summary(R, path):
    L = ["# Field Test 001, results as pre-registered", ""]
    j = R["jev_run"]; L.append(f"Jev run: {j['n_ok']} successful responses, {j['n_fail']} failures; model strings seen: {j['models']}; tokens in {j['tokens_in']}, out {j['tokens_out']}.")
    if R["baseline_run"]:
        b = R["baseline_run"]; L.append(f"Baseline run: {b['n_ok']} ok, {b['n_fail']} failures, {b['n_unparsed']} unparsable answers; models: {b['models']}.")
    L.append("")
    for cond, block in R["conditions"].items():
        L += [f"## {cond.upper()}", "", "| source | n | ECE [95% CI] | label | Brier | AUROC | acc@0.5 | bias hard [CI] | bias soft | verdict |", "|---|---|---|---|---|---|---|---|---|---|"]
        for src, m in block.items():
            L.append(f"| {src} | {m['n']} | {fmt(m['ece'])} {ci(m['ece_ci'])} | {m['ece_label']} | {fmt(m['brier'])} | {fmt(m['auroc'])} | {fmt(m['accuracy'])} | {fmt(m['bias_hard'])} {ci(m['bias_hard_ci'])} | {fmt(m['bias_soft'])} | {m['bias_label']} |")
        L += ["", "By term:", "", "| source | term | n | ECE | acc@0.5 | AUROC |", "|---|---|---|---|---|---|"]
        for src, m in block.items():
            for term, mt in m["by_term"].items():
                L.append(f"| {src} | {term} | {mt['n']} | {fmt(mt['ece'])} | {fmt(mt['accuracy'])} | {fmt(mt['auroc'])} |")
        L.append("")
    L += ["## Consistency", ""]
    for src, c in R["consistency"].items():
        r, p = c["repeat"], c["paraphrase"]
        if r.get("n"):
            L.append(f"- {src} repeats (n={r['n']}): median spread {fmt(r['median'])}, p90 {fmt(r['p90'])}, max {fmt(r['max'])}; within 0.05: {fmt(r['frac_within_0_05'],3)}; within 0.10: {fmt(r['frac_within_0_10'],3)}; exactly identical: {fmt(r['frac_exactly_zero'],3)} → **{r['label']}**")
        if p.get("n"):
            L.append(f"- {src} paraphrase (n={p['n']}): median |Δ| {fmt(p['median'])}, p90 {fmt(p['p90'])}; within 0.10: {fmt(p['frac_within_0_10'],3)} → **{p['label']}**")
    L += ["", "## Confidence usefulness (Jev Choice)", ""]
    for cond, cu in R["confidence_usefulness"].items():
        if not cu: continue
        L.append(f"- {cond.upper()}: mean confidence {fmt(cu['mean_confidence'])}; accuracy by confidence bin: " + ", ".join(f"[{b['lo']:.1f},{b['hi']:.1f}) n={b['n']} acc={fmt(b['accuracy'])}" for b in cu["bins"]))
        L.append(f"  selective prediction: " + "; ".join(f"conf≥{s['threshold']}: coverage {fmt(s['coverage'])}, accuracy {fmt(s['accuracy'])}" for s in cu["selective"]))
    L += ["", "## Latency and cost", ""]
    for src, lc in R["latency_cost"].items():
        L.append(f"- {src}: median {fmt(lc['median_ms'],0)} ms, p95 {fmt(lc['p95_ms'],0)} ms" + (f"; input tokens {lc['input_tokens']}, cost at posted rate ${lc['cost_usd_at_posted_rate']:.4f}" if "input_tokens" in lc else ""))
    L += ["", f"Cutoffs as pre-registered: ECE ≤ {ECE_WELL} well calibrated, ≤ {ECE_ACCEPT} acceptable, else miscalibrated; repeats ≥ {int(REPEAT_FRAC*100)}% within {REPEAT_TOL}; rewording ≥ {int(PARA_FRAC*100)}% within {PARA_TOL}. Bias: hard = FPR − FNR at 0.5; positive means errors lean toward the positive class (Justice in ASYM, petitioner in EQUAL). Bootstrap CIs: {BOOT} resamples, seed {SEED}.", ""]
    with open(path, "w") as f:
        f.write("\n".join(L))


if __name__ == "__main__":
    main()
