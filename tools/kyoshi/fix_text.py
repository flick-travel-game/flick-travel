#!/usr/bin/env python3
"""フリック教師: けいくんの 絵(2回目・横長)の 字を 1か所 直す(2026-09-30)
    python3 tools/kyoshi/fix_text.py もとの横長.png 直した横長.png
左下の 4択の 問いが「(丸の Q) Q:じゅぎょうの …」と Q が 2回 出ていたので、1行目の「Q:」を 消して 字を 左へ よせる。
1行目は y 805〜825(2行目は 833〜)。「Q:」は x 99〜125、「じ」は x 128 から。地の 色は 白(254)"""
import sys
import numpy as np
from PIL import Image
a = np.array(Image.open(sys.argv[1]).convert("RGB")).copy(); assert a.shape[:2] == (1024, 1536)
r0, r1 = 801, 830
R = int(np.where((a[r0:r1, 99:470].sum(2) < 400).any(0))[0].max()) + 99 + 3
seg = a[r0:r1, 127:R].copy()
a[r0:r1, 97:R] = 254
a[r0:r1, 99:99 + seg.shape[1]] = seg
Image.fromarray(a).save(sys.argv[2]); print(sys.argv[2])
