#!/usr/bin/env python3
"""フリックパソコンの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青い 地に どこの 会社の ものでも ない 銀色の ノートパソコンと キーボード。コードで 描く(AI の 絵に しない)
    python3 tools/pasokon/placeholder_icon.py  → pasokon/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/sumaho/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py pasokon に 置きかえる
    ⚠️ りんごの マーク・実在の パソコンの 形は 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 青の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(70 - 35 * t), int(140 - 50 * t), int(230 - 40 * t)))
    # 画面(銀の ふち + うすい 青の 画面)
    x0, x1, y0, y1 = S * .18, S * .82, S * .20, S * .62
    d.rounded_rectangle([x0, y0, x1, y1], radius=S * .04, fill=(226, 230, 235))
    d.rounded_rectangle([x0 + S * .03, y0 + S * .03, x1 - S * .03, y1 - S * .025], radius=S * .015, fill=(208, 235, 255))
    # 画面の 中の ウインドウ 2つ
    d.rounded_rectangle([x0 + S * .07, y0 + S * .07, x0 + S * .33, y1 - S * .07], radius=S * .015, fill=(255, 255, 255))
    d.rounded_rectangle([x0 + S * .36, y0 + S * .07, x1 - S * .07, y1 - S * .07], radius=S * .015, fill=(255, 200, 40))
    # 台(キーボードの 面)
    d.polygon([(S * .10, S * .70), (S * .90, S * .70), (S * .84, S * .62), (S * .16, S * .62)], fill=(200, 205, 212))
    d.rounded_rectangle([S * .08, S * .69, S * .92, S * .74], radius=S * .02, fill=(180, 186, 194))
    for r in range(2):
        for c in range(10):
            X = S * .20 + c * S * .061 + r * S * .015; Y = S * .632 + r * S * .03
            d.rounded_rectangle([X, Y, X + S * .045, Y + S * .02], radius=S * .005, fill=(245, 246, 248))
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "pasokon").mkdir(exist_ok=True)
draw(180).save(ROOT / "pasokon/apple-touch-icon.png"); draw(512).save(ROOT / "pasokon/icon-512.png"); draw(64).save(ROOT / "pasokon/favicon.png")
draw(144).save(ROOT / "pasokon/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
