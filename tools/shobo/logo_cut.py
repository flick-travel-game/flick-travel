#!/usr/bin/env python3
"""フリック消防士: けいくんの 絵から 題名と アイコンを 作る(2026-10-01。料理人の logo_cut.py を もとに)
    python3 tools/shobo/logo_cut.py トップの絵.png [四角い絵.png] [見本.png]
作る もの: shobo/logo-word.webp(題名。すきとおる)/ shobo/hero.webp(1536×1024)/
          四角い 絵が あれば shobo/logo-mark2.webp(144px)/ icon-512.png / apple-touch-icon.png(180px)/ favicon.png(64px)
題名の 切りぬきかた: 字の まわりの こい 紺の ふちで かこまれた ところを うめる(料理人と 同じ)。
  下の 帯「うって まなぶ 消防の ことば!」・左下の ホースの 先・まわりの 水しぶきは 箱と 大きさで 落とす。
  「士」の 上の ヘルメットは 題名の 一部なので のこす
⚠️ トップの 絵は 説明の 字の まちがいを 直した もの(tools/shobo/fix_text.py)を わたす
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地)。大きさを 変えたら build_games.py の shobo の art.word も なおす
"""
import sys
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
HERO = sys.argv[1]
SQUARE = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != '-' else None
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
img = cv2.imread(HERO); assert img is not None and img.shape[:2] == (1024, 1536), 'トップの 絵は 1536×1024 で'
X0, Y0, X1, Y1 = 395, 565, 1085, 795
crop = img[Y0:Y1, X0:X1].copy(); hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, s, v = hsv[..., 0], hsv[..., 1] / 255, hsv[..., 2] / 255
ell = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
cut = np.zeros(H.shape, bool)
yy, xx = np.mgrid[Y0:Y1, X0:X1]
# 下の 帯は まんなかが 高い 弓なり。帯の 上の ふち(x 640 → y 702 / x 773 → 698 / x 907 → 712)を 2次式で なぞって 切る
_c = np.polyfit([640, 773, 907], [702, 698, 712], 2)
cut |= (yy >= np.polyval(_c, xx) - 1) & (xx >= 578) & (xx <= 948)   # リ・士の 足は 帯の 外
cut |= (yy >= 714) & (xx >= 548) & (xx < 578)   # 帯の 左の しっぽ(リの 右)
cut |= (yy >= 738) & (xx >= 515) & (xx < 578)   # しっぽの 先(リの 下)
cut |= (yy >= 729) & (xx >= 528) & (xx < 548)   # しっぽの 金の かど
cut |= (yy >= 714) & (xx > 948) & (xx < 962)    # 帯の 右の しっぽ(士の 左)
cut |= (yy < 593) & (xx < 560)                   # 左上に のぞく 男の子の 服(ふちに かこまれて 字に 見える)
cut |= (yy >= 748) & (xx < 578)                  # 左下の ホースの 先と 帯の 左はし
cut |= (yy >= 746) & (xx > 948)                  # 帯の 右はし
navy = ((H >= 100) & (H <= 160) & (v < 0.45) & (s > 0.25)).astype(np.uint8); navy[cut] = 0
core = ((s > 0.40) & (v > 0.55)).astype(np.uint8); core[cut] = 0          # 字の 中身(あざやか)
nz = cv2.dilate(navy, ell(9))
lab, n = ndimage.label(core)
keep = []
for i in range(1, n + 1):                   # 字の 中身 = まわりを 紺の ふちに ぐるっと かこまれた かたまり(葉っぱ・星・野菜は かこまれていない)
    c = (lab == i).astype(np.uint8)
    if c.sum() < 250: continue
    ring = cv2.dilate(c, ell(13)) & (1 - c)
    if navy[ring > 0].mean() > 0.22: keep.append(i)
fg = np.isin(lab, keep).astype(np.uint8)
enc = ndimage.binary_fill_holes(cv2.morphologyEx(navy | fg, cv2.MORPH_CLOSE, ell(3))).astype(np.uint8)
m = np.full(fg.shape, cv2.GC_BGD, np.uint8)
m[cv2.dilate(enc, ell(21)) > 0] = cv2.GC_PR_BGD
m[cv2.dilate(enc, ell(5)) > 0] = cv2.GC_PR_FGD
m[cv2.erode(fg, ell(3)) > 0] = cv2.GC_FGD
m[cut] = cv2.GC_BGD
bgm = np.zeros((1, 65)); fgm = np.zeros((1, 65))
cv2.grabCut(crop, m, None, bgm, fgm, 6, cv2.GC_INIT_WITH_MASK)
res = ((m == 1) | (m == 3)).astype(np.uint8)
res = ndimage.binary_fill_holes(res).astype(np.uint8) & cv2.dilate(enc, ell(7))   # 紺の ふちより 外の 光・葉っぱは 落とす
lab, n = ndimage.label(res); sz = ndimage.sum(res, lab, range(1, n + 1))
res = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 800]).astype(np.uint8)
M = cv2.GaussianBlur(res.astype(np.float32), (0, 0), 0.8)
a = (np.clip((M - .2) / .6, 0, 1) * 255).astype(np.uint8)
w = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)); w.putalpha(Image.fromarray(a)); w = w.crop(w.getbbox())
w.save('shobo/logo-word.webp', 'WEBP', quality=95, method=6); print('shobo/logo-word.webp', w.size)
Image.open(HERO).convert('RGB').save('shobo/hero.webp', 'WEBP', quality=88, method=6); print('shobo/hero.webp')
if SQUARE:
    sq = Image.open(SQUARE).convert('RGB'); assert sq.size[0] == sq.size[1], '四角い 絵は 正方形で'
    sq.resize((512, 512), Image.LANCZOS).save('shobo/icon-512.png')
    sq.resize((180, 180), Image.LANCZOS).save('shobo/apple-touch-icon.png')
    sq.resize((64, 64), Image.LANCZOS).save('shobo/favicon.png')
    sq.resize((144, 144), Image.LANCZOS).save('shobo/logo-mark2.webp', 'WEBP', quality=92, method=6)
    print('アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2')
if PREVIEW:
    p = Image.new('RGB', (w.width, w.height * 2 + 10), (255, 255, 255)); p.paste(w, (0, 0), w)
    dk = Image.new('RGB', w.size, (26, 22, 42)); dk.paste(w, (0, 0), w); p.paste(dk, (0, w.height + 10)); p.save(PREVIEW); print(PREVIEW)
