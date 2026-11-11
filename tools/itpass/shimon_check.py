#!/usr/bin/env python3
"""📝 本番形式の 4択(tools/itpass/shimon-<旅>.json)を 確かめる。決まりは SHIMON.md
    python3 tools/itpass/shimon_check.py           # ぜんぶ
    python3 tools/itpass/shimon_check.py kiso      # 1つの 旅だけ"""
import json, re, sys, difflib
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from terms_js import BAN, ban_text
from maru_check import JR, PRE, RS_OF, terms
GOAL = {j: 30 for j in JR}; GOAL["kiso"] = 60; GOAL["konpyuta"] = 50
def main():
    only = [a for a in sys.argv[1:] if a in JR]
    tid = terms(); errs = []; warn = []; allq = []; total = 0
    for j in (only or JR):
        f = HERE / f"shimon-{j}.json"
        if not f.exists(): continue
        L = json.loads(f.read_text(encoding="utf-8")); dvn = {}; kn = {}; pos = [0, 0, 0, 0]
        for m in L:
            i = m.get("id", "?")
            if not re.fullmatch(PRE[j] + r"-s\d{3}", i): errs.append(f"{i}: id は {PRE[j]}-s000 の 形")
            if not m.get("q") or len(m["q"]) > 200: errs.append(f"{i}: q が 空か 200字より 長い({len(m.get('q',''))})")
            o = m.get("opts") or []
            if len(o) != 4 or len(set(o)) != 4: errs.append(f"{i}: opts は ちがう 4つ")
            if m.get("a") not in o: errs.append(f"{i}: a が opts に ない")
            else: pos[o.index(m["a"])] += 1
            if m.get("a") in o and len(o) == 4 and not m.get("code"):
                ls = sorted(len(x) for x in o if x != m["a"])
                if len(m["a"]) >= ls[-1] * 1.4 and len(m["a"]) - ls[-1] >= 8: warn.append(f"{i}: 正解だけ 長い({len(m['a'])}字 / ほかは {ls[-1]}字まで)。読むだけで 当たる")
            for x in o:
                if not x or len(x) > 60: errs.append(f"{i}: 選択肢が 空か 60字より 長い「{x[:20]}」")
                if re.search(r"(すべて|全て)(正しい|誤り)|どれでもない|いずれでもない", x): errs.append(f"{i}: 「すべて正しい」「どれでもない」は 使わない")
            if not m.get("why") or len(m["why"]) > 120: errs.append(f"{i}: why が 空か 120字より 長い({len(m.get('why',''))})")
            if m.get("dv") not in (2, 3): errs.append(f"{i}: dv は 2/3")
            if m.get("rs") not in RS_OF[j]: errs.append(f"{i}: rs「{m.get('rs')}」は {sorted(RS_OF[j])}")
            if m.get("term") and tid and m["term"] not in tid: warn.append(f"{i}: term「{m['term']}」が ことばに ない")
            k = m.get("k", "")
            if k not in ("", "code", "sheet"): errs.append(f"{i}: k は code / sheet か 無し")
            if k and not m.get("code"): errs.append(f"{i}: k が あるのに code が 無い")
            if m.get("code"):
                lines = m["code"].split("\n")
                if len(lines) > 14: errs.append(f"{i}: code が 14行より 多い")
                for ln in lines:
                    if len(ln) > 40: errs.append(f"{i}: code の 行が 40字より 長い「{ln[:20]}」")
            txt = ban_text(m.get("q", "") + m.get("why", "") + " ".join(o) + m.get("code", ""))
            for w in BAN:
                if w in txt: errs.append(f"{i}: 「{w}」は 使わない")
            dvn[m.get("dv")] = dvn.get(m.get("dv"), 0) + 1; kn[k or "場面"] = kn.get(k or "場面", 0) + 1
            allq.append((i, m.get("q", "")))
        n = len(L); total += n
        print(f"{j}: {n}問(めやす {GOAL[j]}) dv{dict(sorted(dvn.items()))} {kn} 正解の 位置{pos}")
        if n and dvn.get(3, 0) * 2 < n: warn.append(f"{j}: 上級(dv3)が 半分 より 少ない")
    seen = set()
    for i, q in allq:
        if i in seen: errs.append(f"{i}: id が かぶる")
        seen.add(i)
    qs = sorted(allq, key=lambda x: x[1])
    for a, b in zip(qs, qs[1:]):
        if difflib.SequenceMatcher(None, a[1], b[1]).ratio() > .9: warn.append(f"{a[0]} と {b[0]} が ほとんど 同じ 文")
    print("📝 本番形式 ぜんぶで", total, "問")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit(f"本番形式の 問題に まちがいが {len(errs)} こ")
    print("📝 OK")
if __name__ == "__main__": main()
