#!/usr/bin/env python3
"""tools/hanaya/meta.json + tools/hanaya/terms-<旅>.json → data/hanaya.json(1か所に まとめた もの)と hanaya/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が hanaya/ を 作るときに 呼ぶ。data/hanaya.json と hanaya/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/hanaya/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/hanaya/terms_js.py --check  # 確かめるだけ
決まりは tools/hanaya/PROMPT.md。もとは tools/noka/terms_js.py(農家を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(はじめの 5つは フラワー装飾技能士の 学科の 科目の 名前 = 厚生労働省の 試験科目の 表で 2026-10-03 に 確かめた。のこりは お店の 経営の 分け。tools/hanaya/PROMPT.md)
SUBJECTS = ("植物一般", "材料", "フラワー装飾一般", "フラワー装飾作業法", "安全衛生",
            "接客と販売", "仕入れと在庫", "開業", "お金の計算", "集客", "人", "税と帳簿")
# ✅ 農家・理科・パティシエ・税理士 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 花屋の 11の 旅の 中だけ(同じ 花を 2回 入れない ため にも なる)
# ⚠️ 名前・説明・花言葉に 出さない ことば。見つけたら 止める(tools/hanaya/PROMPT.md)
#   ① ⚠️⚠️ 小学生も あそぶ: 死・殺・血・呪・憎・葬・弔・けが・事故・こわい ことば(お供えの 花は「大切な 人を しのぶ」)
#   ② こわい・悲しい 花言葉(裏切り・絶望・嫉妬・別れ・悲しみ・復讐 など。明るい ほうだけ 書く)
#   ③ 毒の 中身(「口に 入れない ように 気を つける 花です。」の 1文だけ)・刃物の 手順・火を 使う 水あげ・薬品の 名前
#   ④ 実在の 花屋・花の 宅配・資材の 会社・商標(オアシス は 吸水スポンジ / フローラルフォーム と 書く)
#   ⑤ 値段・日持ちの 日数・%・金額・税率(経営の 旅も 考えかただけ)・「もうかる」「かならず 成功」
BAN = ["死", "殺", "血", "呪", "憎", "葬", "弔", "命に かかわ", "命にかかわ", "けがを", "けがの", "けがに", "怪我", "ケガ", "事故", "こわい", "恐ろしい", "地獄", "不吉", "縁起が 悪",
       "裏切", "絶望", "嫉妬", "やきもち", "別れ", "悲しみ", "悲哀", "復讐", "失恋", "孤独", "軽蔑", "不信", "冷たい 心",
       "毒", "持ちかた", "刃の 向き", "焼き", "火で あぶ", "漂白剤", "塩素", "ミョウバン",
       "日比谷花壇", "青山フラワーマーケット", "イーフローラ", "花キューピット", "フラワーネット", "オアシス", "スミザーズ", "アートフラワー協会",
       "もうか", "儲か", "必ず 成功", "かならず 成功", "ぜったい 成功", "絶対 成功",
       "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|倍|kg|キロ|トン|グラム|ヘクタール|ha|アール|坪|か月|ヶ月|カ月|週間|時間)"),
          re.compile(r"\d+ ?日(?!曜)"), re.compile(r"(十|百|千|万|億)円"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 値段・日持ち・割合・条の 番号は 書かない(母の日 = 5月の 第2日曜日 は よい)
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
        hk = t.get("hanakotoba")
        if hk is not None:
            if not (isinstance(hk, list) and 1 <= len(hk) <= 3 and all(isinstance(x, str) and 1 <= len(x) <= 20 and not re.search(r"[「」『』\s]", x) for x in hk)):
                errs.append(f"{tid}: hanakotoba は 1〜3この 配列(1つ 20字まで・「」や 空白なし)")
            elif not all(x in t.get("description", "") for x in hk[:2]): errs.append(f"{tid}: 説明の さいごに「花言葉は「{hk[0]}」…です。」を 入れる")
        lim = 150 if hk else 130
        if len(t.get("description", "")) > lim: errs.append(f"{tid}: 説明が 長い({len(t['description'])}字。{lim}字まで)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + "".join(hk or [])
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
        sys.exit("花屋の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("花屋の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/hanaya.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 花屋の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 花屋の 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>鉢花<rt>はちはな</rt></ruby>", "<ruby>鉢花<rt>はちばな</rt></ruby>"),
           R(r"<ruby>丈夫<rt>じょうふ</rt></ruby>", "<ruby>丈夫<rt>じょうぶ</rt></ruby>"),
           R(r"<ruby>正義<rt>まさよし</rt></ruby>", "<ruby>正義<rt>せいぎ</rt></ruby>"),                 # 花言葉の「正義」(人の 名前では ない)
           R(r"<ruby>札<rt>さつ</rt></ruby>", "<ruby>札<rt>ふだ</rt></ruby>"),                         # 値札の 札(ふだ)
           R(r"<ruby>房<rt>ぼう</rt></ruby>", "<ruby>房<rt>ふさ</rt></ruby>"),                         # 花の 房(ふさ)
           R(r"<ruby>種<rt>しゅ</rt></ruby>(?=から|を|が|に|も)", "<ruby>種<rt>たね</rt></ruby>"),      # 1字の 種(たね)。学名の「種の 名前」(しゅ)は そのまま
           R(r"(<ruby>装飾<rt>そうしょく</rt></ruby>)<ruby>花<rt>げ</rt></ruby>", r"\1<ruby>花<rt>か</rt></ruby>"),  # 装飾花(そうしょくか)
           R(r"<ruby>何<rt>なに</rt></ruby>(?=<ruby>重)", "<ruby>何<rt>なん</rt></ruby>"),              # 何重(なんじゅう)
           R(r"<ruby>年<rt>ねん</rt></ruby>(?=の <ruby>暮|れい)", "<ruby>年<rt>とし</rt></ruby>"),       # 年の 暮れ・年れい(とし)
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
        if t.get("hanakotoba"): o["hk"] = t["hanakotoba"]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "hanaya").mkdir(exist_ok=True)
    (ROOT / "hanaya/terms.js").write_text("/* tools/hanaya/terms-*.json から tools/hanaya/terms_js.py が 作る。手で 直さない */\nconst HANAYA_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("hanaya/terms.js", len(out), "語", (ROOT / "hanaya/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
