#!/usr/bin/env python3
"""フリック恐竜図鑑の 写真(けいくん 2026-09-29「恐竜の写真をすべて入れてください」)。
恐竜・恐竜では ない 生きもの(kind が dino / notdino)の 写真を Wikimedia Commons から 集める。

3段で うごく(止まっても もう一度 走らせれば つづきから。聞いた 答えは tools/kyoryu/photo-*.json に おぼえる):
  python3 tools/kyoryu/fetch_photos.py candidates   ① 候補を 集める → tools/kyoryu/photo-candidates.json と 見くらべる 絵(SHEETS)
  (人・助手が 見くらべる 絵を 1枚ずつ 目で 見て、tools/kyoryu/photo-picks.json に きめる)
  python3 tools/kyoryu/fetch_photos.py save          ② きめた 写真を 落として photo-kyoryu-<id>.jpg と photos.js に 入れる

候補の 集めかた
  ・日本語版 Wikipedia の 記事(名前と 同じ 題名)の 代表画像 + 英語版の 同じ 記事の 代表画像
  ・Commons の 検索「<英語の 名前> skeleton」「… fossil」「… mount」「…」(写真だけ)
  ・ライセンスは tools/fetch_photos.py の license_ja が 通す もの だけ(PD / CC0 / CC BY / CC BY-SA)。幅 400px より 小さい ものは すてる

photo-picks.json の 形: { "ni-trex": {"file": "File:....jpg", "why": "全身骨格(博物館)"}, "jp-xxx": null(= 使える 写真が ない。絵文字の まま) }
⚠️ 写真は 1枚ずつ 目で 見る(骨の 標本を 主に。復元図は 新しくて 正しい もの だけ。字・人の 顔が 大きい もの・ちがう 生きものは だめ)
"""
import io
import json
import sys
import time
import urllib.parse
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import fetch_photos as F  # noqa: E402
from PIL import Image, ImageDraw, ImageFont  # noqa: E402

CAND = HERE / "photo-candidates.json"
PICKS = HERE / "photo-picks.json"
SHEETS = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("/tmp/kyoryu-sheets")
MAXC = 9
_last = [0.0]


def get(url):
    gap = time.time() - _last[0]
    if gap < 1.5:
        time.sleep(1.5 - gap)
    try:
        return F.fetch(url, 120)
    finally:
        _last[0] = time.time()


def wiki(host, params):
    params = {"format": "json", "formatversion": "2", **params}
    return json.loads(get(f"https://{host}/w/api.php?" + urllib.parse.urlencode(params)))


def creatures():
    d = json.loads((ROOT / "data/kyoryu.json").read_text(encoding="utf-8"))
    return [t for t in d["terms"] if t["kind"] in ("dino", "notdino")]


def leads(names):
    """日本語の 名前 → {ja_img, en, en_img}"""
    out = {}
    for i in range(0, len(names), 40):
        b = names[i:i + 40]
        js = wiki("ja.wikipedia.org", {"action": "query", "prop": "pageimages|langlinks", "piprop": "name", "titles": "|".join(b),
                                       "redirects": 1, "lllang": "en", "lllimit": "max"})
        q = js.get("query", {})
        norm = {n["from"]: n["to"] for n in q.get("normalized", [])}
        red = {r["from"]: r["to"] for r in q.get("redirects", [])}
        pages = {p["title"]: p for p in q.get("pages", [])}
        for n in b:
            p = pages.get(red.get(norm.get(n, n), norm.get(n, n)), {})
            out[n] = {"ja_img": p.get("pageimage"), "en": (p.get("langlinks") or [{}])[0].get("title"), "missing": bool(p.get("missing", True))}
    ens = [v["en"] for v in out.values() if v["en"]]
    enimg = {}
    for i in range(0, len(ens), 40):
        b = ens[i:i + 40]
        js = wiki("en.wikipedia.org", {"action": "query", "prop": "pageimages", "piprop": "name", "titles": "|".join(b), "redirects": 1})
        q = js.get("query", {})
        norm = {n["from"]: n["to"] for n in q.get("normalized", [])}
        red = {r["from"]: r["to"] for r in q.get("redirects", [])}
        pages = {p["title"]: p for p in q.get("pages", [])}
        for t in b:
            enimg[t] = pages.get(red.get(norm.get(t, t), norm.get(t, t)), {}).get("pageimage")
    for v in out.values():
        v["en_img"] = enimg.get(v["en"]) if v["en"] else None
    return out


def search(q, n=8):
    js = wiki("commons.wikimedia.org", {"action": "query", "list": "search", "srsearch": q + " filetype:bitmap", "srnamespace": "6", "srlimit": str(n)})
    return [p["title"] for p in js.get("query", {}).get("search", [])]


def infos(titles):
    out = {}
    for i in range(0, len(titles), 40):
        b = titles[i:i + 40]
        js = wiki("commons.wikimedia.org", {"action": "query", "prop": "imageinfo", "titles": "|".join(b),
                                            "iiprop": "url|extmetadata|size|mime", "iiurlwidth": "330"})
        q = js.get("query", {})
        norm = {n["from"]: n["to"] for n in q.get("normalized", [])}
        pages = {p["title"]: p for p in q.get("pages", [])}
        for t in b:
            p = pages.get(norm.get(t, t))
            if not p or "imageinfo" not in p:
                continue
            ii = p["imageinfo"][0]; md = ii.get("extmetadata", {})
            lic = F.license_ja(F.plain(md.get("LicenseShortName", {}).get("value")))
            if not lic or ii.get("mime") not in ("image/jpeg", "image/png", "image/webp", "image/tiff") or ii.get("width", 0) < 400:
                continue
            out[p["title"]] = {"thumb": ii.get("thumburl"), "w": ii["width"], "h": ii["height"], "license": lic,
                               "licenseUrl": md.get("LicenseUrl", {}).get("value", ""), "author": F.plain(md.get("Artist", {}).get("value"))[:120] or "不明",
                               "page": ii.get("descriptionurl"), "desc": F.plain(md.get("ImageDescription", {}).get("value"))[:160]}
    return out


