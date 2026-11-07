#!/usr/bin/env python3
"""フリック日商簿記の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。あかるい オレンジの 地に 帳簿(T字の 線)と 電卓。コードで 描く(AI の 絵に しない)
    python3 tools/boki/placeholder_icon.py  → boki/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    四角い 絵が 届いたら tools/icon_from_square.py boki に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(255, int(200 - 60 * t), int(120 - 60 * t)))
    d.rounded_rectangle([S * .14, S * .2, S * .66, S * .84], radius=S * .04, fill=(255, 252, 240))  # 帳簿
    d.rectangle([S * .14, S * .2, S * .2, S * .84], fill=(232, 89, 12))
    w = int(S * .018)
    d.line([(S * .25, S * .36), (S * .61, S * .36)], fill=(51, 65, 85), width=w)  # T字の 線
    d.line([(S * .43, S * .36), (S * .43, S * .76)], fill=(51, 65, 85), width=w)
    d.rounded_rectangle([S * .56, S * .48, S * .88, S * .9], radius=S * .03, fill=(28, 126, 214))  # 電卓
    d.rectangle([S * .6, S * .52, S * .84, S * .6], fill=(220, 240, 255))
    for r in range(3):
        for c in range(3):
            x, y = S * (.6 + c * .085), S * (.64 + r * .085)
            d.rounded_rectangle([x, y, x + S * .06, y + S * .06], radius=S * .01, fill=(255, 255, 255))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "boki").mkdir(exist_ok=True)
draw(180).save(ROOT / "boki/apple-touch-icon.png"); draw(512).save(ROOT / "boki/icon-512.png"); draw(64).save(ROOT / "boki/favicon.png")
draw(144).save(ROOT / "boki/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
