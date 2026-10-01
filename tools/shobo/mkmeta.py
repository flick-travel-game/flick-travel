#!/usr/bin/env python3
"""tools/shobo/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/keisatsu/mkmeta.py
けいくん 2026-10-01「消防士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→ 5つの 問いに「全部おすすめ」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(警察官と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "sharyo": ("消防車の 図", "🚒", [("pump","ポンプ車","🚒"),("hashigo","はしご車","🪜"),("kyukyusha","救急車","🚑"),
   ("kyujosha","救助工作車","🧰"),("tank","水槽車・特殊な 車","🛻"),("shiki","指揮車","📣"),
   ("hose","ホース・筒先","🧵"),("suiri","消火栓・水利","🚰"),("bokafuku","防火服・ヘルメット","🦺"),
   ("kokyuki","空気呼吸器","😷"),("musen","無線・指令","📻"),("tenken","車庫と 点検","🔧")],
   chain(("pump","hashigo"),("hashigo","kyukyusha"),("kyujosha","tank"),("tank","shiki"),("hose","suiri"),("bokafuku","kokyuki"),("musen","tenken"),("pump","hose"))),
 "shoka": ("火と 消火の 図", "🔥", [("joken","燃える 3つの 条件","🔺"),("moekata","燃えかた","🕯"),("kemuri","けむり","🌫"),
   ("shoki","初期消火","🧯"),("shokaki","消火器","🧯"),("setsubi","消火の 設備","💦"),
   ("hosui","放水","🚿"),("enso","燃え広がり","🏘"),("shurui","火災の 種類","📋"),
   ("katsudo","消防隊の 活動","👩‍🚒"),("chosa","火災調査","🔎"),("zanka","消えたか 確かめる","✅")],
   chain(("joken","moekata"),("moekata","kemuri"),("shoki","shokaki"),("shokaki","setsubi"),("hosui","enso"),("shurui","katsudo"),("katsudo","chosa"),("chosa","zanka"))),
 "kyukyu": ("救急と 救助の 図", "🚑", [("tsuho","119番","☎️"),("shirei","指令センター","🖥"),("kyukyutai","救急隊","🚑"),
   ("kyumeishi","救急救命士","🩺"),("aed","AED","⚡"),("oukyu","応急手当","🩹"),
   ("hanso","病院へ 運ぶ","🏥"),("kyujotai","救助隊","🧰"),("triage","トリアージ","🏷"),
   ("tadashiku","救急車の 正しい 使いかた","📞"),("koshu","救命講習","🎓"),("renkei","病院との 連けい","🤝")],
   chain(("tsuho","shirei"),("shirei","kyukyutai"),("kyumeishi","aed"),("aed","oukyu"),("hanso","kyujotai"),("kyujotai","triage"),("tadashiku","koshu"),("koshu","renkei"))),
 "ie": ("家と まちの 図", "🏠", [("keihoki","火災警報器","🔔"),("daidokoro","台所と コンロ","🍳"),("tabako","たばこ・ライター","🚭"),
   ("denki","電気と コンセント","🔌"),("hinan","避難経路","🚪"),("bokakanri","防火管理","📋"),
   ("setsubi","消防用設備","🧯"),("sasatsu","立入検査","🔍"),("kikenbutsu","危険物","⚠️"),
   ("kaho","火の 用心・広報","📢"),("kunren","避難訓練","🏫"),("boen","燃えにくい もの","🧶")],
   chain(("keihoki","daidokoro"),("daidokoro","tabako"),("denki","hinan"),("hinan","bokakanri"),("setsubi","sasatsu"),("sasatsu","kikenbutsu"),("kaho","kunren"),("kunren","boen"))),
 "saigai": ("災害の 図", "🌊", [("jishin","地震","🌏"),("tsunami","津波","🌊"),("suigai","大雨・水害","🌧"),
   ("dosha","土砂災害","⛰"),("kazan","火山・雪の 災害","🌋"),("hinanjo","避難所","🏫"),
   ("kinen","緊急消防援助隊","🚒"),("hyper","特別な 救助隊","🦾"),("shobodan","消防団","🙋"),
   ("bosai","防災の 学び","📚"),("sonae","家の そなえ","🎒"),("koiki","まちと まちの 協力","🤝")],
   chain(("jishin","tsunami"),("tsunami","suigai"),("dosha","kazan"),("kazan","hinanjo"),("kinen","hyper"),("hyper","shobodan"),("bosai","sonae"),("sonae","koiki"))),
 "shobosho": ("消防署の 地図", "🏢", [("kuni","国(消防庁)","🏛"),("shichoson","市町村の 消防","🏙"),("honbu","消防本部","🏢"),
   ("sho","消防署","🚒"),("shutchojo","出張所","🏠"),("kaikyu","階級","🎖"),
   ("keibo","警防","🔥"),("yobo","予防","🧯"),("kyukyu","救急・救助","🚑"),
   ("shirei","指令センター","🖥"),("shoboho","消防法","📘"),("soshikiho","消防の しくみの 法律","📗")],
   chain(("kuni","shichoson"),("shichoson","honbu"),("sho","shutchojo"),("shutchojo","kaikyu"),("keibo","yobo"),("yobo","kyukyu"),("shirei","shoboho"),("shoboho","soshikiho"))),
 "kokoro": ("心と からだの 地図", "🧭", [("komuin","公務員の 決まり","📋"),("kinmu","交代制の 勤務","🕐"),("reishiki","礼式","🫡"),
   ("tairyoku","体力","🏃"),("kunren","訓練","🪢"),("team","チームワーク","🤝"),
   ("anzen","安全管理","🦺"),("kotoba","ことばづかい","🗣"),("saiyo","採用試験","📝"),
   ("kyoyo","教養試験","📚"),("gakko","消防学校の くらし","🎓"),("kenko","こころと からだの 健康","💗")],
   chain(("komuin","kinmu"),("kinmu","reishiki"),("tairyoku","kunren"),("kunren","team"),("anzen","kotoba"),("kotoba","saiyo"),("kyoyo","gakko"),("gakko","kenko"))),
}
J = [
 ("sharyo","消防車と道具のことば","🚒","#e0202e","sharyo","消防車マスター","ポンプ車・はしご車・救急車・ホース・消火栓・防火服・空気呼吸器など、消防車と 道具の 名前と 役目",
  [("消防署の 車庫","🚒"),("ポンプ車の 前","🧵"),("はしご車の 下","🪜"),("装備の たな","🦺"),("無線の 部屋","📻")]),
 ("shoka","火と消火のことば","🔥","#f25c00","shoka","消火マスター","燃える 3つの 条件・初期消火・消火器・スプリンクラー・放水・延焼など、火と 消火の しくみの ことば",
  [("理科の 教室","🔺"),("けむりの 実験室","🌫"),("消火器の 前","🧯"),("消防隊の 現場","🚿"),("火災調査の 机","🔎")]),
 ("kyukyu","救急と救助のことば","🚑","#1d6bff","kyukyu","救急救助マスター","119番・救急隊・救急救命士・AED・心肺蘇生(名前と 目的だけ)・救助隊・トリアージなど、命を 助ける しくみの ことば",
  [("119番の 電話","☎️"),("指令センター","🖥"),("救急車の 中","🚑"),("救命講習の 教室","🎓"),("救助隊の 車","🧰")]),
 ("yobo","火事をふせぐことば","🏠","#00b33c","ie","予防マスター","火災警報器・避難経路・防火管理者・消防設備・たばこや コンロの 注意など、火事を おこさない ための ことば",
  [("家の 台所","🍳"),("マンションの ろうか","🚪"),("学校の 避難訓練","🏫"),("お店の 立入検査","🔍"),("まちの 火の 用心","📢")]),
 ("saigai","災害と消防のことば","🌊","#0a9396","saigai","防災マスター","地震・津波・水害・土砂災害・緊急消防援助隊・消防団・避難所など、大きな 災害から まちを 守る ことば",
  [("地震の あと","🌏"),("大雨の 川","🌧"),("避難所","🏫"),("全国から 来た 消防隊","🚒"),("消防団の 詰所","🙋")]),
 ("shikumi","消防の法律としくみ","⚖️","#8a2be0","shobosho","しくみマスター","消防法・消防組織法・消防庁・消防本部・消防署・階級(消防士〜消防総監)・119番の しくみなど、消防という 組織の ことば",
  [("消防庁","🏛"),("消防本部","🏢"),("消防署の 受付","🚒"),("階級の かべ","🎖"),("法律の 本だな","📘")]),
 ("kokoro","消防士の心とからだ","🧭","#e8368f","kokoro","心とからだマスター","交代制の 勤務・訓練・体力・チームワーク・安全管理・ことばづかい・採用試験・消防学校など、消防士に なる 人の 心と からだの ことば",
  [("採用試験の 会場","📝"),("消防学校の 寮","🎓"),("訓練塔","🪢"),("グラウンド","🏃"),("はじめての 当番","🫡")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="消防の ことばと 意味を おぼえる ゲームです。本物の 試験問題では ありません。総務省消防庁・市町村の 消防とは 関係ありません。火の 使いかたや 救命処置の 手順は のせていません。火を 使う ときは かならず 大人と いっしょに。火事や けがの ときは 119番。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="まちで 見かける 消防の ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="🚒", lead="消防官採用試験の 教養試験 + 消防学校で 学ぶ ことばの めやす"),
         dict(difficulty=3, name="上級", icon="👩‍🚒", lead="法律の 名前・設備の 専門用語・階級と 組織・消防設備士や 危険物取扱者の 資格の ことばの めやす")],
 titles=[[10,"🧳","消防の旅人"],[30,"🔰","消防署の見学者"],[60,"🧯","初期消火の仲間"],[100,"🚒","ポンプ車の仲間"],[160,"🚑","救急の物知り"],
         [220,"🏠","まちの火の用心"],[290,"🌊","防災の守り手"],[360,"⚖️","消防のしくみ通"],[420,"🎓","消防学校の生徒"],[480,"👩‍🚒","一人前の消防士"]],
 allTitle=["🏆","フリック消防士マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
