#!/usr/bin/env python3
"""偉人の肖像を まとめて取る(tools/people-*.tsv → photos.js / photo-<key>.jpg)。

fetch_photos.py は 1人ずつ Wikipedia と Commons に聞くので、429(呼びすぎ)で 1回ごとに 30〜60秒 待たされ、200人で 何時間もかかった。
こちらは ① Wikipedia の代表画像の名前を 40人ずつ ② Commons の写真の情報を 20枚ずつ まとめて聞き、③ 写真だけ 1枚ずつ 落とす。
429 のときは Retry-After のぶんだけ待つ。決まりごと(ライセンス・大きさ・保存の形)は fetch_photos.py のものを そのまま使う。

使いかた(flick-travel/ で):  python3 tools/fetch_portraits.py [key ...]
"""
import io, json, sys, time, urllib.parse, urllib.request, urllib.error
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import fetch_photos as F  # noqa: E402
from PIL import Image  # noqa: E402

ROOT = F.ROOT
PEOPLE = {}  # key → (Wikipedia の題名, 名前)
for tsv in sorted((ROOT / "tools").glob("people-*.tsv")):
    for line in tsv.read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.startswith("#"):
            f = line.split("\t")
            PEOPLE[f[0]] = (f[4], f[1])
CACHE = ROOT / "tools" / "people-portraits.json"
INFO_CACHE = ROOT / "tools" / "people-fileinfo.json"  # Commons の 写真の情報(作者・ライセンス・大きさ)の 写し
# 代表画像が 花押(サイン)や 無い人は、Commons を見て 決めたファイル名を ここに(Wikipedia の題名 → File: なしの名前)
MANUAL = {}
# キー → Commons のファイル名(File: なし)。Commons を英語名でさがして 2026-09-25 に えらんだもの(代表画像が 花押・風景・無い人)
MANUAL_KEY = {
    "nobunaga": "Oda-Nobunaga.jpg", "masamune": "Date Masamune02.jpg", "kukai": "Portrait of Kōbō Daishi.jpg", "shinran": "Shinran Shonin.jpg",
    "uemura": "Naomi Uemura.jpg", "dogen": "Soto-Zen-Master-Dogen-Zenji-Portrait.png", "hideyoshi": "Toyotomi hideyoshi.jpg", "ieyasu": "Tokugawa Ieyasu2.JPG",
    "kenshin": "Uesugi Kenshin.jpg", "tsuda": "Tsuda Umeko Portrait c1900.png", "ogai": "Mori Ogai (cropped).jpg", "ichiyo": "Higuchi Ichiyou.png",
    "toyoda": "Sakichi Toyoda.jpg", "iwasaki": "Iwasaki Yataro.jpg", "tanaka": "Tanaka Shozo.jpg", "makino": "Makino Tomitaro.jpg",
    "chuya": "Nakahara Chuya.jpg", "misuzu": "Kaneko Misuzu.jpg", "mizuki": "Shigeru Mizuki at age 18.jpg", "futabayama": "Futabayama Sadaji.jpg",
    "issai": "A portrait of Satoh Issai by Watanabe Kazan.jpg", "hisashige": "TanakaHisashige.jpg",
    "columbus": "Portrait of a Man, Said to be Christopher Columbus.jpg", "confucius": "Confucius Tang Dynasty.jpg",
    "alexander": "Alexander the Great mosaic (cropped).jpg", "tolstoy": "L.N.Tolstoy Prokudin-Gorsky.jpg",
    "exupery": "Antoine de Saint-Exupéry.jpg", "chopin": "Frederic Chopin photo.jpeg",
}


class TooBusy(Exception):
    pass


