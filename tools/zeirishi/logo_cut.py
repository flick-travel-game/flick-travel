#!/usr/bin/env python3
"""フリック税理士: けいくんの 絵から 題名と アイコンを 作る(2026-10-01。弁護士の logo_cut.py を もとに)
    python3 tools/zeirishi/logo_cut.py トップの絵.png [四角い絵.png または -] [見本.png]
作る もの: zeirishi/logo-word.webp(題名。すきとおる)/ zeirishi/hero.webp(1536×1024)/
          zeirishi/logo-mark2.webp(144px)/ icon-512.png / apple-touch-icon.png(180px)/ favicon.png(64px)
          四角い 絵が 無い ときは トップの 絵の まん中(ふたりと 犬)を 切って アイコンに する(弁護士と 同じ)
題名の 切りぬきかた: 字の まわりの こい 紺の ふちで かこまれた ところを うめる(弁護士と 同じ)。
  下の 帯「うって まなぶ 税の ことば!」・右上の 電卓・右下の 本は 箱で 落とす
⚠️ トップの絵は 絵の 中で 直してから 渡す(tools/zeirishi/fix_text.py): げんぜん → げんせん / しゃうぶ → しゃうぷ / 旗を 日本と アメリカに
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地)。大きさを 変えたら build_games.py の zeirishi の art.word も なおす
"""

import sys
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
HERO = sys.argv[1]
SQUARE = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != '-' else None
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
SQ_BOX = (480, 80, 980, 580)  # 四角い 絵が 無い ときの アイコン: ふたりと 犬
SQ_IN_BOX = (408, 235, 872, 699)  # 四角い 絵(2026-10-01)の まん中: 左右の 札の 列の あいだの ふたりと 犬
img = cv2.imread(HERO); assert img is not None and img.shape[:2] == (1024, 1536), 'トップの 絵は 1536×1024 で'
X0, Y0, X1, Y1 = 440, 588, 1100, 760
crop = img[Y0:Y1, X0:X1].copy(); hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, s, v = hsv[..., 0], hsv[..., 1] / 255, hsv[..., 2] / 255
ell = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
cut = np.zeros(H.shape, bool)
yy, xx = np.mgrid[Y0:Y1, X0:X1]
band_top = np.interp(xx, [555, 650, 740, 860, 965], [710, 702, 698, 700, 706])
cut |= (xx >= 555) & (xx < 975) & (yy >= band_top)   # 下の 帯「うって まなぶ 税の ことば!」
cut |= yy >= 745                                     # 帯の 下
cut |= (xx >= 985) & (yy < 630)                      # 右上の 電卓
cut |= (xx >= 990) & (yy >= 716)                     # 右下の 本
cut |= (xx >= 600) & (xx < 790) & (yy < 600)          # 上の 犬の 足と 葉っぱ
cut |= (xx >= 560) & (xx < 855) & (yy < 615) & (((s < 0.25) & (v > 0.7)) | ((H >= 30) & (H <= 85) & (s > 0.3)))  # 字の 上に かかる 白い 毛と 葉っぱ(「理」の 緑は x 860 から)
cut |= xx >= 1080                                    # 右の はしの 電卓
cut |= (xx >= 1030) & (yy < 670) & (s < 0.55) & (v > 0.4)   # 「士」の 右上に 見える 机(木の 色)
cut |= (xx < 500) & (H >= 30) & (H <= 85) & (s > 0.3)   # 「フ」の 左下の 葉っぱ
cut |= (xx >= 955) & (yy >= 712)                     # 「士」の 下の 金貨
navy = ((H >= 100) & (H <= 160) & (v < 0.45) & (s > 0.25)).astype(np.uint8)
# 字の 中身は あざやかな にじ色(この 絵は どの 字も あざやか)。紺の ふち + あざやかな 中身 を あわせて うめる
vivid = ((s > 0.45) & (v > 0.6)).astype(np.uint8)
enc = cv2.morphologyEx(navy | vivid, cv2.MORPH_CLOSE, ell(5))
enc[cut] = 0
enc = ndimage.binary_fill_holes(enc).astype(np.uint8)
enc &= cv2.dilate(navy, ell(25))                                             # 紺の ふちから はなれた もの(葉っぱ・机・電卓の はし)を 落とす
enc = ndimage.binary_fill_holes(enc).astype(np.uint8)
# 紺の ふちで かこまれた ところ(弁護士の やりかた)も 足す。「士」は ふちから 遠い 中身が あるので こちらで うまる
encA = ndimage.binary_fill_holes(cv2.dilate(navy, ell(7)) | cut).astype(np.uint8); encA[cut] = 0
enc = enc | encA
enc = cv2.morphologyEx(enc, cv2.MORPH_OPEN, ell(9)); enc[cut] = 0             # 細い 線(えんぴつ・葉っぱ)を 落とす
lab, n = ndimage.label(enc); sz = ndimage.sum(enc, lab, range(1, n + 1))
enc = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 1500]).astype(np.uint8)
m = np.full(enc.shape, cv2.GC_BGD, np.uint8)                                  # ふくらんだ ぶんを GrabCut で けずる
m[cv2.dilate(enc, ell(9)) > 0] = cv2.GC_PR_BGD
m[enc > 0] = cv2.GC_PR_FGD
m[cv2.erode(enc, ell(11)) > 0] = cv2.GC_FGD
m[cut] = cv2.GC_BGD
bgm = np.zeros((1, 65)); fgm = np.zeros((1, 65))
cv2.grabCut(crop, m, None, bgm, fgm, 6, cv2.GC_INIT_WITH_MASK)
res = (((m == 1) | (m == 3)) & (enc > 0)).astype(np.uint8)
res = ndimage.binary_fill_holes(res).astype(np.uint8)
# (弁護士で 使った 葉っぱ 落とし。この 絵では 要らない)
leaf = (H >= 35) & (H <= 80) & (s > 0.35) & (v < 0.75) & (yy >= 700) & (yy < 722) & (xx >= 540) & (xx < 980) & False
res[cv2.dilate(leaf.astype(np.uint8), ell(5)) > 0] = 0
lab, n = ndimage.label(res); sz = ndimage.sum(res, lab, range(1, n + 1))
res = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 800]).astype(np.uint8)
M = cv2.GaussianBlur(res.astype(np.float32), (0, 0), 0.8)
a = (np.clip((M - .2) / .6, 0, 1) * 255).astype(np.uint8)
w = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)); w.putalpha(Image.fromarray(a)); w = w.crop(w.getbbox())
w.save('zeirishi/logo-word.webp', 'WEBP', quality=95, method=6); print('zeirishi/logo-word.webp', w.size)
Image.open(HERO).convert('RGB').save('zeirishi/hero.webp', 'WEBP', quality=88, method=6); print('zeirishi/hero.webp')
if SQUARE:
    sq = Image.open(SQUARE).convert('RGB')
    if sq.size == (1254, 1254): sq = sq.crop(SQ_IN_BOX)   # 四角い 絵も 札で いっぱい なので、まん中の ふたりと 犬だけ
