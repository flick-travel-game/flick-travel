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
 },
 "shiretoko": {
  "src": "photo-shiretoko.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:140829_Ichiko_of_Shiretoko_Goko_Lakes_Hokkaido_Japan01s5.jpg",
  "file": "File:140829 Ichiko of Shiretoko Goko Lakes Hokkaido Japan01s5.jpg"
 },
 "goryokaku": {
  "src": "photo-goryokaku.jpg",
  "author": "lumoplank",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Hakodate_-_Hakodate944.jpg",
  "file": "File:Hakodate - Hakodate944.jpg"
 },
 "otaru": {
  "src": "photo-otaru.jpg",
  "author": "Markus Leupold-Löwenthal",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:OtaruCanalPromenade.jpg",
  "file": "File:OtaruCanalPromenade.jpg"
 },
 "furano": {
  "src": "photo-furano.jpg",
  "author": "Blondinrikard Fröberg from Göteborg, Sweden",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lavender_fields,_Furano_(48254611081).jpg",
  "file": "File:Lavender fields, Furano (48254611081).jpg"
 },
 "biei": {
  "src": "photo-biei.jpg",
  "author": "taku-k",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Patchwork_hills_-_biei_-_panoramio.jpg",
  "file": "File:Patchwork hills - biei - panoramio.jpg"
 },
 "hirosaki": {
  "src": "photo-hirosaki.jpg",
  "author": "MAKIKO OMOKAWA",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cherry_blossoms_in_Hirosaki_castle_park_-_panoramio.jpg",
  "file": "File:Cherry blossoms in Hirosaki castle park - panoramio.jpg"
 },
 "oirase": {
  "src": "photo-oirase.jpg",
  "author": "MaedaAkihiko",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Oirase-keiryu.jpg",
  "file": "File:Oirase-keiryu.jpg"
 },
 "towada": {
  "src": "photo-towada.jpg",
  "author": "Soica2001 (talk)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lake_Towada_from_Ohanabe_2008.jpg",
  "file": "File:Lake Towada from Ohanabe 2008.jpg"
 },
 "chusonji": {
  "src": "photo-chusonji.jpg",
  "author": "Higa4",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Konjikido_(Chusonji)_02.jpg",
  "file": "File:Konjikido (Chusonji) 02.jpg"
 },
 "matsushima": {
  "src": "photo-matsushima.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Ki-no-Matsushima_Nachikatsuura_Wakayama11bs4592.jpg",
  "file": "File:Ki-no-Matsushima Nachikatsuura Wakayama11bs4592.jpg"
 },
 "yamadera": {
  "src": "photo-yamadera.jpg",
  "author": "Cp9asngf",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Risshaku-ji_konponchudo.jpg",
  "file": "File:Risshaku-ji konponchudo.jpg"
 },
 "zao": {
  "src": "photo-zao.jpg",
  "author": "Suz-b",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mt.Zao(Mt.Jizo)_Juhyo.JPG",
  "file": "File:Mt.Zao(Mt.Jizo) Juhyo.JPG"
 },
 "ginzan": {
  "src": "photo-ginzan.jpg",
  "author": "掬茶",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Takimi-tei_in_Ginzan_Onsen_20181006.jpg",
  "file": "File:Takimi-tei in Ginzan Onsen 20181006.jpg"
 },
 "kakunodate": {
  "src": "photo-kakunodate.jpg",
  "author": "Kmhkmh",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kakunodate_488.jpg",
  "file": "File:Kakunodate 488.jpg"
 },
 "tsuruga": {
  "src": "photo-tsuruga.jpg",
  "author": "SQZ",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fukushima-Sakura_in_Tsuruga_Castle,_Aizuwakamatsu_City-m.jpg",
  "file": "File:Fukushima-Sakura in Tsuruga Castle, Aizuwakamatsu City-m.jpg"
 },
 "ouchijuku": {
  "src": "photo-ouchijuku.jpg",
  "author": "Bernie Ongewe",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:%C5%8Cuchi-juku.jpg",
  "file": "File:Ōuchi-juku.jpg"
 },
 "sensoji": {
  "src": "photo-sensoji.jpg",
  "author": "迷惘的人生",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%9D%B1%E4%BA%AC%E8%A1%97%E9%A0%AD_(52559672867).jpg",
  "file": "File:東京街頭 (52559672867).jpg"
 },
 "meiji": {
  "src": "photo-meiji.jpg",
  "author": "pohjolanpoluilla",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Meiji_Jingu_(24727530638).jpg",
  "file": "File:Meiji Jingu (24727530638).jpg"
 },
 "shibuya": {
  "src": "photo-shibuya.jpg",
  "author": "othree",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:LEGOLAND_Japan_-_53400776956.jpg",
  "file": "File:LEGOLAND Japan - 53400776956.jpg"
 },
 "tokyostation": {
  "src": "photo-tokyostation.jpg",
  "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Toyko_Railway_Station_(53374135388).jpg",
  "file": "File:Toyko Railway Station (53374135388).jpg"
 },
 "kokyo": {
  "src": "photo-kokyo.jpg",
  "author": "DXR",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Skyscrapers_in_Marunouchi,_Tokyo_20190420_1.jpg",
  "file": "File:Skyscrapers in Marunouchi, Tokyo 20190420 1.jpg"
 },
 "minatomirai": {
  "src": "photo-minatomirai.jpg",
  "author": "Matthide127",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:20250105_Minato_Mirai_21_(Landmark_Tower,_Queen%27s_Square_Yokohama,_Cosmo_Clock_21)_080219.jpg",
  "file": "File:20250105 Minato Mirai 21 (Landmark Tower, Queen's Square Yokohama, Cosmo Clock 21) 080219.jpg"
 },
 "enoshima": {
  "src": "photo-enoshima.jpg",
  "author": "Vitor Coelho Nisida from São Paulo, Brasil",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:-i---i-_(53016541512).jpg",
  "file": "File:-i---i- (53016541512).jpg"
 },
 "ashinoko": {
  "src": "photo-ashinoko.jpg",
  "author": "Kentagon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:LakeAshi_and_MtFuji_Hakone.JPG",
  "file": "File:LakeAshi and MtFuji Hakone.JPG"
 },
 "kegon": {
  "src": "photo-kegon.jpg",
  "author": "Raita Futo from Tokyo, Japan",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kegon_Falls_(51988366954).jpg",
  "file": "File:Kegon Falls (51988366954).jpg"
 },
 "kusatsu": {
  "src": "photo-kusatsu.jpg",
  "author": "Suicasmo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kusatsu_yubatake_20170324-2.jpg",
  "file": "File:Kusatsu yubatake 20170324-2.jpg"
 },
 "fukuroda": {
  "src": "photo-fukuroda.jpg",
  "author": "TANAKA Juuyoh (田中十洋)",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fukuroda_Falls_-_%E8%A2%8B%E7%94%B0%E3%81%AE%E6%BB%9D(%E3%81%B5%E3%81%8F%E3%82%8D%E3%81%A0%E3%81%AE%E3%81%9F%E3%81%8D).jpg",
  "file": "File:Fukuroda Falls - 袋田の滝(ふくろだのたき).jpg"
 },
 "matsumoto": {
  "src": "photo-matsumoto.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Matsumoto_Castle05s5s4592.jpg",
  "file": "File:Matsumoto Castle05s5s4592.jpg"
 },
 "zenkoji": {
  "src": "photo-zenkoji.jpg",
  "author": "日:Jnn",
  "license": "CC BY 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Zenkouji7835.jpg",
  "file": "File:Zenkouji7835.jpg"
 },
 "kamikochi": {
  "src": "photo-kamikochi.jpg",
  "author": "Tmv",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_from_Kappabashi_Bridge_in_Kamikochi_1.jpg",
  "file": "File:View from Kappabashi Bridge in Kamikochi 1.jpg"
 },
 "yukinootani": {
  "src": "photo-yukinootani.jpg",
  "author": "Alpsdake",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tateyama_Toll_Road_and_Yuki-no-otani.jpg",
  "file": "File:Tateyama Toll Road and Yuki-no-otani.jpg"
 },
 "kurobe": {
  "src": "photo-kurobe.jpg",
  "author": "elminium",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kurobe_dam_with_onlookers.jpg",
  "file": "File:Kurobe dam with onlookers.jpg"
 },
 "kenrokuen": {
  "src": "photo-kenrokuen.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:131109_Kenrokuen_Kanazawa_Ishikawa_pref_Japan01s3.jpg",
  "file": "File:131109 Kenrokuen Kanazawa Ishikawa pref Japan01s3.jpg"
 },
 "senmaida": {
  "src": "photo-senmaida.jpg",
  "author": "Totti",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shiroyone_Senmaida_200906.jpg",
  "file": "File:Shiroyone Senmaida 200906.jpg"
 },
 "tojinbo": {
  "src": "photo-tojinbo.jpg",
  "author": "雷太",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tojinbo_cliffs,_Fukui_Prefecture;_September_2019_(01).jpg",
  "file": "File:Tojinbo cliffs, Fukui Prefecture; September 2019 (01).jpg"
 },
 "miho": {
  "src": "photo-miho.jpg",
  "author": "Motokoka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Miho_no_Matsubara_14.jpg",
  "file": "File:Miho no Matsubara 14.jpg"
 },
 "kawaguchiko": {
  "src": "photo-kawaguchiko.jpg",
  "author": "DimiTalen",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Kawaguchiko_rowing_center_jetties_on_Lake_Kawaguchi,_with_Mount_Setto_in_the_background,_Fujikawaguchiko,_2016.jpg",
  "file": "File:Kawaguchiko rowing center jetties on Lake Kawaguchi, with Mount Setto in the background, Fujikawaguchiko, 2016.jpg"
 },
 "nagoyajo": {
  "src": "photo-nagoyajo.jpg",
  "author": "Base64",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nagoya_Castle(Larger).jpg",
  "file": "File:Nagoya Castle(Larger).jpg"
 },
 "inuyama": {
  "src": "photo-inuyama.jpg",
  "author": "ThorstenS",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Castle_in_Inuyama.JPG",
  "file": "File:Castle in Inuyama.JPG"
 },
 "takayama": {
  "src": "photo-takayama.jpg",
  "author": "Raita Futo from Tokyo, Japan",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hida_Takayama_old_town_streets_(48519369602).jpg",
  "file": "File:Hida Takayama old town streets (48519369602).jpg"
 },
 "ise": {
  "src": "photo-ise.jpg",
  "author": "Zairon",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ise_Ise-jingu_Ujibashi_Bridge_1.jpg",
  "file": "File:Ise Ise-jingu Ujibashi Bridge 1.jpg"
 },
 "osakajo": {
  "src": "photo-osakajo.jpg",
  "author": "Martin Falbisoner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Osaka_Castle_Outer_Moat_and_Osaka_Business_Park,_November_2016.jpg",
  "file": "File:Osaka Castle Outer Moat and Osaka Business Park, November 2016.jpg"
 },
 "dotonbori": {
  "src": "photo-dotonbori.jpg",
  "author": "32linesky",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Osaka_Dotonbori_Canal.jpg",
  "file": "File:Osaka Dotonbori Canal.jpg"
 },
 "tsutenkaku": {
  "src": "photo-tsutenkaku.jpg",
  "author": "そらみみ",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tsutenkaku-Hondori_Shopping_Street_and_Tsutenkaku_Tower_4.jpg",
  "file": "File:Tsutenkaku-Hondori Shopping Street and Tsutenkaku Tower 4.jpg"
 },
 "byodoin": {
  "src": "photo-byodoin.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Byodoin_Phoenix_Hall_Uji_2009.jpg",
  "file": "File:Byodoin Phoenix Hall Uji 2009.jpg"
 },
 "horyuji": {
  "src": "photo-horyuji.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Horyu-ji46n3990.jpg",
  "file": "File:Horyu-ji46n3990.jpg"
 },
 "kasuga": {
  "src": "photo-kasuga.jpg",
  "author": "Akiotoi",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nara_city,_Kasuga-taisha_Shrine.jpg",
  "file": "File:Nara city, Kasuga-taisha Shrine.jpg"
 },
 "nijo": {
  "src": "photo-nijo.jpg",
  "author": "DXR",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Building_of_Honmaru_Palace,_Nij%C5%8D_Castle,_Kyoto_as_seen_from_Fortification_130811_1.jpg",
  "file": "File:Building of Honmaru Palace, Nijō Castle, Kyoto as seen from Fortification 130811 1.jpg"
 },
 "ginkaku": {
  "src": "photo-ginkaku.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sunlight_through_clouds_and_view_of_Ginkaku-ji_Temple_from_above,_Kyoto,_Japan.jpg",
  "file": "File:Sunlight through clouds and view of Ginkaku-ji Temple from above, Kyoto, Japan.jpg"
 },
 "arashiyama": {
  "src": "photo-arashiyama.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bamboo_Forest,_Arashiyama,_Kyoto,_Japan.jpg",
  "file": "File:Bamboo Forest, Arashiyama, Kyoto, Japan.jpg"
 },
 "amanohashidate": {
  "src": "photo-amanohashidate.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Amanohashidate_view_from_Kasamatsu_Park01s3s4410.jpg",
  "file": "File:Amanohashidate view from Kasamatsu Park01s3s4410.jpg"
 },
 "koyasan": {
  "src": "photo-koyasan.jpg",
  "author": "Hyppolyte de Saint-Rambert",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Danj%C3%B4-garan_(Wakayama_K%C5%8Dyasan)_Temple_hdsr_S5_ai05.jpg",
  "file": "File:Danjô-garan (Wakayama Kōyasan) Temple hdsr S5 ai05.jpg"
 },
 "nachi": {
  "src": "photo-nachi.jpg",
  "author": "Zairon",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nachikatsuura_Seiganto-ji_Three-Storied_Pagoda_%26_Nachi_Falls_03.jpg",
  "file": "File:Nachikatsuura Seiganto-ji Three-Storied Pagoda & Nachi Falls 03.jpg"
 },
 "hikone": {
  "src": "photo-hikone.jpg",
  "author": "日:Jnn",
  "license": "CC BY 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Hikone_castle5537.JPG",
  "file": "File:Hikone castle5537.JPG"
 },
 "yoshino": {
  "src": "photo-yoshino.jpg",
  "author": "Luka Peternel",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yoshino-yama-cherry-blossom-2018-Luka-Peternel.jpg",
  "file": "File:Yoshino-yama-cherry-blossom-2018-Luka-Peternel.jpg"
 },
 "takeda": {
  "src": "photo-takeda.jpg",
  "author": "前田左衛門佐",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E8%BA%91%E8%BA%85%E3%83%B6%E5%B4%8E%E9%A4%A8.jpg",
  "file": "File:躑躅ヶ崎館.jpg"
 },
 "akashi": {
  "src": "photo-akashi.jpg",
  "author": "Tysto",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Akashi_Bridge.JPG",
  "file": "File:Akashi Bridge.JPG"
 },
 "izumo": {
  "src": "photo-izumo.jpg",
  "author": "the.Firebottle",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kaguraden_Shimenawa,_Izumo_Shrine_-_May_8,_2013.jpg",
  "file": "File:Kaguraden Shimenawa, Izumo Shrine - May 8, 2013.jpg"
 },
 "tottori": {
  "src": "photo-tottori.jpg",
  "author": "Hashi photo",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tottori-Sakyu_Tottori_Japan.JPG",
  "file": "File:Tottori-Sakyu Tottori Japan.JPG"
 },
 "matsue": {
  "src": "photo-matsue.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Matsue_castle01bs4592.jpg",
  "file": "File:Matsue castle01bs4592.jpg"
 },
 "korakuen": {
  "src": "photo-korakuen.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Korakuen_Okayama26s3872.jpg",
  "file": "File:Korakuen Okayama26s3872.jpg"
 },
 "kurashiki": {
  "src": "photo-kurashiki.jpg",
  "author": "lienyuan lee",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kurashiki_Canal_%E5%80%89%E6%95%B7%E5%B7%9D_-_panoramio.jpg",
  "file": "File:Kurashiki Canal 倉敷川 - panoramio.jpg"
 },
 "kintaikyo": {
  "src": "photo-kintaikyo.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:20100724_Iwakuni_5235.jpg",
  "file": "File:20100724 Iwakuni 5235.jpg"
 },
 "akiyoshidai": {
  "src": "photo-akiyoshidai.jpg",
  "author": "Motokoka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_of_Karst_landscape_at_Akiyoshidai_1.jpg",
  "file": "File:View of Karst landscape at Akiyoshidai 1.jpg"
 },
 "motonosumi": {
  "src": "photo-motonosumi.jpg",
  "author": "Zairon",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nagato_Motonosumi-Inari-jinja_Grand_Torii_1.jpg",
  "file": "File:Nagato Motonosumi-Inari-jinja Grand Torii 1.jpg"
 },
 "tsunoshima": {
  "src": "photo-tsunoshima.jpg",
  "author": "k56flex",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:%E8%A7%92%E5%B3%B6%E5%A4%A7%E6%A9%8B_Tsunoshima_Bridge_-_panoramio.jpg",
  "file": "File:角島大橋 Tsunoshima Bridge - panoramio.jpg"
 },
 "dogo": {
  "src": "photo-dogo.jpg",
  "author": "z tanuki",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dogo_Onsen_Honkan_(Main_building),_%E9%81%93%E5%BE%8C%E6%B8%A9%E6%B3%89_%E6%9C%AC%E9%A4%A8_-_panoramio_(7).jpg",
  "file": "File:Dogo Onsen Honkan (Main building), 道後温泉 本館 - panoramio (7).jpg"
 },
 "matsuyama": {
  "src": "photo-matsuyama.jpg",
  "author": "Suicasmo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Matsuyama_Castle_Keep_Tower_20170123-1.jpg",
  "file": "File:Matsuyama Castle Keep Tower 20170123-1.jpg"
 },
 "kotohira": {
  "src": "photo-kotohira.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Kotohira-gu45n4592.jpg",
  "file": "File:Kotohira-gu45n4592.jpg"
 },
 "naruto": {
  "src": "photo-naruto.jpg",
  "author": "Hellbuny",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Naruto_Whirlpools_taken_4-21-2008.jpg",
  "file": "File:Naruto Whirlpools taken 4-21-2008.jpg"
 },
 "katsurahama": {
  "src": "photo-katsurahama.jpg",
  "author": "京浜にけ",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kochi_Katsurahama_Daytime_1.JPG",
  "file": "File:Kochi Katsurahama Daytime 1.JPG"
 },
 "shimanto": {
  "src": "photo-shimanto.jpg",
  "author": "四万十人",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shimanto_sada_chinkabashi_fukin.jpg",
  "file": "File:Shimanto sada chinkabashi fukin.jpg"
 },
 "kazurabashi": {
  "src": "photo-kazurabashi.jpg",
  "author": "Motokoka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Iya_waddle_bridge(Kazurabashi)_02.jpg",
  "file": "File:Iya waddle bridge(Kazurabashi) 02.jpg"
 },
 "dazaifu": {
  "src": "photo-dazaifu.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:20100719_Dazaifu_Tenmangu_Shrine_3328.jpg",
  "file": "File:20100719 Dazaifu Tenmangu Shrine 3328.jpg"
 },
 "gunkanjima": {
  "src": "photo-gunkanjima.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hashima,_Nagasaki,_Japan,_20240814_1421_3378.jpg",
  "file": "File:Hashima, Nagasaki, Japan, 20240814 1421 3378.jpg"
 },
 "glover": {
  "src": "photo-glover.jpg",
  "author": "Fg2",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Nagasaki-Glover-Garden-5415.jpg",
  "file": "File:Nagasaki-Glover-Garden-5415.jpg"
 },
 "nagasakipeace": {
  "src": "photo-nagasakipeace.jpg",
  "author": "Masoud Akbari",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mother_and_child_statue_in_atomic_bomb_hypocenter_-_panoramio.jpg",
  "file": "File:Mother and child statue in atomic bomb hypocenter - panoramio.jpg"
 },
 "kumamotojo": {
  "src": "photo-kumamotojo.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Kumamoto_Castle_02n3200.jpg",
  "file": "File:Kumamoto Castle 02n3200.jpg"
 },
 "aso": {
  "src": "photo-aso.jpg",
  "author": "Lawsonstu",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Mount_Nakadake,_Aso-san.jpg",
  "file": "File:Mount Nakadake, Aso-san.jpg"
 },
 "beppu": {
  "src": "photo-beppu.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Beppu_Umi-jigoku04n4272.jpg",
  "file": "File:Beppu Umi-jigoku04n4272.jpg"
 },
 "yufuin": {
  "src": "photo-yufuin.jpg",
  "author": "HyunJae Park",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lake_Kinrin_in_Yufuin,_Oita_-_Aug_24,_2018_(1).jpg",
  "file": "File:Lake Kinrin in Yufuin, Oita - Aug 24, 2018 (1).jpg"
 },
 "takachiho": {
  "src": "photo-takachiho.jpg",
  "author": "Kzaral",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Takachiho_Gorge,_Takachiho_(9584453595).jpg",
  "file": "File:Takachiho Gorge, Takachiho (9584453595).jpg"
 },
 "sakurajima": {
  "src": "photo-sakurajima.jpg",
  "author": "KimonBerlin",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:From_the_Ibusuki_skyline_parkway_(4516796058).jpg",
  "file": "File:From the Ibusuki skyline parkway (4516796058).jpg"
 },
 "shuri": {
  "src": "photo-shuri.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Naha_Shuri_Castle50s3s4500.jpg",
  "file": "File:Naha Shuri Castle50s3s4500.jpg"
 },
 "taketomi": {
  "src": "photo-taketomi.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Hoshizuna-no-hama_Iriomote_Island02bs3s4500.jpg",
  "file": "File:Hoshizuna-no-hama Iriomote Island02bs3s4500.jpg"
 },
 "kabira": {
  "src": "photo-kabira.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Kabira_Bay_Ishigaki_Island40bs3s4592.jpg",
  "file": "File:Kabira Bay Ishigaki Island40bs3s4592.jpg"
 },
 "chambord": {
  "src": "photo-chambord.jpg",
  "author": "Daniel Jolivet",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chambord_(Loir-et-Cher)_(20492698948).jpg",
  "file": "File:Chambord (Loir-et-Cher) (20492698948).jpg"
 },
 "carcassonne": {
  "src": "photo-carcassonne.jpg",
  "author": "H2k4",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Carcassonne,_cit%C3%A9_walls_towers.JPG",
  "file": "File:Carcassonne, cité walls towers.JPG"
 },
 "etretat": {
  "src": "photo-etretat.jpg",
  "author": "Jörg Braukmann",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Regardant_par_la_Manneporte.jpg",
  "file": "File:Regardant par la Manneporte.jpg"
 },
 "nice": {
  "src": "photo-nice.jpg",
  "author": "Johann Jaritz",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Velden_Seecorso_Promenade_03042019_6314.jpg",
  "file": "File:Velden Seecorso Promenade 03042019 6314.jpg"
 },
 "strasbourg": {
  "src": "photo-strasbourg.jpg",
  "author": "Diliff",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Strasbourg_Cathedral_Exterior_-_Diliff.jpg",
  "file": "File:Strasbourg Cathedral Exterior - Diliff.jpg"
 },
 "amalfi": {
  "src": "photo-amalfi.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Positano_(Italy)_02.jpg",
  "file": "File:Positano (Italy) 02.jpg"
 },
 "cinqueterre": {
  "src": "photo-cinqueterre.jpg",
  "author": "This Photo was taken by Timothy A. Gonsalves. Feel free to u…",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Manarola_NW_Cinque_Terre_Sep23_A7C_07233.jpg",
  "file": "File:Manarola NW Cinque Terre Sep23 A7C 07233.jpg"
 },
 "pantheon": {
  "src": "photo-pantheon.jpg",
  "author": "Krzysztof Golik",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pantheon_in_Rome_(1).jpg",
  "file": "File:Pantheon in Rome (1).jpg"
 },
 "spanishsteps": {
  "src": "photo-spanishsteps.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Escalinata_de_la_plaza_de_Espa%C3%B1a,_Roma,_Italia,_2022-09-14,_DD_20.jpg",
  "file": "File:Escalinata de la plaza de España, Roma, Italia, 2022-09-14, DD 20.jpg"
 },
 "dolomites": {
  "src": "photo-dolomites.jpg",
  "author": "This Photo was taken by Wolfgang Moroder. Feel free to use m…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Drei_Zinnen_Tre_Cime_di_Lavaredo_Dolomites.jpg",
  "file": "File:Drei Zinnen Tre Cime di Lavaredo Dolomites.jpg"
 },
 "jungfrau": {
  "src": "photo-jungfrau.jpg",
  "author": "NOTE: This image is a panorama of Jungfraujoch Sphinx-Observ…",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:CH.BE.Grindelwald_2021-04-20_Jungfraujoch_Sphinx-Observatory.jpg",
  "file": "File:CH.BE.Grindelwald 2021-04-20 Jungfraujoch Sphinx-Observatory.jpg"
 },
 "lucerne": {
  "src": "photo-lucerne.jpg",
  "author": "Godot13",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chapel_Bridge_(Kapellbr%C3%BCcke),_Lucerne,_Switzerland_02.jpg",
  "file": "File:Chapel Bridge (Kapellbrücke), Lucerne, Switzerland 02.jpg"
 },
 "montblanc": {
  "src": "photo-montblanc.jpg",
  "author": "Ximonic, Simo Räsänen",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Glacier_du_Mont_Mallet_(Glacier_du_G%C3%A9ant)_%26_Mont_Blanc,_2010_July.jpg",
  "file": "File:Glacier du Mont Mallet (Glacier du Géant) & Mont Blanc, 2010 July.jpg"
 },
 "rothenburg": {
  "src": "photo-rothenburg.jpg",
  "author": "Berthold Werner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rothenburg_ob_der_Tauber_BW_2008-07-01_16-39-18.jpg",
  "file": "File:Rothenburg ob der Tauber BW 2008-07-01 16-39-18.jpg"
 },
 "heidelberg": {
  "src": "photo-heidelberg.jpg",
  "author": "Jörg Braukmann",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:K%C3%B6nigstuhl,_Heidelberg,_U-17.jpg",
  "file": "File:Königstuhl, Heidelberg, U-17.jpg"
 },
 "dresden": {
  "src": "photo-dresden.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dresden,_Frauenkirche_--_2023_--_9387.jpg",
  "file": "File:Dresden, Frauenkirche -- 2023 -- 9387.jpg"
 },
 "berlinwall": {
  "src": "photo-berlinwall.jpg",
  "author": "Einaz80",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Berlin_Wall_Bernauer_Strasse.jpg",
  "file": "File:Berlin Wall Bernauer Strasse.jpg"
 },
 "windsor": {
  "src": "photo-windsor.jpg",
  "author": "Diliff",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Windsor_Castle_Upper_Ward_Quadrangle_2_-_Nov_2006.jpg",
  "file": "File:Windsor Castle Upper Ward Quadrangle 2 - Nov 2006.jpg"
 },
 "cotswolds": {
  "src": "photo-cotswolds.jpg",
  "author": "Saffron Blaze",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Arlington_Row_Bibury.jpg",
  "file": "File:Arlington Row Bibury.jpg"
 },
 "sevensisters": {
  "src": "photo-sevensisters.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Seven_Sisters_9.jpg",
  "file": "File:Seven Sisters 9.jpg"
 },
 "lakedistrict": {
  "src": "photo-lakedistrict.jpg",
  "author": "mattbuck (category)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lake_Windermere_MMB_56.jpg",
  "file": "File:Lake Windermere MMB 56.jpg"
 },
 "giantscauseway": {
  "src": "photo-giantscauseway.jpg",
  "author": "Chmee2",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Giant%27s_Causeway_(14).JPG",
  "file": "File:Giant's Causeway (14).JPG"
 },
 "moher": {
  "src": "photo-moher.jpg",
  "author": "Berthold Werner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ireland_Cliffs_of_Moher_BW_2025-09-11_14-27-51.jpg",
  "file": "File:Ireland Cliffs of Moher BW 2025-09-11 14-27-51.jpg"
 },
 "lochness": {
  "src": "photo-lochness.jpg",
  "author": "Eusebius",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Loch_Ness_and_Urquhart_castle.jpg",
  "file": "File:The Loch Ness and Urquhart castle.jpg"
 },
 "warsaw": {
  "src": "photo-warsaw.jpg",
  "author": "Igor123121",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Old_Town_Market_Square,_..2026,_Warsaw,_Poland.jpg",
  "file": "File:Old Town Market Square, ..2026, Warsaw, Poland.jpg"
 },
 "krakow": {
  "src": "photo-krakow.jpg",
  "author": "Igor123121",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Krak%C3%B3w_Cloth_Hall,_Caf%C3%A9_Noworolski,_3_Main_Market_square,_Old_Town,_Krak%C3%B3w,_Poland.jpg",
  "file": "File:Kraków Cloth Hall, Café Noworolski, 3 Main Market square, Old Town, Kraków, Poland.jpg"
 },
 "meteora": {
  "src": "photo-meteora.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Roussanou_Monastery,_Meteora.jpg",
  "file": "File:Roussanou Monastery, Meteora.jpg"
 },
 "mykonos": {
  "src": "photo-mykonos.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Windmills_in_Mykonos_02.jpg",
  "file": "File:Windmills in Mykonos 02.jpg"
 },
 "ephesus": {
  "src": "photo-ephesus.jpg",
  "author": "Benh LIEU SONG",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ephesus_Celsus_Library_Fa%C3%A7ade.jpg",
  "file": "File:Ephesus Celsus Library Façade.jpg"
 },
 "pamukkale": {
  "src": "photo-pamukkale.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pamukkale_01.jpg",
  "file": "File:Pamukkale 01.jpg"
 },
 "kremlin": {
  "src": "photo-kremlin.jpg",
  "author": "Perituss",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Moscow_2026-07-17_008.jpg",
  "file": "File:Moscow 2026-07-17 008.jpg"
 },
 "hermitage": {
  "src": "photo-hermitage.jpg",
  "author": "Александр Байдуков",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_ensemble_of_the_Winter_Palace_and_the_Hermitage._Winter_Groove.jpg",
  "file": "File:The ensemble of the Winter Palace and the Hermitage. Winter Groove.jpg"
 },
 "helsinki": {
  "src": "photo-helsinki.jpg",
  "author": "Alvesgaspar",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Helsinki_July_2013-27a.jpg",
  "file": "File:Helsinki July 2013-27a.jpg"
 },
 "tallinn": {
  "src": "photo-tallinn.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Vistas_panor%C3%A1micas_desde_Toompea,_Tallinn,_Estonia,_2012-08-05,_DD_16.JPG",
  "file": "File:Vistas panorámicas desde Toompea, Tallinn, Estonia, 2012-08-05, DD 16.JPG"
 },
 "nyhavn": {
  "src": "photo-nyhavn.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nyhavn,_Copenhagen,_20220618_1728_7354.jpg",
  "file": "File:Nyhavn, Copenhagen, 20220618 1728 7354.jpg"
 },
 "gamlastan": {
  "src": "photo-gamlastan.jpg",
  "author": "Julian Herzog (Website)",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Skeppsbrokajen_Gamla_Stan_from_Skeppsholmen_Stockholm_2016_01.jpg",
  "file": "File:Skeppsbrokajen Gamla Stan from Skeppsholmen Stockholm 2016 01.jpg"
 },
 "geiranger": {
  "src": "photo-geiranger.jpg",
  "author": "Ximonic (Simo Räsänen)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Geirangerfjord_from_%C3%98rnesvingen,_2013_June.jpg",
  "file": "File:Geirangerfjord from Ørnesvingen, 2013 June.jpg"
 },
 "preikestolen": {
  "src": "photo-preikestolen.jpg",
  "author": "Maarten Heerlien from Voorschoten, The Netherlands",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Preikestolen_3_(52606536284).jpg",
  "file": "File:Preikestolen 3 (52606536284).jpg"
 },
 "bluelagoon": {
  "src": "photo-bluelagoon.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blue_Lagoon_with_%C3%9Eorbj%C3%B6rn,_Iceland,_20230430_1626_3692.jpg",
  "file": "File:Blue Lagoon with Þorbjörn, Iceland, 20230430 1626 3692.jpg"
 },
 "gullfoss": {
  "src": "photo-gullfoss.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gullfoss,_Su%C3%B0urland,_Islandia,_2014-08-16,_DD_119.JPG",
  "file": "File:Gullfoss, Suðurland, Islandia, 2014-08-16, DD 119.JPG"
 },
 "dubrovnik": {
  "src": "photo-dubrovnik.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dubrovnik_Old_Town_1.jpg",
  "file": "File:Dubrovnik Old Town 1.jpg"
 },
 "plitvice": {
  "src": "photo-plitvice.jpg",
  "author": "Berthold Werner",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Plitvice_Lakes_National_Park_BW_2014-10-13_13-29-14.jpg",
  "file": "File:Plitvice Lakes National Park BW 2014-10-13 13-29-14.jpg"
 },
 "brussels": {
  "src": "photo-brussels.jpg",
  "author": "Celuici",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Grand-Place,_Brussels_-_panorama,_June_2018.jpg",
  "file": "File:Grand-Place, Brussels - panorama, June 2018.jpg"
 },
 "bruges": {
  "src": "photo-bruges.jpg",
  "author": "Marc Ryckaert (MJJR)",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Brugge_Rozenhoedkaai_Winter_R03.jpg",
  "file": "File:Brugge Rozenhoedkaai Winter R03.jpg"
 },
 "amsterdam": {
  "src": "photo-amsterdam.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Colorful_canal_houses_at_golden_hour_in_Damrak_avenue_Amsterdam_the_Netherlands.jpg",
  "file": "File:Colorful canal houses at golden hour in Damrak avenue Amsterdam the Netherlands.jpg"
 },
 "keukenhof": {
  "src": "photo-keukenhof.jpg",
  "author": "Atamari",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Keukenhof_2018_DSC_0059.jpg",
  "file": "File:Keukenhof 2018 DSC 0059.jpg"
 },
 "pena": {
  "src": "photo-pena.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sintra_Portugal_Pal%C3%A1cio_da_Pena-01.jpg",
  "file": "File:Sintra Portugal Palácio da Pena-01.jpg"
 },
 "belem": {
  "src": "photo-belem.jpg",
  "author": "Berthold Werner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lisbon_Torre_de_Bel%C3%A9m_BW_2018-10-03_16-34-03.jpg",
  "file": "File:Lisbon Torre de Belém BW 2018-10-03 16-34-03.jpg"
 },
 "porto": {
  "src": "photo-porto.jpg",
  "author": "Krzysztof Golik",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ribeira_from_Dom_Luis_I_bridge_(4).jpg",
  "file": "File:Ribeira from Dom Luis I bridge (4).jpg"
 },
 "seville": {
  "src": "photo-seville.jpg",
  "author": "Harmonia Amanda",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cathedral_sevilla_exterior_05.JPG",
  "file": "File:Cathedral sevilla exterior 05.JPG"
 },
 "toledo": {
  "src": "photo-toledo.jpg",
  "author": "Misburg3014",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Toledo_cyl-panorama-mirador.jpg",
  "file": "File:Toledo cyl-panorama-mirador.jpg"
 },
 "guell": {
  "src": "photo-guell.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Park_G%C3%BCell_02.jpg",
  "file": "File:Park Güell 02.jpg"
 },
 "santiago": {
  "src": "photo-santiago.jpg",
  "author": "Luis Miguel Bugallo Sánchez",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:2010-Catedral_de_Santiago_de_Compostela-Galicia_(Spain)_3.jpg",
  "file": "File:2010-Catedral de Santiago de Compostela-Galicia (Spain) 3.jpg"
 },
 "valletta": {
  "src": "photo-valletta.jpg",
  "author": "Rhododendrites",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Saint_Christopher_Street_in_Valletta_(32711).jpg",
  "file": "File:Saint Christopher Street in Valletta (32711).jpg"
 },
 "monaco": {
  "src": "photo-monaco.jpg",
  "author": "Tobi 87",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hafen_und_Felsen_von_Monaco-La_Turbie.jpg",
  "file": "File:Hafen und Felsen von Monaco-La Turbie.jpg"
 },
 "praguecastle": {
  "src": "photo-praguecastle.jpg",
  "author": "Mgimelfarb",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Prague_Castle_from_Alsovo_nabrezi.jpg",
  "file": "File:Prague Castle from Alsovo nabrezi.jpg"
 },
 "stephansdom": {
  "src": "photo-stephansdom.jpg",
  "author": "Uoaei1",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Stephansdom_Chor.JPG",
  "file": "File:Stephansdom Chor.JPG"
 },
 "salzburg": {
  "src": "photo-salzburg.jpg",
  "author": "Uoaei1",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Salzburg_Altstadt_Panorama_20170409_02.jpg",
  "file": "File:Salzburg Altstadt Panorama 20170409 02.jpg"
 },
 "rila": {
  "src": "photo-rila.jpg",
  "author": "Michael Paraskevas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rilski_Monastery_-_panoramio.jpg",
  "file": "File:Rilski Monastery - panoramio.jpg"
 },
 "bran": {
  "src": "photo-bran.jpg",
  "author": "Vislupus",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bran_Castle_002.jpg",
  "file": "File:Bran Castle 002.jpg"
 },
 "domeofrock": {
  "src": "photo-domeofrock.jpg",
  "author": "Godot13",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Jerusalem-2013-Temple_Mount-Dome_of_the_Rock_%26_Chain.jpg",
  "file": "File:Jerusalem-2013-Temple Mount-Dome of the Rock & Chain.jpg"
 },
 "deadsea": {
  "src": "photo-deadsea.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dead_Sea,_Jordan_02.jpg",
  "file": "File:Dead Sea, Jordan 02.jpg"
 },
 "wadirum": {
  "src": "photo-wadirum.jpg",
  "author": "Peter Chisholm",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Wadi_rum_desert.jpg",
  "file": "File:Wadi rum desert.jpg"
 },
 "burj": {
  "src": "photo-burj.jpg",
  "author": "Laika ac",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Burj_Khalifa_(16260269606).jpg",
  "file": "File:Burj Khalifa (16260269606).jpg"
 },
 "zayed": {
  "src": "photo-zayed.jpg",
  "author": "Guilhem Vellut from Annecy, France",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sheikh_Zayed_Grand_Mosque_@_Abu_Dhabi_(15856602738).jpg",
  "file": "File:Sheikh Zayed Grand Mosque @ Abu Dhabi (15856602738).jpg"
 },
 "persepolis": {
  "src": "photo-persepolis.jpg",
  "author": "Forough.Parhoudeh",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Persepolis_1_-_FP.jpg",
  "file": "File:Persepolis 1 - FP.jpg"
 },
 "isfahan": {
  "src": "photo-isfahan.jpg",
  "author": "en:User:Arad",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Naghshe_Jahan_Square_Isfahan_modified.jpg",
  "file": "File:Naghshe Jahan Square Isfahan modified.jpg"
 },
 "marrakech": {
  "src": "photo-marrakech.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Jamaa_El_Fna,_Marrakesh,_Morocco,_20250124_1804_7017.jpg",
  "file": "File:Jamaa El Fna, Marrakesh, Morocco, 20250124 1804 7017.jpg"
 },
 "chefchaouen": {
  "src": "photo-chefchaouen.jpg",
  "author": "Fbrandao.1963",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:2018_01_(Blue)_-_Chaouen.jpg",
  "file": "File:2018 01 (Blue) - Chaouen.jpg"
 },
 "hassan": {
  "src": "photo-hassan.jpg",
  "author": "Tinuzzo",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hassan_II_Mosque_-_general_framing,_Casablanca,_Morocco.jpg",
  "file": "File:Hassan II Mosque - general framing, Casablanca, Morocco.jpg"
 },
 "sossusvlei": {
  "src": "photo-sossusvlei.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dead_Vlei,_Sossusvlei,_Namibia,_2018-08-06,_DD_085.jpg",
  "file": "File:Dead Vlei, Sossusvlei, Namibia, 2018-08-06, DD 085.jpg"
 },
 "serengeti": {
  "src": "photo-serengeti.jpg",
  "author": "Charles J. Sharp",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Western_white-bearded_wildebeest_(Connochaetes_taurinus_mearnsi)_Mara_River_crossing_2b.jpg",
  "file": "File:Western white-bearded wildebeest (Connochaetes taurinus mearnsi) Mara River crossing 2b.jpg"
 },
 "lalibela": {
  "src": "photo-lalibela.jpg",
  "author": "Ji-Elle",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bete_Giyorgis-Lalibela_(2).jpg",
  "file": "File:Bete Giyorgis-Lalibela (2).jpg"
 },
 "karnak": {
  "src": "photo-karnak.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Templo_de_Karnak,_Luxor,_Egipto,_2022-04-03,_DD_146.jpg",
  "file": "File:Templo de Karnak, Luxor, Egipto, 2022-04-03, DD 146.jpg"
 },
 "valleyofkings": {
  "src": "photo-valleyofkings.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Valles_de_las_Reinas_y_de_los_Reyes,_Luxor,_Egipto,_2022-04-03,_DD_21.jpg",
  "file": "File:Valles de las Reinas y de los Reyes, Luxor, Egipto, 2022-04-03, DD 21.jpg"
 },
 "capeofgoodhope": {
  "src": "photo-capeofgoodhope.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cape_Point,_Sud%C3%A1frica,_2018-07-23,_DD_88.jpg",
  "file": "File:Cape Point, Sudáfrica, 2018-07-23, DD 88.jpg"
 },
 "boulders": {
  "src": "photo-boulders.jpg",
  "author": "Satdeep Gill",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Penguins_at_Boulders_Beach_04.jpg",
  "file": "File:Penguins at Boulders Beach 04.jpg"
 },
 "okavango": {
  "src": "photo-okavango.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cebras_de_Burchell_(Equus_quagga_burchellii),_vista_a%C3%A9rea_del_delta_del_Okavango,_Botsuana,_2018-08-01,_DD_30.jpg",
  "file": "File:Cebras de Burchell (Equus quagga burchellii), vista aérea del delta del Okavango, Botsuana, 2018-08-01, DD 30.jpg"
 },
 "masaimara": {
  "src": "photo-masaimara.jpg",
  "author": "Hobbyfotowiki",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:African_bush_elephant_(Loxodonta_africana),_Masai_Mara.jpg",
  "file": "File:African bush elephant (Loxodonta africana), Masai Mara.jpg"
 },
 "tiantan": {
  "src": "photo-tiantan.jpg",
  "author": "Fong Chen",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hall_of_Prayer_for_Good_Harvest.JPG",
  "file": "File:Hall of Prayer for Good Harvest.JPG"
 },
 "summerpalace": {
  "src": "photo-summerpalace.jpg",
  "author": "Ermell",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Peking_Sommerpalast_Kunming_Lake-20071020-RM-101124.jpg",
  "file": "File:Peking Sommerpalast Kunming Lake-20071020-RM-101124.jpg"
 },
 "jiuzhaigou": {
  "src": "photo-jiuzhaigou.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Jiuzhaigou_Sichuan_China_Panda-Lake-02.jpg",
  "file": "File:Jiuzhaigou Sichuan China Panda-Lake-02.jpg"
 },
 "huangshan": {
  "src": "photo-huangshan.jpg",
  "author": "Stephan Sprinz",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fetthennen-Steinbrech_(Saxifraga_aizoides)_03.jpg",
  "file": "File:Fetthennen-Steinbrech (Saxifraga aizoides) 03.jpg"
 },
 "leshan": {
  "src": "photo-leshan.jpg",
  "author": "王计",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Leshan_Giant_Buddha,_20161102.jpg",
  "file": "File:Leshan Giant Buddha, 20161102.jpg"
 },
 "lijiang": {
  "src": "photo-lijiang.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_Old-town-03.jpg",
  "file": "File:Lijiang Yunnan Old-town-03.jpg"
 },
 "victoriapeak": {
  "src": "photo-victoriapeak.jpg",
  "author": "Exploringlife",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Overlook_Hong_Kong_Island_north_coast,_Victoria_Harbour_and_Kowloon_from_Peak_Tower_at_daytime_(improved_version).jpg",
  "file": "File:Overlook Hong Kong Island north coast, Victoria Harbour and Kowloon from Peak Tower at daytime (improved version).jpg"
 },
 "macau": {
  "src": "photo-macau.jpg",
  "author": "lumoplank",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Macao,_Part_III_-_Macau8690.jpg",
  "file": "File:Macao, Part III - Macau8690.jpg"
 },
 "taipei101": {
  "src": "photo-taipei101.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taipei_Taiwan_Taipei-101-Tower-01.jpg",
  "file": "File:Taipei Taiwan Taipei-101-Tower-01.jpg"
 },
 "jiufen": {
  "src": "photo-jiufen.jpg",
  "author": "CEK2004",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:ECK_6396.png",
  "file": "File:ECK 6396.png"
 },
 "taroko": {
  "src": "photo-taroko.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taroko-Gorge_Hualien_Taiwan_Pudu-Bridge-at-Taroko-National-Park-02.jpg",
  "file": "File:Taroko-Gorge Hualien Taiwan Pudu-Bridge-at-Taroko-National-Park-02.jpg"
 },
 "gyeongbok": {
  "src": "photo-gyeongbok.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Front_view_of_the_Imperial_Throne_Hall_Geunjeongjeon_at_Gyeongbokgung_Palace_with_blue_sky_in_Seoul.jpg",
  "file": "File:Front view of the Imperial Throne Hall Geunjeongjeon at Gyeongbokgung Palace with blue sky in Seoul.jpg"
 },
 "grandpalace": {
  "src": "photo-grandpalace.jpg",
  "author": "Nawit science",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Temple_of_the_Emerald_Buddha.jpg",
  "file": "File:Temple of the Emerald Buddha.jpg"
 },
 "ayutthaya": {
  "src": "photo-ayutthaya.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Templo_Mahathat,_Ayutthaya,_Tailandia,_2013-08-23,_DD_18.jpg",
  "file": "File:Templo Mahathat, Ayutthaya, Tailandia, 2013-08-23, DD 18.jpg"
 },
 "doisuthep": {
  "src": "photo-doisuthep.jpg",
  "author": "ผู้สร้างสรรค์ผลงาน/ส่งข้อมูลเก็บในคลังข้อมูลเสรีวิกิมีเดียคอ…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Phra_That_Doi_Suthep_01.jpg",
  "file": "File:Phra That Doi Suthep 01.jpg"
 },
 "railay": {
  "src": "photo-railay.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Railay_Beach_5.jpg",
  "file": "File:Railay Beach 5.jpg"
 },
 "hue": {
  "src": "photo-hue.jpg",
  "author": "This Photo was taken by Supanut Arunoprayote. Feel free to u…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Meridian_Gate,_Hue_(I).jpg",
  "file": "File:Meridian Gate, Hue (I).jpg"
 },
 "luangprabang": {
  "src": "photo-luangprabang.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Temple_Wat_Xieng_Thong_-_Luang_Prabang_-_Laos.jpg",
  "file": "File:Temple Wat Xieng Thong - Luang Prabang - Laos.jpg"
 },
 "merlion": {
  "src": "photo-merlion.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Singapore_(SG),_Merlion_--_2019_--_4496.jpg",
  "file": "File:Singapore (SG), Merlion -- 2019 -- 4496.jpg"
 },
 "prambanan": {
  "src": "photo-prambanan.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yogyakarta_Indonesia_Prambanan-temple-complex-02.jpg",
  "file": "File:Yogyakarta Indonesia Prambanan-temple-complex-02.jpg"
 },
 "tegalalang": {
  "src": "photo-tegalalang.jpg",
  "author": "Vyacheslav Argenberg",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rice_terraces,_Bali.jpg",
  "file": "File:Rice terraces, Bali.jpg"
 },
 "komodo": {
  "src": "photo-komodo.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Varanus_komodoensis,_Komodo_Island,_Indonesia,_20250822_1319_2749.jpg",
  "file": "File:Varanus komodoensis, Komodo Island, Indonesia, 20250822 1319 2749.jpg"
 },
 "bromo": {
  "src": "photo-bromo.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mount_Bromo,_Java,_Indonesia,_20220820_0611_9485.jpg",
  "file": "File:Mount Bromo, Java, Indonesia, 20220820 0611 9485.jpg"
 },
 "chocolatehills": {
  "src": "photo-chocolatehills.jpg",
  "author": "Ramir Borja derivative work: MrPanyGoff",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chocolate_Hills_-_edit.jpg",
  "file": "File:Chocolate Hills - edit.jpg"
 },
 "banaue": {
  "src": "photo-banaue.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Banaue_Philippines_Banaue-Rice-Terraces-01.jpg",
  "file": "File:Banaue Philippines Banaue-Rice-Terraces-01.jpg"
 },
 "hawamahal": {
  "src": "photo-hawamahal.jpg",
  "author": "Chainwit.",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:East_facade_Hawa_Mahal_Jaipur_from_ground_level_(July_2022)_-_img_01.jpg",
  "file": "File:East facade Hawa Mahal Jaipur from ground level (July 2022) - img 01.jpg"
 },
 "amber": {
  "src": "photo-amber.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Amber_Fort,_Jaipur,_20191219_1011_9509.jpg",
  "file": "File:Amber Fort, Jaipur, 20191219 1011 9509.jpg"
 },
 "varanasi": {
  "src": "photo-varanasi.jpg",
  "author": "Marcin Białek",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Varanasi_Munshi_Ghat3.jpg",
  "file": "File:Varanasi Munshi Ghat3.jpg"
 },
 "ellora": {
  "src": "photo-ellora.jpg",
  "author": "Rohit Sharma",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Courtyard_and_Mahabharata_Reliefs_at_the_Kailasa_Temple,_Ellora_01.jpg",
  "file": "File:Courtyard and Mahabharata Reliefs at the Kailasa Temple, Ellora 01.jpg"
 },
 "gateway": {
  "src": "photo-gateway.jpg",
  "author": "iMahesh",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Taj_Palace_Hotel_and_Taj_Tower_with_the_iconic_Gateway_of_India_in_the_background.jpg",
  "file": "File:Panoramic view of Taj Palace Hotel and Taj Tower with the iconic Gateway of India in the background.jpg"
 },
 "sigiriya": {
  "src": "photo-sigiriya.jpg",
  "author": "dronepicr",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sigiriya_Rock_Sri_Lanka_(29959819372).jpg",
  "file": "File:Sigiriya Rock Sri Lanka (29959819372).jpg"
 },
 "taktsang": {
  "src": "photo-taktsang.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taktsang_Monastery,_Bhutan_03.jpg",
  "file": "File:Taktsang Monastery, Bhutan 03.jpg"
 },
 "boudhanath": {
  "src": "photo-boudhanath.jpg",
  "author": "Sunuwargr",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Boudhanath_Stupa_%E2%80%93_A_Sacred_Buddhist_Monument_of_Kathmandu,_Nepal.jpg",
  "file": "File:Boudhanath Stupa – A Sacred Buddhist Monument of Kathmandu, Nepal.jpg"
 },
 "registan": {
  "src": "photo-registan.jpg",
  "author": "Hasan Tohirov",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Registon_majmuasi_(Ulug%CA%BBbek,_Sherdor,_Tilla_Kori)_01.jpg",
  "file": "File:Registon majmuasi (Ulugʻbek, Sherdor, Tilla Kori) 01.jpg"
 },
 "baikal": {
  "src": "photo-baikal.jpg",
  "author": "Vyacheslav Argenberg",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Baikal,_Cape_Burhan,_Olkhon_Island,_Lake_Baikal,_Russia.jpg",
  "file": "File:Baikal, Cape Burhan, Olkhon Island, Lake Baikal, Russia.jpg"
 },
 "yosemite": {
  "src": "photo-yosemite.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yosemite_National_Park_(California,_USA),_Yosemite_Valley_(Yosemite_Tunnel)_--_2012_--_4628.jpg",
  "file": "File:Yosemite National Park (California, USA), Yosemite Valley (Yosemite Tunnel) -- 2012 -- 4628.jpg"
 },
 "zion": {
  "src": "photo-zion.jpg",
  "author": "Pierre André Leclercq",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Navajo_Sandstone_formations_in_Zion_National_Park,_Utah.-_(USA_2016).jpg",
  "file": "File:Navajo Sandstone formations in Zion National Park, Utah.- (USA 2016).jpg"
 },
 "delicatearch": {
  "src": "photo-delicatearch.jpg",
  "author": "“Jon Zander (Digon3)”",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Delicate_Arch_in_Arches_National_Park_3.jpg",
  "file": "File:Delicate Arch in Arches National Park 3.jpg"
 },
 "bryce": {
  "src": "photo-bryce.jpg",
  "author": "“Jon Zander (Digon3)”",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Bryce_Canyon_Hoodoos_Amphitheater_2.jpg",
  "file": "File:Bryce Canyon Hoodoos Amphitheater 2.jpg"
 },
 "horseshoe": {
  "src": "photo-horseshoe.jpg",
  "author": "Gzzz",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Horseshoe_Bend_2022.jpg",
  "file": "File:Horseshoe Bend 2022.jpg"
 },
 "hollywood": {
  "src": "photo-hollywood.jpg",
  "author": "Thomas Wolf, www.foto-tw.de",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hollywood_Sign_(Zuschnitt).jpg",
  "file": "File:Hollywood Sign (Zuschnitt).jpg"
 },
 "alcatraz": {
  "src": "photo-alcatraz.jpg",
  "author": "Photograph: Radomianin",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Alcatraz_recreation_yard,_NW_view.jpg",
  "file": "File:Alcatraz recreation yard, NW view.jpg"
 },
 "spaceneedle": {
  "src": "photo-spaceneedle.jpg",
  "author": "Buiobuione",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Space_Needle_Seattle_Buiobuione.jpg",
  "file": "File:Space Needle Seattle Buiobuione.jpg"
 },
 "brooklyn": {
  "src": "photo-brooklyn.jpg",
  "author": "Christian David",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lower_Manhattan_skyline_from_under_the_Brooklyn_Bridge_deck,_New_York_City.jpg",
  "file": "File:Lower Manhattan skyline from under the Brooklyn Bridge deck, New York City.jpg"
 },
 "centralpark": {
  "src": "photo-centralpark.jpg",
  "author": "King of Hearts",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Church_Square_Park_Hoboken_November_2021_001.jpg",
  "file": "File:Church Square Park Hoboken November 2021 001.jpg"
 },
 "washington": {
  "src": "photo-washington.jpg",
  "author": "Kurt Kaiser",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Washington_Monument_and_the_National_Mall.jpg",
  "file": "File:Washington Monument and the National Mall.jpg"
 },
 "waikiki": {
  "src": "photo-waikiki.jpg",
  "author": "Frank Schulenburg",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Waikiki_Beach_(2024)-L1004709.jpg",
  "file": "File:Waikiki Beach (2024)-L1004709.jpg"
 },
 "kilauea": {
  "src": "photo-kilauea.jpg",
  "author": "Pierre Markuse from Hamm, Germany",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kilauea_Volcano_and_lava_flows_from_fissures_near_Leilani_Estates,_Hawaii,_USA_(40544299770).jpg",
  "file": "File:Kilauea Volcano and lava flows from fissures near Leilani Estates, Hawaii, USA (40544299770).jpg"
 },
 "napali": {
  "src": "photo-napali.jpg",
  "author": "Christian Collins",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:N%C4%81_Pali_Coast.jpg",
  "file": "File:Nā Pali Coast.jpg"
 },
 "denali": {
  "src": "photo-denali.jpg",
  "author": "Jacob W. Frank",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:A_wintry_view_from_Stony_Overlook_(2df80d6d-1dd8-b71c-076a-6a22900dbde9).jpg",
  "file": "File:A wintry view from Stony Overlook (2df80d6d-1dd8-b71c-076a-6a22900dbde9).jpg"
 },
 "deathvalley": {
  "src": "photo-deathvalley.jpg",
  "author": "King of Hearts",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Zabriskie_Point_Death_Valley_December_2013_002.jpg",
  "file": "File:Zabriskie Point Death Valley December 2013 002.jpg"
 },
 "louise": {
  "src": "photo-louise.jpg",
  "author": "Chensiyuan",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:1_lake_louise_pano_2019.jpg",
  "file": "File:1 lake louise pano 2019.jpg"
 },
 "moraine": {
  "src": "photo-moraine.jpg",
  "author": "Tobias Alt, Tobi 87",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Moraine_Lake-Banff_NP.JPG",
  "file": "File:Moraine Lake-Banff NP.JPG"
 },
 "cntower": {
  "src": "photo-cntower.jpg",
  "author": "Jchmrt",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Toronto-CN-tower-and-Canadian-flag-skyline.jpg",
  "file": "File:Toronto-CN-tower-and-Canadian-flag-skyline.jpg"
 },
 "quebec": {
  "src": "photo-quebec.jpg",
  "author": "Wilfredor",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ch%C3%A2teau_Frontenac_after_a_freezing_rain_day_in_Quebec_city.jpg",
  "file": "File:Château Frontenac after a freezing rain day in Quebec city.jpg"
 },
 "tulum": {
  "src": "photo-tulum.jpg",
  "author": "Carlos Delgado",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tulum_-_01.jpg",
  "file": "File:Tulum - 01.jpg"
 },
 "guanajuato": {
  "src": "photo-guanajuato.jpg",
  "author": "Sofia.vs08",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Vista_de_Guanajuato_desde_el_mirador_del_P%C3%ADpila.jpg",
  "file": "File:Vista de Guanajuato desde el mirador del Pípila.jpg"
 },
 "havana": {
  "src": "photo-havana.jpg",
  "author": "lin padgham",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Old_Town_Havana.png",
  "file": "File:Old Town Havana.png"
 },
 "panama": {
  "src": "photo-panama.jpg",
  "author": "Elemaki",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:06._Canal_de_Panama_(17).JPG",
  "file": "File:06. Canal de Panama (17).JPG"
 },
 "arenal": {
  "src": "photo-arenal.jpg",
  "author": "Rhododendrites",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Arenal_volcano_(70785p)_(cropped).jpg",
  "file": "File:Arenal volcano (70785p) (cropped).jpg"
 },
 "galapagos": {
  "src": "photo-galapagos.jpg",
  "author": "E bailey",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Galapagos_giant_tortoise,_head_(Chelonoidis_niger_hoodensis).jpg",
  "file": "File:Galapagos giant tortoise, head (Chelonoidis niger hoodensis).jpg"
 },
 "nazca": {
  "src": "photo-nazca.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:L%C3%ADneas_de_Nazca,_Nazca,_Per%C3%BA,_2015-07-29,_DD_52.JPG",
  "file": "File:Líneas de Nazca, Nazca, Perú, 2015-07-29, DD 52.JPG"
 },
 "cusco": {
  "src": "photo-cusco.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Catedral,_Plaza_de_Armas,_Cusco,_Per%C3%BA,_2015-07-31,_DD_57.JPG",
  "file": "File:Catedral, Plaza de Armas, Cusco, Perú, 2015-07-31, DD 57.JPG"
 },
 "titicaca": {
  "src": "photo-titicaca.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Islas_flotantes_de_los_Uros,_Lago_Titicaca,_Per%C3%BA,_2015-08-01,_DD_44.JPG",
  "file": "File:Islas flotantes de los Uros, Lago Titicaca, Perú, 2015-08-01, DD 44.JPG"
 },
 "rainbowmtn": {
  "src": "photo-rainbowmtn.jpg",
  "author": "Yifan Wang",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Vinicunca,_Rainbow_Mountain.jpg",
  "file": "File:Vinicunca, Rainbow Mountain.jpg"
 },
 "torres": {
  "src": "photo-torres.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Caballos_ante_los_Cuernos_del_Paine,_Parque_Nacional_Torres_del_Paine,_Chile1.jpg",
  "file": "File:Caballos ante los Cuernos del Paine, Parque Nacional Torres del Paine, Chile1.jpg"
 },
 "atacama": {
  "src": "photo-atacama.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Anfiteatro,_Valle_de_la_Luna,_San_Pedro_de_Atacama,_Chile,_2016-02-01,_DD_149.JPG",
  "file": "File:Anfiteatro, Valle de la Luna, San Pedro de Atacama, Chile, 2016-02-01, DD 149.JPG"
 },
 "caminito": {
  "src": "photo-caminito.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:El_caminito2_-_Buenos_Aires_-_Argentina.jpg",
  "file": "File:El caminito2 - Buenos Aires - Argentina.jpg"
 },
 "sugarloaf": {
  "src": "photo-sugarloaf.jpg",
  "author": "Wilfredor",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Sugarloaf_Mountain,_Rio_de_Janeiro,_Brazil.jpg",
  "file": "File:Sugarloaf Mountain, Rio de Janeiro, Brazil.jpg"
 },
 "lencois": {
  "src": "photo-lencois.jpg",
  "author": "Rocsilva",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Len%C3%A7%C3%B3is_Maranhenses_Roberto_Silva_66.jpg",
  "file": "File:Lençóis Maranhenses Roberto Silva 66.jpg"
 },
 "amazon": {
  "src": "photo-amazon.jpg",
  "author": "lubasi",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Amazon_Rainforest.jpg",
  "file": "File:Aerial view of the Amazon Rainforest.jpg"
 },
 "cartagena": {
  "src": "photo-cartagena.jpg",
  "author": "Burkhard Mücke",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cartagena_im_Januar_01_27.jpg",
  "file": "File:Cartagena im Januar 01 27.jpg"
 },
 "twelveapostles": {
  "src": "photo-twelveapostles.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Princetown_(AU),_Port_Campbell_National_Park,_Twelve_Apostles_--_2019_--_0969.jpg",
  "file": "File:Princetown (AU), Port Campbell National Park, Twelve Apostles -- 2019 -- 0969.jpg"
 },
 "bluemountains": {
  "src": "photo-bluemountains.jpg",
  "author": "Jakub Fryš",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Three_Sisters_from_Police_Creek.jpg",
  "file": "File:Three Sisters from Police Creek.jpg"
 },
 "whitehaven": {
  "src": "photo-whitehaven.jpg",
  "author": "Slug69",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Whitehaven_Beach,_Whitsunday_Island,_Queensland.jpg",
  "file": "File:Whitehaven Beach, Whitsunday Island, Queensland.jpg"
 },
 "tekapo": {
  "src": "photo-tekapo.jpg",
  "author": "Michal Klajban",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Church_of_the_Good_Shepherd,_Lake_Tekapo,_New_Zealand_03.jpg",
  "file": "File:Church of the Good Shepherd, Lake Tekapo, New Zealand 03.jpg"
 },
 "mtcook": {
  "src": "photo-mtcook.jpg",
  "author": "Michal Klajban",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aoraki_-_Mt_Cook,_Aoraki_-_Mount_Cook_National_Park,_New_Zealand.jpg",
  "file": "File:Aoraki - Mt Cook, Aoraki - Mount Cook National Park, New Zealand.jpg"
 },
 "rotorua": {
  "src": "photo-rotorua.jpg",
  "author": "Anagoria",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:2018-12-30_155408_Pohutu_Geyser_Whakarewarewa_Village_anagoria.jpg",
  "file": "File:2018-12-30 155408 Pohutu Geyser Whakarewarewa Village anagoria.jpg"
 },
 "borabora": {
  "src": "photo-borabora.jpg",
  "author": "Michelle Maria",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bora-Bora_French_Polynesia_-_panoramio_(3).jpg",
  "file": "File:Bora-Bora French Polynesia - panoramio (3).jpg"
 },
 "bund": {
  "src": "photo-bund.jpg",
  "author": "David Zhang from Canada",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sunset_-_the_Bund,_Shanghai_(47792991871).jpg",
  "file": "File:Sunset - the Bund, Shanghai (47792991871).jpg"
 },
 "zhangjiajie": {
  "src": "photo-zhangjiajie.jpg",
  "author": "SHdyroff",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:China_Hunan_Tour_4.jpg",
  "file": "File:China Hunan Tour 4.jpg"
 },
 "hoian": {
  "src": "photo-hoian.jpg",
  "author": "David McKelvey from Brisbane, Australia",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hoi_An_Ancient_Town,_Vietnam_(7090638613).jpg",
  "file": "File:Hoi An Ancient Town, Vietnam (7090638613).jpg"
 },
 "petronas": {
  "src": "photo-petronas.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kuala_Lumpur_Malaysia_Petronas-Twin-Towers-01.jpg",
  "file": "File:Kuala Lumpur Malaysia Petronas-Twin-Towers-01.jpg"
 },
 "marinabay": {
  "src": "photo-marinabay.jpg",
  "author": "This Photo was taken by Supanut Arunoprayote. Feel free to u…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Marina_Bay_Sands_(I).jpg",
  "file": "File:Marina Bay Sands (I).jpg"
 },
 "tanahlot": {
  "src": "photo-tanahlot.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tanah_Lot,_Bali,_Indonesia,_20220827_1008_1159.jpg",
  "file": "File:Tanah Lot, Bali, Indonesia, 20220827 1008 1159.jpg"
 },
 "gokayama": {
  "src": "photo-gokayama.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gassho-zukuri_farmhouse-01.jpg",
  "file": "File:Gassho-zukuri farmhouse-01.jpg"
 },
 "nakijin": {
  "src": "photo-nakijin.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nakijin_Okinawa_Japan_Nakikjin-Castle-05.jpg",
  "file": "File:Nakijin Okinawa Japan Nakikjin-Castle-05.jpg"
 },
 "nakagusuku": {
  "src": "photo-nakagusuku.jpg",
  "author": "MaedaAkihiko",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Nakagusuku-Castle_Entrance.jpg",
  "file": "File:Nakagusuku-Castle Entrance.jpg"
 },
 "shikinaen": {
  "src": "photo-shikinaen.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Naha_Okinawa_Japan_Shikinaen-02.jpg",
  "file": "File:Naha Okinawa Japan Shikinaen-02.jpg"
 },
 "kumanohongu": {
  "src": "photo-kumanohongu.jpg",
  "author": "Zairon",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tanabe_Kumano_Hongu-Taisha_Stairs_01.jpg",
  "file": "File:Tanabe Kumano Hongu-Taisha Stairs 01.jpg"
 },
 "kumanokodo": {
  "src": "photo-kumanokodo.jpg",
  "author": "U.S. Air Force 118AW by [null Courtesy]",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E2%80%9CPurified_by_the_Path%E2%80%9D-_Team_Kadena%E2%80%99s_Misogi_on_the_Kumano_Kodo_(9489194).jpg",
  "file": "File:“Purified by the Path”- Team Kadena’s Misogi on the Kumano Kodo (9489194).jpg"
 },
 "iwamiginzan": {
  "src": "photo-iwamiginzan.jpg",
  "author": "663highland",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:180504_Omori_of_Iwami_Ginzan_Silver_Mine_Oda_Shimane_pref_Japan01bs4.jpg",
  "file": "File:180504 Omori of Iwami Ginzan Silver Mine Oda Shimane pref Japan01bs4.jpg"
 },
 "ogasawaraislands": {
  "src": "photo-ogasawaraislands.jpg",
  "author": "Ootahara",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Ogasawara_Downrange_Station_20160920.jpg",
  "file": "File:Ogasawara Downrange Station 20160920.jpg"
 },
 "motsuji": {
  "src": "photo-motsuji.jpg",
  "author": "Nerotaso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:M%C5%8Dts%C5%AB-ji_Pure_Land_Garden_1.JPG",
  "file": "File:Mōtsū-ji Pure Land Garden 1.JPG"
 },
 "tomiokaseishi": {
  "src": "photo-tomiokaseishi.jpg",
  "author": "C1815",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Tomioka_Silk_Mill_Main_Building.JPG",
  "file": "File:Tomioka Silk Mill Main Building.JPG"
 },
 "nirayama": {
  "src": "photo-nirayama.jpg",
  "author": "東京特許許可局",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nirayama_Hansyaro_001.jpg",
  "file": "File:Nirayama Hansyaro 001.jpg"
 },
 "shokasonjuku": {
  "src": "photo-shokasonjuku.jpg",
  "author": "m-louis .® from Osaka, Japan",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%9D%BE%E4%B8%8B%E6%9D%91%E5%A1%BE_(50987764778).jpg",
  "file": "File:松下村塾 (50987764778).jpg"
 },
 "seiyobijutsukan": {
  "src": "photo-seiyobijutsukan.jpg",
  "author": "Rjcastillo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Museo_Nacional_de_Historia_Natural_I.jpg",
  "file": "File:Museo Nacional de Historia Natural I.jpg"
 },
 "munakata": {
  "src": "photo-munakata.jpg",
  "author": "Saigen Jiro",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Munakata-taisha,_shaden.JPG",
  "file": "File:Munakata-taisha, shaden.JPG"
 },
 "oura": {
  "src": "photo-oura.jpg",
  "author": "Suicasmo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Oura_Church_20170222.jpg",
  "file": "File:Oura Church 20170222.jpg"
 },
 "sakitsu": {
  "src": "photo-sakitsu.jpg",
  "author": "Indiana jo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sakitsu_Church_stone_%26_wood_mix_building.jpg",
  "file": "File:Sakitsu Church stone & wood mix building.jpg"
 },
 "sannaimaruyama": {
  "src": "photo-sannaimaruyama.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:140913_Sannai-Maruyama_site_Aomori_Japan01bs6bs6.jpg",
  "file": "File:140913 Sannai-Maruyama site Aomori Japan01bs6bs6.jpg"
 },
 "oyu": {
  "src": "photo-oyu.jpg",
  "author": "掬茶",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Oyu_stone_circles_20180916a.jpg",
  "file": "File:Oyu stone circles 20180916a.jpg"
 },
 "iriomotejima": {
  "src": "photo-iriomotejima.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Nakama_River_Iriomote_Okinawa_Japan04s3.jpg",
  "file": "File:Nakama River Iriomote Okinawa Japan04s3.jpg"
 },
 "sadokinzan": {
  "src": "photo-sadokinzan.jpg",
  "author": "日:Muramasa",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sadokinzan-doyunowareto_01.JPG",
  "file": "File:Sadokinzan-doyunowareto 01.JPG"
 },
 "daigoji": {
  "src": "photo-daigoji.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Daigoji_Sanboin_Kyoto04n4592.jpg",
  "file": "File:Daigoji Sanboin Kyoto04n4592.jpg"
 },
 "ninnaji": {
  "src": "photo-ninnaji.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ninna-ji%27s_Golden_Hall,_front_view_of_the_Shingon_Buddhist_temple,_Uky%C5%8D-ku,_Kyoto,_Japan.jpg",
  "file": "File:Ninna-ji's Golden Hall, front view of the Shingon Buddhist temple, Ukyō-ku, Kyoto, Japan.jpg"
 },
 "ryoanji": {
  "src": "photo-ryoanji.jpg",
  "author": "DXR",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kare-sansui_zen_garden,_Ry%C5%8Dan-ji,_Kyoto_20190416_1.jpg",
  "file": "File:Kare-sansui zen garden, Ryōan-ji, Kyoto 20190416 1.jpg"
 },
 "tenryuji": {
  "src": "photo-tenryuji.jpg",
  "author": "Daderot",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Tenryuji_Garden-_DSC05957.JPG",
  "file": "File:Tenryuji Garden- DSC05957.JPG"
 },
 "nishihonganji": {
  "src": "photo-nishihonganji.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:170216_Nishi_Honganji_Kyoto_Japan05n.jpg",
  "file": "File:170216 Nishi Honganji Kyoto Japan05n.jpg"
 },
 "kamigamo": {
  "src": "photo-kamigamo.jpg",
  "author": "Immanuelle",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kamigamo_Shrine-bridge_into_shaden.jpg",
  "file": "File:Kamigamo Shrine-bridge into shaden.jpg"
 },
 "shimogamo": {
  "src": "photo-shimogamo.jpg",
  "author": "Zairon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kyoto_Shimogamo-jinja_Romon_3.jpg",
  "file": "File:Kyoto Shimogamo-jinja Romon 3.jpg"
 },
 "ujigami": {
  "src": "photo-ujigami.jpg",
  "author": "Hyppolyte de Saint-Rambert",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Uji_kami_Jinja_(Uji,_Kyoto)_Shrine_hdsr_S5_01.jpg",
  "file": "File:Uji kami Jinja (Uji, Kyoto) Shrine hdsr S5 01.jpg"
 },
 "enryakuji": {
  "src": "photo-enryakuji.jpg",
  "author": "KENPEI",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Enryakuji_Konpon_cyudo1.jpg",
  "file": "File:Enryakuji Konpon cyudo1.jpg"
 },
 "kofukuji": {
  "src": "photo-kofukuji.jpg",
  "author": "Yuki Yoshida (talk)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kofukuji-fromSarusawaike.JPG",
  "file": "File:Kofukuji-fromSarusawaike.JPG"
 },
 "yakushiji": {
  "src": "photo-yakushiji.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Yakushiji_Nara06s3s4440.jpg",
  "file": "File:Yakushiji Nara06s3s4440.jpg"
 },
 "toshodaiji": {
  "src": "photo-toshodaiji.jpg",
  "author": "Martin Falbisoner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Great_Buddha_Hall_of_T%C5%8Ddai-ji,_Nara,_November_2016.jpg",
  "file": "File:The Great Buddha Hall of Tōdai-ji, Nara, November 2016.jpg"
 },
 "heijokyu": {
  "src": "photo-heijokyu.jpg",
  "author": "Saigen Jiro",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Heijo_Palace,_Suzaku-mon_and_Suzaku-oji.jpg",
  "file": "File:Heijo Palace, Suzaku-mon and Suzaku-oji.jpg"
 },
 "kasugayama": {
  "src": "photo-kasugayama.jpg",
  "author": "Cun Cun",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kasugayama_Forest.jpg",
  "file": "File:Kasugayama Forest.jpg"
 },
 "rinnoji": {
  "src": "photo-rinnoji.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:NikkoRinnoji5390.jpg",
  "file": "File:NikkoRinnoji5390.jpg"
 },
 "futarasan": {
  "src": "photo-futarasan.jpg",
  "author": "DXR",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mitomo_Shrine,_Futarasan,_Nikko,_Southeast_view_20190423_1.jpg",
  "file": "File:Mitomo Shrine, Futarasan, Nikko, Southeast view 20190423 1.jpg"
 },
 "fujigoko": {
  "src": "photo-fujigoko.jpg",
  "author": "Fg2",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:FujiFiveLakes.jpg",
  "file": "File:FujiFiveLakes.jpg"
 },
 "asukafujiwara": {
  "src": "photo-asukafujiwara.jpg",
  "author": "663highland",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Ishibutai-kofun_Asuka_Nara_pref04n4592.jpg",
  "file": "File:Ishibutai-kofun Asuka Nara pref04n4592.jpg"
 },
 "hikonecastle": {
  "src": "photo-hikonecastle.jpg",
  "author": "Martin Falbisoner",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hikone_Castle_November_2016_-02.jpg",
  "file": "File:Hikone Castle November 2016 -02.jpg"
 },
 "kamakurashrine": {
  "src": "photo-kamakurashrine.jpg",
  "author": "Ocdp",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Tsurugaoka_Hachimangu_001.jpg",
  "file": "File:Tsurugaoka Hachimangu 001.jpg"
 },
 "gunkanjima2": {
  "src": "photo-gunkanjima2.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hashima,_Nagasaki,_Japan,_20240814_1421_3377.jpg",
  "file": "File:Hashima, Nagasaki, Japan, 20240814 1421 3377.jpg"
 },
 "himejiwest": {
  "src": "photo-himejiwest.jpg",
  "author": "Yasuo Hamashima",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Himeji_castle_20241025-_YAS2703.jpg",
  "file": "File:Himeji castle 20241025- YAS2703.jpg"
 },
 "horyujiyumedono": {
  "src": "photo-horyujiyumedono.jpg",
  "author": "inunami",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Horyuji_20200404135422_(50266594113).jpg",
  "file": "File:Horyuji 20200404135422 (50266594113).jpg"
 },
 "auschwitz": {
  "src": "photo-auschwitz.jpg",
  "author": "Olliebailie",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Auschwitz_I_concentration_camp_-_20240416022841.jpg",
  "file": "File:Auschwitz I concentration camp - 20240416022841.jpg"
 },
 "sanssouci": {
  "src": "photo-sanssouci.jpg",
  "author": "Flocci Nivis",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:20220810_Sanssouci_03.jpg",
  "file": "File:20220810 Sanssouci 03.jpg"
 },
 "aachen": {
  "src": "photo-aachen.jpg",
  "author": "CEphoto, Uwe Aranas",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aachen_Germany_Imperial-Cathedral-01.jpg",
  "file": "File:Aachen Germany Imperial-Cathedral-01.jpg"
 },
 "lubeck": {
  "src": "photo-lubeck.jpg",
  "author": "Christian Wolf (www.c-w-design.de)",
  "license": "CC BY-SA 3.0 DE",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Holstentor_in_L%C3%BCbeck_2015.jpg",
  "file": "File:Holstentor in Lübeck 2015.jpg"
 },
 "wartburg": {
  "src": "photo-wartburg.jpg",
  "author": "Krzysztof Golik",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Outside_view_of_Wartburg_Castle_(4).jpg",
  "file": "File:Outside view of Wartburg Castle (4).jpg"
 },
 "wurzburg": {
  "src": "photo-wurzburg.jpg",
  "author": "DXR",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Residenz_W%C3%BCrzburg,_East_facade_20181228_1.jpg",
  "file": "File:Residenz Würzburg, East facade 20181228 1.jpg"
 },
 "chartres": {
  "src": "photo-chartres.jpg",
  "author": "Gzen92",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cath%C3%A9drale_Notre-Dame_(Chartres)_(2).jpg",
  "file": "File:Cathédrale Notre-Dame (Chartres) (2).jpg"
 },
 "pontdugard": {
  "src": "photo-pontdugard.jpg",
  "author": "Krzysztof Golik",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pont_du_Gard_(01).jpg",
  "file": "File:Pont du Gard (01).jpg"
 },
 "avignon": {
  "src": "photo-avignon.jpg",
  "author": "Rolf Kranz",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pont_d%C2%B4Avignon.jpg",
  "file": "File:Pont d´Avignon.jpg"
 },
 "lascaux": {
  "src": "photo-lascaux.jpg",
  "author": "DaBler",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Cave_painting,_Anthropos_(2).jpeg",
  "file": "File:Cave painting, Anthropos (2).jpeg"
 },
 "reims": {
  "src": "photo-reims.jpg",
  "author": "Diliff",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Reims_Cathedral_Nave,_France_-_Diliff.jpg",
  "file": "File:Reims Cathedral Nave, France - Diliff.jpg"
 },
 "lyon": {
  "src": "photo-lyon.jpg",
  "author": "Cayambe",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hostellerie_du_Vieux_P%C3%A9rouges,_large.jpg",
  "file": "File:Hostellerie du Vieux Pérouges, large.jpg"
 },
 "siena": {
  "src": "photo-siena.jpg",
  "author": "Perituss",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Piazza_del_Campo_2014_01.jpg",
  "file": "File:Piazza del Campo 2014 01.jpg"
 },
 "sangimignano": {
  "src": "photo-sangimignano.jpg",
  "author": "Eric Kilby",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:San_Gimignano_Towers_from_the_Square.jpg",
  "file": "File:San Gimignano Towers from the Square.jpg"
 },
 "assisi": {
  "src": "photo-assisi.jpg",
  "author": "Stifone",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sacro_Convento_(Assisi)_-_Remote_view.jpg",
  "file": "File:Sacro Convento (Assisi) - Remote view.jpg"
 },
 "alberobello": {
  "src": "photo-alberobello.jpg",
  "author": "Benjamin Smith",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Alberobello_-_Trulli_del_Rione_Aia_Piccola_-_02.jpg",
  "file": "File:Alberobello - Trulli del Rione Aia Piccola - 02.jpg"
 },
 "matera": {
  "src": "photo-matera.jpg",
  "author": "Jules Verne Times Two",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_of_Sassi_di_Matera,_Matera,_Italy_(PPL2-Enhanced)_julesvernex2.jpg",
  "file": "File:View of Sassi di Matera, Matera, Italy (PPL2-Enhanced) julesvernex2.jpg"
 },
 "ravenna": {
  "src": "photo-ravenna.jpg",
  "author": "Roger Culos",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sanvitale03.jpg",
  "file": "File:Sanvitale03.jpg"
 },
 "agrigento": {
  "src": "photo-agrigento.jpg",
  "author": "Cayambe",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Valle_dei_Templi_%E2%80%93_Temple_of_Hera_2024c.jpg",
  "file": "File:Valle dei Templi – Temple of Hera 2024c.jpg"
 },
 "verona": {
  "src": "photo-verona.jpg",
  "author": "Lawrence W.K. Ho",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Arena_di_Verona,_Verona_-_panoramio.jpg",
  "file": "File:Arena di Verona, Verona - panoramio.jpg"
 },
 "lastsupper": {
  "src": "photo-lastsupper.jpg",
  "author": "C messier",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Santa_Maria_delle_Grazie_2457.jpg",
  "file": "File:Santa Maria delle Grazie 2457.jpg"
 },
 "cordoba": {
  "src": "photo-cordoba.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mezquita-catedral_de_C%C3%B3rdoba_interior_24.jpg",
  "file": "File:Mezquita-catedral de Córdoba interior 24.jpg"
 },
 "segovia": {
  "src": "photo-segovia.jpg",
  "author": "David Corral Gadea",
  "license": "CC BY-SA 3.0 ES",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/es/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Acueducto_de_Segovia_01.jpg",
  "file": "File:Acueducto de Segovia 01.jpg"
 },
 "casabatllo": {
  "src": "photo-casabatllo.jpg",
  "author": "Jose Ramirez from Barcelona.",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Casa_Batll%C3%B3_(50257834956).jpg",
  "file": "File:Casa Batlló (50257834956).jpg"
 },
 "casamila": {
  "src": "photo-casamila.jpg",
  "author": "T meltzer",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Barcelona_1800.jpg",
  "file": "File:Barcelona 1800.jpg"
 },
 "altamira": {
  "src": "photo-altamira.jpg",
  "author": "Thomas Quine",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Altamira_bisons.jpg",
  "file": "File:Altamira bisons.jpg"
 },
 "durham": {
  "src": "photo-durham.jpg",
  "author": "Michael D Beckwith",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Durham_Cathedral_Nave.jpg",
  "file": "File:Durham Cathedral Nave.jpg"
 },
 "canterbury": {
  "src": "photo-canterbury.jpg",
  "author": "Suicasmo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Canterbury_cathedral_20160901.jpg",
  "file": "File:Canterbury cathedral 20160901.jpg"
 },
 "bath": {
  "src": "photo-bath.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ba%C3%B1os_Romanos,_Bath,_Inglaterra,_2014-08-12,_DD_20.JPG",
  "file": "File:Baños Romanos, Bath, Inglaterra, 2014-08-12, DD 20.JPG"
 },
 "toweroflondon": {
  "src": "photo-toweroflondon.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:London,_Tower_Bridge_--_2016_--_4676.jpg",
  "file": "File:London, Tower Bridge -- 2016 -- 4676.jpg"
 },
 "ironbridge": {
  "src": "photo-ironbridge.jpg",
  "author": "Colin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ironbridge_2014.jpg",
  "file": "File:Ironbridge 2014.jpg"
 },
 "delphi": {
  "src": "photo-delphi.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tholos_of_Delphi_04.jpg",
  "file": "File:Tholos of Delphi 04.jpg"
 },
 "olympia": {
  "src": "photo-olympia.jpg",
  "author": "dronepicr",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ancient_Olympia_Stadium_in_Greece_(51224128585).jpg",
  "file": "File:Ancient Olympia Stadium in Greece (51224128585).jpg"
 },
 "rhodes": {
  "src": "photo-rhodes.jpg",
  "author": "Jebulon",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Walls_tugboat_castle_Rhodes.jpg",
  "file": "File:Walls tugboat castle Rhodes.jpg"
 },
 "mycenae": {
  "src": "photo-mycenae.jpg",
  "author": "Andreas Trepte",
  "license": "CC BY-SA 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Lions-Gate-Mycenae.jpg",
  "file": "File:Lions-Gate-Mycenae.jpg"
 },
 "troy": {
  "src": "photo-troy.jpg",
  "author": "Jorge Láscar from Australia",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Troy_(and_a_trojan_horse)_(8709942456).jpg",
  "file": "File:Troy (and a trojan horse) (8709942456).jpg"
 },
 "nemrut": {
  "src": "photo-nemrut.jpg",
  "author": "Vincent Vega",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:NemrutEagle.jpg",
  "file": "File:NemrutEagle.jpg"
 },
 "gobekli": {
  "src": "photo-gobekli.jpg",
  "author": "Teomancimit",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:G%C3%B6bekli_Tepe,_Urfa.jpg",
  "file": "File:Göbekli Tepe, Urfa.jpg"
 },
 "saintcatherine": {
  "src": "photo-saintcatherine.jpg",
  "author": "Berthold Werner",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Katharinenkloster_Sinai_BW_4.jpg",
  "file": "File:Katharinenkloster Sinai BW 4.jpg"
 },
 "baalbek": {
  "src": "photo-baalbek.jpg",
  "author": "Lodo from Moscow, Russia",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Temple_of_Bacchus,_Baalbek,_Lebanon_(49890323372).jpg",
  "file": "File:Temple of Bacchus, Baalbek, Lebanon (49890323372).jpg"
 },
 "palmyra": {
  "src": "photo-palmyra.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Temple_of_Bel,_Palmyra_07.jpg",
  "file": "File:Temple of Bel, Palmyra 07.jpg"
 },
 "shibam": {
  "src": "photo-shibam.jpg",
  "author": "Jialiang Gao www.peace-on-earth.org [dead link]",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Shibam_Wadi_Hadhramaut_Yemen.jpg",
  "file": "File:Shibam Wadi Hadhramaut Yemen.jpg"
 },
 "wutai": {
  "src": "photo-wutai.jpg",
  "author": "Popolon",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Wutai_shan_temples.jpg",
  "file": "File:Wutai shan temples.jpg"
 },
 "taishan": {
  "src": "photo-taishan.jpg",
  "author": "╬ಠ益ಠ)",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Peak_of_Mount_Tai_%E6%B3%B0%E5%B1%B1%E5%B1%B1%E9%A1%B6_Taishan_2007_070.jpg",
  "file": "File:Peak of Mount Tai 泰山山顶 Taishan 2007 070.jpg"
 },
 "qufu": {
  "src": "photo-qufu.jpg",
  "author": "Stefan Fussan",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shanghai_-_Konfuzianischer_Tempel_-_0028.jpg",
  "file": "File:Shanghai - Konfuzianischer Tempel - 0028.jpg"
 },
 "mogao": {
  "src": "photo-mogao.jpg",
  "author": "N509FZ",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Caves_16-17_of_Mogao_Grottoes_(20230918142815).jpg",
  "file": "File:Caves 16-17 of Mogao Grottoes (20230918142815).jpg"
 },
 "longmen": {
  "src": "photo-longmen.jpg",
  "author": "Gerd Eichmann",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Longmen-Grotten-18-2012-gje.jpg",
  "file": "File:Longmen-Grotten-18-2012-gje.jpg"
 },
 "yungang": {
  "src": "photo-yungang.jpg",
  "author": "Marcin Białek",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yungang10_2010.JPG",
  "file": "File:Yungang10 2010.JPG"
 },
 "suzhou": {
  "src": "photo-suzhou.jpg",
  "author": "King of Hearts",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_November_2017_005.jpg",
  "file": "File:Humble Administrator's Garden Suzhou November 2017 005.jpg"
 },
 "pingyao": {
  "src": "photo-pingyao.jpg",
  "author": "Francisco Anzola",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pingyao_walls_(6240807484).jpg",
  "file": "File:Pingyao walls (6240807484).jpg"
 },
 "chengde": {
  "src": "photo-chengde.jpg",
  "author": "xiquinhosilva",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chengde_Mountain_Resort_22663-Chengde_(49049310591).jpg",
  "file": "File:Chengde Mountain Resort 22663-Chengde (49049310591).jpg"
 },
 "mingtombs": {
  "src": "photo-mingtombs.jpg",
  "author": "Gary Todd from Xinzheng, China",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Ming_Tombs_Sacred_Way_Stone_Xiezhi_(9863805035).jpg",
  "file": "File:Ming Tombs Sacred Way Stone Xiezhi (9863805035).jpg"
 },
 "tulou": {
  "src": "photo-tulou.jpg",
  "author": "Bob Clemintime",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tulou_birds_eye_view_fujian_china.jpg",
  "file": "File:Tulou birds eye view fujian china.jpg"
 },
 "seokguram": {
  "src": "photo-seokguram.jpg",
  "author": "Bernard Gagnon",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Seokguram_Grotto_01.jpg",
  "file": "File:Seokguram Grotto 01.jpg"
 },
 "hwaseong": {
  "src": "photo-hwaseong.jpg",
  "author": "Bernard Gagnon",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Dongbuk_Nodae_(North-East_Crossbow_Platform).jpg",
  "file": "File:Dongbuk Nodae (North-East Crossbow Platform).jpg"
 },
 "changdeok": {
  "src": "photo-changdeok.jpg",
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Exterior_front_view_of_Daejojeon_Hall_of_Changdeokgung_Palace_with_blue_sky_in_Seoul.jpg",
  "file": "File:Exterior front view of Daejojeon Hall of Changdeokgung Palace with blue sky in Seoul.jpg"
 },
 "jongmyo": {
  "src": "photo-jongmyo.jpg",
  "author": "Bgag",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Yeongnyeongjeon_01.jpg",
  "file": "File:Yeongnyeongjeon 01.jpg"
 },
 "haeinsa": {
  "src": "photo-haeinsa.jpg",
  "author": "Bernard Gagnon",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Haeinsa_Temple_11.jpg",
  "file": "File:Haeinsa Temple 11.jpg"
 },
 "ajanta": {
  "src": "photo-ajanta.jpg",
  "author": "Vinayaraj",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ajanta_caves_-_Exterior_views_vrvbajel0924_(17).jpg",
  "file": "File:Ajanta caves - Exterior views vrvbajel0924 (17).jpg"
 },
 "khajuraho": {
  "src": "photo-khajuraho.jpg",
  "author": "Taru23",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Kandariya_Mahadeva_Temple,_Khajuraho,_Madhya_Pradesh.jpg",
  "file": "File:The Kandariya Mahadeva Temple, Khajuraho, Madhya Pradesh.jpg"
 },
 "sanchi": {
  "src": "photo-sanchi.jpg",
  "author": "Rohit Sharma",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Eastern_Gateway_of_The_Great_stupa,_Sanchi_02.jpg",
  "file": "File:Eastern Gateway of The Great stupa, Sanchi 02.jpg"
 },
 "konark": {
  "src": "photo-konark.jpg",
  "author": "Joydeep",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:13th_Century_stone_architectures_at_Konark_Sun_Temple_Puri,_Odisha,_India.jpg",
  "file": "File:13th Century stone architectures at Konark Sun Temple Puri, Odisha, India.jpg"
 },
 "hampi": {
  "src": "photo-hampi.jpg",
  "author": "Ingo Mehling",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hampi_-_Underground_Shive_Temple_-_Columns.jpg",
  "file": "File:Hampi - Underground Shive Temple - Columns.jpg"
 },
 "fatehpur": {
  "src": "photo-fatehpur.jpg",
  "author": "Kshitiz Sikka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Buland_Darwaza_(Fatehpur-Sikri).jpg",
  "file": "File:Buland Darwaza (Fatehpur-Sikri).jpg"
 },
 "redfort": {
  "src": "photo-redfort.jpg",
  "author": "Syed Sajidul Islam",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Red_Fort_-Delhi_-Delhi_-SSI_025.jpg",
  "file": "File:Red Fort -Delhi -Delhi -SSI 025.jpg"
 },
 "kandy": {
  "src": "photo-kandy.jpg",
  "author": "Rashod Korala",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Temple_of_Tooth_relic_in_Kandy,_Sri_Lanka_3.jpg",
  "file": "File:The Temple of Tooth relic in Kandy, Sri Lanka 3.jpg"
 },
 "anuradhapura": {
  "src": "photo-anuradhapura.jpg",
  "author": "Z thomas",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ruwanwelisaya_Stupa_Anuradhapura_2017-10-15_(1).jpg",
  "file": "File:Ruwanwelisaya Stupa Anuradhapura 2017-10-15 (1).jpg"
 },
 "preahvihear": {
  "src": "photo-preahvihear.jpg",
  "author": "PsamatheM",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:03_Prasat_Preah_Vihear-nX-06461.jpg",
  "file": "File:03 Prasat Preah Vihear-nX-06461.jpg"
 },
 "sukhothai": {
  "src": "photo-sukhothai.jpg",
  "author": "This Photo was taken by Supanut Arunoprayote. Feel free to u…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Wat_Mahathat,_Lop_Buri_(III)_-_Pano.jpg",
  "file": "File:Wat Mahathat, Lop Buri (III) - Pano.jpg"
 },
 "malaccatown": {
  "src": "photo-malaccatown.jpg",
  "author": "Marcin Konsek",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:2016_Malakka,_Plac_Holenderski_(05).jpg",
  "file": "File:2016 Malakka, Plac Holenderski (05).jpg"
 },
 "georgetown": {
  "src": "photo-georgetown.jpg",
  "author": "This Photo was taken by Supanut Arunoprayote. Feel free to u…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Penang_High_Court_(II).jpg",
  "file": "File:Penang High Court (II).jpg"
 },
 "kinabalu": {
  "src": "photo-kinabalu.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:St._John%27s_Peak_Mount_Kinabalu_3.jpg",
  "file": "File:St. John's Peak Mount Kinabalu 3.jpg"
 },
 "kakadu": {
  "src": "photo-kakadu.jpg",
  "author": "Dietmar Rabich",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kakadu_(AU),_Kakadu_National_Park,_Ubirr_Rock_Art_--_2019_--_4169.jpg",
  "file": "File:Kakadu (AU), Kakadu National Park, Ubirr Rock Art -- 2019 -- 4169.jpg"
 },
 "sharkbay": {
  "src": "photo-sharkbay.jpg",
  "author": "Donald Hobern from Copenhagen, Denmark",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hamelin_Pool_(26081546618).jpg",
  "file": "File:Hamelin Pool (26081546618).jpg"
 },
 "fraser": {
  "src": "photo-fraser.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Estaci%C3%B3n_de_ferrocarril_de_Fraser,_Columbia_Brit%C3%A1nica,_Canad%C3%A1,_2017-08-26,_DD_77.jpg",
  "file": "File:Estación de ferrocarril de Fraser, Columbia Británica, Canadá, 2017-08-26, DD 77.jpg"
 },
 "tasmania": {
  "src": "photo-tasmania.jpg",
  "author": "Robst56",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cradle_Mountain%E2%80%93Dove_Lake.jpg",
  "file": "File:Cradle Mountain–Dove Lake.jpg"
 },
 "tongariro": {
  "src": "photo-tongariro.jpg",
  "author": "Eusebius",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Le_Ngauruhoe_et_le_Ruapehu_vus_du_sommet_du_Tongariro.jpg",
  "file": "File:Le Ngauruhoe et le Ruapehu vus du sommet du Tongariro.jpg"
 },
 "mesaverde": {
  "src": "photo-mesaverde.jpg",
  "author": "Tobi 87",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cliff_Palace-Colorado-Mesa_Verde_NP.jpg",
  "file": "File:Cliff Palace-Colorado-Mesa Verde NP.jpg"
 },
 "independencehall": {
  "src": "photo-independencehall.jpg",
  "author": "Frank Schulenburg",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Eames_House,_South_Campus_Historic_District_of_Chico,_California.jpg",
  "file": "File:Eames House, South Campus Historic District of Chico, California.jpg"
 },
 "tikal": {
  "src": "photo-tikal.jpg",
  "author": "Gary Todd from Xinzheng, China",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Tikal_Temple_I,_Funerary_Pyramid_of_Hasaw_Chan_K%27awil_(9791198615).jpg",
  "file": "File:Tikal Temple I, Funerary Pyramid of Hasaw Chan K'awil (9791198615).jpg"
 },
 "copan": {
  "src": "photo-copan.jpg",
  "author": "Dennis G. Jarvis",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Honduras-0121_-_Copan_(2214380168).jpg",
  "file": "File:Honduras-0121 - Copan (2214380168).jpg"
 },
 "palenque": {
  "src": "photo-palenque.jpg",
  "author": "Anagoria",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:2013-12-31_Palenque_Temple_of_Inscriptions_anagoria.JPG",
  "file": "File:2013-12-31 Palenque Temple of Inscriptions anagoria.JPG"
 },
 "montealban": {
  "src": "photo-montealban.jpg",
  "author": "nsaum75 !Dígame¡‎",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Monte_Alban_West_Side_Platform.jpg",
  "file": "File:Monte Alban West Side Platform.jpg"
 },
 "puebla": {
  "src": "photo-puebla.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Catedral_de_Puebla,_M%C3%A9xico,_2013-10-11,_DD_08.JPG",
  "file": "File:Catedral de Puebla, México, 2013-10-11, DD 08.JPG"
 },
 "quito": {
  "src": "photo-quito.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Museo_de_la_Catedral_de_Quito,_Quito,_Ecuador,_2015-07-22,_DD_91-93_HDR.JPG",
  "file": "File:Museo de la Catedral de Quito, Quito, Ecuador, 2015-07-22, DD 91-93 HDR.JPG"
 },
 "chanchan": {
  "src": "photo-chanchan.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ba%C3%B1os_de_Ganjali-khan,_Kerman,_Ir%C3%A1n,_2016-09-22,_DD_42.jpg",
  "file": "File:Baños de Ganjali-khan, Kerman, Irán, 2016-09-22, DD 42.jpg"
 },
 "potosi": {
  "src": "photo-potosi.jpg",
  "author": "P. Hughes",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Potosi_-_Street_with_cerro_de_Potosi_in_background.jpg",
  "file": "File:Potosi - Street with cerro de Potosi in background.jpg"
 },
 "salvador": {
  "src": "photo-salvador.jpg",
  "author": "Alvesgaspar",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Elvas_September_2013-31.jpg",
  "file": "File:Elvas September 2013-31.jpg"
 },
 "ouropreto": {
  "src": "photo-ouropreto.jpg",
  "author": "Alvesgaspar",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ouro_Preto_November_2009-13.jpg",
  "file": "File:Ouro Preto November 2009-13.jpg"
 },
 "valparaiso": {
  "src": "photo-valparaiso.jpg",
  "author": "This photo was taken by Roman Bonnefoy ( Romanceor [parlons-…",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Valparaiso_seen_from_top.jpg",
  "file": "File:Valparaiso seen from top.jpg"
 },
 "zanzibar": {
  "src": "photo-zanzibar.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fuerte_Viejo,_Stone_Town,_Zanz%C3%ADbar,_Tanzania,_2024-05-31,_DD_32.jpg",
  "file": "File:Fuerte Viejo, Stone Town, Zanzíbar, Tanzania, 2024-05-31, DD 32.jpg"
 },
 "timbuktu": {
  "src": "photo-timbuktu.jpg",
  "author": "Jeanne Menjoulet from Paris, France",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mali_-_Timbuktu,_the_oldest_of_the_two_mosques_(8441194496).jpg",
  "file": "File:Mali - Timbuktu, the oldest of the two mosques (8441194496).jpg"
 },
 "djenne": {
  "src": "photo-djenne.jpg",
  "author": "BluesyPete",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:MaliDjenn%C3%A9Mosqu%C3%A9e.JPG",
  "file": "File:MaliDjennéMosquée.JPG"
 },
 "fez": {
  "src": "photo-fez.jpg",
  "author": "Bernard Gagnon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Leather_tanning,_Fes.jpg",
  "file": "File:Leather tanning, Fes.jpg"
 },
 "carthage": {
  "src": "photo-carthage.jpg",
  "author": "Варвара Каминская",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ruins_near_Carthage_national_museum,_Tunisia.jpg",
  "file": "File:Ruins near Carthage national museum, Tunisia.jpg"
 },
 "greatzimbabwe": {
  "src": "photo-greatzimbabwe.jpg",
  "author": "Aart Rietveld",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:ASC_Leiden_-_Rietveld_Collection_-_East_Africa_1975_-_05_-_033_-_A_wall_of_the_ruins_of_Great_Zimbabwe_-_Masvingo,_Zimbabwe.jpg",
  "file": "File:ASC Leiden - Rietveld Collection - East Africa 1975 - 05 - 033 - A wall of the ruins of Great Zimbabwe - Masvingo, Zimbabwe.jpg"
 },
 "robben": {
  "src": "photo-robben.jpg",
  "author": "Moheen Reeyad",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:B-Section_courtyard,_Maximum_Security_Prison,_Robben_Island_(02).jpg",
  "file": "File:B-Section courtyard, Maximum Security Prison, Robben Island (02).jpg"
 },
 "axum": {
  "src": "photo-axum.jpg",
  "author": "A. Davey from Where I Live Now: Pacific Northwest",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_North_Stelae_Park,_Axum,_Ethiopia_(2812686646).jpg",
  "file": "File:The North Stelae Park, Axum, Ethiopia (2812686646).jpg"
 },
 "kizhi": {
  "src": "photo-kizhi.jpg",
  "author": "Ludvig14",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:KizhiIsland_008_1125.jpg",
  "file": "File:KizhiIsland 008 1125.jpg"
 },
 "ceskykrumlov": {
  "src": "photo-ceskykrumlov.jpg",
  "author": "Jakub Hałun",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_of_%C4%8Cesk%C3%BD_Krumlov_from_the_castle,_20250504_1305_8880.jpg",
  "file": "File:View of Český Krumlov from the castle, 20250504 1305 8880.jpg"
 },
 "split": {
  "src": "photo-split.jpg",
  "author": "JoJan",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Split_-_Peristyle_002.JPG",
  "file": "File:Split - Peristyle 002.JPG"
 },
 "kotor": {
  "src": "photo-kotor.jpg",
  "author": "Jaakko Luttinen",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:View_over_Kotor_bay_and_old_town.jpg",
  "file": "File:View over Kotor bay and old town.jpg"
 },
 "ohrid": {
  "src": "photo-ohrid.jpg",
  "author": "kallerna",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Church_of_St._John_at_Kaneo_10.jpg",
  "file": "File:Church of St. John at Kaneo 10.jpg"
 },
 "mountathos": {
  "src": "photo-mountathos.jpg",
  "author": "Karayan74",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Simonopetra_Monastery.jpg",
  "file": "File:Simonopetra Monastery.jpg"
 },
 "bern": {
  "src": "photo-bern.jpg",
  "author": "August Geyler",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Altstadt_Bern_(S%C3%BCdostseite).jpg",
  "file": "File:Altstadt Bern (Südostseite).jpg"
 },
 "bryggen": {
  "src": "photo-bryggen.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bryggen,_Bergen,_Noruega,_2019-09-08,_DD_115-117_PAN.jpg",
  "file": "File:Bryggen, Bergen, Noruega, 2019-09-08, DD 115-117 PAN.jpg"
 },
 "kronborg": {
  "src": "photo-kronborg.jpg",
  "author": "ArildV",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kronborg_April_2026_08.jpg",
  "file": "File:Kronborg April 2026 08.jpg"
 },
 "suomenlinna": {
  "src": "photo-suomenlinna.jpg",
  "author": "Ввласенко",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Picnic_in_Suomenlinna._Helsinki,_Finland.jpg",
  "file": "File:Picnic in Suomenlinna. Helsinki, Finland.jpg"
 },
 "thingvellir": {
  "src": "photo-thingvellir.jpg",
  "author": "Diego Delso",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ca%C3%B1%C3%B3n_Silfra,_Parque_Nacional_de_%C3%9Eingvellir,_Su%C3%B0urland,_Islandia,_2014-08-16,_DD_055.JPG",
  "file": "File:Cañón Silfra, Parque Nacional de Þingvellir, Suðurland, Islandia, 2014-08-16, DD 055.JPG"
 },
 "harajo": {
  "src": "photo-harajo.jpg",
  "author": "Kuma83",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:HaraJou01.jpg",
  "file": "File:HaraJou01.jpg"
 },
 "yahata": {
  "src": "photo-yahata.jpg",
  "author": "Kugel~commonswiki",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Higashida_First_Blast_Furnace.JPG",
  "file": "File:Higashida First Blast Furnace.JPG"
 },
 "shotoku": {
  "src": "photo-shotoku.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sh%C5%8Dtoku_Taishi_Sh%C5%8Dmanky%C5%8D_K%C5%8Dsan.jpg",
  "file": "File:Shōtoku Taishi Shōmankyō Kōsan.jpg"
 },
 "murasaki": {
  "src": "photo-murasaki.jpg",
  "author": "Tosa Mitsuoki (1617-1691)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Tosa_Mitsuoki_001.jpg",
  "file": "File:Tosa Mitsuoki 001.jpg"
 },
 "seishonagon": {
  "src": "photo-seishonagon.jpg",
  "author": "Rijksmuseum",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Sei_Sh%C3%B4nagon_(titel_op_object)_Vergelijkingen_met_de_honderd_Ogura_gedichten_(serietitel)_Ogura_nazorae_hyakunin_isshu_(serietitel_op_object),_RP-P-2016-3-6.jpg",
  "file": "File:Sei Shônagon (titel op object) Vergelijkingen met de honderd Ogura gedichten (serietitel) Ogura nazorae hyakunin isshu (serietitel op object), RP-P-2016-3-6.jpg"
 },
 "saicho": {
  "src": "photo-saicho.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%9C%80%E6%BE%84%E5%83%8F_%E4%B8%80%E4%B9%97%E5%AF%BA%E8%94%B5_%E5%B9%B3%E5%AE%89%E6%99%82%E4%BB%A3.jpg",
  "file": "File:最澄像 一乗寺蔵 平安時代.jpg"
 },
 "honen": {
  "src": "photo-honen.jpg",
  "author": "Fujiwara, Takanobu (1142-1205)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Takanobu-no-miei.jpg",
  "file": "File:Takanobu-no-miei.jpg"
 },
 "nichiren": {
  "src": "photo-nichiren.jpg",
  "author": "Fujiwara-no Chikayasu",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Nichiren_Daishonin_Hakii_Portrait.jpg",
  "file": "File:Nichiren Daishonin Hakii Portrait.jpg"
 },
 "shingen": {
  "src": "photo-shingen.jpg",
  "author": "Unknown",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Takeda_Harunobu.jpg",
  "file": "File:Takeda Harunobu.jpg"
 },
 "basho": {
  "src": "photo-basho.jpg",
  "author": "Morikawa Kyoriku (1656-1715)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Basho_by_Morikawa_Kyoriku_(1656-1715).jpg",
  "file": "File:Basho by Morikawa Kyoriku (1656-1715).jpg"
 },
 "musashi": {
  "src": "photo-musashi.jpg",
  "author": "Miyamoto Musashi",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Miyamoto_Musashi_Self-Portrait.jpg",
  "file": "File:Miyamoto Musashi Self-Portrait.jpg"
 },
 "kaishu": {
  "src": "photo-kaishu.jpg",
  "author": "published by 東洋文化協會 (The Eastern Culture Association)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kaishu_Katsu_2.jpg",
  "file": "File:Kaishu Katsu 2.jpg"
 },
 "hokusai": {
  "src": "photo-hokusai.jpg",
  "author": "Katsushika Hokusai",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hokusai_portrait.jpg",
  "file": "File:Hokusai portrait.jpg"
 },
 "ryoma": {
  "src": "photo-ryoma.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sakamoto_Ryoma.jpg",
  "file": "File:Sakamoto Ryoma.jpg"
 },
 "okubo": {
  "src": "photo-okubo.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Toshimichi_Okubo_4.jpg",
  "file": "File:Toshimichi Okubo 4.jpg"
 },
 "shoin": {
  "src": "photo-shoin.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Yoshida_Shoin2.jpg",
  "file": "File:Yoshida Shoin2.jpg"
 },
 "rikyu": {
  "src": "photo-rikyu.jpg",
  "author": "painted by 長谷川等伯, calligraphy by 春屋宗園",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sen_no_Rikyu_JPN.jpg",
  "file": "File:Sen no Rikyu JPN.jpg"
 },
 "soseki": {
  "src": "photo-soseki.jpg",
  "author": "Ogawa Kazumasa",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Natsume_Soseki_photo.jpg",
  "file": "File:Natsume Soseki photo.jpg"
 },
 "ikkyu": {
  "src": "photo-ikkyu.jpg",
  "author": "Bokusai",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_Ikky%C5%AB_by_Bokusai.jpg",
  "file": "File:Portrait of Ikkyū by Bokusai.jpg"
 },
 "shibusawa": {
  "src": "photo-shibusawa.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Eiichi_Shibusawa.jpg",
  "file": "File:Eiichi Shibusawa.jpg"
 },
 "noguchi": {
  "src": "photo-noguchi.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Noguchi_Hideyo.jpg",
  "file": "File:Noguchi Hideyo.jpg"
 },
 "buson": {
  "src": "photo-buson.jpg",
  "author": "Matsumura Goshun",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Yosa_Buson.jpg",
  "file": "File:Yosa Buson.jpg"
 },
 "issa": {
  "src": "photo-issa.jpg",
  "author": "Yoshi Canopus",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kobayashi_Issa-Portrait.jpg",
  "file": "File:Kobayashi Issa-Portrait.jpg"
 },
 "sontoku": {
  "src": "photo-sontoku.jpg",
  "author": "岡本秋暉（（1807-1862）",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ninomiya-Sontoku.jpg",
  "file": "File:Ninomiya-Sontoku.jpg"
 },
 "saigo": {
  "src": "photo-saigo.jpg",
  "author": "Ishikawa Shizumasa (1848-1925)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Saigo_Takamori_Portrait_by_Ishikawa_Shizumasa.jpg",
  "file": "File:Saigo Takamori Portrait by Ishikawa Shizumasa.jpg"
 },
 "shinsaku": {
  "src": "photo-shinsaku.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Takasugi_Sinsaku.jpg",
  "file": "File:Takasugi Sinsaku.jpg"
 },
 "fukuzawa": {
  "src": "photo-fukuzawa.jpg",
  "author": "Fukuzawa Research Center",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Fukuzawa_Yukichi_1891.jpg",
  "file": "File:Fukuzawa Yukichi 1891.jpg"
 },
 "nitobe": {
  "src": "photo-nitobe.jpg",
  "author": "Auguste Léon",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Monsieur_Inaz%C5%8D_Nitobe.jpg",
  "file": "File:Monsieur Inazō Nitobe.jpg"
 },
 "kitasato": {
  "src": "photo-kitasato.jpg",
  "author": "北里研究所",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Shibasabur%C5%8D_Kitasato_1910.jpg",
  "file": "File:Shibasaburō Kitasato 1910.jpg"
 },
 "kenji": {
  "src": "photo-kenji.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Miyazawa_Kenji.jpg",
  "file": "File:Miyazawa Kenji.jpg"
 },
 "dazai": {
  "src": "photo-dazai.jpg",
  "author": "Shigeru Tamura",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Osamu_Dazai.jpg",
  "file": "File:Osamu Dazai.jpg"
 },
 "akutagawa": {
  "src": "photo-akutagawa.jpg",
  "author": "- The person in the photo is Ryunosuke Akutagawa.",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:AkutagawaRyunosuke.jpg",
  "file": "File:AkutagawaRyunosuke.jpg"
 },
 "takuboku": {
  "src": "photo-takuboku.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Takuboku_Ishikawa.jpg",
  "file": "File:Takuboku Ishikawa.jpg"
 },
 "shiki": {
  "src": "photo-shiki.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Masaoka_Shiki.jpg",
  "file": "File:Masaoka Shiki.jpg"
 },
 "akiko": {
  "src": "photo-akiko.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Akiko_Yosano_younger.jpg",
  "file": "File:Akiko Yosano younger.jpg"
 },
 "kawabata": {
  "src": "photo-kawabata.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Yasunari_Kawabata_1938.jpg",
  "file": "File:Yasunari Kawabata 1938.jpg"
 },
 "matsushita": {
  "src": "photo-matsushita.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Konosuke_Matsushita_01.jpg",
  "file": "File:Konosuke Matsushita 01.jpg"
 },
 "honda": {
  "src": "photo-honda.jpg",
  "author": "朝日新聞社",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Asahigraph-1955-Shinshun-1.jpg",
  "file": "File:Asahigraph-1955-Shinshun-1.jpg"
 },
 "tezuka": {
  "src": "photo-tezuka.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Osamu_Tezuka_1951_Scan10008-2.JPG",
  "file": "File:Osamu Tezuka 1951 Scan10008-2.JPG"
 },
 "kurosawa": {
  "src": "photo-kurosawa.jpg",
  "author": "キネマ旬報社",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kinema-Junpo-1960-December-Special-1.jpg",
  "file": "File:Kinema-Junpo-1960-December-Special-1.jpg"
 },
 "yukawa": {
  "src": "photo-yukawa.jpg",
  "author": "Nobel Foundation archive",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Yukawa.jpg",
  "file": "File:Yukawa.jpg"
 },
 "kano": {
  "src": "photo-kano.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_late_Mr._Kano.jpg",
  "file": "File:Portrait of late Mr. Kano.jpg"
 },
 "okamoto": {
  "src": "photo-okamoto.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Tar%C5%8D_Okamoto.jpg",
  "file": "File:Tarō Okamoto.jpg"
 },
 "sugihara": {
  "src": "photo-sugihara.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sugihara_b.jpg",
  "file": "File:Sugihara b.jpg"
 },
 "niijima": {
  "src": "photo-niijima.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Niijima_Jo.jpg",
  "file": "File:Niijima Jo.jpg"
 },
 "uchimura": {
  "src": "photo-uchimura.jpg",
  "author": "益本重雄, 藤沢音吉",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Uchimura_Kanzo.jpg",
  "file": "File:Uchimura Kanzo.jpg"
 },
 "itagaki": {
  "src": "photo-itagaki.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:ITAGAKI_Taisuke.jpg",
  "file": "File:ITAGAKI Taisuke.jpg"
 },
 "ito": {
  "src": "photo-ito.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:IT%C5%8C_Hirobumi.jpg",
  "file": "File:ITŌ Hirobumi.jpg"
 },
 "okuma": {
  "src": "photo-okuma.jpg",
  "author": "Photographer working for the government of Japan",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Shigenobu_Okuma_5.jpg",
  "file": "File:Shigenobu Okuma 5.jpg"
 },
 "ogata": {
  "src": "photo-ogata.jpg",
  "author": "Painted by Goseda Yoshimatsu",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Koan_Ogata_1901.jpg",
  "file": "File:Koan Ogata 1901.jpg"
 },
 "shirasu": {
  "src": "photo-shirasu.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Jir%C5%8D_Shirasu.jpg",
  "file": "File:Jirō Shirasu.jpg"
 },
 "kotaro": {
  "src": "photo-kotaro.jpg",
  "author": "Shigeru Tamura",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kotaro_Takamura_by_Shigeru_Tamura.jpg",
  "file": "File:Kotaro Takamura by Shigeru Tamura.jpg"
 },
 "maejima": {
  "src": "photo-maejima.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Maejima_Hisoka_1.jpg",
  "file": "File:Maejima Hisoka 1.jpg"
 },
 "hijikata": {
  "src": "photo-hijikata.jpg",
  "author": "Tamoto Kenzō",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hijikata_Toshizo.jpg",
  "file": "File:Hijikata Toshizo.jpg"
 },
 "yozan": {
  "src": "photo-yozan.jpg",
  "author": "不明。",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E4%B8%8A%E6%9D%89%E9%B7%B9%E5%B1%B1.jpg",
  "file": "File:上杉鷹山.jpg"
 },
 "shozan": {
  "src": "photo-shozan.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sakuma_Shozan.jpg",
  "file": "File:Sakuma Shozan.jpg"
 },
 "isoroku": {
  "src": "photo-isoroku.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_Yamamoto_Isoroku.jpg",
  "file": "File:Portrait of Yamamoto Isoroku.jpg"
 },
 "togo": {
  "src": "photo-togo.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:T%C5%8Dg%C5%8D_Heihachir%C5%8D.jpg",
  "file": "File:Tōgō Heihachirō.jpg"
 },
 "raicho": {
  "src": "photo-raicho.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Raicho_Hiratsuka.jpg",
  "file": "File:Raicho Hiratsuka.jpg"
 },
 "ibuka": {
  "src": "photo-ibuka.jpg",
  "author": "中日新聞社",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Chunichi1966-01-17-1.jpg",
  "file": "File:Chunichi1966-01-17-1.jpg"
 },
 "komachi": {
  "src": "photo-komachi.jpg",
  "author": "Suzuki Harunobu",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Suzuki_Harunobu_-_The_Poetess_Ono_no_Komachi_-_1925.2046_-_Art_Institute_of_Chicago.jpg",
  "file": "File:Suzuki Harunobu - The Poetess Ono no Komachi - 1925.2046 - Art Institute of Chicago.jpg"
 },
 "michizane": {
  "src": "photo-michizane.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%9D%9F%E5%B8%AF%E5%A4%A9%E7%A5%9E%E5%83%8F.png",
  "file": "File:束帯天神像.png"
 },
 "michinaga": {
  "src": "photo-michinaga.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Fujiwara_no_Michinaga_2.jpg",
  "file": "File:Fujiwara no Michinaga 2.jpg"
 },
 "saigyo": {
  "src": "photo-saigyo.jpg",
  "author": "Unknown",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:PORTRAIT_OF_THE_PRIEST-POET_SAIGYO_-_Google_Art_Project.jpg",
  "file": "File:PORTRAIT OF THE PRIEST-POET SAIGYO - Google Art Project.jpg"
 },
 "chomei": {
  "src": "photo-chomei.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kamo_no_Chomei.jpg",
  "file": "File:Kamo no Chomei.jpg"
 },
 "kenko": {
  "src": "photo-kenko.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Yoshida_Kenko.jpg",
  "file": "File:Yoshida Kenko.jpg"
 },
 "nakamaro": {
  "src": "photo-nakamaro.jpg",
  "author": "Kikuchi Yosai（菊池容斎）",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Abeno_Nakamaro.jpg",
  "file": "File:Abeno Nakamaro.jpg"
 },
 "masashige": {
  "src": "photo-masashige.jpg",
  "author": "Kanō Sanraku",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kusunoki_Masashige.jpg",
  "file": "File:Kusunoki Masashige.jpg"
 },
 "kanbei": {
  "src": "photo-kanbei.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Yoshitaka_Kuroda.jpg",
  "file": "File:Yoshitaka Kuroda.jpg"
 },
 "kuranosuke": {
  "src": "photo-kuranosuke.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%C5%8Cishi_Yoshio.jpg",
  "file": "File:Ōishi Yoshio.jpg"
 },
 "norinaga": {
  "src": "photo-norinaga.jpg",
  "author": "Hannah",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%9C%AC%E5%B1%85%E5%AE%A3%E9%95%B702.jpg",
  "file": "File:本居宣長02.jpg"
 },
 "kaibara": {
  "src": "photo-kaibara.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait-Kaibara-Ekiken-(cropped)-c1700.png",
  "file": "File:Portrait-Kaibara-Ekiken-(cropped)-c1700.png"
 },
 "nishida": {
  "src": "photo-nishida.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait-of-Kitaro-Nishida.png",
  "file": "File:Portrait-of-Kitaro-Nishida.png"
 },
 "nakamura": {
  "src": "photo-nakamura.jpg",
  "author": "在アフガニスタン日本国大使館",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tetsu_Nakamura_cropped_2_Mitsuji_Suzuka_and_Tetsu_Nakamura_20161117.jpg",
  "file": "File:Tetsu Nakamura cropped 2 Mitsuji Suzuka and Tetsu Nakamura 20161117.jpg"
 },
 "ogatasadako": {
  "src": "photo-ogatasadako.jpg",
  "author": "World Economic Forum",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sadako_Ogata_-_World_Economic_Forum_on_Africa_2008.jpg",
  "file": "File:Sadako Ogata - World Economic Forum on Africa 2008.jpg"
 },
 "tenshin": {
  "src": "photo-tenshin.jpg",
  "author": "Unknown",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Okakura_Kakuzo_Portrait_c1905.png",
  "file": "File:Okakura Kakuzo Portrait c1905.png"
 },
 "davinci": {
  "src": "photo-davinci.jpg",
  "author": "Leonardo da Vinci",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg",
  "file": "File:Leonardo da Vinci - presumed self-portrait - WGA12798.jpg"
 },
 "einstein": {
  "src": "photo-einstein.jpg",
  "author": "International News Service",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Albert_Einstein_sticks_his_tongue.jpg",
  "file": "File:Albert Einstein sticks his tongue.jpg"
 },
 "edison": {
  "src": "photo-edison.jpg",
  "author": "Louis Bachrach, Bachrach Studios, restored by Michel Vuijlst…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Thomas_Edison2.jpg",
  "file": "File:Thomas Edison2.jpg"
 },
 "nightingale": {
  "src": "photo-nightingale.jpg",
  "author": "H. Lenthall, London",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Florence_Nightingale_CDV_by_H_Lenthall.jpg",
  "file": "File:Florence Nightingale CDV by H Lenthall.jpg"
 },
 "gandhi": {
  "src": "photo-gandhi.jpg",
  "author": "Elliott & Fry",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mahatma-Gandhi,_studio,_1931.jpg",
  "file": "File:Mahatma-Gandhi, studio, 1931.jpg"
 },
 "mlk": {
  "src": "photo-mlk.jpg",
  "author": "Bernie Faingold",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Martin_Luther_King,_Jr..jpg",
  "file": "File:Martin Luther King, Jr..jpg"
 },
 "lincoln": {
  "src": "photo-lincoln.jpg",
  "author": "Alexander Gardner",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  "file": "File:Abraham Lincoln O-77 matte collodion print.jpg"
 },
 "keller": {
  "src": "photo-keller.jpg",
  "author": "Los Angeles Times; restored by User:Rhododendrites",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Helen_Keller_circa_1920_-_restored.jpg",
  "file": "File:Helen Keller circa 1920 - restored.jpg"
 },
 "beethoven": {
  "src": "photo-beethoven.jpg",
  "author": "Joseph Karl Stieler",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg",
  "file": "File:Joseph Karl Stieler's Beethoven mit dem Manuskript der Missa solemnis.jpg"
 },
 "mozart": {
  "src": "photo-mozart.jpg",
  "author": "Barbara Krafft",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Wolfgang-amadeus-mozart_1.jpg",
  "file": "File:Wolfgang-amadeus-mozart 1.jpg"
 },
 "newton": {
  "src": "photo-newton.jpg",
  "author": "Godfrey Kneller",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_Sir_Isaac_Newton,_1689_(brightened).jpg",
  "file": "File:Portrait of Sir Isaac Newton, 1689 (brightened).jpg"
 },
 "galileo": {
  "src": "photo-galileo.jpg",
  "author": "Justus Sustermans",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Justus_Sustermans_-_Portrait_of_Galileo_Galilei_(Uffizi).jpg",
  "file": "File:Justus Sustermans - Portrait of Galileo Galilei (Uffizi).jpg"
 },
 "shakespeare": {
  "src": "photo-shakespeare.jpg",
  "author": "Attributed to John Taylor",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Shakespeare.jpg",
  "file": "File:Shakespeare.jpg"
 },
 "picasso": {
  "src": "photo-picasso.jpg",
  "author": "Argentina. Revista Vea y Lea",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pablo_picasso_1.jpg",
  "file": "File:Pablo picasso 1.jpg"
 },
 "gogh": {
  "src": "photo-gogh.jpg",
  "author": "Vincent van Gogh",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:VanGogh_1887_Selbstbildnis.jpg",
  "file": "File:VanGogh 1887 Selbstbildnis.jpg"
 },
 "monet": {
  "src": "photo-monet.jpg",
  "author": "Nadar",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_1899_Nadar.jpg",
  "file": "File:Claude Monet 1899 Nadar.jpg"
 },
 "napoleon": {
  "src": "photo-napoleon.jpg",
  "author": "Workshop of François Gérard",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Fran%C3%A7ois_G%C3%A9rard_-_Napoleon_I_001.JPG",
  "file": "File:François Gérard - Napoleon I 001.JPG"
 },
 "jeanne": {
  "src": "photo-jeanne.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Joan_of_Arc_miniature_graded.jpg",
  "file": "File:Joan of Arc miniature graded.jpg"
 },
 "curie": {
  "src": "photo-curie.jpg",
  "author": "Henri Manuel",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Marie_Curie_c._1920s.jpg",
  "file": "File:Marie Curie c. 1920s.jpg"
 },
 "anne": {
  "src": "photo-anne.jpg",
  "author": "Photo Collection Anne Frank House",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Anne_Frank,_1942.jpg",
  "file": "File:Anne Frank, 1942.jpg"
 },
 "teresa": {
  "src": "photo-teresa.jpg",
  "author": "Túrelio",
  "license": "CC BY-SA 2.0 DE",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:MotherTeresa_090.jpg",
  "file": "File:MotherTeresa 090.jpg"
 },
 "franklin": {
  "src": "photo-franklin.jpg",
  "author": "After Joseph-Siffred Duplessis",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:BenFranklinDuplessis.jpg",
  "file": "File:BenFranklinDuplessis.jpg"
 },
 "socrates": {
  "src": "photo-socrates.jpg",
  "author": "Copy of Lysippos (?)",
  "license": "CC BY-SA 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Socrate_du_Louvre.jpg",
  "file": "File:Socrate du Louvre.jpg"
 },
 "plato": {
  "src": "photo-plato.jpg",
  "author": "Unknown artistUnknown artist",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Plato_Pio-Clemetino_Inv305.jpg",
  "file": "File:Plato Pio-Clemetino Inv305.jpg"
 },
 "aristotle": {
  "src": "photo-aristotle.jpg",
  "author": "After Lysippos",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg",
  "file": "File:Aristotle Altemps Inv8575.jpg"
 },
 "laozi": {
  "src": "photo-laozi.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lao-Tzu_on_his_buffalo,_followed_by_a_disciple.jpg",
  "file": "File:Lao-Tzu on his buffalo, followed by a disciple.jpg"
 },
 "buddha": {
  "src": "photo-buddha.jpg",
  "author": "พระมหาเทวประภาส วชิรญาณเมธี (ผู้ถ่าย-ปล่อยสัญญาอนุญาตภาพให้น…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Buddha_in_Sarnath_Museum_(Dhammajak_Mutra).jpg",
  "file": "File:Buddha in Sarnath Museum (Dhammajak Mutra).jpg"
 },
 "caesar": {
  "src": "photo-caesar.jpg",
  "author": "Nicolas Coustou",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Julius_Caesar_Coustou_Louvre_MR1798.jpg",
  "file": "File:Julius Caesar Coustou Louvre MR1798.jpg"
 },
 "marcopolo": {
  "src": "photo-marcopolo.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Marco_Polo_portrait.jpg",
  "file": "File:Marco Polo portrait.jpg"
 },
 "michelangelo": {
  "src": "photo-michelangelo.jpg",
  "author": "Attributed to Daniele da Volterra",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Miguel_%C3%81ngel,_por_Daniele_da_Volterra_(detalle).jpg",
  "file": "File:Miguel Ángel, por Daniele da Volterra (detalle).jpg"
 },
 "darwin": {
  "src": "photo-darwin.jpg",
  "author": "Leonard Darwin",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:1878_Darwin_photo_by_Leonard_from_Woodall_1884.jpg",
  "file": "File:1878 Darwin photo by Leonard from Woodall 1884.jpg"
 },
 "pasteur": {
  "src": "photo-pasteur.jpg",
  "author": "Paul Nadar",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Louis_Pasteur,_foto_av_Paul_Nadar,_Crisco_edit.jpg",
  "file": "File:Louis Pasteur, foto av Paul Nadar, Crisco edit.jpg"
 },
 "nobel": {
  "src": "photo-nobel.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:AlfredNobel2.jpg",
  "file": "File:AlfredNobel2.jpg"
 },
 "bell": {
  "src": "photo-bell.jpg",
  "author": "Moffett Studio",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Alexander_Graham_Bell.jpg",
  "file": "File:Alexander Graham Bell.jpg"
 },
 "ford": {
  "src": "photo-ford.jpg",
  "author": "Fred Hartsook",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Henry_ford_1919.jpg",
  "file": "File:Henry ford 1919.jpg"
 },
 "jobs": {
  "src": "photo-jobs.jpg",
  "author": "Matthew Yohe",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Steve_Jobs_Headshot_2010_(cropped_4).jpg",
  "file": "File:Steve Jobs Headshot 2010 (cropped 4).jpg"
 },
 "disney": {
  "src": "photo-disney.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Walt_disney_portrait.jpg",
  "file": "File:Walt disney portrait.jpg"
 },
 "chaplin": {
  "src": "photo-chaplin.jpg",
  "author": "Strauss-Peyton Studio",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Charlie_Chaplin_portrait_Getty_1739411952.jpg",
  "file": "File:Charlie Chaplin portrait Getty 1739411952.jpg"
 },
 "hepburn": {
  "src": "photo-hepburn.jpg",
  "author": "Bud Fraker (1916-2002) [1]",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:AudreyKHepburn.jpg",
  "file": "File:AudreyKHepburn.jpg"
 },
 "armstrong": {
  "src": "photo-armstrong.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Neil_Armstrong_pose.jpg",
  "file": "File:Neil Armstrong pose.jpg"
 },
 "gagarin": {
  "src": "photo-gagarin.jpg",
  "author": "Александр Моклецов / СовИнформБюро",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yuri_Gagarin_with_awards.jpg",
  "file": "File:Yuri Gagarin with awards.jpg"
 },
 "tesla": {
  "src": "photo-tesla.jpg",
  "author": "Napoleon Sarony",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Tesla_circa_1890.jpeg",
  "file": "File:Tesla circa 1890.jpeg"
 },
 "ruth": {
  "src": "photo-ruth.jpg",
  "author": "Paul Thompson, NY",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Babe_Ruth_circa_1920.jpg",
  "file": "File:Babe Ruth circa 1920.jpg"
 },
 "pele": {
  "src": "photo-pele.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pele_con_brasil_(cropped).jpg",
  "file": "File:Pele con brasil (cropped).jpg"
 },
 "ali": {
  "src": "photo-ali.jpg",
  "author": "Ira Rosenberg",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Muhammad_Ali_NYWTS.jpg",
  "file": "File:Muhammad Ali NYWTS.jpg"
 },
 "goethe": {
  "src": "photo-goethe.jpg",
  "author": "Joseph Karl Stieler",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Goethe_(Stieler_1828).jpg",
  "file": "File:Goethe (Stieler 1828).jpg"
 },
 "andersen": {
  "src": "photo-andersen.jpg",
  "author": "Thora Hallager",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hans_Christian_Andersen_by_Thora_Hallager_1869.jpg",
  "file": "File:Hans Christian Andersen by Thora Hallager 1869.jpg"
 },
 "dostoevsky": {
  "src": "photo-dostoevsky.jpg",
  "author": "Vasily Perov",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg",
  "file": "File:Vasily Perov - Портрет Ф.М.Достоевского - Google Art Project.jpg"
 },
 "hemingway": {
  "src": "photo-hemingway.jpg",
  "author": "Lloyd Arnold",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:ErnestHemingway.jpg",
  "file": "File:ErnestHemingway.jpg"
 },
 "hugo": {
  "src": "photo-hugo.jpg",
  "author": "Étienne Carjat",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg",
  "file": "File:Victor Hugo by Étienne Carjat 1876 - full.jpg"
 },
 "dante": {
  "src": "photo-dante.jpg",
  "author": "Sandro Botticelli",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_de_Dante.jpg",
  "file": "File:Portrait de Dante.jpg"
 },
 "cervantes": {
  "src": "photo-cervantes.jpg",
  "author": "Attributed to Juan de Jáuregui",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Cervantes_J%C3%A1uregui.jpg",
  "file": "File:Cervantes Jáuregui.jpg"
 },
 "twain": {
  "src": "photo-twain.jpg",
  "author": "A.F. Bradley, New York",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mark_Twain_by_AF_Bradley.jpg",
  "file": "File:Mark Twain by AF Bradley.jpg"
 },
 "dickens": {
  "src": "photo-dickens.jpg",
  "author": "Jeremiah Gurney",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Dickens_Gurney_head.jpg",
  "file": "File:Dickens Gurney head.jpg"
 },
 "bach": {
  "src": "photo-bach.jpg",
  "author": "Elias Gottlob Haussmann",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Johann_Sebastian_Bach.jpg",
  "file": "File:Johann Sebastian Bach.jpg"
 },
 "lennon": {
  "src": "photo-lennon.jpg",
  "author": "Tony Barnard, Los Angeles Times",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:John_Lennon,_1974_(restored_cropped).jpg",
  "file": "File:John Lennon, 1974 (restored cropped).jpg"
 },
 "mandela": {
  "src": "photo-mandela.jpg",
  "author": "Kingkongphoto & www.celebrity-photos.com from Laurel",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nelson_Mandela_1994.jpg",
  "file": "File:Nelson Mandela 1994.jpg"
 },
 "churchill": {
  "src": "photo-churchill.jpg",
  "author": "Yousuf Karsh",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sir_Winston_Churchill_-_19086236948.jpg",
  "file": "File:Sir Winston Churchill - 19086236948.jpg"
 },
 "kennedy": {
  "src": "photo-kennedy.jpg",
  "author": "Cecil W. Stoughton",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:John_F._Kennedy,_White_House_color_photo_portrait.jpg",
  "file": "File:John F. Kennedy, White House color photo portrait.jpg"
 },
 "gwashington": {
  "src": "photo-gwashington.jpg",
  "author": "Gilbert Stuart",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gilbert_Stuart_Williamstown_Portrait_of_George_Washington_(cropped)(2).jpg",
  "file": "File:Gilbert Stuart Williamstown Portrait of George Washington (cropped)(2).jpg"
 },
 "elizabeth1": {
  "src": "photo-elizabeth1.jpg",
  "author": "Unidentified painter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Darnley_stage_3.jpg",
  "file": "File:Darnley stage 3.jpg"
 },
 "antoinette": {
  "src": "photo-antoinette.jpg",
  "author": "Élisabeth Louise Vigée Le Brun",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Vig%C3%A9e-Lebrun_Marie_Antoinette_1783.jpg",
  "file": "File:Vigée-Lebrun Marie Antoinette 1783.jpg"
 },
 "louis14": {
  "src": "photo-louis14.jpg",
  "author": "Hyacinthe Rigaud",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Louis_XIV_of_France.jpg",
  "file": "File:Louis XIV of France.jpg"
 },
 "hippocrates": {
  "src": "photo-hippocrates.jpg",
  "author": "Paulus Pontius / After Peter Paul Rubens",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hippocrates_rubens.jpg",
  "file": "File:Hippocrates rubens.jpg"
 },
 "archimedes": {
  "src": "photo-archimedes.jpg",
  "author": "Domenico Fetti",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Retrato_de_un_erudito_(%C2%BFArqu%C3%ADmedes%3F),_por_Domenico_Fetti.jpg",
  "file": "File:Retrato de un erudito (¿Arquímedes?), por Domenico Fetti.jpg"
 },
 "pythagoras": {
  "src": "photo-pythagoras.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pythagoras_in_the_Roman_Forum,_Colosseum.jpg",
  "file": "File:Pythagoras in the Roman Forum, Colosseum.jpg"
 },
 "schweitzer": {
  "src": "photo-schweitzer.jpg",
  "author": "UnknownUnknown",
  "license": "CC BY-SA 3.0 DE",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-D0116-0041-019,_Albert_Schweitzer.jpg",
  "file": "File:Bundesarchiv Bild 183-D0116-0041-019, Albert Schweitzer.jpg"
 },
 "parks": {
  "src": "photo-parks.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Rosa_Parks,_November_1956_(cropped).jpg",
  "file": "File:Rosa Parks, November 1956 (cropped).jpg"
 },
 "mendel": {
  "src": "photo-mendel.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gregor_Mendel_2.jpg",
  "file": "File:Gregor Mendel 2.jpg"
 },
 "fleming": {
  "src": "photo-fleming.jpg",
  "author": "Official photographer",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Synthetic_Production_of_Penicillin_TR1468.jpg",
  "file": "File:Synthetic Production of Penicillin TR1468.jpg"
 },
 "freud": {
  "src": "photo-freud.jpg",
  "author": "Max Halberstadt",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sigmund_Freud,_by_Max_Halberstadt_(cropped).jpg",
  "file": "File:Sigmund Freud, by Max Halberstadt (cropped).jpg"
 },
 "descartes": {
  "src": "photo-descartes.jpg",
  "author": "After Frans Hals",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
  "file": "File:Frans Hals - Portret van René Descartes.jpg"
 },
 "pascal": {
  "src": "photo-pascal.jpg",
  "author": "unknown; a copy of the painting of François II Quesnel, whic…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Blaise_Pascal_Versailles.JPG",
  "file": "File:Blaise Pascal Versailles.JPG"
 },
 "kant": {
  "src": "photo-kant.jpg",
  "author": "Johann Gottlieb Becker (1720-1782)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Immanuel_Kant_-_Gemaelde_1.jpg",
  "file": "File:Immanuel Kant - Gemaelde 1.jpg"
 },
 "nietzsche": {
  "src": "photo-nietzsche.jpg",
  "author": "Gustav-Adolf Schultze (d. 1897)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Nietzsche1882.jpg",
  "file": "File:Nietzsche1882.jpg"
 },
 "rousseau": {
  "src": "photo-rousseau.jpg",
  "author": "Maurice Quentin de La Tour",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_WGA12360.jpg",
  "file": "File:Maurice Quentin de La Tour - Portrait of Jean-Jacques Rousseau - WGA12360.jpg"
 },
 "voltaire": {
  "src": "photo-voltaire.jpg",
  "author": "Nicolas de Largillière",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Atelier_de_Nicolas_de_Largilli%C3%A8re,_portrait_de_Voltaire,_d%C3%A9tail_(mus%C3%A9e_Carnavalet)_-002.jpg",
  "file": "File:Atelier de Nicolas de Largillière, portrait de Voltaire, détail (musée Carnavalet) -002.jpg"
 },
 "machiavelli": {
  "src": "photo-machiavelli.jpg",
  "author": "Santi di Tito",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg",
  "file": "File:Portrait of Niccolò Machiavelli by Santi di Tito.jpg"
 },
 "smith": {
  "src": "photo-smith.jpg",
  "author": "Etching created by Cadell and Davies (1811), John Horsburgh …",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:AdamSmith.jpg",
  "file": "File:AdamSmith.jpg"
 },
 "jefferson": {
  "src": "photo-jefferson.jpg",
  "author": "Rembrandt Peale",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Official_Presidential_portrait_of_Thomas_Jefferson_(by_Rembrandt_Peale,_1800).jpg",
  "file": "File:Official Presidential portrait of Thomas Jefferson (by Rembrandt Peale, 1800).jpg"
 },
 "gaudi": {
  "src": "photo-gaudi.jpg",
  "author": "Pau Audouard Deglaire",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Antoni_Gaudi_1878.jpg",
  "file": "File:Antoni Gaudi 1878.jpg"
 },
 "renoir": {
  "src": "photo-renoir.jpg",
  "author": "UnknownUnknown Musée d'Orsay, Dist. RMN-Grand Palais / Patri…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pierre_Auguste_Renoir,_uncropped_image.jpg",
  "file": "File:Pierre Auguste Renoir, uncropped image.jpg"
 },
 "cezanne": {
  "src": "photo-cezanne.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Paul_C%C3%A9zanne.jpg",
  "file": "File:Paul Cézanne.jpg"
 },
 "doyle": {
  "src": "photo-doyle.jpg",
  "author": "Walter Benington",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Arthur_Conan_Doyle_by_Walter_Benington,_1914.png",
  "file": "File:Arthur Conan Doyle by Walter Benington, 1914.png"
 },
 "carroll": {
  "src": "photo-carroll.jpg",
  "author": "Lewis Carroll",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:LewisCarrollSelfPhoto.jpg",
  "file": "File:LewisCarrollSelfPhoto.jpg"
 },
 "verne": {
  "src": "photo-verne.jpg",
  "author": "Nadar",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Nadar_1820-1910_portraits_Jules_Verne.jpg",
  "file": "File:Félix Nadar 1820-1910 portraits Jules Verne.jpg"
 },
 "hawking": {
  "src": "photo-hawking.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Stephen_Hawking.StarChild.jpg",
  "file": "File:Stephen Hawking.StarChild.jpg"
 },
 "chanel": {
  "src": "photo-chanel.jpg",
  "author": "Los Angeles Times",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Coco_Chanel_in_Los_Angeles,_1931_(cropped).jpg",
  "file": "File:Coco Chanel in Los Angeles, 1931 (cropped).jpg"
 },
 "earhart": {
  "src": "photo-earhart.jpg",
  "author": "Copyright by Underwood and Underwood (not renewed)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Earhart.jpg",
  "file": "File:Earhart.jpg"
 },
 "sunyatsen": {
  "src": "photo-sunyatsen.jpg",
  "author": "上海波尔照相馆",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E5%AD%99%E4%B8%AD%E5%B1%B1%E8%82%96%E5%83%8F.jpg",
  "file": "File:孙中山肖像.jpg"
 },
 "zhugeliang": {
  "src": "photo-zhugeliang.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%98%8E%E4%BA%BA%E7%BB%98_%E3%80%8A%E8%AF%B8%E8%91%9B%E4%BA%AE%E5%83%8F%E3%80%8B%EF%BC%88%E5%8D%97%E8%96%B0%E6%AE%BF%E6%9C%AC%EF%BC%89.jpg",
  "file": "File:明人绘 《诸葛亮像》（南薰殿本）.jpg"
 },
 "sunzi": {
  "src": "photo-sunzi.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E5%90%B4%E5%8F%B8%E9%A9%AC%E5%AD%99%E6%AD%A6.jpg",
  "file": "File:吴司马孙武.jpg"
 },
 "sejong": {
  "src": "photo-sejong.jpg",
  "author": "Republic of Korea from Seoul, Republic of Korea",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Korea_Yeouido_Summer_20140805_11_(14862134703).jpg",
  "file": "File:Korea Yeouido Summer 20140805 11 (14862134703).jpg"
 },
 "tagore": {
  "src": "photo-tagore.jpg",
  "author": "Generalstabens litografiska anstalt",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Rabindranath_Tagore_in_1909.jpg",
  "file": "File:Rabindranath Tagore in 1909.jpg"
 },
 "kukai": {
  "src": "photo-kukai.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_K%C5%8Db%C5%8D_Daishi.jpg",
  "file": "File:Portrait of Kōbō Daishi.jpg"
 },
 "shinran": {
  "src": "photo-shinran.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Shinran_Shonin.jpg",
  "file": "File:Shinran Shonin.jpg"
 },
 "nobunaga": {
  "src": "photo-nobunaga.jpg",
  "author": "Kano Soshu (1551-1601)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Oda-Nobunaga.jpg",
  "file": "File:Oda-Nobunaga.jpg"
 },
 "hideyoshi": {
  "src": "photo-hideyoshi.jpg",
  "author": "Kanō Mitsunobu",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Toyotomi_hideyoshi.jpg",
  "file": "File:Toyotomi hideyoshi.jpg"
 },
 "ieyasu": {
  "src": "photo-ieyasu.jpg",
  "author": "Kanō Tan'yū",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Tokugawa_Ieyasu2.JPG",
  "file": "File:Tokugawa Ieyasu2.JPG"
 },
 "kenshin": {
  "src": "photo-kenshin.jpg",
  "author": "(unknown)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Uesugi_Kenshin.jpg",
  "file": "File:Uesugi Kenshin.jpg"
 },
 "masamune": {
  "src": "photo-masamune.jpg",
  "author": "Tosa Mitsusada",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Date_Masamune02.jpg",
  "file": "File:Date Masamune02.jpg"
 },
 "tsuda": {
  "src": "photo-tsuda.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Tsuda_Umeko_Portrait_c1900.png",
  "file": "File:Tsuda Umeko Portrait c1900.png"
 },
 "ogai": {
  "src": "photo-ogai.jpg",
  "author": "Ohashi Otowa (大橋乙羽, 1869 – 1901)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mori_Ogai_(cropped).jpg",
  "file": "File:Mori Ogai (cropped).jpg"
 },
 "uemura": {
  "src": "photo-uemura.jpg",
  "author": "ThatGuyOnline",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Naomi_Uemura.jpg",
  "file": "File:Naomi Uemura.jpg"
 },
 "iwasaki": {
  "src": "photo-iwasaki.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Iwasaki_Yataro.jpg",
  "file": "File:Iwasaki Yataro.jpg"
 },
 "mizuki": {
  "src": "photo-mizuki.jpg",
  "author": "水木しげる",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Shigeru_Mizuki_at_age_18.jpg",
  "file": "File:Shigeru Mizuki at age 18.jpg"
 },
 "futabayama": {
  "src": "photo-futabayama.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Futabayama_Sadaji.jpg",
  "file": "File:Futabayama Sadaji.jpg"
 },
 "columbus": {
  "src": "photo-columbus.jpg",
  "author": "Sebastiano del Piombo",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_a_Man,_Said_to_be_Christopher_Columbus.jpg",
  "file": "File:Portrait of a Man, Said to be Christopher Columbus.jpg"
 },
 "confucius": {
  "src": "photo-confucius.jpg",
  "author": "Wu Daozi, 685-758, Tang Dynasty.",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty.jpg",
  "file": "File:Confucius Tang Dynasty.jpg"
 },
 "alexander": {
  "src": "photo-alexander.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Alexander_the_Great_mosaic_(cropped).jpg",
  "file": "File:Alexander the Great mosaic (cropped).jpg"
 },
 "tolstoy": {
  "src": "photo-tolstoy.jpg",
  "author": "Sergei Prokudin-Gorskii",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:L.N.Tolstoy_Prokudin-Gorsky.jpg",
  "file": "File:L.N.Tolstoy Prokudin-Gorsky.jpg"
 },
 "chopin": {
  "src": "photo-chopin.jpg",
  "author": "Louis-Auguste Bisson",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Frederic_Chopin_photo.jpeg",
  "file": "File:Frederic Chopin photo.jpeg"
 },
 "toyoda": {
  "src": "photo-toyoda.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sakichi_Toyoda.jpg",
  "file": "File:Sakichi Toyoda.jpg"
 },
 "makino": {
  "src": "photo-makino.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Makino_Tomitaro.jpg",
  "file": "File:Makino Tomitaro.jpg"
 },
 "exupery": {
  "src": "photo-exupery.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Antoine_de_Saint-Exup%C3%A9ry.jpg",
  "file": "File:Antoine de Saint-Exupéry.jpg"
 },
 "dogen": {
  "src": "photo-dogen.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Soto-Zen-Master-Dogen-Zenji-Portrait.png",
  "file": "File:Soto-Zen-Master-Dogen-Zenji-Portrait.png"
 },
 "ichiyo": {
  "src": "photo-ichiyo.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Higuchi_Ichiyou.png",
  "file": "File:Higuchi Ichiyou.png"
 },
 "tanaka": {
  "src": "photo-tanaka.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Tanaka_Shozo.jpg",
  "file": "File:Tanaka Shozo.jpg"
 },
 "misuzu": {
  "src": "photo-misuzu.jpg",
  "author": "Unknown photographer",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kaneko_Misuzu.jpg",
  "file": "File:Kaneko Misuzu.jpg"
 },
 "issai": {
  "src": "photo-issai.jpg",
  "author": "Watanabe Kazan",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:A_portrait_of_Satoh_Issai_by_Watanabe_Kazan.jpg",
  "file": "File:A portrait of Satoh Issai by Watanabe Kazan.jpg"
 }
};
