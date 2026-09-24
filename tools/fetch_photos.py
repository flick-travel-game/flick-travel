#!/usr/bin/env python3
"""名所モードの写真を Wikimedia Commons から取ってきて、縮小して photo-<場所>.jpg として置く。

- 使ってよいのは パブリックドメイン(CC0 もふくむ)/ CC BY / CC BY-SA だけ。
  ほかのライセンス(CC BY-NC・フェアユースなど)の候補は とばす。
- 撮影者名・ライセンス名・元のページを photos.js に書き出す。
  ゲームの結果画面のクレジットは ここから出る。

使いかた(flick-travel/ で):
    pip install Pillow
    python3 tools/fetch_photos.py
"""
import html
import io
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT  # iPhone からでも上げやすいよう フォルダを作らない
API = "https://commons.wikimedia.org/w/api.php"
UA = "FlickTravelGame/1.0 (small typing game) python-urllib"
MAX_W = 800      # 画面に出すのは最大で幅520px前後なので、これで足りる
QUALITY = 72

# 場所ごとの候補(上から順に試す)。ぜんぶ昼の写真。
# ⚠️ エッフェル塔の夜景は ライトアップに著作権があるので 使わない。
CANDIDATES = {
    "eiffel":    ["Tour Eiffel Wikimedia Commons.jpg", "Tour Eiffel Wikimedia Commons (cropped).jpg"],
    "liberty":   ["Statue of Liberty 7.jpg", "Statue of Liberty, NY.jpg", "Liberty-statue-with-manhattan.jpg"],
    "pyramid":   ["All Gizah Pyramids.jpg", "Kheops-Pyramid.jpg"],
    "wall":      ["The Great Wall of China at Jinshanling-edit.jpg", "The Great Wall of China at Jinshanling.jpg", "GreatWall 2004 Summer 4.jpg"],
    "taj":       ["Taj Mahal, Agra, India edit3.jpg", "Taj Mahal (Edited).jpeg", "Taj Mahal in March 2004.jpg"],
    "fuji":      ["080103 hakkai fuji.jpg", "Mount Fuji from Hotel Mt Fuji 1995-2-15.jpg", "FujiSunriseKawaguchiko2025WP.jpg"],
    "colosseum": ["Colosseo 2020.jpg", "Colosseum in Rome, Italy - April 2007.jpg"],
    "machu":     ["Machu Picchu, Peru.jpg", "80 - Machu Picchu - Juin 2009 - edit.jpg"],
    "opera":     ["Sydney Australia. (21339175489).jpg", "Sydney Opera House - Dec 2008.jpg"],
    # 夜のバスの写真(Big Ben, London.jpg)は 広告と人の顔が大きいので使わない
    "bigben":    ["Big Ben Elizabeth Tower London 2023 01.jpg", "Day 6- Big Ben (8561177218).jpg"],
    "sagrada":   ["Σαγράδα Φαμίλια 2941.jpg", "Sagrada Familia 01.jpg"],
    "angkor":    ["Angkor Wat.jpg", "Buddhist monks in front of the Angkor Wat.jpg"],
    "pisa":      ["The Leaning Tower of Pisa SB.jpeg", "Leaning tower of pisa 2.jpg"],
    # 夕方の写真(Arc Triomphe.jpg)は 奥にライトアップ中のエッフェル塔が写るので使わない
    "arc":       ["Arc de Triomphe, Paris 21 October 2010.jpg", "Arc de Triomphe (41362800754).jpg"],
    "moai":      ["Moai Rano raraku.jpg", "AhuTongariki.JPG"],
    "golden":    ["GoldenGateBridge-001.jpg", "Golden Gate Bridge as seen from Battery East.jpg"],
    "castle":    ["Schloss Neuschwanstein 2013.jpg", "Neuschwanstein Castle LOC print.jpg"],
    # 赤の広場の写真(Moscow July 2011-16.jpg)は 聖堂が小さく 人が多いので使わない
    "basil":     ["Moscow - 2025 - Daytime view of St. Basil's Cathedral from Vasilyevsky Spusk.jpg", "Saint Basil's Cathedral (Moscow, 2004).jpg"],
    "stone":     ["Stonehenge2007 07 30.jpg", "Stonehenge Closeup.jpg"],
    "kinkaku":   ["Kinkaku-ji the Golden Temple in Kyoto overlooking the lake - high rez.JPG", "Kinkaku3402CBcropped.jpg"],
    "uluru":     ["Uluru, helicopter view, cropped.jpg", "ULURU.jpg"],
    "petra":     ["Treasury petra crop.jpeg", "Al Khazneh Petra edit.jpg"],
    # ここから下は 2026-09 に足した78か所。候補を決めていないので 検索で選ぶ(品質の良い写真を先に)
    "mtsaint": [],
    "versailles": [],
    "notredame": [],
    "peter": [],
    "venice": [],
    "florence": ["Florence Cathedral seen from Piazzale Michelangelo dllu.jpg", "Firenze - Cattedrale di Santa Maria del Fiore da Piazzale Michelangelo.jpg"],
    "pompeii": [],
    "parthenon": [],
    "santorini": [],
    "alhambra": [],
    "towerbridge": [],
    "edinburgh": [],
    "brandenburg": [],
    "cologne": [],
    "charles": [],
    "matterhorn": [],
    "hagia": [],
    "cappadocia": [],
    "schonbrunn": ["Wien, Schloss Schönbrunn -- 2018 -- 3226.jpg", "Palace of Schönbrunn, west facade-2.jpg", "Façade nord château Schönbrunn Vienna.jpg"],
    "kinderdijk": [],
    "britishmuseum": [],
    "trevi": [],
    "kiyomizu": [],
    "itsukushima": [],
    "himeji": [],
    "todaiji": [],
    "nikko": [],
    "skytree": ["Tokyo Skytree 2014 Ⅲ.jpg", "View of Tokyo Skytree from Asakusa 20190420 1.jpg", "Tokyo Skytree in spring.jpg"],
    "tokyotower": ["Tokyo Tower during daytime.jpg"],
    "fushimi": [],
    "shirakawa": [],
    "genbaku": [],
    "yakushima": [],
    "forbidden": ["Beijing China Forbidden-City-03.jpg", "Hall of Supreme Harmony, Forbidden City, Beijing, with tourists.jpg"],
    "terracotta": [],
    "potala": ["Tibet - Lhasa - Potala Palace - 6406925781.jpg", "Potala Palace, former residence of Dalai Lama, 2006.jpg", "Potala.jpg"],
    "guilin": [],
    "borobudur": [],
    "halong": [],
    "watarun": [],
    "bagan": [],
    "everest": [],
    "goldentemple": [],
    "shwedagon": [],
    "victoria": [],
    "kilimanjaro": [],
    "sahara": [],
    "tablemtn": [],
    "abusimbel": [],
    "sphinx": [],
    "baobab": [],
    "grandcanyon": [],
    "niagara": [],
    "rushmore": [],
    "yellowstone": [],
    "whitehouse": [],
    "empire": ["View of Empire State Building from Rockefeller Center New York City dllu.jpg", "Empire State Building (aerial view).jpg"],
    "chichen": [],
    "christ": [],
    "iguazu": [],
    "uyuni": [],
    "teotihuacan": [],
    "perito": [],
    "monument": [],
    "angel": [],
    "reef": [],
    "milford": [],
    "harbour": [],
    "milan": [],
    "buckingham": [],
    "hallstatt": [],
    "bluemosque": [],
    "diamondhead": ["Diamond Head from Waikiki Beach.jpg", "Diamond Head from Waikiki Beach 01.jpg"],
    "londoneye": [],
    "westminster": [],
    "budapest": [],
    "kamakura": [],
    "antelope": [],
}
# 候補が ぜんぶだめだったときに Commons を さがす言葉
SEARCH = {
    "eiffel": "Eiffel Tower day", "liberty": "Statue of Liberty", "pyramid": "Giza pyramids",
    "wall": "Great Wall of China", "taj": "Taj Mahal", "fuji": "Mount Fuji", "colosseum": "Colosseum Rome",
    "machu": "Machu Picchu", "opera": "Sydney Opera House", "bigben": "Big Ben Elizabeth Tower",
    "sagrada": "Sagrada Familia", "angkor": "Angkor Wat", "pisa": "Leaning Tower of Pisa",
    "arc": "Arc de Triomphe Paris", "moai": "Moai Easter Island", "golden": "Golden Gate Bridge",
    "castle": "Neuschwanstein Castle", "basil": "Saint Basil's Cathedral", "stone": "Stonehenge",
    "kinkaku": "Kinkaku-ji", "uluru": "Uluru", "petra": "Petra Treasury",
    "mtsaint": "Mont-Saint-Michel",
    "versailles": "Palace of Versailles",
    "notredame": "Notre-Dame de Paris west facade",
    "peter": "St. Peter's Basilica",
    "venice": "Grand Canal Venice",
    "florence": "Florence Cathedral Duomo exterior",
    "pompeii": "Pompeii Vesuvius",
    "parthenon": "Parthenon Acropolis",
    "santorini": "Oia Santorini",
    "alhambra": "Alhambra Granada",
    "towerbridge": "Tower Bridge London",
    "edinburgh": "Edinburgh Castle",
    "brandenburg": "Brandenburger Tor",
    "cologne": "Kölner Dom Westfassade",
    "charles": "Charles Bridge Prague",
    "matterhorn": "Matterhorn",
    "hagia": "Hagia Sophia",
    "cappadocia": "Cappadocia",
    "schonbrunn": "Schloss Schönbrunn",
    "kinderdijk": "Kinderdijk windmills",
    "britishmuseum": "British Museum Great Russell Street",
    "trevi": "Trevi Fountain",
    "kiyomizu": "Kiyomizu-dera stage",
    "itsukushima": "Itsukushima Shrine torii",
    "himeji": "Himeji Castle",
    "todaiji": "Todaiji Daibutsuden",
    "nikko": "Nikko Toshogu Yomeimon",
    "skytree": "Tokyo Skytree Sumida",
    "tokyotower": "Tokyo Tower",
    "fushimi": "Fushimi Inari torii",
    "shirakawa": "Shirakawa-go",
    "genbaku": "Genbaku Dome Hiroshima",
    "yakushima": "Jomon Sugi Yakushima",
    "forbidden": "Forbidden City Beijing",
    "terracotta": "Terracotta Army Pit 1",
    "potala": "Potala Palace Lhasa",
    "guilin": "Li River Guilin",
    "borobudur": "Borobudur",
    "halong": "Ha Long Bay",
    "watarun": "Wat Arun",
    "bagan": "Bagan temples",
    "everest": "Mount Everest",
    "goldentemple": "Golden Temple Amritsar",
    "shwedagon": "Shwedagon Pagoda",
    "victoria": "Victoria Falls",
    "kilimanjaro": "Kilimanjaro",
    "sahara": "Sahara desert dunes",
    "tablemtn": "Table Mountain Cape Town from Bloubergstrand",
    "abusimbel": "Abu Simbel Great Temple facade",
    "sphinx": "Great Sphinx of Giza",
    "baobab": "Avenue of the Baobabs",
    "grandcanyon": "Grand Canyon",
    "niagara": "Horseshoe Falls Niagara",
    "rushmore": "Mount Rushmore",
    "yellowstone": "Yellowstone Old Faithful",
    "whitehouse": "White House Washington D.C.",
    "empire": "Empire State Building",
    "chichen": "Chichen Itza El Castillo",
    "christ": "Christ the Redeemer Rio",
    "iguazu": "Iguazu Falls",
    "uyuni": "Salar de Uyuni reflection",
    "teotihuacan": "Pyramid of the Sun Teotihuacan",
    "perito": "Perito Moreno Glacier",
    "monument": "Monument Valley",
    "angel": "Angel Falls",
    "reef": "Great Barrier Reef aerial",
    "milford": "Milford Sound",
    "harbour": "Sydney Harbour Bridge",
    "milan": "Milan Cathedral",
    "buckingham": "Buckingham Palace",
    "hallstatt": "Hallstatt",
    "bluemosque": "Sultan Ahmed Mosque",
    "diamondhead": "Diamond Head crater",
    "londoneye": "London Eye",
    "westminster": "Westminster Abbey west front",
    "budapest": "Hungarian Parliament Building Danube",
    "kamakura": "Kamakura Daibutsu",
    "antelope": "Antelope Canyon",
}

