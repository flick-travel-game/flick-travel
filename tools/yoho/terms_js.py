#!/usr/bin/env python3
"""tools/yoho/meta.json + tools/yoho/terms-<旅>.json → data/yoho.json と yoho/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が yoho/ を 作るときに 呼ぶ。data/yoho.json と yoho/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/yoho/terms_js.py          # 形を 確かめてから 作る
    python3 tools/yoho/terms_js.py --check  # 確かめるだけ
    python3 tools/yoho/terms_js.py --only <旅>
決まりは tools/yoho/PROMPT.md。もとは tools/jui/terms_js.py(獣医師)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(養蜂の 教科書の 章立てを めやすに 9つ。tools/yoho/PROMPT.md)
SUBJECTS = ("生態", "からだ", "道具", "飼育管理", "蜜源", "生産物", "病気・害敵", "繁殖", "法律・しごと")
# 🐝 ミツバチの 札(任意): セイヨウミツバチの 話か ニホンミツバチの 話か 両方か。⚠️ メインは 西洋(けいくん指定)
BEES = ("西洋", "日本", "共通")
# ✅ 理科・農家・獣医師・料理人 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30)。読みが かぶらないのは 養蜂家の 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/yoho/PROMPT.md)
#   ① ハチを こわく しない: 死・死がい・大量死・毒・惨・刺された ようす・救急の 話
#   ② 薬の 名前の 量・使いかた(濃度・回数・散布)・薬や 農薬の 商品名
#   ③ はちみつの 医学的な 効きめ(のどに 効く・治る)
#   ④ 実在の 養蜂場・はちみつの 商品・道具の メーカー・産地ブランド
#   ⑤ 年ごとに 変わる 数字(生産量・輸入量・人数・価格・%・円)
BAN = ["死", "殺", "毒", "惨", "大量に 減", "全滅", "血", "苦しんで", "苦しむ", "むごい", "命を落と", "命に かかわ", "命にかかわ", "アナフィラキシー", "ショック", "腫れあが", "はれあが", "救急車",
       "希釈", "濃度", "散布", "倍に うすめ", "倍にうすめ", "mL", "ミリリットル", "mg", "ミリグラム", "アピスタン", "アピバール", "チモバール", "アピガード", "バイバロール", "マイトアウェイ", "テラマイシン", "ミロサマイシン",
       "のどに よい", "のどによい", "のどに 効", "のどに効", "効きます", "効く", "効能", "治る", "治ります", "治す", "殺菌", "免疫力を", "風邪に",
       "山田養蜂場", "アピ株式会社", "サクラ印", "マヌカ", "ハニーワールド", "加藤美蜂園", "秋田屋", "俵屋", "渡辺養蜂場", "ラングストロス社",
       "生産量", "輸入量", "自給率", "価格", "値段", "万円", "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|万円|万人|人|戸|群|箱|トン|t\b|kg|キロ|mg|g\b|グラム|回|滴|歳|才)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|戸|トン)"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]
# 決まって いる 数(自然の 決まり・制度)は 通す。⚠️ 足すときは exam.txt で 確かめた ものだけ
OK_WORDS = ["1歳未満", "1歳に なるまで", "1歳になるまで", "1歳を すぎ", "1歳をすぎ", "1歳から", "年1回", "年に 1回", "毎年 1回", "1つの 群", "1群",
            "2つの 群", "2群", "78〜80%", "78%", "80%", "およそ 80%", "およそ 78〜80%", "20%", "およそ 20%"]
# ふりがなの 直し(この ゲームだけ)。{"まちがい": "正しい"}。助手が 旅ごとに 見つけた ものは tools/yoho/rbfix-*.json(気象予報士と 同じ)
RB_FIX = {
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
}
for _f in sorted(HERE.glob("rbfix-*.json")): RB_FIX.update(json.loads(_f.read_text(encoding="utf-8")))
_R = lambda a, b: (re.compile(a), b)
RB_RE = [_R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
         _R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>")]
MAXR = 20  # 読みの 長さ(これより 長いと 子どもが 飽きる。PROMPT.md)


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
        if len(t.get("reading") or "") > MAXR: warn.append(f"{tid}: 読みが 長い({len(t['reading'])}字)")
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 科目の どれか {SUBJECTS}")
        be = t.get("bee")
        if be is None: errs.append(f"{tid}: bee(西洋 / 日本 / 共通)が 空")
        elif be not in BEES: errs.append(f"{tid}: bee「{be}」は {BEES} の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "")
        for w in OK_WORDS: txt = txt.replace(w, "")
        for w in BAN:
            if w in txt: errs.append(f"{tid}: 「{w}」は 使わない")
        for rx in BAN_RE:
            if rx.search(txt): errs.append(f"{tid}: 「{rx.search(txt).group(0)}」は 使わない")
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
    for J in js:
        n = sum(v for (j, _), v in per.items() if j == J)
        if n and n % 10: errs.append(f"{J}: {n}語。旅ごとに 10の 倍数に そろえる")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("養蜂家の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("養蜂家の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/yoho.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    def rub(text):
        h = rub0(text)
        for x, y in RB_RE: h = x.sub(y, h)
        for x, y in RB_FIX.items(): h = h.replace(x, y)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 sb=t["field"], e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("bee"): o["bee"] = t["bee"]  # 🐝 西洋 / 日本 / 共通
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "yoho").mkdir(exist_ok=True)
    (ROOT / "yoho/terms.js").write_text("/* tools/yoho/terms-*.json から tools/yoho/terms_js.py が 作る。手で 直さない */\nconst YOHO_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("yoho/terms.js", len(out), "語", (ROOT / "yoho/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
