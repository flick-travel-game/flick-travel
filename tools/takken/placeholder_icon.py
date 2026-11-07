#!/usr/bin/env python3
"""フリック宅建士の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青空と 小さな 家と 鍵。コードで 描く(AI の 絵に しない)
    python3 tools/takken/placeholder_icon.py  → takken/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    四角い 絵が 届いたら tools/icon_from_square.py takken に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(120 + 80 * t), int(200 + 30 * t), 255))
    d.rectangle([0, S * .72, S, S], fill=(120, 200, 110))
    d.polygon([(S * .18, S * .45), (S * .5, S * .18), (S * .82, S * .45)], fill=(224, 49, 49))  # 屋根
    d.rectangle([S * .25, S * .45, S * .75, S * .8], fill=(255, 248, 230))  # 家
    d.rectangle([S * .44, S * .58, S * .56, S * .8], fill=(28, 126, 214))  # ドア
    d.rectangle([S * .3, S * .52, S * .4, S * .62], fill=(191, 219, 254)); d.rectangle([S * .6, S * .52, S * .7, S * .62], fill=(191, 219, 254))
    d.ellipse([S * .62, S * .76, S * .76, S * .9], outline=(245, 159, 0), width=int(S * .025))  # 鍵
    d.rectangle([S * .75, S * .815, S * .92, S * .845], fill=(245, 159, 0)); d.rectangle([S * .86, S * .845, S * .885, S * .88], fill=(245, 159, 0))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "takken").mkdir(exist_ok=True)
draw(180).save(ROOT / "takken/apple-touch-icon.png"); draw(512).save(ROOT / "takken/icon-512.png"); draw(64).save(ROOT / "takken/favicon.png")
draw(144).save(ROOT / "takken/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
