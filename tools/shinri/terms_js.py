#!/usr/bin/env python3
"""tools/shinri/meta.json + tools/shinri/terms-<旅>.json → data/shinri.json(1か所に まとめた もの)と shinri/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が shinri/ を 作るときに 呼ぶ。data/shinri.json と shinri/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/shinri/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/shinri/terms_js.py --check  # 確かめるだけ
決まりは tools/shinri/PROMPT.md。もとは tools/tetsugaku/terms_js.py(哲学を 写した)。
⭐ 語に `jikken`(🧪 じっけん。任意。1文・50字まで)と `kurashi`(💡 くらしで。任意。1文・50字まで・1旅に 10〜20語)を 持てる"""

import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 分野(公認心理師 試験の 出題基準の 分けに そろえた 17。tools/shinri/PROMPT.md)
SUBJECTS = ("心理学の成り立ち", "研究法・統計", "知覚・認知", "学習・言語", "感情・人格", "脳・神経", "社会・集団", "発達", "障害",
            "アセスメント", "心理支援", "健康・医療", "福祉", "教育", "司法・犯罪", "産業・組織", "法と制度")
# ✅ アドラー心理学・哲学・からだ図鑑・理科・看護師・血液型 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 心理学の 9つの 旅の 中だけ
# ⚠️ 名前・説明・じっけん・くらしでに 出さない ことば。見つけたら 止める(tools/shinri/PROMPT.md の 1〜5)
#   ① 自殺・自傷・摂食障害・依存症・統合失調症・虐待・暴力(こわい・まねの おそれ)
#   ② 人や 動物が つらい 思いを する 実験(ミルグラム・スタンフォード監獄・アルバート坊や・ハーロウの サル)
#   ③ 診断の 道具に なる 書きかた(チェックリスト・「〜なら ◯◯の サイン」)・薬の 名前と 量・「異常」「欠点」の 決めつけ
#   ④ 人を あやつる 書きかた(洗脳・マインドコントロール・心理術)・血液型で 人を 決めつける 書きかた
BAN = ["死", "自殺", "自死", "自傷", "殺", "流血", "出血", "血だらけ", "血を", "地獄", "処刑", "亡くなっ", "命を落と", "摂食障害", "拒食", "過食", "依存症", "統合失調", "虐待", "暴力", "いじめられ",
       "ミルグラム", "服従実験", "スタンフォード監獄", "監獄実験", "アルバート", "ハーロウ", "電気ショック", "電撃", "針金",
       "異常", "欠陥", "欠点", "障がい者は", "治らない", "かわいそう",
       "チェックリスト", "当てはまれば", "あてはまれば", "の サインです", "のサインです", "診断できます", "診断できる",
       "抗うつ薬", "睡眠薬", "向精神薬", "ミリグラム", "mg",
       "あやつれる", "操れる", "あやつる", "洗脳", "マインドコントロール", "人を 動かす 心理術", "心理術",
       "A型の人は", "B型の人は", "O型の人は", "AB型の人は", "A型の 人は", "B型の 人は", "O型の 人は", "AB型の 人は",
       "嫌われる勇気", "絶対に", "銃", "爆弾", "首相", "大統領"]
BAN_RE = [re.compile(r"[0-9０-９]+年に(?:生まれ|没)"), re.compile(r"(?:生年|没年)"), re.compile(r"[0-9０-９]+[%％]の 人"), re.compile(r"IQ ?[0-9]{2,3}")]
SUB_MAX = 50  # 🧪 じっけん・💡 くらしで の 長さ
KURASHI = (10, 20)  # 💡 くらしで は 1旅に 10〜20語
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
    ids = {}; readings = {}; per = {}; per_kr = {}
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 17の 分野の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        for key in ("jikken", "kurashi"):
            v = t.get(key)
            if v is None: continue
            if not isinstance(v, str) or not v: errs.append(f"{tid}: {key} は 文字")
            elif len(v) > SUB_MAX: errs.append(f"{tid}: {key} が 長い({len(v)}字。{SUB_MAX}字まで)")
            if key == "kurashi" and v: per_kr[t.get("journey")] = per_kr.get(t.get("journey"), 0) + 1
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + (t.get("jikken") or "") + (t.get("kurashi") or "")
        for w in BAN:
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
    for J in js:
        n = sum(v for (j, _), v in per.items() if j == J)
        k = per_kr.get(J, 0)
        if n and not KURASHI[0] <= k <= KURASHI[1]: errs.append(f"{J}: 💡 くらしで(kurashi)は 1旅に {KURASHI[0]}〜{KURASHI[1]}語(いま {k}語)")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("心理学の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("心理学の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/shinri.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 心理学の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 心理学の ゲームだけの 読みの 直し(ここに 足す)
           R(r"<ruby>正義<rt>まさよし</rt></ruby>", "<ruby>正義<rt>せいぎ</rt></ruby>"),
           R(r"<ruby>舌<rt>ぜつ</rt></ruby>", "<ruby>舌<rt>した</rt></ruby>"),
           R(r"<ruby>通<rt>かよ</rt></ruby>", "<ruby>通<rt>とお</rt></ruby>"),
           R(r"<ruby>横線<rt>おうせん</rt></ruby>", "<ruby>横線<rt>よこせん</rt></ruby>"),
           R(r"<ruby>十<rt>じゅう</rt></ruby><ruby>分<rt>ふん</rt></ruby>", "<ruby>十分<rt>じゅうぶん</rt></ruby>"),
           R(r"<ruby>何<rt>なに</rt></ruby><ruby>年<rt>ねん</rt></ruby>", "<ruby>何年<rt>なんねん</rt></ruby>"),
           R(r"<ruby>箱<rt>ばこ</rt></ruby>", "<ruby>箱<rt>はこ</rt></ruby>"),
           R(r"<ruby>外<rt>そと</rt></ruby><ruby>集団<rt>しゅうだん</rt></ruby>", "<ruby>外集団<rt>がいしゅうだん</rt></ruby>"),
           R(r"(?<![0-9])<ruby>年<rt>ねん</rt></ruby>(?=を )", "<ruby>年<rt>とし</rt></ruby>"),
           R(r"(<ruby>前<rt>まえ</rt></ruby>の )<ruby>年<rt>ねん</rt></ruby>", r"\1<ruby>年<rt>とし</rt></ruby>"),
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
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("jikken"): o["jk"] = t["jikken"]; o["jkrb"] = rub(t["jikken"])
        if t.get("kurashi"): o["kr"] = t["kurashi"]; o["krrb"] = rub(t["kurashi"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], nenpyo=m["nenpyo"], missions=[], list=out)
    (ROOT / "shinri").mkdir(exist_ok=True)
    (ROOT / "shinri/terms.js").write_text("/* tools/shinri/terms-*.json から tools/shinri/terms_js.py が 作る。手で 直さない */\nconst SHINRI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("shinri/terms.js", len(out), "語", (ROOT / "shinri/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
