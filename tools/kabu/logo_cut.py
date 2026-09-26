#!/usr/bin/env python3
"""株式フリック旅行: トップの 絵(けいくんの ChatGPT の 絵)から 題名「株式フリック旅行」を 切りぬく → kabu/logo-word.webp
    pip install opencv-python-headless scipy pillow
    python3 tools/kabu/logo_cut.py もとの絵.png kabu/logo-word.webp
- ほかの ゲームの tools/logo-word-cut.py(色の こい ところを 拾う)は、この 絵では 空や 地図も 色が こいので 使えなかった
- GrabCut(写真の 切りぬきの 方法)。字の 帯を「たぶん 字」、黒い スマホの ふち・左はしを「背景」に して はじめる
- 「リ」の 左の 線(地図と 同じ 水色)と「フ」の 内がわの すきまは 絵の 座標で 手で 決めた(絵を 差しかえたら 見なおす)
⚠️ GrabCut は 毎回 すこし 結果が ちがう(王冠が 入ったり 入らなかったり)。できた 絵は かならず 目で 見る
⚠️ 大きさを 変えたら tools/build_games.py の kabu の art.word も なおす"""
import numpy as np, cv2
from PIL import Image, ImageFilter
from scipy import ndimage
import sys
img = cv2.imread(sys.argv[1]); H0, W0 = img.shape[:2]
x0,y0,x1,y1 = int(.17*W0), int(.68*H0), int(.82*W0), int(.965*H0)
crop = img[y0:y1, x0:x1].copy(); h, w = crop.shape[:2]
hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
s = hsv[...,1]/255.; v = hsv[...,2]/255.
white = (v > .88) & (s < .18)
mask = np.full((h, w), cv2.GC_PR_BGD, np.uint8)
# 字の 帯(だいたい): 真ん中あたりの 高さ
band = np.zeros((h,w),bool); band[int(h*.12):int(h*.86), int(w*.04):int(w*.99)] = True
mask[band] = cv2.GC_PR_FGD
# 黒っぽい ところ(スマホの ふち)と 左はし(カート・方位磁針)は 背景
mask[(v < .30) & (s < .45)] = cv2.GC_BGD
mask[:, :int(w*.035)] = cv2.GC_BGD
mask[:int(h*.30), :int(w*.13)] = cv2.GC_BGD
# 「リ」の 左の 線(地図と 同じ 水色なので 背景と まちがえる)は 字 / 「フ」の 内がわの すきまは 背景(絵の 座標で 見て 決めた)
mask[790-y0:895-y0, 702-x0:717-x0] = cv2.GC_FGD
mask[828-y0:858-y0, 592-x0:632-x0] = cv2.GC_BGD
# はしの 帯は 背景
mask[:4,:] = mask[-4:,:] = cv2.GC_BGD; mask[:, :4] = mask[:, -4:] = cv2.GC_BGD
bgd = np.zeros((1,65),np.float64); fgd = np.zeros((1,65),np.float64)
cv2.grabCut(crop, mask, None, bgd, fgd, 8, cv2.GC_INIT_WITH_MASK)
fg = (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD)
lab, n = ndimage.label(fg); sizes = ndimage.sum(fg, lab, range(1, n+1))
keep = np.isin(lab, [i+1 for i, sz in enumerate(sizes) if sz > 1500])
holes = ndimage.binary_fill_holes(keep) & ~keep  # 小さな 穴(つやの 光)だけ うめる
hl, hn = ndimage.label(holes); hs = ndimage.sum(holes, hl, range(1, hn+1))
keep |= np.isin(hl, [i+1 for i, z in enumerate(hs) if z < 400])
out = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)).convert("RGBA")
out.putalpha(Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))
ys, xs = np.nonzero(keep); out = out.crop((xs.min()-3, ys.min()-3, xs.max()+4, ys.max()+4))
out.save(sys.argv[2],"WEBP",quality=95,method=6); print(out.size)

