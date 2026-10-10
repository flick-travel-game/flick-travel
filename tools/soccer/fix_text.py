# けいくんの トップの 絵(2026-10-10 の 2回目)の 小さい 字の まちがいを 2つ 直す。
#   ① 3番の 札「ぶれみありーぐ」→「ぷれみありーぐ」(ゲームの 読み)
#   ② 図鑑の 見本「ぽうしの という いみ」→「ぼうし という いみ」
# つかいかた: python3 tools/soccer/fix_text.py <もとの絵.png> soccer/hero.webp
import sys
from PIL import Image, ImageDraw, ImageFont
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
d = ImageDraw.Draw(im)

def put(box, text, size, top, left):
    x0, y0, x1, y1 = box
    # 地の 色(箱の 四すみの 明るい 色)で うめる
    bg = max((im.getpixel(p) for p in [(x0, y0), (x1, y0), (x0, y1), (x1, y1)]), key=sum)
    d.rectangle(box, fill=bg)
    f = ImageFont.truetype(F, size, index=0)
    d.text((left, top), text, font=f, fill=(20, 20, 20))

put((19, 446, 97, 465), 'ぷれみありーぐ', 11, 446, 21)
put((767, 876, 824, 900), 'ぼうし', 16, 875, 770)
im.save(out, 'WEBP', quality=82)
