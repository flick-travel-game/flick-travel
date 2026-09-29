#!/usr/bin/env python3
"""フリック看護師: けいくんの 絵から 題名と アイコンを 作る(2026-09-29。保育士の logo_cut.py を 写した)
    python3 tools/kango/logo_cut.py トップの絵.png 四角い絵.png [見本.png]
    ⚠️ 絵は さきに tools/kango/fix_text.py で 字を 直した もの を わたす

作る もの
  kango/logo-word.webp      題名「フリック看護師」(すきとおる。トップの 絵から 切りぬく)
  kango/hero.webp           トップの 絵(1536×1024)
  kango/logo-mark2.webp     144px の 小さい マーク(四角い 絵から)
  kango/icon-512.png        512px
  kango/apple-touch-icon.png 180px
  kango/favicon.png         64px

題名の 切りぬきかた(保育士の「字の 中身を ふくらませる」では「護」の うすい ピンクと 小さい「ッ」が 欠けた)
  ① 字の まわりの こい 紺の ふち(H 100〜135・暗い)と 鮮やかな 字の 中身を 合わせて、穴を うめる
     → ふちに かこまれた 字は うすい 色でも ぜんぶ 入る。ナースぼうしと 聴診器も 入る
  ② 下の 帯「みて きづいて ささえる…」と 左上の ナースの 服(こい 青)は 箱で 落とす
  ③ 大きい かたまり だけ 残して、ふちを すこし ぼかす
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地 の 両方)。
   大きさを 変えたら build_games.py の kango の art.word も なおす(wordv も 上げる)
"""
import sys
import numpy as np
import cv2
from scipy import ndimage
from PIL import Image

HERO = sys.argv[1] if len(sys.argv) > 1 else "yoko.png"
SQUARE = sys.argv[2] if len(sys.argv) > 2 else "sq.png"
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None

# 題名の ある ところ(1536×1024 の 中)
X0, Y0, X1, Y1 = 400, 522, 1168, 735

img = cv2.imread(HERO)
assert img is not None and img.shape[:2] == (1024, 1536), f"トップの 絵は 1536×1024 で: {None if img is None else img.shape}"
crop = img[Y0:Y1, X0:X1]
rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
H, s, v = hsv[..., 0], hsv[..., 1] / 255.0, hsv[..., 2] / 255.0
u = (((H >= 100) & (H <= 135) & (v < 0.6) & (s > 0.35)) | ((s > 0.4) & (v > 0.45))).astype(np.uint8)
u[178:, 120:640] = 0     # 下の 帯
u[:40, :250] = 0         # 左上の ナースの 服
ell = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
u = cv2.morphologyEx(u, cv2.MORPH_CLOSE, ell(5))
f = ndimage.binary_fill_holes(u)
f = cv2.morphologyEx(f.astype(np.uint8), cv2.MORPH_OPEN, ell(5)).astype(bool)
lab, n = ndimage.label(f)
sz = ndimage.sum(f, lab, range(1, n + 1))
keep = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 1500])
M = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 1.0)
alpha = (np.clip((M - .2) / .6, 0, 1) * 255).astype(np.uint8)

word = Image.fromarray(rgb)
word.putalpha(Image.fromarray(alpha))
word = word.crop(word.getbbox())
word.save("kango/logo-word.webp", "WEBP", quality=95, method=6)
print("kango/logo-word.webp", word.size)

# トップの 絵
Image.open(HERO).convert("RGB").save("kango/hero.webp", "WEBP", quality=88, method=6)
print("kango/hero.webp", Image.open("kango/hero.webp").size)

# アイコン(四角い 絵から)
sq = Image.open(SQUARE).convert("RGB")
assert sq.size[0] == sq.size[1], f"四角い 絵は 正方形で: {sq.size}"
sq.resize((512, 512), Image.LANCZOS).save("kango/icon-512.png")
sq.resize((180, 180), Image.LANCZOS).save("kango/apple-touch-icon.png")
sq.resize((64, 64), Image.LANCZOS).save("kango/favicon.png")
sq.resize((144, 144), Image.LANCZOS).save("kango/logo-mark2.webp", "WEBP", quality=92, method=6)
print("アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2")

if PREVIEW:   # 目で 見る ための 見本(白い 地 と くらい 地)
    p = Image.new("RGB", (word.width, word.height * 2 + 10), (255, 255, 255))
    p.paste(word, (0, 0), word)
    dk = Image.new("RGB", (word.width, word.height), (26, 22, 42))
    dk.paste(word, (0, 0), word)
    p.paste(dk, (0, word.height + 10))
    p.save(PREVIEW)
    print(PREVIEW)
