/* フリック社労士: 社会保険労務士試験の ことばを、フリックで 打って おぼえる。(けいくん 2026-11-11「社会保険労務士に 受かるレベルに フリック問題で なれるように」。名前は「フリック社労士」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「社労士の 旅」を 足す ファイル。sharoshi/ の ページだけが 読む ─
   ことばは tools/sharoshi/meta.json + tools/sharoshi/terms-*.json(+ maru-*.json・num-*.json・sentaku-*.json)→ tools/sharoshi/terms_js.py が data/sharoshi.json と sharoshi/terms.js(SHAROSHI_TERMS)に する。
   **ことば・問題を 足す・直すのは tools/sharoshi/ の json だけ**
   ・もとは フリック衛生管理者(eisei/eisei.js)を 写して 作った。見た目の class 名(ai-… / ek-…)は この ページだけの CSS
   ・旅は 10(試験の 科目 そのまま)+ 🏆 マスター。1,000語(旅ごとに 入門15・中級30・上級55)。terms-<旅>.json が ある 旅だけ 出る
   ・こたえると 説明・📘 法律・📝 科目の 札が 出る。図鑑は 📝 札でも しぼれる
   ・⭕❌ 一問一答・🔢 数字クイズ・📝 選択式の 練習(空欄 1つを 5つから)・🎯 模擬試験(択一式: 5択・70問・210分・科目ごとの 基準点 + 過去の 総得点の 基準点の はば)・❌ まちがえた 問題(宅建士・衛生管理者と 同じ 例外)・🧩 4択クイズ
   ⚠️ ことばを おぼえる ゲーム。本当の 試験の 前には 最新の テキストと 試験の 案内で 確かめる */
