# kokugo/kokugo.js を もとに sugaku/sugaku.js を 作る 台本(2026-09-27)。
# 図(tools/sugaku/fig.js)と 計算問題(tools/sugaku/calc.js)を 入れる。sugaku.js を 手で 直さない(ここ か fig.js・calc.js を 直して もう一度 走らせる)
#   python3 tools/sugaku/make_sugaku_js.py
from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parent.parent.parent)
s = Path("kokugo/kokugo.js").read_text(encoding="utf-8")
FIG = Path("tools/sugaku/fig.js").read_text(encoding="utf-8")
CALC = Path("tools/sugaku/calc.js").read_text(encoding="utf-8")
def rep(a, b, n=1):
    global s
    c = s.count(a)
    assert (c == n) if n else c > 0, (a, c)
    s = s.replace(a, b)
a = s.index("const KOKUGO = (() => {")
s = """/* フリック数学旅行: 算数〜高校受験・大学受験の 数学の 用語・公式・定理(数と計算・図形・文字と式・関数・データと確率・高校数学・数学者)を、フリックで 打って おぼえる。(けいくん 2026-09-27)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「数学の 旅」を 足す ファイル。sugaku/ の ページだけが 読む ─
   ことばは tools/sugaku/meta.json + tools/sugaku/terms-*.json → tools/sugaku/terms_js.py が data/sugaku.json と sugaku/terms.js(SUGAKU_TERMS)に する。
   **ことばを 足す・直すのは tools/sugaku/terms-<旅>.json だけ**。この ファイルは tools/sugaku/make_sugaku_js.py が 作る(手で 直さない)
   ・もとは フリック国語旅行(kokugo/kokugo.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 7つ + 🏆 マスター。レベルは 入門(算数)→ 初級(中学 = 高校受験)→ 中級(数学Ⅰ・A)→ 上級(数学Ⅱ・B・Ⅲ・C = 大学受験)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・「公式を打つ」語は 公式(a²+b²=c²)を 見せて、読みあげ(えーのにじょうたす…)を 打つ(けいくん 2026-09-27「おすすめ」)
   ・図は コードで 描く(tools/sugaku/fig.js)。答えると その 語の 図に 📍が 立つ。ホームに「📐 図の ずかん」
   ・🧮 計算問題(けいくん 2026-09-27「受験に必要な計算は入れた方がいい」): 算数 → 高校受験 → 大学受験の 計算を 数字を 毎回 かえて 4択で(tools/sugaku/calc.js)。**計算の タイム(かずとも)とは べつ**
   ⚠️ 高校受験・大学受験の 範囲の めやす。本物の 入試問題では ない */
""" + s[a:]
rep("KOKUGO_TERMS", "SUGAKU_TERMS")
rep("const KOKUGO = ", "const SUGAKU = ")
rep('const RANK_READY = true;  // かずともの FLICK_MODES に kyomi / kyoji / kkotowaza / kbunpo / kkobun / kkoten / kkanbun / kbungaku / khyoron / kokumas を 足す(speed-king)',
    'const RANK_READY = true;  // かずともの FLICK_MODES に mkazu / mzukei / mshiki / mkansu / mdata / mkoko / mhito / sugamas を 足す(speed-king)')
rep('const MODE_OF = { yomi:"kyomi", yoji:"kyoji", kotowaza:"kkotowaza", bunpo:"kbunpo", kobun:"kkobun", koten:"kkoten", kanbun:"kkanbun", bungaku:"kbungaku", hyoron:"khyoron" };',
    'const MODE_OF = { kazu:"mkazu", zukei:"mzukei", shiki:"mshiki", kansu:"mkansu", data:"mdata", koko:"mkoko", hito:"mhito" };')
rep('k:"kokuterm", hide:o.j === "yomi" && o.dv === 3', 'k:"sugaterm", hide:false, fx:o.c === "公式を打つ"')
rep('LVN[o.dv].icon + " " + LVN[o.dv].name });', 'LVN[o.dv].icon + " " + LVN[o.dv].name + "(" + o.gr + ")" });')
rep('kind:"kokuterm"', 'kind:"sugaterm"')
rep('"kokumas"', '"sugamas"', 0)
rep('levels.kokumas', 'levels.sugamas', 0); rep('pools.kokumas', 'pools.sugamas'); rep('colors.kokumas = "#3b5bdb"', 'colors.sugamas = "#3b5bdb"'); rep('maps.kokumas', 'maps.sugamas')
rep('const MODES_ALL = ["kyomi", "kyoji", "kkotowaza", "kbunpo", "kkobun", "kkoten", "kkanbun", "kbungaku", "khyoron", "sugamas"];',
    'const MODES_ALL = ["mkazu", "mzukei", "mshiki", "mkansu", "mdata", "mkoko", "mhito", "sugamas"];')
