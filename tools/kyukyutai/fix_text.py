# フリック救急隊員の トップの 絵(けいくんの ChatGPT の 絵 2回目)を 絵の 中で 直す。
#   ① しんぱいそせい / えーいーでぃー の 札が 逆だった(AEDの 箱に しんぱいそせい)→ 入れかえ
#   ② 聴診器の 絵に「たいおん」→ ゲームの ことば「ちょうしん」
#   ③ 病院の 建物の 青い 十字を 消す(十字の しるしは 描かない 決めごと)
# つかいかた: python3 tools/kyukyutai/fix_text.py <もとの絵.png> <出力.png>
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import sys; src=sys.argv[1]
im=Image.open(src).convert('RGB'); A=np.array(im).astype(float)
F='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
def erase(x0,x1,y0,y1):
    # each row: linear blend between colors just outside left/right
    for y in range(y0,y1+1):
        L=A[y,x0-4:x0-1].mean(0); R=A[y,x1+2:x1+5].mean(0)
        for x in range(x0,x1+1):
            t=(x-x0)/(x1-x0); A[y,x]=L*(1-t)+R*t
def text(s,cx,top,h,width_max,sw=0):
    global A
    img=Image.fromarray(A.astype('uint8'))
    size=h
    while True:
        f=ImageFont.truetype(F,size,index=0)
        b=f.getbbox(s)
        if b[3]-b[1]>=h or size>80: break
        size+=1
    while f.getbbox(s)[2]-f.getbbox(s)[0]>width_max:
        size-=1; f=ImageFont.truetype(F,size,index=0)
    b=f.getbbox(s); w=b[2]-b[0]
    layer=Image.new('L',img.size,0); d=ImageDraw.Draw(layer)
    d.text((cx-w/2-b[0], top-b[1]), s, font=f, fill=255, stroke_width=sw, stroke_fill=255)
    m=np.array(layer).astype(float)/255
    m=np.clip(m**0.75,0,1)[...,None]
    A=A*(1-m)+np.array([30,28,32])*m
# 1) swap labels しんぱいそせい <-> えーいーでぃー
erase(389,510,147,173); erase(530,649,147,174)
text('えーいーでぃー',(391+508)/2,149,22,118)
text('しんぱいそせい',(532+647)/2,149,23,115)
# 2) たいおん -> ちょうしん
erase(1198,1311,232,261)
text('ちょうしん',1262,236,23,102,1)
# 3) remove cross on hospital
for y in range(442,460):
    L=A[y,1422:1424].mean(0); R=A[y,1441:1443].mean(0)
    for x in range(1424,1441):
        t=(x-1424)/16; A[y,x]=L*(1-t)+R*t
out=Image.fromarray(np.clip(A,0,255).astype('uint8'))
out.save(sys.argv[2])
