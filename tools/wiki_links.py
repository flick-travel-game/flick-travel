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
NS = __import__("re").compile(r"^(Wikipedia|WP|Help|ヘルプ|Portal|ポータル|Template|Category|カテゴリ|File|ファイル|プロジェクト|特別|Special|利用者|User|MediaWiki):")
UA = "flick-travel-wiki-links/1.0 (https://flick-travel-game.github.io/flick-travel/)"


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
        lookup([t["name"] for t in terms], cache)
        # ⚠️ ふつうの 記事だけ(「Wikipedia:お知らせ」のような 案内の ページに 転送される ことが ある)
        wiki = {t["id"]: cache[t["name"]] for t in terms if cache.get(t["name"]) and not NS.match(cache[t["name"]]) and f"{g}:{t['id']}" not in NO_WIKI}
        (ROOT / g / "wiki.js").write_text(
            "/* ことば → Wikipedia の 記事の 題名(tools/wiki_links.py が 作る。手で 直さない) */\nconst WIKI = "
            + json.dumps(wiki, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
        print(f"  → {len(wiki)} / {len(terms)} に リンク", flush=True)


if __name__ == "__main__":
    main()