rep("国語図鑑", "数学図鑑", 0)
rep("9つの 旅", "7つの 旅", 0)
rep('flick-kokugo', 'flick-sugaku', 0)
rep("<small>中学の 基本から 大学受験まで</small>", "<small>算数から 大学受験まで</small>")
rep('placeholder="🔍 さがす(例: をかし)"', 'placeholder="🔍 さがす(例: 因数分解)"')
# 打つ ときの ヒント: 公式は 読みあげで
rep("""          q.j === "kobun" && q.n !== q.r ? '<small class="ai-alt">📜 むかしの かなづかい → いまの かなづかいで 打とう</small>' : "") + '</div></div>';""",
    """          q.fx ? '<small class="ai-alt">🧮 公式を 読みあげの 形で 打とう</small>' : "") + '</div></div>';""")
# こたえた あとの 説明に 小さな 図
rep("""h += '<div class="ai-learn" role="status"><b>✅ ' + esc(prev.n) + '</b><span>' + prev.jr.icon + " " + esc(prev.jr.name) + '</span><p>' + esc(prev.ds) + '</p>' +""",
    """h += '<div class="ai-learn" role="status">' + (prev.fg ? '<div class="sg-lfig">' + figSvg(prev.fg, { small:true }) + '</div>' : "") + '<b>✅ ' + esc(prev.n) + '</b><span>' + prev.jr.icon + " " + esc(prev.jr.name) + '</span><p>' + esc(prev.ds) + '</p>' +""")
# 結果・図鑑: 図と 学年
rep("""    if(p) h += '<p class="ai-small">📍 ' + esc(nodeLabel(q)) + ' の ことばだよ</p><div class="ai-mini">' + diagramSvg(p.key, { pin:p.node, small:true }) + '</div>';""",
    """    if(p) h += '<p class="ai-small">📍 ' + esc(nodeLabel(q)) + ' の ことばだよ</p><div class="ai-mini">' + diagramSvg(p.key, { pin:p.node, small:true }) + '</div>';
    if(q.fg) h += '<p class="ai-small">📐 ' + esc(FIG_NAME[q.fg.split(":")[0]] || "図") + ' の 図</p><div class="ai-mini">' + figSvg(q.fg) + '</div>';
    h += '<p class="ai-small ai-muted">📚 習う ところ: ' + esc(q.gr) + '(' + LVN[q.dv].icon + " " + esc(LVN[q.dv].name) + ')</p>';""")
# ホーム: ボタン 4つ(図鑑・クイズ・計算・お気に入り)+ 図の ずかん
rep("""      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +""",
    """      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn ai-calc" data-ai-open="calc">🧮 計算問題</button>' +""")
rep("""      '<div class="ai-diag"><p class="ai-dh">🗓 文学史の 年表 <small>文学史で 覚えた 作品・作家が 📍に なるよ。時代を おすと 中身が 出るよ</small></p><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></div>' +""",
    """      '<div class="ai-diag"><p class="ai-dh">📐 図の ずかん <small>覚えた ことばの 図が ここに ならぶよ。図を おすと その 図の ことばが 出るよ</small></p>' +
      figGallery(d) + '<div class="ai-dlist" id="ai-dlist"></div></div>' +""")
rep("    if(JOURNEY_OF[m] && JBY[JOURNEY_OF[m]].diagram) diagCur = JBY[JOURNEY_OF[m]].diagram;\n    if(!diagCur) diagCur = DIAGS[0];\n", "")
rep("}else chips.innerHTML = '<p class=\"ai-lead\">7つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';",
    "}else chips.innerHTML = '<p class=\"ai-lead\">7つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';")
