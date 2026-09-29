/* フリック数学旅行: 算数〜高校受験・大学受験の 数学の 用語・公式・定理(数と計算・図形・文字と式・関数・データと確率・高校数学・数学者)を、フリックで 打って おぼえる。(けいくん 2026-09-27)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「数学の 旅」を 足す ファイル。sugaku/ の ページだけが 読む ─
   ことばは tools/sugaku/meta.json + tools/sugaku/terms-*.json → tools/sugaku/terms_js.py が data/sugaku.json と sugaku/terms.js(SUGAKU_TERMS)に する。
   **ことばを 足す・直すのは tools/sugaku/terms-<旅>.json だけ**。この ファイルは tools/sugaku/make_sugaku_js.py が 作る(手で 直さない)
   ・もとは フリック国語旅行(kokugo/kokugo.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 7つ + 🏆 マスター。レベルは 入門(算数)→ 初級(中学 = 高校受験)→ 中級(数学Ⅰ・A)→ 上級(数学Ⅱ・B・Ⅲ・C = 大学受験)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・「公式を打つ」語は 公式(a²+b²=c²)を 見せて、読みあげ(えーのにじょうたす…)を 打つ(けいくん 2026-09-27「おすすめ」)
   ・図は コードで 描く(tools/sugaku/fig.js)。答えると その 語の 図に 📍が 立つ。ホームに「📐 図の ずかん」
   ・🧮 計算問題(けいくん 2026-09-27「受験に必要な計算は入れた方がいい」): 算数 → 高校受験 → 大学受験の 計算を 数字を 毎回 かえて 4択で(tools/sugaku/calc.js)。**計算の タイム(かずとも)とは べつ**
   ⚠️ 高校受験・大学受験の 範囲の めやす。本物の 入試問題では ない */
