#!/usr/bin/env python3
"""index.html(世界フリック旅行 = 土台)から、シリーズの ほかのゲームの ページを 作る。
   python3 tools/build_games.py        → rekishi/ uchu/ karada/ kabu/ ai/ eikaiwa/ rika/ seibi/ patissier/ kokugo/ sugaku/ hoiku/ kango/ gamedev/ biyo/ kyoryu/ code/ shakai/ ishi/ kyoshi/ chef/ keisatsu/ shobo/ bengoshi/ zeirishi/ の index.html
- 土台は 1つ。直すのは index.html だけで、これを 走らせれば ほかのゲームにも 同じ直しが 入る
- 変えるのは: <head> の 題名・manifest・アイコン / GAME の 2行 / 問題の中身(その ゲームの ぶんだけ)/ ふりがな(その ぶんだけ)/ 写真の道("../")
⚠️ できた ページは 手で直さない(次に 走らせると 消える)"""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent

GAMES = {
    "rekishi": dict(name="フリック歴史旅行", modes=["wpeople", "jpeople", "wevents", "jevents"], kinds={"person", "event"},
                    color="#c9741a", hero=True, logo=True, art=dict(word=(892, 208), hero=(1536, 1024), alt="フリック歴史旅行。古代から 未来へ 時代の 名所が フィルムで つながる 空を 男の子と 犬が 望遠鏡で 見る 絵", iconv=3, wordv=3),
                    lead="世界と日本の偉人・歴史の出来事を、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、時間の旅に出よう。",
                    how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。偉人は 名前を打つと、結果で その人のプロフィールと 名言が読めるよ。出来事は 年と解説が出て、年表に📍が立つよ。",
                    rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、歴史の流れも自然と覚えられるよ。"),
    "uchu": dict(name="フリック宇宙旅行", modes=["usolar", "usky", "ucos"], kinds={"space"}, color="#2b3a8f", hero=True, logo=True, art=dict(word=(959, 193), hero=(1536, 1024), alt="フリック宇宙旅行。惑星・銀河・宇宙ステーションの 中を 男の子と 犬が 望遠鏡で 見る 絵", iconv=3, wordv=3),
                 lead="太陽系・星と星座・宇宙のことばを、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、宇宙の旅に出よう。",
                 how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、太陽系の図や 星図に📍が立つよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、星や惑星の名前も自然と覚えられるよ。"),
    "karada": dict(name="フリックからだ旅行", modes=["kbone", "korgan", "kcell", "ktsubo"], kinds={"body"}, color="#c9364f", hero=True, logo=True, art=dict(word=(945, 230), hero=(1536, 768), alt="フリックからだ旅行。骨・心臓・脳・細胞の 中を 男の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=3),
                   lead="骨・筋肉・臓器・からだのしくみ・細胞・ツボを、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、からだの中を旅しよう。",
                   how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、からだの図に📍が立つよ。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、からだのしくみも自然と覚えられるよ。"),
    # 株式フリック旅行(けいくん 2026-09-26)。絵は けいくんの ChatGPT の 絵(kabu/hero.webp)。題名は GrabCut で 切りぬいた(tools/kabu/logo_cut.py)
    "kabu": dict(name="フリック株式旅行", modes="KABU", kinds=set(), color="#0f6fa8", hero=True, logo=True,
                 art=dict(word=(908, 177), hero=(1536, 1024), alt="フリック株式旅行。世界の 会社の 町と 地球を 男の子と 犬が 飛んで 旅する 絵", iconv=4, wordv=3),
                 lead="世界の会社・日本の会社の名前を、ひらがなでフリック入力。10問ずつ あそぶうちに、どこの国の・どんな仕事の 会社なのかが 自然と 身につくよ。入門100社から はじめて、めざせ 世界の会社 約2,400社。",
                 how="表示された ひらがなを、そのまま打ち写してね。こたえると、その会社の 国・業種・ひとことが 出るよ。入門は だれでも知っている会社。どのステージも いつも同じ10問なので、タイムをくらべられるよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、世界の会社と なかよくなれるよ。"),
    # AIフリック旅行(けいくん 2026-09-26)。ことばは data/aiTerms.json の 1か所 → ai/terms.js。コースの しくみは ai/ai.js(AITABI)。
    #   絵は けいくんの ChatGPT の 絵(ai/hero.webp)。題名は tools/ai/logo_cut.py で 切りぬいた。アイコンは けいくんの 四角い 絵(1254px)を 縮めたもの
    "ai": dict(name="フリックAI旅行", modes="AITABI", kinds=set(), color="#6d3fd6", hero=True, logo=True,
               art=dict(word=(991, 243), hero=(1536, 1024), alt="フリックAI旅行。男の子と 犬が AI・クラウド・データ・API の ことばが うかぶ 空の 島を 旅する 絵", iconv=3, wordv=3),
               lead="遊んでいるうちに、AIとWebのことばがわかる。フリックで打つと、ことばの意味・つながる ことば・しくみの図の どこにあるかが 出るよ。知っている ことばから はじめて、点だった知識を 線につなげよう。",
               how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。入門は 聞いたことのある ことばから。どのステージも いつも同じ10問なので、タイムをくらべられるよ。英字の ことば(API など)は 日本での ふつうの 読みかたで 打つよ。",
               rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、AI・Web・サービスづくりの しくみが つながって 見えてくるよ。"),
    # 英会話フリック旅行(けいくん 2026-09-26)。ことばは data/english.json の 1か所 → eikaiwa/english.js。しくみは eikaiwa/eikaiwa.js(EIKAIWA)。
    #   ⚠️ 英検・TOEIC の めやすは 画面に 出さない(けいくん 2026-09-26「勉強してる感が強くなるので表記しない方がいい」)。絵は まだ無い(文字の 題名)
    "eikaiwa": dict(name="フリック英会話", modes="EIKAIWA", kinds=set(), color="#0e8f6e", hero=True, logo=True,
                    art=dict(word=(873, 282), hero=(1536, 1024), alt="フリック英会話。世界の 町と 英語の ふきだしの 中を 男の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=3),
                    lead="英単語と 日常英会話を、フリックで 打ち写して 旅しよう。打つと 意味と 例文が 出て、🔊で 発音も 聞けるよ。身のまわりの ことばから はじめて、外国の人と 話せる 英語まで。",
                    how="表示された 英語を、そのまま打ち写してね。大文字・小文字は どちらでも OK。空白や「' , . ? !」は 打たなくても すすむよ。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。",
                    rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。iPhone は 日本語キーボードの「ABC」なら フリックで 英語が 打てるよ。"),
    # 理科フリック旅行(けいくん 2026-09-26)。旅は 教科書の 4分野。1つの 旅の 中で 小学校 → 中学校(高校受験)→ 高校(大学受験)の 順に レベルが 並ぶ。
    #   ことばは tools/rika.tsv(10列。tools/check_rika_tsv.py で 確かめる)。宇宙・からだに ある ことばは 入れない。絵は まだ 無い(けいくんの 絵が 届いたら art を 足す)
    "rika": dict(name="フリック理科旅行", modes=["rphys", "rchem", "rbio", "rgeo"], kinds={"rika"}, color="#3949ab", hero=True, logo=True,
                 art=dict(word=(738, 142), hero=(1536, 1024), alt="フリック理科旅行。物理・化学・生物・地学の 看板が ならぶ 世界を 女の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=3),
                 lead="物理・化学・生物・地学のことばを、ひらがなでどれだけ速く打てるか。小学校のことばから はじめて、中学校(高校受験)・高校(大学受験)まで。10問のトータルタイムで勝負しながら、理科の旅に出よう。",
                 how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん(小学校のことば)。先に進むほど 中学校・高校のことばになるよ。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、周期表や 理科の地図に📍が立つよ。星や宇宙は フリック宇宙旅行、人の体や細胞は フリックからだ旅行で あそべるよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、理科のことばも自然と覚えられるよ。"),
    # 整備フリック旅行(けいくん 2026-09-26)。ことばは tools/seibi/terms-<旅>.json → seibi/terms.js(tools/seibi/terms_js.py)。しくみは seibi/seibi.js(SEIBI。ai.js を 写した もの)。
    #   旅は エンジン・シャシ・ブレーキ・電装EV・バイク・工具点検法令。級は 入門 → 3級めやす → 2級めやす。絵は まだ無い(文字の 題名。届いたら art を 足す)
    "seibi": dict(name="フリック整備士", modes="SEIBI", kinds=set(), color="#d9480f", hero=True, logo=True,
                  art=dict(word=(731, 218), hero=(1536, 1024), alt="フリック整備士。エンジン・ブレーキ・タイヤなどの 部品の 中を 男の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=4),
                  lead="クルマ・バイクの 部品と しくみの ことばを、ひらがなで フリック入力。打つと その部品が 何を するのか・しくみ図の どこに あるのかが 出るよ。身近な 部品から はじめて、3級・2級・1級 自動車整備士の 試験範囲の めやすまで。4択クイズと 計算問題で 試験の 練習も できるよ。",
                  how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。部品の 説明は 本物の 試験問題では ないので、試験の 勉強には 問題集や 学校の 教科書も 使ってね。部品の 名前と しくみを おぼえる ゲームだよ。実際の 整備は 資格を もつ 人・お店に まかせよう。",
                  rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、クルマや バイクの 中身が 見えてくるよ。国土交通省・日本自動車整備振興会連合会とは 関係ありません。"),
    # パティシエフリック(けいくん 2026-09-27)。ことばは tools/patissier/terms-<旅>.json → patissier/terms.js(tools/patissier/terms_js.py)。しくみは patissier/patissier.js(PATISSIER。seibi.js を 写した もの)。
    #   旅は 材料・生地と焼き菓子・クリーム チョコ あめ・世界のお菓子・和菓子・道具 衛生 栄養。むずかしさは 入門 → 製菓衛生師めやす → 菓子製造技能士 2級めやす → 1級めやす。絵は けいくんの ChatGPT の 絵(2026-09-27)。題名は tools/patissier/logo_cut.py で 切りぬいた
    "patissier": dict(name="パティシエフリック", modes="PATISSIER", kinds=set(), color="#d6336c", hero=True, logo=True,
                      art=dict(word=(959, 204), hero=(1536, 1024), alt="パティシエフリック。パリの 洋菓子店で コック帽の 女の子と 犬が いちごの ケーキに クリームを しぼる 絵", iconv=3, wordv=4),
                      lead="お菓子の 材料・生地・クリーム・世界の お菓子・和菓子・道具と 衛生の ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、しくみ図の どこに あるのかが 出るよ。身近な お菓子から はじめて、製菓衛生師・菓子製造技能士 2級・1級の 試験範囲の めやすまで。4択クイズで 試験の 練習も できるよ。",
                      how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。説明は 本物の 試験問題では ないので、試験の 勉強には 問題集や 学校の 教科書も 使ってね。作りかた(分量・温度・時間)は のせていないよ。火や 刃物を 使うときは おとなと いっしょにね。",
                      rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、お菓子の ことばと しくみが つながって 見えてくるよ。厚生労働省・都道府県・中央職業能力開発協会とは 関係ありません。"),
    # フリック国語旅行(けいくん 2026-09-27「フリック国語旅行 / 3段でOK / 古文・漢文を入れる / 上級は よみを かくす / 年表」)。ことばは tools/kokugo/terms-<旅>.json → kokugo/terms.js(tools/kokugo/terms_js.py)。
    #   しくみは kokugo/kokugo.js(KOKUGO。patissier.js を 写した もの)。旅は 9つ + マスター。むずかしさは 入門(中学の基本)→ 中級(高校受験)→ 上級(大学受験)。
    #   絵(2026-09-27): アイコン = 四角い 絵を 縮めた もの / 題名 = トップの 絵から tools/kokugo/logo_cut.py で 切りぬいた。
    #   トップの 絵は 2回目の 絵(1回目は 漢文の 読み「がくして」と 文法の「目的語」が まちがいで 入れなかった)。アイコンも 2回目の 四角い 絵
    "kokugo": dict(name="フリック国語旅行", modes="KOKUGO", kinds=set(), color="#3b5bdb", hero=True, logo=True,
                   art=dict(word=(881, 186), hero=(1536, 1024), alt="フリック国語旅行。本と 桜の 町で 筆を もった 女の子と 犬が 漢字・古文・漢文・文学史の 札の 中を 旅する 絵", iconv=4, wordv=4),
                   lead="漢字の読み・四字熟語・ことわざ・文法・古文・漢文・文学史・評論の ことばを、ひらがなで フリック入力。打つと その ことばの 意味が 出るよ。中学の 基本から はじめて、高校受験・大学受験の 範囲の めやすまで。4択クイズで 意味の 練習も できるよ。",
                   how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。漢字の読みの 上級は よみが かくれるよ。思い出して 打ってね。古文単語は むかしの かなづかいを いまの かなづかいで 打つよ。説明は 本物の 入試問題では ないので、受験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、国語の ことばが 自然と 身につくよ。大学入試センター・各都道府県の 教育委員会とは 関係ありません。"),
    # フリック数学旅行(けいくん 2026-09-27「おすすめで」+「受験に必要な計算は入れた方がいい」)。ことばは tools/sugaku/terms-<旅>.json → sugaku/terms.js(tools/sugaku/terms_js.py)。
    #   しくみは sugaku/sugaku.js(SUGAKU。kokugo.js を もとに tools/sugaku/make_sugaku_js.py が 作る。図 = tools/sugaku/fig.js / 計算問題 = tools/sugaku/calc.js)。
    #   旅は 8つ + マスター(8つめ ⌨️ コードと作りかた は 2026-09-29「コードの書きかたや作りかたは必要? 必要なら追加して」で 足した)。むずかしさは 入門(算数)→ 初級(中学 = 高校受験)→ 中級(数学Ⅰ・A)→ 上級(数学Ⅱ・B・Ⅲ・C = 大学受験)。
    #   絵(2026-09-28): トップの 絵 = 2回目の 絵(1回目は「たいせき・たいせき」「にじゅうかんすう」「ひすう」「ばいすう」「中学受験」が まちがいで 入れなかった)。
    #   題名 = tools/sugaku/logo_cut.py で 切りぬいた(2026-09-28 に ふちを 作りなおした。けいくん「左上の字が切れてる」)/ アイコン = 四角い 絵を 縮めた もの
    "sugaku": dict(name="フリック数学旅行", modes="SUGAKU", kinds=set(), color="#1971c2", hero=True, logo=True,
                   art=dict(word=(722, 180), hero=(1536, 1024), alt="フリック数学旅行。数式と 図形の 浮かぶ 空の 島を 男の子と 犬が 飛んで 旅する 絵", iconv=1, wordv=4),
                   lead="算数・数学の 用語・公式・定理を、ひらがなで フリック入力。打つと その ことばの 意味と 図が 出るよ。小学校の 算数から はじめて、高校受験・大学受験の 範囲の めやすまで。公式は 読みあげの 形で 打つよ。4択クイズと 計算問題で 受験の 練習も できるよ。",
                   how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。「公式を打つ」ことばは a²+b²=c² を「えーのにじょう たす …」のように 読みあげで 打つよ。説明と 計算問題は 本物の 入試問題では ないので、受験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、数学の ことばと 図が つながって 見えてくるよ。大学入試センター・文部科学省・各都道府県の 教育委員会とは 関係ありません。"),
    # フリック保育士(けいくん 2026-09-28「保育士になるために必要な 知識をフリック形式の問題にしてください」→「ぜんぶおすすめで」)。
    #   ことばは tools/hoiku/terms-<旅>.json → hoiku/terms.js(tools/hoiku/terms_js.py)。しくみは hoiku/hoiku.js(HOIKU。patissier.js を 写した)。
    #   旅は 6つ + マスター。むずかしさは 入門 → 中級(保育士試験の 筆記の めやす)→ 上級(こまかい 制度・法律の めやす)。
    #   ⚠️⚠️ 小学生も あそぶので、つらい 話は「助ける しくみ」として 事実だけ やさしく(決まりは tools/hoiku/PROMPT.md)。手あての やりかたは のせない。
    #   絵(2026-09-28): けいくんの ChatGPT の 絵。⚠️ 1回目・2回目とも 右下の 見出しが「じっぎ」(小さい っ)の 誤字だった。
    #   3回目でも 直らなかったので、絵の 中の「っ」を 大きい「つ」に 描きかえた(tools/hoiku/fix_tsu.py。書体・色・つやは そのまま)。
    #   題名は tools/hoiku/logo_cut.py で 切りぬいた(字の 中身を ふくらませる やりかた。白い ふちを 直に ひろうと 背景と つながる)
    "hoiku": dict(name="フリック保育士", modes="HOIKU", kinds=set(), color="#2f9e44", hero=True, logo=True,
                  art=dict(word=(764, 175), hero=(1536, 1024), alt="フリック保育士。花かざりの 保育室で エプロンの 先生と 犬が 絵本を 見せ、子どもたちが 笑っている 絵", iconv=1, wordv=1),
                  lead="子どもの 育ち・保育の 考えかた・子どもを 支える しくみ・健康・食と栄養・実技と 現場の ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、試験の どの 科目か・しくみ図の どこに あるのかが 出るよ。園で 聞く ことばから はじめて、保育士試験の 筆記の 範囲の めやすまで。4択クイズで 試験の 練習も できるよ。",
                  how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。説明は 本物の 試験問題では ないので、試験の 勉強には 問題集や 学校の 教科書も 使ってね。けがや 病気の ときの 手あての やりかたは のせていないよ。本当の ときは 園の きまりと 大人の 指示に したがってね。",
                  rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、保育の ことばと しくみが つながって 見えてくるよ。こども家庭庁・厚生労働省・全国保育士養成協議会とは 関係ありません。"),
    # フリック看護師(けいくん 2026-09-28「看護師になるために必要な 知識をフリック形式の問題にしてください」→「全部おすすめで」)。
    #   ことばは tools/kango/terms-<旅>.json → kango/terms.js(tools/kango/terms_js.py)。しくみは kango/kango.js(KANGO。hoiku.js を 写した)。
    #   旅は 8つ + マスター(8つめ ⌨️ コードと作りかた は 2026-09-29「コードの書きかたや作りかたは必要? 必要なら追加して」で 足した)。むずかしさは 入門 → 中級(看護師国家試験の 必修・一般の めやす)→ 上級(こまかい 制度・専門の めやす)。
    #   ⚠️⚠️ 医療の やりかた(薬の 量・処置の 手順)は のせない。小学生も あそぶので こわい 書きかたを しない(決まりは tools/kango/PROMPT.md)。
    #   絵(2026-09-29): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリック看護師」。⚠️ 1回目は「このイラストは どのことばかな?」(絵から えらぶ クイズは 無い)・
    #   からだの 図(からだの 部品の ことばは 入れていない)・「ごっかしけん」が ちがったので 入れなかった。2回目でも「ごっかしけん」と 横長の「むながる」が
    #   直らなかったので 絵の 中で 直した(tools/kango/fix_text.py)。題名は tools/kango/logo_cut.py(紺の ふちで かこむ やりかた)
    "kango": dict(name="フリック看護師", modes="KANGO", kinds=set(), color="#e0202e", hero=True, logo=True,
                  art=dict(word=(753, 211), hero=(1536, 1024), alt="フリック看護師。病院の ナースステーションの 前で 看護師の 男の人と 女の人と 犬が 手を さしのべて 笑っている 絵", iconv=1, wordv=1),
                  lead="見て 気づく ことば・看護の わざ・感染を ふせぐ・看護の 考えかた・からだと 病気の ことば・一生の 看護・病院と しくみの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、試験の どの 科目か・しくみ図の どこに あるのかが 出るよ。病院で 見かける ことばから はじめて、看護師国家試験の 範囲の めやすまで。4択クイズで 試験の 練習も できるよ。",
                  how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。薬の 量や 手当ての やりかたは のせていないよ。本当に 具合が わるい ときは、大人に 言って お医者さんへ。説明は 本物の 試験問題では ないので、試験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                  rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、看護の ことばと しくみが つながって 見えてくるよ。厚生労働省とは 関係ありません。"),
    # フリック医師(けいくん 2026-09-30「医師になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」)。
    #   ことばは tools/ishi/terms-<旅>.json → ishi/terms.js(tools/ishi/terms_js.py)。しくみは ishi/ishi.js(ISHI。kango.js を 写した)。
    #   旅は 7つ + マスター。むずかしさは 入門(病院で 聞く)→ 中級(医師国家試験の 必修・一般の めやす)→ 上級(専門・制度の めやす)。
    #   ⚠️⚠️ 医療の やりかた(薬の 量・処置や 手術の 手順・診断の 決めうち・正常値)は のせない。小学生も あそぶので こわい 書きかたを しない(決まりは tools/ishi/PROMPT.md)。
    #   ✅ からだ旅行・看護師と 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。説明は 医師の 目線で 書きなおした。
    #   絵(2026-09-30): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリック医師」。題名は tools/ishi/logo_cut.py(GrabCut)。
#   ⚠️ 1回目の 横長は 4択が「こういう ときは こうする」・「37.5℃」・ゲームに 無い ことば・からだの 部品の 絵 だったので 入れず、2回目を 入れた
    "ishi": dict(name="フリック医師", modes="ISHI", kinds=set(), color="#1d6bff", hero=True, logo=True,
                 art=dict(word=(529, 145), hero=(1536, 1024), alt="フリック医師。病院の 前で 白衣の 男の人と 女の人と 犬が こちらを 指さして 笑っている 絵。まわりに 7つの 旅の ことばの 札と 4択クイズの 見本が ならんでいる", iconv=2, wordv=1),
                 lead="診察の ことば・検査の ことば・治療と くすりの ことば・診療科と 専門・からだと 病気の しくみ・公衆衛生と 予防・医師の 制度と 倫理を、ひらがなで フリック入力。打つと その ことばの 意味と、医師国家試験の どの 区分か・しくみ図の どこに あるのかが 出るよ。病院で 聞く ことばから はじめて、医師国家試験の 範囲の めやすまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。薬の 量や 手当て・手術の やりかたは のせていないよ。本当に 具合が わるい ときは、大人に 言って お医者さんへ。説明は 本物の 試験問題では ないので、試験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、医学の ことばと しくみが つながって 見えてくるよ。厚生労働省とは 関係ありません。"),
    # フリック教師(けいくん 2026-09-30「教師になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」)。
    #   ことばは tools/kyoshi/terms-<旅>.json → kyoshi/terms.js(tools/kyoshi/terms_js.py)。しくみは kyoshi/kyoshi.js(KYOSHI。ishi.js を 写した)。
    #   旅は 7つ + マスター。むずかしさは 入門(学校で 聞く)→ 中級(教員採用試験の 教職教養の めやす)→ 上級(法律・制度・教育史の めやす)。
    #   ⚠️⚠️ 小学生も あそぶので いじめ・不登校などは「守る しくみ」だけ。指導の 決めうち・政治や 宗教の よしあしは のせない(決まりは tools/kyoshi/PROMPT.md)。
    #   絵(2026-09-30): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリック教師」。題名は tools/kyoshi/logo_cut.py(紺の ふちの 内がわを うめる)。
    #   ⚠️ 1回目の 絵は 4択が 医師の 問題(聴診器)・札の ことば 18こが ゲームに 無い ので 入れず、2回目を 入れた。4択の「Q:」の 重なりは tools/kyoshi/fix_text.py で 消した
    "kyoshi": dict(name="フリック教師", modes="KYOSHI", kinds=set(), color="#1d6bff", hero=True, logo=True,
                   art=dict(word=(573, 156), hero=(1536, 1024), alt="フリック教師。教室で 先生の 男の人と 女の人と 白い 犬が こちらを 指さして 笑っている 絵。まわりに 7つの 旅の ことばの 札と 4択クイズの 見本が ならんでいる", iconv=3, wordv=1),
                   lead="教育の 考えかた・子どもの 心と 育ち・授業の つくりかた・学級と 学校の しくみ・支える 指導・教育の 法律と 制度・教育の 歴史と 世界の ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、教職教養の どの 科目か・しくみ図の どこに あるのかが 出るよ。学校で 聞く ことばから はじめて、教員採用試験の 範囲の めやすまで。4択クイズで 試験の 練習も できるよ。",
                   how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。本物の 試験問題では ないので、試験の 勉強には 大学の 教科書や 問題集も 使ってね。こまった ことが あったら、まわりの 大人や 学校の 先生に 相談してね。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、教育の ことばと しくみが つながって 見えてくるよ。文部科学省・教育委員会とは 関係ありません。"),
    # フリック料理人(けいくん 2026-09-30「料理人(調理師)になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」+「ワイン・日本酒の 銘柄や 飲みかた・カクテルも入れてください」)。
    #   ことばは tools/chef/terms-<旅>.json → chef/terms.js(tools/chef/terms_js.py)。しくみは chef/chef.js(CHEF。kyoshi.js を 写した)。
    #   旅は 8つ + マスター(8つめ 🍷 お酒と飲みもの)。むずかしさは 入門(台所で 聞く)→ 中級(調理師試験の 6科目の めやす)→ 上級(プロの 厨房・技能検定の めやす)。
    #   ⚠️⚠️ 小学生も あそぶので 包丁・火・油・食中毒は「安全に 使う・守る」書きかただけ。レシピの 数字・会社や 蔵元の 名前は のせない(決まりは tools/chef/PROMPT.md)。
    #   絵(2026-09-30): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリック料理人」。題名は tools/chef/logo_cut.py(紺の ふちに かこまれた 字の 中身から GrabCut)。
    #   ⚠️ 1回目の 絵は 札の ことば 8こ(やさい・にく・さかな・かねつ・しょくじのまなー・ちゃ・こーひー・じゅーす)が ゲームに 無く、「教科や 分野との つながり」だったので 入れず、2回目を 入れた。
    #   アイコンは けいくんの 正方形の 絵(1254px。2026-09-30)。四角い 絵の 小さい 字は アイコンの 大きさでは 読めないので そのまま
    "chef": dict(name="フリック料理人", modes="CHEF", kinds=set(), color="#f25c00", hero=True, logo=True,
                 art=dict(word=(611, 160), hero=(1536, 1024), alt="フリック料理人。レストランの 厨房で 中華鍋を ふる 男の人と オムライスを 持つ 女の人と 白い 犬が 笑っている 絵。まわりに 8つの 旅の ことばの 札と 4択クイズの 見本が ならんでいる", iconv=2, wordv=1),
                 lead="食材・切りかたと 下ごしらえ・調理の わざ・日本料理・世界の 料理・衛生と 安全・栄養と 食文化・お酒と 飲みものの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、調理師試験の どの 科目か・しくみ図の どこに あるのかが 出るよ。台所で 聞く ことばから はじめて、調理師試験の 範囲の めやす・プロの 厨房の ことばまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。レシピ(分量・温度・時間)や 包丁・火・油の 使いかたは のせていないよ。火や 包丁を 使う ときは かならず 大人と いっしょに。お酒は 20歳に なってから。説明は 本物の 試験問題では ないので、試験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、料理の ことばと しくみが つながって 見えてくるよ。都道府県・厚生労働省とは 関係ありません。"),
    # フリック警察官(けいくん 2026-10-01「警察官になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→「全部おすすめで」)。
    #   ことばは tools/keisatsu/terms-<旅>.json → keisatsu/terms.js(tools/keisatsu/terms_js.py)。しくみは keisatsu/keisatsu.js(KEISATSU。chef.js を 写した)。
    #   ⚠️⚠️ 小学生も あそぶので 犯罪の やりかた・武器・取りしまりや 逮捕の 手順は のせない。「警察官が どう 守るか」の 書きかただけ(決まりは tools/keisatsu/PROMPT.md)
    #   絵(2026-10-01): けいくんの ChatGPT の 絵。字の まちがい 2か所(せせん・黒板)は tools/keisatsu/fix_text.py で 絵の 中で 直した。
    #   題名は tools/keisatsu/logo_cut.py(紺の ふちに かこまれた 字の 中身から GrabCut。帯・帽子・建物・えんぴつは 箱で 落とす)
    "keisatsu": dict(name="フリック警察官", modes="KEISATSU", kinds=set(), color="#1d6bff", hero=True, logo=True,
                 art=dict(word=(633, 174), hero=(1536, 1024), alt="フリック警察官。まちの 交番の 前で 制服の 男の子の 警察官と 白い 犬が 笑っている 絵。まわりに 7つの 旅の ことばの 札と 4択クイズの 見本が ならんでいる", iconv=2, wordv=1),
                 lead="交番と まちの ことば・交通・事件と 捜査・まもる しくみ・法律・警察の しくみ・警察官の 心と からだの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、学ぶ 分野・しくみ図の どこに あるのかが 出るよ。まちで 見かける ことばから はじめて、警察官採用試験の 教養試験の 範囲の めやす・法律や 組織の こまかい ことばまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。本物の 試験問題では ありません。犯罪の やりかたや 取りしまりの 手順は のせていないよ。こまった ときは 110番 か 近くの 交番へ。試験の 勉強には 各都道府県警察の 採用案内や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、警察の ことばと しくみが つながって 見えてくるよ。警察庁・都道府県警察とは 関係ありません。"),
    # フリック消防士(けいくん 2026-10-01「消防士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめ」。まとめは docs/フリック消防士-はじめかた.md)。
    #   ことばは tools/shobo/terms-<旅>.json → shobo/terms.js(tools/shobo/terms_js.py)。しくみは shobo/shobo.js(SHOBO。keisatsu.js を 写した)。
    #   ⚠️⚠️ 小学生も あそぶので 火の つけかた・危険物の あつかい・救命処置の 手順は のせない。「消防士が どう 守るか」の 書きかただけ(決まりは tools/shobo/PROMPT.md)
    #   絵(2026-10-01): けいくんの ChatGPT の 絵。1回目は 札の ことば 8こが ゲームに 無い・けが人と 手当て・こわれた 家の 絵が あったので 入れず、直してもらった。
    #   2回目は 図鑑の 見本の 説明「くるいの あるい人」を 絵の 中で 直した(tools/shobo/fix_text.py)。題名は tools/shobo/logo_cut.py(GrabCut)
    "shobo": dict(name="フリック消防士", modes="SHOBO", kinds=set(), color="#e0202e", hero=True, logo=True,
                  art=dict(word=(676, 178), hero=(1536, 1024), alt="フリック消防士。消防署の 前で 防火服の 男の子が 指さして 笑っていて、となりに 白い 犬が いる 絵。まわりに 7つの 旅の ことばと 4択クイズと 図鑑が ならんでいる", iconv=2, wordv=1),
                 lead="消防車と 道具・火と 消火・救急と 救助・火事を ふせぐ・災害と 消防・消防の 法律と しくみ・消防士の 心と からだの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、学ぶ 分野・しくみ図の どこに あるのかが 出るよ。まちで 見かける ことばから はじめて、消防官採用試験の 教養試験と 消防学校で 学ぶ ことばの めやす・消防設備士や 危険物取扱者の ことばまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。本物の 試験問題では ありません。火の つけかたや 救命処置の 手順は のせていないよ。火を 使う ときは かならず 大人と いっしょに。火事や けがの ときは 119番。試験の 勉強には 各消防本部の 採用案内や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、消防の ことばと しくみが つながって 見えてくるよ。総務省消防庁・市町村の 消防とは 関係ありません。"),
    # フリック弁護士(けいくん 2026-10-01「弁護士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」。まとめは docs/フリック弁護士-はじめかた.md)。
    #   ことばは tools/bengoshi/terms-<旅>.json → bengoshi/terms.js(tools/bengoshi/terms_js.py)。しくみは bengoshi/bengoshi.js(BENGOSHI。keisatsu.js を 写した)。
    #   ⚠️⚠️ 小学生も あそぶので 犯罪の やりかた・法律の 抜け道・相談の 答えに なる 書きかたは のせない。「法律が どう 守るか・弁護士が どう 助けるか」だけ(決まりは tools/bengoshi/PROMPT.md)
    #   絵(2026-10-01): けいくんの ChatGPT の 絵(2回目)。字の まちがい 3か所(じゅうけん・はいばい・レベル2の 文)は tools/bengoshi/fix_text.py で 絵の 中で 直した。
    #   題名は tools/bengoshi/logo_cut.py(紺の ふちの 中を うめて GrabCut)。アイコンは 正方形の 絵が まだ 無いので トップの 絵の まん中(ふたりと 犬)を 切った もの
    "bengoshi": dict(name="フリック弁護士", modes="BENGOSHI", kinds=set(), color="#8a2be0", hero=True, logo=True,
                 art=dict(word=(668, 153), hero=(1536, 1024), alt="フリック弁護士。裁判所の 前で スーツの 男の子と 女の子が 指さして 笑っていて、まんなかに 白い 犬が いる 絵。まわりに 7つの 旅の ことばの 札と 4択クイズの 見本が ならんでいる", iconv=2, wordv=1),
                 lead="法律の きほん・憲法・民法と くらし・刑法と 刑事の てつづき・裁判所と てつづき・弁護士の 仕事・法律の 歴史と 世界の ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、学ぶ 分野・しくみ図の どこに あるのかが 出るよ。ニュースで 聞く ことばから はじめて、法学部・予備試験の 短答式の 範囲の めやす・商法や 訴訟法の ことばまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。本物の 試験問題でも、法律相談の 答えでも ありません。本当に 困った ときは 大人に 言って、弁護士や 法テラスに 相談してね。試験の 勉強には 法科大学院・予備試験の 教科書や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、法律の ことばと しくみが つながって 見えてくるよ。法務省・裁判所・日本弁護士連合会とは 関係ありません。"),
    # フリック税理士(けいくん 2026-10-01「税理士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いと「差し押さえ・脱税は 入れるか」に「すべておすすめで」。まとめは docs/フリック税理士-はじめかた.md)。
    #   ことばは tools/zeirishi/terms-<旅>.json → zeirishi/terms.js(tools/zeirishi/terms_js.py)。しくみは zeirishi/zeirishi.js(ZEIRISHI。bengoshi.js を 写した)。
    #   ⚠️⚠️ 節税の テクニック・脱税・抜け道・税務相談の 答え・税率や 金額の 数字は のせない。差し押さえ・脱税の 事件も 入れない(決まりは tools/zeirishi/PROMPT.md)
    #   絵は けいくんの ChatGPT の 絵が 届くまで 無し(題名は 文字・アイコンは tools/zeirishi/placeholder_icon.py の 仮の もの)
    "zeirishi": dict(name="フリック税理士", modes="ZEIRISHI", kinds=set(), color="#0a9396", hero=False, logo=False,
                 lead="税金の きほん・くらしの 税金・会社の 税金・簿記と 会計・相続と 贈与・税理士の 仕事・税の 歴史と 世界の ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、学ぶ 分野・しくみ図の どこに あるのかが 出るよ。くらしや ニュースで 聞く ことばから はじめて、税理士試験の 簿記論・財務諸表論・税法の 範囲の めやす・国際税務の ことばまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。本物の 試験問題でも、税務相談の 答えでも ありません。税率や 金額は 年ごとに 変わるので のせていないよ。本当の 税金の ことは 大人に 言って、税務署や 税理士に 相談してね。試験の 勉強には 国税庁の 税理士試験の ページや 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、税と 会計の ことばと しくみが つながって 見えてくるよ。国税庁・税務署・日本税理士会連合会とは 関係ありません。"),
    # フリックゲームクリエイター(けいくん 2026-09-29「ゲームクリエイターになるために必要な 知識をフリック形式の問題にしてください」→ 課金・ガチャは「A」= 入れない)。
    #   ことばは tools/gamedev/terms-<旅>.json → gamedev/terms.js(tools/gamedev/terms_js.py)。しくみは gamedev/gamedev.js(GAMEDEV。kango.js を 写した)。
    #   旅は 8つ + マスター(8つめ ⌨️ コードと作りかた は 2026-09-29「コードの書きかたや作りかたは必要? 必要なら追加して」で 足した)。むずかしさは 入門(あそぶ 人でも 知っている)→ 中級(作りはじめる)→ 上級(専門学校・大学で 学ぶ めやす)→ プロ(ゲーム会社の 現場の めやす)。けいくん「本当にゲームクリエイターになれるレベルに」。
    #   ⚠️⚠️ AI旅行と 同じ ことばは 入れない・本当の ゲームの 題名や 会社の 名前・お金の ことばは 出さない(決まりは tools/gamedev/PROMPT.md)。
    #   絵(2026-09-29): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリックゲームクリエイター」。題名は tools/gamedev/logo_cut.py(GrabCut)。
    #   ⚠️ 1回目の 絵は 見本の ことばが AI旅行の ことば(ぷろぐらむ・ばぐ・てすと …)・ゲームエンジンの ロゴに そっくり・4択に 正解が 無い ので 入れず、けいくんに 直してもらった
    "gamedev": dict(name="フリックゲームクリエイター", modes="GAMEDEV", kinds=set(), color="#7048e8", hero=True, logo=True,
                    art=dict(word=(796, 138), hero=(1536, 1024), alt="フリックゲームクリエイター。ゲームを 作る 部屋で 男の子と 犬が 手を のばして 笑っている 絵。まわりに 7つの 旅の ことばが ならんでいる", iconv=1, wordv=1),
                    lead="ゲームの きほん・考えて 決める・うごかす しくみ・絵と 音・作る 道具・直して 仕上げる・みんなに とどける・コードと 作りかたの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、どの 仕事の 人の ことばか・しくみ図の どこに あるのかが 出るよ。あそぶ 人でも 知っている ことばから、ゲーム会社の 現場で 使う プロの ことばまで 4段。4択クイズも できるよ。",
                    how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。⌨️ コードと作りかた の 旅では、「たとえば」に 短い コードの 見本も 出るよ。ゲームは 紙と えんぴつでも 作れるよ。まずは 小さく 作って ためしてみよう。",
                    rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、ゲームを 作る ことばと しくみが つながって 見えてくるよ。"),
    # フリック美容師(けいくん 2026-09-29「美容師になれるレベルで」「ぜんぶおすすめで」)。
    #   ことばは tools/biyo/terms-<旅>.json → biyo/terms.js(tools/biyo/terms_js.py)。しくみは biyo/biyo.js(BIYO。kango.js を 写した)。
    #   旅は 8つ + マスター(8つめ ⌨️ コードと作りかた は 2026-09-29「コードの書きかたや作りかたは必要? 必要なら追加して」で 足した)。むずかしさは 入門 → 中級(美容師国家試験の 筆記の めやす)→ 上級(こまかい 化学・制度・歴史の めやす)。
    #   ⚠️⚠️ 薬の 混ぜかた・時間・濃さ・はさみの 使いかたは のせない。見た目を わるく 言わない。ほかの ゲームと 同じ 見出しを 入れない(決まりは tools/biyo/PROMPT.md)。
    #   絵(2026-09-29): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリック美容師」。⚠️ 1回目は レベルが 4段(ゲームは 3段)・「れじ」「¥」(お金)・
    #   ゲームに 無い ことば(pH・てあらい・ますく …)だったので 入れず、けいくんに 直してもらった。題名は tools/biyo/logo_cut.py(GrabCut)
    "biyo": dict(name="フリック美容師", modes="BIYO", kinds=set(), color="#d6336c", hero=True, logo=True,
                 art=dict(word=(746, 184), hero=(1536, 1024), alt="フリック美容師。花の かざられた 美容室で はさみを もった 男の人と ドライヤーを もった 女の人と 犬が 笑っている 絵", iconv=1, wordv=1),
                 lead="カットと スタイル・パーマと カラー・髪と 肌の しくみ・美容の 化学・清潔と 衛生・メイク ネイル 着付け・お店と しくみの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、試験の どの 課目か・しくみ図の どこに あるのかが 出るよ。美容室で 聞く ことばから はじめて、美容師国家試験の 範囲の めやすまで。4択クイズで 試験の 練習も できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。これは ことばを おぼえる ゲームです。薬を 使う ことは、美容師さんに おまかせ。パーマ液や カラー剤の 使いかた・はさみや かみそりの あつかいかたは のせていないよ。説明は 本物の 試験問題では ないので、試験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、美容の ことばと しくみが つながって 見えてくるよ。厚生労働省・理容師美容師試験研修センターとは 関係ありません。"),
    # フリック恐竜図鑑(けいくん 2026-09-29「恐竜博士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「すべておすすめで」)。
    #   ことばは tools/kyoryu/terms-<旅>.json → kyoryu/terms.js(tools/kyoryu/terms_js.py)。しくみは kyoryu/kyoryu.js(KYORYU。biyo.js を 写した)。
    #   旅は 8つ + マスター(8つめ ⌨️ コードと作りかた は 2026-09-29「コードの書きかたや作りかたは必要? 必要なら追加して」で 足した)。むずかしさは 入門(だれでも 知っている)→ 中級(図鑑に のっている)→ 上級(恐竜博士)。
    #   見つかった 場所は 世界地図(world-map-color.jpg)に 📍、いた 時代は コードで 描く 年表に 📍。写真は あとから 足す(いまは 絵文字の カード)。
    #   ⚠️⚠️ 古い 知識を 書かない・恐竜では ない 生きものを 恐竜と 書かない(決まりは tools/kyoryu/PROMPT.md)。
    #   絵(2026-09-29): けいくんの ChatGPT の 絵。題名は 絵と 同じ「フリック恐竜図鑑」。1回目は 4択クイズが 美容師の 問題・「しけんに でる」・ゲームに 無い ことばで 入れなかった。
    #   2回目で「てぃらのさうるす」の 小さい「ぃ」だけ 直らなかったので 絵の 中で 直した(tools/kyoryu/fix_small_i.py)。題名は tools/kyoryu/logo_cut.py(GrabCut)
    "kyoryu": dict(name="フリック恐竜図鑑", modes="KYORYU", kinds=set(), color="#2f9e44", hero=True, logo=True,
                   art=dict(word=(651, 156), hero=(1536, 1024), alt="フリック恐竜図鑑。ティラノサウルスや トリケラトプスの いる ジャングルで 図鑑を もった 男の子が 指さして 笑っている 絵。まわりに 7つの 旅の 札が ならんでいる", iconv=1, wordv=1),
                   lead="肉を 食べる 恐竜・草を 食べる 恐竜・日本の 恐竜・3つの 時代・体と 化石・恐竜では ない 生きもの・調べる 人と 道具を、ひらがなで フリック入力。打つと その 恐竜の いた 時代と、見つかった 場所(世界地図の 📍)が 出るよ。だれでも 知っている 恐竜から はじめて、めざせ 恐竜博士。",
                   how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。「ヴ」の 入った 名前は ば行でも OK(べろきらぷとる)。恐竜の 研究は 毎年 新しく なるので、あとから 考えが 変わる ことも あるよ。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、恐竜の 名前と 時代と 場所が つながって 見えてくるよ。"),
    # フリック英語(けいくん 2026-09-29「0はOK / A / すべておすすめで」= 名前 フリック英語・9旅・3段・打つ字 35字まで・訳は 打ち終わってから)。
    #   英会話(eikaiwa/)が「話す・通じる」、こちらは「入試で 点を 取る」文法の 例文。例文は tools/eigo/terms-<旅>.json → eigo/terms.js(tools/eigo/terms_js.py)。
    #   しくみは eigo/eigo.js(EIGO。tools/eigo/make_eigo_js.py が kokugo.js から 作る。英字を 打つ しくみと 🔊 は 英会話から)。
    #   絵(2026-09-30): けいくんの ChatGPT の 絵。絵の 中の「ook forward to」を「look」に・読めない 字の 帯を 消して から 入れた。題名は tools/eigo/logo_cut.py / アイコン = 四角い 絵を 縮めた もの
    "eigo": dict(name="フリック英語", modes="EIGO", kinds=set(), color="#0b7285", hero=True, logo=True,
                 art=dict(word=(590, 157), hero=(1536, 1024), alt="フリック英語。ロンドンと ニューヨークの 町で 男の子と 白い 犬が 旅をしながら、不規則動詞・時制・受動態・不定詞と動名詞・分詞・関係詞・比較・仮定法・熟語の 例文の カードに かこまれている 絵", iconv=3, wordv=3),
                 lead="不規則動詞・時制・受動態・不定詞と動名詞・分詞・関係詞・比較・仮定法・熟語を、例文を フリックで 打ち写して おぼえよう。打ち終わると 日本語訳と 文法の ポイントが 出て、🔊で 発音も 聞けるよ。中学の 基本から はじめて、高校受験・大学受験の 範囲の めやすまで。",
                 how="表示された 英語を、そのまま打ち写してね。大文字・小文字は どちらでも OK。空白や「' , . ? !」は 打たなくても すすむよ。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。例文は 本物の 入試問題では ないので、受験の 勉強には 学校の 教科書や 問題集も 使ってね。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。iPhone は 日本語キーボードの「ABC」なら フリックで 英語が 打てるよ。大学入試センター・各都道府県の 教育委員会とは 関係ありません。"),
    # フリックプログラマー(けいくん 2026-09-29「プログラマーになれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 4つの 問いに「おすすめ」)。
    #   名前 = フリックプログラマー(中に 👷 エンジニアの 旅。フォルダ名 `code` は 変えない)。3段・言語は 少しだけ・2進数/16進数を 入れる・図を 作る。
    #   ことばは tools/code/terms-<旅>.json → code/terms.js(tools/code/terms_js.py)。しくみは code/code.js(CODEPG。gamedev.js を 写した)。
    #   ⚠️ AI旅行・ゲームクリエイターと 同じ ことばは 入れて よい(復習)。説明は 作る 側の 目線(決まりは tools/code/PROMPT.md)
    #   絵(2026-09-30): けいくんの ChatGPT の 絵。1回目は ことば 7つ(じょうしき・きほんそうさ・じかんふくざつど・段の 名前 など)が ちがったので 入れず、直してもらった。
    #   2回目も コードの 箱の 記号が ずれて 動かない 形だったので 絵の 中で 書きなおした(tools/code/fix_code_box.py)。題名は tools/code/logo_cut.py(GrabCut)
    "code": dict(name="フリックプログラマー", modes="CODEPG", kinds=set(), color="#1971c2", hero=True, logo=True,
                 art=dict(word=(702, 132), hero=(1536, 1024), alt="フリックプログラマー。パソコンの 前で 男の子が 指さして 笑っていて、となりに ロボットが いる 絵。まわりに 8つの 旅の ことばと 4択クイズと しくみ図が ならんでいる", iconv=1, wordv=1),
                 lead="入れものと 型・ながれを 決める・まとめて 作る・まちがいと 直しかた・速さと 大きさ・コンピュータの きほん・みんなで 作る・エンジニアの 旅の ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、どの 分野の ことばか・しくみ図の どこに あるのかが 出るよ。学校の プログラミングで 出る ことばから、仕事で 使う エンジニアの ことばまで。4択クイズも できるよ。",
                 how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。コードは 打たないよ(打つのは ことばの 読みだけ)。「たとえば」に 短い コードの 見本が 出る ことばも あるよ。まちがえるのは ふつうの こと。小さく 作って ためしてみよう。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、プログラミングの ことばと しくみが つながって 見えてくるよ。"),
    # フリック社会(けいくん 2026-09-29「すべておすすめで」)。受験5科目の 社会のうち 公民と 地理(歴史は rekishi/ に ある)。引継ぎは docs/引継ぎ-社会フリック旅行.md
    #   ことばは tools/shakai/terms-<旅>.json → shakai/terms.js(tools/shakai/terms_js.py)。しくみは shakai/shakai.js(SHAKAI。kokugo.js から tools/shakai/make_shakai_js.py が 作る)。
    #   旅は 7つ + マスター。むずかしさは 入門(中学の基本)→ 中級(高校受験)→ 上級(大学受験)。図は 日本の 地方(📍は 日本の地理だけ)。
    #   絵(2026-09-29): けいくんの ChatGPT の 絵(3回目)。「けいざい」の 濁点だけ tools/shakai/fix_keizai.py で 絵の 中で 足した。題名は tools/shakai/logo_cut.py で 切りぬいた / アイコンは 四角い 絵を 縮めた もの。名前は 絵の 題名に そろえて「フリック社会旅行」
    "shakai": dict(name="フリック社会旅行", modes="SHAKAI", kinds=set(), color="#0c8599", hero=True, logo=True,
                   art=dict(word=(671, 117), hero=(1536, 1024), alt="フリック社会旅行。世界の 名所を 背に 地図と カメラを もった 男の子と 白い 犬が 指さして 笑っている 絵。まわりに 憲法と人権・政治・経済・国際社会・日本の地理・世界の地理・地図の読みかたの 札", iconv=3, wordv=3),
                   lead="憲法と人権・政治のしくみ・経済のしくみ・国際社会・日本の地理・世界の地理・地図の読みかたの ことばを、ひらがなで フリック入力。打つと その ことばの 意味と、いまの しくみの どこに つながるのかが 出るよ。中学の 基本から はじめて、高校受験・大学受験の 範囲の めやすまで。4択クイズで 意味の 練習も できるよ。",
                   how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。しくみや 数字は 2026年9月の 時点で 書いているよ。説明は 本物の 入試問題では ないので、受験の 勉強には 学校の 教科書や 問題集も 使ってね。歴史は フリック歴史旅行で あそべるよ。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、社会の しくみと 地理が つながって 見えてくるよ。大学入試センター・各都道府県の 教育委員会とは 関係ありません。"),
}

# 会社の コース: kabu.js が 読めなかったときも ページが 止まらないように
KABU_MODES = '(typeof KABU === "object" ? KABU.modes : [])'
PLUG_MODES = {"KABU": KABU_MODES, "AITABI": '(typeof AITABI === "object" ? AITABI.modes : [])', "EIKAIWA": '(typeof EIKAIWA === "object" ? EIKAIWA.modes : [])', "SEIBI": '(typeof SEIBI === "object" ? SEIBI.modes : [])', "PATISSIER": '(typeof PATISSIER === "object" ? PATISSIER.modes : [])', "KOKUGO": '(typeof KOKUGO === "object" ? KOKUGO.modes : [])', "SUGAKU": '(typeof SUGAKU === "object" ? SUGAKU.modes : [])', "HOIKU": '(typeof HOIKU === "object" ? HOIKU.modes : [])', "KANGO": '(typeof KANGO === "object" ? KANGO.modes : [])', "ISHI": '(typeof ISHI === "object" ? ISHI.modes : [])', "KYOSHI": '(typeof KYOSHI === "object" ? KYOSHI.modes : [])', "CHEF": '(typeof CHEF === "object" ? CHEF.modes : [])', "KEISATSU": '(typeof KEISATSU === "object" ? KEISATSU.modes : [])', "SHOBO": '(typeof SHOBO === "object" ? SHOBO.modes : [])', "BENGOSHI": '(typeof BENGOSHI === "object" ? BENGOSHI.modes : [])', "ZEIRISHI": '(typeof ZEIRISHI === "object" ? ZEIRISHI.modes : [])', "GAMEDEV": '(typeof GAMEDEV === "object" ? GAMEDEV.modes : [])', "BIYO": '(typeof BIYO === "object" ? BIYO.modes : [])', "KYORYU": '(typeof KYORYU === "object" ? KYORYU.modes : [])', "CODEPG": '(typeof CODEPG === "object" ? CODEPG.modes : [])', "EIGO": '(typeof EIGO === "object" ? EIGO.modes : [])', "SHAKAI": '(typeof SHAKAI === "object" ? SHAKAI.modes : [])'}

def build(gid, g):
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    out = src
    # ⚠️ 世界(土台)の 絵は ?v=3(2026-09-26 に「フリック世界旅行」の 絵へ 差しかえた)。
    #   ほかの ゲームは 自分の 絵(か まだ 無い)なので、世界の 数字を 前の 形に もどしてから 作る(ほかの ゲームの 住所は 変えない)
    # ⚠️ apple-touch-icon・manifest・apple-mobile-web-app-title は 2026-09-30 から かずとも本体の もの(ゲームごとに 変えない)
    for a_, b_ in (('href="favicon.png?v=3"', 'href="favicon.png?v=2"'),
                   ('src="logo-mark2.webp?v=3"', 'src="logo-mark2.webp"'), ('src="logo-word.webp?v=3" alt="" width="1166" height="208"', 'src="logo-word.webp" alt="" width="1170" height="209"'),
                   ('<img class="hero" src="hero.webp?v=3"', '<img class="hero" src="hero.webp"')):
        assert out.count(a_) == 1, a_; out = out.replace(a_, b_)
    # head
    out = out.replace("<title>フリック世界旅行</title>", f"<title>{g['name']}</title>")
    art = g.get("art")  # その ゲームの 絵(hero / 題名 / アイコン)が フォルダに あるとき
    if art:
        # 絵・アイコンは その フォルダの ものを 使う(名前は 世界と 同じ なので 道は そのまま)
        out = out.replace('width="1170" height="209"', 'width="%d" height="%d"' % art["word"])
        # 題名・トップの 絵を 差しかえたら wordv を 上げる(古い 絵を おぼえている 端末のため)
        out = out.replace('src="logo-word.webp"', 'src="logo-word.webp?v=%d"' % art.get("wordv", 2))
        if art.get("iconv"):  # アイコンを 差しかえたら 数字を 上げる(iPhone が 古い アイコンを おぼえているため)
            v = "?v=%d" % art["iconv"]
            out = out.replace('favicon.png?v=2"', 'favicon.png' + v + '"').replace('src="logo-mark2.webp"', 'src="logo-mark2.webp' + v + '"')  # 題名を 切りなおしたら 数字を 上げる(古い 絵を おぼえているため)
        out, n = re.subn(r'<img class="hero" src="hero.webp" alt="[^"]*" width="1536" height="1024">',
                         '<img class="hero" src="hero.webp%s" alt="%s" width="%d" height="%d">' % ("?v=%d" % art["wordv"] if art.get("wordv") else "", art["alt"], *art["hero"]), out); assert n == 1
    else:
        out = out.replace('href="favicon.png?v=2"', 'href="../favicon.png?v=2"')
        # 絵が まだ無い ゲーム(株式フリック旅行): トップの絵と ロゴの 画像を 最初から 置かない(無い ファイルを 読みにいかない)。題名は 文字
        out, n = re.subn(r'\s*<img class="hero" src="hero.webp"[^>]*>', "", out); assert n == 1
        out, n = re.subn(r'<img class="logo-mark" src="logo-mark2.webp"[^>]*>\s*<img class="logo-word" src="logo-word.webp"[^>]*>',
                         lambda _: '<span class="logo-text">%s</span>' % g["name"], out); assert n == 1
    if art and not g["hero"]:  # 題名・アイコンは あるが トップの 絵は まだ 無い(国語): 無い 絵を 読みにいかない
        out, n = re.subn(r'\s*<img class="hero" [^>]*>', "", out); assert n == 1
    out = out.replace('<script src="photos.js"></script>', '<script src="../photos.js"></script>')
    out = out.replace('<img id="map-img" src="world-map-color.jpg"', '<img id="map-img" src="../world-map-color.jpg"')  # 地図の 絵は 世界の フォルダに ある
    out = out.replace('<h1 class="sr-only">フリック世界旅行</h1>', f'<h1 class="sr-only">{g["name"]}</h1>')
    if g["modes"] == "KABU":  # 会社の コース: 旅の 名前は kabu/kabu.js が 決める(KABU.modes)。会社データは companies.js
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="companies.js"></script>\n<script src="kabu.js"></script>')
        import subprocess, sys as _s; subprocess.run([_s.executable, str(ROOT / "tools/kabu/companies_js.py")], check=True)
    if g["modes"] == "AITABI":  # AIの コース: ことばは terms.js(data/aiTerms.json から)、しくみは ai.js
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js"></script>\n<script src="ai.js"></script>')
        import subprocess, sys as _s; subprocess.run([_s.executable, str(ROOT / "tools/ai/terms_js.py")], check=True)
    if g["modes"] == "EIKAIWA":  # 英会話の コース: ことばは english.js(data/english.json から)、しくみは eikaiwa.js。打つのは 英字なので 入力欄を 英語に
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/eikaiwa/english_js.py")], check=True)
        # ⚠️ iPhone が 古い ファイルを おぼえていて 直した 画面が 出なかった(2026-09-26)→ 中身が かわると 住所の ?v= も かわる
        ver = lambda f: hashlib.sha1((ROOT / "eikaiwa" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="english.js?v=%s"></script>\n<script src="eikaiwa.js?v=%s"></script>' % (ver("english.js"), ver("eikaiwa.js")))
        out, n = re.subn(r'<input class="answer" id="ans" type="text" lang="ja"', '<input class="answer" id="ans" type="text" lang="en"', out); assert n == 1
        out, n = re.subn(r'<p>漢字に変換しなくてOK。句読点やスペースは打たなくて大丈夫。</p>', '<p>大文字・小文字は どちらでも OK。空白や「\' , . ? !」は 打たなくて大丈夫。</p>', out); assert n == 1
    if g["modes"] == "SEIBI":  # 整備の コース: ことばは terms.js(tools/seibi/terms-*.json から)、しくみは seibi.js。中身が かわると ?v= も かわる
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/seibi/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "seibi" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="seibi.js?v=%s"></script>' % (ver("terms.js"), ver("seibi.js")))
    if g["modes"] == "PATISSIER":  # パティシエの コース: 整備と 同じ 形。ことばは terms.js(tools/patissier/terms-*.json から)、しくみは patissier.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/patissier/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "patissier" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="patissier.js?v=%s"></script>' % (ver("terms.js"), ver("patissier.js")))
    if g["modes"] == "KOKUGO":  # 国語の コース: パティシエと 同じ 形。ことばは terms.js(tools/kokugo/terms-*.json から)、しくみは kokugo.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/kokugo/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "kokugo" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="kokugo.js?v=%s"></script>' % (ver("terms.js"), ver("kokugo.js")))
    if g["modes"] == "HOIKU":  # 保育の コース: パティシエと 同じ 形。ことばは terms.js(tools/hoiku/terms-*.json から)、しくみは hoiku.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/hoiku/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "hoiku" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="hoiku.js?v=%s"></script>' % (ver("terms.js"), ver("hoiku.js")))
    if g["modes"] == "GAMEDEV":  # ゲーム作りの コース: 看護と 同じ 形。ことばは terms.js(tools/gamedev/terms-*.json から)、しくみは gamedev.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/gamedev/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "gamedev" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="gamedev.js?v=%s"></script>' % (ver("terms.js"), ver("gamedev.js")))
    if g["modes"] == "BIYO":  # 美容の コース: 看護と 同じ 形。ことばは terms.js(tools/biyo/terms-*.json から)、しくみは biyo.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/biyo/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "biyo" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="biyo.js?v=%s"></script>' % (ver("terms.js"), ver("biyo.js")))
    if g["modes"] == "KYORYU":  # 恐竜の コース: 美容と 同じ 形。ことばは terms.js(tools/kyoryu/terms-*.json から)、しくみは kyoryu.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/kyoryu/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "kyoryu" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="kyoryu.js?v=%s"></script>' % (ver("terms.js"), ver("kyoryu.js")))
    if g["modes"] == "CODEPG":  # プログラミングの コース: ゲームクリエイターと 同じ 形。ことばは terms.js(tools/code/terms-*.json から)、しくみは code.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/code/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "code" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="code.js?v=%s"></script>' % (ver("terms.js"), ver("code.js")))
    if g["modes"] == "EIGO":  # 英語の コース: 国語と 同じ 形 + 英会話と 同じ 英字の 入力欄。例文は terms.js(tools/eigo/terms-*.json から)、しくみは eigo.js(make_eigo_js.py が 作る)
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/eigo/terms_js.py")], check=True); subprocess.run([_s.executable, str(ROOT / "tools/eigo/make_eigo_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "eigo" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="eigo.js?v=%s"></script>' % (ver("terms.js"), ver("eigo.js")))
        out, n = re.subn(r'<input class="answer" id="ans" type="text" lang="ja"', '<input class="answer" id="ans" type="text" lang="en"', out); assert n == 1
        out, n = re.subn(r'<p>漢字に変換しなくてOK。句読点やスペースは打たなくて大丈夫。</p>', '<p>大文字・小文字は どちらでも OK。空白や「\' , . ? !」は 打たなくて大丈夫。</p>', out); assert n == 1
    if g["modes"] == "SHAKAI":  # 社会の コース: 国語と 同じ 形。ことばは terms.js(tools/shakai/terms-*.json から)、しくみは shakai.js(make_shakai_js.py が 作る)
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/shakai/terms_js.py")], check=True)
        subprocess.run([_s.executable, str(ROOT / "tools/shakai/make_shakai_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "shakai" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="shakai.js?v=%s"></script>' % (ver("terms.js"), ver("shakai.js")))
    if g["modes"] == "KANGO":  # 看護の コース: 保育と 同じ 形。ことばは terms.js(tools/kango/terms-*.json から)、しくみは kango.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/kango/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "kango" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="kango.js?v=%s"></script>' % (ver("terms.js"), ver("kango.js")))
    if g["modes"] == "ISHI":  # 医師の コース: 看護と 同じ 形。ことばは terms.js(tools/ishi/terms-*.json から)、しくみは ishi.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/ishi/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "ishi" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="ishi.js?v=%s"></script>' % (ver("terms.js"), ver("ishi.js")))
    if g["modes"] == "KYOSHI":  # 教師の コース: 医師と 同じ 形。ことばは terms.js(tools/kyoshi/terms-*.json から)、しくみは kyoshi.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/kyoshi/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "kyoshi" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="kyoshi.js?v=%s"></script>' % (ver("terms.js"), ver("kyoshi.js")))
    if g["modes"] == "CHEF":  # 料理人の コース: 教師と 同じ 形。ことばは terms.js(tools/chef/terms-*.json から)、しくみは chef.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/chef/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "chef" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="chef.js?v=%s"></script>' % (ver("terms.js"), ver("chef.js")))
    if g["modes"] == "KEISATSU":  # 警察官の コース: 料理人と 同じ 形。ことばは terms.js(tools/keisatsu/terms-*.json から)、しくみは keisatsu.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/keisatsu/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "keisatsu" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="keisatsu.js?v=%s"></script>' % (ver("terms.js"), ver("keisatsu.js")))
    if g["modes"] == "SHOBO":  # 消防士の コース: 警察官と 同じ 形。ことばは terms.js(tools/shobo/terms-*.json から)、しくみは shobo.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/shobo/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "shobo" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="shobo.js?v=%s"></script>' % (ver("terms.js"), ver("shobo.js")))
    if g["modes"] == "BENGOSHI":  # 弁護士の コース: 警察官と 同じ 形。ことばは terms.js(tools/bengoshi/terms-*.json から)、しくみは bengoshi.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/bengoshi/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "bengoshi" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="bengoshi.js?v=%s"></script>' % (ver("terms.js"), ver("bengoshi.js")))
    if g["modes"] == "ZEIRISHI":  # 税理士の コース: 弁護士と 同じ 形。ことばは terms.js(tools/zeirishi/terms-*.json から)、しくみは zeirishi.js
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/zeirishi/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "zeirishi" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="zeirishi.js?v=%s"></script>' % (ver("terms.js"), ver("zeirishi.js")))
    if g["modes"] == "SUGAKU":  # 数学の コース: 国語と 同じ 形。ことばは terms.js(tools/sugaku/terms-*.json から)、しくみは sugaku.js(make_sugaku_js.py が 作る)
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/sugaku/terms_js.py")], check=True); subprocess.run([_s.executable, str(ROOT / "tools/sugaku/make_sugaku_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "sugaku" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="sugaku.js?v=%s"></script>' % (ver("terms.js"), ver("sugaku.js")))
    # GAME
    out, n = re.subn(r"const GAME = \{.*?\};", lambda _: f'const GAME = {{ id:"{gid}", name:"{g["name"]}", modes:{PLUG_MODES[g["modes"]] if isinstance(g["modes"], str) else json.dumps(g["modes"])}, assets:"../", logo:{str(g["logo"]).lower()}, hero:{str(g["hero"]).lower()}, dir:"{gid}/", lead:{json.dumps(g.get("lead",""), ensure_ascii=False)}, how:{json.dumps(g.get("how",""), ensure_ascii=False)}, rule:{json.dumps(g.get("rule",""), ensure_ascii=False)} }};', out, count=1, flags=re.S)
    assert n == 1
    # 問題: もとの100か所を 空に、追加ぶんは この ゲームの kind だけ
    out, n = re.subn(r"const SPOTS = \[\n.*?\n\];", "const SPOTS = [\n];", out, count=1, flags=re.S); assert n == 1
    a = out.index("SPOTS-MORE-START */"); b = out.index("/* SPOTS-MORE-END */")
    block = out[a:b]
    kept = []
    keys = set()
    for line in block.split("\n"):
        m = re.match(r'  \{n:"[^"]*", c:"[^"]*", r:"[^"]*", art:"(\w+)", k:"(\w+)"', line)
        if m and m.group(2) in g["kinds"]:
            kept.append(line.rstrip(",")); keys.add(m.group(1))
    ll = re.search(r"Object\.assign\(LATLON, \{(.*?)\}\);", block, flags=re.S).group(1)
    ll_kept = ", ".join(x for x in ll.split(", ") if x.split(":")[0] in keys)
    newblock = "SPOTS-MORE-START */\nSPOTS.push(\n" + ",\n".join(kept) + "\n);\nObject.assign(LATLON, {" + ll_kept + "});\n"
    out = out[:a] + newblock + out[b:]
    # ふりがな: この ゲームの key だけ
    a = out.index("RUBY-START */"); b = out.index("/* RUBY-END */")
    lines = out[a:b].split("\n"); kept_r = []
    for line in lines:
        m = re.match(r' "([^"|]+)(?:\|\w+)?": ', line)
        if m is None or m.group(1) in keys: kept_r.append(line)
    out = out[:a] + "\n".join(kept_r) + out[b:]
    # FAME は 名所だけの もの
    out, n = re.subn(r"const FAME = \{.*?\};", "const FAME = {};", out, count=1, flags=re.S)
    d = ROOT / gid; d.mkdir(exist_ok=True)
    (d / "index.html").write_text(out, encoding="utf-8")
    (d / "manifest.webmanifest").write_text(json.dumps({
        "name": g["name"], "short_name": g["name"], "start_url": "./", "scope": "/", "display": "standalone",  # scope は kazutomo.app ぜんぶ(2026-09-30。ホーム画面の アプリの 中で ほかの ゲーム・ログインへ 行っても 同じ アプリ = 同じ ログインの まま)
        "background_color": g["color"], "theme_color": g["color"],
        "icons": [{"src": ("" if art else "../") + "icon-512.png?v=" + str((art or {}).get("iconv", 2)), "sizes": "512x512", "type": "image/png"}, {"src": ("" if art else "../") + "apple-touch-icon.png?v=" + str((art or {}).get("iconv", 2)), "sizes": "180x180", "type": "image/png"}]}, ensure_ascii=False, indent=2), encoding="utf-8")
    (d / ".nojekyll").write_text("", encoding="utf-8")
    print(f"{gid}: {len(kept)}問, {len(out)//1024}KB")

for gid, g in GAMES.items(): build(gid, g)
