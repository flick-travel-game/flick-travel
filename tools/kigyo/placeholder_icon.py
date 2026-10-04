#!/usr/bin/env python3
"""フリック起業家の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。オレンジの 地に 白い ロケットと 黄色い レモン。コードで 描く(AI の 絵に しない)
    python3 tools/kigyo/placeholder_icon.py  → kigyo/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/manner/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py kigyo に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の あたたかい オレンジの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(250 - 20 * t), int(120 - 45 * t), int(40 + 10 * t)))
    W = (255, 255, 255)
    d.polygon([(S * .38, S * .58), (S * .30, S * .74), (S * .42, S * .70)], fill=W)            # 左の 羽
    d.polygon([(S * .62, S * .58), (S * .70, S * .74), (S * .58, S * .70)], fill=W)            # 右の 羽
    d.ellipse([S * .38, S * .14, S * .62, S * .74], fill=W)                                    # ロケットの からだ
    d.ellipse([S * .44, S * .30, S * .56, S * .42], fill=(250, 120, 40))                       # 窓
    d.polygon([(S * .44, S * .73), (S * .56, S * .73), (S * .50, S * .88)], fill=(255, 214, 60))  # ほのお
    L = (255, 230, 60); d.ellipse([S * .66, S * .70, S * .90, S * .88], fill=L)                 # レモン
    d.ellipse([S * .86, S * .76, S * .93, S * .82], fill=L); d.ellipse([S * .63, S * .76, S * .70, S * .82], fill=L)
    d.ellipse([S * .74, S * .64, S * .84, S * .70], fill=(120, 200, 80))                       # 葉
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "kigyo").mkdir(exist_ok=True)
draw(180).save(ROOT / "kigyo/apple-touch-icon.png"); draw(512).save(ROOT / "kigyo/icon-512.png"); draw(64).save(ROOT / "kigyo/favicon.png")
draw(144).save(ROOT / "kigyo/logo-mark2.webp", "WEBP", quality=92, method=6)  # 題名の 左の 小さい しるし
print("仮の アイコン OK")
