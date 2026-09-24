# 世界フリック旅行

フリック入力のタイピングゲーム。**世界の旅**(名所 250か所・25レベル)・**日本の旅**(名所 100か所・10レベル)・**世界の地名**(国と町 100か所)・**日本の地名**(都道府県と町 100か所)の 4つ + 世界・日本の一周マップ。

- 2026-09 に 名所だけにした。名言(`QUOTES`)の しくみは `index.html` に 残して、画面に 出していない
- 2026-09-24 に 100か所 → 350か所(世界250・日本100)にして、**世界の旅 / 日本の旅** に分けた(けいくん「もっともっと 世界中の素晴らしい場所を」)。
  はじめの100か所は `index.html` の `SPOTS` に 直接、足した250か所は **`tools/spots-japan.tsv` / `tools/spots-world.tsv`**
  (キー・名前・場所・よみ・Commons の検索語・解説・緯度・経度)に書いて `python3 tools/add_spots.py` で `index.html` に流しこむ(SPOTS-MORE の印のあいだ)。
  **名所を足す・直すときは TSV を直して add_spots.py → fetch_photos.py(写真)→ make_ruby.py(ふりがな)の順**。
  日本かどうかは 場所が「日本」ではじまるかで分ける(`isJapan`)
- **日本一周マップ**(`japan-map-mono.jpg`)は Natural Earth 1:10m の land(パブリックドメイン)から `tools/make_japan_map.py` で作る
  (世界地図と同じ ペン画風。フィルターは `tools/map-defs.svgfrag`)。本土は 東経128.5〜146.5 / 北緯29.8〜46、南西諸島(沖縄・八重山)は 左上の わく。
  ピンの位置は `index.html` の `JAPAN_MAP` / `japanPos` が 同じ数字で計算する。**地図の切りかたを変えたら 両方 直す**。
  作りかた: `ne_10m_land.zip` をほどく → `python3 tools/make_japan_map.py ne_10m_land.shp japan.svg` → ブラウザで 3240px幅に描いて 1080px に縮める
- **世界一周マップ**: クリアしたレベルの名所に ピンが立つ。地図は **`world-map-color.jpg`**(2026-09-24 けいくん「世界フリック旅行みたいな カラフルで綺麗な画像にしたい」→
  `tools/make_color_map.py` で 同じ地図データを 描いた。同日「やっぱり絵は無い方がいい / 地図をボタンと同じカラーを使って キラキラ地図にしたい」→
  **ボタンと同じ色(`TONE` / `COLORS.level` の 9色)で 国を ぬり、海は 世界の旅のボタンの青、ボタンと同じ feTurbulence の キラキラ**を 重ねる。
  かざり(雲・気球など)は 無し。→ 同日「もっと 画像みたいに さわやかな青ベースで カラフルに / 日本も都道府県に線を入れて」で
  **海は うすい空色、国・都道府県は トップの絵の字と同じ あかるいキャンディ9色、白いふち**に。日本は Natural Earth 10m の admin-1(都道府県 47)を 1つずつ ぬる(`japan-map-color.jpg`)。
  となりの国は うすい水色)。
  ⚠️ AI に地図を描かせない(場所が ずれて ピンが合わなくなる)。**切りかたは モノクロ版と同じ**なので ピンの計算は そのまま。
  モノクロ版(`world-map-mono.jpg` / `japan-map-mono.jpg`)は 使っていないが、作りかたの記録として 下に残す。もとの地図は `world-map-mono.jpg`
  (Wikimedia Commons の BlankMap-Equirectangular.svg。CC0。Natural Earth のデータ)を 北緯84度〜南緯60度で 切り、
  SVG のフィルター(紙のきめ・ペンの斜線・ゆらぐ黒い海岸線・海岸にそった波紋の線)で モノクロのペン画風にして 3倍で描いてから 縮めたもの。
  海の名前と方位は HTML の字(手書き風の書体 Yomogi)。
  ピンの位置は `LATLON`(緯度・経度)から 計算する
- 名所の ピン(行った所)と 結果の解説カードに「Googleマップで見る」(登録のいらない ふつうのリンク)

- **レベルは 打つ文字の多さで決まる**(`index.html` の `cost`)。濁点・小さい字・のばす棒は フリックで1回よけいに押すので 少し重く数える。
  かんたんな順にならべて 10問ずつ区切るので、どのレベルも いつも同じ10問・同じ順番(タイムをくらべられる)
- 自己ベストは レベルごと(ブラウザの localStorage `flick-best-<world|japan>-<レベル>`)。えらんだ旅は `flick-mode`
- 名所の解説には ふりがな(`tools/make_ruby.py` が Sudachi で読みを出して `index.html` の `RUBY` に書く。
  解説の文を変えたら もう一度 走らせる。読みのまちがいは 台本の `FIX` / `SPOT_FIX` で直す)

