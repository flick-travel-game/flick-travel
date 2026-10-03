#!/usr/bin/env python3
"""tools/tetsugaku/meta.json + tools/tetsugaku/terms-<旅>.json → data/tetsugaku.json(1か所に まとめた もの)と tetsugaku/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が tetsugaku/ を 作るときに 呼ぶ。data/tetsugaku.json と tetsugaku/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/tetsugaku/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/tetsugaku/terms_js.py --check  # 確かめるだけ
決まりは tools/tetsugaku/PROMPT.md。もとは tools/adler/terms_js.py(アドラー心理学を 写した)。
⭐ 語に `toi`(💭 考えて みよう の 問いかけ。任意。1文・「?」で 終わる・50字まで・1旅に 5〜10語)を 持てる"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 分野(資格の 科目は 無いので ゲームの 中で 決めた 9つ。tools/tetsugaku/PROMPT.md)
SUBJECTS = ("形而上学", "認識論", "倫理学", "美学", "社会・政治哲学", "論理学", "心の哲学", "東洋思想", "日本思想")
# ✅ 社会旅行・歴史旅行・アドラー心理学・国語・AI旅行 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 哲学の 9つの 旅の 中だけ
# ⚠️ 名前・説明・問いに 出さない ことば。見つけたら 止める(tools/tetsugaku/PROMPT.md の 3)
#   ① 死・自殺・いのちを くらべる 話(トロッコ問題・ソクラテスの 最期・カミュの 問い)・こわい ことば
#   ② 「これが 正しい 答え」の 決めつけ / 宗教・政治の よしあし / 今の 政党 / 差別に つながる 昔の 考え
#   ③ 今 売っている 解説書・自己啓発書の 書名・生きている 人の 名前(わかっている もの)
BAN = ["死", "自殺", "自死", "殺", "血", "地獄", "処刑", "毒杯", "毒にんじん", "亡くなっ", "命を落と", "いのちを くらべ", "トロッコ", "シーシュポス", "不条理",
       "奴隷", "劣った", "劣等民族", "人種", "女性は男性より", "差別",
       "が正しい答え", "が 正しい 答え", "正解は", "が正しい。", "が 正しい。", "まちがっている", "間違っている", "だめな考え", "ダメな",
       "自民党", "立憲民主", "共産党", "公明党", "維新の会", "国民民主", "選挙で勝", "首相", "大統領",
       "銃", "爆弾", "戦死", "虐殺", "暴力", "虐待",
       "嫌われる勇気", "サンデル", "これからの「正義」", "絶対に", "100マス", "百ます"]
BAN_RE = [re.compile(r"第[\d一二三四五六七八九十百]+条"), re.compile(r"[0-9０-９]+年に(?:生まれ|没)"), re.compile(r"(?:生年|没年)")]
TOI_MAX = 50
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
    ids = {}; readings = {}; per = {}; per_toi = {}
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 9つの 分野の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        toi = t.get("toi")
        if toi is not None:
            if not isinstance(toi, str) or not toi: errs.append(f"{tid}: toi は 文字")
            elif not toi.endswith(("?", "?")): errs.append(f"{tid}: toi は「?」で 終わる")
            elif len(toi) > TOI_MAX: errs.append(f"{tid}: toi が 長い({len(toi)}字。{TOI_MAX}字まで)")
            if toi and per_toi is not None: per_toi[t.get("journey")] = per_toi.get(t.get("journey"), 0) + 1
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + (toi or "")
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
    for J in js:
        n = sum(v for (j, _), v in per.items() if j == J)
        k = per_toi.get(J, 0)
        if n and not 5 <= k <= 10: errs.append(f"{J}: 💭 問い(toi)は 1旅に 5〜10語(いま {k}語)")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("哲学の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("哲学の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/tetsugaku.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 哲学の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 哲学の ゲームだけの 読みの 直し
           R(r"<ruby>四元<rt>よつもと</rt></ruby><ruby>徳<rt>とく</rt></ruby>", "<ruby>四元徳<rt>しげんとく</rt></ruby>"),
           R(r"<ruby>国富<rt>くにとみ</rt></ruby><ruby>論<rt>ろん</rt></ruby>", "<ruby>国富論<rt>こくふろん</rt></ruby>"),
           R(r"<ruby>知行<rt>ちぎょう</rt></ruby>", "<ruby>知行<rt>ちこう</rt></ruby>"),
           R(r"<ruby>一<rt>いち</rt></ruby><ruby>者<rt>しゃ</rt></ruby>", "<ruby>一者<rt>いっしゃ</rt></ruby>"),
           R(r"<ruby>八<rt>よう</rt></ruby>つ", "<ruby>八<rt>やっ</rt></ruby>つ"),
           R(r"<ruby>四<rt>よん</rt></ruby>つ", "<ruby>四<rt>よっ</rt></ruby>つ"),
           R(r"(<ruby>[^<]*<rt>[^<]*</rt></ruby>)<ruby>因<rt>もと</rt></ruby>", r"\1<ruby>因<rt>いん</rt></ruby>"),
           R(r"<ruby>明<rt>あきら</rt></ruby>", "<ruby>明<rt>めい</rt></ruby>"),
           R(r"<ruby>我<rt>われ</rt></ruby>(?=[(（]が)", "<ruby>我<rt>が</rt></ruby>"),
           R(r"<ruby>修<rt>おさむ</rt></ruby>", "<ruby>修<rt>しゅ</rt></ruby>"),
           R(r"<ruby>証<rt>あかし</rt></ruby>", "<ruby>証<rt>しょう</rt></ruby>"),
           R(r"<ruby>偽<rt>にせ</rt></ruby>", "<ruby>偽<rt>ぎ</rt></ruby>"),
           R(r"<ruby>市場<rt>しじょう</rt></ruby>", "<ruby>市場<rt>いちば</rt></ruby>"),
           R(r"<ruby>忠<rt>ただし</rt></ruby>", "<ruby>忠<rt>ちゅう</rt></ruby>"),
           R(r"<ruby>忠恕<rt>ただひろ</rt></ruby>", "<ruby>忠恕<rt>ちゅうじょ</rt></ruby>"),
           R(r"<ruby>智<rt>さとし</rt></ruby>", "<ruby>智<rt>ち</rt></ruby>"),
           R(r"<ruby>根本<rt>ねもと</rt></ruby>", "<ruby>根本<rt>こんぽん</rt></ruby>"),
           R(r"<ruby>正義<rt>まさよし</rt></ruby>", "<ruby>正義<rt>せいぎ</rt></ruby>"),
           R(r"<ruby>聖人<rt>まさと</rt></ruby>", "<ruby>聖人<rt>せいじん</rt></ruby>"),
           R(r"<ruby>西周<rt>せいしゅう</rt></ruby>", "<ruby>西周<rt>にしあまね</rt></ruby>"),
           R(r"<ruby>訳<rt>わけ</rt></ruby>", "<ruby>訳<rt>やく</rt></ruby>"),
           R(r"<ruby>通<rt>かよ</rt></ruby>", "<ruby>通<rt>とお</rt></ruby>"),
           R(r"<ruby>音<rt>おん</rt></ruby>", "<ruby>音<rt>おと</rt></ruby>"),
           R(r"<ruby>空<rt>そら</rt></ruby>", "<ruby>空<rt>くう</rt></ruby>"),
           R(r"<ruby>舌<rt>ぜつ</rt></ruby>", "<ruby>舌<rt>した</rt></ruby>"),
           R(r"<ruby>意気地<rt>いくじ</rt></ruby>", "<ruby>意気地<rt>いきじ</rt></ruby>"),
           R(r"<ruby>仏<rt>ふつ</rt></ruby>", "<ruby>仏<rt>ほとけ</rt></ruby>"),
           R(r"<ruby>形相<rt>ぎょうそう</rt></ruby>", "<ruby>形相<rt>けいそう</rt></ruby>")]
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
        if t.get("toi"): o["toi"] = t["toi"]; o["toirb"] = rub(t["toi"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], nenpyo=m["nenpyo"], missions=[], list=out)
    (ROOT / "tetsugaku").mkdir(exist_ok=True)
    (ROOT / "tetsugaku/terms.js").write_text("/* tools/tetsugaku/terms-*.json から tools/tetsugaku/terms_js.py が 作る。手で 直さない */\nconst TETSUGAKU_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("tetsugaku/terms.js", len(out), "語", (ROOT / "tetsugaku/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
