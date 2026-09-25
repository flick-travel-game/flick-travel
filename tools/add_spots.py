#!/usr/bin/env python3
"""tools/spots-japan.tsv / spots-world.tsv の名所と、tools/names-japan.tsv / names-world.tsv の地名を index.html に書きこむ。

- 名所の入れもの(SPOTS)と ピンの位置(LATLON)の「追加ぶん」を SPOTS-MORE-START〜END のあいだに作る
- 名所を足す・直すときは TSV を直して、これを走らせる(index.html を手で直さない)
- そのあと tools/fetch_photos.py(写真)と tools/make_ruby.py(ふりがな)も走らせる

使いかた(flick-travel/ で):
    python3 tools/add_spots.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read_tsv(path, names=False):
    """names=True は 地名の TSV(5列目が 絵文字。写真は無い)"""
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        f = line.split("\t")
        assert len(f) == 8, (path.name, line[:40])
        key, name, place, yomi, query, desc, lat, lon = f
        assert re.fullmatch(r"[a-z0-9]+", key), key
        for s in (name, place, desc):
            assert '"' not in s and "\\" not in s, (key, s)
        assert re.fullmatch(r"[ぁ-ゖー]+", yomi), (key, yomi)
        rows.append(dict(key=key, n=name, c=place, r=yomi, q=query, d=desc, lat=float(lat), lon=float(lon), e=query if names else ""))
    return rows


FLAG = re.compile(r"^[\U0001F1E6-\U0001F1FF]{2}$")
PREF = re.compile(r"(県|北海道|東京都|京都府|大阪府)$")


def first_of(r):
    """地名の旅で はじめに出すもの: 世界=国(国旗 + 場所が「・」の無い地域名。ブリュッセル(ベルギー)のような 町は 入れない)/ 日本=都道府県"""
    if not r["e"]:
        return False
    if r["c"].startswith("日本"):
        return bool(PREF.search(r["n"]))
    return bool(FLAG.match(r["e"])) and r["c"] not in ("ベルギー",)


def main():
    rows = (read_tsv(ROOT / "tools/spots-japan.tsv") + read_tsv(ROOT / "tools/spots-world.tsv")
            + read_tsv(ROOT / "tools/names-japan.tsv", names=True) + read_tsv(ROOT / "tools/names-world.tsv", names=True))
    keys = [r["key"] for r in rows]
    assert len(keys) == len(set(keys)), "キーがかぶっている"
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    for k in keys:
        assert f'art:"{k}"' not in page.split("SPOTS-MORE-START")[0], f"{k} は もう index.html にある"
    # 地名は k:"name" と 絵文字 e を持つ(写真のかわりに 絵文字のカード)。
    # 国(国旗の絵文字 + 場所が地域名)と 都道府県は f:1 = 「はじめのレベルに出す」
    # (けいくん 2026-09-25「まずは世界の国名や 日本は県から問題がはじまると良い」)
    spots = ",\n".join(f'  {{n:"{r["n"]}", c:"{r["c"]}", r:"{r["r"]}", art:"{r["key"]}", ' + (f'k:"name", e:"{r["e"]}", ' if r["e"] else "") + ("f:1, " if first_of(r) else "") + f'd:"{r["d"]}"}}' for r in rows)
    ll = ", ".join(f'{r["key"]}:[{r["lat"]},{r["lon"]}]' for r in rows)
    block = ("/* 名所の追加ぶん(tools/spots-*.tsv から tools/add_spots.py が作る。手で直さない) SPOTS-MORE-START */\n"
             f"SPOTS.push(\n{spots}\n);\n"
             f"Object.assign(LATLON, {{{ll}}});\n"
             "/* SPOTS-MORE-END */")
    if "SPOTS-MORE-START" in page:
        page, n = re.subn(r"/\* 名所の追加ぶん.*?SPOTS-MORE-START \*/.*?/\* SPOTS-MORE-END \*/", lambda _: block, page, flags=re.S)
        assert n == 1
    else:
        # LATLON を作っている行の すぐあとに置く(LEVELS を作る前)
        page, n = re.subn(r"(LATLON\[k\] = \[\+la, \+lo\]; \}\);\n)", lambda m: m.group(1) + block + "\n", page)
        assert n == 1
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print(f"{len(rows)}か所を書いた(名所: 日本 {sum(r['c'].startswith('日本') and not r['e'] for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and not r['e'] for r in rows)}、"
          f"地名: 日本 {sum(r['c'].startswith('日本') and bool(r['e']) for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and bool(r['e']) for r in rows)})")


if __name__ == "__main__":
    main()
