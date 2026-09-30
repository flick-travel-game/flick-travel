#!/usr/bin/env python3
"""フリック教師の 仮の アイコン(けいくんの 絵が 届くまで)。kyoshi/apple-touch-icon.png・icon-512.png・favicon.png を 作る。
絵が 届いたら tools/kango/logo_cut.py の やりかたで 作りなおして、この 台本は 消して よい"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parent.parent.parent
F = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
def make(n):
    s = 4 * n; im = Image.new("RGB", (s, s)); d = ImageDraw.Draw(im)
    for y in range(s):  # 空色 → 青の グラデーション(黒板の 前の あかるい 教室の いろ)
        t = y / s; d.line([(0, y), (s, y)], fill=(int(64 + 40 * (1 - t)), int(150 - 40 * t), int(240 - 20 * t)))
    f = ImageFont.truetype(F, int(s * 0.56), index=0)
    d.text((s / 2, s * 0.47), "教", font=f, fill="white", anchor="mm")
    f2 = ImageFont.truetype(F, int(s * 0.13), index=0)
    d.text((s / 2, s * 0.86), "フリック教師", font=f2, fill=(255, 240, 180), anchor="mm")
    return im.resize((n, n), Image.LANCZOS)
make(180).save(ROOT / "kyoshi/apple-touch-icon.png")
make(512).save(ROOT / "kyoshi/icon-512.png")
make(64).save(ROOT / "kyoshi/favicon.png")
print("ok")