- **ロゴと トップの絵**(2026-09-24。speed-king の `docs/ロゴの文字.md` の とおり): けいくんが ChatGPT で作った `hero.webp`(1536×1024)の中の
  題名を `tools/logo-word-cut.py` で 切りぬいた `logo-word.webp`(1170×209。**もとの大きさのまま**しまう)+ 絵の地球儀を切った `logo-mark.webp`(144×144)。
  画面では どちらも **44px**。⚠️ **CSS・フォントで 似せない**。絵を変えたら 道具を走らせなおす(`FRAC` と `parts[:7]` = 7文字)。
  名前は `<h1 class="sr-only">` でも 置いてある(読みあげ・検索のため)

- **地名バージョン**(2026-09-24 けいくん「地名バージョンも 世界と日本の作成してください」): `tools/names-world.tsv` / `names-japan.tsv`。
  5列目は 写真の検索語ではなく **絵文字**(国旗など)で、カードには 写真のかわりに 絵文字が出る(`pic()` の `q.e`)。
  `add_spots.py` が `k:"name", e:"🇫🇷"` を付けて index.html に書き、`POOLS.wnames / jnames` に分かれる。地図・ピン・ふりがな・Googleマップは 名所と同じしくみ

## ファイル

| ファイル | 中身 |
|---|---|
| `index.html` | ゲーム本体(遊びかた・デザイン) |
| `hero.webp` / `logo-word.webp` / `logo-mark.webp` | トップの絵と そこから切った ロゴ(`tools/logo-word-cut.py`) |
| `world-map-color.jpg` / `japan-map-color.jpg` | いま使っている カラフルな地図(`tools/make_color_map.py`) |
| `world-map-mono.jpg` | まえの モノクロのペン画風の地図(もとは CC0)。いまは使っていない |
| `japan-map-mono.jpg` | 日本一周マップ(もとは Natural Earth。パブリックドメイン) |
| `tools/spots-*.tsv` | 足した名所の一覧(ここを直す)。`tools/add_spots.py` で index.html に流しこむ |
| `tools/make_japan_map.py` | 日本一周マップを作る台本 |
| `photos.js` | 名所の写真の一覧(撮影者・ライセンス・元のページ) |
| `photo-*.jpg` | 名所の写真(幅800pxに縮小ずみ。iPhone からでも上げやすいよう フォルダに入れない) |
| `tools/fetch_photos.py` | 写真を Wikimedia Commons から取ってくる台本 |
| `.nojekyll` | GitHub Pages に「そのまま出して」と伝える空のファイル |

写真が無い場所は、いままでどおりイラストが出る。

## 写真のきまり

- 使うのは **パブリックドメイン(CC0 をふくむ)/ CC BY / CC BY-SA** だけ。
  `tools/fetch_photos.py` が Commons の API でライセンスを確かめて、ほかは とばす
- 結果画面の紹介カードに「写真：撮影者（ライセンス名）／Wikimedia Commons」を出す。
  撮影者名は元のページへ、ライセンス名はライセンスの本文へのリンク
- エッフェル塔は **昼の写真だけ**(夜のライトアップには著作権がある)
- ⚠️ Commons の API が「Public domain」と返しても、ページに `{{Licensed-PD}}` とあれば
  **写っている物(塔・像)がパブリックドメインなだけで、写真は別のライセンス**。
  台本はこれを見て 写真のライセンス(エッフェル塔・自由の女神は CC BY-SA 3.0)を書く
- Commons の写真は **決まった大きさ(960px など)の縮小版しか取れない**(https://w.wiki/GHai)。
  台本は 幅が960pxより大きい写真だけを選ぶ

写真を入れなおすとき(flick-travel/ で):

```
pip install Pillow
python3 tools/fetch_photos.py            # 100か所ぜんぶ(時間がかかる)
python3 tools/fetch_photos.py fuji petra # 一部だけ
```

## GitHub Pages で公開する手順

GitHub Pages は リポジトリの「いちばん上」か「docs フォルダ」しか公開できない。
なので **このゲーム用の新しいリポジトリ**を作って、このフォルダの中身をそこに置く。

1. https://github.com/new をひらく
2. Repository name に `flick-travel`、**Public** をえらんで「Create repository」
3. できたページの「uploading an existing file」を押す
4. このフォルダの中身(`index.html`・`photos.js`・`*-map-mono.jpg`・`photo-*.jpg`・`.nojekyll`)を
   まとめてドラッグして、いちばん下の「Commit changes」。⚠️ **1回に上げられるのは 100ファイルまで**。写真は 100枚ずつに分けて 何回かに
5. リポジトリの **Settings → Pages** をひらく
6. 「Build and deployment」の Source を **Deploy from a branch**、
   Branch を **main** と **/ (root)** にして「Save」
7. 1〜2分まつと、同じ画面の上に URL が出る
   → `https://<GitHubのユーザー名>.github.io/flick-travel/`

写真を差しかえたら、同じリポジトリに もう一度アップロードするだけで 数分で反映される。
