# けいくんの トップの 絵(2026-10-10 の 2回目)の 小さい 字の まちがいを 2つ 直す。
#   ① 4択の B「だぷるどりぷる」→「だぶるどりぶる」(ゲームの 読み)
#   ② 9番の 札「すりーえっ?すすりー」(くずれ)→「すりーえっくすすりー」
# 字は もとの はばに 入るよう よこに ちぢめて 置く。
# つかいかた: python3 tools/basket/fix_text.py <もとの絵.png> basket/hero.webp
import sys
from PIL import Image, ImageDraw, ImageFont
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')

def put(box, text, size, ink):
    x0, y0, x1, y1 = box
    bg = max((im.getpixel(p) for p in [(x0, y0), (x1, y0), (x0, y1), (x1, y1)]), key=sum)
    ImageDraw.Draw(im).rectangle(box, fill=bg)
    f = ImageFont.truetype(F, size * 4, index=0)
    l, t, r, b = f.getbbox(text)
    t_im = Image.new('L', (r - l + 8, b - t + 8), 0)
    ImageDraw.Draw(t_im).text((4 - l, 4 - t), text, font=f, fill=255)
    w, h = ink[2] - ink[0], ink[3] - ink[1]
    t_im = t_im.resize((w, h), Image.LANCZOS)
    im.paste(Image.new('RGB', (w, h), (20, 20, 20)), (ink[0], ink[1]), t_im)

put((161, 947, 268, 971), 'だぶるどりぶる', 17, (163, 950, 266, 970))
put((1340, 707, 1421, 724), 'すりーえっくすすりー', 11, (1342, 709, 1419, 723))
im.save(out, 'WEBP', quality=82)
