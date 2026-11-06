#!/usr/bin/env python3
"""フリックネイリストの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。ピンクの 地に ネイルチップ 1つと 小さな ボトル。コードで 描く(AI の 絵に しない。手は 描かない)
    python3 tools/nail/placeholder_icon.py  → nail/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/kisho/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py nail に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S; d.line([(0, y), (S, y)], fill=(int(255 - 10 * t), int(222 - 40 * t), int(235 - 20 * t)))
    # ネイルチップ(上が まるい 形)
    d.rounded_rectangle([S * .20, S * .22, S * .54, S * .82], radius=S * .17, fill=(230, 73, 128))
    d.rectangle([S * .20, S * .60, S * .54, S * .82], fill=(230, 73, 128))
    d.ellipse([S * .26, S * .28, S * .34, S * .44], fill=(255, 200, 220))  # つや
    d.ellipse([S * .33, S * .62, S * .41, S * .70], fill=(255, 255, 255))  # ストーン
    # 小さな ボトル(ラベルなし)
    d.rounded_rectangle([S * .60, S * .50, S * .84, S * .84], radius=S * .05, fill=(194, 37, 92))
    d.rectangle([S * .66, S * .30, S * .78, S * .50], fill=(60, 50, 70))
    d.ellipse([S * .63, S * .56, S * .69, S * .70], fill=(240, 150, 185))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "nail").mkdir(exist_ok=True)
draw(180).save(ROOT / "nail/apple-touch-icon.png"); draw(512).save(ROOT / "nail/icon-512.png"); draw(64).save(ROOT / "nail/favicon.png")
draw(144).save(ROOT / "nail/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
