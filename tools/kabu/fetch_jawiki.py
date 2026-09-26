#!/usr/bin/env python3
"""株式フリック旅行: 日本の会社の 日本語版 Wikipedia の 冒頭(2文)を 取る → sources/jawiki.json
説明文を 書くときの よりどころ(文は 写さない。自分の言葉で 書く)。題名は EDINET の 正式な社名から「株式会社」を 外したもの
    python3 tools/kabu/fetch_jawiki.py"""
import json, re, time, unicodedata, urllib.parse, urllib.request
from pathlib import Path
HERE = Path(__file__).resolve().parent; OUT = HERE / "sources" / "jawiki.json"
UA = {"User-Agent": "flick-travel-game data build (https://github.com/flick-travel-game/flick-travel)"}

def title_of(c):
    e = c.get("edinet") or {}
    t = unicodedata.normalize("NFKC", e.get("legal") or c["srcName"])
    return re.sub(r"^株式会社|株式会社$", "", t).strip()

def main():
    cands = [c for c in json.loads((HERE / "candidates.json").read_text(encoding="utf-8")) if c["region"] == "日本"]
    got = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    todo = [c for c in cands if c["id"] not in got]
    for i in range(0, len(todo), 20):
        chunk = todo[i:i + 20]; titles = {title_of(c): c["id"] for c in chunk}
        q = urllib.parse.urlencode(dict(action="query", prop="extracts", exintro=1, explaintext=1, exsentences=2, redirects=1, format="json", titles="|".join(titles)))
        for k in range(5):
            try:
                d = json.loads(urllib.request.urlopen(urllib.request.Request("https://ja.wikipedia.org/w/api.php?" + q, headers=UA), timeout=40).read()); break
            except Exception:
                time.sleep(5 * (k + 1))
        red = {r["from"]: r["to"] for r in d["query"].get("redirects", [])} | {r["from"]: r["to"] for r in d["query"].get("normalized", [])}
        pages = {p["title"]: p for p in d["query"]["pages"].values()}
        for t, cid in titles.items():
            tt = red.get(red.get(t, t), red.get(t, t)); p = pages.get(tt, {})
            got[cid] = dict(title=tt if "missing" not in p else "", text=(p.get("extract") or "")[:300])
        time.sleep(1)
    OUT.write_text(json.dumps(got, ensure_ascii=False), encoding="utf-8")
    print(len(got), "見つからない:", sum(1 for v in got.values() if not v["title"]))

if __name__ == "__main__":
    main()
