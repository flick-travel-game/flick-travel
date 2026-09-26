#!/usr/bin/env python3
"""data/aiTerms.json → ai/terms.js(ゲームが 読む 形。説明と 例に ふりがな)
tools/build_games.py が ai/ を 作るときに 呼ぶ。ai/terms.js は 手で 直さない
    python3 tools/ai/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/ai/terms_js.py --check  # 確かめるだけ"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")

def check(d):
    """aiTerms.json の 形を 確かめる。まちがいは ぜんぶ 出してから 止める"""
    m = d["meta"]; errs = []; warn = []
    js = {j["id"] for j in m["journeys"]}
    nodes = {f"{k}:{n['id']}" for k, g in m["diagrams"].items() for n in g["nodes"]}
    ids = {}; readings = {}
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
        if t.get("difficulty") not in (1, 2, 3, 4): errs.append(f"{tid}: difficulty は 1〜4")
        if t.get("type") not in ("concept", "service"): errs.append(f"{tid}: type は concept / service")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        r0 = t.get("reading"); readings.setdefault(r0, []).append(tid)
    for t in d["terms"]:
        rel = t.get("relatedTerms") or []
        if not 1 <= len(rel) <= 3: errs.append(f"{t['id']}: relatedTerms は 1〜3個")
        for r in rel:
            if r not in ids: errs.append(f"{t['id']}: つながる ことば「{r}」が ない")
            if r == t["id"]: errs.append(f"{t['id']}: 自分を つないでいる")
    for r, v in readings.items():
        if len(v) > 1: errs.append(f"読み「{r}」が かぶる: {v}")
    for ms in m.get("missions", []):
        for s in ms["steps"]:
            if s not in ids: errs.append(f"ミッション {ms['id']}: 「{s}」が ない")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("data/aiTerms.json に まちがいが " + str(len(errs)) + " こ あります")

def main():
    d = json.loads((ROOT / "data/aiTerms.json").read_text(encoding="utf-8"))
    check(d)
    if "--check" in sys.argv:
        print("data/aiTerms.json OK", len(d["terms"]), "語"); return
    from companies_js import rubifier
    rub = rubifier()
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("asOf"): o["asOf"] = t["asOf"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=m.get("missions", []), list=out)
    (ROOT / "ai").mkdir(exist_ok=True)
    (ROOT / "ai/terms.js").write_text("/* data/aiTerms.json から tools/ai/terms_js.py が 作る。手で 直さない */\nconst AI_TERMS = " +
                                      json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("ai/terms.js", len(out), "語", (ROOT / "ai/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
