#!/usr/bin/env python3
"""フリック弁護士: けいくんの トップの 絵(2回目・2026-10-01)の 字の まちがい 3か所を 絵の 中で 直す
    python3 tools/bengoshi/fix_text.py もとの絵.png 直した絵.png
  ① 憲法の ことば の 札「じゅうけん」→「じゆうけん」(自由権)
  ② 民法と くらし の 札「はいばい」→「ばいばい」(売買)
  ③ レベルの 2「法律律・予備試験の / 難語」→「法学部・予備試験の / 範囲」
  … もとの 字の ink の 箱を 地の 色で 消して、Noto Sans CJK JP Bold で 同じ 高さ・同じ 色・同じ まん中に 書きなおす
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


def ink(box, kind):
    x0, y0, x1, y1 = box; r = a[y0:y1, x0:x1]
    m = (r[..., 0] > 170) & (r[..., 1] < 90) & (r[..., 2] < 90) if kind == "red" else (r[..., 2] > 150) & (r[..., 0] < 90) & (r[..., 1] < 90)
    ys, xs = np.nonzero(m)
    return x0 + xs.min(), y0 + ys.min(), x0 + xs.max(), y0 + ys.max(), np.median(r[m], axis=0)


def put(box, kind, txt, maxw=None):
    x0, y0, x1, y1, col = ink(box, kind)
    bg = np.median(np.concatenate([a[y0 - 3, x0:x1], a[y1 + 3, x0:x1]]), axis=0)
    a[y0 - 2:y1 + 3, x0 - 2:x1 + 3] = bg                  # もとの 字を 地の 色で 消す
    h = y1 - y0 + 1
    F = ImageFont.truetype(FONT, 40 * S, index=0)          # index 0 = JP
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0); ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
    g = tmp.crop(tmp.getbbox())
    w = round(g.width * h / g.height)
    if maxw and w > maxw: w = maxw                          # 箱に 入らない ときは 横だけ ちぢめる
    g = g.resize((w, h), Image.LANCZOS)
    cx = (x0 + x1) // 2; gx = cx - w // 2
    al = np.array(g).astype(float)[..., None] / 255
    reg = a[y0:y0 + h, gx:gx + w]
    a[y0:y0 + h, gx:gx + w] = reg * (1 - al) + col * al


put((113, 372, 215, 412), "red", "じゆうけん", maxw=90)
put((120, 592, 218, 632), "red", "ばいばい", maxw=90)
put((1268, 849, 1390, 867), "blue", "法学部・予備試験の", maxw=118)
put((1268, 870, 1390, 890), "blue", "範囲")
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out)
print("直した:", out)
