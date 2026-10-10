# kokugo/kokugo.js を もとに eigo/eigo.js を 作る 台本(2026-09-29)。
# 旅・図鑑・称号・4択クイズは 国語から、英字を 打つ しくみ(norm・打つ 字の 見せかた)と 🔊 発音は 英会話(eikaiwa/eikaiwa.js)から 写した。
# 土台の 国語を 直したら もう一度 走らせると よい(eigo.js を 手で 直したときは 台本にも 入れる)
from pathlib import Path
import os, re
os.chdir(Path(__file__).resolve().parent.parent.parent)
s = Path("kokugo/kokugo.js").read_text(encoding="utf-8")
def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert (c == n) if n else c > 0, (a[:80], c)
    s = s.replace(a, b)
def sub(pat, b, n=1, flags=re.S):
    global s
    s, k = re.subn(pat, lambda _: b, s, flags=flags)
    assert k == n, (pat[:80], k)

a = s.index("const KOKUGO = (() => {")
s = """/* フリック英語: 高校受験・大学受験の 英語の 文法(不規則動詞・時制・受動態・不定詞と動名詞・分詞・関係詞・比較・仮定法・熟語)を、例文を フリックで 打って おぼえる。(けいくん 2026-09-29)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「英語の 旅」を 足す ファイル。eigo/ の ページだけが 読む ─
   例文は tools/eigo/meta.json + tools/eigo/terms-*.json → tools/eigo/terms_js.py が data/eigo.json と eigo/terms.js(EIGO_TERMS)に する。
   **例文を 足す・直すのは tools/eigo/terms-<旅>.json だけ**。この ファイルは tools/eigo/make_eigo_js.py が kokugo/kokugo.js から 作る(手で 直さない)
   ・旅・図鑑・称号・4択クイズは 国語、英字を 打つ しくみ(norm・打つ 字の 見せかた)と 🔊 発音は 英会話(eikaiwa/eikaiwa.js)を 写した
   ・打つのは 英字だけ。大文字・小文字は 区別しない。空白・' , . ? ! - は 打たなくても すすむ
   ・日本語訳は 打ち終わってから 出る(けいくん 2026-09-29「おすすめ」)。打つ 前に 見えるのは 文法の 名前と むずかしさだけ
   ・旅は 9つ + 🏆 マスター。レベルは 入門(中学の 基本)→ 中級(高校受験)→ 上級(大学受験)。1回は かならず 10問。どの ステージも いつも 同じ 10問 = スピード記録勝負
   ⚠️ 高校受験・大学受験の 範囲の めやす。本物の 入試問題では ない。英検・TOEIC の めやすは 出さない */
""" + s[a:]
rep("KOKUGO_TERMS", "EIGO_TERMS")
rep("const KOKUGO = ", "const EIGO = ")
sub(r"const RANK_READY = true;[^\n]*", 'const RANK_READY = true;  // かずともの FLICK_MODES に egfudoshi / egjisei / eguke / egtofutei / egbunshi / egkankei / eghikaku / egkatei / egjukugo / egmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない')
sub(r"const MODE_OF = \{[^\n]*\};", 'const MODE_OF = { fudoshi:"egfudoshi", jisei:"egjisei", uke:"eguke", tofutei:"egtofutei", bunshi:"egbunshi", kankei:"egkankei", hikaku:"eghikaku", katei:"egkatei", jukugo:"egjukugo" };')
rep('k:"kokuterm", hide:o.j === "yomi" && o.dv === 3', 'k:"eigoterm", t:o.n')
rep('kind:"kokuterm"', 'kind:"eigoterm"')
sub(r"  function cost\(s\)\{[^\n]*\n", "  function cost(s){ return s.length; }  // 英語: 打つ 字の 数で やさしい順\n")
rep("kokumas", "egmas", 0)
rep('colors.egmas = "#3b5bdb"', 'colors.egmas = "#0b7285"')
sub(r'const MODES_ALL = \[[^\]]*\];', 'const MODES_ALL = ["egfudoshi", "egjisei", "eguke", "egtofutei", "egbunshi", "egkankei", "eghikaku", "egkatei", "egjukugo", "egmas"];')
rep("国語図鑑", "英語図鑑", 0)
rep("flick-kokugo", "flick-eigo", 0)
# 数える ことばは「こ」(英会話と 同じ)。1回 10問
s, k = re.subn(r"\+ ([\"'])語", r"+ \1こ", s); assert k >= 10, k
rep("同じ 10語", "同じ 10問", 0)
rep('"9つの 旅から 10語"', '"9つの 旅から 10問"')
rep("出会った ' + done + 'こ</small>", "出会った ' + done + 'こ</small>")

