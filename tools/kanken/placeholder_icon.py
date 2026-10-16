#!/usr/bin/env python3
"""仮の アイコン(けいくんの 絵が 届くまで)。KanjiVG の「字」の 線を 太く 描いた もの。絵が 届いたら tools/icon_from_square.py kanken で 上書きする"""
from pathlib import Path
from PIL import Image, ImageDraw
from strokes import kvg_dir, strokes_of, flatten
ROOT = Path(__file__).resolve().parent.parent.parent
def make(size):
    sc = 4; S = size * sc
    im = Image.new("RGB", (S, S), "#fff5f5"); d = ImageDraw.Draw(im)
    d.rounded_rectangle([S * .06, S * .06, S * .94, S * .94], radius=S * .14, fill="#c92a2a")
    for path, _ in strokes_of("字", kvg_dir()):
        pts = [(S * .17 + x / 109 * S * .66, S * .17 + y / 109 * S * .66) for x, y in flatten(path)]
        w = int(S * .062); d.line(pts, fill="#ffffff", width=w, joint="curve")
        for p in (pts[0], pts[-1]): d.ellipse([p[0] - w / 2, p[1] - w / 2, p[0] + w / 2, p[1] + w / 2], fill="#ffffff")
    return im.resize((size, size), Image.LANCZOS)
make(180).save(ROOT / "kanken/apple-touch-icon.png"); make(512).save(ROOT / "kanken/icon-512.png"); make(64).save(ROOT / "kanken/favicon.png")
print("ok")
