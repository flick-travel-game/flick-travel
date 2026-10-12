#!/usr/bin/env python3
"""tools/eiga/meta.json + tools/eiga/terms-<旅>.json → data/eiga.json(1か所に まとめた もの)と eiga/terms.js(ゲームが 読む 形。説明と 見どころに ふりがな)
tools/build_games.py が eiga/ を 作るときに 呼ぶ。data/eiga.json と eiga/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/eiga/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/eiga/terms_js.py --check  # 確かめるだけ
    python3 tools/eiga/terms_js.py --only sekai  # 1つの 旅だけ 確かめる
決まりは tools/eiga/PROMPT.md。もとは tools/eiga/terms_js.py(映画評論家)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(けいくん 2026-10-12 おすすめ)。大学の 映画学科・映画史の 教科書の 章立てを めやすに 7つ
SUBJECTS = ("映画史", "技法", "物語", "作品・人", "賞・映画祭", "評論", "業界")
# ⭐ 国の しるし(作品・監督・映画祭が どの 国の 話か)。「・」で 3つまで
COUNTRY = ("世界", "ヨーロッパ", "アジア", "日本", "アメリカ", "カナダ", "メキシコ", "ブラジル", "イギリス", "アイルランド", "フランス", "イタリア", "ドイツ", "スイス", "ベルギー", "オランダ", "ノルウェー", "フィンランド", "アルゼンチン", "南アフリカ", "トルコ", "タイ", "マレーシア", "イスラエル",
           "スペイン", "デンマーク", "スウェーデン", "ロシア", "チェコ", "ポーランド", "インド", "イラン", "中国", "台湾", "香港", "韓国", "オーストラリア", "ニュージーランド")
# ⭐ 年代の しるし(公開の 年代)。映画の 年表に 点が 立つ
ERA = tuple(f"{y}s" for y in range(1890, 2030, 10))
# ✅ ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30「復習になるから 同じ語入れていいよ」)。読みが かぶらないのは 映画評論家の 9つの 旅の 中だけ
# ⚠️ 名前・説明・見どころに 出さない ことば。見つけたら 止める(tools/eiga/PROMPT.md)
#   ① こわい・暴力・大人むけ(小学生が あそぶ)
#   ② ネタバレ(結末・正体・どんでん返しの 中身)
#   ③ 変わる 数字(興行収入・動員・ランキング)・けなす ことば
# ⭐ 作品の 題名は 止めない(けいくん決定 2026-10-12「暴力が中心でも有名なのはすべて入れてください」→ G / PG12 なら 入れる。R15+ / R18+ は 助手が 区分を 確かめて 入れない)
BAN = ["死", "殺", "血", "遺体", "暴力", "銃", "拳銃", "ナイフ", "戦死", "虐殺", "自殺", "麻薬", "薬物", "ドラッグ", "性的", "ヌード", "裸", "セックス", "不倫", "売春", "R15", "R18", "成人向け", "アダルト",
       "幽霊", "おばけ", "お化け", "悪霊", "呪い", "ゾンビ", "吸血鬼", "悪魔", "恐怖", "惨劇", "残酷", "グロ",
       "結末は", "ラストで", "ラストに", "最後に 明かされ", "最後に わかる", "正体は", "実は 犯人", "犯人は", "黒幕", "どんでん返しが すごい", "衝撃の ラスト", "衝撃の 結末",
       "興行収入", "興収", "動員", "観客数", "億円", "万円", "万ドル", "億ドル", "歴代", "ランキング 1", "ヒットチャート",
       "駄作", "失敗作", "つまらない", "こけた", "大コケ", "ラジー", "酷評", "最低の",
       "事件", "逮捕", "スキャンダル", "離婚", "裁判", "病気", "亡くな", "亡き",
       "配信サービス", "ネットフリックス", "Netflix", "アマゾン", "Amazon", "ディズニープラス", "Disney+", "Hulu", "U-NEXT", "TOHOシネマズ", "イオンシネマ", "ドルビー", "Dolby", "IMAX", "4DX",
       "フリック映画評論 ", "フリック映画批評", "フリック映画論評"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|ドル|歳|才)"),
          re.compile(r"(一|二|三|四|五|六|七|八|九|十|百|千|万|億)(円|ドル|歳|才)"),
          re.compile(r"(第|歴代)[\d一二三四五六七八九十]+ ?位")]  # お金・年齢・順位は 書かない(公開年・受賞の 年・回数は よい)
# 映画で ふつうに 使う ことば(止める 字が 入っているが よい もの)
OK_WORDS = ["血液", "殺陣", "セブンティーン", "ゴールデングローブ"]
MAXR = 20  # 読みの 長さ(これより 長いと 子どもが 飽きる。PROMPT.md)


def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        for f in [HERE / f"terms-{J['id']}.json"] + sorted(HERE.glob(f"terms-{J['id']}-*.json")):  # terms-sekai-a.json のような 足しかけの ファイルも 読む(助手が 分けて 書く とき)
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
        co = t.get("country")
        if co is not None and (not isinstance(co, str) or not co or any(p not in COUNTRY for p in co.split("・")) or len(co.split("・")) > 3):
            errs.append(f"{tid}: country「{co}」は {COUNTRY} の どれか(「・」で 3つまで)")
        er = t.get("era")
        if er is not None and er not in ERA: errs.append(f"{tid}: era「{er}」は {ERA[0]}〜{ERA[-1]} の どれか")
        md = t.get("midokoro")
        if md is not None and (not isinstance(md, str) or not md.strip()): errs.append(f"{tid}: midokoro が 空")
        if md and len(md) > 90: warn.append(f"{tid}: 見どころが 長い({len(md)}字)")
        isWork = str(t.get("name", "")).startswith("『")
        if isWork and not md: errs.append(f"{tid}: 作品(『』)には midokoro(🍿 見どころ)を かならず 付ける")
        if isWork and not er: errs.append(f"{tid}: 作品(『』)には era(公開の 年代)を かならず 付ける")
        if re.search(r"[『』「」。!?!?・ ]", t.get("reading", "")): errs.append(f"{tid}: 読みに 記号")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        # その 旅の 図の 場所だけ(ほかの 旅の 図を 指していないか)
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + t.get("midokoro", "")
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
        sys.exit("映画評論家の ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("映画評論家の ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/eiga.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを 映画評論家の ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(ゲームクリエイター・医師・教師・料理人と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # 映画評論家の 説明で 見つけた 読みまちがい(ここに 足す)
           ]
    # ⭐ 人の 名前・作品名の 読み(1文字ずつ 読まれて まちがう ものを まとめて 1つの ふりがなに する)
    NAMES = {"宮崎駿": "みやざきはやお", "細田守": "ほそだまもる", "山崎貴": "やまざきたかし", "山田尚子": "やまだなおこ", "米林宏昌": "よねばやしひろまさ",
             "周防正行": "すおまさゆき", "渥美清": "あつみきよし", "藪下泰司": "やぶしたたいじ", "石田祐康": "いしだひろやす", "角野栄子": "かどのえいこ",
             "吉田秋生": "よしだあきみ", "冲方丁": "うぶかたとう", "内田百閒": "うちだひゃっけん", "熊徹": "くまてつ", "時をかける少女": "ときをかけるしょうじょ",
             "七人の侍": "しちにんのさむらい", "成瀬巳喜男": "なるせみきお", "木下惠介": "きのしたけいすけ", "久石譲": "ひさいしじょう", "大藤信郎": "おおふじのぶろう",
             "川本喜八郎": "かわもときはちろう", "矢口史靖": "やぐちしのぶ", "是枝裕和": "これえだひろかず", "円谷英二": "つぶらやえいじ", "高畑勲": "たかはたいさお",
             "小津安二郎": "おづやすじろう", "溝口健二": "みぞぐちけんじ", "黒澤明": "くろさわあきら", "手塚治虫": "てづかおさむ", "新海誠": "しんかいまこと",
             "湯浅政明": "ゆあさまさあき", "牧野省三": "まきのしょうぞう", "山田洋次": "やまだようじ", "河瀬直美": "かわせなおみ", "衣笠貞之助": "きぬがさていのすけ",
             "今村昌平": "いまむらしょうへい", "北野武": "きたのたけし", "稲垣浩": "いながきひろし", "濱口竜介": "はまぐちりゅうすけ", "淀川長治": "よどがわながはる",
             "水野晴郎": "みずのはるお", "片渕須直": "かたぶちすなお", "菅田将暉": "すだまさき", "神木隆之介": "かみきりゅうのすけ", "海街": "うみまち", "日日是好日": "にちにちこれこうじつ", "浅田家": "あさだけ",
             "御前様": "ごぜんさま", "三葉": "みつは", "鬼滅の刃": "きめつのやいば", "星野鉄郎": "ほしのてつろう", "茶川": "ちゃがわ", "二十四の瞳": "にじゅうしのひとみ",
             "江戸川": "えどがわ", "竈門炭治郎": "かまどたんじろう", "三船敏郎": "みふねとしろう", "笠智衆": "りゅうちしゅう", "原節子": "はらせつこ", "樹木希林": "ききききりん",
             "倍賞千恵子": "ばいしょうちえこ", "野村萬斎": "のむらまんさい", "上白石萌音": "かみしらいしもね", "薬師丸ひろ子": "やくしまるひろこ", "李相日": "りさんいる", "土井裕泰": "どいのぶひろ", "聖櫃": "せいひつ", "一期一会": "いちごいちえ", "オズの魔法使": "おずのまほうつかい", "照橋心美": "てるはしここみ", "河了貂": "かりょうてん", "斉木楠雄": "さいきくすお", "座頭市": "ざとういち", "硫黄島": "いおうじま", "十戒": "じっかい", "昨日・今日・明日": "きのうきょうあした", "聖の青春": "さとしのせいしゅん", "二役": "ふたやく", "劔岳": "つるぎだけ"}
    def _nm(k, y):
        gap = r"(?:<rt>[^<]*</rt></ruby>)?(?:<ruby>)?"
        return (re.compile(r"(?:<ruby>)?" + gap.join(re.escape(c) for c in k) + r"(?:<rt>[^<]*</rt></ruby>)?"), "<ruby>" + k + "<rt>" + y + "</rt></ruby>")
    FIX += [_nm(k, y) for k, y in sorted(NAMES.items(), key=lambda kv: -len(kv[0]))]
    FIX += [R(r"(\d)<ruby>分<rt>ふん</rt></ruby>", r"\1<ruby>分<rt>ぷん</rt></ruby>")]  # 40分(よんじゅっぷん)
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
        if t.get("country"): o["co"] = t["country"]
        if t.get("era"): o["er"] = t["era"]
        if t.get("midokoro"): o["md"] = t["midokoro"]; o["mdrb"] = rub(t["midokoro"])
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "eiga").mkdir(exist_ok=True)
    (ROOT / "eiga/terms.js").write_text("/* tools/eiga/terms-*.json から tools/eiga/terms_js.py が 作る。手で 直さない */\nconst EIGA_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("eiga/terms.js", len(out), "語", (ROOT / "eiga/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
