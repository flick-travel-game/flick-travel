#!/usr/bin/env python3
"""フリックワールドサッカーの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。芝の 緑の 地に 白い ボール。コードで 描く(AI の 絵に しない)
    python3 tools/soccer/placeholder_icon.py  → soccer/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/shika/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py soccer に 置きかえる"""
import math
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for k in range(8):  # 芝の しま
        d.rectangle([0, k * S / 8, S, (k + 1) * S / 8], fill=(46, 160, 67) if k % 2 else (38, 140, 58))
    W, K = (255, 255, 255), (30, 30, 30)
    cx, cy, r = S * .5, S * .5, S * .32
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=W, outline=K, width=int(S * .015))
    pent = lambda x, y, rr, rot: [(x + rr * math.cos(rot + k * 2 * math.pi / 5), y + rr * math.sin(rot + k * 2 * math.pi / 5)) for k in range(5)]
    d.polygon(pent(cx, cy, r * .32, -math.pi / 2), fill=K)  # まん中の 黒い 五角形
    for k in range(5):  # まわりの 五角形(ふちで 半分 かくれる)
        a = -math.pi / 2 + k * 2 * math.pi / 5
        x, y = cx + r * .85 * math.cos(a), cy + r * .85 * math.sin(a)
        d.polygon(pent(x, y, r * .26, a + math.pi), fill=K)
        d.line([(cx + r * .32 * math.cos(a), cy + r * .32 * math.sin(a)), (x - r * .26 * math.cos(a), y - r * .26 * math.sin(a))], fill=K, width=int(S * .012))
    m = Image.new("L", (S, S), 0); ImageDraw.Draw(m).ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)  # ボールの 外に はみ出した 五角形を 消す
    bg = Image.new("RGB", (S, S)); bd = ImageDraw.Draw(bg)
    for k in range(8): bd.rectangle([0, k * S / 8, S, (k + 1) * S / 8], fill=(46, 160, 67) if k % 2 else (38, 140, 58))
    im = Image.composite(im, bg, m); d = ImageDraw.Draw(im)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=K, width=int(S * .015))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "soccer").mkdir(exist_ok=True)
draw(180).save(ROOT / "soccer/apple-touch-icon.png"); draw(512).save(ROOT / "soccer/icon-512.png"); draw(64).save(ROOT / "soccer/favicon.png")
draw(144).save(ROOT / "soccer/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
