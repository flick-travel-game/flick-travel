# patissier/patissier.js を もとに kokugo/kokugo.js を 作った 台本(2026-09-27)。土台の パティシエを 直したら もう一度 走らせると よい(kokugo.js を 手で 直したときは 台本にも 入れる)
from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parent.parent.parent)
s = Path("patissier/patissier.js").read_text(encoding="utf-8")
def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert (c == n) if n else c > 0, (a, c)
    s = s.replace(a, b)
a = s.index("const PATISSIER = (() => {")
s = """/* フリック国語旅行: 高校受験・大学受験の 国語の 知識(漢字の読み・四字熟語・ことわざ・文法・古文単語・古典文法・漢文・文学史・評論の キーワード)を、フリックで 打って おぼえる。(けいくん 2026-09-27)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「国語の 旅」を 足す ファイル。kokugo/ の ページだけが 読む ─
   ことばは tools/kokugo/meta.json + tools/kokugo/terms-*.json → tools/kokugo/terms_js.py が data/kokugo.json と kokugo/terms.js(KOKUGO_TERMS)に する。
   **ことばを 足す・直すのは tools/kokugo/terms-<旅>.json だけ**
   ・もとは パティシエフリック(patissier/patissier.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 9つ + 🏆 マスター。レベルは 入門(中学の 基本)→ 中級(高校受験)→ 上級(大学受験)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・⚠️ 漢字の読みの 上級(と マスターに まざった その語)は **よみを かくす**(けいくん 2026-09-27「おすすめ」)。tgtHtml で 打つ 字を ？ に する。まちがえると その 1字だけ 見える(ヒント)
   ・古文単語は 歴史的仮名遣い(をかし)を 見せて、現代仮名遣い(おかし)を 打つ
   ・しくみ図の かわりに 時代の 年表(けいくん 2026-09-27「年表」)。📍が 立つのは 文学史だけ(mapNode が ある 語だけ)
   ⚠️ 高校受験・大学受験の 範囲の めやす。本物の 入試問題では ない */
""" + s[a:]
rep("PATISSIER_TERMS", "KOKUGO_TERMS")
rep("const PATISSIER = ", "const KOKUGO = ")
rep('const RANK_READY = true;  // かずともの FLICK_MODES に pzairyo / pkiji / pcream / psekai / pwagashi / pdogu / pmas を 足す(speed-king)',
    'const RANK_READY = true;  // かずともの FLICK_MODES に kyomi / kyoji / kkotowaza / kbunpo / kkobun / kkoten / kkanbun / kbungaku / khyoron / kokumas を 足す(speed-king)')
rep('const MODE_OF = { zairyo:"pzairyo", kiji:"pkiji", cream:"pcream", sekai:"psekai", wagashi:"pwagashi", dogu:"pdogu" };',
    'const MODE_OF = { yomi:"kyomi", yoji:"kyoji", kotowaza:"kkotowaza", bunpo:"kbunpo", kobun:"kkobun", koten:"kkoten", kanbun:"kkanbun", bungaku:"kbungaku", hyoron:"khyoron" };')
rep('k:"patiterm"', 'k:"kokuterm", hide:o.j === "yomi" && o.dv === 3')
rep('kind:"patiterm"', 'kind:"kokuterm"')
rep('"pmas"', '"kokumas"', 0)
rep('levels.pmas', 'levels.kokumas', 0); rep('pools.pmas', 'pools.kokumas'); rep('colors.pmas = "#d6336c"', 'colors.kokumas = "#3b5bdb"'); rep('maps.pmas', 'maps.kokumas')
rep('const MODES_ALL = ["pzairyo", "pkiji", "pcream", "psekai", "pwagashi", "pdogu", "kokumas"];',
    'const MODES_ALL = ["kyomi", "kyoji", "kkotowaza", "kbunpo", "kkobun", "kkoten", "kkanbun", "kbungaku", "khyoron", "kokumas"];')
rep("お菓子図鑑", "国語図鑑", 0)
rep("6つの 旅", "9つの 旅", 0)
rep('flick-patissier', 'flick-kokugo', 0)
rep("<small>専門用語まで はば広く</small>", "<small>中学の 基本から 大学受験まで</small>")
rep('function nodeOf(q){ const [k, n] = q.mp.split(":"); return { key:k, node:n }; }',
    'function nodeOf(q){ if(!q.mp) return null; const [k, n] = q.mp.split(":"); return { key:k, node:n }; }')