# 図と 計算を 入れる(おす・えらぶの 前)
GAL = """
  /* 図の ずかん: 使っている 図ごとに 1まい。出会った ことばが ある 図だけ 見える */
  const FIG_KEYS = [...new Set(ALL.filter(q => q.fg).map(q => q.fg.split(":")[0]))];
  function figGallery(d){
    return '<div class="sg-figs">' + FIG_KEYS.map(k => {
      const here = ALL.filter(q => q.fg && q.fg.split(":")[0] === k), got = here.filter(q => d.has(q.art)).length;
      return '<button type="button" class="sg-ft' + (got ? " on" : "") + '" data-sg-fig="' + k + '">' + (got ? figSvg(k + ":", { noPin:true }) : '<span class="sg-lock">' + (FIG_ICON[k] || "❔") + '</span>') +
        '<b>' + esc(FIG_NAME[k] || k) + '</b><small>' + got + ' / ' + here.length + '</small></button>';
    }).join("") + '</div>';
  }
  function showFig(k){
    const d = discovered(), here = ALL.filter(q => q.fg && q.fg.split(":")[0] === k), got = here.filter(q => d.has(q.art));
    const l = document.getElementById("ai-dlist"); if(!l) return;
    l.innerHTML = '<p class="ai-dl-h">' + (FIG_ICON[k] || "") + " " + esc(FIG_NAME[k] || k) + '　<small>' + got.length + ' / ' + here.length + '語</small></p>' +
      (got.length ? '<div class="ai-chips">' + got.map(q => chip(q)).join("") + '</div>' : "") +
      (here.length > got.length ? '<p class="ai-small ai-muted">まだ 出会っていない ことばが ' + (here.length - got.length) + '語 あるよ</p>' : "");
    l.scrollIntoView({ block:"nearest", behavior:"smooth" });
  }
"""
CALC_UI = """
  let calc = null, cset = { g:"", lv:"" };
  function openCalc(){ calc = null; sheet("ai-cq"); drawCalc(); }
  function startCalc(){
    const gens = CALC.filter((f, i) => (!cset.g || CALC_META[i].g === cset.g) && (!cset.lv || CALC_META[i].lv === cset.lv));
    if(!gens.length){ drawCalc("この くみあわせの 問題は まだ ないよ。なかまか めやすを かえてね"); return; }
    const order = shuffle(gens.concat(gens, gens, gens)).slice(0, QN);
    calc = { list:order.map(calcMake).filter(Boolean), i:0, ok:0, picked:null };
    drawCalc();
  }
  function drawCalc(msg){
    const sh = document.getElementById("ai-cq"), C = calc, GN = Object.fromEntries(CALC_G);
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🧮 計算問題</h2>';
    if(!C){
      const n = CALC_META.filter(m => (!cset.g || m.g === cset.g) && (!cset.lv || m.lv === cset.lv)).length;
      h += '<p class="ai-qlead">算数・高校受験・大学受験で よく 出る 形の 計算だよ。数字は 毎回 かわるので、何回でも 新しい 問題に なるよ。答えた あとに とき方が 出るよ。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="ai-cl">' + opt("", "📶 ぜんぶの めやす", cset.lv) + CALC_LV.map(([v, l]) => opt(v, l, cset.lv)).join("") + '</select>' +
        '<select id="ai-cg">' + opt("", "🧮 ぜんぶの なかま", cset.g) + CALC_G.map(([v, l]) => opt(v, l, cset.g)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの 問題の 形: ' + n + 'しゅるい</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">はじめる</button>' +
        '<p class="ai-note">円周率は 算数では 3.14、中学からは π を 使います。問題は この ゲームが 作った もので、本物の 入試問題では ありません。計算用紙を 使っても OK。</p>';
    }else if(C.i >= C.list.length){
      h += '<p class="ai-qres">' + C.ok + ' / ' + C.list.length + ' 問 正解！' + (C.ok === C.list.length ? " 🎉" : "") + '</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">もう一度(新しい 数字で)</button><button type="button" class="ai-btn ai-wide" data-ai-open="calc">はんいを えらびなおす</button>';
    }else{
      const P = C.list[C.i], done = C.picked !== null;
      h += '<p class="ai-qn">' + (C.i + 1) + ' / ' + C.list.length + '　<span>' + esc(GN[P.g] || "") + ' ・ ' + esc(P.lv) + 'の めやす</span></p><p class="ai-qq sg-cq">' + esc(P.q) + '</p>' +
        '<div class="ai-qch">' + P.ch.map((c, k) => '<button type="button" class="ai-btn' + (done ? (c.ok ? " ok" : k === C.picked ? " ng" : "") : "") + '" data-ai-cans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(c.t) + '</button>').join("") + '</div>';
      if(done){
        const ok = P.ch[C.picked].ok;
        h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は " + "ABCD"[P.ch.findIndex(c => c.ok)] + "「" + esc(P.A) + "」") + '</b><ol class="ai-cex">' +
             P.ex.map(x => '<li>' + esc(x) + '</li>').join("") + '</ol></div>' +
             '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cnext="1">' + (C.i + 1 < C.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
      }
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-cq");
    const g = sh.querySelector("#ai-cg"), lv = sh.querySelector("#ai-cl");
    if(g) g.onchange = e => { cset.g = e.target.value; drawCalc(); };
    if(lv) lv.onchange = e => { cset.lv = e.target.value; drawCalc(); };
  }
  function answerCalc(k){ const C = calc, P = C && C.list[C.i]; if(!P || C.picked !== null) return; C.picked = k; if(P.ch[k].ok) C.ok++; drawCalc(); }
"""
rep("  /* ── おす・えらぶ(まとめて 受ける。", FIG + GAL + CALC + CALC_UI + "\n  /* ── おす・えらぶ(まとめて 受ける。")
rep('''const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],.ai-node");''',
    '''const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-cstart],[data-ai-cnext],[data-ai-cans],[data-sg-fig],.ai-node");''')
