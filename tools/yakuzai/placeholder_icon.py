#!/usr/bin/env python3
"""フリック薬剤師の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青緑の 地に 白と 黄色の カプセル。コードで 描く(AI の 絵に しない)
    python3 tools/yakuzai/placeholder_icon.py  → yakuzai/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/hanaya/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py yakuzai に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 青緑の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(30 - 20 * t), int(170 - 50 * t), int(170 - 30 * t)))
    # ななめの カプセル(半分 白・半分 黄色)。大きな 絵を 回して 重ねる
    C = Image.new("RGBA", (S, S), (0, 0, 0, 0)); c = ImageDraw.Draw(C)
    x0, x1, y0, y1 = S * .18, S * .82, S * .38, S * .62; r = (y1 - y0) / 2
    c.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=(255, 255, 255))
    c.pieslice([x0, y0, x0 + 2 * r, y1], 90, 270, fill=(255, 205, 60)); c.rectangle([x0 + r, y0, S * .50, y1], fill=(255, 205, 60))
    c.line([(S * .50, y0), (S * .50, y1)], fill=(20, 110, 120), width=S // 90)
    C = C.rotate(35, resample=Image.BICUBIC, center=(S / 2, S / 2))
    im.paste(C, (0, 0), C)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "yakuzai").mkdir(exist_ok=True)
draw(180).save(ROOT / "yakuzai/apple-touch-icon.png"); draw(512).save(ROOT / "yakuzai/icon-512.png"); draw(64).save(ROOT / "yakuzai/favicon.png")
draw(144).save(ROOT / "yakuzai/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
