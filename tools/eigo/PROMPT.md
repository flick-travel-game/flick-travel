# フリック英語: 例文の 作りかた(助手に 分けて 頼むときの 決まり)

ゲームは「表示された 英文を フリックで 打ち写す」タイピング。打つのは 英字だけ(大文字・小文字は 区別しない。空白・' , . ? ! - は 打たなくても すすむ)。
打ち終わると **日本語訳 + 文法の ポイント**が 出る。遊ぶのは 中学生〜高校生・大人。**高校受験・大学受験の 英語で 要る 文法を 例文で おぼえる ゲーム**。
英会話(`eikaiwa/`)には 単語 1000語 と 会話 300文が ある。こちらは **文法**(入試で 点を 取る)。
(けいくん 2026-09-29: 名前「フリック英語」/ 9旅 / 3段 / 打つ字 35字まで / 訳は 打ち終わってから)

## 1問の 形(JSON)
{"id":"ji-livedten","name":"I have lived here for ten years.","ja":"わたしは 10年間 ここに 住んでいます。","journey":"jisei","category":"現在完了(継続)","difficulty":1,
 "type":"pattern","emoji":"🏠","relatedTerms":["ji-eversnow"],
 "description":"現在完了の「継続」です。for の あとは 期間、since の あとは 始まった 時を 置きます。"}

- id: 旅の 頭文字 + "-" + 英小文字・数字(fu- / ji- / uk- / to- / bs- / ka- / hi- / kt- / ju-)。英小文字・数字・- だけ。ぜんぶで かぶらない
- name: 画面に 出す 英文(ふつうの 大文字・句読点を 付けた 正しい 英語)。
  - 使える 字は **英字・空白・' , . ? ! -** だけ。**数字は 使わない**(ten のように 英語で 書く)。
    **引用符(")・コロン・セミコロン・かっこ・& は 使わない**
  - アポストロフィは まっすぐな ' だけ(’ は ダメ)
  - **打つ 字(英字だけを 数えた 長さ)は 35字まで**。例: "I have lived here for ten years." = 24字
- reading: **英語の 読みを ひらがなで** 書いた もの(はじめは ひらがなで 打つ。けいくん 2026-10-10「英語の読みをひらがなで打つようにする」)。
  フリック英会話(data/english.json の reading)と 同じ 書きかた: 語ごとの カタカナ英語の 読みを ひらがなで つなげる。ひらがなと ー だけ。
  例: I have lived here for ten years. → あいはぶりぶどひあふぉーてんいやーず / Japan → じゃぱん / the → ざ / to → とぅー / of → おぶ。
  句読点・空白は 入れない。数字は 英語の 読み(ten → てん)。日本の 地名・人名は 日本語の 読み(Kyoto → きょうと / Ken → けん)
- acceptedReadings: ゆれる 書きかたが あるときだけ(れい / れー、ゆー / ゆ など)。先頭は reading と 同じ。なくてよい
- ja: 日本語訳 1文。自然で やさしい 訳(かたく しすぎない)。語と 語の あいだに 半角スペース(シリーズの 文体)
- difficulty(どの 旅も 3段・同じ 数ずつ):
  - 1 = **入門**(中学の 基本。教科書に 出る)
  - 2 = **中級**(高校受験の めやす)
  - 3 = **上級**(大学受験 = 共通テスト・二次試験の めやす)
- 同じ difficulty の 中は よく 出る(大事な)順
- type: いつも "pattern"
- category: 図鑑で しぼる 文法の 名前(短い 日本語。旅の 中で 3〜8種類。例: 現在完了(継続)/ 関係代名詞 who / 仮定法過去)
- emoji: 1つ(文の 中身に 合う もの)
- relatedTerms: **同じ ファイルの 中の** id を 1〜3個(自分は ダメ)。いっしょに おぼえると よい 文(くらべる 形・言いかえ)
- description: **文法の ポイント**。1〜3文・**130字以内**。やさしい です・ます。
  「どんな 形か / どこが 大事か・まちがえやすい ところ」。英語の 語句は そのまま 英字で 書いて よい(for / since / have + 過去分詞)。
  日本語の 語と 語の あいだに 半角スペース。訳(ja)と 同じ ことを くり返さない

## ぜったいに 守ること
- **英文が 正しいこと**(文法・つづり・冠詞・単数複数・時制・句読点)。アメリカ英語の つづりに そろえる(color / favorite / center)。
  あやしい 文は 入れない。**いまの 英語として 自然な 文**に する
- **自分で 作った 文**。入試の 過去問・問題集・参考書・教科書・辞書の 例文を 写さない。
  よく ある 決まり文句の 例文(If I were a bird …)は **語を 変えて 自分の 文に する**(名前・場所・もの・数を 変える)
- 小説・歌の 歌詞・映画の せりふを 引かない
- 人の 名前は **架空の ありふれた 名前**だけ(Ken / Yumi / Tom / Emma / Mr. Brown など)。**実在の 人・有名人・キャラクター・会社・商品の 名前は 出さない**。
  地名(Tokyo / Kyoto / London / Canada)と 国・言語の 名前は よい
- 子どもが 見る ゲーム。お金・お酒・たばこ・けんか・こわい 話・悲しすぎる 話は 入れない。明るい 毎日の 文に する
- 英検・TOEIC・「〜級」・「合格できる」「かならず出る」は 書かない
- 「100マス計算」「百ます計算」の 字は 使わない
- 1つの ファイルの 中で 同じ 英文(打つ 字が 同じ もの)を 2回 出さない

## 旅と 数
| 旅(journey) | id の 頭 | 数(1 / 2 / 3) | 中身 |
|---|---|---|---|
| fudoshi 不規則動詞 | fu- | 60(20/20/20) | **name は「原形 - 過去形 - 過去分詞」**(例 "go - went - gone")。文では ない(ピリオド なし・小文字)。ja は 動詞の 意味(「行く」)。description に 使いかたの 注意(似た 動詞との ちがい・受動態で よく 出る など)。category は 型: A-B-C型 / A-B-B型 / A-A-A型 / A-B-A型。入門=中1〜2で 出る 基本 / 中級=高校受験 / 上級=lie と lay・rise と raise・find と found・bear・forbid・seek・bind など まちがえやすい もの。**語は 3つだけ**(4つ 以上 つなげない)。過去形・過去分詞が 2つ ある 動詞は アメリカ英語で よく 使う ほう 1つ |
| jisei 時制 | ji- | 90(30/30/30) | 現在・過去・未来・進行形・現在完了(継続・経験・完了)・現在完了進行形・過去完了・未来完了・時制の 一致・時や 条件の 副詞節は 現在形 |
| uke 受動態 | uk- | 60(20/20/20) | be + 過去分詞・by 〜・by 以外の 前置詞(be surprised at / be made of / from / be known to)・助動詞 + be + 過去分詞・進行形と 完了形の 受動態・SVOO と SVOC の 受動態・句動詞の 受動態(laugh at / speak to)・It is said that |
| tofutei 不定詞・動名詞 | to- | 90(30/30/30) | to 不定詞の 3用法・It is 〜 for / of 人 to・too 〜 to・enough to・疑問詞 + to・want 人 to・原形不定詞(make / let / have / see)・動名詞だけを とる 動詞(enjoy / finish / mind / avoid)・to と ing で 意味が 変わる 動詞(remember / forget / stop / try)・前置詞 + 動名詞・look forward to ing |
| bunshi 分詞・分詞構文 | bs- | 60(20/20/20) | 現在分詞・過去分詞の 修飾(前 と うしろ)・exciting と excited・知覚動詞 + 分詞・have + もの + 過去分詞・分詞構文(時・理由・付帯状況)・with + 名詞 + 分詞・独立分詞構文・慣用的な 分詞構文(generally speaking) |
| kankei 関係詞 | ka- | 60(20/20/20) | who / which / that / whose / whom・目的格の 省略・where / when / why / how・what・非制限用法(コンマ)・前置詞 + 関係代名詞・複合関係詞(whatever / whoever / wherever / however) |
| hikaku 比較 | hi- | 60(20/20/20) | as 〜 as・not as 〜 as・倍数表現(twice as 〜 as)・比較級 than・最上級・比較級や 原級で 最上級の 意味・the 比較級, the 比較級・比較級 and 比較級・one of the 最上級 + 複数・much + 比較級・no more than / no less than など |
| katei 仮定法 | kt- | 60(20/20/20) | 仮定法過去・仮定法過去完了・混合型・I wish・as if・If only・without / but for・It is time・were to / should・if の 省略(倒置: Had I known)・otherwise |
| jukugo 熟語・句動詞 | ju- | 90(30/30/30) | **name は 熟語 そのもの**(例 "look forward to" / "put up with" / "make up one's mind")。文では ない(ピリオド なし・小文字。one's / oneself は そのまま)。ja は 意味。description に 使いかた・言いかえ(= postpone)・まちがえやすい 点。category は 句動詞 / be + 形容詞 + 前置詞 / 動詞 + 名詞 / 前置詞の 熟語 / 助動詞の 熟語 など |

## 旅ごとに 入れる / 入れない(かぶらない ように)
- fudoshi: 不規則動詞だけ。規則動詞は 入れない
- jisei: 時制が 主役の 文。受動態・仮定法は それぞれの 旅へ
- uke: 受動態が 主役の 文
- tofutei: 不定詞・動名詞が 主役の 文。**分詞(名詞を くわしく する ing / ed)は bunshi へ**
- bunshi: 分詞・分詞構文。**動名詞は tofutei へ**
- kankei: 関係詞の 文
- hikaku: 比較の 文
- katei: 仮定法の 文。**ふつうの 条件の if(If it rains, I will …)は jisei へ**
- jukugo: 熟語・句動詞。**前の 8つの 旅の 文法そのもの(too 〜 to・as 〜 as)は 入れない**

## 出すもの
`tools/eigo/terms-<journey>.json` に JSON の 配列で 書く。書いたら
`python3 tools/eigo/terms_js.py --only <journey>` で 形を 確かめて、❌ が 0 に なるまで 直す
