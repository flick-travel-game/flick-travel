#!/usr/bin/env python3
"""tools/zeirishi/meta.json を 作る 台本(1回 走らせれば よい。図の 場所は ここで 決める)。もとは tools/bengoshi/mkmeta.py
けいくん 2026-10-01「税理士になれるレベルになるために必要な 知識をフリック形式の問題にしてください」→「すべておすすめで」"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
def grid(ids):  # 12の 場所を 3列 × 4行に ならべる(弁護士・警察官と 同じ 形)
    xs, ys = (60, 180, 300), (40, 130, 220, 310)
    return [dict(id=i, label=l, icon=e, x=xs[k % 3], y=ys[k // 3]) for k, (i, l, e) in enumerate(ids)]
def chain(*ps): return [[a, b, ""] for a, b in ps]
D = {
 "kihon": ("税の 地図", "🧾", [("yakuwari","税の 役わり","🏫"),("horitsu","税の 法律","📘"),("kokuzei","国税","🗾"),
   ("chihozei","地方税","🏙"),("shurui","税の 分けかた","🧩"),("shinkoku","申告","📝"),
   ("gensen","源泉徴収","✂️"),("nenmatsu","年末調整","🗓"),("nozei","納める","🏦"),
   ("zeimusho","税務署","🏢"),("minaoshi","見直しと 不服","🔁"),("tsukaimichi","税の 使いみち","🛤")],
   chain(("yakuwari","horitsu"),("horitsu","kokuzei"),("chihozei","shurui"),("shurui","shinkoku"),("gensen","nenmatsu"),("nenmatsu","nozei"),("zeimusho","minaoshi"),("minaoshi","tsukaimichi"))),
 "kurashi": ("くらしの 地図", "💴", [("kaimono","買い物","🛒"),("kyuryo","給料","💼"),("shotoku","所得","💰"),
   ("kojo","控除","➖"),("kazoku","家族と 扶養","👪"),("jumin","住民税","🏘"),
   ("hoken","年金と 保険料","🏥"),("ie","家と 車","🏡"),("furusato","ふるさと納税","🎁"),
   ("mynumber","マイナンバー","🪪"),("shinkoku","確定申告の 窓口","📮"),("kodomo","子どもと 税","🧒")],
   chain(("kaimono","kyuryo"),("kyuryo","shotoku"),("kojo","kazoku"),("kazoku","jumin"),("hoken","ie"),("ie","furusato"),("mynumber","shinkoku"),("shinkoku","kodomo"))),
 "nagare": ("お金の 流れの 図", "🏢", [("uriage","売上","💹"),("keihi","経費","🧾"),("rieki","利益","📈"),
   ("hojinzei","法人税","🏢"),("kessan","決算","📊"),("nendo","事業年度","🗓"),
   ("shohizei","消費税","🛍"),("invoice","インボイス","📄"),("shisan","固定資産","🏭"),
   ("chiho","地方の 税","🏙"),("akaji","赤字","📉"),("kokusai","国を こえる 税","🌐")],
   chain(("uriage","keihi"),("keihi","rieki"),("hojinzei","kessan"),("kessan","nendo"),("shohizei","invoice"),("invoice","shisan"),("chiho","akaji"),("akaji","kokusai"))),
 "boki": ("帳簿の 地図", "📒", [("torihiki","取引","🤝"),("shiwake","仕訳","✏️"),("kanjo","勘定科目","🏷"),
   ("karikata","借方","⬅️"),("kashikata","貸方","➡️"),("chobo","帳簿","📒"),
   ("shisan","資産","🏦"),("fusai","負債","📑"),("junshisan","純資産","💎"),
   ("bs","貸借対照表","⚖️"),("pl","損益計算書","📊"),("kijun","会計の 決まり","📘")],
   chain(("torihiki","shiwake"),("shiwake","kanjo"),("karikata","kashikata"),("kashikata","chobo"),("shisan","fusai"),("fusai","junshisan"),("bs","pl"),("pl","kijun"))),
 "hikitsugi": ("引きつぎの 地図", "🏠", [("zaisan","財産","🏦"),("kazoku","家族と 相続人","👪"),("yuigon","遺言","✉️"),
   ("bunkatsu","分ける 話しあい","🤝"),("sozokuzei","相続税","🧾"),("zoyo","贈与","🎁"),
   ("zoyozei","贈与税","📨"),("hyoka","財産の 値ぶみ","🔎"),("tochi","土地と 家","🏡"),
   ("tokurei","特例と 控除","🗂"),("jigyo","会社の 引きつぎ","🏢"),("tetsuzuki","申告と 納めかた","📝")],
   chain(("zaisan","kazoku"),("kazoku","yuigon"),("bunkatsu","sozokuzei"),("sozokuzei","zoyo"),("zoyozei","hyoka"),("hyoka","tochi"),("tokurei","jigyo"),("jigyo","tetsuzuki"))),
 "jimusho": ("会計事務所と 税務署の 地図", "📋", [("uketsuke","受付","🛎"),("sodan","税務相談","💬"),("shorui","書類づくり","📝"),
   ("dairi","税務代理","🙋"),("kicho","記帳と 会計","📒"),("komon","顧問","🤝"),
   ("zeimusho","税務署","🏢"),("chosa","税務調査の 立ち会い","🔍"),("zeirishikai","税理士会","🌸"),
   ("rinri","守秘義務と 心がまえ","🤐"),("nakama","お金の 仕事の 仲間","👥"),("shiken","試験と 登録","🎓")],
   chain(("uketsuke","sodan"),("sodan","shorui"),("dairi","kicho"),("kicho","komon"),("zeimusho","chosa"),("chosa","zeirishikai"),("rinri","nakama"),("nakama","shiken"))),
 "rekishi": ("歴史と 世界の 地図", "🌏", [("kodai","古代の 税","🌾"),("chusei","中世の 税","🏯"),("edo","江戸の 税","🍙"),
   ("meiji","明治の 税","🎩"),("sengo","戦後の 税","🌱"),("ima","いまの 税の 動き","📰"),
   ("kaikei","会計の 歴史","📜"),("sekai","世界の 税","🗺"),("kokusai","国と 国の 決まり","🌐"),
   ("kangae","税の 考えかた","💭"),("seido","税の しくみの 名前","🧩"),("kyoiku","税を 学ぶ","🏫")],
   chain(("kodai","chusei"),("chusei","edo"),("meiji","sengo"),("sengo","ima"),("kaikei","sekai"),("sekai","kokusai"),("kangae","seido"),("seido","kyoiku"))),
}
J = [
 ("kihon","税金のきほん","🧾","#1d6bff","kihon","きほんマスター","税金・国税・地方税・申告・納税・税務署・確定申告・源泉徴収・年末調整など、税を 学ぶ はじめの ことば",
  [("税の 教室","🏫"),("税務署","🏢"),("申告の 机","📝"),("銀行の 窓口","🏦"),("まちの 役所","🏙")]),
 ("kurashi","くらしの税金","💴","#00b33c","kurashi","くらしマスター","消費税・所得税・住民税・控除・扶養・年金と 保険料・ふるさと納税・マイナンバーなど、くらしの 中の 税の ことば",
  [("お店","🛒"),("会社の 給料日","💼"),("家と 車","🏡"),("市役所","🏘"),("確定申告の 会場","📮")]),
 ("kaisha","会社の税金","🏢","#f25c00","nagare","会社マスター","法人税・決算・事業年度・消費税・インボイス・固定資産税・事業税など、会社の 税の ことば(名前と 何の ための 決まりか)",
  [("会社の 受付","🏢"),("経理の 部屋","🧮"),("工場","🏭"),("決算の 会議","📊"),("世界の 取引先","🌐")]),
 ("boki","簿記と会計","📒","#8a2be0","boki","簿記マスター","仕訳・借方と 貸方・勘定科目・貸借対照表・損益計算書・減価償却など、簿記論・財務諸表論の ことば",
  [("帳簿の 机","📒"),("仕訳の 練習","✏️"),("勘定の たな","🏷"),("決算の 表","⚖️"),("会計の 本だな","📘")]),
 ("sozoku","相続と贈与","🏠","#e8368f","hikitsugi","相続マスター","相続税・贈与税・遺言・遺産分割・財産の 値ぶみ・事業承継など、家族が 財産を 引きつぐ ときの 税の ことば",
  [("家族の 部屋","👪"),("遺言の 引き出し","✉️"),("土地と 家","🏡"),("会社の 引きつぎ","🏢"),("申告の 窓口","📝")]),
 ("shigoto","税理士の仕事","📋","#0a9396","jimusho","しごとマスター","税務代理・税務書類の 作成・税務相談・記帳代行・顧問・税務調査の 立ち会い・税理士会・守秘義務など、税理士の 仕事と なりかたの ことば",
  [("会計事務所の 受付","🛎"),("相談室","💬"),("税務署","🏢"),("税理士会","🌸"),("試験会場","🎓")]),
 ("rekishi","税の歴史と世界","🌏","#e0202e","rekishi","歴史と世界マスター","租・庸・調・年貢・地租改正・シャウプ勧告・消費税の はじまり・世界の 税の しくみなど、税の 歴史と 世界の ことば",
  [("飛鳥の 都","🌾"),("江戸の 村","🍙"),("明治の 役所","🎩"),("戦後の まち","🌱"),("世界の 国々","🌐")]),
]
EXAM = (HERE / "exam.txt").read_text(encoding="utf-8").strip()
meta = dict(
 version=1, asOf="2026年10月",
 note="税と 会計の ことばと 意味を おぼえる ゲームです。本物の 試験問題では ありません。税務相談の 答えでは ありません。税率や 金額は 年ごとに 変わるので のせていません。国税庁・税務署・日本税理士会連合会とは 関係ありません。本当の 税金の ことは 大人に 言って、税務署や 税理士に 相談してください。",
 exam=EXAM,
 journeys=[dict(id=i, name=n, icon=e, color=c, diagram=dg, goal=g, lead=l, stops=[dict(name=a, icon=b) for a, b in st]) for i, n, e, c, dg, g, l, st in J],
 levels=[dict(difficulty=1, name="入門", icon="🔰", lead="くらしや ニュースで 聞く 税の ことば(はじめてでも 分かる)"),
         dict(difficulty=2, name="中級", icon="📘", lead="税理士試験の 簿記論・財務諸表論・税法の 範囲の めやす(大きな ことば)"),
         dict(difficulty=3, name="上級", icon="🧾", lead="税法の こまかい 制度の 名前・会計の 決まり・国際税務の ことばの めやす")],
 titles=[[10,"🧳","税の旅人"],[30,"🔰","税の見学者"],[60,"🧾","申告の仲間"],[100,"💴","くらしの税の物知り"],[160,"📒","帳簿の名人"],
         [220,"🏢","会社の税の物知り"],[290,"🏠","引きつぎの相談役"],[360,"🌸","税理士の卵"],[420,"🎓","5科目の挑戦者"],[480,"🧮","一人前の税理士"]],
 allTitle=["🏆","フリック税理士マスター"],
 diagrams={k: dict(name=n, w=360, h=360, icon=e, nodes=grid(ns), edges=ed) for k, (n, e, ns, ed) in D.items()},
)
(HERE / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("meta.json OK")
