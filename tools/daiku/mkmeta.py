#!/usr/bin/env python3
"""tools/daiku/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/toshika/mkmeta.py
けいくん 2026-10-03「大工の専門家になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(税理士・投資家と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 # 家が できるまでの 流れ: 設計 → 地鎮祭 → 基礎 → 建て方 → 上棟 → 内装 → 引き渡し
 "kihon": ("家が できるまでの 流れ", "🏠", [("daiku","大工","🧑‍🔧"),("toryo","棟梁","👷"),("koumuten","工務店","🏢"),
   ("sekkei","設計と 図面","📐"),("koho","木造の 工法","🏠"),("tani","尺・寸・間","📏"),
   ("jichin","地鎮祭","🎋"),("kiso","基礎工事","🧱"),("tatekata","建て方","🏗️"),
   ("joto","上棟","🎉"),("naisou","内装","🪑"),("hikiwatashi","引き渡し","🔑")],
   chain(("daiku","toryo"),("toryo","koumuten"),("sekkei","koho"),("koho","tani"),("jichin","kiso"),("kiso","tatekata"),("tatekata","joto"),("joto","naisou"),("naisou","hikiwatashi"))),
 "ki": ("木と 材料の 地図", "🌲", [("shinyoju","針葉樹","🌲"),("koyoju","広葉樹","🌳"),("seizai","伐採と 製材","🪵"),
   ("nenrin","年輪","⭕"),("mokume","木目","〰️"),("shinzai","心材と 辺材","🎯"),
   ("kanso","乾燥","☀️"),("fushi","節と くせ","🟤"),("kakohin","集成材と 合板","🧩"),
   ("kanamono","金物","🔩"),("hoka","ほかの 材料","🧱"),("mamoru","木を 守る","🛡️")],
   chain(("shinyoju","koyoju"),("seizai","nenrin"),("nenrin","mokume"),("shinzai","kanso"),("kanso","fushi"),("kakohin","kanamono"),("hoka","mamoru"))),
 # 道具箱の 図
 "dogu": ("道具箱の 図", "🧰", [("nokogiri","のこぎり","🪚"),("kanna","かんな","🪵"),("nomi","のみ","🔨"),
   ("genno","げんのう","🔨"),("sumitsubo","墨つぼ","🖋️"),("sashigane","差金","📐"),
   ("hakaru","はかる 道具","📏"),("togu","刃を 研ぐ","🪨"),("denko","電動工具","🔌"),
   ("kugi","釘と ビス","🔩"),("kikai","木工機械","🏭"),("anzen","安全の 道具","⛑️")],
   chain(("nokogiri","kanna"),("kanna","nomi"),("genno","sumitsubo"),("sumitsubo","sashigane"),("hakaru","togu"),("denko","kugi"),("kikai","anzen"))),
 # 家の 骨組みの 断面図: 屋根 → 小屋組 → 梁 → 柱 → 土台 → 基礎(上から 下へ)
 "kozo": ("家の 骨組みの 断面図", "🏗️", [("yane","屋根","🏠"),("munagi","棟木と 垂木","📏"),("koyagumi","小屋組","🔺"),
   ("hari","梁と 桁","➖"),("hashira","柱","🪵"),("kabe","壁と 筋かい","✖️"),
   ("yuka","床組","🟫"),("dodai","土台","🟧"),("kiso","基礎","🧱"),
   ("dannetsu","断熱と 防水","🧥"),("hokyo","補強の 金物","🔩"),("jishin","地震と 風に 強く","🌀")],
   chain(("yane","munagi"),("munagi","koyagumi"),("koyagumi","hari"),("hari","hashira"),("hashira","kabe"),("kabe","yuka"),("yuka","dodai"),("dodai","kiso"),("dannetsu","hokyo"),("hokyo","jishin"))),
 # 木の 継手と 仕口の 図
 "tsugite": ("継手と 仕口の 図", "🪵", [("sumitsuke","墨付け","🖋️"),("kizami","刻み","🔪"),("kiku","規矩術","📐"),
   ("tsugite","継手(長く つなぐ)","↔️"),("shiguchi","仕口(角で 組む)","📐"),("hozo","ほぞと ほぞ穴","🔲"),
   ("ari","蟻","🐜"),("kama","鎌","🌙"),("okkake","追っかけ大栓","🔗"),
   ("kanawa","金輪","💍"),("sen","栓と くさび","📌"),("kigumi","木組み","🧩")],
   chain(("sumitsuke","kizami"),("kizami","kiku"),("tsugite","shiguchi"),("shiguchi","hozo"),("ari","kama"),("kama","okkake"),("kanawa","sen"),("sen","kigumi"))),
 "shiage": ("内装と 仕上げの 図", "🚪", [("washitsu","和室","🍵"),("tokonoma","床の間","🖼️"),("shikii","敷居と 鴨居","🚪"),
   ("tategu","建具","🪟"),("yukashiage","床の 仕上げ","🟫"),("tenjo","天井","⬜"),
   ("kabeshiage","壁の 仕上げ","🧱"),("kaidan","階段","🪜"),("shuno","収納","🗄️"),
   ("soto","外まわり","🏡"),("zousaku","造作","🪑"),("nuri","塗りと 仕上げ","🖌️")],
   chain(("washitsu","tokonoma"),("tokonoma","shikii"),("tategu","yukashiage"),("yukashiage","tenjo"),("kabeshiage","kaidan"),("kaidan","shuno"),("soto","zousaku"),("zousaku","nuri"))),
 "shurui": ("大工と 職人の 地図", "👷", [("miya","宮大工","⛩️"),("ie","家大工","🏠"),("sukiya","数寄屋大工","🍵"),
   ("fune","船大工","⛵"),("katawaku","型枠大工","🧱"),("zousaku","造作大工","🪑"),
   ("tategu","建具職人","🚪"),("sakan","左官","🪣"),("tobi","鳶","🏗️"),
   ("toryo","棟梁","👷"),("deshi","見習いと 弟子","🧑‍🎓"),("shikaku","資格と 学ぶ 道","📜")],
   chain(("miya","ie"),("ie","sukiya"),("fune","katawaku"),("katawaku","zousaku"),("tategu","sakan"),("sakan","tobi"),("toryo","deshi"),("deshi","shikaku"))),
 "rekishi": ("大工の 歴史と 伝統の 地図", "⛩️", [("kodai","古代の 建物","🏺"),("horyuji","法隆寺","🏯"),("jinja","神社と 遷宮","⛩️"),
   ("banjo","番匠","👷"),("dougu","道具の 歴史","🪚"),("shoin","書院造","🏛️"),
   ("sukiya","数寄屋造り","🍵"),("shiro","城と 町家","🏯"),("minka","民家","🏡"),
   ("densho","言い伝え","📖"),("dento","伝統構法","🪵"),("isan","技を 受け継ぐ","🌏")],
   chain(("kodai","horyuji"),("horyuji","jinja"),("banjo","dougu"),("dougu","shoin"),("sukiya","shiro"),("shiro","minka"),("densho","dento"),("dento","isan"))),
}
J = [
 ("kihon","家づくりのきほん","🏠","#1d6bff","kihon","きほんマスター","大工・棟梁・工務店・設計図・木造・在来工法・ツーバイフォー・地鎮祭・上棟式・尺や 間 など、家づくりの はじめの ことば",
  [("家の 前","🏠"),("工務店","🏢"),("図面の 机","📐"),("地鎮祭","🎋"),("上棟の 日","🎉")]),
 ("ki","木と材料","🌲","#00b33c","ki","木の 物知りマスター","杉・檜・欅・年輪・柾目・板目・心材・辺材・乾燥・節・集成材・合板 など、家を つくる 木と 材料の ことば",
  [("森","🌲"),("製材所","🪵"),("木の 置き場","🟫"),("乾燥の 小屋","☀️"),("材料の 店","🧱")]),
 ("dogu","道具","🪚","#f25c00","dogu","道具マスター","のこぎり・かんな・のみ・げんのう・墨つぼ・差金・水平器・電動工具・釘・ビス など、大工さんの 道具の 名前と 何の ための 道具か",
  [("道具箱","🧰"),("作業場","🏭"),("研ぎ場","🪨"),("はかる 台","📏"),("安全の たな","⛑️")]),
 ("kozo","家のしくみ","🏗️","#8a2be0","kozo","しくみマスター","基礎・土台・柱・梁・桁・筋かい・耐力壁・小屋組・棟木・垂木・屋根・床・断熱 など、家の 骨組みの ことば",
  [("基礎","🧱"),("土台と 柱","🪵"),("梁の 上","➖"),("小屋組","🔺"),("屋根","🏠")]),
 ("tsugite","継手と仕口・墨付け","🪵","#e8368f","tsugite","木組みマスター","継手・仕口・ほぞ・蟻継ぎ・鎌継ぎ・金輪継ぎ・追っかけ大栓継ぎ・墨付け・刻み・規矩術 など、木と 木を 組む しくみの 名前",
  [("墨付けの 台","🖋️"),("刻みの 小屋","🪚"),("継手の 見本","↔️"),("仕口の 見本","📐"),("木組みの 家","🧩")]),
 ("shiage","内装と仕上げ","🚪","#0a9396","shiage","仕上げマスター","和室・床の間・敷居・鴨居・長押・建具・框・造作・フローリング・天井・階段 など、家の 中を 仕上げる ことば",
  [("玄関","🚪"),("和室","🍵"),("床の間","🖼️"),("階段","🪜"),("リビング","🛋️")]),
 ("shurui","大工の種類","👷","#e0202e","shurui","職人マスター","宮大工・家大工・数寄屋大工・船大工・型枠大工・造作大工・建具職人・左官・鳶・棟梁・見習い など、どんな ものを つくる 大工や 職人か",
  [("お寺と 神社","⛩️"),("まちの 家","🏠"),("茶室","🍵"),("港","⛵"),("職人の 集まり","👷")]),
 ("rekishi","大工の歴史と伝統","⛩️","#b5651d","rekishi","伝統マスター","法隆寺・木組み・伝統構法・大工道具の 歴史・番匠・書院造・数寄屋造り・式年遷宮・伝統建築工匠の技 など、大工の 歴史と 伝統の ことば",
  [("古代の 都","🏺"),("法隆寺","🏯"),("城下町","🏯"),("茶室","🍵"),("いまに 受け継ぐ","🌏")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="大工と 家づくりの ことばと 意味を おぼえる ゲームです。道具の 使いかたや 作業の 手順は 書いていません。刃物や 電動工具は おとなの 大工さんが 使う 道具です。まねを しないでね。寸法や 強さの 数字は 家ごとに ちがうので のせていません。工務店・ハウスメーカー・道具の 会社・職業能力開発協会とは 関係ありません。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="家や 道具で よく 聞く ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="📘", lead="建築大工技能士 2級・3級(国家検定)の 範囲の めやす"),
         dict(difficulty=3, name="上級", icon="🪵", lead="建築大工技能士 1級・二級建築士の 構造の 範囲の めやす(規矩術・継手仕口の 名前・こまかい 部材)")],
 titles=[[10,"🧳","家づくりの旅人"],[30,"🧹","見習い大工"],[60,"🪚","道具の物知り"],[100,"🌲","木の物知り"],[160,"🏗️","骨組みの仲間"],
         [240,"🪵","木組みの職人"],[320,"🚪","仕上げの職人"],[400,"👷","腕のいい大工"],[480,"⛩️","伝統の守り手"],[540,"🎓","一人前の大工"]],
 allTitle=["🏆","フリック大工マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
