#!/usr/bin/env python3
"""フリック犬の気持ちの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。夕やけ色に 白い 犬の 顔と ピンクの ハート。コードで 描く(AI の 絵に しない)
    python3 tools/inu/placeholder_icon.py  → inu/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/mentalist/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py inu に 置きかえる。⚠️ 歯を むいた 顔は 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 夕やけ(オレンジ → もも色)
        t = y / S; d.line([(0, y), (S, y)], fill=(int(255 - 10 * t), int(190 - 70 * t), int(110 + 40 * t)))
    E = lambda x0, y0, x1, y1, c: d.ellipse([S * x0, S * y0, S * x1, S * y1], fill=c)
    W, B, P = (255, 255, 255), (60, 40, 30), (240, 90, 140)
    E(.14, .26, .36, .66, (245, 235, 225)); E(.64, .26, .86, .66, (245, 235, 225))  # たれ耳
    E(.24, .26, .76, .82, W)                                                          # 顔
    E(.36, .46, .44, .54, B); E(.56, .46, .64, .54, B)                                # やさしい 目
    E(.44, .58, .56, .66, B)                                                          # 鼻
    d.arc([S * .40, S * .60, S * .50, S * .72], start=20, end=160, fill=B, width=int(S * .012))   # にっこりの 口
    d.arc([S * .50, S * .60, S * .60, S * .72], start=20, end=160, fill=B, width=int(S * .012))
    E(.30, .60, .38, .66, (255, 190, 200)); E(.62, .60, .70, .66, (255, 190, 200))    # ほっぺ
    E(.70, .08, .80, .18, P); E(.78, .08, .88, .18, P); d.polygon([(S * .705, S * .15), (S * .875, S * .15), (S * .79, S * .27)], fill=P)  # ハート
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "inu").mkdir(exist_ok=True)
draw(180).save(ROOT / "inu/apple-touch-icon.png"); draw(512).save(ROOT / "inu/icon-512.png"); draw(64).save(ROOT / "inu/favicon.png")
draw(144).save(ROOT / "inu/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
