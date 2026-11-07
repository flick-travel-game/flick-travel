#!/usr/bin/env python3
"""フリック日商簿記(けいくん 2026-11-07)。tools/boki/meta.json + terms-<旅>.json + shiwake-<旅>.json + maru-<旅>.json + calc.js
→ data/boki.json と boki/terms.js(BOKI_TERMS。説明に ふりがな)と boki/calc.js(BOKI_CALC)
tools/build_games.py が boki/ を 作るときに 呼ぶ。data/boki.json・boki/terms.js・boki/calc.js は 手で 直さない
    python3 tools/boki/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/boki/terms_js.py --check  # 確かめるだけ
決まりは tools/boki/PROMPT.md・SHIWAKE.md・MARU.md。もとは tools/takken/terms_js.py(宅建士)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "ruleset", "grade", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 出さない ことば(実在の 会社・会計ソフト・節税や 粉飾の やりかた・こわい ことば・変わる 数字)
BAN = ["死亡", "死ぬ", "自殺", "殺", "血", "こわい", "怖い", "暴力団",
       "みらい商事", "弥生", "freee", "フリー会計", "マネーフォワード", "勘定奉行", "トヨタ", "ソニー", "任天堂", "パナソニック", "三菱", "三井", "住友", "日立",
       "合格率", "もうかる", "儲か", "必ず上が", "抜け道", "ばれない", "ごまかし方", "隠し方", "薄記", "仕分け"]
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ)
BAN_WORD_OK = []
def ban_text(txt):
    for w in BAN_WORD_OK: txt = txt.replace(w, "")
    return txt
RB_FIX = {
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
}
for _f in sorted(HERE.glob("rbfix-*.json")): RB_FIX.update(json.loads(_f.read_text(encoding="utf-8")))
FIELDS = {"簿記の きほん", "商品売買", "債権債務", "現金預金", "固定資産", "決算", "株式会社", "有価証券", "連結", "税効果", "外貨", "金融商品", "収益認識", "原価計算", "標準原価", "直接原価", "会計基準", "管理会計"}
RULESETS = {"商業簿記", "工業簿記", "会計学", "原価計算"}
GRADES = {"3級", "2級", "1級"}
GRADE_OF = {"kihon": "3級", "3shiwake": "3級", "3kessan": "3級", "2shogyo": "2級", "2kaisha": "2級", "2kogyo": "2級", "1shogyo": "1級", "1kaikei": "1級", "1genka": "1級"}

def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": [], "shiwake": [], "maru": []}
    for J in d["meta"]["journeys"]:
        for kind in ("terms", "shiwake", "maru"):
            f = HERE / f"{kind}-{J['id']}.json"
            if f.exists():
                for x in json.loads(f.read_text(encoding="utf-8")):
                    if kind != "terms": x = dict(x, j=J["id"])
                    d[kind].append(x)
    return d

def txt_ban(tid, txt, errs):
    txt = ban_text(txt)
    for w in BAN:
        if w in BAN_OK.get(tid, []): continue
        if w in txt: errs.append(f"{tid}: 「{w}」は 使わない")

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
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        if t.get("field") not in FIELDS: errs.append(f"{tid}: field「{t.get('field')}」は {sorted(FIELDS)} の どれか")
        if t.get("ruleset") not in RULESETS: errs.append(f"{tid}: ruleset「{t.get('ruleset')}」は {sorted(RULESETS)} の どれか")
        if t.get("grade") != GRADE_OF.get(t.get("journey")): errs.append(f"{tid}: grade は {GRADE_OF.get(t.get('journey'))}")
        if t.get("formula") and len(t["formula"]) > 40: warn.append(f"{tid}: 公式が 長い")
        txt_ban(tid, " / ".join([t.get("name", ""), t.get("description", ""), t.get("example", ""), t.get("formula", "")]), errs)
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
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    # 🧾 仕訳クイズ(SHIWAKE.md)
    seen = set()
    for x in d["shiwake"]:
        sid = f"{x['j']}-{x.get('id')}"
        if sid in seen: errs.append(f"{sid}: id が かぶる")
        seen.add(sid)
        for k in ("id", "dv", "rs", "f", "q", "dr", "cr", "ng", "wa", "why"):
            if x.get(k) in (None, "", []): errs.append(f"{sid}: {k} が 空")
        if x.get("dv") not in (1, 2, 3): errs.append(f"{sid}: dv は 1〜3")
        if x.get("rs") not in RULESETS: errs.append(f"{sid}: rs「{x.get('rs')}」")
        if x.get("f") not in FIELDS: errs.append(f"{sid}: f「{x.get('f')}」")
        lines = list(x.get("dr") or []) + list(x.get("cr") or [])
        try:
            ok = all(isinstance(a, str) and a and isinstance(v, int) and v > 0 for a, v in lines)
        except (TypeError, ValueError):
            ok = False
        if not ok: errs.append(f"{sid}: dr / cr は [[科目, 正の 整数], …]"); continue
        sd, sc = sum(v for _, v in x["dr"]), sum(v for _, v in x["cr"])
        if sd != sc: errs.append(f"{sid}: 借方 {sd:,} と 貸方 {sc:,} が 合わない")
        for side in ("dr", "cr"):
            names = [a for a, _ in x[side]]
            if len(set(names)) != len(names): errs.append(f"{sid}: {side} に 同じ 科目が 2回")
        acc = {a for a, _ in lines}
        ng = x.get("ng") or []
        if len(set(ng)) < 3: errs.append(f"{sid}: ng は ちがう 科目を 3つ 以上")
        for a in ng:
            if a in acc: errs.append(f"{sid}: ng の「{a}」は 正しい 仕訳に ある")
        wa = x.get("wa") or []
        right = [v for _, v in lines]
        if len(wa) != 3: errs.append(f"{sid}: wa は 3つ")
        for w in wa:
            if not isinstance(w, list) or len(w) != len(lines) or not all(isinstance(v, int) and v > 0 for v in w): errs.append(f"{sid}: wa の 1つ {w} は 長さ {len(lines)} の 正の 整数の 配列"); break
            if w == right: errs.append(f"{sid}: wa に 正しい 金額と 同じ ものが ある")
        if len({json.dumps(w) for w in wa}) != len(wa): errs.append(f"{sid}: wa に 同じ ものが ある")
        if len(x.get("q", "")) > 170: warn.append(f"{sid}: 問題文が 長い({len(x['q'])}字)")
        if len(x.get("why", "")) > 170: warn.append(f"{sid}: とき方が 長い({len(x['why'])}字)")
        if x.get("term") and x["term"] not in ids: warn.append(f"{sid}: term「{x['term']}」が ない")
        txt_ban(sid, " / ".join([x.get("q", ""), x.get("why", "")] + sorted(acc)), errs)
    # 📝 ⭕❌(MARU.md)
    mids = set()
    for x in d["maru"]:
        mid = x.get("id")
        if mid in mids: errs.append(f"{mid}: id が かぶる")
        mids.add(mid)
        for k in ("id", "q", "why", "dv", "rs"):
            if x.get(k) in (None, ""): errs.append(f"{mid}: {k} が 空")
        if not isinstance(x.get("a"), bool): errs.append(f"{mid}: a は true / false")
        if x.get("dv") not in (1, 2, 3): errs.append(f"{mid}: dv は 1〜3")
        if x.get("rs") not in RULESETS: errs.append(f"{mid}: rs「{x.get('rs')}」")
        if len(x.get("why", "")) > 150: warn.append(f"{mid}: why が 長い({len(x['why'])}字)")
        if x.get("term") and x["term"] not in ids: warn.append(f"{mid}: term「{x['term']}」が ない")
        txt_ban(mid, x.get("q", "") + " / " + x.get("why", ""), errs)
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs[:300]: print("❌", e)
        sys.exit("日商簿記の データに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    print("仕訳", len(d["shiwake"]), "問 / ⭕❌", len(d["maru"]), "問")
    if "--check" in sys.argv:
        print("日商簿記の データ OK", len(d["terms"]), "語"); return
    (ROOT / "data/boki.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    def rub(text):
        h = rub0(text)
        for a, b in RB_FIX.items(): h = h.replace(a, b)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]),
                 rs=t["ruleset"], g=t["grade"], f=t["field"])
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("formula"): o["fm"] = t["formula"]
        out.append(o)
    m = d["meta"]
    tids = {t["id"] for t in d["terms"]}
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out, mock=m.get("mock"), exam=m.get("exam", ""))
    js["maru"] = [dict(id=x["id"], j=x["j"], q=x["q"], a=bool(x["a"]), w=x["why"], dv=x["dv"], rs=x["rs"], g=GRADE_OF[x["j"]],
                       **({"lw": x["src"]} if x.get("src") else {}), **({"t": x["term"]} if x.get("term") in tids else {})) for x in d["maru"]]
    js["sw"] = [dict(id=x["j"] + "-" + x["id"], j=x["j"], dv=x["dv"], rs=x["rs"], f=x["f"], g=GRADE_OF[x["j"]], q=x["q"], dr=x["dr"], cr=x["cr"], ng=x["ng"], wa=x["wa"], w=x["why"],
                     **({"t": x["term"]} if x.get("term") in tids else {})) for x in d["shiwake"]]
    (ROOT / "boki").mkdir(exist_ok=True)
    (ROOT / "boki/terms.js").write_text("/* tools/boki/*.json から tools/boki/terms_js.py が 作る。手で 直さない */\nconst BOKI_TERMS = " +
                                       json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    calc = (HERE / "calc.js").read_text(encoding="utf-8") if (HERE / "calc.js").exists() else "const CALC_G = [], CALC_LV = [], CALC = [];"
    (ROOT / "boki/calc.js").write_text("/* tools/boki/calc.js から tools/boki/terms_js.py が 作る。手で 直さない */\nconst BOKI_CALC = (() => {\n" + calc + "\n  return { CALC, CALC_G, CALC_LV };\n})();\n", encoding="utf-8")
    print("boki/terms.js", len(out), "語", len(js["sw"]), "仕訳", len(js["maru"]), "⭕❌", (ROOT / "boki/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
