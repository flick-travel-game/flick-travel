#!/usr/bin/env python3
"""tools/kigyo/meta.json + tools/kigyo/terms-<旅>.json → data/kigyo.json(1か所に まとめた もの)と kigyo/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が kigyo/ を 作るときに 呼ぶ。data/kigyo.json と kigyo/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/kigyo/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/kigyo/terms_js.py --check  # 確かめるだけ
決まりは tools/kigyo/PROMPT.md。もとは tools/hanaya/terms_js.py(花屋を 写した。🍋 たとえば = tatoeba の 欄を 足した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野 = 中小企業診断士の 第1次試験の 7科目(2026-10-04 に 確かめた。最後は「中小企業経営・中小企業政策」を 短く した)。tools/kigyo/PROMPT.md
SUBJECTS = ("経済学・経済政策", "財務・会計", "企業経営理論", "運営管理", "経営法務", "経営情報システム", "中小企業経営・政策")
# ✅ 投資家・税理士・弁護士・花屋 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 起業家の 10の 旅の 中だけ
# ⚠️ 名前・説明・たとえに 出さない ことば。見つけたら 止める(tools/kigyo/PROMPT.md の 1〜7)
#   ① 「かならず 成功」「楽して もうかる」(子どもに まちがった 期待を させない・あやしい もうけ話と 見分けが つかなく なる)
#   ② 投資・借金の すすめ
#   ③ ⚠️⚠️ 小学生も あそぶ: 借金で こまる・破産・夜逃げ・死・こわい ことば・ギャンブルの かおり(「倒産」は name の「黒字倒産」だけ)
#   ④ 生きている 起業家・経営者の 名前・実在の 会社名
#   ⑤ 金額・割合・倍率の 数字・条の 番号・手続きの 期限
#   ⑥ 人を 上下で 見る 言いかた(部下・人を 使う・動かす)
#   ⑦「起業家」の 打ちまちがい「企業家」
BAN = ["もうかる", "儲か", "儲け", "もうけ話を", "必ず", "かならず 成功", "かならず もうか", "絶対", "ぜったい 成功", "必勝", "楽して", "らくして", "すぐ お金持ち", "お金持ちに なれる", "一攫千金", "億り人", "不労所得",
       "買うと よい", "買うとよい", "借りると よい", "借りるとよい", "投資すると よい", "投資すると いい", "おすすめの 銘柄", "推奨",
       "破産", "夜逃げ", "借金地獄", "ギャンブル", "賭け", "賭博", "ガチャ", "くじ", "パニック",
       "自殺", "死亡", "死ぬ", "死に", "亡くなっ", "他界", "命を落と", "地獄", "血", "殺", "銃", "逮捕", "懲役", "刑務所",
       "部下", "人を 使う", "人を使う", "人を 動かす", "人を動かす", "こき使",
       "企業家",
       "孫正義", "柳井", "三木谷", "前澤", "堀江", "ホリエモン", "イーロン", "マスク", "ベゾス", "ザッカーバーグ", "ビル・ゲイツ", "ゲイツ", "バフェット", "ユヌス", "ペイジ", "ブリン", "ティール", "ジャック・マー",
       "トヨタ", "ソニー", "パナソニック", "ホンダ", "京セラ", "日清", "任天堂", "アップル", "グーグル", "アマゾン", "マイクロソフト", "テスラ", "メタ社", "フェイスブック", "エヌビディア", "ユニクロ", "楽天", "メルカリ", "ソフトバンク", "セブン", "ローソン", "マクドナルド", "スターバックス", "ディズニーランド", "ウーバー", "エアビー", "ネットフリックス",
       "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|億円|倍)"), re.compile(r"(十|百|千|万|億)円"), re.compile(r"[一二三四五六七八九十]倍"),
          re.compile(r"\d+ ?日以内"), re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 金額・割合・倍率・期限・条の 番号は 書かない
OK_WORDS = ["黒字倒産"]  # name に だけ 出て よい 語(説明では「お店を 続けられなく なる」)
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
        lim = 130
        if len(t.get("description", "")) > lim: errs.append(f"{tid}: 説明が 長い({len(t['description'])}字。{lim}字まで)")
        tt = t.get("tatoeba")
        if tt is not None:
            if not (isinstance(tt, str) and 8 <= len(tt) <= 80 and tt.endswith("。") and "たとえば" not in tt[:6]):
                errs.append(f"{tid}: tatoeba は 1文(8〜80字・「。」で おわる・「たとえば」で はじめない)")
        if "倒産" in t.get("description", "") + (tt or ""): errs.append(f"{tid}: 説明・たとえに「倒産」は 書かない(お店を 続けられなく なる)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + (tt or "")
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
        sys.exit("起業家の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("起業家の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/kigyo.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 起業家の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 起業家の 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>丈夫<rt>じょうふ</rt></ruby>", "<ruby>丈夫<rt>じょうぶ</rt></ruby>"),
           R(r"お<ruby>金<rt>きん</rt></ruby>", "お<ruby>金<rt>かね</rt></ruby>"),
           # 2026-10-04 に 全語の ふりがなを 1つずつ 見て 見つけた もの
           R(r"<ruby>種<rt>しゅ</rt></ruby>(?=」)", "<ruby>種<rt>たね</rt></ruby>"),                 # 「種」の 段階(シード)
           R(r"<ruby>値<rt>あたい</rt></ruby>(?=の つけ)", "<ruby>値<rt>ね</rt></ruby>"),              # 値の つけかた
           R(r"<ruby>日<rt>か</rt></ruby>(?=ほど)", "<ruby>日<rt>ひ</rt></ruby>"),                    # 売れた 日ほど
           R(r"<ruby>秋<rt>しゅう</rt></ruby>", "<ruby>秋<rt>あき</rt></ruby>"),                       # 春・夏・秋・冬
           R(r"<ruby>公<rt>こう</rt></ruby>(?=の |に )", "<ruby>公<rt>おおやけ</rt></ruby>"),           # 公の 場・公に
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
        if t.get("tatoeba"): o["tt"] = t["tatoeba"]; o["ttrb"] = rub(t["tatoeba"])
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "kigyo").mkdir(exist_ok=True)
    (ROOT / "kigyo/terms.js").write_text("/* tools/kigyo/terms-*.json から tools/kigyo/terms_js.py が 作る。手で 直さない */\nconst KIGYO_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kigyo/terms.js", len(out), "語", (ROOT / "kigyo/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
