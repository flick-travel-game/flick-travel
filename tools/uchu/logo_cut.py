#!/usr/bin/env python3
"""フリック宇宙旅行: トップの 絵(けいくんの ChatGPT の 絵 2026-09-27)から 題名を 切りぬく → uchu/logo-word.webp
    python3 tools/uchu/logo_cut.py もとの絵.png uchu/logo-word.webp 見本.png
- 白い ふちが 「フ」の 左下で とぎれていて tools/logo-sticker-cut.py では「フ」が 落ちた。色で 拾う tools/logo-word-cut.py も 宇宙の 背景の 色が こくて だめ
- GrabCut(tools/kabu/logo_cut.py と 同じ 方法)。色の こい ところを「たぶん 字」、暗い ところを「背景」に して はじめる。王冠・コンパス・矢印は 入れない
⚠️ GrabCut は 毎回 すこし 結果が ちがう。できた 絵は かならず 目で 見る。大きさを 変えたら build_games.py の uchu の art.word も なおす"""
import numpy as np, cv2, sys
from PIL import Image, ImageFilter
from scipy import ndimage
img=cv2.imread(sys.argv[1]); H0,W0=img.shape[:2]
x0,y0,x1,y1=int(.14*W0),int(.705*H0),int(.83*W0),int(.915*H0)
crop=img[y0:y1,x0:x1].copy(); h,w=crop.shape[:2]
hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV); s=hsv[...,1]/255.; v=hsv[...,2]/255.
mask=np.full((h,w),cv2.GC_PR_BGD,np.uint8)
mask[(s>.55)&(v>.55)]=cv2.GC_PR_FGD
mask[(v<.35)]=cv2.GC_BGD
mask[:3,:]=mask[-3:,:]=cv2.GC_BGD; mask[:,:3]=mask[:,-3:]=cv2.GC_BGD
bgd=np.zeros((1,65));fgd=np.zeros((1,65))
cv2.grabCut(crop,mask,None,bgd,fgd,8,cv2.GC_INIT_WITH_MASK)
fg=(mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD)
fg=ndimage.binary_opening(fg,np.ones((3,3)))
lab,n=ndimage.label(fg); sz=ndimage.sum(fg,lab,range(1,n+1))
for i,z in enumerate(sz):
  if z>800:
    sl=ndimage.find_objects((lab==i+1).astype(int))[0]; print(int(z),sl[1].start,sl[1].stop,sl[0].start,sl[0].stop)
keep=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>1500])
holes=ndimage.binary_fill_holes(keep)&~keep; hl,hn=ndimage.label(holes); hs=ndimage.sum(holes,hl,range(1,hn+1))
keep|=np.isin(hl,[i+1 for i,z in enumerate(hs) if z<400])
out=Image.fromarray(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB)).convert("RGBA")
out.putalpha(Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))
ys,xs=np.nonzero(keep); out=out.crop((xs.min()-3,ys.min()-3,xs.max()+4,ys.max()+4))
out.save(sys.argv[2],"WEBP",quality=95,method=6); print(out.size)
bg=Image.new("RGB",out.size,(255,255,255)); bg.paste(out,(0,0),out); bg.save(sys.argv[3])
