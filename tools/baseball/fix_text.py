# フリックワールドベースボールの トップの 絵(けいくんの ChatGPT の 絵・2回目)の 中を 2か所 直す。
#   ① 9番の 箱「きゅーばだいひょう」の 旗が プエルトリコの 旗だった → キューバの 旗を 描く
#   ② まん中下「つながる ことば」の「とりぷるぷれー」の ぷ が ぶ に 見えた → 書きなおす(⚠️ ゜が つぶれるので 太く しない)
# つかいかた: python3 tools/baseball/fix_text.py <もとの絵.png> baseball/hero.webp
import math, sys
from PIL import Image, ImageDraw, ImageFont

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
assert im.size == (1536, 1024), im.size

# ① キューバの 旗(青白5本 + 赤い 三角 + 白い 星)
x0, y0, x1, y1 = 1429, 683, 1500, 731
W, H, S = x1 - x0, y1 - y0, 8
f = Image.new("RGB", (W * S, H * S), "white")
d = ImageDraw.Draw(f)
w, h = W * S, H * S
for i in range(5):
    d.rectangle([0, round(i * h / 5), w, round((i + 1) * h / 5)], fill=(0, 42, 143) if i % 2 == 0 else "white")
ax = h * math.sqrt(3) / 2
d.polygon([(0, 0), (ax, h / 2), (0, h)], fill=(207, 20, 43))
cx, cy, R = ax / 3, h / 2, h * 0.13
pts = []
for k in range(10):
    a = -math.pi / 2 + k * math.pi / 5
    rr = R if k % 2 == 0 else R * 0.38
    pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
d.polygon(pts, fill="white")
im.paste(f.resize((W, H), Image.LANCZOS), (x0, y0))

# ② とりぷるぷれー
d = ImageDraw.Draw(im)
d.rectangle([787, 962, 874, 982], fill=(252, 251, 252))
txt = "とりぷるぷれー"
font = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", 15 * S, index=0)
bb = font.getbbox(txt)
L = Image.new("L", (bb[2] - bb[0] + 20, bb[3] - bb[1] + 20), 0)
ImageDraw.Draw(L).text((10 - bb[0], 10 - bb[1]), txt, font=font, fill=255, stroke_width=2, stroke_fill=255)
L = L.resize((84, 16), Image.LANCZOS).point(lambda v: min(255, int(255 * (v / 255) ** 0.85)))
im.paste(Image.new("RGB", L.size, (15, 15, 15)), (789, 964), L)

im.save(out, quality=88, method=6)
print("saved", out)
