#!/usr/bin/env python3
"""tools/zeirishi/meta.json + tools/zeirishi/terms-<旅>.json → data/zeirishi.json(1か所に まとめた もの)と zeirishi/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が zeirishi/ を 作るときに 呼ぶ。data/zeirishi.json と zeirishi/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/zeirishi/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/zeirishi/terms_js.py --check  # 確かめるだけ
決まりは tools/zeirishi/PROMPT.md。もとは tools/bengoshi/terms_js.py(弁護士を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(税理士試験の 11科目 + 税の きほん・税理士法。tools/zeirishi/PROMPT.md)
SUBJECTS = ("税のきほん", "簿記論", "財務諸表論", "所得税法", "法人税法", "相続税法", "消費税法", "酒税法", "国税徴収法", "住民税", "事業税", "固定資産税", "税理士法")
# ✅ 株式旅行・弁護士・社会 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 税理士の 7つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/zeirishi/PROMPT.md の 1〜4)
#   ① 節税の テクニック・脱税・抜け道・「安くなる」の 決めうち・相談の 答えに なる 言いかた
#   ② ⚠️⚠️ 小学生も あそぶので 差し押さえ・滞納処分・脱税の 事件・自己破産・こわい ことば(けいくん決定 2026-10-01「すべておすすめで」= A 入れない)
#   ③ 税率・金額・パーセントの 数字(毎年 変わる。飲食料品の 消費税率も 2027年4月から 2年間 変わる 予定)・条の 番号
BAN = ["脱税", "節税", "租税回避", "差し押さえ", "差押", "滞納処分", "公売", "競売", "強制徴収", "査察", "マルサ", "自己破産", "破産", "夜逃げ", "取り立て", "とりたて",
       "抜け道", "裏ワザ", "裏技", "安くなる", "安く なる", "得をする", "得を する", "お得", "かからない方法", "ばれない", "バレない", "ごまかす", "ごまかし",
       "あなたの場合", "あなたの 場合", "この条件なら", "この 条件なら",
       "死亡", "死ぬ", "死に至", "自殺", "亡くなっ", "命を落と", "遺体", "死体", "地獄", "血", "殺", "銃", "逮捕", "懲役", "禁錮", "刑務所",
       "絶対に", "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|億円)"), re.compile(r"(十|百|千|万|億)円"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 税率・金額・条の 番号は 書かない
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 13の 分野の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "")
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
        sys.exit("税理士の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("税理士の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/zeirishi.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 税理士の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           R(r"しんぱんしょ</rt>", "しんぱんじょ</rt>")]  # 国税不服審判所(しんぱんじょ)
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
    (ROOT / "zeirishi").mkdir(exist_ok=True)
    (ROOT / "zeirishi/terms.js").write_text("/* tools/zeirishi/terms-*.json から tools/zeirishi/terms_js.py が 作る。手で 直さない */\nconst ZEIRISHI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("zeirishi/terms.js", len(out), "語", (ROOT / "zeirishi/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
