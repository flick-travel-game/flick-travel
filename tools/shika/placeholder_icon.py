#!/usr/bin/env python3
"""フリック歯科医師の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。水色の 地に 白い 歯。コードで 描く(AI の 絵に しない)
    python3 tools/shika/placeholder_icon.py  → shika/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/jui/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py shika に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 水色の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(70 - 30 * t), int(190 - 40 * t), int(230 - 30 * t)))
    W = (255, 255, 255)
    d.rounded_rectangle([S * .24, S * .20, S * .76, S * .60], radius=S * .16, fill=W)   # 歯の 頭
    d.polygon([(S * .26, S * .48), (S * .48, S * .48), (S * .40, S * .84), (S * .32, S * .84)], fill=W)  # 左の 根
    d.polygon([(S * .52, S * .48), (S * .74, S * .48), (S * .68, S * .84), (S * .60, S * .84)], fill=W)  # 右の 根
    d.ellipse([S * .30, S * .80, S * .42, S * .88], fill=W); d.ellipse([S * .58, S * .80, S * .70, S * .88], fill=W)
    d.ellipse([S * .34, S * .30, S * .42, S * .40], fill=(40, 150, 200)); d.ellipse([S * .58, S * .30, S * .66, S * .40], fill=(40, 150, 200))  # 目(笑顔の 歯)
    d.arc([S * .40, S * .34, S * .60, S * .50], 20, 160, fill=(40, 150, 200), width=int(S * .025))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "shika").mkdir(exist_ok=True)
draw(180).save(ROOT / "shika/apple-touch-icon.png"); draw(512).save(ROOT / "shika/icon-512.png"); draw(64).save(ROOT / "shika/favicon.png")
draw(144).save(ROOT / "shika/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
