#!/usr/bin/env python3
"""フリック消防士: けいくんの トップの 絵(2回目)の 字の まちがいを 絵の 中で 直す(2026-10-01)
    python3 tools/shobo/fix_text.py もとの絵.png 直した絵.png
  下の まん中の 図鑑の 見本の 説明「けが人や くるいの あるい人を」→「けが人や ぐあいの わるい人を」
  … その 1行を 白で 消して、Noto Sans CJK JP Bold で 同じ 箱(x 620〜791 / y 891〜904)・同じ こい 青で 書きなおす
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk
"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
S = 8
F = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", 15 * S, index=0)  # index 0 = JP
txt = "けが人や ぐあいの わるい人を"
x0, y0, x1, y1 = 620, 891, 791, 904            # もとの 字の ink の 箱
W, H = (x1 - x0 + 1) * S, (y1 - y0 + 1) * S
tmp = Image.new("L", (W * 2, H * 3), 0); d = ImageDraw.Draw(tmp)
d.text((0, H), txt, font=F, fill=255)
bb = tmp.getbbox(); g = tmp.crop(bb).resize((W, H), Image.LANCZOS).resize((x1 - x0 + 1, y1 - y0 + 1), Image.LANCZOS)
a = np.array(im).astype(float)
a[888:907, 616:796] = [253, 253, 253]              # もとの 行を 白で 消す
al = np.array(g).astype(float)[..., None] / 255
col = np.array([20, 30, 150])
reg = a[y0:y1 + 1, x0:x1 + 1]
a[y0:y1 + 1, x0:x1 + 1] = reg * (1 - al) + col * al
Image.fromarray(a.astype(np.uint8)).save(out)
