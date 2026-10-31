#!/usr/bin/env python3
"""ことばの ゲームに「📖 Wikipedia で くわしく」を 付ける(けいくん 2026-10-18「すべてのフリックゲームで … Wikipedia の説明リンクつきに」→「全ゲームで付ける」)。

data/<ゲーム>.json の ことばの 名前と **同じ 題名の 記事が 日本語版 Wikipedia に ある** ものだけ リンクに する。
- 記事が 無い / 曖昧さ回避の ページ(いくつかの 意味が ならぶ ページ)は 付けない
- 転送(リダイレクト)は 転送先の 題名を 使う
- 答えは tools/wiki-titles.json に おぼえる(止まっても もう一度 走らせれば つづきから。2回目からは ネットに 聞かない)
- できるのは <ゲーム>/wiki.js(const WIKI = {ことばid: 題名})。tools/build_games.py が あれば <script> を 足す。
  画面は index.html の gmapLink() が WIKI を 見て リンクを 出す
⚠️ ことばの ゲームでは ない 英会話・韓国語・スペイン語は しない(英単語の 記事は 意味が ちがう)
⚠️ 合わない 記事に つながる ことばは NO_WIKI に 書いて 外す

使いかた(flick-travel/ で):  python3 tools/wiki_links.py [ゲーム ...]
"""
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "tools" / "wiki-titles.json"  # 名前 → 題名(無ければ null)
DATA = {"ai": "aiTerms"}  # ゲームの フォルダ → data/ の ファイル名(ちがう ものだけ)
SKIP = {"eikaiwa", "kankoku", "supein", "kabu", "uchu", "karada", "rika", "rekishi"}  # ことばの 旅では ない / もう リンクが ある
NO_WIKI = {}  # "ゲーム:ことばid" → 理由(合わない 記事。見つけたら 足す)
NO_WIKI.update({"inu:nk-gururu": "神話の 記事", "inu:nk-kyan": "動物の べつの 記事", "inu:kr-gohan": "人の ごはんの 記事", "inu:kr-toilet": "人の 便器の 記事", "inu:kr-enrich": "栄養の べつの 記事", "inu:st-reward": "賞の 記事", "inu:st-handsign": "鉄道の 記事", "inu:st-uturn": "道路の 記事", "inu:km-fearful": "映画の 記事", "inu:km-separation": "人の 病気の 記事", "inu:ym-freeze": "コンピューターの 記事", "inu:ym-slow-motion": "映像の 記事", "inu:ks-kogata": "犬 全体の 記事", "inu:az-microchip": "電子部品の 記事", "inu:az-yellow": "べつの 意味の 記事", "inu:kk-ima": "映画の 記事", "inu:kk-nakayoshi": "雑誌の 記事", "inu:kr-omocha-bako": "音楽の 記事", "inu:kr-hayagui": "人の 大食いの 記事", "inu:kd-nonrem": "べつの 睡眠の 記事", "inu:kd-maeba": "奥歯の 記事", "inu:ks-chugata": "犬 全体の 記事", "inu:ks-oogata": "犬 全体の 記事", "inu:ks-satooya": "人の 里親の 記事", "inu:ym-chuusai": "人の 仲裁の 記事"})  # フリック犬の気持ち(2026-10-24。146語を 目で 見て 外した)
NO_WIKI.update({"mentalist:ki-tane": "植物の 種子の 記事", "mentalist:ki-fushigi": "数の 単位の 記事", "mentalist:sr-kijunten": "測量の 記事", "mentalist:sr-priming": "記憶 全体の 記事",
                "mentalist:ka-suiri": "推理小説の 記事", "mentalist:kk-mnemonic": "プログラムの 記事", "mentalist:bu-showmanship": "プロレスの 記事", "mentalist:bu-patter": "ゴルフの 記事",
                "mentalist:js-akakuro": "小説の 記事", "mentalist:sr-gentei": "べつの 意味の 記事", "mentalist:ki-routine": "べつの 意味の 記事", "mentalist:js-renshu": "学習 全体の 記事",
                "mentalist:kt-oumu": "医療の ことばの 記事", "mentalist:kt-hiyu": "べつの ことばの 記事", "mentalist:ki-effect": "べつの 意味の 記事", "mentalist:ki-effecten": "音響の 記事",
                "mentalist:kk-katamari": "べつの 意味の 記事", "mentalist:kk-kirokukai": "陸上競技の 記事"})
