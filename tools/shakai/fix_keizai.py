#!/usr/bin/env python3
"""フリック社会旅行: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-29 の 3回目)の「しじょう けいさい」の「さ」に 濁点を 描いて「けいざい」に する
    python3 tools/shakai/fix_keizai.py もとの絵.png 直した絵.png
- ChatGPT に 2回 頼んでも「さ」の 濁点だけ 付かなかったので 絵の 中で 直した(恐竜図鑑の fix_small_i.py と 同じ 考えかた)
- 色は「さ」の いちばん こい 赤。8倍の 大きさで 2本の 線を 描いて 縮めて なじませる
⚠️ 絵を 差しかえたら 位置(box)を 見なおす。直したあとは かならず 切り出して 読む"""
import sys
from PIL import Image, ImageDraw
a = Image.open(sys.argv[1]).convert("RGB")
assert a.size == (1536, 1024), a.size
col = min((a.getpixel((x, y)) for x in range(75, 87) for y in range(600, 614)), key=sum)
S = 8; box = (84, 593, 96, 605); W, H = box[2] - box[0], box[3] - box[1]
m = Image.new("L", (W * S, H * S), 0); d = ImageDraw.Draw(m)
for ox in (0, 3.2):
    d.line([((4 + ox) * S, 4 * S), ((5.2 + ox) * S, 7.6 * S)], fill=255, width=int(1.7 * S))
m = m.resize((W, H), Image.LANCZOS)
reg = a.crop(box); reg.paste(Image.new("RGB", (W, H), col), (0, 0), m); a.paste(reg, box[:2])
a.save(sys.argv[2]); print("ok", col)