# tools/spots-*.tsv(tools/add_spots.py が読む名所の一覧)の 検索語も入れる。候補リストは無し(検索で選ぶ)
for _tsv in sorted((ROOT / "tools").glob("spots-*.tsv")):
    for _line in _tsv.read_text(encoding="utf-8").splitlines():
        if _line.strip() and not _line.startswith("#"):
            _f = _line.split("\t")
            SEARCH.setdefault(_f[0], _f[4])
            CANDIDATES.setdefault(_f[0], [])
# 検索だと まだ ちがう物が出た場所は、Commons を見て 決めた ファイル名(2026-09-24)
CANDIDATES.update({
    "chusonji": ["Konjikido (Chusonji) 02.jpg", "Golden Hall, Chusonji temple, Hiraizumi - Nov 13, 2011.jpg", "Hondo Chusonji.jpg"],
    "minatomirai": ["20250105 Minato Mirai 21 (Landmark Tower, Queen's Square Yokohama, Cosmo Clock 21) 080219.jpg", "Cityscape of Yokohama; January 2014 (05).jpg"],
    "ise": ["Ise Ise-jingu Ujibashi Bridge 1.jpg", "Ise Shrine Uji-bashi1.jpg"],
    "kasuga": ["Nara Kasuga-taisha Main Sanctuary Lanterns 1.jpg", "Nara Kasuga-taisha Main Sanctuary Lanterns 2.jpg"],
    "kotohira": ["Konpira Shrine, Kagawa Prefecture; November 2019 (02).jpg", "Kotohira-gu45n4592.jpg"],
    "yufuin": ["Lake Kinrin in Yufuin, Oita - Aug 24, 2018 (1).jpg", "Lake Kinrin.JPG"],
    "strasbourg": ["Strasbourg - Cathedral - West Façade I.jpg", "Strasbourg - Cathedral - West Façade II.jpg"],
    "seville": ["Cathedral sevilla exterior 05.JPG", "Torre de La Giralda (Sevilla).jpg"],
    "stephansdom": ["Stephansdom Chor.JPG"],
    "persepolis": ["Persepolis 1 - FP.jpg", "Persepolis001.jpg"],
    "rila": ["Rilski Monastery - panoramio.jpg", "Рилски манастир - panoramio (25).jpg"],
    "marrakech": ["Jamaa El Fna, Marrakesh, Morocco, 20250124 1804 7017.jpg", "Jemaa el-Fna square Marrakesh Morocco (16945765401).jpg"],
    "macau": ["The Ruins of St. Paul's in Macau.jpg", "Macao, Part III - Macau8690.jpg"],
    "banaue": ["Banaue Philippines Banaue-Rice-Terraces-01.jpg"],
    "sigiriya": ["Sigiriya Rock Sri Lanka (29959819372).jpg", "Sigiriya palacio.jpg"],
    "registan": ["Registon majmuasi (Ulugʻbek, Sherdor, Tilla Kori) 01.jpg", "Registon 1.jpg"],
    "cntower": ["Toronto-CN-tower-and-Canadian-flag-skyline.jpg", "Toronto skyline viewed from Trillium Park.jpg"],
    "guanajuato": ["Vista de Guanajuato desde el mirador del Pípila.jpg", "Guanajuato desde el Pípila - panoramio.jpg"],
    "sugarloaf": ["Sugarloaf Mountain, Rio de Janeiro, Brazil.jpg", "Sweet Bread Mountain.jpg"],
    "hoian": ["2024-12-20 Japanese Bridge in Hoi An.jpg", "Hoi An Ancient Town, Vietnam (7090638613).jpg"],
    "sakurajima": ["From the Ibusuki skyline parkway (4516796058).jpg", "Sakurajima at Sunset.jpg", "Sakurajima 2019-07-01.jpg"],
    "kilauea": ["Kilauea Volcano and lava flows from fissures near Leilani Estates, Hawaii, USA (40544299770).jpg", "Lava Dome (24366962292).jpg"],
    "zayed": ["Sheikh Zayed Grand Mosque @ Abu Dhabi (15856602738).jpg", "Grand mosque in Abu Dhabi - P1030160.jpg", "Sheikh Zayed Grand Mosque in Abu Dhabi - panoramio.jpg"],
})
CANDIDATES["kasuga"] = ["Nara city, Kasuga-taisha Shrine.jpg", "Kasuga-taisha Shrine, Nara Prefecture; April 2017 (02).jpg"]
CANDIDATES["strasbourg"] = ["Strasbourg Cathedral Exterior - Diliff.jpg", "Cathédrale Notre-Dame de Strasbourg.jpg", "Strasbourg Cathedral.jpg"]


