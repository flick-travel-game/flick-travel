#!/usr/bin/env python3
"""enrich/out/*.jsonl の 形を 確かめる(enrich/PROMPT.md の 決まり)。 python3 tools/kabu/check_enrich.py tools/kabu/enrich/out/jp-01.jsonl"""
import json, re, sys
from pathlib import Path
SECTORS = {"it", "semi", "tel", "fin", "auto", "cons", "stap", "hlth", "phar", "ene", "mat", "ind", "util", "re"}
bad = 0
for f in sys.argv[1:]:
    out = Path(f); src = Path(str(out).replace("/out/", "/in/"))
    ids = [json.loads(l)["id"] for l in src.read_text(encoding="utf-8").splitlines() if l.strip()]
    rows = [json.loads(l) for l in out.read_text(encoding="utf-8").splitlines() if l.strip()]
    def err(i, m):
        global bad; bad += 1; print(f"{out.name}:{i+1}: {m}")
    if [r.get("id") for r in rows] != ids: err(-1, f"id の 順・数が 入力と ちがう({len(rows)} / {len(ids)})")
    for i, r in enumerate(rows):
        for k in ("id", "name", "reading", "nameJa", "sector", "industry", "description", "fame", "emoji"):
            if k not in r or r[k] in ("", None): err(i, f"{k} が 無い")
        if not re.fullmatch(r"[ぁ-ゖー]+", r.get("reading", "")): err(i, f"よみ {r.get('reading')}")
        if len(r.get("reading", "")) > 24: err(i, f"よみが 長い {len(r['reading'])}")
        if len(r.get("name", "")) > 20: err(i, "name が 長い")
        if r.get("sector") not in SECTORS: err(i, f"sector {r.get('sector')}")
        d = r.get("description", "")
        if not (12 <= len(d) <= 60): err(i, f"説明の 長さ {len(d)}")
        if not d.endswith("。"): err(i, "説明の おわりが 。 でない")
        for w in ("投資", "もうか", "儲", "おすすめ", "買い時"):
            if w in d: err(i, f"説明に「{w}」")
        if r.get("fame") not in (1, 2, 3, 4, 5): err(i, "fame")
        if len(r.get("industry", "")) > 14: err(i, "industry が 長い")
        if '"' in d or "\\" in d or "<" in d: err(i, "説明に 記号")
print("問題", bad); sys.exit(1 if bad else 0)
