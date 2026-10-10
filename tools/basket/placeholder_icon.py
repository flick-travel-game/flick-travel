#!/usr/bin/env python3
"""フリックワールドバスケットボールの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。木の 床の 地に オレンジの ボール。コードで 描く(AI の 絵に しない)
    python3 tools/basket/placeholder_icon.py  → basket/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/soccer/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py basket に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for k in range(8):  # 木の 床の 板
        d.rectangle([k * S / 8, 0, (k + 1) * S / 8, S], fill=(214, 160, 98) if k % 2 else (199, 145, 84))
    K = (40, 25, 15)
    cx, cy, r = S * .5, S * .5, S * .34
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(240, 120, 30), outline=K, width=int(S * .016))
    w = int(S * .014)
    d.line([(cx - r, cy), (cx + r, cy)], fill=K, width=w)  # よこの 線
    d.line([(cx, cy - r), (cx, cy + r)], fill=K, width=w)  # たての 線
    d.arc([cx - r * 1.55, cy - r, cx - r * .45, cy + r], -55, 55, fill=K, width=w)   # 左の カーブ
    d.arc([cx + r * .45, cy - r, cx + r * 1.55, cy + r], 125, 235, fill=K, width=w)  # 右の カーブ
    bg = Image.new("RGB", (S, S)); bd = ImageDraw.Draw(bg)  # ボールの 外に はみ出した 線を 消す
    for k in range(8): bd.rectangle([k * S / 8, 0, (k + 1) * S / 8, S], fill=(214, 160, 98) if k % 2 else (199, 145, 84))
    m = Image.new("L", (S, S), 0); ImageDraw.Draw(m).ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)
    im = Image.composite(im, bg, m); ImageDraw.Draw(im).ellipse([cx - r, cy - r, cx + r, cy + r], outline=K, width=int(S * .016))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "basket").mkdir(exist_ok=True)
draw(180).save(ROOT / "basket/apple-touch-icon.png"); draw(512).save(ROOT / "basket/icon-512.png"); draw(64).save(ROOT / "basket/favicon.png")
draw(144).save(ROOT / "basket/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
