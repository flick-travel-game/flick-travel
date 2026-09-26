#!/usr/bin/env python3
"""宇宙・からだ の写真を まとめて取る(tools/space.tsv・tools/body.tsv → photos.js / photo-<key>.jpg)。

やりかたは 偉人の肖像(fetch_portraits.py)と 同じ:
 ① Wikipedia(日本語版)の 記事(10列め の題名)の 代表画像の名前を 40件ずつ。
    日本語版に 代表画像が無い記事は 英語版の 同じ記事(言語間リンク)を 見る
 ② Commons の 写真の情報(作者・ライセンス・大きさ)を 50枚ずつ
 ③ 写真を 1枚ずつ Special:FilePath?width= で 落とす(もとの幅より 小さい幅を頼む → thumb.wikimedia.org)
決まりごと(使ってよいライセンス・大きさ・保存の形・photos.js の書きかた)は fetch_photos.py のものを そのまま使う。
SVG は Special:FilePath?width=800 で PNG にしてもらって 使う。明るさの ふるい分けは しない(宇宙の写真は 暗いのが ふつう)。
聞いた答えは tools/series-*.json に おぼえるので、止まっても もう一度 走らせれば つづきから。

使いかた(flick-travel/ で):  python3 tools/fetch_series_photos.py [key ...] [--redo]
"""
import io
import json
import sys
import time
import urllib.parse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import fetch_photos as F  # noqa: E402
import fetch_portraits as P  # noqa: E402  (get / TooBusy を使う)
from PIL import Image  # noqa: E402

ROOT = F.ROOT
SERIES = {}  # key → (Wikipedia の題名, 名前, シリーズ名)
for name in ("space", "body"):
    for line in (ROOT / "tools" / f"{name}.tsv").read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.startswith("#"):
            f = line.split("\t")
            SERIES[f[0]] = (f[9].strip(), f[1], name)
LEAD_CACHE = ROOT / "tools" / "series-leadimages.json"  # 題名 → {"img": ファイル名 or None, "en": 英語版の題名}
INFO_CACHE = ROOT / "tools" / "series-fileinfo.json"    # Commons の 写真の情報
MIMES = ("image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/tiff", "image/webp", "video/webm", "application/ogg")  # 動画は 縮小版(静止画)をもらう
_last = [0.0]


def get(url):
    """呼ぶあいだを 1秒あける。429 は Retry-After(120秒まで)を まって やりなおし、それより長いと TooBusy"""
    gap = time.time() - _last[0]
    if gap < 1.0:
        time.sleep(1.0 - gap)
    try:
        return P.get(url)
    finally:
        _last[0] = time.time()


def pageimages(host, titles, langlinks=False):
    """題名 → (代表画像, 英語版の題名)。redirects / normalized を もとの題名に もどす"""
    params = {"action": "query", "prop": "pageimages" + ("|langlinks" if langlinks else ""), "piprop": "name",
              "titles": "|".join(titles), "redirects": 1, "format": "json", "formatversion": 2}
    if langlinks:
        params.update({"lllang": "en", "lllimit": "max"})
    js = json.loads(get(f"https://{host}/w/api.php?" + urllib.parse.urlencode(params)))
    q = js.get("query", {})
    # もとの題名 → 正規化 → 転送 の順に たどる(2つの題名が 同じ記事に 転送されても まちがえないよう 前向きに引く)
    norm = {n["from"]: n["to"] for n in q.get("normalized", [])}
    redir = {r["from"]: r["to"] for r in q.get("redirects", [])}
    pages = {pg["title"]: pg for pg in q.get("pages", [])}
    out = {}
    for t in titles:
        final = norm.get(t, t)
        final = redir.get(final, final)
        pg = pages.get(final)
        if pg is None:
            continue  # 答えに無い → 聞けていない あつかい(あとで)
        en = (pg.get("langlinks") or [{}])[0].get("title")
        out[t] = (pg.get("pageimage"), en, pg.get("missing", False))
    return out


