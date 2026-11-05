#!/usr/bin/env python3
"""⭕❌ もんだい(tools/menkyo/maru-<旅>.json)と 危険予測(kiken-q.json)を 確かめる。決まりは MARU.md / KIKEN.md
    python3 tools/menkyo/maru_check.py           # ぜんぶ
    python3 tools/menkyo/maru_check.py shingo    # 1つの 旅だけ"""
import json, re, sys, difflib
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from terms_js import BAN
JR = ["shingo", "hyoshiki", "hyoji", "hoko", "sokudo", "kosaten", "kosoku", "kiken", "seido"]
PRE = dict(shingo="sg", hyoshiki="hs", hyoji="hj", hoko="hk", sokudo="sd", kosaten="ks", kosoku="kk", kiken="kn", seido="sm")
ROADS = {"straight2", "straight1", "cross", "crossSignal", "tLeft", "tRight", "highway", "rail", "curve", "parking"}
PARTS = {"me", "car", "truck", "bus", "bike", "bicycle", "person", "child", "elder", "ball", "crosswalk", "stop", "signal", "wall", "tree", "cone"}
def terms():
    ids = set()
    for j in JR:
        f = HERE / f"terms-{j}.json"
        if f.exists(): ids |= {t["id"] for t in json.loads(f.read_text(encoding="utf-8"))}
    return ids
def banned(txt): return [w for w in BAN if w in txt]
def main():
    only = [a for a in sys.argv[1:] if a in JR]
    tid = terms(); errs = []; allq = []; total = 0
    for j in (only or JR):
        f = HERE / f"maru-{j}.json"
        if not f.exists(): continue
        L = json.loads(f.read_text(encoding="utf-8")); ok = 0; dvn = {}
        for m in L:
            i = m.get("id", "?")
            if not re.fullmatch(PRE[j] + r"-m\d{3}", i): errs.append(f"{i}: id は {PRE[j]}-m000 の 形")
            if not isinstance(m.get("a"), bool): errs.append(f"{i}: a は true / false")
            if not m.get("q") or len(m["q"]) > 70: errs.append(f"{i}: q が 空か 70字より 長い({len(m.get('q',''))})")
            if not m.get("why") or len(m["why"]) > 90: errs.append(f"{i}: why が 空か 90字より 長い({len(m.get('why',''))})")
            if m.get("dv") not in (1, 2, 3): errs.append(f"{i}: dv は 1/2/3")
            if m.get("term") and tid and m["term"] not in tid: errs.append(f"{i}: term「{m['term']}」が ことばに ない")
            for w in banned(m.get("q", "") + m.get("why", "")): errs.append(f"{i}: 「{w}」は 使わない")
            ok += m.get("a") is True; dvn[m.get("dv")] = dvn.get(m.get("dv"), 0) + 1
            allq.append((i, m.get("q", "")))
        n = len(L); total += n
        r = ok / n if n else 0
        print(f"{j}: {n}問 ⭕{ok} ❌{n-ok} ({r:.0%}) dv{dict(sorted(dvn.items()))}")
        if n and not .4 <= r <= .6: errs.append(f"{j}: ⭕の 割合が {r:.0%}(40〜60% に)")
    seen = {}
    for i, q in allq:
        if i in seen: errs.append(f"{i}: id が かぶる")
        seen[i] = q
    # にた 問題(文の 9割が 同じ)
    qs = sorted(allq, key=lambda x: x[1])
    for a, b in zip(qs, qs[1:]):
        if difflib.SequenceMatcher(None, a[1], b[1]).ratio() > .9: errs.append(f"{a[0]} と {b[0]} が ほとんど 同じ 文")
    f = HERE / "kiken-q.json"
    if f.exists() and not only:
        K = json.loads(f.read_text(encoding="utf-8"))
        for k in K:
            i = k.get("id", "?")
            if not re.fullmatch(r"kq-\d{3}", i): errs.append(f"{i}: id は kq-000")
            if len(k.get("opts", [])) != 3: errs.append(f"{i}: opts は 3つ")
            if not k.get("text") or len(k["text"]) > 70: errs.append(f"{i}: text が 空か 70字より 長い")
            if not k.get("why") or len(k["why"]) > 90: errs.append(f"{i}: why が 空か 90字より 長い")
            for o in k.get("opts", []):
                if not isinstance(o.get("a"), bool) or not o.get("s") or len(o["s"]) > 60: errs.append(f"{i}: opts の 形(s 60字 以内・a true/false)")
            sc = k.get("scene") or {}
            if sc.get("road") not in ROADS: errs.append(f"{i}: road「{sc.get('road')}」")
            its = sc.get("items") or []
            if sum(1 for x in its if x.get("t") == "me") != 1: errs.append(f"{i}: me は 1つ")
            for x in its:
                if x.get("t") not in PARTS: errs.append(f"{i}: 部品「{x.get('t')}」")
                if not (0 <= x.get("x", -1) <= 100 and 0 <= x.get("y", -1) <= 100): errs.append(f"{i}: 部品の 位置 0〜100")
            for w in banned(json.dumps(k, ensure_ascii=False)): errs.append(f"{i}: 「{w}」は 使わない")
        print(f"危険予測: {len(K)}場面")
    print("ぜんぶで", total, "問")
    if errs:
        for e in errs: print("❌", e)
        sys.exit(f"⭕❌ に まちがいが {len(errs)} こ")
    print("⭕❌ OK")
if __name__ == "__main__": main()
