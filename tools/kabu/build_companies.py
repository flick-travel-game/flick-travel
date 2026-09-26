#!/usr/bin/env python3
"""株式フリック旅行: candidates.json(どの会社か)+ enrich/out/*.jsonl(読み・説明・業種・知名度)→ data/companies.json

    python3 tools/kabu/build_companies.py

- ここで コース(入門〜マスター)と ならび順(fameRank)を 決める
- ⚠️ ふだん 会社を 足す・直すのは **data/companies.json を じかに**(または CSV → tools/kabu/companies_csv.py import)。
  この台本は データを 1から 作りなおす ときだけ 使う(手で 直した ところが 消える)
コースの 決めかた(時価総額だけに しない):
- 入門 100: 知名度 5(日本の 小学生でも 知っている)を 中心に、日本と 世界が 半分ずつ。PIN の 会社は かならず 入れる
- 初級 +200 / 中級 +300 / 上級 +400: 地域ごとの 枠(QUOTA)の 中で 知名度 → 時価総額 の 順
- のこりは マスター"""
import glob, json, math, re
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent; SRC = HERE / "sources"
import sys; sys.path.insert(0, str(HERE))
from regions import REGIONS

COURSES = ["入門", "初級", "中級", "上級", "マスター"]
# 入門に かならず 入れる(けいくん 2026-09-26 の 例)。id は companiesmarketcap の ページ名
PIN = ["toyota", "sony", "nintendo", "fast-retailing", "apple", "microsoft", "amazon", "alphabet-google", "nvidia", "meta-platforms",
       "tesla", "coca-cola", "mcdonald", "nike", "walt-disney", "netflix"]
QUOTA = {  # 地域ごとの 新しい 会社の 数(入門の あと)
    "初級": {"日本": 70, "アメリカ": 70, "ヨーロッパ": 30, "アジア・太平洋": 20, "その他": 10},
    "中級": {"日本": 80, "アメリカ": 110, "ヨーロッパ": 55, "アジア・太平洋": 40, "その他": 15},
    "上級": {"日本": 100, "アメリカ": 150, "ヨーロッパ": 80, "アジア・太平洋": 50, "その他": 20},
}
SECTORS = [
    ("it", "IT・テクノロジー", "💻"), ("semi", "半導体", "💾"), ("tel", "通信・メディア", "📡"), ("fin", "金融", "🏦"),
    ("auto", "自動車", "🚗"), ("cons", "一般消費財", "🛍️"), ("stap", "生活必需品", "🛒"), ("hlth", "ヘルスケア", "🩺"),
    ("phar", "医薬品", "💊"), ("ene", "エネルギー", "🛢️"), ("mat", "素材", "⛏️"), ("ind", "資本財・サービス", "🏗️"),
    ("util", "公益", "💡"), ("re", "不動産", "🏢"),
]

def yen_text(yen):
    oku = yen / 1e8
    if oku >= 10000:
        cho, rest = divmod(round(oku / 1000) * 1000, 10000)
        return f"約{int(cho)}兆" + (f"{int(rest)}億円" if rest else "円")
    if oku >= 100: return f"約{int(round(oku / 100) * 100)}億円"
    return f"約{int(round(oku / 10) * 10)}億円"

def pin_id(pin, ids):
    if pin in ids: return pin
    c = [i for i in ids if i.startswith(pin)]
    return c[0] if c else None

