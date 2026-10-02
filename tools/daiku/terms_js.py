#!/usr/bin/env python3
"""tools/daiku/meta.json + tools/daiku/terms-<旅>.json → data/daiku.json(1か所に まとめた もの)と daiku/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が daiku/ を 作るときに 呼ぶ。data/daiku.json と daiku/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/daiku/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/daiku/terms_js.py --check  # 確かめるだけ
決まりは tools/daiku/PROMPT.md。もとは tools/toshika/terms_js.py(投資家を 写した)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(建築大工技能検定の 学科の 科目(建築構造・規矩術・施工法・材料・製図・関係法規・安全衛生)を めやすに ゲームの 中で 決めた 8つ。tools/daiku/PROMPT.md)
SUBJECTS = ("建築一般", "木材", "道具", "構造", "規矩・墨付け", "造作・仕上げ", "安全", "歴史")
# ✅ 整備士・社会・理科 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。
#    読みが かぶらないのは 大工の 8つの 旅の 中だけ
# ⚠️ 名前・説明に 出さない ことば。見つけたら 止める(tools/daiku/PROMPT.md)
#   ① 道具の 使いかた・作業の 手順(「◯◯かた」の 形)
#   ② ⚠️⚠️ 小学生も あそぶ: けが・事故・落ちる・切る ようす・こわい ことば(「命に かかわる」も 使わない)
#   ③ 実在の 工務店・ハウスメーカー・道具メーカー・商品の 名前
#   ④ 寸法・強さ・値段の 数字(単位の 名前と「1間は 約1.8m」の ような 単位の 大きさは よい)・条の 番号
BAN = ["ひきかた", "引きかた", "引き方", "切りかた", "切り方", "削りかた", "削り方", "研ぎかた", "研ぎ方", "打ちかた", "打ち方", "使いかた", "使い方",
       "命に かかわ", "命にかかわ", "けがを", "けがの", "けがに", "けがが", "けがを ", "怪我", "ケガ", "事故", "大けが", "切り傷", "指を 切", "指を切", "転落", "落ちて", "落ちる", "落下",
       "死", "血", "殺", "地獄", "こわい", "恐ろしい", "危険な 作業", "爆発",
       "マキタ", "日立", "HiKOKI", "ハイコーキ", "リョービ", "ボッシュ", "積水", "大和ハウス", "住友林業", "一条工務店", "タマホーム", "ミサワ", "パナソニック",
       "LIXIL", "リクシル", "YKK", "トステム", "金剛組", "竹中", "鹿島", "大林", "清水建設", "大成建設", "ホームセンター", "カインズ", "コメリ",
       "100マス", "百ます"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|割|円|万円|倍|mm|ミリ|cm|センチ|kN|キロ|トン|kg)"), re.compile(r"(十|百|千|万|億)円"),
          re.compile(r"第[\d一二三四五六七八九十百]+条")]  # 寸法・強さ・値段・条の 番号は 書かない(単位の 大きさ「約1.8m」は よい)
# 「墜落制止用器具」(安全の 道具の 正式な 名前)だけは「墜落」の 字を 使って よい
OK_WORDS = ["墜落制止用器具"]
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
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "")
        for w in OK_WORDS: txt = txt.replace(w, "")
        if "墜落" in txt: errs.append(f"{tid}: 「墜落」は「墜落制止用器具」の 名前の 中だけ")
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
        sys.exit("大工の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("大工の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/daiku.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 大工の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 大工の 説明で 見つけた 読みまちがい(ここに 足す)
           R(r"<ruby>車<rt>くるま</rt></ruby><ruby>知<rt>ち</rt></ruby>", "<ruby>車知<rt>しゃち</rt></ruby>"),        # 竿車知継ぎ
           R(r"<ruby>勾<rt>まがり</rt></ruby><ruby>股<rt>[^<]*</rt></ruby><ruby>弦<rt>げん</rt></ruby>", "<ruby>勾股弦<rt>こうこげん</rt></ruby>"),
           R(r"<ruby>勾<rt>まがり</rt></ruby>", "<ruby>勾<rt>こう</rt></ruby>"),
           R(r"<ruby>股<rt>また</rt></ruby>(?=、)", "<ruby>股<rt>こ</rt></ruby>"),
           R(r"<ruby>角<rt>(?:かく|つの)</rt></ruby>", "<ruby>角<rt>かど</rt></ruby>"),         # 大工の 文の「角」1字は かど
           R(r"(?<=\d)<ruby>間<rt>かん</rt></ruby>", "<ruby>間<rt>けん</rt></ruby>"),               # 1間(けん)
           R(r"(?<=\d)<ruby>分<rt>ふん</rt></ruby>", "<ruby>分<rt>ぶ</rt></ruby>"),                 # 寸の 下の 分(ぶ)
           R(r"(<ruby>寸<rt>すん</rt></ruby>.?)<ruby>分<rt>ぶん</rt></ruby>", r"\1<ruby>分<rt>ぶ</rt></ruby>"),
           R(r"<ruby>江戸<rt>えど</rt></ruby><ruby>間<rt>かん</rt></ruby>", "<ruby>江戸間<rt>えどま</rt></ruby>"),
           R(r"<ruby>関東<rt>かんとう</rt></ruby><ruby>間<rt>かん</rt></ruby>", "<ruby>関東間<rt>かんとうま</rt></ruby>"),
           R(r"<ruby>木口<rt>きぐち</rt></ruby>", "<ruby>木口<rt>こぐち</rt></ruby>"),
           R(r"<ruby>造作<rt>ぞうさ</rt></ruby>(?!く)", "<ruby>造作<rt>ぞうさく</rt></ruby>"),
           R(r"<ruby>栗<rt>りつ</rt></ruby>", "<ruby>栗<rt>くり</rt></ruby>"),
           R(r"<ruby>実<rt>じつ</rt></ruby>(?=が|の なる)", "<ruby>実<rt>み</rt></ruby>"),
           R(r"<ruby>生<rt>い</rt></ruby>き<ruby>節<rt>ふし</rt></ruby>", "<ruby>生<rt>い</rt></ruby>き<ruby>節<rt>ぶし</rt></ruby>"),
           R(r"<ruby>大社<rt>おおこそ</rt></ruby><ruby>造<rt>みやつこ</rt></ruby>", "<ruby>大社造<rt>たいしゃづくり</rt></ruby>"),
           R(r"<ruby>大仏<rt>だいぶつ</rt></ruby><ruby>様<rt>さま</rt></ruby>", "<ruby>大仏様<rt>だいぶつよう</rt></ruby>"),   # 建築の 様式
           R(r"<ruby>付<rt>ふ</rt></ruby><ruby>書院<rt>しょいん</rt></ruby>", "<ruby>付書院<rt>つけしょいん</rt></ruby>"),
           R(r"<ruby>床<rt>とこ</rt></ruby>(?=や)", "<ruby>床<rt>ゆか</rt></ruby>"),                 # 床や 壁(ゆか)
           R(r"<ruby>木目<rt>きめ</rt></ruby>", "<ruby>木目<rt>もくめ</rt></ruby>"),
           R(r"<ruby>大引<rt>おおびけ</rt></ruby>", "<ruby>大引<rt>おおびき</rt></ruby>"),
           R(r"<ruby>根太<rt>ねぶと</rt></ruby>", "<ruby>根太<rt>ねだ</rt></ruby>"),
           R(r"<ruby>束<rt>たば</rt></ruby>", "<ruby>束<rt>つか</rt></ruby>"),                      # 床束・小屋束(つか)
           R(r"<ruby>母屋<rt>おもや</rt></ruby>(?=を <ruby>下|や <ruby>棟木)", "<ruby>母屋<rt>もや</rt></ruby>"),  # 小屋組の 母屋(もや)
           R(r"<ruby>差金<rt>さきん</rt></ruby>", "<ruby>差金<rt>さしがね</rt></ruby>"),
           R(r"<ruby>尺<rt>さし</rt></ruby>", "<ruby>尺<rt>しゃく</rt></ruby>"),
           R(r"<ruby>冠<rt>かんむり</rt></ruby>", "<ruby>冠<rt>かつら</rt></ruby>"),               # 叩きのみの 冠(かつら)
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
    (ROOT / "daiku").mkdir(exist_ok=True)
    (ROOT / "daiku/terms.js").write_text("/* tools/daiku/terms-*.json から tools/daiku/terms_js.py が 作る。手で 直さない */\nconst DAIKU_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("daiku/terms.js", len(out), "語", (ROOT / "daiku/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
