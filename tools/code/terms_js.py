#!/usr/bin/env python3
"""tools/code/meta.json + tools/code/terms-<旅>.json → data/code.json(1か所に まとめた もの)と code/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が code/ を 作るときに 呼ぶ。data/code.json と code/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/code/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/code/terms_js.py --check  # 確かめるだけ
決まりは tools/code/PROMPT.md。もとは tools/gamedev/terms_js.py(ゲームクリエイターを 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "role", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 図鑑で しぼる「分野」
ROLES = ("みんな", "フロントエンド", "バックエンド", "インフラ", "データ", "セキュリティ", "テスト", "チーム")
# ⚠️ AI旅行・ゲームクリエイターと 同じ ことばは 入れて よい(復習。けいくん決定 2026-09-29)。ただし 説明の 文を 同じに しない
OTHER = {}
for line in (HERE / "other-words.tsv").read_text(encoding="utf-8").splitlines():
    if line and not line.startswith("#"):
        g, n, r, ds = line.split("\t"); OTHER.setdefault(n.lower(), []).append((g, ds))
def near(a, b):  # 同じ 文か(空白を ぬいて くらべる。7割 同じなら 写した と みる)
    import difflib; a, b = re.sub(r"\s", "", a), re.sub(r"\s", "", b)
    return difflib.SequenceMatcher(None, a, b).ratio() >= 0.7
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める
#   ① 会社・サービス・商品の 名前(言語・Git・Linux などの みんなの 決まりの 名前は よい)
#   ② お金の ことば ③ 言いきり・順位・自分の 宣伝・シリーズで 使わない 字
BAN = ["Google", "グーグル", "Apple", "アップル", "Microsoft", "マイクロソフト", "Amazon", "アマゾン", "AWS", "Azure", "GitHub", "ギットハブ", "GitLab",
       "Meta", "Facebook", "Oracle", "オラクル", "Windows", "macOS", "iPhone", "Android", "Chrome", "VSCode", "VS Code", "Visual Studio", "Slack", "Docker",
       "給料", "年収", "売上", "売り上げ", "もうけ", "円", "値段", "価格", "課金",
       "かずとも", "フリック旅行", "いちばん人気", "一番人気", "最強", "一番", "いちばん 速い 言語", "古い言語",
       "100マス", "百ます", "絶対に"]
SYM = re.compile(r"[<>&{};=]")
JA = re.compile(r"[ぁ-んァ-ヶ一-龥]")
MAXR = 20; LONG = 13  # 読みの 長さ(これより 長いと 子どもが 飽きる。PROMPT.md)


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
        if t.get("role") not in ROLES: errs.append(f"{tid}: role「{t.get('role')}」は {'・'.join(ROLES)} の どれか")
        for g, ds in OTHER.get(str(t.get("name")).lower(), []):
            if near(ds, t.get("description", "")): errs.append(f"{tid}: 説明が {g} の「{t.get('name')}」と ほとんど 同じ(作る 側の 目線で 書きなおす)")
        if len(t.get("reading") or "") > LONG and t.get("difficulty") != 3: warn.append(f"{tid}: {LONG}字を こえる 読みは 上級だけ")
        if SYM.search(t.get("description", "")): errs.append(f"{tid}: 説明に 記号 < > & {{ }} ; = を 入れない")
        ex = t.get("example") or ""
        if ex and JA.search(ex) and SYM.search(ex): errs.append(f"{tid}: たとえ話に 記号 < > & を 入れない")
        if ex and not JA.search(ex):
            ls = ex.split("\n")
            if len(ls) > 2 or any(len(x) > 44 for x in ls): warn.append(f"{tid}: コードの 見本は 2行・1行 44字まで")
            if not all(x.isascii() for x in ls): errs.append(f"{tid}: コードの 見本は ASCII だけ")
        if t.get("journey") == "eng" and t.get("difficulty") == 1: errs.append(f"{tid}: エンジニアの 旅に 入門は 作らない")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        for w in BAN:
            if w in t.get("name", "") + t.get("description", "") + t.get("example", ""): errs.append(f"{tid}: 「{w}」は 使わない")
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
        sys.exit("プログラミングの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("プログラミングの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/code.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # 「〜の 数」「数を」など ひとつだけの「数」は かず(ふりがなの 道具は すう に しがち)。ほかの ゲームに ひびかない ように ここだけで 直す
    KAZU = re.compile(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)")
    # プログラミングの「空」は から(空の 文字列・空の 入れもの)。ふりがなの 道具は そら に しがち。「何行か」の 行は ぎょう
    SORA = re.compile(r"<ruby>空<rt>そら</rt></ruby>")
    GYO = re.compile(r"<ruby>何<rt>なに</rt></ruby><ruby>行<rt>(?:い|ぎょう)</rt></ruby>")
    NAN = re.compile(r"<ruby>何<rt>なに</rt></ruby>(?=(?:<ruby>)?[番台重倍件回度人個日]|[ァ-ヶ])")  # 何番目・何倍・何バイト は なん
    fix = lambda h: NAN.sub("<ruby>何<rt>なん</rt></ruby>", GYO.sub("<ruby>何行<rt>なんぎょう</rt></ruby>", SORA.sub("<ruby>空<rt>から</rt></ruby>", h)))
    # 通った・通って は とお / 二分探索・二分木 の 分 は ぶん・木 は ぎ(ふりがなの 道具が かよ・ふん・もく に しがち)
    ONE = {("通", "かよ"): "とお", ("分", "ふん"): "ぶん", ("木", "もく"): "ぎ"}
    fix2 = lambda h: re.sub(r"<ruby>(通|分|木)<rt>(かよ|ふん|もく)</rt></ruby>", lambda m: "<ruby>%s<rt>%s</rt></ruby>" % (m.group(1), ONE.get((m.group(1), m.group(2)), m.group(2))), h)
    rub = lambda t: fix2(fix(KAZU.sub("<ruby>数<rt>かず</rt></ruby>", rub0(t))))
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 sb=t["role"], e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"]) if JA.search(t["example"]) else ""
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "code").mkdir(exist_ok=True)
    (ROOT / "code/terms.js").write_text("/* tools/code/terms-*.json から tools/code/terms_js.py が 作る。手で 直さない */\nconst CODE_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("code/terms.js", len(out), "語", (ROOT / "code/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
