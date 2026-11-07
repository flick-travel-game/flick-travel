"""フリック宅建士の トップの 絵(2回目)の 字を 直す。
5番「たゅうかいですうりょう」→「ちゅうかいてすうりょう」/ 7番「いっちだて」→「いっこだて」/
下の 札「模擬試験で」の くずれた 擬 だけ 書きなおす。
python3 tools/takken/fix_text.py <もとの絵.png> <出す.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
src, dst = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(int)


def wipe_light(x0, y0, x1, y1):
    """白い 札の 上の 黒い 字を、行ごとに 明るい 画素の 中央値で うめる"""
    for y in range(y0, y1):
        row = a[y, x0 - 6:x1 + 6]
        ok = row[row.min(axis=1) > 200]
        if len(ok):
            a[y, x0:x1] = np.median(ok, axis=0)


def wipe_cols(x0, y0, x1, y1):
    """色の ついた 地の 字を、列ごとに 上下の 色を つないで 消す"""
    for x in range(x0, x1):
        t, b = a[y0 - 2, x], a[y1 + 1, x]
        for y in range(y0, y1):
            k = (y - y0) / (y1 - y0)
            a[y, x] = t * (1 - k) + b * k


def text(img, xy, s, size, fill, h, stroke=0, sfill=None, w=None):
    f = ImageFont.truetype(FONT, size)
    layer = Image.new("RGBA", (size * len(s) + 40, size * 2), (0, 0, 0, 0))
    ImageDraw.Draw(layer).text((10, 5), s, font=f, fill=fill + (255,),
                               stroke_width=stroke, stroke_fill=(sfill or fill) + (255,))
    layer = layer.crop(layer.getbbox())
    nw = w or round(layer.width * h / layer.height)
    layer = layer.resize((nw, h), Image.LANCZOS)
    img.paste(layer, xy, layer)


ink = (30, 30, 30)
wipe_light(186, 784, 392, 806)
wipe_light(1342, 341, 1490, 367)
# 「模擬試験で」の 行を 行ごとの むらさきの 地の 色で ぬる
for y in range(823, 853):
    row = a[y, 800:990]
    m = row[(row[:, 0] < 210) & (row[:, 2] > 150) & (row[:, 1] < 90)]
    if len(m):
        a[y, 842:962] = np.median(m, axis=0)
out = Image.fromarray(a.clip(0, 255).astype("uint8"))
text(out, (190, 786), "ちゅうかいてすうりょう", 40, ink, 19, w=198, stroke=1)
text(out, (1353, 344), "いっこだて", 40, ink, 22, stroke=1)
text(out, (846, 822), "模擬試験で", 40, (255, 255, 255), 31, w=114, stroke=7)
text(out, (849, 825), "模擬試験で", 40, (255, 255, 255), 25, w=108, stroke=3, sfill=(60, 15, 100))
out.save(dst)