# 🔊 発音(英会話から)+ norm。makeQs の 前に 入れる
rep("  let pre = null;  // この回の 前に 出会っていた ことば", """  /* ── 英字の そろえかた(英会話の norm と 同じ。tools/eigo/terms_js.py の norm とも 同じ) ── */
  const norm = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
  /* ── 🔊 発音(ブラウザに 入っている 読み上げ。音が 出ない 端末でも あそべる。英会話と 同じ しかけ) ──
     ⚠️ iPhone は タップの 中で 1回 鳴らすまで 音が 出ない → 旅を はじめる タップ(makeQs)で 音なしで 1回 鳴らしておく */
  const TTS = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function";
  let voice = null, unlocked = false;
  function pickVoice(){
    try{
      const vs = speechSynthesis.getVoices(), us = vs.filter(v => /^en[-_]US/i.test(v.lang));
      voice = us.find(v => /Samantha|Google US English|Aria|Jenny/i.test(v.name)) || us[0] || vs.find(v => /^en/i.test(v.lang)) || null;
    }catch(e){ voice = null; }
  }
  if(TTS){ pickVoice(); try{ speechSynthesis.addEventListener("voiceschanged", pickVoice); }catch(e){} }
  const spoken = t => String(t).replace(/ - /g, ", ");  // 不規則動詞(go - went - gone)は 1語ずつ 区切って 読む
  function say(text, slow){
    if(!TTS || !text) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(spoken(text));
      u.lang = "en-US"; if(voice) u.voice = voice; u.rate = slow ? .7 : .92;
      speechSynthesis.speak(u);
    }catch(e){}
  }
  function unlock(){ if(!TTS || unlocked) return; try{ const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); unlocked = true; }catch(e){} }
  const AUTO_KEY = "flick-eigo-say";
  function autoSay(){ try{ return localStorage.getItem(AUTO_KEY) !== "0"; }catch(e){ return true; } }
  function setAutoSay(on){ try{ localStorage.setItem(AUTO_KEY, on ? "1" : "0"); }catch(e){} }
  const sayBtn = (text, label) => TTS ? '<button type="button" class="eg-say" data-eg-say="' + esc(text) + '" aria-label="' + esc(label || "発音を 聞く") + '">🔊</button>' : "";
  let pre = null;  // この回の 前に 出会っていた ことば""")
rep("function makeQs(m, lv){ pre = discovered(); return levels[m][lv].slice(); }",
    "function makeQs(m, lv){ unlock(); pre = discovered(); return levels[m][lv].slice(); }  // unlock = 旅を はじめる タップの 中で iPhone の 音を 出せるように")
rep("    if(!q || !BY.has(q.art)) return;\n    const L = log()", "    if(!q || !BY.has(q.art)) return;\n    if(autoSay()) say(q.t);  // 打ち終わったら その 英語を 読みあげる(🔊 の 切りかえは トップの パネル)\n    const L = log()")
rep("const per = secs / Math.max(1, q.r.length);", "const per = secs / Math.max(1, q.r.length);  // q.r = 打つ 英字(小文字・記号なし)")

