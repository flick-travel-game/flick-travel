#!/usr/bin/env python3
"""フリック養蜂家の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。はちみつ色の 地に 白い 六角形の 巣。コードで 描く(AI の 絵に しない)
    python3 tools/yoho/placeholder_icon.py  → yoho/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/jui/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py yoho に 置きかえる"""
import math
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def hexa(cx, cy, r): return [(cx + r * math.cos(math.radians(60 * k + 30)), cy + r * math.sin(math.radians(60 * k + 30))) for k in range(6)]
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の はちみつ色の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(252 - 20 * t), int(196 - 70 * t), int(40 - 20 * t)))
    W = (255, 255, 255); r = S * .14; dx = r * math.sqrt(3)
    for cx, cy in ((.5, .5), (.5 - dx / S, .5), (.5 + dx / S, .5), (.5 - dx / 2 / S, .5 - 1.5 * r / S), (.5 + dx / 2 / S, .5 - 1.5 * r / S),
                   (.5 - dx / 2 / S, .5 + 1.5 * r / S), (.5 + dx / 2 / S, .5 + 1.5 * r / S)):
        d.polygon(hexa(S * cx, S * cy, r * .9), fill=W)
    d.polygon(hexa(S * .5, S * .5, r * .9), fill=(255, 230, 120))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "yoho").mkdir(exist_ok=True)
draw(180).save(ROOT / "yoho/apple-touch-icon.png"); draw(512).save(ROOT / "yoho/icon-512.png"); draw(64).save(ROOT / "yoho/favicon.png")
draw(144).save(ROOT / "yoho/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
