"""フリック養蜂家の トップの 絵の 字を 1か所 直す。
「まなぶ ぶんや (きほん・せいせい・かんり など)」の 3字め「せ」→「た」(生態 = せいたい)。
使いかた: python3 tools/yoho/fix_text.py <もとの絵.png> <できた絵.png>
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.array(im).astype(int)
x0, x1, y0, y1 = 1031, 1045, 861, 882  # 3字めの「せ」
# 字を 消す: 列ごとに 上下の 地の 色を つなぐ(となりの 字の 墨を ひろわない)
for x in range(x0, x1):
    top = a[y0 - 3, x]; bot = a[y1 + 2, x]
    for y in range(y0, y1):
        t = (y - y0) / (y1 - y0)
        a[y, x] = top * (1 - t) + bot * t
im = Image.fromarray(a.clip(0, 255).astype("uint8"))
# 大きく 太く 描いて、もとの「せ」と 同じ 箱(12×17px)に 縮めて 貼る
font = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", 160, index=0)
g = Image.new("L", (220, 220), 0)
gd = ImageDraw.Draw(g)
gd.text((20, 0), "た", font=font, fill=255, stroke_width=7, stroke_fill=255)
g = g.crop(g.getbbox()).resize((13, 17), Image.LANCZOS)
ink = Image.new("RGB", g.size, (20, 20, 20))
im.paste(ink, (1031, 863), g)
im.save(out)
