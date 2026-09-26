#!/usr/bin/env python3
"""株式フリック旅行の TSV(12列)の形を確かめる。 python3 tools/check_company_tsv.py tools/companies-japan.tsv
12列: key 会社名 本社 よみ 絵文字 解説 緯度 経度 公式サイト ティッカー Wikipedia題名 はじめのレベル(1か空)"""
import re, sys
from pathlib import Path
path = Path(sys.argv[1]); jp = "japan" in path.name; keys = set(); ticks = set(); n = 0; bad = 0
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
    if len(f) != 12: err(f"列が {len(f)}(12 でない)"); continue
    key, name, place, yomi, emoji, desc, lat, lon, url, tick, wiki, first = f
    if not re.fullmatch(r"[a-z0-9]+", key): err("key")
    if key in keys or key in existing: err("key がかぶる")
    keys.add(key)
    if tick in ticks: err("ティッカーがかぶる")
    ticks.add(tick)
    if not re.fullmatch(r"[ぁ-ゖー]+", yomi): err("よみ(ひらがな と ー だけ)")
    for s in (name, place, desc, wiki, url):
        if '"' in s or "\\" in s: err('" や \\ がある')
    if not (1 <= len(name) <= 20): err("名前の長さ")
    if not (10 <= len(desc) <= 90): err(f"解説の長さ {len(desc)}")
    if place.startswith("日本") != jp: err("本社(日本の会社は「日本・」から / 世界の会社は 日本 以外)")
    if not url.startswith("https://"): err("公式サイト")
    for w in ("もうか", "儲", "買いましょう", "おすすめの株"): 
        if w in desc: err(f"お金を すすめる ことば({w})")
    try: float(lat); float(lon)
    except ValueError: err("緯度 経度")
    if first not in ("", "1"): err("はじめのレベルは 1 か 空")
    if not emoji: err("絵文字が空")
    n += 1
if n % 10: print(f"⚠️ {n}社(10の倍数にする)"); bad += 1
print(f"{n}社, 問題 {bad}")
sys.exit(1 if bad else 0)