# 検索だと ちがう物(浅草寺 → 駅の改札、喜望峰 → 同じ名前のパブ)が まざるので、
# その場所の Commons のカテゴリを 先に見る(2026-09-24 に 目で見て 直したもの)
CATS = {
    "chusonji": "Chūson-ji", "ginzan": "Ginzan Onsen", "sensoji": "Kaminarimon", "meiji": "Meiji Shrine",
    "shibuya": "Shibuya Crossing", "tokyostation": "Tokyo Station Marunouchi Building", "minatomirai": "Minato Mirai 21",
    "enoshima": "Enoshima", "kegon": "Kegon Falls", "kusatsu": "Yubatake", "takayama": "Sanmachi-suji",
    "ise": "Ise Grand Shrine", "kasuga": "Kasuga-taisha", "koyasan": "Danjō Garan", "izumo": "Izumo-taisha",
    "matsuyama": "Matsuyama Castle", "kotohira": "Kotohira-gū", "nagasakipeace": "Nagasaki Peace Park",
    "yufuin": "Yufuin, Ōita", "sakurajima": "Sakurajima", "taketomi": "Taketomi Island",
    "chambord": "Château de Chambord", "nice": "Promenade des Anglais", "strasbourg": "Cathédrale Notre-Dame de Strasbourg",
    "spanishsteps": "Spanish Steps", "heidelberg": "Heidelberg Castle", "preikestolen": "Preikestolen",
    "seville": "Seville Cathedral", "stephansdom": "Stephansdom", "domeofrock": "Dome of the Rock",
    "zayed": "Sheikh Zayed Mosque", "persepolis": "Persepolis", "hassan": "Hassan II Mosque", "lalibela": "Church of Saint George, Lalibela",
    "capeofgoodhope": "Cape of Good Hope", "rila": "Rila Monastery", "bran": "Bran Castle", "marrakech": "Jemaa el-Fnaa",
    "macau": "Ruínas de São Paulo", "ayutthaya": "Wat Mahathat (Ayutthaya)", "banaue": "Banaue Rice Terraces", "sigiriya": "Sigiriya",
    "boudhanath": "Boudhanath", "registan": "Registan", "spaceneedle": "Space Needle", "brooklyn": "Brooklyn Bridge",
    "washington": "Washington Monument", "kilauea": "Kīlauea", "napali": "Nā Pali Coast", "denali": "Denali", "cntower": "CN Tower",
    "guanajuato": "Guanajuato City", "arenal": "Arenal Volcano", "sugarloaf": "Sugarloaf Mountain (Rio de Janeiro)",
    "cartagena": "Cartagena, Colombia", "borabora": "Bora Bora", "bund": "The Bund", "zhangjiajie": "Zhangjiajie National Forest Park",
    "hoian": "Hội An", "petronas": "Petronas Twin Towers", "marinabay": "Marina Bay Sands", "tanahlot": "Tanah Lot",
}


