#!/usr/bin/env python3
"""tools/eigo/kana_dict.tsv(語ごとの 読み)から terms-<旅>.json の reading と acceptedReadings を 作りなおす
    python3 tools/eigo/make_readings.py
- 読みは 語ごとの 読みを 半角スペースで つなげた もの(どぅー でぃっど だん)。画面では 語ごとに すき間を あけて 見せ、打つ 字は スペースを 外した もの(フリック英会話 data/english.json と 同じ 読みかた)。決まりは tools/eigo/PROMPT.md
- 辞書に ない 語が あれば 止まる(kana_dict.tsv に 1行 足してから もう一度)
- 同じ つづりで 読みが 変わる 語(read の 過去形 など)は 下の OVERRIDE に 例文の id ごとに 書く
- acceptedReadings は ゆれる 読みが ある ときだけ。先頭は reading、つぎに ゆれ1 / ゆれ2 を ぜんぶの 語で 入れかえた もの
- reading は ja の すぐ あと。ほかの 欄は さわらない"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
JOURNEYS = ["fudoshi", "jisei", "uke", "tofutei", "bunshi", "kankei", "hikaku", "katei", "jukugo"]

# 例文の id → {語: [読み, ゆれ…]}。「語#2」は その文の 2つめに 出てくる その語だけ
OVERRIDE = {
    "fu-read": {"read#2": ["れっど"], "read#3": ["れっど"]},       # read - read - read(過去・過去分詞は れっど)
    "ji-notreadyet": {"read": ["れっど"]},                          # haven't read(過去分詞)
    "ka-bookread": {"read": ["れっど"]},                            # The book I read yesterday(過去)
    "bs-bookwritten": {"read": ["りーど", "れっど"]},               # I read a book …(今とも 過去とも 読める)
    "fu-wind": {"wind": ["わいんど"]},                              # 動詞の wind(まく)
    "ju-usedto": {"used": ["ゆーすと", "ゆーずど"]},                # used to(〜したものだ)
    "to-usedto": {"used": ["ゆーすと", "ゆーずど"]},                # be used to(慣れている)
    "to-nouse": {"use": ["ゆーす", "ゆーず"]},                      # no use(名詞)
    "ju-makeuseof": {"use": ["ゆーす", "ゆーず"]},                  # make use of(名詞)
}
KANA = re.compile(r"[ぁ-ゖー]+")

def load_dict():
    D = {}
    for n, line in enumerate((HERE / "kana_dict.tsv").read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip() or line.startswith("#"): continue
        cols = line.split("\t")
        w, main = cols[0], cols[1]
        var = [x for x in (cols[2] if len(cols) > 2 else "").split(",") if x]
        if w in D: sys.exit(f"kana_dict.tsv {n}行目: 「{w}」が 2回 ある")
        if len(var) > 2: sys.exit(f"kana_dict.tsv {n}行目: ゆれる 読みは 2つまで")
        for r in [main] + var:
            if not KANA.fullmatch(r): sys.exit(f"kana_dict.tsv {n}行目: 読み「{r}」は ひらがなと ー だけ")
        D[w] = [main] + var
    return D

def readings_of(item, D, missing):
    ov = OVERRIDE.get(item["id"], {}); seen = {}; parts = []
    for tok in re.findall(r"[A-Za-z']+", item["name"]):
        w = tok.lower(); seen[w] = seen.get(w, 0) + 1
        r = ov.get(f"{w}#{seen[w]}") or ov.get(w) or D.get(w)
        if r is None: missing.setdefault(w, []).append(item["id"]); r = ["?"]
        parts.append(r)
    main = " ".join(p[0] for p in parts)  # 語と 語の あいだは 半角スペース(画面で 区切って 見せる。打つ ときは いらない。けいくん 2026-10-11)
    alts = [main]
    for k in (1, 2):  # ゆれ k を ぜんぶの 語で 入れかえる(ゆれが 少ない 語は いちばん 後ろの ゆれ)
        a = " ".join(p[min(k, len(p) - 1)] for p in parts)
        if a not in alts: alts.append(a)
    return main, alts

def main():
    D = load_dict(); missing = {}; files = {}
    for j in JOURNEYS:
        p = HERE / f"terms-{j}.json"
        files[p] = json.loads(p.read_text(encoding="utf-8"))
    for ov_id in OVERRIDE:
        if not any(t["id"] == ov_id for data in files.values() for t in data): sys.exit(f"OVERRIDE の id「{ov_id}」が ない")
    out = {}
    for p, data in files.items():
        new = []
        for t in data:
            r, alts = readings_of(t, D, missing)
            n = {}
            for k, v in t.items():
                if k in ("reading", "acceptedReadings"): continue
                n[k] = v
                if k == "ja":
                    n["reading"] = r
                    if len(alts) > 1: n["acceptedReadings"] = alts
            if "reading" not in n: sys.exit(f"{t['id']}: ja が ない")
            new.append(n)
        out[p] = new
    if missing:
        for w, ids in sorted(missing.items()): print(f"❌ 辞書に ない 語「{w}」: {', '.join(ids[:5])}")
        sys.exit(f"kana_dict.tsv に {len(missing)}語 足してください")
    for p, new in out.items():
        p.write_text(json.dumps(new, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"✅ {sum(len(v) for v in out.values())}問の 読みを 作りなおしました(辞書 {len(D)}語)")

if __name__ == "__main__":
    main()