const SUGAKU = (() => {
  const D = SUGAKU_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に mkazu / mzukei / mshiki / mkansu / mdata / mkoko / mhito / sugamas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { kazu:"mkazu", zukei:"mzukei", shiki:"mshiki", kansu:"mkansu", data:"mdata", koko:"mkoko", hito:"mhito" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"sugaterm", hide:false, fx:o.c === "公式を打つ", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
      c:j.icon + " " + j.name + " ・ " + o.c + " ・ " + LVN[o.dv].icon + " " + LVN[o.dv].name + "(" + o.gr + ")" });
  });
  const BY = new Map(ALL.map(q => [q.art, q]));
  const TOTAL = ALL.length;
  function cost(s){ let c = 0; for(const ch of s){ c += 1; if(/[がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔ]/.test(ch)) c += .5; if(/[ぁぃぅぇぉっゃゅょゎ]/.test(ch)) c += .5; if(ch === "ー") c += .3; } return c; }
  const easy = (a, b) => cost(a.r) - cost(b.r);

  /* ── 旅の ステージを 組む ──
     旅の ことばを やさしい順(むずかしさ → data の ならび順 = 有名な順)に 10語ずつ。どの ステージも いつも 同じ 10語(スピード記録勝負)。
     あまりが 出たら 前の ステージの うしろから 足りないぶんを もう一度 出して 10語に する(土台の LEVELS と 同じ きまり)。
     (けいくん 2026-09-27「苦手克服と復習は無しにして スピード記録勝負に揃えてください」。まえは 新しい 7語 + ふくしゅう 3語だった) */
  const levels = {}, pools = {}, stageInfo = {}, maps = {}, colors = {};
  function tens(list){  // [{ fresh:その ステージで はじめて 出る ことば, set:10語(やさしい順), dv:いちばん 多い むずかしさ }]
    const out = [];
    for(let i = 0; i + ROUNDS <= list.length; i += ROUNDS) out.push({ fresh:list.slice(i, i + ROUNDS), set:list.slice(i, i + ROUNDS) });
    const rest = list.length % ROUNDS;
    if(rest && list.length > ROUNDS) out.push({ fresh:list.slice(-rest), set:list.slice(-rest - (ROUNDS - rest)) });
    else if(rest) out.push({ fresh:list.slice(), set:list.slice() });
    return out.map(x => { const n = {}; x.fresh.forEach(q => n[q.dv] = (n[q.dv] || 0) + 1);
      return { fresh:x.fresh, set:x.set.slice().sort(easy), dv:+Object.keys(n).sort((a, b) => n[b] - n[a] || a - b)[0] }; });
  }
  for(const J of JR){
    const m = MODE_OF[J.id], terms = ALL.filter(q => q.j === J.id);
    const info = tens(terms.slice().sort((a, b) => a.dv - b.dv || a.ord - b.ord)), lv = info.map(s => s.set);
    info.forEach((s, k) => { s.stop = Math.min(J.stops.length - 1, Math.floor(k * J.stops.length / info.length)); });
    levels[m] = lv; stageInfo[m] = info; pools[m] = terms; colors[m] = J.color;
    maps[m] = { icon:J.icon, name:J.name, cardName:J.name, title:"", word:"数学図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば", miss:"まだ 出会っていない ことば",
                lvTitle:J.icon + " " + J.name + "　旅を すすめる",
                card:(mm, done) => '<small>' + terms.length + '語・' + lv.length + 'ステージ</small><small>出会った ' + done + '語</small>' };
  }
  /* マスター: 7つの 旅を まぜて ぜんぶ(きまった ならび。どの ステージも いつも 同じ 10語 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.slice().sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.sugamas = lv; pools.sugamas = ALL; colors.sugamas = "#3b5bdb";
    maps.sugamas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"数学図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　7つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>算数から 大学受験まで</small>' };
  }
  const MODES_ALL = ["mkazu", "mzukei", "mshiki", "mkansu", "mdata", "mkoko", "mhito", "sugamas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-sugaku[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-sugaku-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-sugaku");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-sugaku"), JSON.stringify(v)); memo = { k:pkey("flick-sugaku"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-sugaku-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-sugaku-fav"), JSON.stringify(a)); return i < 0; }
  function discovered(){ const L = log(); return new Set(Object.keys(L).filter(id => BY.has(id))); }
  function discoveredIn(m){ const d = discovered(), s = new Set(); for(const q of (pools[m] || [])) if(d.has(q.art)) s.add(q.art); return s; }
  const dayOf = t => { const d = new Date(t); return d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate(); };
  function todayWords(){ const L = log(), td = dayOf(Date.now()); return ALL.filter(q => L[q.art] && L[q.art][5] && dayOf(L[q.art][5]) === td).sort((a, b) => log()[a.art][5] - log()[b.art][5]); }
  function answered(q, secs, miss){
    if(!q || !BY.has(q.art)) return;
    const L = log(), e = L[q.art] || [0, 0, 0, 0, 0, Date.now()];
    const per = secs / Math.max(1, q.r.length);
    L[q.art] = [e[0] + 1, e[1] + miss, miss > 0 ? 1 : 0, e[0] ? +(e[3] * .6 + per * .4).toFixed(3) : +per.toFixed(3), Date.now(), e[5] || Date.now()];
    save(L);
  }
  let pre = null;  // この回の 前に 出会っていた ことば
  /* 問題: いつも 同じ 10語(土台の LEVELS と 同じ。人ごとに かえない) */
  function makeQs(m, lv){ pre = discovered(); return levels[m][lv].slice(); }
  /* 読みかたが いくつか ある ことば(SQL = えすきゅーえる / しーくえる)。打った字に 合う 読みへ 目あてを 合わせる */
  function retarget(q, v){
    const all = [q.r].concat(q.al || []);
    if(all.length < 2 || !v) return q.r;
    if(all.includes(v)) return v;
    const pre2 = all.filter(x => x.startsWith(v));
    if(pre2.length) return pre2.includes(q.r) ? q.r : pre2[0];
    let best = q.r, bl = -1;
    for(const x of all){ let i = 0; while(i < x.length && i < v.length && x[i] === v[i]) i++; if(i > bl){ bl = i; best = x; } }
    return best;
  }
  function titles(){ return D.titles.filter(T => T[0] < TOTAL); }
  function titleOf(n){ let t = null; for(const T of titles()) if(n >= T[0]) t = T; if(n >= TOTAL) t = [TOTAL].concat(D.allTitle); return t; }
  function nextTitle(n){ for(const T of titles()) if(n < T[0]) return T; return n < TOTAL ? [TOTAL].concat(D.allTitle) : null; }
  let last = null;
  function finished(r, qs){
    const now = discovered(), before = pre || new Set();
    const fresh = qs.filter(q => !before.has(q.art) && now.has(q.art)).map(q => q.art);
    const earned = titles().concat([[TOTAL].concat(D.allTitle)]).filter(T => before.size < T[0] && now.size >= T[0]);
    return { fresh, total:now.size, earned };
  }
  function chip(q, cls){ return '<button type="button" class="ai-chip' + (cls ? " " + cls : "") + '" data-ai-term="' + esc(q.art) + '">' + q.e + " " + esc(q.n) + '</button>'; }
  function resultMsg(r){
    last = r.kabu || null;
    const k = r.kabu || { fresh:[], total:discovered().size, earned:[] };
    let h = '<span class="ai-r1">🆕 あたらしく 出会った ことば +' + k.fresh.length + '語</span>' +
      '<small>ぜんぶで ' + fmt(k.total) + ' / ' + fmt(TOTAL) + '語 発見</small>';
    for(const T of k.earned) h += '<span class="ai-earn">' + T[1] + " 称号ゲット！「" + esc(T[2]) + "」</span>";
    const td = todayWords();
    if(td.length) h += '<span class="ai-today"><b>📅 きょう 覚えた ことば ' + td.length + '語</b><span class="ai-chips">' + td.map(q => chip(q, k.fresh.includes(q.art) ? "new" : "")).join("") + '</span></span>';
    return h;
  }

  /* ── しくみ図(SVG を コードで 描く。AIの 絵は 使わない = 字と 📍の 場所が ずれないため) ──
     counts = 場所ごとの 出会った 数 / pin = 📍を 立てる 場所 */
  const BW = 104, BH = 58;
  const DIAGS = Object.keys(D.diagrams);  // ケーキの 図は 2つの 旅(生地・クリーム)で 使うので、タブは 図ごとに 1つ
  const BG = {};  // 整備の クルマ・バイクの よこ顔は 使わない
  function diagramSvg(key, o){
    o = o || {};
    const G = D.diagrams[key], N = Object.fromEntries(G.nodes.map(n => [n.id, n])), tone = (JR.find(j => j.diagram === key) || JR[0]).color;
    let s = '<svg class="ai-svg' + (o.small ? " sm" : "") + '" viewBox="0 0 ' + G.w + ' ' + G.h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(G.name) + '">';
    if(G.bg && BG[G.bg]) s += BG[G.bg];
    s += '<defs><marker id="ai-ar-' + key + (o.small ? "s" : "") + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>';
    for(const [a, b, label] of G.edges){
      const A = N[a], B = N[b], dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1;
      const cut = t => Math.min(Math.abs(dx) ? (BW / 2 + 3) / Math.abs(dx) : 9, Math.abs(dy) ? (BH / 2 + 3) / Math.abs(dy) : 9);
      const t0 = cut(), x1 = A.x + dx * t0, y1 = A.y + dy * t0, x2 = B.x - dx * t0, y2 = B.y - dy * t0;
      s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#94a3b8" stroke-width="1.6" marker-end="url(#ai-ar-' + key + (o.small ? "s" : "") + ')"/>';
      if(label && !o.small){ const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; s += '<text x="' + mx.toFixed(1) + '" y="' + (my - 3).toFixed(1) + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#64748b" paint-order="stroke" stroke="#fff" stroke-width="3">' + esc(label) + '</text>'; }
      void len;
    }
    for(const n of G.nodes){
      const c = (o.counts || {})[n.id] || 0, on = o.pin ? n.id === o.pin : c > 0, dim = o.pin && n.id !== o.pin;
      const lines = n.label.length > 7 && n.label.includes("・") ? n.label.split("・") : [n.label];
      s += '<g class="ai-node' + (on ? " on" : "") + '" data-node="' + n.id + '" data-diag="' + key + '" opacity="' + (dim ? .45 : 1) + '">' +
        '<rect x="' + (n.x - BW / 2) + '" y="' + (n.y - BH / 2) + '" width="' + BW + '" height="' + BH + '" rx="14" fill="' + (on ? "#fff" : "#f8fafc") + '" stroke="' + (on ? tone : "#cbd5e1") + '" stroke-width="' + (on ? 2.4 : 1.4) + '"' + (on ? "" : ' stroke-dasharray="4 3"') + '/>' +
        '<text x="' + n.x + '" y="' + (n.y - (lines.length > 1 ? 8 : 4)) + '" text-anchor="middle" font-size="17">' + n.icon + '</text>';
      lines.forEach((ln, i) => { s += '<text x="' + n.x + '" y="' + (n.y + (lines.length > 1 ? 8 : 15) + i * 12) + '" text-anchor="middle" font-size="' + (ln.length > 8 ? 9.5 : 10.5) + '" font-weight="800" fill="#1e293b">' + esc(ln) + '</text>'; });
      if(o.pin && n.id === o.pin) s += '<text x="' + (n.x + BW / 2 - 6) + '" y="' + (n.y - BH / 2 + 6) + '" text-anchor="middle" font-size="22" class="ai-pinbob">📍</text>';
      else if(!o.pin && c) s += '<g><circle cx="' + (n.x + BW / 2 - 4) + '" cy="' + (n.y - BH / 2 + 4) + '" r="11" fill="' + tone + '"/><text x="' + (n.x + BW / 2 - 4) + '" y="' + (n.y - BH / 2 + 8) + '" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">' + c + '</text></g>';
      s += '</g>';
    }
    return s + '</svg>';
  }
  function nodeOf(q){ if(!q.mp) return null; const [k, n] = q.mp.split(":"); return { key:k, node:n }; }
  function countsFor(key){ const d = discovered(), c = {}; for(const q of ALL){ const p = nodeOf(q); if(p && p.key === key && d.has(q.art)) c[p.node] = (c[p.node] || 0) + 1; } return c; }
  const nodeLabel = q => { const p = nodeOf(q), G = D.diagrams[p.key], n = G.nodes.find(x => x.id === p.node); return G.name + " の「" + n.label + "」"; };

  /* ── 問題の カード: ことば + ひとつ前の ことばの 意味・つながる ことば(こたえたら 出る。テンポを 止めない) ── */
  function card(q, prev){
    let h = "";
    if(prev){
      const rel = (prev.rel || []).slice(0, 2).map(id => BY.get(id)).filter(Boolean);
      h += '<div class="ai-learn" role="status">' + (prev.fg ? '<div class="sg-lfig">' + figSvg(prev.fg, { small:true }) + '</div>' : "") + '<b>✅ ' + esc(prev.n) + '</b><span>' + prev.jr.icon + " " + esc(prev.jr.name) + '</span><p>' + esc(prev.ds) + '</p>' +
           (rel.length ? '<p class="ai-rel">🔗 つながる ことば: ' + rel.map(x => esc(x.n)).join("・") + '</p>' : "") + '</div>';
    }else h += '<div class="ai-learn ai-hint">こたえると、その ことばの 意味と、つながる ことばが 出るよ</div>';
    const tag = pre && !pre.has(q.art) ? '<span class="ai-tag new">🆕 はじめまして</span>' : "";
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot">' + esc(q.n) + '</p>' + tag + '<small class="ai-cat">' + esc(q.c) + '</small>' +
         (q.hide ? '<small class="ai-alt">🙈 よみを 思い出して 打とう。まちがえると その 1字だけ 見えるよ</small>' :
          q.al ? '<small class="ai-alt">読みかたは どれでも OK: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</small>' :
          q.fx ? '<small class="ai-alt">🧮 公式を 読みあげの 形で 打とう</small>' : "") + '</div></div>';
    return h;
  }
  /* 打つ 字の 見せかた。ふだんは 土台と 同じ。よみを かくす 語は 打った ところまで だけ 見せて、のこりは ？。まちがえた ところだけ 正しい 字を 見せる(ヒント) */
  function tgtHtml(q, n, err){
    const t = typeof target === "string" && target ? target : q.r;
    let h = "";
    for(let i = 0; i < t.length; i++){
      const cls = i < n ? "d" : (i === n ? (err ? "x" : "n") : "c");
      h += '<span class="' + cls + '">' + (q.hide && i >= n && !(i === n && err) ? "？" : t[i]) + '</span>';
    }
    return h;
  }
  /* ── 結果・図鑑の くわしい 情報: たとえば / つながる ことば / しくみ図の 📍 ── */
  function info(q, inZukan){
    const tag = inZukan ? "" : last && last.fresh.includes(q.art) ? '<span class="ai-tag new">🆕 はじめて 出会った</span>' : "";
    const d = discovered(), p = nodeOf(q);
    let h = '<div class="ai-info">' + tag;
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.al) h += '<p class="ai-small">読みかた: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</p>';
    const rel = (q.rel || []).map(id => BY.get(id)).filter(Boolean);
    if(rel.length) h += '<p class="ai-small">🔗 つながる ことば</p><div class="ai-chips">' + rel.map(x => d.has(x.art) ? chip(x) : '<button type="button" class="ai-chip lock" data-ai-term="' + esc(x.art) + '">❔ ？？？</button>').join("") + '</div>';
    // しくみ図・地図(📍)は 10問の あとの 説明・図鑑に のせない(けいくん 2026-09-29「地図スクロールが大変になるからいらない / 10問終わったあとの説明にはのせないで」→「すべてのフリックゲームを同じ仕様に」)。ホームの 図は たたんで のこす。📐 数学の 図(その ことばの 形)は 説明の 一部なので のこす
    if(q.fg) h += '<p class="ai-small">📐 ' + esc(FIG_NAME[q.fg.split(":")[0]] || "図") + ' の 図</p><div class="ai-mini">' + figSvg(q.fg) + '</div>';
    h += '<p class="ai-small ai-muted">📚 習う ところ: ' + esc(q.gr) + '(' + LVN[q.dv].icon + " " + esc(LVN[q.dv].name) + ')</p>';
    if(q.ty === "service") h += '<p class="ai-small ai-muted">🏢 サービス・会社の 名前です。中身や 名前が 変わることが あります' + (q.asOf ? "(" + esc(q.asOf) + "時点)" : "(" + esc(D.asOf) + "時点の 説明)") + '</p>';
    else if(q.asOf) h += '<p class="ai-small ai-muted">' + esc(q.asOf) + '時点の 説明です</p>';
    return h + '</div>';
  }

  /* ── ホーム: 見つけた ことば・称号・しくみ図・旅マップ ── */
  let diagCur = null;
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n), td = todayWords().length, fv = favs().length;
    const jr = JR.map(J => { const all = pools[MODE_OF[J.id]], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + J.icon + " " + J.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + got + '</b> / ' + all.length + '</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%;--c:' + J.color + '"></i></li>'; }).join("");
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 数学図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn ai-calc" data-ai-open="calc">🧮 計算問題</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">📐 図の ずかんを ひらく <small>覚えた ことばの 図が ここに ならぶよ。図を おすと その 図の ことばが 出るよ</small></summary>' +
      figGallery(d) + '<div class="ai-dlist" id="ai-dlist"></div></details>' +
      '<p class="ai-note">' + esc(D.note) + '</p></section>';
    // 旅マップ(ステージの 上)
    const chips = $("#kabu-chips");
    if(JOURNEY_OF[m]){
      const J = JBY[JOURNEY_OF[m]], info = stageInfo[m];
      const stopDone = J.stops.map((_, i) => info.filter(s => s.stop === i).every(s => s.fresh.every(q => d.has(q.art))));
      const cur = stopDone.indexOf(false);
      chips.innerHTML = '<div class="ai-route" style="--c:' + J.color + '"><span class="st">🚩 START</span>' +
        J.stops.map((S, i) => '<span class="ar">→</span><span class="st' + (stopDone[i] ? " done" : i === cur ? " now" : "") + '">' + S.icon + " " + esc(S.name) + (stopDone[i] ? " ✅" : i === cur ? '<em>いまここ</em>' : "") + '</span>').join("") +
        '<span class="ar">→</span><span class="st goal' + (cur < 0 ? " done" : "") + '">🏆 ' + esc(J.goal) + '</span></div>' +
        '<p class="ai-lead">' + esc(J.lead) + '。1回 10問。どの ステージも いつも 同じ 10語。タイムで 勝負しよう。</p>';
    }else chips.innerHTML = '<p class="ai-lead">7つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "sugamas") return { name:"マスター" + (i + 1), sub:"7つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    const hid = s.set.some(q => q.hide);
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name + (hid ? " 🙈" : ""), sub:S.icon + " " + S.name + "・10語" + (hid ? "・よみを かくす" : ""), short:"Lv." + (i + 1) };
  }

  /* ── 数学図鑑(検索・旅・分類・むずかしさ・お気に入りで しぼれる) ── */
  let zf = { q:"", j:"", c:"", dv:"", fav:false, shown:90 };
  const normQ = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/\s/g, "");
  function sheet(id){
    let sh = document.getElementById(id);
    if(!sh){ sh = document.createElement("div"); sh.id = id; sh.className = "prof-sheet ai-sheet"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeSheet(id); }); }
    sh.classList.remove("hidden"); document.body.classList.add("ai-lock"); return sh;
  }
  function closeSheet(id){ const sh = document.getElementById(id); if(sh) sh.classList.add("hidden"); if(!document.querySelector(".ai-sheet:not(.hidden)")) document.body.classList.remove("ai-lock"); }
  function openZukan(pre2){ if(pre2) Object.assign(zf, { q:"", j:"", c:"", dv:"", fav:false }, pre2); zf.shown = 90; sheet("ai-zk"); drawZukan(); }
  function drawZukan(){
    const sh = document.getElementById("ai-zk"), d = discovered(), fv = new Set(favs()), qq = normQ(zf.q);
    const list = ALL.filter(q => (!zf.j || q.j === zf.j) && (!zf.c || q.c === zf.c) && (!zf.dv || q.dv === +zf.dv) && (!zf.fav || fv.has(q.art)) &&
      (!qq || [q.n, q.r].concat(q.al || [], [q.ds]).some(x => normQ(x).includes(qq))));
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    const cats = [...new Set(ALL.filter(q => !zf.j || q.j === zf.j).map(q => q.c))];
    const scroll = sh.scrollTop, focused = document.activeElement && document.activeElement.id === "ai-zq";
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 数学図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 因数分解)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-ztog"><button type="button" data-t="fav"' + (zf.fav ? ' class="on"' : "") + '>⭐ お気に入り</button></div>' +
      (list.length ? "" : '<p class="ai-empty">' + (zf.fav ? "⭐ まだ お気に入りが ないよ。ことばの ページの ☆ を おすと 入るよ" : "見つからなかったよ") + '</p>') +
      '<div class="ai-grid">' + list.slice(0, zf.shown).map(q => d.has(q.art)
        ? '<button type="button" class="ai-tile on" data-ai-term="' + esc(q.art) + '"><span>' + q.e + '</span><b>' + esc(q.n) + '</b><small>' + q.jr.icon + " " + esc(q.c) + (fv.has(q.art) ? " ⭐" : "") + '</small></button>'
        : '<button type="button" class="ai-tile" data-ai-term="' + esc(q.art) + '"><span>❔</span><b>？？？</b><small>' + q.jr.icon + " " + LVN[q.dv].name + '</small></button>').join("") + '</div>' +
      (list.length > zf.shown ? '<button type="button" class="ai-btn ai-wide" data-ai-more="1">もっと 見る(あと ' + (list.length - zf.shown) + '語)</button>' : "") +
      '<p class="ai-note">' + esc(D.note) + '</p></div>';
    sh.scrollTop = scroll;
    const qi = sh.querySelector("#ai-zq");
    if(focused){ qi.focus(); qi.setSelectionRange(qi.value.length, qi.value.length); }
    qi.addEventListener("input", e => { zf.q = e.target.value; zf.shown = 90; drawZukan(); });
    sh.querySelector("#ai-zj").onchange = e => { zf.j = e.target.value; zf.c = ""; zf.shown = 90; drawZukan(); };
    sh.querySelector("#ai-zc").onchange = e => { zf.c = e.target.value; zf.shown = 90; drawZukan(); };
    sh.querySelector("#ai-zd").onchange = e => { zf.dv = e.target.value; zf.shown = 90; drawZukan(); };
    sh.querySelectorAll(".ai-ztog button").forEach(b => b.onclick = () => { zf[b.dataset.t] = !zf[b.dataset.t]; zf.shown = 90; drawZukan(); });
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-zk");
  }
  /* ことば 1つの ページ。つながる ことばを おすと 次々 たどれる(もどるで 1つ前へ) */
  let trail = [];
  function detail(id, back){
    const q = BY.get(id); if(!q) return;
    if(!back){ if(trail[trail.length - 1] !== id) trail.push(id); } else trail.pop();
    const e = log()[id], box = sheet("ai-zdt"), where = whereOf(q), fav = favs().includes(id);
    box.innerHTML = '<div class="ai-card">' + '<button type="button" class="ai-x" aria-label="とじる">×</button>' + (e
      ? '<p class="ai-cn"><span class="ai-ic">' + q.e + '</span><ruby>' + esc(q.n) + '<rt>' + esc(q.r) + '</rt></ruby><button type="button" class="ai-fav' + (fav ? " on" : "") + '" data-ai-fav="' + esc(id) + '" aria-label="お気に入り">' + (fav ? "⭐" : "☆") + '</button></p>' +
        '<p class="ai-meta">' + esc(q.c) + '</p><p class="ai-d">' + q.rb + '</p>' + info(q, true) +
        '<p class="ai-st">出会った回数 ' + e[0] + '回' + (e[1] ? '・まちがい ' + e[1] + '回' : "") + '</p>'
      : '<p class="ai-cn"><span class="ai-ic">❔</span>？？？</p><p class="ai-d">まだ 出会っていない ことばです。<b>' + esc(where) + '</b>で 出会えるよ。</p><p class="ai-small">' + q.jr.icon + " " + esc(q.jr.name) + " ・ " + esc(q.c) + '</p>') +
      (trail.length > 1 ? '<button type="button" class="ai-btn ai-wide" data-ai-back="1">← 1つ前の ことばへ</button>' : "") + '</div>';
    box.querySelector(".ai-x").onclick = () => { trail = []; closeSheet("ai-zdt"); };
    const c = box.querySelector(".ai-card"); if(c) c.scrollTop = 0;
  }
  function whereOf(q){
    const m = MODE_OF[q.j], i = stageInfo[m].findIndex(s => s.fresh.includes(q));
    return JBY[q.j].name + "の Lv." + (i + 1);
  }

  /* ── 4択クイズ(けいくん 2026-09-26「すべてお願いします」)。試験の「えらぶ 問題」に なれる ための 練習 ──
     ・問題は この ゲームの 説明文から 作る(過去問・問題集は 使わない)。2つの 形を まぜる:
       ① 説明 → どの ことば?  ② ことば → 正しい 説明は どれ?
     ・まちがいの 3つは 同じ 旅・同じ 分類から えらぶ(にた もの どうしで 考える 練習)。答えの 名前は 説明の 中で ◯◯ に かくす
     ・はんい: 出会った ことば / めやすごと(入門・中級・上級)/ ぜんぶ。旅でも しぼれる
     ・出会った ことばを まちがえたら 図鑑の「まちがい」の 回数に 入る */
  let quiz = null, qset = { r:"seen", j:"" };
  const QN = 10;
  const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const k = Math.floor(Math.random() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; } return a; };
  const hide = (text, q) => { let t = String(text); for(const w of [q.n].concat(q.n.includes("(") ? [q.n.replace(/\(.*$/, "")] : [])) if(w.length >= 2) t = t.split(w).join("◯◯"); return t; };
  function quizPool(){
    const d = discovered();
    return ALL.filter(q => (!qset.j || q.j === qset.j) && (qset.r === "seen" ? d.has(q.art) : qset.r === "all" ? true : q.dv === +qset.r));
  }
  function wrongs(q, n){
    const same = ALL.filter(x => x !== q && x.j === q.j && x.c === q.c), jr = ALL.filter(x => x !== q && x.j === q.j && x.c !== q.c), rest = ALL.filter(x => x !== q && x.j !== q.j);
    const out = [];
    for(const g of [shuffle(same), shuffle(jr), shuffle(rest)]) for(const x of g){ if(out.length >= n) break; if(x.n !== q.n && !out.some(y => y.n === x.n)) out.push(x); }
    return out;
  }
  function openQuiz(){ quiz = null; sheet("ai-qz"); drawQuiz(); }
  function startQuiz(){
    const pool = quizPool();
    if(pool.length < 4){ drawQuiz("もんだいに できる ことばが 足りないよ(" + pool.length + "語)。はんいを 広げてね"); return; }
    quiz = { list:shuffle(pool).slice(0, QN).map((q, i) => ({ q, type:i % 2, ch:shuffle([q].concat(wrongs(q, 3))) })), i:0, ok:0, picked:null, miss:[] };
    drawQuiz();
  }
  function drawQuiz(msg){
    const sh = document.getElementById("ai-qz"), Q = quiz;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🧩 4択クイズ</h2>';
    if(!Q){
      const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
      const n = quizPool().length;
      h += '<p class="ai-qlead">試験の「えらぶ 問題」の 練習だよ。4つの 中から 1つ えらんでね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="ai-qr">' + opt("seen", "出会った ことば", qset.r) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, qset.r)).join("") + opt("all", "ぜんぶ", qset.r) + '</select>' +
        '<select id="ai-qj">' + opt("", "🧭 ぜんぶの 旅", qset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, qset.j)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの ことば: ' + n + '語</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームの 説明から 作っています。本物の 試験の 問題では ありません。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた ことば(おすと 説明が 読めるよ)</p><div class="ai-chips">' + Q.miss.map(q => chip(q)).join("") + '</div>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="quiz">はんいを えらびなおす</button>';
    }else{
      const it = Q.list[Q.i], done = Q.picked !== null;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + it.q.jr.icon + " " + esc(it.q.jr.name) + " ・ " + LVN[it.q.dv].icon + " " + esc(LVN[it.q.dv].name) + '</span></p>';
      h += it.type === 0
        ? '<p class="ai-qq">「' + esc(hide(it.q.ds, it.q)) + '」<br>これは どの ことば？</p>'
        : '<p class="ai-qq">「<b>' + esc(it.q.n) + '</b>」の 説明として 正しいのは どれ？</p>';
      h += '<div class="ai-qch' + (it.type ? " long" : "") + '">' + it.ch.map((x, k) => {
        const cls = done ? (x === it.q ? " ok" : k === Q.picked ? " ng" : "") : "";
        return '<button type="button" class="ai-btn' + cls + '" data-ai-ans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(it.type === 0 ? x.n : hide(x.ds, x)) + '</button>';
      }).join("") + '</div>';
      if(done){
        const ok = it.ch[Q.picked] === it.q;
        h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は " + "ABCD"[it.ch.indexOf(it.q)] + "「" + esc(it.q.n) + "」") + '</b>' +
             (it.type === 0 ? "" : '<p>' + esc(it.q.n) + ' … ' + esc(it.q.ds) + '</p>') +
             (!ok && it.type === 1 ? '<p class="ai-muted">えらんだのは「' + esc(it.ch[Q.picked].n) + '」の 説明だよ</p>' : !ok ? '<p class="ai-muted">「' + esc(it.ch[Q.picked].n) + '」は ' + esc(it.ch[Q.picked].ds) + '</p>' : "") + '</div>' +
             '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
      }
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-qz");
    const r = sh.querySelector("#ai-qr"), j = sh.querySelector("#ai-qj");
    if(r) r.onchange = e => { qset.r = e.target.value; drawQuiz(); };
    if(j) j.onchange = e => { qset.j = e.target.value; drawQuiz(); };
  }
  function answerQuiz(k){
    const Q = quiz, it = Q && Q.list[Q.i]; if(!it || Q.picked !== null) return;
    Q.picked = k;
    const ok = it.ch[k] === it.q;
    if(ok) Q.ok++;
    else {
      Q.miss.push(it.q);
      const L = log(), e = L[it.q.art];  // 出会った ことばだけ 図鑑の まちがいの 回数に 足す(まだの ことばは 図鑑に 出さない)
      if(e){ L[it.q.art] = [e[0], e[1] + 1, 1, e[3], Date.now(), e[5]]; save(L); }
    }
    drawQuiz();
  }

  /* ── 図(SVG を コードで 描く。AIの 絵は 使わない)。ことばの figure = "図:部分" の 部分を 色と 📍で 目立たせる ──
     ⚠️ 図の 数字・角度・形は 正しく 描く(ちがう 図は 数学では いちばん まずい)。
     図を 足すときは tools/sugaku/PROMPT.md の「図の 一覧」にも 足す(terms_js.py が 一覧で 確かめる)。
     ここは tools/sugaku/fig.js。tools/sugaku/make_sugaku_js.py が sugaku/sugaku.js に 入れる */
  const FIG_NAME = { numline:"数直線", frac:"分数", venn:"ベン図", tri:"三角形", isos:"二等辺三角形", equi:"正三角形", right:"直角三角形", para:"平行四辺形",
    trap:"台形", rhomb:"ひし形", circle:"円", sector:"おうぎ形", prism:"直方体", cyl:"円柱", cone:"円錐", sphere:"球", parallel:"平行線と角", similar:"相似",
    sym:"対称", area2:"展開の面積図", coord:"座標", prop:"比例のグラフ", inv:"反比例のグラフ", linear:"一次関数", parabola:"放物線", expo:"指数と対数",
    unit:"単位円", wave:"三角関数の波", hist:"ヒストグラム", box:"箱ひげ図", scatter:"散布図", normal:"正規分布", tree:"樹形図", vector:"ベクトル",
    seq:"等差数列", tangent:"接線と微分", integral:"定積分", limit:"極限", cplane:"複素数平面", ellipse:"楕円", hyperbola:"双曲線", circleq:"円の方程式", region:"領域" };
  const FIG_ICON = { numline:"📏", frac:"🍕", venn:"⭕", tri:"🔺", isos:"🔺", equi:"🔺", right:"📐", para:"▱", trap:"⏢", rhomb:"🔷", circle:"⚪", sector:"🍰",
    prism:"📦", cyl:"🥫", cone:"🍦", sphere:"🌐", parallel:"🛤️", similar:"🔍", sym:"🦋", area2:"🟩", coord:"➕", prop:"📈", inv:"📉", linear:"📈", parabola:"⛲",
    expo:"🚀", unit:"🧭", wave:"🌊", hist:"📊", box:"📦", scatter:"🌌", normal:"🔔", tree:"🌳", vector:"➡️", seq:"🪜", tangent:"🎿", integral:"🟦", limit:"🎯",
    cplane:"🌀", ellipse:"🥚", hyperbola:"🪃", circleq:"🎯", region:"🗺️" };
  let figN = 0;
  function figSvg(spec, o){
    o = o || {};
    const [key, part] = String(spec).split(":"), ON = "#e8590c", BASE = "#475569", FB = "#e7ecff", FO = "#ffd8a8", uid = "fg" + (++figN);
    const f = x => (+x).toFixed(1);
    const on = p => part === p || (Array.isArray(p) && p.includes(part));
    const ln = (x1, y1, x2, y2, hl, dash, w) => '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (w || (hl ? 3.2 : 1.6)) + '"' + (dash ? ' stroke-dasharray="4 3"' : "") + ' stroke-linecap="round"/>';
    const pg = (pts, hl, fill, dash) => '<polygon points="' + pts.map(p => f(p[0]) + "," + f(p[1])).join(" ") + '" fill="' + (fill || "none") + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (hl ? 3 : 1.6) + '" stroke-linejoin="round"' + (dash ? ' stroke-dasharray="4 3"' : "") + '/>';
    const dt = (x, y, hl, r) => '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + (r || (hl ? 4 : 3)) + '" fill="' + (hl ? ON : BASE) + '"/>';
    const tx = (x, y, s, hl, size, anchor) => '<text x="' + f(x) + '" y="' + f(y) + '" font-size="' + (size || 11) + '" font-weight="800" text-anchor="' + (anchor || "middle") + '" fill="' + (hl ? ON : "#334155") + '" paint-order="stroke" stroke="#fff" stroke-width="3">' + esc(s) + '</text>';
    const P = (cx, cy, r, a) => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
    // 角の しるし(中心 cx,cy・半径 r・数学の 向きで a0 → a1 度。左まわり)
    const ang = (cx, cy, r, a0, a1, hl, fillIt) => { const p0 = P(cx, cy, r, a0), p1 = P(cx, cy, r, a1), lg = (a1 - a0) > 180 ? 1 : 0;
      return '<path d="' + (fillIt ? "M" + f(cx) + " " + f(cy) + " L" : "M") + f(p0[0]) + " " + f(p0[1]) + " A" + r + " " + r + " 0 " + lg + " 0 " + f(p1[0]) + " " + f(p1[1]) + (fillIt ? " Z" : "") + '" fill="' + (fillIt ? (hl ? FO : FB) : "none") + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (hl ? 2.4 : 1.3) + '"/>'; };
    const rt = (x, y, dx1, dy1, dx2, dy2, hl) => { const s = 9; return '<polyline points="' + f(x + dx1 * s) + "," + f(y + dy1 * s) + " " + f(x + dx1 * s + dx2 * s) + "," + f(y + dy1 * s + dy2 * s) + " " + f(x + dx2 * s) + "," + f(y + dy2 * s) + '" fill="none" stroke="' + (hl ? ON : BASE) + '" stroke-width="1.4"/>'; };
    const tick = (x1, y1, x2, y2, n, hl) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * 5, ny = (x2 - x1) / L * 5, ux = (x2 - x1) / L * 3, uy = (y2 - y1) / L * 3;
      let s = ""; for(let i = 0; i < n; i++){ const o2 = (i - (n - 1) / 2); s += ln(mx + ux * o2 - nx, my + uy * o2 - ny, mx + ux * o2 + nx, my + uy * o2 + ny, hl, false, 1.6); } return s; };
    // グラフ: 原点 ox,oy・1目もり k px
    const axes = (ox, oy, lab) => { lab = lab || ["x", "y"]; return '<defs><marker id="' + uid + 'a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>' +
      '<line x1="6" y1="' + oy + '" x2="194" y2="' + oy + '" stroke="#94a3b8" stroke-width="1.3" marker-end="url(#' + uid + 'a)"/><line x1="' + ox + '" y1="134" x2="' + ox + '" y2="6" stroke="#94a3b8" stroke-width="1.3" marker-end="url(#' + uid + 'a)"/>' +
      tx(190, oy + 13, lab[0], false, 10) + tx(ox + 9, 13, lab[1], false, 10) + tx(ox - 7, oy + 12, "O", false, 10); };
    const plot = (fn, ox, oy, k, x0, x1, hl, dash, n) => { n = n || 90; let d = "", pen = false;
      for(let i = 0; i <= n; i++){ const x = x0 + (x1 - x0) * i / n, y = fn(x), X = ox + k * x, Y = oy - k * y;
        if(!isFinite(Y) || Y < -2 || Y > 142){ pen = false; continue; } d += (pen ? " L" : " M") + f(X) + " " + f(Y); pen = true; }
      return '<path d="' + d + '" fill="none" stroke="' + (hl ? ON : "#3b5bdb") + '" stroke-width="' + (hl ? 3 : 2.2) + '"' + (dash ? ' stroke-dasharray="4 3"' : "") + '/>'; };
    let s = "", at = {};
    switch(key){
      case "numline": {
        s += ln(8, 80, 192, 80);
        for(let k = -4; k <= 4; k++) s += ln(100 + 20 * k, 75, 100 + 20 * k, 85) + tx(100 + 20 * k, 99, k < 0 ? "−" + (-k) : String(k), k === 0 && on("zero"), 10);
        if(on("pos")) s += ln(100, 80, 190, 80, true) + tx(150, 66, "正の数", true);
        if(on("neg")) s += ln(10, 80, 100, 80, true) + tx(50, 66, "負の数", true);
        if(on("abs")) s += '<path d="M40 74 Q70 44 100 74" fill="none" stroke="' + ON + '" stroke-width="2.4"/>' + dt(40, 80, true) + tx(70, 48, "|−3| = 3", true) + tx(70, 124, "0 からの きょり", true, 10);
        if(on("point")) s += dt(150, 80, true) + tx(150, 66, "A(2.5)", true);
        at = { zero:[100, 80], pos:[160, 80], neg:[40, 80], abs:[70, 58], point:[150, 80] }; break;
      }
      case "frac": {
        const cx = 100, cy = 68, r = 52;
        for(let i = 0; i < 4; i++){ const a0 = 90 - 90 * i, a1 = a0 - 90, p0 = P(cx, cy, r, a0), p1 = P(cx, cy, r, a1);
          s += '<path d="M' + cx + " " + cy + " L" + f(p0[0]) + " " + f(p0[1]) + " A" + r + " " + r + " 0 0 1 " + f(p1[0]) + " " + f(p1[1]) + ' Z" fill="' + (i < 3 ? (on("part") ? FO : FB) : "#fff") + '" stroke="' + BASE + '" stroke-width="1.6"/>'; }
        s += tx(172, 60, "3", on("part"), 16) + ln(162, 66, 182, 66, on("part"), false, 2) + tx(172, 84, "4", false, 16);
        at = { part:[80, 70] }; break;
      }
      case "venn": {
        const A = [78, 72], B = [122, 72], r = 42;
        s += '<defs><clipPath id="' + uid + 'A"><circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '"/></clipPath><mask id="' + uid + 'm"><rect x="0" y="0" width="200" height="140" fill="#fff"/><circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '" fill="#000"/></mask></defs>';
        if(on("comp")) s += '<rect x="8" y="10" width="184" height="124" fill="' + FO + '" mask="url(#' + uid + 'm)"/>';
        if(on("a") || on("or")) s += '<circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '" fill="' + FO + '"/>';
        if(on("b") || on("or")) s += '<circle cx="' + B[0] + '" cy="' + B[1] + '" r="' + r + '" fill="' + FO + '"/>';
        if(on("and")) s += '<circle cx="' + B[0] + '" cy="' + B[1] + '" r="' + r + '" fill="' + FO + '" clip-path="url(#' + uid + 'A)"/>';
        s += '<rect x="8" y="10" width="184" height="124" fill="none" stroke="' + BASE + '" stroke-width="1.6"/>' + tx(20, 26, "U", on("comp"), 12, "start") +
          '<circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '" fill="none" stroke="' + (on("a") ? ON : BASE) + '" stroke-width="2"/><circle cx="' + B[0] + '" cy="' + B[1] + '" r="' + r + '" fill="none" stroke="' + (on("b") ? ON : BASE) + '" stroke-width="2"/>' +
          tx(58, 76, "A", on("a")) + tx(142, 76, "B", on("b"));
        at = { a:[58, 64], b:[142, 64], and:[100, 72], or:[100, 34], comp:[176, 124] }; break;
      }
      case "tri": {
        const A = [100, 20], B = [30, 120], C = [170, 120];
        if(on("ext")) s += ln(170, 120, 196, 120, false, true) + ang(170, 120, 16, 0, 125, true, true);
        if(on("angle")) s += ang(30, 120, 18, 0, 55, true, true);
        s += pg([A, B, C], false, FB) + (on("side") ? ln(30, 120, 170, 120, true) : "");
        if(on("height")) s += ln(100, 20, 100, 120, true, true) + rt(100, 120, 0, -1, 1, 0, true) + tx(112, 80, "h", true, 12);
        s += dt(A[0], A[1], on("vertex")) + tx(100, 13, "A", on("vertex")) + tx(22, 132, "B") + tx(178, 132, "C");
        at = { vertex:[100, 20], side:[130, 120], angle:[48, 110], height:[100, 70], ext:[186, 106] }; break;
      }
      case "isos": {
        const A = [100, 18], B = [50, 120], C = [150, 120];
        if(on("base")) s += ang(50, 120, 18, 0, 63.9, true, true) + ang(150, 120, 18, 116.1, 180, true, true);
        s += pg([A, B, C], false, FB) + (on("equal") ? ln(100, 18, 50, 120, true) + ln(100, 18, 150, 120, true) : "") + tick(100, 18, 50, 120, 1, on("equal")) + tick(100, 18, 150, 120, 1, on("equal")) +
          tx(100, 12, "A") + tx(42, 132, "B") + tx(158, 132, "C");
        at = { equal:[75, 69], base:[62, 112] }; break;
      }
      case "equi": {
        const A = [100, 22], B = [45, 117.3], C = [155, 117.3];
        s += pg([A, B, C], on("all"), FB) + tick(100, 22, 45, 117.3, 1, on("all")) + tick(100, 22, 155, 117.3, 1, on("all")) + tick(45, 117.3, 155, 117.3, 1, on("all")) +
          ang(45, 117.3, 16, 0, 60, on("all"), true) + ang(155, 117.3, 16, 120, 180, on("all"), true) + ang(100, 22, 16, 240, 300, on("all"), true) +
          tx(72, 112, "60°", on("all"), 9) + tx(128, 112, "60°", on("all"), 9);
        at = { all:[100, 70] }; break;
      }
      case "right": {
        const C = [40, 120], B = [170, 120], A = [40, 32];
        if(on("theta")) s += ang(170, 120, 26, 145.9, 180, true, true);
        s += pg([A, B, C], false, FB) + rt(40, 120, 1, 0, 0, -1, on("right"));
        if(on("hyp")) s += ln(40, 32, 170, 120, true);
        if(on("leg")) s += ln(40, 120, 170, 120, true) + ln(40, 120, 40, 32, true);
        s += tx(105, 134, "a", on("leg")) + tx(28, 80, "b", on("leg")) + tx(112, 68, "c", on("hyp"), 13) + tx(144, 114, "θ", on("theta"), 12) +
          tx(34, 26, "A") + tx(178, 130, "B") + tx(32, 132, "C");
        at = { hyp:[105, 76], right:[46, 114], leg:[105, 120], theta:[150, 114] }; break;
      }
      case "para": {
        const A = [30, 112], B = [135, 112], Cc = [170, 32], Dd = [65, 32];
        s += pg([A, B, Cc, Dd], false, FB);
        if(on("opp")) s += ln(30, 112, 135, 112, true) + ln(65, 32, 170, 32, true) + tick(30, 112, 135, 112, 1, true) + tick(65, 32, 170, 32, 1, true);
        if(on("diag")) s += ln(30, 112, 170, 32, true, true) + ln(135, 112, 65, 32, true, true) + dt(100, 72, true);
        s += tx(24, 126, "A") + tx(141, 126, "B") + tx(176, 28, "C") + tx(59, 28, "D");
        at = { opp:[118, 32], diag:[100, 72] }; break;
      }
      case "trap": {
        s += pg([[20, 115], [180, 115], [140, 35], [60, 35]], false, FB);
        if(on("top")) s += ln(60, 35, 140, 35, true) + tx(100, 27, "上底", true);
        else s += tx(100, 27, "上底");
        s += tx(100, 131, "下底");
        if(on("height")) s += ln(60, 35, 60, 115, true, true) + rt(60, 115, 0, -1, 1, 0, true) + tx(70, 80, "高さ", true, 10, "start");
        at = { top:[100, 35], height:[60, 76] }; break;
      }
      case "rhomb": {
        s += pg([[100, 14], [168, 70], [100, 126], [32, 70]], false, FB) + tick(100, 14, 168, 70, 1) + tick(168, 70, 100, 126, 1) + tick(100, 126, 32, 70, 1) + tick(32, 70, 100, 14, 1);
        s += ln(100, 14, 100, 126, on("diag"), true) + ln(32, 70, 168, 70, on("diag"), true) + rt(100, 70, 1, 0, 0, -1, on("diag"));
        at = { diag:[100, 70] }; break;
      }
      case "circle": {
        const cx = 100, cy = 72, r = 52, T = a => P(cx, cy, r, a);
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/>';
        if(on("radius")) s += ln(cx, cy, cx + r, cy, true) + tx(126, 66, "r", true, 12);
        if(on("diameter")) s += ln(cx - r, cy, cx + r, cy, true) + tx(100, 66, "直径", true, 10);
        if(on("chord") || on("arc")){ const p = T(150), q = T(30); s += ln(p[0], p[1], q[0], q[1], on("chord"));
          if(on("arc")) s += '<path d="M' + f(p[0]) + " " + f(p[1]) + " A" + r + " " + r + " 0 0 1 " + f(q[0]) + " " + f(q[1]) + '" fill="none" stroke="' + ON + '" stroke-width="4"/>';
          at.chord = [100, 46]; at.arc = [100, 20]; }
        if(on("tangent")){ const t = T(270); s += ln(cx, cy, t[0], t[1], false, true) + ln(30, t[1], 170, t[1], true) + rt(t[0], t[1], 1, 0, 0, -1, true) + dt(t[0], t[1], true); at.tangent = [150, t[1]]; }
        if(on("central") || on("inscribed")){ const a = T(210), b = T(330), p = T(90);
          s += ln(a[0], a[1], b[0], b[1], false, true);
          if(on("central")) s += ln(cx, cy, a[0], a[1], true) + ln(cx, cy, b[0], b[1], true) + ang(cx, cy, 14, 210, 330, true, true) + tx(100, 104, "2x", true, 10);
          else s += ln(cx, cy, a[0], a[1], false, true) + ln(cx, cy, b[0], b[1], false, true) + tx(100, 104, "2x", false, 10);
          s += ln(p[0], p[1], a[0], a[1], on("inscribed")) + ln(p[0], p[1], b[0], b[1], on("inscribed")) + ang(p[0], p[1], 16, 240, 300, on("inscribed"), true) + tx(100, 48, "x", on("inscribed"), 10);
          s += dt(a[0], a[1]) + dt(b[0], b[1]) + dt(p[0], p[1]); at.central = [100, 88]; at.inscribed = [100, 30]; }
        s += dt(cx, cy, on("center")) + tx(cx - 8, cy + 14, "O", on("center"));
        at.center = [cx, cy]; at.radius = [126, cy]; at.diameter = [70, cy]; break;
      }
      case "sector": {
        const cx = 50, cy = 115, r = 95, q = P(cx, cy, r, 60);
        s += '<path d="M' + cx + " " + cy + " L" + (cx + r) + " " + cy + " A" + r + " " + r + " 0 0 0 " + f(q[0]) + " " + f(q[1]) + ' Z" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/>';
        if(on("arc")) s += '<path d="M' + (cx + r) + " " + cy + " A" + r + " " + r + " 0 0 0 " + f(q[0]) + " " + f(q[1]) + '" fill="none" stroke="' + ON + '" stroke-width="4"/>' + tx(150, 50, "弧", true, 12);
        s += ang(cx, cy, 20, 0, 60, on("angle"), true) + tx(80, 108, "中心角", on("angle"), 9, "start") + tx(95, 130, "r");
        at = { arc:[132, 62], angle:[62, 104] }; break;
      }
      case "prism": {
        const F = [[30, 55], [125, 55], [125, 122], [30, 122]], d = [40, -32];
        const Bk = F.map(p => [p[0] + d[0], p[1] + d[1]]);
        s += ln(Bk[3][0], Bk[3][1], Bk[0][0], Bk[0][1], false, true) + ln(Bk[3][0], Bk[3][1], Bk[2][0], Bk[2][1], false, true) + ln(F[3][0], F[3][1], Bk[3][0], Bk[3][1], false, true);
        s += pg(F, on("face"), on("face") ? FO : FB) + pg([F[0], F[1], Bk[1], Bk[0]], false, "#f1f5ff") + pg([F[1], F[2], Bk[2], Bk[1]], false, "#dbe4ff");
        if(on("edge")) s += ln(F[0][0], F[0][1], F[1][0], F[1][1], true);
        s += dt(Bk[1][0], Bk[1][1], on("vertex"));
        at = { face:[78, 90], edge:[78, 55], vertex:Bk[1] }; break;
      }
      case "cyl": {
        const rx = 50, ry = 12;
        if(on("side")) s += '<rect x="50" y="28" width="100" height="86" fill="' + FO + '"/>';
        s += ln(50, 28, 50, 114) + ln(150, 28, 150, 114) +
          '<ellipse cx="100" cy="28" rx="' + rx + '" ry="' + ry + '" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<path d="M50 114 A' + rx + " " + ry + ' 0 0 0 150 114" fill="none" stroke="' + (on("base") ? ON : BASE) + '" stroke-width="' + (on("base") ? 3 : 1.6) + '"/>' +
          '<path d="M50 114 A' + rx + " " + ry + ' 0 0 1 150 114" fill="none" stroke="' + (on("base") ? ON : BASE) + '" stroke-width="1.4" stroke-dasharray="4 3"/>';
        if(on("base")) s += '<ellipse cx="100" cy="114" rx="' + rx + '" ry="' + ry + '" fill="' + FO + '" opacity=".6"/>' + tx(100, 138, "底面", true, 10);
        at = { base:[100, 114], side:[100, 72] }; break;
      }
      case "cone": {
        const A = [100, 16];
        s += '<path d="M40 116 A60 14 0 0 1 160 116" fill="none" stroke="' + BASE + '" stroke-width="1.4" stroke-dasharray="4 3"/>' +
          '<path d="M40 116 A60 14 0 0 0 160 116" fill="none" stroke="' + BASE + '" stroke-width="1.6"/>' + ln(100, 16, 40, 116) + ln(100, 16, 160, 116, on("slant"));
        if(on("slant")) s += tx(146, 64, "母線", true, 10);
        if(on("height")) s += ln(100, 16, 100, 116, true, true) + rt(100, 116, 0, -1, 1, 0, true) + tx(110, 78, "h", true, 12);
        s += dt(A[0], A[1], on("apex"));
        at = { apex:A, slant:[132, 66], height:[100, 70] }; break;
      }
      case "sphere": {
        s += '<circle cx="100" cy="70" r="54" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/><ellipse cx="100" cy="70" rx="54" ry="13" fill="none" stroke="' + BASE + '" stroke-width="1.2" stroke-dasharray="4 3"/>' +
          dt(100, 70) + ln(100, 70, 154, 70, on("r")) + tx(127, 64, "r", on("r"), 12);
        at = { r:[127, 70] }; break;
      }
      case "parallel": {
        // 平行な 2本(y=45, y=100)と ななめの 線。ななめの 向きは 56.3°
        const up = 56.3, X1 = 116.7, X2 = 80;
        s += ln(8, 45, 192, 45) + ln(8, 100, 192, 100) + ln(60, 130, 140, 10) + tx(186, 40, "ℓ", false, 11) + tx(186, 95, "m", false, 11);
        const mk = (x, y, a0, a1, hl) => ang(x, y, 15, a0, a1, hl, true);
        if(on("corresp")) s += mk(X1, 45, 0, up, true) + mk(X2, 100, 0, up, true);
        if(on("alt")) s += mk(X1, 45, 180, 180 + up, true) + mk(X2, 100, 0, up, true);
        if(on("vert")) s += mk(X2, 100, 0, up, true) + mk(X2, 100, 180, 180 + up, true);
        s += '<text x="30" y="58" font-size="9" fill="#64748b">ℓ // m</text>';
        at = { corresp:[X1 + 10, 36], alt:[X1 - 10, 54], vert:[X2 - 9, 110] }; break;
      }
      case "similar": {
        s += pg([[18, 120], [68, 120], [33, 85]], on("ratio"), FB) + pg([[88, 120], [188, 120], [118, 50]], on("ratio"), FB) +
          tx(43, 134, "1", on("ratio")) + tx(138, 134, "2", on("ratio")) + tx(100, 30, "相似比 1 : 2", on("ratio"), 11);
        at = { ratio:[138, 90] }; break;
      }
      case "sym": {
        s += pg([[55, 22], [92, 52], [80, 118], [30, 118], [18, 52]], false, FB) + ln(55, 12, 55, 130, on("line"), true) + tx(55, 10, "対称の軸", on("line"), 9);
        s += pg([[118, 104], [168, 104], [188, 40], [138, 40]], false, FB) + dt(153, 72, on("point")) + tx(153, 130, "対称の中心", on("point"), 9);
        at = { line:[55, 70], point:[153, 72] }; break;
      }
      case "area2": {
        // (a+b)² = a² + 2ab + b²(a = 70px, b = 40px)
        const X = 45, Y = 15, a = 70, b = 40;
        s += '<rect x="' + X + '" y="' + Y + '" width="' + a + '" height="' + a + '" fill="' + (on("a2") ? FO : FB) + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<rect x="' + (X + a) + '" y="' + Y + '" width="' + b + '" height="' + a + '" fill="' + (on("ab") ? FO : "#f1f5ff") + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<rect x="' + X + '" y="' + (Y + a) + '" width="' + a + '" height="' + b + '" fill="' + (on("ab") ? FO : "#f1f5ff") + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<rect x="' + (X + a) + '" y="' + (Y + a) + '" width="' + b + '" height="' + b + '" fill="' + (on("b2") ? FO : "#dbe4ff") + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          tx(X + a / 2, Y + a / 2 + 4, "a²", on("a2"), 13) + tx(X + a + b / 2, Y + a / 2 + 4, "ab", on("ab"), 11) + tx(X + a / 2, Y + a + b / 2 + 4, "ab", on("ab"), 11) + tx(X + a + b / 2, Y + a + b / 2 + 4, "b²", on("b2"), 12) +
          tx(X - 8, Y + a / 2 + 4, "a", false, 11) + tx(X - 8, Y + a + b / 2 + 4, "b", false, 11) + tx(X + a / 2, 138, "a", false, 11) + tx(X + a + b / 2, 138, "b", false, 11);
        at = { a2:[X + a / 2, Y + a / 2], ab:[X + a + b / 2, Y + a / 2], b2:[X + a + b / 2, Y + a + b / 2] }; break;
      }
      case "coord": {
        if(on("quad")) s += '<rect x="100" y="8" width="90" height="62" fill="' + FO + '"/>';
        s += axes(100, 70) + tx(150, 40, "第1象限", on("quad"), 10) + tx(50, 40, "第2象限", false, 10) + tx(50, 108, "第3象限", false, 10) + tx(150, 108, "第4象限", false, 10);
        if(on("x")) s += ln(8, 70, 190, 70, true);
        if(on("y")) s += ln(100, 132, 100, 10, true);
        s += dt(140, 50) + tx(146, 60, "(2, 1)", false, 9, "start");
        at = { origin:[100, 70], x:[170, 70], y:[100, 24], quad:[150, 40] };
        if(on("origin")) s += dt(100, 70, true); break;
      }
      case "prop": {
        s += axes(100, 72) + plot(x => 0.8 * x, 100, 72, 20, -5, 5, on("line")) + tx(160, 34, "y = ax", on("line"), 11);
        at = { line:[140, 40] }; break;
      }
      case "inv": {
        s += axes(100, 72);
        if(on("asym")) s += ln(8, 72, 190, 72, true) + ln(100, 134, 100, 8, true);
        s += plot(x => 2 / x, 100, 72, 20, 0.2, 4.6, on("curve")) + plot(x => 2 / x, 100, 72, 20, -4.6, -0.2, on("curve")) + tx(158, 50, "y = a/x", on("curve"), 11);
        at = { curve:[130, 50], asym:[180, 72] }; break;
      }
      case "linear": {
        const ox = 70, oy = 100, k = 20, fn = x => 0.5 * x + 1;
        s += axes(ox, oy) + plot(fn, ox, oy, k, -3, 6, false);
        if(on("slope")) s += ln(ox + k * 2, oy - k * 2, ox + k * 4, oy - k * 2, true, true) + ln(ox + k * 4, oy - k * 2, ox + k * 4, oy - k * 3, true, true) + tx(ox + k * 3, oy - k * 2 + 13, "+2", true, 10) + tx(ox + k * 4 + 12, oy - k * 2.5 + 4, "+1", true, 10);
        s += dt(ox, oy - k, on("intercept")) + tx(ox - 16, oy - k + 4, "b", on("intercept"), 11) + tx(160, 38, "y = ax + b", false, 10);
        at = { slope:[ox + k * 3, oy - k * 2.5], intercept:[ox, oy - k] }; break;
      }
      case "parabola": {
        const down = on("down"), ox = 80, oy = down ? 100 : 90, k = 16;
        s += axes(ox, oy);
        if(down){ s += plot(x => -0.5 * x * x + 3, ox, oy, k, -4, 4, true) + tx(150, 30, "a < 0", true, 11); at = { down:[ox, oy - 3 * k] }; }
        else {
          const vx = 1.5, vy = -2, fn = x => 0.5 * (x - vx) * (x - vx) + vy;
          if(on("axis")) s += ln(ox + k * vx, 8, ox + k * vx, 134, true, true) + tx(ox + k * vx + 6, 20, "軸", true, 10, "start");
          s += plot(fn, ox, oy, k, -3, 6, on("up")) + dt(ox + k * vx, oy - k * vy, on("vertex")) + tx(ox + k * vx, oy - k * vy + 15, "頂点", on("vertex"), 10) + (on("up") ? tx(160, 30, "a > 0", true, 11) : "");
          at = { up:[ox + k * 5, oy - k * fn(5)], vertex:[ox + k * vx, oy - k * vy], axis:[ox + k * vx, 44] };
        }
        break;
      }
      case "expo": {
        const ox = 70, oy = 100, k = 20;
        s += axes(ox, oy) + plot(x => x, ox, oy, k, -3, 6, false, true) + plot(x => Math.pow(2, x), ox, oy, k, -3.4, 2.4, on("exp")) + plot(x => Math.log2(x), ox, oy, k, 0.06, 6, on("log")) +
          tx(ox + k * 2.1 - 16, 20, "y = 2ˣ", on("exp"), 10) + tx(186, oy - k * 2.6, "y = log₂x", on("log"), 9, "end") + dt(ox, oy - k, false) + dt(ox + k, oy, false);
        at = { exp:[ox + k * 1.6, oy - k * 3], log:[ox + k * 4, oy - k * 2] }; break;
      }
      case "unit": {
        const cx = 90, cy = 76, R = 52, th = 50, p = P(cx, cy, R, th), c = Math.cos(th * Math.PI / 180), sn = Math.sin(th * Math.PI / 180);
        s += '<line x1="20" y1="' + cy + '" x2="168" y2="' + cy + '" stroke="#94a3b8"/><line x1="' + cx + '" y1="136" x2="' + cx + '" y2="10" stroke="#94a3b8"/>' +
          '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + BASE + '" stroke-width="1.6"/>' + ln(cx, cy, p[0], p[1]);
        if(on("tan")){ const tn = Math.tan(th * Math.PI / 180); s += ln(cx + R, cy + 60, cx + R, 4, false, true) + ln(cx, cy, cx + R, cy - R * tn, false, true) + ln(cx + R, cy, cx + R, cy - R * tn, true) + tx(cx + R + 6, cy - R * tn / 2, "tan θ", true, 10, "start"); }
        if(on("rad")) s += '<path d="M' + (cx + R) + " " + cy + " A" + R + " " + R + " 0 0 0 " + f(p[0]) + " " + f(p[1]) + '" fill="none" stroke="' + ON + '" stroke-width="4"/>' + tx(cx + R + 4, cy - 30, "弧の長さ = θ", true, 9, "start");
        s += ln(cx + R * c, cy, p[0], p[1], on("sin"), !on("sin")) + ln(cx, cy, cx + R * c, cy, on("cos"), !on("cos")) + ang(cx, cy, 14, 0, th, on("angle"), true) +
          dt(p[0], p[1]) + tx(p[0] + 4, p[1] - 6, "P(cos θ, sin θ)", false, 9, "start") + tx(cx + 20, cy - 4, "θ", on("angle"), 10) +
          (on("sin") ? tx(cx + R * c + 6, cy - R * sn / 2, "sin θ", true, 10, "start") : "") + (on("cos") ? tx(cx + R * c / 2, cy + 14, "cos θ", true, 10) : "") + tx(cx + R + 2, cy + 12, "1", false, 9);
        at = { angle:[cx + 18, cy - 8], sin:[cx + R * c, cy - R * sn / 2], cos:[cx + R * c / 2, cy], tan:[cx + R, cy - R * Math.tan(th * Math.PI / 180) / 2], rad:[cx + R * Math.cos(Math.PI * 25 / 180), cy - R * Math.sin(Math.PI * 25 / 180)] }; break;
      }
      case "wave": {
        const ox = 16, oy = 72, kx = 168 / (2 * Math.PI), A = 44;
        s += '<line x1="8" y1="' + oy + '" x2="194" y2="' + oy + '" stroke="#94a3b8"/><line x1="' + ox + '" y1="134" x2="' + ox + '" y2="8" stroke="#94a3b8"/>';
        let d = ""; for(let i = 0; i <= 120; i++){ const x = 2 * Math.PI * i / 120; d += (i ? " L" : "M") + f(ox + kx * x) + " " + f(oy - A * Math.sin(x)); }
        s += '<path d="' + d + '" fill="none" stroke="#3b5bdb" stroke-width="2.4"/>' + tx(ox + kx * Math.PI, oy + 12, "π", false, 10) + tx(ox + kx * 2 * Math.PI - 4, oy + 12, "2π", false, 10) + tx(60, 18, "y = sin x", false, 10);
        if(on("period")) s += ln(ox, 128, ox + kx * 2 * Math.PI, 128, true) + ln(ox, 122, ox, 134, true) + ln(ox + kx * 2 * Math.PI, 122, ox + kx * 2 * Math.PI, 134, true) + tx(100, 124, "周期 2π", true, 10);
        if(on("amp")) s += ln(ox + kx * Math.PI / 2, oy, ox + kx * Math.PI / 2, oy - A, true) + tx(ox + kx * Math.PI / 2 + 6, oy - A / 2, "振幅 1", true, 10, "start");
        at = { period:[100, 128], amp:[ox + kx * Math.PI / 2, oy - A / 2] }; break;
      }
      case "hist": {
        const H = [2, 5, 9, 7, 4, 1], w = 26, x0 = 22, base = 122, k = 11;
        s += ln(12, base, 192, base) + ln(x0, base, x0, 10);
        H.forEach((h, i) => { const hl = (on("mode") && i === 2) || (on("bar") && i === 3);
          s += '<rect x="' + (x0 + i * w) + '" y="' + (base - h * k) + '" width="' + w + '" height="' + (h * k) + '" fill="' + (hl ? FO : FB) + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (hl ? 2.4 : 1.3) + '"/>'; });
        if(on("mode")) s += tx(x0 + 2.5 * w, base - 9 * k - 5, "最頻値", true, 10);
        if(on("bar")) s += tx(x0 + 3.5 * w, base - 7 * k - 5, "度数 7", true, 10);
        if(on("class")) s += ln(x0 + 1 * w, 132, x0 + 2 * w, 132, true) + ln(x0 + w, 127, x0 + w, 137, true) + ln(x0 + 2 * w, 127, x0 + 2 * w, 137, true) + tx(x0 + 1.5 * w, 130, "階級", true, 9) + '<rect x="' + (x0 + w) + '" y="' + (base - 5 * k) + '" width="' + w + '" height="' + (5 * k) + '" fill="' + FO + '" stroke="' + ON + '" stroke-width="2.4"/>';
        at = { bar:[x0 + 3.5 * w, base - 7 * k], mode:[x0 + 2.5 * w, base - 9 * k], class:[x0 + 1.5 * w, base - 5 * k] }; break;
      }
      case "box": {
        const X = { min:25, q1:65, med:95, q3:128, max:175 }, y0 = 48, y1 = 92, ym = 70;
        s += ln(15, 118, 185, 118, false, false, 1);
        for(let v = 0; v <= 10; v++) s += ln(25 + v * 15, 115, 25 + v * 15, 121, false, false, 1);
        s += ln(X.min, ym, X.q1, ym) + ln(X.q3, ym, X.max, ym) + '<rect x="' + X.q1 + '" y="' + y0 + '" width="' + (X.q3 - X.q1) + '" height="' + (y1 - y0) + '" fill="' + (on("iqr") ? FO : FB) + '" stroke="' + BASE + '" stroke-width="1.6"/>';
        for(const k2 of ["min", "q1", "med", "q3", "max"]){ const hl = on(k2), top = k2 === "min" || k2 === "max" ? ym - 10 : y0, bot = k2 === "min" || k2 === "max" ? ym + 10 : y1; s += ln(X[k2], top, X[k2], bot, hl); }
        const lb = { min:"最小値", q1:"第1四分位数", med:"中央値", q3:"第3四分位数", max:"最大値" };
        for(const k2 in lb) if(on(k2)) s += tx(X[k2], y0 - 10, lb[k2], true, 10);
        if(on("iqr")) s += ln(X.q1, 104, X.q3, 104, true) + tx((X.q1 + X.q3) / 2, 136, "四分位範囲", true, 10);
        at = { min:[X.min, ym], q1:[X.q1, y0], med:[X.med, y0], q3:[X.q3, y0], max:[X.max, ym], iqr:[(X.q1 + X.q3) / 2, ym] }; break;
      }
      case "scatter": {
        const PTS = { pos:[[1,1.4],[1.6,1.2],[2,2.4],[2.6,2.1],[3.1,3.3],[3.5,2.9],[4,4.2],[4.4,3.7],[5,4.9],[5.4,5.5],[6,5.4],[6.5,6.6],[3.8,3.2],[2.3,1.6]],
          neg:[[1,6.2],[1.5,5.4],[2,5.8],[2.6,4.6],[3,4.9],[3.4,3.8],[4,4.1],[4.5,3],[5,3.3],[5.5,2.1],[6,2.4],[6.5,1.3],[3.8,3.1],[2.2,5]],
          none:[[1,3.1],[1.4,5.8],[2,1.6],[2.5,4.4],[3,6.1],[3.3,2.4],[3.9,4.8],[4.4,1.3],[4.8,5.6],[5.3,3.2],[5.8,1.9],[6.3,4.9],[2.8,3.5],[4.2,3.9]] };
        const kind = PTS[part] ? part : "pos";
        s += axes(22, 124) + PTS[kind].map(p => dt(22 + p[0] * 24, 124 - p[1] * 17, true, 3.4)).join("") +
          tx(120, 20, { pos:"正の相関", neg:"負の相関", none:"相関なし" }[kind], true, 11);
        at = { pos:[120, 30], neg:[120, 30], none:[120, 30] }; break;
      }
      case "normal": {
        const ox = 100, oy = 118, kx = 26, ky = 95, fn = x => Math.exp(-x * x / 2);
        if(on("sd")){ let d = "M" + f(ox - kx) + " " + oy; for(let i = 0; i <= 40; i++){ const x = -1 + 2 * i / 40; d += " L" + f(ox + kx * x) + " " + f(oy - ky * fn(x)); } s += '<path d="' + d + " L" + f(ox + kx) + " " + oy + ' Z" fill="' + FO + '"/>' + tx(ox, oy - 18, "約68%", true, 10); }
        s += ln(8, oy, 192, oy, false, false, 1.2);
        let d = ""; for(let i = 0; i <= 100; i++){ const x = -3.5 + 7 * i / 100; d += (i ? " L" : "M") + f(ox + kx * x) + " " + f(oy - ky * fn(x)); }
        s += '<path d="' + d + '" fill="none" stroke="#3b5bdb" stroke-width="2.4"/>' + ln(ox, oy, ox, oy - ky, on("mean"), true) + tx(ox, oy + 13, "m", on("mean"), 11) +
          tx(ox - kx, oy + 13, "m−σ", on("sd"), 9) + tx(ox + kx, oy + 13, "m+σ", on("sd"), 9);
        at = { mean:[ox, oy - ky], sd:[ox + kx, oy - ky * fn(1)] }; break;
      }
      case "tree": {
        const root = [20, 70], L1 = [[80, 28], [80, 70], [80, 112]], nm = ["A", "B", "C"];
        L1.forEach((p, i) => { s += ln(root[0], root[1], p[0], p[1], on("branch") && i === 0) + tx(p[0] + 8, p[1] + 4, nm[i], on("branch") && i === 0, 11, "start");
          [-12, 12].forEach((dy, j) => { const q = [150, p[1] + dy]; s += ln(p[0] + 18, p[1], q[0], q[1], on("branch") && i === 0 && j === 0) + tx(q[0] + 6, q[1] + 4, nm.filter((_, k) => k !== i)[j], on("branch") && i === 0 && j === 0, 10, "start"); }); });
        s += dt(root[0], root[1]) + tx(100, 138, "3 × 2 = 6 とおり", false, 10);
        at = { branch:[120, 22] }; break;
      }
      case "vector": {
        const O = [30, 112], A = [118, 88], B = [62, 36], S2 = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
        s += '<defs><marker id="' + uid + 'v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>';
        const ar = (p, q, hl) => '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="' + (hl ? ON : "#3b5bdb") + '" stroke-width="' + (hl ? 3 : 2.2) + '" marker-end="url(#' + uid + 'v)"/>';
        if(on("sum")) s += ln(A[0], A[1], S2[0], S2[1], false, true) + ln(B[0], B[1], S2[0], S2[1], false, true) + ar(O, S2, true) + tx(S2[0] + 4, S2[1] - 2, "a + b", true, 10, "start");
        if(on("dot")) s += ang(O[0], O[1], 22, 15.3, 67.2, true, true) + tx(O[0] + 30, O[1] - 12, "θ", true, 11) + tx(100, 134, "a・b = |a||b| cos θ", true, 10);
        s += ar(O, A, on("a")) + ar(O, B, false) + tx(A[0] + 6, A[1] + 4, "a", on("a"), 12, "start") + tx(B[0] - 10, B[1], "b", false, 12) + dt(O[0], O[1]) + tx(O[0] - 6, O[1] + 14, "O", false, 10);
        at = { a:[(O[0] + A[0]) / 2, (O[1] + A[1]) / 2], sum:[(O[0] + S2[0]) / 2, (O[1] + S2[1]) / 2], dot:[O[0] + 22, O[1] - 12] }; break;
      }
      case "seq": {
        const v = [2, 5, 8, 11, 14], k = 7.5, base = 122;
        s += ln(12, base, 192, base);
        v.forEach((x, i) => { s += '<rect x="' + (22 + i * 34) + '" y="' + (base - x * k) + '" width="26" height="' + (x * k) + '" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.3"/>' + tx(35 + i * 34, base - x * k - 4, String(x), false, 10);
          if(i && on("diff")) s += '<rect x="' + (22 + i * 34) + '" y="' + (base - x * k) + '" width="26" height="' + (3 * k) + '" fill="' + FO + '" stroke="' + ON + '" stroke-width="2"/>'; });
        if(on("diff")) s += tx(100, 16, "公差 +3 ずつ", true, 11);
        at = { diff:[35 + 3 * 34, base - 11 * k + 10] }; break;
      }
      case "tangent": {
        const ox = 26, oy = 124, k = 18, fn = x => x * x / 10, a = 4;
        s += axes(ox, oy) + plot(fn, ox, oy, k, -0.5, 8.4, false) + plot(x => 0.8 * (x - a) + fn(a), ox, oy, k, 1.2, 8, on("line")) + dt(ox + k * a, oy - k * fn(a), on("point")) +
          tx(ox + k * a - 4, oy - k * fn(a) + 16, "(a, f(a))", on("point"), 9) + (on("line") ? tx(160, 30, "傾き f′(a)", true, 10) : "");
        at = { point:[ox + k * a, oy - k * fn(a)], line:[ox + k * 6.5, oy - k * (0.8 * 2.5 + fn(a))] }; break;
      }
      case "integral": {
        const ox = 26, oy = 124, k = 18, fn = x => x * x / 10 + 0.6, a = 2, b = 6;
        let d = "M" + f(ox + k * a) + " " + oy; for(let i = 0; i <= 40; i++){ const x = a + (b - a) * i / 40; d += " L" + f(ox + k * x) + " " + f(oy - k * fn(x)); }
        s += axes(ox, oy) + '<path d="' + d + " L" + f(ox + k * b) + " " + oy + ' Z" fill="' + (on("area") ? FO : FB) + '" stroke="' + (on("area") ? ON : BASE) + '" stroke-width="1.4"/>' + plot(fn, ox, oy, k, -0.3, 8.4, false) +
          tx(ox + k * a, oy + 12, "a", false, 10) + tx(ox + k * b, oy + 12, "b", false, 10) + tx(ox + k * 4, oy - 14, "S", on("area"), 12);
        at = { area:[ox + k * 4, oy - 26] }; break;
      }
      case "limit": {
        const ox = 20, oy = 124, k = 20, fn = x => 4 - 3 / (x + 1);
        s += axes(ox, oy) + ln(ox, oy - k * 4, 192, oy - k * 4, on("approach"), true) + plot(fn, ox, oy, k, 0, 8.5, false) + tx(ox - 6, oy - k * 4 + 4, "α", on("approach"), 11, "end") +
          tx(150, oy - k * 4 + 20, "x → ∞ で α に 近づく", on("approach"), 9);
        at = { approach:[170, oy - k * 4] }; break;
      }
      case "cplane": {
        const ox = 60, oy = 76, k = 22, z = [3, 2];
        s += axes(ox, oy, ["実軸", "虚軸"]);
        if(on("re")) s += ln(8, oy, 190, oy, true);
        if(on("im")) s += ln(ox, 132, ox, 10, true);
        s += ln(ox + k * z[0], oy, ox + k * z[0], oy - k * z[1], false, true) + ln(ox, oy - k * z[1], ox + k * z[0], oy - k * z[1], false, true) +
          ln(ox, oy, ox + k * z[0], oy - k * z[1], on("abs")) + dt(ox + k * z[0], oy - k * z[1], on("z")) + tx(ox + k * z[0] + 6, oy - k * z[1] - 4, "z = 3 + 2i", on("z"), 10, "start") +
          (on("abs") ? tx(ox + k * 1.2, oy - k * 1.4, "|z|", true, 11) : "");
        if(on("conj")) s += ln(ox + k * z[0], oy, ox + k * z[0], oy + k * z[1], false, true) + dt(ox + k * z[0], oy + k * z[1], true) + tx(ox + k * z[0] + 6, oy + k * z[1] + 4, "z̄ = 3 − 2i", true, 10, "start");
        at = { re:[170, oy], im:[ox, 22], z:[ox + k * z[0], oy - k * z[1]], abs:[ox + k * 1.5, oy - k], conj:[ox + k * z[0], oy + k * z[1]] }; break;
      }
      case "ellipse": {
        const cx = 100, cy = 72, a = 76, b = 46, c = Math.sqrt(a * a - b * b);
        s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + a + '" ry="' + b + '" fill="' + FB + '" stroke="#3b5bdb" stroke-width="2.2"/>' + ln(cx - a, cy, cx + a, cy, on("major"), !on("major")) + ln(cx, cy - b, cx, cy + b, false, true) +
          dt(cx - c, cy, on("focus")) + dt(cx + c, cy, on("focus")) + tx(cx - c, cy + 14, "F′", on("focus"), 10) + tx(cx + c, cy + 14, "F", on("focus"), 10) + (on("major") ? tx(cx + 24, cy - 6, "長軸", true, 10) : "");
        at = { focus:[cx + c, cy], major:[cx - 40, cy] }; break;
      }
      case "hyperbola": {
        const cx = 100, cy = 70, a = 30, b = 26, c = Math.sqrt(a * a + b * b);
        s += '<line x1="8" y1="' + cy + '" x2="192" y2="' + cy + '" stroke="#94a3b8"/><line x1="' + cx + '" y1="134" x2="' + cx + '" y2="6" stroke="#94a3b8"/>';
        s += ln(cx - 70, cy + 70 * b / a, cx + 70, cy - 70 * b / a, on("asym"), true) + ln(cx - 70, cy - 70 * b / a, cx + 70, cy + 70 * b / a, on("asym"), true);
        for(const sg of [1, -1]){ let d = ""; for(let i = 0; i <= 60; i++){ const t = -1.75 + 3.5 * i / 60, X = cx + sg * a * Math.cosh(t), Y = cy - b * Math.sinh(t); d += (i ? " L" : "M") + f(X) + " " + f(Y); } s += '<path d="' + d + '" fill="none" stroke="#3b5bdb" stroke-width="2.4"/>'; }
        s += dt(cx - c, cy, on("focus")) + dt(cx + c, cy, on("focus")) + tx(cx + c, cy + 14, "F", on("focus"), 10) + tx(cx - c, cy + 14, "F′", on("focus"), 10) + (on("asym") ? tx(172, 18, "漸近線", true, 10) : "");
        at = { focus:[cx + c, cy], asym:[cx + 55, cy - 55 * b / a] }; break;
      }
      case "circleq": {
        const ox = 40, oy = 118, k = 20, C = [3.5, 2.6], r = 2;
        s += axes(ox, oy) + '<circle cx="' + f(ox + k * C[0]) + '" cy="' + f(oy - k * C[1]) + '" r="' + (k * r) + '" fill="' + FB + '" stroke="#3b5bdb" stroke-width="2.4"/>' +
          ln(ox + k * C[0], oy - k * C[1], ox + k * (C[0] + r), oy - k * C[1], false, true) + tx(ox + k * (C[0] + 1), oy - k * C[1] - 5, "r", false, 11) +
          dt(ox + k * C[0], oy - k * C[1], on("center")) + tx(ox + k * C[0], oy - k * C[1] + 16, "(a, b)", on("center"), 10) + tx(150, 132, "(x−a)² + (y−b)² = r²", false, 9);
        at = { center:[ox + k * C[0], oy - k * C[1]] }; break;
      }
      case "region": {
        const ox = 80, oy = 90, k = 18, fn = x => 0.5 * x + 1;
        let d = "M" + f(ox + k * -4.4) + " " + f(oy - k * fn(-4.4)); d += " L" + f(ox + k * 6) + " " + f(oy - k * fn(6)) + " L" + f(ox + k * 6) + " 4 L" + f(ox + k * -4.4) + " 4 Z";
        s += '<path d="' + d + '" fill="' + (on("area") ? FO : FB) + '" opacity=".8"/>' + axes(ox, oy) + plot(fn, ox, oy, k, -4.4, 6, false, true) + tx(60, 26, "y > ax + b", on("area"), 11) + tx(150, 128, "境界線は ふくまない", false, 8);
        at = { area:[60, 36] }; break;
      }
      default: return "";
    }
    const a = at[part];
    const pin = a && !o.noPin ? '<text x="' + f(a[0] + 1) + '" y="' + f(a[1] + 1) + '" text-anchor="middle" font-size="' + (o.small ? 20 : 18) + '" class="ai-pinbob">📍</text>' : "";
    return '<svg class="ai-svg sg-fig' + (o.small ? " sm" : "") + '" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc((FIG_NAME[key] || "") + " の 図") + '">' + s + pin + '</svg>';
  }

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
  /* ── 🧮 計算問題(けいくん 2026-09-27「受験に必要な計算は入れた方がいいと思う」)──
     ・算数 → 高校受験 → 大学受験で よく 出る 形の 計算を、数字を 毎回 かえて 出す(**問題も 答えも プログラムが 作る**。過去問は 写さない)
     ・4択。まちがいの 3つは「よく ある まちがい」から 作る(符号の まちがい・約分 わすれ・2乗 わすれ・公式の とりちがえ など)
     ・答えた あとに とき方(式と 途中の 計算)を 出す
     ・⚠️ 「かずとも」の 単純計算(たし算〜わり算の タイム)とは かぶらない。ここは 考えかた・公式を 使う 計算
     ・1つの 問題 = { g:なかま, lv:"算数"/"高校受験"/"大学受験", q:問題文, a:答えの 字, w:[まちがいの 字…], ex:[とき方…] }
     ここは tools/sugaku/calc.js。tools/sugaku/make_sugaku_js.py が sugaku/sugaku.js に 入れる */
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const rnz = (a, b) => { let x = 0; while(!x) x = ri(a, b); return x; };
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; };
  const M = n => n < 0 ? "−" + (-n) : String(n);  // 負の数は 数学の −
  const PM = n => n < 0 ? "(" + M(n) + ")" : String(n);  // 負の数だけ かっこ
  const fr = (n, d) => { if(d < 0){ n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; return d === 1 ? M(n) : (n < 0 ? "−" : "") + Math.abs(n) + "/" + d; };
  const frac = (n, d) => fr(n, d);
  // √n を かんたんに: [外, 中](√72 → [6, 2])
  const sqs = n => { let o = 1, i = n; for(let k = 2; k * k <= i; k++) while(i % (k * k) === 0){ i /= k * k; o *= k; } return [o, i]; };
  const rt = n => { const [o, i] = sqs(n); return i === 1 ? String(o) : (o === 1 ? "" : o) + "√" + i; };
  const SUP = { 2:"²", 3:"³" };
  // 多項式(係数を 大きい 次数から)を x の 式に: [1,5,6] → x²+5x+6
  function poly(cs, v){
    v = v || "x"; const n = cs.length - 1; let s = "";
    cs.forEach((c, i) => { const p = n - i; if(!c) return;
      const sg = c < 0 ? "−" : (s ? "+" : ""), a = Math.abs(c), body = p === 0 ? String(a) : (a === 1 ? "" : a) + v + (p > 1 ? SUP[p] || "^" + p : "");
      s += sg + body; });
    return s || "0";
  }
  const lin = (a, b) => poly([a, b]);  // ax+b
  const fac = r => "(x" + (r < 0 ? "+" + (-r) : "−" + r) + ")";  // 解 r → (x−r)
  const nf = (x, d) => Number(x.toFixed(d)).toLocaleString("ja-JP", { maximumFractionDigits:d });
  const CALC_G = [["kazu", "🔢 数と計算"], ["shiki", "✏️ 式と方程式"], ["kansu", "📈 関数"], ["zukei", "🔺 図形"], ["data", "🎲 確率・データ"], ["koko", "♾️ 高校数学"]];
  const CALC_LV = [["算数", "🔰 算数"], ["高校受験", "🏫 高校受験"], ["大学受験", "🎓 大学受験"]];
  const CALC = [
    /* ─── 算数 ─── */
    () => { let b = ri(2, 9), d = ri(2, 9); while(d === b) d = ri(2, 9); const a = ri(1, b - 1), c = ri(1, d - 1);
      return { g:"kazu", lv:"算数", q:a + "/" + b + " + " + c + "/" + d + " = ？", a:frac(a * d + c * b, b * d),
        w:[frac(a + c, b + d), frac(a * c, b * d), frac(a * d + c * b, b + d), frac(a + c, b * d)],
        ex:["分母を そろえる(通分): 分母 " + b + " と " + d + " の 公倍数に する", a + "/" + b + " + " + c + "/" + d + " = " + (a * d) + "/" + (b * d) + " + " + (c * b) + "/" + (b * d) + " = " + (a * d + c * b) + "/" + (b * d), "約分して " + frac(a * d + c * b, b * d), "⚠️ 分子どうし・分母どうしを たすのは まちがい"] }; },
    () => { const b = ri(2, 9), a = ri(1, b - 1), d = ri(2, 9), c = ri(1, d - 1); if(a * d === b * c) return null;
      return { g:"kazu", lv:"算数", q:a + "/" + b + " ÷ " + c + "/" + d + " = ？", a:frac(a * d, b * c),
        w:[frac(a * c, b * d), frac(b * c, a * d), frac(a * d + 1, b * c), frac(a + d, b + c)],
        ex:["わる 分数は ひっくり返して かける", a + "/" + b + " × " + d + "/" + c + " = " + (a * d) + "/" + (b * c), "約分して " + frac(a * d, b * c)] }; },
    () => { const A = pk([800, 1200, 1500, 2000, 2400, 3000, 4500]), x = pk([10, 15, 20, 25, 30, 40]), ans = A * (100 - x) / 100;
      return { g:"kazu", lv:"算数", q:"定価 " + A.toLocaleString() + "円の 品物が " + x + "% 引き。売り値は 何円？", a:ans.toLocaleString() + "円",
        w:[(A * x / 100).toLocaleString() + "円", (A - x).toLocaleString() + "円", (A * (100 + x) / 100).toLocaleString() + "円"],
        ex:[x + "% 引き = 定価の (100 − " + x + ")% = " + (100 - x) + "%", A.toLocaleString() + " × " + (100 - x) / 100 + " = " + ans.toLocaleString() + "円", "⚠️ " + A.toLocaleString() + " × " + x / 100 + " は「引かれる 金額」"] }; },
    () => { const v = pk([4, 5, 6, 12, 15, 20, 30, 40, 45, 60]), m = pk([15, 20, 30, 40, 45, 90, 120]), d = v * m / 60;
      if(d !== Math.round(d * 10) / 10) return null;
      return { g:"kazu", lv:"算数", q:"時速 " + v + "km で " + m + "分 進むと、道のりは 何km？", a:nf(d, 1) + "km",
        w:[nf(v * m, 0) + "km", nf(v / m * 60, 1) + "km", nf(d * 2, 1) + "km", nf(m / v, 1) + "km"],
        ex:["道のり = 速さ × 時間", m + "分 = " + m + "/60 時間 = " + nf(m / 60, 2) + "時間", v + " × " + nf(m / 60, 2) + " = " + nf(d, 1) + "km", "⚠️ 分を 時間に なおして かける"] }; },
    () => { const g = pk([2, 3, 4, 6]), a = g * pk([2, 3, 5, 7]), b0 = g * pk([3, 4, 5, 7, 9]), b = a === b0 ? b0 + g : b0, l = a * b / gcd(a, b);
      return { g:"kazu", lv:"算数", q:a + " と " + b + " の 最小公倍数は？", a:String(l), w:[String(a * b), String(gcd(a, b)), String(l * 2), String(l / 2 | 0)],
        ex:["最大公約数は " + gcd(a, b), "最小公倍数 = " + a + " × " + b + " ÷ 最大公約数 = " + (a * b) + " ÷ " + gcd(a, b) + " = " + l, "⚠️ かけ算しただけ(" + a * b + ")は 公倍数だが いちばん 小さくない"] }; },
    () => { const g = pk([4, 6, 8, 9, 12, 14, 15]), p = pk([2, 3, 5]), q = pk([3, 4, 5, 7].filter(x => gcd(x, p) === 1)), a = g * p, b = g * q;
      return { g:"kazu", lv:"算数", q:a + " と " + b + " の 最大公約数は？", a:String(g), w:[String(a * b / g), String(g * 2), String(Math.min(a, b)), String(g / 2 | 0 || g + 1)],
        ex:[a + " = " + g + " × " + p + "、" + b + " = " + g + " × " + q, "共通する いちばん 大きい 約数は " + g] }; },
    () => { const r = pk([3, 4, 5, 6, 8, 10]), S = 3.14 * r * r;
      return { g:"zukei", lv:"算数", q:"半径 " + r + "cm の 円の 面積は？(円周率は 3.14)", a:nf(S, 2) + "cm²",
        w:[nf(2 * 3.14 * r, 2) + "cm²", nf(3.14 * 4 * r * r, 2) + "cm²", nf(3.14 * r, 2) + "cm²"],
        ex:["円の 面積 = 半径 × 半径 × 円周率", r + " × " + r + " × 3.14 = " + nf(S, 2) + "cm²", "⚠️ 直径 × 3.14 は 円周の 長さ"] }; },
    () => { const a = ri(2, 9), b = ri(2, 9), k = ri(2, 7); if(a === b) return null;
      return { g:"kazu", lv:"算数", q:a + " : " + b + " = " + a * k + " : □　□に 入る 数は？", a:String(b * k), w:[String(b + a * k - a), String(a * k * b), String(b * k + b), String(a * k - a + b + 1)],
        ex:["左は 右の " + k + "倍(" + a + " × " + k + " = " + a * k + ")", "□ = " + b + " × " + k + " = " + b * k] }; },
    () => { const xs = Array.from({ length:5 }, () => ri(3, 12)), s = xs.reduce((a, b) => a + b, 0);
      if(s % 5) xs[0] += 5 - s % 5; const t = xs.reduce((a, b) => a + b, 0);
      return { g:"data", lv:"算数", q:"5回の テストの 点数 " + xs.join("・") + " 点。平均は 何点？", a:t / 5 + "点", w:[t / 5 + 1 + "点", t + "点", (t / 5 - 1) + "点", (t / 4).toFixed(1).replace(/\.0$/, "") + "点"],
        ex:["平均 = 合計 ÷ 個数", xs.join(" + ") + " = " + t, t + " ÷ 5 = " + t / 5 + "点"] }; },
    () => { const a = ri(3, 9), b = ri(3, 9), c = ri(2, 8);
      return { g:"zukei", lv:"算数", q:"たて " + a + "cm・横 " + b + "cm・高さ " + c + "cm の 直方体の 体積は？", a:a * b * c + "cm³", w:[a * b + b * c + c * a + "cm³", 2 * (a * b + b * c + c * a) + "cm³", a + b + c + "cm³", a * b * c * 2 + "cm³"],
        ex:["直方体の 体積 = たて × 横 × 高さ", a + " × " + b + " × " + c + " = " + a * b * c + "cm³"] }; },
    /* ─── 高校受験 ─── */
    () => { const a = rnz(-9, 9), b = rnz(2, 6), d = rnz(-5, 5), c = d * rnz(-4, 4), v = a * b - c / d;
      return { g:"kazu", lv:"高校受験", q:PM(a) + " × " + b + " − " + PM(c) + " ÷ " + PM(d) + " = ？", a:M(v), w:[M(a * b + c / d), M(-v), M((a * b - c) / d), M(a * b - c * d)].filter(x => x !== M(v)),
        ex:["かけ算・わり算を 先に", PM(a) + " × " + b + " = " + M(a * b), PM(c) + " ÷ " + PM(d) + " = " + M(c / d), M(a * b) + " − " + PM(c / d) + " = " + M(v)] }; },
    () => { const x = rnz(-6, 8), a = rnz(2, 7), c = rnz(-4, 5), b = ri(-9, 9); if(a === c) return null; const d = a * x + b - c * x;
      return { g:"shiki", lv:"高校受験", q:"方程式 " + lin(a, b) + " = " + lin(c, d) + " を 解くと？", a:"x = " + M(x), w:["x = " + M(-x), "x = " + frac(d + b, a - c), "x = " + frac(d - b, a + c), "x = " + M(x + 1)],
        ex:["x の 項を 左、数を 右へ 移項(符号が かわる)", (a - c) + "x = " + M(d) + " − " + PM(b) + " = " + M(d - b), "x = " + M(d - b) + " ÷ " + PM(a - c) + " = " + M(x)] }; },
    () => { const x = rnz(-5, 6), y = rnz(-5, 6), a = rnz(1, 4), b = rnz(-4, 4), c = rnz(1, 4), d = rnz(-4, 4); if(a * d - b * c === 0) return null;
      const e = a * x + b * y, f2 = c * x + d * y, sol = "x = " + M(x) + "、y = " + M(y);
      return { g:"shiki", lv:"高校受験", q:"連立方程式 " + poly([a, 0]) + (b < 0 ? "−" : "+") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "y = " + M(e) + "、" + poly([c, 0]) + (d < 0 ? "−" : "+") + (Math.abs(d) === 1 ? "" : Math.abs(d)) + "y = " + M(f2) + " の 解は？",
        a:sol, w:["x = " + M(y) + "、y = " + M(x), "x = " + M(-x) + "、y = " + M(y), "x = " + M(x) + "、y = " + M(-y), "x = " + M(x + 1) + "、y = " + M(y - 1)],
        ex:["どちらかの 文字の 係数を そろえて 消す(加減法)か、代入する(代入法)", "x = " + M(x) + " を 1つめの 式に 入れると y = " + M(y) + " に なる", "2つの 式の 両方に 入れて 成り立つか 確かめよう"] }; },
    () => { const a = rnz(-7, 7), b = rnz(-7, 7);
      return { g:"shiki", lv:"高校受験", q:"(x" + (a < 0 ? "−" + (-a) : "+" + a) + ")(x" + (b < 0 ? "−" + (-b) : "+" + b) + ") を 展開すると？", a:poly([1, a + b, a * b]),
        w:[poly([1, a * b, a + b]), poly([1, a + b, -a * b]), poly([1, -(a + b), a * b]), poly([1, 0, a * b])],
        ex:["(x + a)(x + b) = x² + (a + b)x + ab", "a + b = " + M(a + b) + "、ab = " + M(a * b), "→ " + poly([1, a + b, a * b])] }; },
    () => { const r = rnz(-7, 7), s2 = rnz(-7, 7); if(r === s2 || r === -s2) return null;
      const ans = fac(r) + fac(s2);
      return { g:"shiki", lv:"高校受験", q:poly([1, -(r + s2), r * s2]) + " を 因数分解すると？", a:ans, w:[fac(-r) + fac(-s2), fac(r) + fac(-s2), fac(-r) + fac(s2), fac(r * s2 > 0 ? r + s2 : r - s2) + fac(1)].filter(x => x !== ans),
        ex:["たして " + M(-(r + s2)) + "、かけて " + M(r * s2) + " に なる 2つの 数を さがす", "→ " + M(-r) + " と " + M(-s2), ans] }; },
    () => { const r = rnz(-8, 8), s2 = rnz(-8, 8); if(r === s2) return null;
      const lo = Math.min(r, s2), hi = Math.max(r, s2);
      return { g:"shiki", lv:"高校受験", q:"二次方程式 " + poly([1, -(r + s2), r * s2]) + " = 0 の 解は？", a:"x = " + M(lo) + "、" + M(hi),
        w:["x = " + M(-hi) + "、" + M(-lo), "x = " + M(lo) + "、" + M(-hi), "x = " + M(-lo) + "、" + M(hi), "x = " + M(r + s2) + "、" + M(r * s2)].filter(x => x !== "x = " + M(lo) + "、" + M(hi)),
        ex:["左の 式を 因数分解する: " + fac(r) + fac(s2) + " = 0", "かけて 0 だから どちらかが 0", "x = " + M(lo) + "、" + M(hi)] }; },
    () => { const p = rnz(-4, 4), q = pk([-6, -5, -3, -2, -1, 1, 2, 3, 5, 6, 7]); const D = p * p - q; if(D <= 0 || Math.sqrt(D) % 1 === 0) return null;
      // x² + 2px + q = 0 → x = −p ± √(p² − q)
      const hd = M(-p), ans = "x = " + (p ? hd : "") + "±" + rt(D);
      return { g:"shiki", lv:"高校受験", q:"二次方程式 " + poly([1, 2 * p, q]) + " = 0 の 解は？(解の公式)", a:ans,
        w:["x = " + (p ? M(p) : "") + "±" + rt(D), "x = " + (p ? hd : "") + "±" + rt(p * p + q), "x = " + (p ? hd : "") + "±" + rt(4 * D), "x = " + (p ? M(-2 * p) : "") + "±" + rt(D)].filter(x => x !== ans),
        ex:["解の公式 x = (−b ± √(b² − 4ac)) / 2a に a = 1、b = " + M(2 * p) + "、c = " + M(q), "b² − 4ac = " + (4 * p * p) + " − (" + M(4 * q) + ") = " + 4 * D, "x = (" + M(-2 * p) + " ± " + rt(4 * D) + ") / 2 = " + ans.slice(4)] }; },
    () => { const [o, i] = [pk([2, 3, 4, 5, 6]), pk([2, 3, 5, 6, 7])], n = o * o * i;
      return { g:"kazu", lv:"高校受験", q:"√" + n + " を a√b の 形に すると？", a:rt(n), w:[(o * 2) + "√" + i, o + "√" + (i * 2), (o * o) + "√" + i, i + "√" + o].filter(x => x !== rt(n)),
        ex:[n + " = " + (o * o) + " × " + i + " = " + o + "² × " + i, "√(" + o + "² × " + i + ") = " + rt(n), "⚠️ 2乗の 形の ものだけ √ の 外へ 出せる"] }; },
    () => { const x1 = rnz(-4, 2), x2 = x1 + rnz(1, 4), a = rnz(-3, 3), b = ri(-6, 6), y1 = a * x1 + b, y2 = a * x2 + b;
      return { g:"kansu", lv:"高校受験", q:"2点 (" + M(x1) + ", " + M(y1) + ")、(" + M(x2) + ", " + M(y2) + ") を 通る 直線の 式は？", a:"y = " + lin(a, b),
        w:["y = " + lin(-a, b), "y = " + lin(a, -b), "y = " + lin(b || 1, a), "y = " + lin(a, b + a), "y = " + lin(2 * a, b), "y = " + lin(a, b - 1)].filter(x => x !== "y = " + lin(a, b)),
        ex:["傾き = y の 増加量 ÷ x の 増加量 = (" + M(y2) + " − " + M(y1) + ") ÷ (" + M(x2) + " − " + M(x1) + ") = " + M(a), "y = " + M(a) + "x + b に (" + M(x1) + ", " + M(y1) + ") を 入れて b = " + M(b), "y = " + lin(a, b)] }; },
    () => { const a = rnz(-3, 3), p = ri(-3, 3), q = p + ri(1, 4), rate = a * (p + q);
      return { g:"kansu", lv:"高校受験", q:"関数 y = " + poly([a, 0, 0]) + " で、x が " + M(p) + " から " + M(q) + " まで 増加するときの 変化の割合は？", a:M(rate),
        w:[M(a * (q - p)), M(-rate), M(a * p * q), M(rate + a)].filter(x => x !== M(rate)),
        ex:["変化の割合 = y の 増加量 ÷ x の 増加量", "y は " + M(a * p * p) + " → " + M(a * q * q) + "(増加量 " + M(a * (q * q - p * p)) + ")", M(a * (q * q - p * p)) + " ÷ " + (q - p) + " = " + M(rate), "(y = ax² なら a × (p + q) で 出せる)"] }; },
    () => { const T = pk([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25], [9, 12, 15]]), k = pk([1, 1, 2]);
      const [a, b, c] = T.map(x => x * k);
      if(Math.random() < .5) return { g:"zukei", lv:"高校受験", q:"直角を はさむ 2辺が " + a + "cm・" + b + "cm の 直角三角形。斜辺の 長さは？", a:c + "cm", w:[a + b + "cm", rt(a * a + b * b + 2 * a * b) + "cm", c + k + "cm", rt(Math.abs(b * b - a * a)) + "cm"].filter(x => x !== c + "cm"),
        ex:["三平方の定理 a² + b² = c²", a + "² + " + b + "² = " + (a * a) + " + " + (b * b) + " = " + c * c, "c = √" + c * c + " = " + c + "cm"] };
      const u = ri(2, 7), v = ri(u + 1, 9), h2 = u * u + v * v;
      return { g:"zukei", lv:"高校受験", q:"直角を はさむ 2辺が " + u + "cm・" + v + "cm の 直角三角形。斜辺の 長さは？", a:rt(h2) + "cm", w:[(u + v) + "cm", rt(v * v - u * u) + "cm", rt(2 * h2) + "cm", rt(u * v) + "cm"].filter(x => x !== rt(h2) + "cm"),
        ex:["三平方の定理 a² + b² = c²", u + "² + " + v + "² = " + h2, "c = √" + h2 + " = " + rt(h2) + "cm"] }; },
    () => { const m = ri(1, 4), n = ri(m + 1, 6); if(gcd(m, n) !== 1) return null; const vol = Math.random() < .4;
      const A = vol ? m ** 3 + " : " + n ** 3 : m * m + " : " + n * n;
      return { g:"zukei", lv:"高校受験", q:"相似比が " + m + " : " + n + " の 2つの " + (vol ? "立体の 体積の比" : "図形の 面積の比") + "は？", a:A,
        w:[m + " : " + n, vol ? m * m + " : " + n * n : m ** 3 + " : " + n ** 3, (m + 1) + " : " + (n + 1), 2 * m + " : " + n].filter(x => x !== A),
        ex:["相似比が m : n なら", "面積比は m² : n²、体積比は m³ : n³", "→ " + A] }; },
    () => { const c = pk([60, 70, 80, 84, 96, 100, 110, 120, 130, 140, 150, 160]);
      return { g:"zukei", lv:"高校受験", q:"円の 中心角が " + c + "° の とき、同じ 弧に 対する 円周角は？", a:c / 2 + "°", w:[c + "°", c * 2 + "°", 180 - c + "°", 180 - c / 2 + "°"].filter(x => x !== c / 2 + "°"),
        ex:["円周角 = 同じ 弧に 対する 中心角の 半分", c + " ÷ 2 = " + c / 2 + "°"] }; },
    () => { const k = ri(3, 11), n = 6 - Math.abs(7 - k);
      return { g:"data", lv:"高校受験", q:"2つの さいころを 投げて、目の 和が " + k + " に なる 確率は？", a:frac(n, 36), w:[frac(n, 12), frac(n, 11), frac(1, k), frac(n + 1, 36), frac(n, 18)].filter(x => x !== frac(n, 36)),
        ex:["目の 出かたは 6 × 6 = 36 とおり", "和が " + k + " に なるのは " + n + " とおり", n + "/36 = " + frac(n, 36)] }; },
    () => { const n = ri(5, 12);
      return { g:"zukei", lv:"高校受験", q:n + "角形の 内角の 和は？", a:180 * (n - 2) + "°", w:[180 * n + "°", 180 * (n - 1) + "°", 360 + "°", 180 * (n - 3) + "°"].filter(x => x !== 180 * (n - 2) + "°"),
        ex:["n角形の 内角の 和 = 180° × (n − 2)", "180 × (" + n + " − 2) = " + 180 * (n - 2) + "°", "(1つの 頂点から 対角線を ひくと 三角形が n − 2 個 できる)"] }; },
    () => { const r = pk([3, 4, 6, 8, 9, 10, 12]), a = pk([30, 45, 60, 90, 120, 135, 150]), S = r * r * a / 360;
      const pis = x => { const n0 = Math.round(x * 360), g = gcd(n0, 360), n = n0 / g, d = 360 / g; return (n === 1 ? "" : n) + "π" + (d === 1 ? "" : "/" + d); };
      return { g:"zukei", lv:"高校受験", q:"半径 " + r + "cm、中心角 " + a + "° の おうぎ形の 面積は？", a:pis(S) + "cm²", w:[pis(2 * r * a / 360) + "cm²", pis(r * r) + "cm²", pis(S * 2) + "cm²", pis(r * a / 360) + "cm²"].filter(x => x !== pis(S) + "cm²"),
        ex:["おうぎ形の 面積 = πr² × 中心角/360", "π × " + r + "² × " + a + "/360 = " + pis(S) + "cm²", "⚠️ 2πr × 中心角/360 は 弧の 長さ"] }; },
    () => { const xs = Array.from({ length:8 }, () => ri(1, 20)).sort((a, b) => a - b), md = (a, b) => (a + b) / 2;
      const q1 = md(xs[1], xs[2]), q3 = md(xs[5], xs[6]), R = q3 - q1, S2 = x => String(x);
      if(R <= 0) return null;
      return { g:"data", lv:"高校受験", q:"データ " + xs.join("・") + "(8個)の 四分位範囲は？", a:S2(R), w:[S2(xs[7] - xs[0]), S2(md(xs[3], xs[4])), S2(xs[6] - xs[1]), S2(R + 1)].filter(x => x !== S2(R)),
        ex:["小さい 順に 前半 4個・後半 4個に 分ける", "第1四分位数 = 前半の 中央値 = (" + xs[1] + " + " + xs[2] + ")/2 = " + q1, "第3四分位数 = 後半の 中央値 = (" + xs[5] + " + " + xs[6] + ")/2 = " + q3, "四分位範囲 = " + q3 + " − " + q1 + " = " + R] }; },
    /* ─── 大学受験 ─── */
    () => { const p = rnz(-5, 5), q = ri(-6, 6), b = -2 * p, c = p * p + q;
      return { g:"kansu", lv:"大学受験", q:"放物線 y = " + poly([1, b, c]) + " の 頂点の 座標は？", a:"(" + M(p) + ", " + M(q) + ")",
        w:["(" + M(-p) + ", " + M(q) + ")", "(" + M(p) + ", " + M(c) + ")", "(" + M(b) + ", " + M(q) + ")", "(" + M(-p) + ", " + M(-q) + ")"].filter(x => x !== "(" + M(p) + ", " + M(q) + ")"),
        ex:["平方完成: y = (x " + (p < 0 ? "+ " + (-p) : "− " + p) + ")² " + (q < 0 ? "− " + (-q) : "+ " + q), "頂点は (" + M(p) + ", " + M(q) + ")", "⚠️ かっこの 中の 符号と 頂点の x 座標は 逆"] }; },
    () => { const b = ri(-8, 8), c = ri(-8, 10), D = b * b - 4 * c, ans = D > 0 ? "2個" : D === 0 ? "1個(重解)" : "0個";
      return { g:"shiki", lv:"大学受験", q:"二次方程式 " + poly([1, b, c]) + " = 0 の 異なる 実数解の 個数は？", a:ans, w:["2個", "1個(重解)", "0個", "3個"].filter(x => x !== ans),
        ex:["判別式 D = b² − 4ac", "D = " + M(b) + "² − 4 × 1 × " + (c < 0 ? "(" + M(c) + ")" : c) + " = " + M(D), "D > 0 → 2個 / D = 0 → 1個 / D < 0 → 0個(実数解なし)", "→ " + ans] }; },
    () => { const T = [[30, "1/2", "√3/2", "1/√3"], [45, "1/√2", "1/√2", "1"], [60, "√3/2", "1/2", "√3"], [120, "√3/2", "−1/2", "−√3"], [135, "1/√2", "−1/√2", "−1"], [150, "1/2", "−√3/2", "−1/√3"]];
      const t = pk(T), k = pk([1, 2, 3]), fn = ["sin", "cos", "tan"][k - 1], ans = t[k], vals = ["1/2", "√3/2", "1/√2", "−1/2", "−√3/2", "√3", "1/√3", "1", "−1"];
      return { g:"zukei", lv:"大学受験", q:fn + " " + t[0] + "° の 値は？", a:ans, w:vals.filter(x => x !== ans).sort(() => Math.random() - .5),
        ex:[t[0] + "° の 三角比: sin = " + t[1] + "、cos = " + t[2] + "、tan = " + t[3], "90° より 大きい 角は cos・tan が 負に なる(単位円の 左がわ)"] }; },
    () => { const b = ri(2, 8), c = ri(2, 8), A = pk([60, 120]), a2 = b * b + c * c - (A === 60 ? 1 : -1) * b * c;
      return { g:"zukei", lv:"大学受験", q:"△ABC で b = " + b + "、c = " + c + "、A = " + A + "°。a の 長さは？", a:rt(a2), w:[rt(b * b + c * c), rt(b * b + c * c - (A === 60 ? -1 : 1) * b * c), rt(b * b + c * c - 2 * b * c), String(b + c)].filter(x => x !== rt(a2)),
        ex:["余弦定理 a² = b² + c² − 2bc cos A", "cos " + A + "° = " + (A === 60 ? "1/2" : "−1/2"), "a² = " + b * b + " + " + c * c + (A === 60 ? " − " : " + ") + b * c + " = " + a2, "a = " + rt(a2)] }; },
    () => { const n = ri(5, 9), r = ri(2, Math.min(4, n - 1)); let P = 1; for(let i = 0; i < r; i++) P *= n - i; let F = 1; for(let i = 2; i <= r; i++) F *= i; const C = P / F;
      if(Math.random() < .5) return { g:"data", lv:"大学受験", q:n + "人から " + r + "人 えらんで 1列に 並べる 並べかたは 何とおり？", a:P + "とおり", w:[C + "とおり", n ** r + "とおり", n * r + "とおり", P / n * (n - 1) + "とおり"].filter(x => x !== P + "とおり"),
        ex:["順番が ある → 順列 " + n + "P" + r, Array.from({ length:r }, (_, i) => n - i).join(" × ") + " = " + P + "とおり"] };
      return { g:"data", lv:"大学受験", q:n + "人から " + r + "人の 係を えらぶ えらびかたは 何とおり？(順番なし)", a:C + "とおり", w:[P + "とおり", n ** r + "とおり", n * r + "とおり", C * 2 + "とおり"].filter(x => x !== C + "とおり"),
        ex:["順番が ない → 組合せ " + n + "C" + r + " = " + n + "P" + r + " ÷ " + r + "!", P + " ÷ " + F + " = " + C + "とおり"] }; },
    () => { const a = pk([2, 3, 5]), k = ri(2, a === 2 ? 7 : 4), n = a ** k;
      return { g:"kansu", lv:"大学受験", q:"log" + ["", "", "₂", "₃", "", "₅"][a] + " " + n + " の 値は？", a:String(k), w:[String(n / a), String(k + 1), String(n), String(k * a)].filter(x => x !== String(k)),
        ex:[a + " を 何乗すれば " + n + " に なるか", a + "^" + k + " = " + n + " だから " + k] }; },
    () => { const [b, e] = pk([[8, "2/3"], [27, "2/3"], [16, "3/4"], [32, "3/5"], [4, "3/2"], [9, "3/2"], [25, "3/2"], [64, "2/3"]]), [p, q] = e.split("/").map(Number);
      const root = Math.round(b ** (1 / q)), v = root ** p;
      return { g:"kansu", lv:"大学受験", q:b + " の " + e + " 乗の 値は？", a:String(v), w:[nf(b * p / q, 2), String(root), String(Math.round(b ** (q / p) * 100) / 100), String(v * root)].filter(x => x !== String(v)),
        ex:[b + "^(" + e + ") = (" + q + "乗根 " + b + ")^" + p, q + "乗根 " + b + " = " + root, root + "^" + p + " = " + v] }; },
    () => { const a = ri(-5, 9), d = rnz(-4, 6), n = ri(8, 20), an = a + (n - 1) * d, S = n * (a + an) / 2;
      if(Math.random() < .5) return { g:"koko", lv:"大学受験", q:"初項 " + M(a) + "、公差 " + M(d) + " の 等差数列の 第" + n + "項は？", a:M(an), w:[M(a + n * d), M(a * d * n), M(an - d * 2), M(S)].filter(x => x !== M(an)),
        ex:["一般項 aₙ = a + (n − 1)d", M(a) + " + (" + n + " − 1) × " + (d < 0 ? "(" + M(d) + ")" : d) + " = " + M(an)] };
      return { g:"koko", lv:"大学受験", q:"初項 " + M(a) + "、公差 " + M(d) + " の 等差数列の 初項から 第" + n + "項までの 和は？", a:M(S), w:[M(an), M(n * (a + an)), M(S + d * n), M(n * a + n * n * d / 2)].filter(x => x !== M(S)),
        ex:["第" + n + "項 = " + M(an), "和 = 項数 × (初項 + 末項) ÷ 2", n + " × (" + M(a) + " + " + M(an) + ") ÷ 2 = " + M(S)] }; },
    () => { const a = ri(1, 5), r = pk([2, 3, -2]), n = ri(4, 7), S = a * (r ** n - 1) / (r - 1);
      return { g:"koko", lv:"大学受験", q:"初項 " + a + "、公比 " + M(r) + " の 等比数列の 初項から 第" + n + "項までの 和は？", a:M(S), w:[M(a * r ** (n - 1)), M(a * (r ** (n + 1) - 1) / (r - 1)), M(a * r ** n), M(-S)].filter(x => x !== M(S)),
        ex:["和 = a(rⁿ − 1)/(r − 1)", a + " × (" + (r < 0 ? "(" + M(r) + ")" : r) + "^" + n + " − 1) ÷ (" + M(r) + " − 1)", "= " + M(S)] }; },
    () => { const a = rnz(-3, 3), b = ri(-5, 5), c = ri(-6, 6), k = rnz(-3, 3), v = 3 * a * k * k + 2 * b * k + c;
      return { g:"koko", lv:"大学受験", q:"f(x) = " + poly([a, b, c, 0]) + " の とき、f′(" + M(k) + ") は？", a:M(v), w:[M(a * k ** 3 + b * k * k + c * k), M(3 * a * k * k + b * k + c), M(a * k * k + b * k + c), M(-v)].filter(x => x !== M(v)),
        ex:["(xⁿ)′ = nxⁿ⁻¹ で 項ごとに 微分", "f′(x) = " + poly([3 * a, 2 * b, c]), "f′(" + M(k) + ") = " + M(v)] }; },
    () => { const p = ri(0, 2), q = p + ri(1, 3), a = pk([1, 3]), b = ri(0, 4), F = x => a * x ** 3 / 3 + b * x, v = F(q) - F(p);
      const show = x => { const n = Math.round(x * 3); return frac(n, 3); };
      return { g:"koko", lv:"大学受験", q:"定積分 ∫[" + p + "→" + q + "] (" + poly([a, 0, b]) + ") dx は？", a:show(v), w:[show(a * (q * q - p * p) + b * (q - p)), show(F(q)), show(a * (q ** 3 - p ** 3) + b * (q - p)), show(v + 1)].filter(x => x !== show(v)),
        ex:["原始関数 F(x) = " + (a === 1 ? "" : a + "") + "x³/3" + (b ? " + " + b + "x" : ""), "F(" + q + ") − F(" + p + ") = " + show(F(q)) + " − " + show(F(p)), "= " + show(v)] }; },
    () => { const a1 = rnz(-4, 5), a2 = rnz(-4, 5), b1 = rnz(-4, 5), b2 = rnz(-4, 5), d = a1 * b1 + a2 * b2;
      return { g:"koko", lv:"大学受験", q:"ベクトル a = (" + M(a1) + ", " + M(a2) + ")、b = (" + M(b1) + ", " + M(b2) + ") の 内積 a・b は？", a:M(d), w:[M(a1 * b2 + a2 * b1), M(a1 * b1 - a2 * b2), M(d + 1), "(" + M(a1 * b1) + ", " + M(a2 * b2) + ")"].filter(x => x !== M(d)),
        ex:["a・b = a₁b₁ + a₂b₂", PM(a1) + " × " + PM(b1) + " + " + PM(a2) + " × " + PM(b2) + " = " + M(d), "(内積は ベクトルではなく 1つの 数)"] }; },
    () => { const a = rnz(-4, 4), b = rnz(-4, 4), c = rnz(-4, 4), d = rnz(-4, 4), re = a * c - b * d, im = a * d + b * c;
      const cz = (x, y) => (x ? M(x) : "") + (y ? (y < 0 ? "−" : x ? "+" : "") + (Math.abs(y) === 1 ? "" : Math.abs(y)) + "i" : "") || "0";
      return { g:"kazu", lv:"大学受験", q:"(" + cz(a, b) + ")(" + cz(c, d) + ") を 計算すると？", a:cz(re, im), w:[cz(a * c + b * d, im), cz(re, a * d - b * c), cz(a * c, b * d), cz(-re, im)].filter(x => x !== cz(re, im)),
        ex:["ふつうに 展開して i² = −1 に する", "実部: " + M(a * c) + " − " + PM(b * d) + " = " + M(re), "虚部: " + M(a * d) + " + " + PM(b * c) + " = " + M(im), "→ " + cz(re, im)] }; },
    () => { const a = rnz(-3, 3), b = ri(-5, 5), c = ri(-6, 6), k = rnz(-3, 3), v = a * k ** 3 + b * k + c;
      return { g:"shiki", lv:"大学受験", q:"整式 P(x) = " + poly([a, 0, b, c]) + " を x " + (k < 0 ? "+ " + (-k) : "− " + k) + " で 割った 余りは？", a:M(v), w:[M(a * (-k) ** 3 + b * (-k) + c), M(c), M(v + k), M(a + b + c)].filter(x => x !== M(v)),
        ex:["剰余の定理: x − k で 割った 余りは P(k)", "k = " + M(k) + " を 入れる", "P(" + M(k) + ") = " + M(v)] }; },
    () => { const m = pk([1, 2, 3, 4, 5, 6]), k = m * m;
      return { g:"shiki", lv:"大学受験", q:"x > 0 の とき、x + " + k + "/x の 最小値は？", a:String(2 * m), w:[String(m), String(k), String(2 * k), String(m + 1)].filter(x => x !== String(2 * m)),
        ex:["相加平均 ≧ 相乗平均: x + " + k + "/x ≧ 2√(x × " + k + "/x) = 2√" + k + " = " + 2 * m, "等号は x = " + k + "/x、つまり x = " + m + " の とき", "最小値 " + 2 * m] }; },
    () => { const xs = Array.from({ length:5 }, () => ri(1, 9)), s = xs.reduce((a, b) => a + b, 0); if(s % 5) return null;
      const mu = s / 5, V = xs.reduce((a, x) => a + (x - mu) ** 2, 0) / 5, show = x => nf(x, 2);
      return { g:"data", lv:"大学受験", q:"データ " + xs.join("・") + " の 分散は？", a:show(V), w:[show(Math.sqrt(V)), show(V * 5 / 4), show(xs.reduce((a, x) => a + Math.abs(x - mu), 0) / 5), show(V + 1)].filter(x => x !== show(V)),
        ex:["平均 = " + s + " ÷ 5 = " + mu, "偏差の 2乗: " + xs.map(x => "(" + M(x - mu) + ")²").join(" + ") + " = " + nf(V * 5, 2), "分散 = " + nf(V * 5, 2) + " ÷ 5 = " + show(V), "(標準偏差は その √ = " + show(Math.sqrt(V)) + ")"] }; },
  ];
  const BADC = /NaN|undefined|Infinity|√0(?!\d)|√-|√−|null/;
  // まちがいが 3つ そろわない ときの 予備: 答えの 数を 少し ずらす(16 → 15・17・32)
  function nearWrongs(t){
    const m = String(t).match(/^(.*?)(−?)(\d+(?:\.\d+)?)(.*)$/); if(!m) return [];
    const v = (m[2] ? -1 : 1) * parseFloat(m[3]);
    return [v + 1, v - 1, v * 2, v + 2, -v, v + 3].map(x => m[1] + M(+x.toFixed(2)) + m[4]);
  }
  /* 4つの 答え(正しい 答え + まちがい 3つ)。同じ 字の まちがいは 1つに する */
  function calcMake(gen){
    for(let k = 0; k < 40; k++){
      const P = gen(); if(!P || BADC.test(P.q + P.a)) continue;
      const seen = new Set([P.a]), ch = [{ t:P.a, ok:true }];
      for(const x of P.w.concat(nearWrongs(P.a))){
        if(ch.length >= 4) break;
        if(!x || BADC.test(x) || seen.has(x)) continue;
        seen.add(x); ch.push({ t:x, ok:false });
      }
      if(ch.length < 4) continue;
      P.ch = shuffle(ch); P.A = P.a; return P;
    }
    return null;
  }
  function calcInfo(gen){ for(let k = 0; k < 40; k++){ const P = gen(); if(P) return P; } return { g:"", lv:"" }; }
  const CALC_META = CALC.map(calcInfo).map(P => ({ g:P.g, lv:P.lv }));


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

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-cstart],[data-ai-cnext],[data-ai-cans],[data-sg-fig],.ai-node");
    if(!t) return;
    if(t.dataset.aiTerm) return detail(t.dataset.aiTerm);
    if(t.dataset.aiBack){ trail.pop(); const id = trail[trail.length - 1]; if(id){ trail.pop(); detail(id); } return; }
    if(t.dataset.aiFav){ toggleFav(t.dataset.aiFav); trail.pop(); detail(t.dataset.aiFav); if(document.getElementById("ai-zk") && !document.getElementById("ai-zk").classList.contains("hidden")) drawZukan(); home(mode); return; }
    if(t.dataset.aiMore){ zf.shown += 180; return drawZukan(); }
    if(t.dataset.aiAns) return answerQuiz(+t.dataset.aiAns);
    if(t.dataset.aiQstart) return startQuiz();
    if(t.dataset.aiCans) return answerCalc(+t.dataset.aiCans);
    if(t.dataset.aiCstart) return startCalc();
    if(t.dataset.aiCnext){ calc.i++; calc.picked = null; drawCalc(); const sh = document.getElementById("ai-cq"); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.sgFig){ document.querySelectorAll(".sg-ft").forEach(b => b.classList.toggle("sel", b === t)); return showFig(t.dataset.sgFig); }
    if(t.dataset.aiQnext){ quiz.i++; quiz.picked = null; const sh = document.getElementById("ai-qz"); drawQuiz(); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiOpen){
      const o = t.dataset.aiOpen;
      if(o === "zukan") return openZukan({});
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
      if(o === "calc") return openCalc();
    }
    if(t.dataset.aiDiag){ diagCur = t.dataset.aiDiag; const box = document.querySelector(".ai-dbox"); if(box) box.innerHTML = diagramSvg(diagCur, { counts:countsFor(diagCur) });
      document.querySelectorAll("[data-ai-diag]").forEach(b => b.classList.toggle("on", b.dataset.aiDiag === diagCur)); const l = document.getElementById("ai-dlist"); if(l) l.innerHTML = ""; return; }
    if(t.classList.contains("ai-node") && t.closest(".ai-dbox")){
      const key = t.dataset.diag, node = t.dataset.node, G = D.diagrams[key], n = G.nodes.find(x => x.id === node), d = discovered();
      const here = ALL.filter(q => q.mp === key + ":" + node), got = here.filter(q => d.has(q.art));
      const l = document.getElementById("ai-dlist");
      l.innerHTML = '<p class="ai-dl-h">' + n.icon + " " + esc(n.label) + '　<small>' + got.length + ' / ' + here.length + '語</small></p>' +
        (got.length ? '<div class="ai-chips">' + got.map(q => chip(q)).join("") + '</div>' : "") + (here.length > got.length ? '<p class="ai-small ai-muted">まだ 出会っていない ことばが ' + (here.length - got.length) + '語 あるよ</p>' : "");
    }
  });

  /* ── 見た目(この ページだけ。方眼の ノートの ように 明るく やさしく。むずかしそうに しない) ── */
  const css = `
.map-card{display:none}
.ai-panel{background:linear-gradient(160deg,#e7f5ff 0%,#fff9db 55%,#fff0f6 100%);border:1px solid #a5d8ff;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#3b5bdb;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#3b5bdb,#1098ad,#e8590c);border-radius:99px}
.ai-jr i::after{content:"";position:absolute;inset:0;width:var(--w);background:var(--c);border-radius:99px}
.ai-jr{list-style:none;margin:0;padding:0;display:grid;gap:2px}
.ai-jr li{display:grid;grid-template-columns:1fr auto;font-size:13px;align-items:baseline;gap:4px}.ai-jr .rn{font-weight:800}.ai-jr i{grid-column:1/-1;height:6px;margin:2px 0 5px}
.ai-jr .rc{font-variant-numeric:tabular-nums;color:#64748b}.ai-jr .rc b{color:#1e1b4b}
.ai-title{margin:8px 0 10px;font-size:14px}.ai-title small{display:block;color:#64748b;font-size:12px;margin-top:2px}
.ai-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ai-btn{padding:11px 8px;border-radius:14px;border:1.5px solid #c7d2fe;background:#fff;color:#1e1b4b;font:inherit;font-weight:800;font-size:14px;cursor:pointer}
.ai-btn:active{transform:translateY(1px)}.ai-wide{width:100%;margin-top:10px}
.ai-diag{margin-top:14px;background:#fff;border:1px solid #e0e7ff;border-radius:16px;padding:10px}
.ai-diag>summary{cursor:pointer;list-style:none}.ai-diag>summary::-webkit-details-marker{display:none}.ai-diag:not([open])>summary{margin:0}.ai-dh{margin:0 0 6px;font-weight:900;font-size:14px}.ai-dh small{display:block;font-weight:600;color:#64748b;font-size:11.5px}
.ai-dtabs:has(> button:only-child){display:none}.ai-dtabs{display:flex;gap:6px;overflow-x:auto;margin:0 0 8px;padding-bottom:2px}
.ai-dtabs button{flex:none;padding:6px 10px;border-radius:99px;border:1.5px solid #e2e8f0;background:#f8fafc;color:#334155;font:inherit;font-size:12px;font-weight:800}
.ai-dtabs button.on{background:#3b5bdb;border-color:#3b5bdb;color:#fff}
.ai-svg{display:block;width:100%;height:auto}.ai-node{cursor:pointer}.ai-node.on rect{filter:drop-shadow(0 2px 4px rgba(109,63,214,.25))}
.ai-pinbob{animation:aiBob 1.2s ease-in-out infinite}@keyframes aiBob{50%{transform:translateY(-3px)}}
.ai-dlist:empty{display:none}.ai-dlist{margin-top:8px;border-top:1px dashed #e2e8f0;padding-top:8px}.ai-dl-h{margin:0 0 6px;font-weight:900}.ai-dl-h small{color:#64748b}
.ai-chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0}
.ai-chip{padding:5px 10px;border-radius:99px;border:1.5px solid #c7d2fe;background:#eef2ff;color:#312e81;font:inherit;font-size:12.5px;font-weight:800;cursor:pointer}
.ai-chip.new{background:#fef3c7;border-color:#fcd34d;color:#92400e}.ai-chip.lock{background:#f1f5f9;border-style:dashed;border-color:#cbd5e1;color:#94a3b8}
.ai-note{font-size:11px;color:#64748b;line-height:1.6;margin:10px 0 0}
.ai-lead{color:var(--muted);font-size:13px;margin:0 0 12px;line-height:1.7}
.ai-route{display:flex;flex-wrap:wrap;align-items:center;gap:4px 2px;margin:-4px 0 8px;font-size:12.5px;font-weight:800}
.ai-route .st{padding:4px 9px;border-radius:99px;background:var(--soft);border:1.5px solid var(--line);color:var(--muted);white-space:nowrap}
.ai-route .st.done{background:#ecfdf5;border-color:#6ee7b7;color:#065f46}.ai-route .st.now{background:var(--c);border-color:var(--c);color:#fff}
.ai-route .st em{font-style:normal;margin-left:4px;font-size:10.5px;background:#fff;color:var(--c);border-radius:99px;padding:1px 6px}
.ai-route .st.goal{border-color:#fcd34d;color:#b45309}.ai-route .ar{color:#94a3b8}
.ai-learn{background:#f5f3ff;border:1px solid #ddd6fe;color:#3b0764;border-radius:12px;padding:7px 10px;margin:0 0 8px;font-size:13px;line-height:1.55;animation:aiIn .35s ease-out}
.ai-learn b{margin-right:6px}.ai-learn span{color:#6d28d9;font-size:12px}.ai-learn p{margin:2px 0 0;color:#4c1d95;font-size:12.5px}.ai-learn .ai-rel{color:#0369a1;font-weight:700}
.ai-learn.ai-hint{background:var(--soft);border-color:var(--line);color:var(--muted)}
@keyframes aiIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.ai-q{display:flex;gap:12px;align-items:center;margin:0 0 10px}.ai-q .spot{font-size:clamp(22px,7vw,30px);line-height:1.2;word-break:break-word;margin:0}
.ai-ic{font-size:36px;width:58px;height:58px;display:grid;place-items:center;background:linear-gradient(135deg,#dbe4ff,#fff3bf);border-radius:16px;flex:none}
.ai-cat,.ai-alt{display:block;font-size:11.5px;color:var(--muted);margin-top:3px}.ai-alt{color:#0369a1;font-weight:700}
.ai-tag{display:inline-block;margin-top:4px;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:99px}.ai-tag.new{background:#fef3c7;color:#92400e}
.ai-info{margin-top:8px}.ai-info .ai-tag{margin:0 0 6px}
.ai-ex{font-size:13.5px;line-height:2;margin:6px 0;background:#f0f9ff;border-radius:10px;padding:6px 10px;color:#0c4a6e}.ai-ex b{display:inline-block;font-size:11.5px;background:#0ea5e9;color:#fff;border-radius:99px;padding:0 8px;margin-right:6px;line-height:1.8}
.ai-small{font-size:12.5px;font-weight:800;margin:8px 0 2px;color:#334155}.ai-muted{color:#64748b;font-weight:600}
.ai-mini{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:4px;max-width:360px}
.pins-msg .ai-r1{display:block}.pins-msg small{display:block;font-weight:700;color:var(--muted);font-size:13px}
.ai-earn{display:block;margin-top:8px;font-size:16px;color:#b45309;animation:aiIn .5s ease-out}
.ai-today{display:block;margin-top:10px;background:#fff;border:1px solid #e0e7ff;border-radius:14px;padding:8px 10px;text-align:left}.ai-today b{display:block;font-size:14px;color:#312e81}.ai-today .ai-chips{display:flex}
.ai-sheet .ai-zbox{max-width:560px;position:relative}.ai-x{position:absolute;right:10px;top:8px;border:0;background:none;font-size:26px;color:#64748b;line-height:1;cursor:pointer}
.ai-zsum{text-align:center;margin:4px 0 8px}.ai-zsum b{font-size:22px;color:#3b5bdb}
.ai-search{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;border-radius:12px;border:1.5px solid #c7d2fe;margin:0 0 8px;background:#fff;color:#1e1b4b}
.ai-zf{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:0 0 8px}.ai-zf select{font:inherit;font-size:12.5px;padding:8px 4px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#334155;min-width:0}
.ai-ztog{display:flex;gap:6px;margin:0 0 8px}.ai-ztog button{flex:1;padding:7px;border-radius:99px;border:1.5px solid #e2e8f0;background:#fff;color:#334155;font:inherit;font-size:12.5px;font-weight:800}
.ai-ztog button.on{background:#f59e0b;border-color:#f59e0b;color:#fff}
.ai-empty{text-align:center;color:#64748b;font-size:13px;margin:14px 0}
.ai-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:6px;margin-top:8px}
.ai-tile{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:12px;border:1.5px dashed #cbd5e1;background:#f8fafc;color:#94a3b8;font:inherit;min-height:74px;cursor:pointer}
.ai-tile span{font-size:20px}.ai-tile b{font-size:12px;line-height:1.3;word-break:break-word;text-align:center}.ai-tile small{font-size:10px;text-align:center}
.ai-tile.on{border-style:solid;border-color:#c7d2fe;background:#f5f3ff;color:#1e1b4b}.ai-tile.on small{color:#475569}
#ai-zdt:not(.hidden){display:flex;align-items:flex-end;padding:20px 10px calc(10px + env(safe-area-inset-bottom))}#ai-zdt .ai-card{max-width:540px;width:100%;margin:0 auto;max-height:84vh;overflow-y:auto;box-shadow:0 -10px 30px -8px rgba(0,0,0,.35)}
.ai-card{position:relative;border:1.5px solid #c7d2fe;background:#fff;border-radius:18px;padding:14px 14px 16px;color:#0f172a;box-sizing:border-box}
.ai-cn{display:flex;align-items:center;gap:10px;font-size:21px;font-weight:900;margin:0;padding-right:28px}.ai-cn .ai-ic{width:46px;height:46px;font-size:26px}.ai-cn rt{font-size:.5em;color:#475569}
.ai-fav{margin-left:auto;border:0;background:none;font-size:24px;cursor:pointer;color:#f59e0b}
.ai-meta{margin:6px 0 0;color:#475569;font-size:12px}.ai-d{margin:8px 0 0;font-size:14.5px;line-height:2.05}.ai-st{font-size:12px;color:#475569;margin:10px 0 0}
.ai-qn{margin:0;color:#64748b;font-size:12px;text-align:center}.ai-qq{font-size:15px;line-height:1.9;font-weight:700;margin:6px 0 12px}
.ai-qch{display:grid;gap:8px}.ai-qch .ai-btn{text-align:left}.ai-qch .ok{background:#dcfce7;border-color:#22c55e}.ai-qch .ng{background:#fee2e2;border-color:#ef4444}
.ai-qlead{font-size:13.5px;line-height:1.8;margin:4px 0 10px}.ai-qset{grid-template-columns:1fr 1fr}.ai-go{background:#3b5bdb;border-color:#3b5bdb;color:#fff}
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#3b5bdb}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
.ai-btns .ai-calc{background:linear-gradient(135deg,#fff4e6,#fff);border-color:#ffc078}
.sg-lfig{float:right;width:96px;margin:-2px -4px 2px 6px;background:#fff;border-radius:10px;border:1px solid #e0e7ff}
.sg-lfig .ai-svg{display:block}
.sg-figs{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:6px}
.sg-ft{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 3px 5px;border-radius:12px;border:1.5px dashed #cbd5e1;background:#f8fafc;color:#94a3b8;font:inherit;cursor:pointer;min-height:92px}
.sg-ft.on{border-style:solid;border-color:#c7d2fe;background:#fff;color:#1e1b4b}.sg-ft.sel{border-color:#3b5bdb;box-shadow:0 0 0 2px #dbe4ff}
.sg-ft .ai-svg{width:100%;height:auto}.sg-ft b{font-size:11px;line-height:1.2}.sg-ft small{font-size:10px;color:#64748b}
.sg-lock{font-size:26px;display:grid;place-items:center;height:56px;filter:grayscale(1);opacity:.55}
.sg-cq{font-size:16px}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"sugaterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget, tgtHtml,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg, figSvg };
})();
