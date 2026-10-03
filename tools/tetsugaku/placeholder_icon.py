#!/usr/bin/env python3
"""フリック哲学の 仮の アイコン(けいくんの ChatGPT の 絵が 届くまで)。紫から 夜空の 紺の 地に、白い 考える ふきだしと 大きな「?」。コードで 描く(AI の 絵に しない)
    python3 tools/tetsugaku/placeholder_icon.py  → tetsugaku/apple-touch-icon.png(180)・icon-512.png・favicon.png(64)・logo-mark2.webp(144)
    もとは tools/yakuzai/placeholder_icon.py。四角い 絵が 届いたら tools/icon_from_square.py tetsugaku に 置きかえる"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parent.parent.parent
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def draw(n):
    S = n * 4; im = Image.new("RGB", (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):  # 上 → 下の 紫 → 紺の グラデーション
        t = y / S; d.line([(0, y), (S, y)], fill=(int(110 - 70 * t), int(70 - 40 * t), int(200 - 90 * t)))
    for (x, y, r) in [(.16, .18, .012), (.82, .14, .009), (.88, .40, .007), (.12, .62, .008)]:  # 星
        d.ellipse([S * (x - r), S * (y - r), S * (x + r), S * (y + r)], fill=(255, 236, 160))
    d.ellipse([S * .17, S * .14, S * .83, S * .70], fill=(255, 255, 255))  # 考える ふきだし
    d.ellipse([S * .24, S * .72, S * .34, S * .82], fill=(255, 255, 255)); d.ellipse([S * .15, S * .84, S * .21, S * .90], fill=(255, 255, 255))
    f = ImageFont.truetype(FONT, int(S * .44))
    d.text((S * .50, S * .43), "?", font=f, fill=(95, 61, 196), anchor="mm")
    return im.resize((n, n), Image.LANCZOS)
(ROOT / "tetsugaku").mkdir(exist_ok=True)
draw(180).save(ROOT / "tetsugaku/apple-touch-icon.png"); draw(512).save(ROOT / "tetsugaku/icon-512.png"); draw(64).save(ROOT / "tetsugaku/favicon.png")
draw(144).save(ROOT / "tetsugaku/logo-mark2.webp", "WEBP", quality=92, method=6)
print("仮の アイコン OK")