def fetch(url, timeout):
    """429(混んでいる)や 5xx のときは 待ってから やりなおす"""
    for i in range(8):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504) or i == 7:
                raise
            wait = int(e.headers.get("Retry-After") or 0) or 2 ** (i + 1)
            print(f"  ...{e.code} {min(wait, 60)}秒まって やりなおし {url[:120]}", file=sys.stderr)
            time.sleep(min(wait, 60))


def api(params):
    params = {"format": "json", "formatversion": "2", **params}
    return json.loads(fetch(API + "?" + urllib.parse.urlencode(params), 60))


def plain(s):
    """extmetadata の HTML を ただの文字にする"""
    s = re.sub(r"<[^>]+>", "", s or "")
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def license_ja(short):
    """使ってよいライセンスなら 画面に出す名前を返す。だめなら None"""
    s = (short or "").strip()
    low = s.lower()
    if low in ("public domain", "pd") or low.startswith("pd-") or "public domain" in low:
        return "パブリックドメイン"
    if low.startswith("cc0"):
        return "CC0（パブリックドメイン）"
    m = re.fullmatch(r"cc[ -]by(-sa)?[ -]([0-9.]+)( [a-z-]+)?", low)
    if m:
        return s.upper().replace("CC-BY", "CC BY").replace("BY-SA", "BY-SA")
    return None


