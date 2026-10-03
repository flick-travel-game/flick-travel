#!/usr/bin/env python3
"""tools/kaji/meta.json + tools/kaji/terms-<旅>.json → data/kaji.json(1か所に まとめた もの)と kaji/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が kaji/ を 作るときに 呼ぶ。data/kaji.json と kaji/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/kaji/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/kaji/terms_js.py --check  # 確かめるだけ
決まりは tools/kaji/PROMPT.md。もとは tools/hanaya/terms_js.py(花屋を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野 = 家庭科の 分け(中学校学習指導要領 技術・家庭 家庭分野 の「A 家族・家庭生活 / B 衣食住の生活 / C 消費生活・環境」の B を 食・衣・住に 分け、保育を 足した。tools/kaji/PROMPT.md)
SUBJECTS = ("家族・家庭", "保育", "食生活", "衣生活", "住生活", "消費生活・環境")
# ✅ 料理人・保育士・救急隊員・看護師・パティシエ・税理士 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 家事の 10の 旅の 中だけ
# ⚠️ 名前・説明・ありがとう・お手伝いに 出さない ことば。見つけたら 止める(tools/kaji/PROMPT.md)
#   ① ⚠️⚠️ 小学生も あそぶ: 死・殺・血・命・重い 病気(けがや 事故を ふせぐ 話は おだやかに よい)
#   ② ⚠️⚠️ 責める・比べる・決めつける ことば(子ども・お父さん・ほかの 家族を 責めない。「家事は 女の人の 仕事」と 書かない。感謝を 押しつけない)
#   ③ 洗剤を 混ぜる 化学の 中身(「混ぜるな危険」= いっしょに 使わない まで)
#   ④ 実在の 商品・家電・お店・会社の 名前
#   ⑤ 値段・時間・温度・%・年収の 換算(公式の 番号 #8000・119・171・#7119 は よい)
BAN = ["死", "殺", "血", "命", "重い 病気", "重い病気", "亡く", "こわい", "恐ろしい", "地獄", "かわいそう",
       "しない 子", "しない子", "困らせ", "だめ", "ダメ", "なまけ", "わがまま", "怒られ", "叱られ", "悪い 子", "悪い子",
       "感謝しなさい", "感謝 しなさい", "感謝すべき", "感謝 すべき", "しなければ ならない 子", "お父さんは 何も", "何も しない",
       "女の 仕事", "女の人の 仕事", "女の 人の 仕事", "女性の 仕事", "女性の役目", "女の 役目", "母親の 役目", "母親の役目", "母親なら",
       "お母さんが いない", "お母さんの いない", "ひとりぼっち",
       "塩素ガス", "有毒", "毒", "酸性と 塩素", "反応して",
       "ルンバ", "アタック", "ボールド", "アリエール", "ハミング", "レノア", "マジックリン", "キッチンハイター", "カビキラー", "ジョイ", "キュキュット",
       "パナソニック", "日立", "シャープ", "ダイソン", "イオン", "西友", "セブン", "ローソン", "ファミリーマート", "ユニクロ", "無印良品", "ダイソー", "ニトリ", "アマゾン", "楽天", "メルカリ", "タッパー", "サランラップ", "クレラップ", "ジップロック",
       "年収", "絶対に", "ぜったいに"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|倍|kg|キロ|グラム|度|℃|分間|時間|か月|ヶ月|カ月|週間|年分)"),
          re.compile(r"\d+ ?時(?!代)"), re.compile(r"(十|百|千|万|億)円")]  # 値段・時間・温度・割合は 書かない(「1日」「1週間」「#8000」は よい)
OK_WORDS = ["1週間", "1日", "食中毒", "消毒", "生命保険", "一生懸命"]  # 「毒」「命」を 止める 前に のぞく
KIDS_NG = ["包丁", "火を", "火で", "火に", "コンロ", "ガス", "漂白剤", "アイロン", "刃物", "ナイフ", "熱湯", "熱い お湯", "混ぜ", "脚立", "高い ところ", "電球", "コンセント", "薬"]  # 🙋 お手伝いは 子ども 1人で 安全な ことだけ
TONE_NG = ["しない", "困らせ", "だめ", "ダメ", "しなさい", "べき"]  # 💐 ありがとうは 責めない・押しつけない
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 6つの 分野(家庭科の 分け)の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        extra = ""
        for k, lab, ng in (("arigato", "💐 ありがとう", TONE_NG), ("otetsudai", "🙋 お手伝い", KIDS_NG)):
            v = t.get(k)
            if v is None: continue
            if not (isinstance(v, str) and 4 <= len(v) <= 60): errs.append(f"{tid}: {k} は 1文(60字まで)"); continue
            for w in ng:
                if w in v: errs.append(f"{tid}: {lab} に「{w}」は 使わない")
            extra += v
            cnt.setdefault((t.get("journey"), k), 0); cnt[(t.get("journey"), k)] += 1
        if len(t.get("description", "")) > 130: errs.append(f"{tid}: 説明が 長い({len(t['description'])}字。130字まで)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + extra
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
        for k, lab in (("arigato", "💐 ありがとう"), ("otetsudai", "🙋 お手伝い")):
            n = cnt.get((J, k), 0)
            if not 3 <= n <= 5: errs.append(f"{J}: {lab} は 1旅に 3〜5語(いま {n})")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("家事の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("家事の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/kaji.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 家事の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 家事の 説明で 見つけた 読みまちがい(ここに 足す)
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
        if t.get("arigato"): o["ag"] = rub(t["arigato"])
        if t.get("otetsudai"): o["ot"] = rub(t["otetsudai"])
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "kaji").mkdir(exist_ok=True)
    (ROOT / "kaji/terms.js").write_text("/* tools/kaji/terms-*.json から tools/kaji/terms_js.py が 作る。手で 直さない */\nconst KAJI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kaji/terms.js", len(out), "語", (ROOT / "kaji/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
