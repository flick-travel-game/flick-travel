#!/usr/bin/env python3
"""パティシエフリック: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-27)から 題名「パティシエフリック」を 切りぬく → patissier/logo-word.webp
    python3 tools/patissier/logo_cut.py もとの絵.png patissier/logo-word.webp 見本.png
- 字の まわりの こい 紫・紺の ふちを ひろって うめる。細い とげ(まわりの お菓子の かけら)は ひらいて 落とし、3000px より 小さい かたまりは すてる
⚠️ できた 絵は かならず 目で 見る。大きさを 変えたら build_games.py の patissier の art.word も なおす"""
import numpy as np, cv2, sys
from PIL import Image
img=cv2.imread(sys.argv[1])
x0,y0,x1,y1=255,600,1250,860
crop=img[y0:y1,x0:x1]
hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV)
H,S,V=hsv[...,0],hsv[...,1]/255.,hsv[...,2]/255.
m=(((H>=125)|(H<5))&(V<.55)&(S>.35))|((H>=100)&(H<125)&(V<.5)&(S>.3))
from scipy import ndimage
from PIL import ImageFilter
k=15
mm=cv2.morphologyEx(m.astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))).astype(bool)
f=ndimage.binary_fill_holes(mm)
f=cv2.morphologyEx(f.astype(np.uint8),cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(11,11))).astype(bool)
lab,n=ndimage.label(f); sz=ndimage.sum(f,lab,range(1,n+1))
order=np.argsort(sz)[::-1]; print([int(sz[i]) for i in order[:8]])
keep=np.isin(lab,[i+1 for i in order if sz[i]>=3000])
keep=cv2.dilate(keep.astype(np.uint8),np.ones((3,3),np.uint8)).astype(bool)
out=Image.fromarray(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB)).convert('RGBA')
out.putalpha(Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))
ys,xs=np.nonzero(keep); out=out.crop((xs.min()-2,ys.min()-2,xs.max()+3,ys.max()+3))
out.save(sys.argv[2],'WEBP',quality=95,method=6); print(out.size)
for name,col in [('w',(255,255,255)),('d',(30,30,40))]:
  bg=Image.new('RGB',out.size,col); bg.paste(out,(0,0),out); bg.save(sys.argv[3].replace('.png',f'-{name}.png'))
