/* フリック自動車運転免許: 運転の ことばを、フリックで 打って おぼえる。(けいくん 2026-11-05「フリック自動車運転免許を 免許が受かるレベルで 作成したい」→「すべてお願いします」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「運転免許の 旅」を 足す ファイル。menkyo/ の ページだけが 読む ─
   ことばは tools/menkyo/meta.json + tools/menkyo/terms-*.json(+ maru-*.json・kiken-q.json・signs.json)→ tools/menkyo/terms_js.py が data/menkyo.json と menkyo/terms.js(MENKYO_TERMS)に する。
   **ことば・問題を 足す・直すのは tools/menkyo/ の json だけ**
   ・もとは フリック気象予報士(kisho/kisho.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 9つ(「交通の教則」の 章立て)+ 🏆 マスター。990語(旅ごとに 入門20・中級30・上級60)
   ・こたえると 説明・📘 交通の教則の 章・📝 試験の 札(仮免 / 本免 / 共通)が 出る。図鑑は 📝 札でも しぼれる
   ・⭕❌ もんだい・🎯 模擬試験・🖼 危険予測・📷 標識クイズ・❌ まちがえた 問題(運転免許だけの 例外)・🧩 4択クイズ
   ⚠️ ことばを おぼえる ゲーム。本当の 試験の 前には 教習所の 教本と「交通の教則」。技能(運転の 練習)は ゲームでは できない。事故の ようすは 書かない */
