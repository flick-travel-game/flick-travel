#!/usr/bin/env python3
"""宇宙・からだ の TSV(11列)の形を確かめる。 python3 tools/check_series_tsv.py tools/space.tsv sky,solar
11列: key 名前 分類 よみ 絵文字 解説 地図 x y Wikipedia題名 はじめのレベル(1か空)"""
import re, sys
from pathlib import Path
path = Path(sys.argv[1]); maps = set(sys.argv[2].split(",")); keys = set(); n = 0; bad = 0
for i, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
    if not line.strip() or line.startswith("#"): continue
    f = line.split("\t")
    def err(m):
        global bad; bad += 1; print(f"{i}: {m}: {line[:60]}")
    if len(f) != 11: err(f"列が {len(f)}(11 でない)"); continue
    key, name, cat, yomi, emoji, desc, mp, x, y, wiki, first = f
    if not re.fullmatch(r"[a-z0-9]+", key): err("key")
    if key in keys: err("key がかぶる")
    keys.add(key)
    if not re.fullmatch(r"[ぁ-ゖー]+", yomi): err("よみ(ひらがな と ー だけ)")
    for s in (name, cat, desc, wiki):
        if '"' in s or "\\" in s or "\t" in s: err('" や \\ がある')
    if not (1 <= len(name) <= 20): err("名前の長さ")
    if not (10 <= len(desc) <= 90): err(f"解説の長さ {len(desc)}")
    if mp not in maps: err(f"地図が {mp}(使えるのは {maps})")
    try: float(x); float(y)
    except ValueError: err("x y が数字でない")
    if first not in ("", "1"): err("はじめのレベルは 1 か 空")
    if not emoji: err("絵文字が空")
    if not wiki: err("Wikipedia題名が空")
    n += 1
print(f"{n}行, 問題 {bad}")
sys.exit(1 if bad else 0)
