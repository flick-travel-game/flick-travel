#!/usr/bin/env python3
"""tools/bengoshi/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/keisatsu/mkmeta.py
けいくん 2026-10-01「弁護士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→「全部おすすめで」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(警察官・消防士と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "kihon": ("法律の 地図", "⚖️", [("roppo","六法","📚"),("kenpo","憲法","📜"),("horitsu","法律","📘"),
   ("meirei","命令・規則","📄"),("jorei","条例","🏙"),("jobun","条文","🔢"),
   ("kenri","権利","🙋"),("gimu","義務","🤝"),("keiyaku","約束と 契約","✍️"),
   ("hanrei","判例","🗂"),("kaishaku","法の 解釈","🔎"),("bunrui","法の 分けかた","🧩")],
   chain(("roppo","kenpo"),("kenpo","horitsu"),("meirei","jorei"),("jorei","jobun"),("kenri","gimu"),("gimu","keiyaku"),("hanrei","kaishaku"),("kaishaku","bunrui"))),
 "kenpo": ("憲法の 地図", "📜", [("shuken","国民主権","🗳"),("heiwa","平和主義","🕊"),("jinken","基本的人権","🙌"),
   ("byodo","平等","⚖️"),("jiyu","自由権","🕊"),("shakai","社会権","🏥"),
   ("sansei","参政権・請求権","✋"),("kokkai","国会","🏛"),("naikaku","内閣","🏢"),
   ("saibansho","裁判所","⚖️"),("chiho","地方自治","🏙"),("kaisei","憲法の 改正と 守り","🛡")],
   chain(("shuken","heiwa"),("heiwa","jinken"),("byodo","jiyu"),("jiyu","shakai"),("sansei","kokkai"),("kokkai","naikaku"),("saibansho","chiho"),("chiho","kaisei"))),
 "kurashi": ("くらしの 地図", "🏠", [("keiyaku","契約","✍️"),("baibai","売り買い","🛒"),("kashikari","貸し借り","🔁"),
   ("ie","家と 土地","🏡"),("kazoku","家族と 結婚","👪"),("sozoku","相続と 遺言","📜"),
   ("kodomo","未成年","🧒"),("shohisha","消費者を 守る","🛡"),("songai","損害賠償","💴"),
   ("kaisha","会社の 決まり","🏢"),("hataraku","働く 決まり","👷"),("chizai","知的財産","💡")],
   chain(("keiyaku","baibai"),("baibai","kashikari"),("ie","kazoku"),("kazoku","sozoku"),("kodomo","shohisha"),("shohisha","songai"),("kaisha","hataraku"),("hataraku","chizai"))),
 "keiji": ("刑事の 地図", "🔍", [("genri","罪と 刑の 考えかた","📕"),("tsumi","罪の 名前","🏷"),("sekinin","責任","🧠"),
   ("kei","刑罰の しくみ","⚖️"),("sosa","捜査","🔍"),("mibara","逮捕と 勾留","🚪"),
   ("bengonin","弁護人","💼"),("kiso","起訴","📨"),("kohan","公判","🏛"),
   ("saibanin","裁判員","👥"),("shonen","少年の 事件","🧒"),("higaisha","被害者を 支える","🤲")],
   chain(("genri","tsumi"),("tsumi","sekinin"),("kei","sosa"),("sosa","mibara"),("bengonin","kiso"),("kiso","kohan"),("saibanin","shonen"),("shonen","higaisha"))),
 "hotei": ("法廷の 地図", "🏛", [("saibankan","裁判官の 席","🧑‍⚖️"),("kensatsu","検察官の 席","📂"),("bengo","弁護人の 席","💼"),
   ("genkoku","原告の 席","🙋"),("hikoku","被告の 席","🧑"),("shogen","証言台","🎤"),
   ("bocho","傍聴席","👀"),("shurui","裁判所の 種類","🏛"),("shinri","審理","🗣"),
   ("hanketsu","判決","📜"),("joso","控訴と 上告","⬆️"),("chotei","調停と 和解","🤝")],
   chain(("saibankan","kensatsu"),("kensatsu","bengo"),("genkoku","hikoku"),("hikoku","shogen"),("bocho","shurui"),("shurui","shinri"),("hanketsu","joso"),("joso","chotei"))),
 "jimusho": ("法律事務所の 地図", "💼", [("uketsuke","受付","🛎"),("sodan","相談室","💬"),("irainin","依頼人","🙋"),
   ("shuhi","守秘義務","🤐"),("shorui","書類づくり","📝"),("kosho","話しあいと 交渉","🤝"),
   ("hotei","法廷へ","🏛"),("bengoshikai","弁護士会","🌻"),("houterasu","法テラス","📞"),
   ("kigyo","会社の 法務","🏢"),("nakama","法律の 仕事の 仲間","👥"),("shiken","試験と 修習","🎓")],
   chain(("uketsuke","sodan"),("sodan","irainin"),("shuhi","shorui"),("shorui","kosho"),("hotei","bengoshikai"),("bengoshikai","houterasu"),("kigyo","nakama"),("nakama","shiken"))),
 "rekishi": ("歴史と 世界の 地図", "🌏", [("kodai","古代の 決まり","🏯"),("buke","武家の 法","🐎"),("meiji","明治の 法","🎩"),
   ("kenpo","日本国憲法","📜"),("sengo","戦後の 法","🌱"),("ima","いまの 法の 動き","📰"),
   ("kokusai","国際法","🌐"),("kokuren","国際連合","🇺🇳"),("jinken","世界の 人権","🕊"),
   ("kodomo","子どもの 権利","🧒"),("saibansho","国際の 裁判所","🏛"),("gaikoku","外国の 法","🗺")],
   chain(("kodai","buke"),("buke","meiji"),("kenpo","sengo"),("sengo","ima"),("kokusai","kokuren"),("kokuren","jinken"),("kodomo","saibansho"),("saibansho","gaikoku"))),
}
J = [
 ("kihon","法律のきほん","⚖️","#1d6bff","kihon","きほんマスター","法律・条文・権利・義務・契約・判例・六法など、法律を 学ぶ はじめの ことば",
  [("法律の 図書館","📚"),("六法の 本だな","📘"),("まちの 決まり","🏙"),("約束の 机","✍️"),("判例の 部屋","🗂")]),
 ("kenpo","憲法のことば","📜","#8a2be0","kenpo","憲法マスター","国民主権・平和主義・基本的人権・三権分立・表現の自由など、国の いちばん 大もとの 決まりの ことば",
  [("憲法の 教室","📜"),("人権の 広場","🕊"),("国会","🏛"),("内閣","🏢"),("最高裁判所","⚖️")]),
 ("minpo","民法とくらし","🏠","#00b33c","kurashi","くらしマスター","契約・売り買い・貸し借り・家族・相続・未成年・消費者・損害賠償など、くらしを 守る 決まりの ことば",
  [("お店","🛒"),("家と 土地","🏡"),("家族の 部屋","👪"),("会社","🏢"),("相談の 窓口","💬")]),
 ("keiji","刑法と刑事のてつづき","🔍","#e0202e","keiji","刑事マスター","罪と 刑罰の 考えかた・無罪推定・弁護人・起訴・公判・裁判員など、刑事の しくみの ことば(名前と 役目だけ)",
  [("刑法の 本だな","📕"),("警察署","🏬"),("検察庁","📂"),("法廷","🏛"),("裁判員の 部屋","👥")]),
 ("saiban","裁判所とてつづき","🏛","#f25c00","hotei","裁判マスター","地方裁判所から 最高裁判所まで・原告と 被告・証人・判決・控訴・調停・和解など、裁判の 道すじの ことば",
  [("簡易裁判所","🏠"),("地方裁判所","🏛"),("家庭裁判所","👪"),("高等裁判所","🏯"),("最高裁判所","⚖️")]),
 ("shigoto","弁護士の仕事","💼","#0a9396","jimusho","しごとマスター","依頼人・相談・守秘義務・弁護士会・法テラス・国選弁護人・企業法務・司法試験など、弁護士の 仕事と なりかたの ことば",
  [("法律事務所の 受付","🛎"),("相談室","💬"),("弁護士会","🌻"),("法テラス","📞"),("司法修習","🎓")]),
 ("rekishi","法律の歴史と世界","🌏","#e8368f","rekishi","歴史と世界マスター","十七条の憲法・大宝律令・御成敗式目・大日本帝国憲法・日本国憲法・国際法・国連・子どもの権利条約など、法の 歴史と 世界の ことば",
  [("飛鳥の 都","🏯"),("鎌倉の 幕府","🐎"),("明治の 議会","🎩"),("国際連合","🌐"),("国際司法裁判所","🏛")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="法律の ことばと 意味を おぼえる ゲームです。本物の 試験問題では ありません。法律相談の 答えでは ありません。法務省・裁判所・日本弁護士連合会とは 関係ありません。こまった ときは 大人に 言って、弁護士や 法テラスに 相談してください。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="ニュースや くらしで 聞く 法律の ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="📘", lead="法学部・予備試験の 短答式の 範囲の めやす(憲法・民法・刑法の 大きな ことば)"),
         dict(difficulty=3, name="上級", icon="⚖️", lead="商法・民事訴訟法・刑事訴訟法・行政法の ことば・法律用語の こまかい 言いかたの めやす")],
 titles=[[10,"🧳","法律の旅人"],[30,"🔰","法律の見学者"],[60,"📚","六法の仲間"],[100,"📜","憲法の物知り"],[160,"🏠","くらしの守り手"],
         [220,"🔍","刑事の物知り"],[290,"🏛","法廷の常連"],[360,"🌻","弁護士の卵"],[420,"🎓","司法修習生"],[480,"⚖️","一人前の弁護士"]],
 allTitle=["🏆","フリック弁護士マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
