#!/usr/bin/env python3
"""フリック警察官: けいくんの トップの絵(2回目・2026-10-01)の 字の まちがい 2か所を、四角い絵の 正しい 字で 直す
    python3 tools/keisatsu/fix_text.py トップの絵.png 四角い絵.png 出す.png
  ① 「交番と まちの ことば」の 札「せせん」→「むせん」: 1字目の「せ」を 白で 消し、四角い絵の「む」(赤)を 16/18 に 縮めて 置く
  ② 黒板「まちの みんなの あんぜんために!」(の が ぬけている)→ 黒板の 字を ぜんぶ 消して(inpaint)、
     四角い絵の 黒板の 字「まちの みんなの 安心のために! ☺」を 高さ 95px に 縮めて チョークの 色で 置く
⚠️ 位置は この 2枚の 絵だけの 数字。絵を 差しかえたら 測りなおす(赤い 字 / 明るい チョークの 画素を 数える)"""
import sys
import numpy as np, cv2
from PIL import Image
H = np.array(Image.open(sys.argv[1]).convert('RGB')).astype(float)
S = np.array(Image.open(sys.argv[2]).convert('RGB'))
assert H.shape[:2] == (1024, 1536) and S.shape[:2] == (1254, 1254)
# ① むせん
g = Image.fromarray(S).crop((334, 217, 353, 238)); s = 16 / 18
g = np.array(g.resize((round(19 * s), round(21 * s)), Image.LANCZOS)).astype(float)
al = np.clip((255 - g[..., 1]) / 195, 0, 1)
H[177:199, 379:399] = 255
gx, gy = round(388.5 - g.shape[1] / 2), round(187.5 - g.shape[0] / 2)
r = H[gy:gy + g.shape[0], gx:gx + g.shape[1]]; r[:] = r * (1 - al[..., None]) + g * al[..., None]
# ② 黒板
def ink(img, box):
    x0, y0, x1, y1 = box; L = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    m = np.zeros(L.shape, np.uint8); m[y0:y1, x0:x1] = (L[y0:y1, x0:x1] > 110).astype(np.uint8) * 255
    return L, cv2.dilate(m, np.ones((5, 5), np.uint8))
Hu = H.astype(np.uint8); _, m = ink(Hu, (962, 180, 1092, 284)); Hc = cv2.inpaint(Hu, m, 5, cv2.INPAINT_TELEA).astype(float)
sx0, sy0, sx1, sy1 = 748, 218, 870, 345
Ls, m = ink(S, (sx0, sy0, sx1, sy1)); bg = cv2.inpaint(S, m, 5, cv2.INPAINT_TELEA)
Lt = Ls[sy0:sy1, sx0:sx1].astype(float); Lb = cv2.cvtColor(bg, cv2.COLOR_RGB2GRAY)[sy0:sy1, sx0:sx1].astype(float)
a = np.clip((Lt - Lb) / np.maximum(240 - Lb, 1), 0, 1)
a[cv2.cvtColor(S, cv2.COLOR_RGB2HSV)[sy0:sy1, sx0:sx1, 1] > 110] = 0; a[a < 0.08] = 0
n, lab, st, _ = cv2.connectedComponentsWithStats((a > 0.15).astype(np.uint8), 8)
for i in range(1, n):  # 左上の オレンジの 線の 切れはし
    if st[i][0] < 14 and st[i][1] + st[i][3] < 45: a[lab == i] = 0
ys, xs = np.where(a > 0.3); a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
sc = 95 / a.shape[0]; w, h = round(a.shape[1] * sc), round(a.shape[0] * sc)
a2 = cv2.resize(a, (w, h), interpolation=cv2.INTER_AREA)
r = Hc[185:185 + h, 968:968 + w]; r[:] = r * (1 - a2[..., None]) + np.array([240, 244, 240.]) * a2[..., None]
Image.fromarray(Hc.astype(np.uint8)).save(sys.argv[3]); print(sys.argv[3])
