#!/usr/bin/env python3
"""サブエージェントが 集めた 写真(photo-<key>.jpg + manifest.json)を photos.js と フォルダに 入れる。
使いかた: python3 tools/merge-photos.py <フォルダ> [<フォルダ> ...](あとの フォルダが 勝つ)"""
import json, re, shutil, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
p = ROOT / "photos.js"; s = p.read_text(encoding="utf-8")
head, body = s.split("const PHOTOS = ", 1)
photos = json.loads(body.rstrip().rstrip(";"))
n = 0
for d in map(Path, sys.argv[1:]):
    for k, v in json.load(open(d / "manifest.json", encoding="utf-8")).items():
        src = d / v["src"]; assert src.exists(), src
        shutil.copy(src, ROOT / f"photo-{k}.jpg"); v["src"] = f"photo-{k}.jpg"
        photos[k] = v; n += 1
p.write_text(head + "const PHOTOS = " + json.dumps(photos, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print("入れた", n, "/ ぜんぶ", len(photos))