else:  # 右上に かかる 吹き出し(「ことばで ひろがる 税の せかい!」の 字が 切れる)を まわりの 色で うめてから 切る
    hb = cv2.imread(HERO); bub = np.zeros(hb.shape[:2], np.uint8)
    rg = hb[40:155, 870:1070]; g = cv2.cvtColor(rg, cv2.COLOR_BGR2GRAY)
    bub[40:155, 870:1070] = ((g > 200) | (rg[..., 0] > 150) & (rg[..., 2] < 120)).astype(np.uint8)
    bub = cv2.dilate(cv2.morphologyEx(bub, cv2.MORPH_CLOSE, ell(15)), ell(7))
    hb = cv2.inpaint(hb, bub, 9, cv2.INPAINT_TELEA)
    sq = Image.fromarray(cv2.cvtColor(hb, cv2.COLOR_BGR2RGB)).crop(SQ_BOX)
if True:
    assert sq.size[0] == sq.size[1], '四角い 絵は 正方形で'
    sq.resize((512, 512), Image.LANCZOS).save('zeirishi/icon-512.png')
    sq.resize((180, 180), Image.LANCZOS).save('zeirishi/apple-touch-icon.png')
    sq.resize((64, 64), Image.LANCZOS).save('zeirishi/favicon.png')
    sq.resize((144, 144), Image.LANCZOS).save('zeirishi/logo-mark2.webp', 'WEBP', quality=92, method=6)
    print('アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2')
if PREVIEW:
    p = Image.new('RGB', (w.width, w.height * 2 + 10), (255, 255, 255)); p.paste(w, (0, 0), w)
    dk = Image.new('RGB', w.size, (26, 22, 42)); dk.paste(w, (0, 0), w); p.paste(dk, (0, w.height + 10)); p.save(PREVIEW); print(PREVIEW)
