#!/usr/bin/env python3
"""フリック心理学の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。空色から 青の 地に、白い 雲の ような 頭の 形と ピンクの ハート。コードで 描く(AI の 絵に しない)
    python3 tools/shinri/placeholder_icon.py  → shinri/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/tetsugaku/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py shinri に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 空色 → 青の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(120 - 80 * t), int(190 - 80 * t), int(250 - 40 * t)))
    for (x, y, r) in [(.16, .18, .012), (.84, .16, .009), (.88, .42, .007), (.12, .60, .008)]:  # きらきら
        d.ellipse([S * (x - r), S * (y - r), S * (x + r), S * (y + r)], fill=(255, 240, 170))
    for (x, y, r) in [(.36, .40, .17), (.52, .32, .19), (.67, .42, .16), (.44, .55, .17), (.62, .56, .15)]:  # 雲の ような 頭の 形
        d.ellipse([S * (x - r), S * (y - r), S * (x + r), S * (y + r)], fill=(255, 255, 255))
    d.rectangle([S * .44, S * .62, S * .58, S * .80], fill=(255, 255, 255))  # 首
    cx, cy, r = S * .52, S * .47, S * .075  # ハート
    d.ellipse([cx - 2 * r, cy - r, cx, cy + r], fill=(255, 92, 140)); d.ellipse([cx, cy - r, cx + 2 * r, cy + r], fill=(255, 92, 140))
    d.polygon([(cx - 1.95 * r, cy + .25 * r), (cx + 1.95 * r, cy + .25 * r), (cx, cy + 2.2 * r)], fill=(255, 92, 140))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "shinri").mkdir(exist_ok=True)
draw(180).save(ROOT / "shinri/apple-touch-icon.png"); draw(512).save(ROOT / "shinri/icon-512.png"); draw(64).save(ROOT / "shinri/favicon.png")
draw(144).save(ROOT / "shinri/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
