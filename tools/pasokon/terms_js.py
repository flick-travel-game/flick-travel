#!/usr/bin/env python3
"""tools/pasokon/meta.json + tools/pasokon/terms-<旅>.json → data/pasokon.json(1か所に まとめた もの)と pasokon/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が pasokon/ を 作るときに 呼ぶ。data/pasokon.json と pasokon/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/pasokon/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/pasokon/terms_js.py --check  # 確かめるだけ
    python3 tools/pasokon/terms_js.py --only <旅id>  # その 旅だけ 確かめる
決まりは tools/pasokon/PROMPT.md。もとは tools/sumaho/terms_js.py(スマホ)。
⭐ 新しい 欄: setsumei(💬 店員さんの ひとこと)・keys(⌨️ キーの ふだ。ショートカットの 旅だけ)・yatte(💻 やって みよう)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "field", "type", "emoji", "mapNode", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# 学ぶ 分野(13。tools/pasokon/PROMPT.md)。お店の パソコン担当の 仕事の 分けかた + 歴史
SUBJECTS = ("ハードウェア", "えらびかた・提案", "設定・移行", "操作", "ファイル・アプリ", "ショートカット", "連携", "作品づくり",
            "アクセシビリティ", "周辺機器", "セキュリティ", "トラブル・サポート", "歴史")
# ✅ スマホ・プログラマー・AI旅行 など ほかの ゲームと 同じ ことばは 入れて よい(けいくん決定 2026-09-30)。読みが かぶらないのは パソコンの 12の 旅の 中だけ
# ⚠️⚠️ ① 商標を 1語の 答え(name)に しない(説明の 中で「Mac では『Finder』と いう 名前」と 事実として ふれるのは よい)。
#   スマホの リスト + Mac の 商標。Wi-Fi・Bluetooth・USB・USB-C・HDMI は 世界の 規格の 名前として name に して よい(PROMPT.md)
TM_NAME = ["iPhone", "iPad", "iOS", "iPadOS", "Apple", "アップル", "Face ID", "Touch ID", "AirDrop", "エアドロップ", "Siri", "iCloud", "App Store", "Live Photos", "FaceTime",
           "AirPods", "AirTag", "iMessage", "Lightning", "MagSafe", "マグセーフ", "Retina", "Dynamic Island", "Android", "アンドロイド", "Google", "グーグル",
           "Gmail", "QRコード", "Suica", "スポットライト", "Spotlight",
           # Mac の 商標(J-PlatPat / アップルの 商標の 一覧で 確かめる)
           "Mac", "マック", "マッキントッシュ", "macOS", "Genius", "ジーニアス", "AppleCare", "Finder", "ファインダー", "Safari", "サファリ",
           "Time Machine", "タイムマシン", "Launchpad", "ランチパッド", "Mission Control", "ミッションコントロール", "Stage Manager", "ステージマネージャ",
           "Handoff", "ハンドオフ", "Sidecar", "サイドカー", "Continuity", "連係カメラ", "ユニバーサルクリップボード", "ユニバーサルコントロール", "Universal",
           "Keynote", "キーノート", "Pages", "Numbers", "GarageBand", "ガレージバンド", "iMovie", "Final Cut", "Logic Pro", "AirPlay", "エアプレイ",
           "Thunderbolt", "サンダーボルト", "Magic", "マジックキーボード", "マジックマウス", "マジックトラックパッド", "Force Touch", "フォースタッチ",
           "Touch Bar", "タッチバー", "Night Shift", "ナイトシフト", "True Tone", "トゥルートーン", "VoiceOver", "ボイスオーバー", "Quick Look", "クイックルック",
           "FileVault", "ゲートキーパー", "Gatekeeper", "XProtect", "移行アシスタント", "キーチェーン", "Rosetta", "ロゼッタ", "Boot Camp", "ブートキャンプ",
           "Apple Pencil", "Apple シリコン", "シリコンチップ",
           # ほかの 会社の 商品
           "Windows", "ウィンドウズ", "ウインドウズ", "Microsoft", "Excel", "エクセル", "PowerPoint", "パワーポイント", "Office", "Chrome", "Intel", "インテル",
           "Linux", "リナックス", "UNIX", "ユニックス", "Photoshop", "フォトショップ", "Zoom", "Teams", "Slack", "Adobe", "アドビ", "ThinkPad", "Surface"]
# ② name・説明・ひとこと・やって みよう の どこにも 出さない: お店・会社・SNS・アプリの 商品名・機種の 番号・ぬけ道・人を 傷つける やりかた
BAN = ["ドコモ", "docomo", "ソフトバンク", "SoftBank", "楽天", "KDDI", "LINE", "Instagram", "インスタ", "TikTok", "ティックトック",
       "Twitter", "ツイッター", "YouTube", "ユーチューブ", "Facebook", "フェイスブック", "Discord", "マインクラフト", "フォートナイト", "ポケモン",
       "Microsoft", "マイクロソフト", "Samsung", "サムスン", "ソニー", "シャープ", "Huawei", "Dell", "Lenovo", "レノボ", "富士通", "NEC", "東芝", "パナソニック",
       "ヨドバシ", "ビックカメラ", "ヤマダ", "ケーズ", "エディオン", "Apple Store", "アップルストア", "Genius", "ジーニアス", "Amazon", "アマゾン",
       "Adobe", "アドビ", "Photoshop", "Zoom", "Teams", "Slack", "Chrome", "クローム", "Excel", "エクセル", "PowerPoint", "パワーポイント", "Word ",
       "ジェイルブレイク", "脱獄", "root化", "ルート化", "外しかた", "外し方", "解除の しかた", "解除のしかた", "ぬけ道", "抜け道",
       "すりぬけ", "こっそり", "のぞき見", "盗み見", "ハッキングの やりかた", "クラック", "sudo", "rm -", "csrutil", "ターミナルで",
       "フリックMacBook", "フリックMac", "100マス", "百ます", "殺", "死"]
BAN_RE = [re.compile(r"\d[\d,.]* ?(%|％|パーセント|円|万円|ドル|GB|MB|TB|KB|ギガ|メガ|テラ|インチ|型|画素|万画素|mAh|Wh|W\b|ワット|Hz|ヘルツ|コア|nm|ナノ|bps|K\b|さい|歳|才|回|時間|分|秒|倍)"),
          re.compile(r"(iPhone|iOS|Android|アンドロイド|macOS|Mac OS|OS ?X|Windows|ウィンドウズ) ?\d"), re.compile(r"\bM[1-9]\b"), re.compile(r"[一二三四五六七八九十百千万](円|画素|万画素|ドル)")]
# 年は 確かめた ものだけ(tools/pasokon/exam.txt)。ほかの 年を 書くと 止まる
OK_YEARS = {"1946年", "1968年", "1984年", "1985年", "1995年", "2005年", "2006年", "2020年"}
KEY_TOK = r"(⌘|⌥|⌃|⇧|fn|🌐|esc|Tab|Space|Return|Delete|Caps Lock|英数|かな|←|→|↑|↓|[A-Z0-9]|F\d{1,2}|,|\.|/|-|\[|\]|;|`)"
KEY_RE = re.compile(r"%s( \+ %s)*" % (KEY_TOK, KEY_TOK))
MAXR = 20  # 読みの 長さ
YMAX = 60  # やって みよう の 長さ
SMAX = 60  # 店員さんの ひとこと の 長さ


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
    ids = {}; readings = {}; per = {}; yat = {}; ses = {}
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
        if t.get("field") not in SUBJECTS: errs.append(f"{tid}: field「{t.get('field')}」は 13の 分野の どれか")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        want = js.get(t.get("journey"), {}).get("diagram")
        if want and str(t.get("mapNode")).split(":")[0] != want: errs.append(f"{tid}: mapNode は「{want}:」の 場所から えらぶ")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        nm = t.get("name", "")
        for w in TM_NAME:
            if w.lower() in nm.lower(): errs.append(f"{tid}: name に 商標「{w}」(一般の 言葉に する)")
        if "🍎" in t.get("emoji", "") or "🍏" in t.get("emoji", ""): errs.append(f"{tid}: りんごの 絵文字は 使わない")
        # ⌨️ キーの ふだ(ショートカットの 旅だけ)
        k = t.get("keys")
        if k is not None:
            if t.get("journey") != "shortcut": errs.append(f"{tid}: keys は ショートカットの 旅だけ")
            elif not isinstance(k, str) or not KEY_RE.fullmatch(k): errs.append(f"{tid}: keys「{k}」の 形が ちがう(例「⌘ + C」「⌘ + ⇧ + 3」)")
        # 💻 やって みよう
        y = t.get("yatte")
        if y is not None:
            if not isinstance(y, str) or not y.strip(): errs.append(f"{tid}: yatte は 1文の 文字")
            elif len(y) > YMAX: warn.append(f"{tid}: やって みよう が 長い({len(y)}字)")
            yat[t.get("journey")] = yat.get(t.get("journey"), 0) + 1
        # 💬 店員さんの ひとこと
        s = t.get("setsumei")
        if s is not None:
            if not isinstance(s, str) or not s.strip(): errs.append(f"{tid}: setsumei は 1文の 文字")
            elif len(s) > SMAX: errs.append(f"{tid}: 店員さんの ひとこと が 長い({len(s)}字。{SMAX}字まで)")
            ses[t.get("journey")] = ses.get(t.get("journey"), 0) + 1
        for f in ("description", "yatte", "setsumei"):
            if (t.get(f) or "").count("Mac") > 2: warn.append(f"{tid}: {f} に Mac が 3回 以上")
        txt = nm + t.get("description", "") + t.get("example", "") + (t.get("yatte") or "") + (t.get("setsumei") or "")
        for w in BAN:
            if w in txt: errs.append(f"{tid}: 「{w.strip()}」は 使わない")
        for rx in BAN_RE:
            if rx.search(txt): errs.append(f"{tid}: 「{rx.search(txt).group(0)}」は 使わない")
        for yy in re.findall(r"\d{4}年", txt):
            if yy not in OK_YEARS: errs.append(f"{tid}: 「{yy}」は 確かめた 年(exam.txt)だけ")
        for r in [t.get("reading")] + list(t.get("acceptedReadings") or []):
            readings.setdefault(r, []).append(tid)
        per[(t.get("journey"), t.get("difficulty"))] = per.get((t.get("journey"), t.get("difficulty")), 0) + 1
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
        if not any(t.get("journey") == J for t in d["terms"]): continue
        if not 5 <= yat.get(J, 0) <= 10: warn.append(f"{J}: やって みよう は {yat.get(J, 0)}語(5〜10語に)")
        if not 15 <= ses.get(J, 0) <= 25: warn.append(f"{J}: 店員さんの ひとこと は {ses.get(J, 0)}語(15〜25語に)")
        if J == "shortcut":
            nk = sum(1 for t in d["terms"] if t.get("journey") == J and t.get("keys"))
            if nk < 40: warn.append(f"shortcut: キーの ふだが {nk}語だけ")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("パソコンの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per


def main():
    d = load()
    if "--only" in sys.argv:
        j = sys.argv[sys.argv.index("--only") + 1]; d["terms"] = [t for t in d["terms"] if t.get("journey") == j]
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv or "--only" in sys.argv:
        print("パソコンの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/pasokon.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    # ふりがなの 読みまちがいを パソコンの ゲームの 中だけで 直す(ruby_fix.json に 入れると ほかの ゲームまで 変わるため)
    R = lambda a, b: (re.compile(a), b)
    FIX = [R(r"(?<![一-龥>])<ruby>数<rt>すう</rt></ruby>(?![一-龥]|<ruby>)", "<ruby>数<rt>かず</rt></ruby>"),
           R(r"1日<ruby>中<rt>ちゅう</rt></ruby>", "<ruby>1日中<rt>いちにちじゅう</rt></ruby>"),
           R(r"(<ruby>月<rt>がつ</rt></ruby>)1<ruby>日<rt>ひ</rt></ruby>", r"\1<ruby>1日<rt>ついたち</rt></ruby>"),
           # パソコンの 説明で 見つけた 読みまちがい(ここに 足す)
           # 「お客さんの 方(かた)」。この ゲームの 説明の「方」は ぜんぶ 人の こと(2026-10-03 に 1語ずつ 見た)
           R(r"<ruby>方<rt>ほう</rt></ruby>", "<ruby>方<rt>かた</rt></ruby>"),
           R(r"<ruby>札<rt>さつ</rt></ruby>", "<ruby>札<rt>ふだ</rt></ruby>"),
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
        if t.get("setsumei"): o["ss"] = t["setsumei"]; o["ssrb"] = rub(t["setsumei"])
        if t.get("keys"): o["ky"] = t["keys"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out)
    (ROOT / "pasokon").mkdir(exist_ok=True)
    (ROOT / "pasokon/terms.js").write_text("/* tools/pasokon/terms-*.json から tools/pasokon/terms_js.py が 作る。手で 直さない */\nconst PASOKON_TERMS = " +
                                          json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("pasokon/terms.js", len(out), "語", (ROOT / "pasokon/terms.js").stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