const MENKYO = (() => {
  const D = MENKYO_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に mjshingo … mjmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { shingo:"mjshingo", hyoshiki:"mjhyoshiki", hyoji:"mjhyoji", hoko:"mjhoko", sokudo:"mjsokudo", kosaten:"mjkosaten", kosoku:"mjkosoku", kiken:"mjkiken", seido:"mjseido" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"menkyoterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
    levels.mjmas = lv; pools.mjmas = ALL; colors.mjmas = "#e0202e";
    maps.mjmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　9つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  const MODES_ALL = ["mjshingo", "mjhyoshiki", "mjhyoji", "mjhoko", "mjsokudo", "mjkosaten", "mjkosoku", "mjkiken", "mjseido", "mjmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-menkyo[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-menkyo-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-menkyo");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-menkyo"), JSON.stringify(v)); memo = { k:pkey("flick-menkyo"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-menkyo-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-menkyo-fav"), JSON.stringify(a)); return i < 0; }
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
    if(q.f) h += '<p class="ai-small ai-muted">📘 交通の教則: ' + esc(q.f) + (q.rs ? ' <span class="ai-rs">📝 ' + esc(q.rs) + '</span>' : "") + '</p>';
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
    if(!diagCur) diagCur = "shingo";
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 ことば図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="maru">⭕❌ もんだい</button>' +
      '<button type="button" class="ai-btn mj-big" data-ai-open="exam">🎯 模擬試験</button>' +
      '<button type="button" class="ai-btn" data-ai-open="kiken">🖼 危険予測</button>' +
      (SIGNS.length >= 4 ? '<button type="button" class="ai-btn" data-ai-open="sign">📷 標識クイズ</button>' : "") +
      '<button type="button" class="ai-btn" data-ai-open="review">❌ まちがえた 問題' + (missList().length ? "(" + missList().length + ")" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
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
    if(m === "mjmas") return { name:"マスター" + (i + 1), sub:"9つの 旅から 10語", short:"マスター" + (i + 1) };
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
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name.replace("安全運転の心と", ""), zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-zf" style="grid-template-columns:1fr"><select id="ai-zr">' + opt("", "📝 試験の 札(ぜんぶ)", zf.rs) + ["仮免", "本免", "共通"].map(r => opt(r, "📝 " + r, zf.rs)).join("") + '</select></div>' +
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

  /* ════ ここから 運転免許だけの しくみ(けいくん 2026-11-05「すべてお願いします」)════
     ⭕❌ もんだい(本物の 学科試験と 同じ 2択)・🎯 模擬試験(本番と 同じ 問題数・時間・配点・90点の 線)・
     🖼 危険予測(本免の イラスト問題と 同じ 形。図は コードで 描く)・📷 標識クイズ・❌ まちがえた 問題の 復習
     ⚠️ ❌ 復習は **運転免許だけの 例外**(シリーズは 2026-09-27 に 苦手克服と 復習を やめた。この 試験は 1割しか まちがえられないので けいくんが 例外に した)。ほかの ゲームに 広げない */
  const MARU = (D.maru || []).map(m => Object.assign({}, m, { jr:JBY[m.j] }));
  const MBY = new Map(MARU.map(m => [m.id, m]));
  const KIKEN = D.kiken || [];
  const KBY = new Map(KIKEN.map(k => [k.id, k]));
  const SIGNS = D.signs || [];
  const MOCK = D.mock || { kari:{ n:50, min:30, pt:1, pass:90 }, hon:{ n:90, pt:1, kn:5, kpt:2, min:50, pass:90 } };
  const OX = a => a ? "⭕" : "❌";

  /* ── ❌ まちがえた 問題(端末に おぼえる。ログイン して いれば かずともの 記録と いっしょ = recSet)──
     flick-menkyo-miss[-p<id>] = { "m:<⭕❌のid>" | "k:<危険予測のid>": つづけて 正解した 回数 }。2回 つづけて 正解で 消える */
  function missGet(){ try{ const v = JSON.parse(recGet(pkey("flick-menkyo-miss")) || "{}"); return v && typeof v === "object" ? v : {}; }catch(e){ return {}; } }
  function missSet(v){ recSet(pkey("flick-menkyo-miss"), JSON.stringify(v)); }
  function missMark(key, ok){
    const v = missGet();
    if(!ok) v[key] = 0;
    else if(key in v){ v[key]++; if(v[key] >= 2) delete v[key]; }
    missSet(v);
  }
  const missList = () => Object.keys(missGet()).filter(k => k[0] === "m" ? MBY.has(k.slice(2)) : KBY.has(k.slice(2)));
  const termChip = id => { const q = BY.get(id); return q ? chip(q) : ""; };

  /* ── ⭕❌ 1問の 画面(練習・復習・模擬試験で 同じ 形) ── */
  function maruCard(m, picked){
    let h = '<p class="ai-qq mj-q">' + esc(m.q) + '</p><div class="mj-ox">' +
      [true, false].map(v => '<button type="button" class="mj-oxb' + (picked === undefined ? "" : (v === m.a ? " ok" : v === picked ? " ng" : "")) + (picked === v ? " pk" : "") + '" data-mj-ox="' + (v ? 1 : 0) + '"' + (picked === undefined ? "" : " disabled") + '>' + OX(v) + '</button>').join("") + '</div>';
    if(picked !== undefined){
      const ok = picked === m.a;
      h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ ざんねん") + '　答えは ' + OX(m.a) + '</b><p>' + esc(m.w) + '</p>' +
           (m.t && BY.get(m.t) ? '<div class="ai-chips">' + termChip(m.t) + '</div>' : "") + '</div>';
    }
    return h;
  }

  /* ── ⭕❌ もんだい(10問。旅・むずかしさで しぼれる) ── */
  let mq = null, mset = { j:"", dv:"" };
  const mPool = () => MARU.filter(m => (!mset.j || m.j === mset.j) && (!mset.dv || m.dv === +mset.dv));
  function openMaru(){ mq = null; sheet("ai-mq"); drawMaru(); }
  function startMaru(list){ const pool = list || shuffle(mPool()).slice(0, QN); if(!pool.length){ drawMaru("問題が ないよ。はんいを 広げてね"); return; } mq = { list:pool, i:0, ok:0, picked:undefined, miss:[], review:!!list }; drawMaru(); }
  function drawMaru(msg){
    const sh = document.getElementById("ai-mq"), Q = mq;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>' + (Q && Q.review ? "❌ まちがえた 問題" : "⭕❌ もんだい") + '</h2>';
    if(!Q){
      h += '<p class="ai-qlead">本物の 学科試験と 同じ「文を 読んで 正しければ ⭕・まちがいなら ❌」の 練習だよ。<b>「かならず」「すべて」「〜しては ならない」</b>の ような ことばに 気を つけてね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="mj-mj">' + opt("", "🧭 ぜんぶの 旅", mset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, mset.j)).join("") + '</select>' +
        '<select id="mj-md">' + opt("", "📶 ぜんぶ", mset.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, mset.dv)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの 問題: ' + mPool().length + '問(ぜんぶで ' + MARU.length + '問)</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-mj-mstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームが「交通の教則」と 道路交通法を もとに 作った もので、本物の 試験の 問題では ありません。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.review ? '<p class="ai-small ai-muted">2回 つづけて 正解すると「まちがえた 問題」から 消えるよ。のこり ' + missList().length + '問</p>' : "") +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた 問題</p>' + Q.miss.map(m => '<div class="mj-rv"><p>' + esc(m.q) + '</p><b>答え ' + OX(m.a) + '</b> ' + esc(m.w) + '</div>').join("") : "") +
        (Q.review ? '<button type="button" class="ai-btn ai-wide ai-go" data-ai-open="review">もう一度</button>' :
          '<button type="button" class="ai-btn ai-wide ai-go" data-mj-mstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="maru">はんいを えらびなおす</button>');
    }else{
      const m = Q.list[Q.i];
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + m.jr.icon + " " + esc(m.jr.name) + " ・ " + LVN[m.dv].icon + " " + esc(LVN[m.dv].name) + '</span></p>' + maruCard(m, Q.picked);
      if(Q.picked !== undefined) h += '<button type="button" class="ai-btn ai-wide ai-go" data-mj-mnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq");
    const j = sh.querySelector("#mj-mj"), d = sh.querySelector("#mj-md");
    if(j) j.onchange = e => { mset.j = e.target.value; drawMaru(); };
    if(d) d.onchange = e => { mset.dv = e.target.value; drawMaru(); };
  }
  function answerMaru(v){ const Q = mq, m = Q && Q.list[Q.i]; if(!m || Q.picked !== undefined) return; Q.picked = v; const ok = v === m.a; if(ok) Q.ok++; else Q.miss.push(m); missMark("m:" + m.id, ok); drawMaru(); }

  /* ── 🖼 危険予測の 図(コードで 描く 上からの 図。AI の 絵は 使わない = 位置が ずれると 答えが 変わる) ──
     座標は 0〜100。道の 形(road)の 上に 部品(items)を 置く。自分の 車(me)は 青で「自分」 */
  const ROADC = "#6b7280", LINE = "#f8fafc";
  function roadSvg(r){
    const R = (x, y, w, h) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + ROADC + '"/>';
    const dash = (x1, y1, x2, y2, c) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || LINE) + '" stroke-width="1" stroke-dasharray="4 3"/>';
    const solid = (x1, y1, x2, y2, c) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || LINE) + '" stroke-width="1"/>';
    const side = '<rect x="0" y="0" width="100" height="100" fill="#d9f2d0"/>';
    switch(r){
      case "straight1": return side + R(36, 0, 28, 100) + solid(37, 0, 37, 100) + solid(63, 0, 63, 100);
      case "cross": case "crossSignal": return side + R(30, 0, 40, 100) + R(0, 30, 100, 40) + dash(50, 0, 50, 28) + dash(50, 72, 50, 100) + dash(0, 50, 28, 50) + dash(72, 50, 100, 50);
      case "tLeft": return side + R(30, 0, 40, 100) + R(0, 30, 50, 40) + dash(50, 0, 50, 28) + dash(50, 72, 50, 100) + dash(0, 50, 28, 50);
      case "tRight": return side + R(30, 0, 40, 100) + R(50, 30, 50, 40) + dash(50, 0, 50, 28) + dash(50, 72, 50, 100) + dash(72, 50, 100, 50);
      case "highway": return side + R(30, 0, 50, 100) + R(14, 40, 18, 60) + solid(31, 0, 31, 40) + dash(55, 0, 55, 100) + dash(31, 40, 31, 100) + solid(79, 0, 79, 100) + '<rect x="80" y="0" width="3" height="100" fill="#cbd5e1"/>';
      case "rail": return side + R(30, 0, 40, 100) + '<rect x="0" y="40" width="100" height="14" fill="#a8a29e"/>' + solid(0, 44, 100, 44, "#57534e") + solid(0, 50, 100, 50, "#57534e") + dash(50, 0, 50, 36) + dash(50, 58, 50, 100) +
        '<rect x="24" y="31" width="5" height="5" fill="#facc15"/><rect x="71" y="58" width="5" height="5" fill="#facc15"/>';
      case "curve": return side + '<path d="M30 100 L30 55 Q30 20 70 20 L100 20 L100 60 L70 60 Q70 60 70 60 Q70 60 70 100 Z" fill="' + ROADC + '"/><path d="M50 100 L50 55 Q50 40 70 40 L100 40" fill="none" stroke="' + LINE + '" stroke-width="1" stroke-dasharray="4 3"/>';
      case "parking": return side + R(30, 0, 40, 100) + dash(50, 0, 50, 100) + '<rect x="0" y="35" width="30" height="30" fill="#e5e7eb"/><text x="15" y="53" font-size="7" text-anchor="middle" fill="#475569">駐車場</text>';
      default: return side + R(30, 0, 40, 100) + dash(50, 0, 50, 100) + solid(31, 0, 31, 100) + solid(69, 0, 69, 100);  // straight2
    }
  }
  const ROT = { up:0, right:90, down:180, left:270 };
  function partSvg(p){
    const x = p.x, y = p.y, op = p.hidden ? ' opacity=".42"' : "", rot = ROT[p.dir || "up"] || 0, g = (inner, sc) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"' + op + '>' + inner + '</g>';
    const arrow = p.moving ? '<path d="M0 -11 L0 -17 M-2 -15 L0 -17.5 L2 -15" stroke="#0f172a" stroke-width="1" fill="none"/>' : "";
    const blink = s => p.blink === s ? '<rect x="' + (s === "left" ? -4.2 : 2.6) + '" y="-5.2" width="1.6" height="1.6" fill="#f59e0b"/><rect x="' + (s === "left" ? -4.2 : 2.6) + '" y="3.4" width="1.6" height="1.6" fill="#f59e0b"/>' : "";
    const lights = p.light ? '<path d="M-2 -5 L-4 -12 L0 -12 Z M2 -5 L0 -12 L4 -12 Z" fill="#fde68a" opacity=".8"/>' : "";
    const car = (c, w, hh) => lights + '<rect x="' + (-w / 2) + '" y="' + (-hh / 2) + '" width="' + w + '" height="' + hh + '" rx="1.6" fill="' + c + '" stroke="#1f2937" stroke-width=".5"/><rect x="' + (-w / 2 + .8) + '" y="' + (-hh / 2 + 1.2) + '" width="' + (w - 1.6) + '" height="2.2" rx=".6" fill="#bfdbfe"/>' + blink("left") + blink("right") + arrow;
    switch(p.t){
      case "me": return g(car("#2563eb", 6, 10) + '<text x="0" y="2.5" font-size="3.2" text-anchor="middle" fill="#fff" font-weight="900" transform="rotate(' + (-rot) + ')">自分</text>');
      case "car": return g(car("#9ca3af", 6, 10));
      case "truck": return g(car("#a16207", 7, 15));
      case "bus": return g(car("#16a34a", 7, 18) + (p.stop ? "" : ""));
      case "bike": return g('<rect x="-1.2" y="-4.5" width="2.4" height="9" rx="1.2" fill="#7c3aed"/><circle cx="0" cy="-1" r="1.6" fill="#fde68a"/>' + arrow);
      case "bicycle": return g('<circle cx="0" cy="-3.2" r="1.4" fill="none" stroke="#0f766e" stroke-width=".8"/><circle cx="0" cy="3.2" r="1.4" fill="none" stroke="#0f766e" stroke-width=".8"/><line x1="0" y1="-3" x2="0" y2="3" stroke="#0f766e" stroke-width=".8"/><circle cx="0" cy="0" r="1.5" fill="#fb923c"/>' + arrow);
      case "person": return g('<circle cx="0" cy="0" r="2.4" fill="#f97316" stroke="#7c2d12" stroke-width=".5"/><circle cx="0" cy="0" r="1.1" fill="#fde68a"/>' + arrow);
      case "child": return g('<circle cx="0" cy="0" r="1.8" fill="#ec4899" stroke="#831843" stroke-width=".5"/><circle cx="0" cy="0" r=".8" fill="#fde68a"/>' + arrow);
      case "elder": return g('<circle cx="0" cy="0" r="2.4" fill="#a855f7" stroke="#581c87" stroke-width=".5"/><circle cx="0" cy="0" r="1.1" fill="#fde68a"/><line x1="2.4" y1="-1" x2="3.6" y2="2.5" stroke="#78350f" stroke-width=".6"/>' + arrow);
      case "ball": return '<circle cx="' + x + '" cy="' + y + '" r="1.5" fill="#fff" stroke="#dc2626" stroke-width=".6"' + op + '/>';
      case "crosswalk": { const w = p.w || 40, hh = p.h || 6; let s = ""; const vert = hh > w; for(let i = 0; i < (vert ? hh : w); i += 3) s += vert ? '<rect x="' + x + '" y="' + (y + i) + '" width="' + w + '" height="1.6" fill="#fff"/>' : '<rect x="' + (x + i) + '" y="' + y + '" width="1.6" height="' + hh + '" fill="#fff"/>'; return s; }
      case "stop": return '<g' + op + '><line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + 6) + '" stroke="#334155" stroke-width=".6"/><circle cx="' + x + '" cy="' + y + '" r="2.4" fill="#fff" stroke="#16a34a" stroke-width=".7"/><text x="' + x + '" y="' + (y + 1) + '" font-size="2.4" text-anchor="middle" fill="#16a34a" font-weight="900">バス</text></g>';
      case "signal": { const c = { red:"#ef4444", yellow:"#facc15", green:"#22c55e" }[p.c] || "#22c55e"; return '<g><rect x="' + (x - 4) + '" y="' + (y - 1.6) + '" width="8" height="3.2" rx="1" fill="#1f2937"/>' + ["green", "yellow", "red"].map((k, i) => '<circle cx="' + (x - 2.5 + i * 2.5) + '" cy="' + y + '" r="1" fill="' + (k === p.c ? c : "#475569") + '"/>').join("") + '</g>'; }
      case "wall": return '<rect x="' + x + '" y="' + y + '" width="' + (p.w || 12) + '" height="' + (p.h || 12) + '" fill="#a8a29e" stroke="#57534e" stroke-width=".5"/>';
      case "tree": return '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#4ade80" stroke="#15803d" stroke-width=".6"/>';
      case "cone": return '<path d="M' + x + ' ' + (y - 2.4) + ' L' + (x + 2) + ' ' + (y + 2) + ' L' + (x - 2) + ' ' + (y + 2) + ' Z" fill="#f97316" stroke="#9a3412" stroke-width=".4"/>';
    }
    return "";
  }
  function sceneSvg(sc){
    const it = (sc.items || []).slice().sort((a, b) => (["crosswalk", "wall", "tree"].includes(a.t) ? 0 : 1) - (["crosswalk", "wall", "tree"].includes(b.t) ? 0 : 1));
    return '<svg class="mj-scene" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="危険予測の 図">' + roadSvg(sc.road) + it.map(partSvg).join("") +
      (sc.night ? '<rect x="0" y="0" width="100" height="100" fill="#0f172a" opacity=".45"/>' : "") +
      (sc.rain ? '<g stroke="#93c5fd" stroke-width=".4" opacity=".8">' + Array.from({ length:40 }, (_, i) => { const a = (i * 37) % 100, b = (i * 61) % 100; return '<line x1="' + a + '" y1="' + b + '" x2="' + (a - 1.5) + '" y2="' + (b + 4) + '"/>'; }).join("") + '</g>' : "") +
      '<g font-size="3" fill="#334155"><circle cx="5" cy="96" r="1.6" fill="#f97316"/><text x="8" y="97">人</text><circle cx="15" cy="96" r="1.3" fill="#ec4899"/><text x="18" y="97">子ども</text><rect x="29" y="94.4" width="2.4" height="3.2" fill="#2563eb"/><text x="33" y="97">自分</text>' +
      (it.some(p => p.hidden) ? '<text x="45" y="97">うすい = かげで 見えにくい</text>' : "") + '</g></svg>';
  }
  /* 1場面の 画面(3つに それぞれ ⭕❌ を つけて「答え合わせ」) */
  function kikenCard(k, pick, done){
    let h = sceneSvg(k.scene) + '<p class="ai-qq mj-q">' + esc(k.text) + '</p><ol class="mj-kopts">';
    k.opts.forEach((o, i) => {
      const p = pick[i], cls = done ? (p === o.a ? " ok" : " ng") : "";
      h += '<li class="' + cls.trim() + '"><p>' + esc(o.s) + '</p><span>' + [true, false].map(v => '<button type="button" class="mj-oxb sm' + (p === v ? " pk" : "") + (done && v === o.a ? " ok" : "") + '" data-mj-kx="' + i + ':' + (v ? 1 : 0) + '"' + (done ? " disabled" : "") + '>' + OX(v) + '</button>').join("") + '</span></li>';
    });
    h += '</ol>';
    if(done){ const ok = k.opts.every((o, i) => pick[i] === o.a); h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 3つ ぜんぶ 正解！" : "❌ 3つ ぜんぶ 合って はじめて 正解だよ") + '</b><p>答え: ' + k.opts.map((o, i) => (i + 1) + " " + OX(o.a)).join("・") + '</p><p>' + esc(k.why) + '</p></div>'; }
    return h;
  }
  let kq = null;
  function openKiken(){ kq = null; sheet("ai-kq"); drawKiken(); }
  function startKiken(list){ const pool = list || shuffle(KIKEN).slice(0, 5); if(!pool.length) return; kq = { list:pool, i:0, ok:0, pick:[], done:false, review:!!list }; drawKiken(); }
  function drawKiken(){
    const sh = document.getElementById("ai-kq"), Q = kq;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🖼 危険予測</h2>';
    if(!Q){
      h += '<p class="ai-qlead">本免の 学科試験の「イラスト問題」と 同じ 形だよ。図を 見て、3つの 文に それぞれ ⭕か❌を つけてね。<b>3つ ぜんぶ 合って 正解</b>。「〜かもしれない」と 考えるのが コツ。5場面。</p>' +
        '<p class="ai-small ai-muted">場面: ' + KIKEN.length + '</p><button type="button" class="ai-btn ai-wide ai-go" data-mj-kstart="1">はじめる</button>' +
        '<p class="ai-note">図は この ゲームが コードで 描いた かんたんな 上からの 図です。本物の 試験の 絵とは ちがいます。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 場面 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-mj-kstart="1">もう一度(ちがう 場面)</button>';
    }else{
      const k = Q.list[Q.i];
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '</p>' + kikenCard(k, Q.pick, Q.done) +
        (Q.done ? '<button type="button" class="ai-btn ai-wide ai-go" data-mj-knext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>'
                : '<button type="button" class="ai-btn ai-wide ai-go" data-mj-kcheck="1"' + (Q.pick.filter(x => x !== undefined).length < 3 ? " disabled" : "") + '>答え合わせ</button>');
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-kq");
  }

  /* ── 🎯 模擬試験(本番と 同じ 形。数字は meta.json の mock = 公式で 確かめた もの)──
     仮免 = ⭕❌ だけ(入門・中級から)/ 本免 = ⭕❌(ぜんぶから)+ 危険予測。時間 切れで 自動で おわる。90点の 線で 合格 / 不合格 */
  let ex = null, exTimer = null;
  function pickSpread(pool, n){  // 旅が かたよらない ように 旅ごとに 順に とる
    const by = {}; shuffle(pool).forEach(m => (by[m.j] = by[m.j] || []).push(m));
    const keys = shuffle(Object.keys(by)), out = [];
    while(out.length < n && keys.some(k => by[k].length)) for(const k of keys){ if(out.length >= n) break; if(by[k].length) out.push(by[k].pop()); }
    return shuffle(out);
  }
  function openExam(){ if(ex && !ex.end){ sheet("ai-ex"); drawExam(); return; } ex = null; sheet("ai-ex"); drawExam(); }
  function startExam(kind){
    const C = MOCK[kind]; if(!C) return;
    const maru = pickSpread(MARU.filter(m => kind === "kari" ? m.dv <= 2 : true), C.n).map(m => ({ t:"m", m, a:undefined }));
    const kk = kind === "hon" ? shuffle(KIKEN).slice(0, C.kn || 0).map(k => ({ t:"k", k, a:[] })) : [];
    ex = { kind, C, list:maru.concat(kk), i:0, until:Date.now() + C.min * 60000, end:null };
    clearInterval(exTimer); exTimer = setInterval(tickExam, 1000); drawExam();
  }
  function tickExam(){
    if(!ex || ex.end){ clearInterval(exTimer); return; }
    const left = ex.until - Date.now(), el = document.getElementById("mj-clock");
    if(left <= 0){ submitExam(true); return; }
    if(el){ const s = Math.ceil(left / 1000); el.textContent = "⏱ のこり " + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); el.classList.toggle("warn", s <= 300); }
  }
  function scoreExam(){
    const C = ex.C; let pts = 0, max = 0; const wrong = [];
    for(const it of ex.list){
      if(it.t === "m"){ max += C.pt; const ok = it.a === it.m.a; if(ok) pts += C.pt; else wrong.push(it); missMark("m:" + it.m.id, ok); }
      else{ max += C.kpt; const ok = it.k.opts.every((o, i) => it.a[i] === o.a); if(ok) pts += C.kpt; else wrong.push(it); missMark("k:" + it.k.id, ok); }
    }
    return { pts, max, wrong, pass:pts * 100 >= C.pass * max };
  }
  function submitExam(timeUp){ if(!ex || ex.end) return; clearInterval(exTimer); ex.end = Object.assign(scoreExam(), { timeUp, used:Math.min(ex.C.min * 60000, ex.C.min * 60000 - (ex.until - Date.now())) }); drawExam(); const sh = document.getElementById("ai-ex"); if(sh) sh.scrollTop = 0; }
  function drawExam(){
    const sh = document.getElementById("ai-ex"), E = ex;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🎯 模擬試験</h2>';
    if(!E){
      const k = MOCK.kari, hn = MOCK.hon;
      h += '<p class="ai-qlead">本番と 同じ 問題数・時間・配点で 力だめし。<b>' + k.pass + '点 以上で 合格</b>(1割しか まちがえられない)。とちゅうで とじても つづきから できるよ。</p>' +
        '<button type="button" class="ai-btn ai-wide mj-exb" data-mj-xstart="kari"><b>🔰 仮免許の 学科試験</b><small>⭕❌ ' + k.n + '問・' + k.min + '分・1問 ' + k.pt + '点(' + (k.n * k.pt) + '点 満点)</small></button>' +
        '<button type="button" class="ai-btn ai-wide mj-exb" data-mj-xstart="hon"><b>🎓 本免許の 学科試験</b><small>⭕❌ ' + hn.n + '問(1問 ' + hn.pt + '点)+ 危険予測 ' + hn.kn + '問(1問 ' + hn.kpt + '点)・' + hn.min + '分(' + (hn.n * hn.pt + hn.kn * hn.kpt) + '点 満点)</small></button>' +
        (D.mockNote ? '<p class="ai-note">' + esc(D.mockNote) + '</p>' : "") +
        '<p class="ai-note">問題は この ゲームが 作った もので、本物の 試験の 問題では ありません。合格の めやすの 練習です。本当の 試験の 前には 教習所の 教本と「交通の教則」で 確かめてね。</p>';
    }else if(E.end){
      const R = E.end, sc = Math.round(R.pts * 100 / R.max);
      h += '<div class="mj-res ' + (R.pass ? "pass" : "fail") + '"><b>' + (R.pass ? "🎉 合格！" : "😢 不合格") + '</b><span>' + R.pts + ' / ' + R.max + ' 点(' + sc + '%)</span><small>' + (E.kind === "kari" ? "🔰 仮免許" : "🎓 本免許") + '・合格は ' + E.C.pass + '% 以上' + (R.timeUp ? "・⏱ 時間 切れ" : "・かかった 時間 " + Math.ceil(R.used / 60000) + "分") + '</small></div>' +
        (R.wrong.length ? '<p class="ai-small">🔁 まちがえた 問題(' + R.wrong.length + ')。「❌ まちがえた 問題」から もう一度 できるよ</p>' + R.wrong.map(it => it.t === "m"
            ? '<div class="mj-rv"><p>' + esc(it.m.q) + '</p><b>答え ' + OX(it.m.a) + '</b>(あなた ' + (it.a === undefined ? "未回答" : OX(it.a)) + ') ' + esc(it.m.w) + '</div>'
            : '<div class="mj-rv"><p>🖼 ' + esc(it.k.text) + '</p><b>答え ' + it.k.opts.map((o, i) => (i + 1) + OX(o.a)).join(" ") + '</b> ' + esc(it.k.why) + '</div>').join("") : '<p class="ai-empty">まちがい なし！ 🎉</p>') +
        '<button type="button" class="ai-btn ai-wide ai-go" data-mj-xstart="' + E.kind + '">もう一度(ちがう 問題で)</button><button type="button" class="ai-btn ai-wide" data-mj-xreset="1">試験を えらびなおす</button>';
    }else{
      const it = E.list[E.i], done = E.list.filter(x => x.t === "m" ? x.a !== undefined : x.a.filter(v => v !== undefined).length === 3).length;
      h += '<p class="mj-exhead"><span id="mj-clock">⏱</span><span>' + (E.i + 1) + ' / ' + E.list.length + '問 ・ 答えた ' + done + '</span></p>';
      if(it.t === "m") h += '<p class="ai-qq mj-q">' + esc(it.m.q) + '</p><div class="mj-ox">' + [true, false].map(v => '<button type="button" class="mj-oxb' + (it.a === v ? " pk" : "") + '" data-mj-xa="' + (v ? 1 : 0) + '">' + OX(v) + '</button>').join("") + '</div>';
      else h += '<p class="ai-small">🖼 危険予測(3つ ぜんぶ 合って ' + E.C.kpt + '点)</p>' + kikenCard(it.k, it.a, false).replace(/data-mj-kx=/g, "data-mj-xk=");
      h += '<div class="mj-exnav"><button type="button" class="ai-btn" data-mj-xgo="-1"' + (E.i ? "" : " disabled") + '>← まえ</button><button type="button" class="ai-btn" data-mj-xgo="1"' + (E.i + 1 < E.list.length ? "" : " disabled") + '>つぎ →</button></div>' +
        '<div class="mj-exmap">' + E.list.map((x, k) => { const a = x.t === "m" ? x.a !== undefined : x.a.filter(v => v !== undefined).length === 3; return '<button type="button" data-mj-xj="' + k + '" class="' + (a ? "a" : "") + (k === E.i ? " on" : "") + '">' + (k + 1) + '</button>'; }).join("") + '</div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-mj-xsubmit="1">答案を 出す(採点する)</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-ex");
    if(E && !E.end) tickExam();
  }

  /* ── 📷 標識クイズ(標識の 絵 → 名前を 4つから。絵は Wikimedia Commons。作った 人と ライセンスを かならず 出す) ── */
  let sq = null;
  function openSign(){ sq = null; sheet("ai-sq"); drawSign(); }
  function startSign(){
    if(SIGNS.length < 4) return;
    sq = { list:shuffle(SIGNS).slice(0, QN).map(s => { const same = shuffle(SIGNS.filter(x => x !== s && x.kind === s.kind)), rest = shuffle(SIGNS.filter(x => x !== s && x.kind !== s.kind));
      return { s, ch:shuffle([s].concat(same.concat(rest).filter((x, i, a) => a.findIndex(y => y.n === x.n) === i && x.n !== s.n).slice(0, 3))) }; }), i:0, ok:0, picked:null };
    drawSign();
  }
  function drawSign(){
    const sh = document.getElementById("ai-sq"), Q = sq;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📷 標識クイズ</h2>';
    if(!Q){
      h += '<p class="ai-qlead">標識の 絵を 見て、名前を 4つの 中から えらんでね。' + QN + '問。</p><p class="ai-small ai-muted">標識: ' + SIGNS.length + '枚</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-mj-sstart="1"' + (SIGNS.length < 4 ? " disabled" : "") + '>はじめる</button>' +
        '<p class="ai-note">標識の 絵は Wikimedia Commons の ものです(作った 人と ライセンスを 絵の 下に 出しています)。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p><button type="button" class="ai-btn ai-wide ai-go" data-mj-sstart="1">もう一度</button>';
    }else{
      const it = Q.list[Q.i], done = Q.picked !== null, s = it.s;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + esc(s.kind) + '</span></p><figure class="mj-sign"><img src="' + esc(assets() + s.file.replace(/^menkyo\//, "")) + '" alt="標識の 絵" loading="lazy"><figcaption>' + esc(s.au) + ' / ' + esc(s.li) + ' ・ Wikimedia Commons</figcaption></figure>' +
        '<div class="ai-qch">' + it.ch.map((x, k) => '<button type="button" class="ai-btn' + (done ? (x === s ? " ok" : k === Q.picked ? " ng" : "") : "") + '" data-mj-sans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(x.n) + '</button>').join("") + '</div>';
      if(done) h += '<div class="ai-qfb2 ' + (it.ch[Q.picked] === s ? "ok" : "ng") + '"><b>' + (it.ch[Q.picked] === s ? "⭕ 正解！" : "❌ 正解は「" + esc(s.n) + "」") + '</b><p>' + esc(s.note) + '</p></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-mj-snext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-sq");
  }
  const assets = () => (typeof location !== "undefined" && /\/menkyo\/?(index\.html)?$/.test(location.pathname)) ? "" : "menkyo/";

  /* ── ❌ まちがえた 問題(⭕❌ と 危険予測。10こずつ) ── */
  function openReview(){
    const keys = shuffle(missList());
    const m = keys.filter(k => k[0] === "m").slice(0, QN).map(k => MBY.get(k.slice(2))), k = keys.filter(x => x[0] === "k").slice(0, 3).map(x => KBY.get(x.slice(2)));
    if(!m.length && !k.length){ const sh = sheet("ai-mq"); sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>❌ まちがえた 問題</h2><p class="ai-empty">まちがえた 問題は ないよ 🎉<br>⭕❌ もんだい・危険予測・模擬試験で まちがえると、ここに 入るよ。2回 つづけて 正解すると 消えるよ。</p></div>'; sh.querySelector(".ai-x").onclick = () => closeSheet("ai-mq"); return; }
    if(m.length){ sheet("ai-mq"); startMaru(m); }
    else { sheet("ai-kq"); startKiken(k); }
  }

  /* ── おす(運転免許だけの ボタン) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-mj-ox],[data-mj-mstart],[data-mj-mnext],[data-mj-kx],[data-mj-kstart],[data-mj-kcheck],[data-mj-knext],[data-mj-xstart],[data-mj-xa],[data-mj-xk],[data-mj-xgo],[data-mj-xj],[data-mj-xsubmit],[data-mj-xreset],[data-mj-sstart],[data-mj-sans],[data-mj-snext]");
    if(!t) return;
    const play = () => { if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return false; } return true; };
    const ds = t.dataset, top = id => { const sh = document.getElementById(id); if(sh) sh.scrollTop = 0; };
    if(ds.mjOx) return answerMaru(ds.mjOx === "1");
    if(ds.mjMstart){ if(play()) startMaru(); return; }
    if(ds.mjMnext){ mq.i++; mq.picked = undefined; drawMaru(); top("ai-mq"); return; }
    if(ds.mjKx){ const [i, v] = ds.mjKx.split(":"); if(kq && !kq.done){ kq.pick[+i] = v === "1"; drawKiken(); } return; }
    if(ds.mjKstart){ if(play()) startKiken(); return; }
    if(ds.mjKcheck){ const k = kq.list[kq.i], ok = k.opts.every((o, i) => kq.pick[i] === o.a); kq.done = true; if(ok) kq.ok++; missMark("k:" + k.id, ok); drawKiken(); return; }
    if(ds.mjKnext){ kq.i++; kq.pick = []; kq.done = false; drawKiken(); top("ai-kq"); return; }
    if(ds.mjXstart){ if(ex && !ex.end && !confirm("いまの 試験を やめて、新しく はじめますか?")) return; if(play()){ ex = null; startExam(ds.mjXstart); top("ai-ex"); } return; }
    if(ds.mjXa){ ex.list[ex.i].a = ds.mjXa === "1"; drawExam(); return; }
    if(ds.mjXk){ const [i, v] = ds.mjXk.split(":"); ex.list[ex.i].a[+i] = v === "1"; drawExam(); return; }
    if(ds.mjXgo){ ex.i = Math.max(0, Math.min(ex.list.length - 1, ex.i + +ds.mjXgo)); drawExam(); top("ai-ex"); return; }
    if(ds.mjXj){ ex.i = +ds.mjXj; drawExam(); top("ai-ex"); return; }
    if(ds.mjXsubmit){ const left = ex.list.filter(x => x.t === "m" ? x.a === undefined : x.a.filter(v => v !== undefined).length < 3).length; if(left && !confirm("まだ 答えていない 問題が " + left + "問 あります。採点しますか?")) return; submitExam(false); return; }
    if(ds.mjXreset){ ex = null; drawExam(); return; }
    if(ds.mjSstart){ if(play()) startSign(); return; }
    if(ds.mjSans){ if(sq.picked !== null) return; sq.picked = +ds.mjSans; if(sq.list[sq.i].ch[sq.picked] === sq.list[sq.i].s) sq.ok++; drawSign(); return; }
    if(ds.mjSnext){ sq.i++; sq.picked = null; drawSign(); top("ai-sq"); return; }
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
      if(o === "kiken") return openKiken();
      if(o === "sign") return openSign();
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
.mj-q{font-size:15.5px;line-height:1.9}.mj-ox{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:4px 0 6px}
.mj-oxb{font:inherit;font-size:30px;padding:10px 0;border-radius:16px;border:2px solid #c7d2fe;background:#fff;cursor:pointer;line-height:1}.mj-oxb.sm{font-size:18px;padding:6px 12px;border-radius:12px}
.mj-oxb.pk{border-color:#1c7ed6;background:#e7f5ff;box-shadow:0 0 0 2px #1c7ed6 inset}.mj-oxb.ok{background:#dcfce7;border-color:#22c55e}.mj-oxb.ng{background:#fee2e2;border-color:#ef4444}.mj-oxb:disabled{cursor:default}
.mj-scene{display:block;width:100%;max-width:360px;margin:0 auto 6px;border-radius:12px;border:1px solid #cbd5e1;background:#d9f2d0}
.mj-kopts{list-style:none;padding:0;margin:0;display:grid;gap:8px;counter-reset:k}.mj-kopts li{counter-increment:k;display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center;border:1.5px solid #e2e8f0;border-radius:12px;padding:6px 8px;background:#fff}
.mj-kopts li p{margin:0;font-size:13.5px;line-height:1.6}.mj-kopts li p::before{content:counter(k) ". ";font-weight:900;color:#1c7ed6}.mj-kopts li span{display:flex;gap:4px}.mj-kopts li.ok{border-color:#22c55e;background:#f0fdf4}.mj-kopts li.ng{border-color:#ef4444;background:#fef2f2}
.mj-exb{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:2px}.mj-exb small{font-weight:600;color:#475569;font-size:12px}
.mj-exhead{display:flex;justify-content:space-between;font-weight:900;font-size:13px;margin:0 0 6px;position:sticky;top:-14px;background:#fff;padding:6px 0;z-index:2}#mj-clock{color:#1c7ed6;font-variant-numeric:tabular-nums}#mj-clock.warn{color:#e03131}
.mj-exnav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.mj-exmap{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.mj-exmap button{width:30px;height:28px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font:inherit;font-size:11px;color:#94a3b8;cursor:pointer}
.mj-exmap button.a{background:#e7f5ff;border-color:#74c0fc;color:#1864ab}.mj-exmap button.on{outline:2px solid #1c7ed6}
.mj-res{text-align:center;border-radius:16px;padding:14px;margin:6px 0 12px}.mj-res.pass{background:#dcfce7}.mj-res.fail{background:#fff4e6}.mj-res b{display:block;font-size:26px}.mj-res span{display:block;font-size:20px;font-weight:900}.mj-res small{color:#475569}
.mj-rv{border-left:4px solid #fa5252;background:#fff5f5;border-radius:8px;padding:6px 10px;margin:6px 0;font-size:13px;line-height:1.7}.mj-rv p{margin:0 0 2px;font-weight:700}
.mj-sign{margin:4px 0 10px;text-align:center}.mj-sign img{width:160px;height:160px;object-fit:contain}.mj-sign figcaption{font-size:10px;color:#64748b;margin-top:2px}
.ai-btns .mj-big{grid-column:1/-1;background:#1c7ed6;border-color:#1c7ed6;color:#fff}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"menkyoterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
