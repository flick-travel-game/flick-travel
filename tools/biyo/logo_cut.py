#!/usr/bin/env python3
"""フリック美容師: けいくんの 絵から 題名と アイコンを 作る(2026-09-29)
    python3 tools/biyo/logo_cut.py トップの絵.png 四角い絵.png [見本.png]

作る もの: biyo/logo-word.webp(題名。すきとおる)/ biyo/hero.webp(1536×1024)/
          biyo/logo-mark2.webp(144px)/ icon-512.png / apple-touch-icon.png(180px)/ favicon.png(64px)

題名の 切りぬきかた(GrabCut)
  ① 鮮やかな 字の 中身の かたまりの うち、こい 紺の ふちの そばに ある ものを「かならず 字」に する
     (まわりの 花・きらきらは 紺の ふちから はなれているので 入らない。小さい「ッ」も 入る)
  ② 紺の ふちで かこまれた ところ(「容」の 上の うすい 色)は「たぶん 字」
  ③ 下の 帯「うって まなぶ 美容の ことば!」は 箱で 落とす(字の 下の はしが 少し まっすぐに なる。帯に かくれていた ところ)
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地)。大きさを 変えたら build_games.py の biyo の art.word も なおす
"""
import sys
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
HERO = sys.argv[1] if len(sys.argv) > 1 else 'yoko.png'
SQUARE = sys.argv[2] if len(sys.argv) > 2 else 'sq.png'
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
img=cv2.imread(HERO); assert img is not None and img.shape[:2] == (1024, 1536), 'トップの 絵は 1536×1024 で'; X0,Y0,X1,Y1=360,550,1125,740
crop=img[Y0:Y1,X0:X1].copy(); hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV)
H,s,v=hsv[...,0],hsv[...,1]/255,hsv[...,2]/255
ell=lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
core=((s>0.40)&(v>0.55)).astype(np.uint8); core[128:,185:630]=0
navy=((H>=95)&(H<=140)&(v<0.6)&(s>0.3)).astype(np.uint8); navy[128:,185:630]=0
nz=cv2.dilate(navy,ell(9))
lab,n=ndimage.label(core); sz=ndimage.sum(core,lab,range(1,n+1)); tn=ndimage.sum(nz,lab,range(1,n+1))
fg=np.isin(lab,[i+1 for i in range(n) if sz[i]>250 and tn[i]/sz[i]>0.15]).astype(np.uint8)
# navy-enclosed interiors (容の 上 など): fill holes of navy+fg
enc=ndimage.binary_fill_holes(cv2.morphologyEx(navy|fg,cv2.MORPH_CLOSE,ell(3))).astype(np.uint8)
m=np.full(fg.shape,cv2.GC_BGD,np.uint8)
m[cv2.dilate(enc,ell(21))>0]=cv2.GC_PR_BGD
m[cv2.dilate(enc,ell(5))>0]=cv2.GC_PR_FGD
m[cv2.erode(fg,ell(3))>0]=cv2.GC_FGD
m[128:,185:630]=cv2.GC_BGD
bg=np.zeros((1,65)); fgm=np.zeros((1,65))
cv2.grabCut(crop,m,None,bg,fgm,6,cv2.GC_INIT_WITH_MASK)
res=((m==1)|(m==3)).astype(np.uint8)
res=ndimage.binary_fill_holes(res).astype(np.uint8)
lab,n=ndimage.label(res); sz=ndimage.sum(res,lab,range(1,n+1))
res=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>800]).astype(np.uint8)
M=cv2.GaussianBlur(res.astype(np.float32),(0,0),0.8)
a=(np.clip((M-.2)/.6,0,1)*255).astype(np.uint8)
w=Image.fromarray(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB)); w.putalpha(Image.fromarray(a)); w=w.crop(w.getbbox()); w.save('biyo/logo-word.webp','WEBP',quality=95,method=6); print('biyo/logo-word.webp', w.size)
Image.open(HERO).convert('RGB').save('biyo/hero.webp','WEBP',quality=88,method=6); print('biyo/hero.webp')
sq=Image.open(SQUARE).convert('RGB'); assert sq.size[0]==sq.size[1], '四角い 絵は 正方形で'
sq.resize((512,512),Image.LANCZOS).save('biyo/icon-512.png')
sq.resize((180,180),Image.LANCZOS).save('biyo/apple-touch-icon.png')
sq.resize((64,64),Image.LANCZOS).save('biyo/favicon.png')
sq.resize((144,144),Image.LANCZOS).save('biyo/logo-mark2.webp','WEBP',quality=92,method=6)
print('アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2')
if PREVIEW:
    p=Image.new('RGB',(w.width,w.height*2+10),(255,255,255)); p.paste(w,(0,0),w)
    dk=Image.new('RGB',w.size,(26,22,42)); dk.paste(w,(0,0),w); p.paste(dk,(0,w.height+10)); p.save(PREVIEW); print(PREVIEW)
