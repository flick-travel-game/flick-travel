#!/usr/bin/env python3
"""フリック税理士: けいくんの トップの 絵(2回目・2026-10-01)の まちがい 3か所を 絵の 中で 直す
    python3 tools/zeirishi/fix_text.py 2回目の絵.png 1回目の絵.png 直した絵.png
  ① 税金の きほん の 札「げんぜんちょうしゅう」→「げんせんちょうしゅう」(源泉徴収)
  ② 税の 歴史と 世界 の 札「しゃうぶかんこく」→「しゃうぷかんこく」(シャウプ勧告)
  ③ その 札の 旗が 日本と 韓国 だった → 1回目の 絵の 日本と アメリカの 旗に 入れかえ(シャウプは アメリカの 使節団)
  … ①② は 弁護士(tools/bengoshi/fix_text.py)と 同じ: もとの 字の ink の 箱を 地の 色で 消して、Noto Sans CJK JP Bold で 書きなおす
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
src, src1, out = sys.argv[1], sys.argv[2], sys.argv[3]
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


put((238, 172, 348, 200), "red", "げんせんちょうしゅう", maxw=104)
put((1418, 762, 1526, 796), "red", "しゃうぷかんこく", maxw=100)
# ③ 旗: 1回目の 絵の 同じ 札の 絵(日本と アメリカ)を 写す。1回目は 横に +2・旗の さおの 下の はしが 9 上に ある
a1 = np.array(Image.open(src1).convert("RGB")).astype(float)
X0, X1, Y0, Y1 = 1422, 1518, 686, 762
a[Y0:Y1, X0:X1] = np.median(a[Y0 - 2, X0:X1], axis=0)    # いまの 旗を 地の 色で 消す
a[Y0 + 4:Y1, X0:X1] = a1[Y0 + 4 - 9:Y1 - 9, X0 + 2:X1 + 2]
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out)
print("直した:", out)
