# フリック救急隊員の 四角い 絵(アイコンの もと)を 絵の 中で 直す。
#   白い 地に 赤い 十字(赤十字の しるしと 同じ 形)が 2つ あった(きゅういんき の 札・レベル2の かばん)→ 白で ぬる
# つかいかた: python3 tools/kyukyutai/fix_square.py <もとの絵.png> <出力.png>
import sys
from PIL import Image
import numpy as np
A = np.array(Image.open(sys.argv[1]).convert("RGB")).astype(float)
for x0, x1, y0, y1 in [(1020, 1037, 857, 871), (1051, 1071, 1151, 1170)]:
    X0, X1, Y0, Y1 = x0 - 4, x1 + 4, y0 - 4, y1 + 4
    box = A[Y0:Y1, X0:X1]
    red = (box[..., 0] - box[..., 1]) > 8
    white = np.median(box[~red], axis=0)
    box[red] = white
    A[Y0:Y1, X0:X1] = box
Image.fromarray(np.clip(A, 0, 255).astype("uint8")).save(sys.argv[2])
