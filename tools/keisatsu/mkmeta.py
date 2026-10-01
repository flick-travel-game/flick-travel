#!/usr/bin/env python3
"""tools/keisatsu/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/chef/mkmeta.py
けいくん 2026-10-01「警察官になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→「全部おすすめで」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(医師・教師・料理人と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "koban": ("交番の 地図", "🚓", [("koban","交番","🏠"),("chuzai","駐在所","🏡"),("patrol","パトロール","🚶"),
   ("otoshi","落とし物","👛"),("michi","道案内","🗺"),("sodan","相談の 窓口","💬"),
   ("tsuho","110番","☎️"),("mimamori","子どもの 見守り","🎒"),("junkai","巡回連絡","📝"),
   ("chiiki","地域の 人と","🤝"),("pato","パトカー・白バイ","🚓"),("kinkyu","かけつける","🚨")],
   chain(("koban","chuzai"),("chuzai","patrol"),("otoshi","michi"),("michi","sodan"),("tsuho","mimamori"),("junkai","chiiki"),("pato","kinkyu"),("koban","otoshi"))),
 "doro": ("道路の 地図", "🚦", [("shingo","信号","🚦"),("hyoshiki","標識・標示","🛑"),("odan","横断歩道・歩行者","🚸"),
   ("jitensha","自転車","🚲"),("kuruma","車・バイク","🚗"),("menkyo","運転免許","🪪"),
   ("seiri","交通整理","🙋"),("ihan","ルールと 違反","📄"),("jiko","交通事故の あと","🚧"),
   ("anzen","交通安全教室","🏫"),("kosoku","高速道路","🛣"),("ho","交通の 決まり","📘")],
   chain(("shingo","hyoshiki"),("hyoshiki","odan"),("jitensha","kuruma"),("kuruma","menkyo"),("seiri","ihan"),("ihan","jiko"),("anzen","kosoku"),("kosoku","ho"))),
 "sosa": ("捜査の 地図", "🔍", [("tsuho","通報・届け出","📞"),("genba","現場","📍"),("kanshiki","鑑識","🧪"),
   ("ato","指紋・足あと","🖐"),("kikikomi","聞きこみ","👂"),("camera","防犯カメラ","📹"),
   ("shoko","証拠","🗂"),("tetsuzuki","令状・手続き","📜"),("torishirabe","取り調べ","🪑"),
   ("soichi","検察へ","🏛"),("saiban","裁判","⚖️"),("higaisha","被害者を 支える","🤲")],
   chain(("tsuho","genba"),("genba","kanshiki"),("ato","kikikomi"),("kikikomi","camera"),("shoko","tetsuzuki"),("tetsuzuki","torishirabe"),("soichi","saiban"),("saiban","higaisha"))),
 "mamoru": ("まもる 地図", "🛡", [("bohan","防犯","🔒"),("mimamori","見守り","👀"),("sagi","詐欺に 気をつける","📵"),
   ("cyber","サイバー","💻"),("shonen","少年を 守る","🧒"),("sodan","相談","💬"),
   ("seikatsu","くらしの 安全","🏘"),("saigai","災害","🌊"),("keibi","警備","🛡"),
   ("kokusai","国際協力","🌏"),("kyujo","救助","🛟"),("joho","情報を 守る","🔐")],
   chain(("bohan","mimamori"),("mimamori","sagi"),("cyber","shonen"),("shonen","sodan"),("seikatsu","saigai"),("saigai","keibi"),("kokusai","kyujo"),("sagi","cyber"))),
 "horitsu": ("法律の 地図", "⚖️", [("kenpo","憲法","📜"),("jinken","人権","🕊"),("keiho","刑法","📕"),
   ("keiso","刑事訴訟法","📗"),("keisatsuho","警察法","📘"),("keishoku","警職法","📙"),
   ("doko","道路交通法","🚦"),("shonenho","少年法","🧒"),("minpo","民法・くらしの 法律","🏠"),
   ("gyosei","行政の しくみ","🏛"),("sanken","三権分立・裁判所","⚖️"),("tokubetsu","いろいろな 法律","📚")],
   chain(("kenpo","jinken"),("jinken","keiho"),("keiso","keisatsuho"),("keisatsuho","keishoku"),("doko","shonenho"),("shonenho","minpo"),("gyosei","sanken"),("sanken","tokubetsu"))),
 "keisatsusho": ("警察署の 地図", "🏢", [("kuni","国(警察庁)","🏛"),("koan","公安委員会","👥"),("honbu","警察本部","🏢"),
   ("sho","警察署","🏬"),("kaikyu","階級","🎖"),("chiiki","地域課","🚓"),
   ("kotsu","交通課","🚦"),("keiji","刑事課","🔍"),("seian","生活安全課","🛡"),
   ("keibi","警備課","🦺"),("keimu","警務・総務","🗄"),("gakko","警察学校","🎓")],
   chain(("kuni","koan"),("koan","honbu"),("sho","kaikyu"),("kaikyu","chiiki"),("kotsu","keiji"),("keiji","seian"),("keibi","keimu"),("keimu","gakko"))),
 "kokoro": ("心と からだの 地図", "🧭", [("komuin","公務員の 決まり","📋"),("shuhi","守秘義務","🤐"),("reishiki","礼式","🫡"),
   ("seifuku","制服と もちもの","👮"),("tairyoku","体力","🏃"),("jutsuka","柔道・剣道","🥋"),
   ("kotoba","ことばづかい","🗣"),("rinri","正しさ・倫理","🧭"),("saiyo","採用試験","📝"),
   ("kyoyo","教養試験","📚"),("gakko","警察学校の くらし","🏫"),("kenko","こころと からだの 健康","💗")],
   chain(("komuin","shuhi"),("shuhi","reishiki"),("seifuku","tairyoku"),("tairyoku","jutsuka"),("kotoba","rinri"),("rinri","saiyo"),("kyoyo","gakko"),("gakko","kenko"))),
}
J = [
 ("koban","交番とまちのことば","🚓","#1d6bff","koban","交番マスター","交番・駐在所・パトロール・落とし物・道案内・110番など、まちで 見かける 警察の ことば",
  [("交番の 前","🏠"),("パトロールの 道","🚶"),("落とし物の 窓口","👛"),("通学路","🎒"),("パトカーの 中","🚓")]),
 ("kotsu","交通のことば","🚦","#00b33c","doro","交通マスター","信号・標識・横断歩道・自転車の ルール・運転免許・交通安全など、道路を 安全に する ことば",
  [("交差点","🚦"),("通学路の 横断歩道","🚸"),("自転車の 道","🚲"),("免許センター","🪪"),("高速道路","🛣")]),
 ("sosa","事件と捜査のことば","🔍","#8a2be0","sosa","捜査マスター","通報・現場・鑑識・指紋・聞きこみ・証拠・令状・裁判など、事件を 正しく 調べる ための ことば(名前と 役目だけ)",
  [("通報の 電話","📞"),("現場の 前","📍"),("鑑識の 部屋","🧪"),("捜査の 机","🗂"),("裁判所","⚖️")]),
 ("mamoru","まもるしくみ","🛡","#0a9396","mamoru","まもりマスター","防犯・見守り・特殊詐欺の 注意・サイバー・少年・災害の ときの 警察など、みんなを 守る しくみの ことば",
  [("通学路の 見守り","👀"),("詐欺に 気をつける 電話","📵"),("サイバーの 部屋","💻"),("災害の 現場","🌊"),("世界との つながり","🌏")]),
 ("horitsu","法律のことば","⚖️","#e0202e","horitsu","法律マスター","憲法・刑法・刑事訴訟法・警察法・道路交通法・少年法など、法律の 名前と 何の ための 法律か",
  [("憲法の 教室","📜"),("人権の 広場","🕊"),("刑法の 本だな","📕"),("警察の 法律","📘"),("裁判所の 前","⚖️")]),
 ("soshiki","警察のしくみ","🏢","#f25c00","keisatsusho","しくみマスター","警察庁・都道府県警察・警察署・公安委員会・階級・部門など、警察という 組織の しくみの ことば",
  [("警察庁","🏛"),("警察本部","🏢"),("警察署の 受付","🏬"),("階級の かべ","🎖"),("警察学校","🎓")]),
 ("kokoro","警察官の心とからだ","🧭","#e8368f","kokoro","心とからだマスター","公務員の 決まり・守秘義務・礼式・柔道と 剣道・体力・ことばづかい・採用試験など、警察官に なる 人の 心と からだの ことば",
  [("採用試験の 会場","📝"),("警察学校の 寮","🏫"),("道場","🥋"),("グラウンド","🏃"),("はじめての 交番","🫡")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="警察の ことばと 意味を おぼえる ゲームです。本物の 試験問題では ありません。警察庁・都道府県警察とは 関係ありません。犯罪の やりかたや 取りしまりの 手順は のせていません。こまった ときは 110番 か 近くの 交番へ。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="まちで 見かける 警察の ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="🚓", lead="警察官採用試験の 教養試験の 範囲の めやす"),
         dict(difficulty=3, name="上級", icon="👮", lead="法律の 名前・階級と 組織の こまかい ところ・専門の 部門の めやす")],
 titles=[[10,"🧳","警察の旅人"],[30,"🔰","交番の見学者"],[60,"🚓","パトロールの仲間"],[100,"🚦","交通の守り手"],[160,"🔍","捜査の物知り"],
         [220,"🛡","まちの守り手"],[290,"⚖️","法律の物知り"],[360,"🏢","警察のしくみ通"],[420,"🫡","警察学校の生徒"],[480,"👮","一人前の警察官"]],
 allTitle=["🏆","フリック警察官マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
