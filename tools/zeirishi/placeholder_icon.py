#!/usr/bin/env python3
"""フリック税理士の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青みどりの 地に 白い レシート(帳簿の 紙)。コードで 描く(AI の 絵に しない)
    python3 tools/zeirishi/placeholder_icon.py  → zeirishi/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)
    もとは tools/bengoshi/placeholder_icon.py"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 青みどりの グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(10 + 10 * t), int(147 - 50 * t), int(150 - 40 * t)))
    W = (255, 255, 255); L, R, T, B = S * .27, S * .73, S * .16, S * .84
    zig = [(L, B)] + [(L + (R - L) * k / 8, B - (S * .04 if k % 2 else 0)) for k in range(1, 8)] + [(R, B)]
    d.polygon([(L, T), (R, T)] + zig[::-1], fill=W)                       # レシートの 紙(下は ぎざぎざ)
    c = (10, 120, 125); w = S // 60
    for k in range(4):                                                      # 帳簿の 行
        y = T + S * (.12 + .1 * k); d.line([(L + S * .06, y), (R - S * .06 - (S * .1 if k == 3 else 0), y)], fill=c, width=w)
    d.line([(L + S * .06, T + S * .53), (R - S * .06, T + S * .53)], fill=c, width=w * 2)   # 合計の 線
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "zeirishi").mkdir(exist_ok=True)
draw(180).save(ROOT / "zeirishi/apple-touch-icon.png"); draw(512).save(ROOT / "zeirishi/icon-512.png"); draw(64).save(ROOT / "zeirishi/favicon.png")
print("仮の アイコン OK")
