#!/usr/bin/env python3
"""フリック衛生管理者の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。みどりの 空と 白い 職場の 建物と 盾の マーク。コードで 描く(AI の 絵に しない)
    python3 tools/eisei/placeholder_icon.py  → eisei/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    ⚠️ 赤十字(白い 地に 赤い 十字)は 描かない。四角い 絵が 届いたら tools/icon_from_square.py eisei に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(190 - 60 * t), int(235 - 20 * t), int(220 - 10 * t)))
    d.rectangle([0, S * .74, S, S], fill=(110, 190, 120))
    d.rectangle([S * .2, S * .36, S * .8, S * .78], fill=(255, 255, 255))  # 建物
    for r in range(3):
        for c in range(4):
            d.rectangle([S * (.26 + c * .13), S * (.42 + r * .11), S * (.34 + c * .13), S * (.49 + r * .11)], fill=(160, 215, 240))
    d.rectangle([S * .45, S * .64, S * .55, S * .78], fill=(12, 166, 120))  # ドア
    # 盾(緑)と 白い ハート(健康)
    d.polygon([(S * .68, S * .14), (S * .9, S * .2), (S * .88, S * .4), (S * .68, S * .5), (S * .48, S * .4), (S * .46, S * .2)], fill=(12, 166, 120))
    d.ellipse([S * .58, S * .22, S * .69, S * .33], fill=(255, 255, 255)); d.ellipse([S * .67, S * .22, S * .78, S * .33], fill=(255, 255, 255))
    d.polygon([(S * .585, S * .3), (S * .775, S * .3), (S * .68, S * .43)], fill=(255, 255, 255))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "eisei").mkdir(exist_ok=True)
draw(180).save(ROOT / "eisei/apple-touch-icon.png"); draw(512).save(ROOT / "eisei/icon-512.png"); draw(64).save(ROOT / "eisei/favicon.png")
draw(144).save(ROOT / "eisei/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
