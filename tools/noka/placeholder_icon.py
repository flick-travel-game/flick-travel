#!/usr/bin/env python3
"""フリック農家の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。緑の 地に 白い 芽と 畑の 畝。コードで 描く(AI の 絵に しない)
    python3 tools/noka/placeholder_icon.py  → noka/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)
    もとは tools/daiku/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py noka に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 緑の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(90 - 50 * t), int(190 - 60 * t), int(80 - 30 * t)))
    W = (255, 255, 255); w = S // 26
    for k, y in enumerate((.70, .78, .86)):  # 畑の 畝(3本)
        d.rounded_rectangle([S * (.14 + k * .03), S * y, S * (.86 - k * .03), S * y + w], radius=w // 2, fill=W)
    d.line([(S * .50, S * .66), (S * .50, S * .40)], fill=W, width=w)                       # 茎
    d.ellipse([S * .20, S * .33, S * .51, S * .47], fill=W)                                 # 左の 葉
    d.ellipse([S * .49, S * .26, S * .80, S * .40], fill=W)                                 # 右の 葉
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "noka").mkdir(exist_ok=True)
draw(180).save(ROOT / "noka/apple-touch-icon.png"); draw(512).save(ROOT / "noka/icon-512.png"); draw(64).save(ROOT / "noka/favicon.png")
print("仮の アイコン OK")
