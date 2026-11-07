/* フリック宅建士: 宅地建物取引士の ことばを、フリックで 打って おぼえる。(けいくん 2026-11-07「フリック宅地建物取引士を 受かるレベルに」→「ぜんぶ おすすめで」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「宅建の 旅」を 足す ファイル。takken/ の ページだけが 読む ─
   ことばは tools/takken/meta.json + tools/takken/terms-*.json(+ maru-*.json・num.json)→ tools/takken/terms_js.py が data/takken.json と takken/terms.js(TAKKEN_TERMS)に する。
   **ことば・問題を 足す・直すのは tools/takken/ の json だけ**
   ・もとは フリック自動車運転免許(menkyo/menkyo.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 9つ(試験の 4つの 科目)+ 🏆 マスター。990語(旅ごとに 入門20・中級30・上級60)
   ・こたえると 説明・📘 分野・📝 科目の 札が 出る。図鑑は 📝 札でも しぼれる
   ・⭕❌ 一問一答・🔢 数字クイズ・🎯 模擬試験(4択 50問・2時間・登録講習の 免除)・❌ まちがえた 問題(運転免許に つづく 2つめの 例外)・🧩 4択クイズ
   ⚠️ ことばを おぼえる ゲーム。本当の 試験の 前には 最新の テキストと 試験の 案内で 確かめる */
