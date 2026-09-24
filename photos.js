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
 }
};
