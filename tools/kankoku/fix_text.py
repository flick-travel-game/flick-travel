# けいくんの トップの 絵(2026-10-11)の 小さい 字の まちがいを 2つ 直す。
#   ① ハングルの 札「가나다 あ・な・だ」→「か・な・だ」(가 は か)
#   ② 子音の 札「ㄱㄴㄷ ぎ・に・でぃ」→「か行・な行・た行」(読みに なって いなかった)
# つかいかた: python3 tools/kankoku/fix_text.py <もとの絵.png> kankoku/hero.webp
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.array(im)
ys, xs = np.where(a[177:194, 64:78].sum(axis=2) < 200)
INK = tuple(int(v) for v in np.median(a[177:194, 64:78][ys, xs], axis=0))   # もとの 字の 色(こい 紺)

def put(erase, text, cx, top, h):
    ImageDraw.Draw(im).rectangle(erase, fill=(255, 255, 255))
    f = ImageFont.truetype(F, h * 6, index=0)
    l, t, r, b = f.getbbox(text)
    t_im = Image.new('L', (r - l + 8, b - t + 8), 0)
    ImageDraw.Draw(t_im).text((4 - l, 4 - t), text, font=f, fill=255)
    w = round(t_im.width * h / t_im.height)
    t_im = t_im.resize((w, h), Image.LANCZOS)
    im.paste(Image.new('RGB', (w, h), INK), (cx - w // 2, top), t_im)

put((61, 174, 80, 197), 'か', 71, 176, 19)
put((46, 266, 152, 291), 'か行・な行・た行', 98, 271, 17)
im.save(out, 'WEBP', quality=86)
