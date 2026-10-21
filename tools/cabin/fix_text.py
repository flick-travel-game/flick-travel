"""フリックキャビンアテンダントの トップの 絵(2回目)の 字を 直す。
1番の 札「じゃんぶしーと」の ぶ を ぷ に(ゲームの 読みは じゃんぷしーと)。
python3 tools/cabin/fix_text.py <もとの絵.png> <出す.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.array(im).astype(int)

# ぶ の 四角(x0,y0,x1,y1)。行ごとに 左右の 白い 地で うめる
X0, Y0, X1, Y1 = 172, 334, 189, 354
for y in range(Y0, Y1):
    row = np.concatenate([a[y, X0 - 4:X0], a[y, X1:X1 + 1]])
    ok = row[row.min(axis=1) > 225]
    if len(ok):
        a[y, X0:X1] = np.median(ok, axis=0)

# 字の 色は となりの「ん」の いちばん こい ところ
reg = a[337:351, 160:172].reshape(-1, 3)
ink = tuple(int(v) for v in reg[reg.sum(1).argmin()])

out = Image.fromarray(a.astype("uint8"))
layer = Image.new("RGBA", (40, 40), (0, 0, 0, 0))
ImageDraw.Draw(layer).text((4, 0), "ぷ", font=ImageFont.truetype(FONT, 17), fill=ink + (255,))
layer = layer.crop(layer.getbbox())
# もとの ぶ と 同じ 高さ・はばに そろえる(x 174〜186 / y 337〜350)
layer = layer.resize((13, 14), Image.LANCZOS)
out.paste(layer, (174, 337), layer)
out.save(dst)