def info(titles):
    data = api({
        "action": "query", "prop": "imageinfo",
        "titles": "|".join("File:" + t for t in titles),
        "iiprop": "url|extmetadata|size|mime", "iiurlwidth": "960",  # Wikimedia の決まった大きさ(https://w.wiki/GHai)でないと断られる
    })
    return data["query"]["pages"]


def search(q):
    data = api({"action": "query", "list": "search", "srsearch": q + " filetype:bitmap",
                "srnamespace": "6", "srlimit": "20"})
    for _ in range(5):
        if "query" in data:
            return [p["title"][5:] for p in data["query"]["search"]]
        # 検索が混んでいて エラーが返ることがある。待って やりなおす
        print(f"  ...検索エラー {data.get('error', {}).get('code')} 30秒まって やりなおし", file=sys.stderr)
        time.sleep(30)
        data = api({"action": "query", "list": "search", "srsearch": q + " filetype:bitmap",
                    "srnamespace": "6", "srlimit": "20"})
    return []


def photo_license(title):
    """{{Licensed-PD|…|2=写真のライセンス}} なら 写真のほうのライセンスを返す"""
    data = api({"action": "query", "prop": "revisions", "rvprop": "content", "rvslots": "main", "titles": title})
    text = data["query"]["pages"][0]["revisions"][0]["slots"]["main"]["content"]
    i = text.lower().find("licensed-pd")  # 小文字で書いてあるページもある(自由の女神)
    if i < 0:
        return None
    m = re.search(r"cc-(by(?:-sa)?)-([0-9.]+)", text[i:i + 600], re.I)
    if not m:
        raise SystemExit(f"{title}: Licensed-PD だが 写真のライセンスが読めません")
    kind, ver = m.group(1).lower(), m.group(2)
    return f"CC {kind.upper()} {ver}", f"https://creativecommons.org/licenses/{kind}/{ver}/"