NO_WIKI.update({"supercar:ki-premiere": "演劇の 初演の 記事", "supercar:ki-lhd": "輸入車の 記事", "supercar:it-cavallino": "歌の 記事", "supercar:it-bizzarrini": "メーカーの 一覧", "supercar:gb-cx75": "ガスタービンの 記事",
                "supercar:hy-hypersport": "ゲームの 記事", "supercar:hy-gte": "電話の 会社の 記事", "supercar:dn-ghia": "歯車の 記事", "supercar:ki-maker": "製造業 全体の 記事", "supercar:gi-dihedral": "ガルウィング(べつの ドア)",
                "supercar:ki-weight": "乾燥重量(べつの はかりかた)", "supercar:gi-pullrod": "べつの 足まわりの 記事"})
# フリック気象予報士(2026-10-31): 転送先が べつの もの・広すぎる・古い よび名の 記事を 外した
NO_WIKI.update({"kisho:ki-yabane": "矢(武器)の 記事", "kisho:ge-riming": "押韻(詩)の 記事", "kisho:ka-himawari": "花の ヒマワリの 記事", "kisho:ka-koshiten": "数学の 記事",
                "kisho:ta-churitsu": "数学の 不動点の 記事", "kisho:ta-hozonryo": "力学の べつの 記事", "kisho:ho-caster": "ニュースキャスターの 記事", "kisho:ho-juken": "入学試験の 記事",
                "kisho:ho-jitsugishiken": "広すぎる 記事", "kisho:ni-shou": "雨 全体の 記事", "kisho:ni-nihonkaigawa": "古い よび名(裏日本)の 記事", "kisho:ni-taiheiyogawa": "古い よび名(表日本)の 記事",
                "kisho:ta-chikyuhosha": "気温の 記事", "kisho:ta-kennetsu": "相転移の 記事", "kisho:ta-jokuu": "空 全体の 記事", "kisho:ho-kokka": "資格 全体の 記事"})
ALT_DOT = {"supercar"}  # 名前の 空白を「・」に した 題名も さがす ゲーム
# フリックキャビンアテンダント(2026-10-21): 転送先が べつの もの・会社名・決めつけに なる 記事を 外した
NO_WIKI.update({"cabin:ei-visa": "カードの 会社の 記事", "cabin:ei-delayed": "英語の 作品名の 記事", "cabin:ki-pitch": "座席 全体の 記事", "cabin:ki-doorhandle": "家の ドアノブの 記事",
                "cabin:ho-sansohassei": "酸素濃縮器(べつの 機械)", "cabin:ma-nijukeigo": "「日本語の乱れ」は 人を 責める 向き", "cabin:ku-okidome": "ボーディング・ブリッジ(反対の もの)",
                "cabin:sh-briefing": "会議 全体の 記事", "cabin:sh-suihei": "飛翔(鳥なども ふくむ 記事)"})
NS = __import__("re").compile(r"^(Wikipedia|WP|Help|ヘルプ|Portal|ポータル|Template|Category|カテゴリ|File|ファイル|プロジェクト|特別|Special|利用者|User|MediaWiki):")
UA = "flick-travel-wiki-links/1.0 (https://flick-travel-game.github.io/flick-travel/)"


NO_WIKI.update({"volley:kh-reception": "パーティーの 記事", "volley:kh-fullset": "べつの 作品の 記事", "volley:kh-shoes": "上履きの 記事", "volley:rl-handset": "電話機の 記事", "volley:lg-kogohai": "べつの 大会の 記事", "volley:lg-champs": "選手権 全体の 記事", "volley:lg-scudetto": "サッカーの 記事", "volley:tm-trentino": "県の 記事", "volley:st-darlan": "べつの 人の 記事", "volley:st-akimoto": "べつの 名前の 記事", "volley:wz-broad": "車の 記事", "volley:wz-inner": "下着の 記事", "volley:tc-haikyu": "野球の 記事", "volley:tc-scouting": "べつの 運動の 記事", "volley:lg-regular": "スポーツ 全体の 記事", "volley:lg-roundrobin": "リーグ戦 全体の 記事"})  # フリックワールドバレーボール(2026-10-24。目で 見て 外した)

