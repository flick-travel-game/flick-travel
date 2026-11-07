"""フリック日商簿記の トップの 絵の 字を 1つ 直す。
「がいかかんせん」の せ → さ(同じ 絵の「しさん」の さ を 写す)。
使いかた: python3 tools/boki/fix_text.py もとの絵.png 出力.png
"""
import sys
from PIL import Image
import numpy as np

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.array(im).astype(int)

# せ の 場所(1443..1469, 307..334)を 札の 地の 色で ぬる
bx0, by0, bx1, by1 = 1442, 306, 1469, 335
bg = np.median(a[by0:by1, 1494:1505].reshape(-1, 3), axis=0)
a[by0:by1, bx0:bx1] = bg

# 「しさん」の さ(288..307, 106..128)を 地を すかして 写す
sx0, sy0, sx1, sy1 = 285, 103, 311, 131
g = a[sy0:sy1, sx0:sx1]
gbg = np.median(a[sy0:sy1, 335:345].reshape(-1, 3), axis=0)
gray = g.mean(axis=2)
alpha = np.clip((gbg.mean() - gray) / (gbg.mean() - 20), 0, 1)[..., None]
dx = (1445 + 1467) // 2 - (288 + 307) // 2
dy = (310 + 331) // 2 - (106 + 128) // 2
tx0, ty0 = sx0 + dx, sy0 + dy
region = a[ty0:ty0 + g.shape[0], tx0:tx0 + g.shape[1]]
a[ty0:ty0 + g.shape[0], tx0:tx0 + g.shape[1]] = (region * (1 - alpha) + g * alpha).astype(int)

Image.fromarray(a.astype(np.uint8)).save(out)
