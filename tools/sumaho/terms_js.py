#!/usr/bin/env python3
"""tools/sumaho/meta.json + tools/sumaho/terms-<旅>.json → data/sumaho.json(1か所に まとめた もの)と sumaho/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が sumaho/ を 作るときに 呼ぶ。data/sumaho.json と sumaho/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/sumaho/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/sumaho/terms_js.py --check  # 確かめるだけ
決まりは tools/sumaho/PROMPT.md。もとは tools/yakuzai/terms_js.py(薬剤師)。⭐ 新しい 欄 yatte(📱 やって みよう)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(7つ。tools/sumaho/PROMPT.md)。スマホに 国家資格は 無いので ITパスポートの テクノロジ系に 近い 分けかた + 使いかた・くらし・歴史
SUBJECTS = ("ハードウェア", "OSと ソフトウェア", "ネットワーク", "セキュリティ", "使いかたと 操作", "くらしと ルール", "歴史")
# ✅ AI旅行・プログラマー・理科 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30)。読みが かぶらないのは スマホの 10の 旅の 中だけ
# ⚠️⚠️ ① 商標を 1語の 答え(name)に しない(説明の 中で「iPhone では」と 事実として ふれるのは よい)。
#   Wi-Fi・Bluetooth・USB は 世界の 規格の 名前として name に して よい(PROMPT.md)
TM_NAME = ["iPhone", "iPad", "iOS", "iPadOS", "Apple", "アップル", "Face ID", "Touch ID", "AirDrop", "Siri", "iCloud", "App Store", "Live Photos", "FaceTime",
           "AirPods", "AirTag", "iMessage", "Lightning", "MagSafe", "Retina", "Dynamic Island", "ダイナミックアイランド", "Android", "アンドロイド", "Google", "グーグル",
           "Gmail", "Pixel", "Galaxy", "Xperia", "QRコード", "iモード", "おサイフケータイ", "ポケットベル", "写メ", "Suica", "PayPay", "ニューラルエンジン", "スポットライト"]
# ② name・説明・やって みよう の どこにも 出さない: 会社・SNS・ゲームアプリ・機種の 番号・ぬけ道・人を 傷つける やりかた
BAN = ["ドコモ", "docomo", "NTT", "ソフトバンク", "SoftBank", "楽天", "ワイモバイル", "UQ", "KDDI", "LINE", "Instagram", "インスタ", "TikTok", "ティックトック",
       "Twitter", "ツイッター", "YouTube", "ユーチューブ", "Facebook", "フェイスブック", "Discord", "Snapchat", "マインクラフト", "フォートナイト", "ポケモン", "Microsoft", "マイクロソフト",
       "Samsung", "サムスン", "ソニー", "シャープ", "Huawei", "ジェイルブレイク", "脱獄", "root化", "ルート化", "外しかた", "外し方", "解除の しかた", "解除のしかた", "ぬけ道", "抜け道",
       "すりぬけ", "こっそり", "のぞき見", "盗み見", "ハッキングの やりかた", "フリックiPhone", "100マス", "百ます", "殺", "死"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|万円|GB|MB|TB|KB|ギガ|メガ|テラ|インチ|画素|万画素|mAh|さい|歳|才|回|時間|分|秒|倍)"),
          re.compile(r"(iPhone|iOS|Android|アンドロイド) ?\d"), re.compile(r"[一二三四五六七八九十百千万](円|画素|万画素)")]
OK_WORDS = ["1876年", "1999年", "2007年", "2008年", "2016年", "#9110", "188"]
MAXR = 20  # 読みの 長さ
YMAX = 60  # やって みよう の 長さ


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
    ids = {}; readings = {}; per = {}; yat = {}
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
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        for w in TM_NAME:
            if w.lower() in t.get("name", "").lower(): errs.append(f"{tid}: name に 商標「{w}」(一般の 言葉に する)")
        if "🍎" in t.get("emoji", "") or "🍏" in t.get("emoji", ""): errs.append(f"{tid}: りんごの 絵文字は 使わない")
        y = t.get("yatte")
        if y is not None:
            if not isinstance(y, str) or not y.strip(): errs.append(f"{tid}: yatte は 1文の 文字")
            elif len(y) > YMAX: warn.append(f"{tid}: やって みよう が 長い({len(y)}字)")
            yat.setdefault(t.get("journey"), 0); yat[t.get("journey")] += 1
        if t.get("description", "").count("iPhone") > 1: warn.append(f"{tid}: 説明に iPhone が 2回 以上")
        txt = t.get("name", "") + t.get("description", "") + t.get("example", "") + (t.get("yatte") or "")
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
    for J in js:
        if any(t.get("journey") == J for t in d["terms"]) and not 5 <= yat.get(J, 0) <= 10: warn.append(f"{J}: やって みよう は {yat.get(J, 0)}語(5〜10語に)")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("スマホの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("スマホの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/sumaho.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを スマホの ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    #   ひとつだけの「数」→ かず(薬剤師と 同じ)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           R(r"<ruby>局<rt>つぼね</rt></ruby>", "<ruby>局<rt>きょく</rt></ruby>"),
           # スマホの 説明で 見つけた 読みまちがい(ここに 足す)
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
        if t.get("yatte"): o["yt"] = t["yatte"]; o["ytrb"] = rub(t["yatte"])
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "sumaho").mkdir(exist_ok=True)
    (ROOT / "sumaho/terms.js").write_text("/* tools/sumaho/terms-*.json から tools/sumaho/terms_js.py が 作る。手で 直さない */\nconst SUMAHO_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("sumaho/terms.js", len(out), "語", (ROOT / "sumaho/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
