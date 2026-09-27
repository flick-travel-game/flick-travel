# フリック旅行シリーズ(この入れものが 正本)

## ⚠️ いちばん大事(けいくん 2026-09-26「すべてのセッションに伝えてください」)

1. **フリック旅行の 正本は この入れもの `flick-travel-game/flick-travel`**。
   世界・歴史 `rekishi/`・宇宙 `uchu/`・からだ `karada/`(ツボ ふくむ)・株式 `kabu/`・AI `ai/`・理科・英会話・整備 … ぜんぶ ここにある。
   `sanctuary-chiba/prepro-saas` の `flick-travel/` は **古い**(2026-09-26 の 株式より前で 止まっている)。
   **そこから ファイルを 写さない・そこで 作業しない**(新しいゲームを 消してしまう)
2. **いくつもの セッションが 同時に この入れものを 直している**。作業の前に かならず `git pull`。
   `index.html`(エンジン)は みんなが さわるので **直すのは 必要な行だけ**。PR か 小さな コミットで 取りこむ。
   `tools/build_games.py` を 走らせると ほかの ゲームの `*/index.html` も 作りなおされる(それで よい。エンジンが 1つだから)
3. **新しい旅を 足したら** `sanctuary-chiba/speed-king` の `src/lib/flick.ts` の **`FLICK_MODES`** に 足す
   (わすれると 記録が「旅の しゅるいが おかしいです」で ことわられる。2026-09-26 に 宇宙・からだで 1回 あった)。
   `/flick-link?to=` で 行ける ゲームは `FLICK_LINK_TARGETS`。
   規約・特商法などの 文(`src/lib/flick-url.ts` の `FLICK_SERIES_GAMES`)を 変えるのは **お金・規約の 変更なので けいくんの OK を もらってから**
4. 本番は GitHub Pages(`https://flick-travel-game.github.io/flick-travel/`)。main に 入ると 1〜2分で 出る。
   コミットの 名前は `flick-travel-game <flick-travel-game@users.noreply.github.com>`
   ⚠️ PR を 取りこむときは **rebase**(`merge_method: "rebase"`)。**squash だと 取りこんだ コミットの 名前が けいくんの アカウントに 変わる**(2026-09-26 整備 #20 で 起きた)

## きまり(シリーズ 共通)

- サンクチュアリ千葉の 名前を ゲーム・入れものに 出さない
- 地図・図は AI の 絵に しない(コードで 描く / けいくんの 絵に 📍を 立てる)。ロゴ・題名を CSS やフォントで 似せない
- 秘密の 鍵を ゲームの 中に 書かない。書きこみは かずともの サーバーだけ。広告・チャットは 作らない
- **どの旅も 言葉の 数は 10の倍数**(あまりは 最後の レベルに 前の レベルから もう一度 出して 10問に する しくみが `LEVELS` に 入っている)
- 写真は Wikimedia Commons の PD / CC0 / CC BY / CC BY-SA だけ。1枚ずつ 目で 確かめる。手を 加えたら 作者名に「(文字を消して使用)」など
- けいくんへの 説明は やさしい 日本語。リンクは 1行に そのまま 置く。コミットに モデルの 名前を 書かない

## ツボ(からだフリック旅行の 4つめの 旅 `ktsubo`。2026-09-26)

- WHO 標準 361か所。データと 📍は `tools/tsubo.tsv`(図の 列は `tfront` / `tback` / `thead`)。`tools/add_spots.py` が `("tsubo", "body")` で 読む
- 図は けいくんの 絵 `karada/tsubo-front.webp` / `tsubo-back.webp` / `tsubo-head.webp`。絵を 差しかえたら x,y を 測りなおす
- 解説は「昔から〜によいと言われる」の 形。**効くと 言いきらない**

## 名前と ホームは かずとも に 1つ(けいくん決定 2026-09-26)

- ⚠️ **名前は けいくんの 絵の 題名に そろえる**(けいくん決定 2026-09-27「これからすべて画像の名前にします」。2026-09-26 の 名前の 表を 差しかえ)。
  いま: フリック世界旅行・フリック歴史旅行・フリック宇宙旅行・フリックからだ旅行・フリック株式旅行・フリックAI旅行(絵が 届いた もの)。のこり 3つ(理科・英会話・整備)は **絵が 届いたら その 題名に**。それまでは 2026-09-26 の 名前のまま。
  絵が 届いたら 題名を 切り出して 読み、`build_games.py` の `GAMES`・`index.html` の `SERIES`・speed-king の `src/lib/games.ts` と `flick-url.ts` の `FLICK_SERIES_GAMES` を そろえる。**住所(フォルダ名)は 変えない**
- 名前は `tools/build_games.py` の `GAMES` と `index.html`(世界)の `<title>`・`GAME`・`SERIES`。ホーム画面の 名前(manifest)は 名前 そのまま(「ゲーム」を 付けない)
- 料金・申し込みの 案内は **https://kazutomo.app/games に 1つだけ**(`.about-link`)。`about.html` は そこへ 移すだけの ページ(けいくん決定「1」)。ここに 案内を 書きもどさない
- 絵: 世界(2026-09-26)・歴史(2026-09-27。題名は `tools/rekishi/logo_cut.py`)は 入れた。宇宙(2026-09-27。題名は `tools/uchu/logo_cut.py` = GrabCut)・からだ(2026-09-27。`tools/karada/logo_cut.py`。横長は 1774×887 で 届いたので 1536×768 に 縮めた)・株式(2026-09-27。`tools/kabu/logo_cut.py`)・AI(2026-09-27。`tools/ai/logo_cut.py`)も 入れた。
- 旅の ボタンの 色: 宇宙・歴史・からだは 世界と 同じ あかるい `TONE` に した(けいくん 2026-09-27「もっと明るい色に」→「1」)。新しい 旅も あかるい 色で
  差しかえたら `art` の `iconv`(アイコン)と `wordv`(題名・トップの 絵)を 上げる(古い 絵を おぼえている 端末のため)
- ⚠️ 「100マス計算」「百ます計算」の 字を 使わない
