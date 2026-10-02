#!/usr/bin/env python3
"""tools/toshika/meta.json + tools/toshika/terms-<旅>.json → data/toshika.json(1か所に まとめた もの)と toshika/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が toshika/ を 作るときに 呼ぶ。data/toshika.json と toshika/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/toshika/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/toshika/terms_js.py --check  # 確かめるだけ
決まりは tools/toshika/PROMPT.md。もとは tools/adler/terms_js.py(アドラー心理学を 写した。数字の 止めかたは 税理士と 同じ)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(資格の 科目に 合わせず ゲームの 中で 決めた 7つ。tools/toshika/PROMPT.md)
SUBJECTS = ("投資のきほん", "企業分析", "財務・決算", "市場と制度", "長期投資", "行動ファイナンス", "歴史")
# ✅ 株式旅行・税理士 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 投資家の 7つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/toshika/PROMPT.md の 1〜5)
#   ① 投資・銘柄の すすめ・売り買いの 時期・「必ず もうかる」・相談の 答えに なる 言いかた(金融商品取引法の 投資助言に ならない ように)
#   ② ⚠️⚠️ 小学生も あそぶ: 借金・破産・倒産・暴落・こわい ことば・ギャンブルの かおり
#   ③ 実在の 会社・竹田和平さんの 会社や 商品の 名前・生きている 投資家の 名前
#   ④ 株価・利回り・税率・金額・割合・倍率の 数字(毎年 変わる)・条の 番号
BAN = ["もうかる", "儲か", "儲け", "必ず", "かならず 上が", "絶対に", "買い時", "売り時", "買うと よい", "買うとよい", "買うと いい", "買うといい",
       "損しない", "損を しない", "損をしない", "勝てる", "勝ち方", "おすすめの 銘柄", "おすすめ銘柄", "推奨", "狙い目", "ねらい目", "急騰", "爆上げ", "一攫千金", "億り人",
       "あなたの場合", "あなたの 場合", "この条件なら", "この 条件なら",
       "借金", "破産", "倒産", "大損", "暴落", "崩壊", "パニック", "夜逃げ", "ギャンブル", "賭け", "賭博", "ガチャ", "くじ",
       "自殺", "死亡", "死ぬ", "死に", "亡くなっ", "他界", "命を落と", "地獄", "血", "殺", "銃", "逮捕", "懲役", "刑務所",
       "竹田製菓", "竹田本社", "タマゴボーロ", "純金", "クリーク",
       "バフェット", "ソロス", "シラー", "セイラー", "ファーマ", "ダリオ", "ピーター・リンチ", "孫正義",
       "トヨタ", "ソニー", "任天堂", "アップル", "グーグル", "アマゾン", "マイクロソフト", "テスラ", "エヌビディア", "ユニクロ", "野村", "大和証券", "SBI", "楽天",
       "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|億円|倍)"), re.compile(r"(十|百|千|万|億)円"), re.compile(r"[一二三四五六七八九十]倍"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 株価・利回り・税率・金額・倍率・条の 番号は 書かない
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 7つの 分野の どれか")
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
        sys.exit("投資家の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("投資家の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/toshika.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 投資家の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 投資家の 説明で 見つけた 読みまちがい(2026-10-02。全語の ふりがなを 1つずつ 見た)
           R(r"<ruby>実<rt>じつ</rt></ruby>(?=[をが])", "<ruby>実<rt>み</rt></ruby>"),        # 実を 結ぶ / 実が なる
           R(r"<ruby>種<rt>しゅ</rt></ruby>(?=を)", "<ruby>種<rt>たね</rt></ruby>"),          # 種を まく
           R(r"<ruby>公<rt>こう</rt></ruby>(?=に)", "<ruby>公<rt>おおやけ</rt></ruby>"),      # 公に
           R(r"<ruby>丈夫<rt>じょうふ</rt></ruby>", "<ruby>丈夫<rt>じょうぶ</rt></ruby>"),
           R(r"<ruby>智<rt>さとし</rt></ruby>", "<ruby>智<rt>ち</rt></ruby>"),               # 智徳(ちとく)
           R(r"<ruby>割<rt>わり</rt></ruby><ruby>引率<rt>いんそつ</rt></ruby>", "<ruby>割引率<rt>わりびきりつ</rt></ruby>"),
           R(r"<ruby>立<rt>たて</rt></ruby><ruby>会場<rt>かいじょう</rt></ruby>", "<ruby>立会場<rt>たちあいじょう</rt></ruby>"),
           R(r"お<ruby>金<rt>きん</rt></ruby>", "お<ruby>金<rt>かね</rt></ruby>"),
           R(r"むかい<ruby>風<rt>ふう</rt></ruby>", "むかい<ruby>風<rt>かぜ</rt></ruby>")]
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
    (ROOT / "toshika").mkdir(exist_ok=True)
    (ROOT / "toshika/terms.js").write_text("/* tools/toshika/terms-*.json から tools/toshika/terms_js.py が 作る。手で 直さない */\nconst TOSHIKA_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("toshika/terms.js", len(out), "語", (ROOT / "toshika/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
