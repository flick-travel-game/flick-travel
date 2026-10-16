#!/usr/bin/env python3
"""tools/kanken/meta.json + tools/kanken/terms-<旅>.json → data/kanken.json と kanken/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が kanken/ を 作るときに 呼ぶ。data/kanken.json と kanken/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/kanken/terms_js.py              # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/kanken/terms_js.py --check      # 確かめるだけ
    python3 tools/kanken/terms_js.py --only kaki  # 1つの 旅だけ 確かめる
決まりは tools/kanken/PROMPT.md。もとは tools/kokugo/terms_js.py(国語を 写した)。
書き取り(kaki・doon)の 字の 形は tools/kanken/strokes.py が kanken/strokes.js に する(KanjiVG)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
KATA = re.compile(r"[ァ-ヶー]+")
PREFIX = dict(yomi="yo-", kaki="ka-", bushu="bs-", okuri="ok-", jukugo="jk-", yoji="yj-", taigi="tg-", doon="dn-")
TYPES = dict(はんたい="hantai", にたいみ="nita", しゅうしょく="shushoku", もくてき="mokuteki", うちけし="uchikeshi")
WRITE = ("kaki", "doon")          # 指で 書く 旅
UNIQUE = ("yomi", "yoji", "taigi")  # 打つ 字が 見えない(かくす)ことが ある 旅: 読みを かぶらせない
# ⚠️ 名前・説明に 出さない ことば(人の 商標 / 言いきり)。見つけたら 止める
BAN = ["漢検", "漢字検定", "準1級", "1級", "2級", "合格できる", "かならず出る", "必ず出る", "100マス", "百ます"]

def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        f = HERE / f"terms-{J['id']}.json"
        if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
        for g in sorted(HERE.glob(f"terms-{J['id']}-*.json")):  # 足しかけの ことば(でき上がったら 1つに まとめる)
            d["terms"] += json.loads(g.read_text(encoding="utf-8"))
    return d

# 学年別漢字配当表(2020〜)と 常用漢字。dv1〜6 = 小学1〜6年 / dv7 = 中学(常用の のこり)/ dv8〜10 = 常用・表外・最難関
KL = json.loads((HERE / "kanji-lists.json").read_text(encoding="utf-8"))
UPTO = {}; BAND = {}
_acc = ""
for g in "123456":
    _acc += KL["grades"][g]; UPTO[int(g)] = set(_acc) | {"々"}; BAND[int(g)] = set(KL["grades"][g])
UPTO[7] = set(KL["jouyou"]) | {"々"}; BAND[7] = set(KL["middle"])
# 読み・書き取り 以外の 旅は 3つの 段だけ: dv3 = 小1〜3 / dv6 = 小4〜6 / dv7 = 中学
SPAN = {3: set(KL["grades"]["1"] + KL["grades"]["2"] + KL["grades"]["3"]), 6: set(KL["grades"]["4"] + KL["grades"]["5"] + KL["grades"]["6"]), 7: BAND[7]}
RADICAL = set("氵亻艹宀辶扌忄冫刂攵頁冖廾彡阝礻衤糸灬疒癶罒耂月王禾")  # 説明に 出して よい 部首の 形
CJK = re.compile(r"[一-鿿々]")

def tier_errs(t):
    """小学校・中学の 段: 出す 字は その 学年までに 習う 字だけ / その 段で 新しく 習う 字を 1つは 入れる"""
    dv = t.get("difficulty"); j = t.get("journey"); tid = t.get("id"); e = []
    if not isinstance(dv, int) or dv > 7: return e
    if j not in ("yomi", "kaki") and dv not in SPAN: return [f"{tid}: この 旅の 小中の 段は 3・6・7 だけ(いま {dv})"]
    ok = UPTO[dv]
    fields = ("name", "pair", "sentence", "wrong", "kanji", "description", "example")  # bushu(部首の 形 氵・亻 など)は 見ない
    for f in fields:
        for ch in CJK.findall(str(t.get(f) or "")):
            if ch not in ok and not (f in ("description", "example") and (ch in UPTO[7] or ch in RADICAL)):
                e.append(f"{tid}: {f} の「{ch}」は 段 {dv} では まだ 習わない字"); break
    band = BAND[dv] if j in ("yomi", "kaki") else SPAN[dv]
    key = (t.get("kanji") or "") if j in ("kaki", "okuri", "bushu") else (t.get("name") or "") + (t.get("kanji") or "")
    if j == "doon" and t.get("kind") == "goji": key = t.get("kanji") or ""
    if not any(ch in band for ch in key): e.append(f"{tid}: 段 {dv} で 習う 字が 入っていない(「{key}」)")
    return e

def strokes_ok():
    """KanjiVG が 手元に あれば、書き取りの 字が あるかを 見る(無ければ 見ない。strokes.py が 止める)"""
    sys.path.insert(0, str(HERE))
    try:
        from strokes import kvg_dir
        p = kvg_dir()
        return (lambda ch: (p / f"{ord(ch):05x}.svg").exists()) if p else None
    except Exception:
        return None

def check(d):
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}
    nodes = {f"{k}:{n['id']}" for k, g in m["diagrams"].items() for n in g["nodes"]}
    dvs = {L["difficulty"] for L in m["levels"]}
    has = strokes_ok()
    ids = {}; readings = {}; names = {}; per = {}; wrote = {}
    for t in d["terms"]:
        tid = t.get("id"); j = t.get("journey"); text = "".join(str(t.get(k, "")) for k in ("name", "description", "example", "sentence", "category"))
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if j in PREFIX and not str(tid).startswith(PREFIX[j]): errs.append(f"{tid}: id の 頭は {PREFIX[j]}")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        for r in [t.get("reading") or ""] + list(t.get("acceptedReadings") or []):
            if not KANA.fullmatch(r): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
        if t.get("acceptedReadings") and t["acceptedReadings"][0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        if j not in js: errs.append(f"{tid}: journey「{j}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") is not None and t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が 図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        for w in BAN:
            if w in text: errs.append(f"{tid}: 「{w}」は 使わない")
        errs += tier_errs(t)
        k = t.get("kanji")
        if j in WRITE + ("okuri", "bushu") and (not k or len(k) != 1): errs.append(f"{tid}: kanji は 1字(いま「{k}」)")
        # 旅ごとの 形
        s = t.get("sentence", "")
        if j in WRITE + ("okuri",):
            mk = re.findall(r"【([^】]*)】", s)
            if len(mk) != 1: errs.append(f"{tid}: sentence に【 】が 1つ いる(いま {len(mk)})")
            elif j == "doon" and t.get("kind") == "goji":
                if mk[0] != t.get("wrong") or len(mk[0]) != 1: errs.append(f"{tid}: 誤字の【 】の 中は wrong の 1字")
                if t.get("wrong") == k: errs.append(f"{tid}: wrong と kanji が 同じ")
            elif not KATA.fullmatch(mk[0]): errs.append(f"{tid}: 【 】の 中は カタカナ(いま「{mk[0]}」)")
            if len(s) > 34: warn.append(f"{tid}: sentence が 長い({len(s)}字)")
        if j in WRITE:
            if k and k not in t.get("name", ""): errs.append(f"{tid}: kanji「{k}」が name に ない")
            if j == "doon" and t.get("kind") not in ("doon", "dokun", "goji"): errs.append(f"{tid}: kind は doon / dokun / goji")
            if k: wrote.setdefault((j, k), []).append(tid)
            if has and k and len(k) == 1 and not has(k): errs.append(f"{tid}: 「{k}」は KanjiVG に 形が ない(書けない)。ほかの 字に")
        if j == "okuri":
            n = t.get("name", "")
            if not n.startswith(k or "?") or n[1:] != t.get("reading"): errs.append(f"{tid}: 送りがな = name から 漢字 1字を 取った のこり(name「{n}」/ reading「{t.get('reading')}」)")
        if j == "bushu":
            if not t.get("bushu"): errs.append(f"{tid}: bushu(部首の 字)が いる")
            if t.get("name") != k: errs.append(f"{tid}: 部首の 旅は name = kanji")
        if j == "jukugo":
            if t.get("reading") not in TYPES: errs.append(f"{tid}: 型の 名前は {list(TYPES)}")
            elif t.get("mapNode") != "kumitate:" + TYPES[t["reading"]]: errs.append(f"{tid}: mapNode は kumitate:{TYPES[t['reading']]}")
            if len(t.get("name", "")) != 2: errs.append(f"{tid}: 熟語は 2字")
        if j == "taigi":
            if t.get("rel") not in ("対", "類"): errs.append(f"{tid}: rel は 対 / 類")
            if not t.get("pair") or t.get("pair") == t.get("name"): errs.append(f"{tid}: pair が いる")
        if j == "yoji" and len(t.get("name", "")) != 4: errs.append(f"{tid}: 四字熟語は 4字")
        if j in UNIQUE + WRITE and t.get("reading") and len(t["reading"]) >= 3 and t["reading"] in t.get("description", "") + t.get("example", ""):
            warn.append(f"{tid}: 説明に 読み「{t['reading']}」が 見えている")
        if j in UNIQUE:
            readings.setdefault(t.get("reading"), []).append(tid)  # 別の 答え(acceptedReadings)は ほかの 語と かぶって よい(奢侈 ⇔ 倹約 / 質素)
        names.setdefault((j, t.get("name")), []).append(tid)
        per.setdefault((j, t.get("difficulty")), 0); per[(j, t.get("difficulty"))] += 1
    for t in d["terms"]:
        rel = t.get("relatedTerms") or []
        if not 1 <= len(rel) <= 3: errs.append(f"{t['id']}: relatedTerms は 1〜3個")
        for r in rel:
            if r not in ids: errs.append(f"{t['id']}: つながる ことば「{r}」が ない")
            elif ids[r].get("journey") != t.get("journey"): errs.append(f"{t['id']}: つながる ことば「{r}」は 同じ 旅の 中で")
            if r == t["id"]: errs.append(f"{t['id']}: 自分を つないでいる")
    for r, v in readings.items():
        if len(v) > 1: errs.append(f"読み「{r}」が かぶる(読み・四字熟語・対義語 の 中): {v}")
    for (j, n), v in names.items():
        if len(v) > 1 and j != "jukugo": errs.append(f"{j} の「{n}」が かぶる: {v}")
    for (j, k), v in wrote.items():
        if len(v) > 1: errs.append(f"{j} で 書く 字「{k}」が かぶる: {v}")
    if "--only" not in sys.argv and len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("漢字の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("漢字の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/kanken.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        for k, s in (("kanji", "kj"), ("sentence", "st"), ("kind", "kd"), ("wrong", "wr"), ("bushu", "bu"), ("pair", "pr"), ("rel", "rl"), ("mapNode", "mp")):
            if t.get(k): o[s] = t[k]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "kanken").mkdir(exist_ok=True)
    (ROOT / "kanken/terms.js").write_text("/* tools/kanken/terms-*.json から tools/kanken/terms_js.py が 作る。手で 直さない */\nconst KANKEN_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kanken/terms.js", len(out), "語", (ROOT / "kanken/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
