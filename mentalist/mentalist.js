/* フリックメンタリスト: メンタリストの ことばを、フリックで 打って おぼえる。(けいくん 2026-10-23「世界トップレベルのメンタリストになるために必要な知識をフリック形式の問題にしてください」→「メンタリストになれるように 実践的にしてほしい」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「メンタリストの 旅」を 足す ファイル。mentalist/ の ページだけが 読む ─
   ことばは tools/mentalist/meta.json + terms-*.json + routines.json + practice.json → tools/mentalist/terms_js.py が data/mentalist.json と mentalist/terms.js(MENTALIST_TERMS)に する。
   **ことばを 足す・直すのは tools/mentalist/terms-<旅>.json だけ**(演目は routines.json = mk_routines.py、練習は practice.json = mk_practice.py)
   ・もとは フリックキャビンアテンダント(cabin/cabin.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 9つ(6つの 力 = 観察・記憶・心理・ことば・数・舞台 + きほん・演目と実践・こころの決まり): 🎩 メンタリズムのきほん / 🧠 こころのしくみ / 👀 観察と読みとり / 🧩 記憶の技 / 🗣 ことばの力 / 🔢 数のふしぎ / 🎭 舞台と演じかた / 🪄 演目と実践 / 💛 こころの決まり。+ 🏆 マスター
   ・レベルは 入門(きょう 1つ 演じられる)→ 中級(家族・友だちの 前で 10分)→ 上級(世界の トップを めざす)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・こたえると ことばの 意味が 出る(けいくん 2026-10-23「やってみようじゃなくて 他のゲームみたいに意味を」。🎯 やってみよう は 結果・図鑑だけ)。結果・図鑑には 🧠 しくみ・🎩 ぶたい も。英語の 語は 🔊 で 英語の 音
   ・⭐ 実践の 柱: 🎩 演目(10本。1手順ずつ めくる)・📅 きょうの 練習(6つの 力 × 5 = 30日。できたら 🔥)
   ・🧩 4択クイズ・🧮 計算問題(数の ふしぎ: 9の ふしぎ・1089・カレンダーと 曜日・魔方陣・サイコロ・速算・カードの 数・2進数。数字は 毎回 かわる)
   ⚠️⚠️ メンタリズムは 心理学と 観察を つかった パフォーマンス。超能力とは 書かない / 人を あやつる 向きに しない / しぐさで うそが 分かる とは 書かない / 道具の しかけ・よその 演目の たねは 書かない(数学・記憶・公開された 心理の 傾向は 手順まで 書く)/ 同意が いちばん */
