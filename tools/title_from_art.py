#!/usr/bin/env python3
"""題名の 絵(logo-word.webp)を、ChatGPT が 切りぬいた 透明 PNG(tools/<game>/art/title-src.png)から 作る(2026-10-02)。
   トップの 絵から 自分で 切ると 字が 欠けるので、けいくんが ChatGPT に 題名だけを 切りぬいてもらう 形に した。
    python3 tools/title_from_art.py <game>…      (flick-travel の 中で)
   やること: 透明な ところを 落として 字だけに 切り、はば 900 に 縮めて <game>/logo-word.webp に。
   ⚠️ そのあと tools/build_games.py の art.word(大きさ)と wordv(+1)、speed-king の src/lib/games.ts の word を そろえて、build_games.py を 走らせる
   ⚠️ 届いた PNG は 先に 見る: 地が 本当に 透明か / 字が 画像の はしに 当たっていないか / 字の 形が もとの 絵と 同じか"""
import sys
from PIL import Image
for g in sys.argv[1:]:
    im = Image.open(f'tools/{g}/art/title-src.png').convert('RGBA')
    a = im.split()[3].point(lambda v: 255 if v > 8 else 0)      # うすい 光は 切る 範囲に 入れない
    im = im.crop(a.getbbox()); r = 900 / im.width
    im = im.resize((900, round(im.height * r)), Image.LANCZOS)
    im.save(f'{g}/logo-word.webp', 'WEBP', quality=95, method=6); print(g, im.size)