# 目で見て だめだった写真(細長い・中だけ・夜・人の顔が大きい など)。検索で また選ばれないように
EXCLUDE = {
    "Paris, Notre Dame -- 2014 -- 1458-65.jpg",
    "Dome of Cattedrale di Santa Maria del Fiore (Florence).jpg",
    "Restoration work Parthenon facade Acropolis Athens Greece.jpg",
    "Kranhäuser Cologne, April 2018 -01.jpg",
    "Schoenbrunn Palace as seen from Neptune Fountain, September 2016.jpg",
    "British Museum Reading Room Panorama Feb 2006.jpg",
    "Four ladies wearing a yukata in front of the North Gate of Kiyomizu-dera temple Kyoto Japan.jpg",
    "Tokyo Tower, Minato City.jpg",
    "Forest on Yakushima from Route 592.jpg",
    "The Forbidden City - View from Coal Hill.jpg",
    "Huế (2024) - Meridian Gate - Ngọ Môn (Hoàng thành Huế) - img 07.jpg",  # ベトナムの別のお城
    "Xian China Terracotta-Army-Museum-01.jpg",
    "SW Snow Peak Potala Padum Zanskar Jun24 A7CR 00939.jpg",
    "Cape Town (ZA), Table Mountain -- 2024 -- 2825.jpg",
    "Benches at Oakes Garden Theatre, Niagara Falls, Canada.jpg",
    "Russian White House and Comecon building.jpg",
    "Right border sun temple.jpg",
    "Brown booby (Sula leucogaster plotus) male in flight Michaelmas Cay.jpg",
    "Sydney Harbour Bridge from Circular Quay.jpg",
    "London Eye Twilight April 2006.jpg",
    "HUN-2015-Budapest-Hungarian Parliament (Budapest) 2015-02.jpg",
    "View of Empire State Building from Rockefeller Center New York City dllu.jpg",
    "Isla del Pescado, Salar de Uyuni, Bolivia, 2016-02-04, DD 42.JPG",
    "Templo de Ramsés II, Abu Simbel, Egipto, 2022-04-02, DD 26-28 HDR.jpg",
    "Bunker atop Diamond Head in Honolulu, Hawaii.jpg",
    "Westminster Abbey - 02.jpg",
}
NIGHT = re.compile(r"worm's-eye|night|nuit|nacht|noche|notte|evening|dusk|illuminat|lit up|夜", re.I)


