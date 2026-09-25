#!/usr/bin/env python3
"""名所の「有名さ」を 日本語版 Wikipedia の 閲覧数(2025年 1年ぶん)で 出して、index.html の FAME に書く。

けいくん 2026-09-26「観光名所を世界ランキング順に並べてもらえると 有名な知っている場所がたくさん出てきて良い」。
名所モード(世界の旅・日本の旅)の レベルは この数字の 大きい順(= 有名な順)に 10問ずつ になる。
地名・偉人の モードは 変えない。

- 記事の題名は 名前(かっこの前)で 引いて、転送(リダイレクト)を たどる。無ければ かっこの中・"名前 (国)" も 試す
- 閲覧数は Wikipedia の API の prop=pageviews(直近60日。50記事ずつ まとめて)
- 結果は tools/fame.json(題名と 閲覧数。見なおし用)と index.html の FAME-START〜END

使いかた(flick-travel/ で):  python3 tools/fetch_fame.py
"""
import json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = "FlickTravelGame/1.0 (small typing game; fame ranking) python-urllib"
API = "https://ja.wikipedia.org/w/api.php"
PV = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/ja.wikipedia/all-access/user/{}/monthly/2025010100/2025123100"
SPOT = re.compile(r'\{n:"([^"]*)", c:"([^"]*)", r:"[^"]*", art:"(\w+)", (?:f:1, )?d:')  # 名所だけ(k: が無い)

def get(url, tries=6):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 404: return None
            if e.code == 429:
                w = int(e.headers.get("Retry-After") or 30); print(f"  ...429 {w}秒まって やりなおし", file=sys.stderr); time.sleep(min(w, 120)); continue
            raise
        except Exception as e:
            print(f"  ...{e} 5秒まって やりなおし", file=sys.stderr); time.sleep(5)
    return None

# 名前から 引けない 記事の 題名(手で 調べたもの。先に 試す)
MANUAL = {
 "キンデルダイクの風車": "キンデルダイク", "バオバブの並木道": "バオバブ", "ハンガリー国会議事堂": "ブダペスト",
 "アンテロープキャニオン": "アンテロープ・キャニオン", "富良野のラベンダー畑": "ファーム富田", "美瑛の丘": "美瑛町", "蔵王の樹氷": "樹氷",
 "角館の武家屋敷": "角館", "高山の古い町並み": "高山市三町伝統的建造物群保存地区", "嵐山の竹林": "嵐山", "吉野山の桜": "吉野山",
 "仁徳天皇陵古墳": "大仙陵古墳", "飛鳥・藤原": "飛鳥・藤原の宮都とその関連資産群", "エトルタの断崖": "エトルタ", "ルツェルンのカペル橋": "カペル橋",
 "ドレスデンのフラウエン教会": "聖母教会 (ドレスデン)", "クラクフ旧市街": "クラクフ歴史地区", "タリン旧市街": "タリン歴史地区",
 "プリトヴィツェ湖群": "プリトヴィツェ湖群国立公園", "サンティアゴ大聖堂": "サンティアゴ・デ・コンポステーラ大聖堂",
 "シェイク・ザイード・グランドモスク": "シェイク・ザーイド・モスク", "ソススフレイ": "ナミブ砂漠", "セレンゲティ": "セレンゲティ国立公園",
 "ラリベラの岩窟教会": "ラリベラの岩窟教会群", "ボルダーズビーチ": "サイモンズタウン", "マサイマラ": "マサイマラ国立保護区",
 "ドイ・ステープ": "ワット・プラタート・ドーイ・ステープ", "ライレイ": "クラビー県", "フエの王宮": "フエ", "バナウェの棚田": "フィリピン・コルディリェーラの棚田群",
 "シギリヤ・ロック": "シーギリヤ", "デリケート・アーチ": "アーチーズ国立公園", "ナパリコースト": "カウアイ島", "レイクルイーズ": "ルイーズ湖",
 "ケベック旧市街": "ケベック旧市街の歴史地区", "ハバナ旧市街": "オールド・ハバナ", "トーレス・デル・パイネ": "トーレス・デル・パイネ国立公園",
 "ブルー・マウンテンズ": "ブルー・マウンテンズ国立公園", "ホワイトヘブンビーチ": "ウィットサンデー諸島", "リヨン旧市街": "リヨン歴史地区",
 "聖カトリーナ修道院": "聖カタリナ修道院", "曲阜の孔廟": "曲阜の孔廟、孔林、孔府", "承徳避暑山荘": "避暑山荘", "プレア・ヴィヒア": "プレアヴィヒア寺院",
}

