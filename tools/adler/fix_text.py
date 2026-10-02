#!/usr/bin/env python3
"""フリックアドラー心理学: けいくんの トップの 絵(2回目・2026-10-02)の まちがい 1か所を 絵の 中で 直す
    python3 tools/adler/fix_text.py tools/adler/art/hero-src.png tools/adler/art/hero-fixed.png
  ① まん中下の「ことばを うって 意味と つながりが わかる!」の 図の まん中の ピンクの 丸「ちょうかん」→「ゆうきづけ」
     (「ちょうかん」は ゲームに 無い ことば。検索の 欄も 意味も ゆうきづけ なので、まん中も ゆうきづけ に そろえる)
  … 税理士(tools/zeirishi/fix_text.py)と 同じ: もとの 字の ink の 箱を 地の 色で 消して、Noto Sans CJK JP Bold で 書きなおす
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
X0, Y0, X1, Y1 = 948, 842, 1026, 868          # ピンクの 丸の 中の 字の あたり(ふちの 光を のぞく)
r = a[Y0:Y1, X0:X1]
wm = r.min(axis=2) > 200                       # 白い 字
ys, xs = np.nonzero(wm)
x0, y0, x1, y1 = X0 + xs.min(), Y0 + ys.min(), X0 + xs.max(), Y0 + ys.max()
pink = r[~wm & (r[..., 0] > 220) & (r[..., 1] < 140)]
bg = np.median(pink, axis=0)
a[y0 - 2:y1 + 3, x0 - 2:x1 + 3] = bg           # もとの 字を ピンクで 消す
h = y1 - y0 + 1
F = ImageFont.truetype(FONT, 40 * S, index=0)  # index 0 = JP
txt = "ゆうきづけ"
tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0); ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
g = tmp.crop(tmp.getbbox())
w = min(round(g.width * h / g.height), X1 - X0 - 6)   # 丸に 入らない ときは 横だけ ちぢめる
g = g.resize((w, h), Image.LANCZOS)
gx = (x0 + x1) // 2 - w // 2
al = np.array(g).astype(float)[..., None] / 255
reg = a[y0:y0 + h, gx:gx + w]
a[y0:y0 + h, gx:gx + w] = reg * (1 - al) + np.array([255, 255, 255]) * al
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out)
print("直した:", out, (x0, y0, x1, y1), "w", w, "h", h)
