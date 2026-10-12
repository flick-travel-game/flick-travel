#!/usr/bin/env python3
"""フリック映画評論家の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。赤い 地に 白と 黒の カチンコ と 星。コードで 描く(AI の 絵に しない)
    python3 tools/eiga/placeholder_icon.py  → eiga/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/boxing/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py eiga に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S), (201, 42, 42)); d = ImageDraw.Draw(im)
    K, W = (30, 30, 36), (255, 255, 255)
    d.rounded_rectangle([S * .18, S * .42, S * .82, S * .80], radius=int(S * .04), fill=K)  # 板
    d.rectangle([S * .18, S * .42, S * .82, S * .5], fill=W)  # 板の 上の 帯
    for k in range(4):  # 帯の しま
        x = S * (.2 + k * .16); d.polygon([(x, S * .42), (x + S * .08, S * .42), (x + S * .04, S * .5), (x - S * .04, S * .5)], fill=K)
    # 上の 棒(少し ひらいた)
    d.polygon([(S * .18, S * .38), (S * .80, S * .22), (S * .82, S * .30), (S * .20, S * .46)], fill=W)
    for k in range(4):
        t = .1 + k * .24; x0, y0 = S * (.18 + .62 * t), S * (.38 - .16 * t)
        d.polygon([(x0, y0), (x0 + S * .07, y0 - S * .018), (x0 + S * .1, y0 + S * .06), (x0 + S * .03, y0 + S * .078)], fill=K)
    d.rectangle([S * .26, S * .6, S * .74, S * .62], fill=(90, 90, 100)); d.rectangle([S * .26, S * .68, S * .6, S * .7], fill=(90, 90, 100))
    d.regular_polygon((S * .78, S * .16, S * .07), 5, rotation=0, fill=(255, 212, 59))  # 星
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "eiga").mkdir(exist_ok=True)
draw(180).save(ROOT / "eiga/apple-touch-icon.png"); draw(512).save(ROOT / "eiga/icon-512.png"); draw(64).save(ROOT / "eiga/favicon.png")
draw(144).save(ROOT / "eiga/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
