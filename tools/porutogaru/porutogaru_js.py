#!/usr/bin/env python3
"""tools/porutogaru/src/<旅>.json + meta.json → data/portuguese.json と porutogaru/portuguese.js(ゲームが 読む 形)
tools/build_games.py が porutogaru/ を 作るときに 呼ぶ。porutogaru/portuguese.js と data/portuguese.json は 手で 直さない
    python3 tools/porutogaru/porutogaru_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/porutogaru/porutogaru_js.py --check  # 確かめるだけ
⚠️ 読みの ひらがなは 手で 書かない。text(つづりが 読みと ちがう 語だけ pron)から kana_pt.py の 1つの 表(ブラジルの 読み)で 作る
⚠️ id は はじめて 通したときに src に 書きこむ(きろくが id で おぼえているので 変えない)
⚠️ BAN = アクセント記号を はずすと 子どもに 不向きな 語に なる 語・ブラジルと ポルトガルで 下品・差別に なる 語。text・例文・返事に 1つでも あれば 止める"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(HERE)); sys.path.insert(0, str(ROOT / "tools/kabu"))
from kana_pt import kana, strip_acc

ORDER = ["ptkihon", "ptw1", "ptw2", "ptw3", "ptw4", "ptgram", "pttalk", "ptnative"]
POS = {"名詞", "動詞", "形容詞", "副詞", "代名詞", "数詞", "前置詞", "接続詞", "感動詞", "冠詞", "表現"}
STYLE = {"você", "tu", "o senhor", "vocês", "-"}
REGION = {"BR", "PT"}
L = "A-Za-zÀÁÂÃÇÉÊÍÓÔÕÚàáâãçéêíóôõú"
TEXT_OK = re.compile(r"[%s][%s ,.?!-]*" % (L, L))
PRON_OK = re.compile(r"[%s][%s -]*" % (L, L))
# 打つ 字に しない 語(記号を はずすと 別の 語に なる / 国に よって 下品に なる)。迷ったら ここに 足す
BAN = {"cocô", "rapariga", "raparigas", "puto", "putos", "puta", "bicha", "bichas", "pica", "cacete", "cu", "caralho", "porra", "merda", "foda", "foder", "buceta", "boceta",
       "piroca", "pau", "veado", "viado", "bunda", "pinto", "pintinho", "punheta", "xoxota", "transar", "gostosa", "gostoso", "vadia", "safado", "otário", "babaca", "cuzão",
       "sapatão", "paneleiro", "rola", "grelo", "cona", "piça", "bilau", "macaco", "macaca", "tesão", "camisinha", "cachaça", "caipirinha", "cerveja", "chope", "idiota",
       "burro", "burra", "feio", "feia", "gordo", "gorda", "chato", "chata", "imbecil", "estúpido", "favela", "favelas", "trepar", "pentelho", "mamar", "caga", "cagar", "peido"}
BAN_N = {strip_acc(w).lower() for w in BAN}
WARN_EX = set()


def toks(s): return re.findall(r"[%s]+" % L, s or "")
def abc(s): return re.sub(r"[^a-z0-9]", "", strip_acc(s).lower())


def load():
    meta = json.loads((HERE / "meta.json").read_text(encoding="utf-8"))
    items = []
    for jid in ORDER:
        p = HERE / "src" / (jid + ".json")
        if not p.exists(): continue
        arr = json.loads(p.read_text(encoding="utf-8"))
        nums = [int(t["id"].rsplit("-", 1)[1]) for t in arr if re.fullmatch(jid + r"-\d+", str(t.get("id", "")))]
        nxt = max(nums, default=0) + 1; changed = False
        for t in arr:
            if not t.get("id"): t["id"] = "%s-%d" % (jid, nxt); nxt += 1; changed = True
            t["journey"] = jid
        if changed: p.write_text(json.dumps(arr, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        items += arr
    return meta, items


def check(meta, items):
    errs = []; warn = []
    js = {j["id"]: j for j in meta["journeys"]}; scenes = {s["id"] for s in meta["scenes"]}; cats = meta["categories"]
    ids = set(); texts = {}; count = {}
    for t in items:
        tid = t.get("id"); j = js[t["journey"]]; count[j["id"]] = count.get(j["id"], 0) + 1
        for k in ("text", "meaning", "emoji", "difficulty"):
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids.add(tid)
        if t.get("difficulty") not in (1, 2, 3, 4): errs.append(f"{tid}: difficulty は 1〜4")
        tx = t.get("text", "")
        if not TEXT_OK.fullmatch(tx): errs.append(f"{tid}: text「{tx}」は ポルトガル語の 字・空白・. , ? ! - だけ")
        if t.get("pron") and not PRON_OK.fullmatch(t["pron"]): errs.append(f"{tid}: pron「{t['pron']}」は 字と 空白だけ")
        if t.get("region") and t["region"] not in REGION: errs.append(f"{tid}: region「{t['region']}」は BR か PT")
        for fld in ("text", "example", "reply"):
            for w in toks(t.get(fld, "")):
                wl = w.lower()
                if strip_acc(wl) in BAN_N: errs.append(f"{tid}: {fld} に 入れない 語「{w}」")
        jk = j["kind"]
        if jk == "word":
            if len(tx) > 24: errs.append(f"{tid}: 単語が 長い({len(tx)}字)")
            if t.get("pos") not in POS: errs.append(f"{tid}: pos「{t.get('pos')}」")
            # 名詞には 冠詞を つける(月の 名前は 冠詞なしが ふつうなので 時間・曜日は 見ない)
            if t.get("pos") == "名詞" and not re.match(r"(o|a|os|as) ", tx) and t.get("category") != "時間・曜日": warn.append(f"{tid}: 名詞に 冠詞が ない(「{tx}」)")
        if jk in ("word", "kihon"):
            cl = cats["word"] if jk == "word" else cats["ptkihon"]
            if t.get("category") not in cl: errs.append(f"{tid}: category「{t.get('category')}」")
        if jk == "phrase":
            if len(tx) > 40: errs.append(f"{tid}: 文が 長い({len(tx)}字)")
            if t.get("style") not in STYLE: errs.append(f"{tid}: style「{t.get('style')}」")
            if not t.get("who"): errs.append(f"{tid}: who が 空")
            if j["id"] == "pttalk":
                if t.get("scene") not in scenes: errs.append(f"{tid}: scene「{t.get('scene')}」")
            elif t.get("category") not in cats[j["id"]]: errs.append(f"{tid}: category「{t.get('category')}」")
        key = abc(tx)
        if key in texts: errs.append(f"{tid}: 「{tx}」が {texts[key]} と かぶる")
        texts[key] = tid
        if not kana(t.get("pron") or tx).replace(" ", ""): errs.append(f"{tid}: 読みが 作れない")
        if len(t.get("meaning", "")) > 32: warn.append(f"{tid}: 意味が 長い")
        for k in ("meaning", "exampleJa", "replyJa", "note", "tip", "who"):
            if re.search(r"[一-龯ぁ-んァ-ヶ] [一-龯ぁ-んァ-ヶ]", t.get(k, "")): warn.append(f"{tid}: {k} に 半角スペース")
            if "十分" in t.get(k, ""): warn.append(f"{tid}: {k} に「十分」(じゅうぶん と 読める)")
    for jid, n in count.items():
        if n % 10: errs.append(f"旅 {jid} の 数 {n} が 10の倍数で ない")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("ことばに まちがいが " + str(len(errs)) + " こ あります")


def main():
    meta, items = load()
    check(meta, items)
    if "--check" in sys.argv:
        print("portuguese OK", len(items), "こ"); return
    (ROOT / "data/portuguese.json").write_text(json.dumps(dict(meta=meta, list=items), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
    scn = {s["id"]: s for s in meta["scenes"]}; jk = {j["id"]: j["kind"] for j in meta["journeys"]}
    out = []
    for t in items:
        kn = kana(t.get("pron") or t["text"])
        o = dict(id=t["id"], t=t["text"], kn=kn, kr=kn.replace(" ", ""), er=abc(t["text"]), k=jk[t["journey"]], j=t["journey"], dv=t["difficulty"], e=t["emoji"],
                 m=t["meaning"], mrb=rub(t["meaning"]))
        if t.get("pos"): o["pos"] = t["pos"]
        if t["journey"] == "pttalk": o["sc"] = t["scene"]; o["c"] = scn[t["scene"]]["name"]
        else: o["c"] = t["category"]
        if t.get("style"): o["st"] = t["style"]
        if t.get("who"): o["who"] = t["who"]; o["whorb"] = rub(t["who"])
        if t.get("region"): o["rg"] = t["region"]
        for a, b in (("example", "ex"), ("reply", "rp")):
            if t.get(a):
                o[b] = t[a]
                if t.get(a + "Ja"): o[b + "Ja"] = t[a + "Ja"]; o[b + "rb"] = rub(t[a + "Ja"])
        for a, b in (("tip", "tp"), ("note", "nt")):
            if t.get(a): o[b + "rb"] = rub(t[a])
        out.append(o)
    js = dict(note=meta["note"], journeys=meta["journeys"], levels=meta["levels"], scenes=meta["scenes"], titles=meta["titles"], allTitle=meta["allTitle"], list=out)
    (ROOT / "porutogaru").mkdir(exist_ok=True)
    (ROOT / "porutogaru/portuguese.js").write_text("/* tools/porutogaru/src/*.json から tools/porutogaru/porutogaru_js.py が 作る。手で 直さない */\nconst PT_WORDS = " +
                                            json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("porutogaru/portuguese.js", len(out), "こ", (ROOT / "porutogaru/portuguese.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
