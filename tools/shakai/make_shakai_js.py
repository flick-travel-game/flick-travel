# kokugo/kokugo.js を もとに shakai/shakai.js を 作る 台本(2026-09-29)。国語を 直したら もう一度 走らせると よい(shakai.js を 手で 直さない)
from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parent.parent.parent)
s = Path("kokugo/kokugo.js").read_text(encoding="utf-8")
def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert (c == n) if n else c > 0, (a, c)
    s = s.replace(a, b)
a = s.index("const KOKUGO = (() => {")
s = """/* フリック社会旅行: 高校受験・大学受験の 社会(公民・地理)の 知識(憲法と人権・政治のしくみ・経済のしくみ・国際社会・日本の地理・世界の地理・地図の読みかた)を、フリックで 打って おぼえる。(けいくん 2026-09-29「すべておすすめで」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「社会の 旅」を 足す ファイル。shakai/ の ページだけが 読む ─
   ことばは tools/shakai/meta.json + tools/shakai/terms-*.json → tools/shakai/terms_js.py が data/shakai.json と shakai/terms.js(SHAKAI_TERMS)に する。
   **ことばを 足す・直すのは tools/shakai/terms-<旅>.json だけ**。この ファイルは tools/shakai/make_shakai_js.py が kokugo.js から 作る(手で 直さない)
   ・旅は 7つ + 🏆 マスター。レベルは 入門(中学の 基本)→ 中級(高校受験)→ 上級(大学受験)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・歴史は 作らない(歴史旅行 rekishi/ が ある)
   ・しくみ図は 日本の 地方(コードで 描く)。📍が 立つのは 日本の地理の ことばだけ(mapNode が ある 語だけ)
   ⚠️ 高校受験・大学受験の 範囲の めやす。本物の 入試問題では ない */
""" + s[a:]
rep("KOKUGO_TERMS", "SHAKAI_TERMS")
rep("const KOKUGO = ", "const SHAKAI = ")
rep("// かずともの FLICK_MODES に kyomi / kyoji / kkotowaza / kbunpo / kkobun / kkoten / kkanbun / kbungaku / khyoron / kokumas を 足す(speed-king)",
    "// かずともの FLICK_MODES に shkenpo / shseiji / shkeizai / shkokusai / shjapan / shsekai / shchizu / shmas を 足す(speed-king)")
rep('const MODE_OF = { yomi:"kyomi", yoji:"kyoji", kotowaza:"kkotowaza", bunpo:"kbunpo", kobun:"kkobun", koten:"kkoten", kanbun:"kkanbun", bungaku:"kbungaku", hyoron:"khyoron" };',
    'const MODE_OF = { kenpo:"shkenpo", seiji:"shseiji", keizai:"shkeizai", kokusai:"shkokusai", japan:"shjapan", sekai:"shsekai", chizu:"shchizu" };')
rep('k:"kokuterm", hide:o.j === "yomi" && o.dv === 3', 'k:"shakaiterm"')
rep('kind:"kokuterm"', 'kind:"shakaiterm"', 0)
rep('"kokumas"', '"shmas"', 0)
rep('levels.kokumas', 'levels.shmas', 0); rep('pools.kokumas', 'pools.shmas'); rep('colors.kokumas = "#3b5bdb"', 'colors.shmas = "#0c8599"'); rep('maps.kokumas', 'maps.shmas')
rep('const MODES_ALL = ["kyomi", "kyoji", "kkotowaza", "kbunpo", "kkobun", "kkoten", "kkanbun", "kbungaku", "khyoron", "shmas"];',
    'const MODES_ALL = ["shkenpo", "shseiji", "shkeizai", "shkokusai", "shjapan", "shsekai", "shchizu", "shmas"];')
rep("国語図鑑", "社会図鑑", 0)
rep('flick-kokugo', 'flick-shakai', 0)
rep("""(q.hide ? '<small class="ai-alt">🙈 よみを 思い出して 打とう。まちがえると その 1字だけ 見えるよ</small>' :
          q.al ?""", "(q.al ?")
rep(""" :
          q.j === "kobun" && q.n !== q.r ? '<small class="ai-alt">📜 むかしの かなづかい → いまの かなづかいで 打とう</small>' : "")""", """ : "")""")
rep("""const hid = s.set.some(q => q.hide);
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name + (hid ? " 🙈" : ""), sub:S.icon + " " + S.name + "・10語" + (hid ? "・よみを かくす" : ""), short:"Lv." + (i + 1) };""",
    """return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };""")
rep("🗓 文学史の 年表を ひらく <small>文学史で 覚えた 作品・作家が 📍に なるよ。時代を おすと 中身が 出るよ</small>",
    "🗾 日本の 地方を ひらく <small>日本の地理で 覚えた ことばが 📍に なるよ。地方を おすと 中身が 出るよ</small>")
rep('placeholder="🔍 さがす(例: をかし)"', 'placeholder="🔍 さがす(例: 三権分立)"')
s = s.replace("#3b5bdb", "#0c8599")
rep("linear-gradient(90deg,#0c8599,#2f9e44,#f08c00)", "linear-gradient(90deg,#0c8599,#c2255c,#e8590c)")
rep(".ai-panel{background:linear-gradient(160deg,#edf2ff 0%,#fff9db 55%,#ebfbee 100%);border:1px solid #bac8ff;", ".ai-panel{background:linear-gradient(160deg,#e3fafc 0%,#fff9db 55%,#fff0f6 100%);border:1px solid #99e9f2;")
rep("background:linear-gradient(135deg,#dbe4ff,#fff3bf)", "background:linear-gradient(135deg,#c5f6fa,#fff3bf)")
rep("/* ── 見た目(この ページだけ。和紙と 藍の ように 明るく やさしく。むずかしそうに しない) ── */", "/* ── 見た目(この ページだけ。海と 地図の ように 明るく やさしく。むずかしそうに しない) ── */")
rep("(q.hide && i >= n && !(i === n && err) ? \"？\" : t[i])", "t[i]")
for w in ("kokugo", "KOKUGO", "国語", "をかし", "q.hide", "文学史"):
    assert w not in s[s.index("const SHAKAI"):], (w, s[max(0, s.find(w) - 80):s.find(w) + 40])
Path("shakai").mkdir(exist_ok=True)
Path("shakai/shakai.js").write_text(s, encoding="utf-8")
print("ok")
