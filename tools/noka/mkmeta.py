#!/usr/bin/env python3
"""tools/noka/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/daiku/mkmeta.py
けいくん 2026-10-03「農家の専門家になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(大工・投資家と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 # 1年の 農業カレンダー(春 種まき → 夏 育てる → 秋 収穫 → 冬 土づくり)+ 植物の からだと 育つ しくみ
 "kihon": ("1年の 農業カレンダー", "🌱", [("haru","春の 種まき","🌸"),("natsu","夏の 育ち","☀️"),("aki","秋の 収穫","🍂"),
   ("fuyu","冬の 土づくり","❄️"),("sekki","二十四節気と 暦","📅"),("tenki","天気と 気候","🌦️"),
   ("tane","種と 苗","🌱"),("karada","植物の からだ","🌿"),("hikari","光合成と 育つ しくみ","🌞"),
   ("hatake","畑","🥬"),("tanbo","田んぼ","🌾"),("noka","農家と 農業","👩‍🌾")],
   chain(("haru","natsu"),("natsu","aki"),("aki","fuyu"),("tane","karada"),("karada","hikari"),("hatake","tanbo"),("tanbo","noka"))),
 "yasai": ("野菜畑の 地図", "🥕", [("kasai","実を 食べる 野菜","🍅"),("yosai","葉を 食べる 野菜","🥬"),("konsai","根を 食べる 野菜","🥕"),
   ("imo","いもと 豆","🥔"),("tanezukuri","種と 苗づくり","🌱"),("une","畝と 畑","🟫"),
   ("shichu","支柱と 誘引","🎋"),("teire","間引きと 手入れ","✂️"),("rensaku","連作と 輪作","🔄"),
   ("house","ハウス栽培","🏠"),("roji","露地栽培","🌤️"),("shun","野菜の 旬","📅")],
   chain(("kasai","yosai"),("yosai","konsai"),("tanezukuri","une"),("une","shichu"),("shichu","teire"),("house","roji"),("roji","shun"))),
 # 田んぼの 1年(田おこし → 代かき → 田植え → 稲刈り)
 "kome": ("田んぼの 1年", "🌾", [("taokoshi","田おこし","🚜"),("nawashiro","苗代と 育苗","🌱"),("shirokaki","代かき","💧"),
   ("taue","田植え","🌾"),("mizu","水の 管理","🚿"),("ine","稲の からだ","🌿"),
   ("ho","穂と 花","🌾"),("inekari","稲刈り","🍂"),("kanso","乾燥と もみすり","🌬️"),
   ("seimai","玄米と 精米","🍚"),("hinshu","お米の 品種","🏷️"),("tanada","水田と 棚田","⛰️")],
   chain(("taokoshi","nawashiro"),("nawashiro","shirokaki"),("shirokaki","taue"),("taue","mizu"),("mizu","ine"),("ine","ho"),("ho","inekari"),("inekari","kanso"),("kanso","seimai"))),
 "kudamono": ("果樹園と 花畑の 地図", "🍎", [("kajuen","果樹園","🌳"),("ringo","りんごと なし","🍎"),("kankitsu","みかんの なかま","🍊"),
   ("budou","ぶどうと もも","🍇"),("ichigo","いちごと メロン","🍓"),("tsugiki","接ぎ木と 苗木","🌱"),
   ("junfun","花と 受粉","🐝"),("sentei","剪定","✂️"),("tekka","摘果と 袋かけ","🍐"),
   ("shukaku","収穫と 追熟","🧺"),("kaki","花き","💐"),("hanasaibai","花の 栽培","🌷")],
   chain(("kajuen","tsugiki"),("tsugiki","junfun"),("junfun","sentei"),("sentei","tekka"),("tekka","shukaku"),("kaki","hanasaibai"))),
 "tsuchi": ("土の 中と 畑の 生きもの", "🪱", [("dojo","土の つくり","🟫"),("tsuchizukuri","土づくり","🧑‍🌾"),("taihi","堆肥","🍂"),
   ("hiryo","肥料","🧪"),("yoso","作物の 養分","🌿"),("sansei","土の 酸性","⚗️"),
   ("biseibutsu","微生物","🦠"),("mimizu","ミミズと 土の 生きもの","🪱"),("gaichu","作物を 食べる 虫","🐛"),
   ("ekichu","益虫と 天敵","🐞"),("byoki","作物の 病気","🍄"),("yuki","有機農業と 環境","🌏")],
   chain(("dojo","tsuchizukuri"),("tsuchizukuri","taihi"),("hiryo","yoso"),("yoso","sansei"),("biseibutsu","mimizu"),("gaichu","ekichu"),("ekichu","byoki"),("byoki","yuki"))),
 # 農業の 機械の 地図(手の 道具 → 機械 → スマート農業)
 "dogu": ("農業の 機械の 地図", "🚜", [("tedogu","手の 道具","🧺"),("tractor","トラクター","🚜"),("koun","耕うん","🟫"),
   ("taueki","田植え機","🌾"),("combine","コンバイン","🌾"),("kansoki","乾燥と もみすりの 機械","🏭"),
   ("kanriki","管理機と 草刈り","🌿"),("house","ハウスと 設備","🏠"),("kansui","水やりの 設備","💧"),
   ("drone","ドローン","🛸"),("smart","スマート農業","📡"),("anzen","安全と 講習","⛑️")],
   chain(("tedogu","tractor"),("tractor","koun"),("taueki","combine"),("combine","kansoki"),("kanriki","house"),("house","kansui"),("drone","smart"),("smart","anzen"))),
 "chikusan": ("牧場の 地図", "🐄", [("ushi","牛","🐄"),("rakuno","酪農と 牛乳","🥛"),("buta","豚","🐖"),
   ("niwatori","にわとりと 卵","🐔"),("bokuso","牧草と 飼料","🌾"),("chikusha","牛舎と 畜舎","🏚️"),
   ("kenko","家畜の 健康","🩺"),("hinshu","家畜の 品種","🏷️"),("hoka","ほかの 家畜","🐑"),
   ("nyuseihin","乳製品","🧀"),("kurashi","家畜の くらし","🏡"),("junkan","ふんと 土の 循環","♻️")],
   chain(("ushi","rakuno"),("rakuno","nyuseihin"),("bokuso","chikusha"),("chikusha","kenko"),("kurashi","junkan"))),
 # 畑から 食卓までの 流れ(育てる → 収穫 → 出荷 → 市場 → お店 → 食卓)
 "shigoto": ("畑から 食卓までの 流れ", "🏪", [("sodateru","育てる","🌱"),("shukaku","収穫と 選別","🧺"),("shukka","出荷","📦"),
   ("ja","JA(農協)","🤝"),("shijo","市場","🏬"),("mise","お店","🛒"),
   ("shokutaku","食卓","🍽️"),("chokubai","直売所と 地産地消","🏪"),("rokuji","六次産業化","🏭"),
   ("ninsho","GAPと 有機JAS","✅"),("shuno","新規就農と 後継者","🧑‍🌾"),("rekishi","農業の 歴史","📜")],
   chain(("sodateru","shukaku"),("shukaku","shukka"),("shukka","ja"),("ja","shijo"),("shijo","mise"),("mise","shokutaku"),("chokubai","rokuji"),("ninsho","shuno"))),
}
J = [
 ("kihon","農業のきほん","🌱","#2f9e44","kihon","きほんマスター","農家・田んぼ・畑・種・苗・種まき・収穫・旬・二十四節気・天気・光合成・植物の からだ など、農業の はじめの ことば",
  [("春の 畑","🌸"),("夏の 田んぼ","☀️"),("秋の 実り","🍂"),("冬の 畑","❄️"),("農家の 家","🏡")]),
 ("yasai","野菜","🥕","#f25c00","yasai","野菜マスター","トマト・キャベツ・だいこん・じゃがいも・葉物・根菜・果菜・連作障害・輪作・支柱・間引き・ハウス栽培・露地栽培 など、野菜を 育てる ことば",
  [("種まきの 畑","🌱"),("トマト畑","🍅"),("葉物の 畑","🥬"),("ハウス","🏠"),("収穫の 畑","🧺")]),
 ("kome","お米","🌾","#e0a800","kome","お米マスター","稲・苗代・代かき・田植え・水田・稲刈り・もみ・玄米・精米・新米・品種・棚田 など、お米を 育てる ことば",
  [("苗代","🌱"),("田植えの 田んぼ","🌾"),("夏の 水田","💧"),("稲刈りの 田んぼ","🍂"),("精米所","🍚")]),
 ("kudamono","果物と花","🍎","#e0202e","kudamono","果樹と 花の マスター","りんご・みかん・ぶどう・いちご・果樹園・接ぎ木・受粉・剪定・摘果・追熟・花き・花の 栽培 など、果物と 花を 育てる ことば",
  [("果樹園","🌳"),("花の さく 春","🐝"),("夏の 果樹","🍑"),("秋の 収穫","🍎"),("花畑","💐")]),
 ("tsuchi","土と肥料と虫","🪱","#8b5a2b","tsuchi","土の 物知りマスター","土づくり・堆肥・腐葉土・肥料・窒素・リン酸・カリウム・ミミズ・微生物・作物を 食べる 虫・益虫・天敵・病気・有機農業 など、土と 生きものの ことば",
  [("畑の 土","🟫"),("堆肥小屋","🍂"),("土の 中","🪱"),("畑の 虫","🐞"),("自然の 畑","🌏")]),
 ("dogu","農機具とスマート農業","🚜","#1d6bff","dogu","機械マスター","くわ・かま・トラクター・耕うん機・田植え機・コンバイン・乾燥機・草刈り機・ビニールハウス・ドローン・自動運転・センサー など、農業を 効率よく する 道具と 機械の ことば",
  [("道具小屋","🧺"),("トラクターの 畑","🚜"),("田植えの 田んぼ","🌾"),("ハウス","🏠"),("スマート農場","📡")]),
 ("chikusan","畜産と酪農","🐄","#8a2be0","chikusan","牧場マスター","牛・豚・にわとり・酪農・牧場・牛乳・卵・飼料・牧草・家畜・乳製品 など、くらしと 食べものに つながる 動物を 育てる ことば",
  [("牧草地","🌾"),("牛舎","🐄"),("鶏舎","🐔"),("乳しぼりの 部屋","🥛"),("チーズ工房","🧀")]),
 ("shigoto","農家の仕事としくみ","🏪","#0a9396","shigoto","しくみマスター","出荷・JA・直売所・市場・食料自給率・地産地消・六次産業化・GAP・有機JAS・新規就農・農業の 歴史 など、農家の 仕事と 社会の しくみの ことば",
  [("出荷場","📦"),("市場","🏬"),("直売所","🏪"),("食卓","🍽️"),("むかしの 村","📜")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="農業の ことばと 意味を おぼえる ゲームです。農薬の 名前や 量・使いかたは 書いていません。農業の 機械は 講習を 受けた おとなが 使う ものです。収穫量・値段・自給率などの 数字は 年ごとに 変わるので のせていません。JA・農機具や 肥料の 会社・日本農業技術検定協会とは 関係ありません。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="スーパーや 学校の 畑・家庭菜園で よく 聞く ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="📘", lead="日本農業技術検定 3級・2級の 範囲の めやす"),
         dict(difficulty=3, name="上級", icon="🌾", lead="日本農業技術検定 1級・農業高校〜大学の 農学の めやす(土壌・植物の しくみ・病害虫・農業経営)")],
 titles=[[10,"🧳","畑の旅人"],[30,"🌱","はじめての種まき"],[60,"🥕","野菜の物知り"],[100,"🌾","田んぼの仲間"],[160,"🍎","実りの仲間"],
         [240,"🪱","土の物知り"],[320,"🚜","機械の名人"],[400,"🐄","牧場の仲間"],[480,"🏪","農業のしくみ博士"],[540,"🎓","一人前の農家"]],
 allTitle=["🏆","フリック農家マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
