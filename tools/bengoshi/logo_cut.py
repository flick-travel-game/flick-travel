#!/usr/bin/env python3
"""フリック弁護士: けいくんの 絵から 題名と アイコンを 作る(2026-10-01。警察官の logo_cut.py を もとに)
    python3 tools/bengoshi/logo_cut.py トップの絵.png [四角い絵.png] [見本.png]
作る もの: bengoshi/logo-word.webp(題名。すきとおる)/ bengoshi/hero.webp(1536×1024)/
          四角い 絵が あれば bengoshi/logo-mark2.webp(144px)/ icon-512.png / apple-touch-icon.png(180px)/ favicon.png(64px)
題名の 切りぬきかた: 字の まわりの こい 紺の ふちで かこまれた ところを うめる(料理人と 同じ)。
  下の 帯「うって まなぶ 法律の ことば!」・左の 木づち・右の 天びんは 箱で 落とす
⚠️ トップの絵は 絵の 中で 3か所 直してから 渡す(tools/bengoshi/fix_text.py): じゅうけん → じゆうけん / はいばい → ばいばい / 法律律・予備試験の 難語 → 法学部・予備試験の 範囲
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地)。大きさを 変えたら build_games.py の bengoshi の art.word も なおす
"""
import sys
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
HERO = sys.argv[1]
SQUARE = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != '-' else None
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
img = cv2.imread(HERO); assert img is not None and img.shape[:2] == (1024, 1536), 'トップの 絵は 1536×1024 で'
X0, Y0, X1, Y1 = 410, 600, 1140, 760
crop = img[Y0:Y1, X0:X1].copy(); hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, s, v = hsv[..., 0], hsv[..., 1] / 255, hsv[..., 2] / 255
ell = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
cut = np.zeros(H.shape, bool)
yy, xx = np.mgrid[Y0:Y1, X0:X1]
cut |= (xx >= 530) & (xx < 982) & (yy >= 722)   # 下の 帯「うって まなぶ 法律の ことば!」
cut |= yy >= 752                                 # 帯の 下
cut |= (xx < 455) & (yy >= 700)                  # 左の 木づち
cut |= (xx >= 1048) & (yy >= 722)                # 右の 天びん
navy = ((H >= 100) & (H <= 160) & (v < 0.45) & (s > 0.25)).astype(np.uint8)  # ⚠️ ここでは 箱で 落とさない(字の 下の ふちが 帯の 箱に かかっていて、落とすと ふちが 切れて うめられない)
# この 絵の 題名は「護」「士」が うすい ピンクで あざやかでは ないので、紺の ふちの 中を まるごと うめる(料理人・警察官の「あざやかな 中身」は 使わない)
enc = ndimage.binary_fill_holes(cv2.dilate(navy, ell(7)) | cut).astype(np.uint8)   # ふちの すきまを ふさぎ、帯の 箱も かべに して うめる(字の 下の ふちが 帯に かくれているため)
enc = cv2.morphologyEx(enc, cv2.MORPH_OPEN, ell(9)); enc[cut] = 0             # 細い 線(本の 字・木の 枝)を 落とす
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
# 字の 下と 帯の あいだに はさまった 緑の 葉っぱを 落とす(「弁」は 緑なので その 列は のぞく)
leaf = (H >= 35) & (H <= 80) & (s > 0.35) & (yy >= 700) & (yy < 722) & (((xx >= 450) & (xx < 760)) | ((xx >= 885) & (xx < 982)))
res[cv2.dilate(leaf.astype(np.uint8), ell(5)) > 0] = 0
lab, n = ndimage.label(res); sz = ndimage.sum(res, lab, range(1, n + 1))
res = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 800]).astype(np.uint8)
M = cv2.GaussianBlur(res.astype(np.float32), (0, 0), 0.8)
a = (np.clip((M - .2) / .6, 0, 1) * 255).astype(np.uint8)
w = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)); w.putalpha(Image.fromarray(a)); w = w.crop(w.getbbox())
w.save('bengoshi/logo-word.webp', 'WEBP', quality=95, method=6); print('bengoshi/logo-word.webp', w.size)
Image.open(HERO).convert('RGB').save('bengoshi/hero.webp', 'WEBP', quality=88, method=6); print('bengoshi/hero.webp')
if SQUARE:
    sq = Image.open(SQUARE).convert('RGB'); assert sq.size[0] == sq.size[1], '四角い 絵は 正方形で'
    sq.resize((512, 512), Image.LANCZOS).save('bengoshi/icon-512.png')
    sq.resize((180, 180), Image.LANCZOS).save('bengoshi/apple-touch-icon.png')
    sq.resize((64, 64), Image.LANCZOS).save('bengoshi/favicon.png')
    sq.resize((144, 144), Image.LANCZOS).save('bengoshi/logo-mark2.webp', 'WEBP', quality=92, method=6)
    print('アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2')
if PREVIEW:
    p = Image.new('RGB', (w.width, w.height * 2 + 10), (255, 255, 255)); p.paste(w, (0, 0), w)
    dk = Image.new('RGB', w.size, (26, 22, 42)); dk.paste(w, (0, 0), w); p.paste(dk, (0, w.height + 10)); p.save(PREVIEW); print(PREVIEW)
