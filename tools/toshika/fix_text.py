#!/usr/bin/env python3
"""フリック投資家: けいくんの ChatGPT の 絵(2026-10-02)の 字の まちがいを 絵の 中で 直す(税理士・アドラーの fix_text.py と 同じ やりかた)
    python3 tools/toshika/fix_text.py トップの絵.png 四角い絵.png 直したトップ.png 直した四角.png
  トップの 絵(4回目。7つの 旅の 札が そろった もの。1536×1024):
  ① 「会社を 知る」の 札「しょろひん」→「しょうひん」
  ② 4択クイズの 見出し「4つの中から こえらぼう!」(字が ぬけて くずれていた)→「4つの中から こたえを えらぼう!」(白い 字を 書きなおす)
  ③ 図鑑の 小さな 札「かぶぬしし?」(切れていた)→「かぶぬしそうかい」(横を ちぢめて 入れる)
  四角い 絵(1254×1254):
  ④ 図鑑の「ぎけつけん」の け の 上に ついた 小さな しるし(げ に 見える)を 地の 色で 消す
  いずれも Noto Sans CJK JP Bold で 書きなおす
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
hero, sq, out_h, out_s = sys.argv[1:5]
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"; S = 8


def glyphs(txt, h, maxw=None):
    """txt を 高さ h の アルファ(0〜1)に する。maxw を こえたら 横だけ ちぢめる"""
    F = ImageFont.truetype(FONT, 40 * S, index=0)            # index 0 = JP
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0); ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
    g = tmp.crop(tmp.getbbox()); w = round(g.width * h / g.height)
    if maxw and w > maxw: w = maxw
    return np.array(g.resize((w, h), Image.LANCZOS)).astype(float)[..., None] / 255


a = np.array(Image.open(hero).convert("RGB")).astype(float); assert a.shape[:2] == (1024, 1536)

# ① しょろひん → しょうひん(こい 紺の 字・白い 札)
X0, Y0, X1, Y1 = 185, 350, 315, 376
r = a[Y0:Y1, X0:X1]; m = r.sum(axis=2) < 300
ys, xs = np.nonzero(m); x0, y0, x1, y1 = X0 + xs.min(), Y0 + ys.min(), X0 + xs.max(), Y0 + ys.max()
col = np.median(r[m], axis=0)
bg = np.median(np.concatenate([a[y1 + 3, x0:x1], a[y0:y1, x0 - 4], a[y0:y1, x1 + 4]]), axis=0)
a[y0 - 2:y1 + 3, x0 - 2:x1 + 3] = bg
al = glyphs("しょうひん", y1 - y0 + 1, x1 - x0 + 1); h, w = al.shape[:2]; gx = (x0 + x1) // 2 - w // 2
a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + col * al

# ② クイズの 見出し(ピンクの 帯に 白い 字)。字の ところを 行ごとの ピンクで うめてから 書きなおす
X0, Y0, X1, Y1 = 452, 749, 724, 781
reg = a[Y0:Y1, X0:X1]
txt = reg.min(axis=2) > 170                                          # もとの 白い 字
grow = txt.copy()                                                    # 字の まわりの かげも ふくめて 3px 太らせる
for _ in range(3):
    g2 = grow.copy(); g2[1:] |= grow[:-1]; g2[:-1] |= grow[1:]; g2[:, 1:] |= grow[:, :-1]; g2[:, :-1] |= grow[:, 1:]; grow = g2
for i in range(reg.shape[0]):                                        # 字の ところだけ、その 行の まわりの ピンクで うめる(帯の グラデーションは のこす)
    row = reg[i]; keep = row[~grow[i]]
    if len(keep): row[grow[i]] = np.median(keep, axis=0)
from PIL import ImageFilter                                           # うめた ところだけ ぼかして、もとの 字の あとを 目立たなく する
soft = np.array(Image.fromarray(reg.clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(4))).astype(float)
reg[grow] = soft[grow]
a[Y0:Y1, X0:X1] = reg
shadow = np.median(reg[~grow], axis=0) * 0.7                         # 字の まわりの こい ピンクの かげ
al = glyphs("4つの中から こたえを えらぼう!", 25, X1 - X0 - 6); h, w = al.shape[:2]
gx, gy = X0 + 3, Y0 + 4
sh = np.zeros((h + 4, w + 4, 1))
for dx in range(5):
    for dy in range(5): sh[dy:dy + h, dx:dx + w] = np.maximum(sh[dy:dy + h, dx:dx + w], al)
reg = a[gy - 2:gy + h + 2, gx - 2:gx + w + 2]; a[gy - 2:gy + h + 2, gx - 2:gx + w + 2] = reg * (1 - sh * .6) + shadow * sh * .6
a[gy:gy + h, gx:gx + w] = a[gy:gy + h, gx:gx + w] * (1 - al) + 255 * al

# ③ 図鑑の「かぶぬしし?」→「かぶぬしそうかい」(白い 札に 紺むらさきの 字)
X0, Y0, X1, Y1 = 943, 902, 990, 920
r = a[Y0:Y1, X0:X1]; m = (r[..., 2] - r[..., 0] > 60) & (r.sum(axis=2) < 450)
col = np.median(r[m], axis=0)
a[Y0:Y1, X0:X1] = np.median(a[Y0:Y1, X0:X1][~m], axis=0)
al = glyphs("かぶぬしそうかい", 12, X1 - X0 - 2); h, w = al.shape[:2]; gx = (X0 + X1) // 2 - w // 2; gy = Y0 + 3
a[gy:gy + h, gx:gx + w] = a[gy:gy + h, gx:gx + w] * (1 - al) + col * al
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out_h)

# ④ 四角い 絵: ぎげつけん の しるしを 消す
b = np.array(Image.open(sq).convert("RGB")).astype(float); assert b.shape[:2] == (1254, 1254)
X0, Y0, X1, Y1 = 803, 1152, 823, 1161
reg = b[Y0:Y1, X0:X1]; mk = reg.sum(axis=2) < 600
reg[mk] = np.median(b[Y0 - 3:Y0, X0:X1].reshape(-1, 3), axis=0); b[Y0:Y1, X0:X1] = reg
Image.fromarray(b.clip(0, 255).astype(np.uint8)).save(out_s)
print("直した:", out_h, out_s)