def lead_images(titles):
    cache = json.loads(LEAD_CACHE.read_text(encoding="utf-8")) if LEAD_CACHE.exists() else {}
    todo = [t for t in dict.fromkeys(titles) if t not in cache]
    for i in range(0, len(todo), 40):
        batch = todo[i:i + 40]
        try:
            res = pageimages("ja.wikipedia.org", batch, langlinks=True)
        except P.TooBusy as e:
            print(f"  ...Wikipedia が混んでいる(あとで): {e}", flush=True)
            continue
        for t in batch:
            if t in res:
                img, en, missing = res[t]
                cache[t] = {"img": img, "en": en, "missing": bool(missing)}
        LEAD_CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"代表画像(日本語版) {min(i + 40, len(todo))}/{len(todo)}", flush=True)
    # 日本語版に 代表画像が無い記事は 英語版を見る
    en_todo = [t for t in titles if cache.get(t) and not cache[t]["img"] and cache[t].get("en") and "en_img" not in cache[t]]
    en_todo = list(dict.fromkeys(en_todo))
    for i in range(0, len(en_todo), 40):
        batch = en_todo[i:i + 40]
        try:
            res = pageimages("en.wikipedia.org", [cache[t]["en"] for t in batch])
        except P.TooBusy as e:
            print(f"  ...英語版が混んでいる(あとで): {e}", flush=True)
            continue
        for t in batch:
            cache[t]["en_img"] = (res.get(cache[t]["en"]) or (None,))[0]
        LEAD_CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"代表画像(英語版) {min(i + 40, len(en_todo))}/{len(en_todo)}", flush=True)
    return cache


def file_infos(titles):
    infos = json.loads(INFO_CACHE.read_text(encoding="utf-8")) if INFO_CACHE.exists() else {}
    todo = [t for t in dict.fromkeys(titles) if t.replace("_", " ") not in infos]
    for i in range(0, len(todo), 50):
        batch = todo[i:i + 50]
        url = F.API + "?" + urllib.parse.urlencode({
            "action": "query", "prop": "imageinfo", "titles": "|".join(batch), "format": "json", "formatversion": "2",
            "iiprop": "url|extmetadata|size|mime", "iiurlwidth": "960"})
        try:
            js = json.loads(get(url))
        except P.TooBusy as e:
            print(f"  ...Commons が混んでいる(あとで): {e}", flush=True)
            continue
        q = js.get("query", {})
        for page in q.get("pages", []):
            infos[page.get("title", "")] = page
        INFO_CACHE.write_text(json.dumps(infos, ensure_ascii=False), encoding="utf-8")
        print(f"写真の情報 {min(i + 50, len(todo))}/{len(todo)}", flush=True)
    return infos


def flatten(img, series):
    """すけている絵は 下地をぬる。描いてある所が 暗ければ 白、明るければ 黒(黒い線の図が 黒い下地に 消えないように)"""
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        img = img.convert("RGBA")
        alpha = img.split()[3]
        lum = img.convert("L")
        opaque = [l for l, a in zip(lum.getdata(), alpha.getdata()) if a > 128]
        dark = not opaque or sum(opaque) / len(opaque) < 128
        bg = Image.new("RGB", img.size, (255, 255, 255) if dark else (0, 0, 0))
        bg.paste(img, mask=alpha)
        return bg
    return img.convert("RGB")


