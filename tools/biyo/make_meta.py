#!/usr/bin/env python3
"""tools/biyo/meta.json を 作る 台本(しくみ図の 箱の ならびを 1か所で 書くため)。
    python3 tools/biyo/make_meta.py
meta.json を 直すときは ここを 直して もう一度 走らせる"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
XS, YS = (60, 180, 300), (40, 130, 220, 310)


def diag(name, icon, rows, edges):
    nodes = []
    for y, row in zip(YS, rows):
        for x, (nid, label, ic) in zip(XS, row):
            nodes.append(dict(id=nid, label=label, icon=ic, x=x, y=y))
    ids = {n["id"] for n in nodes}
    for a, b in edges: assert a in ids and b in ids, (a, b)
    return dict(name=name, w=360, h=360, icon=icon, nodes=nodes, edges=[[a, b, ""] for a, b in edges])


DIAGRAMS = {
    "atama": diag("頭の 地図", "💇", [
        [("top", "トップ", "⬆"), ("fringe", "前髪", "💇"), ("side", "サイド", "↔")],
        [("back", "バック", "🔙"), ("nape", "えりあし", "⬇"), ("line", "長さ・ライン", "📏")],
        [("dan", "段・レイヤー", "🪜"), ("ryo", "毛量・質感", "🌾"), ("katachi", "形・シルエット", "🔷")],
        [("hasami", "はさみ・かみそり", "✂️"), ("comb", "コーム・道具", "🪮"), ("set", "ブロー・セット", "💨")],
    ], [("top", "fringe"), ("fringe", "side"), ("back", "nape"), ("nape", "line"), ("top", "back"), ("side", "line"),
        ("dan", "ryo"), ("ryo", "katachi"), ("line", "katachi"), ("hasami", "comb"), ("comb", "set"), ("ryo", "comb")]),
    "perm": diag("パーマと カラーの 図", "〰️", [
        [("sodan", "相談・たしかめる", "💬"), ("shurui", "パーマの しゅるい", "〰️"), ("rod", "ロッド・道具", "🥢")],
        [("maku", "まく・とめる", "🌀"), ("kusuri", "薬の 名前", "🧴"), ("straight", "まっすぐに する", "📐")],
        [("color", "カラーの しゅるい", "🎨"), ("iro", "色の 考えかた", "🌈"), ("bleach", "明るく する", "✨")],
        [("kiki", "機械", "🔌"), ("care", "仕上げ・ケア", "💧"), ("anzen", "安全・たしかめ", "🛡")],
    ], [("sodan", "shurui"), ("shurui", "rod"), ("rod", "maku"), ("maku", "kusuri"), ("kusuri", "straight"), ("shurui", "kusuri"),
        ("color", "iro"), ("iro", "bleach"), ("kusuri", "iro"), ("kiki", "care"), ("care", "anzen"), ("bleach", "anzen"), ("sodan", "maku")]),
    "kami": diag("髪の 断面と 肌の 図", "🔬", [
        [("cuticle", "キューティクル", "🐟"), ("cortex", "コルテックス", "🧵"), ("medulla", "メデュラ", "⚪")],
        [("seibun", "髪の 成分", "🧬"), ("moukon", "毛根・毛のう", "🌱"), ("shuki", "生える くりかえし", "🔁")],
        [("hyohi", "表皮", "🟫"), ("shinpi", "真皮・その下", "🟥"), ("abura", "皮脂・あせ", "💦")],
        [("iro", "髪と 肌の 色", "🎨"), ("hifu", "肌の トラブル", "🩹"), ("jintai", "からだの しくみ", "🧍")],
    ], [("cuticle", "cortex"), ("cortex", "medulla"), ("cortex", "seibun"), ("seibun", "moukon"), ("moukon", "shuki"), ("medulla", "shuki"),
        ("hyohi", "shinpi"), ("shinpi", "abura"), ("moukon", "shinpi"), ("iro", "hifu"), ("hifu", "jintai"), ("hyohi", "iro")]),
    "tana": diag("香粧品の たな", "🧪", [
        [("kihon", "化学の きほん", "⚗️"), ("kaimen", "界面活性剤", "🫧"), ("mizuabura", "水と 油", "💧")],
        [("hoshitsu", "うるおい", "💦"), ("yushi", "油の なかま", "🫒"), ("iroguzai", "色の もと", "🎨")],
        [("hair", "髪の 香粧品", "🧴"), ("skin", "肌の 香粧品", "🧖"), ("hi", "日ざしを ふせぐ", "☀️")],
        [("kaori", "かおり", "🌸"), ("nagamochi", "長もち・安定", "⏳"), ("kubun", "決まりと 表示", "🏷")],
    ], [("kihon", "kaimen"), ("kaimen", "mizuabura"), ("mizuabura", "hoshitsu"), ("hoshitsu", "yushi"), ("yushi", "iroguzai"), ("kaimen", "yushi"),
        ("hair", "skin"), ("skin", "hi"), ("hoshitsu", "skin"), ("kaori", "nagamochi"), ("nagamochi", "kubun"), ("hair", "kaori")]),
    "eisei": diag("衛生の 地図", "🧼", [
        [("koshu", "公衆衛生", "🏙"), ("kankyo", "空気・水・光", "🌬"), ("kenko", "健康づくり", "🥗")],
        [("kansensho", "うつる 病気", "🦠"), ("michi", "うつる 道すじ", "➡️"), ("fusegu", "ふせぐ しくみ", "🛡")],
        [("shodoku", "消毒の しゅるい", "🧪"), ("kigu", "器具の あつかい", "✂️"), ("nuno", "タオル・布", "🧺")],
        [("te", "手と 身なり", "🙌"), ("heya", "お店の 中", "🏠"), ("gomi", "ごみ・かみの毛", "🗑")],
    ], [("koshu", "kankyo"), ("kankyo", "kenko"), ("kansensho", "michi"), ("michi", "fusegu"), ("koshu", "kansensho"), ("kenko", "fusegu"),
        ("shodoku", "kigu"), ("kigu", "nuno"), ("fusegu", "shodoku"), ("te", "heya"), ("heya", "gomi"), ("nuno", "gomi")]),
    "make": diag("メイクと 着物の 図", "💄", [
        [("base", "ベースメイク", "🧴"), ("me", "目もと・まつ毛", "👁"), ("mayu", "まゆ・口もと", "💋")],
        [("dogu", "メイクの 道具", "🖌"), ("nail", "ネイル", "💅"), ("esthe", "肌の お手入れ", "🧖")],
        [("kimono", "着物", "👘"), ("obi", "帯", "🎀"), ("bridal", "ブライダル", "💒")],
        [("nihongami", "日本髪", "🎎"), ("rekishi", "髪型の 歴史", "📜"), ("fashion", "ファッション", "👗")],
    ], [("base", "me"), ("me", "mayu"), ("base", "dogu"), ("dogu", "nail"), ("nail", "esthe"), ("mayu", "esthe"),
        ("kimono", "obi"), ("obi", "bridal"), ("kimono", "nihongami"), ("nihongami", "rekishi"), ("rekishi", "fashion"), ("bridal", "fashion")]),
    "mise": diag("お店の 地図", "🏪", [
        [("uketsuke", "受付・予約", "📅"), ("machi", "待合", "🛋"), ("setmen", "セット面", "🪞")],
        [("shampoo", "シャンプー台", "🚿"), ("wagon", "道具の ワゴン", "🛒"), ("back", "バックルーム", "🚪")],
        [("horitsu", "法律・きまり", "📚"), ("menkyo", "免許・資格", "🪪"), ("hokenjo", "保健所", "🏛")],
        [("hataraku", "はたらく きまり", "👥"), ("keiei", "お店の 運営", "📊"), ("sekkyaku", "接客・相談", "🤝")],
    ], [("uketsuke", "machi"), ("machi", "setmen"), ("setmen", "wagon"), ("shampoo", "wagon"), ("wagon", "back"), ("uketsuke", "shampoo"),
        ("horitsu", "menkyo"), ("menkyo", "hokenjo"), ("horitsu", "hataraku"), ("hataraku", "keiei"), ("keiei", "sekkyaku"), ("hokenjo", "sekkyaku")]),
}

JOURNEYS = [
    dict(id="cut", name="カットとスタイル", icon="✂️", color="#f03e3e", diagram="atama", goal="カットマスター",
         lead="切りかた・長さの 形・はさみや コームの 名前・ブローと セットの ことば",
         stops=[("カットの いす", "💺"), ("前髪の 森", "💇"), ("はさみの たな", "✂️"), ("ブローの 風", "💨"), ("仕上げの 鏡", "🪞")]),
    dict(id="perm", name="パーマとカラー", icon="〰️", color="#7048e8", diagram="perm", goal="パーマカラーマスター",
         lead="パーマ・縮毛矯正・ヘアカラー・色の 考えかたの ことば(名前と 目的だけ)",
         stops=[("相談の テーブル", "💬"), ("ロッドの 箱", "🥢"), ("色見本の 壁", "🎨"), ("明るさの まど", "✨"), ("仕上げの 鏡", "🪞")]),
    dict(id="kami", name="髪と肌のしくみ", icon="🔬", color="#1c7ed6", diagram="kami", goal="髪と肌マスター",
         lead="髪の 断面・毛根と 生える くりかえし・肌の つくり・からだの しくみの ことば",
         stops=[("髪の 表面", "🐟"), ("髪の まん中", "🧵"), ("毛根の 町", "🌱"), ("肌の 層", "🟫"), ("からだの 地図", "🧍")]),
    dict(id="kagaku", name="美容の化学", icon="🧪", color="#0ca678", diagram="tana", goal="香粧品マスター",
         lead="界面活性剤・水と 油・うるおい・色と かおりの もと・香粧品の 決まりの ことば",
         stops=[("化学の 教室", "⚗️"), ("あわの 実験室", "🫧"), ("色の たな", "🎨"), ("かおりの 庭", "🌸"), ("ラベルの 机", "🏷")]),
    dict(id="eisei", name="清潔と衛生", icon="🧼", color="#e64980", diagram="eisei", goal="衛生マスター",
         lead="公衆衛生・空気と 水・うつる 病気を ふせぐ しくみ・器具と タオルの 清潔の ことば",
         stops=[("町の 保健室", "🏙"), ("空気の まど", "🌬"), ("ふせぐ とびら", "🛡"), ("消毒の たな", "🧪"), ("清潔な お店", "✨")]),
    dict(id="make", name="メイク・ネイル・着付け", icon="💄", color="#f76707", diagram="make", goal="トータルビューティーマスター",
         lead="ベースメイク・目もと・ネイル・着物と 帯・日本髪と 髪型の 歴史の ことば",
         stops=[("メイクの 鏡", "💄"), ("ネイルの 机", "💅"), ("着付けの 部屋", "👘"), ("日本髪の 館", "🎎"), ("歴史の 美術館", "📜")]),
    dict(id="mise", name="お店としくみ", icon="🏪", color="#0a9396", diagram="mise", goal="お店マスター",
         lead="美容師法・免許・美容所と 保健所・はたらく きまり・お店の 運営と 接客の ことば",
         stops=[("受付", "📅"), ("セット面", "🪞"), ("バックルーム", "🚪"), ("保健所", "🏛"), ("法律の 図書館", "📚")]),
]
for J in JOURNEYS: J["stops"] = [dict(name=n, icon=i) for n, i in J["stops"]]

META = {
    "version": 1,
    "asOf": "2026年9月",
    "note": "美容の ことばと 意味を おぼえる ゲームです。パーマ液や カラー剤の 使いかた・はさみや かみそりの あつかいかたは のせていません。薬を 使う ことは、美容師さんに おまかせ。むずかしさは「美容師国家試験の 範囲の めやす」で、本物の 試験問題では ありません。厚生労働省・理容師美容師試験研修センターとは 関係ありません。",
    "exam": "美容師は 国家資格(美容師法。厚生労働大臣の 免許)。美容師法では「美容」は パーマネントウエーブ・結髪・化粧などの 方法で 容姿を 美しく する こと。理容師は べつの 資格(理容師法。「理容」は 頭髪の 刈込・顔そりなどの 方法で 容姿を 整える こと)。なりかたは 美容師養成施設(昼間課程・夜間課程は 2年以上、通信課程は 3年以上)を 出て、美容師国家試験に うかる。試験は 公益財団法人 理容師美容師試験研修センターが 行い、実技試験と 筆記試験が ある(第54回は 実技が 2026年8月1日から、筆記が 2026年9月6日)。筆記は 55問で、合格は 60%以上の 正答率 + 8つの 課目(関係法規・制度及び運営管理 / 公衆衛生・環境衛生 / 感染症 / 衛生管理技術 / 人体の構造及び機能 / 皮膚科学 / 香粧品化学 / 文化論及び美容技術理論)の どれも 0点でない こと。実技は 衛生上の取扱と 基礎的技術(第1課題 カッティング・第2課題 ワインディング)。理容師美容師試験研修センター(合格基準・受験資格・第54回の 受験案内)と 厚生労働省(美容師法)の ページで 2026年9月29日に 確かめた",
    "journeys": JOURNEYS,
    "levels": [
        dict(difficulty=1, name="入門", icon="🔰", lead="美容室で 聞く ことば(はじめてでも 分かる)"),
        dict(difficulty=2, name="中級", icon="✂️", lead="美容師国家試験の 筆記の 範囲の めやす(よく 出る ことば)"),
        dict(difficulty=3, name="上級", icon="🎓", lead="美容師国家試験の 範囲の めやす(こまかい 化学・制度・歴史)"),
    ],
    "titles": [[10, "🧳", "美容の旅人"], [30, "🔰", "見習いアシスタント"], [60, "🪮", "コームの友だち"], [100, "✂️", "はさみ名人"],
               [150, "〰️", "ロッドの達人"], [200, "🧪", "香粧品の物知り"], [260, "🧼", "衛生の案内人"], [330, "💄", "メイクの魔法使い"],
               [420, "🎓", "国家試験めざし隊"], [520, "🌟", "みんなのスタイリスト"]],
    "allTitle": ["🏆", "フリック美容師マスター"],
    "diagrams": DIAGRAMS,
}
(HERE / "meta.json").write_text(json.dumps(META, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json", sum(len(d["nodes"]) for d in DIAGRAMS.values()), "場所")