# 問題の カード: 打つ 前に 見せるのは 文法の 名前だけ(訳は 打ち終わってから)。ひとつ前の 例文の 訳と ポイントを 上に
sub(r"  function card\(q, prev\)\{.*?\n    return h;\n  \}\n", """  function card(q, prev){
    let h = "";
    if(prev){
      h += '<div class="ai-learn eg-learn" role="status"><p class="eg-lh"><b lang="en">✅ ' + esc(prev.n) + '</b>' + sayBtn(prev.t) + '</p>' +
           '<p class="eg-ja">' + prev.jarb + '</p><p class="eg-pt">💡 ' + prev.rb + '</p></div>';
    }else h += '<div class="ai-learn ai-hint">こたえると、日本語訳と 文法の ポイントが 出るよ</div>';
    const tag = pre && !pre.has(q.art) ? '<span class="ai-tag new">🆕 はじめまして</span>' : "";
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot eg-gram">' + esc(q.c0) + '</p>' + tag + '<small class="ai-cat">' + q.jr.icon + " " + esc(q.jr.name) + " ・ " + LVN[q.dv].icon + " " + esc(LVN[q.dv].name) + '</small>' +
         (q.j === "fudoshi" ? '<small class="ai-alt">🔁 原形・過去形・過去分詞を つづけて 打とう</small>' : "") + '</div></div>';
    return h;
  }
""")
rep("c:j.icon + \" \" + j.name + \" ・ \" + o.c + \" ・ \" + LVN[o.dv].icon + \" \" + LVN[o.dv].name });",
    "c:j.icon + \" \" + j.name + \" ・ \" + o.c + \" ・ \" + LVN[o.dv].icon + \" \" + LVN[o.dv].name, c0:o.c });")
# 打つ 英文: 空白・記号も そのまま 見せる。色が かわるのは 打つ 字(英字)だけ(英会話と 同じ)
sub(r"  function tgtHtml\(q, n, err\)\{.*?\n    return h;\n  \}\n", """  function tgtHtml(q, n, err){
    let h = "", p = 0;
    for(const ch of q.t){
      if(norm(ch)){ h += '<span class="' + (p < n ? "d" : p === n ? (err ? "x" : "n") : "c") + '">' + esc(ch) + '</span>'; p++; }
      else h += '<span class="' + (p > 0 && p <= n ? "d" : "c") + ' eg-sk">' + (ch === " " ? " " : esc(ch)) + '</span>';
    }
    return '<span lang="en" class="eg-tgt">' + h + '</span>';
  }
  /* 結果の 見出し: 英文の 下に 日本語訳 */
  function nameHtml(q){ return '<span lang="en" class="eg-nm">' + esc(q.t) + '</span><span class="eg-nmj">' + q.jarb + '</span>'; }
""")
# 結果・図鑑: 🔊 と つながる 例文
rep("""    let h = '<div class="ai-info">' + tag;
    if(q.ex)""", """    let h = '<div class="ai-info">' + tag + '<p class="eg-sayline">' + sayBtn(q.t) + (TTS ? '<button type="button" class="eg-say slow" data-eg-say="' + esc(q.t) + '" data-eg-slow="1" aria-label="ゆっくり 聞く">🐢 ゆっくり</button>' : "") + '</p>';
    if(q.ex)""")
rep("🔗 つながる ことば</p>", "🔗 いっしょに おぼえる</p>")
# ホーム: 年表は ない。かわりに 🔊 の 切りかえ
sub(r"      '<details class=\"ai-diag\">.*?</details>' \+\n", """      (TTS ? '<button type="button" class="eg-auto' + (autoSay() ? " on" : "") + '" data-eg-auto="1" aria-pressed="' + autoSay() + '">🔊 打ったら 英語を 読みあげる：<b>' + (autoSay() ? "ON" : "OFF") + '</b></button>' : "") +
""")
rep("    if(JOURNEY_OF[m] && JBY[JOURNEY_OF[m]].diagram) diagCur = JBY[JOURNEY_OF[m]].diagram;\n    if(!diagCur) diagCur = DIAGS[0];\n", "")
# 図鑑: 訳でも さがせる。英文は 小さめに
rep("(!qq || [q.n, q.r].concat(q.al || [], [q.ds]).some(x => normQ(x).includes(qq))));",
    "(!qq || [q.n, q.r, q.ja, q.c0, q.ds].some(x => normQ(x).includes(qq))));")
rep('placeholder="🔍 さがす(例: をかし)"', 'placeholder="🔍 さがす(例: have / 現在完了)"')
rep("""'"><span>' + q.e + '</span><b>' + esc(q.n) + '</b><small>'""", """'"><span>' + q.e + '</span><b lang="en">' + esc(q.n) + '</b><small>'""")
# ことば 1つの ページ: 英文 + 🔊 + 訳
rep("""'<p class="ai-cn"><span class="ai-ic">' + q.e + '</span><ruby>' + esc(q.n) + '<rt>' + esc(q.r) + '</rt></ruby><button""",
    """'<p class="ai-cn"><span class="ai-ic">' + q.e + '</span><span lang="en">' + esc(q.n) + '</span><button""")
