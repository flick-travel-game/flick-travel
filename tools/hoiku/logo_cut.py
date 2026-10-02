#!/usr/bin/env python3
"""フリック保育士: けいくんの 絵から 題名と アイコンを 作る(2026-09-28)
    python3 tools/hoiku/logo_cut.py トップの絵.png 四角い絵.png [見本.png]

作る もの
  hoiku/logo-word.webp      題名「フリック保育士」(すきとおる。トップの 絵から 切りぬく)
  hoiku/hero.webp           トップの 絵(1536×1024)
  hoiku/logo-mark2.webp     144px の 小さい マーク(四角い 絵から)
  hoiku/icon-512.png        512px
  hoiku/apple-touch-icon.png 180px
  hoiku/favicon.png         64px

題名の 切りぬきかた(この 絵は 背景の 保育室が 明るくて、白い ふちと つながってしまう)
  ① 字の 中身 = 色の 鮮やかな ところ(s>.45 v>.45)の 大きな かたまり
     ⚠️ 上に ういている 花・星を 落とすため「高さ45px 以上・まん中が 下half」の ものだけ
  ② それを 8回 ふくらませて 白い ふちの ぶんを 足す(白い ふちを 直に ひろうと 背景の 白と つながる)
  ③ 穴を うめて、ふちを すこし ぼかす
⚠️ できた 絵は かならず 目で 見る(白い 地・くらい 地 の 両方)。
   大きさを 変えたら build_games.py の hoiku の art.word も なおす(wordv も 上げる)
"""
import sys
import numpy as np
import cv2
from scipy import ndimage
from PIL import Image

HERO = sys.argv[1] if len(sys.argv) > 1 else "/tmp/fix/yoko.png"
SQUARE = sys.argv[2] if len(sys.argv) > 2 else "/tmp/fix/sq.png"
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None

# 題名の ある ところ(1536×1024 の 中)。下の 金の 帯「こどもの えがおと…」は 入れない
X0, Y0, X1, Y1 = 368, 548, 1164, 726
DILATE = 8          # 白い ふちの ぶん

img = cv2.imread(HERO)
assert img is not None and img.shape[:2] == (1024, 1536), f"トップの 絵は 1536×1024 で: {None if img is None else img.shape}"
crop = img[Y0:Y1, X0:X1]
rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
s, v = hsv[..., 1] / 255.0, hsv[..., 2] / 255.0

vivid = (s > 0.45) & (v > 0.45)
vivid[:, 718 - X0:766 - X0] = False
vivid[:26, :] = False   # 字より 上の 花・クレヨン   # 「ク」と「保」の あいだの ピンクの クレヨン(字では ない)
lab, _ = ndimage.label(vivid)
objs = ndimage.find_objects(lab)
keep = [i for i, sl in enumerate(objs, start=1)
        if int((lab[sl] == i).sum()) >= 1200            # 小さい かざりは 落とす
        and (sl[0].stop - sl[0].start) >= 45            # 字は たてに 長い
        and (sl[0].start + sl[0].stop) / 2 >= 45]       # 上に ういている 花は 落とす
body = ndimage.binary_fill_holes(np.isin(lab, keep))
mask = ndimage.binary_fill_holes(ndimage.binary_dilation(body, np.ones((3, 3)), iterations=DILATE))
alpha = cv2.GaussianBlur((mask * 255).astype(np.uint8), (5, 5), 0)

word = Image.fromarray(rgb)
word.putalpha(Image.fromarray(alpha))
word = word.crop(word.getbbox())
word.save("hoiku/logo-word.webp", "WEBP", quality=95, method=6)
print("hoiku/logo-word.webp", word.size)

# トップの 絵
Image.open(HERO).convert("RGB").save("hoiku/hero.webp", "WEBP", quality=88, method=6)
print("hoiku/hero.webp", Image.open("hoiku/hero.webp").size)

# アイコン(四角い 絵から)
sq = Image.open(SQUARE).convert("RGB")
assert sq.size[0] == sq.size[1], f"四角い 絵は 正方形で: {sq.size}"
sq.resize((512, 512), Image.LANCZOS).save("hoiku/icon-512.png")
sq.resize((180, 180), Image.LANCZOS).save("hoiku/apple-touch-icon.png")
sq.resize((64, 64), Image.LANCZOS).save("hoiku/favicon.png")
sq.resize((144, 144), Image.LANCZOS).save("hoiku/logo-mark2.webp", "WEBP", quality=92, method=6)
print("アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2")

if PREVIEW:   # 目で 見る ための 見本(白い 地 と くらい 地)
    p = Image.new("RGB", (word.width, word.height * 2 + 10), (255, 255, 255))
    p.paste(word, (0, 0), word)
    dk = Image.new("RGB", (word.width, word.height), (26, 22, 42))
    dk.paste(word, (0, 0), word)
    p.paste(dk, (0, word.height + 10))
    p.save(PREVIEW)
    print(PREVIEW)
