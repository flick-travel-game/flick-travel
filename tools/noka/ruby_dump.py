#!/usr/bin/env python3
"""農家の 説明に つく ふりがなを 旅ごとに 見る(ファイルは 書かない)。terms_js.py の FIX も かける
    python3 tools/noka/ruby_dump.py <旅id>   → 1語ずつ「id 名前: 漢字(よみ) …」"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu")); sys.path.insert(0, str(HERE))
from companies_js import rubifier
src = (HERE / "terms_js.py").read_text(encoding="utf-8")
ns = {"re": re}; a = src.index("    R = lambda"); b = src.index("    def rub(t):")
exec("\n".join(l[4:] for l in src[a:b].splitlines()), ns)
rub0 = rubifier()
def rub(t):
    h = rub0(t)
    for x, y in ns["FIX"]: h = x.sub(y, h)
    return h
j = sys.argv[1]
for t in json.loads((HERE / f"terms-{j}.json").read_text(encoding="utf-8")):
    h = rub(t["description"]); pairs = re.findall(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>", h)
    print(t["id"], t["name"] + ":", " ".join(f"{k}({r})" for k, r in pairs))
