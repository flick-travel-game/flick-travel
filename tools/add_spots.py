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


def read_tsv(path, names=False, people=False, kind=None):
    """names=True は 地名の TSV(5列目が 絵文字。写真は無い)。
    people=True は 偉人の TSV(12列: …, 名言, 名言の解説, はじめのレベル(1), 生まれた所)。
    kind="capital" / "event" は 首都・出来事の TSV(10列: …, 絵文字, 解説, 緯度, 経度, 地図の目印, はじめのレベル(1))。
    2026-09-26 けいくん「大学受験、高校受験に役立つやつ」"""
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        f = line.split("\t")
        if kind == "company":
            # 12列: key 会社名 本社 よみ 絵文字 解説 緯度 経度 公式サイト ティッカー Wikipedia題名 はじめのレベル(株式フリック旅行 2026-09-26)
            assert len(f) == 12, (path.name, line[:40])
            key, name, place, yomi, emoji, desc, lat, lon, url, ticker, wiki, first = f
            assert re.fullmatch(r"[a-z0-9]+", key), key
            for t in (name, place, desc, wiki, url):
                assert '"' not in t and "\\" not in t, (key, t)
            assert re.fullmatch(r"[ぁ-ゖー]+", yomi), (key, yomi)
            assert url.startswith("https://"), (key, url)
            usd = CAPS["caps"][ticker]["usd"]
            yen = usd * CAPS["rate"]  # 日本の会社も 表は ドルなので 同じ レートで 円にもどす
            rows.append(dict(key=key, n=name, c=place, r=yomi, q="", d=desc, lat=float(lat), lon=float(lon), e=emoji, kind=kind, first=first, u=url, w=wiki, mc=yen_text(yen)))
            continue
        if kind in ("space", "body"):
            # 11列: key 名前 分類 よみ 絵文字 解説 図(solar/sky/front/head/cell) x y Wikipedia題名 はじめのレベル
            assert len(f) == 11, (path.name, line[:40])
            key, name, place, yomi, emoji, desc, mp, x, y, wiki, first = f
            assert re.fullmatch(r"[a-z0-9]+", key), key
            for t in (name, place, desc, wiki):
                assert '"' not in t and "\\" not in t, (key, t)
            assert re.fullmatch(r"[ぁ-ゖー]+", yomi), (key, yomi)
            rows.append(dict(key=key, n=name, c=place, r=yomi, q="", d=desc, lat=0.0, lon=0.0, e=emoji, kind=kind, first=first, mp=mp, x=float(x), y=float(y), w=wiki))
            continue
        assert len(f) == (12 if people else (10 if kind else (9 if names else 8))), (path.name, line[:40])
        key, name, place, yomi, query, desc, lat, lon = f[:8]
        extra = dict(zip(("s", "sd", "first", "b"), f[8:])) if people else {}
        if kind:
            extra["kind"] = kind; extra["first"] = f[9]
            if f[8]: extra["m"] = f[8]
        if names and f[8]:
            extra["m"] = f[8]  # 地図の目印(けいくん 2026-09-25「説明に書いてある有名な場所に Googleマップ飛んだ方がいい」)
        assert re.fullmatch(r"[a-z0-9]+", key), key
        for s in (name, place, desc, *extra.values()):
            assert '"' not in s and "\\" not in s, (key, s)
        assert re.fullmatch(r"[ぁ-ゖー]+", yomi), (key, yomi)
        rows.append(dict(key=key, n=name, c=place, r=yomi, q=query, d=desc, lat=float(lat), lon=float(lon), e=query if (names or kind) else "", **extra))
    return rows


# 会社の 時価総額(株式フリック旅行)。tools/companies-caps.json = その日の companiesmarketcap.com の 数字(ドル)と ドル円。
# ⚠️ 自動で新しくしない(日付を付けて出す決まり。けいくん 2026-09-26)。直すときは json の 日付・レート・数字を ぜんぶ 同じ日にそろえる
import json as _json
_cp = ROOT / "tools/companies-caps.json"
CAPS = _json.loads(_cp.read_text(encoding="utf-8")) if _cp.exists() else {"caps": {}, "rate": 0}


def yen_text(yen):
    """約35兆5000億円 / 約8700億円(子どもが読む数字。兆は 1000億まで、億は 100億までに まるめる)"""
    oku = yen / 1e8
    if oku >= 10000:
        cho, rest = divmod(round(oku / 1000) * 1000, 10000)
        return f"約{int(cho)}兆" + (f"{int(rest)}億円" if rest else "円")
    return f"約{int(round(oku / 100) * 100)}億円"


FLAG = re.compile(r"^[\U0001F1E6-\U0001F1FF]{2}$")
PREF = re.compile(r"(県|北海道|東京都|京都府|大阪府)$")


def first_of(r):
    """はじめのレベルに出すもの。地名: 世界=国(国旗 + 場所が「・」の無い地域名。ブリュッセル(ベルギー)のような 町は 入れない)/ 日本=都道府県。
    偉人: TSV の「はじめのレベル」の列が 1 の人(子どもも知っている 有名な人)"""
    if "first" in r:
        return r["first"] == "1"
    if not r["e"]:
        return False
    if r["c"].startswith("日本"):
        return bool(PREF.search(r["n"]))
    return bool(FLAG.match(r["e"])) and r["c"] not in ("ベルギー",)