rep("""'<p class="ai-meta">' + esc(q.c) + '</p><p class="ai-d">' + q.rb + '</p>' + info(q, true) +""",
    """'<p class="ai-meta">' + esc(q.c) + '</p><p class="eg-ja big">' + q.jarb + '</p><p class="ai-d">💡 ' + q.rb + '</p>' + info(q, true) +""")
# 4択クイズ: ② は「英文 → 正しい 訳は?」に(文法の ポイントより 訳の ほうが えらびやすい)
rep("""        : '<p class="ai-qq">「<b>' + esc(it.q.n) + '</b>」の 説明として 正しいのは どれ？</p>';""",
    """        : '<p class="ai-qq">「<b lang="en">' + esc(it.q.n) + '</b>」の 日本語訳は どれ？</p>';""")
rep("""'</b>' + esc(it.type === 0 ? x.n : hide(x.ds, x)) + '</button>';""", """'</b>' + esc(it.type === 0 ? x.n : x.ja) + '</button>';""")
rep("""(it.type === 0 ? "" : '<p>' + esc(it.q.n) + ' … ' + esc(it.q.ds) + '</p>') +""", """'<p lang="en">' + esc(it.q.n) + '</p><p>' + esc(it.q.ja) + '</p><p>💡 ' + esc(it.q.ds) + '</p>' +""")
rep("""(!ok && it.type === 1 ? '<p class="ai-muted">えらんだのは「' + esc(it.ch[Q.picked].n) + '」の 説明だよ</p>'""", """(!ok && it.type === 1 ? '<p class="ai-muted">えらんだのは「' + esc(it.ch[Q.picked].n) + '」の 訳だよ</p>'""")
rep("""  function answerQuiz(k){
    const Q = quiz, it = Q && Q.list[Q.i]; if(!it || Q.picked !== null) return;
    Q.picked = k;""", """  function answerQuiz(k){
    const Q = quiz, it = Q && Q.list[Q.i]; if(!it || Q.picked !== null) return;
    Q.picked = k; say(it.q.t);""")
rep("試験の「えらぶ 問題」の 練習だよ。", "文法の 名前や 訳から えらぶ 練習だよ。")
# おす: 🔊 と 読みあげの 切りかえ
rep("""  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term]""", """  // 🔊 を おしても 入力欄から 手が はなれない(キーボードが 閉じない)ように
  document.addEventListener("mousedown", e => { if(e.target.closest && e.target.closest("[data-eg-say]") && document.body.classList.contains("playing")) e.preventDefault(); });
  document.addEventListener("click", e => {
    const g = e.target.closest && e.target.closest("[data-eg-say],[data-eg-auto]");
    if(g){
      e.stopPropagation();
      if(g.dataset.egSay){ unlock(); say(g.dataset.egSay, !!g.dataset.egSlow); if(document.body.classList.contains("playing") && typeof ans !== "undefined") ans.focus(); return; }
      setAutoSay(!autoSay()); if(autoSay()){ unlock(); say("Hello!"); } home(mode); return;
    }
    const t = e.target.closest && e.target.closest("[data-ai-term]""")
