#!/usr/bin/env python3
"""フリックキャビンアテンダント(けいくん 2026-10-20)。tools/cabin/meta.json + tools/cabin/terms-<旅>.json → data/cabin.json(1か所に まとめた もの)と cabin/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が cabin/ を 作るときに 呼ぶ。data/cabin.json と cabin/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/cabin/terms_js.py                       # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/cabin/terms_js.py --check               # 確かめるだけ
    python3 tools/cabin/terms_js.py --check --with-later  # 2回目の 40語(tools/cabin/later/)も 合わせて 確かめる(読みの かぶりを 先に 見る)
決まりは tools/cabin/PROMPT.md。もとは tools/pilot/terms_js.py(パイロット)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば(こわい 字・会社名)。見つけたら 止める(けいくん 2026-10-20「こわく しない」)
BAN = ["墜落", "墜", "落ちる", "落下", "事故", "死", "けがを", "けがし", "怪我", "危険", "こわい", "怖い", "爆発", "ハイジャック", "テロ", "遭難", "行方不明", "炎上", "不時着", "惨事",
       "失礼", "非常識", "マナー違反", "はずかしい", "美人", "容姿", "顔立ち", "美しい人", "きれいな人", "きれいな 人",  # 人を 責めない・見た目で 決めつけない
       "キャセイ", "シンガポール航空", "エールフランス", "ブリティッシュ・エアウェイズ", "アメリカン航空", "カンタス", "大韓航空", "アシアナ", "チャイナエアライン", "エバー航空", "カタール航空", "トルコ航空", "ターキッシュ", "ジェットブルー", "サウスウエスト", "ZIPAIR", "ソラシド",
       "日本航空", "全日空", "全日本空輸", "JAL", "ANA", "スカイマーク", "ピーチ", "ジェットスター", "エアドゥ", "スターフライヤー", "ユナイテッド", "ルフトハンザ", "エミレーツ", "デルタ航空"]
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ。けいくんの OK を もらって 書く)
# ふりがなの 直し(この ゲームだけ。はじめは パイロットの 直しを 写した。tools/make_ruby.py の FIX は ほかの ゲームにも 効くので さわらない)。{"まちがい": "正しい"}
RB_FIX = {
    # ↓ キャビンアテンダントで 見つけた 直し(2026-10-21。ふりがなを ぜんぶ 取り出して 読んだ)
    "<ruby>丈夫<rt>じょうふ</rt></ruby>": "<ruby>丈夫<rt>じょうぶ</rt></ruby>",
    "<ruby>冬<rt>とう</rt></ruby>": "<ruby>冬<rt>ふゆ</rt></ruby>",
    "<ruby>毛<rt>もう</rt></ruby>": "<ruby>毛<rt>け</rt></ruby>",
    "の <ruby>実<rt>じつ</rt></ruby>": "の <ruby>実<rt>み</rt></ruby>",
    "<ruby>口<rt>こう</rt></ruby>": "<ruby>口<rt>ぐち</rt></ruby>",  # 搭乗口
    "<ruby>数<rt>すう</rt></ruby>": "<ruby>数<rt>かず</rt></ruby>",  # 席の 数・品と 数 など
    # ↓ パイロットの 直しを 写した もの
    "<ruby>灯火<rt>ともしび</rt></ruby>": "<ruby>灯火<rt>とうか</rt></ruby>",
    "<ruby>羽田<rt>はた</rt></ruby>": "<ruby>羽田<rt>はねだ</rt></ruby>",
    "<ruby>好敏<rt>よしとく</rt></ruby>": "<ruby>好敏<rt>よしとし</rt></ruby>",
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
    "1<ruby>分<rt>ぶん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "1<ruby>分<rt>ふん</rt></ruby>": "<ruby>1分<rt>いっぷん</rt></ruby>",
    "<ruby>前脚<rt>まえあし</rt></ruby>": "<ruby>前脚<rt>ぜんきゃく</rt></ruby>",
    "<ruby>定<rt>ただし</rt></ruby><ruby>針<rt>はり</rt></ruby><ruby>儀<rt>ぎ</rt></ruby>": "<ruby>定針儀<rt>ていしんぎ</rt></ruby>",
    "<ruby>定<rt>てい</rt></ruby><ruby>針<rt>はり</rt></ruby><ruby>儀<rt>ぎ</rt></ruby>": "<ruby>定針儀<rt>ていしんぎ</rt></ruby>",
    "<ruby>真対<rt>まつい</rt></ruby><ruby>気速<rt>きそく</rt></ruby><ruby>度<rt>ど</rt></ruby>": "<ruby>真対気速度<rt>しんたいきそくど</rt></ruby>",
    "<ruby>上<rt>うえ</rt></ruby><ruby>反角<rt>かえりずの</rt></ruby>": "<ruby>上反角<rt>じょうはんかく</rt></ruby>",
    "<ruby>通<rt>かよ</rt></ruby>って": "<ruby>通<rt>とお</rt></ruby>って",
    "<ruby>横風<rt>おうふう</rt></ruby>": "<ruby>横風<rt>よこかぜ</rt></ruby>",
    "<ruby>積乱<rt>せきらん</rt></ruby><ruby>雲<rt>くも</rt></ruby>": "<ruby>積乱雲<rt>せきらんうん</rt></ruby>",
    "<ruby>防<rt>ぼう</rt></ruby><ruby>氷<rt>こおり</rt></ruby>": "<ruby>防氷<rt>ぼうひょう</rt></ruby>",
    "<ruby>除<rt>じょ</rt></ruby><ruby>氷<rt>こおり</rt></ruby>": "<ruby>除氷<rt>じょひょう</rt></ruby>",
    "<ruby>梅雨<rt>つゆ</rt></ruby><ruby>前線<rt>ぜんせん</rt></ruby>": "<ruby>梅雨<rt>ばいう</rt></ruby><ruby>前線<rt>ぜんせん</rt></ruby>",
    "<ruby>中<rt>なか</rt></ruby>くらい": "<ruby>中<rt>ちゅう</rt></ruby>くらい",
    "ふく <ruby>風<rt>ふう</rt></ruby>": "ふく <ruby>風<rt>かぜ</rt></ruby>",
    "わる <ruby>間<rt>ま</rt></ruby>に": "わる <ruby>間<rt>あいだ</rt></ruby>に",
    "<ruby>温<rt>ぬる</rt></ruby>め": "<ruby>温<rt>あたた</rt></ruby>め",
    "すじ<ruby>雲<rt>くも</rt></ruby>": "すじ<ruby>雲<rt>ぐも</rt></ruby>",
    "わた<ruby>雲<rt>くも</rt></ruby>": "わた<ruby>雲<rt>ぐも</rt></ruby>",
    "うす<ruby>雲<rt>くも</rt></ruby>": "うす<ruby>雲<rt>ぐも</rt></ruby>",
    "ひつじ<ruby>雲<rt>くも</rt></ruby>": "ひつじ<ruby>雲<rt>ぐも</rt></ruby>",
    "あま<ruby>雲<rt>くも</rt></ruby>": "あま<ruby>雲<rt>ぐも</rt></ruby>",
    "きり<ruby>雲<rt>くも</rt></ruby>": "きり<ruby>雲<rt>ぐも</rt></ruby>",
    "かなとこ<ruby>雲<rt>くも</rt></ruby>": "かなとこ<ruby>雲<rt>ぐも</rt></ruby>",
    "<ruby>真北<rt>まきた</rt></ruby>": "<ruby>真北<rt>しんぽく</rt></ruby>",
    "<ruby>真方<rt>まかた</rt></ruby><ruby>位<rt>い</rt></ruby>": "<ruby>真方位<rt>しんほうい</rt></ruby>",
    "<ruby>東<rt>あずま</rt></ruby>": "<ruby>東<rt>ひがし</rt></ruby>",
    "<ruby>地文<rt>ちぶん</rt></ruby>": "<ruby>地文<rt>ちもん</rt></ruby>",
    "を <ruby>通<rt>かよ</rt></ruby>った": "を <ruby>通<rt>とお</rt></ruby>った",
    "さな <ruby>球<rt>たま</rt></ruby>": "さな <ruby>球<rt>きゅう</rt></ruby>",
    "<ruby>平<rt>ひら</rt></ruby>らな": "<ruby>平<rt>たい</rt></ruby>らな",
    "1<ruby>日<rt>ひ</rt></ruby> もど": "1<ruby>日<rt>にち</rt></ruby> もど",
    "<ruby>後<rt>ご</rt></ruby>から": "<ruby>後<rt>あと</rt></ruby>から",
    "<ruby>万5000<rt>まんごれいれいれい</rt></ruby>": "<ruby>万<rt>まん</rt></ruby>5000",
    "ごとの <ruby>数<rt>すう</rt></ruby>で": "ごとの <ruby>数<rt>かず</rt></ruby>で",
}
PRE = {"kihon": "ki-", "hoan": "ho-", "kyumei": "ky-", "service": "se-", "manner": "ma-", "eigo": "ei-", "sekai": "sk-", "kuko": "ku-", "shigoto": "sh-"}
FIELDS = {"保安", "救急", "サービス", "接遇", "英語", "世界の文化", "空港", "しごと"}

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
        if t.get("settai") and len(t["settai"]) > 70: warn.append(f"{tid}: おもてなしが 長い({len(t['settai'])}字)")
        if t.get("ei") and not re.fullmatch(r"[A-Za-z0-9 ,.'?!&/()\-]+", t["ei"]): errs.append(f"{tid}: ei は 英語の つづり だけ")
        if not str(tid).startswith(PRE.get(t.get("journey"), "?")): errs.append(f"{tid}: id の 頭は {PRE.get(t.get('journey'))}")
        for w in BAN:
            if w in BAN_OK.get(tid, []): continue
            if w in " / ".join([t.get("name", ""), t.get("description", ""), t.get("example", ""), t.get("settai", "")]): errs.append(f"{tid}: 「{w}」は 使わない")
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
        sys.exit("キャビンアテンダントの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("キャビンアテンダントの ことば OK", len(d["terms"]), "語"); return
    if "--with-later" in sys.argv: sys.exit("--with-later は --check と いっしょに 使う(作るのは 1回目の ことばだけ)")
    (ROOT / "data/cabin.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
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
        if t.get("settai"): o["st"] = t["settai"]; o["strb"] = rub(t["settai"])  # 🤝 おもてなし(お客さまに どう つかうか)
        if t.get("ei"): o["ei"] = t["ei"]  # 🔊 英語の つづり(英語の 語・ひとことだけ)
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    js["saiyo"] = m.get("saiyo", "")
    (ROOT / "cabin").mkdir(exist_ok=True)
    (ROOT / "cabin/terms.js").write_text("/* tools/cabin/terms-*.json から tools/cabin/terms_js.py が 作る。手で 直さない */\nconst CABIN_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("cabin/terms.js", len(out), "語", (ROOT / "cabin/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
