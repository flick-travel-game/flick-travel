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
 },
 "shirahige": {
  "src": "photo-shirahige.jpg",
  "author": "Hyppolyte de Saint-Rambert",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Shirahige_jinja_(Takashima,_Shiga)_hdsr_Shrine_S5_39.jpg",
  "file": "File:Shirahige jinja (Takashima, Shiga) hdsr Shrine S5 39.jpg"
 },
 "kujukushima": {
  "src": "photo-kujukushima.jpg",
  "author": "663highland",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:200320_Kujukushima_Islands_Sasebo_Nagasaki_pref_Japan01s3.jpg",
  "file": "File:200320 Kujukushima Islands Sasebo Nagasaki pref Japan01s3.jpg"
 },
 "narapark": {
  "src": "photo-narapark.jpg",
  "author": "Daniel Lu (User:dllu)",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sika_deer_doe_and_fawn_Nara_2026_dllu.jpg",
  "file": "File:Sika deer doe and fawn Nara 2026 dllu.jpg"
 },
 "kobeport": {
  "src": "photo-kobeport.jpg",
  "author": "KishujiRapid",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kobe_Port_Tower_and_Hotel_Okura_Kobe.jpg",
  "file": "File:Kobe Port Tower and Hotel Okura Kobe.jpg"
 },
 "solsun": {
  "src": "photo-solsun.jpg",
  "author": "Matúš Motlo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_Sun_in_white_light.jpg",
  "file": "File:The Sun in white light.jpg"
 },
 "solmercury": {
  "src": "photo-solmercury.jpg",
  "author": "NASA/Johns Hopkins University Applied Physics Laboratory/Car…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mercury_in_color_-_Prockter07_centered.jpg",
  "file": "File:Mercury in color - Prockter07 centered.jpg"
 },
 "solvenus": {
  "src": "photo-solvenus.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Venus_-_November_27_2018_-_50495187752.png",
  "file": "File:Venus - November 27 2018 - 50495187752.png"
 },
 "solearth": {
  "src": "photo-solearth.jpg",
  "author": "NASA/Apollo 17 crew; taken by either Harrison Schmitt or Ron…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:The_Blue_Marble_(remastered).jpg",
  "file": "File:The Blue Marble (remastered).jpg"
 },
 "solmoon": {
  "src": "photo-solmoon.jpg",
  "author": "Luc Viatour",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Full_Moon_Luc_Viatour.jpg",
  "file": "File:Full Moon Luc Viatour.jpg"
 },
 "solmars": {
  "src": "photo-solmars.jpg",
  "author": "Kevin Gill from Los Angeles, CA, United States",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png",
  "file": "File:Mars - August 30 2021 - Flickr - Kevin M. Gill.png"
 },
 "soljupiter": {
  "src": "photo-soljupiter.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Jupiter_-_December_10_2000_(49128253132).png",
  "file": "File:Jupiter - December 10 2000 (49128253132).png"
 },
 "solsaturn": {
  "src": "photo-solsaturn.jpg",
  "author": "NASA / JPL / Space Science Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Saturn_PIA06077.jpg",
  "file": "File:Saturn PIA06077.jpg"
 },
 "soluranus": {
  "src": "photo-soluranus.jpg",
  "author": "Ardenau4",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Uranus_Voyager2_color_calibrated.png",
  "file": "File:Uranus Voyager2 color calibrated.png"
 },
 "solneptune": {
  "src": "photo-solneptune.jpg",
  "author": "NASA / Voyager 2 / User:Ardenau4",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Neptune_Voyager2_color_calibrated,_brightened.png",
  "file": "File:Neptune Voyager2 color calibrated, brightened.png"
 },
 "solphobos": {
  "src": "photo-solphobos.jpg",
  "author": "NASA / JPL-Caltech / University of Arizona",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Phobos_colour_2008.jpg",
  "file": "File:Phobos colour 2008.jpg"
 },
 "soldeimos": {
  "src": "photo-soldeimos.jpg",
  "author": "NASA/JPL-caltech/University of Arizona",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Deimos-MRO.jpg",
  "file": "File:Deimos-MRO.jpg"
 },
 "solio": {
  "src": "photo-solio.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Io_-_PJ55-29_(53262775207).jpg",
  "file": "File:Io - PJ55-29 (53262775207).jpg"
 },
 "soleuropa": {
  "src": "photo-soleuropa.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Europa_-_Perijove_45_(53255790801).png",
  "file": "File:Europa - Perijove 45 (53255790801).png"
 },
 "solganymede": {
  "src": "photo-solganymede.jpg",
  "author": "NASA/JPL-Caltech/SwRI/MSSS/Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ganymede_-_Perijove_34_Composite.jpg",
  "file": "File:Ganymede - Perijove 34 Composite.jpg"
 },
 "solcallisto": {
  "src": "photo-solcallisto.jpg",
  "author": "NASA/JPL/DLR(German Aerospace Center)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Callisto.jpg",
  "file": "File:Callisto.jpg"
 },
 "solamalthea": {
  "src": "photo-solamalthea.jpg",
  "author": "NASA / JPL",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Amalthea_PIA02532.png",
  "file": "File:Amalthea PIA02532.png"
 },
 "soltitan": {
  "src": "photo-soltitan.jpg",
  "author": "NASA/JPL/Space Science Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Two_Halves_of_Titan.png",
  "file": "File:Two Halves of Titan.png"
 },
 "solenceladus": {
  "src": "photo-solenceladus.jpg",
  "author": "NASA/JPL/Space Science Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Enceladusstripes_cassini.jpg",
  "file": "File:Enceladusstripes cassini.jpg"
 },
 "solmimas": {
  "src": "photo-solmimas.jpg",
  "author": "Kevin M. Gill",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mimas_-_February_2010_(16490255854).jpg",
  "file": "File:Mimas - February 2010 (16490255854).jpg"
 },
 "solrhea": {
  "src": "photo-solrhea.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rhea_-_IR%2BVIO_False_Color_-_November_21_2009_(45010140694).jpg",
  "file": "File:Rhea - IR+VIO False Color - November 21 2009 (45010140694).jpg"
 },
 "soliapetus": {
  "src": "photo-soliapetus.jpg",
  "author": "NASA / JPL / Space Science Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Iapetus_as_seen_by_the_Cassini_probe_-_20071008.jpg",
  "file": "File:Iapetus as seen by the Cassini probe - 20071008.jpg"
 },
 "soltethys": {
  "src": "photo-soltethys.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tethys_-_April_12_2015_(26173170851).jpg",
  "file": "File:Tethys - April 12 2015 (26173170851).jpg"
 },
 "soldione": {
  "src": "photo-soldione.jpg",
  "author": "Kevin Gill from Los Angeles, CA, United States",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Dione_-_April_24_2007_(40825805725).jpg",
  "file": "File:Dione - April 24 2007 (40825805725).jpg"
 },
 "solhyperion": {
  "src": "photo-solhyperion.jpg",
  "author": "NASA/JPL",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hyperion_PIA07740.jpg",
  "file": "File:Hyperion PIA07740.jpg"
 },
 "soloberon": {
  "src": "photo-soloberon.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Voyager_2_picture_of_Oberon.jpg",
  "file": "File:Voyager 2 picture of Oberon.jpg"
 },
 "solmiranda": {
  "src": "photo-solmiranda.jpg",
  "author": "NASA/JPL-Caltech",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:PIA18185_Miranda%27s_Icy_Face.jpg",
  "file": "File:PIA18185 Miranda's Icy Face.jpg"
 },
 "soltriton": {
  "src": "photo-soltriton.jpg",
  "author": "NASA/JPL",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Neptune%E2%80%99s_Moon_Triton_Fosters_Rare_Icy_Union_(gemini1903a)_(square_crop).jpg",
  "file": "File:Neptune’s Moon Triton Fosters Rare Icy Union (gemini1903a) (square crop).jpg"
 },
 "solcharon": {
  "src": "photo-solcharon.jpg",
  "author": "NASA/Johns Hopkins University Applied Physics Laboratory/Sou…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Charon_in_True_Color_-_High-Res.jpg",
  "file": "File:Charon in True Color - High-Res.jpg"
 },
 "solpluto": {
  "src": "photo-solpluto.jpg",
  "author": "NASA/Johns Hopkins University Applied Physics Laboratory/Sou…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pluto_in_True_Color_-_High-Res.jpg",
  "file": "File:Pluto in True Color - High-Res.jpg"
 },
 "solceres": {
  "src": "photo-solceres.jpg",
  "author": "Justin Cowart",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ceres_-_RC3_-_Haulani_Crater_(22381131691).jpg",
  "file": "File:Ceres - RC3 - Haulani Crater (22381131691).jpg"
 },
 "soleris": {
  "src": "photo-soleris.jpg",
  "author": "NASA, ESA, and M. Brown",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Eris_and_dysnomia2.jpg",
  "file": "File:Eris and dysnomia2.jpg"
 },
 "solmakemake": {
  "src": "photo-solmakemake.jpg",
  "author": "NASA, ESA, and A. Parker and M. Buie (Southwest Research Ins…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Makemake_and_its_moon.jpg",
  "file": "File:Makemake and its moon.jpg"
 },
 "solhaumea": {
  "src": "photo-solhaumea.jpg",
  "author": "Renerpho",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Haumea_Hubble.png",
  "file": "File:Haumea Hubble.png"
 },
 "solitokawa": {
  "src": "photo-solitokawa.jpg",
  "author": "江戸村のとくぞう",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Itokawa-1.jpg",
  "file": "File:Itokawa-1.jpg"
 },
 "solryugu": {
  "src": "photo-solryugu.jpg",
  "author": "(screenshot of an Java applet)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:1999_JU3_orbit_on_30_Jun_2018.gif",
  "file": "File:1999 JU3 orbit on 30 Jun 2018.gif"
 },
 "solbennu": {
  "src": "photo-solbennu.jpg",
  "author": "NASA/Goddard/University of Arizona",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:BennuAsteroid.jpg",
  "file": "File:BennuAsteroid.jpg"
 },
 "solvesta": {
  "src": "photo-solvesta.jpg",
  "author": "NASA/JPL-Caltech/UCAL/MPS/DLR/IDA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Vesta_full_mosaic.jpg",
  "file": "File:Vesta full mosaic.jpg"
 },
 "solpallas": {
  "src": "photo-solpallas.jpg",
  "author": "Credit: ESO/Vernazza et al.",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Potw1749a_Pallas_crop.png",
  "file": "File:Potw1749a Pallas crop.png"
 },
 "solbelt": {
  "src": "photo-solbelt.jpg",
  "author": "my own work derived from NASA's image.",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Asteroid_Belt_ja.svg",
  "file": "File:Asteroid Belt ja.svg"
 },
 "solkuiper": {
  "src": "photo-solkuiper.jpg",
  "author": "WilyD at English Wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kuiper_belt_plot_objects_of_outer_solar_system.png",
  "file": "File:Kuiper belt plot objects of outer solar system.png"
 },
 "soloort": {
  "src": "photo-soloort.jpg",
  "author": "NASA This SVG image was created by Medium69. Cette image SVG…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kuiper_belt_-_Oort_cloud-en.svg",
  "file": "File:Kuiper belt - Oort cloud-en.svg"
 },
 "solhalley": {
  "src": "photo-solhalley.jpg",
  "author": "NASA/W. Liller",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lspn_comet_halley.jpg",
  "file": "File:Lspn comet halley.jpg"
 },
 "solhalebopp": {
  "src": "photo-solhalebopp.jpg",
  "author": "E. Kolmhofer, H. Raab; Johannes-Kepler-Observatory, Linz, Au…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Comet_Hale-Bopp_1995O1.jpg",
  "file": "File:Comet Hale-Bopp 1995O1.jpg"
 },
 "solhyakutake": {
  "src": "photo-solhyakutake.jpg",
  "author": "Hyakutake_Color.jpg: E. Kolmhofer, H. Raab; Johannes-Kepler-…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hyakutake_Color_(1).jpg",
  "file": "File:Hyakutake Color (1).jpg"
 },
 "solcomet": {
  "src": "photo-solcomet.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Comet_Kohoutek_(S74-17688).jpg",
  "file": "File:Comet Kohoutek (S74-17688).jpg"
 },
 "solsystem": {
  "src": "photo-solsystem.jpg",
  "author": "Omarius257",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Solar_System_True_Color_JA.png",
  "file": "File:Solar System True Color JA.png"
 },
 "solrevolution": {
  "src": "photo-solrevolution.jpg",
  "author": "User:Zhatt",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Orbit4.gif",
  "file": "File:Orbit4.gif"
 },
 "sollunareclipse": {
  "src": "photo-sollunareclipse.jpg",
  "author": "Oliver Stein",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Lunar-eclipse-09-11-2003.jpeg",
  "file": "File:Lunar-eclipse-09-11-2003.jpeg"
 },
 "solannular": {
  "src": "photo-solannular.jpg",
  "author": "No machine-readable author provided. Aliparsa assumed (based…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:EclipseMarch06.jpg",
  "file": "File:EclipseMarch06.jpg"
 },
 "solfullmoon": {
  "src": "photo-solfullmoon.jpg",
  "author": "Gregory H. Revera",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:FullMoon2010.jpg",
  "file": "File:FullMoon2010.jpg"
 },
 "solnewmoon": {
  "src": "photo-solnewmoon.jpg",
  "author": "Horst Frank (JPG), Nethac DIU (SVG)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Mond_Grafik.svg",
  "file": "File:Mond Grafik.svg"
 },
 "solcrescent": {
  "src": "photo-solcrescent.jpg",
  "author": "Thomas Bresson",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:ComputerHotline_-_Lune_(by)_(9).jpg",
  "file": "File:ComputerHotline - Lune (by) (9).jpg"
 },
 "sollastq": {
  "src": "photo-sollastq.jpg",
  "author": "Daniel Hershman from Federal Way, US",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Daniel_Hershman_-_march_moon_(by).jpg",
  "file": "File:Daniel Hershman - march moon (by).jpg"
 },
 "solphases": {
  "src": "photo-solphases.jpg",
  "author": "Tomruen",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lunar_libration_with_phase_Oct_2007_(continuous_loop).gif",
  "file": "File:Lunar libration with phase Oct 2007 (continuous loop).gif"
 },
 "soltide": {
  "src": "photo-soltide.jpg",
  "author": "Samuel Wantman",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Bay_of_Fundy_High_Tide.jpg",
  "file": "File:Bay of Fundy High Tide.jpg"
 },
 "solaurora": {
  "src": "photo-solaurora.jpg",
  "author": "Tarja Mitrovic",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rovaniemi_-_Aurora_Borealis.jpg",
  "file": "File:Rovaniemi - Aurora Borealis.jpg"
 },
 "solmeteor": {
  "src": "photo-solmeteor.jpg",
  "author": "--あおもりくま（Aomorikuma） 2020年8月15日 (土) 06:18 (UTC)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Perseid_meteor_shower_202008_R0011963.jpg",
  "file": "File:Perseid meteor shower 202008 R0011963.jpg"
 },
 "solshower": {
  "src": "photo-solshower.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Leonidas_sigloXIX.jpg",
  "file": "File:Leonidas sigloXIX.jpg"
 },
 "solmeteorite": {
  "src": "photo-solmeteorite.jpg",
  "author": "Meteoritekid at English Wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Meteorite_hunting_in_Mojave_desert.jpg",
  "file": "File:Meteorite hunting in Mojave desert.jpg"
 },
 "solcrater": {
  "src": "photo-solcrater.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lunar_crater_Daedalus.jpg",
  "file": "File:Lunar crater Daedalus.jpg"
 },
 "solcorona": {
  "src": "photo-solcorona.jpg",
  "author": "Luc Viatour",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Solar_eclipse_1999_4.jpg",
  "file": "File:Solar eclipse 1999 4.jpg"
 },
 "solflare": {
  "src": "photo-solflare.jpg",
  "author": "Brocken Inaglory",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Flare_and_after-flare_prominence.jpg",
  "file": "File:Flare and after-flare prominence.jpg"
 },
 "solsolarwind": {
  "src": "photo-solsolarwind.jpg",
  "author": "NASA – Marshall Space Flight Center",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Solar_wind_Speed_interplanetary_magnetic_field.jpg",
  "file": "File:Solar wind Speed interplanetary magnetic field.jpg"
 },
 "solprominence": {
  "src": "photo-solprominence.jpg",
  "author": "NASA/SDO",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Solar_prominence_2011-04-14T202956.120.png",
  "file": "File:Solar prominence 2011-04-14T202956.120.png"
 },
 "solau": {
  "src": "photo-solau.jpg",
  "author": "nagualdesign",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Astronomical_unit.png",
  "file": "File:Astronomical unit.png"
 },
 "solaxis": {
  "src": "photo-solaxis.jpg",
  "author": "Tfr000 (talk) 13:49, 2 April 2012 (UTC)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Planet_axis_comparison.png",
  "file": "File:Planet axis comparison.png"
 },
 "solseason": {
  "src": "photo-solseason.jpg",
  "author": "J.hagelüken",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:B%C3%A4ume_Jahreszeit_2013.jpg",
  "file": "File:Bäume Jahreszeit 2013.jpg"
 },
 "solterrestrial": {
  "src": "photo-solterrestrial.jpg",
  "author": "Original: Mats Halldin Vector: Chabacano",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Jordens_inre-numbers.svg",
  "file": "File:Jordens inre-numbers.svg"
 },
 "soljovian": {
  "src": "photo-soljovian.jpg",
  "author": "Urhixidur, successive modification by Jrockley",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gas_giants_and_the_Sun_(1_px_%3D_1000_km).jpg",
  "file": "File:Gas giants and the Sun (1 px = 1000 km).jpg"
 },
 "solinner": {
  "src": "photo-solinner.jpg",
  "author": "Harman Smith and Laura Generosa (nee Berwin), graphic artist…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Solar_sys.jpg",
  "file": "File:Solar sys.jpg"
 },
 "solouter": {
  "src": "photo-solouter.jpg",
  "author": "Harman Smith and Laura Generosa (nee Berwin), graphic artist…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Solar_sys.jpg",
  "file": "File:Solar sys.jpg"
 },
 "solhayabusa": {
  "src": "photo-solhayabusa.jpg",
  "author": "JGarry at English Wikipedia",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hayabusa_hover.jpg",
  "file": "File:Hayabusa hover.jpg"
 },
 "solhayabusa2": {
  "src": "photo-solhayabusa2.jpg",
  "author": "Go Miyazaki",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:%E5%B0%8F%E6%83%91%E6%98%9F%E6%8E%A2%E6%9F%BB%E6%A9%9F_%E3%81%AF%E3%82%84%E3%81%B6%E3%81%952_CG%E3%83%A2%E3%83%87%E3%83%AB.jpg",
  "file": "File:小惑星探査機 はやぶさ2 CGモデル.jpg"
 },
 "solkaguya": {
  "src": "photo-solkaguya.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Selene.gif",
  "file": "File:Selene.gif"
 },
 "solakatsuki": {
  "src": "photo-solakatsuki.jpg",
  "author": "宇宙航空研究開発機構・宇宙科学研究所(JAXA/ISAS)、https://www.isas.jaxa.jp/en/re…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Akatsuki_CG01.png",
  "file": "File:Akatsuki CG01.png"
 },
 "solvoyager1": {
  "src": "photo-solvoyager1.jpg",
  "author": "NASA/JPL-Caltech",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Voyager.jpg",
  "file": "File:Voyager.jpg"
 },
 "solvoyager2": {
  "src": "photo-solvoyager2.jpg",
  "author": "NASA/JPL",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Voyager_spacecraft.jpg",
  "file": "File:Voyager spacecraft.jpg"
 },
 "solapollo11": {
  "src": "photo-solapollo11.jpg",
  "author": "Neil Armstrong",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11_original.jpg",
  "file": "File:Aldrin Apollo 11 original.jpg"
 },
 "solhubble": {
  "src": "photo-solhubble.jpg",
  "author": "NASA Hubble Space Telescope",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hubble_Space_Telescope_(27946391011).jpg",
  "file": "File:Hubble Space Telescope (27946391011).jpg"
 },
 "soljwst": {
  "src": "photo-soljwst.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:JWST_spacecraft_model_2.png",
  "file": "File:JWST spacecraft model 2.png"
 },
 "soliss": {
  "src": "photo-soliss.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:The_station_pictured_from_the_SpaceX_Crew_Dragon_5_(cropped).jpg",
  "file": "File:The station pictured from the SpaceX Crew Dragon 5 (cropped).jpg"
 },
 "solh3": {
  "src": "photo-solh3.jpg",
  "author": "宇宙航空研究開発機構",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:H3_logo.svg",
  "file": "File:H3 logo.svg"
 },
 "solh2a": {
  "src": "photo-solh2a.jpg",
  "author": "Bill Ingalls",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:H_IIA_No._F23_with_GPM_on_its_way_to_the_launchpad.jpg",
  "file": "File:H IIA No. F23 with GPM on its way to the launchpad.jpg"
 },
 "solrocket": {
  "src": "photo-solrocket.jpg",
  "author": "Naritama (NARITA Masahiro)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:H-IIA_F16_launching_IGS-O3.jpg",
  "file": "File:H-IIA F16 launching IGS-O3.jpg"
 },
 "solshuttle": {
  "src": "photo-solshuttle.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:STS120LaunchHiRes.jpg",
  "file": "File:STS120LaunchHiRes.jpg"
 },
 "solsputnik": {
  "src": "photo-solsputnik.jpg",
  "author": "NSSDC, NASA[1]",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sputnik_asm.jpg",
  "file": "File:Sputnik asm.jpg"
 },
 "solgalileoprobe": {
  "src": "photo-solgalileoprobe.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Artwork_Galileo-Io-Jupiter.JPG",
  "file": "File:Artwork Galileo-Io-Jupiter.JPG"
 },
 "solcassini": {
  "src": "photo-solcassini.jpg",
  "author": "NASA/JPL",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Cassini_Saturn_Orbit_Insertion.jpg",
  "file": "File:Cassini Saturn Orbit Insertion.jpg"
 },
 "solnewhorizons": {
  "src": "photo-solnewhorizons.jpg",
  "author": "Johns Hopkins University Applied Physics Laboratory/Southwes…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:15-011a-NewHorizons-PlutoFlyby-ArtistConcept-14July2015-20150115.jpg",
  "file": "File:15-011a-NewHorizons-PlutoFlyby-ArtistConcept-14July2015-20150115.jpg"
 },
 "solperseverance": {
  "src": "photo-solperseverance.jpg",
  "author": "NASA/JPL-Caltech",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Perseverance-Selfie-at-Rochette-Horizontal-V2.gif",
  "file": "File:Perseverance-Selfie-at-Rochette-Horizontal-V2.gif"
 },
 "solhimawari": {
  "src": "photo-solhimawari.jpg",
  "author": "masamic",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:GMS_Himawari.jpg",
  "file": "File:GMS Himawari.jpg"
 },
 "cossatellite": {
  "src": "photo-cossatellite.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Two_3U_CubeSats.jpg",
  "file": "File:Two 3U CubeSats.jpg"
 },
 "cosgps": {
  "src": "photo-cosgps.jpg",
  "author": "Gnsin",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Global-Positioning-System.jpg",
  "file": "File:Global-Positioning-System.jpg"
 },
 "cosdebris": {
  "src": "photo-cosdebris.jpg",
  "author": "NASA employee",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Debris-LEO1280.jpg",
  "file": "File:Debris-LEO1280.jpg"
 },
 "cosastronaut": {
  "src": "photo-cosastronaut.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Bruce_McCandless_II_during_EVA_in_1984.jpg",
  "file": "File:Bruce McCandless II during EVA in 1984.jpg"
 },
 "coszerog": {
  "src": "photo-coszerog.jpg",
  "author": "jurvetson",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Zero_G.jpg",
  "file": "File:Zero G.jpg"
 },
 "cosvacuum": {
  "src": "photo-cosvacuum.jpg",
  "author": "Hannes Grobe (talk)",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Kolbenluftpumpe_hg.jpg",
  "file": "File:Kolbenluftpumpe hg.jpg"
 },
 "cosspacesuit": {
  "src": "photo-cosspacesuit.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Bruce_McCandless_II_during_EVA_in_1984.jpg",
  "file": "File:Bruce McCandless II during EVA in 1984.jpg"
 },
 "cosjaxa": {
  "src": "photo-cosjaxa.jpg",
  "author": "JAXA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Jaxa_logo.svg",
  "file": "File:Jaxa logo.svg"
 },
 "cosnasa": {
  "src": "photo-cosnasa.jpg",
  "author": "National Aeronautics and Space Administration",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:NASA_logo.svg",
  "file": "File:NASA logo.svg"
 },
 "costanegashima": {
  "src": "photo-costanegashima.jpg",
  "author": "ウニウニ",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Osaki_Range.jpg",
  "file": "File:Osaki Range.jpg"
 },
 "cosheliocentric": {
  "src": "photo-cosheliocentric.jpg",
  "author": "Andreas Cellarius",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Heliocentric.jpg",
  "file": "File:Heliocentric.jpg"
 },
 "cosgeocentric": {
  "src": "photo-cosgeocentric.jpg",
  "author": "Jan van Loon",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Cellarius_ptolemaic_system.jpg",
  "file": "File:Cellarius ptolemaic system.jpg"
 },
 "coskepler": {
  "src": "photo-coskepler.jpg",
  "author": "Дейка2",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:%D0%90%D0%BD%D0%BE%D0%BC%D0%B0%D0%BB%D0%B8%D0%B8.gif",
  "file": "File:Аномалии.gif"
 },
 "cosgravity": {
  "src": "photo-cosgravity.jpg",
  "author": "NASA, ESA, and the Hubble Heritage Team (STScI/AURA)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:UGC_1810_and_UGC_1813_in_Arp_273_(captured_by_the_Hubble_Space_Telescope).jpg",
  "file": "File:UGC 1810 and UGC 1813 in Arp 273 (captured by the Hubble Space Telescope).jpg"
 },
 "cosfusion": {
  "src": "photo-cosfusion.jpg",
  "author": "Borb",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:CNO_Cycle.svg",
  "file": "File:CNO Cycle.svg"
 },
 "cosgalileo": {
  "src": "photo-cosgalileo.jpg",
  "author": "Justus Sustermans",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Justus_Sustermans_-_Portrait_of_Galileo_Galilei_(Uffizi).jpg",
  "file": "File:Justus Sustermans - Portrait of Galileo Galilei (Uffizi).jpg"
 },
 "coscopernicus": {
  "src": "photo-coscopernicus.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Nikolaus_Kopernikus_MOT.jpg",
  "file": "File:Nikolaus Kopernikus MOT.jpg"
 },
 "coskeplerman": {
  "src": "photo-coskeplerman.jpg",
  "author": "August Köhler [1]",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:JKepler.jpg",
  "file": "File:JKepler.jpg"
 },
 "cosnewton": {
  "src": "photo-cosnewton.jpg",
  "author": "Godfrey Kneller",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Portrait_of_Sir_Isaac_Newton,_1689_(brightened).jpg",
  "file": "File:Portrait of Sir Isaac Newton, 1689 (brightened).jpg"
 },
 "cosgagarin": {
  "src": "photo-cosgagarin.jpg",
  "author": "Александр Моклецов / СовИнформБюро",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Yuri_Gagarin_with_awards.jpg",
  "file": "File:Yuri Gagarin with awards.jpg"
 },
 "cosarmstrong": {
  "src": "photo-cosarmstrong.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Neil_Armstrong_pose.jpg",
  "file": "File:Neil Armstrong pose.jpg"
 },
 "cosmohri": {
  "src": "photo-cosmohri.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mamoru_Mohri_portrait.jpg",
  "file": "File:Mamoru Mohri portrait.jpg"
 },
 "coswakata": {
  "src": "photo-coswakata.jpg",
  "author": "Mark Sowa",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Koichi_wakata.jpg",
  "file": "File:Koichi wakata.jpg"
 },
 "skyaries": {
  "src": "photo-skyaries.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aries_IAU.svg",
  "file": "File:Aries IAU.svg"
 },
 "skytaurus": {
  "src": "photo-skytaurus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taurus_IAU.svg",
  "file": "File:Taurus IAU.svg"
 },
 "skygemini": {
  "src": "photo-skygemini.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gemini_IAU.svg",
  "file": "File:Gemini IAU.svg"
 },
 "skycancer": {
  "src": "photo-skycancer.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cancer_IAU.svg",
  "file": "File:Cancer IAU.svg"
 },
 "skyleo": {
  "src": "photo-skyleo.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Leo_IAU.svg",
  "file": "File:Leo IAU.svg"
 },
 "skyvirgo": {
  "src": "photo-skyvirgo.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Virgo_IAU.svg",
  "file": "File:Virgo IAU.svg"
 },
 "skylibra": {
  "src": "photo-skylibra.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Libra_IAU.svg",
  "file": "File:Libra IAU.svg"
 },
 "skyscorpius": {
  "src": "photo-skyscorpius.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Scorpius_IAU.svg",
  "file": "File:Scorpius IAU.svg"
 },
 "skysagittarius": {
  "src": "photo-skysagittarius.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sagittarius_IAU.svg",
  "file": "File:Sagittarius IAU.svg"
 },
 "skycapricornus": {
  "src": "photo-skycapricornus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Capricornus_IAU.svg",
  "file": "File:Capricornus IAU.svg"
 },
 "skyaquarius": {
  "src": "photo-skyaquarius.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aquarius_IAU.svg",
  "file": "File:Aquarius IAU.svg"
 },
 "skypisces": {
  "src": "photo-skypisces.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pisces_IAU.svg",
  "file": "File:Pisces IAU.svg"
 },
 "skyorion": {
  "src": "photo-skyorion.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Orion_IAU.svg",
  "file": "File:Orion IAU.svg"
 },
 "skycma": {
  "src": "photo-skycma.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Canis_Major_IAU.svg",
  "file": "File:Canis Major IAU.svg"
 },
 "skycmi": {
  "src": "photo-skycmi.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Canis_Minor_IAU.svg",
  "file": "File:Canis Minor IAU.svg"
 },
 "skyauriga": {
  "src": "photo-skyauriga.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Auriga_IAU.svg",
  "file": "File:Auriga IAU.svg"
 },
 "skyuma": {
  "src": "photo-skyuma.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ursa_Major_IAU.svg",
  "file": "File:Ursa Major IAU.svg"
 },
 "skyumi": {
  "src": "photo-skyumi.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ursa_Minor_IAU.svg",
  "file": "File:Ursa Minor IAU.svg"
 },
 "skycassiopeia": {
  "src": "photo-skycassiopeia.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cassiopeia_IAU.svg",
  "file": "File:Cassiopeia IAU.svg"
 },
 "skycepheus": {
  "src": "photo-skycepheus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cepheus_IAU.svg",
  "file": "File:Cepheus IAU.svg"
 },
 "skydraco": {
  "src": "photo-skydraco.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Draco_IAU.svg",
  "file": "File:Draco IAU.svg"
 },
 "skylyra": {
  "src": "photo-skylyra.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lyra_IAU.svg",
  "file": "File:Lyra IAU.svg"
 },
 "skycygnus": {
  "src": "photo-skycygnus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cygnus_IAU.svg",
  "file": "File:Cygnus IAU.svg"
 },
 "skyaquila": {
  "src": "photo-skyaquila.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aquila_IAU.svg",
  "file": "File:Aquila IAU.svg"
 },
 "skypegasus": {
  "src": "photo-skypegasus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pegasus_IAU.svg",
  "file": "File:Pegasus IAU.svg"
 },
 "skyandromeda": {
  "src": "photo-skyandromeda.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Andromeda_IAU.svg",
  "file": "File:Andromeda IAU.svg"
 },
 "skyperseus": {
  "src": "photo-skyperseus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Perseus_IAU.svg",
  "file": "File:Perseus IAU.svg"
 },
 "skylepus": {
  "src": "photo-skylepus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lepus_IAU.svg",
  "file": "File:Lepus IAU.svg"
 },
 "skyeridanus": {
  "src": "photo-skyeridanus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Eridanus_IAU.svg",
  "file": "File:Eridanus IAU.svg"
 },
 "skycetus": {
  "src": "photo-skycetus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cetus_IAU.svg",
  "file": "File:Cetus IAU.svg"
 },
 "skybootes": {
  "src": "photo-skybootes.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Bo%C3%B6tes_IAU.svg",
  "file": "File:Boötes IAU.svg"
 },
 "skycrb": {
  "src": "photo-skycrb.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Corona_Borealis_IAU.svg",
  "file": "File:Corona Borealis IAU.svg"
 },
 "skyhercules": {
  "src": "photo-skyhercules.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hercules_IAU.svg",
  "file": "File:Hercules IAU.svg"
 },
 "skyophiuchus": {
  "src": "photo-skyophiuchus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ophiuchus_IAU.svg",
  "file": "File:Ophiuchus IAU.svg"
 },
 "skyserpens": {
  "src": "photo-skyserpens.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Serpens_Caput_IAU.svg",
  "file": "File:Serpens Caput IAU.svg"
 },
 "skydelphinus": {
  "src": "photo-skydelphinus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Delphinus_IAU.svg",
  "file": "File:Delphinus IAU.svg"
 },
 "skyvulpecula": {
  "src": "photo-skyvulpecula.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Vulpecula_IAU.svg",
  "file": "File:Vulpecula IAU.svg"
 },
 "skysagitta": {
  "src": "photo-skysagitta.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sagitta_IAU.svg",
  "file": "File:Sagitta IAU.svg"
 },
 "skypsa": {
  "src": "photo-skypsa.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Piscis_Austrinus_IAU.svg",
  "file": "File:Piscis Austrinus IAU.svg"
 },
 "skycra": {
  "src": "photo-skycra.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Corona_Australis_IAU.svg",
  "file": "File:Corona Australis IAU.svg"
 },
 "skycentaurus": {
  "src": "photo-skycentaurus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Centaurus_IAU.svg",
  "file": "File:Centaurus IAU.svg"
 },
 "skylupus": {
  "src": "photo-skylupus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lupus_IAU.svg",
  "file": "File:Lupus IAU.svg"
 },
 "skycorvus": {
  "src": "photo-skycorvus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Corvus_IAU.svg",
  "file": "File:Corvus IAU.svg"
 },
 "skycrater": {
  "src": "photo-skycrater.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Crater_IAU.svg",
  "file": "File:Crater IAU.svg"
 },
 "skyhydra": {
  "src": "photo-skyhydra.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hydra_IAU.svg",
  "file": "File:Hydra IAU.svg"
 },
 "skycoma": {
  "src": "photo-skycoma.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Coma_Berenices_IAU.svg",
  "file": "File:Coma Berenices IAU.svg"
 },
 "skycvn": {
  "src": "photo-skycvn.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Canes_Venatici_IAU.svg",
  "file": "File:Canes Venatici IAU.svg"
 },
 "skylynx": {
  "src": "photo-skylynx.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lynx_IAU.svg",
  "file": "File:Lynx IAU.svg"
 },
 "skycamelopardalis": {
  "src": "photo-skycamelopardalis.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Camelopardalis_IAU.svg",
  "file": "File:Camelopardalis IAU.svg"
 },
 "skylacerta": {
  "src": "photo-skylacerta.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lacerta_IAU.svg",
  "file": "File:Lacerta IAU.svg"
 },
 "skytriangulum": {
  "src": "photo-skytriangulum.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Triangulum_IAU.svg",
  "file": "File:Triangulum IAU.svg"
 },
 "skyfornax": {
  "src": "photo-skyfornax.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Fornax_IAU.svg",
  "file": "File:Fornax IAU.svg"
 },
 "skysculptor": {
  "src": "photo-skysculptor.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sculptor_IAU.svg",
  "file": "File:Sculptor IAU.svg"
 },
 "skyphoenix": {
  "src": "photo-skyphoenix.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Phoenix_IAU.svg",
  "file": "File:Phoenix IAU.svg"
 },
 "skygrus": {
  "src": "photo-skygrus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Grus_IAU.svg",
  "file": "File:Grus IAU.svg"
 },
 "skycolumba": {
  "src": "photo-skycolumba.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Columba_IAU.svg",
  "file": "File:Columba IAU.svg"
 },
 "skypuppis": {
  "src": "photo-skypuppis.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Puppis_IAU.svg",
  "file": "File:Puppis IAU.svg"
 },
 "skypyxis": {
  "src": "photo-skypyxis.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pyxis_IAU.svg",
  "file": "File:Pyxis IAU.svg"
 },
 "skyantlia": {
  "src": "photo-skyantlia.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Antlia_IAU.svg",
  "file": "File:Antlia IAU.svg"
 },
 "skysextans": {
  "src": "photo-skysextans.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sextans_IAU.svg",
  "file": "File:Sextans IAU.svg"
 },
 "skylmi": {
  "src": "photo-skylmi.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Leo_Minor_IAU.svg",
  "file": "File:Leo Minor IAU.svg"
 },
 "skyequuleus": {
  "src": "photo-skyequuleus.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Equuleus_IAU.svg",
  "file": "File:Equuleus IAU.svg"
 },
 "skyscutum": {
  "src": "photo-skyscutum.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Scutum_IAU.svg",
  "file": "File:Scutum IAU.svg"
 },
 "skycrux": {
  "src": "photo-skycrux.jpg",
  "author": "IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienb…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Crux_IAU.svg",
  "file": "File:Crux IAU.svg"
 },
 "skysirius": {
  "src": "photo-skysirius.jpg",
  "author": "NASA, ESA, H. Bond (STScI), and M. Barstow (University of Le…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sirius_A_and_B_Hubble_photo.jpg",
  "file": "File:Sirius A and B Hubble photo.jpg"
 },
 "skycanopus": {
  "src": "photo-skycanopus.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Canopus.jpg",
  "file": "File:Canopus.jpg"
 },
 "skyrigilkent": {
  "src": "photo-skyrigilkent.jpg",
  "author": "ESO/DSS 2",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:The_bright_star_Alpha_Centauri_and_its_surroundings.jpg",
  "file": "File:The bright star Alpha Centauri and its surroundings.jpg"
 },
 "skyarcturus": {
  "src": "photo-skyarcturus.jpg",
  "author": "Mikulski Archive for Space Telescopes (MAST), STScI, and NAS…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Arcturus_(optical).png",
  "file": "File:Arcturus (optical).png"
 },
 "skyvega": {
  "src": "photo-skyvega.jpg",
  "author": "Courtesy NASA/JPL-Caltech/University of Arizona",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Vega_Spitzer.jpg",
  "file": "File:Vega Spitzer.jpg"
 },
 "skycapella": {
  "src": "photo-skycapella.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Auriga_constellation_map.png",
  "file": "File:Auriga constellation map.png"
 },
 "skyrigel": {
  "src": "photo-skyrigel.jpg",
  "author": "Haktarfone",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rigel,_Rutherfurd_Observatory,_09_September_2014.jpeg",
  "file": "File:Rigel, Rutherfurd Observatory, 09 September 2014.jpeg"
 },
 "skyprocyon": {
  "src": "photo-skyprocyon.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Position_Alpha_Cmi.png",
  "file": "File:Position Alpha Cmi.png"
 },
 "skyachernar": {
  "src": "photo-skyachernar.jpg",
  "author": "Eridanus_constellation_map.png: Torsten Bronger derivative w…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Eridanus_constellation_map.svg",
  "file": "File:Eridanus constellation map.svg"
 },
 "skybetelgeuse": {
  "src": "photo-skybetelgeuse.jpg",
  "author": "Adam Block/Steward Observatory/University of Arizona",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Betelgeuse_(star).jpg",
  "file": "File:Betelgeuse (star).jpg"
 },
 "skyhadar": {
  "src": "photo-skyhadar.jpg",
  "author": "Skatebiker",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Alpha,_Beta_and_Proxima_Centauri_(1).jpg",
  "file": "File:Alpha, Beta and Proxima Centauri (1).jpg"
 },
 "skyaltair": {
  "src": "photo-skyaltair.jpg",
  "author": "NASA/JPL/Caltech/Steve Golden",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Altair.jpg",
  "file": "File:Altair.jpg"
 },
 "skyacrux": {
  "src": "photo-skyacrux.jpg",
  "author": "No machine-readable author provided. Alain r assumed (based …",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Acrux_kstars.png",
  "file": "File:Acrux kstars.png"
 },
 "skyaldebaran": {
  "src": "photo-skyaldebaran.jpg",
  "author": "NASA, ESA, and STScI",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Aldebaran.jpg",
  "file": "File:Aldebaran.jpg"
 },
 "skyantares": {
  "src": "photo-skyantares.jpg",
  "author": "ESO/K. Ohnaka",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:VLTI_reconstructed_view_of_the_surface_of_Antares.jpg",
  "file": "File:VLTI reconstructed view of the surface of Antares.jpg"
 },
 "skyspica": {
  "src": "photo-skyspica.jpg",
  "author": "Virgo_constellation_map.png: Torsten Bronger derivative work…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Virgo_constellation_map.svg",
  "file": "File:Virgo constellation map.svg"
 },
 "skyfomalhaut": {
  "src": "photo-skyfomalhaut.jpg",
  "author": "NASA, ESA, and the Digitized Sky Survey 2. Acknowledgment: D…",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Wide-field_view_of_the_sky_around_the_bright_star_Fomalhaut_(eso1216c).jpg",
  "file": "File:Wide-field view of the sky around the bright star Fomalhaut (eso1216c).jpg"
 },
 "skydeneb": {
  "src": "photo-skydeneb.jpg",
  "author": "Cygnus_constellation_map.png: Torsten Bronger derivative wor…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Cygnus_constellation_map.svg",
  "file": "File:Cygnus constellation map.svg"
 },
 "skymimosa": {
  "src": "photo-skymimosa.jpg",
  "author": "Crux_constellation_map.png: Torsten Bronger derivative work:…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Crux_constellation_map.svg",
  "file": "File:Crux constellation map.svg"
 },
 "skyregulus": {
  "src": "photo-skyregulus.jpg",
  "author": "Drew Farwell",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Regulus_1.JPG",
  "file": "File:Regulus 1.JPG"
 },
 "skycastor": {
  "src": "photo-skycastor.jpg",
  "author": "Gemini_constellation_map.png: Torsten Bronger derivative wor…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Gemini_constellation_map.svg",
  "file": "File:Gemini constellation map.svg"
 },
 "skyalgol": {
  "src": "photo-skyalgol.jpg",
  "author": "By Zwergelstern",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Position_Beta_Per.png",
  "file": "File:Position Beta Per.png"
 },
 "skymira": {
  "src": "photo-skymira.jpg",
  "author": "Margarita Karovska (Harvard-Smithsonian Center for Astrophys…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mira_1997.jpg",
  "file": "File:Mira 1997.jpg"
 },
 "skydenebola": {
  "src": "photo-skydenebola.jpg",
  "author": "Copyright © 2003 Torsten Bronger.",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Leo_constellation_map.png",
  "file": "File:Leo constellation map.png"
 },
 "skyalbireo": {
  "src": "photo-skyalbireo.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Albireo.jpg",
  "file": "File:Albireo.jpg"
 },
 "skymizar": {
  "src": "photo-skymizar.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Ursa_major_constellation_map.png",
  "file": "File:Ursa major constellation map.png"
 },
 "skyalcor": {
  "src": "photo-skyalcor.jpg",
  "author": "Ursa_major_constellation_map.png: Torsten Bronger derivative…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Ursa_Major_constellation_map.svg",
  "file": "File:Ursa Major constellation map.svg"
 },
 "skyalpheratz": {
  "src": "photo-skyalpheratz.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Alpheratz.gif",
  "file": "File:Alpheratz.gif"
 },
 "skybellatrix": {
  "src": "photo-skybellatrix.jpg",
  "author": "Lithopsian",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Lambda_Orionis.jpg",
  "file": "File:Lambda Orionis.jpg"
 },
 "skyalnilam": {
  "src": "photo-skyalnilam.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Ngc1990.jpg",
  "file": "File:Ngc1990.jpg"
 },
 "skymintaka": {
  "src": "photo-skymintaka.jpg",
  "author": "Davide De Martin (http://www.skyfactory.org); Credit: Digiti…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Orion_Belt.jpg",
  "file": "File:Orion Belt.jpg"
 },
 "skyalnitak": {
  "src": "photo-skyalnitak.jpg",
  "author": "Mdf",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ngc2024_2mass.jpg",
  "file": "File:Ngc2024 2mass.jpg"
 },
 "skythuban": {
  "src": "photo-skythuban.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Draco_constellation_map.png",
  "file": "File:Draco constellation map.png"
 },
 "skycorcaroli": {
  "src": "photo-skycorcaroli.jpg",
  "author": "Canes_Venatici_constellation_map.png: Torsten Bronger deriva…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Canes_Venatici_constellation_map.svg",
  "file": "File:Canes Venatici constellation map.svg"
 },
 "skyproxima": {
  "src": "photo-skyproxima.jpg",
  "author": "ESA/Hubble & NASA",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:New_shot_of_Proxima_Centauri,_our_nearest_neighbour.jpg",
  "file": "File:New shot of Proxima Centauri, our nearest neighbour.jpg"
 },
 "skybarnard": {
  "src": "photo-skybarnard.jpg",
  "author": "Steve Quirk",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Barnardstar2006.jpg",
  "file": "File:Barnardstar2006.jpg"
 },
 "skydubhe": {
  "src": "photo-skydubhe.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Ursa_major_constellation_map.png",
  "file": "File:Ursa major constellation map.png"
 },
 "skymerak": {
  "src": "photo-skymerak.jpg",
  "author": "Red marquis at English Wikipedia",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Maserati_merak.jpg",
  "file": "File:Maserati merak.jpg"
 },
 "skyalkaid": {
  "src": "photo-skyalkaid.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Ursa_major_constellation_map.png",
  "file": "File:Ursa major constellation map.png"
 },
 "skypleiades": {
  "src": "photo-skypleiades.jpg",
  "author": "NASA, ESA, AURA/Caltech, Palomar Observatory The science tea…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pleiades_large.jpg",
  "file": "File:Pleiades large.jpg"
 },
 "skyhyades": {
  "src": "photo-skyhyades.jpg",
  "author": "Zbigniew Kawalec",
  "license": "CC BY-SA 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Hiady.jpg",
  "file": "File:Hiady.jpg"
 },
 "skypraesepe": {
  "src": "photo-skypraesepe.jpg",
  "author": "Two Micron All Sky Survey (2MASS), a joint project of the Un…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Messier_044_2MASS.jpg",
  "file": "File:Messier 044 2MASS.jpg"
 },
 "skydoublecluster": {
  "src": "photo-skydoublecluster.jpg",
  "author": "Andrew Cooper acooper@pobox.com",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:NGC869NGC884.jpg",
  "file": "File:NGC869NGC884.jpg"
 },
 "skym13": {
  "src": "photo-skym13.jpg",
  "author": "Credit: Adam Block",
  "license": "CC BY-SA 3.0 US",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/us/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:M13s_32-inch_Schulman_Telescope.jpg",
  "file": "File:M13s 32-inch Schulman Telescope.jpg"
 },
 "skyomegacen": {
  "src": "photo-skyomegacen.jpg",
  "author": "ESO",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Omega_Centauri_by_ESO.jpg",
  "file": "File:Omega Centauri by ESO.jpg"
 },
 "skym42": {
  "src": "photo-skym42.jpg",
  "author": "Ole Nielsen",
  "license": "CC BY-SA 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:M42-20050206-lrgb-900.jpg",
  "file": "File:M42-20050206-lrgb-900.jpg"
 },
 "skyhorsehead": {
  "src": "photo-skyhorsehead.jpg",
  "author": "NASA, NOAO, ESA and The Hubble Heritage Team STScI/AURA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Horsehead-Hubble.jpg",
  "file": "File:Horsehead-Hubble.jpg"
 },
 "skycrab": {
  "src": "photo-skycrab.jpg",
  "author": "NASA, ESA, J. Hester and A. Loll (Arizona State University)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Crab_Nebula.jpg",
  "file": "File:Crab Nebula.jpg"
 },
 "skyeagle": {
  "src": "photo-skyeagle.jpg",
  "author": "ESO",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Eagle_Nebula_from_ESO.jpg",
  "file": "File:Eagle Nebula from ESO.jpg"
 },
 "skyrosette": {
  "src": "photo-skyrosette.jpg",
  "author": "Andreas Fink",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:NGC_2244_Rosette_Nebula.jpg",
  "file": "File:NGC 2244 Rosette Nebula.jpg"
 },
 "skylagoon": {
  "src": "photo-skylagoon.jpg",
  "author": "Philipp Salzgeber",
  "license": "CC BY-SA 2.0 AT",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/at/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Lagoon-Nebula-16-06-2002.jpeg",
  "file": "File:Lagoon-Nebula-16-06-2002.jpeg"
 },
 "skytrifid": {
  "src": "photo-skytrifid.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Trifid.nebula.arp.750pix.jpg",
  "file": "File:Trifid.nebula.arp.750pix.jpg"
 },
 "skynorthamerica": {
  "src": "photo-skynorthamerica.jpg",
  "author": "Philipp Salzgeber",
  "license": "CC BY-SA 2.0 AT",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/at/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:North-America-Nebula-11-08-1997.jpg",
  "file": "File:North-America-Nebula-11-08-1997.jpg"
 },
 "skyring": {
  "src": "photo-skyring.jpg",
  "author": "The Hubble Heritage Team (AURA/STScI/NASA)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:M57_The_Ring_Nebula.JPG",
  "file": "File:M57 The Ring Nebula.JPG"
 },
 "skydumbbell": {
  "src": "photo-skydumbbell.jpg",
  "author": "Credit: George Jacoby, WIYN/NSF",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Messier27.jpg",
  "file": "File:Messier27.jpg"
 },
 "skyhelix": {
  "src": "photo-skyhelix.jpg",
  "author": "NASA, NOAO, ESA, the Hubble Helix Nebula Team, M. Meixner (S…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Iridescent_Glory_of_Nearby_Helix_Nebula.jpg",
  "file": "File:Iridescent Glory of Nearby Helix Nebula.jpg"
 },
 "skyandromedagal": {
  "src": "photo-skyandromedagal.jpg",
  "author": "Adam Evans",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Andromeda_Galaxy_(with_h-alpha).jpg",
  "file": "File:Andromeda Galaxy (with h-alpha).jpg"
 },
 "skytriangulumgal": {
  "src": "photo-skytriangulumgal.jpg",
  "author": "NASA/JPL-Caltech",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:M33.jpg",
  "file": "File:M33.jpg"
 },
 "skylmc": {
  "src": "photo-skylmc.jpg",
  "author": "Pablo Carlos Budassi",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Large_Magellanic_Cloud.png",
  "file": "File:Large Magellanic Cloud.png"
 },
 "skysmc": {
  "src": "photo-skysmc.jpg",
  "author": "ESO/VISTA VMC",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:VISTA%E2%80%99s_view_of_the_Small_Magellanic_Cloud.jpg",
  "file": "File:VISTA’s view of the Small Magellanic Cloud.jpg"
 },
 "skywhirlpool": {
  "src": "photo-skywhirlpool.jpg",
  "author": "NASA and European Space Agency",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Messier51_sRGB.jpg",
  "file": "File:Messier51 sRGB.jpg"
 },
 "skysombrero": {
  "src": "photo-skysombrero.jpg",
  "author": "NASA/ESA and The Hubble Heritage Team (STScI/AURA)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:M104_ngc4594_sombrero_galaxy_hi-res.jpg",
  "file": "File:M104 ngc4594 sombrero galaxy hi-res.jpg"
 },
 "skym87": {
  "src": "photo-skym87.jpg",
  "author": "Two Micron All Sky Survey (2MASS), a joint project of the Un…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Messier_087_2MASS.jpg",
  "file": "File:Messier 087 2MASS.jpg"
 },
 "skyvirgocluster": {
  "src": "photo-skyvirgocluster.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Virgohaufen.png",
  "file": "File:Virgohaufen.png"
 },
 "skybigdipper": {
  "src": "photo-skybigdipper.jpg",
  "author": "Gh5046 at English Wikipedia",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Big_dipper_from_the_kalalau_lookout_at_the_kokee_state_park_in_hawaii.jpg",
  "file": "File:Big dipper from the kalalau lookout at the kokee state park in hawaii.jpg"
 },
 "skysummertriangle": {
  "src": "photo-skysummertriangle.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Summer_triangle_and_constellations.png",
  "file": "File:Summer triangle and constellations.png"
 },
 "skyspringtriangle": {
  "src": "photo-skyspringtriangle.jpg",
  "author": "Tomruen",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Spring_triangle_asterism.png",
  "file": "File:Spring triangle asterism.png"
 },
 "skyautumnsquare": {
  "src": "photo-skyautumnsquare.jpg",
  "author": "Pegasus_constellation_map.png: Torsten Bronger derivative wo…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Pegasus_constellation_map.svg",
  "file": "File:Pegasus constellation map.svg"
 },
 "skymilkyway": {
  "src": "photo-skymilkyway.jpg",
  "author": "pcs34560",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:%E6%A8%AA%E6%89%8B%E5%B1%B1%E3%83%92%E3%83%A5%E3%83%83%E3%83%86%E3%81%8B%E3%82%89%E8%A6%8B%E3%81%9F%E3%80%81%E5%A4%8F%E3%81%AE%E5%A4%A9%E3%81%AE%E5%B7%9D_Pcs34560_IMG3625.jpg",
  "file": "File:横手山ヒュッテから見た、夏の天の川 Pcs34560 IMG3625.jpg"
 },
 "skygalaxy": {
  "src": "photo-skygalaxy.jpg",
  "author": "NASA/JPL-Caltech/ESO/R. Hurt",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Artist%27s_impression_of_the_Milky_Way_(updated_-_annotated).jpg",
  "file": "File:Artist's impression of the Milky Way (updated - annotated).jpg"
 },
 "skylightyear": {
  "src": "photo-skylightyear.jpg",
  "author": "Paul Stansifer, and User:84user (see \"source\")",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:1e15m_comparison_light_year_month_comet_1910a1.png",
  "file": "File:1e15m comparison light year month comet 1910a1.png"
 },
 "skymagnitude": {
  "src": "photo-skymagnitude.jpg",
  "author": "CactiStaccingCrane",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Magnitude_illustration.svg",
  "file": "File:Magnitude illustration.svg"
 },
 "skystarcolor": {
  "src": "photo-skystarcolor.jpg",
  "author": "HeNRyKus",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:HR-diag-no-text-4.svg",
  "file": "File:HR-diag-no-text-4.svg"
 },
 "skydiurnal": {
  "src": "photo-skydiurnal.jpg",
  "author": "名古屋太郎",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Circumpolar_stars_%26_Yarigatake.jpg",
  "file": "File:Circumpolar stars & Yarigatake.jpg"
 },
 "skyecliptic": {
  "src": "photo-skyecliptic.jpg",
  "author": "ChristianReady",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Celestial_Sphere_-_Eq_Ecliptic.png",
  "file": "File:Celestial Sphere - Eq Ecliptic.png"
 },
 "skycelestialsphere": {
  "src": "photo-skycelestialsphere.jpg",
  "author": "ChristianReady",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Celestial_Sphere_-_Eq_w_Label_figures.png",
  "file": "File:Celestial Sphere - Eq w Label figures.png"
 },
 "skyplanisphere": {
  "src": "photo-skyplanisphere.jpg",
  "author": "H. Raab (User:Vesta)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Philips_Planisphere.jpg",
  "file": "File:Philips Planisphere.jpg"
 },
 "skydoublestar": {
  "src": "photo-skydoublestar.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Optical_Double.jpg",
  "file": "File:Optical Double.jpg"
 },
 "skyvariable": {
  "src": "photo-skyvariable.jpg",
  "author": "ESO/M. Montargès et al.",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Eso2003c.jpg",
  "file": "File:Eso2003c.jpg"
 },
 "cosbigbang": {
  "src": "photo-cosbigbang.jpg",
  "author": "png: User:Fredrik; vectorized:Waterced",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Universe_expansion-en.svg",
  "file": "File:Universe expansion-en.svg"
 },
 "coscmb": {
  "src": "photo-coscmb.jpg",
  "author": "Quantum Doughnut",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Cmbr.svg",
  "file": "File:Cmbr.svg"
 },
 "cosdarkmatter": {
  "src": "photo-cosdarkmatter.jpg",
  "author": "NASA/JPL-Caltech",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hairy_Dark_Matter.jpg",
  "file": "File:Hairy Dark Matter.jpg"
 },
 "cosdarkenergy": {
  "src": "photo-cosdarkenergy.jpg",
  "author": "NASA / WMAP Science Team",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:WMAP_2012.png",
  "file": "File:WMAP 2012.png"
 },
 "coscluster": {
  "src": "photo-coscluster.jpg",
  "author": "Chris Mihos (Case Western Reserve University)/ESO",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:ESO-M87.jpg",
  "file": "File:ESO-M87.jpg"
 },
 "cosblackhole": {
  "src": "photo-cosblackhole.jpg",
  "author": "Event Horizon Telescope",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Black_hole_-_Messier_87.jpg",
  "file": "File:Black hole - Messier 87.jpg"
 },
 "cosneutronstar": {
  "src": "photo-cosneutronstar.jpg",
  "author": "NASA/CXC/PSU/G.Pavlov et al.",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Vela_Pulsar_jet.jpg",
  "file": "File:Vela Pulsar jet.jpg"
 },
 "cospulsar": {
  "src": "photo-cospulsar.jpg",
  "author": "User:Mysid, User:Jm smits",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Pulsar_schematic.svg",
  "file": "File:Pulsar schematic.svg"
 },
 "cossupernova": {
  "src": "photo-cossupernova.jpg",
  "author": "NASA/ESA/JHU/R.Sankrit & W.Blair",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Keplers_supernova.jpg",
  "file": "File:Keplers supernova.jpg"
 },
 "cosredgiant": {
  "src": "photo-cosredgiant.jpg",
  "author": "HeNRyKus",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:HR-diag-no-text-4.svg",
  "file": "File:HR-diag-no-text-4.svg"
 },
 "coswhitedwarf": {
  "src": "photo-coswhitedwarf.jpg",
  "author": "NASA, ESA, H. Bond (STScI), and M. Barstow (University of Le…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sirius_A_and_B_Hubble_photo.editted.PNG",
  "file": "File:Sirius A and B Hubble photo.editted.PNG"
 },
 "cosmainsequence": {
  "src": "photo-cosmainsequence.jpg",
  "author": "HeNRyKus",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:HR-diag-no-text-4.svg",
  "file": "File:HR-diag-no-text-4.svg"
 },
 "cosstar": {
  "src": "photo-cosstar.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Alpheratz.gif",
  "file": "File:Alpheratz.gif"
 },
 "cosstellarlife": {
  "src": "photo-cosstellarlife.jpg",
  "author": "Avsa",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Triangle_of_everything_-_Stellar_Evolution.png",
  "file": "File:Triangle of everything - Stellar Evolution.png"
 },
 "cosplanetarynebula": {
  "src": "photo-cosplanetarynebula.jpg",
  "author": "Pablo Carlos Budassi",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Planetary_nebulae_with_annotated_information.jpg",
  "file": "File:Planetary nebulae with annotated information.jpg"
 },
 "cosexoplanet": {
  "src": "photo-cosexoplanet.jpg",
  "author": "ESO/M. Kornmesser",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Planets_everywhere_(artist%E2%80%99s_impression).jpg",
  "file": "File:Planets everywhere (artist’s impression).jpg"
 },
 "coshabitable": {
  "src": "photo-coshabitable.jpg",
  "author": "Chester Harman",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Diagram_of_different_habitable_zone_regions_by_Chester_Harman.jpg",
  "file": "File:Diagram of different habitable zone regions by Chester Harman.jpg"
 },
 "cosquasar": {
  "src": "photo-cosquasar.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gb1508_illustration.jpg",
  "file": "File:Gb1508 illustration.jpg"
 },
 "cosrelativity": {
  "src": "photo-cosrelativity.jpg",
  "author": "Johnstone at English Wikipedia Original text: Created by Use…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Spacetime_curvature.png",
  "file": "File:Spacetime curvature.png"
 },
 "cosgalaxyword": {
  "src": "photo-cosgalaxyword.jpg",
  "author": "The Hubble Heritage Team (AURA/STScI/NASA)NASA Headquarters …",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:NGC_4414_(NASA-med).jpg",
  "file": "File:NGC 4414 (NASA-med).jpg"
 },
 "cosstarcluster": {
  "src": "photo-cosstarcluster.jpg",
  "author": "Fried Lauterbach",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:M44_47x300s-10%C2%B0C_O30_G0_PM_RGB_03032022.jpg",
  "file": "File:M44 47x300s-10°C O30 G0 PM RGB 03032022.jpg"
 },
 "cosnebulaword": {
  "src": "photo-cosnebulaword.jpg",
  "author": "Hui Yang (University of Illinois) and NASA/ESA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Nursery_of_New_Stars_-_GPN-2000-000972.jpg",
  "file": "File:Nursery of New Stars - GPN-2000-000972.jpg"
 },
 "cosuniverse": {
  "src": "photo-cosuniverse.jpg",
  "author": "NASA and the European Space Agency.",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hubble_ultra_deep_field.jpg",
  "file": "File:Hubble ultra deep field.jpg"
 },
 "cosastronomy": {
  "src": "photo-cosastronomy.jpg",
  "author": "Me and Aladin at SIMBAD.",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:AladinDNe2011.02.25-23-22-24.897.png",
  "file": "File:AladinDNe2011.02.25-23-22-24.897.png"
 },
 "cosobservatory": {
  "src": "photo-cosobservatory.jpg",
  "author": "100yen 10:51, 29 December 2006 (UTC)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Sapporo_observatory.JPG",
  "file": "File:Sapporo observatory.JPG"
 },
 "cossubaru": {
  "src": "photo-cossubaru.jpg",
  "author": "Bob Tubbs",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Subaru_keck_tels.jpg",
  "file": "File:Subaru keck tels.jpg"
 },
 "costelescope": {
  "src": "photo-costelescope.jpg",
  "author": "National Museum of the U.S. Navy",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:LC-J698-61293_Lot_8688_(17125406853).jpg",
  "file": "File:LC-J698-61293 Lot 8688 (17125406853).jpg"
 },
 "cosradiotelescope": {
  "src": "photo-cosradiotelescope.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:USA.NM.VeryLargeArray.03.jpg",
  "file": "File:USA.NM.VeryLargeArray.03.jpg"
 },
 "cosexolife": {
  "src": "photo-cosexolife.jpg",
  "author": "US Government (the white house) + Colby Gutierrez-Craybill +…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:White_House_position_on_ET.png",
  "file": "File:White House position on ET.png"
 },
 "cossgra": {
  "src": "photo-cossgra.jpg",
  "author": "EHT Collaboration",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sag_A*.jpg",
  "file": "File:Sag A*.jpg"
 },
 "bonskull": {
  "src": "photo-bonskull.jpg",
  "author": "Raul654",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Hippo_skull_dark.jpg",
  "file": "File:Hippo skull dark.jpg"
 },
 "bonjaw": {
  "src": "photo-bonjaw.jpg",
  "author": "Images are generated by Life Science Databases(LSDB).",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Mandible_bone.png",
  "file": "File:Mandible bone.png"
 },
 "boncervical": {
  "src": "photo-boncervical.jpg",
  "author": "Anatomography",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Cervical_vertebrae_lateral2.png",
  "file": "File:Cervical vertebrae lateral2.png"
 },
 "bonclavicle": {
  "src": "photo-bonclavicle.jpg",
  "author": "No machine-readable author provided. Palica assumed (based o…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Clavicula_sup.jpg",
  "file": "File:Clavicula sup.jpg"
 },
 "bonscapula": {
  "src": "photo-bonscapula.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray206.png",
  "file": "File:Gray206.png"
 },
 "bonsternum": {
  "src": "photo-bonsternum.jpg",
  "author": "Anatomography",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Sternum_front.png",
  "file": "File:Sternum front.png"
 },
 "bonribs": {
  "src": "photo-bonribs.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray112.png",
  "file": "File:Gray112.png"
 },
 "bonspine": {
  "src": "photo-bonspine.jpg",
  "author": "Original: Arcadian Vector: Pixelsquid🎱",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_vertebral_column.svg",
  "file": "File:Illu vertebral column.svg"
 },
 "bonlumbar": {
  "src": "photo-bonlumbar.jpg",
  "author": "Anatomography",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Lumbar_vertebrae_anterior.png",
  "file": "File:Lumbar vertebrae anterior.png"
 },
 "bonpelvis": {
  "src": "photo-bonpelvis.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray242.png",
  "file": "File:Gray242.png"
 },
 "bonsacrum": {
  "src": "photo-bonsacrum.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray95.png",
  "file": "File:Gray95.png"
 },
 "boncoccyx": {
  "src": "photo-boncoccyx.jpg",
  "author": "BodyParts3D is made by DBCLS",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Coccyx_-_animation05.gif",
  "file": "File:Coccyx - animation05.gif"
 },
 "bonhumerus": {
  "src": "photo-bonhumerus.jpg",
  "author": "Original: US Government Vector: Pixelsquid🎱",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_upper_extremity.svg",
  "file": "File:Illu upper extremity.svg"
 },
 "bonradius": {
  "src": "photo-bonradius.jpg",
  "author": "Original: US Government Vector: Pixelsquid🎱",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_upper_extremity.svg",
  "file": "File:Illu upper extremity.svg"
 },
 "bonulna": {
  "src": "photo-bonulna.jpg",
  "author": "Original: US Government Vector: Pixelsquid🎱",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_upper_extremity.svg",
  "file": "File:Illu upper extremity.svg"
 },
 "bonmetacarpal": {
  "src": "photo-bonmetacarpal.jpg",
  "author": "self & Meyers Konversionlexikon 1888, [1]",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Mammals_metacarp.png",
  "file": "File:Mammals metacarp.png"
 },
 "bonphalanx": {
  "src": "photo-bonphalanx.jpg",
  "author": "Mariana Ruiz Villarreal (LadyofHats); retouches by Nyks",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Scheme_human_hand_bones-ja.svg",
  "file": "File:Scheme human hand bones-ja.svg"
 },
 "bonfemur": {
  "src": "photo-bonfemur.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray252.png",
  "file": "File:Gray252.png"
 },
 "bonpatella": {
  "src": "photo-bonpatella.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Patella_ant.jpg",
  "file": "File:Patella ant.jpg"
 },
 "bontibia": {
  "src": "photo-bontibia.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray260.png",
  "file": "File:Gray260.png"
 },
 "bonfibula": {
  "src": "photo-bonfibula.jpg",
  "author": "Anatomography",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Fibula_-_anterior_view.png",
  "file": "File:Fibula - anterior view.png"
 },
 "bonmetatarsal": {
  "src": "photo-bonmetatarsal.jpg",
  "author": "BodyParts3D is made by DBCLS.",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Metatarsal_bones01_-_superior_view.png",
  "file": "File:Metatarsal bones01 - superior view.png"
 },
 "boncalcaneus": {
  "src": "photo-boncalcaneus.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Subtalar_Joint.svg",
  "file": "File:Subtalar Joint.svg"
 },
 "bonbone": {
  "src": "photo-bonbone.jpg",
  "author": "不明",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Left_femur_of_extinct_elephant,_Alaska,_Ice_Age_Wellcome_L0057714.jpg",
  "file": "File:Left femur of extinct elephant, Alaska, Ice Age Wellcome L0057714.jpg"
 },
 "bonjoint": {
  "src": "photo-bonjoint.jpg",
  "author": "OpenStax College",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:909_Types_of_Synovial_Joints.jpg",
  "file": "File:909 Types of Synovial Joints.jpg"
 },
 "boncartilage": {
  "src": "photo-boncartilage.jpg",
  "author": "Robert M. Hunt",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Hypertrophic_Zone_of_Epiphyseal_Plate.jpg",
  "file": "File:Hypertrophic Zone of Epiphyseal Plate.jpg"
 },
 "bonmarrow": {
  "src": "photo-bonmarrow.jpg",
  "author": "Mysid",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray72-en.svg",
  "file": "File:Gray72-en.svg"
 },
 "bonperiosteum": {
  "src": "photo-bonperiosteum.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_bone_growth.jpg",
  "file": "File:Illu bone growth.jpg"
 },
 "bonshoulder": {
  "src": "photo-bonshoulder.jpg",
  "author": "BruceBlaus. When using this image in external sources it can…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blausen_0797_ShoulderJoint.png",
  "file": "File:Blausen 0797 ShoulderJoint.png"
 },
 "bonelbow": {
  "src": "photo-bonelbow.jpg",
  "author": "Sad Edgar",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gray329_numbered.png",
  "file": "File:Gray329 numbered.png"
 },
 "bonwrist": {
  "src": "photo-bonwrist.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray334.png",
  "file": "File:Gray334.png"
 },
 "bonankle": {
  "src": "photo-bonankle.jpg",
  "author": "אנדר-ויק",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ankle.jpg",
  "file": "File:Ankle.jpg"
 },
 "bondisc": {
  "src": "photo-bondisc.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray301.png",
  "file": "File:Gray301.png"
 },
 "bonskeleton": {
  "src": "photo-bonskeleton.jpg",
  "author": "Hibernian (talk)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Horse_and_Man.jpg",
  "file": "File:Horse and Man.jpg"
 },
 "boncapsule": {
  "src": "photo-boncapsule.jpg",
  "author": "Madhero88",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Joint.svg",
  "file": "File:Joint.svg"
 },
 "bonthorax": {
  "src": "photo-bonthorax.jpg",
  "author": "Conrad 7",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Boy%27s_Chest_And_Nipples.jpg",
  "file": "File:Boy's Chest And Nipples.jpg"
 },
 "boncheek": {
  "src": "photo-boncheek.jpg",
  "author": "Images are generated by Life Science Databases(LSDB).",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Zygomatic_bone.png",
  "file": "File:Zygomatic bone.png"
 },
 "bonnasal": {
  "src": "photo-bonnasal.jpg",
  "author": "Images are generated by Life Science Databases(LSDB).",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Nasal_bone.png",
  "file": "File:Nasal bone.png"
 },
 "bonhyoid": {
  "src": "photo-bonhyoid.jpg",
  "author": "OpenStax College",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:712_Hyoid_Bone_-_ja.jpg",
  "file": "File:712 Hyoid Bone - ja.jpg"
 },
 "bonossicle": {
  "src": "photo-bonossicle.jpg",
  "author": "Illu auditory ossicles.jpg: US Government (original); SVG ve…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_auditory_ossicles-en.svg",
  "file": "File:Illu auditory ossicles-en.svg"
 },
 "musmuscle": {
  "src": "photo-musmuscle.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Skeletal_muscle.jpg",
  "file": "File:Skeletal muscle.jpg"
 },
 "musskeletal": {
  "src": "photo-musskeletal.jpg",
  "author": "BruceBlaus. When using this image in external sources it can…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blausen_0801_SkeletalMuscle.png",
  "file": "File:Blausen 0801 SkeletalMuscle.png"
 },
 "mussmooth": {
  "src": "photo-mussmooth.jpg",
  "author": "User:Polarlys",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Glatte_Muskelzellen.jpg",
  "file": "File:Glatte Muskelzellen.jpg"
 },
 "muscardiac": {
  "src": "photo-muscardiac.jpg",
  "author": "Dr. S. Girod, Anton Becker",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Glanzstreifen.jpg",
  "file": "File:Glanzstreifen.jpg"
 },
 "musbiceps": {
  "src": "photo-musbiceps.jpg",
  "author": "Pearson Scott Foresman",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Biceps_(PSF).jpg",
  "file": "File:Biceps (PSF).jpg"
 },
 "mustriceps": {
  "src": "photo-mustriceps.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Triceps_brachii.png",
  "file": "File:Triceps brachii.png"
 },
 "musdeltoid": {
  "src": "photo-musdeltoid.jpg",
  "author": "Original: sv:Användare:Chrizz",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Deltoideus.png",
  "file": "File:Deltoideus.png"
 },
 "muspectoral": {
  "src": "photo-muspectoral.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Pectoralis_major.png",
  "file": "File:Pectoralis major.png"
 },
 "musabs": {
  "src": "photo-musabs.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Rectus_abdominis.png",
  "file": "File:Rectus abdominis.png"
 },
 "musoblique": {
  "src": "photo-musoblique.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray392.png",
  "file": "File:Gray392.png"
 },
 "musback": {
  "src": "photo-musback.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray389_-_Erector_spinae.png",
  "file": "File:Gray389 - Erector spinae.png"
 },
 "mustrapezius": {
  "src": "photo-mustrapezius.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Trapezius.png",
  "file": "File:Trapezius.png"
 },
 "musgluteus": {
  "src": "photo-musgluteus.jpg",
  "author": "Dr. Johannes Sobotta",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sobo_1909_294.png",
  "file": "File:Sobo 1909 294.png"
 },
 "musquad": {
  "src": "photo-musquad.jpg",
  "author": "The original uploader was יוסי הראשון at Hebrew Wikipedia.",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Quadriceps_he.png",
  "file": "File:Quadriceps he.png"
 },
 "mushamstring": {
  "src": "photo-mushamstring.jpg",
  "author": "BodyParts3D/Anatomography",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Hamstrings.gif",
  "file": "File:Hamstrings.gif"
 },
 "muscalf": {
  "src": "photo-muscalf.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Gastrocnemius.png",
  "file": "File:Gastrocnemius.png"
 },
 "mustibialis": {
  "src": "photo-mustibialis.jpg",
  "author": "Bildberabetning: sv:Användare:Chrizz. Original uploader was …",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Tibialis.png",
  "file": "File:Tibialis.png"
 },
 "musachilles": {
  "src": "photo-musachilles.jpg",
  "author": "Henry Gray",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Achilles-tendon.jpg",
  "file": "File:Achilles-tendon.jpg"
 },
 "musdiaphragm": {
  "src": "photo-musdiaphragm.jpg",
  "author": "Theresa knott, Luigi Chiesa, Hatsukari715",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Respiratory_system_ja.svg",
  "file": "File:Respiratory system ja.svg"
 },
 "mustendon": {
  "src": "photo-mustendon.jpg",
  "author": "Own work",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sehnenscheide.svg",
  "file": "File:Sehnenscheide.svg"
 },
 "musmasseter": {
  "src": "photo-musmasseter.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray378.png",
  "file": "File:Gray378.png"
 },
 "musfiber": {
  "src": "photo-musfiber.jpg",
  "author": "see above",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Synapse_diag3.png",
  "file": "File:Synapse diag3.png"
 },
 "muslat": {
  "src": "photo-muslat.jpg",
  "author": "Nikai",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Latissimus_dorsi.png",
  "file": "File:Latissimus dorsi.png"
 },
 "orgmouth": {
  "src": "photo-orgmouth.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sagittalmouth.png",
  "file": "File:Sagittalmouth.png"
 },
 "orgteeth": {
  "src": "photo-orgteeth.jpg",
  "author": "Richard from Canton, United States",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Close_up_-_chimpanzee_teeth.png",
  "file": "File:Close up - chimpanzee teeth.png"
 },
 "orgtongue": {
  "src": "photo-orgtongue.jpg",
  "author": "Hariadhi",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tongue.svg",
  "file": "File:Tongue.svg"
 },
 "orgsalivary": {
  "src": "photo-orgsalivary.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_quiz_hn_02.jpg",
  "file": "File:Illu quiz hn 02.jpg"
 },
 "orgesophagus": {
  "src": "photo-orgesophagus.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Magendarmkanal.JPG",
  "file": "File:Magendarmkanal.JPG"
 },
 "orgstomach": {
  "src": "photo-orgstomach.jpg",
  "author": "ignis",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Stomach002.svg",
  "file": "File:Stomach002.svg"
 },
 "orgsmallint": {
  "src": "photo-orgsmallint.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Magendarmkanal.JPG",
  "file": "File:Magendarmkanal.JPG"
 },
 "orglargeint": {
  "src": "photo-orglargeint.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_intestine.jpg",
  "file": "File:Illu intestine.jpg"
 },
 "orgduodenum": {
  "src": "photo-orgduodenum.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Magendarmkanal.JPG",
  "file": "File:Magendarmkanal.JPG"
 },
 "orgliver": {
  "src": "photo-orgliver.jpg",
  "author": "de:Benutzer:Uwe Gille",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Leber_Schaf.jpg",
  "file": "File:Leber Schaf.jpg"
 },
 "orggallbladder": {
  "src": "photo-orggallbladder.jpg",
  "author": "training.seer.cancer.gov",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_pancrease.jpg",
  "file": "File:Illu pancrease.jpg"
 },
 "orgpancreas": {
  "src": "photo-orgpancreas.jpg",
  "author": "Takuma-sa",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_pancrease.jp.jpg",
  "file": "File:Illu pancrease.jp.jpg"
 },
 "orgrectum": {
  "src": "photo-orgrectum.jpg",
  "author": "User:Kuebi = Armin Kübelbeck",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rectum_anatomy_ja.svg",
  "file": "File:Rectum anatomy ja.svg"
 },
 "organus": {
  "src": "photo-organus.jpg",
  "author": "Autisticeditor 20",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Dog%E2%80%99s_anus.jpg",
  "file": "File:Dog’s anus.jpg"
 },
 "orgappendix": {
  "src": "photo-orgappendix.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Magendarmkanal.JPG",
  "file": "File:Magendarmkanal.JPG"
 },
 "orgpharynx": {
  "src": "photo-orgpharynx.jpg",
  "author": "Arcadian",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu01_head_neck.jpg",
  "file": "File:Illu01 head neck.jpg"
 },
 "orgnose": {
  "src": "photo-orgnose.jpg",
  "author": "不明",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:TE-Nose_diagram.svg",
  "file": "File:TE-Nose diagram.svg"
 },
 "orgnasal": {
  "src": "photo-orgnasal.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray855.png",
  "file": "File:Gray855.png"
 },
 "orgtrachea": {
  "src": "photo-orgtrachea.jpg",
  "author": "Nesnad",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_conducting_passages%E6%97%A5%E6%9C%AC%E8%AA%9E.jpg",
  "file": "File:Illu conducting passages日本語.jpg"
 },
 "orgbronchus": {
  "src": "photo-orgbronchus.jpg",
  "author": "https://www.scientificanimations.com",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:3D_Medical_Animation_Bronchus_Description.jpg",
  "file": "File:3D Medical Animation Bronchus Description.jpg"
 },
 "orglung": {
  "src": "photo-orglung.jpg",
  "author": "Gray's Anatomy",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Heart-and-lungs.jpg",
  "file": "File:Heart-and-lungs.jpg"
 },
 "orgalveolus": {
  "src": "photo-orgalveolus.jpg",
  "author": "LadyofHats (translated by Hatsukari715)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Alveolus_diagram_ja.svg",
  "file": "File:Alveolus diagram ja.svg"
 },
 "orglarynx": {
  "src": "photo-orglarynx.jpg",
  "author": "Nesnad",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_conducting_passages%E6%97%A5%E6%9C%AC%E8%AA%9E.jpg",
  "file": "File:Illu conducting passages日本語.jpg"
 },
 "orgheart": {
  "src": "photo-orgheart.jpg",
  "author": "Jerm",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Heart_anterior_exterior_view.png",
  "file": "File:Heart anterior exterior view.png"
 },
 "orgartery": {
  "src": "photo-orgartery.jpg",
  "author": "LadyofHats, Mariana Ruiz Villarreal",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Arterial_System_en.svg",
  "file": "File:Arterial System en.svg"
 },
 "orgcapillary": {
  "src": "photo-orgcapillary.jpg",
  "author": "Community Emergency Response Team",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Capillary_system_CERT.jpg",
  "file": "File:Capillary system CERT.jpg"
 },
 "orgvessel": {
  "src": "photo-orgvessel.jpg",
  "author": "LadyofHats, Mariana Ruiz Villarreal",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Circulatory_System_en.svg",
  "file": "File:Circulatory System en.svg"
 },
 "orgaorta": {
  "src": "photo-orgaorta.jpg",
  "author": "Wapcaplet and Yaddah (translated by Hatsukari715)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped)_ja.svg",
  "file": "File:Diagram of the human heart (cropped) ja.svg"
 },
 "orgventricle": {
  "src": "photo-orgventricle.jpg",
  "author": "Jerm",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Heart_anterior_exterior_view.png",
  "file": "File:Heart anterior exterior view.png"
 },
 "orglymphvessel": {
  "src": "photo-orglymphvessel.jpg",
  "author": "BruceBlaus. When using this image in external sources it can…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blausen_0623_LymphaticSystem_Female.png",
  "file": "File:Blausen 0623 LymphaticSystem Female.png"
 },
 "orglymphnode": {
  "src": "photo-orglymphnode.jpg",
  "author": "NIH",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lymphatic_system.png",
  "file": "File:Lymphatic system.png"
 },
 "orgspleen": {
  "src": "photo-orgspleen.jpg",
  "author": "Illu_spleen.jpg: US GOV derivative work: Nesnad (talk)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_spleen_jp.jpg",
  "file": "File:Illu spleen jp.jpg"
 },
 "orgkidney": {
  "src": "photo-orgkidney.jpg",
  "author": "BruceBlaus. When using this image in external sources it can…",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blausen_0592_KidneyAnatomy_01.png",
  "file": "File:Blausen 0592 KidneyAnatomy 01.png"
 },
 "orgbladder": {
  "src": "photo-orgbladder.jpg",
  "author": "Nesnad",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_urinary_system-ja.jpg",
  "file": "File:Illu urinary system-ja.jpg"
 },
 "orgureter": {
  "src": "photo-orgureter.jpg",
  "author": "Piotr Michał Jaworski; PioM EN DE PL",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Kidney_PioM.png",
  "file": "File:Kidney PioM.png"
 },
 "orgurethra": {
  "src": "photo-orgurethra.jpg",
  "author": "OpenStax College",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Female_and_Male_Urethra.jpg",
  "file": "File:Female and Male Urethra.jpg"
 },
 "orgnephron": {
  "src": "photo-orgnephron.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray1128.png",
  "file": "File:Gray1128.png"
 },
 "orgskin": {
  "src": "photo-orgskin.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Human_skin_structure.jpg",
  "file": "File:Human skin structure.jpg"
 },
 "orgsweatgland": {
  "src": "photo-orgsweatgland.jpg",
  "author": "US-Gov",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Skin.png",
  "file": "File:Skin.png"
 },
 "orguterus": {
  "src": "photo-orguterus.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray1161.png",
  "file": "File:Gray1161.png"
 },
 "orgovary": {
  "src": "photo-orgovary.jpg",
  "author": "Jmarchn",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Scheme_female_reproductive_system-ja.svg",
  "file": "File:Scheme female reproductive system-ja.svg"
 },
 "orgtestis": {
  "src": "photo-orgtestis.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_testis_schematic.jpg",
  "file": "File:Illu testis schematic.jpg"
 },
 "orgeye": {
  "src": "photo-orgeye.jpg",
  "author": "Rapidreflex",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Human_eye_with_limbal_ring,_anterior_view.jpg",
  "file": "File:Human eye with limbal ring, anterior view.jpg"
 },
 "orgear": {
  "src": "photo-orgear.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Earcov.JPG",
  "file": "File:Earcov.JPG"
 },
 "orgretina": {
  "src": "photo-orgretina.jpg",
  "author": "NIH National Eye Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Human_eye_cross-sectional_view_grayscale.png",
  "file": "File:Human eye cross-sectional view grayscale.png"
 },
 "orglens": {
  "src": "photo-orglens.jpg",
  "author": "Rhcastilhos (translated by Hatsukari715). And Jmarchn",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Schematic_diagram_of_the_human_eye_ja.svg",
  "file": "File:Schematic diagram of the human eye ja.svg"
 },
 "orgcornea": {
  "src": "photo-orgcornea.jpg",
  "author": "Rhcastilhos (translated by Hatsukari715). And Jmarchn",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Schematic_diagram_of_the_human_eye_ja.svg",
  "file": "File:Schematic diagram of the human eye ja.svg"
 },
 "orgiris": {
  "src": "photo-orgiris.jpg",
  "author": "Rapidreflex",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Human_eye_close_up,_anterior_view.jpg",
  "file": "File:Human eye close up, anterior view.jpg"
 },
 "orgpupil": {
  "src": "photo-orgpupil.jpg",
  "author": "Michael Reeve",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Iris.eye.225px.jpg",
  "file": "File:Iris.eye.225px.jpg"
 },
 "orgopticnerve": {
  "src": "photo-orgopticnerve.jpg",
  "author": "NIH National Eye Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Human_eye_cross-sectional_view_grayscale.png",
  "file": "File:Human eye cross-sectional view grayscale.png"
 },
 "orgeardrum": {
  "src": "photo-orgeardrum.jpg",
  "author": "Zoph at German Wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Trommelfell.png",
  "file": "File:Trommelfell.png"
 },
 "orgcochlea": {
  "src": "photo-orgcochlea.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray921_ja.png",
  "file": "File:Gray921 ja.png"
 },
 "orgsemicircular": {
  "src": "photo-orgsemicircular.jpg",
  "author": "Iain",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Ear-anatomy.png",
  "file": "File:Ear-anatomy.png"
 },
 "orgtastebud": {
  "src": "photo-orgtastebud.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Smagsloeg.png",
  "file": "File:Smagsloeg.png"
 },
 "orgeyelid": {
  "src": "photo-orgeyelid.jpg",
  "author": "Rapidreflex",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Closed_human_eye,_superior_view.jpg",
  "file": "File:Closed human eye, superior view.jpg"
 },
 "orgbrain": {
  "src": "photo-orgbrain.jpg",
  "author": "Gaetan Lee . Tilt corrected by Kaldari.",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Chimp_Brain_in_a_jar.jpg",
  "file": "File:Chimp Brain in a jar.jpg"
 },
 "orgcerebrum": {
  "src": "photo-orgcerebrum.jpg",
  "author": "John A Beal, PhD. Dep't. of Cellular Biology & Anatomy, Loui…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Human_brain_midsagittal_cut_color.png",
  "file": "File:Human brain midsagittal cut color.png"
 },
 "orgcerebellum": {
  "src": "photo-orgcerebellum.jpg",
  "author": "John A Beal, PhD. Dep't. of Cellular Biology & Anatomy, Loui…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Human_brain_midsagittal_cut_color.png",
  "file": "File:Human brain midsagittal cut color.png"
 },
 "orgbrainstem": {
  "src": "photo-orgbrainstem.jpg",
  "author": "John A Beal, PhD. Dep't. of Cellular Biology & Anatomy, Loui…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Human_brain_midsagittal_cut_color.png",
  "file": "File:Human brain midsagittal cut color.png"
 },
 "orgdiencephalon": {
  "src": "photo-orgdiencephalon.jpg",
  "author": "John A Beal, PhD. Dep't. of Cellular Biology & Anatomy, Loui…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Human_brain_midsagittal_cut_color.png",
  "file": "File:Human brain midsagittal cut color.png"
 },
 "orghypothalamus": {
  "src": "photo-orghypothalamus.jpg",
  "author": "Images are generated by Life Science Databases(LSDB).",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Hypothalamus_image.png",
  "file": "File:Hypothalamus image.png"
 },
 "orgpituitary": {
  "src": "photo-orgpituitary.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray1181.png",
  "file": "File:Gray1181.png"
 },
 "orgmedulla": {
  "src": "photo-orgmedulla.jpg",
  "author": "John A Beal, PhD. Dep't. of Cellular Biology & Anatomy, Loui…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Human_brain_midsagittal_cut_color.png",
  "file": "File:Human brain midsagittal cut color.png"
 },
 "orgspinalcord": {
  "src": "photo-orgspinalcord.jpg",
  "author": "User:Polarlys",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Medulla_spinalis_-_Section_-_English.svg",
  "file": "File:Medulla spinalis - Section - English.svg"
 },
 "orgnerve": {
  "src": "photo-orgnerve.jpg",
  "author": "Sugita Genpaku / Nakagawa Jun'an / Maeno Ryōtaku",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Chiikigakusaga_kaitaishinsho1-0023_shinkei.jpg",
  "file": "File:Chiikigakusaga kaitaishinsho1-0023 shinkei.jpg"
 },
 "orgperipheral": {
  "src": "photo-orgperipheral.jpg",
  "author": "Medium69, Jmarchn",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Nervous_system_diagram-en.svg",
  "file": "File:Nervous system diagram-en.svg"
 },
 "orgmotornerve": {
  "src": "photo-orgmotornerve.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:PSM_V26_D754_Motor_nerve_cells.jpg",
  "file": "File:PSM V26 D754 Motor nerve cells.jpg"
 },
 "orgsensorynerve": {
  "src": "photo-orgsensorynerve.jpg",
  "author": "Helixitta",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Afferent_and_efferent_neurons_en.svg",
  "file": "File:Afferent and efferent neurons en.svg"
 },
 "orgautonomic": {
  "src": "photo-orgautonomic.jpg",
  "author": "OpenStax College",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:1503_Connections_of_the_Parasympathetic_Nervous_System.jpg",
  "file": "File:1503 Connections of the Parasympathetic Nervous System.jpg"
 },
 "orgthyroid": {
  "src": "photo-orgthyroid.jpg",
  "author": "CFCF",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_thyroid_parathyroid.jpg",
  "file": "File:Illu thyroid parathyroid.jpg"
 },
 "orgadrenal": {
  "src": "photo-orgadrenal.jpg",
  "author": "EEOC",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_adrenal_gland.jpg",
  "file": "File:Illu adrenal gland.jpg"
 },
 "sysbreathing": {
  "src": "photo-sysbreathing.jpg",
  "author": "Cruithne9",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gas_exchange.jpg",
  "file": "File:Gas exchange.jpg"
 },
 "sysoxygen": {
  "src": "photo-sysoxygen.jpg",
  "author": "U.S. Air Force/Staff Sgt. Jim Araos",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Liquid_oxygen_in_a_beaker_4.jpg",
  "file": "File:Liquid oxygen in a beaker 4.jpg"
 },
 "sysco2": {
  "src": "photo-sysco2.jpg",
  "author": "Benjah-bmm27",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Carbon-dioxide-3D-vdW.png",
  "file": "File:Carbon-dioxide-3D-vdW.png"
 },
 "sysgasexchange": {
  "src": "photo-sysgasexchange.jpg",
  "author": "domdomegg",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Gas_exchange_in_the_aveolus_simple_(ja).svg",
  "file": "File:Gas exchange in the aveolus simple (ja).svg"
 },
 "syscilia": {
  "src": "photo-syscilia.jpg",
  "author": "see source",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Tetrahymena_thermophila.png",
  "file": "File:Tetrahymena thermophila.png"
 },
 "syscough": {
  "src": "photo-syscough.jpg",
  "author": "UnknownUnknown / CDC",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pertussis.jpg",
  "file": "File:Pertussis.jpg"
 },
 "sysvocalcord": {
  "src": "photo-sysvocalcord.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray956.png",
  "file": "File:Gray956.png"
 },
 "syssaliva": {
  "src": "photo-syssaliva.jpg",
  "author": "Pereru",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Saliva_Baby.jpg",
  "file": "File:Saliva Baby.jpg"
 },
 "sysbile": {
  "src": "photo-sysbile.jpg",
  "author": "User:Vishnu2011",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Biliary_system_new-ja.svg",
  "file": "File:Biliary system new-ja.svg"
 },
 "sysamylase": {
  "src": "photo-sysamylase.jpg",
  "author": "Own work.",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Salivary_alpha-amylase_1SMD.png",
  "file": "File:Salivary alpha-amylase 1SMD.png"
 },
 "syspepsin": {
  "src": "photo-syspepsin.jpg",
  "author": "No machine-readable author provided. DrKjaergaard assumed (b…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:1PSO.png",
  "file": "File:1PSO.png"
 },
 "syslipase": {
  "src": "photo-syslipase.jpg",
  "author": "US gov",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Lipase_PLRP2.png",
  "file": "File:Lipase PLRP2.png"
 },
 "sysperistalsis": {
  "src": "photo-sysperistalsis.jpg",
  "author": "Auawise",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Peristalsis.gif",
  "file": "File:Peristalsis.gif"
 },
 "sysexcretion": {
  "src": "photo-sysexcretion.jpg",
  "author": "ZooFari",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Uric_Acid.svg",
  "file": "File:Uric Acid.svg"
 },
 "sysurine": {
  "src": "photo-sysurine.jpg",
  "author": "User:Lennert B",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Harntrakt_de_2.png",
  "file": "File:Harntrakt de 2.png"
 },
 "sysurea": {
  "src": "photo-sysurea.jpg",
  "author": "Jü",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Urea_Structural_Formula_V2.svg",
  "file": "File:Urea Structural Formula V2.svg"
 },
 "sysammonia": {
  "src": "photo-sysammonia.jpg",
  "author": "Д.Ильин: vectorization",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ammonia-dimensions-from-Greenwood%26Earnshaw-2D.svg",
  "file": "File:Ammonia-dimensions-from-Greenwood&Earnshaw-2D.svg"
 },
 "sysblood": {
  "src": "photo-sysblood.jpg",
  "author": "Unknown authorUnknown author",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:NIK_3232-Drops_of_blood_medium.JPG",
  "file": "File:NIK 3232-Drops of blood medium.JPG"
 },
 "syscirculation": {
  "src": "photo-syscirculation.jpg",
  "author": "LadyofHats, Mariana Ruiz Villarreal",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Circulatory_System_en.svg",
  "file": "File:Circulatory System en.svg"
 },
 "syspulmonary": {
  "src": "photo-syspulmonary.jpg",
  "author": "Takuma-sa",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Pulmonary_circulation-ja.jpg",
  "file": "File:Pulmonary circulation-ja.jpg"
 },
 "syssystemic": {
  "src": "photo-syssystemic.jpg",
  "author": "Cmglee",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sankey_diagram_human_circulatory_system.svg",
  "file": "File:Sankey diagram human circulatory system.svg"
 },
 "sysredcell": {
  "src": "photo-sysredcell.jpg",
  "author": "Bobjgalindo",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Reactive_lymph.JPG",
  "file": "File:Reactive lymph.JPG"
 },
 "syswhitecell": {
  "src": "photo-syswhitecell.jpg",
  "author": "Electron Microscopy Facility at The National Cancer Institut…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Red_White_Blood_cells.jpg",
  "file": "File:Red White Blood cells.jpg"
 },
 "sysplatelet": {
  "src": "photo-sysplatelet.jpg",
  "author": "Dr Graham Beards",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Platelets2.JPG",
  "file": "File:Platelets2.JPG"
 },
 "sysplasma": {
  "src": "photo-sysplasma.jpg",
  "author": "DiverDave",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:FreshFrozenPlasma.JPG",
  "file": "File:FreshFrozenPlasma.JPG"
 },
 "syshemoglobin": {
  "src": "photo-syshemoglobin.jpg",
  "author": "Zephyris at English Wikipedia",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:1GZX_Haemoglobin.png",
  "file": "File:1GZX Haemoglobin.png"
 },
 "sysbloodpressure": {
  "src": "photo-sysbloodpressure.jpg",
  "author": "rawpixel.com",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Blood_pressure_monitoring.jpg",
  "file": "File:Blood pressure monitoring.jpg"
 },
 "sysheartbeat": {
  "src": "photo-sysheartbeat.jpg",
  "author": "No machine-readable author provided. Ekko assumed (based on …",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Heart_frontally_PDA.jpg",
  "file": "File:Heart frontally PDA.jpg"
 },
 "systissuefluid": {
  "src": "photo-systissuefluid.jpg",
  "author": "Welcome1To1The1Jungle (talk) (Uploads)",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Cellular_Fluid_Content.jpg",
  "file": "File:Cellular Fluid Content.jpg"
 },
 "syslymph": {
  "src": "photo-syslymph.jpg",
  "author": "Petr Adam Dohnálek",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Homa_limfo_001.jpg",
  "file": "File:Homa limfo 001.jpg"
 },
 "sysimmunity": {
  "src": "photo-sysimmunity.jpg",
  "author": "Volker Brinkmann",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Neutrophil_with_anthrax_copy.jpg",
  "file": "File:Neutrophil with anthrax copy.jpg"
 },
 "sysantibody": {
  "src": "photo-sysantibody.jpg",
  "author": "Courtesy: National Human Genome Research Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Antibody.png",
  "file": "File:Antibody.png"
 },
 "sysantigen": {
  "src": "photo-sysantigen.jpg",
  "author": "Fvasconcellos 19:03, 6 May 2007 (UTC)",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Antibody.svg",
  "file": "File:Antibody.svg"
 },
 "syslymphocyte": {
  "src": "photo-syslymphocyte.jpg",
  "author": "Unknown photographer/artist (False color modifications made …",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:SEM_Lymphocyte.jpg",
  "file": "File:SEM Lymphocyte.jpg"
 },
 "sysmacrophage": {
  "src": "photo-sysmacrophage.jpg",
  "author": "The original uploader was Obli at English Wikipedia.",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Macrophage.jpg",
  "file": "File:Macrophage.jpg"
 },
 "sysvaccine": {
  "src": "photo-sysvaccine.jpg",
  "author": "melvil",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:HPV-vaccine-_Gardasil2016JAPAN.jpg",
  "file": "File:HPV-vaccine- Gardasil2016JAPAN.jpg"
 },
 "sysvaccination": {
  "src": "photo-sysvaccination.jpg",
  "author": "Centers for Disease Control and Prevention",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Vaccination-polio-india.jpg",
  "file": "File:Vaccination-polio-india.jpg"
 },
 "sysvirus": {
  "src": "photo-sysvirus.jpg",
  "author": "不明",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Rotavirus_Reconstruction.jpg",
  "file": "File:Rotavirus Reconstruction.jpg"
 },
 "sysbacteria": {
  "src": "photo-sysbacteria.jpg",
  "author": "NIAID",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:E._coli_Bacteria_(7316101966).jpg",
  "file": "File:E. coli Bacteria (7316101966).jpg"
 },
 "syscold": {
  "src": "photo-syscold.jpg",
  "author": "No machine-readable author provided. Robin S assumed (based …",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Rhinovirus.PNG",
  "file": "File:Rhinovirus.PNG"
 },
 "sysflu": {
  "src": "photo-sysflu.jpg",
  "author": "Photo Credit: Cynthia Goldsmith Content Providers(s): CDC/ D…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:EM_of_influenza_virus.jpg",
  "file": "File:EM of influenza virus.jpg"
 },
 "sysallergy": {
  "src": "photo-sysallergy.jpg",
  "author": "James Heilman, MD",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hives2010.JPG",
  "file": "File:Hives2010.JPG"
 },
 "syshayfever": {
  "src": "photo-syshayfever.jpg",
  "author": "Dartmouth College Electron Microscope Facility",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Misc_pollen.jpg",
  "file": "File:Misc pollen.jpg"
 },
 "sysfever": {
  "src": "photo-sysfever.jpg",
  "author": "Menchi",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Clinical_thermometer_38.7.JPG",
  "file": "File:Clinical thermometer 38.7.JPG"
 },
 "syssweat": {
  "src": "photo-syssweat.jpg",
  "author": "Bibikoff",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Amanda_Fran%C3%A7ozo_At_The_Runner_Sports_Fragment.jpg",
  "file": "File:Amanda Françozo At The Runner Sports Fragment.jpg"
 },
 "syshomeostasis": {
  "src": "photo-syshomeostasis.jpg",
  "author": "Leyo",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:DNA_simple_horizontal.svg",
  "file": "File:DNA simple horizontal.svg"
 },
 "systhermo": {
  "src": "photo-systhermo.jpg",
  "author": "Arno / Coen",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Wiki_ostrich.jpg",
  "file": "File:Wiki ostrich.jpg"
 },
 "syshormone": {
  "src": "photo-syshormone.jpg",
  "author": "Adapted from an image by Frédéric Bouché",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hormone_Transport.png",
  "file": "File:Hormone Transport.png"
 },
 "sysendocrine": {
  "src": "photo-sysendocrine.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Illu_endocrine_system.png",
  "file": "File:Illu endocrine system.png"
 },
 "sysinsulin": {
  "src": "photo-sysinsulin.jpg",
  "author": "User:AtikaAtikawa",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Insulin_struct.png",
  "file": "File:Insulin struct.png"
 },
 "syslangerhans": {
  "src": "photo-syslangerhans.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray1105.png",
  "file": "File:Gray1105.png"
 },
 "sysadrenaline": {
  "src": "photo-sysadrenaline.jpg",
  "author": "Roland Mattern",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Epinephrine.svg",
  "file": "File:Epinephrine.svg"
 },
 "systhyroxine": {
  "src": "photo-systhyroxine.jpg",
  "author": "Boghog",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Thyroxine2.svg",
  "file": "File:Thyroxine2.svg"
 },
 "sysgrowthhormone": {
  "src": "photo-sysgrowthhormone.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Somatotropine.GIF",
  "file": "File:Somatotropine.GIF"
 },
 "sysglucagon": {
  "src": "photo-sysglucagon.jpg",
  "author": "National Center for Biotechnology Information, U.S. National…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ideogram_human_chromosome_2.svg",
  "file": "File:Ideogram human chromosome 2.svg"
 },
 "sysbloodsugar": {
  "src": "photo-sysbloodsugar.jpg",
  "author": "不明",
  "license": "CC BY-SA 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Accu_chek.jpg",
  "file": "File:Accu chek.jpg"
 },
 "syssexhormone": {
  "src": "photo-syssexhormone.jpg",
  "author": "NEUROtiker",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Estradiol.svg",
  "file": "File:Estradiol.svg"
 },
 "syscns": {
  "src": "photo-syscns.jpg",
  "author": "OpenStax",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:1201_Overview_of_Nervous_System.jpg",
  "file": "File:1201 Overview of Nervous System.jpg"
 },
 "sysreflex": {
  "src": "photo-sysreflex.jpg",
  "author": "Д.Ильин: vectorization",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Mehaaniline_t%C3%B6%C3%B6.svg",
  "file": "File:Mehaaniline töö.svg"
 },
 "sysconditioned": {
  "src": "photo-sysconditioned.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ivan_Pavlov_NLM3.jpg",
  "file": "File:Ivan Pavlov NLM3.jpg"
 },
 "sysstimulus": {
  "src": "photo-sysstimulus.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:GHS-pictogram-exclam.svg",
  "file": "File:GHS-pictogram-exclam.svg"
 },
 "syssensation": {
  "src": "photo-syssensation.jpg",
  "author": "explorebiology",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:XBio_illustration_%E2%80%93_The_Five_Senses.png",
  "file": "File:XBio illustration – The Five Senses.png"
 },
 "syssynapse": {
  "src": "photo-syssynapse.jpg",
  "author": "LadyofHats (English original); YasuakiH (Japanese translatio…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Complete_neuron_cell_diagram_ja.svg",
  "file": "File:Complete neuron cell diagram ja.svg"
 },
 "syssleep": {
  "src": "photo-syssleep.jpg",
  "author": "Domenico Fetti",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Domenico_Fetti_-_Sleeping_Girl_-_WGA7863.jpg",
  "file": "File:Domenico Fetti - Sleeping Girl - WGA7863.jpg"
 },
 "syscircadian": {
  "src": "photo-syscircadian.jpg",
  "author": "NoNameGYassineMrabetTalk✉ fixed by Addicted04",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_clock_human.svg",
  "file": "File:Biological clock human.svg"
 },
 "syscarb": {
  "src": "photo-syscarb.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Wheat_products.jpg",
  "file": "File:Wheat products.jpg"
 },
 "sysprotein": {
  "src": "photo-sysprotein.jpg",
  "author": "→AzaToth",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Myoglobin.png",
  "file": "File:Myoglobin.png"
 },
 "sysfat": {
  "src": "photo-sysfat.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Tripalmitoylglycerol.png",
  "file": "File:Tripalmitoylglycerol.png"
 },
 "sysvitamin": {
  "src": "photo-sysvitamin.jpg",
  "author": "Ragesoss",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:B_vitamin_supplement_tablets.jpg",
  "file": "File:B vitamin supplement tablets.jpg"
 },
 "sysmineral": {
  "src": "photo-sysmineral.jpg",
  "author": "Deposition authors: Kim, C.U., Kim, J.K.; Visualization auth…",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Human_carbonic_anhydrase_II_PDB%3D6LUX.png",
  "file": "File:Human carbonic anhydrase II PDB=6LUX.png"
 },
 "sysfiber": {
  "src": "photo-sysfiber.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Fruit,_Vegetables_and_Grain_NCI_Visuals_Online.jpg",
  "file": "File:Fruit, Vegetables and Grain NCI Visuals Online.jpg"
 },
 "syscalcium": {
  "src": "photo-syscalcium.jpg",
  "author": "Matthias Zepper",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg",
  "file": "File:Calcium unter Argon Schutzgasatmosphäre.jpg"
 },
 "sysglucose": {
  "src": "photo-sysglucose.jpg",
  "author": "Yikrazuul",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Beta-D-Glucose.svg",
  "file": "File:Beta-D-Glucose.svg"
 },
 "sysvitc": {
  "src": "photo-sysvitc.jpg",
  "author": "Yikrazuul",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:L-Ascorbic_acid.svg",
  "file": "File:L-Ascorbic acid.svg"
 },
 "sysvitd": {
  "src": "photo-sysvitd.jpg",
  "author": "CCoil (talk)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ergocalciferol-3D-sticks.png",
  "file": "File:Ergocalciferol-3D-sticks.png"
 },
 "sysenergy": {
  "src": "photo-sysenergy.jpg",
  "author": "Colin",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Plasma_globe_60th.jpg",
  "file": "File:Plasma globe 60th.jpg"
 },
 "sysmetabolism": {
  "src": "photo-sysmetabolism.jpg",
  "author": "Д.Ильин: vectorization",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Metabolism-en.svg",
  "file": "File:Metabolism-en.svg"
 },
 "sysfracture": {
  "src": "photo-sysfracture.jpg",
  "author": "Sjbrown at English Wikipedia",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Broken_fixed_arm.jpg",
  "file": "File:Broken fixed arm.jpg"
 },
 "syssprain": {
  "src": "photo-syssprain.jpg",
  "author": "Boldie",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sprained_foot.jpg",
  "file": "File:Sprained foot.jpg"
 },
 "sysstrain": {
  "src": "photo-sysstrain.jpg",
  "author": "Daniel.Cardenas",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:2010-10-02_pulled_hamstring.jpg",
  "file": "File:2010-10-02 pulled hamstring.jpg"
 },
 "syscavity": {
  "src": "photo-syscavity.jpg",
  "author": "No machine-readable author provided. Xauxa assumed (based on…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Tooth_model.jpg",
  "file": "File:Tooth model.jpg"
 },
 "soltitania": {
  "src": "photo-soltitania.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Titania.jpg",
  "file": "File:Titania.jpg"
 },
 "solretrograde": {
  "src": "photo-solretrograde.jpg",
  "author": "Eugene Alvin Villar (seav)",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Apparent_retrograde_motion_of_Mars_in_2003.gif",
  "file": "File:Apparent retrograde motion of Mars in 2003.gif"
 },
 "solslim": {
  "src": "photo-solslim.jpg",
  "author": "JAXA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:SLIM-logo.svg",
  "file": "File:SLIM-logo.svg"
 },
 "solkibo": {
  "src": "photo-solkibo.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:ISS-55_EVA-1_Kibo_laboratory_module.jpg",
  "file": "File:ISS-55 EVA-1 Kibo laboratory module.jpg"
 },
 "solcuriosity": {
  "src": "photo-solcuriosity.jpg",
  "author": "NASA/JPL-Caltech/Malin Space Science Systems Derivative work…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:PIA16239_High-Resolution_Self-Portrait_by_Curiosity_Rover_Arm_Camera_square.jpg",
  "file": "File:PIA16239 High-Resolution Self-Portrait by Curiosity Rover Arm Camera square.jpg"
 },
 "skypollux": {
  "src": "photo-skypollux.jpg",
  "author": "Gemini_constellation_map.png: Torsten Bronger derivative wor…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Gemini_constellation_map.svg",
  "file": "File:Gemini constellation map.svg"
 },
 "skypolaris": {
  "src": "photo-skypolaris.jpg",
  "author": "NASA/HST",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Polaris_alpha_ursae_minoris.jpg",
  "file": "File:Polaris alpha ursae minoris.jpg"
 },
 "skysaiph": {
  "src": "photo-skysaiph.jpg",
  "author": "Copyright © 2003 Torsten Bronger",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Orion_constellation_map.png",
  "file": "File:Orion constellation map.png"
 },
 "skyschedar": {
  "src": "photo-skyschedar.jpg",
  "author": "不明",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Cassiopeia_constellation_map.png",
  "file": "File:Cassiopeia constellation map.png"
 },
 "skyannual": {
  "src": "photo-skyannual.jpg",
  "author": "User:Zhatt",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Orbit4.gif",
  "file": "File:Orbit4.gif"
 },
 "cosexpansion": {
  "src": "photo-cosexpansion.jpg",
  "author": "w:en:User:ScienceApologist",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Raisinbread.gif",
  "file": "File:Raisinbread.gif"
 },
 "cosbinary": {
  "src": "photo-cosbinary.jpg",
  "author": "ESO/L. Calçada/M. Kornmesser/S.E. de Mink",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Artist%27s_impression_of_the_evolution_of_a_hot_high-mass_binary_star.ogv",
  "file": "File:Artist's impression of the evolution of a hot high-mass binary star.ogv"
 },
 "cosgravwave": {
  "src": "photo-cosgravwave.jpg",
  "author": "Simulating eXtreme Spacetimes Collaboration/Canadian Institu…",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Warped_Space_and_Time_Around_Colliding_Black_Holes_(Courtesy_Caltech-MIT-LIGO_Laboratory,_produced_by_SXS_project).webm",
  "file": "File:Warped Space and Time Around Colliding Black Holes (Courtesy Caltech-MIT-LIGO Laboratory, produced by SXS project).webm"
 },
 "boncarpal": {
  "src": "photo-boncarpal.jpg",
  "author": "Genusfotografen (Tomas Gunnarsson) / Wikimedia",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hand,_fingers_-_back.jpg",
  "file": "File:Hand, fingers - back.jpg"
 },
 "bontarsal": {
  "src": "photo-bontarsal.jpg",
  "author": "Masha ivanova meow",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:%D0%A1%D1%82%D0%BE%D0%BF%D0%B0_1.jpg",
  "file": "File:Стопа 1.jpg"
 },
 "bongrowthplate": {
  "src": "photo-bongrowthplate.jpg",
  "author": "Gilo1969",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Tib_fib_growth_plates.jpg",
  "file": "File:Tib fib growth plates.jpg"
 },
 "musadductor": {
  "src": "photo-musadductor.jpg",
  "author": "Beth ohara",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Anterior_Hip_Muscles_2.PNG",
  "file": "File:Anterior Hip Muscles 2.PNG"
 },
 "orgolfactory": {
  "src": "photo-orgolfactory.jpg",
  "author": "anonymous",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:(Toulouse)_L%27Odorat_(La_Dame_%C3%A0_la_licorne)_-_Mus%C3%A9e_de_Cluny_Paris.jpg",
  "file": "File:(Toulouse) L'Odorat (La Dame à la licorne) - Musée de Cluny Paris.jpg"
 },
 "syssneeze": {
  "src": "photo-syssneeze.jpg",
  "author": "Tang J, Nicolle A, Pantelic J, Jiang M, Sekhr C, Cheong D, T…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Qualitative-Real-Time-Schlieren-and-Shadowgraph-Imaging-of-Human-Exhaled-Airflows-An-Aid-to-Aerosol-pone.0021392.s002.ogv",
  "file": "File:Qualitative-Real-Time-Schlieren-and-Shadowgraph-Imaging-of-Human-Exhaled-Airflows-An-Aid-to-Aerosol-pone.0021392.s002.ogv"
 },
 "sysvilli": {
  "src": "photo-sysvilli.jpg",
  "author": "Nephron",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Small_intestine_low_mag.jpg",
  "file": "File:Small intestine low mag.jpg"
 },
 "sysheatstroke": {
  "src": "photo-sysheatstroke.jpg",
  "author": "Menchi",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Clinical_thermometer_38.7.JPG",
  "file": "File:Clinical thermometer 38.7.JPG"
 },
 "sysdehydration": {
  "src": "photo-sysdehydration.jpg",
  "author": "Centers for Disease Control and Prevention",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Cholera_rehydration_nurses.jpg",
  "file": "File:Cholera rehydration nurses.jpg"
 },
 "sysscab": {
  "src": "photo-sysscab.jpg",
  "author": "José M. Ramos , Isabel Jado, Sergio Padilla, Mar Masiá, Pedr…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Inoculation_eschar_Rickettsia_sibirica_mongolitimonae_infection.jpg",
  "file": "File:Inoculation eschar Rickettsia sibirica mongolitimonae infection.jpg"
 },
 "celcell": {
  "src": "photo-celcell.jpg",
  "author": "Edmund Beecher Wilson",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Wilson1900Fig2.jpg",
  "file": "File:Wilson1900Fig2.jpg"
 },
 "celnucleus": {
  "src": "photo-celnucleus.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celmembrane": {
  "src": "photo-celmembrane.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celcytoplasm": {
  "src": "photo-celcytoplasm.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celmitochondria": {
  "src": "photo-celmitochondria.jpg",
  "author": "Louisa Howard",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mitochondria,_mammalian_lung_-_TEM.jpg",
  "file": "File:Mitochondria, mammalian lung - TEM.jpg"
 },
 "celvacuole": {
  "src": "photo-celvacuole.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celchloroplast": {
  "src": "photo-celchloroplast.jpg",
  "author": "Kristian Peters -- Fabelfroh",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Plagiomnium_affine_laminazellen.jpeg",
  "file": "File:Plagiomnium affine laminazellen.jpeg"
 },
 "celcellwall": {
  "src": "photo-celcellwall.jpg",
  "author": "Ali Zifan",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Prokaryote_cell-ja.svg",
  "file": "File:Prokaryote cell-ja.svg"
 },
 "celribosome": {
  "src": "photo-celribosome.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celer": {
  "src": "photo-celer.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celgolgi": {
  "src": "photo-celgolgi.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celcentrosome": {
  "src": "photo-celcentrosome.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celnuclearmembrane": {
  "src": "photo-celnuclearmembrane.jpg",
  "author": "Mariana Ruiz LadyofHats",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Diagram_human_cell_nucleus_multilang.svg",
  "file": "File:Diagram human cell nucleus multilang.svg"
 },
 "celnucleolus": {
  "src": "photo-celnucleolus.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celchromosome": {
  "src": "photo-celchromosome.jpg",
  "author": "Steffen Dietzel",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:HumanChromosomesChromomycinA3.jpg",
  "file": "File:HumanChromosomesChromomycinA3.jpg"
 },
 "celdna": {
  "src": "photo-celdna.jpg",
  "author": "Zephyris",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:DNA_Structure%2BKey%2BLabelled.pn_NoBB.png",
  "file": "File:DNA Structure+Key+Labelled.pn NoBB.png"
 },
 "celgene": {
  "src": "photo-celgene.jpg",
  "author": "Original: Darekk2, SVG: Palosirkka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hybridogenesis_in_water_frogs_gametes.svg",
  "file": "File:Hybridogenesis in water frogs gametes.svg"
 },
 "celheredity": {
  "src": "photo-celheredity.jpg",
  "author": "Original: Darekk2, SVG: Palosirkka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hybridogenesis_in_water_frogs_gametes.svg",
  "file": "File:Hybridogenesis in water frogs gametes.svg"
 },
 "celbase": {
  "src": "photo-celbase.jpg",
  "author": "Iquo",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:AGCT_RNA_mini.png",
  "file": "File:AGCT RNA mini.png"
 },
 "celhelix": {
  "src": "photo-celhelix.jpg",
  "author": "84user adapting file originally uploaded by Richard Wheeler …",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:DNA_orbit_animated_static_thumb.png",
  "file": "File:DNA orbit animated static thumb.png"
 },
 "celbasepair": {
  "src": "photo-celbasepair.jpg",
  "author": "Yikrazuul",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Base_pair_GC.svg",
  "file": "File:Base pair GC.svg"
 },
 "celrna": {
  "src": "photo-celrna.jpg",
  "author": "Original: Darekk2, SVG: Palosirkka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hybridogenesis_in_water_frogs_gametes.svg",
  "file": "File:Hybridogenesis in water frogs gametes.svg"
 },
 "celmeiosis": {
  "src": "photo-celmeiosis.jpg",
  "author": "Rdbickel",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Meiosis_Overview_new.svg",
  "file": "File:Meiosis Overview new.svg"
 },
 "celgamete": {
  "src": "photo-celgamete.jpg",
  "author": "Janice Y Ahn, Jeannie T Lee",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Mice_X_Y_chromosomes.jpg",
  "file": "File:Mice X Y chromosomes.jpg"
 },
 "celfertilization": {
  "src": "photo-celfertilization.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sperm-egg.jpg",
  "file": "File:Sperm-egg.jpg"
 },
 "celzygote": {
  "src": "photo-celzygote.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray3.png",
  "file": "File:Gray3.png"
 },
 "celovum": {
  "src": "photo-celovum.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray5-ja.svg",
  "file": "File:Gray5-ja.svg"
 },
 "celsperm": {
  "src": "photo-celsperm.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sperm-egg.jpg",
  "file": "File:Sperm-egg.jpg"
 },
 "celsexual": {
  "src": "photo-celsexual.jpg",
  "author": "Chiswick Chap",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Sexual_cycle_N-2N.svg",
  "file": "File:Sexual cycle N-2N.svg"
 },
 "celasexual": {
  "src": "photo-celasexual.jpg",
  "author": "1978 at English Wikipedia",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Caduco.jpg",
  "file": "File:Caduco.jpg"
 },
 "celclone": {
  "src": "photo-celclone.jpg",
  "author": "KC Panchal",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Clonal_expansion_and_monoclonal_versus_polyclonal_proliferation.PNG",
  "file": "File:Clonal expansion and monoclonal versus polyclonal proliferation.PNG"
 },
 "celmendel": {
  "src": "photo-celmendel.jpg",
  "author": "Unknown authorUnknown author",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gregor_Mendel_2.jpg",
  "file": "File:Gregor Mendel 2.jpg"
 },
 "celsegregation": {
  "src": "photo-celsegregation.jpg",
  "author": "Original: Darekk2, SVG: Palosirkka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hybridogenesis_in_water_frogs_gametes.svg",
  "file": "File:Hybridogenesis in water frogs gametes.svg"
 },
 "celbloodtype": {
  "src": "photo-celbloodtype.jpg",
  "author": "InvictaHOG (Translated in japanese by Σ64)",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:ABO_blood_type-ja.svg",
  "file": "File:ABO blood type-ja.svg"
 },
 "celatp": {
  "src": "photo-celatp.jpg",
  "author": "NEUROtiker",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Adenosintriphosphat_protoniert.svg",
  "file": "File:Adenosintriphosphat protoniert.svg"
 },
 "celrespiration": {
  "src": "photo-celrespiration.jpg",
  "author": "Fvasconcellos, RegisFrey, ふわふわ",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Ja-CellRespiration.svg",
  "file": "File:Ja-CellRespiration.svg"
 },
 "celenzyme": {
  "src": "photo-celenzyme.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Purine_Nucleoside_Phosphorylase.jpg",
  "file": "File:Purine Nucleoside Phosphorylase.jpg"
 },
 "celaminoacid": {
  "src": "photo-celaminoacid.jpg",
  "author": "Ben Mills",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Glycine-skeletal.png",
  "file": "File:Glycine-skeletal.png"
 },
 "celcatalyst": {
  "src": "photo-celcatalyst.jpg",
  "author": "Shubhrapdil",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Catalysts.JPG",
  "file": "File:Catalysts.JPG"
 },
 "celips": {
  "src": "photo-celips.jpg",
  "author": "Calvero",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ips_cells_ja.png",
  "file": "File:Ips cells ja.png"
 },
 "celes": {
  "src": "photo-celes.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mouse_embryonic_stem_cells.jpg",
  "file": "File:Mouse embryonic stem cells.jpg"
 },
 "celstemcell": {
  "src": "photo-celstemcell.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Mouse_embryonic_stem_cells.jpg",
  "file": "File:Mouse embryonic stem cells.jpg"
 },
 "celunicellular": {
  "src": "photo-celunicellular.jpg",
  "author": "Haplochromis",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ventricaria_ventricosa.JPG",
  "file": "File:Ventricaria ventricosa.JPG"
 },
 "celmulticellular": {
  "src": "photo-celmulticellular.jpg",
  "author": "不明",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:C_elegans_stained.jpg",
  "file": "File:C elegans stained.jpg"
 },
 "celtissue": {
  "src": "photo-celtissue.jpg",
  "author": "不明",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Emphysema_H_and_E.jpg",
  "file": "File:Emphysema H and E.jpg"
 },
 "celorgan": {
  "src": "photo-celorgan.jpg",
  "author": "Mikael Häggström. When using this image in external works, i…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Internal_organs.png",
  "file": "File:Internal organs.png"
 },
 "celneuron": {
  "src": "photo-celneuron.jpg",
  "author": "BruceBlaus",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Blausen_0657_MultipolarNeuron.png",
  "file": "File:Blausen 0657 MultipolarNeuron.png"
 },
 "celdiffusion": {
  "src": "photo-celdiffusion.jpg",
  "author": "JrPol",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Diffusion.svg",
  "file": "File:Diffusion.svg"
 },
 "celosmosis": {
  "src": "photo-celosmosis.jpg",
  "author": "OpenStax",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:0307_Osmosis.jpg",
  "file": "File:0307 Osmosis.jpg"
 },
 "celmutation": {
  "src": "photo-celmutation.jpg",
  "author": "Richard Wheeler (Zephyris) Vector version: NikNaks",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "page": "https://commons.wikimedia.org/wiki/File:Single_Chromosome_Mutations.svg",
  "file": "File:Single Chromosome Mutations.svg"
 },
 "celgenome": {
  "src": "photo-celgenome.jpg",
  "author": "Original: Darekk2, SVG: Palosirkka",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hybridogenesis_in_water_frogs_gametes.svg",
  "file": "File:Hybridogenesis in water frogs gametes.svg"
 },
 "solsolareclipse": {
  "src": "photo-solsolareclipse.jpg",
  "author": "No machine-readable author provided. Aliparsa assumed (based…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:EclipseMarch06.jpg",
  "file": "File:EclipseMarch06.jpg"
 },
 "soltotaleclipse": {
  "src": "photo-soltotaleclipse.jpg",
  "author": "No machine-readable author provided. Aliparsa assumed (based…",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:EclipseMarch06.jpg",
  "file": "File:EclipseMarch06.jpg"
 },
 "solfirstq": {
  "src": "photo-solfirstq.jpg",
  "author": "Daniel Hershman from Federal Way, US",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Daniel_Hershman_-_march_moon_(by).jpg",
  "file": "File:Daniel Hershman - march moon (by).jpg"
 },
 "orgatrium": {
  "src": "photo-orgatrium.jpg",
  "author": "Jerm",
  "license": "CC BY 2.5",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
  "page": "https://commons.wikimedia.org/wiki/File:Heart_anterior_exterior_view.png",
  "file": "File:Heart anterior exterior view.png"
 },
 "systemperature": {
  "src": "photo-systemperature.jpg",
  "author": "Arno / Coen",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Wiki_ostrich.jpg",
  "file": "File:Wiki ostrich.jpg"
 },
 "solplanet": {
  "src": "photo-solplanet.jpg",
  "author": "CactiStaccingCrane",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Planet_collage_to_scale.jpg",
  "file": "File:Planet collage to scale.jpg"
 },
 "soldwarf": {
  "src": "photo-soldwarf.jpg",
  "author": "Justin Cowart",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Ceres_-_RC3_-_Haulani_Crater_(22381131691).jpg",
  "file": "File:Ceres - RC3 - Haulani Crater (22381131691).jpg"
 },
 "solmoons": {
  "src": "photo-solmoons.jpg",
  "author": "NASA This SVG image was created by Medium69. Cette image SVG…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Moons_of_solar_system-ja.svg",
  "file": "File:Moons of solar system-ja.svg"
 },
 "solasteroid": {
  "src": "photo-solasteroid.jpg",
  "author": "my own work derived from NASA's image.",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Asteroid_Belt_ja.svg",
  "file": "File:Asteroid Belt ja.svg"
 },
 "solrings": {
  "src": "photo-solrings.jpg",
  "author": "NASA/JPL/Space Science Institute",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Saturn_eclipse_exaggerated.jpg",
  "file": "File:Saturn eclipse exaggerated.jpg"
 },
 "solredspot": {
  "src": "photo-solredspot.jpg",
  "author": "NASA",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Great_Red_Spot_From_Voyager_1.jpg",
  "file": "File:Great Red Spot From Voyager 1.jpg"
 },
 "solmorning": {
  "src": "photo-solmorning.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Venus_-_November_27_2018_-_50495187752.png",
  "file": "File:Venus - November 27 2018 - 50495187752.png"
 },
 "solevening": {
  "src": "photo-solevening.jpg",
  "author": "Kevin M. Gill",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Venus_-_November_27_2018_-_50495187752.png",
  "file": "File:Venus - November 27 2018 - 50495187752.png"
 },
 "cosprotostar": {
  "src": "photo-cosprotostar.jpg",
  "author": "NASA, ESA, and the Hubble Heritage Team (STScI/AURA)-ESA/Hub…",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:LH_95.jpg",
  "file": "File:LH 95.jpg"
 },
 "cosredshift": {
  "src": "photo-cosredshift.jpg",
  "author": "Georg Wiora (Dr. Schorsch) created this image from the origi…",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Redshift.svg",
  "file": "File:Redshift.svg"
 },
 "coslensing": {
  "src": "photo-coslensing.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gravitational_lens-full.jpg",
  "file": "File:Gravitational lens-full.jpg"
 },
 "musscm": {
  "src": "photo-musscm.jpg",
  "author": "Image:Gray385.png modified by Uwe Gille",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sternocleidomastoideus.png",
  "file": "File:Sternocleidomastoideus.png"
 },
 "mussartorius": {
  "src": "photo-mussartorius.jpg",
  "author": "modified by Uwe Gille",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Sartorius.png",
  "file": "File:Sartorius.png"
 },
 "mussoleus": {
  "src": "photo-mussoleus.jpg",
  "author": "Polygon data is generated by Database Center for Life Scienc…",
  "license": "CC BY-SA 2.1 JP",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:Soleus_muscle_-_animation.gif",
  "file": "File:Soleus muscle - animation.gif"
 },
 "bontoe": {
  "src": "photo-bontoe.jpg",
  "author": "Masha ivanova meow",
  "license": "CC0（パブリックドメイン）",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "page": "https://commons.wikimedia.org/wiki/File:%D0%A1%D1%82%D0%BE%D0%BF%D0%B0_1.jpg",
  "file": "File:Стопа 1.jpg"
 },
 "boncostal": {
  "src": "photo-boncostal.jpg",
  "author": "Henry Vandyke Carter",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Gray112.png",
  "file": "File:Gray112.png"
 },
 "orgvenacava": {
  "src": "photo-orgvenacava.jpg",
  "author": "Wapcaplet and Yaddah (translated by Hatsukari715)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped)_ja.svg",
  "file": "File:Diagram of the human heart (cropped) ja.svg"
 },
 "orgpulartery": {
  "src": "photo-orgpulartery.jpg",
  "author": "Wapcaplet and Yaddah (translated by Hatsukari715)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped)_ja.svg",
  "file": "File:Diagram of the human heart (cropped) ja.svg"
 },
 "orgpulvein": {
  "src": "photo-orgpulvein.jpg",
  "author": "Wapcaplet and Yaddah (translated by Hatsukari715)",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped)_ja.svg",
  "file": "File:Diagram of the human heart (cropped) ja.svg"
 },
 "orgthymus": {
  "src": "photo-orgthymus.jpg",
  "author": "不明",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Thymus.png",
  "file": "File:Thymus.png"
 },
 "sysgutflora": {
  "src": "photo-sysgutflora.jpg",
  "author": "NIAID",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:E._coli_Bacteria_(7316101966).jpg",
  "file": "File:E. coli Bacteria (7316101966).jpg"
 },
 "celphotosynthesis": {
  "src": "photo-celphotosynthesis.jpg",
  "author": "Daniel Mayer (mav) - original imageVector version by Yerpo和訳…",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Simple_photosynthesis_overview-ja.svg",
  "file": "File:Simple photosynthesis overview-ja.svg"
 },
 "cellysosome": {
  "src": "photo-cellysosome.jpg",
  "author": "MesserWoland and Szczepan1990",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "page": "https://commons.wikimedia.org/wiki/File:Biological_cell.svg",
  "file": "File:Biological cell.svg"
 },
 "celdivision": {
  "src": "photo-celdivision.jpg",
  "author": "Afunguy at English Wikipedia",
  "license": "パブリックドメイン",
  "licenseUrl": "",
  "page": "https://commons.wikimedia.org/wiki/File:Kinetochore.jpg",
  "file": "File:Kinetochore.jpg"
 },
 "celtrait": {
  "src": "photo-celtrait.jpg",
  "author": "Look Into My Eyes",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Deep_Blue_eye.jpg",
  "file": "File:Deep Blue eye.jpg"
 }
};
