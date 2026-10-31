#!/usr/bin/env python3
"""気象予報士の 説明に つく ふりがなを 旅ごとに 見る(ファイルは 書かない)。terms_js.py の RB_FIX も かける
    python3 tools/kisho/ruby_dump.py <旅id>   → 1語ずつ「id 名前: 漢字(よみ) …」"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu")); sys.path.insert(0, str(HERE))
from companies_js import rubifier
from terms_js import RB_FIX
rub0 = rubifier()
def rub(t):
    h = rub0(t)
    for a, b in RB_FIX.items(): h = h.replace(a, b)
    return h
j = sys.argv[1]
for t in json.loads((HERE / f"terms-{j}.json").read_text(encoding="utf-8")):
    h = rub(t["description"]); pairs = re.findall(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>", h)
    print(t["id"], t["name"] + ":", " ".join(f"{k}({r})" for k, r in pairs))