# 見た目
rep("/* ── 見た目(この ページだけ。和紙と 藍の ように 明るく やさしく。むずかしそうに しない) ── */", "/* ── 見た目(この ページだけ。空と 海の ように 明るく やさしく。むずかしそうに しない) ── */")
rep(".ai-panel{background:linear-gradient(160deg,#edf2ff 0%,#fff9db 55%,#ebfbee 100%);border:1px solid #bac8ff;", ".ai-panel{background:linear-gradient(160deg,#e3fafc 0%,#fff9db 55%,#edf2ff 100%);border:1px solid #99e9f2;")
s = s.replace("#3b5bdb", "#0b7285")
rep("const css = `\n", """const css = `
.target{word-break:normal;overflow-wrap:anywhere;font-size:clamp(20px,6vw,26px);letter-spacing:.01em;line-height:1.55}
.target .eg-sk{border:0}
.eg-gram{font-size:clamp(18px,5.4vw,22px)}
.eg-learn p{margin:0}.eg-lh{display:flex;align-items:center;gap:6px;font-size:15px}.eg-lh b{word-break:break-word}
.eg-ja{font-weight:800;color:#0b7285;margin-top:2px!important}.eg-ja.big{font-size:16px;margin:8px 0 0!important}.eg-pt{font-size:12.5px;color:#334155;margin-top:2px!important}
.eg-say{border:1.5px solid #99e9f2;background:#fff;border-radius:99px;font:inherit;font-size:15px;line-height:1;padding:5px 8px;cursor:pointer;flex:none;color:#0b7285;font-weight:800}
.eg-say.slow{font-size:13px}.eg-sayline{display:flex;gap:6px;margin:4px 0}.eg-learn .eg-say{padding:2px 6px;font-size:12px}
.eg-auto{display:block;width:100%;margin:10px 0 0;padding:10px;border-radius:14px;border:1.5px dashed #94a3b8;background:#fff;color:#334155;font:inherit;font-size:13.5px;font-weight:800;cursor:pointer}
.eg-auto.on{border-style:solid;border-color:#0b7285;color:#0b7285;background:#e3fafc}
.eg-nm{display:block;font-size:1.02em;word-break:break-word}.eg-nmj{display:block;font-size:.88em;font-weight:700;color:#0b7285}.eg-nmj rt{color:#64748b}
.ai-tile b[lang=en]{font-size:11.5px;font-weight:800}
""")
# 4択クイズの ① は 文法の ポイント → どの 例文?(英文を 選ぶ)。英字は 左よせで 小さく
rep("return { kind:\"eigoterm\"", "return { kind:\"eigoterm\"")
sub(r"card, info, home, lvInfo, cardModes:\(\) => MODES_ALL, byArt:id => BY\.get\(id\), retarget, tgtHtml,",
    "card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), norm, tgtHtml, nameHtml, say,")
rep("openZukan, diagramSvg };", "openZukan };")
rep("""    const hid = s.set.some(q => q.hide);
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name + (hid ? " 🙈" : ""), sub:S.icon + " " + S.name + "・10語" + (hid ? "・よみを かくす" : ""), short:"Lv." + (i + 1) };""",
    """    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10問", short:"Lv." + (i + 1) };""")
# ── ひらがなで 打つ(はじめ)/ ABC で 打つ の 切りかえ(けいくん 2026-10-10「デフォルトは ひらがなで打つ / アルファベットに 切り替えも 出来るように」→「日本語訳をひらがなで」) ──
#   ひらがな = 英文を 見て、日本語訳の 読み(jaReading → kr)を 打つ。ABC = いままでどおり 英文を 打つ。
#   えらんだ ほうは 端末に おぼえる(flick-eigo-input)。⚠️ ランキングに 送るのは ひらがなの ときだけ(打つ 字が ちがうと タイムを くらべられないため)
rep('const norm = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");',
    """const normEn = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
  /* ── 答えかた: ひらがな(日本語訳を 打つ。はじめ)/ ABC(英文を 打つ)。端末に おぼえる ── */
  const IN_KEY = "flick-eigo-input";
  let inKana = (() => { try{ return localStorage.getItem(IN_KEY) !== "abc"; }catch(e){ return true; } })();
  function applyInput(){
    for(const q of ALL) q.r = inKana ? q.kr : q.rEn;
    if(typeof document === "undefined") return;
    const a = document.getElementById("ans"); if(a) a.setAttribute("lang", inKana ? "ja" : "en");
    const hp = document.querySelector(".how p:nth-of-type(2)");
    if(hp) hp.textContent = inKana ? "漢字に変換しなくてOK。句読点やスペースは打たなくて大丈夫。" : "大文字・小文字は どちらでも OK。空白や「' , . ? !」は 打たなくて大丈夫。";
  }
  function setInput(kana){ inKana = kana; try{ localStorage.setItem(IN_KEY, kana ? "kana" : "abc"); }catch(e){} applyInput(); }
  /* 打った 字の そろえかた: ひらがなの ときは 土台(index.html)の norm、ABC の ときは 英字だけ */
  const normIn = s => inKana ? (typeof window !== "undefined" && typeof window.norm === "function" ? window.norm(s) : s) : normEn(s);
  applyInput(); if(typeof document !== "undefined") document.addEventListener("DOMContentLoaded", applyInput);""")
