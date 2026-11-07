"""フリックネイリストの トップの 絵の 直し(2026-11-07)。
えいせい の 札の 緑の 十字(十字の しるしは 入れない 決めごと)を 消して、青い 水のしずくに 描きかえる。
python3 tools/nail/fix_hero.py <もとの絵.png> nail/hero.webp
"""
import sys
from PIL import Image, ImageDraw
im = Image.open(sys.argv[1]).convert("RGB")
px = im.load()
X0, X1, Y0, Y1 = 450, 500, 951, 1001
for y in range(Y0, Y1):
    l = px[X0 - 3, y]; r = px[X1 + 3, y]
    for x in range(X0, X1):
        t = (x - X0) / (X1 - X0)
        px[x, y] = tuple(int(l[i] * (1 - t) + r[i] * t) for i in range(3))
S = 8
W, H = 44, 48
lay = Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))
d = ImageDraw.Draw(lay)
cx, cy, rr = W * S / 2, 30 * S, 14 * S
pts = [(cx, 2 * S), (cx + rr * 0.92, cy - rr * 0.4), (cx - rr * 0.92, cy - rr * 0.4)]
d.polygon(pts, fill=(30, 110, 200, 255))
d.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), fill=(30, 110, 200, 255))
r2 = rr - 3 * S
d.polygon([(cx, 7 * S), (cx + r2 * 0.92, cy - r2 * 0.4), (cx - r2 * 0.92, cy - r2 * 0.4)], fill=(90, 180, 245, 255))
d.ellipse((cx - r2, cy - r2, cx + r2, cy + r2), fill=(90, 180, 245, 255))
d.ellipse((cx - 8 * S, cy - 6 * S, cx - 3 * S, cy + 2 * S), fill=(235, 248, 255, 230))
lay = lay.resize((W, H), Image.LANCZOS)
im.paste(lay, (475 - W // 2, 976 - H // 2), lay)
im.save(sys.argv[2], "WEBP", quality=88)