const SHAROSHI = (() => {
  const D = SHAROSHI_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に rmroki … rmmas を 足した(speed-king 2026-11-11)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { roki:"rmroki", anei:"rmanei", rosai:"rmrosai", koyo:"rmkoyo", choshu:"rmchoshu", roichi:"rmroichi", shaichi:"rmshaichi", kenpo:"rmkenpo", kosei:"rmkosei", kokunen:"rmkokunen" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"sharoshiterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
  /* マスター: 10の 旅を まぜて ぜんぶ(きまった ならび。どの ステージも いつも 同じ 10語 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.slice().sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.rmmas = lv; pools.rmmas = ALL; colors.rmmas = "#2b8a3e";
    maps.rmmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　10の 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  const MODES_ALL = JR.map(J => MODE_OF[J.id]).concat(JR.length > 1 ? ["rmmas"] : []);  // まだ 作っていない 旅は 出さない(マスターは 旅が 2つ 以上に なってから)

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-sharoshi[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-sharoshi-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-sharoshi");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-sharoshi"), JSON.stringify(v)); memo = { k:pkey("flick-sharoshi"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-sharoshi-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-sharoshi-fav"), JSON.stringify(a)); return i < 0; }
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

  /* ── 📊 社労士の 図(ホーム。<details> で たたむ。数字は tools/sharoshi/facts-A.md で 確かめた もの)──
     ⚠️ いまは 労働基準法の 図だけ(見本)。旅を 足したら その 旅の 図を ここに 足す(労働保険と 社会保険の 全体図・年金の 2階建て・給付の 比べ表・基本手当の 日数・時効の 表・標準報酬の 決めかた) */
  function ekCharts(){
    const tr = (h, c) => '<tr><th>' + h + '</th>' + c.map(x => '<td>' + x + '</td>').join("") + '</tr>';
    const has = j => JR.some(J => J.id === j);
    let h = '<details class="ai-diag ek-charts"><summary class="ai-dh">📊 社労士の 図を ひらく <small>保険の 全体図・労働時間と 割増・年休・基本手当の 日数・休むときの お金・年金の 2階建て・標準報酬・時効</small></summary>';
    h += '<h4>🗺 労働保険と 社会保険(10の 旅の 地図)</h4><table class="ek-tb"><tr><th>なかま</th><th>法律(旅)</th><th>だれの ため</th></tr>' +
      tr("働く ルール", ["労働基準法・労働安全衛生法・労働の 一般常識", "働く 人 と 会社"]) +
      tr("労働保険", ["労災保険法・雇用保険法(お金は 徴収法で 集める)", "仕事中の けが / 失業・育休・学び"]) +
      tr("社会保険", ["健康保険法・厚生年金保険法・国民年金法・社会保険の 一般常識", "病気・出産 / 老後・障害・遺族"]) + '</table>';
    if(has("roki")) h +=
      '<h4>⏱ 労働時間と 休憩・休日(労基法32・34・35条)</h4><table class="ek-tb">' + tr("法定労働時間", ["1週 40時間・1日 8時間(休憩を 除く)"]) + tr("特例", ["商業・映画演劇・保健衛生・接客娯楽で 常時 10人未満 → 1週 44時間"]) +
        tr("休憩", ["6時間を こえる → 45分 / 8時間を こえる → 1時間(途中に・一斉に・自由に)"]) + tr("休日", ["毎週 1回 / 4週間で 4日"]) + '</table>' +
      '<h4>🔄 変形労働時間制(労基法32条の2〜5)</h4><table class="ek-tb"><tr><th>しくみ</th><th>決めかた</th><th>届出</th></tr>' +
        tr("1か月単位", ["労使協定 または 就業規則", "協定なら いる"]) + tr("フレックスタイム", ["就業規則 + 労使協定(清算期間 3か月以内)", "1か月を こえる とき"]) +
        tr("1年単位", ["労使協定(1日 10時間・1週 52時間。3か月を こえる 期間なら 年 280日)", "いる"]) + tr("1週間単位(非定型)", ["労使協定(小売・旅館・飲食で 30人未満・1日 10時間)", "いる"]) + '</table>' +
      '<h4>📝 時間外労働の 上限(労基法36条)</h4><table class="ek-tb">' + tr("ふだんの 限度", ["1か月 45時間・1年 360時間(1年単位の 変形で 3か月超は 42時間・320時間)"]) +
        tr("特別条項", ["1年 720時間 以内・限度を こえる 月は 年 6か月 まで"]) + tr("いつも 守る", ["時間外 + 休日で 1か月 100時間 未満・2〜6か月 平均 80時間 以内"]) + '</table>' +
      '<h4>💴 割増賃金(労基法37条)</h4><table class="ek-tb">' + tr("時間外", ["2割5分 以上(1か月 60時間を こえた ぶんは 5割 以上)"]) + tr("休日", ["3割5分 以上"]) + tr("深夜(午後10時〜午前5時)", ["2割5分 以上"]) + '</table>' +
      '<h4>🏖 年次有給休暇(労基法39条。6か月・8割 出勤で)</h4><table class="ek-tb"><tr><th>つとめた 期間</th><th>6か月</th><th>1年6か月</th><th>2年6か月</th><th>3年6か月</th><th>4年6か月</th><th>5年6か月</th><th>6年6か月〜</th></tr>' +
        tr("日数", ["10日", "11日", "12日", "14日", "16日", "18日", "20日"]) + '</table>' +
        '<p class="ai-small ai-muted">10日 以上 もらう 人には、使用者が 1年に 5日を 時季を 決めて 取らせる。時間単位は 労使協定で 5日 まで。計画的付与は 5日を こえる ぶん</p>' +
      '<h4>🚪 解雇の 30日(労基法19・20条)</h4><table class="ek-tb">' + tr("解雇予告", ["少なくとも 30日前(または 30日分 以上の 平均賃金)"]) + tr("解雇制限", ["業務上の けがや 病気の 休業中 + その後 30日 / 産前産後の 休業中 + その後 30日"]) + '</table>' +
      '<h4>🗂 記録の 保存と 時効(労基法109・115・143条)</h4><table class="ek-tb">' + tr("労働者名簿・賃金台帳 など", ["5年(当分の間 3年)"]) + tr("賃金の 請求権", ["5年(当分の間 3年)"]) + tr("退職手当", ["5年"]) + tr("災害補償・年休 など", ["2年"]) + '</table>';
    if(has("koyo")) h +=
      '<h4>💼 基本手当の 所定給付日数(雇用保険法22・23条)</h4><table class="ek-tb">' +
        tr("一般の 離職者(自己都合・定年 など)", ["加入 10年未満 90日 / 10〜20年 120日 / 20年以上 150日"]) +
        tr("特定受給資格者(倒産・解雇 など)", ["年齢と 加入期間で 90日〜330日"]) + tr("就職困難者", ["150日〜360日"]) +
        tr("待期", ["7日(この あいだは 出ない)"]) + tr("受給期間", ["やめた 日の 翌日から 1年"]) + '</table>';
    if(has("rosai") || has("kenpo")) h +=
      '<h4>🛏 休んで お給料が 出ない ときの お金</h4><table class="ek-tb"><tr><th>なに</th><th>待期</th><th>額</th></tr>' +
        (has("rosai") ? tr("労災の 休業(補償)給付", ["3日(業務災害なら この 3日は 会社が 休業補償)", "給付基礎日額の 60% + 休業特別支給金 20%"]) : "") +
        (has("kenpo") ? tr("健保の 傷病手当金(仕事 以外の 病気・けが)", ["3日", "標準報酬日額の 3分の2(通算 1年6か月)"]) : "") +
        (has("roki") ? tr("労基法の 休業手当(会社の 都合で 休み)", ["—", "平均賃金の 60% 以上"]) : "") + '</table>';
    if(has("kokunen") || has("kosei")) h +=
      '<h4>🏦 年金は 2階建て</h4><div class="ek-yo">' +
        '<div style="--c:#1971c2"><b>2階 厚生年金(会社員・公務員)</b><span>給料に 比例(報酬比例)</span><span>保険料率 18.3%(会社と 半分ずつ)</span></div>' +
        '<div style="--c:#5c7cfa"><b>1階 国民年金(20歳〜60歳の みんな)</b><span>老齢基礎年金の 満額 847,300円(令和8年度・年額)</span><span>保険料 月 17,920円(令和8年度)</span></div></div>' +
      '<table class="ek-tb">' + tr("受給資格期間", ["10年"]) + tr("繰上げ / 繰下げ", ["1か月 0.4% へる / 1か月 0.7% ふえる(75歳まで・最大 84%)"]) +
        tr("在職老齢年金の 基準額", ["65万円(令和8年度)"]) + tr("障害基礎年金", ["1級は 2級の 1.25倍"]) + '</table>';
    if(has("kenpo") || has("kosei")) h +=
      '<h4>📊 標準報酬(保険料と 給付の もとに なる 月の 給料)</h4><table class="ek-tb"><tr><th></th><th>健康保険</th><th>厚生年金</th></tr>' +
        tr("等級", ["50等級", "32等級"]) + tr("標準賞与額の 上限", ["年度で 573万円", "1か月 150万円"]) + '</table>' +
        '<p class="ai-small ai-muted">決めかた: 入った とき(資格取得時決定)/ 毎年 4〜6月の 給料で 9月から(定時決定)/ 2等級 以上 かわったら 4か月目から(随時改定)</p>';
    h += '<h4>⏳ 時効(いつまで 請求できるか)</h4><table class="ek-tb">' +
      tr("2年", ["労災・雇用・健保の 給付 / 保険料 / 労基法の 賃金 以外(年休 など)"]) + tr("5年", ["年金を 受ける 権利(厚生年金・国民年金)/ 労災の 障害・遺族(補償)給付"]) +
      tr("5年(当分の間 3年)", ["労基法の 賃金"]) + '</table>';
    return h + '</details>';
  }
  /* ── ホーム: 見つけた ことば・称号・しくみ図・旅マップ ── */
  let diagCur = null;
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n), td = todayWords().length, fv = favs().length;
    const jr = JR.map(J => { const all = pools[MODE_OF[J.id]], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + J.icon + " " + J.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + got + '</b> / ' + all.length + '</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%;--c:' + J.color + '"></i></li>'; }).join("");
    if(JOURNEY_OF[m]) diagCur = JBY[JOURNEY_OF[m]].diagram;
    if(!diagCur) diagCur = DIAGS[0];
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 ことば図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="maru">⭕❌ 一問一答</button>' +
      '<button type="button" class="ai-btn ek-big" data-ai-open="exam">🎯 模擬試験</button>' +
      '<button type="button" class="ai-btn" data-ai-open="num">🔢 数字クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="sentaku">📝 選択式の 練習</button>' +
      '<button type="button" class="ai-btn" data-ai-open="review">❌ まちがえた 問題' + (missList().length ? "(" + missList().length + ")" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
      ekCharts() + '<p class="ai-note">' + esc(D.note) + '</p></section>';
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
    }else chips.innerHTML = '<p class="ai-lead">10の 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "rmmas") return { name:"マスター" + (i + 1), sub:"10の 旅から 10語", short:"マスター" + (i + 1) };
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
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 産業医)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-zf" style="grid-template-columns:1fr"><select id="ai-zr">' + opt("", "📝 科目(ぜんぶ)", zf.rs) + RSO.filter(r => ALL.some(q => q.rs === r)).map(r => opt(r, "📝 " + r, zf.rs)).join("") + '</select></div>' +
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
      h += '<p class="ai-qlead">ことばの 意味を たしかめる 練習だよ。4つの 中から 1つ えらんでね(本番は 5択)。' + QN + '問。</p>' +
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

  /* ════ ここから 社労士だけの しくみ(衛生管理者の 形を 写した。けいくん 2026-11-11「受かるレベルに」)════
     ⭕❌ 一問一答(ひっかけの 練習)・🔢 数字クイズ(日数・年数・%)・📝 選択式の 練習・🎯 模擬試験(択一式: 5つから 1つ・70問・210分・科目ごとの 基準 + 過去の 総得点の はば)・
     ❌ まちがえた 問題の 復習
     ⚠️ ❌ 復習は シリーズの「スピード記録勝負」の 例外(運転免許・宅建士に つづく)。ほかの ゲームに 広げない */
  const MARU = (D.maru || []).map(m => Object.assign({}, m, { jr:JBY[m.j] }));
  const MBY = new Map(MARU.map(m => [m.id, m]));
  const NUM = (D.num || []).map(n => Object.assign({}, n, { jr:JBY[n.j] }));
  const NBY = new Map(NUM.map(n => [n.id, n]));
  const SEN = (D.sentaku || []).map(n => Object.assign({}, n, { jr:JBY[n.j], s:true }));  // 📝 選択式(条文の 空欄 1つを 5つの 語から)
  const SBY = new Map(SEN.map(n => [n.id, n]));
  const MOCK = D.mock || {};
  const OX = a => a ? "⭕" : "❌";
  const RSO = ["労基・安衛", "労災", "雇用", "徴収", "労一", "社一", "健保", "厚年", "国年"];

  /* ── ❌ まちがえた 問題(端末に おぼえる。ログイン して いれば かずともの 記録と いっしょ = recSet)──
     flick-sharoshi-miss[-p<id>] = { "m:<⭕❌のid>" | "n:<数字クイズのid>": つづけて 正解した 回数 }。2回 つづけて 正解で 消える */
  function missGet(){ try{ const v = JSON.parse(recGet(pkey("flick-sharoshi-miss")) || "{}"); return v && typeof v === "object" ? v : {}; }catch(e){ return {}; } }
  function missSet(v){ recSet(pkey("flick-sharoshi-miss"), JSON.stringify(v)); }
  function missMark(key, ok){
    const v = missGet();
    if(!ok) v[key] = 0;
    else if(key in v){ v[key]++; if(v[key] >= 2) delete v[key]; }
    missSet(v);
  }
  const missList = () => Object.keys(missGet()).filter(k => k[0] === "m" ? MBY.has(k.slice(2)) : k[0] === "s" ? SBY.has(k.slice(2)) : NBY.has(k.slice(2)));
  const blank = (q, fill) => esc(q).replace("【　】", fill == null ? '<span class="ek-blank">\u3000？\u3000</span>' : '<span class="ek-blank on">' + esc(fill) + '</span>');
  const termChip = id => { const q = BY.get(id); return q ? chip(q) : ""; };
  const lawTag = s => s ? '<small class="ek-law">📚 ' + esc(s) + '</small>' : "";

  /* ── ⭕❌ 1問の 画面 ── */
  function maruCard(m, picked){
    let h = '<p class="ai-qq ek-q">' + esc(m.q) + '</p><div class="ek-ox">' +
      [true, false].map(v => '<button type="button" class="ek-oxb' + (picked === undefined ? "" : (v === m.a ? " ok" : v === picked ? " ng" : "")) + (picked === v ? " pk" : "") + '" data-ek-ox="' + (v ? 1 : 0) + '"' + (picked === undefined ? "" : " disabled") + '>' + OX(v) + '</button>').join("") + '</div>';
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
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>' + (Q && Q.review ? "❌ まちがえた 問題" : Q && Q.list[0] && Q.list[0].s ? "📝 選択式の 練習" : Q && Q.list[0] && Q.list[0].o ? "🔢 数字クイズ" : "⭕❌ 一問一答") + '</h2>';
    if(!Q){
      h += '<p class="ai-qlead">文を 読んで 正しければ ⭕・まちがいなら ❌。本番の 5択は、この 見分けの 力で 解けるよ。<b>「30日前 / 30日分」「6時間を こえる / 6時間 以上」「届出 / 許可 / 認定」「意見を 聴く / 同意」「労使協定 / 就業規則」「5年(当分 3年)/ 2年」</b>の ような ひっかけに 気を つけてね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="ek-mj">' + opt("", "🧭 ぜんぶの 旅", mset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, mset.j)).join("") + '</select>' +
        '<select id="ek-md">' + opt("", "📶 ぜんぶ", mset.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, mset.dv)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの 問題: ' + mPool().length + '問(ぜんぶで ' + MARU.length + '問)</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ek-mstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームが 法令の 条文と 公的な 資料を もとに 作った もので、本物の 試験の 問題では ありません。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.review ? '<p class="ai-small ai-muted">2回 つづけて 正解すると「まちがえた 問題」から 消えるよ。のこり ' + missList().length + '問</p>' : "") +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた 問題</p>' + Q.miss.map(m => m.o ? '<div class="ek-rv"><p>' + esc(m.q) + '</p><b>答え ' + esc(m.a) + '</b> ' + esc(m.w) + '</div>' : '<div class="ek-rv"><p>' + esc(m.q) + '</p><b>答え ' + OX(m.a) + '</b> ' + esc(m.w) + '</div>').join("") : "") +
        (Q.review ? '<button type="button" class="ai-btn ai-wide ai-go" data-ai-open="review">もう一度</button>' :
          (Q.list[0] && Q.list[0].s ? '<button type="button" class="ai-btn ai-wide ai-go" data-ek-sstart="1">もう一度</button><button type="button" class="ai-btn ai-wide" data-ai-open="sentaku">はんいを えらびなおす</button>' : Q.list[0] && Q.list[0].o ? '<button type="button" class="ai-btn ai-wide ai-go" data-ek-nstart="1">もう一度</button><button type="button" class="ai-btn ai-wide" data-ai-open="num">はんいを えらびなおす</button>' : '<button type="button" class="ai-btn ai-wide ai-go" data-ek-mstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="maru">はんいを えらびなおす</button>'));
    }else{
      const m = Q.list[Q.i];
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + m.jr.icon + " " + esc(m.jr.name) + (m.dv ? " ・ " + LVN[m.dv].icon + " " + esc(LVN[m.dv].name) : m.s ? " ・ 📝 選択式" : " ・ 🔢 数字") + '</span></p>' + (m.o ? numCard(m, Q.picked) : maruCard(m, Q.picked));
      if(Q.picked !== undefined) h += '<button type="button" class="ai-btn ai-wide ai-go" data-ek-mnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const j = sh.querySelector("#ek-mj"), d = sh.querySelector("#ek-md");
    if(j) j.onchange = e => { mset.j = e.target.value; drawMaru(); };
    if(d) d.onchange = e => { mset.dv = e.target.value; drawMaru(); };
  }
  function answerMaru(v){ const Q = mq, m = Q && Q.list[Q.i]; if(!m || Q.picked !== undefined) return; Q.picked = v; const ok = m.o ? m.ch[v] === m.a : v === m.a; if(ok) Q.ok++; else Q.miss.push(m); missMark((m.s ? "s:" : m.o ? "n:" : "m:") + m.id, ok); drawMaru(); }

  /* ── 🔢 数字クイズ(数字を 4つから。10問) ── */
  const withChoices = n => Object.assign({}, n, { ch:shuffle(n.o) });
  function numCard(n, picked){
    const done = picked !== undefined;
    let h = '<p class="ai-qq ek-q">' + (n.s ? blank(n.q, done ? n.a : null) : esc(n.q)) + '</p><div class="ai-qch ek-nch">' + n.ch.map((x, k) => '<button type="button" class="ai-btn' + (done ? (x === n.a ? " ok" : k === picked ? " ng" : "") : "") + '" data-ek-nans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCDE"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>';
    if(done){ const ok = n.ch[picked] === n.a; h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は「" + esc(n.a) + "」") + '</b><p>' + esc(n.w) + '</p>' + lawTag(n.lw) + '</div>'; }
    return h;
  }
  let nset = { j:"" };
  const nPool = () => NUM.filter(n => !nset.j || n.j === nset.j);
  function openNum(){ mq = null; sheet("ai-mq"); drawNumStart(); }
  function drawNumStart(msg){
    const sh = document.getElementById("ai-mq");
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🔢 数字クイズ</h2>' +
      '<p class="ai-qlead">社労士は <b>数字が いちばん 多い</b> 試験。日数・年数・%・人数・時間を 4つから えらぼう。' + QN + '問。</p>' +
      '<div class="ai-zf ai-qset"><select id="ek-nj">' + opt("", "🧭 ぜんぶの 旅", nset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, nset.j)).join("") + '</select></div>' +
      '<p class="ai-small ai-muted">この はんいの 問題: ' + nPool().length + '問(ぜんぶで ' + NUM.length + '問)</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
      '<button type="button" class="ai-btn ai-wide ai-go" data-ek-nstart="1">はじめる</button>' +
      '<p class="ai-note">数字は ' + esc(D.asOf) + ' の 法律で 確かめた ものです。法律は 変わることが あるので、本当の 試験の 前には 最新の テキストで 確かめてね。</p></div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const j = sh.querySelector("#ek-nj"); if(j) j.onchange = e => { nset.j = e.target.value; drawNumStart(); };
  }
  /* ── 📝 選択式の 練習(本番は 1問に 空欄 5つ・語群 20。スマホで 読めるよう 空欄 1つを 5つの 語から。10問) ── */
  let sset = { j:"" };
  const sPool = () => SEN.filter(n => !sset.j || n.j === sset.j);
  function openSentaku(){ mq = null; sheet("ai-mq"); drawSenStart(); }
  function drawSenStart(msg){
    const sh = document.getElementById("ai-mq");
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📝 選択式の 練習</h2>' +
      '<p class="ai-qlead">本番の 選択式は <b>条文の 文の 空欄を うめる</b> 問題(8問・1問に 空欄 5つ・20の 語から・80分)。ここでは 空欄 1つを <b>5つの 語から</b> えらぶよ。数字・期間・だれが するか に 気を つけてね。' + QN + '問。</p>' +
      '<div class="ai-zf ai-qset"><select id="ek-sj">' + opt("", "🧭 ぜんぶの 旅", sset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, sset.j)).join("") + '</select></div>' +
      '<p class="ai-small ai-muted">この はんいの 問題: ' + sPool().length + '問(ぜんぶで ' + SEN.length + '問)</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
      '<button type="button" class="ai-btn ai-wide ai-go" data-ek-sstart="1">はじめる</button>' +
      '<p class="ai-note">文は ' + esc(D.asOf) + ' の 法令の 条文を もとに、読みやすく 短く した ものです。本物の 試験の 問題では ありません。選択式は 科目ごとの 基準点(5点中 ふつう 3点)が きびしいので、ことばを 正確に おぼえよう。</p></div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const j = sh.querySelector("#ek-sj"); if(j) j.onchange = e => { sset.j = e.target.value; drawSenStart(); };
  }
  function startSen(){ const pool = shuffle(sPool()).slice(0, QN).map(withChoices); if(!pool.length){ drawSenStart("問題が ないよ"); return; } mq = { list:pool, i:0, ok:0, picked:undefined, miss:[], review:false }; drawMaru(); }
  function startNum(list){ const pool = (list || shuffle(nPool()).slice(0, QN)).map(withChoices); if(!pool.length){ drawNumStart("問題が ないよ"); return; } mq = { list:pool, i:0, ok:0, picked:undefined, miss:[], review:!!list }; drawMaru(); }

  /* ── 🎯 模擬試験 = 択一式(本番と 同じ 形: 5つから 1つ・70問・210分。科目の 数は meta.json の mock = 厚生労働省の 実施の 告示で 確かめた もの)──
     1問 = ⭕❌ の 文を 同じ 科目から 5つ ならべて「正しいもの(誤っているもの)は どれか」。ときどき 🔢 数字クイズも まざる(こちらは 4択)。
     合格の きまりは 本番と 同じ 形: **総得点の 基準 かつ 科目ごとの 基準**。基準点は 毎年 補正されるので、総得点は「過去の 基準点の はば」(mock.pastPass)と くらべる。
     採点の 科目(MOCK.subjects)は 1科目 10点。労災保険法と 雇用保険法は 徴収法の 3問ずつを ふくむ(parts)。
     ⚠️ まだ 作っていない 科目は 出さない(見本の あいだは 労基・安衛 だけ。そのときは 科目の 基準だけで 判定し、総得点は 判定しない) */
  let ex = null, exTimer = null;
  const NCH = 5, SUBJ = MOCK.subjects || [], PAST = MOCK.pastPass || [];
  const passOf = S => S.pass != null ? S.pass : (MOCK.passEach || 4);
  function buildItem(rs, used){
    const inRs = x => rs.includes(x.rs);
    const nums = NUM.filter(n => inRs(n) && !used.has("n:" + n.id));
    if(nums.length && Math.random() < .12){ const n = shuffle(nums)[0]; used.add("n:" + n.id); return { t:"n", rs:n.rs, n:withChoices(n), a:undefined }; }
    const pool = MARU.filter(m => inRs(m) && !used.has("m:" + m.id)), wantTrue = Math.random() < .5;  // wantTrue = 「正しいものは どれか」
    const one = shuffle(pool.filter(m => m.a === wantTrue)), rest = shuffle(pool.filter(m => m.a !== wantTrue));
    if(!one.length || rest.length < NCH - 1) return null;
    const pick = [one[0]], tset = new Set([one[0].t || one[0].id]);
    for(const m of rest){ if(pick.length >= NCH) break; const k = m.t || m.id; if(tset.has(k)) continue; tset.add(k); pick.push(m); }
    for(const m of rest){ if(pick.length >= NCH) break; if(!pick.includes(m)) pick.push(m); }
    pick.forEach(m => used.add("m:" + m.id));
    const st = shuffle(pick);
    return { t:"m", rs:one[0].rs, ask:wantTrue, st, ans:st.indexOf(one[0]), a:undefined };
  }
  // いま 組める 科目(⭕❌ が 足りる 科目だけ)
  const ready = () => SUBJ.filter(S => S.parts.every(p => MARU.filter(m => p.rs.includes(m.rs)).length >= p.n * NCH));
  function openExam(){ if(ex && !ex.end){ sheet("ai-ex"); drawExam(); return; } ex = null; sheet("ai-ex"); drawExam(); }
  function startExam(){
    const used = new Set(), list = [], subs = ready();
    for(const S of subs) for(const p of S.parts) for(let i = 0; i < p.n; i++){ const it = buildItem(p.rs, used); if(it){ it.sub = S.name; list.push(it); } }
    if(!list.length) return;
    const full = list.length >= (MOCK.n || 70), min = full ? (MOCK.min || 210) : Math.max(10, Math.round((MOCK.min || 210) * list.length / (MOCK.n || 70)));
    ex = { list, i:0, min, until:Date.now() + min * 60000, end:null, full, subs };
    clearInterval(exTimer); exTimer = setInterval(tickExam, 1000); drawExam();
  }
  function tickExam(){
    if(!ex || ex.end){ clearInterval(exTimer); return; }
    const left = ex.until - Date.now(), el = document.getElementById("ek-clock");
    if(left <= 0){ submitExam(true); return; }
    if(el){ const s = Math.ceil(left / 1000); el.textContent = "⏱ のこり " + Math.floor(s / 3600) + ":" + String(Math.floor(s / 60) % 60).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); el.classList.toggle("warn", s <= 600); }
  }
  const itemOk = it => it.t === "n" ? it.n.ch[it.a] === it.n.a : it.a === it.ans;
  const pastLo = () => PAST.length ? Math.min(...PAST.map(p => p.total)) : null, pastHi = () => PAST.length ? Math.max(...PAST.map(p => p.total)) : null;
  function scoreExam(){
    let pts = 0; const by = {}, wrong = [];
    for(const it of ex.list){
      const ok = itemOk(it), b = by[it.sub] = by[it.sub] || { ok:0, n:0 }; b.n++;
      if(ok){ pts++; b.ok++; } else wrong.push(it);
      if(it.a === undefined) continue;  // 答えて いない 問題は 復習に 入れない
      if(it.t === "n") missMark("n:" + it.n.id, ok);
      else if(!ok){ missMark("m:" + it.st[it.a].id, false); missMark("m:" + it.st[it.ans].id, false); }  // えらんだ 文と 正解の 文を 復習へ
    }
    const low = ex.subs.filter(S => by[S.name] && by[S.name].ok < passOf(S)).map(S => S.name);
    const hi = pastHi(), lo = pastLo();
    const band = !ex.full || hi == null ? "" : pts >= hi ? "over" : pts >= lo ? "in" : "under";
    const pass = !low.length && (!ex.full || band === "over");
    return { pts, max:ex.list.length, by, wrong, low, band, pass };
  }
  function submitExam(timeUp){ if(!ex || ex.end) return; clearInterval(exTimer); ex.end = Object.assign(scoreExam(), { timeUp, used:Math.min(ex.min * 60000, ex.min * 60000 - (ex.until - Date.now())) }); drawExam(); const sh = document.getElementById("ai-ex"); if(sh) sh.scrollTop = 0; }
  function itemHtml(it, show){
    if(it.t === "n") return '<p class="ai-small">🔢 数字の 問題</p>' + (show ? numCard(it.n, it.a) : '<p class="ai-qq ek-q">' + esc(it.n.q) + '</p><div class="ai-qch ek-nch">' + it.n.ch.map((x, k) => '<button type="button" class="ai-btn' + (it.a === k ? " pk" : "") + '" data-ek-xa="' + k + '"><b>' + "ABCD"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>');
    return '<p class="ai-qq ek-q">' + (it.ask ? "つぎの うち、<b>正しい もの</b>は どれか。" : "つぎの うち、<b>誤っている もの</b>は どれか。") + '</p><ol class="ek-st">' +
      it.st.map((m, k) => '<li class="' + (show ? (k === it.ans ? "ok" : k === it.a ? "ng" : "") : (it.a === k ? "pk" : "")) + '">' +
        (show ? '<p>' + "ABCDE"[k] + " " + esc(m.q) + '</p><small>' + OX(m.a) + " " + esc(m.w) + (m.lw ? "(" + esc(m.lw) + ")" : "") + '</small>' : '<button type="button" data-ek-xa="' + k + '"><b>' + "ABCDE"[k] + '</b> ' + esc(m.q) + '</button>') + '</li>').join("") + '</ol>';
  }
  const pastHtml = () => PAST.length ? '<table class="ek-tb ek-past"><tr><th>年度</th><th>択一式の 総得点</th><th>科目ごと</th></tr>' + PAST.map(p => '<tr><th>' + esc(p.year) + '</th><td>' + p.total + '点 以上</td><td>' + esc(p.each) + '</td></tr>').join("") + '</table>' +
    '<p class="ai-small ai-muted">基準点は 毎年 補正されます(' + esc(MOCK.checked || "") + 'に 厚生労働省の 発表で 確かめた)。</p>' : "";
  function drawExam(){
    const sh = document.getElementById("ai-ex"), E = ex, subs = ready();
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🎯 模擬試験(択一式)</h2>';
    const total = subs.reduce((a, S) => a + S.parts.reduce((b, p) => b + p.n, 0), 0), full = total >= (MOCK.n || 70);
    const mins = full ? (MOCK.min || 210) : Math.max(10, Math.round((MOCK.min || 210) * total / (MOCK.n || 70)));
    if(!E){
      h += '<p class="ai-qlead">本番の 択一式と 同じ <b>5つから 1つ えらぶ・' + (MOCK.n || 70) + '問・' + (MOCK.min || 210) + '分</b>。科目の 問題数も 本番と 同じ。合格は <b>総得点の 基準 かつ 科目ごとの 基準(10問中 ' + (MOCK.passEach || 4) + '問 など)</b>。1つの 科目でも 足りないと 不合格。とちゅうで とじても つづきから できるよ。</p>' +
        '<table class="ek-tb">' + SUBJ.map(S => { const on = subs.includes(S); return '<tr class="' + (on ? "" : "ek-off") + '"><th>' + esc(S.name) + '</th><td>' + S.parts.map(p => p.n + "問" + (p.label ? "(" + esc(p.label) + ")" : "")).join(" + ") + '</td><td>' + (on ? "✅" : "🔜 これから") + '</td></tr>'; }).join("") + '</table>' +
        (!full ? '<p class="ai-small">🔜 いまは 見本: <b>' + subs.map(S => esc(S.name)).join("・") + '</b> の ' + total + '問・' + mins + '分 だけ。ほかの 科目は これから 足すよ。見本の あいだは 科目ごとの 基準だけで 判定するよ。</p>' : "") +
        (subs.length ? '<button type="button" class="ai-btn ai-wide ai-go" data-ek-xstart="1">はじめる(' + total + '問・' + mins + '分)</button>' : '<p class="ai-empty">問題が まだ ないよ</p>') +
        '<p class="ai-small">📋 過去の 合格基準(択一式)</p>' + pastHtml() +
        '<p class="ai-note">' + esc(MOCK.note || "") + '問題は この ゲームが 作った もので、本物の 試験の 問題では ありません。模擬試験で 何回も 過去の 基準点の はばを 上回れたら「受かる レベルに 近い」しるし。選択式(空欄を うめる 問題)は 📝 選択式の 練習で。本当の 試験の 前には 最新の テキストと 試験の 案内で 確かめてね。</p>';
    }else if(E.end){
      const R = E.end, hi = pastHi(), lo = pastLo();
      const near = E.full && (R.band === "in" || (R.low.length && R.band === "over"));  // 見本(70問 そろって いない)の ときは「合計」を 言わない
      const head = R.pass ? (E.full ? "🎉 過去の 基準点の はばを 上回った！" : "🎉 科目の 基準を クリア！") : E.full && R.band === "over" ? "👍 合計は よい。でも 科目で 足りない" : E.full && R.band === "in" ? "👍 過去の 基準点の はばの 中" : "💪 もう少し";
      h += '<div class="ek-res ' + (R.pass ? "pass" : near ? "near" : "fail") + '"><b>' + head + '</b><span>' + R.pts + ' / ' + R.max + ' 点</span><small>' +
        (E.full && hi != null ? "過去の 基準点 " + lo + "〜" + hi + "点・" : "見本(" + R.max + "問)なので 総得点は 判定しない・") + (R.low.length ? R.low.map(esc).join("・") + " が 基準 未満・" : "") + (R.timeUp ? "⏱ 時間 切れ" : "かかった 時間 " + Math.ceil(R.used / 60000) + "分") + '</small></div>' +
        '<table class="ek-by">' + E.subs.filter(S => R.by[S.name]).map(S => { const b = R.by[S.name], p = Math.round(b.ok / b.n * 100), bad = b.ok < passOf(S); return '<tr class="' + (bad ? "low" : "") + '"><th>' + esc(S.name) + '</th><td>' + b.ok + ' / ' + b.n + '点<small>(基準 ' + passOf(S) + '点)</small></td><td><i style="--w:' + p + '%"></i></td></tr>'; }).join("") + '</table>' +
        '<p class="ai-small ai-muted">赤い 科目は 基準 未満。その 科目を ⭕❌ 一問一答で 鍛えよう。科目の 基準は 毎年 補正されることが あります</p>' +
        (R.wrong.length ? '<p class="ai-small">🔁 まちがえた 問題(' + R.wrong.length + ')。もとに なった 文は「❌ まちがえた 問題」に 入るよ</p>' + R.wrong.map(it => '<div class="ek-rvb">' + itemHtml(it, true) + '</div>').join("") : '<p class="ai-empty">まちがい なし！ 🎉</p>') +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ek-xstart="1">もう一度(ちがう 問題で)</button><button type="button" class="ai-btn ai-wide" data-ek-xreset="1">はじめの 画面へ</button>';
    }else{
      const it = E.list[E.i], done = E.list.filter(x => x.a !== undefined).length;
      h += '<p class="ek-exhead"><span id="ek-clock">⏱</span><span>' + (E.i + 1) + ' / ' + E.list.length + '問 ・ 答えた ' + done + '</span></p><p class="ai-small ai-muted">📝 ' + esc(it.sub) + '</p>' + itemHtml(it, false) +
        '<div class="ek-exnav"><button type="button" class="ai-btn" data-ek-xgo="-1"' + (E.i ? "" : " disabled") + '>← まえ</button><button type="button" class="ai-btn" data-ek-xgo="1"' + (E.i + 1 < E.list.length ? "" : " disabled") + '>つぎ →</button></div>' +
        '<div class="ek-exmap">' + E.list.map((x, k) => '<button type="button" data-ek-xj="' + k + '" class="' + (x.a !== undefined ? "a" : "") + (k === E.i ? " on" : "") + '">' + (k + 1) + '</button>').join("") + '</div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ek-xsubmit="1">答案を 出す(採点する)</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-ex");
    if(E && !E.end) tickExam();
  }

  /* ── ❌ まちがえた 問題(⭕❌ と 数字。10こずつ) ── */
  function openReview(){
    const keys = shuffle(missList()).slice(0, QN);
    const list = keys.map(k => k[0] === "m" ? MBY.get(k.slice(2)) : withChoices((k[0] === "s" ? SBY : NBY).get(k.slice(2))));
    if(!list.length){ const sh = sheet("ai-mq"); sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>❌ まちがえた 問題</h2><p class="ai-empty">まちがえた 問題は ないよ 🎉<br>⭕❌ 一問一答・数字クイズ・📝 選択式・模擬試験で まちがえると、ここに 入るよ。2回 つづけて 正解すると 消えるよ。</p></div>'; sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq"); return; }
    sheet("ai-mq"); mq = { list, i:0, ok:0, picked:undefined, miss:[], review:true }; drawMaru();
  }

  /* ── おす(社労士だけの ボタン) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ek-ox],[data-ek-nans],[data-ek-mstart],[data-ek-mnext],[data-ek-nstart],[data-ek-sstart],[data-ek-xstart],[data-ek-xa],[data-ek-xgo],[data-ek-xj],[data-ek-xsubmit],[data-ek-xreset]");
    if(!t) return;
    const play = () => { if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return false; } return true; };
    const ds = t.dataset, top = id => { const sh = document.getElementById(id); if(sh) sh.scrollTop = 0; };
    if(ds.ekOx) return answerMaru(ds.ekOx === "1");
    if(ds.ekNans) return answerMaru(+ds.ekNans);
    if(ds.ekMstart){ if(play()) startMaru(); return; }
    if(ds.ekNstart){ if(play()) startNum(); return; }
    if(ds.ekSstart){ if(play()) startSen(); return; }
    if(ds.ekMnext){ mq.i++; mq.picked = undefined; drawMaru(); top("ai-mq"); return; }
    if(ds.ekXstart){ if(ex && !ex.end && !confirm("いまの 試験を やめて、新しく はじめますか?")) return; if(play()){ ex = null; startExam(); top("ai-ex"); } return; }
    if(ds.ekXa){ ex.list[ex.i].a = +ds.ekXa; drawExam(); return; }
    if(ds.ekXgo){ ex.i = Math.max(0, Math.min(ex.list.length - 1, ex.i + +ds.ekXgo)); drawExam(); top("ai-ex"); return; }
    if(ds.ekXj){ ex.i = +ds.ekXj; drawExam(); top("ai-ex"); return; }
    if(ds.ekXsubmit){ const left = ex.list.filter(x => x.a === undefined).length; if(left && !confirm("まだ 答えていない 問題が " + left + "問 あります。採点しますか?")) return; submitExam(false); return; }
    if(ds.ekXreset){ ex = null; drawExam(); return; }
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
      if(o === "sentaku") return openSentaku();
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
.ek-charts h4{margin:12px 0 6px;font-size:14px}.ek-flow{margin:0;padding-left:22px;font-size:13px;line-height:1.9}
.ek-tb{width:100%;border-collapse:collapse;font-size:12px;background:#fff}.ek-tb th,.ek-tb td{border:1px solid #dee2e6;padding:4px 5px;text-align:left;vertical-align:top}.ek-tb th{background:#f1f3f5}
.ek-yo{display:grid;gap:6px}.ek-yo div{border-left:6px solid var(--c);background:#fff;border-radius:8px;padding:6px 8px;display:flex;flex-wrap:wrap;gap:4px;font-size:12px}.ek-yo b{width:100%}.ek-yo span{background:#f8f9fa;border-radius:6px;padding:1px 6px}
.ek-svg{display:block;width:100%;max-width:320px;margin:0 auto}
.ek-q{font-size:15.5px;line-height:1.9}.ek-ox{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:4px 0 6px}
.ek-oxb{font:inherit;font-size:30px;padding:10px 0;border-radius:16px;border:2px solid #c7d2fe;background:#fff;cursor:pointer;line-height:1}
.ek-oxb.pk{border-color:#1c7ed6;background:#e7f5ff;box-shadow:0 0 0 2px #1c7ed6 inset}.ek-oxb.ok{background:#dcfce7;border-color:#22c55e}.ek-oxb.ng{background:#fee2e2;border-color:#ef4444}.ek-oxb:disabled{cursor:default}
.ek-blank{display:inline-block;min-width:3em;text-align:center;border-bottom:2px solid #2b8a3e;background:#ebfbee;border-radius:6px;padding:0 6px;margin:0 2px;font-weight:900;color:#2b8a3e}.ek-blank.on{background:#d3f9d8}
.ek-law{display:block;color:#64748b;font-size:11.5px;margin-top:4px}
.ek-nch .ai-btn.pk{border-color:#1c7ed6;background:#e7f5ff}
.ek-st{list-style:none;padding:0;margin:0 0 6px;display:grid;gap:8px}.ek-st li{border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;overflow:hidden}
.ek-st li button{all:unset;display:block;box-sizing:border-box;width:100%;padding:8px 10px;font-size:13.5px;line-height:1.7;cursor:pointer}.ek-st li button b{color:#1c7ed6;margin-right:4px}
.ek-st li.pk{border-color:#1c7ed6;background:#e7f5ff;box-shadow:0 0 0 2px #1c7ed6 inset}.ek-st li.ok{border-color:#22c55e;background:#f0fdf4}.ek-st li.ng{border-color:#ef4444;background:#fef2f2}
.ek-st li p{margin:0;padding:6px 10px 0;font-size:13px;font-weight:700;line-height:1.6}.ek-st li small{display:block;padding:2px 10px 6px;font-size:12px;color:#475569;line-height:1.6}
.ek-tb tr.ek-off th,.ek-tb tr.ek-off td{color:#adb5bd}.ek-past{margin:0 0 4px}
.ek-exhead{display:flex;justify-content:space-between;font-weight:900;font-size:13px;margin:0 0 6px;position:sticky;top:-14px;background:#fff;padding:6px 0;z-index:2}#ek-clock{color:#1c7ed6;font-variant-numeric:tabular-nums}#ek-clock.warn{color:#e03131}
.ek-exnav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.ek-exmap{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.ek-exmap button{width:30px;height:28px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font:inherit;font-size:11px;color:#94a3b8;cursor:pointer}
.ek-exmap button.a{background:#e7f5ff;border-color:#74c0fc;color:#1864ab}.ek-exmap button.on{outline:2px solid #1c7ed6}
.ek-res{text-align:center;border-radius:16px;padding:14px;margin:6px 0 12px}.ek-res.pass{background:#dcfce7}.ek-res.near{background:#fff9db}.ek-res.fail{background:#fff4e6}.ek-res b{display:block;font-size:20px}.ek-res span{display:block;font-size:22px;font-weight:900}.ek-res small{color:#475569}
.ek-by{width:100%;border-collapse:collapse;font-size:13px;margin:0 0 10px}.ek-by th{text-align:left;font-weight:800;padding:3px 4px}.ek-by td{padding:3px 4px;font-variant-numeric:tabular-nums;white-space:nowrap}.ek-by td:last-child{width:34%}.ek-by td small{display:block;font-size:11px;color:#64748b}.ek-by tr.low th,.ek-by tr.low td{color:#c92a2a}.ek-by tr.low i::after{background:#e03131}
.ek-by i{display:block;height:8px;border-radius:99px;background:#e2e8f0;position:relative;overflow:hidden}.ek-by i::after{content:"";position:absolute;inset:0;width:var(--w);background:#1c7ed6}
.ek-rv{border-left:4px solid #fa5252;background:#fff5f5;border-radius:8px;padding:6px 10px;margin:6px 0;font-size:13px;line-height:1.7}.ek-rv p{margin:0 0 2px;font-weight:700}
.ek-rvb{border-top:1px dashed #e2e8f0;padding-top:6px;margin-top:8px}
.ai-btns .ek-big{grid-column:1/-1;background:#1c7ed6;border-color:#1c7ed6;color:#fff}
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
  return { kind:"sharoshiterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
