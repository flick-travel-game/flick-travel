#!/usr/bin/env python3
"""株式フリック旅行: sources/ から 約2,400社を えらぶ → tools/kabu/candidates.json

えらびかた(時価総額だけに かたよらないよう 地域ごとに 枠を決める):
- 日本 500社 … JPX の TOPIX 規模区分 Core30 / Large70 / Mid400 + いままでの ゲームの 日本の会社100社(必ず 入れる)。多ければ 時価総額の 小さい順に けずる
- アメリカ 850 / ヨーロッパ 450 / アジア・太平洋 400 / その他 200 … companiesmarketcap の 時価総額の 順。いままでの 世界の会社100社は 必ず 入れる
- ロシアの会社・国の分からない会社は 入れない
⚠️ ここで 決めるのは 「どの会社を 入れるか」だけ。コース(入門〜マスター)は 知名度を 付けたあと build_companies.py が 決める"""
import html, json, re
from pathlib import Path
from regions import COUNTRY, SUFFIX
HERE = Path(__file__).resolve().parent; SRC = HERE / "sources"; ROOT = HERE.parent.parent
QUOTA = {"日本": 500, "アメリカ": 850, "ヨーロッパ": 450, "アジア・太平洋": 400, "その他": 200}
# アメリカで 売られている 日本の会社の ティッカー(ADR)→ 東証の コード(JPX の 銘柄名で 確かめた)
ADR_JP = {"MUFG":"8306", "TM":"7203", "SMFG":"8316", "SONY":"6758", "MFG":"8411", "TAK":"4502", "HMC":"7267", "IX":"8591", "NMR":"8604", "CHBAY":"8331", "NINOY":"7731"}

# 入れない会社(ロシアで事業をしている会社・名前だけ残っているもの)
EXCLUDE = {"Ozon"}

def load(n): return json.loads((SRC / n).read_text(encoding="utf-8"))

def main():
    cmc = load("cmc.json"); nq = load("nasdaq.json"); jpx = load("jpx.json"); ed = load("edinet.json")
    # ── 日本 ──
    jp_by_code = {}
    for x in cmc["japan"] + [w for w in cmc["world"] if w["cc"] == "JP"]:
        code = ADR_JP.get(x["ticker"]) or (x["ticker"][:-2] if x["ticker"].endswith(".T") else None)
        if code and code not in jp_by_code: jp_by_code[code] = x
    old_jp = [l.split("\t") for l in (ROOT / "tools/companies-japan.tsv").read_text(encoding="utf-8").splitlines()[1:] if l.strip()]
    must_jp = {}
    for r in old_jp:
        code = ADR_JP.get(r[9]) or r[9].replace(".T", "")
        must_jp[code] = r
    codes = [c for c, v in jpx.items() if v["size"] in ("TOPIX Core30", "TOPIX Large70", "TOPIX Mid400")]
    codes = list(dict.fromkeys(codes + list(must_jp)))
    codes.sort(key=lambda c: -(jp_by_code.get(c, {}).get("usd") or 0))
    # 足りなければ TOPIX Small 1 から 時価総額の 大きい順に 足す(ぜんぶで 2,400社に そろえる)
    small = sorted((c for c, v in jpx.items() if v["size"] == "TOPIX Small 1" and c not in codes and c in jp_by_code), key=lambda c: -jp_by_code[c]["usd"])
    codes += small[:max(0, QUOTA["日本"] - len(codes))]
    while len(codes) > QUOTA["日本"]:
        drop = next(c for c in reversed(codes) if c not in must_jp); codes.remove(drop)
    out = []
    for c in codes:
        j = jpx[c]; x = jp_by_code.get(c, {}); e = ed.get(c, {})
        out.append(dict(id=x.get("slug") or f"jp{c.lower()}", region="日本", cc="JP", country="日本", ticker=c,
                        exchange="東京証券取引所 " + j["market"].split("（")[0], srcName=j["name"], srcNameEn=e.get("en") or x.get("name", ""),
                        usd=x.get("usd"), jpx=dict(s33=j["s33"], s17=j["s17"], size=j["size"]), edinet=e or None,
                        old=must_jp[c] if c in must_jp else None))
    # ── 世界 ──
    old_w = [l.split("\t") for l in (ROOT / "tools/companies-world.tsv").read_text(encoding="utf-8").splitlines()[1:] if l.strip()]
    must_w = {r[9]: r for r in old_w}
    by_region = {k: [] for k in QUOTA if k != "日本"}
    for x in cmc["world"]:
        cc = x["cc"]
        if cc in ("JP", "RU", "") or cc not in COUNTRY or x["name"] in EXCLUDE: continue
        by_region[COUNTRY[cc][1]].append(x)
    for reg, lst in by_region.items():
        pick = [x for x in lst if x["ticker"] in must_w]
        for x in lst:
            if len(pick) >= QUOTA[reg]: break
            if x not in pick: pick.append(x)
        for x in pick:
            t = x["ticker"]; m = re.match(r"^(.*)\.([A-Z]+)$", t)
            if m:
                tick, exch, adr = m.group(1), SUFFIX.get(m.group(2), ""), False
            else:
                n = nq.get(t) or nq.get(t.replace("-", "/")) or nq.get(t.replace(".", "/")) or {}
                tick, exch = t, n.get("exchange", "")
                adr = bool(n) and x["cc"] != "US"
            n = nq.get(t) or {}
            out.append(dict(id=x["slug"], region=reg, cc=x["cc"], country=COUNTRY[x["cc"]][0], ticker=tick, exchange=exch, adr=adr,
                            srcName=html.unescape(x["name"]), srcNameEn=html.unescape(x["name"]), usd=x["usd"], rank=x["rank"],
                            nasdaq=dict(sector=n.get("sector"), industry=n.get("industry")) if n else None,
                            old=must_w.get(t)))
    ids = [o["id"] for o in out]; assert len(ids) == len(set(ids)), "id がかぶる"
    (HERE / "candidates.json").write_text(json.dumps(out, ensure_ascii=False, indent=0), encoding="utf-8")
    from collections import Counter
    print(len(out), Counter(o["region"] for o in out), "旧:", sum(1 for o in out if o["old"]), "取引所なし:", [o["srcName"] for o in out if not o["exchange"]][:30])

if __name__ == "__main__":
    main()
