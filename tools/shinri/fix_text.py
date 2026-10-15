"""フリック心理学の トップの 絵(ChatGPT 2回目)の 小さい 字を 2か所 直す。
  ユングの 年表の 札「(せいか と こころ)」→「(せいかく と こころ)」
  レベル3の 説明「ことばを みやすう!」→「ことばを めざそう!」
使いかた: python3 tools/shinri/fix_text.py <もとの絵.png> <出す.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"


def erase(a, x0, x1, y0, y1, left_only=False):
    """行ごとに 左右の 外の 色を つないで 字を 消す(右が 木に かかる ところは 左の 色だけ)"""
    for y in range(y0, y1 + 1):
        L = a[y, x0 - 3:x0 - 1].mean(0)
        R = L if left_only else a[y, x1 + 2:x1 + 4].mean(0)
        for x in range(x0, x1 + 1):
            t = (x - x0) / max(1, x1 - x0)
            a[y, x] = L * (1 - t) + R * t


def put(img, text, x0, x1, top, h, color, center):
    """高さ h px に 合わせて 書く。はばが x1-x0 を こえたら よこを ちぢめる"""
    size = 40
    f = ImageFont.truetype(FONT, size, index=0)
    bb = f.getbbox(text)
    tile = Image.new("L", (bb[2] - bb[0] + 4, bb[3] - bb[1] + 4), 0)
    ImageDraw.Draw(tile).text((2 - bb[0], 2 - bb[1]), text, font=f, fill=255)
    k = h / tile.height
    w = int(tile.width * k)
    w = min(w, x1 - x0)
    tile = tile.resize((w, h), Image.LANCZOS)
    alpha = np.asarray(tile).astype(float) / 255
    alpha = alpha ** 0.7  # もとの 字の こさに あわせる
    x = (x0 + x1 - w) // 2 if center else x0
    a = np.asarray(img).astype(float)
    reg = a[top:top + h, x:x + w]
    a[top:top + h, x:x + w] = reg * (1 - alpha[..., None]) + np.array(color) * alpha[..., None]
    return Image.fromarray(a.clip(0, 255).astype("uint8"))


def main(src, dst):
    img = Image.open(src).convert("RGB")
    a = np.asarray(img).astype(float).copy()
    erase(a, 708, 817, 988, 1002, left_only=True)
    erase(a, 1288, 1402, 882, 899)
    img = Image.fromarray(a.clip(0, 255).astype("uint8"))
    img = put(img, "（せいかく と こころ）", 703, 822, 989, 14, (46, 49, 91), True)
    img = put(img, "ことばを めざそう！", 1291, 1400, 883, 15, (49, 53, 89), False)
    img.save(dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
