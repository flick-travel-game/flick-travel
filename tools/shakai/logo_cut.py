#!/usr/bin/env python3
"""フリック社会旅行: けいくんの 絵から 題名と アイコンを 作る(2026-09-29。恐竜図鑑の logo_cut.py を 写した)
   ⚠️ トップの 絵は 先に tools/shakai/fix_keizai.py で「けいざい」を 直した もの を 渡す
    python3 tools/shakai/logo_cut.py トップの絵.png 四角い絵.png [見本.png]

作る もの
  shakai/logo-word.webp      題名「フリック社会旅行」(すきとおる。トップの 絵から 切りぬく)
  shakai/hero.webp           トップの 絵(1536×1024)
  shakai/logo-mark2.webp     144px / icon-512.png 512px / apple-touch-icon.png 180px / favicon.png 64px(四角い 絵から)
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地 の 両方)。ふりがな(しゃかい りょこう)と 下の 帯は 入れない
   大きさを 変えたら build_games.py の shakai の art.word も なおす(wordv も 上げる)
"""
import sys
import numpy as np
import cv2
from scipy import ndimage
from PIL import Image

HERO = sys.argv[1]
SQUARE = sys.argv[2]
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None
X0,Y0,X1,Y1=420,574,1112,712  # 題名の 大きい 字だけ(ふりがなは 上、帯は 下で 落とす)
img=cv2.imread(HERO)
assert img is not None and img.shape[:2]==(1024,1536), 'トップの 絵は 1536×1024 で'; crop=img[Y0:Y1,X0:X1].copy()
rgb=cv2.cvtColor(crop,cv2.COLOR_BGR2RGB); hsv=cv2.cvtColor(crop,cv2.COLOR_BGR2HSV)
ell=lambda k:cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
u=((hsv[...,1]>90)&(hsv[...,2]>160)).astype(np.uint8)  # 字の 中身(「行」の 上の うすい ピンクも 入るように 恐竜より ゆるめ)
u=ndimage.binary_fill_holes(cv2.morphologyEx(u,cv2.MORPH_CLOSE,ell(3))).astype(np.uint8)
e=cv2.erode(u,ell(5)); lab,n=ndimage.label(e); core=np.zeros(e.shape,np.uint8)
for i,sl in enumerate(ndimage.find_objects(lab)):
    h=sl[0].stop-sl[0].start; area=(lab[sl]==i+1).sum()
    if area>120 and h>8: core|=(lab==i+1)
m=np.full(core.shape,cv2.GC_BGD,np.uint8)
m[cv2.dilate(core,ell(30))>0]=cv2.GC_PR_BGD
m[cv2.dilate(core,ell(13))>0]=cv2.GC_PR_FGD
m[core>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64); fg=np.zeros((1,65),np.float64)
cv2.grabCut(crop,m,None,bg,fg,6,cv2.GC_INIT_WITH_MASK)
k=((m==cv2.GC_FGD)|(m==cv2.GC_PR_FGD))
k=ndimage.binary_fill_holes(k)
# 字の まわりに くっつく ものを 落とす(切りぬく 箱からの 位置。絵を 差しかえたら 見なおす)
k[116:,:]=False          # 下の 帯「うって まなぶ 社会の ことば!」
k[0:18,165:205]=False    # 「ッ」と「ク」の 上の 葉
k[0:14,295:318]=False    # 「社」の 左上の 葉
k[100:,200:300]=False    # 「ッ」「ク」の 下の 葉
hz=hsv[...,0]; zone=np.zeros(k.shape,bool); zone[:,190:304]=True
k[zone&(hz>=30)&(hz<=95)]=False  # 「ッ」「ク」(黄・オレンジ)の まわりの 緑の 葉。この はばには 緑の 字が 無い
# 字の しんから ふちの 太さ ぶんだけ 残す(まっすぐ 切ると 下の はしが 不自然なので、字の 形に そって 落とす)
c2=core.astype(bool)&~(zone&(hz>=30)&(hz<=95)); c2[88:,:]&=~((hz[88:,:]>=15)&(hz[88:,:]<=40))  # 葉と 帯の 黄色は しんに しない
k&=cv2.dilate(c2.astype(np.uint8),ell(23)).astype(bool)
lab,n=ndimage.label(k); sz=ndimage.sum(k,lab,range(1,n+1)); k=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>800])
lab,n=ndimage.label(k); sz=ndimage.sum(k,lab,range(1,n+1))
k=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>800])
k=cv2.morphologyEx(k.astype(np.uint8),cv2.MORPH_OPEN,ell(5))
M=cv2.GaussianBlur(k.astype(np.float32),(0,0),1.0)
a=(np.clip((M-.2)/.6,0,1)*255).astype(np.uint8)
w=Image.fromarray(rgb); w.putalpha(Image.fromarray(a)); w=w.crop(w.getbbox())
w.save('shakai/logo-word.webp','WEBP',quality=95,method=6); print('shakai/logo-word.webp', w.size)
p=Image.new('RGB',(w.width,w.height*2+10),(255,255,255)); p.paste(w,(0,0),w)
dk=Image.new('RGB',w.size,(26,22,42)); dk.paste(w,(0,0),w); p.paste(dk,(0,w.height+10)); p.save(PREVIEW) if PREVIEW else None

# トップの 絵
Image.open(HERO).convert("RGB").save("shakai/hero.webp", "WEBP", quality=88, method=6)
# アイコン(四角い 絵から)
sq = Image.open(SQUARE).convert("RGB")
assert sq.size[0] == sq.size[1], f"四角い 絵は 正方形で: {sq.size}"
sq.resize((512, 512), Image.LANCZOS).save("shakai/icon-512.png")
sq.resize((180, 180), Image.LANCZOS).save("shakai/apple-touch-icon.png")
sq.resize((64, 64), Image.LANCZOS).save("shakai/favicon.png")
sq.resize((144, 144), Image.LANCZOS).save("shakai/logo-mark2.webp", "WEBP", quality=92, method=6)
print("hero.webp / icon-512 / apple-touch-icon / favicon / logo-mark2")
