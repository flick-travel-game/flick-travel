#!/usr/bin/env python3
"""フリック指圧師の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。みどりの 地に 白い 手と ツボの 点。コードで 描く(AI の 絵に しない)
    python3 tools/anma/placeholder_icon.py  → anma/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/shika/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py anma に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の みどりの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(40 - 20 * t), int(190 - 40 * t), int(140 - 30 * t)))
    W = (255, 255, 255)
    d.rounded_rectangle([S * .30, S * .44, S * .70, S * .84], radius=S * .12, fill=W)   # 手のひら
    for k, (x, top) in enumerate([(.31, .24), (.41, .18), (.51, .19), (.61, .25)]):    # 4本の 指
        d.rounded_rectangle([S * x, S * top, S * (x + .085), S * .56], radius=S * .045, fill=W)
    d.polygon([(S * .30, S * .60), (S * .18, S * .46), (S * .22, S * .41), (S * .36, S * .52)], fill=W)  # 親指
    d.ellipse([S * .18, S * .40, S * .25, S * .47], fill=W)
    d.ellipse([S * .455, S * .58, S * .545, S * .67], fill=(12, 166, 120))  # ツボの 点
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "anma").mkdir(exist_ok=True)
draw(180).save(ROOT / "anma/apple-touch-icon.png"); draw(512).save(ROOT / "anma/icon-512.png"); draw(64).save(ROOT / "anma/favicon.png")
draw(144).save(ROOT / "anma/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
