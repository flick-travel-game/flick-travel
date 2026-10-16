"""フリックスペイン語の トップの 絵の 字を 3か所 直す(2026-10-16)。
  ① 「学学習のながれ」の 前の 黄色い「学」を 消して ★ に(→ ★ 学習のながれ)
  ② ふきだし「発音？きいて」の くずれた 字 → 「を」
  ③ 「Por favor.」の 読み「ボル」→「ポル」(゛を ゜に)
使いかた: python3 tools/supein/fix_text.py <もとの絵.png> <出す.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
W, H = im.size
sx, sy = W / 1536, H / 1024
assert (W, H) == (1536, 1024), "絵の 大きさが ちがう。座標を 測りなおす"
d = ImageDraw.Draw(im)
BOLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"

# ① 黄色い 学 … 行ごとに 右の ピンクの 地の 色で ぬる
for y in range(792, 832):
    ref = im.getpixel((44, y)) if False else None
    # 右どなり(白い 学 の 手前)の すきまの 色を 見る
    cand = [im.getpixel((x, y)) for x in range(36, 46)]
    pinks = [c for c in cand if c[0] > 200 and c[1] < 110 and c[2] > 90]
    col = tuple(sum(c[i] for c in pinks) // len(pinks) for i in range(3)) if pinks else (246, 52, 136)
    for x in range(46, 76):
        im.putpixel((x, y), col)
# ぬった あとに ★ を 置く(「クイズに ちょうせん」の ★ と そろえる。ぬった あとが 目立たない)
import math
S = 4
star = Image.new("RGBA", (40 * S, 40 * S), (0, 0, 0, 0))
sd = ImageDraw.Draw(star)
pts = []
for i in range(10):
    r = (17 if i % 2 == 0 else 7.5) * S
    a = -math.pi / 2 + i * math.pi / 5
    pts.append((20 * S + r * math.cos(a), 21 * S + r * math.sin(a)))
sd.polygon(pts, fill=(255, 214, 40, 255), outline=(232, 120, 0, 255), width=2 * S)
star = star.resize((40, 40), Image.LANCZOS)
im.paste(star, (42, 791), star)

# ② を
bg = im.getpixel((70, 268))
d.rectangle((58, 245, 78, 265), fill=bg)
f = ImageFont.truetype(BOLD, 18)
d.text((68, 255), "を", font=f, fill=(232, 30, 110), anchor="mm")

# ③ ボ → ポ
d.rectangle((1215, 276, 1221, 280), fill=im.getpixel((1222, 275)))
d.ellipse((1216, 275, 1220, 279), outline=(38, 44, 86), width=1)

im.save(out)
print("ok", out)
