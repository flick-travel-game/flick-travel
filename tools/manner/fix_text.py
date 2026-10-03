#!/usr/bin/env python3
"""フリックマナー: けいくんの トップの 絵(2026-10-03)の 右下「ステップアップで マナーの たつじんに!」の 字の まちがいを 絵の 中で 直す
    python3 tools/manner/fix_text.py tools/manner/art/hero-src.png manner/hero.webp
  ・あいさつや あらかは → あいさつや しぐさの
  ・しゃかいで 字る → しゃかいに でる
  ・せかいの中の → せんもんかの
  ・ひしその マナーや → ひしょの マナーや / アロトコールも → プロトコールも
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
⚠️ 書体は apt-get install fonts-noto-cjk
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
assert a.shape[:2] == (1024, 1536), "トップの 絵は 1536×1024 で"
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
S = 8


def put(box, txt):
    bx0, by0, bx1, by1 = box
    r = a[by0:by1, bx0:bx1]
    bg = np.median(np.concatenate([a[by0 - 2, bx0:bx1], a[by1 + 2, bx0:bx1]]), axis=0)
    m = np.sqrt(((r - bg) ** 2).sum(axis=2)) > 110          # 地の 色から 遠い = 字
    ys, xs = np.nonzero(m)
    x0, y0, x1, y1 = bx0 + xs.min(), by0 + ys.min(), bx0 + xs.max(), by0 + ys.max()
    px = r[m]; px = px[px.sum(axis=1).argsort()][: max(1, len(px) // 4)]
    col = px.mean(axis=0)                                   # 字の こい ところの 色
    for y in range(y0 - 2, y1 + 3):                         # 行ごとに 左右の 地の 色を つないで 消す
        L, R = a[y, x0 - 4], a[y, x1 + 4]
        t = np.linspace(0, 1, x1 - x0 + 5)[:, None]
        a[y, x0 - 2:x1 + 3] = L * (1 - t) + R * t
    h = y1 - y0 + 1
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0)
    ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255, stroke_width=S, stroke_fill=255)  # 絵の 字に 合わせて 太く
    g = tmp.crop(tmp.getbbox())
    w = min(round(g.width * h / g.height), x1 - x0 + 1)
    g = g.resize((w, h), Image.LANCZOS)
    gx = (x0 + x1) // 2 - w // 2
    al = np.array(g).astype(float)[..., None] / 255
    a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + col * al
    print(txt, (x0, y0, x1, y1))


put((1055, 956, 1180, 970), "あいさつや しぐさの")
put((1238, 849, 1332, 861), "しゃかいに でる")
put((1388, 849, 1468, 861), "せんもんかの")
put((1380, 943, 1490, 957), "ひしょの マナーや")
put((1365, 959, 1505, 973), "プロトコールも まなべる")
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out, quality=88)
print("直した:", out)
