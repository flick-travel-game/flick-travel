# supein/ の メモ(この ゲームだけの 決めごと・いきさつ)

> シリーズ共通の きまりは 入れものの いちばん上の `CLAUDE.md`。2026-11-10 に そこから 1文字も 変えずに 移した。

## フリックスペイン語(`supein/`。けいくん 2026-10-16「スペイン語のネイティブになれるレベル / フリック英会話を参考に」→ 打つ字「ひらがなで問題を出してひらがなで打つ」+「ABC に 切りかえ も 付ける」・名前と 地域「おすすめ」・旅「韓国語と同じ 9つ」・語数「はじめから英会話と同じ量」。まとめは `docs/フリックスペイン語-はじめかた.md`)

- 決めたこと: 名前「**フリックスペイン語**」(フォルダ `supein`・modes `SUPEIN`・旅の id は `es…`。⚠️ `sp…` は フリックスマホ)/ **韓国語と 同じ 型**(スピード記録勝負・1回 10問・苦手克服と ふくしゅうは 作らない)
- ⭐ **打つのは 読みの ひらがな**(はじめ)。スペイン語を 大きく(記号つき。á ñ ¿ ¡ は 色を かえて)見せて 🔊(es-ES)で 聞きながら 打つ。
  **「⌨️ 打ちかた」で ABC**(英会話と 同じ。端末に おぼえる `flick-es-input`・自己ベストは 打ちかたごと `-abc`)に すると つづりを 打つ。
  **アクセント記号と ¿ ¡ は 打たなくても 正解**(á→a・ñ→n で くらべる)。長おしで 記号まで 打てたら「✨ アクセントも ばっちり」+ 結果に「✨ アクセント記号まで 打てた ことば n」
  - ⚠️ はじめかたの まとめ(2-1)は「ABC で 打つ・A/B/C の 案」だったが、けいくんは **ひらがな**を えらんだ(英会話も はじめは ひらがな)
- **どこでも 通じる 形 + 国の 札**。ふだんの 例文は ustedes。スペインだけ / 中南米だけの 言いかたは `region`(ES / LA)で「🇪🇸 スペインで よく 使う」「🌎 中南米で よく 使う」の ふだ。どちらが 正しい とは 書かない。vosotros は 文法の 旅の 項目(region ES)
- 文の 旅は **`style`(tú / usted / ustedes / vosotros / -)と `who`(だれが だれに)を かならず 書く**。「ため口(tú)」「ていねい(usted)」「👤 店員さんに」の ふだ。⚠️ お店の人・年上・先生・知らない人には usted
- 旅(9): 🔤 発音とつづりのきほん `eskihon` 60 / 🌱 入門の単語 `esw1` 200 / 📘 初級 `esw2` 200 / 🧭 中級 `esw3` 200(英語と にている 語・にているのに 意味が ちがう 語を note に)/ 🏙 上級 `esw4` 200(ことわざ・慣用句)/
  📐 文法と活用 `esgram` 200 / 💬 日常会話 `estalk` 300(15場面 × 20)/ 🌟 ネイティブの表現 `esnative` 200 / 🏆 マスター `esmas` = **1560問**
- 4段: 1 入門 = 発音が 読めて あいさつ / 2 初級 = 旅行で 困らない / 3 中級 = 友だちと ふつうに 話せる / 4 上級 = ネイティブ。画面に DELE・検定の ことばは 出さない
- ことばは `tools/supein/src/<旅>.json`(決まりは `tools/supein/PROMPT.md`)+ `tools/supein/meta.json` → `tools/supein/spanish_js.py` が `data/spanish.json` と `supein/spanish.js`。
  ⚠️ **id は spanish_js.py が はじめて 通したときに src に 書きこむ**(`esw1-12` の 形)。きろくが id で おぼえているので **変えない・並べかえても id は そのまま**
- ⭐⭐ **読みの ひらがなは 手で 書かない**。text から `tools/supein/kana_es.py` の **1つの 表**で 作る(スペイン語は つづりどおりに 読むので 表で 決まる):
  母音 あいうえお / h は 読まない / j・ge・gi は は行 / ce・ci・z は さ行(中南米の 読み)/ que qui gue gui / ll・y は や行(ye = いぇ)/ ñ = にゃ行 / ch = ちゃ行 / rr = ら行 / f = ふぁ行 / v = ば行 /
  ti = てぃ・di = でぃ / 母音の つかない 子音 b ぶ・c く・d ど・l る・m n ん・r る・s す・x くす・z す / México・mexicano・Oaxaca の x は は行。
  つづりと 読みが ちがう 語だけ src の `pron` に 読みどおりの つづり(いまは el reloj → "el relo" の 1つだけ)
