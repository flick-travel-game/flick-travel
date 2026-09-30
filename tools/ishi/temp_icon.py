#!/usr/bin/env python3
"""フリック医師の 仮の アイコン(けいくんの 絵が 届くまで)。青い 角丸に 白い「医」。
絵が 届いたら tools/kango/logo_cut.py の やりかたで 作りなおして、この ファイルは 消して よい"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parent.parent.parent
F = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
def make(n):
    s = n * 4; im = Image.new("RGBA", (s, s), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * .22), fill=(29, 107, 255, 255))
    f = ImageFont.truetype(F, int(s * .62), index=0)
    d.text((s / 2, s / 2 + s * .02), "医", font=f, fill="white", anchor="mm")
    return im.resize((n, n), Image.LANCZOS)
make(180).save(ROOT / "ishi/apple-touch-icon.png")
make(512).save(ROOT / "ishi/icon-512.png")
print("ok")
