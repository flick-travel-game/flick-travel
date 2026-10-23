#!/usr/bin/env python3
"""フリックメンタリスト: けいくんの トップの 絵(2回目・2026-10-23)の 小さい 字の くずれを 絵の 中で 直す
    python3 tools/mentalist/fix_text.py tools/mentalist/art/hero-src.png mentalist/hero.webp
  札の ことばは ゲームと 合っていた(2回目)。くずれて いたのは 小さい 字だけ:
  ・まん中の ことわり書き(2行)・本の 2行・ことばの いみの 説明と やってみよう・レベル3の 説明・とらんぶ → とらんぷ
  行を 地の 色で 消して Noto Sans CJK JP Bold で 書きなおす(字の 色は もとの 字の 色)
⚠️ 位置は この 絵の ための 数字。絵を 差しかえたら 使えない(まず 字を 切り出して 読む)
"""
import sys
import numpy as np
import cv2  # pip install opencv-python-headless
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
assert a.shape[:2] == (1024, 1536)
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
S = 8


def erase(box):
    """箱の 中の 字(まわりより 暗い 点)だけを ぬきとって、まわりの 色で うめる(cv2.inpaint。紙の むらや 帯の ぐあいを 残す)"""
    global a
    x0, y0, x1, y1 = box
    r = a[y0:y1, x0:x1]
    L = r.mean(axis=2)
    ink = L < np.percentile(L, 75) - 45
    col = np.percentile(r[ink], 12, axis=0) if ink.any() else np.array([40, 40, 80.])   # 字の いちばん こい 色
    m = np.zeros(a.shape[:2], np.uint8); m[y0:y1, x0:x1][ink] = 255
    m = cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=2)
    img = cv2.inpaint(a.clip(0, 255).astype(np.uint8), m, 5, cv2.INPAINT_TELEA)
    a = img.astype(float)
    return col


def write(x, y, h, txt, col, align="left", maxw=None):
    F = ImageFont.truetype(FONT, 40 * S, index=0)
    ref = F.getbbox("あ"); unit = ref[3] - ref[1]
    tmp = Image.new("L", (40 * S * (len(txt) + 2), 40 * S * 3), 0)
    ImageDraw.Draw(tmp).text((20 * S, 40 * S), txt, font=F, fill=255)
    bb = tmp.getbbox(); top = 40 * S + ref[1]
    g = tmp.crop((bb[0], top - 6 * S, bb[2], top + unit + 6 * S))
    k = h / unit
    w = round(g.width * k); hh = round(g.height * k)
    if maxw and w > maxw:
        w = maxw
    g = g.resize((w, hh), Image.LANCZOS)
    gx = x if align == "left" else x - w // 2
    gy = y - round(6 * S * k)
    al = np.array(g).astype(float)[..., None] / 255
    a[gy:gy + hh, gx:gx + w] = a[gy:gy + hh, gx:gx + w] * (1 - al) + col * al


# まん中の ことわり書き(白い 帯)
c = erase((560, 716, 990, 748))
write(775, 719, 12, "メンタリズムは しんりがくと かんさつを つかった げいです。", c, "center", 420)
write(775, 735, 12, "ほんとうに こころを よむ わけでは ありません。", c, "center", 420)
# 本の 2行
c = erase((595, 754, 930, 788))
write(762, 757, 12, "ことば・しんり・かんさつ・えんしゅつ", c, "center")
write(762, 774, 12, "= もっと たのしく つながる!", c, "center")
# ことばの いみ
c = erase((452, 878, 724, 919)); erase((724, 898, 792, 918)); erase((452, 919, 540, 937))
write(456, 883, 12, "おきゃくさんの ちゅういを、", c)
write(456, 902, 12, "みて ほしい ところへ むける わざ。", c)
# やってみよう
c = erase((503, 959, 722, 997)); erase((560, 951, 722, 959))
write(506, 958, 11, "やってもいい? と きいてから、", c)
write(506, 975, 11, "ゆびさして めの うごきを みてみよう。", c)
# レベル3
c = erase((1328, 948, 1508, 982))
write(1331, 951, 12, "ふかい ことばで", c)
write(1331, 970, 10, "せかいの トップを めざせる!", c)
# とらんぶ → とらんぷ(札)
c = erase((966, 150, 1070, 167))
write(1018, 152, 13, "とらんぷのあんき", c, "center", 102)
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(out, quality=88)
print("直した:", out)
