#!/usr/bin/env python3
"""フリックメンタリストの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。夜空の 紫に シルクハットと 浮かぶ トランプと ?マーク。コードで 描く(AI の 絵に しない)
    python3 tools/mentalist/placeholder_icon.py  → mentalist/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/cabin/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py mentalist に 置きかえる。⚠️ 人の 顔・目・うずまきは 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 夜空(紫 → 夕やけ)
        t = y / S; d.line([(0, y), (S, y)], fill=(int(70 + 150 * t), int(40 + 60 * t), int(150 - 40 * t)))
    for (x, y, r) in [(.15, .15, .012), (.82, .12, .015), (.9, .35, .01), (.1, .4, .01), (.7, .25, .008)]:  # 星
        d.ellipse([S * (x - r), S * (y - r), S * (x + r), S * (y + r)], fill=(255, 240, 180))
    P = lambda pts: [(S * x, S * y) for x, y in pts]
    def card(cx, cy, ang_dx, col):  # 浮かぶ トランプ(白い カードに 赤 / 黒の しるし)
        d.polygon(P([(cx - .08 + ang_dx, cy - .11), (cx + .08 + ang_dx, cy - .1), (cx + .08 - ang_dx, cy + .11), (cx - .08 - ang_dx, cy + .1)]), fill=(255, 255, 255), outline=(60, 40, 90))
        d.ellipse([S * (cx - .025), S * (cy - .03), S * (cx + .025), S * (cy + .02)], fill=col)
    card(.22, .3, .015, (220, 40, 60)); card(.78, .28, -.015, (30, 30, 40)); card(.5, .17, 0, (220, 40, 60))
    d.rounded_rectangle([S * .3, S * .78, S * .7, S * .84], radius=S * .02, fill=(20, 18, 28))  # シルクハット(つば)
    d.rectangle([S * .37, S * .5, S * .63, S * .79], fill=(25, 22, 35))  # 帽子の 筒
    d.rectangle([S * .37, S * .7, S * .63, S * .75], fill=(150, 90, 230))  # リボン
    d.ellipse([S * .37, S * .47, S * .63, S * .53], fill=(40, 36, 55))
    w = int(S * .025)  # ?マーク(帽子の 上)
    d.arc([S * .43, S * .3, S * .57, S * .42], start=180, end=90, fill=(255, 214, 90), width=w)
    d.line([(S * .5, S * .42), (S * .5, S * .45)], fill=(255, 214, 90), width=w)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "mentalist").mkdir(exist_ok=True)
draw(180).save(ROOT / "mentalist/apple-touch-icon.png"); draw(512).save(ROOT / "mentalist/icon-512.png"); draw(64).save(ROOT / "mentalist/favicon.png")
draw(144).save(ROOT / "mentalist/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
