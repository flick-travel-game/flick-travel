"""フリック歯科医師の トップの 絵を 直す(2026-10-09)。

  python3 tools/shika/fix_text.py <もとの絵.png> <出力.png>

1. 🔊 の マーク 11こを 消す(シリーズの 日本語ゲームに 読みあげは 無い)。
   マークの 四角を、行ごとに 左がわの 地の 色(白い 字を のぞいた 中央値)で ぬる。
2. 8番の 見出し「みんなの 歯と 健康」の「と」を、同じ 見出しの「の」で 置きかえる。
"""
import sys
import numpy as np
from PIL import Image

# (x, y, w, h) … 青い 丸の 四角(もとの絵 1536×1024 の 座標)
SPEAKERS = [
    (1472, 16, 42, 39), (372, 28, 40, 36), (1476, 213, 41, 36), (372, 222, 40, 37),
    (1476, 410, 40, 38), (373, 418, 39, 36), (1475, 602, 41, 37), (370, 611, 39, 36),
    (1484, 800, 36, 35), (364, 816, 41, 36), (1052, 836, 37, 35),
]
QUIZ = (1052, 836, 37, 35)
PAD = 8


def erase(a, x, y, w, h, white_box=False):
    x0, y0, x1, y1 = x - PAD, y - PAD, x + w + PAD, y + h + PAD
    prev = None
    for yy in range(y0, y1):
        left = a[yy, x0 - 60:x0 - 3]
        mx, mn = left.max(axis=1), left.min(axis=1)
        if white_box:
            # クイズの 白い 箱: 白だけ 見る
            keep = left[mn > 200]
        else:
            # 色の 見出し: 白い 字・つやを のぞいて あざやかな 地の 色だけ 見る
            sat = (mx - mn) / np.maximum(mx, 1)
            keep = left[(sat > 0.35) & (mx > 90)]
        if len(keep) >= 8:
            col = np.median(keep, axis=0)
        else:
            col = prev if prev is not None else np.median(left, axis=0)
        prev = col
        a[yy, x0:x1] = col


def bg_row(a, yy, x0, x1):
    seg = a[yy, x0:x1]
    mx, mn = seg.max(axis=1), seg.min(axis=1)
    keep = seg[((mx - mn) / np.maximum(mx, 1) > 0.45) & (mx > 120)]
    return np.median(keep if len(keep) >= 5 else seg, axis=0)


# 8番の 見出し: 「の」(x 1286-1309) を 「と」(x 1351-1369) の ところへ
NO = (1283, 1313)
TO = (1348, 1373)
ROWS = (597, 633)


def fix_box8(a):
    w = NO[1] - NO[0]
    cx = (TO[0] + TO[1]) // 2
    nx0 = cx - w // 2
    src = a[ROWS[0]:ROWS[1], NO[0]:NO[1]].copy()
    for i, yy in enumerate(range(*ROWS)):
        sbg = bg_row(a, yy, NO[0] - 40, NO[1] + 40)
        nbg = bg_row(a, yy, TO[0] - 40, TO[1] + 40)
        a[yy, TO[0] - 2:TO[1] + 3] = nbg          # 「と」を 消す
        a[yy, nx0:nx0 + w] = nbg + (src[i] - sbg)  # 「の」を うつす


def main(src, dst):
    a = np.array(Image.open(src).convert("RGB")).astype(float)
    for s in SPEAKERS:
        erase(a, *s, white_box=(s == QUIZ))
    fix_box8(a)
    Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
