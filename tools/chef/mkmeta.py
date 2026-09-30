#!/usr/bin/env python3
"""tools/chef/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/kyoshi/mkmeta.py
けいくん 2026-09-30「料理人(調理師)になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→「全部おすすめで」+「ワイン・日本酒の 銘柄や 飲みかた・カクテルも入れてください」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(医師・教師と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "shokuzai": ("食材の たな", "🥬", [("yasai","野菜","🥕"),("imo","いも・きのこ","🍄"),("kudamono","くだもの","🍎"),
   ("sakana","魚","🐟"),("kai","貝・えび・いか","🦐"),("niku","肉","🍖"),
   ("tamago","卵・乳","🥚"),("kome","米・穀物","🌾"),("mame","豆・大豆","🫘"),
   ("kanbutsu","海そう・乾物","🌿"),("chomi","調味料","🧂"),("shun","旬・産地","📅")],
   chain(("yasai","imo"),("imo","kudamono"),("sakana","kai"),("niku","tamago"),("kome","mame"),("mame","kanbutsu"),("chomi","shun"),("kai","niku"))),
 "manaita": ("まな板の 地図", "🔪", [("hocho","包丁","🔪"),("kihon","基本の 切りかた","🥒"),("kazari","かざり切り","🌸"),
   ("sakana","魚を おろす","🐟"),("niku","肉の 下ごしらえ","🥩"),("yasai","野菜の 下ごしらえ","🥬"),
   ("modosu","乾物を もどす","💧"),("aku","あく・くさみを 取る","🫧"),("yuderu","下ゆで・湯通し","♨️"),
   ("shita","下味","🧂"),("kawa","皮・種・骨","🍅"),("anzen","刃物の 安全","🛡")],
   chain(("hocho","kihon"),("kihon","kazari"),("sakana","niku"),("niku","yasai"),("modosu","aku"),("aku","yuderu"),("shita","kawa"),("kawa","anzen"))),
 "konro": ("コンロの 地図", "🍳", [("yaku","焼く","🔥"),("itameru","炒める","🍳"),("niru","煮る","🍲"),
   ("musu","蒸す","♨️"),("ageru","揚げる","🍤"),("yuderu","ゆでる","💧"),
   ("hikagen","火加減","🎚"),("toromi","とろみ・かためる","🥄"),("aji","味つけ","🧂"),
   ("kagaku","調理の 科学","🔬"),("kigu","なべ・調理器具","🥘"),("kikai","厨房の 機械","⚙️")],
   chain(("yaku","itameru"),("itameru","niru"),("musu","ageru"),("ageru","yuderu"),("hikagen","toromi"),("toromi","aji"),("kagaku","kigu"),("kigu","kikai"))),
 "zen": ("和食の 膳", "🍱", [("kondate","献立・一汁三菜","📜"),("dashi","だし","🐟"),("shiru","汁もの","🥣"),
   ("mukozuke","刺身・向付","🍣"),("nimono","煮物・焼物・揚物","🍢"),("kaiseki","懐石・会席","🏯"),
   ("shojin","精進料理","🌱"),("sushi","すし・ごはんもの","🍙"),("men","そば・うどん","🍜"),
   ("kyodo","郷土料理","🗾"),("utsuwa","器・盛りつけ","🍶"),("gyoji","行事の 料理","🎍")],
   chain(("kondate","dashi"),("dashi","shiru"),("mukozuke","nimono"),("nimono","kaiseki"),("shojin","sushi"),("sushi","men"),("kyodo","utsuwa"),("utsuwa","gyoji"))),
 "sekai": ("世界の 料理地図", "🌍", [("france","フランス","🇫🇷"),("italy","イタリア","🇮🇹"),("spain","スペイン・ポルトガル","🇪🇸"),
   ("europe","ほかの ヨーロッパ","🏰"),("china","中国","🇨🇳"),("korea","韓国","🇰🇷"),
   ("asia","東南アジア・インド","🍛"),("middle","中東・アフリカ","🕌"),("america","アメリカ大陸","🌮"),
   ("sauce","ソース","🥣"),("seiyo","西洋料理の 厨房","👨‍🍳"),("chuka","中国料理の 厨房","🥢")],
   chain(("france","italy"),("italy","spain"),("europe","china"),("china","korea"),("asia","middle"),("middle","america"),("sauce","seiyo"),("seiyo","chuka"))),
 "chubo": ("厨房の 地図", "🧼", [("tearai","手洗い・身じたく","🧼"),("ukeire","受け入れ・検収","📦"),("hozon","冷蔵・冷凍・保管","🧊"),
   ("shoriba","下処理の 場所","🚰"),("kanetsu","加熱","🔥"),("haizen","盛りつけ・配膳","🍽"),
   ("senjo","洗浄・消毒","🫧"),("saikin","細菌","🦠"),("virus","ウイルス・寄生虫・自然毒","🔬"),
   ("haccp","HACCP・記録","📋"),("allergy","アレルギー・表示","🏷"),("ho","法律・資格","⚖️")],
   chain(("tearai","ukeire"),("ukeire","hozon"),("shoriba","kanetsu"),("kanetsu","haizen"),("senjo","saikin"),("saikin","virus"),("haccp","allergy"),("allergy","ho"))),
 "eiyo": ("栄養と 食文化の 地図", "🥗", [("gotai","五大栄養素","🍚"),("vitamin","ビタミン・ミネラル","🍊"),("shoka","消化・エネルギー","⚡"),
   ("balance","食事の バランス","⚖️"),("kenko","健康と 食事","💗"),("koshu","みんなの 健康","🏥"),
   ("nendai","年代と 食事","👶"),("gyoji","行事食","🎎"),("saho","作法・マナー","🥢"),
   ("rekishi","食の 歴史","📜"),("bunka","世界の 食文化","🌏"),("kankyo","食と 環境","♻️")],
   chain(("gotai","vitamin"),("vitamin","shoka"),("balance","kenko"),("kenko","koshu"),("nendai","gyoji"),("gyoji","saho"),("rekishi","bunka"),("bunka","kankyo"))),
 "sakagura": ("お酒の たな", "🍷", [("wine","ワイン","🍷"),("budo","ぶどうの 品種","🍇"),("sanchi","ワインの 産地","🗺"),
   ("nihonshu","日本酒","🍶"),("tsukuri","酒米・酒造り","🌾"),("shochu","焼酎・泡盛","🥃"),
   ("beer","ビール","🍺"),("yoshu","洋酒・リキュール","🍾"),("cocktail","カクテル","🍸"),
   ("nomikata","飲みかた・温度","🌡"),("pairing","料理との 相性","🍽"),("kimari","お酒の 決まり","⚖️")],
   chain(("wine","budo"),("budo","sanchi"),("nihonshu","tsukuri"),("tsukuri","shochu"),("beer","yoshu"),("yoshu","cocktail"),("nomikata","pairing"),("pairing","kimari"))),
}
J = [
 ("shokuzai","食材のことば","🥬","#00b33c","shokuzai","食材マスター","野菜・魚・肉・米・豆・調味料の 名前と 旬など、料理の もとに なる 食材の ことば",
  [("市場の 入口","🚪"),("野菜の たな","🥕"),("魚の 売り場","🐟"),("肉の 売り場","🍖"),("調味料の たな","🧂")]),
 ("kiri","切りかたと下ごしらえ","🔪","#1d6bff","manaita","包丁マスター","千切り・乱切り・面取り・三枚おろし・湯むき・霜降りなど、切りかたと 下ごしらえの ことば",
  [("まな板の 前","🔪"),("野菜の かご","🥬"),("魚の まな板","🐟"),("乾物の ボウル","💧"),("下ごしらえの 台","🧂")]),
 ("waza","調理のわざ","🍳","#f25c00","konro","火加減マスター","焼く・煮る・蒸す・揚げる・火加減・とろみ・調理の 科学など、火を 使って 作る ことば",
  [("コンロの 前","🔥"),("煮物の なべ","🍲"),("蒸し器","♨️"),("揚げ場","🍤"),("味見の 小皿","🥄")]),
 ("washoku","日本料理","🍱","#e0202e","zen","和食マスター","一汁三菜・だし・懐石・精進料理・すし・郷土料理・器など、和食の ことば",
  [("のれんの 前","🏮"),("だしの なべ","🐟"),("お膳の 部屋","🍱"),("すしの カウンター","🍣"),("日本の 旅","🗾")]),
 ("sekai","世界の料理","🍝","#8a2be0","sekai","世界の料理マスター","フランス・イタリア・中国・韓国・アジアなどの 料理と、ソテー・アルデンテなど 厨房の ことば",
  [("パリの 食堂","🇫🇷"),("ローマの 台所","🇮🇹"),("中華の 厨房","🥢"),("アジアの 屋台","🍛"),("アメリカの 町","🌮")]),
 ("eisei","衛生と安全","🧼","#0a9396","chubo","衛生マスター","手洗い・食中毒・HACCP・温度管理・アレルギー表示・食品衛生法など、食べる 人を 守る ことば",
  [("手洗い場","🧼"),("冷蔵庫の 前","🧊"),("加熱の コンロ","🔥"),("洗い場","🫧"),("記録の 机","📋")]),
 ("eiyo","栄養と食文化","🥗","#e8368f","eiyo","栄養マスター","五大栄養素・食事の バランス・行事食・箸の 作法・食の 歴史など、からだと くらしを 支える 食の ことば",
  [("栄養の 教室","🍚"),("バランスの てんびん","⚖️"),("行事の 食卓","🎎"),("作法の 座敷","🥢"),("世界の 食卓","🌏")]),
 ("osake","お酒と飲みもの","🍷","#b5179e","sakagura","お酒マスター","ワイン・ぶどうの 品種・産地・日本酒・焼酎・カクテル・料理との 相性など、お酒の ことば(飲むのは 20歳に なってから)",
  [("ワインの 棚","🍷"),("酒蔵","🍶"),("焼酎の 蔵","🥃"),("バーの カウンター","🍸"),("料理との 食卓","🍽")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年9月",
 note="料理の ことばと 意味を おぼえる ゲームです。レシピ(分量・温度・時間)や 包丁・火・油の 使いかたは のせていません。火や 包丁を 使う ときは かならず 大人と いっしょに。お酒は 20歳に なってから。むずかしさは「調理師試験の 範囲の めやす」で、本物の 試験問題では ありません。都道府県・厚生労働省とは 関係ありません。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="台所で 聞く ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="🍳", lead="調理師試験の 6科目の 範囲の めやす"),
         dict(difficulty=3, name="上級", icon="👨‍🍳", lead="プロの 厨房の ことば・技能検定・フランス語や 中国語の ことばの めやす")],
 titles=[[10,"🧳","料理の旅人"],[30,"🔰","見習いコック"],[60,"🔪","包丁の名人"],[100,"🍳","火加減の達人"],[160,"🍱","和食の物知り"],
         [220,"🍝","世界の料理通"],[290,"🧼","衛生の守り手"],[360,"🥗","栄養の案内人"],[440,"🍷","ソムリエの卵"],[520,"👨‍🍳","一人前の料理人"]],
 allTitle=["🏆","フリック料理人マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
