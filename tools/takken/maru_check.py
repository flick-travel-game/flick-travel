#!/usr/bin/env python3
"""⭕❌ 一問一答(tools/takken/maru-<旅>.json)と 🔢 数字クイズ(num.json)を 確かめる。決まりは MARU.md / NUM.md
    python3 tools/takken/maru_check.py           # ぜんぶ
    python3 tools/takken/maru_check.py torihiki  # 1つの 旅だけ"""
import json, re, sys, difflib
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from terms_js import BAN, RULESETS
JR = ["kenri", "bukken", "sozoku", "gyoho", "torihiki", "toshi", "kenchiku", "zei", "kakaku"]
PRE = dict(kenri="ke", bukken="bu", sozoku="so", gyoho="gy", torihiki="to", toshi="ts", kenchiku="kc", zei="ze", kakaku="kk")
GOAL = dict(kenri=140, bukken=130, sozoku=120, gyoho=150, torihiki=160, toshi=130, kenchiku=130, zei=110, kakaku=130)
RS_OF = dict(kenri={"権利関係"}, bukken={"権利関係"}, sozoku={"権利関係"}, gyoho={"宅建業法"}, torihiki={"宅建業法"},
             toshi={"法令上の制限"}, kenchiku={"法令上の制限"}, zei={"税・その他"}, kakaku={"税・その他", "免除科目"})
def terms():
    ids = set()
    for j in JR:
        f = HERE / f"terms-{j}.json"
        if f.exists(): ids |= {t["id"] for t in json.loads(f.read_text(encoding="utf-8"))}
    return ids
def banned(txt): return [w for w in BAN if w in txt]
def main():
    only = [a for a in sys.argv[1:] if a in JR]
    tid = terms(); errs = []; warn = []; allq = []; total = 0
    for j in (only or JR):
        f = HERE / f"maru-{j}.json"
        if not f.exists(): continue
        L = json.loads(f.read_text(encoding="utf-8")); ok = 0; dvn = {}; rsn = {}
        for m in L:
            i = m.get("id", "?")
            if not re.fullmatch(PRE[j] + r"-m\d{3}", i): errs.append(f"{i}: id は {PRE[j]}-m000 の 形")
            if not isinstance(m.get("a"), bool): errs.append(f"{i}: a は true / false")
            if not m.get("q") or len(m["q"]) > 80: errs.append(f"{i}: q が 空か 80字より 長い({len(m.get('q',''))})")
            if not m.get("why") or len(m["why"]) > 90: errs.append(f"{i}: why が 空か 90字より 長い({len(m.get('why',''))})")
            if m.get("dv") not in (1, 2, 3): errs.append(f"{i}: dv は 1/2/3")
            if m.get("rs") not in RS_OF[j]: errs.append(f"{i}: rs「{m.get('rs')}」は {sorted(RS_OF[j])}")
            if m.get("term") and tid and m["term"] not in tid: warn.append(f"{i}: term「{m['term']}」が ことばに ない")
            for w in banned(m.get("q", "") + m.get("why", "")): errs.append(f"{i}: 「{w}」は 使わない")
            ok += m.get("a") is True; dvn[m.get("dv")] = dvn.get(m.get("dv"), 0) + 1; rsn[m.get("rs")] = rsn.get(m.get("rs"), 0) + 1
            allq.append((i, m.get("q", "")))
        n = len(L); total += n
        r = ok / n if n else 0
        print(f"{j}: {n}問(めやす {GOAL[j]}) ⭕{ok} ❌{n-ok} ({r:.0%}) dv{dict(sorted(dvn.items()))} {rsn if j == 'kakaku' else ''}")
        if n and not .4 <= r <= .6: errs.append(f"{j}: ⭕の 割合が {r:.0%}(40〜60% に)")
    seen = {}
    for i, q in allq:
        if i in seen: errs.append(f"{i}: id が かぶる")
        seen[i] = q
    qs = sorted(allq, key=lambda x: x[1])
    for a, b in zip(qs, qs[1:]):
        if difflib.SequenceMatcher(None, a[1], b[1]).ratio() > .92: warn.append(f"{a[0]} と {b[0]} が ほとんど 同じ 文")
    nall = 0
    for j in (only or JR):
        f = HERE / f"num-{j}.json"
        if not f.exists(): continue
        N = json.loads(f.read_text(encoding="utf-8")); nid = set(); nall += len(N)
        for k in N:
            i = j + ":" + str(k.get("id", "?"))
            if not re.fullmatch(r"n\d{3}", str(k.get("id"))) or k.get("id") in nid: errs.append(f"{i}: id は n000 で かぶらない")
            nid.add(k.get("id"))
            if k.get("j") != j: errs.append(f"{i}: j は「{j}」")
            if k.get("rs") not in RS_OF[j]: errs.append(f"{i}: rs「{k.get('rs')}」")
            if not k.get("q") or len(k["q"]) > 70: errs.append(f"{i}: q が 空か 70字より 長い")
            if not k.get("why") or len(k["why"]) > 90: errs.append(f"{i}: why が 空か 90字より 長い")
            o = k.get("opts") or []
            if len(o) != 4 or len(set(o)) != 4 or k.get("a") not in o: errs.append(f"{i}: opts は ちがう 4つで a を ふくむ")
            for w in banned(json.dumps(k, ensure_ascii=False)): errs.append(f"{i}: 「{w}」は 使わない")
    print(f"数字クイズ: {nall}問")
    print("⭕❌ ぜんぶで", total, "問")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit(f"⭕❌ に まちがいが {len(errs)} こ")
    print("⭕❌ OK")
if __name__ == "__main__": main()
