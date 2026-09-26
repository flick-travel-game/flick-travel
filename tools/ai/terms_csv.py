#!/usr/bin/env python3
"""AIフリック旅行の ことば: 表計算ソフト(CSV / TSV)⇄ data/aiTerms.json
ことばの 正本は data/aiTerms.json の 1か所。まとめて 足す・直すときは 表で 作業して ここで もどす。
    python3 tools/ai/terms_csv.py export data/aiTerms.csv          # JSON → CSV(Excel・Googleスプレッドシートで ひらける)
    python3 tools/ai/terms_csv.py import data/aiTerms.csv          # CSV → JSON(id が 同じ ことばは 上書き、新しい id は 足す)
    python3 tools/ai/terms_csv.py import new.tsv --replace         # ぜんぶ 置きかえ(表に 無い ことばは 消える)
- 1行 = 1語。列は COLS の とおり(1行目は 見出し)。.tsv なら タブ区切り
- いくつかの 値を 入れる 列(acceptedReadings・relatedTerms)は「|」で 区切る
- acceptedReadings が 空なら reading だけ。reading は かならず acceptedReadings の 先頭に 入る
- 取りこんだあと tools/ai/terms_js.py(= tools/build_games.py)が 形を 確かめる。まちがいが あれば 止まる"""
import csv, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent.parent
JSON = ROOT / "data/aiTerms.json"
COLS = ["id", "name", "reading", "acceptedReadings", "journey", "category", "difficulty", "type", "emoji", "mapNode",
        "relatedTerms", "description", "example", "asOf"]
LIST = ("acceptedReadings", "relatedTerms")

def load():
    return json.loads(JSON.read_text(encoding="utf-8"))

def save(d):
    JSON.write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

def row_to_term(r):
    t = {}
    for k in COLS:
        v = (r.get(k) or "").strip()
        if k in LIST: t[k] = [x.strip() for x in v.split("|") if x.strip()]
        elif k == "difficulty": t[k] = int(v)
        elif v or k not in ("example", "asOf"): t[k] = v
    alts = [t["reading"]] + [a for a in t["acceptedReadings"] if a != t["reading"]]
    t["acceptedReadings"] = alts
    return t

def export(path):
    d = load(); p = Path(path); tsv = p.suffix == ".tsv"
    with p.open("w", encoding="utf-8-sig" if not tsv else "utf-8", newline="") as f:
        w = csv.DictWriter(f, COLS, delimiter="\t" if tsv else ",")
        w.writeheader()
        for t in d["terms"]:
            w.writerow({k: "|".join(t.get(k) or []) if k in LIST else t.get(k, "") for k in COLS})
    print(path, len(d["terms"]), "語")

def do_import(path, replace):
    d = load(); p = Path(path); tsv = p.suffix == ".tsv"
    with p.open(encoding="utf-8-sig", newline="") as f:
        rows = [row_to_term(r) for r in csv.DictReader(f, delimiter="\t" if tsv else ",") if (r.get("id") or "").strip()]
    if replace: d["terms"] = rows
    else:
        by = {t["id"]: i for i, t in enumerate(d["terms"])}
        for t in rows:
            if t["id"] in by: d["terms"][by[t["id"]]] = t
            else: d["terms"].append(t)
    save(d)
    print("data/aiTerms.json", len(d["terms"]), "語(取りこみ", len(rows), "行)")

if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) >= 2 and a[0] == "export": export(a[1])
    elif len(a) >= 2 and a[0] == "import": do_import(a[1], "--replace" in a)
    else: print(__doc__); sys.exit(1)
