/* フリック日商簿記: 簿記の ことばと 仕訳を、フリックで 打って おぼえる。(けいくん 2026-11-07「フリック日商簿記を 3級から1級まで 合格レベルで」→「ぜんぶ おすすめで」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「簿記の 旅」を 足す ファイル。boki/ の ページだけが 読む ─
   ことば・問題は tools/boki/meta.json + terms-*.json + shiwake-*.json + maru-*.json → tools/boki/terms_js.py が data/boki.json と boki/terms.js(BOKI_TERMS)に する。
   🧮 計算問題は tools/boki/calc.js → boki/calc.js(BOKI_CALC)。**ことば・問題を 足す・直すのは tools/boki/ だけ**
   ・もとは フリック宅建士(takken/takken.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 級ごとに 9つ(3級 3・2級 3・1級 3)+ 🏆 マスター。990語(旅ごとに 入門20・中級30・上級60)
   ・🧾 仕訳クイズ(2段)・🧮 計算問題・📝 ⭕❌・🎯 級ごとの 模擬テスト・❌ まちがえた 問題(運転免許・宅建士に つづく 3つめの 例外)・🧩 4択クイズ・🎓 級の 切りかえ
   ・範囲は 2027年度版の 出題区分表(けいくん決定 2026-11-07)
   ⚠️ 簿記の ことばと 仕訳を おぼえる ゲーム。総合問題は 問題集で。日本商工会議所とは 関係ありません */
