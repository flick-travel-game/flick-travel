# 歴史・宇宙など: 題名が 白い ふちで かこまれた 絵から 字を 切りぬく(白い ふちを かべにして、はしに ふれない かたまりだけ のこす)
# python3 tools/logo-sticker-cut.py もと.png 出力.webp x0,y0,x1,y1 190 70
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
SRC, OUT, FR, TH, MINH = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
FRAC = tuple(float(v) for v in FR.split(","))
src = Image.open(SRC).convert("RGB"); W0,H0=src.size
BOX=(round(FRAC[0]*W0),round(FRAC[1]*H0),round(FRAC[2]*W0),round(FRAC[3]*H0))
crop=src.crop(BOX); a=np.asarray(crop).astype(np.float32)/255
mx=a.max(2); mn=a.min(2); sat=(mx-mn)/np.maximum(mx,1e-6)
barrier=(mn>TH/255)|((mx>0.8)&(sat<0.22))
barrier=ndimage.binary_dilation(barrier,iterations=1)
free=~barrier
lab,n=ndimage.label(free)
H,W=free.shape
edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))
keep=np.zeros_like(free)
for i,sl in enumerate(ndimage.find_objects(lab),1):
    if i in edge: continue
    s=int((lab[sl]==i).sum())
    hh=sl[0].stop-sl[0].start
    if s>1500 and hh>=MINH:
        keep|=lab==i; print(s, sl[1].start, sl[1].stop, sl[0].start, sl[0].stop)
keep=ndimage.binary_dilation(keep,iterations=2)
keep=ndimage.binary_fill_holes(keep) & ~(ndimage.binary_fill_holes(keep)&~keep) if False else keep
al=Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
out=crop.convert("RGBA"); out.putalpha(al)
ys,xs=np.nonzero(keep); out=out.crop((xs.min()-3,ys.min()-3,xs.max()+4,ys.max()+4))
out.save(OUT,"WEBP",quality=95,method=6); print(out.size)
bg=Image.new("RGB",out.size,(90,90,90)); bg.paste(out,(0,0),out); bg.save('/tmp/claude-0/-home-user-prepro-saas/3ef0319b-bc4e-5ada-8b8d-edf08e658395/scratchpad/word-on-gray.png')
