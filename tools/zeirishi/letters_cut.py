#!/usr/bin/env python3
"""フリック税理士の 題名(zeirishi/logo-word.webp)を、けいくんの ChatGPT の 題名だけの 絵(tools/zeirishi/art/title-src.png。すきとおった 地)から 作る(2026-10-02)。
   トップの 絵から 切る logo_cut.py は「税」に 穴が あき「士」の 右が 切れたので、こちらを 正本に した。
   帯「うって まなぶ 税の ことば!」・本・金貨・電卓は 落とし、字だけ のこす。はば 900 に 縮める。
    python3 tools/zeirishi/letters_cut.py   (flick-travel の 中で)
   ⚠️ 大きさを 変えたら tools/build_games.py の zeirishi の art.word と speed-king の games.ts を そろえる"""
import numpy as np, cv2
from scipy import ndimage
from PIL import Image
im = Image.open('tools/zeirishi/art/title-src.png').convert('RGBA'); a = np.array(im); al = a[..., 3] > 40
hsv = cv2.cvtColor(a[..., :3], cv2.COLOR_RGB2HSV); s = hsv[..., 1] / 255; v = hsv[..., 2] / 255
h, w = al.shape; yy, xx = np.mgrid[0:h, 0:w]
cut = np.zeros_like(al)
vivid = (s > 0.5) & (v > 0.55)
near = ndimage.binary_dilation(vivid & (xx >= 1250) & (yy >= 195), iterations=14)   # 「理」「士」の 中身の そば(ふちは のこす)
yellow = (hsv[..., 0] >= 18) & (hsv[..., 0] <= 36) & (s > 0.4) & (v > 0.8)
cut |= (yy >= 500) & (xx < 1300)                         # 帯「うって まなぶ 税の ことば!」(字の 下)
cut |= (yy >= 495) & (xx < 1610) & yellow                # 帯の 黄色が「理」の 下に かかる ぶん
cut |= (yy >= 540) & (xx < 1610)                         # 帯の 字(「理」の 下)
cut |= (yy >= 605)                                       # 帯の 下・本・影
cut |= (yy >= 560) & (xx >= 1550)                        # 本
cut |= (xx >= 1400) & (yy < 190)                         # 電卓の 上の ほう(字より 上)。ほかの 題名と 高さを そろえる ため 電卓は 入れない
cut |= (xx >= 1440) & (xx < 1700) & (yy < 300) & ~near   # 電卓の のこり。「理」「士」の 字の そばだけ のこす(ふちが 切れない ように)
cut |= (xx >= 1600) & (yy < 288)                         # 右上の 金貨・「理」と「士」の あいだの 電卓
cut |= (xx >= 1882)                                      # 右の きらきら・金貨
cut |= (xx >= 1830) & (yy >= 480) & ((yy < 525) | (yy >= 600))   # 右下の 金貨(「士」の 下の 棒の 上と 下)
keep = ndimage.binary_opening(al & ~cut, iterations=2)
lab, n = ndimage.label(keep); sz = ndimage.sum(keep, lab, range(1, n + 1))
keep = np.isin(lab, [i + 1 for i, z in enumerate(sz) if z > 3000])
out = a.copy(); out[..., 3] = np.where(keep, a[..., 3], 0)
o = Image.fromarray(out); o = o.crop(o.getbbox()); r = 900 / o.width
o = o.resize((900, round(o.height * r)), Image.LANCZOS)
o.save('zeirishi/logo-word.webp', 'WEBP', quality=95, method=6); print('zeirishi/logo-word.webp', o.size)
