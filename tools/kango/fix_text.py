#!/usr/bin/env python3
"""フリック看護師: けいくんの 絵の 字の まちがいを 絵の 中で 直す(2026-09-29)
    python3 tools/kango/fix_text.py 横長.png 四角.png 横長-直した.png 四角-直した.png

2回目の 絵でも ChatGPT が 小さい かなを 直せなかった ところ(保育士の「じっぎ」と 同じ):
  ① 右下の「ごっかしけん」→「こっかしけん」(横長・四角 両方)
     … ご の 右上の 濁点だけを、上の 行の 地の 色から 字の ふちの 色へ なめらかに ぬりつぶす
  ② 横長の 右下の 黄色い ふきだし「ゆめに むながる!」→「つながる!」
     … む を 消して(inpaint)、四角い 絵の 同じ ふきだしの「つ」を 1.1倍にして 形だけ もらい、
        色は となりの「な」の いちばん こい 色で ぬる
⚠️ 位置は この 2枚の 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
"""
import sys
import numpy as np
import cv2

A_IN, B_IN, A_OUT, B_OUT = sys.argv[1:5]
a = cv2.imread(A_IN); b = cv2.imread(B_IN)
assert a.shape[:2] == (1024, 1536) and b.shape[:2] == (1254, 1254), (a.shape, b.shape)


def drop_dakuten(im, xs, ys, top_row, glow, ys2, xs2, glow_x, blur):
    src = im.copy()
    for x in xs:
        for y in ys:
            t = (y - top_row) / (ys.stop - top_row + 1)
            im[y, x] = (src[top_row, x] * (1 - t) + src[glow] * t).astype(np.uint8)
    for y in ys2:
        for x in xs2:
            im[y, x] = src[y, glow_x]
    (bx0, by0, bx1, by1) = blur
    im[by0:by1, bx0:bx1] = cv2.GaussianBlur(im[by0 - 2:by1 + 2, bx0 - 2:bx1 + 2], (3, 3), 0)[2:-2, 2:-2]


# ① ご → こ
drop_dakuten(a, range(1388, 1398), range(798, 804), 797, (804, 1398), range(804, 807), range(1391, 1398), 1398, (1386, 798, 1400, 807))
drop_dakuten(b, range(1136, 1145), range(978, 983), 977, (985, 1144), range(983, 986), range(1138, 1145), 1145, (1134, 977, 1147, 988))


# ② む → つ(横長だけ。四角は もとから「つながる」)
def ink(c):  # 0 = ふきだしの 黄色 / 1 = ピンクの 字
    return np.clip((200 - c.astype(float)[..., 1]) / 110, 0, 1)


x0, y0, x1, y1 = 1467, 903, 1482, 919
m = np.zeros(a.shape[:2], np.uint8)
m[y0:y1, x0:x1] = (ink(a[y0:y1, x0:x1]) > 0.15) * 255
m = cv2.dilate(m, np.ones((3, 3), np.uint8)); m[:, x1:] = 0
na = a[904:915, 1482:1492].reshape(-1, 3).astype(float)
col = na[ink(na[None])[0] > 0.85].mean(0)
a = cv2.inpaint(a, m, 5, cv2.INPAINT_TELEA)
p = cv2.resize(b[1082:1094, 1201:1215], None, fx=1.1, fy=1.1, interpolation=cv2.INTER_CUBIC)
al = ink(p)[..., None]; h, w = p.shape[:2]; tx, ty = 1468, 905
a[ty:ty + h, tx:tx + w] = (a[ty:ty + h, tx:tx + w].astype(float) * (1 - al) + col * al).astype(np.uint8)

cv2.imwrite(A_OUT, a); cv2.imwrite(B_OUT, b)
print(A_OUT, B_OUT)
