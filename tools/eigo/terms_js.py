#!/usr/bin/env python3
"""tools/eigo/meta.json + tools/eigo/terms-<旅>.json → data/eigo.json(1か所に まとめた もの)と eigo/terms.js(ゲームが 読む 形。日本語に ふりがな)
tools/build_games.py が eigo/ を 作るときに 呼ぶ。data/eigo.json と eigo/terms.js は 手で 直さない(例文は terms-<旅>.json を 直す)
    python3 tools/eigo/terms_js.py              # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/eigo/terms_js.py --check      # 確かめるだけ
    python3 tools/eigo/terms_js.py --only jisei # 1つの 旅だけ 確かめる(助手が 使う)
決まりは tools/eigo/PROMPT.md。もとは tools/kokugo/terms_js.py(国語を 写した)。
⚠️ ABC で 打つ 字(typed)は 手で 書かない。name から 英会話の norm と 同じ やりかた(NFKC → 小文字 → 英数字だけ)で 作る"""
import json, re, sys, unicodedata
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "ja", "reading", "journey", "category", "difficulty", "type", "emoji", "description")
MAXLEN = 35  # 打つ 字の 上限(けいくん 2026-09-29「おすすめ」= 35字)
NAME_OK = re.compile(r"[A-Za-z][A-Za-z ',.?!-]*")
PREFIX = {"fudoshi": "fu", "jisei": "ji", "uke": "uk", "tofutei": "to", "bunshi": "bs", "kankei": "ka", "hikaku": "hi", "katei": "kt", "jukugo": "ju"}
BAN = ["100マス", "百ます", "合格できる", "かならず出る", "必ず出る", "英検", "TOEIC", "トーイック"]

def norm(s):  # eikaiwa/eikaiwa.js の norm と 同じ
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKC", s).lower())

def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        f = HERE / f"terms-{J['id']}.json"
        if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
    return d

