#!/usr/bin/env python3
"""tools/anma/meta.json + tools/anma/terms-<旅>.json → data/anma.json(1か所に まとめた もの)と anma/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が anma/ を 作るときに 呼ぶ。data/anma.json と anma/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/anma/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/anma/terms_js.py --check  # 確かめるだけ
決まりは tools/anma/PROMPT.md。もとは tools/jui/terms_js.py(獣医師)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野 = あん摩マッサージ指圧師国家試験の 科目(tools/anma/exam.txt で 確かめた。臨床医学総論 と 各論は 1つに まとめた)
SUBJECTS = ("医療概論", "衛生学・公衆衛生学", "関係法規", "解剖学", "生理学", "病理学概論", "臨床医学", "リハビリテーション医学",
            "東洋医学概論", "経絡経穴概論", "あん摩マッサージ指圧理論", "東洋医学臨床論")
# からだの しるし(任意。どこの 話か。説明の 上に 小さな 札で 出す)。「首・肩」のように「・」で 3つまで
# ⚠️ ここに ある 部位だけ(tools/anma/PROMPT.md の 決まり。これ いがいの 部位は 書かない)
PART = ("首", "肩", "背中", "腰", "腕", "手", "脚", "足", "頭", "顔", "おなか", "全身")
# 経絡の しるし(任意。ツボ・経絡の 語に。14経脈)
MERIDIAN = ("肺経", "大腸経", "胃経", "脾経", "心経", "小腸経", "膀胱経", "腎経", "心包経", "三焦経", "胆経", "肝経", "督脈", "任脈")
# ✅ 医師・看護師・歯科医師・からだ図鑑 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは あん摩マッサージ指圧師の 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/anma/PROMPT.md)
#   ① ⭐⭐⭐ 医療の 国家資格の 話として だけ(お店・サロン・個室・オイル などの 字を 止める)
#   ② ⭐⭐ やりかたの 数字・強さ(kg・分・秒・回・「強く」)・「治る」
#   ③ こわい 字(血・骨折の ようす・手術・がん・死)
#   ④ 実在の 施術所・マッサージ機・オイル・サプリの 名前・年ごとに 変わる 数字
BAN = ["お店", "店員", "店舗", "サロン", "お客さん", "お客様", "客さん", "エステ", "個室", "密着", "オイル", "アロマ", "ベッドの 上", "裸", "下着", "服を ぬ", "服をぬ", "脱いで", "脱ぐ",
       "胸を ", "胸に ", "おしり", "お尻", "股", "太もも の 内", "内もも", "性的", "セクシー", "ホテル", "出張", "風俗", "リラクゼーション店", "癒やし", "癒し",
       "強く 押", "強く押", "強く もみ", "強くもみ", "強い 力", "思いきり", "力いっぱい", "治ります", "治る", "治す", "治せ", "治し", "かならず", "必ず", "絶対に", "効きます", "効く", "効果が ある", "効果がある",
       "痛い", "激痛", "ズキズキ", "ずきずき", "出血", "血が", "血まみれ", "骨が 折れ", "骨折", "脱臼", "手術", "死", "殺", "癌", "腫瘍", "悪性", "苦しむ", "こわい", "怖い",
       "命を落と", "命に かかわ", "命にかかわ", "マッサージ機", "マッサージチェア", "サプリ", "按摩", "指圧士", "あん摩師", "無資格", "もぐり", "あやしい", "危ない お店",
       "mg", "ミリグラム", "kg", "キロ", "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|万円|万人|人|錠|回|秒|分間|分|歳|才|℃|度|kg|キロ|g|グラム|週|か月|ヶ月|カ月|点)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|錠|秒|歳|才|回)"),
          re.compile(r"第[\d一二三四五六七八九十百]+条"),
          re.compile(r"(?:^|[\s、。(「のな])がん(?![ばじこ])")]  # こわい 病気は 入れない  # 強さ・時間・回数・年齢・値段・人数・条の 番号は 書かない
OK_WORDS = ["年1回", "年に 1回", "年に1回", "五十肩", "四十肩", "胸椎", "胸鎖乳突筋", "胸郭", "胸部", "胸骨", "大胸筋", "胸腺", "胸腔", "胸腹", "方針", "指針", "股関節", "骨折の 疑い", "骨折かも", "骨折が 疑われ",
            "3年以上", "3年", "頸椎7", "胸椎12", "腰椎5", "頸椎 7", "胸椎 12", "腰椎 5", "1日", "七情", "六淫"]  # 解剖の 語(胸椎・股関節)・禁忌の「骨折の 疑い」は よい
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
        pt = t.get("part")
        if pt is not None and (not isinstance(pt, str) or not pt or any(p not in PART for p in pt.split("・")) or len(pt.split("・")) > 3):
            errs.append(f"{tid}: part「{pt}」は {PART} の どれか(「・」で 3つまで)")
        mr = t.get("meridian")
        if mr is not None and mr not in MERIDIAN: errs.append(f"{tid}: meridian「{mr}」は {MERIDIAN} の どれか")
        for k in t:
            if k not in REQ + ("relatedTerms", "acceptedReadings", "part", "meridian", "example"): errs.append(f"{tid}: 知らない 欄「{k}」")
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
        sys.exit("あん摩マッサージ指圧師の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("あん摩マッサージ指圧師の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/anma.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを あん摩マッサージ指圧師の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # あん摩マッサージ指圧師の 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>施術([^<]*)<rt>しじゅつ", r"<ruby>施術\1<rt>せじゅつ"),  # 施術・施術所・施術者(せじゅつ。医療の 読み)
           R(r"<ruby>施<rt>し</rt></ruby><ruby>術", "<ruby>施<rt>せ</rt></ruby><ruby>術"),
           R(r"き<ruby>ゆう師<rt>ゅうし</rt></ruby>", "きゆう<ruby>師<rt>し</rt></ruby>"),  # 法律の 正式な 名前の「きゆう師」
           R(r"<ruby>経<rt>きょう</rt></ruby>", "<ruby>経<rt>けい</rt></ruby>"),  # 大腸経・膀胱経 など 経絡の「経」(けい)
           R(r"<ruby>心経<rt>しんぎょう</rt></ruby>", "<ruby>心経<rt>しんけい</rt></ruby>"),
           R(r"<ruby>心<rt>こころ</rt></ruby><ruby>包<rt>ぽう</rt></ruby>", "<ruby>心包<rt>しんぽう</rt></ruby>"),
           R(r"<ruby>合<rt>あわせ</rt></ruby>(<ruby>穴)", r"<ruby>合<rt>ごう</rt></ruby>\1"),
           R(r"(</ruby>)<ruby>穴<rt>あな</rt></ruby>", r"\1<ruby>穴<rt>けつ</rt></ruby>"),  # 兪穴・合穴・井穴 など ツボの「穴」(けつ)
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
        if t.get("part"): o["pt"] = t["part"]
        if t.get("meridian"): o["mr"] = t["meridian"]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "anma").mkdir(exist_ok=True)
    (ROOT / "anma/terms.js").write_text("/* tools/anma/terms-*.json から tools/anma/terms_js.py が 作る。手で 直さない */\nconst ANMA_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("anma/terms.js", len(out), "語", (ROOT / "anma/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
