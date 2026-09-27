#!/usr/bin/env python3
"""index.html(世界フリック旅行 = 土台)から、シリーズの ほかのゲームの ページを 作る。
   python3 tools/build_games.py        → rekishi/ uchu/ karada/ kabu/ ai/ eikaiwa/ rika/ seibi/ の index.html
- 土台は 1つ。直すのは index.html だけで、これを 走らせれば ほかのゲームにも 同じ直しが 入る
- 変えるのは: <head> の 題名・manifest・アイコン / GAME の 2行 / 問題の中身(その ゲームの ぶんだけ)/ ふりがな(その ぶんだけ)/ 写真の道("../")
⚠️ できた ページは 手で直さない(次に 走らせると 消える)"""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent

GAMES = {
    "rekishi": dict(name="フリック歴史旅行", modes=["wpeople", "jpeople", "wevents", "jevents"], kinds={"person", "event"},
                    color="#c9741a", hero=True, logo=True, art=dict(word=(892, 208), hero=(1536, 1024), alt="フリック歴史旅行。古代から 未来へ 時代の 名所が フィルムで つながる 空を 男の子と 犬が 望遠鏡で 見る 絵", iconv=3, wordv=3),
                    lead="世界と日本の偉人・歴史の出来事を、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、時間の旅に出よう。",
                    how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。偉人は 名前を打つと、結果で その人のプロフィールと 名言が読めるよ。出来事は 年と解説が出て、年表に📍が立つよ。",
                    rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、歴史の流れも自然と覚えられるよ。"),
    "uchu": dict(name="フリック宇宙旅行", modes=["usolar", "usky", "ucos"], kinds={"space"}, color="#2b3a8f", hero=True, logo=True, art=dict(word=(959, 193), hero=(1536, 1024), alt="フリック宇宙旅行。惑星・銀河・宇宙ステーションの 中を 男の子と 犬が 望遠鏡で 見る 絵", iconv=3, wordv=3),
                 lead="太陽系・星と星座・宇宙のことばを、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、宇宙の旅に出よう。",
                 how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、太陽系の図や 星図に📍が立つよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、星や惑星の名前も自然と覚えられるよ。"),
    "karada": dict(name="フリックからだ旅行", modes=["kbone", "korgan", "kcell", "ktsubo"], kinds={"body"}, color="#c9364f", hero=True, logo=True, art=dict(word=(945, 230), hero=(1536, 768), alt="フリックからだ旅行。骨・心臓・脳・細胞の 中を 男の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=3),
                   lead="骨・筋肉・臓器・からだのしくみ・細胞・ツボを、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、からだの中を旅しよう。",
                   how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、からだの図に📍が立つよ。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、からだのしくみも自然と覚えられるよ。"),
    # 株式フリック旅行(けいくん 2026-09-26)。絵は けいくんの ChatGPT の 絵(kabu/hero.webp)。題名は GrabCut で 切りぬいた(tools/kabu/logo_cut.py)
    "kabu": dict(name="フリック株式旅行", modes="KABU", kinds=set(), color="#0f6fa8", hero=True, logo=True,
                 art=dict(word=(908, 177), hero=(1536, 1024), alt="フリック株式旅行。世界の 会社の 町と 地球を 男の子と 犬が 飛んで 旅する 絵", iconv=4, wordv=3),
                 lead="世界の会社・日本の会社の名前を、ひらがなでフリック入力。10問ずつ あそぶうちに、どこの国の・どんな仕事の 会社なのかが 自然と 身につくよ。入門100社から はじめて、めざせ 世界の会社 約2,400社。",
                 how="表示された ひらがなを、そのまま打ち写してね。こたえると、その会社の 国・業種・ひとことが 出るよ。入門は だれでも知っている会社。どのステージも いつも同じ10問なので、タイムをくらべられるよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、世界の会社と なかよくなれるよ。"),
    # AIフリック旅行(けいくん 2026-09-26)。ことばは data/aiTerms.json の 1か所 → ai/terms.js。コースの しくみは ai/ai.js(AITABI)。
    #   絵は けいくんの ChatGPT の 絵(ai/hero.webp)。題名は tools/ai/logo_cut.py で 切りぬいた。アイコンは けいくんの 四角い 絵(1254px)を 縮めたもの
    "ai": dict(name="フリックAI旅行", modes="AITABI", kinds=set(), color="#6d3fd6", hero=True, logo=True,
               art=dict(word=(991, 243), hero=(1536, 1024), alt="フリックAI旅行。男の子と 犬が AI・クラウド・データ・API の ことばが うかぶ 空の 島を 旅する 絵", iconv=3, wordv=3),
               lead="遊んでいるうちに、AIとWebのことばがわかる。フリックで打つと、ことばの意味・つながる ことば・しくみの図の どこにあるかが 出るよ。知っている ことばから はじめて、点だった知識を 線につなげよう。",
               how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。入門は 聞いたことのある ことばから。どのステージも いつも同じ10問なので、タイムをくらべられるよ。英字の ことば(API など)は 日本での ふつうの 読みかたで 打つよ。",
               rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、AI・Web・サービスづくりの しくみが つながって 見えてくるよ。"),
    # 英会話フリック旅行(けいくん 2026-09-26)。ことばは data/english.json の 1か所 → eikaiwa/english.js。しくみは eikaiwa/eikaiwa.js(EIKAIWA)。
    #   ⚠️ 英検・TOEIC の めやすは 画面に 出さない(けいくん 2026-09-26「勉強してる感が強くなるので表記しない方がいい」)。絵は まだ無い(文字の 題名)
    "eikaiwa": dict(name="フリック英会話", modes="EIKAIWA", kinds=set(), color="#0e8f6e", hero=True, logo=True,
                    art=dict(word=(873, 282), hero=(1536, 1024), alt="フリック英会話。世界の 町と 英語の ふきだしの 中を 男の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=3),
                    lead="英単語と 日常英会話を、フリックで 打ち写して 旅しよう。打つと 意味と 例文が 出て、🔊で 発音も 聞けるよ。身のまわりの ことばから はじめて、外国の人と 話せる 英語まで。",
                    how="表示された 英語を、そのまま打ち写してね。大文字・小文字は どちらでも OK。空白や「' , . ? !」は 打たなくても すすむよ。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。",
                    rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。iPhone は 日本語キーボードの「ABC」なら フリックで 英語が 打てるよ。"),
    # 理科フリック旅行(けいくん 2026-09-26)。旅は 教科書の 4分野。1つの 旅の 中で 小学校 → 中学校(高校受験)→ 高校(大学受験)の 順に レベルが 並ぶ。
    #   ことばは tools/rika.tsv(10列。tools/check_rika_tsv.py で 確かめる)。宇宙・からだに ある ことばは 入れない。絵は まだ 無い(けいくんの 絵が 届いたら art を 足す)
    "rika": dict(name="フリック理科旅行", modes=["rphys", "rchem", "rbio", "rgeo"], kinds={"rika"}, color="#3949ab", hero=True, logo=True,
                 art=dict(word=(738, 142), hero=(1536, 1024), alt="フリック理科旅行。物理・化学・生物・地学の 看板が ならぶ 世界を 女の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=3),
                 lead="物理・化学・生物・地学のことばを、ひらがなでどれだけ速く打てるか。小学校のことばから はじめて、中学校(高校受験)・高校(大学受験)まで。10問のトータルタイムで勝負しながら、理科の旅に出よう。",
                 how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん(小学校のことば)。先に進むほど 中学校・高校のことばになるよ。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、周期表や 理科の地図に📍が立つよ。星や宇宙は 宇宙フリック旅行、人の体や細胞は からだフリック旅行で あそべるよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、理科のことばも自然と覚えられるよ。"),
    # 整備フリック旅行(けいくん 2026-09-26)。ことばは tools/seibi/terms-<旅>.json → seibi/terms.js(tools/seibi/terms_js.py)。しくみは seibi/seibi.js(SEIBI。ai.js を 写した もの)。
    #   旅は エンジン・シャシ・ブレーキ・電装EV・バイク・工具点検法令。級は 入門 → 3級めやす → 2級めやす。絵は まだ無い(文字の 題名。届いたら art を 足す)
    "seibi": dict(name="フリック整備士", modes="SEIBI", kinds=set(), color="#d9480f", hero=True, logo=True,
                  art=dict(word=(731, 218), hero=(1536, 1024), alt="フリック整備士。エンジン・ブレーキ・タイヤなどの 部品の 中を 男の子と 犬が 飛んで 旅する 絵", iconv=3, wordv=4),
                  lead="クルマ・バイクの 部品と しくみの ことばを、ひらがなで フリック入力。打つと その部品が 何を するのか・しくみ図の どこに あるのかが 出るよ。身近な 部品から はじめて、3級・2級・1級 自動車整備士の 試験範囲の めやすまで。4択クイズと 計算問題で 試験の 練習も できるよ。",
                  how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。どのステージも いつも同じ10問なので、タイムをくらべられるよ。部品の 説明は 本物の 試験問題では ないので、試験の 勉強には 問題集や 学校の 教科書も 使ってね。部品の 名前と しくみを おぼえる ゲームだよ。実際の 整備は 資格を もつ 人・お店に まかせよう。",
                  rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、クルマや バイクの 中身が 見えてくるよ。国土交通省・日本自動車整備振興会連合会とは 関係ありません。"),
}

# 会社の コース: kabu.js が 読めなかったときも ページが 止まらないように
KABU_MODES = '(typeof KABU === "object" ? KABU.modes : [])'
PLUG_MODES = {"KABU": KABU_MODES, "AITABI": '(typeof AITABI === "object" ? AITABI.modes : [])', "EIKAIWA": '(typeof EIKAIWA === "object" ? EIKAIWA.modes : [])', "SEIBI": '(typeof SEIBI === "object" ? SEIBI.modes : [])'}

def build(gid, g):
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    out = src
    # ⚠️ 世界(土台)の 絵は ?v=3(2026-09-26 に「フリック世界旅行」の 絵へ 差しかえた)。
    #   ほかの ゲームは 自分の 絵(か まだ 無い)なので、世界の 数字を 前の 形に もどしてから 作る(ほかの ゲームの 住所は 変えない)
    for a_, b_ in (('href="apple-touch-icon.png?v=3"', 'href="apple-touch-icon.png?v=2"'), ('href="favicon.png?v=3"', 'href="favicon.png?v=2"'),
                   ('src="logo-mark2.webp?v=3"', 'src="logo-mark2.webp"'), ('src="logo-word.webp?v=3" alt="" width="1166" height="208"', 'src="logo-word.webp" alt="" width="1170" height="209"'),
                   ('<img class="hero" src="hero.webp?v=3"', '<img class="hero" src="hero.webp"')):
        assert out.count(a_) == 1, a_; out = out.replace(a_, b_)
    # head
    out = out.replace("<title>フリック世界旅行</title>", f"<title>{g['name']}</title>")
    out = out.replace('<meta name="apple-mobile-web-app-title" content="フリック世界旅行">', f'<meta name="apple-mobile-web-app-title" content="{g["name"]}">')
    art = g.get("art")  # その ゲームの 絵(hero / 題名 / アイコン)が フォルダに あるとき
    if art:
        # 絵・アイコンは その フォルダの ものを 使う(名前は 世界と 同じ なので 道は そのまま)
        out = out.replace('width="1170" height="209"', 'width="%d" height="%d"' % art["word"])
        # 題名・トップの 絵を 差しかえたら wordv を 上げる(古い 絵を おぼえている 端末のため)
        out = out.replace('src="logo-word.webp"', 'src="logo-word.webp?v=%d"' % art.get("wordv", 2))
        if art.get("iconv"):  # アイコンを 差しかえたら 数字を 上げる(iPhone が 古い アイコンを おぼえているため)
            v = "?v=%d" % art["iconv"]
            out = out.replace('apple-touch-icon.png?v=2"', 'apple-touch-icon.png' + v + '"').replace('favicon.png?v=2"', 'favicon.png' + v + '"').replace('src="logo-mark2.webp"', 'src="logo-mark2.webp' + v + '"')  # 題名を 切りなおしたら 数字を 上げる(古い 絵を おぼえているため)
        out, n = re.subn(r'<img class="hero" src="hero.webp" alt="[^"]*" width="1536" height="1024">',
                         '<img class="hero" src="hero.webp%s" alt="%s" width="%d" height="%d">' % ("?v=%d" % art["wordv"] if art.get("wordv") else "", art["alt"], *art["hero"]), out); assert n == 1
    else:
        out = out.replace('href="apple-touch-icon.png?v=2"', 'href="../apple-touch-icon.png?v=2"').replace('href="favicon.png?v=2"', 'href="../favicon.png?v=2"')
        # 絵が まだ無い ゲーム(株式フリック旅行): トップの絵と ロゴの 画像を 最初から 置かない(無い ファイルを 読みにいかない)。題名は 文字
        out, n = re.subn(r'\s*<img class="hero" src="hero.webp"[^>]*>', "", out); assert n == 1
        out, n = re.subn(r'<img class="logo-mark" src="logo-mark2.webp"[^>]*>\s*<img class="logo-word" src="logo-word.webp"[^>]*>',
                         lambda _: '<span class="logo-text">%s</span>' % g["name"], out); assert n == 1
    out = out.replace('<script src="photos.js"></script>', '<script src="../photos.js"></script>')
    out = out.replace('<img id="map-img" src="world-map-color.jpg"', '<img id="map-img" src="../world-map-color.jpg"')  # 地図の 絵は 世界の フォルダに ある
    out = out.replace('<h1 class="sr-only">フリック世界旅行</h1>', f'<h1 class="sr-only">{g["name"]}</h1>')
    if g["modes"] == "KABU":  # 会社の コース: 旅の 名前は kabu/kabu.js が 決める(KABU.modes)。会社データは companies.js
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="companies.js"></script>\n<script src="kabu.js"></script>')
        import subprocess, sys as _s; subprocess.run([_s.executable, str(ROOT / "tools/kabu/companies_js.py")], check=True)
    if g["modes"] == "AITABI":  # AIの コース: ことばは terms.js(data/aiTerms.json から)、しくみは ai.js
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js"></script>\n<script src="ai.js"></script>')
        import subprocess, sys as _s; subprocess.run([_s.executable, str(ROOT / "tools/ai/terms_js.py")], check=True)
    if g["modes"] == "EIKAIWA":  # 英会話の コース: ことばは english.js(data/english.json から)、しくみは eikaiwa.js。打つのは 英字なので 入力欄を 英語に
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/eikaiwa/english_js.py")], check=True)
        # ⚠️ iPhone が 古い ファイルを おぼえていて 直した 画面が 出なかった(2026-09-26)→ 中身が かわると 住所の ?v= も かわる
        ver = lambda f: hashlib.sha1((ROOT / "eikaiwa" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="english.js?v=%s"></script>\n<script src="eikaiwa.js?v=%s"></script>' % (ver("english.js"), ver("eikaiwa.js")))
        out, n = re.subn(r'<input class="answer" id="ans" type="text" lang="ja"', '<input class="answer" id="ans" type="text" lang="en"', out); assert n == 1
        out, n = re.subn(r'<p>漢字に変換しなくてOK。句読点やスペースは打たなくて大丈夫。</p>', '<p>大文字・小文字は どちらでも OK。空白や「\' , . ? !」は 打たなくて大丈夫。</p>', out); assert n == 1
    if g["modes"] == "SEIBI":  # 整備の コース: ことばは terms.js(tools/seibi/terms-*.json から)、しくみは seibi.js。中身が かわると ?v= も かわる
        import subprocess, sys as _s, hashlib; subprocess.run([_s.executable, str(ROOT / "tools/seibi/terms_js.py")], check=True)
        ver = lambda f: hashlib.sha1((ROOT / "seibi" / f).read_bytes()).hexdigest()[:8]
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js?v=%s"></script>\n<script src="seibi.js?v=%s"></script>' % (ver("terms.js"), ver("seibi.js")))
    # GAME
    out, n = re.subn(r"const GAME = \{.*?\};", lambda _: f'const GAME = {{ id:"{gid}", name:"{g["name"]}", modes:{PLUG_MODES[g["modes"]] if isinstance(g["modes"], str) else json.dumps(g["modes"])}, assets:"../", logo:{str(g["logo"]).lower()}, hero:{str(g["hero"]).lower()}, dir:"{gid}/", lead:{json.dumps(g.get("lead",""), ensure_ascii=False)}, how:{json.dumps(g.get("how",""), ensure_ascii=False)}, rule:{json.dumps(g.get("rule",""), ensure_ascii=False)} }};', out, count=1, flags=re.S)
    assert n == 1
    # 問題: もとの100か所を 空に、追加ぶんは この ゲームの kind だけ
    out, n = re.subn(r"const SPOTS = \[\n.*?\n\];", "const SPOTS = [\n];", out, count=1, flags=re.S); assert n == 1
    a = out.index("SPOTS-MORE-START */"); b = out.index("/* SPOTS-MORE-END */")
    block = out[a:b]
    kept = []
    keys = set()
    for line in block.split("\n"):
        m = re.match(r'  \{n:"[^"]*", c:"[^"]*", r:"[^"]*", art:"(\w+)", k:"(\w+)"', line)
        if m and m.group(2) in g["kinds"]:
            kept.append(line.rstrip(",")); keys.add(m.group(1))
    ll = re.search(r"Object\.assign\(LATLON, \{(.*?)\}\);", block, flags=re.S).group(1)
    ll_kept = ", ".join(x for x in ll.split(", ") if x.split(":")[0] in keys)
    newblock = "SPOTS-MORE-START */\nSPOTS.push(\n" + ",\n".join(kept) + "\n);\nObject.assign(LATLON, {" + ll_kept + "});\n"
    out = out[:a] + newblock + out[b:]
    # ふりがな: この ゲームの key だけ
    a = out.index("RUBY-START */"); b = out.index("/* RUBY-END */")
    lines = out[a:b].split("\n"); kept_r = []
    for line in lines:
        m = re.match(r' "([^"|]+)(?:\|\w+)?": ', line)
        if m is None or m.group(1) in keys: kept_r.append(line)
    out = out[:a] + "\n".join(kept_r) + out[b:]
    # FAME は 名所だけの もの
    out, n = re.subn(r"const FAME = \{.*?\};", "const FAME = {};", out, count=1, flags=re.S)
    d = ROOT / gid; d.mkdir(exist_ok=True)
    (d / "index.html").write_text(out, encoding="utf-8")
    (d / "manifest.webmanifest").write_text(json.dumps({
        "name": g["name"], "short_name": g["name"], "start_url": "./", "scope": "./", "display": "standalone",
        "background_color": g["color"], "theme_color": g["color"],
        "icons": [{"src": ("" if art else "../") + "icon-512.png?v=" + str((art or {}).get("iconv", 2)), "sizes": "512x512", "type": "image/png"}, {"src": ("" if art else "../") + "apple-touch-icon.png?v=" + str((art or {}).get("iconv", 2)), "sizes": "180x180", "type": "image/png"}]}, ensure_ascii=False, indent=2), encoding="utf-8")
    (d / ".nojekyll").write_text("", encoding="utf-8")
    print(f"{gid}: {len(kept)}問, {len(out)//1024}KB")

for gid, g in GAMES.items(): build(gid, g)
