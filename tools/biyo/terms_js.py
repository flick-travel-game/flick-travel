#!/usr/bin/env python3
"""tools/biyo/meta.json + tools/biyo/terms-<旅>.json → data/biyo.json(1か所に まとめた もの)と biyo/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が biyo/ を 作るときに 呼ぶ。data/biyo.json と biyo/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/biyo/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/biyo/terms_js.py --check  # 確かめるだけ
決まりは tools/biyo/PROMPT.md。もとは tools/kango/terms_js.py(看護師を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 美容師国家試験の 筆記の 課目(tools/biyo/meta.json の exam。2026年9月29日に 理容師美容師試験研修センターの 合格基準の ページで 確かめた)
SUBJECTS = ("関係法規・制度及び運営管理", "公衆衛生・環境衛生", "感染症", "衛生管理技術", "人体の構造及び機能", "皮膚科学", "香粧品化学", "文化論及び美容技術理論")
# ⚠️⚠️ ほかの ゲーム(理科・からだ・看護・保育 … ぜんぶ)に もう ある 見出しは 入れない。tools/biyo/other-words.txt(make_other_words.py が 作る)
OTHER = set((HERE / "other-words.txt").read_text(encoding="utf-8").split("\n")) - {""}
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める
#   ① 会社・商品の 名前(商標)
#   ② ⚠️⚠️ 見た目を わるく 言う 言いかた(子どもも あそぶ。気にしている 子が いる)
#   ③ ⚠️⚠️ 薬の 濃さ・置く 時間(やりかたを 書かない)  ④ 言いきり・シリーズで 使わない 字
BAN = ["資生堂", "ミルボン", "ロレアル", "ウエラ", "ホーユー", "コーセー", "カネボウ", "花王", "ナプラ", "アリミノ", "ルベル", "ダイソン", "パナソニック",
       "かっこわるい", "かっこ悪い", "みっともない", "ブス", "ハゲ", "はげ", "ダサ", "醜", "みにくい", "コンプレックス", "悩み", "なやみ", "直す 必要", "なおす 必要",
       "%", "％", "パーセント", "分置", "分間置", "分 置", "放置時間", "mL", "ml", "ミリリットル", "倍に うすめ", "倍に 薄め", "倍希釈",
       "死亡", "死ぬ", "亡くなっ", "殺", "暴力", "激痛", "血まみれ",
       "100マス", "百ます", "治ります", "かならず治", "必ず治", "絶対に", "一番 きれい", "いちばん きれい"]
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 8課目の どれか")
        if t.get("name") in OTHER: errs.append(f"{tid}: 「{t.get('name')}」は ほかの ゲームに ある")
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
        sys.exit("美容の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("美容の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/biyo.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
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
    (ROOT / "biyo").mkdir(exist_ok=True)
    (ROOT / "biyo/terms.js").write_text("/* tools/biyo/terms-*.json から tools/biyo/terms_js.py が 作る。手で 直さない */\nconst BIYO_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("biyo/terms.js", len(out), "語", (ROOT / "biyo/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
