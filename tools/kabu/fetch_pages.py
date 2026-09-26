#!/usr/bin/env python3
"""株式フリック旅行: companiesmarketcap の 会社ページから「分類(カテゴリ)」と「英語の会社紹介」を 取る → sources/cmc_pages.json
説明文を 書くときの よりどころ(作り話に しないため)。とちゅうで 止めても つづきから 取れる。
    python3 tools/kabu/fetch_pages.py"""
import html, json, re, time, urllib.request
from pathlib import Path
HERE = Path(__file__).resolve().parent; OUT = HERE / "sources" / "cmc_pages.json"
UA = {"User-Agent": "Mozilla/5.0 (flick-travel-game data build)"}

def page(slug):
    for i in range(4):
        try:
            return urllib.request.urlopen(urllib.request.Request(f"https://companiesmarketcap.com/{slug}/marketcap/", headers=UA), timeout=40).read().decode("utf-8")
        except Exception as e:
            if getattr(e, "code", 0) == 404: return ""
            time.sleep(4 * (i + 1))
    return ""

def parse(s):
    cats = [html.unescape(re.sub(r"<[^>]+>", "", c)).strip() for c in re.findall(r'class="badge badge-light category-badge">(.*?)</(?:a|span|div)>', s)]
    t = re.sub(r"<script.*?</script>|<style.*?</style>", "", s, flags=re.S)
    t = html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", t)))
    i = t.find(" Categories ", max(0, t.find("Change (1 year)")))
    desc = t[i + 12:i + 12 + 600].strip() if i > 0 else ""
    desc = re.split(r" (?:Market cap Revenue|Market cap history|Market Cap history|Ranking|Market capitalization of) ", desc)[0]
    return dict(categories=[re.sub(r"^\W+", "", c).strip() for c in cats], desc=desc)

def main():
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))
    got = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    todo = [c["id"] for c in cands if not re.fullmatch(r"jp[0-9a-z]{4}", c["id"]) and c["id"] not in got]
    print("取る:", len(todo))
    for n, slug in enumerate(todo, 1):
        s = page(slug)
        got[slug] = parse(s) if s else dict(categories=[], desc="")
        if n % 50 == 0:
            OUT.write_text(json.dumps(got, ensure_ascii=False), encoding="utf-8"); print(n, flush=True)
        time.sleep(0.4)
    OUT.write_text(json.dumps(got, ensure_ascii=False), encoding="utf-8"); print("おわり", len(got))

if __name__ == "__main__":
    main()
