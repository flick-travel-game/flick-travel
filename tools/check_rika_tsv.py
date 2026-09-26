#!/usr/bin/env python3
"""理科フリック旅行の TSV(10列)の形を確かめる。 python3 tools/check_rika_tsv.py [tools/rika.tsv ...]
10列: key 名前 分類 よみ 絵文字 解説 図 区画 学年 Wikipedia題名
- 図 = phys / chem / ptable / bio / geo(どの 図に 📍を 立てるか)。ptable の 区画は 原子番号(1〜118)
- 学年 = e(小学校)/ j(中学校・高校受験)/ h(高校・大学受験)。レベルは 学年 → 打ちやすさ の順に 並ぶ
- key の あたまで 旅が きまる: phy = 物理 / chm と el = 化学 / bio = 生物 / geo = 地学
- ほかの ゲーム(宇宙・からだ など)に もう ある 名前・よみは 入れない(同じ ことばが 2つの ゲームに 出ないように)"""
import json, re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
ZONES = {
    "phys": {"force", "energy", "elec", "wave", "atom"},
    "chem": {"matter", "sol", "react", "bond", "organic", "lab"},
    "bio": {"plant", "animal", "eco", "evo", "micro"},
    "geo": {"weather", "air", "river", "strata", "volcano", "quake", "inside"},
}
PREFIX = {"phy": "phys", "chm": "chem", "el": "chem", "bio": "bio", "geo": "geo"}


def mode_of(key):
    for p, m in PREFIX.items():
        if key.startswith(p):
            return m
    return None


def others():
    """ほかの ゲームの 名前と よみ"""
    names, yomis = set(), set()
    for p in (ROOT / "tools").glob("*.tsv"):
        if p.name.startswith("rika"):
            continue
        for line in p.read_text(encoding="utf-8").splitlines():
            if line.strip() and not line.startswith("#"):
                f = line.split("\t")
                if len(f) > 3:
                    names.add(f[1]); yomis.add(f[3])
    ai = ROOT / "data/aiTerms.json"
    if ai.exists():
        d = json.loads(ai.read_text(encoding="utf-8"))
        for t in d.get("terms", []):
            names.add(t["name"]); yomis.add(t["reading"])
    return names, yomis


def main(paths):
    names, yomis = others()
    keys, my_names, my_yomis, zs = set(), set(), set(), set()
    count = {}; grades = {}; bad = 0
    for i, line in enumerate([l for p in paths for l in Path(p).read_text(encoding="utf-8").splitlines()], 1):
        if not line.strip() or line.startswith("#"):
            continue
        f = line.split("\t")

        def err(m):
            nonlocal bad
            bad += 1
            print(f"{i}: {m}: {line[:70]}")
        if len(f) != 10:
            err(f"列が {len(f)}(10 でない)"); continue
        key, name, cat, yomi, emoji, desc, mp, zone, grade, wiki = f
        if not re.fullmatch(r"[a-z0-9]+", key): err("key")
        if key in keys: err("key が かぶる")
        keys.add(key)
        m = mode_of(key)
        if not m: err("key の あたまが phy / chm / el / bio / geo でない")
        if not re.fullmatch(r"[ぁ-ゖー]+", yomi): err("よみ(ひらがな と ー だけ)")
        if not (2 <= len(yomi) <= 16): err(f"よみの 長さ {len(yomi)}")
        for s in (name, cat, desc, wiki, emoji):
            if '"' in s or "\\" in s: err('" や \\ が ある')
        if not (1 <= len(name) <= 16): err("名前の 長さ")
        if not (40 <= len(desc) <= 90): err(f"解説の 長さ {len(desc)}(40〜90)")
        if grade not in ("e", "j", "h"): err("学年は e / j / h")
        if not emoji: err("絵文字が 空")
        if not wiki: err("Wikipedia題名が 空")
        if mp == "ptable":
            if m != "chem" or not key.startswith("el"): err("周期表に 立てるのは el の key だけ")
            if not (zone.isdigit() and 1 <= int(zone) <= 118): err("周期表の 区画は 原子番号 1〜118")
            if zone in zs: err("同じ 元素が 2つ")
            zs.add(zone)
        elif m and mp != m:
            err(f"図が {mp}({key} は {m})")
        elif m and zone not in ZONES[m]:
            err(f"区画が {zone}(使えるのは {sorted(ZONES[m])})")
        if name in names: err("ほかの ゲームに もう ある 名前")
        if yomi in yomis: err("ほかの ゲームに もう ある よみ")
        if name in my_names: err("名前が かぶる")
        if yomi in my_yomis: err("よみが かぶる")
        my_names.add(name); my_yomis.add(yomi)
        if m:
            count[m] = count.get(m, 0) + 1
            grades.setdefault(m, {"e": 0, "j": 0, "h": 0})
            if grade in grades[m]: grades[m][grade] += 1
    for m, n in count.items():
        g = grades[m]
        print(f"{m}: {n}語(小 {g['e']} / 中 {g['j']} / 高 {g['h']})" + ("" if n % 10 == 0 else "  ⚠️ 10の倍数でない"))
        if n % 10: bad += 1
    print(f"問題 {bad}")
    return bad


if __name__ == "__main__":
    sys.exit(1 if main(sys.argv[1:] or [ROOT / "tools/rika.tsv"]) else 0)