def api(params):
    """POST で 聞く(題名が 50こ でも URL が 長く ならない)。429 は Retry-After だけ 待つ。呼ぶ あいだは 2秒 あける"""
    data = urllib.parse.urlencode(params).encode("utf-8")
    for tries in range(12):
        time.sleep(2)
        req = urllib.request.Request("https://ja.wikipedia.org/w/api.php", data=data,
                                     headers={"User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            wait = int(e.headers.get("Retry-After", "30") or 30) if e.code == 429 else 10
            print(f"  …{e.code} {wait}秒 まって やりなおし", flush=True)
            time.sleep(min(wait, 300) + 1)
        except Exception as e:  # noqa: BLE001
            print("  …やりなおし", e, flush=True)
            time.sleep(10)
    raise SystemExit("Wikipedia に つながりません")


def lookup(names, cache):
    todo = [n for n in dict.fromkeys(names) if n not in cache]
    for i in range(0, len(todo), 50):
        batch = todo[i:i + 50]
        js = api({"action": "query", "titles": "|".join(batch), "redirects": 1, "prop": "pageprops",
                  "ppprop": "disambiguation", "format": "json", "formatversion": 2})
        q = js.get("query", {})
        norm = {n["from"]: n["to"] for n in q.get("normalized", [])}
        redir = {r["from"]: r["to"] for r in q.get("redirects", [])}
        pages = {p["title"]: p for p in q.get("pages", [])}
        for n in batch:
            t = redir.get(norm.get(n, n), norm.get(n, n))
            p = pages.get(t)
            ok = p is not None and p.get("ns", 0) == 0 and not p.get("missing") and not p.get("invalid") and "disambiguation" not in (p.get("pageprops") or {})
            cache[n] = t if ok else None
        CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=0, sort_keys=True), encoding="utf-8")
        print(f"  {min(i + 50, len(todo))}/{len(todo)}", flush=True)


def games():
    for d in sorted(ROOT.iterdir()):
        if not (d / "index.html").exists() or d.name in SKIP:
            continue
        f = ROOT / "data" / f"{DATA.get(d.name, d.name)}.json"
        if f.exists():
            yield d.name, f


def main():
    only = set(sys.argv[1:])
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    for g, f in games():
        if only and g not in only:
            continue
        terms = json.loads(f.read_text(encoding="utf-8"))["terms"]
        print(g, len(terms), flush=True)
        # ⭐ スーパーカーは「フェラーリ F40」→ 記事は「フェラーリ・F40」の 形が 多い。空白を「・」に した 名前も 聞いて、ある ほうを 使う(2026-10-21)
        alt = {t["name"]: t["name"].replace(" ", "・") for t in terms if g in ALT_DOT and " " in t["name"]}
        lookup([t["name"] for t in terms] + list(alt.values()), cache)
        for n, v in alt.items():
            if not cache.get(n) and cache.get(v): cache[n] = cache[v]
        if alt: CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=0, sort_keys=True), encoding="utf-8")  # 写真(fetch_game_photos.py)も 名前で 引くので おぼえる
        # ⚠️ ふつうの 記事だけ(「Wikipedia:お知らせ」のような 案内の ページに 転送される ことが ある)
        wiki = {t["id"]: cache[t["name"]] for t in terms if cache.get(t["name"]) and not NS.match(cache[t["name"]]) and f"{g}:{t['id']}" not in NO_WIKI}
        (ROOT / g / "wiki.js").write_text(
            "/* ことば → Wikipedia の 記事の 題名(tools/wiki_links.py が 作る。手で 直さない) */\nconst WIKI = "
            + json.dumps(wiki, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
        print(f"  → {len(wiki)} / {len(terms)} に リンク", flush=True)


if __name__ == "__main__":
    main()
