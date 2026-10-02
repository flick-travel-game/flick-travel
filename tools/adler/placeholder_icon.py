#!/usr/bin/env python3
"""フリックアドラー心理学の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。むらさきの 地に、横に ならんで 同じ 床に 立つ 白い ふたり(横の 関係)。コードで 描く(AI の 絵に しない)
    python3 tools/adler/placeholder_icon.py  → adler/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)
    もとは tools/zeirishi/placeholder_icon.py"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の むらさきの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(112 - 40 * t), int(72 - 30 * t), int(232 - 60 * t)))
    W = (255, 255, 255); r = S * .1
    for cx in (S * .32, S * .68):                                           # 横に ならんだ ふたり(同じ 高さ = 横の 関係)
        d.ellipse([cx - r, S * .34 - r, cx + r, S * .34 + r], fill=W)
        d.pieslice([cx - r * 1.55, S * .5, cx + r * 1.55, S * .5 + r * 3.1], 180, 360, fill=W)
    d.rectangle([S * .32, S * .7, S * .68, S * .7 + S // 30], fill=W)       # 同じ 床に 立つ(横の 線)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "adler").mkdir(exist_ok=True)
draw(180).save(ROOT / "adler/apple-touch-icon.png"); draw(512).save(ROOT / "adler/icon-512.png"); draw(64).save(ROOT / "adler/favicon.png")
print("仮の アイコン OK")
