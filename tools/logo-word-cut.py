# トップの 絵から 題名「世界フリック旅行」を 切りぬく。
# ⚠️ かならず **画面に 出ている 絵**（`public/hero.webp` の もと）から 切る。
#   けいくん 2026-09-22「文字の中にあるキラキラが 再現されていないよ」
#   → 前は **べつの 絵（四角いほう）**から 切っていた。あちらは
#     つるっと していて **キラキラが 入っていない**。
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1]
OUT = sys.argv[2]
# 題名の まわり（ひろめに）。⚠️ **絵の はばに対する わりあい**で 書く。
#   そうすると `public/hero.webp`（1400×933）からでも、
#   もとの PNG（1536×1024）からでも 同じ ところが 切れる。
FRAC = (0.10, 0.02, 0.92, 0.28)  # 世界フリック旅行(1536x1024 の絵)

src = Image.open(SRC).convert("RGB")
W0, H0 = src.size
BOX = (round(FRAC[0]*W0), round(FRAC[1]*H0), round(FRAC[2]*W0), round(FRAC[3]*H0))
crop = src.crop(BOX)
a = np.asarray(crop).astype(np.float32) / 255.0
mx = a.max(2); mn = a.min(2)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)

# ① こい 色の ところ = 字の 本体
m = (sat > 0.38) & (mx > 0.35)
m = ndimage.binary_closing(m, structure=np.ones((5, 5)))
m = ndimage.binary_fill_holes(m)
m = ndimage.binary_opening(m, structure=np.ones((3, 3)))
lab, _ = ndimage.label(m)
H, W = m.shape
parts = []
for i, sl in enumerate(ndimage.find_objects(lab), start=1):
    y0, y1 = sl[0].start, sl[0].stop
    x0, x1 = sl[1].start, sl[1].stop
    if x0 <= 3 or y0 <= 3 or x1 >= W - 3 or y1 >= H - 3:
        continue                      # はしに ついている = 空・お城・まわりの 字
    parts.append((int((lab[sl] == i).sum()), i, x0, x1, y0, y1))
parts.sort(reverse=True)

# ② いちばん 大きい 4つ = か ず と も。その ならびが 「字の 帯」
big = parts[:7]  # 世 界 フ リ ッ ク 旅 行 = 7文字
bx0 = min(p[2] for p in big); bx1 = max(p[3] for p in big)
by0 = min(p[4] for p in big); by1 = max(p[5] for p in big)
# ⚠️ 星（⭐）は 帯の **右うえ**に はみ出すので、そこだけ ひろげる
L, R, T, B = bx0 - 12, bx1 + 45, by0 - 45, by1 + 12

keep = np.zeros_like(m)
for size, i, x0, x1, y0, y1 in parts:
    if size >= 1200 and x0 >= L and x1 <= R and y0 >= T and y1 <= B:
        keep |= (lab == i)
        print(f"のこす size={size:6} x={x0}-{x1} y={y0}-{y1}")
    elif size >= 1200:
        print(f"すてる size={size:6} x={x0}-{x1} y={y0}-{y1}（帯の そと）")

# ③ ⚠️ **にこにこ顔**（と の 中の 目2つと 口）。
#   ⚠️ 顔は **字より ずっと 小さい**ので ②の「1200点 以上」で 落ちる。
#     → **字の はこの 中に ある 小さい かたまり**を ひろって 足す。
#   ⚠️ 絵に よって 顔の 色は ちがう（こい 紺の ことも、と と 同じ 水色の ことも
#     ある）。だから **色では しぼらない**。「字の はこの 中・小さい」だけで 見る。
#   ⚠️ ここを 外すと 顔が 消える（けいくん「にこにこ顔も 完全再現して」）。
face = np.zeros_like(keep)
boxes = [(p[2], p[3], p[4], p[5]) for p in big]
for i, sl in enumerate(ndimage.find_objects(lab), start=1):
    y0, y1 = sl[0].start, sl[0].stop
    x0, x1 = sl[1].start, sl[1].stop
    size = int((lab[sl] == i).sum())
    if not (50 <= size < 1200):
        continue
    # ⚠️ 世界フリック旅行の 絵では 字の 上に 小さな 青い しずくが 落ちていたので、帯の 上のはし(15%)は 顔と 見なさない
    if y0 < by0 + (by1 - by0) * 0.15:
        continue
    if any(bx0 <= x0 and x1 <= bx1 and by0 <= y0 and y1 <= by1
           for bx0, bx1, by0, by1 in boxes):
        face |= (lab == i)
        print(f"  顔の ぶひん size={size} x={x0}-{x1} y={y0}-{y1}")
print("にこにこ顔の 点 =", int(face.sum()))

core = keep | face
alpha = Image.fromarray((core * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
out = crop.convert("RGBA"); out.putalpha(alpha)
ys, xs = np.nonzero(core); pad = 4
out = out.crop((xs.min() - pad, ys.min() - pad, xs.max() + 1 + pad, ys.max() + 1 + pad))
# ⚠️ **もとの 大きさの まま**。小さくすると ズームで キラキラが 消える
out.save(OUT, "WEBP", quality=95, method=6)
import os
print(OUT, out.size, os.path.getsize(OUT), "bytes", "よこ/たて", round(out.width/out.height, 4))
bg = Image.new("RGB", out.size, (255, 255, 255)); bg.paste(out, (0, 0), out)
bg.save("/tmp/claude-0/-home-user-prepro-saas/3ef0319b-bc4e-5ada-8b8d-edf08e658395/scratchpad/word-on-white.png")
