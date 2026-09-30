#!/usr/bin/env python3
"""フリック教師: けいくんの 絵から 題名と アイコンを 作る(2026-09-30。医師の logo_cut.py を もとに 切りぬきかたを 変えた)
    python3 tools/kyoshi/fix_text.py もとの横長.png 直した横長.png   # さきに 4択の「Q:」を 消す
    python3 tools/kyoshi/logo_cut.py 直した横長.png 四角い絵.png [見本.png]
作る もの: kyoshi/logo-word.webp(題名。すきとおる)/ kyoshi/hero.webp(1536×1024)/
          kyoshi/logo-mark2.webp(144px)/ icon-512.png / apple-touch-icon.png(180px)/ favicon.png(64px)
題名の 切りぬきかた(こい 紺の ふちで かこまれた ところ)
  ・この 絵は 字の まわりの 水色の 光も あざやかなので、医師の「あざやかな 中身 + GrabCut」だと 光ごと つながって「師」が 欠けた
  ・かわりに 字の こい 紺の ふち(H 95〜140・暗い)を 線と みなし、その 内がわを うめる(binary_fill_holes)
  ・「師」の 右は えんぴつ、下は 帯「うって まなぶ 教育の ことば!」と くっついて ふちが とぎれるので、
    x=1030 に たての 線、「師」の 下(y=721)に よこの 線を 足して とじてから うめ、そのあと 線の 右は 消す
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地)。大きさを 変えたら build_games.py の kyoshi の art.word も なおす
"""
import sys
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
HERO = sys.argv[1] if len(sys.argv) > 1 else 'yoko.png'
SQUARE = sys.argv[2] if len(sys.argv) > 2 else 'sq.png'
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
img = cv2.imread(HERO); assert img is not None and img.shape[:2] == (1024, 1536), 'トップの 絵は 1536×1024 で'
X0, Y0, X1, Y1 = 450, 585, 1045, 760
XR = 1030  # これより 右は えんぴつ
crop = img[Y0:Y1, X0:X1].copy(); hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, s, v = hsv[..., 0], hsv[..., 1] / 255, hsv[..., 2] / 255
ell = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
cut = np.zeros(H.shape, bool)
cut[722 - Y0:, 560 - X0:] = True        # 下の 帯
cut[742 - Y0:, :] = True                # 字の 下の 光・花
navy = ((H >= 95) & (H <= 140) & (v < 0.6) & (s > 0.3)).astype(np.uint8); navy[cut] = 0
navy[:722 - Y0, XR - X0:] = 0; navy[:722 - Y0, XR - X0] = 1; navy[721 - Y0, 900 - X0:XR - X0 + 1] = 1
enc = ndimage.binary_fill_holes(cv2.morphologyEx(navy, cv2.MORPH_CLOSE, ell(5))).astype(np.uint8); enc[:, XR - X0:] = 0
lab, n = ndimage.label(enc); sz = ndimage.sum(enc, lab, range(1, n + 1))
enc = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 1500]).astype(np.uint8)
enc = cv2.morphologyEx(enc, cv2.MORPH_OPEN, ell(3))
M = cv2.GaussianBlur(enc.astype(np.float32), (0, 0), 0.8)
a = (np.clip((M - .2) / .6, 0, 1) * 255).astype(np.uint8)
w = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)); w.putalpha(Image.fromarray(a)); w = w.crop(w.getbbox())
w.save('kyoshi/logo-word.webp', 'WEBP', quality=95, method=6); print('kyoshi/logo-word.webp', w.size)
Image.open(HERO).convert('RGB').save('kyoshi/hero.webp', 'WEBP', quality=88, method=6); print('kyoshi/hero.webp')
sq = Image.open(SQUARE).convert('RGB'); assert sq.size[0] == sq.size[1], '四角い 絵は 正方形で'
sq.resize((512, 512), Image.LANCZOS).save('kyoshi/icon-512.png')
sq.resize((180, 180), Image.LANCZOS).save('kyoshi/apple-touch-icon.png')
sq.resize((64, 64), Image.LANCZOS).save('kyoshi/favicon.png')
sq.resize((144, 144), Image.LANCZOS).save('kyoshi/logo-mark2.webp', 'WEBP', quality=92, method=6)
print('アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2')
if PREVIEW:
    p = Image.new('RGB', (w.width, w.height * 2 + 10), (255, 255, 255)); p.paste(w, (0, 0), w)
    dk = Image.new('RGB', w.size, (26, 22, 42)); dk.paste(w, (0, 0), w); p.paste(dk, (0, w.height + 10)); p.save(PREVIEW); print(PREVIEW)
