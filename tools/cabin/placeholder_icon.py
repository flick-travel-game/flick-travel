#!/usr/bin/env python3
"""フリックキャビンアテンダントの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。客室の 白い 壁に 飛行機の 窓。窓の 中は 青空と 雲と 小さな 飛行機。コードで 描く(AI の 絵に しない)
    python3 tools/cabin/placeholder_icon.py  → cabin/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/pilot/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py cabin に 置きかえる。⚠️ 実在の 会社の 塗り分け・制服は 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S), (236, 242, 250)); d = ImageDraw.Draw(im)
    for y in range(S):  # 客室の 壁(上 → 下 すこし 暗く)
        t = y / S; d.line([(0, y), (S, y)], fill=(int(244 - 22 * t), int(246 - 18 * t), int(252 - 10 * t)))
    x0, y0, x1, y1 = S * .2, S * .1, S * .8, S * .9
    d.rounded_rectangle([x0 - S * .05, y0 - S * .05, x1 + S * .05, y1 + S * .05], radius=S * .3, fill=(200, 210, 224))  # 窓の わく
    win = Image.new("RGB", (S, S)); wd = ImageDraw.Draw(win)
    for y in range(S):  # 窓の 中の 空
        t = y / S; wd.line([(0, y), (S, y)], fill=(int(40 + 110 * t), int(120 + 90 * t), int(230 + 20 * t)))
    for (x, y, r) in [(.32, .70, .12), (.50, .74, .14), (.68, .70, .11), (.40, .30, .07)]:  # 雲
        wd.ellipse([S * (x - r), S * (y - r * .6), S * (x + r), S * (y + r * .6)], fill=(255, 255, 255))
    P = lambda pts: [(S * x, S * y) for x, y in pts]
    wd.polygon(P([(.42, .48), (.66, .44), (.70, .45), (.66, .47), (.44, .51)]), fill=(255, 255, 255))  # 小さな 飛行機(横から)
    wd.polygon(P([(.54, .46), (.50, .38), (.53, .38), (.60, .45)]), fill=(255, 255, 255))
    m = Image.new("L", (S, S), 0); ImageDraw.Draw(m).rounded_rectangle([x0, y0, x1, y1], radius=S * .26, fill=255)
    im.paste(win, (0, 0), m)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "cabin").mkdir(exist_ok=True)
draw(180).save(ROOT / "cabin/apple-touch-icon.png"); draw(512).save(ROOT / "cabin/icon-512.png"); draw(64).save(ROOT / "cabin/favicon.png")
draw(144).save(ROOT / "cabin/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
