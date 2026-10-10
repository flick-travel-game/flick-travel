# 四角い 絵(アイコンの もと)の「きゅーばだいひょう」の 旗も プエルトリコだったので キューバの 旗を 描く(トップの 絵と 同じ。fix_text.py の ①)
# つかいかた: python3 tools/baseball/fix_square.py <もとの四角い絵.png> tools/baseball/art/square-src.png
import math, sys
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
assert im.size == (1254, 1254), im.size
x0, y0, x1, y1 = 1160, 757, 1221, 797
W, H, S = x1 - x0, y1 - y0, 8
f = Image.new("RGB", (W * S, H * S), "white"); d = ImageDraw.Draw(f); w, h = W * S, H * S
for i in range(5):
    d.rectangle([0, round(i * h / 5), w, round((i + 1) * h / 5)], fill=(0, 42, 143) if i % 2 == 0 else "white")
ax = h * math.sqrt(3) / 2
d.polygon([(0, 0), (ax, h / 2), (0, h)], fill=(207, 20, 43))
cx, cy, R = ax / 3, h / 2, h * 0.13
d.polygon([(cx + (R if k % 2 == 0 else R * 0.38) * math.cos(-math.pi / 2 + k * math.pi / 5),
            cy + (R if k % 2 == 0 else R * 0.38) * math.sin(-math.pi / 2 + k * math.pi / 5)) for k in range(10)], fill="white")
im.paste(f.resize((W, H), Image.LANCZOS), (x0, y0))
im.save(out); print("saved", out)
