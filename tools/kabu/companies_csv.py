#!/usr/bin/env python3
"""data/companies.json ⇄ CSV(表計算ソフトで まとめて 直すため)
    python3 tools/kabu/companies_csv.py export data/companies.csv     # JSON → CSV
    python3 tools/kabu/companies_csv.py import data/companies.csv     # CSV → JSON(id で 上書き・足す。CSV に 無い 会社は そのまま)
    python3 tools/kabu/companies_csv.py import data/companies.csv --replace   # CSV の 中身で ぜんぶ 置きかえる
- index は「・」で つなぐ(例 TOPIX Core30)。adr は 1 / 空
- そのあと python3 tools/build_games.py で ゲームに 入る(kabu/companies.js を 作りなおす)"""
import csv, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent.parent
COLS = ["id", "name", "reading", "nameJa", "country", "countryCode", "region", "sector", "industry", "description", "detail", "ticker", "exchange", "adr",
        "course", "difficulty", "fame", "fameRank", "marketImportance", "marketCapUSD", "marketCapText", "icon", "index", "url", "wiki"]
INT = {"difficulty", "fame", "fameRank", "marketImportance", "marketCapUSD"}

def main():
    cmd, path = sys.argv[1], Path(sys.argv[2])
    jp = ROOT / "data/companies.json"; d = json.loads(jp.read_text(encoding="utf-8"))
    if cmd == "export":
        with path.open("w", newline="", encoding="utf-8-sig") as f:
            w = csv.DictWriter(f, COLS); w.writeheader()
            for c in d["companies"]:
                w.writerow({k: ("・".join(c.get(k) or []) if k == "index" else (1 if c.get(k) else "") if k == "adr" else c.get(k, "")) for k in COLS})
        print("書いた", path, len(d["companies"]))
        return
    rows = []
    with path.open(encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            c = {}
            for k in COLS:
                v = (r.get(k) or "").strip()
                if k == "index": c[k] = [x for x in v.split("・") if x]
                elif k == "adr": c[k] = v in ("1", "true", "TRUE")
                elif k in INT: c[k] = int(float(v)) if v else None
                elif v: c[k] = v
            rows.append(c)
    if "--replace" in sys.argv: d["companies"] = rows
    else:
        by = {c["id"]: c for c in d["companies"]}
        for c in rows: by[c["id"]] = {**by.get(c["id"], {}), **c}
        d["companies"] = sorted(by.values(), key=lambda c: c.get("fameRank") or 10**9)
    jp.write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    sys.path.insert(0, str(ROOT / "tools/kabu")); import companies_js; companies_js.check(d)
    print("data/companies.json を 更新", len(d["companies"]), "社")

if __name__ == "__main__":
    main()
