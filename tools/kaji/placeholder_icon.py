#!/usr/bin/env python3
"""フリック家事の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。あたたかい オレンジの 地に 白い 家と ピンクの ハート。コードで 描く(AI の 絵に しない)
    python3 tools/kaji/placeholder_icon.py  → kaji/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/daiku/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py kaji に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の あたたかい オレンジの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(255 - 10 * t), int(169 - 50 * t), int(77 - 30 * t)))
    W = (255, 255, 255)
    d.polygon([(S * .16, S * .48), (S * .50, S * .18), (S * .84, S * .48)], fill=W)                      # 屋根
    d.rectangle([S * .25, S * .46, S * .75, S * .82], fill=W)                                          # 家
    P = (240, 101, 149); cx, cy, r = S * .50, S * .60, S * .085                                          # ハート
    d.ellipse([cx - 2 * r, cy - r, cx, cy + r], fill=P); d.ellipse([cx, cy - r, cx + 2 * r, cy + r], fill=P)
    d.polygon([(cx - 1.93 * r, cy + .3 * r), (cx + 1.93 * r, cy + .3 * r), (cx, cy + 2.3 * r)], fill=P)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "kaji").mkdir(exist_ok=True)
draw(180).save(ROOT / "kaji/apple-touch-icon.png"); draw(512).save(ROOT / "kaji/icon-512.png"); draw(64).save(ROOT / "kaji/favicon.png")
draw(144).save(ROOT / "kaji/logo-mark2.webp", "WEBP", quality=92, method=6)  # 題名の 左の 小さい しるし
print("仮の アイコン OK")
