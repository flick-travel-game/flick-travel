#!/usr/bin/env python3
"""フリックスーパーカーの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。夕日の 赤い 空に チェッカーフラッグと タイヤ。コードで 描く(AI の 絵に しない)
    python3 tools/supercar/placeholder_icon.py  → supercar/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/cabin/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py supercar に 置きかえる。⚠️ 実在の 車の 形・ロゴ・エンブレムは 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 夕日の 空(上 赤 → 下 オレンジ)
        t = y / S; d.line([(0, y), (S, y)], fill=(int(214 + 30 * t), int(36 + 110 * t), int(48 - 10 * t)))
    d.rectangle([0, S * .74, S, S], fill=(40, 44, 52))  # サーキットの 路面
    for k in range(6): d.rectangle([S * (k / 6 + .02), S * .855, S * (k / 6 + .1), S * .875], fill=(255, 255, 255))  # 白線
    c = S * .07  # チェッカーフラッグ(左上)
    d.line([(S * .2, S * .1), (S * .2, S * .7)], fill=(255, 255, 255), width=int(S * .025))
    for i in range(4):
        for j in range(3):
            d.rectangle([S * .21 + i * c, S * .12 + j * c, S * .21 + (i + 1) * c, S * .12 + (j + 1) * c], fill=(20, 20, 24) if (i + j) % 2 else (255, 255, 255))
    cx, cy, r = S * .66, S * .56, S * .22  # タイヤと ホイール
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(24, 24, 28))
    d.ellipse([cx - r * .62, cy - r * .62, cx + r * .62, cy + r * .62], fill=(225, 228, 235))
    import math
    for k in range(5):
        a = k * 2 * math.pi / 5
        d.line([(cx, cy), (cx + math.cos(a) * r * .58, cy + math.sin(a) * r * .58)], fill=(150, 156, 168), width=int(S * .03))
    d.ellipse([cx - r * .14, cy - r * .14, cx + r * .14, cy + r * .14], fill=(224, 49, 49))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "supercar").mkdir(exist_ok=True)
draw(180).save(ROOT / "supercar/apple-touch-icon.png"); draw(512).save(ROOT / "supercar/icon-512.png"); draw(64).save(ROOT / "supercar/favicon.png")
draw(144).save(ROOT / "supercar/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
