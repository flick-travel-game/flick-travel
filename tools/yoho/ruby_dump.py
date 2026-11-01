#!/usr/bin/env python3
"""養蜂家の 説明に つく ふりがなを 旅ごとに 見る(ファイルは 書かない)。terms_js.py の RB_FIX(rbfix-*.json も)と RB_RE も かける
    python3 tools/yoho/ruby_dump.py <旅id>   → 1語ずつ「id 名前: 漢字(よみ) …」"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu")); sys.path.insert(0, str(HERE))
import terms_js as T
from companies_js import rubifier
rub0 = rubifier()
def rub(t):
    h = rub0(t)
    for x, y in T.RB_RE: h = x.sub(y, h)
    for x, y in T.RB_FIX.items(): h = h.replace(x, y)
    return h
j = sys.argv[1]
for t in json.loads((HERE / f"terms-{j}.json").read_text(encoding="utf-8")):
    for k in ("description", "example"):
        if not t.get(k): continue
        pairs = re.findall(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>", rub(t[k]))
        print(t["id"], t["name"] + ":", " ".join(f"{a}({r})" for a, r in pairs))
