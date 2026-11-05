#!/usr/bin/env python3
"""フリック自動車運転免許の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青空と 道と 小さな 車と 信号。コードで 描く(AI の 絵に しない)
    python3 tools/menkyo/placeholder_icon.py  → menkyo/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    四角い 絵が 届いたら tools/icon_from_square.py menkyo に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(120 + 80 * t), int(200 + 30 * t), 255))
    d.rectangle([0, S * .62, S, S], fill=(120, 200, 110))
    d.polygon([(S * .38, S * .62), (S * .62, S * .62), (S * .9, S), (S * .1, S)], fill=(95, 100, 110))
    for k in range(3): y0 = .66 + k * .11; d.rectangle([S * .49, S * y0, S * .51, S * (y0 + .06)], fill=(250, 250, 250))
    d.rounded_rectangle([S * .3, S * .7, S * .7, S * .9], radius=S * .04, fill=(37, 99, 235))  # 車
    d.rounded_rectangle([S * .36, S * .64, S * .64, S * .74], radius=S * .03, fill=(37, 99, 235))
    d.rectangle([S * .39, S * .66, S * .61, S * .72], fill=(191, 219, 254))
    for x in (.36, .64): d.ellipse([S * (x - .05), S * .86, S * (x + .05), S * .96], fill=(30, 30, 30))
    d.rectangle([S * .74, S * .2, S * .77, S * .62], fill=(80, 80, 90))  # 信号
    d.rounded_rectangle([S * .66, S * .1, S * .94, S * .24], radius=S * .03, fill=(40, 40, 50))
    for i, c in enumerate([(34, 197, 94), (90, 90, 90), (90, 90, 90)]):
        x = .71 + i * .09; d.ellipse([S * (x - .035), S * .135, S * (x + .035), S * .205], fill=c)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "menkyo").mkdir(exist_ok=True)
draw(180).save(ROOT / "menkyo/apple-touch-icon.png"); draw(512).save(ROOT / "menkyo/icon-512.png"); draw(64).save(ROOT / "menkyo/favicon.png")
draw(144).save(ROOT / "menkyo/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
