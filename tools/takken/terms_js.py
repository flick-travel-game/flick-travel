#!/usr/bin/env python3
"""フリック宅建士(けいくん 2026-11-07)。tools/takken/meta.json + tools/takken/terms-<旅>.json → data/takken.json(1か所に まとめた もの)と takken/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が takken/ を 作るときに 呼ぶ。data/takken.json と takken/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/takken/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/takken/terms_js.py --check  # 確かめるだけ
決まりは tools/takken/PROMPT.md。もとは tools/menkyo/terms_js.py(運転免許)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば(災害を こわく しない・変わる 数字・民間の 名前)。見つけたら 止める(けいくん 2026-10-31)
BAN = ["死亡", "死者", "死ぬ", "死な", "死ん", "遺体", "犠牲", "惨", "自殺", "孤独死", "事故物件", "心理的瑕疵", "殺", "血", "こわい", "怖い", "恐ろし", "夜逃げ", "追い出", "暴力団",
       "三井不動産", "三菱地所", "住友不動産", "東急", "野村不動産", "大和ハウス", "積水ハウス", "SUUMO", "スーモ", "HOME'S", "ホームズ", "アットホーム", "エイブル", "アパマン", "ミニミニ", "レオパレス",
       "合格率", "合格点は", "地価は", "もうかる", "儲か", "必ず上が", "投資で", "抜け道", "ばれない"]
# ⚠️ 2026年に 変わった 決まり。古い 答えは name に しない。説明の「前は ◯◯でした」の 1文だけ 書いて よい
OLD_NAMES = []
OLD_OK = re.compile(r"(もとは|まえは|前は|以前は|かつては|これまでは|それまでは|むかしは|変わり|かわり|なくなり|廃止|改め|改正|引き下げ)")
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ)
RB_FIX = {
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
}
for _f in sorted(HERE.glob("rbfix-*.json")): RB_FIX.update(json.loads(_f.read_text(encoding="utf-8")))
FIELDS = {"民法", "借地借家法", "区分所有法", "不動産登記法", "宅建業法", "住宅瑕疵担保履行法", "都市計画法", "建築基準法", "国土利用計画法", "農地法", "盛土規制法", "土地区画整理法", "税", "鑑定・地価公示", "住宅金融支援機構", "景表法", "土地・建物", "くらし"}
RULESETS = {"権利関係", "宅建業法", "法令上の制限", "税・その他", "免除科目"}

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
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        if t.get("field") not in FIELDS: errs.append(f"{tid}: field「{t.get('field')}」は {sorted(FIELDS)} の どれか")
        if t.get("formula") and len(t["formula"]) > 40: warn.append(f"{tid}: 公式が 長い")
        txt = " / ".join([t.get("name", ""), t.get("description", ""), t.get("example", ""), t.get("kotoba", "")])
        for w in BAN:
            if w in BAN_OK.get(tid, []): continue
            if w in txt:
                if w in OLD_NAMES and w not in t.get("name", "") and OLD_OK.search(t.get("description", "")): continue
                errs.append(f"{tid}: 「{w}」は 使わない")
        if t.get("ruleset") and t["ruleset"] not in RULESETS: errs.append(f"{tid}: ruleset「{t['ruleset']}」は {sorted(RULESETS)} の どれか")
        if not t.get("ruleset"): errs.append(f"{tid}: 科目の 札(ruleset)が 無い")
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
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("宅建士の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("宅建士の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/takken.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    def rub(text):
        h = rub0(text)
        for a, b in RB_FIX.items(): h = h.replace(a, b)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("ruleset"): o["rs"] = t["ruleset"]  # 📝 科目の 札(権利関係 / 宅建業法 / 法令上の制限 / 税・その他 / 免除科目)
        if t.get("formula"): o["fm"] = t["formula"]  # 🧮 公式の 見本(公式を 打つ 語だけ。等幅で 出す)
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out, mock=m.get("mock"), mockNote=m.get("mockNote", ""))
    # ⭕❌ 一問一答・🔢 数字クイズ(決まりは MARU.md / NUM.md。確かめは maru_check.py)
    tids = {t["id"] for t in d["terms"]}
    maru = []
    for J in m["journeys"]:
        f = HERE / f"maru-{J['id']}.json"
        if f.exists():
            for x in json.loads(f.read_text(encoding="utf-8")):
                o = dict(id=x["id"], j=J["id"], q=x["q"], a=bool(x["a"]), w=x["why"], dv=x["dv"], rs=x["rs"])
                if x.get("law"): o["lw"] = x["law"]
                if x.get("term") in tids: o["t"] = x["term"]
                maru.append(o)
    js["maru"] = maru
    f = HERE / "num.json"
    js["num"] = [dict(id=x["id"], j=x["j"], rs=x["rs"], q=x["q"], a=x["a"], o=x["opts"], w=x["why"], lw=x.get("law", "")) for x in json.loads(f.read_text(encoding="utf-8"))] if f.exists() else []
    (ROOT / "takken").mkdir(exist_ok=True)
    (ROOT / "takken/terms.js").write_text("/* tools/takken/terms-*.json から tools/takken/terms_js.py が 作る。手で 直さない */\nconst TAKKEN_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("takken/terms.js", len(out), "語", len(js["maru"]), "問", len(js["num"]), "数字", (ROOT / "takken/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
