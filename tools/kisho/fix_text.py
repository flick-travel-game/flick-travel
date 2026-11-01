# フリック気象予報士の トップの 絵(けいくんの ChatGPT の 絵 2回目)を 絵の 中で 直す(けいくん 2026-11-01「1」)。
#   ぼうきい→ぼうさい / たいふつのしんろ→たいふうのしんろ / じょっときりゅう→じぇっときりゅう /
#   4択 D けんうん→そううん / じけんで できんこと→しけんで でるところ / ぎっかせんもん→がっかせんもん
# つかいかた: python3 tools/kisho/fix_text.py <もとの絵.png> <出力.png>
from PIL import Image, ImageDraw, ImageFont
import numpy as np, sys
im=Image.open(sys.argv[1]).convert('RGB'); A=np.array(im).astype(float)
F='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
def verase(x0,x1,y0,y1):
    # 列ごとに 上と 下の 色を つないで ぬる(横に 色が 変わる 札むけ)
    for x in range(x0,x1+1):
        T=A[y0-3:y0-1,x].mean(0); D=A[y1+2:y1+4,x].mean(0)
        for y in range(y0,y1+1):
            t=(y-y0)/(y1-y0); A[y,x]=T*(1-t)+D*t
def erase(x0,x1,y0,y1,left_only=False,sample=None,boxonly=False):
    B=A.copy()
    for y in range(y0,y1+1):
        L=A[y,x0-4:x0-1].mean(0); R=L if left_only else A[y,x1+2:x1+5].mean(0)
        if sample: L=R=B[y,sample[0]:sample[1]].mean(0)
        for x in range(x0,x1+1):
            if boxonly and B[y,x,2] < B[y,x,0]-5: continue  # 札の 外(クリーム色)は さわらない
            t=(x-x0)/(x1-x0); A[y,x]=L*(1-t)+R*t
def text(s,x0,x1,top,h,col=(30,28,32),g=0.75,sw=0,align='c',w=None):
    # 字を 大きく 書いてから 枠の 幅・高さに 合わせて 縮める(もとの 絵は 細長い 書体なので 横を ちぢめる)
    global A
    f=ImageFont.truetype(F,96,index=0); b=f.getbbox(s,stroke_width=sw)
    L=Image.new('L',(b[2]-b[0]+8,b[3]-b[1]+8),0)
    ImageDraw.Draw(L).text((4-b[0],4-b[1]),s,font=f,fill=255,stroke_width=sw,stroke_fill=255)
    L=L.crop(L.getbbox())
    W=w or min(x1-x0, round(L.width*h/L.height))
    L=L.resize((W,h),Image.LANCZOS)
    x=round((x0+x1)/2-W/2) if align=='c' else x0
    m=np.clip((np.array(L)/255.0)**g,0,1)[...,None]
    reg=A[top:top+h,x:x+W]; A[top:top+h,x:x+W]=reg*(1-m)+np.array(col)*m
erase(1349,1414,520,542); text('ぼうさい',1352,1411,523,17,sw=2)
erase(1427,1522,663,688); text('たいふうのしんろ',1431,1520,667,19,sw=2)
erase(288,368,454,477);   text('じぇっときりゅう',290,366,456,19,sw=2)
erase(247,325,957,982);   text('そううん',251,322,960,19,sw=2,align='l')
verase(600,675,961,982); verase(676,679,963,980); text('がっかせんもん',604,673,962,19,sw=2)
verase(400,455,957,989); verase(456,458,960,986)
text('しけんで',402,452,958,13,col=(255,255,255),g=0.6,sw=2)
text('でるところ',401,454,973,14,col=(255,255,255),g=0.6,sw=2)
Image.fromarray(np.clip(A,0,255).astype('uint8')).save(sys.argv[2])
