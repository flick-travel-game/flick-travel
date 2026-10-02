#!/usr/bin/env python3
"""フリックプログラマー: けいくんの 絵から 題名と アイコンを 作る(2026-09-30)
   ⚠️ 絵は 先に tools/code/fix_code_box.py で コードの 箱を 直した もの を 渡す
    python3 tools/code/logo_cut.py トップの絵.png 四角い絵.png [見本.png]

作る もの
  code/logo-word.webp      題名「フリックプログラマー」(すきとおる。トップの 絵から 切りぬく)
  code/hero.webp           トップの 絵(1536×1024)
  code/logo-mark2.webp     144px / icon-512.png 512px / apple-touch-icon.png 180px / favicon.png 64px(四角い 絵から)

題名の 切りぬきかた(GrabCut。宇宙旅行と 同じ 考えかた)
  ① 鮮やかな 字の 中身(彩度 150 より 上)を 9px けずって、字の しん だけ 残す(まわりの 青い 光と つながらない ように)
  ② しん = かならず 字 / しんから 18px = たぶん 字 / 40px = たぶん 背景 / その 外 = 背景 で GrabCut
     → 字の まわりの 白と 青の ふちごと きれいに 切りぬける。うしろの 絵や 星は 落ちる
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地 の 両方)。下の 帯(うって まなぶ …)と 左の パソコン・右の 歯車は 入れない
   大きさを 変えたら build_games.py の code の art.word も なおす(wordv も 上げる)
"""
import sys
import numpy as np
import cv2
from scipy import ndimage
from PIL import Image

HERO = sys.argv[1]
SQUARE = sys.argv[2]
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
X0,Y0,X1,Y1=392,556,1118,698
img=cv2.imread(HERO)
assert img is not None and img.shape[:2]==(1024,1536), 'トップの 絵は 1536×1024 で'; crop=img[Y0:Y1,X0:X1].copy()
rgb=cv2.cvtColor(crop,cv2.COLOR_BGR2RGB); hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV)
ell=lambda k:cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
u=((hsv[...,1]>140)&(hsv[...,2]>175)).astype(np.uint8); xx=np.arange(u.shape[1])[None,:]+X0; u|=((hsv[...,1]>60)&(hsv[...,2]>170)&(xx<520)).astype(np.uint8)  # 明るい 字の 中身だけ(うしろの こい 緑の 葉は 入れない)
u=ndimage.binary_fill_holes(cv2.morphologyEx(u,cv2.MORPH_CLOSE,ell(3))).astype(np.uint8)
e=cv2.erode(u,ell(5)); lab,n=ndimage.label(e); core=np.zeros(e.shape,np.uint8)
core_ok=np.ones(e.shape,bool); core_ok[668-Y0:,1050-X0:]=False  # 右下の 歯車は 入れない
for i,sl in enumerate(ndimage.find_objects(lab)):
    h=sl[0].stop-sl[0].start; area=(lab[sl]==i+1).sum()
    if area>120 and h>8 and core_ok[sl].any() and core_ok[(lab==i+1)].all(): core|=(lab==i+1)
m=np.full(core.shape,cv2.GC_BGD,np.uint8)
m[cv2.dilate(core,ell(30))>0]=cv2.GC_PR_BGD
m[cv2.dilate(core,ell(13))>0]=cv2.GC_PR_FGD
m[core>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64); fg=np.zeros((1,65),np.float64)
cv2.grabCut(crop,m,None,bg,fg,6,cv2.GC_INIT_WITH_MASK)
k=((m==cv2.GC_FGD)|(m==cv2.GC_PR_FGD))
# 字の まわりの 白い ふちも 入れる(字の しんから 13px の 中の 白っぽい ところ)
white=(hsv[...,1]<70)&(hsv[...,2]>200)&(cv2.dilate(core,ell(15))>0)
k=k|white
# 「ロ」の 中から 見える くらい 後ろの 絵は 入れない(字に かこまれた くらい かたまり だけ。ふちの かげは のこす)
dk=k&(hsv[...,2]<80); dl,dn=ndimage.label(dk)
for i in range(1,dn+1):
    c=dl==i
    if c.sum()>60 and (cv2.dilate(c.astype(np.uint8),ell(7)).astype(bool)&~k).sum()==0: k&=~c
# 小さい 穴(ッ・ラ の すきま)だけ うめる。「ロ」の 中の 大きい 穴は 後ろの 絵なので うめない
holes=ndimage.binary_fill_holes(k)&~k; hl,hn=ndimage.label(holes); hs=ndimage.sum(holes,hl,range(1,hn+1))
k=k|np.isin(hl,[i+1 for i,z in enumerate(hs) if z<150])
lab,n=ndimage.label(k); sz=ndimage.sum(k,lab,range(1,n+1))
k=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>800])
k=cv2.morphologyEx(k.astype(np.uint8),cv2.MORPH_OPEN,ell(5)); k[:, :12]=0; k[:46, :30]=0; _pk=((hsv[...,0]>=140)|(hsv[...,0]<=10))&(hsv[...,1]>60); _col=np.where(_pk[:, :60].any(axis=0))[0]; _x0=int(_col.min()) if _col.size else 0; k[:, :max(0,_x0-2)]=0
_l,_n=ndimage.label(k)
for _i,_sl in enumerate(ndimage.find_objects(_l)):
    if _sl[1].stop<60 and (_l[_sl]==_i+1).sum()<2500: k[_l==_i+1]=0; _g=((hsv[...,0]>=30)&(hsv[...,0]<=90)&(hsv[...,1]>80)); k[:, :45]&=~_g[:, :45].astype(k.dtype)
M=cv2.GaussianBlur(k.astype(np.float32),(0,0),1.0)
a=(np.clip((M-.2)/.6,0,1)*255).astype(np.uint8)
w=Image.fromarray(rgb); w.putalpha(Image.fromarray(a)); w=w.crop(w.getbbox())
w.save('code/logo-word.webp','WEBP',quality=95,method=6); print('code/logo-word.webp', w.size)
p=Image.new('RGB',(w.width,w.height*2+10),(255,255,255)); p.paste(w,(0,0),w)
dk=Image.new('RGB',w.size,(26,22,42)); dk.paste(w,(0,0),w); p.paste(dk,(0,w.height+10)); p.save(PREVIEW) if PREVIEW else None

# トップの 絵
Image.open(HERO).convert("RGB").save("code/hero.webp", "WEBP", quality=88, method=6)
# アイコン(四角い 絵から)
sq = Image.open(SQUARE).convert("RGB")
assert sq.size[0] == sq.size[1], f"四角い 絵は 正方形で: {sq.size}"
sq.resize((512, 512), Image.LANCZOS).save("code/icon-512.png")
sq.resize((180, 180), Image.LANCZOS).save("code/apple-touch-icon.png")
sq.resize((64, 64), Image.LANCZOS).save("code/favicon.png")
sq.resize((144, 144), Image.LANCZOS).save("code/logo-mark2.webp", "WEBP", quality=92, method=6)
print("hero.webp / icon-512 / apple-touch-icon / favicon / logo-mark2")
