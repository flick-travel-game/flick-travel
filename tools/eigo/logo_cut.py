#!/usr/bin/env python3
"""フリック英語: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-30)から 題名「フリック英語」を 切りぬく → eigo/logo-word.webp
    python3 tools/eigo/logo_cut.py もとの絵.png eigo/logo-word.webp 見本.png
- 字の まわりの こい 紺の ふちを ひろって うめる。ふちの 外(葉・地球・本・帯)は 落とす。小さい かたまり(ふりがな「えいご」)は すてる
⚠️ できた 絵は かならず 目で 見る。大きさを 変えたら build_games.py の eigo の art.word も なおす(tools/kokugo/logo_cut.py を 写した)"""
import numpy as np, cv2, sys
from PIL import Image, ImageFilter
from scipy import ndimage
img=cv2.imread(sys.argv[1])
x0,y0,x1,y1=460,580,1085,760
crop=img[y0:y1,x0:x1]
hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV)
H,S,V=hsv[...,0],hsv[...,1]/255.,hsv[...,2]/255.
m=(H>=100)&(H<=135)&(V<.5)&(S>.35)
mm=cv2.morphologyEx(m.astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(11,11))).astype(bool)
f=ndimage.binary_fill_holes(mm)
f=cv2.morphologyEx(f.astype(np.uint8),cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9))).astype(bool)
lab,n=ndimage.label(f); sz=ndimage.sum(f,lab,range(1,n+1))
order=np.argsort(sz)[::-1]; print([int(sz[i]) for i in order[:8]])
keep=np.isin(lab,[i+1 for i in order if sz[i]>=3000])
keep=cv2.dilate(keep.astype(np.uint8),np.ones((3,3),np.uint8)).astype(bool)
# 「語」の 右下に くっついた 飛行機(帯の 右はし)を 落とす。語の いちばん下より 下は すてる(絵を 差しかえたら 見なおす)
keep[157:,:]=False  # 切りぬく 箱(x0,y0)からの 位置
# 「語」の 下の ふちに 重なる 飛行機(白)と 帯の 右はし(だいだい)も 落とす: 語の 下の あたりでは 紺・ピンク・水色の ふち いがいを すてる
band=np.zeros_like(keep); band[120:,420:]=True
ok=((H>=80)&(H<=178)&(S>.3))&~((V>.85)&(S<.25))
keep&=~(band&~ok)
keep=cv2.morphologyEx(keep.astype(np.uint8),cv2.MORPH_OPEN,np.ones((3,3),np.uint8)).astype(bool)
lab,n=ndimage.label(keep); sz=ndimage.sum(keep,lab,range(1,n+1)); keep=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>=3000])
out=Image.fromarray(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB)).convert('RGBA')
out.putalpha(Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))
ys,xs=np.nonzero(keep); out=out.crop((xs.min()-2,ys.min()-2,xs.max()+3,ys.max()+3))
al=np.array(out.getchannel('A')); al[143:,440:548]=0; out.putalpha(Image.fromarray(al))  # 飛行機の 紺の ふちの のこり(切りぬいた あとの 位置。絵を 差しかえたら 見なおす)
bb=out.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox(); out=out.crop(bb)
out.save(sys.argv[2],'WEBP',quality=95,method=6); print(out.size)
for name,col in [('w',(255,255,255)),('d',(30,30,40))]:
  bg=Image.new('RGB',out.size,col); bg.paste(out,(0,0),out); bg.save(sys.argv[3].replace('.png',f'-{name}.png'))
