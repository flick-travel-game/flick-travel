#!/usr/bin/env python3
"""tools/kyoryu/meta.json + tools/kyoryu/terms-<旅>.json → data/kyoryu.json(1か所に まとめた もの)と kyoryu/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が kyoryu/ を 作るときに 呼ぶ。data/kyoryu.json と kyoryu/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/kyoryu/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/kyoryu/terms_js.py --check  # 確かめるだけ
    python3 tools/kyoryu/terms_js.py --only niku  # 1つの 旅だけ 確かめる(数と つながりは 見ない)
決まりは tools/kyoryu/PROMPT.md。もとは tools/biyo/terms_js.py(美容師を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "kind", "emoji", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
PREFIX = {"niku": "ni-", "sou": "so-", "japan": "jp-", "jidai": "ji-", "kaseki": "ka-", "notdino": "de-", "shirabe": "ke-"}
# 旅ごとの 数(入門, 中級, 上級)。PROMPT.md の 表と 同じ
COUNT = {"niku": (10, 20, 20), "sou": (10, 20, 20), "japan": (6, 7, 7), "jidai": (10, 10, 10), "kaseki": (10, 10, 10), "notdino": (6, 7, 7), "shirabe": (6, 7, 7)}
KINDS = {"niku": {"dino"}, "sou": {"dino"}, "japan": {"dino", "word"}, "jidai": {"word"}, "kaseki": {"word"}, "notdino": {"notdino", "word"}, "shirabe": {"word"}}
PERIODS = ("ペルム紀", "三畳紀", "ジュラ紀", "白亜紀", "新生代", "")
DIETS = ("肉", "草", "雑食", "魚", "")
# ⚠️⚠️ ほかの ゲームに もう ある 見出しは 入れない。tools/kyoryu/other-words.txt(make_other_words.py が 作る)
OTHER = set((HERE / "other-words.txt").read_text(encoding="utf-8").split("\n")) - {""}
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める
#   ① 映画・アニメ・ゲームの 題名(商標)  ② こわい 書きかた  ③ 恐竜では ない ものを 恐竜と 書く 言いかた  ④ シリーズで 使わない 字
BAN = ["ジュラシック", "ゴジラ", "ポケモン", "ドラえもん", "ティラノ・レックス", "恐竜キング", "ガメラ",
       "血", "かみちぎ", "噛みちぎ", "ざんこく", "残酷", "殺", "惨",
       "恐竜の プテラノドン", "恐竜の 首長竜", "恐竜の 翼竜", "空飛ぶ 恐竜", "空を とぶ 恐竜", "海の 恐竜", "海に すむ 恐竜", "水中の 恐竜",
       "100マス", "百ます", "絶対に", "かならず"]
# 恐竜では ない ものの 名前が 入った 説明には「恐竜では ありません」を 書く(notdino の 生きもの)
MAXR = 20


def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        f = HERE / f"terms-{J['id']}.json"
        if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
    return d


def check(d, full=True):
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}
    dvs = {L["difficulty"] for L in m["levels"]}
    ids = {}; readings = {}; names = {}; per = {}
    for t in d["terms"]:
        tid = t.get("id"); j = t.get("journey")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if j in PREFIX and not str(tid).startswith(PREFIX[j]): errs.append(f"{tid}: id の 頭は {PREFIX[j]}")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        for r in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):
            if not KANA.fullmatch(r or ""): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
        if (t.get("acceptedReadings") or [t.get("reading")])[0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        rl = len(t.get("reading") or "")
        if rl > MAXR: errs.append(f"{tid}: 読みが 長すぎる({rl}字。20字まで)")
        elif rl > 12 and t.get("difficulty") != 3: errs.append(f"{tid}: 13字より 長い 読み({rl}字)は 上級だけ")
        if j not in js: errs.append(f"{tid}: journey「{j}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("kind") not in KINDS.get(j, set()): errs.append(f"{tid}: kind「{t.get('kind')}」は この 旅では {sorted(KINDS.get(j, set()))}")
        if t.get("period", "") not in PERIODS: errs.append(f"{tid}: period「{t.get('period')}」は {PERIODS}")
        if t.get("diet", "") not in DIETS: errs.append(f"{tid}: diet「{t.get('diet')}」は {DIETS}")
        if t.get("kind") in ("dino", "notdino"):
            for k in ("place", "lat", "lon", "period"):
                if t.get(k) in (None, ""): errs.append(f"{tid}: 生きものは {k} が 要る")
            try:
                if not (-90 <= float(t.get("lat")) <= 90 and -180 <= float(t.get("lon")) <= 180): errs.append(f"{tid}: lat/lon が おかしい")
            except (TypeError, ValueError): pass
            if t.get("place") and t["place"].startswith("日本") and j not in ("japan", "notdino"): errs.append(f"{tid}: 日本で 見つかった 恐竜は japan の 旅へ")
        elif t.get("lat") is not None or t.get("lon") is not None:
            if not t.get("place"): errs.append(f"{tid}: lat/lon を 書くなら place も")
        if t.get("kind") == "notdino" and "恐竜では ありません" not in t.get("description", "") and "恐竜の 仲間" not in t.get("description", ""):
            errs.append(f"{tid}: 恐竜では ない 生きものには「恐竜では ありません」(鳥の 仲間は「恐竜の 仲間」)を 書く")
        if t.get("name") in OTHER: errs.append(f"{tid}: 「{t.get('name')}」は ほかの ゲームに ある")
        if t.get("name") in names: errs.append(f"{tid}: 名前「{t.get('name')}」が {names[t['name']]} と かぶる")
        names[t.get("name")] = tid
        dl = len(t.get("description", ""))
        if dl > 130: errs.append(f"{tid}: 説明が 長い({dl}字。130字まで)")
        if "  " in t.get("description", ""): errs.append(f"{tid}: 説明に 空白が 2つ ならんでいる")
        for w in BAN:
            if w in t.get("name", "") + t.get("description", ""): errs.append(f"{tid}: 「{w}」は 使わない")
        for r in [t.get("reading")] + list(t.get("acceptedReadings") or []):
            readings.setdefault(r, []).append(tid)
        per.setdefault((j, t.get("difficulty")), 0); per[(j, t.get("difficulty"))] += 1
    for t in d["terms"]:
        rel = t.get("relatedTerms") or []
        if not 1 <= len(rel) <= 3: errs.append(f"{t['id']}: relatedTerms は 1〜3個")
        for r in rel:
            if full and r not in ids: errs.append(f"{t['id']}: つながる ことば「{r}」が ない")
            if r == t["id"]: errs.append(f"{t['id']}: 自分を つないでいる")
    for r, v in readings.items():
        if len(set(v)) > 1: errs.append(f"読み「{r}」が かぶる: {v}")
    if full:
        for J, want in COUNT.items():
            got = tuple(per.get((J, dv), 0) for dv in (1, 2, 3))
            if got != want: errs.append(f"{J}: 入門/中級/上級 = {got}。{want} に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("恐竜の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    only = "--only" in sys.argv
    if only:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d, full=not only)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or only:
        print("恐竜の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/kyoryu.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], kd=t["kind"],
                 e=t["emoji"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        for a, b in (("period", "pe"), ("diet", "di"), ("place", "pl")):
            if t.get(a): o[b] = t[a]
        if t.get("lat") is not None: o["la"] = float(t["lat"]); o["lo"] = float(t["lon"])
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"], list=out)
    (ROOT / "kyoryu").mkdir(exist_ok=True)
    (ROOT / "kyoryu/terms.js").write_text("/* tools/kyoryu/terms-*.json から tools/kyoryu/terms_js.py が 作る。手で 直さない */\nconst KYORYU_TERMS = " +
                                           json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kyoryu/terms.js", len(out), "語", (ROOT / "kyoryu/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
