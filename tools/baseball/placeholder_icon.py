#!/usr/bin/env python3
"""フリックワールドベースボールの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。芝の 緑の 地に 白い 野球の ボール(赤い 縫い目)。コードで 描く(AI の 絵に しない)
    python3 tools/baseball/placeholder_icon.py  → baseball/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/soccer/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py baseball に 置きかえる"""
import math
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for k in range(8):  # 芝の しま
        d.rectangle([0, k * S / 8, S, (k + 1) * S / 8], fill=(46, 160, 67) if k % 2 else (38, 140, 58))
    W, K, R = (255, 255, 255), (60, 60, 60), (214, 40, 40)
    cx, cy, r = S * .5, S * .5, S * .32
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=W, outline=K, width=int(S * .012))
    for side in (-1, 1):  # 左右の 縫い目(弓の 形)と 赤い ステッチ
        ox = cx + side * r * 1.25; rr = r * .95
        pts = [(ox - side * rr * math.cos(t), cy + rr * math.sin(t)) for t in [(-0.62 + k * 1.24 / 40) for k in range(41)]]
        d.line(pts, fill=R, width=int(S * .014))
        for k in range(2, 39, 4):
            x, y = pts[k]; tx, ty = pts[k + 1][0] - pts[k - 1][0], pts[k + 1][1] - pts[k - 1][1]; L = math.hypot(tx, ty) or 1
            nx, ny = -ty / L, tx / L; s = S * .035
            d.line([(x - nx * s + tx / L * s * .5, y - ny * s + ty / L * s * .5), (x + nx * s - tx / L * s * .5, y + ny * s - ty / L * s * .5)], fill=R, width=int(S * .01))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "baseball").mkdir(exist_ok=True)
draw(180).save(ROOT / "baseball/apple-touch-icon.png"); draw(512).save(ROOT / "baseball/icon-512.png"); draw(64).save(ROOT / "baseball/favicon.png")
draw(144).save(ROOT / "baseball/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
