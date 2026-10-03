#!/usr/bin/env python3
"""フリックスマホの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。青い 地に どこの 会社の ものでも ない まるい 四角の スマホと 電波。コードで 描く(AI の 絵に しない)
    python3 tools/sumaho/placeholder_icon.py  → sumaho/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/yakuzai/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py sumaho に 置きかえる
    ⚠️ りんごの マーク・実在の スマホの 形(カメラの 並び)は 描かない"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 青の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(60 - 30 * t), int(150 - 50 * t), int(240 - 40 * t)))
    # スマホ(白い まるい 四角 + うすい 青の 画面)
    x0, x1, y0, y1 = S * .30, S * .70, S * .20, S * .86
    d.rounded_rectangle([x0, y0, x1, y1], radius=S * .07, fill=(255, 255, 255))
    d.rounded_rectangle([x0 + S * .03, y0 + S * .05, x1 - S * .03, y1 - S * .05], radius=S * .03, fill=(208, 235, 255))
    # 画面の 中に フリック入力の キー(3列 × 4行)。まん中の 1つだけ 黄色
    kx0, ky0, kw, kh = x0 + S * .055, y0 + S * .22, S * .085, S * .075
    for r in range(4):
        for c in range(3):
            X, Y = kx0 + c * (kw + S * .02), ky0 + r * (kh + S * .02)
            d.rounded_rectangle([X, Y, X + kw, Y + kh], radius=S * .015, fill=(255, 200, 40) if (r, c) == (1, 1) else (255, 255, 255))
    # 電波(スマホの 右上の 弧)
    bx, by = S * .70, S * .22
    for r in (.06, .10, .14):
        d.arc([bx - S * r, by - S * r, bx + S * r, by + S * r], 285, 345, fill=(255, 255, 255), width=S // 45)
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "sumaho").mkdir(exist_ok=True)
draw(180).save(ROOT / "sumaho/apple-touch-icon.png"); draw(512).save(ROOT / "sumaho/icon-512.png"); draw(64).save(ROOT / "sumaho/favicon.png")
draw(144).save(ROOT / "sumaho/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
