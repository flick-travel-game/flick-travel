#!/usr/bin/env python3
"""フリックスーパーカー(けいくん 2026-10-21)。tools/supercar/meta.json + tools/supercar/terms-<旅>.json → data/supercar.json(1か所に まとめた もの)と supercar/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が supercar/ を 作るときに 呼ぶ。data/supercar.json と supercar/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/supercar/terms_js.py                       # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/supercar/terms_js.py --check               # 確かめるだけ
    python3 tools/supercar/terms_js.py --check --with-later  # 2回目の 40語(tools/supercar/later/)も 合わせて 確かめる(読みの かぶりを 先に 見る)
決まりは tools/supercar/PROMPT.md。もとは tools/cabin/terms_js.py(キャビンアテンダント)。国の 札は tools/soccer/terms_js.py を 写した"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(けいくん 2026-10-21「全部おすすめで」= 値段・事故・公道の スピードは 入れない)
BAN = ["事故", "死", "亡", "炎上", "燃え", "衝突", "クラッシュ", "大破", "けがを", "けがし", "怪我", "こわい", "怖い", "危険",  # 事故・こわい 話
       "公道", "飛ばす", "スピード違反", "暴走", "ゼロヨン", "違法", "峠",  # スピードを あおらない
       "万円", "億円", "米ドル", "ユーロ", "値段", "価格", "オークション", "お金持ち", "大金持ち", "富豪", "高価", "相場", "年収", "落札",  # お金の 話
       "戦争", "軍用", "戦闘機", "爆撃", "戦車", "兵器", "ナチ",  # 戦争の 話
       "世界最速", "最速の 車"]  # 順位は 変わる(テストコースの 記録は「◯年に ◯km/h を 出したと 発表」の 形で)
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ。けいくんの OK を もらって 書く)
# ふりがなの 直し(この ゲームだけ。はじめは パイロットの 直しを 写した。tools/make_ruby.py の FIX は ほかの ゲームにも 効くので さわらない)。{"まちがい": "正しい"}
RB_FIX = {
    # ↓ キャビンアテンダント・パイロットの 直しから 写した もの(ほかの ゲームと 同じ 読みまちがい)
    "<ruby>丈夫<rt>じょうふ</rt></ruby>": "<ruby>丈夫<rt>じょうぶ</rt></ruby>",
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
    "1<ruby>分<rt>ぶん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "1<ruby>分<rt>ふん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "<ruby>通<rt>かよ</rt></ruby>って": "<ruby>通<rt>とお</rt></ruby>って",
    "<ruby>東<rt>あずま</rt></ruby>": "<ruby>東<rt>ひがし</rt></ruby>",
    "<ruby>後<rt>ご</rt></ruby>から": "<ruby>後<rt>あと</rt></ruby>から",
    "<ruby>中<rt>なか</rt></ruby>くらい": "<ruby>中<rt>ちゅう</rt></ruby>くらい",
    "<ruby>数<rt>すう</rt></ruby>": "<ruby>数<rt>かず</rt></ruby>",
    # ↓ フリックスーパーカーの 読みまちがい(2026-10-21 に 990語 ぜんぶ 見なおした)
    "<ruby>万2100<rt>まんにいちれいれい</rt></ruby>": "<ruby>万<rt>まん</rt></ruby>2100",
    "<ruby>上り下<rt>のぼりお</rt></ruby>り": "<ruby>上り下<rt>のぼりくだ</rt></ruby>り",
    "<ruby>型式<rt>けいしき</rt></ruby>": "<ruby>型式<rt>かたしき</rt></ruby>",
    "<ruby>山道<rt>さんどう</rt></ruby>": "<ruby>山道<rt>やまみち</rt></ruby>",
    "<ruby>私<rt>わたくし</rt></ruby>を": "<ruby>私<rt>わたし</rt></ruby>を",
    "<ruby>童夢<rt>どうむ</rt></ruby> <ruby>零<rt>れい</rt></ruby>": "<ruby>童夢<rt>どうむ</rt></ruby> <ruby>零<rt>ぜろ</rt></ruby>",
    "2<ruby>人乗<rt>ひとの</rt></ruby>り": "<ruby>2人乗<rt>ふたりの</rt></ruby>り",
    "<ruby>日系<rt>にっけい</rt></ruby><ruby>人<rt>にん</rt></ruby>": "<ruby>日系人<rt>にっけいじん</rt></ruby>",
    "3つの <ruby>角<rt>かく</rt></ruby>": "3つの <ruby>角<rt>かど</rt></ruby>",
    "5<ruby>本<rt>ぽん</rt></ruby>": "5<ruby>本<rt>ほん</rt></ruby>",
    "<ruby>箱<rt>ばこ</rt></ruby>": "<ruby>箱<rt>はこ</rt></ruby>",
    "<ruby>何<rt>なに</rt></ruby>kg": "<ruby>何<rt>なん</rt></ruby>kg",
    "<ruby>何<rt>なに</rt></ruby><ruby>台": "<ruby>何<rt>なん</rt></ruby><ruby>台",
    "<ruby>何<rt>なに</rt></ruby><ruby>馬力": "<ruby>何<rt>なん</rt></ruby><ruby>馬力",
    "<ruby>何<rt>なに</rt></ruby><ruby>秒": "<ruby>何<rt>なん</rt></ruby><ruby>秒",
    "<ruby>何<rt>なに</rt></ruby><ruby>層": "<ruby>何<rt>なん</rt></ruby><ruby>層",
    "<ruby>何<rt>なに</rt></ruby><ruby>役": "<ruby>何<rt>なん</rt></ruby><ruby>役",
    "<ruby>何<rt>なに</rt></ruby><ruby>種類": "<ruby>何<rt>なん</rt></ruby><ruby>種類",
    "<ruby>何<rt>なに</rt></ruby><ruby>段": "<ruby>何<rt>なん</rt></ruby><ruby>段",
}
PRE = {"kihon": "ki-", "gijutsu": "gi-", "italia": "it-", "doitsu": "de-", "igirisu": "gb-", "sekai": "sk-", "nihon": "jp-", "hyper": "hy-", "densetsu": "dn-"}
FIELDS = {"メーカー", "車", "しくみ", "デザイン", "レース", "人", "歴史"}
# 国の 札(「・」で 3つまで)。⚠️ 会社の 国で 付ける(親会社の 国では ない)
COUNTRY = ("イタリア", "ドイツ", "イギリス", "フランス", "スウェーデン", "クロアチア", "オランダ", "デンマーク", "アメリカ", "日本",
           "オーストリア", "スイス", "スペイン", "ベルギー", "モナコ", "ニュージーランド", "アルゼンチン", "チェコ", "メキシコ", "ペルー", "オーストラリア", "中国", "韓国", "レバノン", "南アフリカ", "モロッコ", "世界")

def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        for f in [HERE / f"terms-{J['id']}.json"] + ([HERE / "later" / f"terms-{J['id']}.json"] if "--with-later" in sys.argv else []):
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
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        if t.get("field") not in FIELDS: errs.append(f"{tid}: field「{t.get('field')}」は {sorted(FIELDS)} の どれか")
        co = t.get("country")
        if co is not None and (not isinstance(co, str) or not co or any(p not in COUNTRY for p in co.split("・")) or len(co.split("・")) > 3):
            errs.append(f"{tid}: country「{co}」は {COUNTRY} の どれか(「・」で 3つまで)")
        mk = t.get("maker")
        if mk is not None and (not isinstance(mk, str) or not mk or len(mk) > 20): errs.append(f"{tid}: maker は 20字までの 名前")
        yr = t.get("year")
        if yr is not None and (not isinstance(yr, int) or not 1880 <= yr <= 2026): errs.append(f"{tid}: year は 発表の 年(1880〜2026 の 数)")
        if t.get("ei") and not re.fullmatch(r"[A-Za-z0-9 ,.'?!&/()\-]+", t["ei"]): errs.append(f"{tid}: ei は 英字の つづり だけ(アクセント記号は 外す)")
        if not str(tid).startswith(PRE.get(t.get("journey"), "?")): errs.append(f"{tid}: id の 頭は {PRE.get(t.get('journey'))}")
        for w in BAN:
            if w in BAN_OK.get(tid, []): continue
            if w in " / ".join([t.get("name", ""), t.get("description", ""), t.get("example", ""), t.get("maker", "")]): errs.append(f"{tid}: 「{w}」は 使わない")
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
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("スーパーカーの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("スーパーカーの ことば OK", len(d["terms"]), "語"); return
    if "--with-later" in sys.argv: sys.exit("--with-later は --check と いっしょに 使う(作るのは 1回目の ことばだけ)")
    (ROOT / "data/supercar.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    def rub(text):
        h = rub0(text)
        for a, b in RB_FIX.items(): h = h.replace(a, b)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("ei"): o["ei"] = t["ei"]  # 🔊 本当の つづり(Countach / Chiron)
        if t.get("country"): o["co"] = t["country"]  # 国の 札
        if t.get("maker"): o["mk"] = t["maker"]  # メーカーの 札(字だけ)
        if t.get("year"): o["y"] = t["year"]  # 発表した 年
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    js["source"] = m.get("source", "")
    (ROOT / "supercar").mkdir(exist_ok=True)
    (ROOT / "supercar/terms.js").write_text("/* tools/supercar/terms-*.json から tools/supercar/terms_js.py が 作る。手で 直さない */\nconst SUPERCAR_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("supercar/terms.js", len(out), "語", (ROOT / "supercar/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
