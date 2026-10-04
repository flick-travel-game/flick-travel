# フリック血液型の 四角い 絵(アイコンの もと)を 絵の 中で 直す。
#   白い 地に 赤い 十字(赤十字の しるしと 同じ 形)が 1つ あった(5の 札「けつえきせんたー」の 建物)→ 白で ぬる
# つかいかた: python3 tools/ketsueki/fix_square.py <もとの絵.png> <出力.png>
import sys
from PIL import Image
import numpy as np
A = np.array(Image.open(sys.argv[1]).convert("RGB")).astype(float)
for x0, x1, y0, y1 in [(1114, 1131, 380, 398)]:
    X0, X1, Y0, Y1 = x0 - 4, x1 + 4, y0 - 4, y1 + 4
    box = A[Y0:Y1, X0:X1]
    red = (box[..., 0] - box[..., 1]) > 3
    white = np.median(box[~red], axis=0)
    box[red] = white
    A[Y0:Y1, X0:X1] = box
Image.fromarray(np.clip(A, 0, 255).astype("uint8")).save(sys.argv[2])
