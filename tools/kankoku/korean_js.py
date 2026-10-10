#!/usr/bin/env python3
"""tools/kankoku/src/<旅>.json + meta.json → data/korean.json と kankoku/korean.js(ゲームが 読む 形)
tools/build_games.py が kankoku/ を 作るときに 呼ぶ。kankoku/korean.js と data/korean.json は 手で 直さない
    python3 tools/kankoku/korean_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/kankoku/korean_js.py --check  # 確かめるだけ
⚠️ 読みの ひらがなは 手で 書かない。pron(発音どおりの ハングル)から kana_table.py の 1つの 表で 作る
⚠️ id は はじめて 通したときに src に 書きこむ(きろくが id で おぼえているので 変えない)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(HERE)); sys.path.insert(0, str(ROOT / "tools/kabu"))
from kana_table import kana

ORDER = ["krhan", "krw1", "krw2", "krw3", "krw4", "krgram", "krtalk", "krnative"]
POS = {"名詞", "動詞", "形容詞", "副詞", "代名詞", "数詞", "助詞", "感動詞", "連体詞", "依存名詞"}
STYLE = {"합니다", "해요", "반말"}
HANGUL = "가-힣"
TEXT_OK = re.compile(r"[%s][%s ,.?!]*" % (HANGUL, HANGUL))
PRON_OK = re.compile(r"[%s][%s ]*" % (HANGUL, HANGUL))
# 打つ 字に そろえる(ゲームの KANKOKU.norm と 同じ): 空白・っ・ー を 消し、にごりを そろえる(か/が・た/だ・ぱ/ば・ち/じ は どちらでも)
# ⚠️ ち/じ は「じ」に そろえる(フリックで じ を 打つと と中で し に なる。し と じ は 濁点だけの ちがいなので 打っている とちゅうも 赤く ならない)
# ⚠️ っ は と中で つ に なる → つ も 消す(読みの かなに つ は 出てこない。kana_table.py の 行に つ が ない)
FOLD = str.maketrans({"が": "か", "ぎ": "き", "ぐ": "く", "げ": "け", "ご": "こ", "だ": "た", "ぢ": "じ", "づ": "つ", "で": "て", "ど": "と",
                      "ば": "ぱ", "び": "ぴ", "ぶ": "ぷ", "べ": "ぺ", "ぼ": "ぽ", "ち": "じ"})


def typed(k):
    return re.sub(r"[\sっつー]", "", k).translate(FOLD)


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
        for k in ("text", "pron", "meaning", "emoji", "difficulty"):
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids.add(tid)
        if t.get("difficulty") not in (1, 2, 3, 4): errs.append(f"{tid}: difficulty は 1〜4")
        tx, pr = t.get("text", ""), t.get("pron", "")
        if not TEXT_OK.fullmatch(tx): errs.append(f"{tid}: text「{tx}」は ハングル・空白・. , ? ! だけ")
        if not PRON_OK.fullmatch(pr): errs.append(f"{tid}: pron「{pr}」は ハングルと 空白だけ")
        nt = len(re.sub(r"[ ,.?!]", "", tx)); np_ = len(pr.replace(" ", ""))
        if abs(nt - np_) > 1: warn.append(f"{tid}: text と pron の 字数が ちがう({tx} / {pr})")
        jk = j["kind"]
        if jk == "word":
            if len(tx) > 15: errs.append(f"{tid}: 単語が 長い({len(tx)}字)")
            if t.get("pos") not in POS: errs.append(f"{tid}: pos「{t.get('pos')}」")
        if jk in ("word", "han"):
            cl = cats["word"] if jk == "word" else cats["krhan"]
            if t.get("category") not in cl: errs.append(f"{tid}: category「{t.get('category')}」")
        if jk == "phrase":
            if len(tx) > 20: errs.append(f"{tid}: 文が 長い({len(tx)}字)")
            if t.get("style") not in STYLE: errs.append(f"{tid}: style「{t.get('style')}」")
            if not t.get("who"): errs.append(f"{tid}: who が 空")
            if j["id"] == "krtalk":
                if t.get("scene") not in scenes: errs.append(f"{tid}: scene「{t.get('scene')}」")
            elif t.get("category") not in cats[j["id"]]: errs.append(f"{tid}: category「{t.get('category')}」")
        key = re.sub(r"[ ,.?!]", "", tx)
        if key in texts: errs.append(f"{tid}: 「{tx}」が {texts[key]} と かぶる")
        texts[key] = tid
        if len(t.get("meaning", "")) > 32: warn.append(f"{tid}: 意味が 長い")
        for k in ("meaning", "exampleJa", "replyJa", "note", "tip"):
            if re.search(r"[一-龯ぁ-んァ-ヶ] [一-龯ぁ-んァ-ヶ]", t.get(k, "")): warn.append(f"{tid}: {k} に 半角スペース")
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
        print("korean OK", len(items), "こ"); return
    (ROOT / "data/korean.json").write_text(json.dumps(dict(meta=meta, list=items), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub = rubifier()
    scn = {s["id"]: s for s in meta["scenes"]}; jk = {j["id"]: j["kind"] for j in meta["journeys"]}
    out = []
    for t in items:
        kn = kana(t["pron"])
        o = dict(id=t["id"], t=t["text"], kn=kn, r=typed(kn), k=jk[t["journey"]], j=t["journey"], dv=t["difficulty"], e=t["emoji"],
                 m=t["meaning"], mrb=rub(t["meaning"]))
        if t.get("pos"): o["pos"] = t["pos"]
        if t["journey"] == "krtalk": o["sc"] = t["scene"]; o["c"] = scn[t["scene"]]["name"]
        else: o["c"] = t["category"]
        if t.get("style"): o["st"] = t["style"]
        if t.get("who"): o["who"] = t["who"]; o["whorb"] = rub(t["who"])
        for a, b in (("example", "ex"), ("reply", "rp")):
            if t.get(a):
                o[b] = t[a]
                if t.get(a + "Ja"): o[b + "Ja"] = t[a + "Ja"]; o[b + "rb"] = rub(t[a + "Ja"])
        for a, b in (("tip", "tp"), ("note", "nt")):
            if t.get(a): o[b + "rb"] = rub(t[a])
        out.append(o)
    js = dict(note=meta["note"], journeys=meta["journeys"], levels=meta["levels"], scenes=meta["scenes"], titles=meta["titles"], allTitle=meta["allTitle"], list=out)
    (ROOT / "kankoku").mkdir(exist_ok=True)
    (ROOT / "kankoku/korean.js").write_text("/* tools/kankoku/src/*.json から tools/kankoku/korean_js.py が 作る。手で 直さない */\nconst KR_WORDS = " +
                                            json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kankoku/korean.js", len(out), "こ", (ROOT / "kankoku/korean.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
