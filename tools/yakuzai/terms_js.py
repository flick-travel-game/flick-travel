#!/usr/bin/env python3
"""tools/yakuzai/meta.json + tools/yakuzai/terms-<旅>.json → data/yakuzai.json(1か所に まとめた もの)と yakuzai/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が yakuzai/ を 作るときに 呼ぶ。data/yakuzai.json と yakuzai/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/yakuzai/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/yakuzai/terms_js.py --check  # 確かめるだけ
決まりは tools/yakuzai/PROMPT.md。もとは tools/noka/terms_js.py(農家)と tools/ishi/terms_js.py(医師)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野 = 薬剤師国家試験の 科目(7つ。tools/yakuzai/PROMPT.md・exam.txt)
SUBJECTS = ("物理・化学・生物", "衛生", "薬理", "薬剤", "病態・薬物治療", "法規・制度・倫理", "実務")
# ✅ 医師・看護師・からだ旅行・理科・救急隊員・家事 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 薬剤師の 9つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/yakuzai/PROMPT.md)
#   ① 薬の 量・飲む 回数・最大量(mg・錠・回 など の 数字)・「この しょうじょうなら この 薬」
#   ② 薬の 商品名・製薬会社・薬局チェーンの 名前
#   ③ ⚠️⚠️ 小学生も あそぶ: 死・殺・致死・過量・中毒の ようす・乱用薬物の 名前
#   ④ 年ごとに 変わる 数字(薬価・合格率・人数・%・円)
BAN = ["ロキソニン", "バファリン", "カロナール", "タイレノール", "ボルタレン", "パブロン", "ベンザブロック", "コンタック", "ガスター", "セデス", "ノーシン",
       "正露丸", "オロナイン", "キャベジン", "太田胃散", "パンシロン", "ビオフェルミン", "リポビタン", "ユンケル", "アリナミン", "アレグラ", "クラリチン",
       "タミフル", "リレンザ", "イナビル", "ゾフルーザ", "ムヒ", "マキロン", "メンソレータム", "バイエル", "オキシドール",
       "武田薬品", "第一三共", "アステラス", "塩野義", "シオノギ", "エーザイ", "大塚製薬", "中外製薬", "ファイザー", "ノバルティス", "大正製薬", "ロート製薬", "小林製薬", "久光",
       "マツモトキヨシ", "ウエルシア", "ツルハ", "スギ薬局", "サンドラッグ", "ココカラ", "日本調剤", "アイン薬局", "クオール",
       "死", "殺", "致死", "過量", "過剰摂取", "オーバードーズ", "中毒症状", "中毒の 症状", "苦しんで", "むごい", "血まみれ", "命を落と", "命に かかわ", "命にかかわ",
       "ヘロイン", "コカイン", "覚醒剤", "覚せい剤", "大麻", "シンナー", "MDMA", "LSD", "モルヒネ", "フェンタニル", "オキシコドン", "ハイになる", "気持ちよく なる",
       "mg", "ミリグラム", "mL", "ミリリットル", "マイクログラム", "最大量", "最大用量", "飲めば よい", "飲めばよい", "飲めば いい", "飲めば治", "飲むと 治",
       "治ります", "かならず治", "必ず治", "絶対に", "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|万円|万人|人|錠|回|包|滴|カプセル|mg|g|グラム|単位)"), re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|錠|包|滴)"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 薬の 量・回数・値段・人数・条の 番号は 書かない
OK_WORDS = ["年1回", "年に 1回", "年に1回"]  # 試験・制度の「年1回」は 薬の 回数では ない
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 7つの 科目の どれか")
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
        sys.exit("薬剤師の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("薬剤師の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/yakuzai.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 薬剤師の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 薬剤師の 説明で 見つけた 読みまちがい(ここに 足す)
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
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "yakuzai").mkdir(exist_ok=True)
    (ROOT / "yakuzai/terms.js").write_text("/* tools/yakuzai/terms-*.json から tools/yakuzai/terms_js.py が 作る。手で 直さない */\nconst YAKUZAI_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("yakuzai/terms.js", len(out), "語", (ROOT / "yakuzai/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
