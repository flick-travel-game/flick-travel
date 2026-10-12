"""フリック映画評論家の トップの 絵の 字を 直す(2026-10-12。3回目の 絵)。
6番「にほんの えいがや おにめの ありょく」→「あにめの みりょく」/
8番「かんそうを ことばで ??? こつ」→「つたえる」。1行ずつ 地の 色で ぬって 書きなおす。
使いかた: python3 tools/eiga/fix_text.py <もとの絵.png> <書き出し.png>
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
# (ぬる y0, y1, x0, x1, 地の色を取る 行, 字の 上, 字の 左右, 書く 字)
LINES = [
    (118, 132, 1238, 1480, [132, 133, 134], 118, (1240, 1477), 'にほんの えいがや あにめの みりょく'),
    (430, 444, 1248, 1474, [426, 427, 428, 429, 444, 445, 446], 431, (1251, 1470), 'かんそうを ことばで つたえる こつ'),
]
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert('RGB')).astype(int)
for y0, y1, x0, x1, bgrows, *_ in LINES:
    bg = np.median(a[bgrows, x0:x1], axis=0)  # 列ごとの 地の 色
    a[y0:y1, x0:x1] = bg
im = Image.fromarray(a.clip(0, 255).astype('uint8'))
d = ImageDraw.Draw(im)
for *_, top, (l0, r0), text in LINES:
    want = r0 - l0
    for size in range(10, 22):  # もとの 字の 幅に そろえる
        f = ImageFont.truetype(F, size, index=0)
        l, t, r, b = d.textbbox((0, 0), text, font=f)
        if r - l >= want - 5:
            break
    d.text(((l0 + r0) / 2 - (r - l) / 2 - l, top - t), text, font=f, fill=(20, 18, 24))
    print(text, size)
im.save(out)
