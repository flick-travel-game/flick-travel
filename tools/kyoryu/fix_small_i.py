#!/usr/bin/env python3
"""フリック恐竜図鑑の 絵の 誤字直し(2026-09-29): 「ていらのさうるす」の 大きい「い」を 小さい「ぃ」に する
    python3 tools/kyoryu/fix_small_i.py トップの絵.png 四角い絵.png 出さき1.png 出さき2.png

⚠️ なぜ いるか
  けいくんの 絵(2回目)は ほかの 直しが ぜんぶ できたが、肉を食べる恐竜の 札の「てぃらのさうるす」だけ
  小さい「ぃ」が 大きい「い」の ままだった(ChatGPT は 小さい かなの 書きわけが にがて。保育士の「じっぎ」と 同じ)。
  → 絵の 中で その 1字だけ 小さく 描きなおす(tools/hoiku/fix_tsu.py と 同じ やりかた)

やりかた
  ① 札の 字の 列を 1行ずつ 印字して「い」だけが 入る 四角を 測る(下の 数字)
  ② 背景(白い 札)を 行ごとの 中央値で 作りなおして、もとの「い」を 消す
  ③ 0.66倍に して 下よせで 貼りなおす(小さい かなは 下よせ)。書体・色は もとの まま

⚠️ つぎに 絵を 作りなおして もらう ときは、まず 字を 切り出して 読む。直っていれば この 台本は いらない。
"""
import sys
import numpy as np
from PIL import Image, ImageFilter


def small_i(im, X0, Y0, X1, Y1, scale=0.7, blur=1.0, gain=0.6):
    """(X0,Y0)-(X1,Y1) = 大きい「い」だけが 入る 四角(字の 列を 1行ずつ 印字して 測った)。こい 赤の 字 × 白い 札"""
    a = np.asarray(im.convert("RGB")).astype(float).copy()
    box = a[Y0:Y1, X0:X1]
    alpha = np.clip((225 - box[:, :, 1]) / (225 - 110), 0, 1)  # 緑の こさで 見る(赤い 字は 緑が 少ない)
    ys = np.where((alpha > 0.45).any(axis=1))[0]
    bottom = ys.max() + 1
    bg = np.zeros_like(box)
    card = np.median(box[alpha < 0.1], axis=0)  # 札の 地の 色(字の 多い 行は これを 使う。行の 中央値だと 字の 色に なる)
    for i in range(box.shape[0]):
        ok = alpha[i] < 0.1
        bg[i] = np.median(box[i][ok], axis=0) if ok.sum() >= 5 else card
    bg = np.asarray(Image.fromarray(bg.astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))).astype(float)
    # 小さくすると 線が うすく なるので、字の 色を 字の いちばん こい 色に そろえて、すきとおりを こく する(gain)
    ink = box[alpha > 0.8].mean(axis=0) if (alpha > 0.8).any() else box.min(axis=(0, 1))
    ga = np.where(alpha < 0.3, 0, alpha) ** gain  # うすい ふちの ごみ(となりの 字の にじみ)は 貼らない
    ch = Image.fromarray(np.broadcast_to(ink, box.shape).astype(np.uint8)); ch.putalpha(Image.fromarray((ga * 255).astype(np.uint8)))
    a[Y0:Y1, X0:X1] = bg
    out = Image.fromarray(a.astype(np.uint8))
    w, h = ch.size
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    sm = ch.resize((nw, nh), Image.LANCZOS)
    # 下よせ(小さい かなは 下に つく)。横は すこし 左(前の 字に よせる)
    out.paste(sm, (X0 + (w - nw) // 2 - 1, Y0 + bottom - round(bottom * scale)), sm)
    return out


if __name__ == "__main__":
    hero_in, sq_in, hero_out, sq_out = sys.argv[1:5]
    im = small_i(Image.open(hero_in), 40, 177, 53, 196)   # トップの 絵(1536×1024)
    im.save(hero_out)
    im2 = small_i(Image.open(sq_in), 36, 230, 47, 248)    # 四角い 絵(1254×1254)
    im2.save(sq_out)
    print(hero_out, im.size, "/", sq_out, im2.size)