rep('for(const q of ALL){ const p = nodeOf(q); if(p.key === key',
    'for(const q of ALL){ const p = nodeOf(q); if(p && p.key === key')
rep("""    h += '<p class="ai-small">📍 ' + esc(nodeLabel(q)) + ' に あるよ</p><div class="ai-mini">' + diagramSvg(p.key, { pin:p.node, small:true }) + '</div>';""",
    """    if(p) h += '<p class="ai-small">📍 ' + esc(nodeLabel(q)) + ' の ことばだよ</p><div class="ai-mini">' + diagramSvg(p.key, { pin:p.node, small:true }) + '</div>';""")
rep('if(!diagCur) diagCur = "pantry";', 'if(!diagCur) diagCur = DIAGS[0];')
rep('if(JOURNEY_OF[m]) diagCur = JBY[JOURNEY_OF[m]].diagram;', 'if(JOURNEY_OF[m] && JBY[JOURNEY_OF[m]].diagram) diagCur = JBY[JOURNEY_OF[m]].diagram;')
rep("<p class=\"ai-dh\">🗺 しくみ図 <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></p>",
    "<p class=\"ai-dh\">🗓 文学史の 年表 <small>文学史で 覚えた 作品・作家が 📍に なるよ。時代を おすと 中身が 出るよ</small></p>")
rep('placeholder="🔍 さがす(例: メレンゲ)"', 'placeholder="🔍 さがす(例: をかし)"')
rep('J.icon + " " + J.name.replace("クリーム・チョコ・あめ", "クリーム・チョコ").replace("道具・衛生・栄養", "道具・衛生")', 'J.icon + " " + J.name')
rep("""(q.al ? '<small class="ai-alt">読みかたは どれでも OK: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</small>' : "") + '</div></div>';""",
    """(q.hide ? '<small class="ai-alt">🙈 よみを 思い出して 打とう。まちがえると その 1字だけ 見えるよ</small>' :
          q.al ? '<small class="ai-alt">読みかたは どれでも OK: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</small>' :
          q.j === "kobun" && q.n !== q.r ? '<small class="ai-alt">📜 むかしの かなづかい → いまの かなづかいで 打とう</small>' : "") + '</div></div>';
    return h;
  }
  /* 打つ 字の 見せかた。ふだんは 土台と 同じ。よみを かくす 語は 打った ところまで だけ 見せて、のこりは ？。まちがえた ところだけ 正しい 字を 見せる(ヒント) */
  function tgtHtml(q, n, err){
    const t = typeof target === "string" && target ? target : q.r;
    let h = "";
    for(let i = 0; i < t.length; i++){
      const cls = i < n ? "d" : (i === n ? (err ? "x" : "n") : "c");
      h += '<span class="' + cls + '">' + (q.hide && i >= n && !(i === n && err) ? "？" : t[i]) + '</span>';
    }""")
rep("""return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };""",
    """const hid = s.set.some(q => q.hide);
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name + (hid ? " 🙈" : ""), sub:S.icon + " " + S.name + "・10語" + (hid ? "・よみを かくす" : ""), short:"Lv." + (i + 1) };""")
rep('byArt:id => BY.get(id), retarget,', 'byArt:id => BY.get(id), retarget, tgtHtml,')
rep(".ai-panel{background:linear-gradient(160deg,#fff0f6 0%,#fff9db 55%,#fff4e6 100%);border:1px solid #fcc2d7;", ".ai-panel{background:linear-gradient(160deg,#edf2ff 0%,#fff9db 55%,#ebfbee 100%);border:1px solid #bac8ff;")
s = s.replace("#d6336c", "#3b5bdb")
rep("linear-gradient(90deg,#3b5bdb,#e8590c,#8f5b3e)", "linear-gradient(90deg,#3b5bdb,#2f9e44,#f08c00)")
rep("background:linear-gradient(135deg,#ffdeeb,#fff3bf)", "background:linear-gradient(135deg,#dbe4ff,#fff3bf)")
rep("/* ── 見た目(この ページだけ。お菓子屋さんの ように 明るく やさしく。むずかしそうに しない) ── */", "/* ── 見た目(この ページだけ。和紙と 藍の ように 明るく やさしく。むずかしそうに しない) ── */")
s = s.replace("入門・製菓衛生師・2級・1級", "入門・中級・上級")
rep(".ai-dtabs{display:flex", ".ai-dtabs:has(> button:only-child){display:none}.ai-dtabs{display:flex")
Path("kokugo/kokugo.js").write_text(s, encoding="utf-8")
print("ok")
