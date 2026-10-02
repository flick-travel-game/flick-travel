#!/usr/bin/env python3
"""tools/adler/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/zeirishi/mkmeta.py
けいくん 2026-10-02「アドラー心理学の専門家になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→「全部おすすめで」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(税理士・弁護士と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 # こころの 地図: 劣等感 → 補償 → 目標 → ライフスタイル(けいくんへの まとめの 1)
 "kokoro": ("こころの 地図", "🧠", [("rettokan","劣等感","🌱"),("hosho","補償","🔧"),("mokuhyo","目標","🎯"),
   ("yuetsu","優越性の 追求","⛰"),("mokutekiron","目的論","🧭"),("lifestyle","ライフスタイル","🗺"),
   ("zentairon","全体論","🧩"),("shutai","主体性","🙋"),("ninchi","意味づけ","🔍"),
   ("taijin","対人関係","🤝"),("yuki","勇気","💪"),("kyodo","みんなの 中へ","🌏")],
   chain(("rettokan","hosho"),("hosho","mokuhyo"),("yuetsu","mokutekiron"),("mokutekiron","lifestyle"),("zentairon","shutai"),("shutai","ninchi"),("taijin","yuki"),("yuki","kyodo"))),
 # 対人関係の 図: 課題の分離・横の関係・共同体感覚
 "taijin": ("対人関係の 図", "🤝", [("watashi","わたし","🙂"),("bunri","課題の 分離","✂️"),("aite","あいて","🙂"),
   ("yoko","横の 関係","↔️"),("tate","縦の 関係","↕️"),("shonin","承認","🏅"),
   ("juyo","自己受容","💗"),("shinrai","他者信頼","🤲"),("koken","他者貢献","🎁"),
   ("kyoryoku","協力","🤝"),("shozoku","所属","🏠"),("kyodotai","共同体感覚","🌏")],
   chain(("watashi","bunri"),("bunri","aite"),("yoko","tate"),("juyo","shinrai"),("shinrai","koken"),("kyoryoku","shozoku"),("shozoku","kyodotai"))),
 "yuki": ("勇気づけの 地図", "💪", [("yukizuke","勇気づけ","💪"),("homeru","ほめる","👏"),("kujiki","勇気くじき","🥀"),
   ("kansha","感謝","🙏"),("chumoku","よい ところ","🔦"),("katei","過程を 見る","👣"),
   ("shippai","失敗から 学ぶ","🌱"),("kotoba","ことばかけ","💬"),("jibun","自分を 勇気づける","🌞"),
   ("kanosei","できる ことを 見る","🔑"),("shinrai","信じて まかせる","🤲"),("tsunagari","人との つながり","🔗")],
   chain(("yukizuke","homeru"),("homeru","kujiki"),("kansha","chumoku"),("chumoku","katei"),("shippai","kotoba"),("kotoba","jibun"),("kanosei","shinrai"),("shinrai","tsunagari"))),
 # ライフスタイルと ライフタスクの 3つの 輪(仕事・交友・愛)
 "lifestyle": ("ライフスタイルと 3つの 輪", "📘", [("lifestyle","ライフスタイル","🗺"),("kaiso","早期回想","📷"),("kazoku","家族布置","👪"),
   ("junni","出生順位","🔢"),("shiteki","私的論理","🔒"),("kyotsu","共通感覚","🌐"),
   ("ayamari","基本的な 誤り","❗"),("complex","コンプレックス","🌀"),("seikaku","性格の 見かた","🪞"),
   ("shigoto","仕事の 輪","🛠"),("koyu","交友の 輪","🤝"),("ai","愛の 輪","💞")],
   chain(("lifestyle","kaiso"),("kaiso","kazoku"),("junni","shiteki"),("shiteki","kyotsu"),("ayamari","complex"),("complex","seikaku"),("shigoto","koyu"),("koyu","ai"))),
 "katei": ("家庭と 教室の 地図", "👨‍👩‍👧", [("ie","家庭","🏠"),("kyoshitsu","教室","🏫"),("sodatekata","育てかたの 型","🧸"),
   ("minshu","民主的な 子育て","🗳"),("kaigi","みんなで 話しあう","🪑"),("mokuteki","行動の 4つの 目的","🎯"),
   ("kekka","結末から 学ぶ","🍂"),("jiritsu","自立","🚶"),("sekinin","責任","🎒"),
   ("kyodai","きょうだい","👫"),("futoko","学校に 行きにくい とき","🚪"),("shien","支える 大人","🤲")],
   chain(("ie","kyoshitsu"),("kyoshitsu","sodatekata"),("minshu","kaigi"),("kaigi","mokuteki"),("kekka","jiritsu"),("jiritsu","sekinin"),("kyodai","futoko"),("futoko","shien"))),
 "enjo": ("援助の 地図", "🩺", [("kankei","援助の 関係","🤝"),("kyokan","共感","💗"),("mokuhyo","目標の 一致","🎯"),
   ("bunseki","ライフスタイル 分析","🗺"),("kaiso","回想の 聞きとり","📷"),("rikai","理解と 解釈","🔍"),
   ("saiho","再方向づけ","🧭"),("kyoiku","心理教育","📚"),("group","グループ","👥"),
   ("kazoku","家族への 援助","👪"),("gakko","学校での 援助","🏫"),("rinri","倫理と 守秘","🤐")],
   chain(("kankei","kyokan"),("kyokan","mokuhyo"),("bunseki","kaiso"),("kaiso","rikai"),("saiho","kyoiku"),("kyoiku","group"),("kazoku","gakko"),("gakko","rinri"))),
 "rekishi": ("歴史と 人びとの 地図", "🌏", [("wien","ウィーン","🏛"),("freud","フロイトの 会","🛋"),("dokuritsu","個人心理学の はじまり","🌱"),
   ("jido","子どもの 相談所","🧒"),("hon","アドラーの 本","📖"),("america","アメリカへ","🗽"),
   ("dreikurs","ドライカース","🧑‍🏫"),("kenkyu","研究者たち","🔬"),("sekai","世界の 学会","🌐"),
   ("nihon","日本への 広まり","🗾"),("gakkai","日本の 学会","🏢"),("shikaku","こころの 資格","🎓")],
   chain(("wien","freud"),("freud","dokuritsu"),("jido","hon"),("hon","america"),("dreikurs","kenkyu"),("kenkyu","sekai"),("nihon","gakkai"),("gakkai","shikaku"))),
}
J = [
 ("kihon","アドラー心理学のきほん","🧠","#1d6bff","kokoro","きほんマスター","個人心理学・目的論・全体論・主体性・対人関係論・劣等感・補償・優越性の追求・勇気など、アドラー心理学の はじめの ことば",
  [("こころの 入口","🚪"),("目的の 森","🧭"),("劣等感の 坂","🌱"),("勇気の 丘","💪"),("つながりの 広場","🌏")]),
 ("kyodotai","共同体感覚と対人関係","🤝","#00b33c","taijin","つながりマスター","共同体感覚・課題の分離・横の関係・縦の関係・承認・所属感・貢献感・自己受容・他者信頼・他者貢献など、人との かかわりの ことば",
  [("わたしの 部屋","🙂"),("分かれ道","✂️"),("横ならびの 橋","↔️"),("信頼の 庭","🤲"),("みんなの 広場","🌏")]),
 ("yuki","勇気づけ","💪","#f25c00","yuki","勇気づけマスター","勇気づけ・ほめると 勇気づけの ちがい・勇気くじき・感謝・注目・失敗から 学ぶ・不完全である勇気など、勇気づけの ことば",
  [("ことばの 泉","💬"),("ありがとうの 道","🙏"),("失敗の 畑","🌱"),("自分を はげます 灯台","🌞"),("つながりの 港","🔗")]),
 ("lifestyle","ライフスタイルと性格","📘","#8a2be0","lifestyle","ライフスタイルマスター","ライフスタイル・早期回想・家族布置・出生順位・私的論理・共通感覚・ライフタスク(仕事・交友・愛)・劣等コンプレックスなど、性格の 見かたの ことば",
  [("思い出の 部屋","📷"),("家族の 地図","👪"),("こころの めがね","🔒"),("3つの 輪","⭕"),("性格の 鏡","🪞")]),
 ("kosodate","子育てと学校","👨‍👩‍👧","#e8368f","katei","子育てマスター","甘やかし・放任・民主的な 子育て・行動の 4つの 目的・自然の結末・論理的結末・クラス会議・自立・不登校など、家庭と 学校の ことば",
  [("おうちの 台所","🏠"),("教室","🏫"),("話しあいの 輪","🪑"),("自立の 道","🚶"),("支える 大人の 家","🤲")]),
 ("enjo","カウンセリングと援助","🩺","#0a9396","enjo","援助マスター","ライフスタイル分析・早期回想の 聞きとり・共感・目標の一致・再方向づけ・心理教育・グループなど、援助の ことば(名前と ねらいだけ)",
  [("相談室","🛋"),("聞きとりの 机","📝"),("ふりかえりの 窓","🔍"),("学びの 教室","📚"),("つながりの 輪","👥")]),
 ("rekishi","アドラーの歴史と人びと","🌏","#e0202e","rekishi","歴史と人びとマスター","アルフレッド・アドラー・ウィーン・フロイトとの 出会いと 別れ・児童相談所・ドライカース・日本への 広まりなど、アドラー心理学の 歴史の ことば",
  [("ウィーンの まち","🏛"),("フロイトの 会","🛋"),("子どもの 相談所","🧒"),("アメリカの 大学","🗽"),("日本の 学会","🗾")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="アドラー心理学の ことばと 意味を おぼえる ゲームです。心理療法や カウンセリングの やりかたでは ありません。悩みの 相談の 答えでも、こころの 診断でも ありません。日本アドラー心理学会とは 関係ありません。こころの ことで こまったら 家族や 先生・専門の 人に 相談してください。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="本や 講座で まず 出る ことば(勇気づけ・課題の分離・共同体感覚)"),
         dict(difficulty=2, name="中級", icon="📘", lead="学会の 基礎講座・心理療法の 入門書の 範囲の めやす(ライフスタイル・早期回想・私的論理)"),
         dict(difficulty=3, name="上級", icon="🧠", lead="学会の 専門用語・原語の 訳語・歴史の こまかい 人名の めやす")],
 titles=[[10,"🧳","こころの旅人"],[30,"🔰","勇気の見習い"],[60,"🤝","横の関係の仲間"],[100,"💪","勇気づけの名人"],[160,"📘","ライフスタイルの探検家"],
         [220,"👨‍👩‍👧","子育ての相談役"],[290,"🩺","援助の見習い"],[360,"🌏","アドラーの語り部"],[420,"🎓","基礎講座の修了生"],[480,"🧠","アドラー心理学の専門家"]],
 allTitle=["🏆","フリックアドラー心理学マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