def main():
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))
    meta_src = json.loads((SRC / "meta.json").read_text(encoding="utf-8"))
    jw = json.loads((SRC / "jawiki.json").read_text(encoding="utf-8")) if (SRC / "jawiki.json").exists() else {}
    enr = {}
    src = sys.argv[sys.argv.index("--enrich") + 1] if "--enrich" in sys.argv else str(HERE / "enrich/out")  # 試しの ときだけ 別の 場所
    for f in sorted(glob.glob(src + "/*.jsonl")):
        for l in Path(f).read_text(encoding="utf-8").splitlines():
            if l.strip(): r = json.loads(l); enr[r["id"]] = r
    miss = [c["id"] for c in cands if c["id"] not in enr]
    assert not miss, f"読み・説明が まだの 会社 {len(miss)}社: {miss[:10]}"
    rate = meta_src["usdjpy"]
    rows = []
    for c in cands:
        e = enr[c["id"]]; old = c.get("old")
        r = dict(id=c["id"], name=e["name"], reading=e["reading"], nameJa=e["nameJa"], country=c["country"], countryCode=c["cc"], region=c["region"],
                 sector=e["sector"], industry=e["industry"], description=e["description"],
                 ticker=c["ticker"], exchange=c["exchange"], adr=bool(c.get("adr")),
                 fame=e["fame"], marketCapUSD=c.get("usd") or None, icon=e["emoji"])
        if old:  # いままでの 200社: 長い 説明・公式サイト(1つずつ 確かめたもの)・Wikipedia
            r["detail"] = old[5]; r["url"] = old[8]; r["wiki"] = old[10]
        elif c["region"] == "日本" and (jw.get(c["id"]) or {}).get("title"):
            r["wiki"] = jw[c["id"]]["title"]
        size = (c.get("jpx") or {}).get("size")
        r["index"] = [size] if size and size != "-" else []
        rows.append(r)
    ov = json.loads((HERE / "overrides.json").read_text(encoding="utf-8")) if (HERE / "overrides.json").exists() else {}
    for r in rows:
        r.update(ov.get(r["id"], {}))
    ids = [r["id"] for r in rows]
    by = {r["id"]: r for r in rows}
    # ── コース ──
    key = lambda r: (-r["fame"], -(r["marketCapUSD"] or 0))
    left = sorted(rows, key=key)
    course = {}
    pins = [pin_id(p, ids) for p in PIN]
    assert all(pins), f"PIN が 見つからない {PIN}"
    intro = list(pins)
    # 入門は 子どもが さいしょに 見る ところ。たばこの 会社は 入れない(あとの コースで 出る)
    ok = lambda r: r["id"] not in intro and "たばこ" not in r["industry"] and "たばこ" not in r["description"]
    jp = [r["id"] for r in left if r["region"] == "日本" and ok(r)]
    fo = [r["id"] for r in left if r["region"] != "日本" and ok(r)]
    while len(intro) < 100:  # 日本と 世界を かわりばんこに(知名度 → 時価総額 の 順)
        nj = sum(by[i]["region"] == "日本" for i in intro)
        intro.append(jp.pop(0) if nj <= len(intro) - nj else fo.pop(0))
    for i in intro: course[i] = 0
    for ci, name in enumerate(["初級", "中級", "上級"], 1):
        for reg, n in QUOTA[name].items():
            pick = [r["id"] for r in left if r["region"] == reg and r["id"] not in course][:n]
            for i in pick: course[i] = ci
    for r in rows: r["difficulty"] = course.get(r["id"], 4) + 1; r["course"] = COURSES[r["difficulty"] - 1]
    # ── ならび順(コースの中: 知名度の 高い順。同じ 知名度の 中は 地域を まぜる)──
    order = []
    for ci in range(5):
        members = [r for r in rows if r["difficulty"] - 1 == ci]
        for fame in (5, 4, 3, 2, 1):
            tier = {reg: sorted([r for r in members if r["fame"] == fame and r["region"] == reg], key=key) for reg in REGIONS}
            pos = {reg: 0 for reg in REGIONS}
            total = sum(len(v) for v in tier.values())
            for _ in range(total):
                reg = min((g for g in REGIONS if pos[g] < len(tier[g])), key=lambda g: (pos[g] + .5) / len(tier[g]))
                order.append(tier[reg][pos[reg]]); pos[reg] += 1
    for i, r in enumerate(order, 1): r["fameRank"] = i
    for i, r in enumerate(sorted(rows, key=lambda r: -(r["marketCapUSD"] or 0)), 1): r["marketImportance"] = i
    for r in rows: r["marketCapText"] = yen_text(r["marketCapUSD"] * rate) if r["marketCapUSD"] else ""
    out = dict(meta=dict(
        title="株式フリック旅行 会社データ", version=meta_src["fetched"], asOf=re.sub(r"(\d+)-0?(\d+)-0?(\d+)", r"\1年\2月\3日", meta_src["fetched"]),
        usdjpy=round(rate, 2),
        note="本コンテンツは企業や株式市場について学ぶためのもので、特定の銘柄への投資を推奨するものではありません。時価総額は" +
             re.sub(r"(\d+)-0?(\d+)-0?(\d+)", r"\1年\2月\3日", meta_src["fetched"]) + f"時点(1ドル={rate:.1f}円で計算)で、いまの数字とは ちがいます。",
        sources=[
            "時価総額・国・ティッカー: companiesmarketcap.com(" + meta_src["fetched"] + ")",
            "日本の会社: 日本取引所グループ「東証上場銘柄一覧」(銘柄名・市場区分・33業種・TOPIX 規模区分)/ 金融庁 EDINET コードリスト(読み・英語名)",
            "アメリカの取引所・業種: api.nasdaq.com の 上場銘柄一覧",
            "ドル円: open.er-api.com",
            "読み・説明・業種・知名度: 上の よりどころを もとに 作成(tools/kabu/enrich/PROMPT.md)",
        ],
        indexNote="index は 日本取引所グループの TOPIX 規模区分(東証上場銘柄一覧 2026年8月末)だけ。ほかの 指数(MSCI・S&P 500 など)は 確かめられた ものが 無いので 入れていない",
        courses=[dict(id=i, name=n) for i, n in enumerate(COURSES)],
        regions=REGIONS, sectors=[dict(id=a, name=b, icon=c) for a, b, c in SECTORS],
        fields="id 名前のキー / name 画面の会社名 / reading 打つよみ(ひらがな) / nameJa カタカナ名 / country 国 / countryCode ISO 2文字 / region 地域 / sector 業種id / industry くわしい業種 / description 1〜2行の説明 / detail 長い説明(あれば) / ticker / exchange 取引所 / adr アメリカで売られている預託証券か / fame 日本での知名度1〜5 / marketCapUSD 時価総額(ドル) / marketCapText 円の字 / icon 絵文字 / index 指数 / course コース / difficulty 1〜5 / fameRank ならび順 / marketImportance 時価総額の順位 / url 公式サイト(確かめたもの) / wiki 日本語版Wikipediaの題名",
    ), companies=sorted(rows, key=lambda r: r["fameRank"]))
    (ROOT / "data").mkdir(exist_ok=True)
    (ROOT / "data/companies.json").write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from collections import Counter
    print(len(rows), Counter(r["course"] for r in rows), Counter((r["course"], r["region"]) for r in rows if r["course"] == "入門"))

if __name__ == "__main__":
    main()