# 偉人の 生まれた年・亡くなった年(tools/fetch_years.py が Wikidata から取る)。年表に 置くため(歴史フリック旅行)
import json
_yp = ROOT / "tools/people-years.json"
YEARS = json.loads(_yp.read_text(encoding="utf-8")) if _yp.exists() else {}


def main():
    # 会社は ここでは 入れない(data/companies.json → kabu/companies.js。2026-09-26)
    rows = (read_tsv(ROOT / "tools/spots-japan.tsv") + read_tsv(ROOT / "tools/spots-world.tsv")
            + read_tsv(ROOT / "tools/names-japan.tsv", names=True) + read_tsv(ROOT / "tools/names-world.tsv", names=True)
            + read_tsv(ROOT / "tools/people-japan.tsv", people=True) + read_tsv(ROOT / "tools/people-world.tsv", people=True)
            + [r for f, k in (("capitals", "capital"), ("events-world", "event"), ("events-japan", "event"), ("space", "space"), ("body", "body")) if (ROOT / f"tools/{f}.tsv").exists()
               for r in read_tsv(ROOT / f"tools/{f}.tsv", kind=k)])
    keys = [r["key"] for r in rows]
    assert len(keys) == len(set(keys)), "キーがかぶっている"
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    for k in keys:
        assert f'art:"{k}"' not in page.split("SPOTS-MORE-START")[0], f"{k} は もう index.html にある"
    # 地名は k:"name" と 絵文字 e を持つ(写真のかわりに 絵文字のカード)。
    # 国(国旗の絵文字 + 場所が地域名)と 都道府県は f:1 = 「はじめのレベルに出す」
    # (けいくん 2026-09-25「まずは世界の国名や 日本は県から問題がはじまると良い」)
    # 偉人は k:"person" + 名言 s / その解説 sd / 生まれた所 b(写真は 肖像)
    def extra(r):
        if "s" in r:
            y = YEARS.get(r["key"]) or [None, None]
            yy = f'y0:{y[0]}, y1:{"null" if y[1] is None else y[1]}, ' if y[0] is not None else ""
            return f'k:"person", s:"{r["s"]}", sd:"{r["sd"]}", b:"{r["b"]}", ' + yy
        if r.get("kind") == "company":  # 会社: 絵文字のカード + 公式サイト + Wikipedia + 時価総額(文字)
            return f'k:"company", e:"{r["e"]}", u:"{r["u"]}", w:"{r["w"]}", mc:"{r["mc"]}", '
        if r.get("kind") in ("space", "body"):  # 宇宙・からだ: 絵文字のカード + 図の中の位置 + Wikipedia の題名
            return f'k:"{r["kind"]}", e:"{r["e"]}", mp:"{r["mp"]}", x:{r["x"]}, y:{r["y"]}, w:"{r["w"]}", '
        if r.get("kind"):  # 首都・出来事: 絵文字のカード + 地図の目印
            return f'k:"{r["kind"]}", e:"{r["e"]}", ' + (f'm:"{r["m"]}", ' if r.get("m") else "")
        if r["e"]:
            return f'k:"name", e:"{r["e"]}", ' + (f'm:"{r["m"]}", ' if r.get("m") else "")
        return ""
    spots = ",\n".join(f'  {{n:"{r["n"]}", c:"{r["c"]}", r:"{r["r"]}", art:"{r["key"]}", ' + extra(r) + ("f:1, " if first_of(r) else "") + f'd:"{r["d"]}"}}' for r in rows)
    ll = ", ".join(f'{r["key"]}:[{r["lat"]},{r["lon"]}]' for r in rows if r.get("kind") not in ("space", "body"))
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
    if any(r.get("kind") == "company" for r in rows):  # 画面の 日付・レートが json と 同じか
        assert f'CAP_ASOF = "{CAPS["asof"]}", CAP_RATE = "{CAPS["rate_text"]}"' in page, "index.html の CAP_ASOF / CAP_RATE を json と そろえる"
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print(f"{len(rows)}か所を書いた(名所: 日本 {sum(r['c'].startswith('日本') and not r['e'] for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and not r['e'] for r in rows)}、"
          f"地名: 日本 {sum(r['c'].startswith('日本') and bool(r['e']) and not r.get('kind') for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and bool(r['e']) and not r.get('kind') for r in rows)}、"
          f"偉人: 日本 {sum(r['c'].startswith('日本') and 's' in r for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and 's' in r for r in rows)}、"
          f"首都 {sum(r.get('kind') == 'capital' for r in rows)}、出来事: 日本 {sum(r['c'].startswith('日本') and r.get('kind') == 'event' for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and r.get('kind') == 'event' for r in rows)}、"
          f"宇宙 {sum(r.get('kind') == 'space' for r in rows)}、からだ {sum(r.get('kind') == 'body' for r in rows)}、"
          f"会社: 日本 {sum(r['c'].startswith('日本') and r.get('kind') == 'company' for r in rows)} / 世界 {sum(not r['c'].startswith('日本') and r.get('kind') == 'company' for r in rows)})")


if __name__ == "__main__":
    main()
