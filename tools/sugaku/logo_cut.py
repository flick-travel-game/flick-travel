#!/usr/bin/env python3
"""フリック数学旅行: トップの 絵(けいくんの ChatGPT の 絵 1536×1024。2026-09-28 の 2回目)から 題名「フリック数学旅行」を 切りぬく → sugaku/logo-word.webp
    python3 tools/sugaku/logo_cut.py もとの絵.png sugaku/logo-word.webp 見本.png
- 字(こい 色)だけを ひろう。**ふちは 付けない**(世界旅行と 同じ 形。けいくん 2026-09-28「世界旅行くらい 綺麗な文字に」)。
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
# 字の 下と 左に ついた 青い 立体の かげ(と 外の 青い かがやき)は 落とす。青い 字は「行」だけ(右はし)。まん中の コンパスも 青を ふくむので 残す
H=hsv[...,0]
blue=(H>=95)&(H<=120)&(s>.35); blue[88:160,290:370]=False
pale=(H>=88)&(H<=125)&(s<.8)&(v>.82)   # 明るい 青の かがやき
blue[:,425:525]=pale[:,425:525]; blue[:,630:]=pale[:,630:]  # 「学」(水色)と「行」(青)は 字そのものが 青いので、明るい かがやきだけ 落とす
cand=(s>.5)&(v>.35)&~blue; cand[153:,:]=False
lc,_=ndimage.label(cand); L=np.isin(lc,np.unique(lc[(s>.85)&(v>.55)&cand])[1:])
# 細い 青の すじ(かがやきの のこり)を けす
bl=(H>=95)&(H<=125)
# 「行」の 右の こい 青の ふち(字と は 白い ふちで 分かれた 細長い かたまり)を 落とす。金の 房(角帽)は 残す
lb,nb=ndimage.label(L)
for i,sl in enumerate(ndimage.find_objects(lb)):
  if sl[1].start>=715 and not (10<=np.median(H[lb==i+1])<=35): L[lb==i+1]=False
yy=np.arange(h)[:,None]; xx=np.arange(w)[None,:]
L&=~(bl&(yy>=132)&(xx>=250)&(xx<=520))                 # 「学」と コンパスの 下の 青い なみ
L=cv2.morphologyEx(L.astype(np.uint8),cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))).astype(bool)
# まん中の コンパス: 箱の 中の 白・空いがいを そのまま 入れる
cb=(slice(95,158),slice(300,362)); comp=~((s[cb]<.3)&(v[cb]>.75)); comp=ndimage.binary_opening(comp,np.ones((3,3)))
lcb,_=ndimage.label(comp); szc=ndimage.sum(comp,lcb,range(1,lcb.max()+1)); L[cb]|=np.isin(lcb,[int(np.argmax(szc))+1])
# 字の 中の 白い つや・すきまも うめる
L=ndimage.binary_fill_holes(cv2.morphologyEx(L.astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))).astype(bool))
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
# ふちは 付けない(フリック世界旅行と 同じ 字だけの 形。けいくん 2026-09-28「世界旅行くらい 綺麗な文字に」)。字の はしを なめらかに
M=cv2.GaussianBlur(cv2.dilate(L.astype(np.uint8),ker(1)).astype(np.float32),(0,0),1.3)
E=M>.5
alpha=Image.fromarray(np.clip((M-.25)/.5*255,0,255).astype(np.uint8))
out=Image.fromarray(src).convert("RGBA"); out.putalpha(alpha)
edge=E
ys,xs=np.nonzero(edge); out=out.crop((xs.min()-2,ys.min()-2,xs.max()+3,ys.max()+3))
out.save(sys.argv[2],"WEBP",quality=95,method=6); print(out.size)
for name,col in [('w',(255,255,255)),('d',(30,30,40))]:
  bg=Image.new("RGB",out.size,col); bg.paste(out,(0,0),out); bg.save(sys.argv[3].replace('.png',f'-{name}.png'))
