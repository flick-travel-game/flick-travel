#!/usr/bin/env python3
"""フリック獣医師の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青の 地に 白い 肉球。コードで 描く(AI の 絵に しない)
    python3 tools/jui/placeholder_icon.py  → jui/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/yakuzai/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py jui に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 青の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(60 - 30 * t), int(150 - 40 * t), int(235 - 35 * t)))
    W = (255, 255, 255)
    d.ellipse([S * .30, S * .48, S * .70, S * .82], fill=W)                 # 大きな 肉球
    for cx, cy in ((.22, .40), (.38, .25), (.62, .25), (.78, .40)):        # 4つの 指の 肉球
        d.ellipse([S * (cx - .085), S * (cy - .10), S * (cx + .085), S * (cy + .10)], fill=W)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "jui").mkdir(exist_ok=True)
draw(180).save(ROOT / "jui/apple-touch-icon.png"); draw(512).save(ROOT / "jui/icon-512.png"); draw(64).save(ROOT / "jui/favicon.png")
draw(144).save(ROOT / "jui/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
