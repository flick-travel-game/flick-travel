#!/usr/bin/env python3
"""フリックスマホ: けいくんの トップの 絵(2回目・2026-10-03)の 濁点 / 半濁点の まちがいを 絵の 中で 直す
    python3 tools/sumaho/fix_text.py tools/sumaho/art/hero-src.png sumaho/hero.webp
  ChatGPT は ゛ と ゜ の 書きわけが にがて。札の 字を 地の 白で 消して Noto Sans CJK JP Bold で 書きなおす(税理士・弁護士と 同じ)
  ・ごじんじょうほう → こじんじょうほう ・よそくべんかん → よそくへんかん
  ・びんちあうと → ぴんちあうと ・ばすこーど → ぱすこーど ・すわいぶ → すわいぷ
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
assert a.shape[:2] == (1024, 1536), "トップの 絵は 1536×1024 で"
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
S = 8
# ⚠️ ゜(ぴ・ぱ・ぷ)の 字は 太く しない。太くすると 小さな まるが つぶれて また ゛に 見える


def put(box, txt, bold=0):
    bx0, by0, bx1, by1 = box; r = a[by0:by1, bx0:bx1]
    m = r.max(axis=2) < 110                                 # こい 字
    ys, xs = np.nonzero(m)
    x0, y0, x1, y1 = bx0 + xs.min(), by0 + ys.min(), bx0 + xs.max(), by0 + ys.max()
    col = np.median(r[m], axis=0)
    bg = np.median(np.concatenate([a[y0 - 3, x0:x1], a[y1 + 3, x0:x1]]), axis=0)
    a[y0 - 2:y1 + 3, x0 - 2:x1 + 3] = bg                  # もとの 字を 地の 色で 消す
    h = y1 - y0 + 1
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0); ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255, stroke_width=bold * S, stroke_fill=255)
    g = tmp.crop(tmp.getbbox())
    w = min(round(g.width * h / g.height), x1 - x0 + 1)    # もとの 字の はばを こえない
    g = g.resize((w, h), Image.LANCZOS)
    gx = (x0 + x1) // 2 - w // 2
    al = np.array(g).astype(float)[..., None] / 255
    a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + col * al
    print(txt, (x0, y0, x1, y1))


put((1378, 248, 1452, 272), "こじんじょうほう", bold=2)  # ゛を 消すだけ なので 太く して もとの 字に 合わせる
put((912, 924, 1012, 956), "よそくへんかん", bold=2)
put((248, 185, 352, 205), "ぴんちあうと")
put((1238, 248, 1312, 272), "ぱすこーど")
put((372, 113, 448, 132), "すわいぷ")
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out, quality=88)
print("直した:", out)
