#!/usr/bin/env python3
"""tools/hoiku/meta.json + tools/hoiku/terms-<旅>.json → data/hoiku.json(1か所に まとめた もの)と hoiku/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が hoiku/ を 作るときに 呼ぶ。data/hoiku.json と hoiku/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/hoiku/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/hoiku/terms_js.py --check  # 確かめるだけ
決まりは tools/hoiku/PROMPT.md。もとは tools/patissier/terms_js.py(パティシエを 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "subject", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 保育士試験の 筆記の 科目(tools/hoiku/meta.json の exam。2026年9月28日に 公式ページで 確かめた)
SUBJECTS = ("保育の心理学", "保育原理", "子ども家庭福祉", "社会福祉", "教育原理", "社会的養護", "子どもの保健", "子どもの食と栄養", "保育実習理論")
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める
#   ① 会社・園・商品・絵本・歌の 名前(商標・著作権)
#   ② ⚠️⚠️ 小学生も あそぶので こわがらせる 書きかた(むごい ようす・命の 話)。CLAUDE.md の 子ども安全設計
#   ③ 言いきり(こう すれば かならず こう なる)・シリーズで 使わない 字
BAN = ["ベネッセ", "アンパンマン", "ディズニー", "ミッキー", "ポケモン", "はらぺこあおむし", "ぐりとぐら", "いないいないばあ", "おかあさんといっしょ", "こどもちゃれんじ",
       # ⚠️ 「けられ」は 使わない(「分けられます」「つけられます」まで 止めてしまう)。蹴る 意味は 漢字で 見る
       "死亡", "亡くなっ", "殺", "殴", "暴力", "たたかれ", "ぶたれ", "蹴", "あざだらけ", "むごい", "かわいそう",
       "100マス", "百ます", "やせ", "治る", "かならず育", "絶対に", "必ず育"]
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
        if t.get("subject") not in SUBJECTS: errs.append(f"{tid}: subject「{t.get('subject')}」は 9科目の どれか")
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
        sys.exit("保育の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("保育の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/hoiku.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 sb=t["subject"], e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "hoiku").mkdir(exist_ok=True)
    (ROOT / "hoiku/terms.js").write_text("/* tools/hoiku/terms-*.json から tools/hoiku/terms_js.py が 作る。手で 直さない */\nconst HOIKU_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("hoiku/terms.js", len(out), "語", (ROOT / "hoiku/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
