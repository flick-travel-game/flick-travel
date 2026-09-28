#!/usr/bin/env python3
"""フリック数学旅行: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-28 の 2回目)から 題名「フリック数学旅行」を 切りぬく → sugaku/logo-word.webp
    python3 tools/sugaku/logo_cut.py もとの絵.png sugaku/logo-word.webp 見本.png
- 字(こい 色)だけを ひろって、まわりの 白い ふちと こい 青の ふちは **作りなおす**(太さを そろえる)。
  1回目は 絵の 白い ふちを そのまま ひろったので、空の 白と まざって ふちが がたがたに なり「字が 切れてる」に 見えた(けいくん 2026-09-28)
- 下の 金の 帯(数学のせかいを…)は 入れない
⚠️ できた 絵は かならず 目で 見る。大きさを 変えたら build_games.py の sugaku の art.word も なおす(wordv も 上げる)"""
import numpy as np, cv2, sys
from PIL import Image, ImageFilter
from scipy import ndimage
img=cv2.imread(sys.argv[1])
x0,y0,x1,y1=290,595,1052,770
crop=img[y0:y1,x0:x1].copy(); h,w=crop.shape[:2]
hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV); s=hsv[...,1]/255.; v=hsv[...,2]/255.
# 字: こい 色の かたまりの うち、とても こい 色(s>.85)を ふくむ ものだけ(字の 外の 青い かがやきは 白い ふちで 切れているので 入らない)
cand=(s>.5)&(v>.35); cand[153:,:]=False  # 下の 金の 帯は 入れない
lc,_=ndimage.label(cand); L=np.isin(lc,np.unique(lc[(s>.85)&(v>.55)&cand])[1:])
# 角帽(こい 紺)も 字の すぐ そばなら 入れる
dark=(v<.5)&(s>.3); dark[153:,:]=False; dark[:, :600]=False;  # 角帽は 右はし だけ(左上の タブレットの 角を 入れない)
ld,_=ndimage.label(dark); near=cv2.dilate(L.astype(np.uint8),np.ones((15,15),np.uint8)).astype(bool)
sz=ndimage.sum(dark,ld,range(1,ld.max()+1)); L|=np.isin(ld,[i+1 for i,z in enumerate(sz) if z>300 and (near&(ld==i+1)).any()])
L[:32,190:330]=False  # 「ッ」の 上に くっついた タブレットの 角を 落とす(切りぬく 箱からの 位置。絵を 差しかえたら 見なおす)
lab,n=ndimage.label(L); sz=ndimage.sum(L,lab,range(1,n+1)); L=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>120])
L=ndimage.binary_fill_holes(cv2.morphologyEx(L.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((3,3),np.uint8)).astype(bool))
ker=lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*r+1,2*r+1))
pad=12
L=np.pad(L,pad); src=np.pad(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB),((pad,pad),(pad,pad),(0,0)),mode="edge")
# 白い ふち: 字から 9px。形を なめらかに(ぼかして しきい値)
M=cv2.dilate(L.astype(np.uint8),ker(9)); M=cv2.morphologyEx(M,cv2.MORPH_CLOSE,ker(7)); M=ndimage.binary_fill_holes(M.astype(bool))
M=cv2.GaussianBlur(M.astype(np.float32),(0,0),2.5)>.5
E=cv2.GaussianBlur(cv2.dilate(M.astype(np.uint8),ker(3)).astype(np.float32),(0,0),1.2)>.5   # こい 紺の ふち
rgb=np.zeros_like(src); rgb[E]=(24,48,120); rgb[M]=(255,255,255)
Lb=cv2.dilate(L.astype(np.uint8),ker(1)).astype(bool)
wt=np.array(Image.fromarray((Lb*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)))/255.*M
rgb=(rgb*(1-wt[...,None])+src*wt[...,None]).astype(np.uint8)
alpha=Image.fromarray((E*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
out=Image.fromarray(rgb).convert("RGBA"); out.putalpha(alpha)
edge=E
ys,xs=np.nonzero(edge); out=out.crop((xs.min()-2,ys.min()-2,xs.max()+3,ys.max()+3))
out.save(sys.argv[2],"WEBP",quality=95,method=6); print(out.size)
for name,col in [('w',(255,255,255)),('d',(30,30,40))]:
  bg=Image.new("RGB",out.size,col); bg.paste(out,(0,0),out); bg.save(sys.argv[3].replace('.png',f'-{name}.png'))
