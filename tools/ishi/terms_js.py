#!/usr/bin/env python3
"""tools/ishi/meta.json + tools/ishi/terms-<旅>.json → data/ishi.json(1か所に まとめた もの)と ishi/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が ishi/ を 作るときに 呼ぶ。data/ishi.json と ishi/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/ishi/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/ishi/terms_js.py --check  # 確かめるだけ
決まりは tools/ishi/PROMPT.md。もとは tools/kango/terms_js.py(看護師を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 医師国家試験出題基準(令和6年版)の 区分(tools/ishi/meta.json の exam。2026年9月30日に 厚生労働省の ページで 確かめた)
#   必修の基本的事項 + 医学総論の 9章 + 医学各論
SUBJECTS = ("必修の基本的事項", "保健医療論", "予防と健康管理・増進", "人体の正常構造と機能", "生殖、発生、成長、発達、加齢",
            "病因、病態生理", "症候", "診察", "検査", "治療", "医学各論")
# ✅ からだ旅行・看護師と 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    だから 看護師に あった karada-words.txt の 止めは 写していない。読みが かぶらないのは 医師の 7つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める
#   ① 会社・園・商品・絵本・歌の 名前(商標・著作権)
#   ② ⚠️⚠️ 小学生も あそぶので こわがらせる 書きかた(むごい ようす・命の 話)。CLAUDE.md の 子ども安全設計
#   ③ 言いきり(こう すれば かならず こう なる)・シリーズで 使わない 字
#   ① 会社・薬の 商品名(商標)  ② ⚠️⚠️ 小学生も あそぶので こわがらせる 書きかた  ③ ⚠️⚠️ 医療の やりかた(量・手順)
BAN = ["ロキソニン", "バファリン", "カロナール", "タイレノール", "ボルタレン", "テルモ", "オムロン",
       "死亡", "死ぬ", "死に至", "亡くなっ", "命を落と", "殺", "暴力", "むごい", "かわいそう", "激痛", "血まみれ", "出血多量", "苦しんで",
       "mg", "ミリグラム", "mL", "ミリリットル", "cc", "回押", "cm押", "センチ押", "30回", "何回押",
       "脳死", "安楽死", "自殺", "虐待", "遺体", "解剖して",
       "100マス", "百ます", "治ります", "かならず治", "必ず治", "絶対に"]
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 11の 区分の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        for w in BAN:
            if w in t.get("name", "") + t.get("description", "") + t.get("example", ""): errs.append(f"{tid}: 「{w}」は 使わない")
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
        sys.exit("医師の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("医師の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/ishi.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 医師の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイターと 同じ)/ ひとつだけの「科」→ か(とが に なっていた)/
    #   「腹痛」→ ふくつう(はらいた に なっていた)/「便」→ べん(医師の 説明では いつも 大便の 意味。びん に なっていた)
    FIX = [(re.compile(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)"), "<ruby>数<rt>かず</rt></ruby>"),
           (re.compile(r"<ruby>科<rt>とが</rt></ruby>"), "<ruby>科<rt>か</rt></ruby>"),
           (re.compile(r"<ruby>腹痛<rt>はらいた</rt></ruby>"), "<ruby>腹痛<rt>ふくつう</rt></ruby>"),
           (re.compile(r"<ruby>便<rt>びん</rt></ruby>"), "<ruby>便<rt>べん</rt></ruby>")]
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
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "ishi").mkdir(exist_ok=True)
    (ROOT / "ishi/terms.js").write_text("/* tools/ishi/terms-*.json から tools/ishi/terms_js.py が 作る。手で 直さない */\nconst ISHI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("ishi/terms.js", len(out), "語", (ROOT / "ishi/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
