#!/usr/bin/env python3
"""フリック英会話: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-27)から 題名「フリック英会話」を 切りぬく → eikaiwa/logo-word.webp
    python3 tools/eikaiwa/logo_cut.py もとの絵.png eikaiwa/logo-word.webp 見本.png
- tools/rika/logo_cut.py と 同じ(紺の ふちで かこんで うめる)。上の 飛行機・右うえの かけら・三角の 星は 座標で 落とす
⚠️ できた 絵は かならず 目で 見る。大きさを 変えたら build_games.py の eikaiwa の art.word も なおす"""
import numpy as np, cv2, sys
from PIL import Image, ImageFilter
from scipy import ndimage
img = cv2.imread(sys.argv[1]); H0, W0 = img.shape[:2]
x0, y0, x1, y1 = 262, 700, 1160, 990
crop = img[y0:y1, x0:x1].copy(); h, w = crop.shape[:2]
hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, S, V = hsv[..., 0], hsv[..., 1] / 255., hsv[..., 2] / 255.
navy = (H >= 100) & (H <= 128) & (S > .45) & (V < .62)
navy = cv2.morphologyEx(navy.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (23, 23))).astype(bool)  # ふちの すきま(白い つや)を つなぐ
# 指の 手(白と 灰色。紺の ふちが ない)は 絵の 座標の 箱の 中の 色の うすい ところを 足す(絵を 差しかえたら 見なおす)
hx0, hy0, hx1, hy1 = 0, 0, 0, 0
hand = np.zeros((h, w), bool); hand[hy0:hy1, hx0:hx1] = (S[hy0:hy1, hx0:hx1] < .22)
hand = ndimage.binary_fill_holes(cv2.morphologyEx(hand.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8)).astype(bool))
filled = ndimage.binary_fill_holes(navy | hand)
filled[:5, :] = False; filled[:40, :300] = False; filled[:92, 490:] = False; filled[:104, 790:] = False  # 飛行機・右うえの かけら・三角の 星は 字では ない
lab, n = ndimage.label(filled); sizes = ndimage.sum(filled, lab, range(1, n + 1))
keep = lab == (int(np.argmax(sizes)) + 1)  # いちばん 大きい かたまり = 題名(空の 星などの 小さな かけらは すてる)
keep = cv2.dilate(keep.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)

out = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)).convert("RGBA")
out.putalpha(Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))
ys, xs = np.nonzero(keep); out = out.crop((xs.min() - 2, ys.min() - 2, xs.max() + 3, ys.max() + 3))
out.save(sys.argv[2], "WEBP", quality=95, method=6); print(out.size)
bg=Image.new("RGB",out.size,(255,255,255)); bg.paste(out,(0,0),out); bg.save(sys.argv[3])
