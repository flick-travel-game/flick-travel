#!/usr/bin/env python3
"""tools/toshika/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/adler/mkmeta.py
けいくん 2026-10-02「投資家の専門家になれるレベルになるために必要な 知識をフリック形式の問題にしてください。
竹田和平さんのように 好きな企業を応援する長期投資スタイルがメインの投資家に育ってほしいです」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(税理士・アドラーと 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "kihon": ("投資の 地図", "🌱", [("chokin","貯金と 投資","🐷"),("toshi","投資","🌱"),("kabushiki","株式","📜"),
   ("kabunushi","株主","🙋"),("haito","配当","🎁"),("yutai","株主優待","🍪"),
   ("risk","リスクと リターン","⚖️"),("fukuri","複利","❄️"),("bunsan","分散","🧺"),
   ("nagaku","長く 持つ","⏳"),("seido","投資の 制度","📘"),("manabu","学びと 相談","🧑‍🏫")],
   chain(("chokin","toshi"),("toshi","kabushiki"),("kabunushi","haito"),("haito","yutai"),("risk","fukuri"),("fukuri","bunsan"),("nagaku","seido"),("seido","manabu"))),
 # 会社と 株主の 図: お金を 出す → 会社が 育つ → 配当・株主優待 → 応援が 続く
 "kaisha": ("会社と 株主の 図", "🏢", [("kabunushi","株主","🙋"),("shusshi","お金を 出す","🤲"),("kaisha","会社","🏢"),
   ("jigyo","事業","⚙️"),("shohin","商品と ブランド","🛍"),("okyaku","お客さん","😊"),
   ("shain","社員","👷"),("keiei","経営者と 理念","🧭"),("chiiki","地域と 社会","🏘"),
   ("tsuyomi","強み","💪"),("rieki","利益","📈"),("okaeshi","配当と 優待で お返し","🎁")],
   chain(("kabunushi","shusshi"),("shusshi","kaisha"),("jigyo","shohin"),("shohin","okyaku"),("shain","keiei"),("keiei","chiiki"),("tsuyomi","rieki"),("rieki","okaeshi"))),
 # 長期投資の 木: 種 → 芽 → 大きな 木
 "ki": ("長期投資の 木", "🌳", [("tane","種(会社を えらぶ)","🌰"),("mizu","水やり(つみたて)","💧"),("me","芽","🌱"),
   ("ne","根(長い 目)","🪵"),("miki","幹(会社の 力)","🌲"),("eda","枝(事業が 広がる)","🌿"),
   ("mi","実(配当)","🍎"),("soukai","株主総会","🏛"),("oen","株主の 応援","📣"),
   ("saitoshi","再投資","🔁"),("ookinaki","大きな 木","🌳"),("hanasaka","花咲爺の 心","🌸")],
   chain(("tane","mizu"),("mizu","me"),("ne","miki"),("miki","eda"),("mi","soukai"),("soukai","oen"),("saitoshi","ookinaki"),("ookinaki","hanasaka"))),
 # 決算書の 3つの 箱: 貸借対照表・損益計算書・キャッシュフロー計算書
 "kessan": ("決算書の 3つの 箱", "📊", [("kessan","決算","📅"),("bs","貸借対照表","⚖️"),("pl","損益計算書","📊"),
   ("cf","キャッシュフロー計算書","🔄"),("shisan","資産","🏭"),("fusai","負債","📑"),
   ("junshisan","純資産","💎"),("uriage","売上","🛒"),("rieki","利益","📈"),
   ("kabuka","株価との くらべ","🔍"),("monosashi","指標(ものさし)","📏"),("kaiji","開示","📣")],
   chain(("kessan","bs"),("bs","pl"),("cf","shisan"),("shisan","fusai"),("junshisan","uriage"),("uriage","rieki"),("kabuka","monosashi"),("monosashi","kaiji"))),
 "shijo": ("市場の 地図", "🏛️", [("torihikijo","取引所","🏛"),("shoken","証券会社","🏦"),("koza","口座","🗂"),
   ("jojo","上場","🔔"),("kabuka","株価","📈"),("shisu","株価指数","🧮"),
   ("shintaku","投資信託","🧺"),("saiken","債券","📜"),("kinri","金利","🏷"),
   ("kawase","為替","💱"),("kimari","投資家を 守る 決まり","🛡"),("sekai","世界の 市場","🌐")],
   chain(("torihikijo","shoken"),("shoken","koza"),("jojo","kabuka"),("kabuka","shisu"),("shintaku","saiken"),("saiken","kinri"),("kawase","kimari"),("kimari","sekai"))),
 "kokoro": ("こころの 地図", "🧭", [("nagaime","長い 目","🔭"),("awatenai","あわてない","🍵"),("shiru","知って えらぶ","🔎"),
   ("mane","人の まねを しない","🚶"),("kuse","気もちの くせ","🌀"),("shippai","失敗から 学ぶ","🌱"),
   ("kiroku","記録と ふりかえり","📓"),("matsu","待つ 力","⏳"),("toku","徳","🌸"),
   ("kansha","感謝","🙏"),("manabu","学びつづける","📚"),("oen","応援する 心","📣")],
   chain(("nagaime","awatenai"),("awatenai","shiru"),("mane","kuse"),("kuse","shippai"),("kiroku","matsu"),("matsu","toku"),("kansha","manabu"),("manabu","oen"))),
 "rekishi": ("歴史と 人びとの 地図", "📜", [("hajimari","株式会社の はじまり","⛵"),("higashi","東インド会社","🧭"),("dojima","堂島米会所","🌾"),
   ("meiji","明治の 取引所","🎩"),("shibusawa","渋沢栄一","📗"),("takeda","竹田和平","🌸"),
   ("gakusha","学者と 理論","🎓"),("sekai","世界の 投資家","🌐"),("bubble","バブルの 教え","🫧"),
   ("sengo","戦後の 市場","🌱"),("ima","いまの 市場","📰"),("meigen","名言と 考えかた","💬")],
   chain(("hajimari","higashi"),("higashi","dojima"),("meiji","shibusawa"),("shibusawa","takeda"),("gakusha","sekai"),("sekai","bubble"),("sengo","ima"),("ima","meigen"))),
}
J = [
 ("kihon","投資のきほん","🌱","#1d6bff","kihon","きほんマスター","投資・株式・株主・配当・株主優待・リスクと リターン・複利・分散・NISA の 名前など、投資を 学ぶ はじめの ことば",
  [("お金の 教室","🏫"),("貯金箱","🐷"),("株主の 席","🙋"),("配当の 日","🎁"),("ことばの 図書館","📚")]),
 ("kaisha","会社を知る","🏢","#00b33c","kaisha","会社マスター","事業・商品・ブランド・経営者・理念・強み・お客さん・社員・地域・ESG など、好きな 会社を 見つけて 知る ための ことば",
  [("まちの お店","🏪"),("工場","🏭"),("会社の 受付","🏢"),("経営者の 部屋","🧭"),("地域の まつり","🏘")]),
 ("choki","長期投資と応援","🌳","#f25c00","ki","応援マスター","長期投資・バイアンドホールド・つみたて・株主総会・議決権・増配・再投資・竹田和平さんの 考えかた など、株主として 長く 応援する ことば",
  [("種まきの 庭","🌰"),("水やり","💧"),("株主総会","🏛"),("実りの 秋","🍎"),("花咲く 丘","🌸")]),
 ("kessan","決算書を読む","📊","#8a2be0","kessan","決算マスター","決算・売上高・営業利益・純利益・貸借対照表・損益計算書・キャッシュフロー・自己資本比率・ROE・PER・PBR など、決算書で 会社を 知る ことば(何を 見る 数字か)",
  [("決算の 発表","📅"),("3つの 箱","📦"),("ものさしの たな","📏"),("監査の 部屋","🔍"),("投資家の 机","📓")]),
 ("shijo","市場としくみ","🏛️","#e8368f","shijo","市場マスター","証券取引所・東証の 市場区分・証券会社・上場・株価・株価指数・投資信託・ETF・債券・金利・為替・投資家を 守る 決まり など、市場の しくみの ことば",
  [("取引所","🏛"),("証券会社","🏦"),("ニュースの 画面","📺"),("日本銀行","🏯"),("世界の 市場","🌐")]),
 ("kokoro","投資家のこころ","🧭","#0a9396","kokoro","こころマスター","長い 目・あわてない・人の まねを しない・知らない 会社には 投資しない・失敗から 学ぶ・行動ファイナンスの ことば など、投資家の 心がまえ",
  [("しずかな 書斎","📓"),("にぎやかな まち","🚶"),("ふりかえりの 机","🔎"),("待つ 庭","⏳"),("感謝の 道","🙏")]),
 ("rekishi","投資の歴史と人びと","📜","#e0202e","rekishi","歴史マスター","東インド会社・株式会社の はじまり・堂島米会所・渋沢栄一・グレアム・竹田和平・バブルの 名前など、投資の 歴史と 人びとの ことば",
  [("大航海の 港","⛵"),("堂島の 米市場","🌾"),("明治の 取引所","🎩"),("世界の 学者たち","🎓"),("いまの 市場","📰")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="投資と 会社の ことばと 意味を おぼえる ゲームです。投資を すすめる ものでは ありません。どの 会社を 買えば よいか・売り時 買い時は 書いていません。株価や 金額・税の 上限は 年ごとに 変わるので のせていません。証券会社・取引所・日本証券業協会・日本証券アナリスト協会とは 関係ありません。お金の ことは おうちの 人や 専門の 人と 相談してください。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="くらしや ニュースで 聞く お金と 会社の ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="📘", lead="証券外務員・FP(ファイナンシャル・プランナー)の 範囲の めやす(大きな ことば)"),
         dict(difficulty=3, name="上級", icon="📊", lead="証券アナリスト(CMA)の 範囲の めやす(企業分析・決算書の こまかい 指標・ポートフォリオ理論)")],
 titles=[[10,"🧳","投資の旅人"],[30,"🌰","種まきの見習い"],[60,"🌱","株主の卵"],[100,"🏢","会社の物知り"],[160,"🌳","長期投資の仲間"],
         [220,"📊","決算書の読み手"],[290,"🏛️","市場の案内人"],[360,"🧭","こころの達人"],[420,"🌸","応援する投資家"],[480,"🎓","一人前の投資家"]],
 allTitle=["🏆","フリック投資家マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