const TAKKEN = (() => {
  const D = TAKKEN_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に tdkenri … tdmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { kenri:"tdkenri", bukken:"tdbukken", sozoku:"tdsozoku", gyoho:"tdgyoho", torihiki:"tdtorihiki", toshi:"tdtoshi", kenchiku:"tdkenchiku", zei:"tdzei", kakaku:"tdkakaku" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"takkenterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
      c:j.icon + " " + j.name + " ・ " + o.c + " ・ " + LVN[o.dv].icon + " " + LVN[o.dv].name });
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
    maps[m] = { icon:J.icon, name:J.name, cardName:J.name, title:"", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば", miss:"まだ 出会っていない ことば",
                lvTitle:J.icon + " " + J.name + "　旅を すすめる",
                card:(mm, done) => '<small>' + terms.length + '語・' + lv.length + 'ステージ</small><small>出会った ' + done + '語</small>' };
  }
  /* マスター: 9つの 旅を まぜて ぜんぶ(きまった ならび。どの ステージも いつも 同じ 10語 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.slice().sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.tdmas = lv; pools.tdmas = ALL; colors.tdmas = "#e0202e";
    maps.tdmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　9つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  const MODES_ALL = ["tdkenri", "tdbukken", "tdsozoku", "tdgyoho", "tdtorihiki", "tdtoshi", "tdkenchiku", "tdzei", "tdkakaku", "tdmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-takken[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-takken-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-takken");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-takken"), JSON.stringify(v)); memo = { k:pkey("flick-takken"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-takken-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-takken-fav"), JSON.stringify(a)); return i < 0; }
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
  const DIAGS = Object.keys(D.diagrams);  // 車の 図は 3つの 旅(シャシ・ブレーキ・電装)で 使うので、タブは 図ごとに 1つ
  const BG = {};  // うしろの 絵は 使わない(箱と 線だけ)
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
  function nodeOf(q){ const [k, n] = q.mp.split(":"); return { key:k, node:n }; }
  function countsFor(key){ const d = discovered(), c = {}; for(const q of ALL){ const p = nodeOf(q); if(p.key === key && d.has(q.art)) c[p.node] = (c[p.node] || 0) + 1; } return c; }
  const nodeLabel = q => { const p = nodeOf(q), G = D.diagrams[p.key], n = G.nodes.find(x => x.id === p.node); return G.name + " の「" + n.label + "」"; };

  /* ── 問題の カード: ことば + ひとつ前の ことばの 意味・つながる ことば(こたえたら 出る。テンポを 止めない) ── */
  function card(q, prev){
    let h = "";
    if(prev){
      const rel = (prev.rel || []).slice(0, 2).map(id => BY.get(id)).filter(Boolean);
      h += '<div class="ai-learn" role="status"><b>✅ ' + esc(prev.n) + '</b><span>' + prev.jr.icon + " " + esc(prev.jr.name) + '</span><p>' + esc(prev.ds) + '</p>' +
           (prev.rs ? '<p class="ai-ko">📝 ' + esc(prev.rs) + ' ・ ' + esc(prev.f) + '</p>' : "") +
           (rel.length ? '<p class="ai-rel">🔗 つながる ことば: ' + rel.map(x => esc(x.n)).join("・") + '</p>' : "") + '</div>';
    }else h += '<div class="ai-learn ai-hint">こたえると、その ことばの 意味と、つながる ことばが 出るよ</div>';
    const tag = pre && !pre.has(q.art) ? '<span class="ai-tag new">🆕 はじめまして</span>' : "";
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot">' + esc(q.n) + '</p>' + tag + '<small class="ai-cat">' + esc(q.c) + '</small>' +
         (q.al ? '<small class="ai-alt">読みかたは どれでも OK: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</small>' : "") + '</div></div>';
    return h;
  }
  /* ── 結果・図鑑の くわしい 情報: たとえば / つながる ことば / しくみ図の 📍 ── */
  function info(q, inZukan){
    const tag = inZukan ? "" : last && last.fresh.includes(q.art) ? '<span class="ai-tag new">🆕 はじめて 出会った</span>' : "";
    const d = discovered(), p = nodeOf(q);
    let h = '<div class="ai-info">' + tag;
    if(q.fm) h += '<p class="ai-ex ai-fm"><b>🧮 公式</b><code>' + esc(q.fm) + '</code></p>';  // 公式を 打つ 語だけ
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.f) h += '<p class="ai-small ai-muted">📘 分野: ' + esc(q.f) + (q.rs ? ' <span class="ai-rs">📝 ' + esc(q.rs) + '</span>' : "") + '</p>';
    if(q.al) h += '<p class="ai-small">読みかた: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</p>';
    const rel = (q.rel || []).map(id => BY.get(id)).filter(Boolean);
    if(rel.length) h += '<p class="ai-small">🔗 つながる ことば</p><div class="ai-chips">' + rel.map(x => d.has(x.art) ? chip(x) : '<button type="button" class="ai-chip lock" data-ai-term="' + esc(x.art) + '">❔ ？？？</button>').join("") + '</div>';
    // しくみ図・地図(📍)は 10問の あとの 説明・図鑑に のせない(けいくん 2026-09-29「地図スクロールが大変になるからいらない / 10問終わったあとの説明にはのせないで」→「すべてのフリックゲームを同じ仕様に」)。ホームの 図は たたんで のこす
    if(q.ty === "service") h += '<p class="ai-small ai-muted">🏢 サービス・会社の 名前です。中身や 名前が 変わることが あります' + (q.asOf ? "(" + esc(q.asOf) + "時点)" : "(" + esc(D.asOf) + "時点の 説明)") + '</p>';
    else if(q.asOf) h += '<p class="ai-small ai-muted">' + esc(q.asOf) + '時点の 説明です</p>';
    return h + '</div>';
  }

  /* ── 📊 宅建の 図(ホーム。<details> で たたむ。数字は facts-A/B/C.md で 確かめた もの)── */
  function tdCharts(){
    const flow = ["📣 広告", "🤝 媒介契約", "🗣 重要事項の説明(契約の 前)", "✍️ 契約", "📄 37条書面(遅滞なく)", "🔑 引き渡し・登記"];
    const tr = (h, c) => '<tr><th>' + h + '</th>' + c.map(x => '<td>' + x + '</td>').join("") + '</tr>';
    const yo = [["住居系", "#51cf66", ["第一種低層住居専用地域", "第二種低層住居専用地域", "田園住居地域", "第一種中高層住居専用地域", "第二種中高層住居専用地域", "第一種住居地域", "第二種住居地域", "準住居地域"]],
                ["商業系", "#ff8787", ["近隣商業地域", "商業地域"]], ["工業系", "#74c0fc", ["準工業地域", "工業地域", "工業専用地域"]]];
    return '<details class="ai-diag td-charts"><summary class="ai-dh">📊 宅建の 図を ひらく <small>取引の 流れ・媒介契約・用途地域・相続分・建ぺい率と 容積率・免許・抵当権</small></summary>' +
      '<h4>🏠 不動産の 取引の 流れ</h4><ol class="td-flow">' + flow.map(x => '<li>' + x + '</li>').join("") + '</ol>' +
      '<h4>🤝 媒介契約 3つの くらべ</h4><table class="td-tb"><tr><th></th><th>一般</th><th>専任</th><th>専属専任</th></tr>' +
        tr("ほかの 業者にも 頼める", ["⭕", "❌", "❌"]) + tr("自分で 見つけた 相手と 契約", ["⭕", "⭕", "❌"]) + tr("契約の 期間", ["決まり なし", "3か月 以内", "3か月 以内"]) +
        tr("業者からの 報告", ["決まり なし", "2週間に 1回 以上", "1週間に 1回 以上"]) + tr("指定流通機構への 登録", ["決まり なし", "7日 以内", "5日 以内"]) + '</table>' +
        '<p class="ai-small ai-muted">日数は 業者の 休業日を 数えない。期間は 3か月を こえる 約束でも 3か月に なる(宅建業法34条の2)</p>' +
      '<h4>🎨 用途地域 13種類</h4><div class="td-yo">' + yo.map(([g, c, L]) => '<div style="--c:' + c + '"><b>' + g + '(' + L.length + ')</b>' + L.map(x => '<span>' + x + '</span>').join("") + '</div>').join("") + '</div>' +
      '<h4>🌳 相続分(法定相続分)</h4><table class="td-tb"><tr><th>だれが 相続人か</th><th>配偶者</th><th>ほかの 人</th></tr>' +
        tr("配偶者 と 子", ["2分の1", "2分の1(子で 分ける)"]) + tr("配偶者 と 直系尊属(親など)", ["3分の2", "3分の1"]) + tr("配偶者 と 兄弟姉妹", ["4分の3", "4分の1"]) + '</table>' +
        '<p class="ai-small ai-muted">子が いれば 子が 先、いなければ 直系尊属、それも いなければ 兄弟姉妹(民法887〜890条・900条)</p>' +
      '<h4>⬛ 建ぺい率 と 🧊 容積率</h4><svg class="td-svg" viewBox="0 0 320 150" role="img" aria-label="建ぺい率と容積率の図">' +
        '<rect x="10" y="20" width="130" height="110" fill="#d3f9d8" stroke="#2f9e44"/><rect x="40" y="45" width="70" height="60" fill="#fff3bf" stroke="#f08c00"/>' +
        '<text x="75" y="80" text-anchor="middle" font-size="11">建築面積</text><text x="75" y="142" text-anchor="middle" font-size="11">敷地面積</text>' +
        '<rect x="190" y="100" width="90" height="30" fill="#fff3bf" stroke="#f08c00"/><rect x="190" y="70" width="90" height="30" fill="#ffe8cc" stroke="#f08c00"/><rect x="190" y="40" width="90" height="30" fill="#fff3bf" stroke="#f08c00"/>' +
        '<text x="235" y="30" text-anchor="middle" font-size="11">延べ面積 = 各階の 合計</text></svg>' +
        '<p class="ai-small">建ぺい率 = 建築面積 ÷ 敷地面積 / 容積率 = 延べ面積 ÷ 敷地面積</p>' +
      '<h4>🪪 宅建業の 免許</h4><table class="td-tb">' + tr("事務所が 1つの 都道府県だけ", ["都道府県知事の 免許"]) + tr("事務所が 2つ 以上の 都道府県", ["国土交通大臣の 免許"]) + tr("有効期間", ["5年(更新できる)"]) + '</table>' +
      '<h4>🏦 抵当権の 順位</h4><ol class="td-flow"><li>1番抵当権(先に 登記)</li><li>2番抵当権</li><li>3番抵当権 …</li></ol><p class="ai-small ai-muted">お金を 先に 受けとるのは 登記の 早い 順(民法373条)</p>' +
      '</details>';
  }
  /* ── ホーム: 見つけた ことば・称号・しくみ図・旅マップ ── */
  let diagCur = null;
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n), td = todayWords().length, fv = favs().length;
    const jr = JR.map(J => { const all = pools[MODE_OF[J.id]], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + J.icon + " " + J.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + got + '</b> / ' + all.length + '</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%;--c:' + J.color + '"></i></li>'; }).join("");
    if(JOURNEY_OF[m]) diagCur = JBY[JOURNEY_OF[m]].diagram;
    if(!diagCur) diagCur = "kenri";
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 ことば図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="maru">⭕❌ 一問一答</button>' +
      '<button type="button" class="ai-btn td-big" data-ai-open="exam">🎯 模擬試験</button>' +
      '<button type="button" class="ai-btn" data-ai-open="num">🔢 数字クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="review">❌ まちがえた 問題' + (missList().length ? "(" + missList().length + ")" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
      tdCharts() + '<p class="ai-note">' + esc(D.note) + '</p></section>';
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
    }else chips.innerHTML = '<p class="ai-lead">9つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "tdmas") return { name:"マスター" + (i + 1), sub:"9つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };
  }

  /* ── ことば図鑑(検索・旅・分類・むずかしさ・お気に入りで しぼれる) ── */
  let zf = { q:"", j:"", c:"", dv:"", rs:"", fav:false, shown:90 };
  const normQ = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/\s/g, "");
  function sheet(id){
    let sh = document.getElementById(id);
    if(!sh){ sh = document.createElement("div"); sh.id = id; sh.className = "prof-sheet ai-sheet"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeSheet(id); }); }
    sh.classList.remove("hidden"); document.body.classList.add("ai-lock"); return sh;
  }
  function closeSheet(id){ const sh = document.getElementById(id); if(sh) sh.classList.add("hidden"); if(!document.querySelector(".ai-sheet:not(.hidden)")) document.body.classList.remove("ai-lock"); }
  function openZukan(pre2){ if(pre2) Object.assign(zf, { q:"", j:"", c:"", dv:"", rs:"", fav:false }, pre2); zf.shown = 90; sheet("ai-zk"); drawZukan(); }
  function drawZukan(){
    const sh = document.getElementById("ai-zk"), d = discovered(), fv = new Set(favs()), qq = normQ(zf.q);
    const list = ALL.filter(q => (!zf.j || q.j === zf.j) && (!zf.c || q.c === zf.c) && (!zf.dv || q.dv === +zf.dv) && (!zf.rs || q.rs === zf.rs) && (!zf.fav || fv.has(q.art)) &&
      (!qq || [q.n, q.r].concat(q.al || [], [q.ds]).some(x => normQ(x).includes(qq))));
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    const cats = [...new Set(ALL.filter(q => !zf.j || q.j === zf.j).map(q => q.c))];
    const scroll = sh.scrollTop, focused = document.activeElement && document.activeElement.id === "ai-zq";
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 ことば図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 徐行)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-zf" style="grid-template-columns:1fr"><select id="ai-zr">' + opt("", "📝 科目(ぜんぶ)", zf.rs) + ["権利関係", "宅建業法", "法令上の制限", "税・その他", "免除科目"].map(r => opt(r, "📝 " + r, zf.rs)).join("") + '</select></div>' +
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
    sh.querySelector("#ai-zr").onchange = e => { zf.rs = e.target.value; zf.shown = 90; drawZukan(); };
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
     ・はんい: 出会った ことば / むずかしさごと(入門・自家用・事業用)/ ぜんぶ。旅でも しぼれる
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

  /* ════ ここから 宅建士だけの しくみ(けいくん 2026-11-07「受かるレベルに」→「ぜんぶ おすすめで」)════
     ⭕❌ 一問一答(ひっかけの 練習)・🔢 数字クイズ(期間・面積・割合)・🎯 模擬試験(本番と 同じ 4つから 1つ 50問・2時間・科目の 数も 本番どおり。登録講習の 5問免除の 切りかえ)・
     ❌ まちがえた 問題の 復習
     ⚠️ ❌ 復習は シリーズの「スピード記録勝負」の **2つめの 例外**(1つめは 運転免許)。けいくん決定 2026-11-07。ほかの ゲームに 広げない */
  const MARU = (D.maru || []).map(m => Object.assign({}, m, { jr:JBY[m.j] }));
  const MBY = new Map(MARU.map(m => [m.id, m]));
  const NUM = (D.num || []).map(n => Object.assign({}, n, { jr:JBY[n.j] }));
  const NBY = new Map(NUM.map(n => [n.id, n]));
  const MOCK = D.mock || {};
  const OX = a => a ? "⭕" : "❌";
  const RSO = ["権利関係", "宅建業法", "法令上の制限", "税・その他", "免除科目"];

  /* ── ❌ まちがえた 問題(端末に おぼえる。ログイン して いれば かずともの 記録と いっしょ = recSet)──
     flick-takken-miss[-p<id>] = { "m:<⭕❌のid>" | "n:<数字クイズのid>": つづけて 正解した 回数 }。2回 つづけて 正解で 消える */
  function missGet(){ try{ const v = JSON.parse(recGet(pkey("flick-takken-miss")) || "{}"); return v && typeof v === "object" ? v : {}; }catch(e){ return {}; } }
  function missSet(v){ recSet(pkey("flick-takken-miss"), JSON.stringify(v)); }
  function missMark(key, ok){
    const v = missGet();
    if(!ok) v[key] = 0;
    else if(key in v){ v[key]++; if(v[key] >= 2) delete v[key]; }
    missSet(v);
  }
  const missList = () => Object.keys(missGet()).filter(k => k[0] === "m" ? MBY.has(k.slice(2)) : NBY.has(k.slice(2)));
  const termChip = id => { const q = BY.get(id); return q ? chip(q) : ""; };
  const lawTag = s => s ? '<small class="td-law">📚 ' + esc(s) + '</small>' : "";

  /* ── ⭕❌ 1問の 画面 ── */
  function maruCard(m, picked){
    let h = '<p class="ai-qq td-q">' + esc(m.q) + '</p><div class="td-ox">' +
      [true, false].map(v => '<button type="button" class="td-oxb' + (picked === undefined ? "" : (v === m.a ? " ok" : v === picked ? " ng" : "")) + (picked === v ? " pk" : "") + '" data-td-ox="' + (v ? 1 : 0) + '"' + (picked === undefined ? "" : " disabled") + '>' + OX(v) + '</button>').join("") + '</div>';
    if(picked !== undefined){
      const ok = picked === m.a;
      h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ ざんねん") + '　答えは ' + OX(m.a) + '</b><p>' + esc(m.w) + '</p>' + lawTag(m.lw) +
           (m.t && BY.get(m.t) ? '<div class="ai-chips">' + termChip(m.t) + '</div>' : "") + '</div>';
    }
    return h;
  }
  const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';

  /* ── ⭕❌ 一問一答(10問。旅・むずかしさで しぼれる) ── */
  let mq = null, mset = { j:"", dv:"" };
  const mPool = () => MARU.filter(m => (!mset.j || m.j === mset.j) && (!mset.dv || m.dv === +mset.dv));
  function openMaru(){ mq = null; sheet("ai-mq"); drawMaru(); }
  function startMaru(list){ const pool = list || shuffle(mPool()).slice(0, QN); if(!pool.length){ drawMaru("問題が ないよ。はんいを 広げてね"); return; } mq = { list:pool, i:0, ok:0, picked:undefined, miss:[], review:!!list }; drawMaru(); }
  function drawMaru(msg){
    const sh = document.getElementById("ai-mq"), Q = mq;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>' + (Q && Q.review ? "❌ まちがえた 問題" : "⭕❌ 一問一答") + '</h2>';
    if(!Q){
      h += '<p class="ai-qlead">文を 読んで 正しければ ⭕・まちがいなら ❌。本番の 4択は、この 見分けの 力で 解けるよ。<b>「必ず」「自ら 売主」「宅建業者 どうし」「以内 / 以上」「許可 / 届出」</b>の ような ひっかけに 気を つけてね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="td-mj">' + opt("", "🧭 ぜんぶの 旅", mset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, mset.j)).join("") + '</select>' +
        '<select id="td-md">' + opt("", "📶 ぜんぶ", mset.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, mset.dv)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの 問題: ' + mPool().length + '問(ぜんぶで ' + MARU.length + '問)</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-td-mstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームが 法律の 条文を もとに 作った もので、本物の 試験の 問題では ありません。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.review ? '<p class="ai-small ai-muted">2回 つづけて 正解すると「まちがえた 問題」から 消えるよ。のこり ' + missList().length + '問</p>' : "") +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた 問題</p>' + Q.miss.map(m => m.o ? '<div class="td-rv"><p>' + esc(m.q) + '</p><b>答え ' + esc(m.a) + '</b> ' + esc(m.w) + '</div>' : '<div class="td-rv"><p>' + esc(m.q) + '</p><b>答え ' + OX(m.a) + '</b> ' + esc(m.w) + '</div>').join("") : "") +
        (Q.review ? '<button type="button" class="ai-btn ai-wide ai-go" data-ai-open="review">もう一度</button>' :
          '<button type="button" class="ai-btn ai-wide ai-go" data-td-mstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="maru">はんいを えらびなおす</button>');
    }else{
      const m = Q.list[Q.i];
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + m.jr.icon + " " + esc(m.jr.name) + (m.dv ? " ・ " + LVN[m.dv].icon + " " + esc(LVN[m.dv].name) : " ・ 🔢 数字") + '</span></p>' + (m.o ? numCard(m, Q.picked) : maruCard(m, Q.picked));
      if(Q.picked !== undefined) h += '<button type="button" class="ai-btn ai-wide ai-go" data-td-mnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const j = sh.querySelector("#td-mj"), d = sh.querySelector("#td-md");
    if(j) j.onchange = e => { mset.j = e.target.value; drawMaru(); };
    if(d) d.onchange = e => { mset.dv = e.target.value; drawMaru(); };
  }
  function answerMaru(v){ const Q = mq, m = Q && Q.list[Q.i]; if(!m || Q.picked !== undefined) return; Q.picked = v; const ok = m.o ? m.ch[v] === m.a : v === m.a; if(ok) Q.ok++; else Q.miss.push(m); missMark((m.o ? "n:" : "m:") + m.id, ok); drawMaru(); }

  /* ── 🔢 数字クイズ(数字を 4つから。10問) ── */
  const withChoices = n => Object.assign({}, n, { ch:shuffle(n.o) });
  function numCard(n, picked){
    const done = picked !== undefined;
    let h = '<p class="ai-qq td-q">' + esc(n.q) + '</p><div class="ai-qch td-nch">' + n.ch.map((x, k) => '<button type="button" class="ai-btn' + (done ? (x === n.a ? " ok" : k === picked ? " ng" : "") : "") + '" data-td-nans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>';
    if(done){ const ok = n.ch[picked] === n.a; h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は「" + esc(n.a) + "」") + '</b><p>' + esc(n.w) + '</p>' + lawTag(n.lw) + '</div>'; }
    return h;
  }
  let nset = { j:"" };
  const nPool = () => NUM.filter(n => !nset.j || n.j === nset.j);
  function openNum(){ mq = null; sheet("ai-mq"); drawNumStart(); }
  function drawNumStart(msg){
    const sh = document.getElementById("ai-mq");
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🔢 数字クイズ</h2>' +
      '<p class="ai-qlead">宅建は <b>数字が 合否を 分ける</b> 試験。日数・面積・割合・人数を 4つから えらぼう。' + QN + '問。</p>' +
      '<div class="ai-zf ai-qset"><select id="td-nj">' + opt("", "🧭 ぜんぶの 旅", nset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, nset.j)).join("") + '</select></div>' +
      '<p class="ai-small ai-muted">この はんいの 問題: ' + nPool().length + '問(ぜんぶで ' + NUM.length + '問)</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
      '<button type="button" class="ai-btn ai-wide ai-go" data-td-nstart="1">はじめる</button>' +
      '<p class="ai-note">数字は ' + esc(D.asOf) + ' の 法律で 確かめた ものです。法律は 変わることが あるので、本当の 試験の 前には 最新の テキストで 確かめてね。</p></div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const j = sh.querySelector("#td-nj"); if(j) j.onchange = e => { nset.j = e.target.value; drawNumStart(); };
  }
  function startNum(list){ const pool = (list || shuffle(nPool()).slice(0, QN)).map(withChoices); if(!pool.length){ drawNumStart("問題が ないよ"); return; } mq = { list:pool, i:0, ok:0, picked:undefined, miss:[], review:!!list }; drawMaru(); }

  /* ── 🎯 模擬試験(本番と 同じ 形: 4つから 1つ・科目ごとの 問題数・時間。数字は meta.json の mock = 公式で 確かめた もの)──
     1問 = ⭕❌ の 文を 同じ 科目から 4つ ならべて「正しいもの(誤っているもの)は どれか」。ときどき 🔢 数字クイズも まざる。
     登録講習を 終えた 人は「免除科目」の 5問が なくなり、時間も 短く なる */
  let ex = null, exTimer = null, exempt = false;
  function buildItem(rs, used){
    const nums = NUM.filter(n => n.rs === rs && !used.has("n:" + n.id));
    if(nums.length && Math.random() < .12){ const n = shuffle(nums)[0]; used.add("n:" + n.id); return { t:"n", rs, n:withChoices(n), a:undefined }; }
    const pool = MARU.filter(m => m.rs === rs && !used.has("m:" + m.id)), wantTrue = Math.random() < .5;  // wantTrue = 「正しいものは どれか」
    const one = shuffle(pool.filter(m => m.a === wantTrue)), rest = shuffle(pool.filter(m => m.a !== wantTrue));
    if(!one.length || rest.length < 3) return null;
    const pick = [one[0]], tset = new Set([one[0].t || one[0].id]);
    for(const m of rest){ if(pick.length >= 4) break; const k = m.t || m.id; if(tset.has(k)) continue; tset.add(k); pick.push(m); }
    for(const m of rest){ if(pick.length >= 4) break; if(!pick.includes(m)) pick.push(m); }
    pick.forEach(m => used.add("m:" + m.id));
    const st = shuffle(pick);
    return { t:"m", rs, ask:wantTrue, st, ans:st.indexOf(one[0]), a:undefined };
  }
  function openExam(){ if(ex && !ex.end){ sheet("ai-ex"); drawExam(); return; } ex = null; sheet("ai-ex"); drawExam(); }
  function startExam(){
    const used = new Set(), list = [];
    for(const S of MOCK.subjects || []){ if(exempt && S.rs === "免除科目") continue; for(let i = 0; i < S.n; i++){ const it = buildItem(S.rs, used); if(it) list.push(it); } }
    if(!list.length) return;
    const min = exempt ? MOCK.exemptMin : MOCK.min;
    ex = { list, i:0, min, until:Date.now() + min * 60000, end:null, exempt };
    clearInterval(exTimer); exTimer = setInterval(tickExam, 1000); drawExam();
  }
  function tickExam(){
    if(!ex || ex.end){ clearInterval(exTimer); return; }
    const left = ex.until - Date.now(), el = document.getElementById("td-clock");
    if(left <= 0){ submitExam(true); return; }
    if(el){ const s = Math.ceil(left / 1000); el.textContent = "⏱ のこり " + Math.floor(s / 3600) + ":" + String(Math.floor(s / 60) % 60).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); el.classList.toggle("warn", s <= 600); }
  }
  const itemOk = it => it.t === "n" ? it.n.ch[it.a] === it.n.a : it.a === it.ans;
  function scoreExam(){
    let pts = 0; const by = {}, wrong = [];
    for(const it of ex.list){
      const ok = itemOk(it), b = by[it.rs] = by[it.rs] || { ok:0, n:0 }; b.n++;
      if(ok){ pts++; b.ok++; } else wrong.push(it);
      if(it.t === "n") missMark("n:" + it.n.id, ok);
      else if(it.a !== undefined){ const m = it.st[it.a]; if(!ok) missMark("m:" + m.id, false); }  // えらんだ 文が まちがいの もとなら 復習へ
      if(it.t === "m" && !ok) missMark("m:" + it.st[it.ans].id, false);
    }
    const max = ex.list.length + (ex.exempt ? 5 : 0); if(ex.exempt) pts += 5;  // 免除の 5問は 正解あつかい(本番と 同じ)
    return { pts, max, by, wrong };
  }
  function submitExam(timeUp){ if(!ex || ex.end) return; clearInterval(exTimer); ex.end = Object.assign(scoreExam(), { timeUp, used:Math.min(ex.min * 60000, ex.min * 60000 - (ex.until - Date.now())) }); drawExam(); const sh = document.getElementById("ai-ex"); if(sh) sh.scrollTop = 0; }
  function itemHtml(it, show){
    if(it.t === "n") return '<p class="ai-small">🔢 数字の 問題</p>' + (show ? numCard(it.n, it.a) : '<p class="ai-qq td-q">' + esc(it.n.q) + '</p><div class="ai-qch td-nch">' + it.n.ch.map((x, k) => '<button type="button" class="ai-btn' + (it.a === k ? " pk" : "") + '" data-td-xa="' + k + '"><b>' + "ABCD"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>');
    return '<p class="ai-qq td-q">' + (it.ask ? "つぎの うち、<b>正しい もの</b>は どれか。" : "つぎの うち、<b>誤っている もの</b>は どれか。") + '</p><ol class="td-st">' +
      it.st.map((m, k) => '<li class="' + (show ? (k === it.ans ? "ok" : k === it.a ? "ng" : "") : (it.a === k ? "pk" : "")) + '">' +
        (show ? '<p>' + esc(m.q) + '</p><small>' + OX(m.a) + " " + esc(m.w) + (m.lw ? "(" + esc(m.lw) + ")" : "") + '</small>' : '<button type="button" data-td-xa="' + k + '"><b>' + (k + 1) + '</b> ' + esc(m.q) + '</button>') + '</li>').join("") + '</ol>';
  }
  function drawExam(){
    const sh = document.getElementById("ai-ex"), E = ex;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🎯 模擬試験</h2>';
    const pp = MOCK.pastPass || [];
    const lo = pp.length ? Math.min(...pp.map(p => p.pt)) : 0, hi = pp.length ? Math.max(...pp.map(p => p.pt)) : 0;
    if(!E){
      h += '<p class="ai-qlead">本番と 同じ <b>4つから 1つ えらぶ ' + MOCK.n + '問・' + (MOCK.min / 60) + '時間</b>。科目ごとの 問題数も 本番と 同じ(' + (MOCK.subjects || []).map(S => esc(S.rs) + " " + S.n).join("・") + ')。とちゅうで とじても つづきから できるよ。</p>' +
        '<label class="td-ex"><input type="checkbox" id="td-exempt"' + (exempt ? " checked" : "") + '> 登録講習を 終えた(' + esc(MOCK.exemptNote || "") + ')</label>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-td-xstart="1">はじめる(' + (exempt ? MOCK.n - 5 + "問・" + MOCK.exemptMin + "分" : MOCK.n + "問・" + MOCK.min + "分") + ')</button>' +
        (pp.length ? '<p class="ai-small">📏 合格の めやす: 過去の 合格点は <b>' + lo + '〜' + hi + '点</b>(' + pp.map(p => esc(p.y) + " " + p.pt + "点").join("・") + ')。<b>毎年 変わります</b>(' + esc(MOCK.checked || "") + ' に 確かめた)。</p>' : "") +
        '<p class="ai-note">' + esc(MOCK.note || "") + '問題は この ゲームが 作った もので、本物の 試験の 問題では ありません。模擬試験で 何回も 合格点の はばを 上回れたら「受かる レベルに 近い」しるし。本当の 試験の 前には 最新の テキストと 試験の 案内で 確かめてね。</p>';
    }else if(E.end){
      const R = E.end, pass = pp.length && R.pts >= hi, near = pp.length && R.pts >= lo;
      h += '<div class="td-res ' + (pass ? "pass" : near ? "near" : "fail") + '"><b>' + (pass ? "🎉 合格点の はばを 上回った！" : near ? "👍 合格点の はばの 中" : "💪 もう少し") + '</b><span>' + R.pts + ' / ' + R.max + ' 点</span><small>' +
        (pp.length ? "過去の 合格点 " + lo + "〜" + hi + "点・" : "") + (E.exempt ? "免除 5問は 正解あつかい・" : "") + (R.timeUp ? "⏱ 時間 切れ" : "かかった 時間 " + Math.ceil(R.used / 60000) + "分") + '</small></div>' +
        '<table class="td-by">' + RSO.filter(k => R.by[k]).map(k => '<tr><th>' + esc(k) + '</th><td>' + R.by[k].ok + ' / ' + R.by[k].n + '</td><td><i style="--w:' + (R.by[k].ok / R.by[k].n * 100).toFixed(0) + '%"></i></td></tr>').join("") + '</table>' +
        (R.wrong.length ? '<p class="ai-small">🔁 まちがえた 問題(' + R.wrong.length + ')。もとに なった 文は「❌ まちがえた 問題」に 入るよ</p>' + R.wrong.map(it => '<div class="td-rvb">' + itemHtml(it, true) + '</div>').join("") : '<p class="ai-empty">まちがい なし！ 🎉</p>') +
        '<button type="button" class="ai-btn ai-wide ai-go" data-td-xstart="1">もう一度(ちがう 問題で)</button><button type="button" class="ai-btn ai-wide" data-td-xreset="1">はじめの 画面へ</button>';
    }else{
      const it = E.list[E.i], done = E.list.filter(x => x.a !== undefined).length;
      h += '<p class="td-exhead"><span id="td-clock">⏱</span><span>' + (E.i + 1) + ' / ' + E.list.length + '問 ・ 答えた ' + done + '</span></p><p class="ai-small ai-muted">📝 ' + esc(it.rs) + '</p>' + itemHtml(it, false) +
        '<div class="td-exnav"><button type="button" class="ai-btn" data-td-xgo="-1"' + (E.i ? "" : " disabled") + '>← まえ</button><button type="button" class="ai-btn" data-td-xgo="1"' + (E.i + 1 < E.list.length ? "" : " disabled") + '>つぎ →</button></div>' +
        '<div class="td-exmap">' + E.list.map((x, k) => '<button type="button" data-td-xj="' + k + '" class="' + (x.a !== undefined ? "a" : "") + (k === E.i ? " on" : "") + '">' + (k + 1) + '</button>').join("") + '</div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-td-xsubmit="1">答案を 出す(採点する)</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-ex");
    const cb = sh.querySelector("#td-exempt"); if(cb) cb.onchange = e => { exempt = e.target.checked; drawExam(); };
    if(E && !E.end) tickExam();
  }

  /* ── ❌ まちがえた 問題(⭕❌ と 数字。10こずつ) ── */
  function openReview(){
    const keys = shuffle(missList()).slice(0, QN);
    const list = keys.map(k => k[0] === "m" ? MBY.get(k.slice(2)) : withChoices(NBY.get(k.slice(2))));
    if(!list.length){ const sh = sheet("ai-mq"); sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>❌ まちがえた 問題</h2><p class="ai-empty">まちがえた 問題は ないよ 🎉<br>⭕❌ 一問一答・数字クイズ・模擬試験で まちがえると、ここに 入るよ。2回 つづけて 正解すると 消えるよ。</p></div>'; sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq"); return; }
    sheet("ai-mq"); mq = { list, i:0, ok:0, picked:undefined, miss:[], review:true }; drawMaru();
  }

  /* ── おす(宅建士だけの ボタン) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-td-ox],[data-td-nans],[data-td-mstart],[data-td-mnext],[data-td-nstart],[data-td-xstart],[data-td-xa],[data-td-xgo],[data-td-xj],[data-td-xsubmit],[data-td-xreset]");
    if(!t) return;
    const play = () => { if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return false; } return true; };
    const ds = t.dataset, top = id => { const sh = document.getElementById(id); if(sh) sh.scrollTop = 0; };
    if(ds.tdOx) return answerMaru(ds.tdOx === "1");
    if(ds.tdNans) return answerMaru(+ds.tdNans);
    if(ds.tdMstart){ if(play()) startMaru(); return; }
    if(ds.tdNstart){ if(play()) startNum(); return; }
    if(ds.tdMnext){ mq.i++; mq.picked = undefined; drawMaru(); top("ai-mq"); return; }
    if(ds.tdXstart){ if(ex && !ex.end && !confirm("いまの 試験を やめて、新しく はじめますか?")) return; if(play()){ ex = null; startExam(); top("ai-ex"); } return; }
    if(ds.tdXa){ ex.list[ex.i].a = +ds.tdXa; drawExam(); return; }
    if(ds.tdXgo){ ex.i = Math.max(0, Math.min(ex.list.length - 1, ex.i + +ds.tdXgo)); drawExam(); top("ai-ex"); return; }
    if(ds.tdXj){ ex.i = +ds.tdXj; drawExam(); top("ai-ex"); return; }
    if(ds.tdXsubmit){ const left = ex.list.filter(x => x.a === undefined).length; if(left && !confirm("まだ 答えていない 問題が " + left + "問 あります。採点しますか?")) return; submitExam(false); return; }
    if(ds.tdXreset){ ex = null; drawExam(); return; }
  });

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],.ai-node");
    if(!t) return;
    if(t.dataset.aiTerm) return detail(t.dataset.aiTerm);
    if(t.dataset.aiBack){ trail.pop(); const id = trail[trail.length - 1]; if(id){ trail.pop(); detail(id); } return; }
    if(t.dataset.aiFav){ toggleFav(t.dataset.aiFav); trail.pop(); detail(t.dataset.aiFav); if(document.getElementById("ai-zk") && !document.getElementById("ai-zk").classList.contains("hidden")) drawZukan(); home(mode); return; }
    if(t.dataset.aiMore){ zf.shown += 180; return drawZukan(); }
    if(t.dataset.aiAns) return answerQuiz(+t.dataset.aiAns);
    if(t.dataset.aiQstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startQuiz(); }  // 登録なしの 体験が おわったら クイズも 止める(2026-09-30)
    if(t.dataset.aiQnext){ quiz.i++; quiz.picked = null; const sh = document.getElementById("ai-qz"); drawQuiz(); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiOpen){
      const o = t.dataset.aiOpen;
      if(!["zukan", "fav"].includes(o) && typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; }  // 図鑑・お気に入りは 読むだけなので そのまま
      if(o === "zukan") return openZukan({});
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
      if(o === "maru") return openMaru();
      if(o === "exam") return openExam();
      if(o === "num") return openNum();
      if(o === "review") return openReview();
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

  /* ── 見た目(この ページだけ。未来・テクノロジー・知識が つながる。明るく、むずかしそうに しない) ── */
  const css = `
.td-charts h4{margin:12px 0 6px;font-size:14px}.td-flow{margin:0;padding-left:22px;font-size:13px;line-height:1.9}
.td-tb{width:100%;border-collapse:collapse;font-size:12px;background:#fff}.td-tb th,.td-tb td{border:1px solid #dee2e6;padding:4px 5px;text-align:left;vertical-align:top}.td-tb th{background:#f1f3f5}
.td-yo{display:grid;gap:6px}.td-yo div{border-left:6px solid var(--c);background:#fff;border-radius:8px;padding:6px 8px;display:flex;flex-wrap:wrap;gap:4px;font-size:12px}.td-yo b{width:100%}.td-yo span{background:#f8f9fa;border-radius:6px;padding:1px 6px}
.td-svg{display:block;width:100%;max-width:320px;margin:0 auto}
.td-q{font-size:15.5px;line-height:1.9}.td-ox{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:4px 0 6px}
.td-oxb{font:inherit;font-size:30px;padding:10px 0;border-radius:16px;border:2px solid #c7d2fe;background:#fff;cursor:pointer;line-height:1}
.td-oxb.pk{border-color:#1c7ed6;background:#e7f5ff;box-shadow:0 0 0 2px #1c7ed6 inset}.td-oxb.ok{background:#dcfce7;border-color:#22c55e}.td-oxb.ng{background:#fee2e2;border-color:#ef4444}.td-oxb:disabled{cursor:default}
.td-law{display:block;color:#64748b;font-size:11.5px;margin-top:4px}
.td-nch .ai-btn.pk{border-color:#1c7ed6;background:#e7f5ff}
.td-st{list-style:none;padding:0;margin:0 0 6px;display:grid;gap:8px}.td-st li{border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;overflow:hidden}
.td-st li button{all:unset;display:block;box-sizing:border-box;width:100%;padding:8px 10px;font-size:13.5px;line-height:1.7;cursor:pointer}.td-st li button b{color:#1c7ed6;margin-right:4px}
.td-st li.pk{border-color:#1c7ed6;background:#e7f5ff;box-shadow:0 0 0 2px #1c7ed6 inset}.td-st li.ok{border-color:#22c55e;background:#f0fdf4}.td-st li.ng{border-color:#ef4444;background:#fef2f2}
.td-st li p{margin:0;padding:6px 10px 0;font-size:13px;font-weight:700;line-height:1.6}.td-st li small{display:block;padding:2px 10px 6px;font-size:12px;color:#475569;line-height:1.6}
.td-ex{display:flex;gap:8px;align-items:center;font-size:13px;font-weight:700;margin:4px 0 8px}
.td-exhead{display:flex;justify-content:space-between;font-weight:900;font-size:13px;margin:0 0 6px;position:sticky;top:-14px;background:#fff;padding:6px 0;z-index:2}#td-clock{color:#1c7ed6;font-variant-numeric:tabular-nums}#td-clock.warn{color:#e03131}
.td-exnav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.td-exmap{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.td-exmap button{width:30px;height:28px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font:inherit;font-size:11px;color:#94a3b8;cursor:pointer}
.td-exmap button.a{background:#e7f5ff;border-color:#74c0fc;color:#1864ab}.td-exmap button.on{outline:2px solid #1c7ed6}
.td-res{text-align:center;border-radius:16px;padding:14px;margin:6px 0 12px}.td-res.pass{background:#dcfce7}.td-res.near{background:#fff9db}.td-res.fail{background:#fff4e6}.td-res b{display:block;font-size:20px}.td-res span{display:block;font-size:22px;font-weight:900}.td-res small{color:#475569}
.td-by{width:100%;border-collapse:collapse;font-size:13px;margin:0 0 10px}.td-by th{text-align:left;font-weight:800;padding:3px 4px}.td-by td{padding:3px 4px;font-variant-numeric:tabular-nums;white-space:nowrap}.td-by td:last-child{width:40%}
.td-by i{display:block;height:8px;border-radius:99px;background:#e2e8f0;position:relative;overflow:hidden}.td-by i::after{content:"";position:absolute;inset:0;width:var(--w);background:#1c7ed6}
.td-rv{border-left:4px solid #fa5252;background:#fff5f5;border-radius:8px;padding:6px 10px;margin:6px 0;font-size:13px;line-height:1.7}.td-rv p{margin:0 0 2px;font-weight:700}
.td-rvb{border-top:1px dashed #e2e8f0;padding-top:6px;margin-top:8px}
.ai-btns .td-big{grid-column:1/-1;background:#1c7ed6;border-color:#1c7ed6;color:#fff}
.map-card{display:none}
.ai-panel{background:linear-gradient(160deg,#e7f5ff 0%,#f1f5f9 55%,#eff6ff 100%);border:1px solid #a5d8ff;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#1c7ed6;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#1c7ed6,#e67700,#1971c2);border-radius:99px}
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
.ai-dtabs{display:flex;gap:6px;overflow-x:auto;margin:0 0 8px;padding-bottom:2px}
.ai-dtabs button{flex:none;padding:6px 10px;border-radius:99px;border:1.5px solid #e2e8f0;background:#f8fafc;color:#334155;font:inherit;font-size:12px;font-weight:800}
.ai-dtabs button.on{background:#1c7ed6;border-color:#1c7ed6;color:#fff}
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
.ai-learn .ai-ko{color:#0b7285;font-weight:700}.ai-fm code{font-family:ui-monospace,Menlo,monospace;font-size:15px;color:#0c4a6e;background:#fff;border-radius:6px;padding:1px 6px}.ai-rs{display:inline-block;margin-left:4px;background:#fff4e6;color:#d9480f;border:1px solid #ffc078;border-radius:99px;padding:0 7px;font-weight:800}
.ai-learn.ai-hint{background:var(--soft);border-color:var(--line);color:var(--muted)}
@keyframes aiIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.ai-q{display:flex;gap:12px;align-items:center;margin:0 0 10px}.ai-q .spot{font-size:clamp(22px,7vw,30px);line-height:1.2;word-break:break-word;margin:0}
.ai-ic{font-size:36px;width:58px;height:58px;display:grid;place-items:center;background:linear-gradient(135deg,#e0e7ff,#a5f3fc);border-radius:16px;flex:none}
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
.ai-zsum{text-align:center;margin:4px 0 8px}.ai-zsum b{font-size:22px;color:#1c7ed6}
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
.ai-qlead{font-size:13.5px;line-height:1.8;margin:4px 0 10px}.ai-qset{grid-template-columns:1fr 1fr}.ai-go{background:#1c7ed6;border-color:#1c7ed6;color:#fff}
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#1c7ed6}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"takkenterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
