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
 }
};
