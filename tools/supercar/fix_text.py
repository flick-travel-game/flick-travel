"""フリックスーパーカーの トップの 絵(2回目)の 字を 直す。
python3 tools/supercar/fix_text.py <もとの絵.png> <出す.png>

・きほんの 札 4つ: 絵と 合う ゲームの ことばに(えんじんの絵=えんじん / 赤い車=すーぱーかー /
  運転席=うんてんせき / メーター=さいこうそくど)
・ぼるしぇ → ぽるしぇ / ばがーに → ぱがーに / すーぶら → すーぷら(゛と゜の まちがい)
・レベル3「スーパーーはかせに!」→「スーパーカーはかせに!」
・ことばの いみ「ちかくに」→「じめんに」/「ふらずに」→「ふらつかずに」
"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
src, dst = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(int)


def erase(x0, y0, x1, y1, pad=3, side=8):
    """字の 四角を 行ごとに 左右の 明るい 地の 色で うめる"""
    X0, Y0, X1, Y1 = x0 - pad, y0 - pad, x1 + pad + 1, y1 + pad + 1
    for y in range(Y0, Y1):
        row = np.concatenate([a[y, X0 - side:X0], a[y, X1:X1 + side]])
        ok = row[row.min(axis=1) > 170]
        if len(ok):
            left = np.median(a[y, X0 - side:X0][a[y, X0 - side:X0].min(1) > 170], axis=0) if (a[y, X0 - side:X0].min(1) > 170).any() else np.median(ok, axis=0)
            right = np.median(a[y, X1:X1 + side][a[y, X1:X1 + side].min(1) > 170], axis=0) if (a[y, X1:X1 + side].min(1) > 170).any() else np.median(ok, axis=0)
            t = np.linspace(0, 1, X1 - X0)[:, None]
            a[y, X0:X1] = left * (1 - t) + right * t


def ink_of(x0, y0, x1, y1):
    r = a[y0:y1 + 1, x0:x1 + 1].reshape(-1, 3)
    d = r[r.max(1) < 70]
    return tuple(int(v) for v in np.median(d, axis=0)) if len(d) else (0, 0, 0)


jobs = []  # (書く左 x または 中心, y0, 高さ, 字, 色, 最大はば, 左寄せか)


def label(box, text, maxw, left=False):
    x0, y0, x1, y1 = box
    col = ink_of(*box)
    erase(*box)
    jobs.append((x0 if left else (x0 + x1) / 2, y0, y1 - y0 + 1, text, col, maxw, left))


label((48, 126, 149, 144), "えんじん", 130)
label((229, 127, 276, 144), "すーぱーかー", 135)
label((50, 232, 143, 248), "うんてんせき", 130)
label((230, 232, 278, 248), "さいこうそくど", 135)
label((977, 134, 1030, 149), "ぽるしぇ", 120)
label((816, 232, 874, 246), "ぱがーに", 125)
label((1258, 486, 1314, 499), "すーぷら", 130)
label((1385, 970, 1505, 982), "スーパーカーはかせに！", 132)
# ことばの いみ: 2行め「ちかくに」/ 3行め「ふらずに」から うしろ(x 736 から)
label((745, 947, 800, 961), "じめんに", 60)
label((736, 971, 996, 986), "ふらつかずに はしれるように なるんだ！", 300, left=True)

out = Image.fromarray(a.clip(0, 255).astype("uint8"))
for cx, y0, h, text, col, maxw, left in jobs:
    f = ImageFont.truetype(FONT, 60)
    lay = Image.new("RGBA", (60 * len(text) + 40, 100), (0, 0, 0, 0))
    ImageDraw.Draw(lay).text((10, 10), text, font=f, fill=col + (255,))
    lay = lay.crop(lay.getbbox())
    s = h / lay.height
    w = round(lay.width * s)
    if w > maxw:
        w = maxw
    lay = lay.resize((w, h), Image.LANCZOS)
    x = round(cx) if left else round(cx - w / 2)
    out.paste(lay, (x, y0), lay)
out.save(dst)
