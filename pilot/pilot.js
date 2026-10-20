/* フリックパイロット: 飛行機と 空の ことばを、フリックで 打って おぼえる。(けいくん 2026-10-20「パイロットに受かるレベルになるために必要な知識をフリック形式の問題にしてください」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「パイロットの 旅」を 足す ファイル。pilot/ の ページだけが 読む ─
   ことばは tools/pilot/meta.json + tools/pilot/terms-*.json → tools/pilot/terms_js.py が data/pilot.json と pilot/terms.js(PILOT_TERMS)に する。
   **ことばを 足す・直すのは tools/pilot/terms-<旅>.json だけ**
   ・もとは フリック整備士(seibi/seibi.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 9つ(操縦士の 学科試験の 科目に そろえた): ✈️ 飛行機のきほん / 🪽 飛ぶしくみ / 🎛 計器とエンジン / ☁️ 空の天気 / 🧭 空の道と地図 / 🎧 無線と英語 / 📜 空のきまり / 🛫 空港と管制 / 👨‍✈️ パイロットのしごとと歴史。+ 🏆 マスター
   ・レベルは 入門 → 自家用めやす → 事業用めやす。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・こたえると ことばの 説明・つながる ことば・無線の 語は 🎧 こうしんで が 出る。しくみ図は コードで 描く
   ・🧩 4択クイズ(整備士と 同じ)・🧮 計算問題(単位・速さ・燃料・風・滑走路・重心・気温・降下。数字は 毎回 かわる)
   ⚠️ ことばを おぼえる ゲーム。これで 飛べる わけでは ない(実際は 訓練校と 教官)。事故の 話・こわい 字は 入れない */