def candidates():
    cs = creatures()
    cache = json.loads(CAND.read_text(encoding="utf-8")) if CAND.exists() else {}
    todo = [t for t in cs if t["id"] not in cache]
    L = leads([t["name"] for t in todo]) if todo else {}
    for k, t in enumerate(todo):
        v = L.get(t["name"], {})
        en = (v.get("en") or "").split(" (")[0]
        titles = []
        for img in (v.get("en_img"), v.get("ja_img")):
            if img: titles.append("File:" + img)
        if en:
            for q in (f'"{en}" skeleton', f'"{en}" fossil', f'"{en}" mount', f'"{en}"'):
                titles += search(q, 6)
        titles = list(dict.fromkeys(titles))
        info = infos(titles) if titles else {}
        cache[t["id"]] = {"name": t["name"], "en": en, "list": [dict(file=f, **info[f]) for f in titles if f in info][:MAXC]}
        CAND.write_text(json.dumps(cache, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"{k + 1}/{len(todo)} {t['id']} {t['name']} en={en} 候補 {len(cache[t['id']]['list'])}", flush=True)
    sheets(cache)


def sheets(cache):
    """1しゅるい 1枚。候補を 3×3 に ならべて 番号と ファイル名を 書く(目で 見くらべる ため)"""
    SHEETS.mkdir(parents=True, exist_ok=True)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", 15)
    except OSError:
        font = ImageFont.load_default()
    for key, c in cache.items():
        out = SHEETS / f"{key}.jpg"
        if out.exists() or not c["list"]:
            continue
        W, H, cap = 330, 250, 38
        sheet = Image.new("RGB", (W * 3, (H + cap) * 3 + 30), "white")
        d = ImageDraw.Draw(sheet)
        d.text((6, 6), f"{key} {c['name']} ({c['en']})", fill="black", font=font)
        for i, it in enumerate(c["list"][:9]):
            try:
                im = Image.open(io.BytesIO(get(it["thumb"]))).convert("RGB")
            except Exception as e:  # noqa: BLE001
                print("  thumb だめ", it["file"], e); continue
            im.thumbnail((W - 6, H - 6))
            x, y = (i % 3) * W, 30 + (i // 3) * (H + cap)
            sheet.paste(im, (x + 3, y + 3))
            d.rectangle([x, y, x + 30, y + 24], fill="black"); d.text((x + 8, y + 2), str(i), fill="yellow", font=font)
            d.text((x + 3, y + H), it["file"][5:60], fill="black", font=font)
            d.text((x + 3, y + H + 18), it["license"], fill="gray", font=font)
        sheet.save(out, quality=80)
    print("見くらべる 絵:", SHEETS)


def save():
    picks = json.loads(PICKS.read_text(encoding="utf-8"))
    cand = json.loads(CAND.read_text(encoding="utf-8"))
    js_path = ROOT / "photos.js"
    import re
    photos = json.loads(re.search(r"=\s*(\{.*\});", js_path.read_text(encoding="utf-8"), re.S).group(1))
    n = 0
    for key, p in picks.items():
        if not p:
            photos.pop(key, None); continue
        it = next((x for x in cand[key]["list"] if x["file"] == p["file"]), None)
        if it is None:  # 見くらべる 絵に 無い 写真を 助手が 見つけてきた とき(ライセンスは ここで もう一度 見る)
            got = infos([p["file"]])
            assert p["file"] in got, (key, p["file"], "ライセンスか 形が 使えない")
            it = dict(file=p["file"], **got[p["file"]])
        src = f"photo-kyoryu-{key}.jpg"
        if not (ROOT / src).exists():
            # ⚠️ 縮小版は Wikimedia の 決まった 幅(https://w.wiki/GHai)で 頼む(それ以外は 429 で 断られる)。960 で 取って ここで 800 に 縮める
            # 候補の 縮小版の 住所(…/thumb/a/ab/名前/330px-名前)から 作る。commons.wikimedia.org の Special:FilePath は すぐ 429 に なるため
            t = it["thumb"].split("?")[0].replace("//thumb.wikimedia.org/", "//upload.wikimedia.org/")
            # もとの 大きさの ファイルは すぐ 429 に なるので、決まった 幅(960 / 500 / 330)の 縮小版だけを 使う
            url = t.replace("/330px-", "/960px-" if it["w"] > 960 else "/500px-" if it["w"] > 500 else "/330px-")
            try:
                im = Image.open(io.BytesIO(get(url))).convert("RGB")
            except Exception as e:  # noqa: BLE001  1枚 だめでも とまらない(もう一度 走らせれば つづきから)
                print("  だめ", key, e, flush=True); continue
            im.thumbnail((F.MAX_W, F.MAX_W))
            im.save(ROOT / src, quality=F.QUALITY, optimize=True, progressive=True)
        author = it["author"] + ("(" + p["note"] + ")" if p.get("note") else "")
        photos[key] = {"src": src, "author": author, "license": it["license"], "licenseUrl": it["licenseUrl"], "page": it["page"], "file": it["file"]}
        n += 1
    F.save(js_path, photos)
    print("photos.js に", n, "枚")


if __name__ == "__main__":
    {"candidates": candidates, "sheets": lambda: sheets(json.loads(CAND.read_text(encoding="utf-8"))), "save": save}[sys.argv[1]]()