def main():
    only = set(a for a in sys.argv[1:] if not a.startswith("--"))
    redo = "--redo" in sys.argv
    keys = [k for k in SERIES if not only or k in only]
    js_path = ROOT / "photos.js"
    m = F.re.search(r"=\s*(\{.*\});", js_path.read_text(encoding="utf-8"), F.re.S)
    photos = json.loads(m.group(1)) if m else {}
    keys = [k for k in keys if redo or k not in photos]  # もう取ってある ものは とばす(つづきから)
    lead = lead_images([SERIES[k][0] for k in keys])
    want = {}  # key → File:名前
    for k in keys:
        t = SERIES[k][0]
        c = lead.get(t)
        if c is None:
            print(f"… {k}: 代表画像を まだ聞けていない(あとで)", flush=True)
            continue
        name = c["img"] or c.get("en_img")
        if not name:
            why = "記事が無い" if c.get("missing") else "代表画像が無い"
            print(f"✗ {k}({SERIES[k][1]}): Wikipedia に {why}", flush=True)
            continue
        want[k] = "File:" + name.replace("_", " ")
    infos = file_infos(list(want.values()))
    ok = 0
    for k, title in want.items():
        series = SERIES[k][2]
        page = infos.get(title)
        if page is None:
            print(f"… {k}: 写真の情報を まだ聞けていない(あとで) {title}", flush=True)
            continue
        if page.get("missing") or "imageinfo" not in page:
            print(f"✗ {k}: Commons に無い(日本語版だけの絵) {title}", flush=True)
            continue
        ii = page["imageinfo"][0]
        mime = ii.get("mime")
        if mime not in MIMES:
            print(f"✗ {k}: 形式 {mime}", flush=True)
            continue
        meta = ii.get("extmetadata", {})
        short = F.plain(meta.get("LicenseShortName", {}).get("value"))
        lic = F.license_ja(short)
        if not lic:
            print(f"✗ {k}: ライセンス {short}", flush=True)
            continue
        svg = mime == "image/svg+xml"
        if mime in ("video/webm", "application/ogg") and not ii.get("width"):
            print(f"✗ {k}: 形式 {mime}(音だけ)", flush=True)
            continue
        ow, oh = ii.get("width") or 0, ii.get("height") or 1
        if not svg and (ow < 150 or ow < oh * 0.3 or ow > oh * 3.5):
            print(f"✗ {k}: 形・大きさ {ow}x{oh}", flush=True)
            continue
        lic_url = F.plain(meta.get("LicenseUrl", {}).get("value"))
        author = F.plain(meta.get("Artist", {}).get("value")) or "不明"
        if len(author) > 60:
            author = author[:60] + "…"
        # もとの幅より 小さい幅を頼む(thumb.wikimedia.org から来る)。SVG は いくらでも 大きくできるので 800
        if svg or ow > 900:
            want_w = F.MAX_W
        else:
            want_w = next((b for b in (640, 500, 400, 320, 250, 200, 150) if b < ow * 0.9), 120)
        img = None
        for w in (want_w, 330, 250):
            if w > want_w:
                continue
            thumb = ("https://commons.wikimedia.org/wiki/Special:FilePath/"
                     + urllib.parse.quote(page["title"][5:].replace(" ", "_")) + "?width=" + str(w))
            try:
                img = flatten(Image.open(io.BytesIO(get(thumb))), series)
                break
            except P.TooBusy as e:
                print(f"  ...{w}px は {e}", flush=True)
            except Exception as e:  # noqa
                print(f"  ...落とせない {thumb[:90]} {e}", flush=True)
        if img is None:
            print(f"✗ {k}: あとで(どの大きさも だめ)", flush=True)
            continue
        if img.width > F.MAX_W:
            img = img.resize((F.MAX_W, round(img.height * F.MAX_W / img.width)), Image.LANCZOS)
        out = F.OUT_DIR / f"photo-{k}.jpg"
        img.save(out, "JPEG", quality=F.QUALITY, optimize=True, progressive=True)
        photos[k] = {"src": f"photo-{k}.jpg", "author": author, "license": lic, "licenseUrl": lic_url,
                     "page": ii["descriptionurl"], "file": page["title"]}
        F.save(js_path, photos)
        ok += 1
        print(f"{k:14s} {out.stat().st_size // 1024:4d}KB  {lic:22s} {author[:30]}  ({page['title'][:60]})", flush=True)
    print(f"今回 {ok}枚", flush=True)


if __name__ == "__main__":
    main()
