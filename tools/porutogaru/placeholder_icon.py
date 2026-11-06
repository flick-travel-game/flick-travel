#!/usr/bin/env python3
"""フリックポルトガル語の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。緑と 黄色の 地に 白い ふきだし。コードで 描く(AI の 絵に しない・国旗の 形に しない)
    python3 tools/porutogaru/placeholder_icon.py  → porutogaru/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    四角い 絵が 届いたら tools/icon_from_square.py porutogaru に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; G = (0, 156, 59); Y = (255, 205, 0); W = (255, 255, 255); B = (0, 39, 118)
    im = Image.new("RGB", (S, S), G); d = ImageDraw.Draw(im)
    d.ellipse([S * .1, S * .1, S * .9, S * .9], fill=Y)
    d.rounded_rectangle([S * .2, S * .28, S * .8, S * .66], radius=S * .1, fill=W, outline=B, width=int(S * .02))
    d.polygon([(S * .34, S * .64), (S * .30, S * .80), (S * .48, S * .64)], fill=W)
    for k, x in enumerate((.37, .5, .63)):  # ふきだしの 中の 3つの 点
        d.ellipse([S * x - S * .045, S * .47 - S * .045, S * x + S * .045, S * .47 + S * .045], fill=G if k != 1 else B)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "porutogaru").mkdir(exist_ok=True)
draw(180).save(ROOT / "porutogaru/apple-touch-icon.png"); draw(512).save(ROOT / "porutogaru/icon-512.png"); draw(64).save(ROOT / "porutogaru/favicon.png")
draw(144).save(ROOT / "porutogaru/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