def check(d):
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}
    dvs = {L["difficulty"] for L in m["levels"]}
    ids = {}; readings = {}; per = {}
    for t in d["terms"]:
        tid = t.get("id")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if t.get("journey") in PREFIX and not str(tid).startswith(PREFIX[t["journey"]] + "-"): errs.append(f"{tid}: id の 頭は {PREFIX[t['journey']]}-")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        n = t.get("name", "")
        if not NAME_OK.fullmatch(n): errs.append(f"{tid}: name「{n}」に 使えない 字(英字・空白・' , . ? ! - だけ。数字も ダメ)")
        if "  " in n or n != n.strip(): errs.append(f"{tid}: name の 空白が おかしい")
        for kr in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):
            if not re.fullmatch(r"[ぁ-ゖー]+", kr or ""): errs.append(f"{tid}: 読み「{kr}」は ひらがなと ー だけ(英語の 読みを ひらがなで。けいくん 2026-10-10)")
        if t.get("acceptedReadings") and t["acceptedReadings"][0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        if len(t.get("reading", "")) > 60: warn.append(f"{tid}: 読みが 長い({len(t['reading'])}字)")
        r = norm(n)
        if len(r) > MAXLEN: errs.append(f"{tid}: 打つ 字が {len(r)}字(上限 {MAXLEN})")
        if t.get("journey") in ("fudoshi", "jukugo") and n.rstrip()[-1:] in ".?!": errs.append(f"{tid}: 不規則動詞・熟語は 文では ない(ピリオドを 付けない)")
        if t.get("journey") == "fudoshi" and not re.fullmatch(r"[a-z]+( [a-z]+)? - [a-z]+( [a-z]+)? - [a-z]+( [a-z]+)?", n): errs.append(f"{tid}: 不規則動詞は「原形 - 過去形 - 過去分詞」")
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("type") != "pattern": errs.append(f"{tid}: type は pattern")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        if re.search(r"[A-Za-z]", t.get("ja", "")) and t.get("journey") != "jukugo": warn.append(f"{tid}: 訳に 英字が ある「{t['ja']}」")
        for w in BAN:
            if w in n + t.get("ja", "") + t.get("description", ""): errs.append(f"{tid}: 「{w}」は 使わない")
        readings.setdefault(r, []).append(tid)
        k = (t.get("journey"), t.get("difficulty")); per[k] = per.get(k, 0) + 1
    for t in d["terms"]:
        rel = t.get("relatedTerms") or []
        if not 1 <= len(rel) <= 3: errs.append(f"{t['id']}: relatedTerms は 1〜3個")
        for x in rel:
            if x not in ids: errs.append(f"{t['id']}: つながる 文「{x}」が ない")
            elif ids[x].get("journey") != t.get("journey"): errs.append(f"{t['id']}: つながる 文「{x}」は 同じ 旅の 中から")
            if x == t["id"]: errs.append(f"{t['id']}: 自分を つないでいる")
    for r, v in readings.items():
        if len(v) > 1: errs.append(f"打つ 字「{r}」が かぶる: {v}")
    if "--only" not in sys.argv and len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}問。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("英語の 例文に まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("英語の 例文 OK", len(d["terms"]), "問"); return
    for t in d["terms"]: t["typed"] = norm(t["name"])  # ABC で 打つ 字(手で 書かない)
    (ROOT / "data/eigo.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ⚠️ 英字には ふりがなを 付けない。英字の かたまりは そのまま、日本語の ところだけ rubifier に 通す
    import html
    # ⚠️ 文法の ことばは 読みを まちがえやすい(過去形の「形」が かたち・副詞節の「節」が ふし に なった)。先に 決めた 読みで ふりがなを 付ける
    R = lambda w, r: "<ruby>" + w + "<rt>" + r + "</rt></ruby>"
    GRAM = [(re.compile(w + "(?!容)"), R(w, r)) for w, r in (
        ("過去完了形", "かこかんりょうけい"), ("現在完了形", "げんざいかんりょうけい"), ("未来完了形", "みらいかんりょうけい"),
        ("過去分詞形", "かこぶんしけい"), ("現在分詞形", "げんざいぶんしけい"),
        ("過去形", "かこけい"), ("現在形", "げんざいけい"), ("未来形", "みらいけい"), ("進行形", "しんこうけい"), ("完了形", "かんりょうけい"),
        ("原形", "げんけい"), ("命令形", "めいれいけい"), ("複数形", "ふくすうけい"), ("単数形", "たんすうけい"), ("短縮形", "たんしゅくけい"),
        ("疑問形", "ぎもんけい"), ("否定形", "ひていけい"), ("比較級", "ひかくきゅう"), ("最上級", "さいじょうきゅう"), ("原級", "げんきゅう"),
        ("副詞節", "ふくしせつ"), ("名詞節", "めいしせつ"), ("形容詞節", "けいようしせつ"), ("主節", "しゅせつ"), ("従属節", "じゅうぞくせつ"),
        ("女の人", "おんなのひと"), ("男の人", "おとこのひと"), ("三本", "さんぼん"), ("一本", "いっぽん"), ("二本", "にほん"))]
    GRAM += [(re.compile(r"(?:(?<=[A-Za-z0-9 ])|^)節"), R("節", "せつ")), (re.compile(r"(?:(?<=[A-Za-z合])|^)型"), R("型", "がた")),
             (re.compile(r"(?<![書本手])箱"), R("箱", "はこ")), (re.compile(r"(?<=の )数(?=[やがはをの])"), R("数", "かず"))]
    def rubj(t):  # 日本語の ところ: 決めた 読みの ところを 先に 切りだして、のこりを rubifier に
        spans = sorted({(m.start(), m.end(), h) for rx, h in GRAM for m in rx.finditer(t)})
        out, i = [], 0
        for a, b, h in spans:
            if a < i: continue
            if a > i: out.append(rub0(t[i:a]))
            out.append(h); i = b
        if i < len(t): out.append(rub0(t[i:]))
        return "".join(out)
    def rub(text):
        return "".join(html.escape(p) if re.fullmatch(r"[A-Za-z0-9 ',.?!+~〜/-]+", p) else rubj(p)
                       for p in re.split(r"([A-Za-z][A-Za-z0-9 ',.?!+/-]*[A-Za-z.?!])", text) if p)
    out = []
    for t in d["terms"]:
        out.append(dict(id=t["id"], n=t["name"], r=t["typed"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                        e=t["emoji"], rel=t["relatedTerms"], ja=t["ja"], kr=t["reading"], kal=[a for a in (t.get("acceptedReadings") or []) if a != t["reading"]], jarb=rub(t["ja"]), ds=t["description"], rb=rub(t["description"])))
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams={}, missions=[], list=out)
    (ROOT / "eigo").mkdir(exist_ok=True)
    (ROOT / "eigo/terms.js").write_text("/* tools/eigo/terms-*.json から tools/eigo/terms_js.py が 作る。手で 直さない */\nconst EIGO_TERMS = " +
                                       json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("eigo/terms.js", len(out), "問", (ROOT / "eigo/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
