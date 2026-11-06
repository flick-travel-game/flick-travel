#!/usr/bin/env python3
"""フリックネイリスト(けいくん 2026-11-06)。tools/nail/meta.json + tools/nail/terms-<旅>.json → data/nail.json(1か所に まとめた もの)と nail/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が nail/ を 作るときに 呼ぶ。data/nail.json と nail/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/nail/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/nail/terms_js.py --check  # 確かめるだけ
決まりは tools/nail/PROMPT.md。もとは tools/kisho/terms_js.py(気象予報士)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば(医療に ふみこまない・やりかたの 数字・ブランド名・見た目を わるく 言う・こわい けが)。見つけたら 止める(けいくん 2026-11-06)
BAN = ["治療", "治す", "治る", "治り", "完治", "診断", "処方", "塗り薬", "飲み薬", "抗菌薬", "抗真菌", "軟膏", "医師法",
       "出血", "血が", "膿", "化膿", "こわい", "怖い", "痛そう",
       "汚い", "きたない", "太い指", "ずんぐり", "不格好", "みっともない", "醜",
       "%", "％", "秒", "日もつ", "週間もつ", "か月もつ", "ヶ月もつ", "ずっと 取れない", "絶対に", "必ず もうかる", "かならず もうかる", "最安",
       "カルジェル", "バイオジェル", "パラジェル", "プリジェル", "シャイニージェル", "アイスジェル", "ジェリーネイル", "リーフジェル", "ベティジェル", "ageha", "アゲハ",
       "OPI", "CND", "シェラック", "エッシー", "essie", "ネイルホリック", "キャンメイク", "ちふれ", "ディオール", "シャネル", "Dior", "CHANEL", "ネイルパフェ",
       "ネイルクイック", "ファストネイル", "ホットペッパー", "ミニモ", "minimo", "Instagram", "インスタグラム", "TikTok", "LINE", "楽天", "Amazon", "アマゾン",
       "サンリオ", "キティ", "ディズニー", "ミッキー", "ポケモン", "ピカチュウ", "スヌーピー", "ミッフィー", "ドラえもん", "アンパンマン", "ハローキティ",
       "まつげエクステ", "まつ毛エクステ", "顔そり"]
YEN = re.compile(r"[0-9０-９,，]+ ?円")
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ。けいくんの OK を もらって 書く)
# ふりがなの 直し(この ゲームだけ。tools/make_ruby.py の FIX は ほかの ゲームにも 効くので さわらない)。{"まちがい": "正しい"}
RB_FIX = {
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
}
# ふりがなの 直しの つづき(助手が 旅ごとに 見つけた もの。tools/nail/rbfix-*.json = {"まちがい": "正しい"})
for _f in sorted(HERE.glob("rbfix-*.json")): RB_FIX.update(json.loads(_f.read_text(encoding="utf-8")))
FIELDS = {"爪の構造", "皮膚科学", "衛生と消毒", "爪の病気", "道具", "ケア", "カラー", "ジェル", "スカルプチュア", "アート", "接客", "法律", "経営"}
RULESETS = {"技能検定", "ジェル検定", "衛生", "サロン", "共通"}

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
        txt = " / ".join([t.get("name", ""), t.get("description", ""), t.get("example", ""), t.get("kotoba", "")])
        for w in BAN:
            if w in BAN_OK.get(tid, []): continue
            if w in txt:
                errs.append(f"{tid}: 「{w}」は 使わない")
        if YEN.search(txt): errs.append(f"{tid}: 金額(◯円)は 書かない")
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
        sys.exit("ネイリストの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("ネイリストの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/nail.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
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
        if t.get("ruleset"): o["rs"] = t["ruleset"]  # 📝 試験の 札(技能検定 / ジェル検定 / 衛生 / サロン / 共通)
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "nail").mkdir(exist_ok=True)
    (ROOT / "nail/terms.js").write_text("/* tools/nail/terms-*.json から tools/nail/terms_js.py が 作る。手で 直さない */\nconst NAIL_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("nail/terms.js", len(out), "語", (ROOT / "nail/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
