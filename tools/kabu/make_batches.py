#!/usr/bin/env python3
"""株式フリック旅行: 読みがな・説明文・業種・知名度を 付けるための 下書きを 作る → enrich/in/<地域>-NN.jsonl
1行 = 1社。よりどころ(JPX の業種・EDINET の読み・Wikipedia の冒頭・NASDAQ の業種・companiesmarketcap の分類と英語の紹介)を そえる。
    python3 tools/kabu/make_batches.py 日本 170     # 地域 と 1ファイルの 社数"""
import json, re, sys, unicodedata
from pathlib import Path
HERE = Path(__file__).resolve().parent; SRC = HERE / "sources"

def hira(s): return "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in s)

def auto_reading(c):
    """(使っていない) EDINET の 読みは 小さい字を 大きく 書く 決まり(シヤ・ユー)なので そのままは 使えない。手がかりとして 渡すだけ"""
    e = c.get("edinet") or {}
    if not e: return ""
    legal = re.sub(r"^株式会社|株式会社$", "", unicodedata.normalize("NFKC", e["legal"])).strip()
    if legal != unicodedata.normalize("NFKC", c["srcName"]).strip(): return ""
    y = re.sub(r"^カブシキ[ガカ]イシャ|カブシキ[ガカ]イシャ$", "", unicodedata.normalize("NFKC", e["yomi"])).strip()
    y = hira(y).replace(" ", "").replace("　", "")
    return y if re.fullmatch(r"[ぁ-ゖー]+", y) else ""

def main():
    reg, size = sys.argv[1], int(sys.argv[2])
    cands = [c for c in json.loads((HERE / "candidates.json").read_text(encoding="utf-8")) if c["region"] == reg]
    pages = {}
    for n in ("cmc_pages_b.json", "cmc_pages.json"):  # _b = 取りこみを 2本で 走らせたときの もう1つ
        if (SRC / n).exists(): pages.update(json.loads((SRC / n).read_text(encoding="utf-8")))
    jw = json.loads((SRC / "jawiki.json").read_text(encoding="utf-8")) if (SRC / "jawiki.json").exists() else {}
    rows = []
    for c in cands:
        pg = pages.get(c["id"], {}); desc = pg.get("desc", "")
        if desc.startswith("Market cap"): desc = ""
        r = dict(id=c["id"], srcName=unicodedata.normalize("NFKC", c["srcName"]), srcNameEn=c["srcNameEn"], country=c["country"], region=c["region"],
                 ticker=c["ticker"], exchange=c["exchange"], capUSDbillion=round((c.get("usd") or 0) / 1e9, 1))
        if c.get("jpx"): r["jpx業種"] = c["jpx"]["s33"]; r["TOPIX"] = c["jpx"]["size"]
        if c.get("edinet"): r["edinetYomi"] = c["edinet"]["yomi"]; r["legalName"] = c["edinet"]["legal"]; r["address"] = c["edinet"]["address"]
        if reg == "日本":
            w = jw.get(c["id"]) or {}
            if w.get("text"): r["jawiki"] = w["text"]; r["jawikiTitle"] = w["title"]
        if c.get("nasdaq"): r["nasdaqSector"] = c["nasdaq"]["sector"]; r["nasdaqIndustry"] = c["nasdaq"]["industry"]
        if pg.get("categories"): r["categories"] = pg["categories"]
        if desc: r["about"] = desc[:420]
        if c.get("old"): r["oldName"] = c["old"][1]; r["oldReading"] = c["old"][3]; r["oldDescription"] = c["old"][5]
        rows.append(r)
    tag = {"日本": "jp", "アメリカ": "us", "ヨーロッパ": "eu", "アジア・太平洋": "ap", "その他": "ot"}[reg]
    for i in range(0, len(rows), size):
        (HERE / "enrich/in" / f"{tag}-{i // size + 1:02d}.jsonl").write_text("\n".join(json.dumps(x, ensure_ascii=False) for x in rows[i:i + size]) + "\n", encoding="utf-8")
    print(reg, len(rows), "→", (len(rows) + size - 1) // size, "ファイル")

if __name__ == "__main__":
    main()
