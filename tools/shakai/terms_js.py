#!/usr/bin/env python3
"""tools/shakai/meta.json + tools/shakai/terms-<旅>.json → data/shakai.json(1か所に まとめた もの)と shakai/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が shakai/ を 作るときに 呼ぶ。data/shakai.json と shakai/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/shakai/terms_js.py              # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/shakai/terms_js.py --check      # 確かめるだけ
    python3 tools/shakai/terms_js.py --only kenpo # 1つの 旅だけ 確かめる
決まりは tools/shakai/PROMPT.md。もとは tools/kokugo/terms_js.py(国語を 写した)。mapNode(日本の 地方)は 日本の地理だけ(付けなくても よい)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば(シリーズで 使わない 字 / 言いきり)。見つけたら 止める
BAN = ["100マス", "百ます", "合格できる", "かならず出る", "必ず出る", "かならず 出る", "必ず 出る"]

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
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") is not None and t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if t.get("mapNode") and t.get("journey") != "japan": errs.append(f"{tid}: mapNode は 日本の地理だけ")
        if t.get("reading") and t.get("reading") in t.get("description", "") + t.get("example", "") and len(t.get("reading")) >= 3: warn.append(f"{tid}: 説明に 読み「{t['reading']}」が 見えている")
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
    want = {"chizu": 20}
    for (j, dv), n in per.items():
        if n != want.get(j, 30): errs.append(f"{j} の むずかしさ{dv} は {want.get(j, 30)}語(いま {n}語)")
    if "--only" not in sys.argv and len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("社会の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("社会の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/shakai.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("mapNode"): o["mp"] = t["mapNode"]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "shakai").mkdir(exist_ok=True)
    (ROOT / "shakai/terms.js").write_text("/* tools/shakai/terms-*.json から tools/shakai/terms_js.py が 作る。手で 直さない */\nconst SHAKAI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("shakai/terms.js", len(out), "語", (ROOT / "shakai/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
