# フリック獣医師の トップの 絵(けいくんの ChatGPT の 絵 2回目)を 絵の 中で 直す。もとは tools/kyukyutai/fix_text.py
#   ① 4択の 問い「ぴょうきの よぼうに …」の ぴ → び
#   ② 説明の 箱の ふだ「話題の 科目」→「試験の 科目」(ゲームの 見出しは「📘 試験の 科目」)
#   ③ しゅじゅつ の 札の 絵が 手術を している 人だった → 1回目の 絵の 手術灯だけの 絵に 入れかえる(手術の ようすを 描かない 決めごと)
# つかいかた: python3 tools/jui/fix_text.py <2回目の絵.png> <1回目の絵.png> <出力.png>
#   ⚠️ 絵を 差しかえたら 座標は 測りなおす(scratchpad で 5倍に して 方眼を 引いて 見た)
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np
im = Image.open(sys.argv[1]).convert('RGB'); old = Image.open(sys.argv[2]).convert('RGB')
A = np.array(im).astype(float)
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'


def erase_rows(x0, x1, y0, y1):  # 行ごとに 左右の 色を つないで 消す(グラデーションの 地でも 段が 出ない)
    for y in range(y0, y1 + 1):
        L = A[y, x0 - 3:x0].mean(0); R = A[y, x1 + 1:x1 + 4].mean(0)
        for x in range(x0, x1 + 1):
            t = (x - x0) / max(1, x1 - x0); A[y, x] = L * (1 - t) + R * t


def text(s, x0, top, h, color, gamma=0.75):
    global A
    size = h
    while True:
        f = ImageFont.truetype(F, size, index=0); b = f.getbbox(s)
        if b[3] - b[1] >= h or size > 80: break
        size += 1
    layer = Image.new('L', im.size, 0); d = ImageDraw.Draw(layer)
    d.text((x0 - b[0], top - b[1]), s, font=f, fill=255)
    m = np.clip((np.array(layer).astype(float) / 255) ** gamma, 0, 1)[..., None]
    A = A * (1 - m) + np.array(color, float) * m


# ① ぴ → び(紺の 字。白い 地)
A[857:883, 94:114] = 255
text("び", 96, 860, 19, (8, 10, 90), 0.6)
# ② 話題 → 試験(白い 字。青い グラデーションの 地)
erase_rows(604, 634, 955, 974)
text('試験', 605, 957, 15, (255, 255, 255), 0.6)
# ③ しゅじゅつ の 札の 絵: 白で うめて、1回目の 絵の 手術灯を 置く
A[167:234, 1380:1513] = 255
out = Image.fromarray(np.clip(A, 0, 255).astype('uint8'))
out.paste(old.crop((1392, 167, 1508, 233)), (1392, 167))
out.save(sys.argv[3])
print('OK', sys.argv[3])
