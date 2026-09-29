#!/usr/bin/env python3
"""ほかの ゲームの 見出しを ぜんぶ 集めて tools/kyoryu/other-words.txt に 書く(恐竜図鑑で 同じ 見出しを 出さないため)。
    python3 tools/biyo/make_other_words.py
⚠️ 新しい ゲームが 増えたら 走らせなおす。kyoryu/ 自身は 数えない"""
import re, glob
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent.parent
names = set()
for f in glob.glob(str(ROOT / "*/index.html")) + [str(ROOT / "index.html")]:
    if "/kyoryu/" in f: continue
    names |= set(re.findall(r'\{n:"([^"]+)"', Path(f).read_text(encoding="utf-8")))
for f in glob.glob(str(ROOT / "*/terms.js")):
    if "/kyoryu/" in f: continue
    names |= set(re.findall(r'"n":"([^"]+)"', Path(f).read_text(encoding="utf-8")))
for f in glob.glob(str(ROOT / "data/*.json")):
    if f.endswith("kyoryu.json"): continue
    names |= set(re.findall(r'"name": ?"([^"]+)"', Path(f).read_text(encoding="utf-8")))
(ROOT / "tools/kyoryu/other-words.txt").write_text("\n".join(sorted(names)) + "\n", encoding="utf-8")
print("other-words.txt", len(names), "語")
