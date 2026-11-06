"""フリックポルトガル語の トップの 絵の 字を 直す(2026-11-06)。
  ① たんご「ばん」→「ぱん」(pão)
  ② 4択 C「あて らご」→「あて ろご」(até logo)
  ③ 「ぽるとがるの いいかた」の 札 3つ。ぼんで(bonde)・ぱすてる(pastel)は ブラジルの ことば、
     おぶりがーだ は どちらの 国でも 使う → ポルトガルの ことば(o elétrico / o azulejo / o fado)に
使いかた: python3 tools/porutogaru/fix_text.py <もとの絵.png> <出す.png>
"""
import sys
from statistics import median
from PIL import Image, ImageDraw, ImageFont

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
assert im.size == (1536, 1024), "絵の 大きさが ちがう。座標を 測りなおす"
d = ImageDraw.Draw(im)
BOLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
INK = (34, 30, 36)
SS = 4  # 4ばいで 描いて 縮める(字が なめらかに・すこし 太く)

def chip(text, x0, y0, x1, y1, cx, glyph_h):
    # 札の 中を 行ごとに 札の 地の 色(明るい 画素の まんなかの 値)で ぬる
    prev = (250, 244, 222)
    for y in range(y0, y1 + 1):
        light = [im.getpixel((x, y)) for x in range(x0, x1 + 1) if sum(im.getpixel((x, y))) > 600]
        if light:
            prev = tuple(int(median(c[i] for c in light)) for i in range(3))
        d.line((x0, y, x1, y), fill=prev)
    size = 10
    while True:
        f = ImageFont.truetype(BOLD, (size + 1) * SS)
        b = d.textbbox((0, 0), "ぱんろ", font=f)
        if (b[3] - b[1]) / SS > glyph_h:
            break
        size += 1
    f = ImageFont.truetype(BOLD, size * SS)
    w, h = (x1 - x0 + 1) * SS, (y1 - y0 + 1) * SS
    layer = Image.new("L", (w, h), 0)
    ImageDraw.Draw(layer).text(((cx - x0) * SS, h / 2), text, font=f, fill=255,
                               anchor="mm", stroke_width=SS // 2, stroke_fill=255)
    layer = layer.resize((x1 - x0 + 1, y1 - y0 + 1), Image.LANCZOS)
    im.paste(Image.new("RGB", layer.size, INK), (x0, y0), layer)

chip("ぱん", 210, 349, 319, 370, 266, 19)
chip("あて ろご", 158, 960, 303, 997, 220, 21)
for y0, y1, t in ((427, 446, "えれとりく"), (454, 472, "あずれじゅ"), (481, 499, "ふぁど")):
    chip(t, 1393, y0, 1513, y1, 1452, 14)

im.save(out)
print("ok", out)