def pick(key, skip=()):
    tried = []
    q = SEARCH[key]
    # ① 候補リスト → ② Commons の「品質の良い写真」から検索 → ③ ふつうの検索
    for kind in ("list", "cat", "quality", "search"):
        if kind == "list":
            titles = CANDIDATES[key]
        elif kind == "cat":
            if key not in CATS:
                continue
            titles = search(f'incategory:"{CATS[key]}"')
            titles = [t for t in titles if not NIGHT.search(t) and t not in EXCLUDE]
        else:
            titles = search(q + (" incategory:Quality_images" if kind == "quality" else ""))
            # 夜の写真は ライトアップに著作権があることがあるので 検索では選ばない
            titles = [t for t in titles if not NIGHT.search(t) and t not in EXCLUDE]
        titles = [t for t in titles if t not in skip]
        if not titles:
            continue
        # API は ABC順で返すので、候補リストの順に並べなおす
        order = {t.replace("_", " "): i for i, t in enumerate(titles)}
        pages = info(titles[:20])
        if kind == "list":
            pages = sorted(pages, key=lambda pg: order.get(pg.get("title", "")[5:], 99))
        else:
            # 品質・秀逸の印(Assessments)が付いた写真を 先に。つぎに 大きい写真
            def rank(pg):
                ii = (pg.get("imageinfo") or [{}])[0]
                meta = ii.get("extmetadata", {})
                return (0 if meta.get("Assessments") else 1, -(ii.get("width") or 0))
            pages = sorted(pages, key=rank)
        for page in pages:
            if page.get("missing") or "imageinfo" not in page:
                tried.append((page.get("title"), "ない"))
                continue
            ii = page["imageinfo"][0]
            if ii.get("mime") not in ("image/jpeg", "image/png"):
                continue
            meta = ii.get("extmetadata", {})
            short = plain(meta.get("LicenseShortName", {}).get("value"))
            lic = license_ja(short)
            if not lic:
                tried.append((page["title"], "ライセンス " + short))
                continue
            if (kind != "list" and not (ii["height"] * 1.2 <= ii["width"] <= ii["height"] * 2.2)) or ii["width"] < ii["height"] * 0.6 or ii["width"] > ii["height"] * 2.4 or ii["width"] <= 960 or "/thumb/" not in (ii.get("thumburl") or ""):  # 960px の縮小版が作れるものだけ
                tried.append((page["title"], "形・大きさ"))
                continue
            lic_url = plain(meta.get("LicenseUrl", {}).get("value"))
            if lic.startswith("パブリックドメイン"):
                # ⚠️ {{Licensed-PD}} は「写っている物(建物など)はパブリックドメイン、写真は別のライセンス」の意味。
                #    API は「Public domain」と返してしまう(エッフェル塔の写真がこれ)。写真のライセンスを読みなおす
                real = photo_license(page["title"])
                if real:
                    lic, lic_url = real
            author = plain(meta.get("Artist", {}).get("value")) or "不明"
            if len(author) > 60:
                author = author[:60] + "…"
            return {
                "title": page["title"],
                "thumb": ii.get("thumburl") or ii["url"],
                "author": author,
                "license": lic,
                "licenseUrl": lic_url,
                "page": ii["descriptionurl"],
            }
    raise SystemExit(f"{key}: 使える写真が見つかりません {tried}")


