#!/usr/bin/env python3
"""フリック血液型の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。赤の 地に 白い しずく。コードで 描く(AI の 絵に しない)
    python3 tools/ketsueki/placeholder_icon.py  → ketsueki/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/yakuzai/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py ketsueki に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 赤の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(230 - 40 * t), int(70 - 30 * t), int(110 - 30 * t)))
    W = (255, 255, 255)
    d.ellipse([S * .30, S * .40, S * .70, S * .80], fill=W)                   # しずくの まるい ところ
    d.polygon([(S * .50, S * .14), (S * .31, S * .55), (S * .69, S * .55)], fill=W)  # しずくの とがった ところ
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "ketsueki").mkdir(exist_ok=True)
draw(180).save(ROOT / "ketsueki/apple-touch-icon.png"); draw(512).save(ROOT / "ketsueki/icon-512.png"); draw(64).save(ROOT / "ketsueki/favicon.png")
draw(144).save(ROOT / "ketsueki/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
