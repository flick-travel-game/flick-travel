#!/usr/bin/env python3
"""フリックワールドバレーボールの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青い 空の 地に 黄色と 青の バレーボール。コードで 描く(AI の 絵に しない)
    python3 tools/volley/placeholder_icon.py  → volley/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/basket/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py volley に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S), (34, 139, 230)); d = ImageDraw.Draw(im)
    for k in range(S):  # 上から 下へ 少し あかるく
        t = k / S; d.line([(0, k), (S, k)], fill=(int(34 + 80 * t), int(139 + 60 * t), int(230 + 20 * t)))
    K = (20, 40, 80); cx, cy, r = S * .5, S * .5, S * .34
    ball = Image.new("RGB", (S, S), (255, 212, 59)); bd = ImageDraw.Draw(ball)
    B = (25, 113, 194); w = int(S * .02)
    # 青い 帯 3本(大きな 円の 一部を 太く 描いて ボールで 切りぬく = バレーボールの うずまきの 面)
    for (ox, oy) in ((-.95, -.15), (.55, -.85), (.45, .95)):
        R = r * 1.25; X, Y = cx + r * ox, cy + r * oy
        bd.ellipse([X - R, Y - R, X + R, Y + R], outline=B, width=int(r * .34))
        bd.ellipse([X - R - r * .17, Y - R - r * .17, X + R + r * .17, Y + R + r * .17], outline=K, width=w)
        bd.ellipse([X - R + r * .17, Y - R + r * .17, X + R - r * .17, Y + R - r * .17], outline=K, width=w)
    m = Image.new("L", (S, S), 0); ImageDraw.Draw(m).ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)
    im = Image.composite(ball, im, m); ImageDraw.Draw(im).ellipse([cx - r, cy - r, cx + r, cy + r], outline=K, width=int(S * .018))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "volley").mkdir(exist_ok=True)
draw(180).save(ROOT / "volley/apple-touch-icon.png"); draw(512).save(ROOT / "volley/icon-512.png"); draw(64).save(ROOT / "volley/favicon.png")
draw(144).save(ROOT / "volley/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
