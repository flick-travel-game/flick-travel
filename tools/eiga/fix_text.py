"""フリック映画評論家の トップの 絵の 字を 直す(2026-10-12)。
8番の 説明「かんそうを ことばで ??? こつ」の くずれた 字を「つたえる」に 書きなおす。
使いかた: python3 tools/eiga/fix_text.py <もとの絵.png> <書き出し.png>
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.array(im).astype(int)

# 1行目(y 431〜442)を 上下の 地の 色で ぬる
y0, y1, x0, x1 = 430, 444, 1248, 1474
top = a[426:430, x0:x1]; bot = a[444:447, x0:x1]
bg = np.median(np.concatenate([top, bot]), axis=0)  # 列ごとの 地の 色
for y in range(y0, y1):
    a[y, x0:x1] = bg
im = Image.fromarray(a.clip(0, 255).astype('uint8'))

d = ImageDraw.Draw(im)
text = 'かんそうを ことばで つたえる こつ'
cx = (1251 + 1470) / 2
for size in range(12, 20):  # もとの 字の 幅(219px)に そろえる
    f = ImageFont.truetype(F, size, index=0)
    l, t, r, b = d.textbbox((0, 0), text, font=f, stroke_width=0)
    if r - l >= 214:
        break
w = r - l
d.text((cx - w / 2 - l, 431 - t), text, font=f, fill=(20, 18, 24), stroke_width=0)
im.save(out)
print('size', size, 'width', w)
