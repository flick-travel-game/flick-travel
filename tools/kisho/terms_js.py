#!/usr/bin/env python3
"""フリック気象予報士(けいくん 2026-10-31)。tools/kisho/meta.json + tools/kisho/terms-<旅>.json → data/kisho.json(1か所に まとめた もの)と kisho/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が kisho/ を 作るときに 呼ぶ。data/kisho.json と kisho/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/kisho/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/kisho/terms_js.py --check  # 確かめるだけ
決まりは tools/kisho/PROMPT.md。もとは tools/pilot/terms_js.py(パイロット)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば(災害を こわく しない・変わる 数字・民間の 名前)。見つけたら 止める(けいくん 2026-10-31)
BAN = ["死", "遺体", "犠牲", "惨", "行方不明", "けがを", "けがし", "怪我", "被害者", "流され", "こわい", "怖い", "恐ろし", "壊滅", "全壊", "倒壊",
       "ウェザーニューズ", "ウェザーニュース", "日本気象協会", "tenki.jp", "ウェザーマップ", "Yahoo", "ヤフー", "ライフビジネスウェザー", "ハレックス",
       "合格率", "猛暑日の 日数", "最高気温の 記録", "観測史上", "土砂災害警戒情報", "記録的短時間大雨情報", "避難勧告", "洪水警報"]
# ⚠️ 2026年5月29日から 名前が 変わった 情報(土砂災害警戒情報 → レベル4土砂災害危険警報 / 記録的短時間大雨情報 → 気象防災速報 /
#   洪水警報 → レベル3氾濫警報 など)と 2021年に なくなった 避難勧告は、説明の「もとは ◯◯と よばれた」の 1文だけ 書いて よい(下の OLD_OK)
OLD_NAMES = ["土砂災害警戒情報", "記録的短時間大雨情報", "避難勧告", "洪水警報"]
OLD_OK = re.compile(r"(もとは|まえは|以前は|かつては|これまでの|それまでの|旧|むかしは|変わり|かわり|なくなり|廃止|一本化|改め|改称|置きかわ|呼ばれて|よばれて)")
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ。けいくんの OK を もらって 書く)
# ふりがなの 直し(この ゲームだけ。tools/make_ruby.py の FIX は ほかの ゲームにも 効くので さわらない)。{"まちがい": "正しい"}
RB_FIX = {
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
    "<ruby>積乱<rt>せきらん</rt></ruby><ruby>雲<rt>くも</rt></ruby>": "<ruby>積乱雲<rt>せきらんうん</rt></ruby>",
}
# ふりがなの 直しの つづき(助手が 旅ごとに 見つけた もの。tools/kisho/rbfix-*.json = {"まちがい": "正しい"})
for _f in sorted(HERE.glob("rbfix-*.json")): RB_FIX.update(json.loads(_f.read_text(encoding="utf-8")))
FIELDS = {"大気の構造", "大気の熱力学", "降水過程", "大気の放射", "大気の力学", "気象現象", "気候", "気象業務法", "観測", "数値予報", "予報", "防災気象情報", "実技"}
RULESETS = {"学科一般", "学科専門", "実技", "共通"}

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
        if t.get("difficulty") == 3 and not t.get("ruleset"): warn.append(f"{tid}: 上級なのに 試験の 札(ruleset)が 無い")
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
        sys.exit("気象予報士の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("気象予報士の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/kisho.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
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
        if t.get("ruleset"): o["rs"] = t["ruleset"]  # 📝 試験の 札(学科一般 / 学科専門 / 実技 / 共通)
        if t.get("formula"): o["fm"] = t["formula"]  # 🧮 公式の 見本(公式を 打つ 語だけ。等幅で 出す)
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "kisho").mkdir(exist_ok=True)
    (ROOT / "kisho/terms.js").write_text("/* tools/kisho/terms-*.json から tools/kisho/terms_js.py が 作る。手で 直さない */\nconst KISHO_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kisho/terms.js", len(out), "語", (ROOT / "kisho/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
