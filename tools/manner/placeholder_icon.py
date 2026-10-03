#!/usr/bin/env python3
"""フリックマナーの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。あたたかい オレンジの 地に 白い 人が おじぎ する 形。コードで 描く(AI の 絵に しない)
    python3 tools/manner/placeholder_icon.py  → manner/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/kaji/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py manner に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の あたたかい オレンジの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(255 - 15 * t), int(146 - 50 * t), int(43 + 10 * t)))
    W = (255, 255, 255); w = int(S * .085)
    d.line([(S * .44, S * .84), (S * .47, S * .58)], fill=W, width=w); d.line([(S * .56, S * .84), (S * .53, S * .58)], fill=W, width=w)  # 足
    d.line([(S * .50, S * .58), (S * .68, S * .34)], fill=W, width=int(S * .13))                                                      # おじぎ する からだ
    d.ellipse([S * .68, S * .20, S * .84, S * .36], fill=W)                                                                             # 頭
    P = (255, 214, 102); cx, cy, r = S * .80, S * .58, S * .065                                                                         # ハート(思いやり)
    d.ellipse([cx - 2 * r, cy - r, cx, cy + r], fill=P); d.ellipse([cx, cy - r, cx + 2 * r, cy + r], fill=P)
    d.polygon([(cx - 1.93 * r, cy + .3 * r), (cx + 1.93 * r, cy + .3 * r), (cx, cy + 2.3 * r)], fill=P)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "manner").mkdir(exist_ok=True)
draw(180).save(ROOT / "manner/apple-touch-icon.png"); draw(512).save(ROOT / "manner/icon-512.png"); draw(64).save(ROOT / "manner/favicon.png")
draw(144).save(ROOT / "manner/logo-mark2.webp", "WEBP", quality=92, method=6)  # 題名の 左の 小さい しるし
print("仮の アイコン OK")
