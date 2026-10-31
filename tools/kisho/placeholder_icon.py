#!/usr/bin/env python3
"""フリック気象予報士の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青空に 太陽と 白い 雲と 小さな 雨つぶ。コードで 描く(AI の 絵に しない)
    python3 tools/kisho/placeholder_icon.py  → kisho/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/pilot/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py kisho に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(30 + 110 * t), int(120 + 90 * t), int(225 + 25 * t)))
    d.ellipse([S * .52, S * .12, S * .88, S * .48], fill=(255, 200, 40))  # 太陽
    for (x, y, r) in [(.30, .55, .17), (.48, .48, .19), (.66, .56, .16), (.47, .60, .2)]:  # 雲
        d.ellipse([S * (x - r), S * (y - r * .8), S * (x + r), S * (y + r * .8)], fill=(255, 255, 255))
    for (x, y) in [(.32, .80), (.46, .84), (.60, .80)]:  # 雨つぶ
        d.polygon([(S * x, S * (y - .06)), (S * (x - .03), S * (y + .01)), (S * (x + .03), S * (y + .01))], fill=(80, 170, 255))
        d.ellipse([S * (x - .03), S * (y - .02), S * (x + .03), S * (y + .04)], fill=(80, 170, 255))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "kisho").mkdir(exist_ok=True)
draw(180).save(ROOT / "kisho/apple-touch-icon.png"); draw(512).save(ROOT / "kisho/icon-512.png"); draw(64).save(ROOT / "kisho/favicon.png")
draw(144).save(ROOT / "kisho/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
