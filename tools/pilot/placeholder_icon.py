#!/usr/bin/env python3
"""フリックパイロットの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。空色の 地に 白い 雲と 白い 飛行機(上から 見た 形)。コードで 描く(AI の 絵に しない)
    python3 tools/pilot/placeholder_icon.py  → pilot/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/shinri/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py pilot に 置きかえる。⚠️ 実在の 会社の 塗り分けは 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 青 → 空色の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(40 + 90 * t), int(120 + 80 * t), int(230 + 20 * t)))
    for (x, y, r) in [(.14, .90, .10), (.28, .92, .12), (.84, .88, .08), (.70, .22, .07), (.80, .20, .09)]:  # 雲
        d.ellipse([S * (x - r), S * (y - r * .7), S * (x + r), S * (y + r * .7)], fill=(255, 255, 255))
    P = lambda pts: [(S * x, S * y) for x, y in pts]
    W = (255, 255, 255)
    d.polygon(P([(.5, .10), (.545, .20), (.545, .70), (.5, .86), (.455, .70), (.455, .20)]), fill=W)  # 胴体
    d.polygon(P([(.455, .38), (.10, .55), (.10, .60), (.455, .52)]), fill=W); d.polygon(P([(.545, .38), (.90, .55), (.90, .60), (.545, .52)]), fill=W)  # 主翼
    d.polygon(P([(.46, .74), (.32, .82), (.32, .85), (.47, .81)]), fill=W); d.polygon(P([(.54, .74), (.68, .82), (.68, .85), (.53, .81)]), fill=W)  # 水平尾翼
    d.ellipse([S * .475, S * .16, S * .525, S * .22], fill=(120, 190, 255))  # 操縦席の 窓
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "pilot").mkdir(exist_ok=True)
draw(180).save(ROOT / "pilot/apple-touch-icon.png"); draw(512).save(ROOT / "pilot/icon-512.png"); draw(64).save(ROOT / "pilot/favicon.png")
draw(144).save(ROOT / "pilot/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
