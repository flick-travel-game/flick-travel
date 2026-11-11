#!/usr/bin/env python3
"""フリックITパスポートの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青い 空と ノートパソコンと 鍵の 盾。コードで 描く(AI の 絵に しない・実在の ロゴを 描かない)
    python3 tools/itpass/placeholder_icon.py  → itpass/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    四角い 絵が 届いたら tools/icon_from_square.py itpass に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(165 - 120 * t), int(216 - 120 * t), int(255 - 80 * t)))
    # ネットワークの 線と 点
    pts = [(.12, .2), (.32, .1), (.55, .18), (.2, .4)]
    for a in pts:
        for b in pts:
            d.line([(S * a[0], S * a[1]), (S * b[0], S * b[1])], fill=(255, 255, 255), width=max(1, S // 160))
    for x, y in pts: d.ellipse([S * (x - .025), S * (y - .025), S * (x + .025), S * (y + .025)], fill=(255, 255, 255))
    # ノートパソコン
    d.rounded_rectangle([S * .16, S * .46, S * .72, S * .80], radius=S * .03, fill=(240, 244, 248))
    d.rectangle([S * .20, S * .50, S * .68, S * .76], fill=(24, 100, 171))
    for r in range(3): d.rectangle([S * .25, S * (.55 + r * .065), S * (.25 + .3 - r * .07), S * (.58 + r * .065)], fill=(208, 235, 255))
    d.polygon([(S * .08, S * .80), (S * .80, S * .80), (S * .86, S * .87), (S * .02, S * .87)], fill=(206, 212, 218))
    # 鍵の 盾(セキュリティ)
    d.polygon([(S * .76, S * .30), (S * .94, S * .36), (S * .92, S * .56), (S * .76, S * .66), (S * .60, S * .56), (S * .58, S * .36)], fill=(255, 212, 59))
    d.ellipse([S * .70, S * .38, S * .82, S * .50], fill=(24, 100, 171)); d.rectangle([S * .745, S * .47, S * .775, S * .60], fill=(24, 100, 171))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "itpass").mkdir(exist_ok=True)
draw(180).save(ROOT / "itpass/apple-touch-icon.png"); draw(512).save(ROOT / "itpass/icon-512.png"); draw(64).save(ROOT / "itpass/favicon.png")
draw(144).save(ROOT / "itpass/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
