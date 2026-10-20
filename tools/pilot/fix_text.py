"""フリックパイロットの トップの 絵(3回目)の 字を 直す。
9番の 札(こっくぴっと・ふくそう・こうくうにっし・れきし = ゲームに 無い / ちがう 旅)を
ゲームの しごとと歴史の 旅の ことばに 書きかえ、7番の 本の 表紙の 読めない 字を「航空法」に。
python3 tools/pilot/fix_text.py <もとの絵.png> <出す.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.array(im).astype(int)

# 9番の 札: (字を 消す 四角 x0,y0,x1,y1, 新しい 字)
CARDS = [
    ((1133, 760, 1216, 784), "ぱいろっと"),
    ((1231, 760, 1302, 784), "きちょう"),
    ((1318, 760, 1415, 784), "らいときょうだい"),
    ((1432, 760, 1510, 784), "こんこるど"),
]
INK = (24, 28, 72)

def clear(box, white_min):
    x0, y0, x1, y1 = box
    for y in range(y0, y1):
        row = a[y, x0 - 6:x1 + 6]
        ok = row[row.min(axis=1) > white_min]
        if len(ok):
            a[y, x0:x1] = np.median(ok, axis=0)

for box, _ in CARDS:
    clear(box, 225)

# 7番の 本の 表紙: 金の 字(読めない 字)を 紺で ぬって 消す
BOOK = (74, 726, 142, 755)
bx0, by0, bx1, by1 = BOOK
reg = a[by0:by1, bx0:bx1]
m = (reg[..., 0] > 60) & (reg[..., 0] > reg[..., 2] + 5)
for _ in range(2):  # 字の かげの ぶんまで 広げる
    m = m | np.roll(m, 1, 0) | np.roll(m, -1, 0) | np.roll(m, 1, 1) | np.roll(m, -1, 1)
# 1行ずつ、字の 左右の 紺を つないで うめる
xs = np.arange(reg.shape[1])
for y in range(reg.shape[0]):
    ok = ~m[y]
    if ok.sum() > 2 and m[y].any():
        for c in range(3):
            reg[y, m[y], c] = np.interp(xs[m[y]], xs[ok], reg[y, ok, c])
a[by0:by1, bx0:bx1] = reg

out = Image.fromarray(a.astype("uint8"))
# 「航空法」を 金で(表紙の かたむきに あわせて 少し まわす)
tf = ImageFont.truetype(FONT, 17)
tl = Image.new("RGBA", (80, 30), (0, 0, 0, 0))
ImageDraw.Draw(tl).text((4, 2), "航空法", font=tf, fill=(232, 196, 110, 255))
tl = tl.crop(tl.getbbox()).rotate(4, expand=True, resample=Image.BICUBIC)
out.paste(tl, (bx0 + (bx1 - bx0 - tl.width) // 2, by0 + (by1 - by0 - tl.height) // 2), tl)
d = ImageDraw.Draw(out)
for (x0, y0, x1, y1), word in CARDS:
    w, h = x1 - x0, y1 - y0
    size = 20
    f = ImageFont.truetype(FONT, size)
    tw = d.textlength(word, font=f)
    # 字を 横に ちぢめて はばに 入れる
    layer = Image.new("RGBA", (int(tw) + 4, size + 10), (0, 0, 0, 0))
    ImageDraw.Draw(layer).text((2, 0), word, font=f, fill=INK + (255,))
    bb = layer.getbbox()
    layer = layer.crop(bb)
    if layer.width > w:
        layer = layer.resize((w, layer.height), Image.LANCZOS)
    px = x0 + (w - layer.width) // 2
    py = y0 + (h - layer.height) // 2
    out.paste(layer, (px, py), layer)

out.save(dst)
