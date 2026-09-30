#!/usr/bin/env python3
"""フリックプログラマー: けいくんの 絵の しくみ図の コードの 箱を 書きなおす(2026-09-30)
   ChatGPT の 絵は 2回とも コードの 記号が ずれて 動かない 形だった(「"」ぬけ・よけいな , : } など)。
   箱の 中を 箱の 色で ぬって、正しい 3行を 等幅の 字で 書く。書いたら かならず 拡大して 目で 見る
    python3 tools/code/fix_code_box.py トップの絵.png 四角い絵.png 出す先の フォルダ
   箱の 位置(bb)は 絵を 差しかえたら 測りなおす(こい 紺の 画素が 行・列の 半分より 多い ところ)"""
import sys
from PIL import Image, ImageDraw, ImageFont
MONO="/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"; JA="/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"
CY=(95,220,235); WH=(225,232,240); PK=(255,105,140); YE=(250,215,90); OR=(255,160,80); PU=(230,120,220)
LINES=[[("print",CY),("(",WH),('"',PK),("こんにちは",PK),('"',PK),(")",WH)],
       [("for",PU),(" i ",WH),("in",PU),(" ",WH),("range",YE),("(",WH),("3",OR),("):",WH)],
       [("  print",CY),("(i)",WH)]]
def fix(src,out,bb,bg):
    im=Image.open(src).convert("RGB"); d=ImageDraw.Draw(im)
    x0,y0,x1,y1=bb; pad=3
    d.rectangle((x0+pad,y0+pad,x1-pad,y1-pad),fill=bg)
    h=(y1-y0-2*pad); lh=h/3.3; size=int(lh*0.72)
    fm=ImageFont.truetype(MONO,size); fj=ImageFont.truetype(JA,size)
    y=y0+pad+lh*0.18
    for line in LINES:
        x=x0+pad+6
        for t,c in line:
            f=fj if any(ord(ch)>0x3000 for ch in t) else fm
            d.text((x,y),t,font=f,fill=c); x+=d.textlength(t,font=f)
        assert x<x1, (out,x,x1)
        y+=lh
    im.save(out)
fix(sys.argv[1],sys.argv[3]+"/hero-fixed.png",(671,825,821,886),(16,39,82))
fix(sys.argv[2],sys.argv[3]+"/square-fixed.png",(555,1026,701,1090),(12,40,86))
