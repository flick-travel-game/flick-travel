#!/usr/bin/env python3
"""フリック自動車運転免許: けいくんの トップの 絵(2回目・2026-11-05)を 絵の 中で 直す
    python3 tools/menkyo/fix_text.py tools/menkyo/art/hero-src.png menkyo/hero.webp
  札の ことばは ゲームと 合っていた。直すのは 2つ:
  ・まん中の 説明の 2〜4行め(「かりめん(かりめん)」「がっかりめんの」の くずれ)
  ・2番の 札「じょこう」の 絵が 青い 矢印(指定方向)→ 赤い 逆三角の 徐行の 標識
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
"""
import sys
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
assert a.shape[:2] == (1024, 1536)
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
S = 8


def erase(box):
    global a
    x0, y0, x1, y1 = box
    r = a[y0:y1, x0:x1]
    ink = r.mean(axis=2) < 170
    m = np.zeros(a.shape[:2], np.uint8); m[y0:y1, x0:x1][ink] = 255
    m = cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=2)
    a = cv2.inpaint(a.clip(0, 255).astype(np.uint8), m, 5, cv2.INPAINT_TELEA).astype(float)


def write(x, y, h, txt, col):
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    ref = F.getbbox("あ"); unit = ref[3] - ref[1]
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 3), 0)
    ImageDraw.Draw(tmp).text((20 * S, 40 * S), txt, font=F, fill=255, stroke_width=S * 3 // 2, stroke_fill=255)
    bb = tmp.getbbox(); top = 40 * S + ref[1]
    g = tmp.crop((bb[0], top - 6 * S, bb[2], top + unit + 6 * S))
    k = h / unit
    w = round(g.width * k); hh = round(g.height * k)
    g = g.resize((w, hh), Image.LANCZOS)
    gy = y - round(6 * S * k)
    al = np.array(g).astype(float)[..., None] / 255
    a[gy:gy + hh, x:x + w] = a[gy:gy + hh, x:x + w] * (1 - al) + np.array(col, float) * al


# ① まん中の 説明(1行めは そのまま)
erase((446, 386, 1098, 474))
INK = (10, 10, 10)
write(455, 392, 18, "かりめん・ほんめんの どちらで でるかが わかるよ！", INK)
write(455, 422, 18, "あるく人・じてんしゃの きまりから、かりめん・ほんめんの", INK)
write(455, 450, 18, "はんいの めやすまで、たっぷり まなべる 990語！", INK)

# ② じょこう の 標識(青い 丸を 白で 消して 赤い 逆三角)
img = Image.fromarray(a.clip(0, 255).astype(np.uint8))
d = ImageDraw.Draw(img)
d.rectangle((310, 234, 386, 304), fill=(253, 253, 253))
Z = 8
big = Image.new("RGBA", (80 * Z, 72 * Z), (0, 0, 0, 0))
bd = ImageDraw.Draw(big)
bd.polygon([(2 * Z, 4 * Z), (78 * Z, 4 * Z), (40 * Z, 70 * Z)], fill=(214, 30, 40))
bd.polygon([(9 * Z, 8 * Z), (71 * Z, 8 * Z), (40 * Z, 62 * Z)], fill=(255, 255, 255))
bd.polygon([(14 * Z, 11 * Z), (66 * Z, 11 * Z), (40 * Z, 56 * Z)], fill=(214, 30, 40))
F = ImageFont.truetype(FONT, 15 * Z, index=0)
bd.text((40 * Z, 24 * Z), "徐行", font=F, fill=(255, 255, 255), anchor="mm")
big = big.resize((80, 72), Image.LANCZOS)
img.paste(big, (308, 233), big)
img.save(out, "WEBP", quality=88)
print("ok", out)