rep("    if(t.dataset.aiQstart) return startQuiz();\n",
    """    if(t.dataset.aiQstart) return startQuiz();
    if(t.dataset.aiCans) return answerCalc(+t.dataset.aiCans);
    if(t.dataset.aiCstart) return startCalc();
    if(t.dataset.aiCnext){ calc.i++; calc.picked = null; drawCalc(); const sh = document.getElementById("ai-cq"); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.sgFig){ document.querySelectorAll(".sg-ft").forEach(b => b.classList.toggle("sel", b === t)); return showFig(t.dataset.sgFig); }
""")
rep('      if(o === "quiz") return openQuiz();\n', '      if(o === "quiz") return openQuiz();\n      if(o === "calc") return openCalc();\n')
rep("/* ── 見た目(この ページだけ。和紙と 藍の ように 明るく やさしく。むずかしそうに しない) ── */", "/* ── 見た目(この ページだけ。方眼の ノートの ように 明るく やさしく。むずかしそうに しない) ── */")
rep(".ai-panel{background:linear-gradient(160deg,#edf2ff 0%,#fff9db 55%,#ebfbee 100%);border:1px solid #bac8ff;",
    ".ai-panel{background:linear-gradient(160deg,#e7f5ff 0%,#fff9db 55%,#fff0f6 100%);border:1px solid #a5d8ff;")
rep("linear-gradient(90deg,#3b5bdb,#2f9e44,#f08c00)", "linear-gradient(90deg,#3b5bdb,#1098ad,#e8590c)")
rep("body.ai-lock{overflow:hidden}", """body.ai-lock{overflow:hidden}
.ai-btns .ai-calc{background:linear-gradient(135deg,#fff4e6,#fff);border-color:#ffc078}
.sg-lfig{float:right;width:96px;margin:-2px -4px 2px 6px;background:#fff;border-radius:10px;border:1px solid #e0e7ff}
.sg-lfig .ai-svg{display:block}
.sg-figs{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:6px}
.sg-ft{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 3px 5px;border-radius:12px;border:1.5px dashed #cbd5e1;background:#f8fafc;color:#94a3b8;font:inherit;cursor:pointer;min-height:92px}
.sg-ft.on{border-style:solid;border-color:#c7d2fe;background:#fff;color:#1e1b4b}.sg-ft.sel{border-color:#3b5bdb;box-shadow:0 0 0 2px #dbe4ff}
.sg-ft .ai-svg{width:100%;height:auto}.sg-ft b{font-size:11px;line-height:1.2}.sg-ft small{font-size:10px;color:#64748b}
.sg-lock{font-size:26px;display:grid;place-items:center;height:56px;filter:grayscale(1);opacity:.55}
.sg-cq{font-size:16px}""")
rep("owns:m => MODES_ALL.includes(m)", "owns:m => MODES_ALL.includes(m)")
rep("openZukan, diagramSvg };", "openZukan, diagramSvg, figSvg };")
Path("sugaku").mkdir(exist_ok=True)
Path("sugaku/sugaku.js").write_text(s, encoding="utf-8")
print("ok", len(s))
