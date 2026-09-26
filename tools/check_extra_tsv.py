#!/usr/bin/env python3
"""首都・出来事の TSV(10列)の形を確かめる。 python3 tools/check_extra_tsv.py tools/capitals.tsv"""
import re, sys
from pathlib import Path
path = Path(sys.argv[1]); keys = set(); n = 0; bad = 0
existing = set()
for p in Path(__file__).parent.glob("*.tsv"):
    if p.name == path.name: continue
    for line in p.read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.startswith("#"): existing.add(line.split("\t")[0])
for i, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
    if not line.strip() or line.startswith("#"): continue
    f = line.split("\t")
    def err(m): 
        global bad; bad += 1; print(f"{i}: {m}: {line[:60]}")
    if len(f) != 10: err(f"列が {len(f)}(10 でない)"); continue
    key, name, place, yomi, emoji, desc, lat, lon, mark, first = f
    if not re.fullmatch(r"[a-z0-9]+", key): err("key")
    if key in keys: err("key がかぶる")
    if key in existing: err("ほかの TSV と key がかぶる")
    keys.add(key)
    if not re.fullmatch(r"[ぁ-ゖー]+", yomi): err("よみ(ひらがな と ー だけ)")
    for s in (name, place, desc, mark):
        if '"' in s or "\\" in s: err('" や \\ がある')
    if not (1 <= len(name) <= 20): err("名前の長さ")
    if not (10 <= len(desc) <= 90): err(f"解説の長さ {len(desc)}")
    try:
        la, lo = float(lat), float(lon)
        if not (-90 <= la <= 90 and -180 <= lo <= 180): err("緯度経度の範囲")
    except ValueError: err("緯度経度が数字でない")
    if first not in ("", "1"): err("はじめのレベルは 1 か 空")
    if not emoji: err("絵文字が空")
    n += 1
print(f"{n}行, 問題 {bad}")
sys.exit(1 if bad else 0)
