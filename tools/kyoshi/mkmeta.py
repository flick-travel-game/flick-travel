#!/usr/bin/env python3
"""tools/kyoshi/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/ishi/mkmeta.py"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(医師・看護師と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "kangae": ("教育の 考えかたの 地図", "📚", [("mokuteki","教育の 目的","🎯"),("ikiru","生きる力","🌱"),("shishitsu","資質・能力","💎"),
   ("manabi","主体的な 学び","🙋"),("curriculum","カリキュラム","🗂"),("kobetsu","一人ひとりに 合わせる","🧩"),
   ("kyodo","みんなで 学ぶ","👥"),("shakai","社会と つながる","🏙"),("kokoro","心を 育てる","💗"),
   ("karada","体を 育てる","🏃"),("shogai","一生 学ぶ","📖"),("mirai","これからの 教育","🚀")],
   chain(("mokuteki","ikiru"),("ikiru","shishitsu"),("manabi","curriculum"),("kobetsu","kyodo"),("kyodo","shakai"),("kokoro","karada"),("shogai","mirai"),("shishitsu","manabi"))),
 "kokoro": ("子どもの 心の 地図", "🧠", [("nyuji","幼児期","🧸"),("jido","小学生の ころ","🎒"),("seinen","思春期・青年期","🧑‍🎓"),
   ("hattatsu","発達の 段階","📶"),("ninchi","考える 力","💡"),("kanjo","気持ち","😊"),
   ("yaruki","やる気","🔥"),("jiko","自分を 知る","🪞"),("kizuna","きずな・人との かかわり","🤝"),
   ("kioku","おぼえる しくみ","🗃"),("seikaku","性格・個性","🌈"),("hakaru","心を はかる","📏")],
   chain(("nyuji","jido"),("jido","seinen"),("hattatsu","ninchi"),("ninchi","kanjo"),("yaruki","jiko"),("jiko","kizuna"),("kioku","seikaku"),("seikaku","hakaru"))),
 "kyoshitsu": ("教室の 地図", "✏️", [("shido","学習指導要領","📘"),("tangen","単元・計画","🗓"),("meate","めあて","🎯"),
   ("hatsumon","発問","❓"),("bansho","板書","🧑‍🏫"),("note","ノート・ワークシート","📓"),
   ("hanashiai","話しあい","💬"),("katsudo","体験・活動","🔍"),("ict","ICT・タブレット","💻"),
   ("hyoka","評価","📊"),("furikaeri","ふりかえり","🔁"),("shukudai","家庭学習","🏠")],
   chain(("shido","tangen"),("tangen","meate"),("hatsumon","bansho"),("bansho","note"),("hanashiai","katsudo"),("katsudo","ict"),("hyoka","furikaeri"),("furikaeri","shukudai"))),
 "gakko": ("学校の 地図", "🏫", [("kyoshitsu","教室・学級","🪑"),("shokuin","職員室","🗄"),("kochoshitsu","校長室","🚪"),
   ("hokenshitsu","保健室","🩹"),("taiikukan","体育館・行事","🎌"),("toshokan","図書室","📚"),
   ("kyushoku","給食","🍱"),("katei","家庭・PTA","👪"),("chiiki","地域","🏘"),
   ("bunsho","校務分掌","📋"),("kaigi","会議・研修","🗣"),("nenkan","一年の 流れ","🗓")],
   chain(("kyoshitsu","shokuin"),("shokuin","kochoshitsu"),("hokenshitsu","taiikukan"),("taiikukan","toshokan"),("kyushoku","katei"),("katei","chiiki"),("bunsho","kaigi"),("kaigi","nenkan"))),
 "shien": ("支える 指導の 地図", "🤝", [("seitoshido","生徒指導","🧭"),("sodan","教育相談","👂"),("ijime","いじめを 防ぐ","🛡"),
   ("futoko","学校に 来にくい 子","🚪"),("tokushi","特別支援","🧩"),("hairyo","合理的配慮","🪄"),
   ("renkei","専門家と つながる","🤝"),("hogo","おうちと 協力","🏠"),("anzen","安全を 守る","⛑"),
   ("kenko","心と 体の 健康","💗"),("career","キャリア教育","🧗"),("mimamori","見守る","👀")],
   chain(("seitoshido","sodan"),("sodan","ijime"),("futoko","tokushi"),("tokushi","hairyo"),("renkei","hogo"),("hogo","anzen"),("kenko","career"),("career","mimamori"))),
 "seido": ("教育の 決まりの 地図", "⚖️", [("kenpo","日本国憲法","📜"),("kihon","教育基本法","📗"),("gakko","学校教育法","🏫"),
   ("iinkai","教育委員会","🏛"),("menkyo","教員免許","🪪"),("saiyo","教員採用","📝"),
   ("fukumu","服務・身分","🧑‍💼"),("kenshu","研修","🎓"),("gimu","義務教育","🎒"),
   ("hogoho","子どもを 守る 法律","🛡"),("kuni","国・文部科学省","🏢"),("kyokasho","教科書","📕")],
   chain(("kenpo","kihon"),("kihon","gakko"),("iinkai","menkyo"),("menkyo","saiyo"),("fukumu","kenshu"),("kenshu","gimu"),("hogoho","kuni"),("kuni","kyokasho"))),
 "rekishi": ("教育の 歴史と 世界の 地図", "🌏", [("terakoya","江戸の 学び","🏯"),("meiji","明治の 学校","🎌"),("sengo","戦後の 教育","🕊"),
   ("heisei","平成・令和","📅"),("europe","ヨーロッパの 教育者","🏰"),("america","アメリカの 教育者","🗽"),
   ("shinri","心理学者","🔬"),("youji","幼児教育の 人","🧸"),("sekai","世界の 学力調査","📊"),
   ("kokuren","国際的な 取り組み","🇺🇳"),("nihonjin","日本の 教育者","🗾"),("kotoba","名言・考え","💬")],
   chain(("terakoya","meiji"),("meiji","sengo"),("heisei","europe"),("europe","america"),("shinri","youji"),("youji","sekai"),("kokuren","nihonjin"),("nihonjin","kotoba"))),
}
J = [
 ("kangae","教育の考えかた","📚","#1d6bff","kangae","考えかたマスター","教育の 目的・生きる力・主体的で 対話的な 学び・カリキュラムなど、教育の 土台に なる 考えかたの ことば",
  [("学校の 門","🚪"),("目的の 旗","🎯"),("学びの 広場","🙋"),("みんなの 教室","👥"),("未来の 窓","🚀")]),
 ("kokoro","子どもの心と育ち","🧠","#8a2be0","kokoro","こころマスター","発達段階・自己肯定感・動機づけ・愛着など、子どもの 心と 育ちを 知る ことば",
  [("ようちえんの 庭","🧸"),("1年生の 教室","🎒"),("やる気の 山","🔥"),("きずなの 橋","🤝"),("思春期の 道","🧑‍🎓")]),
 ("jugyo","授業のつくりかた","✏️","#00b33c","kyoshitsu","授業マスター","学習指導要領・単元・めあて・発問・板書・評価・ICTなど、授業を 作る ことば",
  [("教材の たな","📘"),("黒板の 前","🧑‍🏫"),("話しあいの 輪","💬"),("タブレットの 机","💻"),("ふりかえりの 窓","🔁")]),
 ("gakko","学級と学校のしくみ","🏫","#0a9396","gakko","学校マスター","学級経営・校務分掌・職員会議・PTA・学校行事など、学級と 学校の しくみの ことば",
  [("げた箱","👟"),("教室","🪑"),("職員室","🗄"),("体育館","🎌"),("地域の 町","🏘")]),
 ("shien","支える指導","🤝","#f25c00","shien","支えるマスター","生徒指導・教育相談・特別支援・いじめを 防ぐ しくみ・スクールカウンセラーなど、子どもを 支える ことば",
  [("相談室","👂"),("支援の 教室","🧩"),("保健室の となり","💗"),("おうちとの 窓","🏠"),("未来の 道","🧗")]),
 ("hoki","教育の法律と制度","⚖️","#e0202e","seido","法律マスター","教育基本法・学校教育法・教育委員会・教員免許・服務など、教育の 決まりの ことば",
  [("憲法の 丘","📜"),("法律の 図書館","📗"),("教育委員会","🏛"),("免許の まど","🪪"),("研修の 部屋","🎓")]),
 ("rekishi","教育の歴史と世界","🌏","#e8368f","rekishi","歴史マスター","寺子屋・学制・ペスタロッチ・デューイ・モンテッソーリ・世界の 学力調査など、教育の 歴史と 世界の ことば",
  [("寺子屋","🏯"),("明治の 校舎","🎌"),("ヨーロッパの 町","🏰"),("アメリカの 大学","🗽"),("世界の 会議","🌏")]),
]
meta = dict(
 version=1, asOf="2026年9月",
 note="学校の 先生に なるための ことばと 意味を おぼえる ゲームです。指導の やりかたの 決めうちは のせていません。むずかしさは「教員採用試験の 教職教養の 範囲の めやす」で、本物の 試験問題では ありません。文部科学省・教育委員会とは 関係ありません。こまった ときは、まわりの 大人や 学校の 先生に 相談してね。",
 exam="学校の 先生(教員)に なるには、大学・短大などで 教職課程の 単位を とり、都道府県の 教育委員会から 教員免許状を もらう(教育職員免許法)。"
      "免許状は 普通免許状・特別免許状・臨時免許状の 3つ。普通免許状は 専修(修士)・一種(学士)・二種(短期大学士)に 分かれ、教えられる 範囲は 同じ。"
      "教員免許更新制は 2022年7月1日に なくなり、そのとき 有効だった 免許状は 期限の ない 免許状に なった(いまは 研修の 記録を もとに 学びつづける しくみ)。"
      "公立学校の 先生に なるには、都道府県・政令指定都市の 教育委員会が 行う 教員採用選考試験に 合格する。中身は 教職教養・一般教養・教科の 専門・論文・面接・模擬授業などで、自治体ごとに ちがう。"
      "文部科学省は 採用試験の 第1次選考を 早い 時期に 前倒しするよう すすめていて、51の 自治体が 令和9年度(2027年)から 第1次選考の 問題を 共同で 作る 準備を している(教養試験は 一般教養と 教職教養を 合わせた 形)。"
      "学習指導要領は 小学校・中学校が 2017年(平成29年)告示、高校が 2018年(平成30年)告示の ものが いまの もの。次の 学習指導要領は 中央教育審議会で 話しあわれていて、小学校は 令和12年度(2030年度)から 全面実施の 予定(今後 変わる ことが ある)。"
      "文部科学省の ページ(教員免許更新制の 発展的解消・教員採用選考に係る第一次選考の共同実施について(令和8年4月30日)・学習指導要領等の改訂に関するスケジュール(令和8年7月8日))と 都道府県教育委員会の ページで 2026年9月30日に 確かめた",
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="学校で 聞く ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="🏫", lead="教員採用試験の 教職教養の 範囲の めやす"),
         dict(difficulty=3, name="上級", icon="🎓", lead="法律・制度・教育史の こまかい ところの めやす")],
 titles=[[10,"🧳","教育の旅人"],[30,"🔰","先生の卵"],[60,"✏️","授業の名人"],[100,"🧠","こころの読み手"],[150,"🏫","学校の物知り"],
         [200,"🤝","支える達人"],[260,"⚖️","教育法規博士"],[330,"🌏","教育史の案内人"],[400,"🎓","採用試験めざし隊"],[460,"🧑‍🏫","新任の先生"]],
 allTitle=["🏆","フリック教師マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
