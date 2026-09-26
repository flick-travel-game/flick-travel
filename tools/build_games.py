#!/usr/bin/env python3
"""index.html(世界フリック旅行 = 土台)から、シリーズの ほかのゲームの ページを 作る。
   python3 tools/build_games.py        → rekishi/ uchu/ karada/ kabu/ ai/ の index.html
- 土台は 1つ。直すのは index.html だけで、これを 走らせれば ほかのゲームにも 同じ直しが 入る
- 変えるのは: <head> の 題名・manifest・アイコン / GAME の 2行 / 問題の中身(その ゲームの ぶんだけ)/ ふりがな(その ぶんだけ)/ 写真の道("../")
⚠️ できた ページは 手で直さない(次に 走らせると 消える)"""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent

GAMES = {
    "rekishi": dict(name="歴史フリック旅行", modes=["wpeople", "jpeople", "wevents", "jevents"], kinds={"person", "event"},
                    color="#c9741a", hero=True, logo=True, art=dict(word=(1005, 245), hero=(1536, 803), alt="歴史フリック旅行。古代から未来へ 時代の名所が ならぶ 絵"),
                    lead="世界と日本の偉人・歴史の出来事を、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、時間の旅に出よう。",
                    how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。偉人は 名前を打つと、結果で その人のプロフィールと 名言が読めるよ。出来事は 年と解説が出て、年表に📍が立つよ。",
                    rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、歴史の流れも自然と覚えられるよ。"),
    "uchu": dict(name="宇宙フリック旅行", modes=["usolar", "usky", "ucos"], kinds={"space"}, color="#2b3a8f", hero=True, logo=True, art=dict(word=(1053, 257), hero=(1536, 1024), alt="宇宙フリック旅行。太陽系の 惑星と 銀河が うかぶ 絵"),
                 lead="太陽系・星と星座・宇宙のことばを、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、宇宙の旅に出よう。",
                 how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、太陽系の図や 星図に📍が立つよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、星や惑星の名前も自然と覚えられるよ。"),
    "karada": dict(name="からだフリック旅行", modes=["kbone", "korgan", "kcell"], kinds={"body"}, color="#c9364f", hero=True, logo=True, art=dict(word=(875, 244), hero=(1536, 813), alt="からだフリック旅行。骨・心臓・細胞の 中を 旅する 絵"),
                   lead="骨・筋肉・臓器・からだのしくみ・細胞を、ひらがなでどれだけ速く打てるか。10問のトータルタイムで勝負しながら、からだの中を旅しよう。",
                   how="表示されたひらがなを、そのまま打ち写してね。レベル1がいちばんかんたん。どのレベルも いつも同じ10問なので、タイムをくらべられるよ。打ち終わると 解説が出て、からだの図に📍が立つよ。",
                   rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。速くなるほど、からだのしくみも自然と覚えられるよ。"),
    # 株式フリック旅行(けいくん 2026-09-26)。絵は けいくんの ChatGPT の 絵(kabu/hero.webp)。題名は GrabCut で 切りぬいた(tools/kabu/logo_cut.py)
    "kabu": dict(name="株式フリック旅行", modes="KABU", kinds=set(), color="#0f6fa8", hero=True, logo=True,
                 art=dict(word=(907, 194), hero=(1536, 1024), alt="株式フリック旅行。世界の 会社の 町を 男の子と 犬が 飛んで 旅する 絵", iconv=3),
                 lead="世界の会社・日本の会社の名前を、ひらがなでフリック入力。10問ずつ あそぶうちに、どこの国の・どんな仕事の 会社なのかが 自然と 身につくよ。入門100社から はじめて、めざせ 世界の会社 約2,400社。",
                 how="表示された ひらがなを、そのまま打ち写してね。こたえると、その会社の 国・業種・ひとことが 出るよ。入門は だれでも知っている会社。初級からは 新しい会社7問に、にがてな会社の ふくしゅう3問が まざるよ。",
                 rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、世界の会社と なかよくなれるよ。"),
    # AIフリック旅行(けいくん 2026-09-26)。ことばは data/aiTerms.json の 1か所 → ai/terms.js。コースの しくみは ai/ai.js(AITABI)。
    #   絵は まだ 無いので 題名は 文字(けいくんの 絵が 届いたら ai/ に 置いて hero/logo を true に、art を 足す)
    "ai": dict(name="AIフリック旅行", modes="AITABI", kinds=set(), color="#6d3fd6", hero=False, logo=False,
               lead="遊んでいるうちに、AIとWebのことばがわかる。フリックで打つと、ことばの意味・つながる ことば・しくみの図の どこにあるかが 出るよ。知っている ことばから はじめて、点だった知識を 線につなげよう。",
               how="表示された ひらがなを、そのまま打ち写してね。1回は かならず 10問。入門は 聞いたことのある ことば、初級からは 新しい ことば7問に ふくしゅう3問が まざるよ。英字の ことば(API など)は 日本での ふつうの 読みかたで 打つよ。",
               rule="ルール：予測変換は使わずに、自分の指で打ち切ろう。あそぶほど、AI・Web・サービスづくりの しくみが つながって 見えてくるよ。"),
}

# 会社の コース: kabu.js が 読めなかったときも ページが 止まらないように
KABU_MODES = '(typeof KABU === "object" ? KABU.modes : [])'
PLUG_MODES = {"KABU": KABU_MODES, "AITABI": '(typeof AITABI === "object" ? AITABI.modes : [])'}

def build(gid, g):
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    out = src
    # head
    out = out.replace("<title>世界フリック旅行</title>", f"<title>{g['name']}</title>")
    out = out.replace('<meta name="apple-mobile-web-app-title" content="世界フリック旅行ゲーム">', f'<meta name="apple-mobile-web-app-title" content="{g["name"]}ゲーム">')
    art = g.get("art")  # その ゲームの 絵(hero / 題名 / アイコン)が フォルダに あるとき
    if art:
        # 絵・アイコンは その フォルダの ものを 使う(名前は 世界と 同じ なので 道は そのまま)
        out = out.replace('width="1170" height="209"', 'width="%d" height="%d"' % art["word"])
        out = out.replace('src="logo-word.webp"', 'src="logo-word.webp?v=2"')
        if art.get("iconv"):  # アイコンを 差しかえたら 数字を 上げる(iPhone が 古い アイコンを おぼえているため)
            v = "?v=%d" % art["iconv"]
            out = out.replace('apple-touch-icon.png?v=2"', 'apple-touch-icon.png' + v + '"').replace('favicon.png?v=2"', 'favicon.png' + v + '"').replace('src="logo-mark2.webp"', 'src="logo-mark2.webp' + v + '"')  # 題名を 切りなおしたら 数字を 上げる(古い 絵を おぼえているため)
        out, n = re.subn(r'<img class="hero" src="hero.webp" alt="[^"]*" width="1536" height="1024">',
                         '<img class="hero" src="hero.webp" alt="%s" width="%d" height="%d">' % (art["alt"], *art["hero"]), out); assert n == 1
    else:
        out = out.replace('href="apple-touch-icon.png?v=2"', 'href="../apple-touch-icon.png?v=2"').replace('href="favicon.png?v=2"', 'href="../favicon.png?v=2"')
        # 絵が まだ無い ゲーム(株式フリック旅行): トップの絵と ロゴの 画像を 最初から 置かない(無い ファイルを 読みにいかない)。題名は 文字
        out, n = re.subn(r'\s*<img class="hero" src="hero.webp"[^>]*>', "", out); assert n == 1
        out, n = re.subn(r'<img class="logo-mark" src="logo-mark2.webp"[^>]*>\s*<img class="logo-word" src="logo-word.webp"[^>]*>',
                         lambda _: '<span class="logo-text">%s</span>' % g["name"], out); assert n == 1
    out = out.replace('<script src="photos.js"></script>', '<script src="../photos.js"></script>')
    out = out.replace('<img id="map-img" src="world-map-color.jpg"', '<img id="map-img" src="../world-map-color.jpg"')  # 地図の 絵は 世界の フォルダに ある
    out = out.replace('<h1 class="sr-only">世界フリック旅行</h1>', f'<h1 class="sr-only">{g["name"]}</h1>')
    out = out.replace('<a href="about.html">📖 世界フリック旅行について(おうちの方へ)</a>', f'<a href="../about.html">📖 フリック旅行シリーズについて(おうちの方へ)</a>')
    if g["modes"] == "KABU":  # 会社の コース: 旅の 名前は kabu/kabu.js が 決める(KABU.modes)。会社データは companies.js
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="companies.js"></script>\n<script src="kabu.js"></script>')
        import subprocess, sys as _s; subprocess.run([_s.executable, str(ROOT / "tools/kabu/companies_js.py")], check=True)
    if g["modes"] == "AITABI":  # AIの コース: ことばは terms.js(data/aiTerms.json から)、しくみは ai.js
        out = out.replace('<script src="../photos.js"></script>', '<script src="../photos.js"></script>\n<script src="terms.js"></script>\n<script src="ai.js"></script>')
        import subprocess, sys as _s; subprocess.run([_s.executable, str(ROOT / "tools/ai/terms_js.py")], check=True)
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
        "name": g["name"] + "ゲーム", "short_name": g["name"] + "ゲーム", "start_url": "./", "scope": "./", "display": "standalone",
        "background_color": g["color"], "theme_color": g["color"],
        "icons": [{"src": ("" if art else "../") + "icon-512.png?v=" + str((art or {}).get("iconv", 2)), "sizes": "512x512", "type": "image/png"}, {"src": ("" if art else "../") + "apple-touch-icon.png?v=" + str((art or {}).get("iconv", 2)), "sizes": "180x180", "type": "image/png"}]}, ensure_ascii=False, indent=2), encoding="utf-8")
    (d / ".nojekyll").write_text("", encoding="utf-8")
    print(f"{gid}: {len(kept)}問, {len(out)//1024}KB")

for gid, g in GAMES.items(): build(gid, g)