const MENTALIST = (() => {
  const D = MENTALIST_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に mtkihon … mtmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { kihon:"mtkihon", shinri:"mtshinri", kansatsu:"mtkansatsu", kioku:"mtkioku", kotoba:"mtkotoba", suuji:"mtsuuji", butai:"mtbutai", jissen:"mtjissen", kokoro:"mtkokoro" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"mentalistterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
    levels.mtmas = lv; pools.mtmas = ALL; colors.mtmas = "#5f3dc4";
    maps.mtmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　9つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>6つの 力を はば広く</small>' };
  }
  const MODES_ALL = ["mtkihon", "mtshinri", "mtkansatsu", "mtkioku", "mtkotoba", "mtsuuji", "mtbutai", "mtjissen", "mtkokoro", "mtmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-mentalist[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-mentalist-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-mentalist");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-mentalist"), JSON.stringify(v)); memo = { k:pkey("flick-mentalist"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-mentalist-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-mentalist-fav"), JSON.stringify(a)); return i < 0; }
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
  const DIAGS = Object.keys(D.diagrams);  // 旅ごとに 1つの 図
  /* うしろに うすく 描く 形(機体を 上から 見た 形と 座席の 列)。箱の 位置とは 合わせない(めやすの 絵)。⚠️ 実在の 会社の 座席表・塗り分けは 描かない */
  /* うしろに うすく 描く 形(めやすの 絵。箱の 位置とは 合わせない)。⚠️ 人の 顔・目・うずまきは 描かない
     house = 記憶の 宮殿(家の 間取り) / stage = 舞台と 客席(上が 舞台・下が 客席) */
  const BG = {
    house:'<g opacity=".07" fill="none" stroke="#0f172a" stroke-width="6"><path d="M20 120 L180 14 L340 120 L340 350 L20 350Z"/><path d="M20 176 H340 M20 264 H340 M120 176 V350 M240 176 V350"/></g>',
    stage:'<g opacity=".08" fill="#0f172a"><path d="M10 10 H350 V30 Q300 60 250 30 Q215 70 180 30 Q145 70 110 30 Q60 60 10 30Z"/><rect x="30" y="150" width="300" height="14" rx="4"/></g><g opacity=".07" fill="#0f172a">' +
      Array.from({ length:4 }, (_, r) => Array.from({ length:9 }, (_, i) => '<circle cx="' + (40 + i * 35) + '" cy="' + (250 + r * 28) + '" r="9"/>').join("")).join("") + '</g>'
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

  /* ── 🔊 英語で 聞く(英語の 語・ひとことだけ。おすと 英語の 声で 読む。土台の 日本語の よみあげ(jaSay)は 答えた あとに ふりがなを 読む まま) ── */
  const EN_TTS = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function";
  function enSay(text){
    if(!EN_TTS || !text) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text), vs = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
      const v = vs.find(v => /en-US/i.test(v.lang) && /samantha|ava|allison|google|natural|enhanced|premium/i.test(v.name)) || vs.find(v => /en-US/i.test(v.lang)) || vs[0];
      u.lang = "en-US"; if(v) u.voice = v; u.rate = 0.9;
      speechSynthesis.speak(u);
    }catch(e){}
  }

  /* ── 問題の カード: ことば + ひとつ前の ことばの 意味・つながる ことば(こたえたら 出る。テンポを 止めない) ── */
  function card(q, prev){
    let h = "";
    if(prev){
      const rel = (prev.rel || []).slice(0, 2).map(id => BY.get(id)).filter(Boolean);
      h += '<div class="ai-learn" role="status"><b>✅ ' + esc(prev.n) + '</b><span>' + prev.jr.icon + " " + esc(prev.jr.name) + '</span><p>' + esc(prev.ds) + '</p>' +
           (rel.length ? '<p class="ai-rel">🔗 つながる ことば: ' + rel.map(x => esc(x.n)).join("・") + '</p>' : "") + '</div>';
    }else h += '<div class="ai-learn ai-hint">こたえると、その ことばの 意味が 出るよ</div>';
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
    if(q.sk) h += '<p class="ai-ex ai-skb"><b>🧠 しくみ</b>' + q.skrb + '</p>';    // どんな 心理の しくみが はたらくか(1文)
    if(q.bt) h += '<p class="ai-ex ai-btb"><b>🎩 ぶたい</b>' + q.btrb + '</p>';    // 舞台で どう 使うか(1文)
    if(q.rs) h += '<p class="ai-ex ai-kob"><b>🎯 やってみよう</b>' + q.rsrb + '</p>';  // きょう できる 練習(この ゲームの 実践の 柱)
    if(q.ei) h += '<p class="ai-small ai-ei">🇬🇧 英語: <b lang="en">' + esc(q.ei) + '</b>' + (EN_TTS ? ' <button type="button" class="ai-say" data-ai-say="' + esc(q.art) + '" aria-label="英語の 音を 聞く">🔊 英語で 聞く</button>' : "") + '</p>';
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.f) h += '<p class="ai-small ai-muted">📚 分野: ' + esc(q.f) + '</p>';
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
      '<button type="button" class="ai-btn ai-hi" data-ai-open="routine">🎩 演目(10本)</button>' +
      '<button type="button" class="ai-btn ai-hi" data-ai-open="practice">📅 きょうの 練習' + (practiceDone() ? " ✅" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
      '<details class="ai-diag"><summary class="ai-dh">📜 メンタリズムの 年表 を ひらく <small>読心術の 舞台 → ラジオ・テレビ → いまの メンタリスト</small></summary>' + nenpyoSvg() + '</details>' +
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
        '<p class="ai-lead">' + esc(J.lead) + '。1回 10問。どの ステージも いつも 同じ 10語。タイムで 勝負しよう。</p>' +
        (J.id === "jissen" ? '<p class="ai-lead"><button type="button" class="ai-btn ai-hi" data-ai-open="routine">🎩 演目の 手順を 見る</button></p>' : "");
    }else chips.innerHTML = '<p class="ai-lead">9つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "mtmas") return { name:"マスター" + (i + 1), sub:"9つの 旅から 10語", short:"マスター" + (i + 1) };
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
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 記憶の宮殿)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
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
     ・はんい: 出会った ことば / むずかしさごと(入門・採用めやす・訓練めやす)/ ぜんぶ。旅でも しぼれる
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
    quiz = { list:shuffle(pool).slice(0, QN).map((q, i) => ({ q, type:q.sk && i % 3 === 2 ? 2 : i % 2, ch:shuffle([q].concat(wrongs(q, 3))) })), i:0, ok:0, picked:null, miss:[] };
    drawQuiz();
  }
  function drawQuiz(msg){
    const sh = document.getElementById("ai-qz"), Q = quiz;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🧩 4択クイズ</h2>';
    if(!Q){
      const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
      const n = quizPool().length;
      h += '<p class="ai-qlead">ことばの 意味と、その うらに ある 心理の しくみを たしかめる 練習だよ。4つの 中から 1つ えらんでね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="ai-qr">' + opt("seen", "出会った ことば", qset.r) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, qset.r)).join("") + opt("all", "ぜんぶ", qset.r) + '</select>' +
        '<select id="ai-qj">' + opt("", "🧭 ぜんぶの 旅", qset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, qset.j)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの ことば: ' + n + '語</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームの 説明から 作っています。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた ことば(おすと 説明が 読めるよ)</p><div class="ai-chips">' + Q.miss.map(q => chip(q)).join("") + '</div>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="quiz">はんいを えらびなおす</button>';
    }else{
      const it = Q.list[Q.i], done = Q.picked !== null;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + it.q.jr.icon + " " + esc(it.q.jr.name) + " ・ " + LVN[it.q.dv].icon + " " + esc(LVN[it.q.dv].name) + '</span></p>';
      h += it.type === 2
        ? '<p class="ai-qq">🧠「' + esc(hide(it.q.sk, it.q)) + '」<br>この 心理の しくみが はたらく ことばは どれ？</p>'
        : it.type === 0
        ? '<p class="ai-qq">「' + esc(hide(it.q.ds, it.q)) + '」<br>これは どの ことば？</p>'
        : '<p class="ai-qq">「<b>' + esc(it.q.n) + '</b>」の 説明として 正しいのは どれ？</p>';
      h += '<div class="ai-qch' + (it.type ? " long" : "") + '">' + it.ch.map((x, k) => {
        const cls = done ? (x === it.q ? " ok" : k === Q.picked ? " ng" : "") : "";
        return '<button type="button" class="ai-btn' + cls + '" data-ai-ans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(it.type !== 1 ? x.n : hide(x.ds, x)) + '</button>';
      }).join("") + '</div>';
      if(done){
        const ok = it.ch[Q.picked] === it.q;
        h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は " + "ABCD"[it.ch.indexOf(it.q)] + "「" + esc(it.q.n) + "」") + '</b>' +
             (it.type !== 1 ? "" : '<p>' + esc(it.q.n) + ' … ' + esc(it.q.ds) + '</p>') +
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

  /* ── 🧮 計算問題(フリックメンタリスト。はじめかたの 表「9の ふしぎ・カレンダー・魔方陣・サイコロ・速算・カードの 数」+ 2進数)──
     ・メンタリストの 定番の「数の ふしぎ」を、数字を 毎回 かえて 出す(**問題も 答えも プログラムが 作る**)
     ・⚠️ どれも「数学の 性質」(算数の 本に のっている)なので 書いて よい = たねあかしでは ない。カードの 並べかたの しかけ(スタック)は 出さない
     ・答えた あとに 式と 途中の 計算を 出す。⚠️ 画面に「ゲームの 練習問題です」
     ・1つの 問題 = { g:なかま, lv:"入門"/"中級"/"上級", q:問題文, a:答え, d:小数の けた, u:単位, w:[まちがい…], ex:[とき方…], fmt:(なくてよい)表示の しかた, rng:(なくてよい)[下, 上] } */
  const ri = (a, b, st) => { st = st || 1; return a + st * Math.floor(Math.random() * (Math.floor((b - a) / st) + 1)); };
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const nf = (x, d) => Number(x.toFixed(d)).toLocaleString("ja-JP", { maximumFractionDigits:d, minimumFractionDigits:0 });
  const rev3 = n => +String(n).padStart(3, "0").split("").reverse().join("");
  const WD = "日月火水木金土";
  const MCODE = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];  // 月の 数(2000年代は 最後に + 6。うるう年の 1・2月は 1 引く)
  const CALC_G = [["nine", "🔢 9の ふしぎ"], ["cal", "📅 カレンダーと 曜日"], ["maho", "🟦 魔方陣"], ["dice", "🎲 サイコロ"], ["soku", "🧮 速算"], ["card", "🃏 カードの 数"], ["bin", "💡 2進数"]];
  const CALC = [
    /* 🔢 9の ふしぎ */
    () => { const n = ri(10, 99), t = Math.floor(n / 10), o = n % 10, s2 = t + o, a = n - s2;
      return { g:"nine", lv:"入門", q:"2けたの 数 " + n + " から、その 数の 各けたを 足した 数を 引くと？", a, d:0, u:"",
        w:[n + s2, a + 9, a - 9, n - t], ex:["各けたの 和 = " + t + " + " + o + " = " + s2, n + " − " + s2 + " = " + a, "答えは いつも 9の 倍数(" + a + " = 9 × " + a / 9 + ")。どんな 2けたの 数でも そうなるよ"] }; },
    () => { let x; do{ x = ri(100, 999); }while(Math.abs(Math.floor(x / 100) - x % 10) < 2);
      const r = rev3(x), big = Math.max(x, r), small = Math.min(x, r), a = big - small;
      return { g:"nine", lv:"入門", q:"3けたの 数 " + x + " を 逆に ならべて(" + r + ")、大きい ほうから 小さい ほうを 引くと？(1089の 予言の まんなかの 計算)", a, d:0, u:"",
        w:[x + r, a + 99, a - 99, a + 9].filter(v => v !== 1089), ex:[big + " − " + small + " = " + a, "答えは いつも 99 の 倍数(99 × " + a / 99 + ")", "つぎに " + a + " を 逆に して 足すと " + a + " + " + rev3(a) + " = 1089"] }; },
    () => { let x; do{ x = ri(100, 999); }while(Math.abs(Math.floor(x / 100) - x % 10) < 2);
      const r = rev3(x), d1 = Math.abs(x - r), a = d1 + rev3(d1);
      return { g:"nine", lv:"入門", q:"1089の 予言: " + x + " → 逆に ならべて 引く → その 答えを 逆に ならべて 足す。さいごの 答えは？", a, d:0, u:"",
        w:[1098, 999, 1189, 1079], ex:[Math.max(x, r) + " − " + Math.min(x, r) + " = " + d1, d1 + " + " + rev3(d1) + " = " + a, "はじめと おわりの 数字が 2つ以上 ちがう 3けたの 数なら、いつも 1089 に なる(数学の 性質)"] }; },
    () => { const k = ri(12, 110), a = k * 9;
      return { g:"nine", lv:"中級", q:"つぎの うち 9で 割り切れる 数は どれ？(各けたを 足して 9の 倍数なら 割り切れる)", a, d:0, u:"",
        w:[a + 1, a - 2, a + 4, a + 3, a - 5], ex:[String(a).split("").join(" + ") + " = " + String(a).split("").reduce((p, c) => p + +c, 0) + " → 9の 倍数", a + " ÷ 9 = " + k, "⚠️ 3で 割り切れる だけの 数(各けたの 和が 3・6 …)と まちがえやすい"] }; },
    /* 📅 カレンダーと 曜日 */
    () => { const m = ri(9, 23), a = m * 9;
      return { g:"cal", lv:"入門", q:"カレンダーで たて 3・よこ 3 の 9つの 数を 四角く 囲んだ。まん中の 数は " + m + "。9つの 数の 合計は？", a, d:0, u:"",
        w:[m * 8, m * 10, a + 9, a - 9], ex:["9つの 合計 = まん中 × 9", m + " × 9 = " + m + " × 10 − " + m + " = " + (m * 10) + " − " + m + " = " + a, "まん中より 1・6・7・8 大きい 数と 小さい 数が 組に なるから"] }; },
    () => { const s0 = ri(1, 15), m = s0 + 8, a = m * 9;
      return { g:"cal", lv:"中級", q:"カレンダーで 囲んだ 9つの 数の うち、いちばん 小さい(左上の)数は " + s0 + "。9つの 数の 合計は？", a, d:0, u:"",
        w:[s0 * 9, (s0 + 7) * 9, (s0 + 9) * 9, a + 8], ex:["まん中 = 左上 + 8 = " + s0 + " + 8 = " + m + "(1週間は 7日 なので 1段 下は + 7、その 右が + 8)", "合計 = まん中 × 9 = " + m + " × 9 = " + a] }; },
    () => { const y = ri(2000, 2099), mo = ri(1, 12), dd = ri(1, 28), yy = y % 100, leap = y % 4 === 0, mc = MCODE[mo - 1] - (leap && mo <= 2 ? 1 : 0);
      const tot = dd + mc + yy + Math.floor(yy / 4) + 6, r = tot % 7, a = r + 1;
      return { g:"cal", lv:"上級", q:y + "年" + mo + "月" + dd + "日は 何曜日？(日 + 月の 数 + 年の 下2けた + 下2けた÷4 + 6 を 7で 割った あまり。0 = 日曜)", a, d:0, u:"", fmt:x => WD[(Math.round(x) - 1 + 7) % 7] + "曜日",
        w:[(r + 1) % 7 + 1, (r + 6) % 7 + 1, (r + 2) % 7 + 1, (r + 5) % 7 + 1], ex:["月の 数(" + mo + "月)= " + mc + (leap && mo <= 2 ? "(うるう年の " + mo + "月 なので 1 引いた)" : ""), dd + " + " + mc + " + " + yy + " + " + Math.floor(yy / 4) + " + 6 = " + tot, tot + " ÷ 7 = " + Math.floor(tot / 7) + " あまり " + r + " → " + WD[r] + "曜日", "月の 数: 1月0・2月3・3月3・4月6・5月1・6月4・7月6・8月2・9月5・10月0・11月3・12月5"] }; },
    /* 🟦 魔方陣 */
    () => { const k = ri(1, 20), a = 3 * (k + 4);
      return { g:"maho", lv:"中級", q:k + " から " + (k + 8) + " までの 9つの 数で 3×3 の 魔方陣を 作ると、たて・よこ・ななめ 1列の 合計は？", a, d:0, u:"",
        w:[9 * (k + 4), k + 4, a + 3, a - 3], ex:["9つの 合計 = " + Array.from({ length:9 }, (_, i) => k + i).join(" + ") + " = " + 9 * (k + 4), "3列に 同じ だけ 分ける → " + 9 * (k + 4) + " ÷ 3 = " + a, "まん中の ますは " + (k + 4) + "(1列の 合計 = まん中 × 3)"] }; },
    () => { const k = ri(0, 10), base = [[8, 1, 6], [3, 5, 7], [4, 9, 2]].map(r => r.map(v => v + k)), S = 3 * (5 + k);
      const hidePos = pk([[0, 0], [0, 2], [2, 0], [2, 2], [0, 1], [1, 0]]), [hr, hc] = hidePos, a = base[hr][hc];
      const row = base[hr].map((v, j) => j === hc ? "□" : v), others = base[hr].filter((_, j) => j !== hc);
      return { g:"maho", lv:"中級", q:"3×3 の 魔方陣(まん中は " + (5 + k) + ")。" + (hr + 1) + "行目は [ " + row.join("・") + " ]。□に 入る 数は？", a, d:0, u:"",
        w:[a + 1, a - 1, a + 3, S - others[0]], ex:["1列の 合計 = まん中 × 3 = " + (5 + k) + " × 3 = " + S, "□ = " + S + " − " + others.join(" − ") + " = " + a] }; },
    () => { const N = ri(40, 99), a = N - 18;
      return { g:"maho", lv:"上級", q:"4×4 の 魔方陣の 即席づくり。お客さんの 数は " + N + "。型の 4つの ます(N−20・N−21・N−18・N−19)の うち、いちばん 大きい 数は？", a, d:0, u:"",
        w:[N - 20, N - 21, N - 19, N + 18], ex:["4つの ますは " + (N - 20) + "・" + (N - 21) + "・" + (N - 18) + "・" + (N - 19), "いちばん 大きいのは N − 18 = " + N + " − 18 = " + a, "のこりの 12の ますは 1〜12 の 決まった 数。どの 列にも 4つの ますが 1つずつ 入るので 合計が " + N + " に なる"] }; },
    /* 🎲 サイコロ */
    () => { const t = ri(1, 6), a = 7 - t;
      return { g:"dice", lv:"入門", q:"サイコロの 上の 面が " + t + "。テーブルに ついている 下の 面は？", a, d:0, u:"", rng:[1, 6],
        w:[t === a ? (a % 6) + 1 : t, a % 6 + 1, (a + 4) % 6 + 1, (a + 1) % 6 + 1], ex:["ふつうの サイコロは 向かい合う 面の 和が 7", "下の 面 = 7 − " + t + " = " + a] }; },
    () => { const t1 = ri(1, 6), t2 = ri(1, 6), s2 = t1 + t2, a = 14 - s2;
      return { g:"dice", lv:"入門", q:"サイコロを 2つ ふった。上の 面の 合計は " + s2 + "。2つの 下の 面の 合計は？", a, d:0, u:"",
        w:[s2, 12 - s2 > 0 ? 12 - s2 : a + 2, a + 1, a - 1].filter(v => v !== a), ex:["1つの サイコロで 上 + 下 = 7。2つで 7 × 2 = 14", "下の 合計 = 14 − " + s2 + " = " + a] }; },
    () => { const n = ri(2, 5), t = ri(1, 6), a = 7 * n - t;
      return { g:"dice", lv:"中級", q:"サイコロを " + n + "つ 重ねて 塔に した。いちばん 上の 面は " + t + "。見えない 面(重なって いる 面と いちばん 下の 面)の 合計は？", a, d:0, u:"",
        w:[7 * n, 7 * n + t, 6 * n - t, a + 7], ex:["1つの サイコロの 上と 下の 和は 7 → " + n + "つで 7 × " + n + " = " + 7 * n, "そこから 見えて いる いちばん 上の " + t + " を 引く → " + 7 * n + " − " + t + " = " + a] }; },
    /* 🧮 速算 */
    () => { const n = ri(12, 99), a = n * 9;
      return { g:"soku", lv:"入門", q:n + " × 9 を「× 10 して その 数を 引く」で 暗算すると？", a, d:0, u:"",
        w:[n * 10, n * 8, a + 9, a - 10], ex:[n + " × 10 = " + n * 10, n * 10 + " − " + n + " = " + a] }; },
    () => { const n = ri(12, 98), t = Math.floor(n / 10), o = n % 10, a = n * 11;
      return { g:"soku", lv:"中級", q:n + " × 11 は？(2つの 数字の あいだに、その 2つを 足した 数を 入れる)", a, d:0, u:"",
        w:[t * 100 + o, n * 10, a + 100, a - 10], ex:["あいだに 入れる 数 = " + t + " + " + o + " = " + (t + o), (t + o < 10 ? t + "|" + (t + o) + "|" + o + " = " + a : "くり上がり あり: " + t + " + 1 = " + (t + 1) + " → " + a) + "(" + n + " × 11 = " + a + ")"] }; },
    () => { const k = ri(1, 9), n = 10 * k + 5, a = n * n;
      return { g:"soku", lv:"中級", q:n + " × " + n + " は？(5で 終わる 数の 2乗)", a, d:0, u:"",
        w:[k * k * 100 + 25, k * (k + 1) * 10 + 25, a + 100, a - 50], ex:["十の位 " + k + " × (" + k + " + 1) = " + k * (k + 1), "うしろに 25 を つける → " + a] }; },
    () => { const t = ri(2, 9), b = ri(1, 9), c = 10 - b, x = 10 * t + b, y = 10 * t + c, a = x * y;
      return { g:"soku", lv:"上級", q:x + " × " + y + " は？(十の位が 同じで、一の位を 足すと 10)", a, d:0, u:"",
        w:[t * t * 100 + b * c, a + 100, a - 10, t * (t + 1) * 100], ex:[t + " × (" + t + " + 1) = " + t * (t + 1), b + " × " + c + " = " + b * c + "(2けたに する: " + String(b * c).padStart(2, "0") + ")", "ならべて " + a] }; },
    /* 🃏 カードの 数(ジョーカーなし 52枚。⚠️ 数の 性質だけ。並べかたの しかけは 出さない) */
    () => { const Q = pk([["♥ と ♦(赤の カード)を ぜんぶ ぬくと、のこりは 何枚？", 26, ["52 − 26 = 26", "赤は ♥ 13枚 + ♦ 13枚 = 26枚"]],
                          ["絵札(J・Q・K)は ぜんぶで 何枚？", 12, ["1つの マークに J・Q・K の 3枚", "3 × 4つの マーク = 12枚"]],
                          ["A(エース)を 4枚 ぬくと、のこりは 何枚？", 48, ["52 − 4 = 48"]],
                          ["1つの マーク(♠ など)は 何枚？", 13, ["52 ÷ 4つの マーク = 13枚(A・2〜10・J・Q・K)"]],
                          ["♠ を ぜんぶ ぬくと、のこりは 何枚？", 39, ["52 − 13 = 39"]]]), a = Q[1];
      return { g:"card", lv:"入門", q:"トランプ(ジョーカーなし 52枚)。" + Q[0], a, d:0, u:"枚", w:[a + 1, a - 1, a + 4, a * 2 <= 52 ? a * 2 : a - 4], ex:Q[2] }; },
    () => { const n = ri(3, 10), a = 2 ** n;
      return { g:"card", lv:"中級", q:"赤か 黒の カードが " + n + "枚 ならぶ。赤と 黒の ならびかたは ぜんぶで 何とおり？", a, d:0, u:"とおり",
        w:[2 * n, a * 2, a / 2, n * n], ex:["1枚ごとに 赤か 黒の 2とおり", "2 を " + n + "回 かける → 2の " + n + "乗 = " + a + " とおり", "だから 色の ならびを おぼえる ときは 2枚ずつ(4種類)の かたまりに すると らく"] }; },
    /* 💡 2進数(封筒の 予言) */
    () => { const x = ri(1, 15), cards = [1, 2, 4, 8].filter(v => x & v), a = x;
      return { g:"bin", lv:"中級", q:"封筒の 予言: 1・2・4・8 の カード。お客さんの 数が 入って いた カードは「" + cards.join("・") + "」。お客さんの 数は？", a, d:0, u:"",
        w:[a + 1, a - 1, a + 2, a + 3, a + 4], ex:["数が ある カードの いちばん 左(いちばん 小さい 数)を 足す", cards.join(" + ") + " = " + a, "1〜15 は 1・2・4・8 の 足し算で ちょうど 1とおりに 表せる(2進数)"] }; },
    () => { const n = ri(3, 7), a = 2 ** n - 1, list = Array.from({ length:n }, (_, i) => 2 ** i);
      return { g:"bin", lv:"上級", q:"封筒の 予言の カードを " + list.join("・") + " の " + n + "枚に した。当てられる いちばん 大きい 数は？", a, d:0, u:"",
        w:[2 ** n, list.reduce((p, c) => p + c, 0) + 1, 2 ** (n - 1), a - 1], ex:["ぜんぶの カードに 入って いる 数 = " + list.join(" + ") + " = " + a, "カードを 1枚 ふやすと 2倍 + 1 まで 当てられる"] }; },
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
      h += '<p class="ai-qlead">メンタリストの 定番の「数の ふしぎ」(9の ふしぎ・1089・カレンダーと 曜日・魔方陣・サイコロ・速算・カードの 数・2進数)だよ。数字は 毎回 かわるので、何回でも 新しい 問題に なるよ。答えた あとに とき方が 出るよ。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset" style="grid-template-columns:1fr"><select id="ai-cg"><option value="">🧮 ぜんぶの なかま</option>' +
        CALC_G.map(([v, l]) => '<option value="' + v + '"' + (cset.g === v ? " selected" : "") + '>' + esc(l) + '</option>').join("") + '</select></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">はじめる</button>' +
        '<p class="ai-note">ゲームの 練習問題です。どれも 算数の 本に のっている 数学の 性質で、道具の しかけでは ありません。とき方を おぼえたら 🎩 演目で 家族の 前で 演じてみよう(やってもいい? と 聞いてから)。電卓を 使っても OK。</p>';
    }else if(C.i >= C.list.length){
      h += '<p class="ai-qres">' + C.ok + ' / ' + C.list.length + ' 問 正解！' + (C.ok === C.list.length ? " 🎉" : "") + '</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">もう一度(新しい 数字で)</button><button type="button" class="ai-btn ai-wide" data-ai-open="calc">なかまを えらびなおす</button>';
    }else{
      const P = C.list[C.i], done = C.picked !== null;
      h += '<p class="ai-qn">' + (C.i + 1) + ' / ' + C.list.length + '　<span>' + esc(GN[P.g]) + ' ・ ' + esc(P.lv) + '</span></p><p class="ai-qq">' + esc(P.q) + '</p>' +
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

  /* ── 🎩 演目(けいくん 2026-10-23「メンタリストになれるように 実践的にしてほしい」)──
     tools/mentalist/routines.json の 10本。1手順ずつ カードを めくる(① はじめの ことば → … → ⑤ しめの ことば)。
     各手順に 💬 セリフ・🖐 すること・🧠 ここで はたらく 心理・⚠️ うまく いかない ときの 切りかえし。さいごに セリフの 見本(パター)と「なぜ うまく いくの?」
     ⚠️ 道具の しかけ無し。数学・記憶・公開されている 心理の 傾向だけ。どの 演目も ①は「やってみても いい?」 */
  const RT = D.routines || [], RBY = Object.fromEntries(RT.map(r => [r.id, r]));
  const POWER_ICON = { "観察":"👀", "記憶":"🧩", "心理":"🧠", "ことば":"🗣", "数":"🔢", "舞台":"🎭" };
  let rtCur = null, rtStep = 0;
  function openRoutine(id){ rtCur = id && RBY[id] ? id : null; rtStep = 0; sheet("ai-rt"); drawRoutine(); }
  function drawRoutine(){
    const sh = document.getElementById("ai-rt"), R = rtCur && RBY[rtCur];
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🎩 演目</h2>';
    if(!R){
      h += '<p class="ai-qlead">きょう 演じられる 10本の 演目だよ。手順を 1つずつ めくって 練習しよう。どれも 道具の しかけは 使わない(数学・記憶・心理だけ)。</p>' +
        '<p class="ai-consent">🤝 どの 演目も「やってみても いい?」から はじめて、いやなら すぐ やめようね。</p><div class="ai-rlist">' +
        RT.map((r, i) => '<button type="button" class="ai-rcard" data-ai-rt="' + esc(r.id) + '"><span class="ai-ric">' + esc(r.icon || "🎩") + '</span><b>' + (i + 1) + '. ' + esc(r.name) + '</b><small>' +
          (POWER_ICON[r.power] || "") + " " + esc(r.power) + " ・ " + LVN[r.dv].icon + " " + esc(LVN[r.dv].name) + '</small></button>').join("") + '</div>' +
        '<p class="ai-note">' + esc(D.note) + '</p>';
    }else if(rtStep >= R.steps.length){
      h += '<p class="ai-rhead">' + esc(R.icon || "🎩") + " " + esc(R.name) + '</p>' +
        '<div class="ai-rstep done"><p class="ai-rt-t">🎉 おつかれさま! これで 1本 おわり</p>' +
        '<p class="ai-ex"><b>💬 セリフの 見本</b>' + esc(R.patter) + '</p>' +
        '<p class="ai-ex ai-skb"><b>🧠 なぜ うまく いくの?</b>' + esc(R.why) + '</p>' +
        '<p class="ai-small ai-muted">はじめは 家族に 1回。つぎは 鏡の 前で 3回。外れても 笑顔で しめれば 大成功だよ。</p></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-rstep="0">もう一度 はじめから</button><button type="button" class="ai-btn ai-wide" data-ai-rt="">演目の 一覧へ</button>';
    }else{
      const S = R.steps[rtStep];
      h += '<p class="ai-rhead">' + esc(R.icon || "🎩") + " " + esc(R.name) + ' <small>' + (POWER_ICON[R.power] || "") + " " + esc(R.power) + " ・ " + LVN[R.dv].icon + " " + esc(LVN[R.dv].name) + '</small></p>' +
        (rtStep === 0 ? '<p class="ai-small">' + esc(R.lead) + '</p>' : "") +
        '<div class="ai-rdots">' + R.steps.map((_, i) => '<i class="' + (i < rtStep ? "on" : i === rtStep ? "now" : "") + '"></i>').join("") + '</div>' +
        '<div class="ai-rstep"><p class="ai-rt-t">' + "①②③④⑤⑥⑦"[rtStep] + " " + esc(S.title) + '</p>' +
        (S.say ? '<p class="ai-say-b">💬 「' + esc(S.say.replace(/^「|」$/g, "")) + '」</p>' : "") +
        '<p class="ai-ex"><b>🖐 すること</b>' + esc(S.do) + '</p>' +
        '<p class="ai-ex ai-skb"><b>🧠 ここで はたらく 心理</b>' + esc(S.kokoro) + '</p>' +
        '<p class="ai-ex ai-outb"><b>⚠️ うまく いかない とき</b>' + esc(S.out) + '</p></div>' +
        '<div class="ai-rnav"><button type="button" class="ai-btn" data-ai-rstep="' + (rtStep - 1) + '"' + (rtStep ? "" : " disabled") + '>← まえ</button>' +
        '<button type="button" class="ai-btn ai-go" data-ai-rstep="' + (rtStep + 1) + '">' + (rtStep + 1 < R.steps.length ? "つぎの 手順 →" : "しめくくり →") + '</button></div>' +
        '<button type="button" class="ai-btn ai-wide" data-ai-rt="">演目の 一覧へ</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-rt");
    sh.scrollTop = 0;
  }

  /* ── 📅 きょうの 練習(6つの 力 × 5 = 30日。日付で 決まる。「できた!」を おすと その日に 印 → つづけて できたら 🔥)──
     tools/mentalist/practice.json。きろくは 人ごとに flick-mentalist-renshu[-p<id>](日の 通し番号の 配列。土台の dayIndex / streakOf を 使う)
     ⚠️ 人を ためす 練習には かならず「やってもいい?」が 入っている(terms_js.py が 確かめる)。切れても 責めない */
  const PR = D.practice || [], POWERS = ["観察", "記憶", "心理", "ことば", "数", "舞台"];
  function practiceOf(day){
    const k = ((day % 30) + 30) % 30, pw = POWERS[k % 6], list = PR.filter(p => p.power === pw);
    return list.length ? list[Math.floor(k / 6) % list.length] : PR[k % Math.max(1, PR.length)];
  }
  function prDays(){ try{ const a = JSON.parse(recGet(pkey("flick-mentalist-renshu")) || "[]"); return new Set(Array.isArray(a) ? a : []); }catch(e){ return new Set(); } }
  function practiceDone(){ return typeof dayIndex === "function" && prDays().has(dayIndex(Date.now())); }
  function markPractice(){ const s = prDays(); s.add(dayIndex(Date.now())); recSet(pkey("flick-mentalist-renshu"), JSON.stringify([...s].sort((a, b) => a - b))); }
  function openPractice(){ sheet("ai-pr"); drawPractice(); }
  function drawPractice(){
    const sh = document.getElementById("ai-pr"), today = dayIndex(Date.now()), P = practiceOf(today), done = practiceDone();
    const st = typeof streakOf === "function" ? streakOf(prDays()) : { days:0, best:0 };
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📅 きょうの 練習</h2>' +
      '<p class="ai-qlead">トップの メンタリストは 毎日 少しずつ 練習して いるよ。6つの 力(観察・記憶・心理・ことば・数・舞台)を 日がわりで 3分ずつ。</p>';
    if(P) h += '<div class="ai-prcard' + (done ? " done" : "") + '"><p class="ai-prpw">' + (POWER_ICON[P.power] || "") + " きょうの 力: " + esc(P.power) + '</p><p class="ai-prtx">' + esc(P.text) + '</p>' +
      (P.ask ? '<p class="ai-consent">🤝 「やってもいい?」と 聞いて、いやなら やめようね。</p>' : "") +
      (done ? '<p class="ai-prok">✅ きょうは できたね!</p>' : '<button type="button" class="ai-btn ai-wide ai-go" data-ai-prdone="1">✅ できた!</button>') + '</div>';
    h += '<p class="ai-prst">' + (st.days ? '🔥 つづけて <b>' + st.days + '</b>日' : 'きょう できたら 1日目') + (st.best > 1 ? '<small>いちばん ながく つづいたのは ' + st.best + '日</small>' : "") + '</p>';
    h += '<details class="ai-diag"><summary class="ai-dh">🗓 30日ぶんの メニューを 見る <small>あしたは 何かな?</small></summary><ol class="ai-prall">' +
      Array.from({ length:30 }, (_, i) => { const d = today + i, x = practiceOf(d); return x ? '<li' + (i === 0 ? ' class="now"' : "") + '>' + (i === 0 ? "きょう " : i === 1 ? "あした " : "") + (POWER_ICON[x.power] || "") + " " + esc(x.text) + '</li>' : ""; }).join("") + '</ol></details>' +
      '<p class="ai-note">練習は ゲームの 外で やろうね。人に ためす ときは かならず「やってもいい?」と 聞いてから。</p>';
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-pr");
  }

  /* ── 📜 メンタリズムの 年表(ホーム。<details>)。事実だけ・生まれた 年は 書かない ── */
  const NENPYO = [
    ["19世紀", "舞台で「こころを 読む」芸が 人気に。のちに 心理と 観察の 芸と して 研究される"],
    ["1905年", "ロンドンで ザ・マジック・サークルが できる(たねを 明かさない 決まりで 知られる)"],
    ["1920年代", "フーディーニが、にせの 霊媒の しかけを 調べて 明かす"],
    ["1948年", "フォアラーの 実験。だれにでも 当てはまる 文が「当たる」と 感じられる(バーナム効果)"],
    ["20世紀 なかごろ", "ダニンジャーらが ラジオ・テレビで 読心の 芸を 見せる"],
    ["1964年", "ジェームズ・ランディが、超能力を 名のる 人を 科学の 目で 調べる 賞を はじめる"],
    ["1991年", "世界記憶力選手権が はじまる(記憶の 技を きそう 大会)"],
    ["2000年ごろ〜", "デレン・ブラウンが「超能力では なく、心理と 暗示と ショーマンシップ」と 公言して テレビで 演じる"],
    ["いま", "メンタリストは 心理学と 観察を つかった 芸。超能力を 名のらないのが 世界の 決まり"],
  ];
  function nenpyoSvg(){ return '<ol class="ai-nenpyo">' + NENPYO.map(([y, t]) => '<li><b>' + esc(y) + '</b><span>' + esc(t) + '</span></li>').join("") + '</ol>'; }

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-cstart],[data-ai-cnext],[data-ai-cans],[data-ai-say],[data-ai-rt],[data-ai-rstep],[data-ai-prdone],.ai-node");
    if(!t) return;
    if(t.dataset.aiSay){ const q = BY.get(t.dataset.aiSay); if(q) enSay(q.ei); return; }
    if(t.dataset.aiTerm) return detail(t.dataset.aiTerm);
    if(t.dataset.aiRt !== undefined){ rtCur = t.dataset.aiRt || null; rtStep = 0; return drawRoutine(); }
    if(t.dataset.aiRstep !== undefined){ rtStep = Math.max(0, +t.dataset.aiRstep); return drawRoutine(); }
    if(t.dataset.aiPrdone){ markPractice(); drawPractice(); home(mode); return; }
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
      if(o === "routine") return openRoutine();
      if(o === "practice") return openPractice();
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
.ai-panel{background:linear-gradient(160deg,#f3f0ff 0%,#f8f9fa 55%,#fff4e6 100%);border:1px solid #d0bfff;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#6741d9;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#7048e8,#f59f00,#d6336c);border-radius:99px}
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
.ai-dtabs button.on{background:#7048e8;border-color:#7048e8;color:#fff}
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
.ai-learn .ai-ko{color:#c2255c;font-weight:700}.ai-kob b{background:#c2255c!important}.ai-skb b{background:#7048e8!important}.ai-btb b{background:#e67700!important}.ai-outb b{background:#868e96!important}
.ai-hi{background:#fff4e6;border-color:#ffc078}
.ai-consent{background:#fff9db;border:1px solid #ffe066;border-radius:12px;padding:6px 10px;font-size:13px;font-weight:700;color:#7a5b00;margin:8px 0}
.ai-rlist{display:grid;gap:8px}.ai-rcard{display:grid;grid-template-columns:44px 1fr;align-items:center;gap:2px 10px;text-align:left;padding:10px;border-radius:14px;border:1.5px solid #d0bfff;background:#f8f6ff;color:#1e1b4b;font:inherit;cursor:pointer}
.ai-ric{grid-row:span 2;font-size:28px;text-align:center}.ai-rcard b{font-size:15px}.ai-rcard small{color:#64748b;font-size:12px}
.ai-rhead{font-weight:900;font-size:17px;margin:4px 0 6px}.ai-rhead small{display:block;font-size:12px;color:#64748b;font-weight:700}
.ai-rdots{display:flex;gap:6px;justify-content:center;margin:8px 0}.ai-rdots i{width:10px;height:10px;border-radius:99px;background:#e2e8f0}.ai-rdots i.on{background:#b197fc}.ai-rdots i.now{background:#7048e8;transform:scale(1.25)}
.ai-rstep{background:#fff;border:1.5px solid #d0bfff;border-radius:16px;padding:10px 12px;animation:aiIn .3s ease-out}.ai-rt-t{font-weight:900;font-size:16px;margin:0 0 6px;color:#5f3dc4}
.ai-say-b{background:#f3f0ff;border-radius:12px;padding:8px 10px;font-size:15px;line-height:1.8;font-weight:700;margin:6px 0}
.ai-rnav{display:grid;grid-template-columns:1fr 2fr;gap:8px;margin-top:10px}.ai-rnav .ai-btn:disabled{opacity:.4}
.ai-prcard{background:#fff;border:2px solid #b197fc;border-radius:18px;padding:12px;text-align:center}.ai-prcard.done{border-color:#69db7c;background:#ebfbee}
.ai-prpw{margin:0;font-weight:800;color:#5f3dc4}.ai-prtx{font-size:18px;font-weight:900;line-height:1.7;margin:8px 0}.ai-prok{font-weight:900;color:#2b8a3e;margin:8px 0 0}
.ai-prst{text-align:center;font-weight:800;margin:12px 0}.ai-prst b{font-size:26px;color:#e8590c}.ai-prst small{display:block;color:#64748b;font-size:12px}
.ai-prall{margin:6px 0 0;padding-left:1.6em;font-size:13px;line-height:1.8}.ai-prall li.now{font-weight:900;color:#5f3dc4}
.ai-nenpyo{list-style:none;margin:6px 0 0;padding:0 0 0 10px;border-left:3px solid #b197fc}.ai-nenpyo li{margin:0 0 8px;font-size:13px;line-height:1.6}.ai-nenpyo b{display:block;color:#5f3dc4}
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
.ai-zsum{text-align:center;margin:4px 0 8px}.ai-zsum b{font-size:22px;color:#6741d9}
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
.ai-qlead{font-size:13.5px;line-height:1.8;margin:4px 0 10px}.ai-qset{grid-template-columns:1fr 1fr}.ai-go{background:#7048e8;border-color:#7048e8;color:#fff}
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#7048e8}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"mentalistterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