- ⚠️⚠️ **入れない 語**(`spanish_js.py` の `BAN` が text・例文・返事を 止める。次の 人が 足しもどさない ように):
  ・**記号を はずすと 別の 語**: año / años(ABC で ano と 打っても 正解に なる)。cumpleaños・el baño・daño も 使わない(トイレは el servicio)
  ・**国に よって 下品に なる 語**: coger・concha・pinche・bicho・pisar・cachar ほか。chaqueta・goma・tirar・polvo・papaya・la plata も 一覧から 外した(迷ったら 入れない)
  ・悪口: tonto・feo・gordo・idiota など。お酒・闘牛・恋愛・政治・実在の 人と クラブの 名前も なし。toro も 闘牛を 思わせるので 例に 使わない
  ・「ojalá que llueva」(有名な 歌の 題に 近い)→「ojalá que haga sol」
  ・アクセントだけで ちがう 組(si/sí・el/él・tu/tú・te/té・se/sé・mi/mí・mas/más)は 記号を はずすと かぶるので 1つの 短い 文で 両方 見せる(tú y tu gato など)
- しくみは `supein/supein.js`(SUPEIN。`kankoku/kankoku.js` を 写して 英会話の 打ちかたを 足した)。🔊 は es-ES の 声(iPhone は Mónica / Jorge など)。**スペイン語の 声が 無い 端末では 🔊 を 出さない**。
  ⚠️ **Playwright では 声が 鳴らないので けいくんの iPhone で 1回 聞いてもらう**。土台の `ownTts()` に `spanish` を 足した(足さないと 答えの あとに 日本語の 声が 鳴る)
- 作りかた: 1人の 助手が 8つの 旅の 一覧(`tools/supein/plan.json`。かぶり なし)→ 旅ごとに 助手 8人で 中身 → **書いた 助手とは 別の 助手 4人が 1問ずつ 確かめた**
  (意味・性と 数・活用・tú / usted・アクセント・自然さ・子ども向け・国に よって 下品に ならないか。約100か所 直した: 英語の なかま違いの note、usted への そろえ、乾杯の ¡Salud! → くしゃみの ¡Salud! など)。
  ⚠️ **ネイティブの 人の 目では まだ 見ていない**(見てくれる 人が いれば いちばん よい)
- 確かめかた: `node tools/play-all.mjs supein/`(全 ステージ・ひらがな)/ `node tools/supein/play-abc.mjs`(ABC で 記号つき・記号なしの 両方を 打って 全 ステージ)/ `node tools/click-all.mjs supein/`(W=320 も)。2026-10-16 に ぜんぶ 通った
- **トップの 絵は 入れた**(2026-10-16。`supein/hero.webp` 1536×1024・`hero=True`・`wordv` = 2)。けいくんの ChatGPT の 絵の 1回目。字を 切り出して 読み、3か所を **絵の 中で 直した**(`tools/supein/fix_text.py`):「学学習のながれ」の 前の 黄色い 学 → ★(クイズの ★と そろえた)/ ふきだし「発音?きいて」の くずれた 字 → 「を」/ Por favor の 読み「ボル」→「ポル」。そのままに した もの: 絵の 中の 読みが カタカナ(ゲームは ひらがな)・レベルの 札が Lv.1 たんご 〜 Lv.4 ねいてぃぶ表現(ゲームの 段は 入門〜上級。意味は 通る)・サグラダ・ファミリアに 似た 建物(小さい)。もとの 絵は 入れものに 入れていない
- **アイコンも 入れた**(2026-10-16。けいくんの 四角い 絵 1254px を 切らずに そのまま `python3 tools/icon_from_square.py supein`。`iconv` = 2)。四角い 絵の 札には ゲームに 無い 旅(聞く・話す・読む・書く / スペインの文化 / 地図と旅行フレーズ)・「スラング」「フォニックス」・**牛の 絵**(闘牛を 思わせる)が あるが、アイコンの 大きさでは 読めない・見えないので そのまま(医師・教師と 同じ 判断)。仮の アイコンの 台本 `placeholder_icon.py` は もう 使わない
- **題名も 入れた**(2026-10-16。けいくんの ChatGPT の 切りぬき `tools/supein/art/title-src.png` 2172×724 → `python3 tools/title_from_art.py supein` → `supein/logo-word.webp` 900×217。`logo=True`・`wordv` = 3)。「フリックスペイン語」9字を 読んで 確かめた
  届いたら tools/supein/art/square-src.png → `python3 tools/icon_from_square.py supein`(iconv を +1)/ title-src.png → `python3 tools/title_from_art.py supein`(logo を True・art.word を 実寸に)/ supein/hero.webp(hero を True)
- かずとも: `FLICK_MODES` に eskihon / esw1〜esw4 / esgram / estalk / esnative / esmas、`FLICK_LINK_TARGETS` に supein、`HOME_GAMES`(英会話の すぐ あと・韓国語の 前。けいくん 2026-10-16「スペイン語は英会話の次に」。`SERIES_ORDER` も 同じ)・`FLICK_SERIES_GAMES` に フリックスペイン語
