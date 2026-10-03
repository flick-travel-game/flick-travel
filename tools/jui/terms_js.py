#!/usr/bin/env python3
"""tools/jui/meta.json + tools/jui/terms-<旅>.json → data/jui.json(1か所に まとめた もの)と jui/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が jui/ を 作るときに 呼ぶ。data/jui.json と jui/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/jui/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/jui/terms_js.py --check  # 確かめるだけ
決まりは tools/jui/PROMPT.md。もとは tools/yakuzai/terms_js.py(薬剤師)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野 = 獣医師国家試験の 科目(tools/jui/PROMPT.md・exam.txt)
SUBJECTS = ("獣医療の基本(役割・倫理・法)", "構造と機能", "生殖と行動", "薬理作用と毒性", "病原体と寄生体", "病理・病態", "検査と診断", "治療と処置", "動物衛生と公衆衛生", "動物の飼育・衛生管理", "食品衛生", "人獣共通感染症", "環境衛生", "臨床(動物の病気)")
# (獣医師国家試験の 出題基準 令和7年度改正(第78回から)の 4つの カテゴリの 中の 項目を 14に まとめた もの)
# 動物の しるし(任意。説明の 上に 小さな 札で 出す)。「犬・猫」のように「・」で 2〜3つ つないで よい
ANIMALS = ("犬", "猫", "うさぎ", "ハムスター", "小鳥", "爬虫類", "魚", "牛", "豚", "鶏", "馬", "羊", "やぎ", "野生動物", "動物園の動物", "人と動物", "いろいろな動物")
# ✅ 医師・看護師・薬剤師・からだ旅行・理科・恐竜図鑑・農家 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 獣医師の 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/jui/PROMPT.md)
#   ① 薬の 量・治療の 手順・「この しょうじょうなら この 病気 / この 薬」・正常値・寿命・ワクチンの 回数や 時期の 数字
#   ② ⚠️⚠️ 動物の いのちの 終わりの 話(安楽死・殺処分・と畜)・死・苦しむ ようす・虐待
#   ③ 実在の ペットフード・動物の 薬・動物病院・動物園の 名前、有名な 動物の 個体名
#   ④ 年ごとに 変わる 数字(合格率・人数・%・円)
BAN = ["死", "殺", "安楽", "と畜", "屠", "解体", "処分", "寿命", "苦しんで", "苦しむ", "もがき", "むごい", "血まみれ", "命を落と", "命に かかわ", "命にかかわ",
       "虐待", "いじめ", "捨て", "動物実験", "実験動物",
       "ロイヤルカナン", "ヒルズ", "ピュリナ", "いなば", "ちゅ〜る", "ちゅーる", "モンプチ", "カルカン", "ペディグリー", "アイムス", "ニュートロ", "シーバ",
       "フロントライン", "ネクスガード", "レボリューション", "シンパリカ", "ブラベクト", "カルドメック", "ミルベマイシン", "イベルメクチン",
       "上野動物園", "旭山動物園", "円山動物園", "天王寺動物園", "東山動物園", "多摩動物公園", "美ら海", "海遊館", "鴨川シーワールド", "アドベンチャーワールド",
       "シャンシャン", "シャオシャオ", "レイレイ", "ハチ公",
       "mg", "ミリグラム", "mL", "ミリリットル", "飲ませれば", "飲ませると 治", "治ります", "かならず治", "必ず治", "絶対に", "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|万円|万人|人|錠|回|包|滴|歳|才|℃|度|頭|匹|羽|kg|キロ|mg|g|グラム|単位|週|か月|ヶ月|カ月)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|錠|包|滴|歳|才)"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 薬の 量・回数・年齢・体温・値段・人数・条の 番号は 書かない
OK_WORDS = ["年1回", "年に 1回", "年に1回", "年1回の", "4つの 胃", "4つの胃"]  # 試験・制度の「年1回」は 治療の 回数では ない
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
        an = t.get("animal")
        if an is not None and (not isinstance(an, str) or not an or any(p not in ANIMALS for p in an.split("・")) or len(an.split("・")) > 3):
            errs.append(f"{tid}: animal「{an}」は {ANIMALS} の どれか(「・」で 3つまで)")
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
        sys.exit("獣医師の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("獣医師の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/jui.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 獣医師の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 獣医師の 説明で 見つけた 読みまちがい(ここに 足す)
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
        if t.get("animal"): o["an"] = t["animal"]
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "jui").mkdir(exist_ok=True)
    (ROOT / "jui/terms.js").write_text("/* tools/jui/terms-*.json から tools/jui/terms_js.py が 作る。手で 直さない */\nconst JUI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("jui/terms.js", len(out), "語", (ROOT / "jui/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
