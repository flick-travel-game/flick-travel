#!/usr/bin/env python3
"""フリック数学旅行: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-27)から 題名「フリック数学旅行」を 切りぬく → sugaku/logo-word.webp
    python3 tools/sugaku/logo_cut.py もとの絵.png sugaku/logo-word.webp 見本.png
- 字の 外がわの こい 青の ふちで かこまれた ところを ひろう(白い ふちも 入る)。下の 金の 帯(数学のせかいを…)は 入れない
⚠️できた 絵は かならず 目で 見る。大きさを 変えたら build_games.py の sugaku の art.word も なおす"""
import numpy as np, cv2, sys
from PIL import Image, ImageFilter
from scipy import ndimage
img=cv2.imread(sys.argv[1])
x0,y0,x1,y1=295,600,1048,768
crop=img[y0:y1,x0:x1].copy(); h,w=crop.shape[:2]
hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV); s=hsv[...,1]/255.; v=hsv[...,2]/255.
# 字(こい 色)→ 白い ふち → こい 青の ふち の ステッカーの 形。字の 近く(14px)の 白も 入れて、大きく 閉じて 穴を うめ、ふちを なめらかに
core=(s>.62)&(v>.5); core[150:,:]=False  # 下の 金の 帯(数学のせかいを…)は 入れない
core=ndimage.binary_opening(core,np.ones((5,5)))
seed=(s>.8)&(v>.6); lc,_=ndimage.label(core); core=np.isin(lc,np.unique(lc[seed&core])[1:])  # 字の しんを もつ かたまりだけ
near=ndimage.binary_dilation(core,iterations=10)
white=(v>.85)&(s<.2)&near
fg=cv2.morphologyEx((core|white).astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9))).astype(bool)
fg=ndimage.binary_fill_holes(fg)
fg=cv2.morphologyEx(fg.astype(np.uint8),cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7))).astype(bool)
lab,n=ndimage.label(fg); sz=ndimage.sum(fg,lab,range(1,n+1))
for i,z in enumerate(sz):
  if z>800:
    sl=ndimage.find_objects((lab==i+1).astype(int))[0]; print(int(z),sl[1].start,sl[1].stop,sl[0].start,sl[0].stop)
keep=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>1500])
keep=ndimage.binary_fill_holes(keep)
out=Image.fromarray(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB)).convert("RGBA")
out.putalpha(Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))
ys,xs=np.nonzero(keep); out=out.crop((xs.min()-3,ys.min()-3,xs.max()+4,ys.max()+4))
out.save(sys.argv[2],"WEBP",quality=95,method=6); print(out.size)
for name,col in [('w',(255,255,255)),('d',(30,30,40))]:
  bg=Image.new("RGB",out.size,col); bg.paste(out,(0,0),out); bg.save(sys.argv[3].replace('.png',f'-{name}.png'))
