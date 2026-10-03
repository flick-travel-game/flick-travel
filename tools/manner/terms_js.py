#!/usr/bin/env python3
"""tools/manner/meta.json + tools/manner/terms-<旅>.json → data/manner.json(1か所に まとめた もの)と manner/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が manner/ を 作るときに 呼ぶ。data/manner.json と manner/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/manner/terms_js.py               # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/manner/terms_js.py --check       # 確かめるだけ
    python3 tools/manner/terms_js.py --only kihon  # 1つの 旅だけ 確かめる
決まりは tools/manner/PROMPT.md。もとは 家事の terms_js.py(💐 ありがとう・🙋 お手伝い の かわりに 💡 なぜ そうするの? = naze)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野 = 秘書検定・ビジネス実務マナー検定・マナー・プロトコール検定の 分けを もとに した めやす(tools/manner/PROMPT.md)
SUBJECTS = ("立ち居振る舞い", "ことばづかい", "食事の作法", "訪問と接遇", "ビジネス実務", "社会生活", "冠婚葬祭・贈答", "国際儀礼")
# ✅ 国語旅行の 敬語・家事の 行事・英会話 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30)。読みが かぶらないのは マナーの 10の 旅の 中だけ
# ⚠️ 名前・説明・なぜ・たとえに 出さない ことば。見つけたら 止める(tools/manner/PROMPT.md)。空白を ぬいて くらべる
#   ① ⚠️⚠️ 小学生も あそぶ: 死・亡・殺・血(お悔やみの 旅は「しのぶ」「お別れ」「故人」)
#   ② ⚠️⚠️ 人を 責める・はずかしめる ことば(「失礼します」の あいさつは よい)
#   ③ 決めつけ・押しつけ(すべき・しなさい・ぜったい)・性別の 役わりの 決めつけ
#   ④ 実在の お店・ホテル・ブランド・サービスの 名前
#   ⑤ 金額・割合・角度・回数・分(名前に 入る 一汁三菜・還暦・四十九日 などは よい)
BAN = ["死", "亡", "殺", "血", "失礼", "非常識", "はずかしい", "恥ずかしい", "恥を", "NG", "ＮＧ", "マナー違反", "違反", "失格", "常識がない", "常識のない", "無作法", "みっともない", "だらしない",
       "こわい", "恐ろしい", "地獄", "かわいそう", "ばちが", "罰が", "たたり", "縁起が悪い",
       "すべき", "べきです", "べきだ", "しなさい", "しなければならない", "なければなりません", "ぜったい", "絶対",
       "女性が", "男性が", "女の人が", "男の人が", "女性は", "男性は", "女らしい", "男らしい", "女性の役", "男性の役",
       "帝国ホテル", "ホテルオークラ", "リッツ", "マリオット", "ヒルトン", "スターバックス", "マクドナルド", "エルメス", "ティファニー", "LINE", "インスタグラム", "Instagram", "ツイッター", "Twitter", "フェイスブック", "Facebook", "ズーム", "Zoom", "ティックトック", "TikTok"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|倍|ドル|度|°|回|コール|分前|分後|分以内|分ほど|秒)"),
          re.compile(r"(十|百|千|万|億)円"), re.compile(r"[一二三四五六七八九十]+(回|コール|度の|分前)")]
OK_WORDS = ["失礼します", "失礼いたします", "失礼しました", "お先に失礼", "故人"]  # あいさつの ことばとしての「失礼します」は よい
TONE_NG = ["しない人", "できない人", "知らない人", "だめ", "ダメ", "しなさい", "べき"]  # 💡 なぜ は 責めない・押しつけない
NAZE_MIN, NAZE_MAX = 5, 10  # 💡 なぜ は 1旅に 5〜10語
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
    ids = {}; readings = {}; per = {}; cnt = {}
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
        extra = ""
        for k, lab, ng in (("naze", "💡 なぜ", TONE_NG),):
            v = t.get(k)
            if v is None: continue
            if not (isinstance(v, str) and 4 <= len(v) <= 70): errs.append(f"{tid}: {k} は 1文(70字まで)"); continue
            for w in ng:
                if w in v: errs.append(f"{tid}: {lab} に「{w}」は 使わない")
            extra += v
            cnt.setdefault((t.get("journey"), k), 0); cnt[(t.get("journey"), k)] += 1
        if len(t.get("description", "")) > 130: errs.append(f"{tid}: 説明が 長い({len(t['description'])}字。130字まで)")
        txt = (t.get("name", "") + t.get("description", "") + t.get("example", "") + extra).replace(" ", "").replace("　", "")
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
    for J in js:
        if not any(j == J for (j, _) in per): continue
        n = cnt.get((J, "naze"), 0)
        if not NAZE_MIN <= n <= NAZE_MAX: errs.append(f"{J}: 💡 なぜ は 1旅に {NAZE_MIN}〜{NAZE_MAX}語(いま {n})")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("マナーの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("マナーの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/manner.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを マナーの ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # マナーの 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>〆<rt>きごう</rt></ruby>", "<ruby>〆<rt>しめ</rt></ruby>"),
           R(r"<ruby>二十四<rt>にじゅうよん</rt></ruby>", "<ruby>二十四<rt>にじゅうし</rt></ruby>"),
           R(r"<ruby>横木<rt>おうぼく</rt></ruby>", "<ruby>横木<rt>よこぎ</rt></ruby>"),
           R(r"<ruby>真<rt>まこと</rt></ruby>", "<ruby>真<rt>しん</rt></ruby>"),
           R(r"<ruby>芳<rt>かおる</rt></ruby>", "<ruby>芳<rt>ほう</rt></ruby>"),
           R(r"<ruby>館<rt>やかた</rt></ruby>", "<ruby>館<rt>かん</rt></ruby>"),
           R(r"<ruby>殿<rt>との</rt></ruby>", "<ruby>殿<rt>どの</rt></ruby>"),
           R(r"<ruby>三<rt>さん</rt></ruby><ruby>品<rt>ひん</rt></ruby>", "<ruby>三品<rt>さんぴん</rt></ruby>"),
           R(r"<ruby>明日<rt>あす</rt></ruby>", "<ruby>明日<rt>あした</rt></ruby>"),
           R(r"<ruby>床<rt>とこ</rt></ruby>(?=や)", "<ruby>床<rt>ゆか</rt></ruby>"),
           R(r"<ruby>大<rt>だい</rt></ruby><ruby>掃除<rt>そうじ</rt></ruby>", "<ruby>大掃除<rt>おおそうじ</rt></ruby>"),
           R(r"<ruby>排水<rt>はいすい</rt></ruby><ruby>口<rt>くち</rt></ruby>", "<ruby>排水口<rt>はいすいこう</rt></ruby>"),
           R(r"(?<![一-龥>])<ruby>箱<rt>ばこ</rt></ruby>", "<ruby>箱<rt>はこ</rt></ruby>"),
           R(r"(?<![\d一-龥>])<ruby>年<rt>ねん</rt></ruby>(?=[のをが])", "<ruby>年<rt>とし</rt></ruby>"),
           R(r"(?<![\d月])1<ruby>日<rt>ひ</rt></ruby>", "<ruby>1日<rt>いちにち</rt></ruby>"),
           R(r"<ruby>七五三<rt>ななごさん</rt></ruby>", "<ruby>七五三<rt>しちごさん</rt></ruby>"),
           R(r"<ruby>待<rt>まち</rt></ruby><ruby>降<rt>こう</rt></ruby><ruby>節<rt>せつ</rt></ruby>", "<ruby>待降節<rt>たいこうせつ</rt></ruby>"),
           R(r"<ruby>二十四<rt>にじゅうよん</rt></ruby><ruby>節気<rt>せっき</rt></ruby>", "<ruby>二十四節気<rt>にじゅうしせっき</rt></ruby>"),
           R(r"<ruby>干支<rt>かんし</rt></ruby>", "<ruby>干支<rt>えと</rt></ruby>"),
           R(r"<ruby>避難<rt>ひなん</rt></ruby><ruby>所<rt>しょ</rt></ruby>", "<ruby>避難所<rt>ひなんじょ</rt></ruby>"),
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
        if t.get("naze"): o["nz"] = rub(t["naze"])
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "manner").mkdir(exist_ok=True)
    (ROOT / "manner/terms.js").write_text("/* tools/manner/terms-*.json から tools/manner/terms_js.py が 作る。手で 直さない */\nconst MANNER_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("manner/terms.js", len(out), "語", (ROOT / "manner/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
