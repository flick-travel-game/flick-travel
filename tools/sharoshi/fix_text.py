"""フリック社労士の トップの 絵(けいくんの ChatGPT の 2回目。2026-11-11)の 札の 字を 3つ 直す。
③「りょうよう ほゅうふ きゅうふ」→ ほしょう / ⑨「こうせい こうせい ねんきん」→ ろうれい / ⑩「こくみん ねんせん ほけんりょう」→ ねんきん
python3 tools/sharoshi/fix_text.py tools/sharoshi/art/hero-src.png sharoshi/hero.webp
もとは tools/takken/fix_text.py"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

import os
FONT = next(f for f in ["/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"] if os.path.exists(f))  # Noto が 無い 入れものでは IPA ゴシックを 太くして 使う
src, dst = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(int)


def wipe_light(x0, y0, x1, y1):
    """白い 札の 上の 黒い 字を、行ごとに 明るい 画素の 中央値で うめる"""
    for y in range(y0, y1):
        row = a[y, x0 - 8:x1 + 8]
        ok = row[row.min(axis=1) > 200]
        if len(ok):
            a[y, x0:x1] = np.median(ok, axis=0)


def text(img, xy, s, size, fill, h, stroke=0, w=None):
    f = ImageFont.truetype(FONT, size)
    layer = Image.new("RGBA", (size * len(s) + 40, size * 2), (0, 0, 0, 0))
    ImageDraw.Draw(layer).text((10, 5), s, font=f, fill=fill + (255,), stroke_width=stroke, stroke_fill=fill + (255,))
    layer = layer.crop(layer.getbbox())
    nw = w or round(layer.width * h / layer.height)
    layer = layer.resize((nw, h), Image.LANCZOS)
    img.paste(layer, xy, layer)


ink = (28, 28, 28)
FIX = [((243, 476, 302, 489), "ほしょう"), ((1251, 614, 1310, 627), "ろうれい"), ((1246, 778, 1305, 793), "ねんきん")]
for (x0, y0, x1, y1), _ in FIX: wipe_light(x0, y0, x1, y1)
out = Image.fromarray(a.clip(0, 255).astype("uint8"))
for (x0, y0, x1, y1), s in FIX: text(out, (x0 + 1, y0 + 1), s, 40, ink, y1 - y0 - 2, stroke=2 if "ipag" in FONT else 1, w=x1 - x0 - 2)
out.save(dst, quality=88) if dst.endswith(".webp") else out.save(dst)