rep("      if(norm(ch)){ h += '<span class=\"' + (p < n", "      if(normEn(ch)){ h += '<span class=\"' + (p < n")
rep("byArt:id => BY.get(id), norm, tgtHtml, nameHtml, say,", "byArt:id => BY.get(id), norm:normIn, tgtHtml, nameHtml, say, bestTag:() => inKana ? \"-kana\" : \"\",")
rep("noRank:(m, lv) => !RANK_READY || lv >= 60,", "noRank:(m, lv) => !RANK_READY || lv >= 60 || !inKana,")
# 打つ 字: ひらがなの ときは 土台と 同じ 見せかた
rep("""  function tgtHtml(q, n, err){
    let h = "", p = 0;""", """  function tgtHtml(q, n, err){
    if(inKana){
      const t = typeof target === "string" && target ? target : q.r;
      let k = "";
      for(let i = 0; i < t.length; i++) k += '<span class="' + (i < n ? "d" : (i === n ? (err ? "x" : "n") : "c")) + '">' + esc(t[i]) + '</span>';
      return k;
    }
    let h = "", p = 0;""")
# 問題の カード: ひらがなの ときは 英文が 問題(訳を 打つ)
rep("""    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot eg-gram">' + esc(q.c0) + '</p>' + tag +""",
    """    if(inKana){
      h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot eg-en" lang="en">' + esc(q.n) + '</p>' + tag +
           '<small class="ai-cat">' + esc(q.c0) + " ・ " + LVN[q.dv].icon + " " + esc(LVN[q.dv].name) + '</small>' +
           '<small class="ai-alt">🇯🇵 この 英語の 日本語訳を ひらがなで 打とう</small></div></div>';
      return h;
    }
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot eg-gram">' + esc(q.c0) + '</p>' + tag +""")
# ことば → 問題: 英字と ひらがなの 両方を 持つ。レベルの 組みかたは 英字で(どちらでも 同じ 10問)
rep('k:"eigoterm", t:o.n', 'k:"eigoterm", t:o.n, rEn:o.r')
# ホーム: 答えかたの 切りかえ
rep("""    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +""", """    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<div class="eg-input" role="group" aria-label="打ちかた"><span>⌨️ 打ちかた</span>' +
        '<button type="button" data-eg-input="kana"' + (inKana ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + '>あ ひらがな<small>日本語訳を 打つ</small></button>' +
        '<button type="button" data-eg-input="abc"' + (!inKana ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + '>A ABC<small>英文を 打つ</small></button></div>' +
      (inKana ? "" : '<p class="ai-small ai-muted">ABC で 打った タイムは ランキングに のりません(ひらがなと 打つ 字が ちがうため)</p>') +""")
rep("""    const g = e.target.closest && e.target.closest("[data-eg-say],[data-eg-auto]");
    if(g){
      e.stopPropagation();""", """    const g = e.target.closest && e.target.closest("[data-eg-say],[data-eg-auto],[data-eg-input]");
    if(g){
      e.stopPropagation();
      if(g.dataset.egInput){ setInput(g.dataset.egInput === "kana"); home(mode); return; }""")
rep(".eg-gram{font-size:clamp(18px,5.4vw,22px)}", """.eg-gram{font-size:clamp(18px,5.4vw,22px)}.eg-en{font-size:clamp(17px,4.8vw,21px);line-height:1.45;word-break:normal;overflow-wrap:anywhere}
.eg-input{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;align-items:center;margin:0 0 12px}.eg-input>span{font-size:12.5px;font-weight:800;color:#334155}
.eg-input button{padding:8px 6px;border-radius:12px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font:inherit;font-size:14px;font-weight:900;cursor:pointer;line-height:1.3}
.eg-input button small{display:block;font-size:10.5px;font-weight:700;color:#64748b}.eg-input button.on{border-color:#0b7285;background:#e3fafc;color:#0b7285}""")
Path("eigo").mkdir(exist_ok=True)
Path("eigo/eigo.js").write_text(s, encoding="utf-8")
print("eigo/eigo.js ok")
