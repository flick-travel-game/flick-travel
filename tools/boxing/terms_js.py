#!/usr/bin/env python3
"""tools/boxing/meta.json + tools/boxing/terms-<旅>.json → data/boxing.json(1か所に まとめた もの)と boxing/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が boxing/ を 作るときに 呼ぶ。data/boxing.json と boxing/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/boxing/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/boxing/terms_js.py --check  # 確かめるだけ
決まりは tools/boxing/PROMPT.md。もとは tools/baseball/terms_js.py(ワールドベースボール)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(けいくん 2026-10-12「すべておまかせ」)。JBC の ルールブック・日本ボクシング連盟の 指導者の 学ぶ 範囲を めやすに 7つ
SUBJECTS = ("ルール", "パンチと防御", "戦術", "団体・階級", "選手", "大会・歴史", "用具・練習")
# ⭐ 国の しるし(どの 国の 話か。説明の 上に 小さな 国旗の 札で 出す)。「・」で 3つまで。国と 関係ない 語は 付けない
COUNTRY = ("世界", "北アメリカ", "中南米", "アジア", "ヨーロッパ", "アフリカ", "オセアニア",
           "日本", "アメリカ", "カナダ", "メキシコ", "プエルトリコ", "キューバ", "パナマ", "ニカラグア", "アルゼンチン",
           "イギリス", "アイルランド", "フランス", "ウクライナ", "ロシア", "カザフスタン", "ウズベキスタン",
           "フィリピン", "タイ", "韓国", "中国", "オーストラリア", "ニュージーランド", "ガーナ", "コンゴ民主共和国")
# ⭐ ルールの 立場(プロ = JBC・4団体 / アマ = オリンピック・World Boxing)。「・」で 2つまで。ルールと 関係ない 語は 付けない
RULESET = ("プロ", "アマ", "共通")
# ✅ ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。読みが かぶらないのは ワールドボクシングの 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/boxing/PROMPT.md)
#   ① 変わる お金・数字(ファイトマネー・いまの 戦績・ランキング・いまの ベルト)
#   ② ⭐⭐⭐ なぐられた 側の ようす・ケガ・血・脳・倒れた ようす・死(ボクシングは ここを いちばん 強く)
#   ③ 薬物・八百長・賭け・事件・私生活・人を けなす・挑発・けんか
BAN = ["ファイトマネー", "報酬", "賞金", "億円", "万円", "万ドル", "億ドル", "給料", "スポンサー", "八百長", "賭け", "賭博", "ベッティング",
       "差別", "人種", "乱闘", "暴力", "けんか", "ケンカ", "挑発", "フェイスオフ", "にらみ", "睨", "罵",
       "死", "殺", "亡くな", "事故", "けが", "ケガ", "怪我", "負傷", "骨折", "傷", "流血", "血", "出血", "腫", "あざ", "痛", "脳", "失明", "網膜", "意識", "失神", "気絶",
       "倒れ", "倒す", "倒し", "ふらつ", "効い", "効く", "効か", "ダメージ", "打ちぬ", "打ち抜", "沈め", "沈む", "マットに", "KO勝", "KO負", "ノックアウト勝", "KOした", "KOされ",
       "パンチドランカー", "手術", "病", "引退に 追", "薬物", "ドーピング", "ステロイド", "禁止薬", "陽性", "逮捕", "事件", "刑務所", "裁判", "スキャンダル", "離婚",
       "悲劇", "屈辱", "惨敗", "完敗", "大敗", "ダメな", "だめな", "弱い", "下手", "へた", "ばかに", "バカに", "なめる", "からかう", "からかい", "敗者", "負けた 選手",
       "体重超過", "計量失格", "剥奪", "はく奪", "現在の 王者", "いまの 王者", "現王者", "保持", "防衛中", "現役の 王者", "ランキング 1位", "順位",
       "はじめの一歩", "あしたのジョー", "ワールドボクシン ", "フリックボクシング"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|ドル|歳|才)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|ドル|歳|才)"),
          re.compile(r"\d+ ?勝 ?\d+ ?敗"), re.compile(r"\d+ ?戦 ?\d+ ?勝"), re.compile(r"\d+ ?KO"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # お金・年齢・戦績・条の 番号は 書かない(年・オリンピックの メダル・引退した 選手の 防衛回数・体重の 上限は よい)
# ⭐ いまの スター選手(star)だけ: いまの ベルト・戦績・所属ジム・プロモーターを 手がかりに しない(変わる)
STAR_BAN = ["所属", "在籍", "移籍", "契約", "プロモーター", "通算", "戦績", "防衛", "無敗", "連勝", "王座を 保", "現在", "いま 王者", "いまも 王者"]
# ボクシングで ふつうに 使う ことば(止める 字が 入っているが よい もの)
OK_WORDS = []
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
        co = t.get("country")
        if co is not None and (not isinstance(co, str) or not co or any(p not in COUNTRY for p in co.split("・")) or len(co.split("・")) > 3):
            errs.append(f"{tid}: country「{co}」は {COUNTRY} の どれか(「・」で 3つまで)")
        rs = t.get("ruleset")
        if rs is not None and (not isinstance(rs, str) or not rs or any(p not in RULESET for p in rs.split("・")) or len(rs.split("・")) > 2):
            errs.append(f"{tid}: ruleset「{rs}」は {RULESET} の どれか(「・」で 2つまで)")
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
        sys.exit("ワールドボクシングの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("ワールドボクシングの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/boxing.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを ワールドボクシングの ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # ワールドボクシングの 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>哲治<rt>てつじ</rt></ruby>", "<ruby>哲治<rt>てつはる</rt></ruby>"),  # 川上哲治
           R(r"<ruby>仰木<rt>おうぎ</rt></ruby>", "<ruby>仰木<rt>おおぎ</rt></ruby>"),  # 仰木彬
           R(r"59<ruby>本<rt>ぽん</rt></ruby>", "59<ruby>本<rt>ほん</rt></ruby>"),  # スタントンの 59本
           R(r"<ruby>潤<rt>じゅん</rt></ruby><ruby>人<rt>にん</rt></ruby>", "<ruby>潤人<rt>じゅんと</rt></ruby>"),  # 中谷潤人
           R(r"<ruby>並木<rt>なみき</rt></ruby><ruby>月海<rt>げっかい</rt></ruby>", "<ruby>並木<rt>なみき</rt></ruby><ruby>月海<rt>つきみ</rt></ruby>"),  # 並木月海
           R(r"<ruby>一<rt>いち</rt></ruby><ruby>発<rt>はつ</rt></ruby>", "<ruby>一発<rt>いっぱつ</rt></ruby>"),  # 一発クリア・一発の パンチ
           R(r"(\d)<ruby>対<rt>つい</rt></ruby>", r"\1<ruby>対<rt>たい</rt></ruby>"),  # 2対1の 判定
           R(r"<ruby>手数<rt>てすう</rt></ruby>", "<ruby>手数<rt>てかず</rt></ruby>"),  # パンチの 手数
           R(r"<ruby>両国<rt>りょうこく</rt></ruby>", "<ruby>両国<rt>りょうごく</rt></ruby>"),  # 両国国技館
           R(r"<ruby>原田<rt>はらた</rt></ruby>", "<ruby>原田<rt>はらだ</rt></ruby>"),  # ファイティング原田
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
    (ROOT / "boxing").mkdir(exist_ok=True)
    (ROOT / "boxing/terms.js").write_text("/* tools/boxing/terms-*.json から tools/boxing/terms_js.py が 作る。手で 直さない */\nconst BOXING_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("boxing/terms.js", len(out), "語", (ROOT / "boxing/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
