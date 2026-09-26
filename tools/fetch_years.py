#!/usr/bin/env python3
"""偉人の 生まれた年・亡くなった年を Wikidata から 取る(歴史フリック旅行の 年表に 置くため)。
tools/people-*.tsv の 5列目(Wikipedia の題名)→ 記事の Wikidata ID → P569(生年)/P570(没年)。
結果は tools/people-years.json {key: [生年, 没年]}(紀元前は マイナス)。取れなかった人は 手で足す(MANUAL)。
python3 tools/fetch_years.py"""
import json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
UA = "FlickTravelGame/1.0 (small typing game; years) python-urllib"
MANUAL = {}  # key: [birth, death]
def get(url):
    for i in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA}); 
            with urllib.request.urlopen(req, timeout=60) as r: return json.loads(r.read().decode("utf-8"))
        except Exception as e:
            print("  ...", e, file=sys.stderr); time.sleep(20 if "429" in str(e) else 5)
    return {}
def year_of(claims, prop):
    for c in claims.get(prop, []):
        v = c.get("mainsnak", {}).get("datavalue", {}).get("value", {})
        t = v.get("time")
        if t:
            m = re.match(r"([+-])(\d+)-", t)
            if m: return int(m.group(2)) * (1 if m.group(1) == "+" else -1)
    return None
def main():
    rows = []
    for f in ("people-world.tsv", "people-japan.tsv"):
        for line in (ROOT / "tools" / f).read_text(encoding="utf-8").splitlines():
            if not line.strip() or line.startswith("#"): continue
            c = line.split("\t"); rows.append((c[0], c[4] or c[1]))
    out = ROOT / "tools/people-years.json"
    years = json.loads(out.read_text(encoding="utf-8")) if out.exists() else {}
    years = {k: v for k, v in years.items() if v[0] is not None}  # 取れなかった人は やりなおす
    todo = [(k, t) for k, t in rows if k not in years]
    # 題名 → Wikidata ID
    qid = {}
    for i in range(0, len(todo), 50):
        chunk = todo[i:i+50]
        q = urllib.parse.urlencode({"action":"query","format":"json","formatversion":"2","prop":"pageprops","ppprop":"wikibase_item","redirects":"1","titles":"|".join(t for _, t in chunk)})
        js = get("https://ja.wikipedia.org/w/api.php?" + q)
        red = {r["from"]: r["to"] for r in js.get("query", {}).get("redirects", [])}
        norm = {r["from"]: r["to"] for r in js.get("query", {}).get("normalized", [])}
        bytitle = {p["title"]: p.get("pageprops", {}).get("wikibase_item") for p in js.get("query", {}).get("pages", [])}
        for k, t in chunk:
            t2 = norm.get(t, t); t2 = red.get(t2, t2); qid[k] = bytitle.get(t2)
        time.sleep(2)
    ids = sorted({v for v in qid.values() if v})
    ent = {}
    for i in range(0, len(ids), 50):
        js = get("https://www.wikidata.org/w/api.php?" + urllib.parse.urlencode({"action":"wbgetentities","format":"json","props":"claims","ids":"|".join(ids[i:i+50])}))
        ent.update(js.get("entities", {})); time.sleep(2)
    for k, _ in todo:
        cl = ent.get(qid.get(k) or "", {}).get("claims", {})
        b, d = year_of(cl, "P569"), year_of(cl, "P570")
        if k in MANUAL: b, d = MANUAL[k]
        years[k] = [b, d]
    out.write_text(json.dumps(years, ensure_ascii=False, indent=0), encoding="utf-8")
    miss = [k for k, v in years.items() if v[0] is None]
    print(f"{len(years)}人。生年が取れなかった {len(miss)}: {miss}", file=sys.stderr)
if __name__ == "__main__": main()
