#!/usr/bin/env python3
"""フリックアドラー心理学: けいくんの ChatGPT の 絵(2026-10-02・2回目)から トップの 絵と アイコンを 作る
    python3 tools/adler/fix_text.py tools/adler/art/hero-src.png tools/adler/art/hero-fixed.png   # まず 字の まちがいを 直す
    python3 tools/adler/art_in.py
  → adler/hero.webp(1536×1024)/ icon-512.png / apple-touch-icon.png(180)/ favicon.png(64)/ logo-mark2.webp(144)
  アイコンは 四角い 絵(1254px)の まん中(ふたりと 犬)だけ(SQ_IN_BOX)。四角い 絵は まわりが 札で いっぱい なので まるごと 縮めると 字の かたまりに なる(税理士と 同じ)。
  ⚠️ 四角い 絵の 右下に「レベルで 試験の 練習も できる!」と ある(アドラーには 試験が 無い)が、切る ところの 外なので 画面には 出ない
  ⚠️ 題名(logo-word.webp)は ここでは 作らない。けいくんが ChatGPT で 切りぬいた 透明 PNG を tools/adler/art/title-src.png に 置いて python3 tools/title_from_art.py adler(2026-10-02 の 決めごと)"""
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parent.parent.parent; ART = ROOT / "tools/adler/art"; OUT = ROOT / "adler"
SQ_IN_BOX = (414, 446, 834, 866)  # 四角い 絵の まん中: 左右・上の 札と 下の 題名の あいだの ふたりと 犬
hero = Image.open(ART / "hero-fixed.png").convert("RGB"); assert hero.size == (1536, 1024)
hero.save(OUT / "hero.webp", "WEBP", quality=88, method=6); print("adler/hero.webp")
sq = Image.open(ART / "square-src.png").convert("RGB"); assert sq.size == (1254, 1254)
sq = sq.crop(SQ_IN_BOX); assert sq.size[0] == sq.size[1]
sq.resize((512, 512), Image.LANCZOS).save(OUT / "icon-512.png")
sq.resize((180, 180), Image.LANCZOS).save(OUT / "apple-touch-icon.png")
sq.resize((64, 64), Image.LANCZOS).save(OUT / "favicon.png")
sq.resize((144, 144), Image.LANCZOS).save(OUT / "logo-mark2.webp", "WEBP", quality=92, method=6)
print("アイコン: icon-512 / apple-touch-icon / favicon / logo-mark2")
