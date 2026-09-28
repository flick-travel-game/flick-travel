#!/usr/bin/env python3
"""フリック保育士の 絵の 誤字直し(2026-09-28): 小さい「っ」を 大きい「つ」に する
    python3 tools/hoiku/fix_tsu.py トップの絵.png 四角い絵.png 出さき1.png 出さき2.png

⚠️ なぜ いるか
  けいくんの 絵の 右下の 見出しが「じっぎ と げんば」(小さい っ)の 誤字だった。
  ChatGPT に 2回 頼んでも 直らなかった(小さい かなの 書きわけが にがて)。
  ほかの 直し(🔊 を 消す・クイズの 中身)は できたので、この 1文字だけ 絵の 中で 描きかえた。

やりかた
  ① その 字を 切り出して、明るさから すきとおり(alpha)を 作る
  ② 背景を 行ごとの 中央値で 作りなおして、もとの 字を 消す
  ③ 少し 大きく して、上へ 動かして 貼りなおす
     (小さい「っ」は 下よせ。大きい「つ」は 上よせ。これで「つ」に 見える)
  → 書体・色・つや・ふちは もとの まま 残る

⚠️ つぎに 絵を 作りなおして もらう ときは、まず 字を 切り出して 読む。
   直っていれば この 台本は いらない。
"""
import sys
import numpy as np
from PIL import Image, ImageFilter


def fix_tsu(im, X0, X1, Y0, Y1, dark=False, hi=250, lo=195, scale=1.12, up_ratio=0.33, blur=2.2):
    """(X0,Y0)-(X1,Y1) の 中の 小さい「っ」を 大きい「つ」に する。
       dark=False … 白い 字 × こい 背景 / dark=True … こい 字 × 明るい 背景(hi・lo で 字の 濃さを 決める)"""
    a = np.asarray(im.convert("RGB")).astype(float).copy()
    box = a[Y0:Y1, X0:X1]
    if dark:
        alpha = np.clip((hi - box.max(axis=2)) / (hi - lo), 0, 1)
    else:
        alpha = np.clip((box.min(axis=2) - 40) / (215 - 40), 0, 1)
    ys = np.where((alpha > 0.5).any(axis=1))[0]
    up = int(round(len(ys) * up_ratio)) if len(ys) else 6
    bg = np.zeros_like(box)
    for i in range(box.shape[0]):
        ok = alpha[i] < 0.12
        bg[i] = np.median(box[i][ok] if ok.sum() >= 5 else box[i], axis=0)
    bg = np.asarray(Image.fromarray(bg.astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))).astype(float)
    ch = Image.fromarray(box.astype(np.uint8))
    ch.putalpha(Image.fromarray((alpha * 255).astype(np.uint8)))
    a[Y0:Y1, X0:X1] = bg
    out = Image.fromarray(a.astype(np.uint8))
    w, h = ch.size
    nw, nh = int(round(w * scale)), int(round(h * scale))
    big = ch.resize((nw, nh), Image.LANCZOS)
    out.paste(big, ((X0 + X1) // 2 - nw // 2, (Y0 + Y1) // 2 - nh // 2 - up), big)
    return out


if __name__ == "__main__":
    hero_in, sq_in, hero_out, sq_out = sys.argv[1:5]
    # トップの 絵(1536×1024): 見出しの バー(白い字)と 右下「このことばは どこかな?」の 札(こい字)
    im = Image.open(hero_in)
    im = fix_tsu(im, 1274, 1312, 536, 572)
    im = fix_tsu(im, 1382, 1402, 959, 983, dark=True, hi=250, lo=195, scale=1.10, blur=1.0)
    im.save(hero_out)
    # 四角い 絵(1254×1254): 見出しの バー(白い字)
    im2 = fix_tsu(Image.open(sq_in), 1030, 1059, 678, 712)
    im2.save(sq_out)
    print(hero_out, im.size, "/", sq_out, im2.size)
