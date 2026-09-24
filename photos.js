/* 名所の写真（Wikimedia Commons）。tools/fetch_photos.py が作ったファイル。手で直してもよい */
const PHOTOS = {
 "eiffel": {
  "src": "photo-eiffel.jpg",
  "author": "Benh LIEU SONG",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons_(cropped).jpg",
  "file": "File:Tour Eiffel Wikimedia Commons (cropped).jpg"
 },
 "liberty": {
  "src": "photo-liberty.jpg",
  "author": "Elcobbola",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Statue_of_Liberty_7.jpg",
  "file": "File:Statue of Liberty 7.jpg"
 },
 "pyramid": {
  "src": "photo-pyramid.jpg",
  "author": "Ricardo Liberato",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:All_Gizah_Pyramids.jpg",
  "file": "File:All Gizah Pyramids.jpg"
 },
 "wall": {
  "src": "photo-wall.jpg",
  "author": "Severin.stalder",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
  "file": "File:The Great Wall of China at Jinshanling-edit.jpg"
 },
 "taj": {
  "src": "photo-taj.jpg",
  "author": "Yann（編集：King of Hearts）",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit3.jpg",
  "file": "File:Taj Mahal, Agra, India edit3.jpg"
 },
 "fuji": {
  "src": "photo-fuji.jpg",
  "author": "名古屋太郎",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:080103_hakkai_fuji.jpg",
  "file": "File:080103 hakkai fuji.jpg"
 },
 "colosseum": {
  "src": "photo-colosseum.jpg",
  "author": "FeaturedPics",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg",
  "file": "File:Colosseo 2020.jpg"
 },
 "machu": {
  "src": "photo-machu.jpg",
  "author": "Pedro Szekely",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Machu_Picchu,_Peru.jpg",
  "file": "File:Machu Picchu, Peru.jpg"
 },
 "opera": {
  "src": "photo-opera.jpg",
  "author": "Bernard Spragg. NZ",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Sydney_Australia._(21339175489).jpg",
  "file": "File:Sydney Australia. (21339175489).jpg"
 },
 "bigben": {
  "src": "photo-bigben.jpg",
  "author": "Julian Herzog",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Big_Ben_Elizabeth_Tower_London_2023_01.jpg",
  "file": "File:Big Ben Elizabeth Tower London 2023 01.jpg"
 },
 "sagrada": {
  "src": "photo-sagrada.jpg",
  "author": "C messier",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg",
  "file": "File:Σαγράδα Φαμίλια 2941.jpg"
 },
 "angkor": {
  "src": "photo-angkor.jpg",
  "author": "Bjørn Christian Tørrissen",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Angkor_Wat.jpg",
  "file": "File:Angkor Wat.jpg"
 },
 "pisa": {
  "src": "photo-pisa.jpg",
  "author": "Saffron Blaze",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Leaning_Tower_of_Pisa_SB.jpeg",
  "file": "File:The Leaning Tower of Pisa SB.jpeg"
 },
 "arc": {
  "src": "photo-arc.jpg",
  "author": "Jiuguang Wang",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Arc_de_Triomphe,_Paris_21_October_2010.jpg",
  "file": "File:Arc de Triomphe, Paris 21 October 2010.jpg"
 },
 "moai": {
  "src": "photo-moai.jpg",
  "author": "Aurbina",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Moai_Rano_raraku.jpg",
  "file": "File:Moai Rano raraku.jpg"
 },
 "golden": {
  "src": "photo-golden.jpg",
  "author": "Rich Niewiroski Jr.",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:GoldenGateBridge-001.jpg",
  "file": "File:GoldenGateBridge-001.jpg"
 },
 "castle": {
  "src": "photo-castle.jpg",
  "author": "Thomas Wolf（www.foto-tw.de）",
  "license": "CC BY-SA 3.0 DE",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Schloss_Neuschwanstein_2013.jpg",
  "file": "File:Schloss Neuschwanstein 2013.jpg"
 },
 "basil": {
  "src": "photo-basil.jpg",
  "author": "Юрий Д.К.",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Moscow_-_2025_-_Daytime_view_of_St._Basil%27s_Cathedral_from_Vasilyevsky_Spusk.jpg",
  "file": "File:Moscow - 2025 - Daytime view of St. Basil's Cathedral from Vasilyevsky Spusk.jpg"
 },
 "stone": {
  "src": "photo-stone.jpg",
  "author": "garethwiscombe",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Stonehenge2007_07_30.jpg",
  "file": "File:Stonehenge2007 07 30.jpg"
 },
 "kinkaku": {
  "src": "photo-kinkaku.jpg",
  "author": "Jaycangel",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kinkaku-ji_the_Golden_Temple_in_Kyoto_overlooking_the_lake_-_high_rez.JPG",
  "file": "File:Kinkaku-ji the Golden Temple in Kyoto overlooking the lake - high rez.JPG"
 },
 "uluru": {
  "src": "photo-uluru.jpg",
  "author": "Corey Leopold",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Uluru,_helicopter_view,_cropped.jpg",
  "file": "File:Uluru, helicopter view, cropped.jpg"
 },
 "petra": {
  "src": "photo-petra.jpg",
  "author": "Graham Racher（切り抜き：MrPanyGoff）",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Treasury_petra_crop.jpeg",
  "file": "File:Treasury petra crop.jpeg"
 },
 "mtsaint": {
  "src": "photo-mtsaint.jpg",
  "author": "Lynx1211",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mont_St_Michel_at_sunrise.jpg",
  "file": "File:Mont St Michel at sunrise.jpg"
 },
 "versailles": {
  "src": "photo-versailles.jpg",
  "author": "Myrabella",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chateau_Versailles_Galerie_des_Glaces.jpg",
  "file": "File:Chateau Versailles Galerie des Glaces.jpg"
 },
 "notredame": {
  "src": "photo-notredame.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Paris,_Notre_Dame_--_2014_--_1477.jpg",
  "file": "File:Paris, Notre Dame -- 2014 -- 1477.jpg"
 },
 "peter": {
  "src": "photo-peter.jpg",
  "author": "Alvesgaspar",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg",
  "file": "File:Basilica di San Pietro in Vaticano September 2015-1a.jpg"
 },
 "venice": {
  "src": "photo-venice.jpg",
  "author": "Martin Falbisoner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Panorama_of_Canal_Grande_and_Ponte_di_Rialto,_Venice_-_September_2017.jpg",
  "file": "File:Panorama of Canal Grande and Ponte di Rialto, Venice - September 2017.jpg"
 },
 "florence": {
  "src": "photo-florence.jpg",
  "author": "Dllu",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Florence_Cathedral_seen_from_Piazzale_Michelangelo_dllu.jpg",
  "file": "File:Florence Cathedral seen from Piazzale Michelangelo dllu.jpg"
 },
 "pompeii": {
  "src": "photo-pompeii.jpg",
  "author": "Carsten Steger",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aerial_image_of_Pompeii_and_Mount_Vesuvius_(view_from_the_southeast).jpg",
  "file": "File:Aerial image of Pompeii and Mount Vesuvius (view from the southeast).jpg"
 },
 "parthenon": {
  "src": "photo-parthenon.jpg",
  "author": "A.Savin",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Attica_06-13_Athens_50_View_from_Philopappos_-_Acropolis_Hill.jpg",
  "file": "File:Attica 06-13 Athens 50 View from Philopappos - Acropolis Hill.jpg"
 },
 "santorini": {
  "src": "photo-santorini.jpg",
  "author": "Giles Laurent",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:1000_Three_domes_of_Oia_in_Santorini_Photo_by_Giles_Laurent.jpg",
  "file": "File:1000 Three domes of Oia in Santorini Photo by Giles Laurent.jpg"
 },
 "alhambra": {
  "src": "photo-alhambra.jpg",
  "author": "Jebulon",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Patio_de_los_Arrayanes_detail_Alhambra_Granada_Spain.jpg",
  "file": "File:Patio de los Arrayanes detail Alhambra Granada Spain.jpg"
 },
 "towerbridge": {
  "src": "photo-towerbridge.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:London,_Tower_Bridge_--_2016_--_4676.jpg",
  "file": "File:London, Tower Bridge -- 2016 -- 4676.jpg"
 },
 "edinburgh": {
  "src": "photo-edinburgh.jpg",
  "author": "Daniel Kraft",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Edinburgh_Castle_from_Esplanade_20211019.jpg",
  "file": "File:Edinburgh Castle from Esplanade 20211019.jpg"
 },
 "brandenburg": {
  "src": "photo-brandenburg.jpg",
  "author": "Thomas Wolf, www.foto-tw.de",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Brandenburger_Tor_morgens.jpg",
  "file": "File:Brandenburger Tor morgens.jpg"
 },
 "cologne": {
  "src": "photo-cologne.jpg",
  "author": "Elisabeth Schittenhelm",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Westfassade_des_K%C3%B6lner_Doms_mit_Richter-Fenster.jpg",
  "file": "File:Westfassade des Kölner Doms mit Richter-Fenster.jpg"
 },
 "charles": {
  "src": "photo-charles.jpg",
  "author": "DXR",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:North_view_of_Charles_Bridge_from_M%C3%A1nes%C5%AFv_most,_Prague_20160808_1.jpg",
  "file": "File:North view of Charles Bridge from Mánesův most, Prague 20160808 1.jpg"
 },
 "matterhorn": {
  "src": "photo-matterhorn.jpg",
  "author": "Liridon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Matterhorn,_March_2019_(01).jpg",
  "file": "File:Matterhorn, March 2019 (01).jpg"
 },
 "hagia": {
  "src": "photo-hagia.jpg",
  "author": "Arild Vågen",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hagia_Sophia_Mars_2013.jpg",
  "file": "File:Hagia Sophia Mars 2013.jpg"
 },
 "cappadocia": {
  "src": "photo-cappadocia.jpg",
  "author": "Brocken Inaglory",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:House_in_Cappadocia_22.jpg",
  "file": "File:House in Cappadocia 22.jpg"
 },
 "schonbrunn": {
  "src": "photo-schonbrunn.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Wien,_Schloss_Sch%C3%B6nbrunn_--_2018_--_3226.jpg",
  "file": "File:Wien, Schloss Schönbrunn -- 2018 -- 3226.jpg"
 },
 "kinderdijk": {
  "src": "photo-kinderdijk.jpg",
  "author": "Tarod",
  "license": "CC BY-SA 3.0 NL",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:The_windmills_of_Kinderdijk.JPG",
  "file": "File:The windmills of Kinderdijk.JPG"
 },
 "britishmuseum": {
  "src": "photo-britishmuseum.jpg",
  "author": "APK",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:British_Museum_from_Great_Russell_Street_with_sign.jpg",
  "file": "File:British Museum from Great Russell Street with sign.jpg"
 },
 "trevi": {
  "src": "photo-trevi.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fuente_de_Trevi,_Roma,_Italia,_2022-09-15,_DD_02.jpg",
  "file": "File:Fuente de Trevi, Roma, Italia, 2022-09-15, DD 02.jpg"
 },
 "kiyomizu": {
  "src": "photo-kiyomizu.jpg",
  "author": "Martin Falbisoner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-01.jpg",
  "file": "File:Kiyomizu-dera, Kyoto, November 2016 -01.jpg"
 },
 "itsukushima": {
  "src": "photo-itsukushima.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Itsukushima-jinja_torii_at_sunset,_Miyajima,_Japan,_20240816_1812_4144.jpg",
  "file": "File:Itsukushima-jinja torii at sunset, Miyajima, Japan, 20240816 1812 4144.jpg"
 },
 "himeji": {
  "src": "photo-himeji.jpg",
  "author": "Gorgo",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Himeji_Castle_0804_1.jpg",
  "file": "File:Himeji Castle 0804 1.jpg"
 },
 "todaiji": {
  "src": "photo-todaiji.jpg",
  "author": "Martin Falbisoner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Great_Buddha_Hall_of_T%C5%8Ddai-ji,_Nara,_November_2016.jpg",
  "file": "File:The Great Buddha Hall of Tōdai-ji, Nara, November 2016.jpg"
 },
 "nikko": {
  "src": "photo-nikko.jpg",
  "author": "Jpatokal",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nikko_Toshogu_Yomeimon_Gate_2024.jpg",
  "file": "File:Nikko Toshogu Yomeimon Gate 2024.jpg"
 },
 "skytree": {
  "src": "photo-skytree.jpg",
  "author": "Kakidai",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tokyo_Skytree_2014_%E2%85%A2.jpg",
  "file": "File:Tokyo Skytree 2014 Ⅲ.jpg"
 },
 "tokyotower": {
  "src": "photo-tokyotower.jpg",
  "author": "David Kernan",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Minato_City,_Tokyo,_Japan.jpg",
  "file": "File:Minato City, Tokyo, Japan.jpg"
 },
 "fushimi": {
  "src": "photo-fushimi.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg",
  "file": "File:Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg"
 },
 "shirakawa": {
  "src": "photo-shirakawa.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Ogi_Shirakawa-g%C5%8D,_Gifu,_Japan.jpg",
  "file": "File:Ogi Shirakawa-gō, Gifu, Japan.jpg"
 },
 "genbaku": {
  "src": "photo-genbaku.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hiroshima_Peace_Memorial_(Genbaku_Dome),_20240817_0823_4200.jpg",
  "file": "File:Hiroshima Peace Memorial (Genbaku Dome), 20240817 0823 4200.jpg"
 },
 "yakushima": {
  "src": "photo-yakushima.jpg",
  "author": "Σ64",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Jomon_Sugi_03.jpg",
  "file": "File:Jomon Sugi 03.jpg"
 },
 "forbidden": {
  "src": "photo-forbidden.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Beijing_China_Forbidden-City-03.jpg",
  "file": "File:Beijing China Forbidden-City-03.jpg"
 },
 "terracotta": {
  "src": "photo-terracotta.jpg",
  "author": "Gary Lee Todd, Ph.D.",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Qin_Terracotta_Army,_Pit_1_18.jpg",
  "file": "File:Qin Terracotta Army, Pit 1 18.jpg"
 },
 "potala": {
  "src": "photo-potala.jpg",
  "author": "Göran Höglund (Kartläsarn)",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tibet_-_Lhasa_-_Potala_Palace_-_6406925781.jpg",
  "file": "File:Tibet - Lhasa - Potala Palace - 6406925781.jpg"
 },
 "guilin": {
  "src": "photo-guilin.jpg",
  "author": "chensiyuan",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:1_li_jiang_guilin_yangshuo_2011.jpg",
  "file": "File:1 li jiang guilin yangshuo 2011.jpg"
 },
 "borobudur": {
  "src": "photo-borobudur.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Borobudur-Temple-Park_Indonesia_Stupas-of-Borobudur-12.jpg",
  "file": "File:Borobudur-Temple-Park Indonesia Stupas-of-Borobudur-12.jpg"
 },
 "halong": {
  "src": "photo-halong.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_of_sea_from_Titov_Island,_Ha_Long_Bay,_Vietnam,_20240128_1337_3732.jpg",
  "file": "File:View of sea from Titov Island, Ha Long Bay, Vietnam, 20240128 1337 3732.jpg"
 },
 "watarun": {
  "src": "photo-watarun.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Templo_Wat_Arun,_Bangkok,_Tailandia,_2013-08-22,_DD_30.jpg",
  "file": "File:Templo Wat Arun, Bangkok, Tailandia, 2013-08-22, DD 30.jpg"
 },
 "bagan": {
  "src": "photo-bagan.jpg",
  "author": "Vyacheslav Argenberg",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bagan,_Myanmar,_Htilominlo_Temple_and_other_Buddhist_stupas_in_Bagan_plain.jpg",
  "file": "File:Bagan, Myanmar, Htilominlo Temple and other Buddhist stupas in Bagan plain.jpg"
 },
 "everest": {
  "src": "photo-everest.jpg",
  "author": "Vyacheslav Argenberg",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Everest,_Himalayas.jpg",
  "file": "File:Everest, Himalayas.jpg"
 },
 "goldentemple": {
  "src": "photo-goldentemple.jpg",
  "author": "Oleg Yunakov",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hamandir_Sahib_(Golden_Temple).jpg",
  "file": "File:Hamandir Sahib (Golden Temple).jpg"
 },
 "shwedagon": {
  "src": "photo-shwedagon.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shwedagon_Zedi_Daw_Yangon_4.jpg",
  "file": "File:Shwedagon Zedi Daw Yangon 4.jpg"
 },
 "victoria": {
  "src": "photo-victoria.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cataratas_Victoria,_Zambia-Zimbabue,_2018-07-27,_DD_30-34_PAN.jpg",
  "file": "File:Cataratas Victoria, Zambia-Zimbabue, 2018-07-27, DD 30-34 PAN.jpg"
 },
 "kilimanjaro": {
  "src": "photo-kilimanjaro.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kilimanjaro,_Tanzania,_2024-05-22,_DD_110.jpg",
  "file": "File:Kilimanjaro, Tanzania, 2024-05-22, DD 110.jpg"
 },
 "sahara": {
  "src": "photo-sahara.jpg",
  "author": "Luca Galuzzi (Lucag)",
  "license": "CC BY-SA 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Libya_4985_Tadrart_Acacus_Luca_Galuzzi_2007.jpg",
  "file": "File:Libya 4985 Tadrart Acacus Luca Galuzzi 2007.jpg"
 },
 "tablemtn": {
  "src": "photo-tablemtn.jpg",
  "author": "South African Tourism from South Africa",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Table_Mountain_from_Blouberg,_South_Africa_(4028515275).jpg",
  "file": "File:Table Mountain from Blouberg, South Africa (4028515275).jpg"
 },
 "abusimbel": {
  "src": "photo-abusimbel.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Templo_de_Nefertari,_Abu_Simbel,_Egipto,_2022-04-02,_DD_153.jpg",
  "file": "File:Templo de Nefertari, Abu Simbel, Egipto, 2022-04-02, DD 153.jpg"
 },
 "sphinx": {
  "src": "photo-sphinx.jpg",
  "author": "Petar Milošević",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Great_Sphinx_(%D8%A3%D8%A8%D9%88_%D8%A7%D9%84%D9%87%D9%88%D9%84).jpg",
  "file": "File:Great Sphinx (أبو الهول).jpg"
 },
 "baobab": {
  "src": "photo-baobab.jpg",
  "author": "Pat Hooper from Chicago, IL, USA",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Adansonia_grandidieri_Pat_Hooper.jpg",
  "file": "File:Adansonia grandidieri Pat Hooper.jpg"
 },
 "grandcanyon": {
  "src": "photo-grandcanyon.jpg",
  "author": "Tuxyso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Grand_Canyon_Hopi_Point_with_rainbow_2013.jpg",
  "file": "File:Grand Canyon Hopi Point with rainbow 2013.jpg"
 },
 "niagara": {
  "src": "photo-niagara.jpg",
  "author": "DXR",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Maid_of_the_Mist_VII_approaching_the_Horseshoe_Falls,_West_view_20170418_1.jpg",
  "file": "File:Maid of the Mist VII approaching the Horseshoe Falls, West view 20170418 1.jpg"
 },
 "rushmore": {
  "src": "photo-rushmore.jpg",
  "author": "Thomas Wolf, www.foto-tw.de",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mount_Rushmore_detail_view.jpg",
  "file": "File:Mount Rushmore detail view.jpg"
 },
 "yellowstone": {
  "src": "photo-yellowstone.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yellowstone_National_Park_(WY,_USA),_Old_Faithful_Geyser_--_2022_--_2599.jpg",
  "file": "File:Yellowstone National Park (WY, USA), Old Faithful Geyser -- 2022 -- 2599.jpg"
 },
 "whitehouse": {
  "src": "photo-whitehouse.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_White_House,_Washington,_D.C._USA2.jpg",
  "file": "File:The White House, Washington, D.C. USA2.jpg"
 },
 "empire": {
  "src": "photo-empire.jpg",
  "author": "Dllu",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
  "file": "File:View of Empire State Building from Rockefeller Center New York City dllu.jpg"
 },
 "chichen": {
  "src": "photo-chichen.jpg",
  "author": "Daniel Schwen",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chichen_Itza_3.jpg",
  "file": "File:Chichen Itza 3.jpg"
 },
 "christ": {
  "src": "photo-christ.jpg",
  "author": "Donatas Dabravolskas",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Redentor_Over_Clouds_1.jpg",
  "file": "File:Redentor Over Clouds 1.jpg"
 },
 "iguazu": {
  "src": "photo-iguazu.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Iguaz%C3%BA_Falls_05.jpg",
  "file": "File:Iguazú Falls 05.jpg"
 },
 "uyuni": {
  "src": "photo-uyuni.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Salar_de_Uyuni,_Bolivia,_2016-02-04,_DD_16-18_HDR.JPG",
  "file": "File:Salar de Uyuni, Bolivia, 2016-02-04, DD 16-18 HDR.JPG"
 },
 "teotihuacan": {
  "src": "photo-teotihuacan.jpg",
  "author": "Daniel Case",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pyramid_of_the_Sun,_Teotihuacan,_from_path_to_parking_lot.jpg",
  "file": "File:Pyramid of the Sun, Teotihuacan, from path to parking lot.jpg"
 },
 "perito": {
  "src": "photo-perito.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Glaciar_Perito_Moreno5_-_Argentina.JPG",
  "file": "File:Glaciar Perito Moreno5 - Argentina.JPG"
 },
 "monument": {
  "src": "photo-monument.jpg",
  "author": "King of Hearts",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Forrest_Gump_Point_Monument_Valley_November_2018_001.jpg",
  "file": "File:Forrest Gump Point Monument Valley November 2018 001.jpg"
 },
 "angel": {
  "src": "photo-angel.jpg",
  "author": "Diego Delso",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Salto_del_Angel-Canaima-Venezuela18.JPG",
  "file": "File:Salto del Angel-Canaima-Venezuela18.JPG"
 },
 "reef": {
  "src": "photo-reef.jpg",
  "author": "Ank Kumar",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aerial_View_of_Great_Barrier_Reef_(Ank_Kumar)_05.jpg",
  "file": "File:Aerial View of Great Barrier Reef (Ank Kumar) 05.jpg"
 },
 "milford": {
  "src": "photo-milford.jpg",
  "author": "Krzysztof Golik",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Milford_Sound_in_Fiordland_National_Park_01.jpg",
  "file": "File:Milford Sound in Fiordland National Park 01.jpg"
 },
 "harbour": {
  "src": "photo-harbour.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sydney_Harbour_Bridge_01.jpg",
  "file": "File:Sydney Harbour Bridge 01.jpg"
 },
 "milan": {
  "src": "photo-milan.jpg",
  "author": "Daniel Case",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_west_along_Duomo_roof,_Milan.jpg",
  "file": "File:View west along Duomo roof, Milan.jpg"
 },
 "buckingham": {
  "src": "photo-buckingham.jpg",
  "author": "Diliff",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Buckingham_Palace,_London_-_April_2009.jpg",
  "file": "File:Buckingham Palace, London - April 2009.jpg"
 },
 "hallstatt": {
  "src": "photo-hallstatt.jpg",
  "author": "C.Stadler/Bwag",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hallstatt_-_Zentrum_.JPG",
  "file": "File:Hallstatt - Zentrum .JPG"
 },
 "bluemosque": {
  "src": "photo-bluemosque.jpg",
  "author": "Moonik",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Exterior_of_Sultan_Ahmed_I_Mosque_in_Istanbul,_Turkey_002.jpg",
  "file": "File:Exterior of Sultan Ahmed I Mosque in Istanbul, Turkey 002.jpg"
 },
 "diamondhead": {
  "src": "photo-diamondhead.jpg",
  "author": "Jackie Gleason",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Diamond_Head_from_Waikiki_Beach.jpg",
  "file": "File:Diamond Head from Waikiki Beach.jpg"
 },
 "londoneye": {
  "src": "photo-londoneye.jpg",
  "author": "Kim Hansen",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:London_eye_and_county_hall_pano_edited_2008-02-19.jpg",
  "file": "File:London eye and county hall pano edited 2008-02-19.jpg"
 },
 "westminster": {
  "src": "photo-westminster.jpg",
  "author": "Ozeye",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_West_front_of_Westminster_Abbey_and_Victoria_Tower.jpg",
  "file": "File:The West front of Westminster Abbey and Victoria Tower.jpg"
 },
 "budapest": {
  "src": "photo-budapest.jpg",
  "author": "Lynx1211",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Orsz%C3%A1gh%C3%A1z_(Hungarian_Parliament_Building)(1).jpg",
  "file": "File:Országház (Hungarian Parliament Building)(1).jpg"
 },
 "kamakura": {
  "src": "photo-kamakura.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kamakura-Japon00050.JPG",
  "file": "File:Kamakura-Japon00050.JPG"
 },
 "antelope": {
  "src": "photo-antelope.jpg",
  "author": "King of Hearts",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lower_Antelope_Canyon_November_2018_008.jpg",
  "file": "File:Lower Antelope Canyon November 2018 008.jpg"
 }
};