def resolve(titles):
    """題名 → 転送先の 本当の題名(無い題名は 入らない)"""
    out = {}
    for i in range(0, len(titles), 50):
        chunk = titles[i:i+50]
        q = urllib.parse.urlencode({"action":"query","format":"json","formatversion":"2","redirects":"1","titles":"|".join(chunk)})
        js = get(API + "?" + q) or {}
        red = {r["from"]: r["to"] for r in js.get("query", {}).get("redirects", [])}
        norm = {r["from"]: r["to"] for r in js.get("query", {}).get("normalized", [])}
        ok = {p["title"] for p in js.get("query", {}).get("pages", []) if not p.get("missing")}
        for t in chunk:
            t2 = norm.get(t, t); t2 = red.get(t2, t2)
            if t2 in ok: out[t] = t2
        time.sleep(0.5)
    return out

def main():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    spots = [(m.group(3), m.group(1), m.group(2)) for m in SPOT.finditer(html)]
    print(f"{len(spots)}か所", file=sys.stderr)
    cand = {}
    for key, n, c in spots:
        base = re.sub(r"（.*?）|\(.*?\)", "", n).strip()
        inner = re.findall(r"（(.*?)）", n)
        country = c.split("・")[0]
        cand[key] = ([MANUAL[n]] if n in MANUAL else []) + [base] + inner + [f"{base} ({country})"]
    # 途中で止まっても つづきから(tools/fame.json に 1件ずつ 書きたす)
    out = ROOT / "tools" / "fame.json"
    fame = json.loads(out.read_text(encoding="utf-8")) if out.exists() else {}
    fame = {k: v for k, v in fame.items() if v.get("title")}  # 見つからなかったものは 引きなおす
    cache = ROOT / "tools" / "fame-titles.json"
    found = json.loads(cache.read_text(encoding="utf-8")) if cache.exists() else {}
    todo = sorted({t for k, v in cand.items() if k not in fame for t in v if t not in found})
    if todo:
        found.update(resolve(todo)); found.update({t: found.get(t) for t in todo})
        cache.write_text(json.dumps(found, ensure_ascii=False), encoding="utf-8")
    # 閲覧数は Wikipedia の API の prop=pageviews(50記事まとめて・直近60日)。
    # ⚠️ wikimedia.org の pageviews API(1記事ずつ・1年ぶん)は 429 が 1分おきに出て 510か所で 1時間かかったので やめた
    titles = {}
    for key, n, c in spots:
        if key in fame: continue
        t = next((found[t] for t in cand[key] if found.get(t)), None)
        if t: titles.setdefault(t, []).append(key)
        else: fame[key] = {"name": n, "title": None, "views": 0}
    tl = sorted(titles)
    # ⚠️ 1回に 返ってくる pageviews は 一部だけ(のこりは continue)。10記事ずつ + continue を たどる
    for i in range(0, len(tl), 10):
        chunk = tl[i:i+10]; cont = {}
        while True:
            q = urllib.parse.urlencode({"action":"query","format":"json","formatversion":"2","prop":"pageviews","pvipdays":"60","titles":"|".join(chunk), **cont})
            js = get(API + "?" + q) or {}
            for pg in js.get("query", {}).get("pages", []):
                if pg.get("pageviews") is None: continue
                v = sum(x or 0 for x in pg["pageviews"].values())
                for key in titles.get(pg["title"], []):
                    n = next(nn for kk, nn, _ in spots if kk == key)
                    fame[key] = {"name": n, "title": pg["title"], "views": v}
            if "continue" not in js: break
            cont = js["continue"]; time.sleep(0.5)
        out.write_text(json.dumps(fame, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"  {i+len(chunk)}/{len(tl)}", file=sys.stderr, flush=True); time.sleep(1)
    fame = {k: fame[k] for k, _, _ in spots}  # index.html の順に
    block = "const FAME = {" + ", ".join(f'{k}:{v["views"]}' for k, v in fame.items()) + "};"
    a = html.index("FAME-START */") + len("FAME-START */"); b = html.index("/* FAME-END */")
    html = html[:a] + "\n" + block + "\n" + html[b:]
    (ROOT / "index.html").write_text(html, encoding="utf-8")
    miss = [v["name"] for v in fame.values() if not v["title"]]
    print(f"書いた。記事が見つからなかった {len(miss)}: {' / '.join(miss)}", file=sys.stderr)

if __name__ == "__main__":
    main()