const PILOT = (() => {
  const D = PILOT_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に plkihon … plmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { kihon:"plkihon", yoku:"plyoku", keiki:"plkeiki", tenki:"pltenki", koho:"plkoho", musen:"plmusen", hoki:"plhoki", kuko:"plkuko", jinbutsu:"pljinbutsu" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"pilotterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
    levels.plmas = lv; pools.plmas = ALL; colors.plmas = "#e0202e";
    maps.plmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　9つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  const MODES_ALL = ["plkihon", "plyoku", "plkeiki", "pltenki", "plkoho", "plmusen", "plhoki", "plkuko", "pljinbutsu", "plmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-pilot[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-pilot-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-pilot");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-pilot"), JSON.stringify(v)); memo = { k:pkey("flick-pilot"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-pilot-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-pilot-fav"), JSON.stringify(a)); return i < 0; }
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
  /* うしろに うすく 描く 形(飛行機の 上から 見た 形)。箱の 位置とは 合わせない(めやすの 絵)。⚠️ 実在の 会社の 塗り分けは 描かない */
  const BG = {
    plane:'<g opacity=".08" fill="#0f172a"><path d="M180 14 Q194 34 195 80 L195 292 Q191 330 180 348 Q169 330 165 292 L165 80 Q166 34 180 14Z"/><path d="M165 132 L14 196 L14 218 L165 186Z"/><path d="M195 132 L346 196 L346 218 L195 186Z"/><path d="M167 296 L104 326 L104 340 L168 322Z"/><path d="M193 296 L256 326 L256 340 L192 322Z"/></g>'
  };
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
           (prev.ko ? '<p class="ai-ko">🎧 こうしんで: ' + esc(prev.ko) + '</p>' : "") +
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
    if(q.ko) h += '<p class="ai-ex ai-kob"><b>🎧 こうしんで</b>' + q.korb + '</p>';  // 無線・管制の 語だけ。交信で どう 使うか(本物の 交信の 文は のせない)
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.f) h += '<p class="ai-small ai-muted">📚 学科の 分野: ' + esc(q.f) + '</p>';
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
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="calc">🧮 計算問題</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
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
    }else chips.innerHTML = '<p class="ai-lead">9つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "plmas") return { name:"マスター" + (i + 1), sub:"9つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };
  }

  /* ── ことば図鑑(検索・旅・分類・むずかしさ・お気に入りで しぼれる) ── */
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
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 ことば図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 揚力)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name.replace("パイロットのしごとと歴史", "しごとと歴史"), zf.j)).join("") + '</select>' +
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

  /* ── 🧮 計算問題(フリックパイロット。けいくん 2026-10-20「3つとも足してください」)──
     ・学科試験(空中航法・航空気象・航空工学)に よく 出る 形の 計算を、数字を 毎回 かえて 出す(**問題も 答えも プログラムが 作る**。過去問は 写さない)
     ・まちがいの 3つは「よく ある まちがい」から 作る(単位の なおし わすれ・逆に 割る・60で 割り わすれ など)
     ・答えた あとに 式と 途中の 計算を 出す。数字は きりの よい 練習用(⚠️ 実際の 飛行の 計算には 使えない。画面にも 書く)
     ・1つの 問題 = { g:なかま, lv:"入門"/"自家用"/"事業用", q:問題文, a:答え, d:小数の けた, u:単位, w:[まちがい…], ex:[とき方…], fmt:(なくてよい)表示の しかた } */
  const ri = (a, b, st) => { st = st || 1; return a + st * Math.floor(Math.random() * (Math.floor((b - a) / st) + 1)); };
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const nf = (x, d) => Number(x.toFixed(d)).toLocaleString("ja-JP", { maximumFractionDigits:d, minimumFractionDigits:0 });
  const hm = m => { m = ((Math.round(m) % 1440) + 1440) % 1440; return Math.floor(m / 60) + "時" + String(m % 60).padStart(2, "0") + "分"; };
  const rwy = x => String(Math.round(x)).padStart(2, "0");  // 滑走路の 番号は 2けた(07 など)
  const SIN = { 30:0.5, 45:0.71, 60:0.87, 90:1 }, COS = { 30:0.87, 45:0.71, 60:0.5, 90:0 };
  const CALC_G = [["tani", "📏 単位の なおし"], ["sokudo", "⏱ 速さ・時間・きょり"], ["nenryo", "⛽ 燃料"], ["kaze", "🌬 風の 計算"], ["kassoro", "🛫 滑走路と 風"], ["juushin", "⚖️ 重さと 重心"], ["kion", "🌡 高さと 気温"], ["koka", "⬇️ 降下の 計算"]];
  const CALC = [
    /* 📏 単位の なおし */
    () => { const kt = pk([60, 80, 100, 120, 150, 200, 250, 300, 450]), a = kt * 1.852;
      return { g:"tani", lv:"入門", q:"速さ " + kt + " ノット は、時速 およそ 何km？(1海里 = 1.852 km)", a, d:0, u:"km/h",
        w:[kt * 1.609, kt / 1.852, kt * 3.6],
        ex:["1ノット = 1時間に 1海里(1.852 km)進む 速さ", "時速 = " + kt + " × 1.852 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " km", "⚠️ 1.609 は ふつうの マイル(陸の マイル)。空と 海は 海里を 使う"] }; },
    () => { const ft = pk([1000, 3000, 5000, 10000, 30000, 35000, 41000]), a = ft * 0.3048;
      return { g:"tani", lv:"入門", q:"高さ " + nf(ft, 0) + " フィート は、およそ 何m？(1フィート = 0.3048 m)", a, d:0, u:"m",
        w:[ft / 0.3048, ft * 3.048, ft * 0.03048],
        ex:["フィート → メートル は 0.3048 を かける", "= " + nf(ft, 0) + " × 0.3048 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " m", "⚠️ メートル → フィート の ときは 0.3048 で 割る"] }; },
    () => { const m = pk([1500, 2000, 2500, 3000, 3500, 4000]), a = m / 0.3048;
      return { g:"tani", lv:"入門", q:"長さ " + nf(m, 0) + " m の 滑走路は、およそ 何フィート？(1フィート = 0.3048 m)", a, d:0, u:"ft",
        w:[m * 0.3048, m / 0.3048 / 10, m * 1.852],
        ex:["メートル → フィート は 0.3048 で 割る", "= " + nf(m, 0) + " ÷ 0.3048 = " + nf(a, 0) + " ft", "⚠️ 0.3048 を かけると 逆(フィート → メートル)に なる"] }; },
    () => { const nm = pk([10, 25, 50, 100, 250, 500]), a = nm * 1.852;
      return { g:"tani", lv:"入門", q:nm + " 海里(NM)は、およそ 何km？(1海里 = 1.852 km)", a, d:1, u:"km",
        w:[nm * 1.609, nm / 1.852, nm * 1.852 * 10],
        ex:["1海里 = 1.852 km", "= " + nm + " × 1.852 = " + nf(a, 1) + " km"] }; },
    () => { const c = pk([5, 10, 15, 20, 25, 30, 35]), a = c * 9 / 5 + 32;
      return { g:"tani", lv:"自家用", q:"気温 " + c + " °C は、何 °F？(°F = °C × 9 ÷ 5 + 32)", a, d:0, u:"°F",
        w:[c * 9 / 5, (c + 32) * 5 / 9, c * 5 / 9 + 32],
        ex:["°F = °C × 9 ÷ 5 + 32", "= " + c + " × 9 ÷ 5 + 32 = " + nf(c * 9 / 5, 0) + " + 32 = " + nf(a, 0) + " °F", "⚠️ + 32 を わすれやすい"] }; },
    () => { const h = pk([990, 1000, 1010, 1013, 1020, 1030]), a = h / 33.86;
      return { g:"tani", lv:"自家用", q:"気圧 " + h + " hPa は、およそ 何 inHg？(1 inHg = 33.86 hPa)", a, d:2, u:"inHg",
        w:[h * 33.86 / 1000, h / 29.92, h / 33.86 * 10],
        ex:["inHg に なおすには 33.86 で 割る", "= " + h + " ÷ 33.86 = " + nf(a, 2) + " inHg", "標準大気の 1013.25 hPa = 29.92 inHg"] }; },
    /* ⏱ 速さ・時間・きょり */
    () => { const gs = pk([90, 100, 120, 150, 180, 240, 300, 450]), t = pk([20, 30, 40, 45, 90, 120]), a = gs * t / 60;
      return { g:"sokudo", lv:"入門", q:"対地速度 " + gs + " ノット で " + t + " 分 飛ぶと、何 海里(NM)進む？", a, d:1, u:"NM",
        w:[gs * t, gs * t / 100, gs / t * 60],
        ex:[t + " 分 = " + t + " ÷ 60 = " + nf(t / 60, 2) + " 時間", "きょり = 速さ × 時間 = " + gs + " × " + t + " ÷ 60 = " + nf(a, 1) + " NM", "⚠️ 分の ままで かけると 60倍に なる"] }; },
    () => { const gs = pk([90, 120, 150, 180, 240]), t = pk([20, 30, 40, 50, 60, 80, 90]), dist = gs * t / 60;
      return { g:"sokudo", lv:"自家用", q:nf(dist, 0) + " 海里(NM)先の 空港へ、対地速度 " + gs + " ノット で 飛ぶ。何分 かかる？", a:t, d:0, u:"分",
        w:[gs / dist * 60, dist / gs * 100, dist / gs * 60 * 1.852],
        ex:["時間 = きょり ÷ 速さ = " + nf(dist, 0) + " ÷ " + gs + " = " + nf(dist / gs, 2) + " 時間", "分に なおす: × 60 = " + t + " 分", "⚠️ 速さ ÷ きょり と 逆に 割らない"] }; },
    () => { const dep = 9 * 60 + ri(0, 5) * 10, t = pk([30, 40, 50, 70, 80, 90, 100, 110]), gs = pk([120, 150, 180]), dist = gs * t / 60, wrongDec = dep + Math.floor(t / 60) * 60 + Math.round((t / 60 % 1) * 100);
      return { g:"sokudo", lv:"自家用", q:hm(dep) + " に 出発。" + nf(dist, 0) + " 海里(NM)を 対地速度 " + gs + " ノット で 飛ぶと、着く 時刻は？", a:dep + t, d:0, u:"", fmt:hm,
        w:[wrongDec, dep + t + 30, dep + t - 20],
        ex:["かかる 時間 = " + nf(dist, 0) + " ÷ " + gs + " = " + nf(t / 60, 2) + " 時間 = " + t + " 分", "着く 時刻 = " + hm(dep) + " + " + t + " 分 = " + hm(dep + t), "⚠️ 1.5時間 は 1時間30分(1時間50分 では ない)"] }; },
    /* ⛽ 燃料 */
    () => { const b = pk([30, 35, 40, 45, 50]), t = pk([1.5, 2, 2.5, 3]), a = b * t;
      return { g:"nenryo", lv:"入門", q:"1時間に 燃料を " + b + " リットル 使う 飛行機が " + t + " 時間 飛ぶ。使う 燃料は？", a, d:1, u:"L",
        w:[b + t, b * t * 60, b / t],
        ex:["使う 量 = 1時間の 量 × 時間", "= " + b + " × " + t + " = " + nf(a, 1) + " L"] }; },
    () => { const b = pk([30, 36, 40, 48]), t = pk([1, 1.5, 2, 2.5]), a = b * (t + 0.75);
      return { g:"nenryo", lv:"自家用", q:"1時間に " + b + " リットル 使う 飛行機。飛ぶ 時間は " + t + " 時間で、予備として さらに 45分ぶん 積むと 決めた。積む 燃料は ぜんぶで？", a, d:1, u:"L",
        w:[b * t, b * (t + 0.45), b * t + 45],
        ex:["45分 = 0.75 時間", "ぜんぶの 時間 = " + t + " + 0.75 = " + nf(t + 0.75, 2) + " 時間", "燃料 = " + b + " × " + nf(t + 0.75, 2) + " = " + nf(a, 1) + " L", "⚠️ 45分を 0.45時間に しない"] }; },
    () => { const lb = pk([1000, 2000, 5000, 10000, 20000]), a = lb * 0.4536;
      return { g:"nenryo", lv:"自家用", q:"燃料 " + nf(lb, 0) + " ポンド(lb)は、およそ 何kg？(1ポンド = 0.4536 kg)", a, d:0, u:"kg",
        w:[lb / 0.4536, lb * 0.4536 / 10, lb * 2.2],
        ex:["ポンド → kg は 0.4536 を かける", "= " + nf(lb, 0) + " × 0.4536 = " + nf(a, 0) + " kg", "⚠️ 1 kg は 約2.2 ポンド。kg の ほうが 数は 小さく なる"] }; },
    () => { const L = pk([1000, 2000, 5000, 10000, 20000]), a = L * 0.8;
      return { g:"nenryo", lv:"事業用", q:"ジェット燃料 " + nf(L, 0) + " リットル の 重さは およそ？(1リットル = 約 0.8 kg と する)", a, d:0, u:"kg",
        w:[L / 0.8, L * 8, L * 0.08],
        ex:["重さ = 体積 × 1リットルの 重さ", "= " + nf(L, 0) + " × 0.8 = " + nf(a, 0) + " kg", "⚠️ 燃料は 水(1リットル = 1kg)より 軽い"] }; },
    /* 🌬 風の 計算 */
    () => { const tas = pk([100, 120, 150, 200, 250, 450]), w = pk([10, 15, 20, 25, 30, 40, 50]), head = Math.random() < .5, a = head ? tas - w : tas + w;
      return { g:"kaze", lv:"入門", q:"真対気速度 " + tas + " ノット で 飛ぶ。まっすぐ " + (head ? "向かい風" : "追い風") + " " + w + " ノット の とき、対地速度は？", a, d:0, u:"kt",
        w:[head ? tas + w : tas - w, tas, head ? tas - 2 * w : tas + 2 * w],
        ex:[head ? "向かい風は 地面に 対して おそく なる: 速さ − 風" : "追い風は 地面に 対して 速く なる: 速さ + 風", "= " + tas + (head ? " − " : " + ") + w + " = " + a + " kt"] }; },
    () => { const wd = pk([10, 12, 15, 20, 24, 30]), ang = pk([30, 45, 60]), a = wd * SIN[ang];
      return { g:"kaze", lv:"自家用", q:"風 " + wd + " ノット が、進む 向きから " + ang + "° ずれた 方向から 吹いている。横風の 強さ(横から おす 分)は？(sin" + ang + "° = " + SIN[ang] + ")", a, d:1, u:"kt",
        w:[wd * COS[ang], wd, wd / SIN[ang]],
        ex:["横風 = 風 × sin(角度)", "= " + wd + " × " + SIN[ang] + " = " + nf(a, 1) + " kt", "⚠️ cos を かけると 向かい風の 分に なる"] }; },
    () => { const wd = pk([10, 12, 15, 20, 24, 30]), ang = pk([30, 45, 60]), a = wd * COS[ang];
      return { g:"kaze", lv:"自家用", q:"風 " + wd + " ノット が、進む 向きから " + ang + "° ずれた 正面がわから 吹いている。向かい風の 分は？(cos" + ang + "° = " + COS[ang] + ")", a, d:1, u:"kt",
        w:[wd * SIN[ang], wd, wd / COS[ang]],
        ex:["向かい風の 分 = 風 × cos(角度)", "= " + wd + " × " + COS[ang] + " = " + nf(a, 1) + " kt"] }; },
    () => { const xw = pk([10, 15, 20, 25]), tas = pk([100, 120, 150, 200, 300]), a = xw / tas * 60;
      return { g:"kaze", lv:"事業用", q:"真対気速度 " + tas + " ノット、横風 " + xw + " ノット。偏流角(風で 横に ながされる 角度)は およそ 何度？(おおよそ = 横風 ÷ 速さ × 60)", a, d:1, u:"°",
        w:[tas / xw, xw / tas * 100, xw * tas / 60],
        ex:["偏流角 ≒ 横風 ÷ 速さ × 60(「60の きまり」と よばれる おおよその 計算)", "= " + xw + " ÷ " + tas + " × 60 = " + nf(a, 1) + "°", "速い 飛行機ほど ながされにくい"] }; },
    /* 🛫 滑走路と 風 */
    () => { const n = ri(1, 36), a = n * 10;
      return { g:"kassoro", lv:"入門", q:"滑走路の 番号が「" + String(n).padStart(2, "0") + "」。この 滑走路は およそ 何度の 向き？(北 = 360°)", a, d:0, u:"°",
        w:[n, (n * 10 + 180) % 360, n * 100],
        ex:["滑走路の 番号 = 磁方位の 10分の1", "向き = " + n + " × 10 = " + a + "°"] }; },
    () => { const n = ri(1, 17), a = n + 18;
      return { g:"kassoro", lv:"入門", q:"滑走路の 片方の 端が「" + String(n).padStart(2, "0") + "」。反対がわの 端の 番号は？", a, d:0, u:"", fmt:rwy,
        w:[n + 9, 36 - n, n * 2, n + 12, n + 16].map(x => (x - 1) % 36 + 1), rng:[1, 36],
        ex:["反対の 向きは 180° ちがう = 番号で 18 ちがう", "= " + n + " + 18 = " + rwy(a), "1つの 滑走路には 両はしに ちがう 番号が ある"] }; },
    () => { let hd = ri(6, 354); if(hd % 10 === 5) hd++; const a = Math.round(hd / 10) || 36;
      return { g:"kassoro", lv:"自家用", q:"磁方位 " + hd + "° の 向きの 滑走路。番号は？", a, d:0, u:"", fmt:x => x > 36 ? String(Math.round(x)) : rwy(x),
        rng:[1, 36], w:[hd, a + 18 > 36 ? a - 18 : a + 18, Math.floor(hd / 100)],
        ex:["10で 割って 四捨五入", "= " + hd + " ÷ 10 = " + nf(hd / 10, 1) + " → " + rwy(a)] }; },
    () => { const rw = ri(1, 36), ang = pk([30, 45, 60]), wd = pk([10, 12, 16, 20, 24]), from = (rw * 10 + ang) % 360 || 360, a = wd * SIN[ang];
      return { g:"kassoro", lv:"自家用", q:"滑走路 " + String(rw).padStart(2, "0") + " に おりる。風は " + String(from).padStart(3, "0") + "° から " + wd + " ノット。横風の 分は？(sin" + ang + "° = " + SIN[ang] + "、cos" + ang + "° = " + COS[ang] + ")", a, d:1, u:"kt",
        w:[wd * COS[ang], wd, wd * SIN[ang] * 2],
        ex:["滑走路の 向き = " + rw * 10 + "°、風との ちがい = " + ang + "°", "横風 = 風 × sin" + ang + "° = " + wd + " × " + SIN[ang] + " = " + nf(a, 1) + " kt", "⚠️ cos を かけると 向かい風の 分"] }; },
    /* ⚖️ 重さと 重心 */
    () => { const W = pk([60, 70, 80, 90, 100]), arm = pk([1.0, 1.2, 1.5, 2.0, 2.5]), a = W * arm;
      return { g:"juushin", lv:"自家用", q:"重さ " + W + " kg の 人が、基準の 線から " + arm + " m の 席に すわる。モーメント(重さ × うでの 長さ)は？", a, d:1, u:"kg·m",
        w:[W + arm, W / arm, W * arm * 10],
        ex:["モーメント = 重さ × うでの 長さ", "= " + W + " × " + arm + " = " + nf(a, 1) + " kg·m"] }; },
    () => { const W1 = pk([600, 650, 700]), A1 = pk([2.0, 2.1, 2.2]), W2 = pk([70, 80, 90]), A2 = pk([1.8, 2.0]), W3 = pk([60, 80, 100]), A3 = pk([2.4, 2.5]);
      const M = W1 * A1 + W2 * A2 + W3 * A3, Wt = W1 + W2 + W3, a = M / Wt;
      return { g:"juushin", lv:"事業用", q:"機体 " + W1 + " kg(うで " + A1 + " m)、操縦する人 " + W2 + " kg(うで " + A2 + " m)、燃料 " + W3 + " kg(うで " + A3 + " m)。重心の 位置は 基準から 何m？", a, d:2, u:"m",
        w:[(A1 + A2 + A3) / 3, M / W1, Wt / M],
        ex:["それぞれの モーメント: " + nf(W1 * A1, 0) + " + " + nf(W2 * A2, 0) + " + " + nf(W3 * A3, 0) + " = " + nf(M, 0) + " kg·m", "重さの 合計: " + Wt + " kg", "重心 = モーメントの 合計 ÷ 重さの 合計 = " + nf(M, 0) + " ÷ " + Wt + " = " + nf(a, 2) + " m", "⚠️ うでの 長さを ただ 平均しない"] }; },
    () => { const mx = pk([1000, 1100, 1150, 1200]), em = pk([650, 700, 750]), pp = pk([140, 160, 180, 200]), a = mx - em - pp;
      return { g:"juushin", lv:"自家用", q:"いちばん 重く して よい 重さが " + nf(mx, 0) + " kg の 飛行機。機体だけで " + em + " kg、乗る 人と 荷物で " + pp + " kg。燃料は あと 何kg まで 積める？", a, d:0, u:"kg",
        w:[mx - em, mx - pp, mx + em - pp],
        ex:["のこり = いちばん 重く して よい 重さ − 機体 − 人と 荷物", "= " + mx + " − " + em + " − " + pp + " = " + a + " kg"] }; },
    /* 🌡 高さと 気温 */
    () => { const T0 = pk([20, 25, 30]), H = pk([3000, 5000, 8000, 10000].filter(h => T0 - 2 * h / 1000 >= 2)), a = T0 - 2 * H / 1000;
      return { g:"kion", lv:"自家用", q:"地上(海面の 高さ)の 気温が " + T0 + " °C。1000フィート 上がるごとに 2 °C 下がると すると、" + nf(H, 0) + " フィートの 気温は？", a, d:0, u:"°C",
        w:[T0 - H / 1000, T0 + 2 * H / 1000, T0 - 2 * H / 10000],
        ex:["下がる 気温 = 2 °C × " + nf(H, 0) + " ÷ 1000 = " + 2 * H / 1000 + " °C", "= " + T0 + " − " + 2 * H / 1000 + " = " + a + " °C", "これを 気温減率と いう(標準大気で 1000フィートに 約2 °C)"] }; },
    () => { const T0 = pk([10, 12, 14, 16, 20]), a = T0 / 2 * 1000;
      return { g:"kion", lv:"事業用", q:"地上(海面の 高さ)の 気温が " + T0 + " °C。1000フィートごとに 2 °C 下がると すると、0 °C に なる 高さは？", a, d:0, u:"ft",
        w:[T0 * 1000, T0 * 2 * 1000, T0 / 2 * 100],
        ex:["0 °C まで 下がる 気温 = " + T0 + " °C", "高さ = " + T0 + " ÷ 2 × 1000 = " + nf(a, 0) + " ft", "この 高さより 上の 雲の 中では 着氷に 気を つける"] }; },
    () => { const q1 = pk([1013, 1010, 1020]), dd = pk([5, 8, 10, 12, 15]), q2 = q1 - dd, a = dd * 30;
      return { g:"kion", lv:"自家用", q:"高度計を " + q1 + " hPa に 合わせて 飛んできた。着く 空港の 気圧は " + q2 + " hPa。合わせなおさないと 高度計は 何フィート ずれる？(1 hPa で 約 30 フィート)", a, d:0, u:"ft",
        w:[dd * 3, dd * 300, dd * 30 * 0.3048],
        ex:["気圧の ちがい = " + q1 + " − " + q2 + " = " + dd + " hPa", "ずれ = " + dd + " × 30 = " + a + " ft", "だから 着く 前に その 空港の 気圧に 合わせなおす"] }; },
    /* ⬇️ 降下の 計算 */
    () => { const alt = pk([3000, 6000, 9000, 12000, 30000, 33000]), a = alt / 300;
      return { g:"koka", lv:"事業用", q:nf(alt, 0) + " フィート おりたい。3度の 道で おりると 1海里で 約 300 フィート おりる。何 海里(NM)手前から おりはじめる？", a, d:0, u:"NM",
        w:[alt / 1000, alt / 100, alt / 30],
        ex:["きょり = おりる 高さ ÷ 1海里で おりる 高さ", "= " + nf(alt, 0) + " ÷ 300 = " + nf(a, 0) + " NM"] }; },
    () => { const gs = pk([90, 100, 120, 140, 150, 160, 180]), a = gs / 60 * 300;
      return { g:"koka", lv:"事業用", q:"対地速度 " + gs + " ノット で、3度の 道(1海里で 約 300 フィート)を おりる。1分間に 何フィート おりる？", a, d:0, u:"ft/分",
        w:[gs * 300, gs / 60 * 30, gs * 3],
        ex:["1分に 進む きょり = " + gs + " ÷ 60 = " + nf(gs / 60, 2) + " NM", "1分に おりる 高さ = " + gs + " ÷ 60 × 300 = " + nf(a, 0) + " ft", "おおよそ「対地速度 × 5」と おぼえる 人も いる"] }; },
    () => { const alt = pk([3000, 4500, 6000, 9000]), rate = pk([500, 750, 1000, 1500]), a = alt / rate;
      return { g:"koka", lv:"自家用", q:nf(alt, 0) + " フィート おりる。1分間に " + rate + " フィート ずつ おりると、何分 かかる？", a, d:1, u:"分",
        w:[rate / alt * 60, alt / rate * 60, alt * rate / 100000],
        ex:["時間 = おりる 高さ ÷ 1分に おりる 高さ", "= " + nf(alt, 0) + " ÷ " + rate + " = " + nf(a, 1) + " 分"] }; },
  ];
  /* 4つの 答え(正しい 答え + まちがい 3つ)。同じ 表示に なった まちがいは べつの 数に かえる */
  function calcMake(gen){
    const P = gen(), show = x => P.fmt ? P.fmt(x) : nf(x, P.d) + (P.u ? " " + P.u : ""), A = show(P.a), seen = new Set([A]), ch = [{ t:A, ok:true }];
    for(const x of P.w.concat([P.a * 1.5, P.a * 0.5, P.a * 2, P.a * 0.8, P.a * 1.25])){
      if(ch.length >= 4) break;
      if(!isFinite(x) || x <= 0) continue;
      if(P.rng && (Math.round(x) < P.rng[0] || Math.round(x) > P.rng[1]) && x !== P.w[0]) continue;  // 滑走路の 番号は 01〜36(方位の 数を まちがいに する ときだけ そのまま)
      const s = show(x); if(seen.has(s) || /^0(\D|$)/.test(s)) continue;  // 「0 °」の ような 表示に なる まちがいは 出さない
      seen.add(s); ch.push({ t:s, ok:false });
    }
    P.ch = shuffle(ch); P.A = A; return P;
  }
  let calc = null, cset = { g:"" };
  function openCalc(){ calc = null; sheet("ai-cq"); drawCalc(); }
  function startCalc(){
    const gens = CALC.filter(f => !cset.g || f().g === cset.g);
    const order = shuffle(gens.concat(gens, gens)).slice(0, QN);
    calc = { list:order.map(calcMake), i:0, ok:0, picked:null };
    drawCalc();
  }
  function drawCalc(){
    const sh = document.getElementById("ai-cq"), C = calc, GN = Object.fromEntries(CALC_G);
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🧮 計算問題</h2>';
    if(!C){
      h += '<p class="ai-qlead">操縦士の 学科試験に よく 出る 形の 計算だよ。数字は 毎回 かわるので、何回でも 新しい 問題に なるよ。答えた あとに とき方が 出るよ。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset" style="grid-template-columns:1fr"><select id="ai-cg"><option value="">🧮 ぜんぶの なかま</option>' +
        CALC_G.map(([v, l]) => '<option value="' + v + '"' + (cset.g === v ? " selected" : "") + '>' + esc(l) + '</option>').join("") + '</select></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">はじめる</button>' +
        '<p class="ai-note">ゲームの 練習問題です。数字は 練習用の きりの よい もので、実際の 飛行の 計算には 使えません。問題は この ゲームが 作った もので、本物の 試験の 問題では ありません。電卓を 使っても OK。</p>';
    }else if(C.i >= C.list.length){
      h += '<p class="ai-qres">' + C.ok + ' / ' + C.list.length + ' 問 正解！' + (C.ok === C.list.length ? " 🎉" : "") + '</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">もう一度(新しい 数字で)</button><button type="button" class="ai-btn ai-wide" data-ai-open="calc">なかまを えらびなおす</button>';
    }else{
      const P = C.list[C.i], done = C.picked !== null;
      h += '<p class="ai-qn">' + (C.i + 1) + ' / ' + C.list.length + '　<span>' + esc(GN[P.g]) + ' ・ ' + esc(P.lv === "入門" ? "入門" : P.lv + "めやす") + '</span></p><p class="ai-qq">' + esc(P.q) + '</p>' +
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
    const g = sh.querySelector("#ai-cg"); if(g) g.onchange = e => { cset.g = e.target.value; };
  }
  function answerCalc(k){ const C = calc, P = C && C.list[C.i]; if(!P || C.picked !== null) return; C.picked = k; if(P.ch[k].ok) C.ok++; drawCalc(); }

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-cstart],[data-ai-cnext],[data-ai-cans],.ai-node");
    if(!t) return;
    if(t.dataset.aiTerm) return detail(t.dataset.aiTerm);
    if(t.dataset.aiBack){ trail.pop(); const id = trail[trail.length - 1]; if(id){ trail.pop(); detail(id); } return; }
    if(t.dataset.aiFav){ toggleFav(t.dataset.aiFav); trail.pop(); detail(t.dataset.aiFav); if(document.getElementById("ai-zk") && !document.getElementById("ai-zk").classList.contains("hidden")) drawZukan(); home(mode); return; }
    if(t.dataset.aiMore){ zf.shown += 180; return drawZukan(); }
    if(t.dataset.aiAns) return answerQuiz(+t.dataset.aiAns);
    if(t.dataset.aiQstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startQuiz(); }  // 登録なしの 体験が おわったら クイズも 止める(2026-09-30)
    if(t.dataset.aiCans) return answerCalc(+t.dataset.aiCans);
    if(t.dataset.aiCstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startCalc(); }
    if(t.dataset.aiCnext){ calc.i++; calc.picked = null; drawCalc(); const sh = document.getElementById("ai-cq"); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiQnext){ quiz.i++; quiz.picked = null; const sh = document.getElementById("ai-qz"); drawQuiz(); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiOpen){
      const o = t.dataset.aiOpen;
      if((o === "quiz" || o === "calc") && typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; }  // 図鑑・お気に入りは 読むだけなので そのまま
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

  /* ── 見た目(この ページだけ。未来・テクノロジー・知識が つながる。明るく、むずかしそうに しない) ── */
  const css = `
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
.ai-learn .ai-ko{color:#0b7285;font-weight:700}.ai-kob b{background:#0b7285!important}
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
  return { kind:"pilotterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
