#!/usr/bin/env python3
"""フリック医師: けいくんの 絵から 題名と アイコンを 作る(2026-09-30。美容師の logo_cut.py を 写した)
    python3 tools/ishi/logo_cut.py トップの絵.png 四角い絵.png [見本.png]
作る もの: ishi/logo-word.webp(題名。すきとおる)/ ishi/hero.webp(1536×1024)/
          ishi/logo-mark2.webp(144px)/ icon-512.png / apple-touch-icon.png(180px)/ favicon.png(64px)
題名の 切りぬきかた(GrabCut)
  ① 鮮やかな 字の 中身の かたまりの うち、こい 紺の ふちの そばに ある ものを「かならず 字」に する
  ② 紺の ふちで かこまれた ところは「たぶん 字」(「リ」の 上の 聴診器の 耳の ところも 入る)
  ③ 下の 帯「うって まなぶ 医療の ことば!」・右の 病院の 絵・左の 聴診器の 先・右上の きらきら・字の 下の 光は 箱で 落とす
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地)。大きさを 変えたら build_games.py の ishi の art.word も なおす
"""
import sys
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
HERO = sys.argv[1] if len(sys.argv) > 1 else 'yoko.png'
SQUARE = sys.argv[2] if len(sys.argv) > 2 else 'sq.png'
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
img = cv2.imread(HERO); assert img is not None and img.shape[:2] == (1024, 1536), 'トップの 絵は 1536×1024 で'
X0, Y0, X1, Y1 = 448, 572, 1045, 748
crop = img[Y0:Y1, X0:X1].copy(); hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, s, v = hsv[..., 0], hsv[..., 1] / 255, hsv[..., 2] / 255
ell = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
cut = np.zeros(H.shape, bool)
cut[712 - Y0:, 572 - X0:] = True        # 下の 帯
cut[690 - Y0:, 1034 - X0:] = True       # 右の 病院の 絵
cut[716 - Y0:, :] = True                # 字の 下の 光
cut[662 - Y0:, :470 - X0] = True; cut[696 - Y0:, :505 - X0] = True        # 左の 聴診器の 先(まるい ところと 管)
cut[:604 - Y0, 985 - X0:] = True        # 右上の きらきら
core = ((s > 0.40) & (v > 0.55)).astype(np.uint8); core[cut] = 0
navy = ((H >= 95) & (H <= 140) & (v < 0.6) & (s > 0.3)).astype(np.uint8); navy[cut] = 0
nz = cv2.dilate(navy, ell(9))
lab, n = ndimage.label(core); sz = ndimage.sum(core, lab, range(1, n + 1)); tn = ndimage.sum(nz, lab, range(1, n + 1))
fg = np.isin(lab, [i + 1 for i in range(n) if sz[i] > 250 and tn[i] / sz[i] > 0.15]).astype(np.uint8)
enc = ndimage.binary_fill_holes(cv2.morphologyEx(navy | fg, cv2.MORPH_CLOSE, ell(3))).astype(np.uint8)
m = np.full(fg.shape, cv2.GC_BGD, np.uint8)
m[cv2.dilate(enc, ell(21)) > 0] = cv2.GC_PR_BGD
m[cv2.dilate(enc, ell(5)) > 0] = cv2.GC_PR_FGD
m[cv2.erode(fg, ell(3)) > 0] = cv2.GC_FGD
m[cut] = cv2.GC_BGD
bg = np.zeros((1, 65)); fgm = np.zeros((1, 65))
cv2.grabCut(crop, m, None, bg, fgm, 6, cv2.GC_INIT_WITH_MASK)
res = ((m == 1) | (m == 3)).astype(np.uint8)
res = ndimage.binary_fill_holes(res).astype(np.uint8)
lab, n = ndimage.label(res); sz = ndimage.sum(res, lab, range(1, n + 1))
res = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 800]).astype(np.uint8)
M = cv2.GaussianBlur(res.astype(np.float32), (0, 0), 0.8)
a = (np.clip((M - .2) / .6, 0, 1) * 255).astype(np.uint8)
w = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)); w.putalpha(Image.fromarray(a)); w = w.crop(w.getbbox())
w.save('ishi/logo-word.webp', 'WEBP', quality=95, method=6); print('ishi/logo-word.webp', w.size)
Image.open(HERO).convert('RGB').save('ishi/hero.webp', 'WEBP', quality=88, method=6); print('ishi/hero.webp')
sq = Image.open(SQUARE).convert('RGB'); assert sq.size[0] == sq.size[1], '四角い 絵は 正方形で'
sq.resize((512, 512), Image.LANCZOS).save('ishi/icon-512.png')
sq.resize((180, 180), Image.LANCZOS).save('ishi/apple-touch-icon.png')
sq.resize((64, 64), Image.LANCZOS).save('ishi/favicon.png')
sq.resize((144, 144), Image.LANCZOS).save('ishi/logo-mark2.webp', 'WEBP', quality=92, method=6)
print('アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2')
if PREVIEW:
    p = Image.new('RGB', (w.width, w.height * 2 + 10), (255, 255, 255)); p.paste(w, (0, 0), w)
    dk = Image.new('RGB', w.size, (26, 22, 42)); dk.paste(w, (0, 0), w); p.paste(dk, (0, w.height + 10)); p.save(PREVIEW); print(PREVIEW)
