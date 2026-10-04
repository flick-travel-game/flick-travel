#!/usr/bin/env python3
"""tools/ketsueki/meta.json + tools/ketsueki/terms-<旅>.json → data/ketsueki.json(1か所に まとめた もの)と ketsueki/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が ketsueki/ を 作るときに 呼ぶ。data/ketsueki.json と ketsueki/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/ketsueki/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/ketsueki/terms_js.py --check  # 確かめるだけ
    python3 tools/ketsueki/terms_js.py --only <旅>  # 1つの 旅だけ 確かめる
決まりは tools/ketsueki/PROMPT.md。もとは tools/jui/terms_js.py(獣医師)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(📘)。血液型の 専門家(認定輸血検査技師・高校生物)の 学ぶ ことを 12に 分けた もの(tools/ketsueki/PROMPT.md)
SUBJECTS = ("血液とからだ", "免疫(抗原と抗体)", "ABO式血液型", "Rh式とそのほかの血液型", "遺伝", "輸血と献血", "血液型の検査",
            "めずらしい血液型", "世界の血液型と人類学", "動物の血液型", "血液型の歴史", "文化と心理学")
# ⭐ 血液型の しるし(任意。`blood` の 欄 → terms.js の `bt`)。説明の 上に 色の 札で 出す。「A・AB」のように「・」で 4つまで
#   ⚠️ `type` の 欄は シリーズ共通で "concept" に 使って いるので、血液型の しるしは `blood` に した
BLOODS = ("A", "B", "O", "AB", "Rh+", "Rh-", "ボンベイ型", "シスAB型", "Rhヌル", "4つの型")
# ✅ からだ旅行・理科の 生物・医師・看護師・獣医師 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30)。読みが かぶらないのは 血液型の 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/ketsueki/PROMPT.md)
#   ① ⚠️⚠️ 悪口に なる 性格の イメージ(その 血液型の 子が 笑われない ように)
#   ② 相性の 決めつけ・病気と 血液型の 結びつけ・家族を うたがわせる 書きかた
#   ③ 死・こわい ようす・医療の やりかた・実在の 団体を 答えに する こと
BAN = ["死", "殺", "血まみれ", "大けが", "事故で", "大出血", "命を落と", "命に かかわ", "命にかかわ", "危篤", "苦しむ", "苦しんで",
       "自己中", "自分勝手", "わがまま", "神経質", "大ざっぱ", "大雑把", "二重人格", "変人", "変わり者", "ずぼら", "気まぐれ", "短気", "頑固", "がんこ",
       "冷たい 人", "冷たい性格", "飽きっぽ", "あきっぽ", "しつこい", "口うるさ", "協調性が な", "協調性がな", "空気が 読めな", "空気を 読まな", "ルーズ", "いいかげん", "いい加減",
       "細かすぎ", "うるさい", "おせっかい", "見栄っ張", "見栄っぱ", "浮気", "嫉妬", "八方美人", "天才と", "変わった 人", "マイペース",
       "相性が 悪", "相性が悪", "相性が いい", "相性が良", "相性が よい", "合わない 型", "うまく いかない",
       "なりやすい", "かかりやすい", "がんに", "がんの", "がんが", "病気に 弱", "長生き", "寿命",
       "生まれない", "生まれる はずが", "本当の 親", "実の 子", "実の子", "親子では", "親子で ない", "親子でない", "浮気",
       "だれにでも あげられる", "誰にでも あげられる", "だれにでも 輸血", "万能",
       "mL", "ミリリットル", "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|人|万人|億人|歳|才|mL|ml|cc|回|か月|ヶ月|カ月|日間|週間)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(人|歳|才)"),
          re.compile(r"(A|B|O|AB)型の 人は")]  # ⚠️ 性格を 事実の ように 言い切る 形
NAME_BAN = ["赤十字"]  # 実在の 団体の 名前を 答えに しない(説明で ふれるのは よい)
OK_WORDS = []
MAXR = 20  # 読みの 長さ(これより 長いと 子どもが 飽きる。PROMPT.md)
PERSON = ("性格", "気質", "タイプの 人", "イメージ")


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
    ids = {}; readings = {}; per = {}; names = {}
    for t in d["terms"]:
        tid = t.get("id")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        names.setdefault(t.get("name"), []).append(tid)
        for r in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):
            if not KANA.fullmatch(r or ""): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
        if (t.get("acceptedReadings") or [t.get("reading")])[0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        if len(t.get("reading") or "") > MAXR: errs.append(f"{tid}: 読みが 長い({len(t['reading'])}字。{MAXR}字まで)")
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 分野の どれか {SUBJECTS}")
        bt = t.get("blood")
        if bt is not None and (not isinstance(bt, str) or not bt or any(p not in BLOODS for p in bt.split("・")) or len(bt.split("・")) > 4):
            errs.append(f"{tid}: blood「{bt}」は {BLOODS} の どれか(「・」で 4つまで)")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "")
        for w in OK_WORDS: txt = txt.replace(w, "")
        for w in BAN:
            if w in txt: errs.append(f"{tid}: 「{w}」は 使わない")
        for rx in BAN_RE:
            if rx.search(txt): errs.append(f"{tid}: 「{rx.search(txt).group(0)}」は 使わない")
        for w in NAME_BAN:
            if w in t.get("name", ""): errs.append(f"{tid}: 名前に「{w}」を 入れない(実在の 団体を 答えに しない)")
        ds = t.get("description", "")
        # ⚠️⚠️ 性格の 話は bunka の 旅だけ。bunka でも「言われ」「イメージ」の 形(事実として 書かない)
        if t.get("journey") != "bunka":
            if "性格" in ds and "決まりません" not in ds and "関係" not in ds: errs.append(f"{tid}: 性格の 話は bunka の 旅だけ")
        elif any(w in ds for w in ("性格", "気質", "タイプ")) or (bt and bt in ("A", "B", "O", "AB") and "イメージ" in t.get("name", "")):
            if not any(w in ds for w in ("言われ", "いわれ", "イメージ", "考えられて きた", "説", "占い", "決まりません", "確かめられて", "関係")):
                errs.append(f"{tid}: 性格の 話は「〜と 言われて いる」「イメージ」の 形で(事実として 書かない)")
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
    for n, v in names.items():
        if len(v) > 1: errs.append(f"名前「{n}」が かぶる: {v}")
    for J in js:
        n = sum(v for (j, _), v in per.items() if j == J)
        if n and n % 10: errs.append(f"{J}: {n}語。旅ごとに 10の 倍数に そろえる")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("血液型の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("血液型の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/ketsueki.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 血液型の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           # 血液型の 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"(?<=[A-Za-z0-9])<ruby>型<rt>けい</rt></ruby>", "<ruby>型<rt>がた</rt></ruby>"),  # A2型を → がた
           R(r"<ruby>赤<rt>あか</rt></ruby><ruby>芽球<rt>がきゅう</rt></ruby>", "<ruby>赤芽球<rt>せきがきゅう</rt></ruby>"),
           R(r"(?<![一-龥>])<ruby>管<rt>かん</rt></ruby>", "<ruby>管<rt>くだ</rt></ruby>"),  # 細い 管に(試験管は ひとまとまりなので 当たらない)
           R(r"<ruby>骨<rt>ほね</rt></ruby>ずい", "<ruby>骨<rt>こつ</rt></ruby>ずい"),  # 骨ずい → こつずい
           R(r"<ruby>常<rt>つね</rt></ruby>(?=<ruby>染色体)", "<ruby>常<rt>じょう</rt></ruby>"),  # 常染色体 → じょう
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
        if t.get("blood"): o["bt"] = t["blood"]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "ketsueki").mkdir(exist_ok=True)
    (ROOT / "ketsueki/terms.js").write_text("/* tools/ketsueki/terms-*.json から tools/ketsueki/terms_js.py が 作る。手で 直さない */\nconst KETSUEKI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("ketsueki/terms.js", len(out), "語", (ROOT / "ketsueki/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
