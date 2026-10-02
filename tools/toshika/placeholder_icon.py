#!/usr/bin/env python3
"""フリック投資家の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。みどりの 地に 白い 双葉(長く 育てる 芽)。コードで 描く(AI の 絵に しない)
    python3 tools/toshika/placeholder_icon.py  → toshika/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)
    もとは tools/zeirishi/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py toshika に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の みどりの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(60 - 30 * t), int(170 - 60 * t), int(80 - 20 * t)))
    W = (255, 255, 255); w = S // 22
    d.rectangle([S * .48, S * .45, S * .52, S * .80], fill=W)                  # くき
    d.ellipse([S * .18, S * .28, S * .50, S * .50], fill=W)                    # 左の 葉
    d.ellipse([S * .50, S * .20, S * .84, S * .44], fill=W)                    # 右の 葉
    d.rounded_rectangle([S * .26, S * .78, S * .74, S * .84], radius=w, fill=W)  # 地面
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "toshika").mkdir(exist_ok=True)
draw(180).save(ROOT / "toshika/apple-touch-icon.png"); draw(512).save(ROOT / "toshika/icon-512.png"); draw(64).save(ROOT / "toshika/favicon.png")
print("仮の アイコン OK")
