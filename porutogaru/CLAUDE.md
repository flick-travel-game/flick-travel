# porutogaru/ の メモ(この ゲームだけの 決めごと・いきさつ)

> シリーズ共通の きまりは 入れものの いちばん上の `CLAUDE.md`。2026-11-10 に そこから 1文字も 変えずに 移した。

## フリックポルトガル語(`porutogaru/`。けいくん 2026-11-06「進めて」。まとめ `docs/フリックポルトガル語-はじめかた.md` の 5つの 問いに: 打つ字「スペイン語と同じ」・「ブラジルが基本」・旅と 問題の 数「スペイン語と同じ」・ネイティブの 確かめ「見てもらえる人はいない」)

- 名前「**フリックポルトガル語**」(フォルダ `porutogaru`・modes `PORUTOGARU`・旅の id は `pt…`)。シリーズの 絵文字は 🇧🇷。`SERIES_CHAPTERS` の「教科をひろげる」、**スペイン語の となり**。
  かずともの `FLICK_MODES` に ptkihon / ptw1〜ptw4 / ptgram / pttalk / ptnative / ptmas、`FLICK_LINK_TARGETS` に porutogaru
- **スペイン語と 同じ 型**(1回 10問・スピード記録勝負)。旅 9つ = 発音とつづりのきほん 60 / 単語 4段 × 200 / 文法と活用 200 / 日常会話 300(15場面 × 20)/ ネイティブの表現 200 + マスター = **1,560問**
- ⭐ **打つのは 読みの ひらがな(ブラジルの 読み)**。「⌨️ 打ちかた」で ABC(つづり)。アクセント記号と ç は 打たなくても 正解(`flick-pt-input`・自己ベストは 打ちかたごと)
- ⭐⭐ **読みは 手で 書かない**。`tools/porutogaru/kana_pt.py` の 1つの 表: 語の おわりの 弱い e / o → い / う・ti di と 語末の te de → ち ぢ・語末と 子音の 前の l → う・語頭の r と rr → は行・
  鼻音 ão → あうん / ãe → あいん / õe → おいん / 語末 em → えいん・lh nh ch tch・母音の あいだの s → ざ行・語頭 es + 子音 → いす。
  ⚠️ **ão は「あうん」**(まとめの「あぅん」は 小さい ぅ が 打ちにくいので やめた)。表で 読めない 語だけ src の `pron`(読みどおりの つづり。例 táxi → táksi・desculpa → disculpa・cinquenta → cincuenta・tranquilo → trancuilo)
- 文の 旅は `style`(você / tu / o senhor / vocês / -)と `who`。ポルトガルだけ / ブラジルだけの 言いかたは `region`(PT / BR)の ふだ(🇵🇹 / 🇧🇷)。BR と PT の 組(ônibus / autocarro など)は ネイティブの 旅の「ブラジルとポルトガル」に まとめた
- ことばは `tools/porutogaru/src/<旅>.json`(決まり `PROMPT.md`・書く係 `WRITER.md`・確かめる係 `CHECKER.md`・置き場所 `plan.json`)→ `porutogaru_js.py` → `porutogaru/portuguese.js` + `data/portuguese.json`。しくみは `porutogaru/porutogaru.js`(supein.js を 写した)。🔊 は pt-BR の 声。土台の `ownTts()` に `portuguese` を 足した
- ⚠️⚠️ **入れない 語**(`porutogaru_js.py` の `BAN`。足しもどさない): 国に よって 下品・差別に なる 語(rapariga・puto・bicha・pinto・rola・grelo・pau・veado・bunda・macaco …)/ cocô(ABC で coco と かさなる。だから **o coco も 入れていない**)/
  gostoso・gostosa(ブラジルでは 人に 使うと 性的)/ お酒(cerveja・cachaça・caipirinha)/ favela / 悪口(burro・chato・feio・gordo …)。⚠️ **迷ったら 入れない**
- ⚠️ **読みが 日本語の 悪い ことばに なる 語**: a vaca(→ あばか ではなく「ばか」)は 確かめ役が a vila に 入れかえた。新しく 足すときも 読みを 見る(ônibus の おにぶす・abacaxi の あばかし など 語の 中の 一部は そのまま)
- ⚠️ 記号だけで 意味が 変わる 組(avô / avó・pais / país・e / é・por / pôr・pode / pôde …)は 1つの 文で 両方(ABC の くらべで かぶるので 台本が 止める)
- 1人の 助手が 置き場所(`plan.json`)、7人で 書き、**別の 4人が 1問ずつ 確かめた**(直し 約90: pttalk の who と 返事の ずれ・chover no molhado の 意味・Uhum の 読み(ううん → うんうん)・Deu zebra の 賭けの 話を 外した・恋愛に 読める 例文 など)。⚠️ **ネイティブの 人の 目では まだ 見ていない**
- 絵: **まだ 無い**(仮の アイコン `tools/porutogaru/placeholder_icon.py`。`hero=False`・`logo=False`)。届いたら square-src.png → `icon_from_square.py porutogaru`(iconv +1)/ title-src.png → `title_from_art.py porutogaru`(logo を True・art.word を 実寸)/ `porutogaru/hero.webp`(hero を True)。
  販売ページ `HOME_GAMES`(スペイン語の 次)と 規約の 一覧 `FLICK_SERIES_GAMES` は 絵が 届いてから
- 確かめかた: `node tools/play-all.mjs porutogaru/`(全342ステージ。VAR=nfd / spacing / commit も)/ `node tools/porutogaru/play-abc.mjs`(ABC。記号つき・なし)/ `node tools/click-all.mjs porutogaru/`(W=320 も)。⚠️ 🔊 は けいくんの iPhone で 1回 聞いてもらう
