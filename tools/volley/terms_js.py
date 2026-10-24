#!/usr/bin/env python3
"""tools/volley/meta.json + tools/volley/terms-<旅>.json → data/volley.json(1か所に まとめた もの)と volley/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が volley/ を 作るときに 呼ぶ。data/volley.json と volley/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/volley/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/volley/terms_js.py --check  # 確かめるだけ
決まりは tools/volley/PROMPT.md。もとは tools/basket/terms_js.py(ワールドバスケットボール)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(けいくん 2026-10-24「おすすめのまま」)。JVA の 指導者・審判の 学ぶ 範囲を めやすに 6つ
SUBJECTS = ("ルール", "技術", "戦術", "リーグ・チーム", "選手", "大会・歴史")
# ⭐ 国の しるし(どの 国の 話か。説明の 上に 小さな 国旗の 札で 出す)。「・」で 3つまで。国と 関係ない 語は 付けない
COUNTRY = ("世界", "ヨーロッパ", "アジア", "アフリカ", "南アメリカ", "北中米", "オセアニア",
           "日本", "中国", "韓国", "タイ", "イラン", "カザフスタン", "フィリピン",
           "アメリカ", "カナダ", "キューバ", "ドミニカ共和国", "プエルトリコ", "メキシコ", "ブラジル", "アルゼンチン",
           "イタリア", "ポーランド", "セルビア", "フランス", "トルコ", "ロシア", "ソ連", "ユーゴスラビア", "オランダ", "ドイツ", "スロベニア",
           "ブルガリア", "スウェーデン", "ノルウェー", "ベルギー", "チェコ", "スペイン", "ウクライナ", "イギリス",
           "オーストラリア", "エジプト", "チュニジア", "カメルーン")
# ⭐ 種目の しるし(6人制 / ビーチ(2人制)/ 9人制 / シッティング / 共通)。「・」で 2つまで。ルールの 話の 語に 付ける
RULESET = ("6人制", "ビーチ", "9人制", "シッティング", "共通")
# ✅ ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30)。読みが かぶらないのは ワールドバレーボールの 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/volley/PROMPT.md)
#   ① 変わる お金・数字(年俸・移籍金・いまの 順位・通算得点・いまの 決定率)
#   ② 小学生に 向かない 話(ケガ・暴力・体罰・ハラスメント・差別・八百長・賭け・死)
#   ③ 人を けなす・悲しい 場面・相手を ばかに する 書きかた
BAN = ["年俸", "契約金", "サラリー", "億円", "万円", "万ドル", "億ドル", "給料", "スポンサー", "移籍金",
       "八百長", "賭け", "賭博", "くじ", "ベッティング", "差別", "人種", "乱闘", "殴", "けんか", "ケンカ", "暴力", "体罰", "暴言", "ハラスメント", "パワハラ", "しごき", "鬼の",
       "死", "殺", "亡くな", "事故", "骨折", "大けが", "大ケガ", "重傷", "靭帯", "じん帯", "アキレス腱", "負傷", "ケガで", "けがで", "手術", "病気", "薬物", "ドーピング", "逮捕", "スキャンダル", "離婚", "不祥事", "事件",
       "悲劇", "屈辱", "惨敗", "大敗", "戦犯", "ダメな", "だめな", "下手", "へた", "ばかに", "バカに", "なめる", "なめて", "挑発", "からかう", "からかい", "サーブミスで 負け",
       "現在の 所属", "現所属", "いまの 所属", "在籍中", "在籍している", "いまの 監督", "現在の 監督", "通算", "今季", "今シーズン", "順位", "世界ランキング",
       # 商品の 名前(ボール・シューズの 会社)と まんが・アニメの 登場人物は 書かない
       "ミカサ", "モルテン", "ミズノ", "アシックス", "ナイキ", "アディダス", "ゲータレード",
       "ハイキュー", "日向翔陽", "影山飛雄", "アタックNo", "アタックナンバー", "サインはV", "鮎原", "古舘春一",
       # exam.txt ⑩ の 入れない 人(事件・出場停止の 報道。説明の 中にも 名前を 出さない)
       "ヌガペト", "ジバ", "ゴドイ・フィーリョ", "佐藤駿一郎",
       "100マス", "百ます", "ワールドバレー ", "フリックバレー "]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|ドル|歳|才|kg|キロ)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|ドル|歳|才)"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # お金・年齢・条の 番号は 書かない(年と 大会・優勝の 回数・人数・ルールの 点・秒・距離・高さは よい)
# ⭐ いまの スター選手(star)だけ: チーム名を 手がかりに しない(移籍で 変わる)。所属の 書きかたも 止める
STAR_BAN = ["所属", "在籍", "移籍", "加入", "契約", "レンタル", "クラブで", "チームで プレー",
            "サントリー", "パナソニック", "ジェイテクト", "東レ", "ウルフドッグス", "サンバーズ", "パンサーズ", "ブレイザーズ", "アローズ", "クインシーズ", "ヴィクトリーナ", "レッドロケッツ", "スティングス",
            "ペルージャ", "トレンティーノ", "チヴィタノーヴァ", "ルーベ", "モデナ", "ミラノ", "ピアチェンツァ", "コネリアーノ", "ノヴァーラ", "スカンディッチ",
            "ザクサ", "ケンジェジン", "ヤストシェンプスキ", "ヴァキフバンク", "フェネルバフチェ", "エジザジュバシュ", "ガラタサライ", "ハルクバンク", "サダ", "クルゼイロ", "ゼニト",
            "SV.LEAGUEの チーム", "SV.LEAGUE の チーム", "Vリーグの チーム"]
OK_WORDS = []  # 選手の 名前の 中に 止める 語が たまたま 入る もの
MAXR = 20  # 読みの 長さ(これより 長いと 子どもが 飽きる。PROMPT.md)


def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        f = HERE / f"terms-{J['id']}.json"
        if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
    return d


def check(d):
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}
    nodes = {f"{k}:{n['id']}" for k, g in m["diagrams"].items() for n in g["nodes"]}
    dvs = {L["difficulty"] for L in m["levels"]}
    ids = {}; readings = {}; per = {}
    for t in d["terms"]:
        tid = t.get("id")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        for r in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):
            if not KANA.fullmatch(r or ""): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
        if (t.get("acceptedReadings") or [t.get("reading")])[0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        if len(t.get("reading") or "") > MAXR: warn.append(f"{tid}: 読みが 長い({len(t['reading'])}字)")
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 科目の どれか {SUBJECTS}")
        rs = t.get("ruleset")
        if rs is not None and (not isinstance(rs, str) or not rs or any(p not in RULESET for p in rs.split("・")) or len(rs.split("・")) > 2):
            errs.append(f"{tid}: ruleset「{rs}」は {RULESET} の どれか(「・」で 2つまで)")
        co = t.get("country")
        if co is not None and (not isinstance(co, str) or not co or any(p not in COUNTRY for p in co.split("・")) or len(co.split("・")) > 3):
            errs.append(f"{tid}: country「{co}」は {COUNTRY} の どれか(「・」で 3つまで)")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "")
        for w in OK_WORDS: txt = txt.replace(w, "")
        for w in BAN + (STAR_BAN if t.get("journey") == "star" else []):
            if w in txt: errs.append(f"{tid}: 「{w}」は 使わない")
        for rx in BAN_RE:
            if rx.search(txt): errs.append(f"{tid}: 「{rx.search(txt).group(0)}」は 使わない")
        for r in [t.get("reading")] + list(t.get("acceptedReadings") or []):
            readings.setdefault(r, []).append(tid)
        per.setdefault((t.get("journey"), t.get("difficulty")), 0); per[(t.get("journey"), t.get("difficulty"))] += 1
    for t in d["terms"]:
        rel = t.get("relatedTerms") or []
        if not 1 <= len(rel) <= 3: errs.append(f"{t['id']}: relatedTerms は 1〜3個")
        for r in rel:
            if r not in ids: errs.append(f"{t['id']}: つながる ことば「{r}」が ない")
            if r == t["id"]: errs.append(f"{t['id']}: 自分を つないでいる")
    for r, v in readings.items():
        if len(set(v)) > 1: errs.append(f"読み「{r}」が かぶる: {v}")
    for J in js:
        n = sum(v for (j, _), v in per.items() if j == J)
        if n and n % 10: errs.append(f"{J}: {n}語。旅ごとに 10の 倍数に そろえる")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("ワールドバレーボールの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("ワールドバレーボールの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/volley.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを ワールドバレーボールの ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # ワールドバレーボールの 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"(?<![\d０-９])1<ruby>人<rt>ひと</rt></ruby>", "<ruby>1人<rt>ひとり</rt></ruby>"),
           R(r"(?<![\d０-９])2<ruby>人<rt>ひと</rt></ruby>", "<ruby>2人<rt>ふたり</rt></ruby>"),
           ]
    def rub(t):
        h = rub0(t)
        for a, b in FIX: h = a.sub(b, h)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 sb=t["field"], e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("country"): o["co"] = t["country"]
        if t.get("ruleset"): o["rs"] = t["ruleset"]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "volley").mkdir(exist_ok=True)
    (ROOT / "volley/terms.js").write_text("/* tools/volley/terms-*.json から tools/volley/terms_js.py が 作る。手で 直さない */\nconst VOLLEY_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("volley/terms.js", len(out), "語", (ROOT / "volley/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
