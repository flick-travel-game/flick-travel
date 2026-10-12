#!/usr/bin/env python3
"""フリックワールドボクシングの 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。リングの 青い マットに ロープ 3本と 赤い グローブ。コードで 描く(AI の 絵に しない)
    python3 tools/boxing/placeholder_icon.py  → boxing/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/baseball/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py boxing に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent.parent
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S), (32, 92, 180)); d = ImageDraw.Draw(im)
    for k, y in enumerate((.2, .32, .44)):  # ロープ 3本(赤・白・青)
        d.rectangle([0, S * y, S, S * y + S * .035], fill=[(224, 32, 46), (255, 255, 255), (40, 60, 140)][k])
    R, D, W = (224, 32, 46), (150, 20, 30), (255, 255, 255)
    d.rounded_rectangle([S * .3, S * .3, S * .74, S * .74], radius=int(S * .2), fill=R, outline=D, width=int(S * .012))  # こぶし
    d.ellipse([S * .2, S * .44, S * .44, S * .7], fill=R, outline=D, width=int(S * .012))  # 親指
    d.rounded_rectangle([S * .36, S * .7, S * .7, S * .86], radius=int(S * .03), fill=W, outline=D, width=int(S * .01))  # 手首の ところ
    d.line([S * .36, S * .78, S * .7, S * .78], fill=R, width=int(S * .02))
    d.ellipse([S * .56, S * .37, S * .66, S * .45], fill=(255, 120, 130))  # つや
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "boxing").mkdir(exist_ok=True)
draw(180).save(ROOT / "boxing/apple-touch-icon.png"); draw(512).save(ROOT / "boxing/icon-512.png"); draw(64).save(ROOT / "boxing/favicon.png")
draw(144).save(ROOT / "boxing/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
