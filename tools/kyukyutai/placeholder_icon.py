#!/usr/bin/env python3
"""フリック救急隊員の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。赤い 地に 白い ハートと 心電図の 線。コードで 描く(AI の 絵に しない)
⚠️ 十字(赤十字の しるしに 見える もの)は 描かない(赤十字の マークは 法律で 使える 人が 決まっている)
    python3 tools/kyukyutai/placeholder_icon.py  → kyukyutai/icon-512.png・apple-touch-icon.png(180)・favicon.png(64)・logo-mark2.webp(144)
絵が 届いたら tools/kyukyutai/art/square-src.png に 置いて python3 tools/icon_from_square.py kyukyutai(この 台本は もう 使わない)"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 赤の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(240 - 40 * t), int(60 - 30 * t), int(70 - 20 * t)))
    W = (255, 255, 255); c = S / 2
    r = S * .17  # ハート = 円 2つ + 三角
    d.ellipse([c - 2 * r, S * .24, c, S * .24 + 2 * r], fill=W); d.ellipse([c, S * .24, c + 2 * r, S * .24 + 2 * r], fill=W)
    d.polygon([(c - 2 * r + S * .005, S * .24 + r * 1.25), (c + 2 * r - S * .005, S * .24 + r * 1.25), (c, S * .8)], fill=W)
    red = (215, 35, 55); w = S // 28; y0 = S * .5  # 心電図の 線
    pts = [(S * .2, y0), (S * .4, y0), (S * .45, y0 - S * .1), (S * .52, y0 + S * .12), (S * .57, y0 - S * .04), (S * .6, y0), (S * .8, y0)]
    d.line(pts, fill=red, width=w, joint="curve")
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "kyukyutai").mkdir(exist_ok=True)
draw(512).save(ROOT / "kyukyutai/icon-512.png"); draw(180).save(ROOT / "kyukyutai/apple-touch-icon.png"); draw(64).save(ROOT / "kyukyutai/favicon.png")
draw(144).save(ROOT / "kyukyutai/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
