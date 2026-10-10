#!/usr/bin/env python3
"""フリック韓国語の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。空色の 地に 白い ふきだしと 韓服(ハンボク)の 色の 帯。コードで 描く(AI の 絵に しない)
    python3 tools/kankoku/placeholder_icon.py  → kankoku/icon-512.png・apple-touch-icon.png(180)・favicon.png(64)・logo-mark2.webp(144)
絵が 届いたら tools/kankoku/art/square-src.png に 置いて python3 tools/icon_from_square.py kankoku(この 台本は もう 使わない)"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(56 + 40 * t), int(170 - 40 * t), int(240 - 20 * t)))
    for i, c in enumerate([(230, 57, 70), (255, 183, 3), (46, 196, 182), (114, 9, 183), (247, 37, 133)]):  # 韓服の 色の 帯
        d.rectangle([0, S * (.84 + i * .032), S, S * (.84 + (i + 1) * .032)], fill=c)
    W = (255, 255, 255)
    d.rounded_rectangle([S * .14, S * .16, S * .86, S * .66], radius=S * .12, fill=W)
    d.polygon([(S * .3, S * .62), (S * .44, S * .62), (S * .26, S * .78)], fill=W)
    for k, x in enumerate((.34, .5, .66)):
        d.ellipse([S * x - S * .05, S * .36, S * x + S * .05, S * .46], fill=[(230, 57, 70), (11, 111, 184), (255, 183, 3)][k])
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "kankoku").mkdir(exist_ok=True)
draw(512).save(ROOT / "kankoku/icon-512.png"); draw(180).save(ROOT / "kankoku/apple-touch-icon.png"); draw(64).save(ROOT / "kankoku/favicon.png")
draw(144).save(ROOT / "kankoku/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
