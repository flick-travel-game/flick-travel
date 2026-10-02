#!/usr/bin/env python3
"""四角い 絵(けいくんの ChatGPT の 絵。1254px)を 切らずに そのまま アイコンに する(2026-10-02。けいくん「正方形の画像は切り取らずにそのままアイコンにしてください」)
    python3 tools/icon_from_square.py <game>…     (flick-travel の 中で。tools/<game>/art/square-src.png を 読む)
  → <game>/icon-512.png / apple-touch-icon.png(180) / favicon.png(64) / logo-mark2.webp(144)
  ⚠️ そのあと tools/build_games.py の その ゲームの iconv を +1、speed-king の games.ts の icon の ?v= も そろえる"""
import sys
from PIL import Image
for g in sys.argv[1:]:
    sq = Image.open(f'tools/{g}/art/square-src.png').convert('RGB'); assert sq.size[0] == sq.size[1], '正方形で'
    sq.resize((512, 512), Image.LANCZOS).save(f'{g}/icon-512.png')
    sq.resize((180, 180), Image.LANCZOS).save(f'{g}/apple-touch-icon.png')
    sq.resize((64, 64), Image.LANCZOS).save(f'{g}/favicon.png')
    sq.resize((144, 144), Image.LANCZOS).save(f'{g}/logo-mark2.webp', 'WEBP', quality=92, method=6)
    print(g, 'icon-512 / apple-touch-icon / favicon / logo-mark2 (切らずに そのまま)')
