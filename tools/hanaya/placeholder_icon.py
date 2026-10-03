#!/usr/bin/env python3
"""フリック花屋の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。ピンクの 地に 白い 花と 葉。コードで 描く(AI の 絵に しない)
    python3 tools/hanaya/placeholder_icon.py  → hanaya/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)
    もとは tools/noka/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py hanaya に 置きかえる"""
import math
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の ピンクの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(240 - 30 * t), int(110 - 40 * t), int(160 - 30 * t)))
    W = (255, 255, 255); w = S // 26
    d.line([(S * .50, S * .86), (S * .50, S * .52)], fill=W, width=w)                       # 茎
    d.ellipse([S * .22, S * .64, S * .49, S * .76], fill=W)                                 # 左の 葉
    d.ellipse([S * .51, S * .58, S * .78, S * .70], fill=W)                                 # 右の 葉
    cx, cy, r = S * .50, S * .36, S * .13
    for k in range(5):  # 花びら 5枚
        a = math.pi * 2 * k / 5 - math.pi / 2; x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        d.ellipse([x - r * .82, y - r * .82, x + r * .82, y + r * .82], fill=W)
    d.ellipse([cx - r * .55, cy - r * .55, cx + r * .55, cy + r * .55], fill=(255, 200, 60))  # まん中
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "hanaya").mkdir(exist_ok=True)
draw(180).save(ROOT / "hanaya/apple-touch-icon.png"); draw(512).save(ROOT / "hanaya/icon-512.png"); draw(64).save(ROOT / "hanaya/favicon.png")
print("仮の アイコン OK")
