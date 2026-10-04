# フリック血液型の トップの 絵(けいくんの ChatGPT の 絵 2回目)を 絵の 中で 直す。もとは tools/jui/fix_text.py
#   ① 3の 札「えむえぬかた」→「えむえぬしき」(ゲームの 読みは MN式 = えむえぬしき)
#   ② 4の 札「くみあわせひょう」の 表: A×O が「DO」、O×A が「A」→ どちらも「AO」
#   ③ 図鑑の 説明の ふだ「しく(くずれ)の (わしょ」→「しくみ図の ばしょ」
# つかいかた: python3 tools/ketsueki/fix_text.py <2回目の絵.png> <出力.png>
#   ⚠️ 絵を 差しかえたら 座標は 測りなおす
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np
im = Image.open(sys.argv[1]).convert('RGB')
A = np.array(im).astype(float)
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'


def erase_rows(x0, x1, y0, y1):  # 行ごとに 左右の 色を つないで 消す
    for y in range(y0, y1 + 1):
        L = A[y, x0 - 3:x0].mean(0); R = A[y, x1 + 1:x1 + 4].mean(0)
        for x in range(x0, x1 + 1):
            t = (x - x0) / max(1, x1 - x0); A[y, x] = L * (1 - t) + R * t


def text(s, x0, top, h, color, gamma=0.75, maxw=None):
    global A
    size = h
    while True:
        f = ImageFont.truetype(F, size, index=0); b = f.getbbox(s)
        if b[3] - b[1] >= h or size > 80: break
        size += 1
    w = b[2] - b[0]
    if maxw and w > maxw:  # はばに 入らなければ よこだけ ちぢめる
        layer = Image.new('L', (w + 4, b[3] - b[1] + 4), 0)
        ImageDraw.Draw(layer).text((2 - b[0], 2 - b[1]), s, font=f, fill=255)
        layer = layer.resize((maxw + 4 * maxw // w, layer.height), Image.LANCZOS)
        full = Image.new('L', im.size, 0); full.paste(layer, (x0 - 2, top - 2)); layer = full
    else:
        layer = Image.new('L', im.size, 0)
        ImageDraw.Draw(layer).text((x0 - b[0], top - b[1]), s, font=f, fill=255)
    m = np.clip((np.array(layer).astype(float) / 255) ** gamma, 0, 1)[..., None]
    A = A * (1 - m) + np.array(color, float) * m


NAVY = (8, 8, 128)
# ① かた → しき(紺の 字。白い 地)
A[69:88, 1358:1389] = 253
text('しき', 1359, 71, 15, NAVY, 0.6, maxw=28)
# ② 表の 2つの ます → AO(青い 字)
A[294:311, 399:423] = 251
text('AO', 401, 296, 13, NAVY, 0.6, maxw=20)
A[316:332, 371:395] = 251
text('AO', 373, 318, 12, NAVY, 0.6, maxw=20)
# ③ しくみ図の ばしょ(白い 字。むらさきの 地)
erase_rows(866, 984, 882, 899)
text('しくみ図の ばしょ', 870, 885, 12, (255, 255, 255), 0.6)
Image.fromarray(np.clip(A, 0, 255).astype('uint8')).save(sys.argv[2])
print('OK', sys.argv[2])