def download(url):
    return fetch(url, 120)


def save(js_path, photos):
    body = json.dumps(photos, ensure_ascii=False, indent=1)
    js_path.write_text(
        "/* 名所の写真（Wikimedia Commons）。tools/fetch_photos.py が作ったファイル。手で直してもよい */\n"
        f"const PHOTOS = {body};\n",
        encoding="utf-8",
    )


def main():
    redo = "--redo" in sys.argv  # いま入っている写真を すてて 取りなおす
    only = set(a for a in sys.argv[1:] if not a.startswith("--"))
    js_path = ROOT / "photos.js"
    photos = {}
    if js_path.exists():
        m = re.search(r"=\s*(\{.*\});", js_path.read_text(encoding="utf-8"), re.S)
        if m:
            photos = json.loads(m.group(1))
    for key in CANDIDATES:
        if only and key not in only:
            continue
        skip = set()
        if redo and key in photos:
            skip.add(photos[key]["file"][5:])
            EXCLUDE.add(photos[key]["file"][5:])
        p = img = None
        for _ in range(6):
            try:
                p = pick(key, skip)
            except SystemExit as e:  # 1か所 見つからなくても、ほかは続ける
                print(f"✗ {e}", file=sys.stderr)
                p = None
                break
            img = Image.open(io.BytesIO(download(p["thumb"]))).convert("RGB")
            # 暗すぎる写真(夜・夕方)は使わない。題名に「夜」と書いていない夜景も ここで はじく
            bright = sum(ImageStat.Stat(img.convert("L")).mean)
            # 白黒・セピアの古い写真も とばす(色の こさの平均が 小さい)
            satur = ImageStat.Stat(img.convert("HSV").getchannel("S")).mean[0]
            if bright >= 90 and satur >= 40:
                break
            print(f"  ...暗い/白黒の写真なので とばす(明るさ{bright:.0f} 色{satur:.0f}) {p['title']}", file=sys.stderr)
            skip.add(p["title"][5:])
            p = None
        if not p:
            continue
        if img.width > MAX_W:
            img = img.resize((MAX_W, round(img.height * MAX_W / img.width)), Image.LANCZOS)
        out = OUT_DIR / f"photo-{key}.jpg"
        img.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)  # EXIF は付けない
        photos[key] = {
            "src": f"photo-{key}.jpg",
            "author": p["author"],
            "license": p["license"],
            "licenseUrl": p["licenseUrl"],
            "page": p["page"],
            "file": p["title"],
        }
        save(js_path, photos)  # 1枚ごとに書く(とちゅうで止まっても むだにしない)
        time.sleep(1)  # Commons に やさしく
        print(f"{key:10s} {out.stat().st_size // 1024:4d}KB  {p['license']:24s} {p['author']}  ({p['title']})")



if __name__ == "__main__":
    main()
