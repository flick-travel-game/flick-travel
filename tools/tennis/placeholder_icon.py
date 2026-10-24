#!/usr/bin/env python3
"""フリックワールドテニスの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。緑の コートの 地に 黄色い テニスボール。コードで 描く(AI の 絵に しない)
    python3 tools/tennis/placeholder_icon.py  → tennis/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/volley/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py tennis に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S), (43, 138, 62)); d = ImageDraw.Draw(im)
    for k in range(S):  # 上から 下へ 少し あかるく
        t = k / S; d.line([(0, k), (S, k)], fill=(int(43 + 40 * t), int(138 + 50 * t), int(62 + 30 * t)))
    W = (255, 255, 255); lw = int(S * .018)
    d.line([(S * .08, S * .82), (S * .92, S * .82)], fill=W, width=lw)  # コートの 白い 線
    d.line([(S * .5, S * .82), (S * .5, S * .95)], fill=W, width=lw)
    cx, cy, r = S * .5, S * .45, S * .32
    ball = Image.new("RGB", (S, S), (216, 232, 54)); bd = ImageDraw.Draw(ball)
    sw = int(S * .028)
    bd.ellipse([cx - r * 1.75, cy - r * .9, cx - r * .15, cy + r * .9], outline=W, width=sw)  # ボールの 白い ぬいめ(左右の 弧)
    bd.ellipse([cx + r * .15, cy - r * .9, cx + r * 1.75, cy + r * .9], outline=W, width=sw)
    m = Image.new("L", (S, S), 0); ImageDraw.Draw(m).ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)
    im = Image.composite(ball, im, m); ImageDraw.Draw(im).ellipse([cx - r, cy - r, cx + r, cy + r], outline=(30, 70, 30), width=int(S * .012))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "tennis").mkdir(exist_ok=True)
draw(180).save(ROOT / "tennis/apple-touch-icon.png"); draw(512).save(ROOT / "tennis/icon-512.png"); draw(64).save(ROOT / "tennis/favicon.png")
draw(144).save(ROOT / "tennis/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
