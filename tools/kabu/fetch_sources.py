#!/usr/bin/env python3
"""株式フリック旅行: 会社データの「もと」を 公開されている一覧から 取ってくる → tools/kabu/sources/*.json

    python3 tools/kabu/fetch_sources.py            # ぜんぶ
    python3 tools/kabu/fetch_sources.py cmc jpx    # 一部だけ

取るもの(どれも 公開の一覧。作り話を 入れないための もと):
- cmc      companiesmarketcap.com の 時価総額ランキング(世界 60ページ = 6,000社・日本 10ページ)。名前・ティッカー・国(国旗)・時価総額(ドル)・ページの場所
- nasdaq   api.nasdaq.com の 上場銘柄一覧(NASDAQ / NYSE / NYSE American)。取引所・セクター・業種・国
- jpx      日本取引所グループ「東証上場銘柄一覧」(data_j.xlsx)。正式な銘柄名・市場区分・33業種・TOPIX の 規模区分
- edinet   金融庁 EDINET の コードリスト。正式な社名・読み(カナ)・英語名・所在地
- fx       open.er-api.com の ドル円
⚠️ 取った日付を sources/meta.json に書く。時価総額は その日の数字(ゲームにも 日付を付けて 出す)"""
import csv, io, json, re, sys, time, urllib.request, zipfile, datetime
from pathlib import Path
OUT = Path(__file__).resolve().parent / "sources"
UA = {"User-Agent": "Mozilla/5.0 (flick-travel-game data build)"}

def get(url, binary=False, tries=4):
    for i in range(tries):
        try:
            b = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
            return b if binary else b.decode("utf-8")
        except Exception as e:
            if i == tries - 1: raise
            time.sleep(3 * (i + 1))

def flag_cc(s):
    m = re.search(r"([\U0001F1E6-\U0001F1FF])([\U0001F1E6-\U0001F1FF])", s)
    return (chr(ord(m.group(1)) - 0x1F1E6 + 65) + chr(ord(m.group(2)) - 0x1F1E6 + 65)) if m else ""

def parse_rows(page):
    """表の 1行ずつ(<tr>)に分けて 読む。1つの 大きな 正規表現だと 行によって ずれて 取りこぼした"""
    out = []
    for tr in page.split("<tr>")[1:]:
        rank = re.search(r'class="rank-td td-right" data-sort="(\d+)"', tr)
        link = re.search(r'<a href="/([^/"]+)/marketcap/"><div class="company-name">(.*?)</div><div class="company-code">.*?</span>(.*?)</div>', tr, re.S)
        if not (rank and link): continue
        tail = tr[link.end():]
        usd = re.search(r'class="td-right" data-sort="(\d+)"', tail)
        out.append(dict(rank=int(rank.group(1)), slug=link.group(1), name=re.sub(r"\s+", " ", link.group(2)).strip(),
                        ticker=link.group(3).strip(), usd=int(usd.group(1)) if usd else 0, cc=flag_cc(tail)))
    return out

def cmc_pages(base, n):
    out = []
    for p in range(1, n + 1):
        url = base if p == 1 else (base + f"page/{p}/" if base.endswith(".com/") else base + f"?page={p}")
        rows = parse_rows(get(url))
        if not rows: break
        out += rows
        time.sleep(0.6)
    return out

def cmc():
    g = cmc_pages("https://companiesmarketcap.com/", 60)
    j = cmc_pages("https://companiesmarketcap.com/japan/largest-companies-in-japan-by-market-cap/", 10)
    json.dump(dict(world=g, japan=j), open(OUT / "cmc.json", "w"), ensure_ascii=False)
    print("cmc", len(g), len(j))

def nasdaq():
    out = {}
    for ex, label in (("nasdaq", "NASDAQ"), ("nyse", "NYSE"), ("amex", "NYSE American")):
        rows = json.loads(get(f"https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25000&exchange={ex}&download=true"))["data"]["rows"]
        for r in rows:
            out[r["symbol"].strip()] = dict(name=r["name"], exchange=label, sector=r["sector"], industry=r["industry"], country=r["country"],
                                            usd=float(r["marketCap"] or 0))
    json.dump(out, open(OUT / "nasdaq.json", "w"), ensure_ascii=False)
    print("nasdaq", len(out))

def jpx():
    import openpyxl
    page = get("https://www.jpx.co.jp/markets/statistics-equities/misc/01.html")
    href = re.search(r'href="([^"]*data_j\.xlsx?)"', page).group(1)
    wb = openpyxl.load_workbook(io.BytesIO(get("https://www.jpx.co.jp" + href, binary=True)), read_only=True)
    rows = list(wb.active.iter_rows(values_only=True))
    out = {}
    for r in rows[1:]:
        code = str(r[1]).strip()
        out[code] = dict(date=r[0], name=r[2], market=r[3], s33=r[5], s17=r[7], size=r[9])
    json.dump(out, open(OUT / "jpx.json", "w"), ensure_ascii=False, default=str)
    print("jpx", len(out))

def edinet():
    z = zipfile.ZipFile(io.BytesIO(get("https://disclosure2dl.edinet-fsa.go.jp/searchdocument/codelist/Edinetcode.zip", binary=True)))
    text = z.read([n for n in z.namelist() if n.lower().endswith(".csv")][0]).decode("cp932")
    rows = list(csv.reader(text.splitlines()[2:]))
    out = {}
    for r in rows:
        if len(r) < 13 or r[2] != "上場" or not r[11].strip(): continue
        out[r[11].strip()[:4]] = dict(legal=r[6], en=r[7], yomi=r[8], address=r[9], industry=r[10])
    json.dump(out, open(OUT / "edinet.json", "w"), ensure_ascii=False)
    print("edinet", len(out))

def fx():
    d = json.loads(get("https://open.er-api.com/v6/latest/USD"))
    return d["rates"]["JPY"], d["time_last_update_utc"]

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    want = sys.argv[1:] or ["cmc", "nasdaq", "jpx", "edinet"]
    for w in want: globals()[w]()
    rate, when = fx()
    meta = dict(fetched=datetime.date.today().isoformat(), usdjpy=rate, usdjpy_at=when)
    json.dump(meta, open(OUT / "meta.json", "w"), ensure_ascii=False, indent=1)
    print(meta)
