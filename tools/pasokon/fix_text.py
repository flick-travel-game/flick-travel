#!/usr/bin/env python3
"""フリックパソコン: けいくんの トップの 絵(2026-10-03)の 字の まちがい 2つを 絵の 中で 直す
    python3 tools/pasokon/fix_text.py <もとの 絵.png> pasokon/hero.webp
  ・左下の 図鑑の 札「用語集の ひとこと」→「店員さんの ひとこと」(ゲームの 💬 店員さんの ひとこと)
  ・レベル3「みらせの」→「おみせの」
  白い 字を 行ごとに 左右の 地の 色を つないで 消し、Noto Sans CJK JP Bold の 白で 書きなおす
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
assert a.shape[:2] == (1024, 1536), "トップの 絵は 1536×1024 で"
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
S = 8


def put(box, txt, pad=3, exact=False):
    bx0, by0, bx1, by1 = box
    if exact:                                        # 字の 四角を そのまま(まわりに 白い わくが ある とき)
        x0, y0, x1, y1 = box
    else:
        r = a[by0:by1, bx0:bx1]
        m = r.min(axis=2) > 200                      # 白い 字
        ys, xs = np.nonzero(m)
        x0, y0, x1, y1 = bx0 + xs.min(), by0 + ys.min(), bx0 + xs.max(), by0 + ys.max()
    L, R = x0 - pad, x1 + pad
    for y in range(y0 - pad, y1 + pad + 1):          # 行ごとに 左右の 地の 色を つなぐ
        cl, cr = a[y, L - 2:L].mean(axis=0), a[y, R + 1:R + 3].mean(axis=0)
        t = np.linspace(0, 1, R - L + 1)[:, None]
        a[y, L:R + 1] = cl * (1 - t) + cr * t
    h = y1 - y0 + 1
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0)
    ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
    g = tmp.crop(tmp.getbbox())
    w = min(round(g.width * h / g.height), R - L - 1)
    g = g.resize((w, h), Image.LANCZOS)
    gx = (x0 + x1) // 2 - w // 2
    al = np.array(g).astype(float)[..., None] / 255
    a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + 255 * al
    print(txt, (x0, y0, x1, y1), "幅", w)


put((287, 946, 401, 960), "店員さんの ひとこと", pad=2, exact=True)
put((1426, 886, 1492, 910), "おみせの")
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out, quality=90)
print("直した:", out)