def get(url):
    while True:
        req = urllib.request.Request(url, headers={"User-Agent": "flick-travel/1.0 (https://flick-travel-game.github.io/flick-travel/)"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = int(e.headers.get("Retry-After", "30") or 30)
                if wait > 120:
                    # 長い「待て」は その絵だけ あきらめて 次へ(1枚の絵(新しい大きさの縮小版)に対して 出ることが多い)。あとで もう一度 走らせれば つづきから
                    raise TooBusy(f"{wait}秒待て {url[:120]}")
                print(f"  ...429 {wait}秒まって やりなおし", file=sys.stderr, flush=True)
                time.sleep(wait + 1)
                continue
            raise


def wiki_names(titles):
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    todo = [t for t in titles if not cache.get(t)]
    for i in range(0, len(todo), 40):
        batch = todo[i:i + 40]
        url = "https://ja.wikipedia.org/w/api.php?" + urllib.parse.urlencode({"action": "query", "prop": "pageimages", "piprop": "name", "titles": "|".join(batch), "redirects": 1, "format": "json", "formatversion": 2})
        js = json.loads(get(url))
        back = {}
        for n in js["query"].get("normalized", []):
            back[n["to"]] = n["from"]
        for r in js["query"].get("redirects", []):
            back[r["to"]] = back.get(r["from"], r["from"])
        for pg in js["query"]["pages"]:
            t = back.get(pg["title"], pg["title"])
            cache[t] = pg.get("pageimage")
        CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"名前 {min(i + 40, len(todo))}/{len(todo)}", flush=True)
    return cache


def main():
    only = set(a for a in sys.argv[1:] if not a.startswith("--"))
    keys = [k for k in PEOPLE if not only or k in only]
    cache = wiki_names([PEOPLE[k][0] for k in keys])
    cache.update(MANUAL)
    js_path = ROOT / "photos.js"
    photos = {}
    m = F.re.search(r"=\s*(\{.*\});", js_path.read_text(encoding="utf-8"), F.re.S)
    if m:
        photos = json.loads(m.group(1))
    want = {}
    for k in keys:
        if k in photos and not "--redo" in sys.argv:
            continue  # もう取ってある(止まっても つづきから)
        name = MANUAL_KEY.get(k) or cache.get(PEOPLE[k][0])
        if not name:
            print(f"✗ {k}({PEOPLE[k][1]}): Wikipedia に 代表画像が無い", flush=True)
            continue
        want["File:" + name] = k
    titles = list(want)
    # ① Commons に 写真の情報を まとめて聞く(50枚ずつ = 4回)。api.php は 呼びすぎると 600秒 止められるので、聞いた答えは INFO_CACHE に おぼえる
    infos = json.loads(INFO_CACHE.read_text(encoding="utf-8")) if INFO_CACHE.exists() else {}
    todo = [t for t in titles if t.replace("_", " ") not in infos]  # API は 題名の _ を 空白にして返す
    for i in range(0, len(todo), 50):
        batch = todo[i:i + 50]
        for page in F.info([t[5:] for t in batch]):
            infos[page.get("title", "")] = page
        # 正規化(空白→_ など)で 題名が変わったものも 引けるように
        INFO_CACHE.write_text(json.dumps(infos, ensure_ascii=False), encoding="utf-8")
        print(f"写真の情報 {min(i + 50, len(todo))}/{len(todo)}", flush=True)
    # ② 1枚ずつ 落とす(thumb.wikimedia.org から。こちらは 止められない)
    for title, k in want.items():
        page = infos.get(title) or infos.get(title.replace("_", " "))
        if page is None:
            print(f"? 題名が合わない {title}", flush=True)
            continue
        if page.get("missing") or "imageinfo" not in page:
            print(f"✗ {k}: Commons に無い(日本語版だけの絵) {title}", flush=True)
            continue
        ii = page["imageinfo"][0]
        if ii.get("mime") not in ("image/jpeg", "image/png"):
            print(f"✗ {k}: 形式 {ii.get('mime')}", flush=True)
            continue
        meta = ii.get("extmetadata", {})
        short = F.plain(meta.get("LicenseShortName", {}).get("value"))
        lic = F.license_ja(short)
        if not lic:
            print(f"✗ {k}: ライセンス {short}", flush=True)
            continue
        if ii["width"] < ii["height"] * 0.4 or ii["width"] > ii["height"] * 2.4 or ii["width"] < 200:  # 肖像は 小さめ・たて長でも よい
            print(f"✗ {k}: 形・大きさ {ii['width']}x{ii['height']}", flush=True)
            continue
        lic_url = F.plain(meta.get("LicenseUrl", {}).get("value"))
        # ⚠️ 名所の写真では {{Licensed-PD}} を見に もう1回 聞くが、肖像(昔の絵・写真)は 作品そのものが パブリックドメインなので 聞かない(API を 呼ばないため)
        author = F.plain(meta.get("Artist", {}).get("value")) or "不明"
        if len(author) > 60:
            author = author[:60] + "…"
        # ⚠️ upload.wikimedia.org から直接 落とすと すぐ「600秒待て」になる(2026-09-25)。
        #    Special:FilePath?width= は thumb.wikimedia.org に飛ばしてくれて、そちらは 止められなかった
        #    ⚠️ 「もとの大きさ以上」を頼むと upload.wikimedia.org(すぐ止められる)に飛ばされる。
        #    かならず もとの幅より 小さい幅を頼む → 縮小版は thumb.wikimedia.org から来る(こちらは 止められない)
        ow = ii["width"]
        want_w = F.MAX_W if ow > 900 else next((b for b in (640, 500, 400, 320, 250, 200, 150) if b < ow * 0.9), 120)
        thumb = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(page["title"][5:].replace(" ", "_")) + "?width=" + str(want_w)
        img = None
        try:
            img = Image.open(io.BytesIO(get(thumb))).convert("RGB")
        except TooBusy as e:
            print(f"✗ {k}: あとで {e}", flush=True)
            continue
        except Exception as e:  # noqa
            print(f"  ...落とせない {thumb[:80]} {e}", flush=True)
        if img is None:
            print(f"✗ {k}: 落とせない", flush=True)
            continue
        if img.width > F.MAX_W:
            img = img.resize((F.MAX_W, round(img.height * F.MAX_W / img.width)), Image.LANCZOS)
        out = F.OUT_DIR / f"photo-{k}.jpg"
        img.save(out, "JPEG", quality=F.QUALITY, optimize=True, progressive=True)
        photos[k] = {"src": f"photo-{k}.jpg", "author": author, "license": lic, "licenseUrl": lic_url, "page": ii["descriptionurl"], "file": page["title"]}
        F.save(js_path, photos)
        print(f"{k:12s} {out.stat().st_size // 1024:4d}KB  {lic:24s} {author}  ({page['title']})", flush=True)
        time.sleep(2)


if __name__ == "__main__":
    main()
