#!/usr/bin/env python3
"""フリック大工の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。木の 色の 地に 白い 家の 骨組み(柱・梁・屋根)。コードで 描く(AI の 絵に しない)
    python3 tools/daiku/placeholder_icon.py  → daiku/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)
    もとは tools/toshika/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py daiku に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 木の 色の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(205 - 50 * t), int(125 - 40 * t), int(55 - 20 * t)))
    W = (255, 255, 255); w = S // 26
    d.line([(S * .18, S * .45), (S * .50, S * .18), (S * .82, S * .45)], fill=W, width=w, joint="curve")  # 屋根(垂木)
    d.line([(S * .50, S * .18), (S * .50, S * .45)], fill=W, width=w)                                      # 棟束
    d.line([(S * .22, S * .45), (S * .78, S * .45)], fill=W, width=w)                                      # 梁
    for x in (.28, .50, .72): d.line([(S * x, S * .45), (S * x, S * .78)], fill=W, width=w)                # 柱
    d.line([(S * .28, S * .62), (S * .50, S * .45)], fill=W, width=w // 2)                                 # 筋かい
    d.rounded_rectangle([S * .18, S * .78, S * .82, S * .84], radius=w // 2, fill=W)                       # 土台
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "daiku").mkdir(exist_ok=True)
draw(180).save(ROOT / "daiku/apple-touch-icon.png"); draw(512).save(ROOT / "daiku/icon-512.png"); draw(64).save(ROOT / "daiku/favicon.png")
print("仮の アイコン OK")
