# けいくんの トップの 絵(2026-10-24・2回目)の 小さい 字の まちがいを 4つ 直す。
#   ① こまりごと「ようきゅうぽえ」→「ようきゅうぼえ」
#   ② はたらく いぬ「さわがいきゅうじょけん」→「さいがいきゅうじょけん」
#   ③ 「きょうの かんそう」→「きょうの かんさつ」(白い 字・赤い ふだ)
#   ④ ことばの いみ「むりを しないで すずそう。」→「やすもう。」
# つかいかた: python3 tools/inu/fix_text.py <もとの絵.png> inu/hero.webp
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.array(im).astype(int)

def ink(box, light=False):
    x0, y0, x1, y1 = box
    s = a[y0:y1 + 1, x0:x1 + 1].reshape(-1, 3)
    m = s.min(axis=1) > 215 if light else s.sum(axis=1) < 250
    return tuple(int(v) for v in np.median(s[m], axis=0))

def put(box, text, bg, color):
    x0, y0, x1, y1 = box                 # 字の ある 四角(ink の はし)
    ImageDraw.Draw(im).rectangle((x0 - 1, y0 - 2, x1 + 1, y1 + 2), fill=bg)
    f = ImageFont.truetype(F, 120, index=0)
    l, t, r, b = f.getbbox(text)
    t_im = Image.new('L', (r - l, b - t), 0)
    ImageDraw.Draw(t_im).text((-l, -t), text, font=f, fill=255)
    w, h = x1 - x0 + 1, y1 - y0 + 1
    t_im = t_im.resize((w, h), Image.LANCZOS)
    im.paste(Image.new('RGB', (w, h), color), (x0, y0), t_im)

c1 = ink((1112, 142, 1199, 156))
put((1112, 142, 1199, 156), 'ようきゅうぼえ', tuple(a[150, 1106]), c1)
c2 = ink((1420, 629, 1517, 644))
put((1420, 629, 1517, 644), 'さいがいきゅうじょけん', tuple(a[636, 1416]), c2)
red = tuple(int(v) for v in a[736, 1003])
put((1006, 727, 1041, 745), 'さつ', red, ink((965, 727, 1002, 745), light=True))
c4 = ink((928, 926, 976, 938))
put((928, 926, 976, 938), 'やすもう', tuple(a[932, 924]), c4)
im.save(out, 'WEBP', quality=86)