const BOKI = (() => {
  const D = BOKI_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に bzkihon … bzmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { kihon:"bzkihon", "3shiwake":"bz3shiwake", "3kessan":"bz3kessan", "2shogyo":"bz2shogyo", "2kaisha":"bz2kaisha", "2kogyo":"bz2kogyo", "1shogyo":"bz1shogyo", "1kaikei":"bz1kaikei", "1genka":"bz1genka" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"bokiterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
      c:j.icon + " " + j.name + " ・ " + o.c + " ・ " + LVN[o.dv].icon + " " + LVN[o.dv].name + " ・ " + o.g });
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
    levels.bzmas = lv; pools.bzmas = ALL; colors.bzmas = "#e0202e";
    maps.bzmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　9つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  const MODES_ALL = ["bzkihon", "bz3shiwake", "bz3kessan", "bz2shogyo", "bz2kaisha", "bz2kogyo", "bz1shogyo", "bz1kaikei", "bz1genka", "bzmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-boki[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-boki-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-boki");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-boki"), JSON.stringify(v)); memo = { k:pkey("flick-boki"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-boki-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-boki-fav"), JSON.stringify(a)); return i < 0; }
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
           (prev.rs ? '<p class="ai-ko">🎓 ' + esc(prev.g) + ' ・ 📝 ' + esc(prev.rs) + ' ・ ' + esc(prev.f) + '</p>' : "") +
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
    if(q.f) h += '<p class="ai-small ai-muted">📘 分野: ' + esc(q.f) + (q.rs ? ' <span class="ai-rs">📝 ' + esc(q.rs) + '</span>' : "") + ' <span class="ai-rs bz-g">🎓 ' + esc(q.g) + '</span>' + '</p>';
    if(q.al) h += '<p class="ai-small">読みかた: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</p>';
    const rel = (q.rel || []).map(id => BY.get(id)).filter(Boolean);
    if(rel.length) h += '<p class="ai-small">🔗 つながる ことば</p><div class="ai-chips">' + rel.map(x => d.has(x.art) ? chip(x) : '<button type="button" class="ai-chip lock" data-ai-term="' + esc(x.art) + '">❔ ？？？</button>').join("") + '</div>';
    // しくみ図・地図(📍)は 10問の あとの 説明・図鑑に のせない(けいくん 2026-09-29「地図スクロールが大変になるからいらない / 10問終わったあとの説明にはのせないで」→「すべてのフリックゲームを同じ仕様に」)。ホームの 図は たたんで のこす
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
    if(JOURNEY_OF[m]) diagCur = JBY[JOURNEY_OF[m]].diagram;
    if(!diagCur) diagCur = "kihon";
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 ことば図鑑</button>' +
      '<button type="button" class="ai-btn bz-big" data-ai-open="sw">🧾 仕訳クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="calc">🧮 計算問題</button>' +
      '<button type="button" class="ai-btn" data-ai-open="maru">📝 ⭕❌ 一問一答</button>' +
      '<button type="button" class="ai-btn bz-big" data-ai-open="exam">🎯 級ごとの 模擬テスト</button>' +
      '<button type="button" class="ai-btn" data-ai-open="review">❌ まちがえた 問題' + (missList().length ? "(" + missList().length + ")" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
      bzCharts() + '<p class="ai-note">' + esc(D.note) + '</p></section>';
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
    if(m === "bzmas") return { name:"マスター" + (i + 1), sub:"9つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };
  }

  /* ── ことば図鑑(検索・旅・分類・むずかしさ・お気に入りで しぼれる) ── */
  let zf = { q:"", j:"", c:"", dv:"", rs:"", g:"", fav:false, shown:90 };
  const normQ = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/\s/g, "");
  function sheet(id){
    let sh = document.getElementById(id);
    if(!sh){ sh = document.createElement("div"); sh.id = id; sh.className = "prof-sheet ai-sheet"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeSheet(id); }); }
    sh.classList.remove("hidden"); document.body.classList.add("ai-lock"); return sh;
  }
  function closeSheet(id){ const sh = document.getElementById(id); if(sh) sh.classList.add("hidden"); if(!document.querySelector(".ai-sheet:not(.hidden)")) document.body.classList.remove("ai-lock"); }
  function openZukan(pre2){ if(pre2) Object.assign(zf, { q:"", j:"", c:"", dv:"", rs:"", g:"", fav:false }, pre2); zf.shown = 90; sheet("ai-zk"); drawZukan(); }
  function drawZukan(){
    const sh = document.getElementById("ai-zk"), d = discovered(), fv = new Set(favs()), qq = normQ(zf.q);
    const list = ALL.filter(q => (!zf.j || q.j === zf.j) && (!zf.c || q.c === zf.c) && (!zf.dv || q.dv === +zf.dv) && (!zf.rs || q.rs === zf.rs) && (!zf.g || q.g === zf.g) && (!zf.fav || fv.has(q.art)) &&
      (!qq || [q.n, q.r].concat(q.al || [], [q.ds]).some(x => normQ(x).includes(qq))));
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    const cats = [...new Set(ALL.filter(q => !zf.j || q.j === zf.j).map(q => q.c))];
    const scroll = sh.scrollTop, focused = document.activeElement && document.activeElement.id === "ai-zq";
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 ことば図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 売掛金)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-zf" style="grid-template-columns:1fr 1fr"><select id="ai-zr">' + opt("", "📝 科目(ぜんぶ)", zf.rs) + ["商業簿記", "工業簿記", "会計学", "原価計算"].map(r => opt(r, "📝 " + r, zf.rs)).join("") + '</select>' +
        '<select id="ai-zg">' + opt("", "🎓 級(ぜんぶ)", zf.g) + ["3級", "2級", "1級"].map(r => opt(r, "🎓 " + r, zf.g)).join("") + '</select></div>' +
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
    sh.querySelector("#ai-zg").onchange = e => { zf.g = e.target.value; zf.shown = 90; drawZukan(); };
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

  /* ════ ここから 日商簿記だけの しくみ(けいくん 2026-11-07「3級から1級まで 合格レベルで」→「ぜんぶ おすすめで」)════
     🧾 仕訳クイズ(科目の くみあわせ → 金額 の 2段)・🧮 計算問題(数字が 毎回 かわる 4択)・📝 ⭕❌・🎯 級ごとの 模擬テスト・❌ まちがえた 問題・🎓 級の 切りかえ
     ⚠️ ❌ 復習は シリーズの「スピード記録勝負」の **3つめの 例外**(1つめ 運転免許・2つめ 宅建士)。けいくん決定 2026-11-07。ほかの ゲームに 広げない */
  const MARU = (D.maru || []).map(m => Object.assign({}, m, { jr:JBY[m.j] }));
  const MBY = new Map(MARU.map(m => [m.id, m]));
  const SW = (D.sw || []).map(x => Object.assign({}, x, { jr:JBY[x.j] }));
  const SBY = new Map(SW.map(x => [x.id, x]));
  const CC = typeof BOKI_CALC === "object" ? BOKI_CALC : { CALC:[], CALC_G:[], CALC_LV:[] };
  const MOCK = D.mock || {};
  const OX = a => a ? "⭕" : "❌";
  const RSO = ["商業簿記", "工業簿記", "会計学", "原価計算"];
  const GRADES = ["3級", "2級", "1級"];
  const yen = n => n.toLocaleString("ja-JP");

  /* ── 🎓 級の 切りかえ(「3級だけ」「2級まで」…)。端末に おぼえる ── */
  const GSETS = [["", "🎓 ぜんぶの 級"], ["3", "🔰 3級だけ"], ["2", "📘 2級だけ"], ["1", "🎓 1級だけ"], ["32", "🔰📘 2級まで(3級+2級)"]];
  let gsel = ""; try{ gsel = localStorage.getItem("flick-boki-grade") || ""; }catch(e){}
  if(!GSETS.some(g => g[0] === gsel)) gsel = "";
  const gOK = g => !gsel || gsel.includes(String(g || "").charAt(0));
  function setG(v){ gsel = v; try{ localStorage.setItem("flick-boki-grade", v); }catch(e){} }
  const gSelect = id => '<select id="' + id + '" class="bz-gsel">' + GSETS.map(([v, l]) => opt(v, l, gsel)).join("") + '</select>';
  const gradeOfJ = j => (JBY[j] || {}).grade;

  /* ── ❌ まちがえた 問題(端末に おぼえる。ログイン して いれば かずともの 記録と いっしょ = recSet)──
     flick-boki-miss[-p<id>] = { "m:<⭕❌のid>" | "s:<仕訳のid>" | "c:<計算の 番号>": つづけて 正解した 回数 }。2回 つづけて 正解で 消える。
     計算は 数字が 毎回 かわるので、同じ しゅるいを 新しい 数字で 出す */
  function missGet(){ try{ const v = JSON.parse(recGet(pkey("flick-boki-miss")) || "{}"); return v && typeof v === "object" ? v : {}; }catch(e){ return {}; } }
  function missSet(v){ recSet(pkey("flick-boki-miss"), JSON.stringify(v)); }
  function missMark(key, ok){
    const v = missGet();
    if(!ok) v[key] = 0;
    else if(key in v){ v[key]++; if(v[key] >= 2) delete v[key]; }
    missSet(v);
  }
  const missList = () => Object.keys(missGet()).filter(k => k[0] === "m" ? MBY.has(k.slice(2)) : k[0] === "s" ? SBY.has(k.slice(2)) : k[0] === "c" ? !!CC.CALC[+k.slice(2)] : false);
  const termChip = id => { const q = BY.get(id); return q ? chip(q) : ""; };
  const lawTag = s => s ? '<small class="bz-law">📚 ' + esc(s) + '</small>' : "";
  const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';

  /* ── 🧾 仕訳: 選択肢を 作る ──
     ① 科目の くみあわせ: 正しい / 借方と 貸方を 入れかえた / ng の 科目と 入れかえた(3つ)
     ② 金額: 正しい 金額 + wa(まちがいの 金額 3つ) */
  const sig = e => e.dr.join("+") + "|" + e.cr.join("+");
  function swMake(x){
    const right = { dr:x.dr.map(l => l[0]), cr:x.cr.map(l => l[0]) }, seen = new Set([sig(right)]), cand = [];
    const add = e => { const s = sig(e); if(!seen.has(s) && e.dr.length && e.cr.length && !e.dr.some(a => e.cr.includes(a))){ seen.add(s); cand.push(e); } };
    add({ dr:right.cr.slice(), cr:right.dr.slice() });
    for(const a of shuffle(x.ng)){
      const all = right.dr.map((v, i) => ["dr", i]).concat(right.cr.map((v, i) => ["cr", i]));
      for(const [side, i] of shuffle(all)){ const e = { dr:right.dr.slice(), cr:right.cr.slice() }; e[side][i] = a; const n = cand.length; add(e); if(cand.length > n) break; }
    }
    for(const a of shuffle(x.ng)){ if(cand.length >= 6) break; const e = { dr:right.cr.slice(), cr:right.dr.slice() }; e.dr[0] = a; add(e); }
    const ch1 = shuffle([right].concat(shuffle(cand).slice(0, 3)));
    const amt = x.dr.map(l => l[1]).concat(x.cr.map(l => l[1]));
    const ch2 = shuffle([amt].concat(x.wa.slice(0, 3)));
    return Object.assign({}, x, { ch1, ok1:ch1.indexOf(right), ch2, ok2:ch2.indexOf(amt), p1:undefined, p2:undefined });
  }
  const entryAcc = e => '<span class="bz-ent"><span><i>借方</i>' + e.dr.map(esc).join("<br>") + '</span><span><i>貸方</i>' + e.cr.map(esc).join("<br>") + '</span></span>';
  function entryAmt(x, amt){
    const n = x.dr.length;
    return '<span class="bz-ent"><span><i>借方</i>' + x.dr.map((l, i) => esc(l[0]) + " <b>" + yen(amt[i]) + "</b>").join("") + '</span><span><i>貸方</i>' + x.cr.map((l, i) => esc(l[0]) + " <b>" + yen(amt[n + i]) + "</b>").join("") + '</span></span>';
  }
  /* T字の 形で 正しい 仕訳を 見せる(とき方) */
  function tForm(x){
    const rows = Math.max(x.dr.length, x.cr.length);
    let h = '<table class="bz-t"><tr><th>借方</th><th>貸方</th></tr>';
    for(let i = 0; i < rows; i++){ const d = x.dr[i], c = x.cr[i]; h += '<tr><td>' + (d ? esc(d[0]) + ' <b>' + yen(d[1]) + '</b>' : "") + '</td><td>' + (c ? esc(c[0]) + ' <b>' + yen(c[1]) + '</b>' : "") + '</td></tr>'; }
    return h + '</table>';
  }
  const swOk = it => it.p1 === it.ok1 && it.p2 === it.ok2;
  /* 1問の 画面。mode = "sw"(練習: えらぶと すぐ ⭕❌)/ "x"(模擬テスト: ① は えらぶと 変えられない。本番の 答案と 同じ)/ "show"(答えあわせ) */
  function swCard(it, mode){
    const pf = mode === "x" ? "x" : "s", show = mode === "show";
    const fb1 = show || (mode === "sw" && it.p1 !== undefined), fb2 = show || (mode === "sw" && it.p2 !== undefined);
    let h = '<p class="ai-qq bz-q">' + esc(it.q) + '</p><p class="ai-small">① 借方・貸方の 勘定科目は？</p><div class="ai-qch bz-ch">' +
      it.ch1.map((e, k) => '<button type="button" class="ai-btn' + (fb1 ? (k === it.ok1 ? " ok" : k === it.p1 ? " ng" : "") : (k === it.p1 ? " pk" : "")) + '" data-bz-' + pf + '1="' + k + '"' + (show || it.p1 !== undefined ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + entryAcc(e) + '</button>').join("") + '</div>';
    if(show || it.p1 !== undefined){
      h += '<p class="ai-small">② 金額は？' + (mode === "sw" && it.p1 !== it.ok1 ? '<span class="ai-muted">(正しい 科目で 金額を えらぼう)</span>' : "") + '</p><div class="ai-qch bz-ch">' +
        it.ch2.map((a, k) => '<button type="button" class="ai-btn' + (fb2 ? (k === it.ok2 ? " ok" : k === it.p2 ? " ng" : "") : (k === it.p2 ? " pk" : "")) + '" data-bz-' + pf + '2="' + k + '"' + (fb2 ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + entryAmt(it, a) + '</button>').join("") + '</div>';
    }
    if(fb2){
      const ok = swOk(it);
      h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : it.p1 === it.ok1 ? "❌ 科目は 正解。金額が ちがうよ" : "❌ ざんねん") + '</b>' + tForm(it) + '<p>' + esc(it.w) + '</p>' +
           (it.t && BY.get(it.t) ? '<div class="ai-chips">' + termChip(it.t) + '</div>' : "") + '</div>';
    }
    return h;
  }

  /* ── 🧮 計算: 1問を 作る(数字が 毎回 かわる)── */
  function calcMake(i){
    const f = CC.CALC[i]; if(!f) return null;
    for(let t = 0; t < 60; t++){
      const p = f(); if(!p) continue;
      const w = shuffle([...new Set(p.w.filter(x => x !== p.a))]).slice(0, 3);
      if(w.length < 3) continue;
      const ch = shuffle([p.a].concat(w));
      return Object.assign({}, p, { ci:i, ch, ok:ch.indexOf(p.a), pk:undefined });
    }
    return null;
  }
  const calcGrade = i => { try{ for(let t = 0; t < 10; t++){ const p = CC.CALC[i](); if(p) return p.lv; } }catch(e){} return ""; };
  const CALC_LVS = CC.CALC.map((f, i) => calcGrade(i));
  const CALC_GS = CC.CALC.map((f, i) => { try{ for(let t = 0; t < 10; t++){ const p = f(); if(p) return p.g; } }catch(e){} return ""; });
  const RS_OF_CALC = { genka:"工業簿記", hyojun:"工業簿記", cvp:"工業簿記" };
  function calcCard(p, show){
    const done = show || p.pk !== undefined;
    let h = '<p class="ai-qq bz-q">' + esc(p.q) + '</p><div class="ai-qch bz-nch">' + p.ch.map((x, k) => '<button type="button" class="ai-btn' + (done ? (k === p.ok ? " ok" : k === p.pk ? " ng" : "") : "") + '" data-bz-cans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>';
    if(done){ const ok = p.pk === p.ok; h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は「" + esc(p.a) + "」") + '</b><ol class="ai-cex">' + (p.ex || []).map(s => '<li>' + esc(s) + '</li>').join("") + '</ol></div>'; }
    return h;
  }

  /* ── ⭕❌ 1問の 画面 ── */
  function maruCard(m, picked){
    let h = '<p class="ai-qq bz-q">' + esc(m.q) + '</p><div class="bz-ox">' +
      [true, false].map(v => '<button type="button" class="bz-oxb' + (picked === undefined ? "" : (v === m.a ? " ok" : v === picked ? " ng" : "")) + '" data-bz-ox="' + (v ? 1 : 0) + '"' + (picked === undefined ? "" : " disabled") + '>' + OX(v) + '</button>').join("") + '</div>';
    if(picked !== undefined){
      const ok = picked === m.a;
      h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ ざんねん") + '　答えは ' + OX(m.a) + '</b><p>' + esc(m.w) + '</p>' + lawTag(m.lw) +
           (m.t && BY.get(m.t) ? '<div class="ai-chips">' + termChip(m.t) + '</div>' : "") + '</div>';
    }
    return h;
  }

  /* ── 10問の 練習(⭕❌ / 🧾 仕訳 / 🧮 計算 / ❌ 復習 を 1つの 画面で)──
     list の 1つ = { k:"m"|"s"|"c", x:中身 }。p = えらんだ 答え */
  let pr = null, pset = { kind:"s", j:"", dv:"", cg:"" };
  const KIND_NAME = { s:"🧾 仕訳クイズ", c:"🧮 計算問題", m:"📝 ⭕❌ 一問一答" };
  function poolOf(kind){
    if(kind === "m") return MARU.filter(m => gOK(m.g) && (!pset.j || m.j === pset.j) && (!pset.dv || m.dv === +pset.dv));
    if(kind === "s") return SW.filter(x => gOK(x.g) && (!pset.j || x.j === pset.j) && (!pset.dv || x.dv === +pset.dv));
    return CC.CALC.map((f, i) => i).filter(i => gOK(CALC_LVS[i]) && (!pset.cg || CALC_GS[i] === pset.cg));
  }
  function openPractice(kind){ pr = null; pset.kind = kind; sheet("ai-mq"); drawPractice(); }
  function startPractice(list, review){
    let L = list;
    if(!L){
      const pool = poolOf(pset.kind);
      if(pset.kind === "c"){ L = []; for(let t = 0; t < QN * 3 && L.length < QN && pool.length; t++){ const p = calcMake(pool[Math.floor(Math.random() * pool.length)]); if(p) L.push({ k:"c", x:p }); } }
      else L = shuffle(pool).slice(0, QN).map(x => ({ k:pset.kind, x:pset.kind === "s" ? swMake(x) : x }));
    }
    if(!L.length){ drawPractice("問題が ないよ。はんいを 広げてね"); return; }
    pr = { list:L, i:0, ok:0, miss:[], review:!!review, p:undefined }; drawPractice();
  }
  function curDone(it){ return it.k === "m" ? pr.p !== undefined : it.k === "c" ? it.x.pk !== undefined : it.x.p2 !== undefined; }
  function curOk(it){ return it.k === "m" ? pr.p === it.x.a : it.k === "c" ? it.x.pk === it.x.ok : swOk(it.x); }
  function drawPractice(msg){
    const sh = document.getElementById("ai-mq"), Q = pr, K = Q ? null : pset.kind;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>' + (Q && Q.review ? "❌ まちがえた 問題" : KIND_NAME[Q ? Q.list[0].k : K]) + '</h2>';
    if(!Q){
      const lead = K === "s" ? '取引の 文を 読んで、<b>① 借方・貸方の 勘定科目</b> → <b>② 金額</b> の 順に えらぼう。3級の 第1問・2級の 仕訳問題の 練習だよ。'
        : K === "c" ? '数字が <b>毎回 かわる</b> 計算問題。売上原価・減価償却・月割・標準原価の 差異・損益分岐点・現在価値 …。答えたら とき方が 出るよ。'
        : '文を 読んで 正しければ ⭕・まちがいなら ❌。<b>1級の 会計学</b>・2級の 考えかたの 練習。「かならず」「すべて」「借方 / 貸方」「定額法 / 定率法」の ひっかけに 気を つけてね。';
      const n = poolOf(K).length;
      h += '<p class="ai-qlead">' + lead + QN + '問。</p><div class="ai-zf ai-qset">' + gSelect("bz-pg") +
        (K === "c" ? '<select id="bz-pc">' + opt("", "🧮 ぜんぶの なかま", pset.cg) + CC.CALC_G.map(([v, l]) => opt(v, l, pset.cg)).join("") + '</select>'
          : '<select id="bz-pj">' + opt("", "🧭 ぜんぶの 旅", pset.j) + JR.filter(J => gOK(J.grade)).map(J => opt(J.id, J.icon + " " + J.name, pset.j)).join("") + '</select>') + '</div>' +
        (K === "c" ? "" : '<div class="ai-zf" style="grid-template-columns:1fr"><select id="bz-pd">' + opt("", "📶 ぜんぶの むずかしさ", pset.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, pset.dv)).join("") + '</select></div>') +
        '<p class="ai-small ai-muted">この はんいの ' + (K === "c" ? "しゅるい: " + n + "しゅるい" : "問題: " + n + "問") + '</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-bz-pstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームが 作った もので、本物の 試験の 問題では ありません。会社の 名前は ぜんぶ 架空です。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.review ? '<p class="ai-small ai-muted">2回 つづけて 正解すると「まちがえた 問題」から 消えるよ。のこり ' + missList().length + '問</p>' : "") +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた 問題</p>' + Q.miss.map(it => '<div class="bz-rv"><p>' + esc(it.x.q) + '</p>' +
          (it.k === "m" ? '<b>答え ' + OX(it.x.a) + '</b> ' + esc(it.x.w) : it.k === "s" ? tForm(it.x) : '<b>答え ' + esc(it.x.a) + '</b>') + '</div>').join("") : "") +
        (Q.review ? '<button type="button" class="ai-btn ai-wide ai-go" data-ai-open="review">もう一度</button>'
          : '<button type="button" class="ai-btn ai-wide ai-go" data-bz-pstart="1">もう一度' + (Q.list[0].k === "c" ? "(新しい 数字で)" : "(同じ はんい)") + '</button><button type="button" class="ai-btn ai-wide" data-bz-popen="' + Q.list[0].k + '">はんいを えらびなおす</button>');
    }else{
      const it = Q.list[Q.i], x = it.x, J = x.jr || null;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + (it.k === "c" ? "🧮 " + esc(x.lv) + " ・ " + esc((CC.CALC_G.find(g => g[0] === x.g) || ["", ""])[1]) : J.icon + " " + esc(J.name) + " ・ " + esc(x.g) + " ・ " + LVN[x.dv].icon + " " + esc(LVN[x.dv].name)) + '</span></p>' +
        (it.k === "m" ? maruCard(x, Q.p) : it.k === "s" ? swCard(x, "sw") : calcCard(x, false));
      if(curDone(it)) h += '<button type="button" class="ai-btn ai-wide ai-go" data-bz-pnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const g = sh.querySelector("#bz-pg"), j = sh.querySelector("#bz-pj"), d = sh.querySelector("#bz-pd"), c = sh.querySelector("#bz-pc");
    if(g) g.onchange = e => { setG(e.target.value); pset.j = ""; drawPractice(); };
    if(j) j.onchange = e => { pset.j = e.target.value; drawPractice(); };
    if(d) d.onchange = e => { pset.dv = e.target.value; drawPractice(); };
    if(c) c.onchange = e => { pset.cg = e.target.value; drawPractice(); };
  }
  function practiceAnswered(it){
    const ok = curOk(it); if(ok) pr.ok++; else pr.miss.push(it);
    missMark(it.k === "c" ? "c:" + it.x.ci : it.k + ":" + it.x.id, ok);
  }

  /* ── 🎯 模擬テスト(級ごと。本番の 時間・合格の めやすは mock.json = 日本商工会議所の ページで 確かめた もの。問題の 数と 点は この ゲームの 形)──
     3級 = 仕訳 15問 + 計算。2級 = 商業簿記 + 工業簿記。1級 = 「商業簿記・会計学」と「工業簿記・原価計算」の 2つの 時間に 分ける。
     ⚠️ 総合問題(精算表・財務諸表を 1から 作る)は ゲームでは できないので 入れていない */
  let ex = null, exTimer = null, exG = "3級", exPart = 0;
  const LAY = MOCK.layout || {};
  const GK = { "3級":"g3", "2級":"g2", "1級":"g1" };
  function partMin(g, k){
    const M = MOCK[GK[g]] || {};
    if(g === "1級"){ const s = (M.subjects || [])[k]; return (s && s.min) || 90; }
    return M.min || (g === "3級" ? 60 : 90);
  }
  function exItems(g, part){
    const used = new Set(), list = [];
    for(const [rs, kind, n, pt] of part.sec){
      if(kind === "sw"){
        const pool = shuffle(SW.filter(x => x.g === g && x.rs === rs && !used.has(x.id)));
        pool.slice(0, n).forEach(x => { used.add(x.id); list.push({ k:"s", rs, pt, x:swMake(x) }); });
      }else if(kind === "maru"){
        const pool = shuffle(MARU.filter(m => m.g === g && m.rs === rs && !used.has(m.id)));
        pool.slice(0, n).forEach(m => { used.add(m.id); list.push({ k:"m", rs, pt, x:m, p:undefined }); });
      }else{
        const idx = CC.CALC.map((f, i) => i).filter(i => CALC_LVS[i] === g && (RS_OF_CALC[CALC_GS[i]] || "商業簿記") === (rs === "原価計算" ? "工業簿記" : rs));
        const ord = shuffle(idx); let k = 0;
        for(let t = 0; t < n * 4 && list.filter(x => x.k === "c" && x.rs === rs).length < n && ord.length; t++){ const p = calcMake(ord[k++ % ord.length]); if(p) list.push({ k:"c", rs, pt, x:p }); }
      }
    }
    return list;
  }
  function openExam(){ sheet("ai-ex"); drawExam(); }
  function startExam(){
    const part = (LAY[exG] || { parts:[] }).parts[exPart]; if(!part) return;
    const list = exItems(exG, part); if(!list.length) return;
    const min = partMin(exG, exPart);
    ex = { g:exG, part:exPart, name:part.name, list, i:0, min, until:Date.now() + min * 60000, end:null };
    clearInterval(exTimer); exTimer = setInterval(tickExam, 1000); drawExam();
  }
  function tickExam(){
    if(!ex || ex.end){ clearInterval(exTimer); return; }
    const left = ex.until - Date.now(), el = document.getElementById("bz-clock");
    if(left <= 0){ submitExam(true); return; }
    if(el){ const s = Math.ceil(left / 1000); el.textContent = "⏱ のこり " + Math.floor(s / 3600) + ":" + String(Math.floor(s / 60) % 60).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); el.classList.toggle("warn", s <= 600); }
  }
  const exAnswered = it => it.k === "m" ? it.p !== undefined : it.k === "c" ? it.x.pk !== undefined : it.x.p2 !== undefined;
  const exOk = it => it.k === "m" ? it.p === it.x.a : it.k === "c" ? it.x.pk === it.x.ok : swOk(it.x);
  function scoreExam(){
    let pts = 0, max = 0; const by = {}, wrong = [];
    for(const it of ex.list){
      const ok = exOk(it), b = by[it.rs] = by[it.rs] || { pt:0, max:0 }; b.max += it.pt; max += it.pt;
      if(ok){ pts += it.pt; b.pt += it.pt; } else wrong.push(it);
      if(!exAnswered(it)) continue;  // 答えて いない 問題は 復習に 入れない
      missMark(it.k === "c" ? "c:" + it.x.ci : it.k + ":" + it.x.id, ok);
    }
    return { pts, max, by, wrong };
  }
  /* 1級は 2つの 時間の 点を あわせて 判定(さいごの 点を 端末に おぼえる) */
  function g1Get(){ try{ return JSON.parse(recGet(pkey("flick-boki-g1")) || "{}") || {}; }catch(e){ return {}; } }
  function submitExam(timeUp){
    if(!ex || ex.end) return; clearInterval(exTimer);
    const R = Object.assign(scoreExam(), { timeUp, used:Math.min(ex.min * 60000, ex.min * 60000 - (ex.until - Date.now())) });
    if(ex.g === "1級"){ const v = g1Get(); v[ex.part] = { pts:R.pts, max:R.max, by:R.by, at:Date.now() }; recSet(pkey("flick-boki-g1"), JSON.stringify(v)); }
    ex.end = R; drawExam(); const sh = document.getElementById("ai-ex"); if(sh) sh.scrollTop = 0;
  }
  function exItemHtml(it, show){
    if(it.k === "s") return '<p class="ai-small">🧾 仕訳(' + it.pt + '点)</p>' + swCard(it.x, show ? "show" : "x");
    if(it.k === "c") return '<p class="ai-small">🧮 計算(' + it.pt + '点)</p>' + (show ? calcCard(it.x, true) : '<p class="ai-qq bz-q">' + esc(it.x.q) + '</p><div class="ai-qch bz-nch">' + it.x.ch.map((x, k) => '<button type="button" class="ai-btn' + (it.x.pk === k ? " pk" : "") + '" data-bz-xc="' + k + '"><b>' + "ABCD"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>');
    return '<p class="ai-small">📝 ⭕❌(' + it.pt + '点)</p>' + (show ? maruCard(it.x, it.p) : '<p class="ai-qq bz-q">' + esc(it.x.q) + '</p><div class="bz-ox">' + [true, false].map(v => '<button type="button" class="bz-oxb' + (it.p === v ? " pk" : "") + '" data-bz-xm="' + (v ? 1 : 0) + '">' + OX(v) + '</button>').join("") + '</div>');
  }
  function judge(g, R){
    if(g !== "1級") return { pass:R.pts >= R.max * .7, txt:"70% 以上で 合格の めやす" };
    const low = Object.entries(R.by).filter(([k, b]) => b.pt < b.max * .4).map(([k]) => k);
    return { pass:R.pts >= R.max * .7 && !low.length, low, txt:"ぜんぶで 70% 以上・1科目でも 40% 未満は 不合格" };
  }
  function drawExam(){
    const sh = document.getElementById("ai-ex"), E = ex;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🎯 模擬テスト</h2>';
    if(!E){
      const parts = (LAY[exG] || { parts:[] }).parts, part = parts[exPart] || parts[0];
      if(!parts[exPart]) exPart = 0;
      const cnt = { sw:0, calc:0, maru:0 }; let pts = 0; for(const [rs, k, n, pt] of part.sec){ cnt[k] += n; pts += n * pt; }
      h += '<p class="ai-qlead">級を えらんで、<b>本番の 時間</b>で ためそう。とちゅうで とじても つづきから できるよ。</p>' +
        '<div class="bz-gtab">' + GRADES.map(g => '<button type="button" data-bz-xg="' + g + '"' + (g === exG ? ' class="on"' : "") + '>' + g + '</button>').join("") + '</div>' +
        (parts.length > 1 ? '<div class="bz-gtab">' + parts.map((P, k) => '<button type="button" data-bz-xp="' + k + '"' + (k === exPart ? ' class="on"' : "") + '>' + esc(P.name) + '</button>').join("") + '</div>' : "") +
        '<p class="ai-small">' + esc(part.name) + ': 🧾 仕訳 ' + cnt.sw + '問・🧮 計算 ' + cnt.calc + '問' + (cnt.maru ? '・📝 ⭕❌ ' + cnt.maru + '問' : "") + ' = ' + pts + '点・⏱ ' + partMin(exG, exPart) + '分</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-bz-xstart="1">はじめる</button>' +
        '<p class="ai-small">📏 合格の めやす: ' + esc(judge(exG, { pts:0, max:1, by:{} }).txt) + (exG === "1級" ? "(2つの 時間を あわせて 100点)" : "") + '</p>' +
        '<p class="ai-note">' + esc(MOCK.note || "") + '問題の 数と 点は この ゲームの 形で、本番の 大問の 形では ありません。⚠️ <b>総合問題(精算表・財務諸表を 1から 作る)は ゲームでは できない</b>ので、問題集で 練習してね。模擬テストで 何回も 7割を こえたら「受かる レベルに 近い」しるし。</p>';
    }else if(E.end){
      const R = E.end; let J = judge(E.g, R), tot = null;
      if(E.g === "1級"){ const v = g1Get(); if(v[0] && v[1]){ const by = {}; for(const k of [0, 1]) for(const [rs, b] of Object.entries(v[k].by)){ by[rs] = by[rs] || { pt:0, max:0 }; by[rs].pt += b.pt; by[rs].max += b.max; }
        tot = { pts:v[0].pts + v[1].pts, max:v[0].max + v[1].max, by }; J = judge("1級", tot); } }
      const shown = tot || R;
      h += '<div class="bz-res ' + (J.pass ? "pass" : shown.pts >= shown.max * .6 ? "near" : "fail") + '"><b>' + (tot || E.g !== "1級" ? (J.pass ? "🎉 合格の めやすを こえた！" : "💪 もう少し") : "✍️ " + esc(E.name) + " おわり") + '</b><span>' + R.pts + ' / ' + R.max + ' 点</span><small>' +
        esc(E.g + " " + E.name) + "・" + (R.timeUp ? "⏱ 時間 切れ" : "かかった 時間 " + Math.ceil(R.used / 60000) + "分") +
        (tot ? '<br>2つの 時間を あわせて ' + tot.pts + ' / ' + tot.max + ' 点' + (J.low && J.low.length ? "・40% 未満: " + J.low.map(esc).join("・") : "") : E.g === "1級" ? "<br>もう 1つの 時間も 受けると、あわせて 判定するよ" : "") + '</small></div>' +
        '<table class="bz-by">' + RSO.filter(k => shown.by[k]).map(k => '<tr><th>' + esc(k) + '</th><td>' + shown.by[k].pt + ' / ' + shown.by[k].max + '</td><td><i style="--w:' + (shown.by[k].pt / shown.by[k].max * 100).toFixed(0) + '%"></i></td></tr>').join("") + '</table>' +
        (R.wrong.length ? '<p class="ai-small">🔁 まちがえた 問題(' + R.wrong.length + ')。「❌ まちがえた 問題」にも 入るよ</p>' + R.wrong.map(it => '<div class="bz-rvb">' + exItemHtml(it, true) + '</div>').join("") : '<p class="ai-empty">まちがい なし！ 🎉</p>') +
        '<button type="button" class="ai-btn ai-wide ai-go" data-bz-xstart="1">もう一度(ちがう 問題で)</button><button type="button" class="ai-btn ai-wide" data-bz-xreset="1">はじめの 画面へ</button>';
    }else{
      const it = E.list[E.i], done = E.list.filter(exAnswered).length;
      h += '<p class="bz-exhead"><span id="bz-clock">⏱</span><span>' + (E.i + 1) + ' / ' + E.list.length + '問 ・ 答えた ' + done + '</span></p><p class="ai-small ai-muted">📝 ' + esc(E.g + " " + it.rs) + (it.k === "s" ? " ・ ① を えらぶと 変えられないよ(本番の 答案と 同じ)" : "") + '</p>' + exItemHtml(it, false) +
        '<div class="bz-exnav"><button type="button" class="ai-btn" data-bz-xgo="-1"' + (E.i ? "" : " disabled") + '>← まえ</button><button type="button" class="ai-btn" data-bz-xgo="1"' + (E.i + 1 < E.list.length ? "" : " disabled") + '>つぎ →</button></div>' +
        '<div class="bz-exmap">' + E.list.map((x, k) => '<button type="button" data-bz-xj="' + k + '" class="' + (exAnswered(x) ? "a" : "") + (k === E.i ? " on" : "") + '">' + (k + 1) + '</button>').join("") + '</div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-bz-xsubmit="1">答案を 出す(採点する)</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-ex");
    if(E && !E.end) tickExam();
  }

  /* ── ❌ まちがえた 問題(⭕❌・仕訳・計算。10こずつ) ── */
  function openReview(){
    const keys = shuffle(missList()).slice(0, QN);
    const list = keys.map(k => k[0] === "m" ? { k:"m", x:MBY.get(k.slice(2)) } : k[0] === "s" ? { k:"s", x:swMake(SBY.get(k.slice(2))) } : { k:"c", x:calcMake(+k.slice(2)) }).filter(it => it.x);
    if(!list.length){ const sh = sheet("ai-mq"); sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>❌ まちがえた 問題</h2><p class="ai-empty">まちがえた 問題は ないよ 🎉<br>🧾 仕訳クイズ・🧮 計算問題・📝 ⭕❌・🎯 模擬テストで まちがえると、ここに 入るよ。2回 つづけて 正解すると 消えるよ。計算問題は 新しい 数字で 出るよ。</p></div>'; sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq"); return; }
    sheet("ai-mq"); startPractice(list, true);
  }

  /* ── 📊 簿記の 図(ホーム。<details> で たたむ。コードで 描く)── */
  function bzCharts(){
    const tr = (h, c) => '<tr><th>' + h + '</th>' + c.map(x => '<td>' + x + '</td>').join("") + '</tr>';
    const flow = ["🧾 取引", "✍️ 仕訳(仕訳帳)", "📚 転記(総勘定元帳)", "🧮 試算表", "📊 決算整理(精算表)", "📄 貸借対照表・損益計算書"];
    return '<details class="ai-diag bz-charts"><summary class="ai-dh">📊 簿記の 図を ひらく <small>T字勘定・5つの 箱・帳簿の 流れ・精算表・決算書・原価の 流れ・CVP・連結</small></summary>' +
      '<h4>✍️ T字勘定(左が 借方・右が 貸方)</h4><svg class="bz-svg" viewBox="0 0 320 120" role="img" aria-label="T字勘定">' +
        '<line x1="30" y1="30" x2="290" y2="30" stroke="#334155" stroke-width="2"/><line x1="160" y1="30" x2="160" y2="110" stroke="#334155" stroke-width="2"/>' +
        '<text x="160" y="22" text-anchor="middle" font-size="13" font-weight="800">現金</text><text x="95" y="52" text-anchor="middle" font-size="12" fill="#1c7ed6" font-weight="800">借方(左)</text><text x="225" y="52" text-anchor="middle" font-size="12" fill="#e8590c" font-weight="800">貸方(右)</text>' +
        '<text x="95" y="78" text-anchor="middle" font-size="11">ふえた とき</text><text x="225" y="78" text-anchor="middle" font-size="11">へった とき</text><text x="160" y="104" text-anchor="middle" font-size="10" fill="#64748b">(資産の 勘定の ばあい)</text></svg>' +
      '<h4>📦 簿記の 5つの 箱</h4><table class="bz-tb"><tr><th>箱</th><th>ふえたら</th><th>へったら</th><th>決算書</th></tr>' +
        tr("資産(現金・売掛金・建物 …)", ["借方", "貸方", "貸借対照表"]) + tr("負債(買掛金・借入金 …)", ["貸方", "借方", "貸借対照表"]) + tr("純資産(資本金・繰越利益剰余金 …)", ["貸方", "借方", "貸借対照表"]) +
        tr("費用(仕入・給料・減価償却費 …)", ["借方", "(貸方)", "損益計算書"]) + tr("収益(売上・受取利息 …)", ["貸方", "(借方)", "損益計算書"]) + '</table>' +
      '<h4>🔁 取引から 決算書まで</h4><ol class="bz-flow">' + flow.map(x => '<li>' + x + '</li>').join("") + '</ol>' +
      '<h4>📊 精算表の 形(8けた)</h4><table class="bz-tb bz-sei"><tr><th rowspan="2">勘定科目</th><th colspan="2">試算表</th><th colspan="2">修正記入</th><th colspan="2">損益計算書</th><th colspan="2">貸借対照表</th></tr><tr><th>借方</th><th>貸方</th><th>借方</th><th>貸方</th><th>借方</th><th>貸方</th><th>借方</th><th>貸方</th></tr>' +
        '<tr><td>繰越商品</td><td>◯</td><td></td><td>◯</td><td>◯</td><td></td><td></td><td>◯</td><td></td></tr><tr><td>仕入</td><td>◯</td><td></td><td>◯</td><td>◯</td><td>◯</td><td></td><td></td><td></td></tr></table>' +
        '<p class="ai-small ai-muted">「しーくり くりしー」= 仕入 / 繰越商品(期首)・繰越商品 / 仕入(期末)。売上原価 = 期首商品 + 当期仕入 − 期末商品</p>' +
      '<h4>📄 貸借対照表 と 損益計算書</h4><div class="bz-bs"><div><b>貸借対照表</b><span class="a">資産</span><span class="l">負債</span><span class="e">純資産</span></div><div><b>損益計算書</b><span class="x">費用</span><span class="r">収益</span><span class="p">当期純利益</span></div></div>' +
        '<p class="ai-small ai-muted">左(借方)の 合計 = 右(貸方)の 合計。収益 − 費用 = 当期純利益 → 繰越利益剰余金へ</p>' +
      '<h4>🏭 原価の 流れ(工業簿記)</h4><ol class="bz-flow"><li>📦 材料・👷 賃金・💡 経費</li><li>🔧 仕掛品(つくっている とちゅう)</li><li>📦 製品(できあがり)</li><li>🛒 売上原価(売れた ぶん)</li></ol>' +
        '<p class="ai-small ai-muted">直接費は 仕掛品へ、間接費は 製造間接費に 集めて 配賦する</p>' +
      '<h4>📈 CVP(損益分岐点)</h4><svg class="bz-svg" viewBox="0 0 320 170" role="img" aria-label="CVPの図">' +
        '<line x1="30" y1="150" x2="300" y2="150" stroke="#334155"/><line x1="30" y1="150" x2="30" y2="15" stroke="#334155"/>' +
        '<line x1="30" y1="150" x2="290" y2="25" stroke="#1c7ed6" stroke-width="2.2"/><line x1="30" y1="100" x2="290" y2="45" stroke="#e8590c" stroke-width="2.2"/><line x1="30" y1="100" x2="290" y2="100" stroke="#94a3b8" stroke-dasharray="4 3"/>' +
        '<line x1="216" y1="61" x2="216" y2="150" stroke="#2f9e44" stroke-dasharray="3 3"/><circle cx="216" cy="61" r="5" fill="#2f9e44"/><text x="208" y="52" text-anchor="end" font-size="11" font-weight="800" fill="#2f9e44">損益分岐点</text>' +
        '<text x="250" y="28" font-size="11" fill="#1c7ed6" font-weight="800">売上高</text><text x="250" y="66" font-size="11" fill="#e8590c" font-weight="800">総原価</text><text x="60" y="114" font-size="10.5" fill="#64748b">固定費</text><text x="250" y="166" font-size="10.5" fill="#64748b">売上の 量</text></svg>' +
        '<p class="ai-small">損益分岐点売上高 = 固定費 ÷ 貢献利益率(貢献利益率 = 1 − 変動費率)</p>' +
      '<h4>🌐 連結(親会社 と 子会社)</h4><svg class="bz-svg" viewBox="0 0 320 130" role="img" aria-label="連結の図">' +
        '<rect x="110" y="10" width="100" height="36" rx="10" fill="#e7f5ff" stroke="#1c7ed6"/><text x="160" y="33" text-anchor="middle" font-size="12" font-weight="800">親会社 P社</text>' +
        '<rect x="110" y="84" width="100" height="36" rx="10" fill="#fff4e6" stroke="#e8590c"/><text x="160" y="107" text-anchor="middle" font-size="12" font-weight="800">子会社 S社</text>' +
        '<line x1="160" y1="46" x2="160" y2="84" stroke="#334155" stroke-width="2"/><text x="168" y="70" font-size="11">株式 80%</text>' +
        '<text x="222" y="70" font-size="10.5" fill="#64748b">のこり 20% =</text><text x="222" y="84" font-size="10.5" fill="#64748b">非支配株主持分</text>' +
        '<text x="10" y="64" font-size="10.5" fill="#64748b">投資 − 子会社の</text><text x="10" y="78" font-size="10.5" fill="#64748b">純資産 × 80% = のれん</text></svg>' +
      '</details>';
  }

  /* ── おす(日商簿記だけの ボタン) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-bz-ox],[data-bz-s1],[data-bz-s2],[data-bz-cans],[data-bz-pstart],[data-bz-pnext],[data-bz-popen],[data-bz-xstart],[data-bz-xg],[data-bz-xp],[data-bz-x1],[data-bz-x2],[data-bz-xc],[data-bz-xm],[data-bz-xgo],[data-bz-xj],[data-bz-xsubmit],[data-bz-xreset]");
    if(!t || t.disabled) return;
    const play = () => { if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return false; } return true; };
    const ds = t.dataset, top = id => { const sh = document.getElementById(id); if(sh) sh.scrollTop = 0; };
    const cur = () => pr && pr.list[pr.i];
    if(ds.bzOx !== undefined){ const it = cur(); if(it && it.k === "m" && pr.p === undefined){ pr.p = ds.bzOx === "1"; practiceAnswered(it); drawPractice(); } return; }
    if(ds.bzS1 !== undefined){ const it = cur(); if(it && it.k === "s" && it.x.p1 === undefined){ it.x.p1 = +ds.bzS1; drawPractice(); } return; }
    if(ds.bzS2 !== undefined){ const it = cur(); if(it && it.k === "s" && it.x.p2 === undefined){ it.x.p2 = +ds.bzS2; practiceAnswered(it); drawPractice(); } return; }
    if(ds.bzCans !== undefined){ if(ex && !ex.end && t.closest("#ai-ex")) return; const it = cur(); if(it && it.k === "c" && it.x.pk === undefined){ it.x.pk = +ds.bzCans; practiceAnswered(it); drawPractice(); } return; }
    if(ds.bzPstart){ if(play()) startPractice(); return; }
    if(ds.bzPopen){ openPractice(ds.bzPopen); return; }
    if(ds.bzPnext){ pr.i++; pr.p = undefined; drawPractice(); top("ai-mq"); return; }
    if(ds.bzXg){ exG = ds.bzXg; exPart = 0; drawExam(); return; }
    if(ds.bzXp !== undefined){ exPart = +ds.bzXp; drawExam(); return; }
    if(ds.bzXstart){ if(ex && !ex.end && !confirm("いまの テストを やめて、新しく はじめますか?")) return; if(play()){ ex = null; startExam(); top("ai-ex"); } return; }
    const xi = () => ex && !ex.end ? ex.list[ex.i] : null;
    if(ds.bzX1 !== undefined){ const it = xi(); if(it && it.x.p1 === undefined){ it.x.p1 = +ds.bzX1; drawExam(); } return; }
    if(ds.bzX2 !== undefined){ const it = xi(); if(it){ it.x.p2 = +ds.bzX2; drawExam(); } return; }
    if(ds.bzXc !== undefined){ const it = xi(); if(it){ it.x.pk = +ds.bzXc; drawExam(); } return; }
    if(ds.bzXm !== undefined){ const it = xi(); if(it){ it.p = ds.bzXm === "1"; drawExam(); } return; }
    if(ds.bzXgo){ ex.i = Math.max(0, Math.min(ex.list.length - 1, ex.i + +ds.bzXgo)); drawExam(); top("ai-ex"); return; }
    if(ds.bzXj){ ex.i = +ds.bzXj; drawExam(); top("ai-ex"); return; }
    if(ds.bzXsubmit){ const left = ex.list.filter(x => !exAnswered(x)).length; if(left && !confirm("まだ 答えていない 問題が " + left + "問 あります。採点しますか?")) return; submitExam(false); return; }
    if(ds.bzXreset){ ex = null; drawExam(); return; }
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
      if(o === "maru") return openPractice("m");
      if(o === "sw") return openPractice("s");
      if(o === "calc") return openPractice("c");
      if(o === "exam") return openExam();
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
.bz-charts h4{margin:12px 0 6px;font-size:14px}.bz-flow{margin:0;padding-left:22px;font-size:13px;line-height:1.9}
.bz-tb{width:100%;border-collapse:collapse;font-size:12px;background:#fff}.bz-tb th,.bz-tb td{border:1px solid #dee2e6;padding:4px 5px;text-align:left;vertical-align:top}.bz-tb th{background:#f1f3f5}
.bz-sei{font-size:10.5px}.bz-sei th,.bz-sei td{padding:3px 2px;text-align:center}.bz-charts{overflow-x:auto}
.bz-svg{display:block;width:100%;max-width:320px;margin:0 auto}
.bz-bs{display:grid;grid-template-columns:1fr 1fr;gap:8px}.bz-bs div{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr 1fr;gap:2px;font-size:12px;font-weight:800}.bz-bs b{grid-column:1/-1;text-align:center}
.bz-bs span{border-radius:6px;padding:6px 4px;text-align:center}.bz-bs .a{grid-row:2/4;background:#e7f5ff}.bz-bs .l{background:#fff4e6}.bz-bs .e{background:#ebfbee}.bz-bs .x{grid-row:2/3;background:#fff0f6}.bz-bs .r{grid-row:2/4;grid-column:2;background:#f3f0ff}.bz-bs .p{grid-row:3/4;grid-column:1;background:#ebfbee}
.bz-q{font-size:15.5px;line-height:1.9}.bz-ox{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:4px 0 6px}
.bz-oxb{font:inherit;font-size:30px;padding:10px 0;border-radius:16px;border:2px solid #fed7aa;background:#fff;cursor:pointer;line-height:1}
.bz-oxb.pk{border-color:#e8590c;background:#fff4e6;box-shadow:0 0 0 2px #e8590c inset}.bz-oxb.ok{background:#dcfce7;border-color:#22c55e}.bz-oxb.ng{background:#fee2e2;border-color:#ef4444}.bz-oxb:disabled{cursor:default}
.bz-law{display:block;color:#64748b;font-size:11.5px;margin-top:4px}
.bz-ch .ai-btn{display:flex;gap:6px;align-items:center;padding:8px}.bz-ch .ai-btn>b{flex:none}
.bz-ent{flex:1;min-width:0;display:grid;grid-template-columns:1fr 1fr;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-size:12.5px;font-weight:700;line-height:1.55;background:#fff}
.bz-ent>span{padding:4px 6px;min-width:0;word-break:break-word}.bz-ent>span+span{border-left:2px solid #334155}.bz-ent i{display:block;font-style:normal;font-size:10px;color:#1c7ed6}.bz-ent>span+span i{color:#e8590c}.bz-ent b,.ai-qch .ai-btn .bz-ent b{display:block;min-width:0;font-variant-numeric:tabular-nums;white-space:nowrap}
.bz-ch .ai-btn.pk,.bz-nch .ai-btn.pk{border-color:#e8590c;background:#fff4e6}
.bz-t{width:100%;border-collapse:collapse;font-size:12.5px;margin:6px 0;background:#fff}.bz-t th{border-bottom:2px solid #334155;padding:2px 6px}.bz-t td{padding:2px 6px;vertical-align:top}.bz-t td+td,.bz-t th+th{border-left:2px solid #334155}.bz-t b{font-variant-numeric:tabular-nums}
.bz-gsel{font:inherit;font-size:12.5px;padding:8px 4px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#334155;min-width:0}
.bz-gtab{display:flex;gap:6px;margin:4px 0 8px;flex-wrap:wrap}.bz-gtab button{flex:1;padding:8px 6px;border-radius:99px;border:1.5px solid #e2e8f0;background:#fff;font:inherit;font-size:13px;font-weight:800;color:#334155;cursor:pointer}.bz-gtab button.on{background:#e8590c;border-color:#e8590c;color:#fff}
.bz-exhead{display:flex;justify-content:space-between;font-weight:900;font-size:13px;margin:0 0 6px;position:sticky;top:-14px;background:#fff;padding:6px 0;z-index:2}#bz-clock{color:#e8590c;font-variant-numeric:tabular-nums}#bz-clock.warn{color:#e03131}
.bz-exnav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.bz-exmap{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.bz-exmap button{width:30px;height:28px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font:inherit;font-size:11px;color:#94a3b8;cursor:pointer}
.bz-exmap button.a{background:#fff4e6;border-color:#ffc078;color:#d9480f}.bz-exmap button.on{outline:2px solid #e8590c}
.bz-res{text-align:center;border-radius:16px;padding:14px;margin:6px 0 12px}.bz-res.pass{background:#dcfce7}.bz-res.near{background:#fff9db}.bz-res.fail{background:#fff4e6}.bz-res b{display:block;font-size:20px}.bz-res span{display:block;font-size:22px;font-weight:900}.bz-res small{color:#475569}
.bz-by{width:100%;border-collapse:collapse;font-size:13px;margin:0 0 10px}.bz-by th{text-align:left;font-weight:800;padding:3px 4px}.bz-by td{padding:3px 4px;font-variant-numeric:tabular-nums;white-space:nowrap}.bz-by td:last-child{width:40%}
.bz-by i{display:block;height:8px;border-radius:99px;background:#e2e8f0;position:relative;overflow:hidden}.bz-by i::after{content:"";position:absolute;inset:0;width:var(--w);background:#e8590c}
.bz-rv{border-left:4px solid #fa5252;background:#fff5f5;border-radius:8px;padding:6px 10px;margin:6px 0;font-size:13px;line-height:1.7}.bz-rv p{margin:0 0 2px;font-weight:700}
.bz-rvb{border-top:1px dashed #e2e8f0;padding-top:6px;margin-top:8px}
.ai-btns .bz-big{grid-column:1/-1;background:#e8590c;border-color:#e8590c;color:#fff}.ai-rs.bz-g{background:#e7f5ff;color:#1864ab;border-color:#74c0fc}
.map-card{display:none}
.ai-panel{background:linear-gradient(160deg,#fff4e6 0%,#f8f9fa 55%,#e7f5ff 100%);border:1px solid #ffc078;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#1c7ed6;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#e8590c,#1c7ed6,#7048e8);border-radius:99px}
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
.ai-qlead{font-size:13.5px;line-height:1.8;margin:4px 0 10px}.ai-qset{grid-template-columns:1fr 1fr}.ai-go{background:#e8590c;border-color:#e8590c;color:#fff}
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#1c7ed6}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"bokiterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
