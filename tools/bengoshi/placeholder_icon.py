#!/usr/bin/env python3
"""フリック弁護士の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。むらさきの 地に 白い 天びん。コードで 描く(AI の 絵に しない)
    python3 tools/bengoshi/placeholder_icon.py  → bengoshi/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の むらさきの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(138 - 50 * t), int(43 - 20 * t), int(224 - 60 * t)))
    w = S // 40; c = S // 2; W = (255, 255, 255)
    d.line([(c, S * .22), (c, S * .76)], fill=W, width=w)                 # はしら
    d.ellipse([c - w * 1.6, S * .2 - w * 1.6, c + w * 1.6, S * .2 + w * 1.6], fill=W)
    d.line([(S * .2, S * .3), (S * .8, S * .3)], fill=W, width=w)         # うで
    d.rounded_rectangle([S * .32, S * .74, S * .68, S * .8], radius=w, fill=W)  # 台
    for x in (S * .25, S * .75):                                            # 左右の 皿
        d.line([(S * .2 + (x - S * .25), S * .3), (x - S * .1, S * .55)], fill=W, width=w // 2)
        d.line([(S * .2 + (x - S * .25) + S * .1, S * .3), (x + S * .1, S * .55)], fill=W, width=w // 2)
        d.chord([x - S * .14, S * .45, x + S * .14, S * .65], 0, 180, fill=W)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "bengoshi").mkdir(exist_ok=True)
draw(180).save(ROOT / "bengoshi/apple-touch-icon.png"); draw(512).save(ROOT / "bengoshi/icon-512.png"); draw(64).save(ROOT / "bengoshi/favicon.png")
print("仮の アイコン OK")
