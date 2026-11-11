#!/usr/bin/env python3
"""フリック社労士の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。みどりの 空と 白い 会社の 建物と、手帳と 書類の マーク。コードで 描く(AI の 絵に しない)
    python3 tools/sharoshi/placeholder_icon.py  → sharoshi/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    ⚠️ 実在の 役所・年金機構の ロゴは 描かない。四角い 絵が 届いたら tools/icon_from_square.py sharoshi に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(200 - 60 * t), int(240 - 25 * t), int(205 - 20 * t)))
    d.rectangle([0, S * .76, S, S], fill=(120, 195, 120))
    d.rectangle([S * .12, S * .34, S * .6, S * .8], fill=(255, 255, 255))  # 会社の 建物
    for r in range(3):
        for c in range(3):
            d.rectangle([S * (.17 + c * .14), S * (.4 + r * .11), S * (.26 + c * .14), S * (.47 + r * .11)], fill=(165, 216, 255))
    d.rectangle([S * .31, S * .66, S * .41, S * .8], fill=(43, 138, 62))  # ドア
    # 手帳(緑)と 書類(白)
    d.rounded_rectangle([S * .56, S * .3, S * .9, S * .78], radius=S * .03, fill=(43, 138, 62))
    d.rounded_rectangle([S * .62, S * .38, S * .84, S * .5], radius=S * .015, fill=(255, 255, 255))
    for k in range(3):
        d.rectangle([S * .62, S * (.56 + k * .06), S * .84, S * (.585 + k * .06)], fill=(211, 249, 216))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "sharoshi").mkdir(exist_ok=True)
draw(180).save(ROOT / "sharoshi/apple-touch-icon.png"); draw(512).save(ROOT / "sharoshi/icon-512.png"); draw(64).save(ROOT / "sharoshi/favicon.png")
draw(144).save(ROOT / "sharoshi/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
