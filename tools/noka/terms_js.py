#!/usr/bin/env python3
"""tools/noka/meta.json + tools/noka/terms-<旅>.json → data/noka.json(1か所に まとめた もの)と noka/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が noka/ を 作るときに 呼ぶ。data/noka.json と noka/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/noka/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/noka/terms_js.py --check  # 確かめるだけ
決まりは tools/noka/PROMPT.md。もとは tools/daiku/terms_js.py(大工を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(日本農業技術検定の 科目(共通の 農業の 基礎 + 作物・野菜・花き・果樹・畜産・食品、3級は 環境系も)に そろえた 8つ。tools/noka/PROMPT.md)
SUBJECTS = ("農業一般", "作物", "野菜", "果樹", "花き", "畜産", "食品", "環境")
# ✅ 料理人・理科・社会 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 農家の 8つの 旅の 中だけ
# ✅ 機械の 使いかたは 書いて よい(けいくん決定 2026-10-03「機械の使いかたも書いてください」)。「使いかた」の 字は 止めない
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/noka/PROMPT.md)
#   ① 農薬の 名前・量・まきかた / 農薬や 肥料の よしあし
#   ② ⚠️⚠️ 小学生も あそぶ: と畜・処分・死・殺・血・けが・事故・こわい ことば(害虫は「作物を 食べる 虫」、駆除は「追いはらう・ふせぐ」)
#   ③ 実在の 会社・農協の 個別名・商標の 品種名や 地域ブランドの 名前
#   ④ 年ごとに 変わる 数字(自給率・収穫量・値段・農家の 数)
BAN = ["まきかた", "撒き方", "まき方", "散布量", "希釈", "うすめかた", "倍に うすめ", "農薬の 量", "農薬を まく 量",
       "命に かかわ", "命にかかわ", "けがを", "けがの", "けがに", "怪我", "ケガ", "事故", "大けが", "転落", "巻きこ", "巻き込",
       "死", "殺", "血", "と畜", "屠", "処分", "肉に される", "こわい", "恐ろしい", "危険な 作業", "爆発", "地獄",
       "クボタ", "ヤンマー", "イセキ", "井関", "三菱マヒンドラ", "ホクレン", "全農", "ゼンノー", "農林中金", "雪印", "森永", "サカタ", "タキイ", "カゴメ",
       "あまおう", "巨峰", "夕張メロン", "松阪牛", "神戸牛", "神戸ビーフ", "近江牛", "米沢牛", "魚沼産", "スカイベリー", "とちおとめ", "紅ほっぺ", "ゆめぴりか", "つや姫", "新之助",
       "安全ではない", "危ない 農薬", "体に 悪い", "体に わるい", "体に よくない",
       "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|倍|kg|キロ|トン|グラム|ヘクタール|ha|アール|戸|万人|人)"), re.compile(r"(十|百|千|万|億)(円|トン|戸)"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 年ごとに 変わる 数字・値段・量・条の 番号は 書かない
OK_WORDS = []
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 8つの 分野の どれか")
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
        sys.exit("農家の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("農家の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/noka.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 農家の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 農家の 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>実<rt>じつ</rt></ruby><ruby>肥<rt>[^<]*</rt></ruby>", "<ruby>実肥<rt>みごえ</rt></ruby>"),
           R(r"<ruby>実<rt>じつ</rt></ruby>", "<ruby>実<rt>み</rt></ruby>"),                       # 作物の 実(み)
           R(r"<ruby>種<rt>しゅ</rt></ruby>", "<ruby>種<rt>たね</rt></ruby>"),                     # 1字の 種(たね)
           R(r"<ruby>何<rt>なに</rt></ruby>(?=<ruby>(?:列|年|日|回|本|度)|年|日|回|本|度)", "<ruby>何<rt>なん</rt></ruby>"),
           R(r"<ruby>鉢<rt>ばち</rt></ruby>", "<ruby>鉢<rt>はち</rt></ruby>"),
           R(r"<ruby>房<rt>ぼう</rt></ruby>", "<ruby>房<rt>ふさ</rt></ruby>"),
           R(r"<ruby>熟<rt>こな</rt></ruby>", "<ruby>熟<rt>じゅく</rt></ruby>"),
           R(r"<ruby>年中<rt>ねんちゅう</rt></ruby>", "<ruby>年中<rt>ねんじゅう</rt></ruby>"),
           R(r"(<ruby>年<rt>ねん</rt></ruby>)<ruby>中<rt>ちゅう</rt></ruby>", r"\1<ruby>中<rt>じゅう</rt></ruby>"),   # 1年中(いちねんじゅう)
           R(r"<ruby>二十四<rt>にじゅうよん</rt></ruby><ruby>節気<rt>せっき</rt></ruby>", "<ruby>二十四節気<rt>にじゅうしせっき</rt></ruby>"),
           R(r"<ruby>八十八<rt>やそはち</rt></ruby><ruby>夜<rt>や</rt></ruby>", "<ruby>八十八夜<rt>はちじゅうはちや</rt></ruby>"),
           R(r"<ruby>二百十<rt>にひゃくとう</rt></ruby><ruby>日<rt>か</rt></ruby>", "<ruby>二百十日<rt>にひゃくとおか</rt></ruby>"),
           R(r"<ruby>育苗<rt>いくびょう</rt></ruby><ruby>箱<rt>ばこ</rt></ruby>", "<ruby>育苗箱<rt>いくびょうばこ</rt></ruby>"),
           R(r"<ruby>花芽<rt>かが</rt></ruby>", "<ruby>花芽<rt>はなめ</rt></ruby>"),
           R(r"(れんげ)<ruby>畑<rt>はたけ</rt></ruby>", r"\1<ruby>畑<rt>ばたけ</rt></ruby>"),
           ]
    def rub(t):
        h = rub0(t)
        for a, b in FIX: h = a.sub(b, h)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 sb=t["field"], e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "noka").mkdir(exist_ok=True)
    (ROOT / "noka/terms.js").write_text("/* tools/noka/terms-*.json から tools/noka/terms_js.py が 作る。手で 直さない */\nconst NOKA_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("noka/terms.js", len(out), "語", (ROOT / "noka/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
