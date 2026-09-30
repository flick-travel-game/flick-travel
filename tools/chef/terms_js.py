#!/usr/bin/env python3
"""tools/chef/meta.json + tools/chef/terms-<旅>.json → data/chef.json(1か所に まとめた もの)と chef/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が chef/ を 作るときに 呼ぶ。data/chef.json と chef/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/chef/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/chef/terms_js.py --check  # 確かめるだけ
決まりは tools/chef/PROMPT.md。もとは tools/kyoshi/terms_js.py(教師を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 調理師試験の 6科目(tools/chef/PROMPT.md)
SUBJECTS = ("公衆衛生学", "食品学", "栄養学", "食品衛生学", "調理理論", "食文化概論")
# ✅ パティシエ・からだ旅行・看護師 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 料理人の 8つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める
#   ① 会社・お店・商品・蔵元の 名前(商標)  ② ⚠️⚠️ 小学生も あそぶので こわがらせる 書きかた(「殺菌」は 衛生の ことばなので よい)
#   ③ レシピの 単位(g・大さじ・小さじ・cc)・言いきり・シリーズで 使わない 字
BAN = ["味の素", "キッコーマン", "ヤマサ", "ミツカン", "獺祭", "ドンペリ", "モエ", "ジョニーウォーカー", "サントリー", "アサヒ", "キリン", "サッポロ", "ヱビス",
       "死亡", "死ぬ", "死に至", "亡くなっ", "命を落と", "命に かかわ", "命にかかわ", "中毒死", "自殺", "遺体", "むごい", "血まみれ", "地獄",
       "大さじ", "小さじ", "カップ1", "cc", "一気飲み", "酔っぱら", "やせる", "病気が 治る", "絶対に",
       "100マス", "百ます"]
BAN_RE = [re.compile(r"(?<!殺菌)(?<!殺虫)殺(?!菌|虫)"), re.compile(r"\d+ ?(g|グラム|ml|mL|ミリリットル)")]
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 6つの 科目の どれか")
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
        sys.exit("料理人の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("料理人の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/chef.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 料理人の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師と 同じ)
    #   ほかは 2026-09-30 に 560語の ふりがなを ぜんぶ 見て 見つけた もの(乾物・田楽・白髪ねぎ・飲茶・花椒・栗ごはん・種・うるち米 …)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"<ruby>乾物<rt>ひもの</rt></ruby>", "<ruby>乾物<rt>かんぶつ</rt></ruby>"),
           R(r"<ruby>田楽<rt>たらが</rt></ruby>", "<ruby>田楽<rt>でんがく</rt></ruby>"),
           R(r"<ruby>白髪<rt>はくはつ</rt></ruby>", "<ruby>白髪<rt>しらが</rt></ruby>"),
           R(r"<ruby>生肉<rt>せいにく</rt></ruby>", "<ruby>生肉<rt>なまにく</rt></ruby>"),
           R(r"<ruby>栗<rt>りつ</rt></ruby>", "<ruby>栗<rt>くり</rt></ruby>"),
           R(r"<ruby>飲茶<rt>いんさ</rt></ruby>", "<ruby>飲茶<rt>やむちゃ</rt></ruby>"),
           R(r"<ruby>花椒<rt>ふぁーちう</rt></ruby>", "<ruby>花椒<rt>ほあじゃお</rt></ruby>"),
           R(r"<ruby>辛<rt>つら</rt></ruby>さ", "<ruby>辛<rt>から</rt></ruby>さ"),
           R(r"しょうぶ<ruby>湯<rt>とう</rt></ruby>", "しょうぶ<ruby>湯<rt>ゆ</rt></ruby>"),
           R(r"<ruby>原<rt>はら</rt></ruby><ruby>材料<rt>ざいりょう</rt></ruby>", "<ruby>原材料<rt>げんざいりょう</rt></ruby>"),
           R(r"<ruby>種<rt>しゅ</rt></ruby>", "<ruby>種<rt>たね</rt></ruby>"),
           R(r"(うるち|もち)<ruby>米<rt>まい</rt></ruby>", r"\1<ruby>米<rt>ごめ</rt></ruby>"),
           R(r"卵・<ruby>乳<rt>ちち</rt></ruby>", "卵・<ruby>乳<rt>にゅう</rt></ruby>"),
           R(r"7<ruby>日間<rt>かかん</rt></ruby>", "<ruby>7日間<rt>なのかかん</rt></ruby>")]
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
    (ROOT / "chef").mkdir(exist_ok=True)
    (ROOT / "chef/terms.js").write_text("/* tools/chef/terms-*.json から tools/chef/terms_js.py が 作る。手で 直さない */\nconst CHEF_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("chef/terms.js", len(out), "語", (ROOT / "chef/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
