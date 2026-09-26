#!/usr/bin/env python3
"""株式フリック旅行の 時価総額を その日の数字で 作りなおす → tools/companies-caps.json

    python3 tools/make_companies_caps.py 2026年9月26日

- 時価総額(ドル)は companiesmarketcap.com の 一覧(世界 1〜10ページ・日本 1〜4ページ)から
- ドル円は open.er-api.com から。画面には 小数1けたで出す(1ドル=157.5円)
- TSV(companies-japan / companies-world)に 出てくる ティッカーだけ しまう。見つからない ものが あれば 止まる
⚠️ そのあと index.html の CAP_ASOF / CAP_RATE を json と 同じ字に直して、add_spots.py → build_games.py
⚠️ 日付・レート・数字は かならず 同じ日に そろえる(日付を付けて 出す決まり。けいくん 2026-09-26)"""
import json, re, sys, urllib.request
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0"}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read().decode("utf-8")

def main():
    asof = sys.argv[1]
    pages = [f"https://companiesmarketcap.com/page/{p}/" if p > 1 else "https://companiesmarketcap.com/" for p in range(1, 11)]
    pages += ["https://companiesmarketcap.com/japan/largest-companies-in-japan-by-market-cap/" + (f"?page={p}" if p > 1 else "") for p in range(1, 5)]
    found = {}
    for url in pages:
        for name, code, rest in re.findall(r'<div class="company-name">(.*?)</div>.*?<div class="company-code">.*?</span>(.*?)</div>(.*?)</tr>', get(url), re.S):
            cap = re.search(r'data-sort="(\d+)"', rest)
            if cap: found.setdefault(code.strip(), dict(name=name.strip(), usd=int(cap.group(1))))
    rate = json.loads(get("https://open.er-api.com/v6/latest/USD"))["rates"]["JPY"]
    want = []
    for f in ("companies-japan", "companies-world"):
        for line in (ROOT / f"tools/{f}.tsv").read_text(encoding="utf-8").splitlines():
            if line.strip() and not line.startswith("#"): want.append(line.split("\t")[9])
    miss = [t for t in want if t not in found]
    assert not miss, f"一覧に 見つからない: {miss}"
    out = dict(asof=asof, rate=rate, rate_text=f"1ドル={rate:.1f}円", source="companiesmarketcap.com / open.er-api.com",
               caps={t: found[t] for t in want})
    (ROOT / "tools/companies-caps.json").write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{len(want)}社・{out['rate_text']}・{asof}")

if __name__ == "__main__":
    main()
