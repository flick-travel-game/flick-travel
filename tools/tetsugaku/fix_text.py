#!/usr/bin/env python3
"""フリック哲学: けいくんの トップの 絵(2回目・2026-10-03)の まちがい 3か所を 絵の 中で 直す
    python3 tools/tetsugaku/fix_text.py tools/tetsugaku/art/hero-src.png tools/tetsugaku/art/hero-fixed.png
  ① 右下 レベル2「高校地理の めやす」→「高校倫理の めやす」(哲学は 高校の「倫理」。地理では ない)
  ② 年表「3人は おなじ ころに 生きた!」の 下が 紀元前5・4・3世紀ごろ → 3つとも 5世紀ごろ
     (おなじ ころ なのに 世紀が ちがうのは おかしい。孔子・ブッダ・ソクラテスは 紀元前5世紀ごろ)
  ③ まん中下の つながる ことば「ことば」→「いけん」(「ことば」は ゲームに 無い。いけん は 哲学のきほんの 語)
  … 税理士・アドラーと 同じ: もとの 字の ink の 箱を 地の 色で 消して、Noto Sans CJK JP Bold で 書きなおす
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

def rewrite(erase, tx, txt, ink_th):
    """erase = 消す 四角(x0,y0,x1,y1 ふくむ)/ tx = 書く 四角(x0,y0,x1,y1)。
    地の 色は 消す 四角の ふちの 1px 外の 中央値、字の 色は 消す 四角の 中の こい ink の 中央値"""
    X0, Y0, X1, Y1 = erase
    r = a[Y0:Y1 + 1, X0:X1 + 1]
    ink = np.median(r[r.max(axis=2) < ink_th], axis=0)
    ring = np.concatenate([a[Y0 - 1, X0 - 1:X1 + 2], a[Y1 + 1, X0 - 1:X1 + 2], a[Y0:Y1 + 1, X0 - 1], a[Y0:Y1 + 1, X1 + 1]])
    a[Y0:Y1 + 1, X0:X1 + 1] = np.median(ring, axis=0)
    x0, y0, x1, y1 = tx
    w, h = x1 - x0 + 1, y1 - y0 + 1
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0)
    ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
    g = tmp.crop(tmp.getbbox())
    gw = min(round(g.width * h / g.height), w)
    g = g.resize((gw, h), Image.LANCZOS)
    gx = x0 + (w - gw) // 2
    al = np.array(g).astype(float)[..., None] / 255
    reg = a[y0:y0 + h, gx:gx + gw]
    a[y0:y0 + h, gx:gx + gw] = reg * (1 - al) + ink * al
    print(txt, "w", gw, "h", h)

rewrite((1366, 931, 1376, 946), (1366, 933, 1376, 943), "倫", 110)          # ①
rewrite((1010, 788, 1018, 800), (1011, 790, 1017, 799), "5", 120)           # ② 4世紀
rewrite((1098, 788, 1107, 800), (1099, 790, 1105, 799), "5", 120)           # ② 3世紀
rewrite((552, 904, 594, 920), (556, 907, 590, 917), "いけん", 110)          # ③
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out)
print("直した:", out)
