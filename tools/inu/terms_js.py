#!/usr/bin/env python3
"""フリック犬の気持ち(けいくん 2026-10-23)。tools/inu/meta.json + terms-<旅>.json + letters.json + lessons.json + observe.json
→ data/inu.json(1か所に まとめた もの)と inu/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が inu/ を 作るときに 呼ぶ。data/inu.json と inu/terms.js は 手で 直さない
    python3 tools/inu/terms_js.py                       # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/inu/terms_js.py --check               # 確かめるだけ
    python3 tools/inu/terms_js.py --check --with-later  # 2回目の ことば(tools/inu/later/)も 合わせて 確かめる
決まりは tools/inu/PROMPT.md。もとは tools/mentalist/terms_js.py(メンタリスト)
⭐ 語に kimochi(💭 きもち)・kagaku + kagakuNote(🔬 かがく)・renshu(🎯 やってみよう)・breed(🐕 犬種の 札)・ei(🔊 英語)を 持てる"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
MAXR = 20  # 読みの 長さ
# ⚠️ 名前・説明・きもち・かがく・やってみよう・手紙・レッスン・観察 に 出さない ことば(PROMPT.md の ①〜④)。見つけたら 止める
#   ① こわく しない(かまれる・事故・死)② 犬種の 性格を 決めつけない ③(科学は 札で)④ 罰の しつけの 方法は 名前も 書かない
BAN = ["かまれ", "噛まれ", "咬", "かみつ", "噛みつ", "噛み付", "かみ傷", "かみつき", "事故", "死", "殺", "けが人", "流血", "血だらけ", "出血",
       "罰", "たたく", "たたい", "叩", "なぐる", "なぐっ", "なぐら", "殴", "どなる", "どなっ", "怒鳴", "けとば", "蹴", "おさえつけ", "押さえつけ", "マズルコントロール", "仰向けに おさえ",
       "チョーク", "電気の 首輪", "電気ショック", "電気首輪", "スパイク", "天罰", "とげの 首輪", "首輪を ぐいっと", "首輪で ひっぱ", "リードを ぐいっと", "ショック",
       "危険犬種", "かみやすい 犬種", "攻撃的な 犬種", "闘犬", "虐待", "捨て", "安楽", "処分", "寿命", "動物実験",
       "ペットショップ", "ブリーダー", "値段", "円で", "万円",
       "ドッグフードの 商品", "ロイヤルカナン", "ヒルズ", "アニコム"]
# 「◯◯犬は ◯◯な 性格」「この 犬種は おとなしい」の 形(犬種の 気持ちを 決めつけない)
SEIKAKU_RE = re.compile(r"(犬種|[^\s]{1,10}(犬|テリア|プードル|レトリーバー|シェパード|コリー))は[^。]{0,14}(性格|おとなしい|気が 強い|気が強い|がんこ|頑固|人なつ|甘えんぼ|あまえんぼ|攻撃|こわがり|かしこい|頭が いい|頭がいい|やんちゃ|忠実)")
# うち消しが そばに あれば 通す ことば(「しからない」「たたかない」は 書きたいため …「しかる」は ほめる との ちがいの 説明に 1語だけ)
SOFT = ["しかる", "叱", "しかり", "しかられ", "しかって", "反省", "ボス理論", "ボスに", "ボスだ", "ボスと", "ボス犬", "支配", "上下関係", "アルファ", "わがまま", "反抗"]
NEG = re.compile(r"(?:ない|ません|しない|せず|ず[、。 ]|ではなく|では なく|とは 別|とは ちがう|と ちがい|ちがい|のでは|古い|見なおされ|見直され|たしかめられ|わかって|考え|言われ|と 思われ|ように 見え|に 見える|ふり)")
BAN_OK = {"st-scoldpraise": ["しかられ"], "st-comekind": ["しかられ"]}  # "id": ["字"](どうしても 要る ときだけ。しかられた 犬が どう なるかの 説明)
# ふりがなの 直し(この ゲームだけ)。{"まちがい": "正しい"}
RB_FIX = {
    "<ruby>1人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
    "1<ruby>分<rt>ぶん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "1<ruby>分<rt>ふん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "<ruby>後<rt>ご</rt></ruby>から": "<ruby>後<rt>あと</rt></ruby>から",
    "1<ruby>匹<rt>ひき</rt></ruby>": "1<ruby>匹<rt>ぴき</rt></ruby>",
    "<ruby>1匹<rt>いちひき</rt></ruby>": "<ruby>1匹<rt>いっぴき</rt></ruby>",
}
RB_RE = [(re.compile(r"<ruby>数<rt>すう</rt></ruby>(?!<)"), "<ruby>数<rt>かず</rt></ruby>")]
PRE = {"shigusa": "sg-", "nakigoe": "nk-", "yamete": "ym-", "kurashi": "kr-", "shitsuke": "st-", "komari": "km-",
       "karada": "kd-", "kenshu": "ks-", "rekishi": "rk-", "anzen": "az-", "kokoro": "kk-"}
FIELDS = {"しぐさ", "声", "やめて", "くらし", "しつけ", "困りごと", "体", "犬種", "歴史", "安全", "こころ"}
KAGAKU = {"kenkyu": "研究で わかっている", "iitsutae": "よく 言われるが たしかめられていない", "furui": "むかしの 考え。いまは ちがう", "kenkyuchu": "研究中(まだ はっきり しない)"}
GROUPS = {"牧羊犬・牧畜犬", "使役犬", "テリア", "ダックスフンド", "スピッツ・原始的な 犬", "嗅覚ハウンド", "ポインター・セター", "レトリーバー・水の 犬", "愛玩犬", "視覚ハウンド", "日本犬", "ミックス", "グループに 入っていない"}
SIZES = {"超小型", "小型", "中型", "大型", "超大型", "大きさ いろいろ"}
MAYBE = re.compile(r"たぶん|ことが 多い|ことが多い|多い|かも|ようです|かもしれ|ことも|と 言われ|と言われ|ことが あります")
SUB_MAX = 70      # 💭 きもち・🔬 かがくの ひとこと の 長さ
RENSHU_MAX = 90   # 🎯 やってみよう の 長さ
DO_KINDS = ("はなれる", "そっと", "ほめる", "待つ")       # 🐶 手紙の「こうして あげよう」の 4つ
LESSON_KINDS = ("きほん", "散歩", "子犬", "困りごと", "くらし")


def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        for f in [HERE / f"terms-{J['id']}.json"] + ([HERE / "later" / f"terms-{J['id']}.json"] if "--with-later" in sys.argv else []):
            if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
    for k in ("letters", "lessons", "observe"):
        f = HERE / f"{k}.json"
        d[k] = json.loads(f.read_text(encoding="utf-8")) if f.exists() else []
    return d


def banned(text, tid):
    hits = []
    for w in BAN:
        if w in BAN_OK.get(tid, []): continue
        if w in text: hits.append(w)
    m = SEIKAKU_RE.search(text)
    if m and not NEG.search(text[m.start(): m.end() + 20]): hits.append("犬種の 性格の 決めつけ「" + m.group(0) + "」")
    for w in SOFT:
        if w in BAN_OK.get(tid, []): continue
        for mm in re.finditer(re.escape(w), text):
            around = text[max(0, mm.start() - 14): mm.end() + 24]
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
        if t.get("kimochi"):
            if len(t["kimochi"]) > SUB_MAX: warn.append(f"{tid}: kimochi が 長い({len(t['kimochi'])}字)")
            if not MAYBE.search(t["kimochi"]): errs.append(f"{tid}: kimochi に「たぶん / ことが 多い」が ない(1匹ずつ ちがうため)")
        if t.get("kagaku") and t["kagaku"] not in KAGAKU: errs.append(f"{tid}: kagaku は {sorted(KAGAKU)} の どれか")
        if t.get("kagakuNote") and not t.get("kagaku"): errs.append(f"{tid}: kagakuNote だけ ある(kagaku も 書く)")
        if t.get("kagakuNote") and len(t["kagakuNote"]) > SUB_MAX: warn.append(f"{tid}: kagakuNote が 長い({len(t['kagakuNote'])}字)")
        if t.get("renshu"):
            if len(t["renshu"]) > RENSHU_MAX: warn.append(f"{tid}: renshu が 長い({len(t['renshu'])}字)")
            if re.search(r"知らない[ ]?犬", t["renshu"]) and re.search(r"さわ|なで|近づ", t["renshu"]) and not re.search(r"さわらない|なでない|近づかない|はなれ|聞いて|聞こう|聞く", t["renshu"]):
                errs.append(f"{tid}: renshu で 知らない 犬に さわる 練習は 書かない")
        else: nors += 1
        b = t.get("breed")
        if b is not None:
            if not isinstance(b, dict): errs.append(f"{tid}: breed は {{kuni, group, size, yakume}}")
            else:
                for k in ("kuni", "group", "size", "yakume"):
                    if not b.get(k): errs.append(f"{tid}: breed.{k} が 空")
                if b.get("group") and b["group"] not in GROUPS: errs.append(f"{tid}: breed.group「{b['group']}」は {sorted(GROUPS)} の どれか")
                if b.get("size") and b["size"] not in SIZES: errs.append(f"{tid}: breed.size「{b['size']}」は {sorted(SIZES)} の どれか")
                if "性格" in str(b): errs.append(f"{tid}: breed に 性格は 書かない")
        if t.get("ei") and not re.fullmatch(r"[A-Za-z0-9 ,.'?!&/()\-]+", t["ei"]): errs.append(f"{tid}: ei は 英語の つづり だけ")
        if not str(tid).startswith(PRE.get(t.get("journey"), "?")): errs.append(f"{tid}: id の 頭は {PRE.get(t.get('journey'))}")
        for w in banned(" / ".join([str(t.get(k, "")) for k in ("name", "description", "example", "kimochi", "kagakuNote", "renshu")] + [json.dumps(b or {}, ensure_ascii=False)]), tid):
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
    for k in ("sg-tail-kagaku",): pass
    # 🐶 犬からの 手紙(letters.json)
    for i, L in enumerate(d["letters"]):
        lid = L.get("id", f"letter{i}")
        for k in ("id", "scene", "sign", "choices", "answer", "feeling", "dogSays", "doThis", "doKind", "emoji"):
            if L.get(k) in (None, "", []): errs.append(f"手紙 {lid}: {k} が 空")
        if len(L.get("choices") or []) != 4: errs.append(f"手紙 {lid}: choices は 4つ")
        if not isinstance(L.get("answer"), int) or not 0 <= L.get("answer", -1) < 4: errs.append(f"手紙 {lid}: answer は 0〜3")
        if L.get("doKind") not in DO_KINDS: errs.append(f"手紙 {lid}: doKind は {DO_KINDS} の どれか")
        if len(L.get("dogSays", "")) > 40: warn.append(f"手紙 {lid}: 犬の ことばが 長い({len(L['dogSays'])}字)")
        if not MAYBE.search(L.get("feeling", "")): errs.append(f"手紙 {lid}: feeling に「たぶん / ことが 多い」が ない")
        if re.search(r"しかる|叱|おさえ", L.get("doThis", "")) and not re.search(r"しからない|叱らない|おさえない", L.get("doThis", "")): errs.append(f"手紙 {lid}: こうして あげよう に しかる・おさえる は 入れない")
        for w in banned(" / ".join(str(L.get(k, "")) for k in ("scene", "sign", "feeling", "dogSays", "doThis", "renshu")), lid):
            errs.append(f"手紙 {lid}: 「{w}」は 使わない")
        for c in L.get("choices") or []:  # 4択の まちがいには よく ある 思いこみ(反省して いる など)を わざと 入れる → BAN だけ 見る
            for w in BAN:
                if w in c: errs.append(f"手紙 {lid}: 選択肢に「{w}」は 使わない")
    if d["letters"] and len(d["letters"]) != 20: errs.append(f"手紙は 20枚({len(d['letters'])}枚)")
    # 📘 レッスン(lessons.json)
    for R in d["lessons"]:
        rid = R.get("id")
        for k in ("id", "name", "kind", "dv", "icon", "lead", "steps", "goal"):
            if R.get(k) in (None, "", []): errs.append(f"レッスン {rid}: {k} が 空")
        if R.get("kind") not in LESSON_KINDS: errs.append(f"レッスン {rid}: kind は {LESSON_KINDS} の どれか")
        steps = R.get("steps") or []
        if not 4 <= len(steps) <= 7: errs.append(f"レッスン {rid}: 手順は 4〜7")
        alltext = json.dumps(R, ensure_ascii=False)
        if "やめての サイン" not in alltext: errs.append(f"レッスン {rid}: 「やめての サイン を 出したら 終わり」の 1行が ない")
        if "もっと きびしく" in alltext or "きびしく する" in alltext: errs.append(f"レッスン {rid}: きびしく は 書かない(かんたんな 段に もどる)")
        for i, s in enumerate(steps):
            for k in ("title", "do", "kimochi", "ng"):
                if not s.get(k): errs.append(f"レッスン {rid} の 手順{i + 1}: {k} が 空")
            for w in banned(" / ".join(str(s.get(k, "")) for k in ("title", "do", "kimochi", "ng")), rid):
                errs.append(f"レッスン {rid} の 手順{i + 1}: 「{w}」は 使わない")
        for w in banned(" / ".join(str(R.get(k, "")) for k in ("name", "lead", "goal", "soudan")), rid):
            errs.append(f"レッスン {rid}: 「{w}」は 使わない")
    if d["lessons"] and len(d["lessons"]) != 15: errs.append(f"レッスンは 15本({len(d['lessons'])}本)")
    # 📅 きょうの かんさつ(observe.json)
    nodog = 0
    for i, P in enumerate(d["observe"]):
        txt = P.get("text", "")
        if not txt: errs.append(f"観察 {i + 1}: text が 空")
        if len(txt) > 34: warn.append(f"観察 {i + 1}: 長い({len(txt)}字)")
        if P.get("nodog"): nodog += 1
        if re.search(r"知らない[ ]?犬", txt) and re.search(r"さわ|なで", txt) and "さわらない" not in txt: errs.append(f"観察 {i + 1}: 知らない 犬に さわる 練習は 書かない")
        for w in banned(txt, f"observe{i}"): errs.append(f"観察 {i + 1}: 「{w}」は 使わない")
    if d["observe"]:
        if len(d["observe"]) != 30: errs.append(f"観察は 30日ぶん({len(d['observe'])})")
        if nodog < 12: errs.append(f"犬が いない 子むけの 観察が {nodog}こ(15こ くらい 入れる)")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("犬の気持ちの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("犬の気持ちの ことば OK", len(d["terms"]), "語・手紙", len(d["letters"]), "枚・レッスン", len(d["lessons"]), "本・観察", len(d["observe"])); return
    if "--with-later" in sys.argv: sys.exit("--with-later は --check と いっしょに 使う(作るのは 1回目の ことばだけ)")
    (ROOT / "data/inu.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
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
        if t.get("kimochi"): o["km"] = t["kimochi"]; o["kmrb"] = rub(t["kimochi"])   # 💭 きもち
        if t.get("kagaku"):                                                             # 🔬 かがく
            o["kg"] = t["kagaku"]
            if t.get("kagakuNote"): o["kn"] = t["kagakuNote"]; o["knrb"] = rub(t["kagakuNote"])
        if t.get("renshu"): o["rs"] = t["renshu"]; o["rsrb"] = rub(t["renshu"])       # 🎯 やってみよう
        if t.get("breed"): o["br"] = t["breed"]                                         # 🐕 犬種の 札
        if t.get("ei"): o["ei"] = t["ei"]                                               # 🔊 英語の つづり
        o["f"] = t["field"]
        out.append(o)
    lessons = []
    for R in d["lessons"]:
        cut = lambda x: re.sub(r"^[💭⚠️🖐\ufe0f\s]+", "", x)  # 札に もう 絵が あるので、文の 頭の 絵は 外す
        R2 = dict(R); R2["steps"] = [dict(s, dorb=rub(cut(s["do"])), kimochirb=rub(cut(s["kimochi"])), ngrb=rub(cut(s["ng"]))) for s in R["steps"]]
        lessons.append(R2)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out, kagaku=KAGAKU, letters=d["letters"], lessons=lessons, observe=d["observe"])
    (ROOT / "inu").mkdir(exist_ok=True)
    (ROOT / "inu/terms.js").write_text("/* tools/inu/terms-*.json から tools/inu/terms_js.py が 作る。手で 直さない */\nconst INU_TERMS = " +
                                       json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("inu/terms.js", len(out), "語", (ROOT / "inu/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
