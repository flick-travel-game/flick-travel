#!/usr/bin/env python3
"""data/english.json → eikaiwa/english.js(ゲームが 読む 形。日本語の 意味・訳に ふりがな)
tools/build_games.py が eikaiwa/ を 作るときに 呼ぶ。eikaiwa/english.js は 手で 直さない
    python3 tools/eikaiwa/english_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/eikaiwa/english_js.py --check  # 確かめるだけ"""
import json, re, sys, unicodedata
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "text", "kind", "journey", "difficulty", "meaning", "emoji", "reading")
KANA = re.compile(r"[ぁ-ゖー]+")
POS = {"名詞", "動詞", "形容詞", "副詞", "前置詞", "代名詞", "接続詞", "助動詞", "間投詞", "数"}
WORD_OK = re.compile(r"[A-Za-z][A-Za-z'\-]*")
PHRASE_OK = re.compile(r"[A-Za-z][A-Za-z ',.?!]*")

def typed(s):
    """打つ 字(ゲームの EIKAIWA.norm と 同じ): 小文字の 英字と 数字だけ。空白・' ・ , . ? ! - は 打たなくてよい"""
    s = unicodedata.normalize("NFKC", s).lower()
    return re.sub(r"[^a-z0-9]", "", s)

def check(d):
    """english.json の 形を 確かめる。まちがいは ぜんぶ 出してから 止める"""
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}; scenes = {s["id"] for s in m["scenes"]}; cats = set(m["categories"])
    ids = set(); texts = {}; count = {}
    for t in d["list"]:
        tid = t.get("id")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids.add(tid)
        j = js.get(t.get("journey"))
        if not j: errs.append(f"{tid}: journey「{t.get('journey')}」が ない"); continue
        count[j["id"]] = count.get(j["id"], 0) + 1
        if t.get("kind") != j["kind"]: errs.append(f"{tid}: kind は {j['kind']}")
        if t.get("difficulty") not in (1, 2, 3, 4): errs.append(f"{tid}: difficulty は 1〜4")
        tx = t.get("text", "")
        if t["kind"] == "word":
            if not WORD_OK.fullmatch(tx): errs.append(f"{tid}: 英単語「{tx}」は 英字と ' - だけ")
            if t.get("pos") not in POS: errs.append(f"{tid}: pos「{t.get('pos')}」")
            if t.get("category") not in cats: errs.append(f"{tid}: category「{t.get('category')}」")
        else:
            if not PHRASE_OK.fullmatch(tx): errs.append(f"{tid}: フレーズ「{tx}」は 英字・空白・' , . ? ! だけ")
            if len(tx) > 40: errs.append(f"{tid}: フレーズが 長い({len(tx)}字)")
            if t.get("scene") not in scenes: errs.append(f"{tid}: scene「{t.get('scene')}」")
        key = tx.lower()
        if key in texts: errs.append(f"{tid}: 「{tx}」が {texts[key]} と かぶる")
        texts[key] = tid
        if not typed(tx): errs.append(f"{tid}: 打つ字が ない")
        for r in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):  # ひらがなで 打つ ときの 読み(けいくん 2026-10-10)
            if not KANA.fullmatch(r or ""): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
        if len(t.get("meaning", "")) > 40: warn.append(f"{tid}: 意味が 長い")
    for jid, n in count.items():
        if n % 10: errs.append(f"旅 {jid} の 数 {n} が 10の倍数で ない")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("data/english.json に まちがいが " + str(len(errs)) + " こ あります")

def main():
    d = json.loads((ROOT / "data/english.json").read_text(encoding="utf-8"))
    check(d)
    if "--check" in sys.argv:
        print("data/english.json OK", len(d["list"]), "こ"); return
    from companies_js import rubifier
    rub = rubifier()
    m = d["meta"]; scn = {s["id"]: s for s in m["scenes"]}
    out = []
    for t in d["list"]:
        o = dict(id=t["id"], t=t["text"], r=typed(t["text"]), kr=t["reading"], k=t["kind"], j=t["journey"], dv=t["difficulty"], e=t["emoji"],
                 m=t["meaning"], mrb=rub(t["meaning"]))
        if t["kind"] == "word": o["pos"] = t["pos"]; o["c"] = t["category"]
        else: o["sc"] = t["scene"]; o["c"] = scn[t["scene"]]["name"]
        for a, b in (("example", "ex"), ("reply", "rp")):
            if t.get(a):
                o[b] = t[a]
                if t.get(a + "Ja"): o[b + "Ja"] = t[a + "Ja"]; o[b + "rb"] = rub(t[a + "Ja"])
        if t.get("tip"): o["tp"] = t["tip"]; o["tprb"] = rub(t["tip"])
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["kal"] = alts
        out.append(o)
    js = dict(note=m["note"], journeys=m["journeys"], levels=m["levels"], scenes=m["scenes"], titles=m["titles"], allTitle=m["allTitle"], list=out)
    (ROOT / "eikaiwa").mkdir(exist_ok=True)
    (ROOT / "eikaiwa/english.js").write_text("/* data/english.json から tools/eikaiwa/english_js.py が 作る。手で 直さない */\nconst EN_WORDS = " +
                                             json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("eikaiwa/english.js", len(out), "こ", (ROOT / "eikaiwa/english.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
