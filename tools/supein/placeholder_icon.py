#!/usr/bin/env python3
"""フリックスペイン語の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。赤と 黄色の 地に 白い ふきだし。コードで 描く(AI の 絵に しない)
    python3 tools/supein/placeholder_icon.py  → supein/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    四角い 絵が 届いたら tools/icon_from_square.py supein に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S), (198, 11, 30)); d = ImageDraw.Draw(im)
    d.rectangle([0, S * .25, S, S * .75], fill=(255, 196, 0))
    W = (255, 255, 255); R = (198, 11, 30)
    d.rounded_rectangle([S * .17, S * .26, S * .83, S * .66], radius=S * .1, fill=W, outline=R, width=int(S * .02))
    d.polygon([(S * .32, S * .64), (S * .28, S * .80), (S * .46, S * .64)], fill=W)
    for k, x in enumerate((.36, .5, .64)):  # ふきだしの 中の 3つの 点
        d.ellipse([S * x - S * .045, S * .46 - S * .045, S * x + S * .045, S * .46 + S * .045], fill=R if k != 1 else (255, 160, 0))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "supein").mkdir(exist_ok=True)
draw(180).save(ROOT / "supein/apple-touch-icon.png"); draw(512).save(ROOT / "supein/icon-512.png"); draw(64).save(ROOT / "supein/favicon.png")
draw(144).save(ROOT / "supein/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
