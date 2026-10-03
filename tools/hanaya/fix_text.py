#!/usr/bin/env python3
"""フリック花屋: けいくんの トップの 絵(4回目・2026-10-03)の 字を 1か所 絵の 中で 直す
    python3 tools/hanaya/fix_text.py もとの絵.png 直した絵.png
  ① 下の まん中「学ぶ 分野」の 札「春の 花」→「植物一般」(ゲームの さくらの 学ぶ分野)
  … もとの 字の ink の 箱を 地の 色で 消して、Noto Sans CJK JP Bold で 同じ 高さ・同じ 色・同じ まん中に 書きなおす
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
assert a.shape[:2] == (1024, 1536), "トップの 絵は 1536×1024 で"
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
S = 8

x0, y0, x1, y1 = 680, 935, 830, 980
r = a[y0:y1, x0:x1]
m = (r[..., 0] > 150) & (r[..., 1] < 110) & (r[..., 2] < 130)
ys, xs = np.nonzero(m)
x0, y0, x1, y1 = x0 + xs.min(), y0 + ys.min(), x0 + xs.max(), y0 + ys.max()
col = np.median(r[m], axis=0)
bg = np.median(np.concatenate([a[y0 - 4, x0 - 4:x1 + 5], a[y1 + 4, x0 - 4:x1 + 5]]), axis=0)
a[y0 - 3:y1 + 4, x0 - 3:x1 + 4] = bg
h = y1 - y0 + 1
txt = "植物一般"
F = ImageFont.truetype(FONT, 40 * S, index=0)
tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0)
ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
g = tmp.crop(tmp.getbbox())
w = min(round(g.width * h / g.height), 120)
g = g.resize((w, h), Image.LANCZOS)
gx = (x0 + x1) // 2 - w // 2
al = np.array(g).astype(float)[..., None] / 255
a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + col * al
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out)
print("直した:", out)
