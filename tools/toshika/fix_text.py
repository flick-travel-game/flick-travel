#!/usr/bin/env python3
"""フリック投資家: けいくんの ChatGPT の 絵(2026-10-02)の 字の まちがいを 絵の 中で 直す(税理士・アドラーの fix_text.py と 同じ やりかた)
    python3 tools/toshika/fix_text.py トップの絵.png 四角い絵.png 直したトップ.png 直した四角.png
  ① トップの 絵(1536×1024)の「会社を 知る」の 札「しょろひん」→「しょうひん」(Noto Sans CJK JP Bold で 書きなおす)
  ② 四角い 絵(1254×1254)の 図鑑の「ぎけつけん」の け の 上に ついた 小さな しるし(げ に 見える)を 地の 色で 消す
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
hero, sq, out_h, out_s = sys.argv[1:5]
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"; S = 8

# ① しょろひん → しょうひん
a = np.array(Image.open(hero).convert("RGB")).astype(float); assert a.shape[:2] == (1024, 1536)
X0, Y0, X1, Y1 = 185, 350, 315, 376                       # 札の 字の あたり(上の お店の 絵に かからない ように)
r = a[Y0:Y1, X0:X1]; m = r.sum(axis=2) < 300               # こい 紺の 字
ys, xs = np.nonzero(m); x0, y0, x1, y1 = X0 + xs.min(), Y0 + ys.min(), X0 + xs.max(), Y0 + ys.max()
col = np.median(r[m], axis=0)
bg = np.median(np.concatenate([a[y1 + 3, x0:x1], a[y0:y1, x0 - 4], a[y0:y1, x1 + 4]]), axis=0)  # 下と 左右の 白から
a[y0 - 2:y1 + 3, x0 - 2:x1 + 3] = bg                       # もとの 字を 地の 色で 消す
h = y1 - y0 + 1; F = ImageFont.truetype(FONT, 40 * S, index=0)   # index 0 = JP
tmp = Image.new("L", (40 * S * 8, 40 * S * 2), 0); ImageDraw.Draw(tmp).text((20 * S, 20 * S), "しょうひん", font=F, fill=255)
g = tmp.crop(tmp.getbbox()); w = min(round(g.width * h / g.height), x1 - x0 + 1)
g = g.resize((w, h), Image.LANCZOS); gx = (x0 + x1) // 2 - w // 2
al = np.array(g).astype(float)[..., None] / 255
a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + col * al
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out_h)

# ② ぎげつけん の しるしを 消す
b = np.array(Image.open(sq).convert("RGB")).astype(float); assert b.shape[:2] == (1254, 1254)
X0, Y0, X1, Y1 = 803, 1152, 823, 1161
reg = b[Y0:Y1, X0:X1]; mk = reg.sum(axis=2) < 600
bgc = np.median(b[Y0 - 3:Y0, X0:X1].reshape(-1, 3), axis=0)
reg[mk] = bgc; b[Y0:Y1, X0:X1] = reg
Image.fromarray(b.clip(0, 255).astype(np.uint8)).save(out_s)
print("直した:", out_h, out_s)
