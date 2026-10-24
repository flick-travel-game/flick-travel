# けいくんの 四角い 絵(アイコン用。2026-10-24)の 字を 2つ 直して tools/inu/art/square-src.png に する。
#   ① いちばん下の 帯「メンタリズムは 心理学と 観察を つかった パフォーマンスで…」(フリックメンタリストの 文が まざった)
#      →「犬の 気持ちは 1匹ずつ ちがうよ。やさしく 見て あげよう。」
#   ② きょうの かんさつ の 札「6つの 力を 毎日 きたえよう!」(これも メンタリストの 文)→「犬の ようすを 毎日 かんさつ!」
# つかいかた: python3 tools/inu/fix_square.py <もとの絵.png> tools/inu/art/square-src.png
import sys
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert('RGB'))

# ① 帯: 白い 字を 消して(inpaint)、白い 字に こい 青の ふちで 書きなおす
x0, y0, x1, y1 = 228, 1196, 1016, 1236
m = np.zeros(a.shape[:2], np.uint8)
sub = a[y0:y1, x0:x1].astype(int)
m[y0:y1, x0:x1] = ((sub.min(axis=2) > 150) * 255).astype(np.uint8)
# ② の 紺の 字も いっしょに 消す(白い 四角で ぬると 地の 色と ずれて 見えた)
nv = a[1012:1062, 1045:1235].astype(int)
m[1012:1062, 1045:1235] = (((nv[:, :, 2] > 60) & (nv[:, :, 0] < 120) & (nv[:, :, 1] < 120)) * 255).astype(np.uint8)
m = cv2.dilate(m, np.ones((5, 5), np.uint8))
a = cv2.inpaint(a, m, 5, cv2.INPAINT_TELEA)
im = Image.fromarray(a)

def text_img(text, h):
    f = ImageFont.truetype(F, 120, index=0)
    l, t, r, b = f.getbbox(text)
    t_im = Image.new('L', (r - l, b - t), 0)
    ImageDraw.Draw(t_im).text((-l, -t), text, font=f, fill=255)
    return t_im.resize((round(t_im.width * h / t_im.height), h), Image.LANCZOS)

t = text_img('犬の 気持ちは 1匹ずつ ちがうよ。やさしく 見て あげよう。', 26)
cx, top = (x0 + x1) // 2, 1203
pos = (cx - t.width // 2, top)
edge = t.filter(ImageFilter.MaxFilter(5))
im.paste(Image.new('RGB', t.size, (20, 40, 110)), pos, edge)
im.paste(Image.new('RGB', t.size, (255, 255, 255)), pos, t)

# ② 札の 2行(こい 紺・白い 地)
for line, top in (('犬の ようすを', 1016), ('毎日 かんさつ!', 1041)):
    t = text_img(line, 19)
    im.paste(Image.new('RGB', t.size, (7, 10, 144)), (1128 - t.width // 2, top), t)
im.save(out)
