#!/usr/bin/env python3
"""tools/kyukyutai/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/shobo/mkmeta.py
けいくん 2026-10-03「救急隊員の専門家になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめで」・重い ことばは「事実だけ おだやかに 入れる」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(消防士と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 # 119番から 病院までの 流れ(指令センター → 出動 → 現場 → 搬送 → 引きつぎ)
 "nagare": ("119番から 病院までの 流れ", "🚑", [("tsuho","119番","☎️"),("shirei","指令センター","🖥"),("shutsudo","救急隊の 出動","🚑"),
   ("genba","現場","📍"),("shobyosha","傷病者と 家族","🧑‍🤝‍🧑"),("kyumeishi","救急救命士","🩺"),
   ("hanso","病院へ 運ぶ","🛣"),("byoin","病院","🏥"),("hikitsugi","引きつぎ","🤝"),
   ("soudan","相談の 窓口(#7119)","📞"),("tekisei","救急車の 正しい 使いかた","🙆"),("hi","救急の日・救命講習","🎓")],
   chain(("tsuho","shirei"),("shirei","shutsudo"),("genba","shobyosha"),("shobyosha","kyumeishi"),("hanso","byoin"),("byoin","hikitsugi"),("soudan","tekisei"),("tekisei","hi"),("shutsudo","genba"),("kyumeishi","hanso"))),
 # 救命の連鎖(気づく → 119番 → 胸骨圧迫と AED → 救急隊 → 病院)
 "rensa": ("救命の連鎖", "❤️", [("yobo","ふせぐ","🛡"),("kizuku","気づく","👀"),("tsuho","119番と 口頭指導","☎️"),
   ("cpr","胸骨圧迫","❤️"),("kokyu","人工呼吸","🌬"),("aed","AED","⚡"),
   ("kido","気道確保","😮‍💨"),("kaifuku","回復体位","🛌"),("shiketsu","止血","🩹"),
   ("oukyu","応急手当","🧰"),("bystander","まわりの 人","🙋"),("tsunagu","救急隊と 病院へ","🚑")],
   chain(("yobo","kizuku"),("kizuku","tsuho"),("cpr","kokyu"),("kokyu","aed"),("kido","kaifuku"),("kaifuku","shiketsu"),("oukyu","bystander"),("bystander","tsunagu"),("tsuho","cpr"),("aed","tsunagu"))),
 # からだの 図(観察する ところ)
 "karada": ("からだを 見る 図", "🩺", [("ishiki","意識","🧠"),("kokyu","呼吸","🫁"),("myaku","脈拍","💓"),
   ("ketsuatsu","血圧","🩺"),("taion","体温","🌡"),("sanso","血の 中の 酸素","🫧"),
   ("hifu","顔色と 皮膚","🙂"),("me","目と 瞳孔","👁"),("atama","頭と 首","🧑"),
   ("mune","胸と おなか","🫃"),("teashi","手と 足","🦵"),("kiku","話を 聞く","💬")],
   chain(("ishiki","kokyu"),("kokyu","myaku"),("ketsuatsu","taion"),("taion","sanso"),("hifu","me"),("me","atama"),("mune","teashi"),("teashi","kiku"),("myaku","ketsuatsu"))),
 # けがと 病気の 図(からだの どこで 何が 起きたか)
 "byoki": ("けがと 病気の 図", "🩹", [("nou","脳と 神経","🧠"),("shinzo","心臓と 血管","❤️"),("hai","肺と 呼吸","🫁"),
   ("onaka","おなか","🍽"),("hone","骨と 関節","🦴"),("hifu","皮膚と やけど","🩹"),
   ("atsusa","暑さ・寒さ","🌡"),("mizu","水の 事故","🌊"),("allergy","アレルギー・中毒","⚠️"),
   ("kodomo","子ども","🧒"),("koreisha","高齢の 人","🧓"),("ninpu","妊娠と 出産","🤰")],
   chain(("nou","shinzo"),("shinzo","hai"),("onaka","hone"),("hone","hifu"),("atsusa","mizu"),("mizu","allergy"),("kodomo","koreisha"),("koreisha","ninpu"))),
 # 現場から 病院への 図
 "hansou": ("現場から 病院への 図", "🛣", [("genba","現場に 着く","📍"),("anzen","現場の 安全","🦺"),("triage","トリアージ","🏷"),
   ("sentei","運ぶ 病院を えらぶ","🗺"),("renraku","病院への 連絡","📻"),("shoki","初期救急","🏠"),
   ("niji","二次救急","🏥"),("sanji","三次救急","🏨"),("heli","ドクターヘリ","🚁"),
   ("car","ドクターカー","🚗"),("hikitsugi","引きつぎ","🤝"),("gairai","救急外来","🚪")],
   chain(("genba","anzen"),("anzen","triage"),("sentei","renraku"),("shoki","niji"),("niji","sanji"),("heli","car"),("car","hikitsugi"),("hikitsugi","gairai"),("triage","sentei"))),
 # 救急車の 中の 図
 "sharyo": ("救急車の 中の 図", "🧰", [("sharyo","救急車","🚑"),("stretcher","ストレッチャー","🛏"),("kotei","全身の 固定","🪵"),
   ("sanso","酸素","🫧"),("kyuin","吸引","🧪"),("kanki","換気の 道具","🎈"),
   ("monitor","モニター","📈"),("aed","除細動の 機械","⚡"),("shiketsu","止血と 固定の 道具","🩹"),
   ("kansen","感染防止","🧤"),("musen","無線と 記録","📻"),("seiso","消毒と 点検","🧽")],
   chain(("sharyo","stretcher"),("stretcher","kotei"),("sanso","kyuin"),("kyuin","kanki"),("monitor","aed"),("aed","shiketsu"),("kansen","musen"),("musen","seiso"))),
 # 救急の しくみの 図
 "shikumi": ("救急の しくみの 図", "📋", [("shoboho","消防法","📘"),("kyumeishiho","救急救命士法","📗"),("mc","メディカルコントロール","👩‍⚕️"),
   ("protocol","プロトコル","📄"),("tokutei","特定行為","🩺"),("shiji","医師の 指示","📞"),
   ("kiroku","救急活動記録","📝"),("shuhi","守秘義務","🤫"),("kansen","感染対策","🧼"),
   ("kenshu","講習と 研修","🎓"),("rekishi","救急の 歴史","📜"),("chiiki","地域の 救急","🏙")],
   chain(("shoboho","kyumeishiho"),("kyumeishiho","mc"),("protocol","tokutei"),("tokutei","shiji"),("kiroku","shuhi"),("shuhi","kansen"),("kenshu","rekishi"),("rekishi","chiiki"),("mc","protocol"))),
}
J = [
 ("kihon","救急のきほん","🚑","#e0202e","nagare","救急のきほんマスター","119番・救急隊・救急隊員・救急救命士・救急車・出動・傷病者・搬送・救急の日・救急安心センター(#7119)など、救急の いちばん はじめの ことば",
  [("119番の 電話","☎️"),("指令センター","🖥"),("消防署の 救急隊","🚑"),("現場","📍"),("病院の 入口","🏥")]),
 ("kyumei","救命の手当て","❤️","pink","rensa","救命の連鎖マスター","救命の連鎖・心肺蘇生・胸骨圧迫・AED・気道確保・回復体位・止血・応急手当・バイスタンダーなど、命を つなぐ 手当ての 名前と ねらい",
  [("救命講習の 教室","🎓"),("駅の AED","⚡"),("学校の 保健室","🩹"),("まちの 広場","🙋"),("救急隊が 着く とき","🚑")]),
 ("kansatsu","からだを見る","🩺","blue","karada","観察マスター","意識・呼吸・脈拍・血圧・体温・SpO2・顔色・瞳孔・JCS・GCS・バイタルサインなど、救急隊が 傷病者を 見て たしかめる ことば",
  [("救急車の 中","🚑"),("意識の たしかめ","🧠"),("呼吸と 脈","🫁"),("モニターの 前","📈"),("話を 聞く","💬")]),
 ("byoki","けがと病気","🩹","orange","byoki","けがと病気マスター","熱中症・やけど・骨折・ねんざ・脱水・低体温症・アナフィラキシー・脳卒中・心筋梗塞・ぜんそく・けいれん・誤えん・溺水など、救急で 出会う けがと 病気の 名前",
  [("夏の グラウンド","🌡"),("台所","🩹"),("公園","🦴"),("プール","🌊"),("おうち","🏠")]),
 ("hansou","現場から病院へ","🛣️","green","hansou","搬送マスター","現場到着・トリアージ・搬送先の 選定・二次救急・三次救急・救命救急センター・ドクターヘリ・ドクターカー・引きつぎ・救急外来など、現場から 病院へ つなぐ ことば",
  [("現場","📍"),("救急車の 無線","📻"),("ヘリポート","🚁"),("救命救急センター","🏨"),("救急外来","🚪")]),
 ("kikai","救急車と資器材","🧰","#0a9396","sharyo","資器材マスター","高規格救急車・ストレッチャー・バックボード・頸椎カラー・酸素ボンベ・吸引器・バッグバルブマスク・心電図モニター・パルスオキシメーター・感染防止衣など、救急車に のっている 道具の 名前と 役目",
  [("救急車の 後ろの とびら","🚑"),("ストレッチャー","🛏"),("酸素の たな","🫧"),("モニターの 前","📈"),("消毒の 部屋","🧽")]),
 ("shikumi","救急のしくみと法律","📋","purple","shikumi","しくみマスター","消防法・救急救命士法・メディカルコントロール・特定行為・プロトコル・救急活動記録・守秘義務・感染対策・救急隊員の 資格・救急の 歴史など、救急という しくみの ことば",
  [("法律の 本だな","📘"),("医師との 電話","📞"),("記録の 机","📝"),("消防学校の 救急科","🎓"),("救急の 歴史の 展示","📜")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="救急の ことばと 意味を おぼえる ゲームです。本物の 試験問題では ありません。手当ての やりかたや 薬の 量は のせていません。手当ての やりかたは 消防署の 救命講習で 習おう。からだの ぐあいが わるい ときは おうちの 人に 知らせて、こまったら 119番や #7119 に 相談してください。総務省消防庁・厚生労働省・市町村の 消防とは 関係ありません。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="くらしや ニュースで 聞く 救急の ことば・学校の 救命講習の ことば"),
         dict(difficulty=2, name="中級", icon="🚑", lead="消防学校の 救急課程(救急隊員の 資格)の 範囲の めやす"),
         dict(difficulty=3, name="上級", icon="🩺", lead="救急救命士 国家試験の 範囲の めやす(観察の 指標・病態の 名前・特定行為・メディカルコントロール)")],
 titles=[[10,"🧳","救急の旅人"],[30,"🔰","救命講習の生徒"],[60,"❤️","命をつなぐ仲間"],[100,"🚑","救急車の仲間"],[160,"🩺","観察の物知り"],
         [220,"🩹","けがと病気の物知り"],[290,"🛣️","搬送の達人"],[360,"📋","救急のしくみ通"],[420,"🎓","救急科の生徒"],[480,"🚑","一人前の救急隊員"]],
 allTitle=["🏆","フリック救急隊員マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
