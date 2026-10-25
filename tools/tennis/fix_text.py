#!/usr/bin/env python3
"""フリックワールドテニス: けいくんの トップの 絵(2回目・2026-10-25)の 字の まちがいを 絵の 中で 直す
    python3 tools/tennis/fix_text.py <もとの絵.png> tennis/hero.webp
  ChatGPT は ゛ と ゜ の 書きわけが にがて。札の 字を 地の 色で 消して Noto Sans CJK JP Bold で 書きなおす(スマホと 同じ)
  ・ぴ・ぷ・ぽ・ぱ・ひょう の まちがい 11か所 / 4択の 問い(答えが 選択肢に 無かった)/ 説明・レベルの 文
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
# ⚠️ ゜(ぴ・ぱ)の 字は 太く しない。太くすると 小さな まるが つぶれて また ゛に 見える


def put(box, txt, hh=None, left=False):
    bx0, by0, bx1, by1 = box; r = a[by0:by1, bx0:bx1]
    m = r.max(axis=2) < 110                                 # こい 字
    ys, xs = np.nonzero(m)
    x0, y0, x1, y1 = bx0 + xs.min(), by0 + ys.min(), bx0 + xs.max(), by0 + ys.max()
    col = np.median(r[m], axis=0)
    ring = a[y0 - 5:y1 + 4, x0 - 4:x1 + 5].reshape(-1, 3)
    bg = np.median(ring[ring.min(axis=1) > 215], axis=0)   # 札の 白い 地だけ(上は 絵・下は 緑の ふちが かかるため)
    a[y0 - 5:y1 + 3, x0 - 4:x1 + 5] = bg                  # もとの 字を 地の 色で 消す(うすい ふちの 点も 残さない)
    h = hh or (y1 - y0 + 1)
    if hh: y0 = y1 + 1 - hh                                 # 下を そろえる(ほかの 行と 同じ 高さに)
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 2), 0); ImageDraw.Draw(tmp).text((20 * S, 20 * S), txt, font=F, fill=255)
    g = tmp.crop(tmp.getbbox())
    w = min(round(g.width * h / g.height), x1 - x0 + 1)    # もとの 字の はばを こえない
    g = g.resize((w, h), Image.LANCZOS)
    gx = x0 if left else (x0 + x1) // 2 - w // 2
    al = np.array(g).astype(float)[..., None] / 255
    a[y0:y0 + h, gx:gx + w] = a[y0:y0 + h, gx:gx + w] * (1 - al) + col * al
    print(txt, (x0, y0, x1, y1))


put((205, 490, 288, 512), "らんきんぐぽいんと")
put((114, 675, 196, 696), "ぜんごうおーぷん")
put((205, 675, 289, 696), "ぜんふつおーぷん")
put((1434, 163, 1518, 183), "ていらーふりっつ")
put((1339, 346, 1426, 366), "ぴーとさんぷらす")
put((1160, 520, 1236, 543), "とっぷすぴん")
put((1435, 520, 1516, 543), "すぴんさーぶ")
put((1435, 694, 1518, 716), "まっちぽいんと")
put((128, 944, 224, 969), "にほんだいひょう")
put((334, 944, 431, 969), "ぱらりんぴっく")
put((452, 952, 519, 969), "とっぷすぴん")
put((681, 952, 743, 969), "すぴんさーぶ")
put((501, 794, 708, 811), "ぼーるの したを こすりあげて、", hh=16, left=True)
put((501, 816, 744, 834), "まえに つよく まわす うちかたは?", left=True)
put((771, 900, 914, 914), "ぽいんとに なる こと。")
put((771, 926, 962, 941), "さーぶ だけで とれる てんだよ。")
put((1207, 884, 1434, 899), "ルールや わざ、せんじゅつの ことばに ちょうせん!")
put((1234, 942, 1433, 958), "せかいの てにすや たいかいの ことばを")
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out, quality=88)
print("直した:", out)
