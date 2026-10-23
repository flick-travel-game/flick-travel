#!/usr/bin/env python3
"""フリックメンタリスト(けいくん 2026-10-23)。tools/mentalist/meta.json + terms-<旅>.json + routines.json + practice.json
→ data/mentalist.json(1か所に まとめた もの)と mentalist/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が mentalist/ を 作るときに 呼ぶ。data/mentalist.json と mentalist/terms.js は 手で 直さない
    python3 tools/mentalist/terms_js.py                       # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/mentalist/terms_js.py --check               # 確かめるだけ
    python3 tools/mentalist/terms_js.py --check --with-later  # 2回目の 40語(tools/mentalist/later/)も 合わせて 確かめる
決まりは tools/mentalist/PROMPT.md。もとは tools/cabin/terms_js.py(キャビンアテンダント)
⭐ 語に shikumi(🧠 しくみ)・butai(🎩 ぶたい)・renshu(🎯 やってみよう)・ei(🔊 英語)を 持てる"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
MAXR = 20  # 読みの 長さ
# ⚠️ 名前・説明・しくみ・ぶたい・やってみよう に 出さない ことば(PROMPT.md の 1〜9)。見つけたら 止める
#   BAN = どこに あっても ダメ / SOFT = うしろに「ない・ません・しない」などの うち消しが 来るときだけ よい(「超能力では ありません」は 書きたいため)
BAN = ["かならず 当たる", "必ず当たる", "必ず 当たる", "かならず当たる", "100%当た", "100% 当た", "絶対に当た", "絶対に 当た",
       "霊視", "霊能", "霊感で", "守護霊", "前世", "オーラが 見え",
       "気づかれずに", "気づかれないように", "気づかれない ように", "買わせる", "追いつめ", "追い詰め", "思いどおりに 動か", "思い通りに動か", "洗脳", "マインドコントロール", "心理術",
       "催眠で 治", "催眠で治", "治療できる", "治せる",
       "うつ病", "統合失調", "不安症", "パニック障害", "PTSD", "発達障害", "自閉", "ADHD", "依存症", "摂食障害",
       "死", "自殺", "殺", "流血", "血だらけ", "地獄", "呪", "悪魔", "幽霊", "お化け",
       "ミルグラム", "服従実験", "監獄実験", "アルバート坊や", "電気ショック",
       "DaiGo", "ダイゴ", "Mr.マリック", "マリック", "ギャンブル", "いかさま", "イカサマ", "賭け", "カジノ",
       "スタック", "仕込みの カード", "仕込みカード", "サクラ", "協力者を 仕込", "のぞき見の 道具", "マーク付きの カード", "目印の ついた カード"]
SOFT = ["超能力", "霊", "予知", "あやつ", "操る", "操れ", "だます", "だまし", "だまさ", "だまされ", "騙", "うそを 見ぬ", "うそを見ぬ", "うそが 分か", "うそが わか", "嘘を見抜", "嘘を 見抜",
        "本当に こころが 読め", "本当に 心が 読め", "未来が 見え", "占い"]
NEG = re.compile(r"(?:ない|ません|しない|せず|ず[、。 ]|ではなく|では なく|と 言わない|と言わない|名のらない|を 調べ|を調べ|とは 別|とは ちがう|と ちがい|に 気を つけ|に 気をつけ|から 守|を 見分け|と 分け|商法|かの ように|ように 見せ|ような 演出|を 演じ|と 感じ|と感じ|しくみ)")
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ)
# ふりがなの 直し(この ゲームだけ)。{"まちがい": "正しい"}
RB_FIX = {
    "<ruby>1人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
    "1<ruby>分<rt>ぶん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "1<ruby>分<rt>ふん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "<ruby>後<rt>ご</rt></ruby>から": "<ruby>後<rt>あと</rt></ruby>から",
    "<ruby>数<rt>すう</rt></ruby>を": "<ruby>数<rt>かず</rt></ruby>を",
    # ↓ メンタリストで 見つけた 直し(2026-10-23。ふりがなを ぜんぶ 取り出して 読んだ)
    "<ruby>赤黒<rt>せっこく</rt></ruby>": "<ruby>赤黒<rt>あかくろ</rt></ruby>",
    "<ruby>何分<rt>なにぶん</rt></ruby>": "<ruby>何分<rt>なんぷん</rt></ruby>",
    "<ruby>白鳥<rt>しらとり</rt></ruby>": "<ruby>白鳥<rt>はくちょう</rt></ruby>",
    "1<ruby>人1人<rt>ひとひとり</rt></ruby>": "<ruby>1人1人<rt>ひとりひとり</rt></ruby>",
    "<ruby>九<rt>く</rt></ruby><ruby>去<rt>さっ</rt></ruby><ruby>法<rt>ほう</rt></ruby>": "<ruby>九去法<rt>きゅうきょほう</rt></ruby>",
    "<ruby>数字<rt>すうじ</rt></ruby><ruby>根<rt>ね</rt></ruby>": "<ruby>数字根<rt>すうじこん</rt></ruby>",
    " <ruby>位<rt>い</rt></ruby>": " <ruby>位<rt>くらい</rt></ruby>",
}
# 1字の「数」は「かず」(素数・倍数 などの 熟語は べつの ruby なので 当たらない)
RB_RE = [(re.compile(r"<ruby>数<rt>すう</rt></ruby>"), "<ruby>数<rt>かず</rt></ruby>")]
PRE = {"kihon": "ki-", "shinri": "sr-", "kansatsu": "ka-", "kioku": "kk-", "kotoba": "kt-", "suuji": "su-", "butai": "bu-", "jissen": "js-", "kokoro": "ko-"}
FIELDS = {"観察", "記憶", "心理", "ことば", "数", "舞台", "歴史", "倫理"}
SUB_MAX = 70     # 🧠 しくみ・🎩 ぶたい の 長さ
RENSHU_MAX = 90  # 🎯 やってみよう の 長さ
POWERS = ("観察", "記憶", "心理", "ことば", "数", "舞台")  # 📅 練習メニューの 6つの 力


def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        for f in [HERE / f"terms-{J['id']}.json"] + ([HERE / "later" / f"terms-{J['id']}.json"] if "--with-later" in sys.argv else []):
            if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
    for k in ("routines", "practice"):
        f = HERE / f"{k}.json"
        d[k] = json.loads(f.read_text(encoding="utf-8")) if f.exists() else []
    return d


def banned(text, tid):
    hits = []
    for w in BAN:
        if w in BAN_OK.get(tid, []): continue
        if w in text: hits.append(w)
    for w in SOFT:
        if w in BAN_OK.get(tid, []): continue
        for m in re.finditer(re.escape(w), text):
            around = text[max(0, m.start() - 12): m.end() + 22]
            if not NEG.search(around): hits.append(w + "(うち消しが ない)"); break
    return hits


def check(d):
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}
    nodes = {f"{k}:{n['id']}" for k, g in m["diagrams"].items() for n in g["nodes"]}
    dvs = {L["difficulty"] for L in m["levels"]}
    ids = {}; readings = {}; per = {}; nors = 0
    for t in d["terms"]:
        tid = t.get("id")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        for r in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):
            if not KANA.fullmatch(r or ""): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
            elif len(r) > MAXR: warn.append(f"{tid}: 読みが 長い({len(r)}字)")
        if (t.get("acceptedReadings") or [t.get("reading")])[0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        if t.get("field") not in FIELDS: errs.append(f"{tid}: field「{t.get('field')}」は {sorted(FIELDS)} の どれか")
        for k in ("shikumi", "butai"):
            if t.get(k) and len(t[k]) > SUB_MAX: warn.append(f"{tid}: {k} が 長い({len(t[k])}字)")
        if t.get("renshu") and len(t["renshu"]) > RENSHU_MAX: warn.append(f"{tid}: renshu が 長い({len(t['renshu'])}字)")
        if not t.get("renshu"): nors += 1
        if t.get("ei") and not re.fullmatch(r"[A-Za-z0-9 ,.'?!&/()\-]+", t["ei"]): errs.append(f"{tid}: ei は 英語の つづり だけ")
        if not str(tid).startswith(PRE.get(t.get("journey"), "?")): errs.append(f"{tid}: id の 頭は {PRE.get(t.get('journey'))}")
        for w in banned(" / ".join([t.get(k, "") for k in ("name", "description", "example", "shikumi", "butai", "renshu")]), tid):
            errs.append(f"{tid}: 「{w}」は 使わない")
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
    if nors: warn.append(f"🎯 やってみよう が 無い 語が {nors}語")
    # 🎩 演目(routines.json)
    for R in d["routines"]:
        rid = R.get("id")
        for k in ("id", "name", "power", "dv", "lead", "steps", "patter", "why"):
            if R.get(k) in (None, "", []): errs.append(f"演目 {rid}: {k} が 空")
        if R.get("power") not in POWERS: errs.append(f"演目 {rid}: power は {POWERS} の どれか")
        steps = R.get("steps") or []
        if not 4 <= len(steps) <= 7: errs.append(f"演目 {rid}: 手順は 4〜7")
        if steps and "やって" not in steps[0].get("say", "") + steps[0].get("do", ""): errs.append(f"演目 {rid}: ①に「やってみてもいい?」が ない")
        for i, s in enumerate(steps):
            for k in ("title", "do", "kokoro", "out"):
                if not s.get(k): errs.append(f"演目 {rid} の 手順{i + 1}: {k} が 空")
            for w in banned(" / ".join(str(s.get(k, "")) for k in ("title", "say", "do", "kokoro", "out")), rid):
                errs.append(f"演目 {rid} の 手順{i + 1}: 「{w}」は 使わない")
        for w in banned(" / ".join(str(R.get(k, "")) for k in ("name", "lead", "patter", "why")), rid):
            errs.append(f"演目 {rid}: 「{w}」は 使わない")
    if d["routines"] and len(d["routines"]) != 10: errs.append(f"演目は 10本({len(d['routines'])}本)")
    # 📅 練習メニュー(practice.json)
    for i, P in enumerate(d["practice"]):
        if P.get("power") not in POWERS: errs.append(f"練習 {i + 1}: power は {POWERS} の どれか")
        txt = P.get("text", "")
        if not txt: errs.append(f"練習 {i + 1}: text が 空")
        if len(txt) > 40: warn.append(f"練習 {i + 1}: 長い({len(txt)}字)")
        if P.get("ask") and "やってもいい" not in txt: errs.append(f"練習 {i + 1}: 人を ためす 練習には「やってもいい?」を 入れる")
        for w in banned(txt, f"practice{i}"): errs.append(f"練習 {i + 1}: 「{w}」は 使わない")
    if d["practice"]:
        n = {}
        for P in d["practice"]: n[P.get("power")] = n.get(P.get("power"), 0) + 1
        if len(d["practice"]) != 30 or any(n.get(p, 0) != 5 for p in POWERS): errs.append(f"練習メニューは 6つの 力 × 5 = 30({n})")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("メンタリストの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("メンタリストの ことば OK", len(d["terms"]), "語・演目", len(d["routines"]), "本・練習", len(d["practice"])); return
    if "--with-later" in sys.argv: sys.exit("--with-later は --check と いっしょに 使う(作るのは 1回目の ことばだけ)")
    (ROOT / "data/mentalist.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    def rub(text):
        h = rub0(text)
        for a, b in RB_FIX.items(): h = h.replace(a, b)
        for r, b in RB_RE: h = r.sub(b, h)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("shikumi"): o["sk"] = t["shikumi"]; o["skrb"] = rub(t["shikumi"])  # 🧠 しくみ
        if t.get("butai"): o["bt"] = t["butai"]; o["btrb"] = rub(t["butai"])          # 🎩 ぶたい
        if t.get("renshu"): o["rs"] = t["renshu"]; o["rsrb"] = rub(t["renshu"])       # 🎯 やってみよう
        if t.get("ei"): o["ei"] = t["ei"]                                               # 🔊 英語の つづり
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out, routines=d["routines"], practice=d["practice"])
    (ROOT / "mentalist").mkdir(exist_ok=True)
    (ROOT / "mentalist/terms.js").write_text("/* tools/mentalist/terms-*.json から tools/mentalist/terms_js.py が 作る。手で 直さない */\nconst MENTALIST_TERMS = " +
                                             json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("mentalist/terms.js", len(out), "語", (ROOT / "mentalist/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
