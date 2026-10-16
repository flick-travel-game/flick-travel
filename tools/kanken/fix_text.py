"""フリック漢字の トップの 絵(けいくんの ChatGPT の 絵)の 小さい まちがいを 直す。
  ① 8 どうおんいじ の 雨 の 読み「(あめ・あ?)」(くずれ)→「(あめ・あま)」
  ② 7 かきとり の 書き順の 数字(1,3,3,6,3,5,6 と まちがい)を 消す
python3 tools/kanken/fix_text.py <けいくんの絵.png> kanken/hero.webp(もとの 絵は 入れものに 入れない)
"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import colorsys

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
px = im.load()

def sat(c):
    return colorsys.rgb_to_hsv(*(v / 255 for v in c))

# ② 数字: 小さい 四角の 中の あざやかな 画素を まわりの 白い 地で うめる
BOXES = [(1292, 320, 1302, 334), (1328, 310, 1339, 324), (1362, 318, 1373, 332),
         (1288, 355, 1298, 368), (1312, 357, 1323, 370), (1340, 353, 1351, 366),
         (1286, 409, 1298, 423)]
for (x0, y0, x1, y1) in BOXES:
    ring = []
    for y in range(y0 - 4, y1 + 5):
        for x in range(x0 - 4, x1 + 5):
            if x0 <= x < x1 and y0 <= y < y1:
                continue
            h, s, v = sat(px[x, y])
            if s < 0.12 and v > 0.85:
                ring.append(px[x, y])
    ring.sort(key=sum)
    bg = ring[len(ring) // 2] if ring else (248, 249, 252)
    for y in range(y0, y1):
        for x in range(x0, x1):
            h, s, v = sat(px[x, y])
            if s > 0.10 or v < 0.88:
                px[x, y] = bg

# ① 雨 の 読み
box = (1337, 576, 1410, 598)
d = ImageDraw.Draw(im)
d.rectangle(box, fill=px[1335, 586] if sum(px[1335, 586]) > 700 else (253, 252, 250))
font = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", 40, index=0)
txt = "(あめ・あま)"
tw, th = 400, 70
t = Image.new("L", (tw, th), 0)
ImageDraw.Draw(t).text((0, 4), txt, font=font, fill=255)
t = t.crop(t.getbbox())
w = 68
t = t.resize((w, round(t.height * w / t.width)), Image.LANCZOS)
x = (box[0] + box[2]) // 2 - t.width // 2
y = 594 - t.height
im.paste(Image.new("RGB", t.size, (30, 26, 30)), (x, y), t)
im.save(out, "WEBP", quality=88)
print("ok", out)
