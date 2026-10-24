/* フリック犬の気持ち: 犬の 気持ちが わかる ための ことばを、フリックで 打って おぼえる。(けいくん 2026-10-23「犬の気持ちがわかるように なるために必要な知識をフリック形式の問題にしてください」→「犬種と歴史を増やして トイプードルを入れて」「しつけも増やして」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「犬の気持ちの 旅」を 足す ファイル。inu/ の ページだけが 読む ─
   ことばは tools/inu/meta.json + terms-*.json + letters.json + lessons.json + observe.json → tools/inu/terms_js.py が data/inu.json と inu/terms.js(INU_TERMS)に する。
   **ことばを 足す・直すのは tools/inu/terms-<旅>.json だけ**(手紙は letters.json、レッスンは lessons.json、観察は observe.json)
   ・もとは フリックメンタリスト(mentalist/mentalist.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 11: 👀 体のサイン / 🔊 声とにおい / 🤫 やめてのサイン(いちばん 大事)/ 🏠 犬のくらし / 🎓 ほめて教える / 🧩 困りごとのなおしかた / 🐾 犬の体のしくみ / 🐕 犬種図鑑(トイプードルが 先頭)/ 📜 歴史とはたらく犬 / 🛡 犬と人が安心 / 💛 犬のこころ。+ 🏆 マスター
   ・レベルは 入門(きょう 家の 犬を 1つ 読める)→ 中級(犬と 気持ちよく くらせる)→ 上級(犬の 専門家の 入口)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・こたえると ことばの 意味が 出る。結果・図鑑には 💭 きもち・🔬 かがく(研究で わかった / 言い伝え / むかしの 考え / 研究中)・🎯 やってみよう・🐕 犬種の 札(国・グループ・大きさ・もともとの 役目)
   ・⭐ 実践の 柱: 🐶 犬からの 手紙(20枚。場面 → 気持ちを 4択 → こうして あげよう)・📘 レッスン(15本。1手順ずつ めくる)・📅 きょうの かんさつ(30日。できたら 🔥)
   ⚠️⚠️ こわく しない(かまれる・事故の 字を 使わない)/ 「◯◯犬は ◯◯な 性格」と 決めつけない / 科学と 言い伝えを 分ける / しつけは ほめて 教える だけ(罰の 方法は 名前も 書かない)/ 知らない 犬に さわる 練習は 書かない */
const INU = (() => {
  const D = INU_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に inshigusa … inmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { shigusa:"inshigusa", nakigoe:"innakigoe", yamete:"inyamete", kurashi:"inkurashi", shitsuke:"inshitsuke", komari:"inkomari", karada:"inkarada", kenshu:"inkenshu", rekishi:"inrekishi", anzen:"inanzen", kokoro:"inkokoro" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));
  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"inuterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
  /* マスター: 11の 旅を まぜて ぜんぶ(きまった ならび。どの ステージも いつも 同じ 10語 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.slice().sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.inmas = lv; pools.inmas = ALL; colors.inmas = "#e8590c";
    maps.inmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　11の 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>犬の 気持ちを はば広く</small>' };
  }
  const MODES_ALL = ["inshigusa", "innakigoe", "inyamete", "inkurashi", "inshitsuke", "inkomari", "inkarada", "inkenshu", "inrekishi", "inanzen", "inkokoro", "inmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-inu[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-inu-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-inu");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-inu"), JSON.stringify(v)); memo = { k:pkey("flick-inu"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-inu-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-inu-fav"), JSON.stringify(a)); return i < 0; }
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
  /* うしろに うすく 描く 形(めやすの 絵。箱の 位置とは 合わせない)。⚠️ 歯を むいた 犬・けが・人の 顔は 描かない
     dog = 横から 見た 犬の 形(体の 気持ちの 地図) */
  const BG = {
    dog:'<g opacity=".07" fill="#0f172a"><ellipse cx="180" cy="200" rx="120" ry="62"/><circle cx="300" cy="120" r="48"/><path d="M276 82 L288 34 L312 78Z"/><path d="M60 170 Q10 120 30 70 Q50 120 80 160Z"/>' +
      '<rect x="80" y="240" width="22" height="100" rx="10"/><rect x="130" y="240" width="22" height="100" rx="10"/><rect x="220" y="240" width="22" height="100" rx="10"/><rect x="262" y="240" width="22" height="100" rx="10"/><ellipse cx="340" cy="134" rx="22" ry="14"/></g>'
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
  /* ── 結果・図鑑の くわしい 情報: 💭 きもち / 🔬 かがく / 🐕 犬種の 札 / 🎯 やってみよう / つながる ことば ── */
  const KG = D.kagaku || {};
  const KG_ICON = { kenkyu:"🔬", iitsutae:"💬", furui:"🕰", kenkyuchu:"🧪" };
  function breedTags(q){
    const b = q.br; if(!b) return "";
    return '<div class="ai-brd"><span>🌍 ' + esc(b.kuni) + '</span><span>🏷 ' + esc(b.group) + '</span><span>📏 ' + esc(b.size) + '</span></div>' +
      '<p class="ai-ex ai-brb"><b>🐕 もともとの 役目</b>' + esc(b.yakume) + '</p>';
  }
  function info(q, inZukan){
    const tag = inZukan ? "" : last && last.fresh.includes(q.art) ? '<span class="ai-tag new">🆕 はじめて 出会った</span>' : "";
    const d = discovered();
    let h = '<div class="ai-info">' + tag;
    if(q.km) h += '<p class="ai-ex ai-kmb"><b>💭 きもち</b>' + q.kmrb + '</p>';    // このとき 犬は たぶん こう 感じている(1文)
    if(q.kg) h += '<p class="ai-ex ai-kgb ai-kg-' + esc(q.kg) + '"><b>' + (KG_ICON[q.kg] || "🔬") + ' かがく: ' + esc(KG[q.kg] || "") + '</b>' + (q.knrb || "") + '</p>';
    h += breedTags(q);
    if(q.rs) h += '<p class="ai-ex ai-kob"><b>🎯 やってみよう</b>' + q.rsrb + '</p>';  // きょう できる 観察・練習(この ゲームの 実践の 柱)
    if(q.ei) h += '<p class="ai-small ai-ei">🇬🇧 英語: <b lang="en">' + esc(q.ei) + '</b>' + (EN_TTS ? ' <button type="button" class="ai-say" data-ai-say="' + esc(q.art) + '" aria-label="英語の 音を 聞く">🔊 英語で 聞く</button>' : "") + '</p>';
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.f) h += '<p class="ai-small ai-muted">📚 分野: ' + esc(q.f) + '</p>';
    if(q.al) h += '<p class="ai-small">読みかた: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</p>';
    const rel = (q.rel || []).map(id => BY.get(id)).filter(Boolean);
    if(rel.length) h += '<p class="ai-small">🔗 つながる ことば</p><div class="ai-chips">' + rel.map(x => d.has(x.art) ? chip(x) : '<button type="button" class="ai-chip lock" data-ai-term="' + esc(x.art) + '">❔ ？？？</button>').join("") + '</div>';
    // しくみ図・地図(📍)は 10問の あとの 説明・図鑑に のせない(けいくん 2026-09-29「すべてのフリックゲームを同じ仕様に」)。ホームの 図は たたんで のこす
    return h + '<p class="ai-small ai-muted ai-one">🐶 犬の 気持ちは 1匹ずつ ちがいます。この ゲームは 読みかたの ヒントです</p></div>';
  }

  /* ── ホーム: 見つけた ことば・称号・しくみ図・旅マップ ── */
  let diagCur = null;
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n), td = todayWords().length, fv = favs().length, lt = lettersDone().size;
    const jr = JR.map(J => { const all = pools[MODE_OF[J.id]], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + J.icon + " " + J.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + got + '</b> / ' + all.length + '</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%;--c:' + J.color + '"></i></li>'; }).join("");
    if(JOURNEY_OF[m]) diagCur = JBY[JOURNEY_OF[m]].diagram;
    if(!diagCur) diagCur = "shigusa";
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn ai-hi" data-ai-open="letter">🐶 犬からの 手紙' + (LT.length ? "(" + lt + " / " + LT.length + ")" : "") + '</button>' +
      '<button type="button" class="ai-btn ai-hi" data-ai-open="lesson">📘 レッスン(' + LS.length + '本)</button>' +
      '<button type="button" class="ai-btn ai-hi" data-ai-open="observe">📅 きょうの かんさつ' + (observeDone() ? " ✅" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="zukan">📖 ことば図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>体の 気持ちの 地図・やめての サイン など。覚えた ことばが 📍に なるよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
      '<details class="ai-diag"><summary class="ai-dh">🐕 しっぽの 高さと ふりかたの 図 を ひらく <small>しっぽ だけで 決めないで、体 ぜんぶで 読もう</small></summary>' + tailSvg() + '</details>' +
      '<details class="ai-diag"><summary class="ai-dh">🤫 やめての サインの 段階 を ひらく <small>うなる までに 何回も「やめて」を 出している</small></summary>' + ladderHtml() + '</details>' +
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
        (J.id === "shitsuke" || J.id === "komari" ? '<p class="ai-lead"><button type="button" class="ai-btn ai-hi" data-ai-open="lesson">📘 レッスンの 手順を 見る</button></p>' : "") +
        (J.id === "yamete" || J.id === "shigusa" ? '<p class="ai-lead"><button type="button" class="ai-btn ai-hi" data-ai-open="letter">🐶 犬からの 手紙を 読む</button></p>' : "");
    }else chips.innerHTML = '<p class="ai-lead">11の 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "inmas") return { name:"マスター" + (i + 1), sub:"11の 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };
  }

  /* ── しっぽの 図(コードで 描く。高さ 3つ × 気持ちの めやす)。⚠️ 決めつけない: 「ことが 多い」 ── */
  function tailSvg(){
    // 犬は 右むき(体 = だ円・頭 = 円)。しっぽは 体の 左はし(55, cy)から。字は 右(x = 215〜)に 分けて 書く
    const rows = [["高く 上げる", "M55 0 Q30 -30 38 -62", "気持ちが 高まって いる ことが 多い(うれしい・気を はっている)"],
                  ["ふだんの 高さ", "M55 0 Q28 8 14 28", "落ちついて いる ことが 多い"],
                  ["足の 間に しまう", "M55 0 Q48 26 78 30", "こわい・不安な ことが 多い"]];
    let s = '<svg class="ai-svg" viewBox="0 0 360 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="しっぽの 高さの 図">';
    rows.forEach(([lb, path, tx], k) => {
      const cy = 70 + k * 100;
      s += '<g transform="translate(0 ' + cy + ')"><path d="' + path + '" stroke="#e8590c" stroke-width="9" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="105" cy="0" rx="52" ry="22" fill="#ffe8cc"/><circle cx="165" cy="-20" r="20" fill="#ffe8cc"/><circle cx="172" cy="-24" r="2.6" fill="#7a3500"/>' +
        '<rect x="70" y="14" width="10" height="26" rx="5" fill="#ffe8cc"/><rect x="132" y="14" width="10" height="26" rx="5" fill="#ffe8cc"/></g>' +
        '<text x="215" y="' + (cy - 18) + '" font-size="13" font-weight="900" fill="#1e293b">' + esc(lb) + '</text>';
      (tx.match(/.{1,11}/g) || [tx]).forEach((w, i) => { s += '<text x="215" y="' + (cy + 2 + i * 15) + '" font-size="10.5" fill="#475569">' + esc(w) + '</text>'; });
    });
    s += '</svg><p class="ai-small ai-muted">🔬 しっぽを ふるのは「うれしい」だけでは ないよ。ゆっくり 大きく / 速く 小さく / 右より・左より で ちがう ことが 研究で わかってきた。しっぽの 高さは 犬種でも ちがうので、その 犬の ふだんと くらべて、体 ぜんぶで 読もう。</p>';
    return s;
  }
  /* ── やめての サインの 段階(ラダー)。下へ いくほど 強い。⚠️ こわく しない。どこで 気づいても「そっと はなれる」 ── */
  function ladderHtml(){
    const S = [["🥱", "あくび・鼻を なめる"], ["↪️", "目を そらす・顔を そむける"], ["🔄", "体を 横に 向ける・はなれる"], ["🐾", "ゆっくり 動く・地面の においを かぐ"], ["🧊", "かたまる・しっぽを しまう"], ["⚠️", "うなる(とても 大事な 合図。しからないで)"]];
    return '<ol class="ai-ladder">' + S.map(([e, t], i) => '<li style="--k:' + i + '"><span>' + e + '</span>' + esc(t) + '</li>').join("") + '</ol>' +
      '<p class="ai-small ai-muted">犬は 強い 合図を 出す 前に、小さな「やめて」を 何回も 出して いるよ。上の ほうで 気づいて、そっと はなれて あげよう。そうすれば 犬も 人も 安心。</p>';
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
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: あくび)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
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

  /* ── 4択クイズ(けいくん 2026-09-26「すべてお願いします」)。意味を たしかめる 練習 ──
     ・犬の気持ち だけの 形: ② 💭 きもち → どの しぐさ? / ④ 🐕 犬種 → どの 国 生まれ? どの グループ?(breed の 札から)
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
  /* 1問を 作る。type 0 = 説明 → ことば / 1 = ことば → 説明 / 2 = 💭 きもち → ことば / 3 = 🐕 犬種 → 国・グループ(文字の 4択) */
  function makeItem(q, i){
    if(q.br && i % 2 === 0){
      const key = i % 4 === 0 ? "kuni" : "group", right = q.br[key];
      const others = shuffle([...new Set(ALL.filter(x => x.br && x.br[key] !== right).map(x => x.br[key]))]).slice(0, 3);
      if(others.length === 3) return { q, type:3, key, opts:shuffle([right].concat(others)), right };
    }
    return { q, type:q.km && i % 3 === 2 ? 2 : i % 2, ch:shuffle([q].concat(wrongs(q, 3))) };
  }
  function openQuiz(){ quiz = null; sheet("ai-qz"); drawQuiz(); }
  function startQuiz(){
    const pool = quizPool();
    if(pool.length < 4){ drawQuiz("もんだいに できる ことばが 足りないよ(" + pool.length + "語)。はんいを 広げてね"); return; }
    quiz = { list:shuffle(pool).slice(0, QN).map((q, i) => makeItem(q, i)), i:0, ok:0, picked:null, miss:[] };
    drawQuiz();
  }
  function drawQuiz(msg){
    const sh = document.getElementById("ai-qz"), Q = quiz;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🧩 4択クイズ</h2>';
    if(!Q){
      const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
      const n = quizPool().length;
      h += '<p class="ai-qlead">ことばの 意味・犬の 気持ち・犬種の 国と グループを たしかめる 練習だよ。4つの 中から 1つ えらんでね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="ai-qr">' + opt("seen", "出会った ことば", qset.r) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, qset.r)).join("") + opt("all", "ぜんぶ", qset.r) + '</select>' +
        '<select id="ai-qj">' + opt("", "🧭 ぜんぶの 旅", qset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, qset.j)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの ことば: ' + n + '語</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームの 説明から 作っています。犬の 気持ちは 1匹ずつ ちがいます。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた ことば(おすと 説明が 読めるよ)</p><div class="ai-chips">' + Q.miss.map(q => chip(q)).join("") + '</div>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="quiz">はんいを えらびなおす</button>';
    }else{
      const it = Q.list[Q.i], done = Q.picked !== null;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + it.q.jr.icon + " " + esc(it.q.jr.name) + " ・ " + LVN[it.q.dv].icon + " " + esc(LVN[it.q.dv].name) + '</span></p>';
      if(it.type === 3){
        h += '<p class="ai-qq">🐕「<b>' + esc(it.q.n) + '</b>」' + (it.key === "kuni" ? "は どの 国 生まれ？(原産国)" : "は どの グループ？") + '</p><div class="ai-qch">' +
          it.opts.map((x, k) => '<button type="button" class="ai-btn' + (done ? (x === it.right ? " ok" : k === Q.picked ? " ng" : "") : "") + '" data-ai-ans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(x) + '</button>').join("") + '</div>';
        if(done){
          const ok = it.opts[Q.picked] === it.right;
          h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は「" + esc(it.right) + "」") + '</b>' + breedTags(it.q) + '</div>' +
               '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
        }
        sh.innerHTML = h + '</div>'; sh.querySelector(".ai-x").onclick = () => closeSheet("ai-qz"); return;
      }
      h += it.type === 2
        ? '<p class="ai-qq">💭「' + esc(hide(it.q.km, it.q)) + '」<br>犬が こんな 気持ちの とき、よく 見られる ことばは どれ？</p>'
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
    const ok = it.type === 3 ? it.opts[k] === it.right : it.ch[k] === it.q;
    if(ok) Q.ok++;
    else {
      Q.miss.push(it.q);
      const L = log(), e = L[it.q.art];  // 出会った ことばだけ 図鑑の まちがいの 回数に 足す(まだの ことばは 図鑑に 出さない)
      if(e){ L[it.q.art] = [e[0], e[1] + 1, 1, e[3], Date.now(), e[5]]; save(L); }
    }
    drawQuiz();
  }

  /* ── 🐶 犬からの 手紙(場面カード 20枚。tools/inu/letters.json)──
     場面と 犬の しぐさ → 「犬は いま どんな 気持ち?」を 4択 → 答えと 犬の ことば(ふきだし)と「こうして あげよう」(はなれる・そっと・ほめる・待つ の どれか)
     読んだ 手紙は flick-inu-letters[-p<id>] に のこす(✅ が つく) */
  const LT = D.letters || [], LTBY = Object.fromEntries(LT.map(x => [x.id, x]));
  const DO_ICON = { "はなれる":"🚶", "そっと":"🤫", "ほめる":"👏", "待つ":"⏳" };
  let ltCur = null, ltPick = null;
  function lettersDone(){ try{ const a = JSON.parse(recGet(pkey("flick-inu-letters")) || "[]"); return new Set(Array.isArray(a) ? a.filter(id => LTBY[id]) : []); }catch(e){ return new Set(); } }
  function markLetter(id, ok){ const s = lettersDone(); if(ok) s.add(id); recSet(pkey("flick-inu-letters"), JSON.stringify([...s])); }
  function openLetter(id){ ltCur = id && LTBY[id] ? id : null; ltPick = null; sheet("ai-lt"); drawLetter(); }
  function drawLetter(){
    const sh = document.getElementById("ai-lt"), L = ltCur && LTBY[ltCur], done = lettersDone();
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🐶 犬からの 手紙</h2>';
    if(!L){
      h += '<p class="ai-qlead">犬は ことばで 話せない けれど、体で たくさん 話して いるよ。場面と しぐさを 読んで、「犬は いま どんな 気持ち?」を 考えてみよう。</p>' +
        '<p class="ai-small ai-muted">読めた 手紙 ' + done.size + ' / ' + LT.length + '枚</p><div class="ai-rlist">' +
        LT.map((x, i) => '<button type="button" class="ai-rcard' + (done.has(x.id) ? " ok" : "") + '" data-ai-lt="' + esc(x.id) + '"><span class="ai-ric">' + esc(x.emoji || "🐶") + '</span><b>' + (i + 1) + '. ' + esc(x.scene) + (done.has(x.id) ? " ✅" : "") + '</b><small>✉️ 手紙を ひらく</small></button>').join("") + '</div>' +
        '<p class="ai-note">犬の 気持ちは 1匹ずつ ちがいます。答えは「ことが 多い」読みかたの ヒントです。</p>';
    }else{
      const i = LT.indexOf(L), picked = ltPick !== null;
      h += '<p class="ai-rhead">' + esc(L.emoji || "🐶") + ' ' + (i + 1) + '. ' + esc(L.scene) + '</p>' +
        '<div class="ai-letter"><p class="ai-lt-sign">👀 ' + esc(L.sign) + '</p></div>' +
        '<p class="ai-qq">🐶 犬は いま どんな 気持ち?</p><div class="ai-qch">' +
        L.choices.map((c, k) => '<button type="button" class="ai-btn' + (picked ? (k === L.answer ? " ok" : k === ltPick ? " ng" : "") : "") + '" data-ai-lans="' + k + '"' + (picked ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(c) + '</button>').join("") + '</div>';
      if(picked){
        const ok = ltPick === L.answer;
        h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 気持ちが 読めたね!" : "🤔 たぶん「" + esc(L.choices[L.answer]) + "」") + '</b><p>' + esc(L.feeling) + '</p></div>' +
          '<div class="ai-bubble"><span>🐶</span><p>' + esc(L.dogSays) + '</p></div>' +
          '<p class="ai-ex ai-dob"><b>' + (DO_ICON[L.doKind] || "💛") + ' こうして あげよう(' + esc(L.doKind) + ')</b>' + esc(L.doThis) + '</p>' +
          (L.renshu ? '<p class="ai-ex ai-kob"><b>🎯 やってみよう</b>' + esc(L.renshu) + '</p>' : "") +
          '<div class="ai-rnav"><button type="button" class="ai-btn" data-ai-lt="">一覧へ</button>' +
          (i + 1 < LT.length ? '<button type="button" class="ai-btn ai-go" data-ai-lt="' + esc(LT[i + 1].id) + '">つぎの 手紙 →</button>' : '<button type="button" class="ai-btn ai-go" data-ai-lt="">🎉 ぜんぶ 読んだ</button>') + '</div>';
      }else h += '<button type="button" class="ai-btn ai-wide" data-ai-lt="">一覧へ</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-lt");
  }

  /* ── 📘 レッスン(15本。tools/inu/lessons.json)。1手順ずつ カードを めくる ──
     各手順に 🖐 すること・💭 犬は いま こう 感じている・⚠️ やってはいけない こと。さいごに できたら / 相談の 1文
     ⚠️ ぜんぶ ほめて 教える だけ。罰の 方法は 名前も 書かない。どの レッスンにも「やめての サインを 出したら 終わり」 */
  const LS = D.lessons || [], LSBY = Object.fromEntries(LS.map(r => [r.id, r]));
  const KIND_ICON = { "きほん":"🪑", "散歩":"🦮", "子犬":"🐶", "困りごと":"🧩", "くらし":"🏠" };
  let lsCur = null, lsStep = 0;
  function openLesson(id){ lsCur = id && LSBY[id] ? id : null; lsStep = 0; sheet("ai-ls"); drawLesson(); }
  function drawLesson(){
    const sh = document.getElementById("ai-ls"), R = lsCur && LSBY[lsCur];
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📘 レッスン</h2>';
    if(!R){
      h += '<p class="ai-qlead">ほめて 教える 15本の レッスンだよ。手順を 1つずつ めくって、家の 犬と 練習しよう。1回 5分くらいで、できる ところで 終わろうね。</p>' +
        '<p class="ai-consent">🤫 犬が やめての サイン(あくび・目そらし・はなれる)を 出したら、その日は そこで 終わりに しよう。</p><div class="ai-rlist">' +
        LS.map((r, i) => '<button type="button" class="ai-rcard" data-ai-ls="' + esc(r.id) + '"><span class="ai-ric">' + esc(r.icon || "📘") + '</span><b>' + (i + 1) + '. ' + esc(r.name) + '</b><small>' +
          (KIND_ICON[r.kind] || "") + " " + esc(r.kind) + " ・ " + LVN[r.dv].icon + " " + esc(LVN[r.dv].name) + '</small></button>').join("") + '</div>' +
        '<p class="ai-note">' + esc(D.note) + '</p>';
    }else if(lsStep >= R.steps.length){
      h += '<p class="ai-rhead">' + esc(R.icon || "📘") + " " + esc(R.name) + '</p>' +
        '<div class="ai-rstep done"><p class="ai-rt-t">🎉 よく がんばったね!</p>' +
        '<p class="ai-ex ai-skb"><b>🏁 できたら</b>' + esc(R.goal) + '</p>' +
        (R.soudan ? '<p class="ai-ex ai-outb"><b>🩺 相談しよう</b>' + esc(R.soudan) + '</p>' : "") +
        '<p class="ai-small ai-muted">うまく いかない 日は、もっと かんたんな 段に もどれば 大丈夫。きょう できた ことを ほめて 終わろう。</p></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-lstep="0">もう一度 はじめから</button><button type="button" class="ai-btn ai-wide" data-ai-ls="">レッスンの 一覧へ</button>';
    }else{
      const S = R.steps[lsStep];
      h += '<p class="ai-rhead">' + esc(R.icon || "📘") + " " + esc(R.name) + ' <small>' + (KIND_ICON[R.kind] || "") + " " + esc(R.kind) + " ・ " + LVN[R.dv].icon + " " + esc(LVN[R.dv].name) + '</small></p>' +
        (lsStep === 0 ? '<p class="ai-small">' + esc(R.lead) + '</p>' + (R.prep ? '<p class="ai-ex"><b>🎒 用意する もの</b>' + esc(R.prep) + '</p>' : "") : "") +
        '<div class="ai-rdots">' + R.steps.map((_, i) => '<i class="' + (i < lsStep ? "on" : i === lsStep ? "now" : "") + '"></i>').join("") + '</div>' +
        '<div class="ai-rstep"><p class="ai-rt-t">' + "①②③④⑤⑥⑦"[lsStep] + " " + esc(S.title) + '</p>' +
        '<p class="ai-ex"><b>🖐 すること</b>' + S.dorb + '</p>' +
        '<p class="ai-ex ai-kmb"><b>💭 犬は いま</b>' + S.kimochirb + '</p>' +
        '<p class="ai-ex ai-outb"><b>⚠️ やらない こと</b>' + S.ngrb + '</p></div>' +
        '<div class="ai-rnav"><button type="button" class="ai-btn" data-ai-lstep="' + (lsStep - 1) + '"' + (lsStep ? "" : " disabled") + '>← まえ</button>' +
        '<button type="button" class="ai-btn ai-go" data-ai-lstep="' + (lsStep + 1) + '">' + (lsStep + 1 < R.steps.length ? "つぎの 手順 →" : "しめくくり →") + '</button></div>' +
        '<button type="button" class="ai-btn ai-wide" data-ai-ls="">レッスンの 一覧へ</button>';
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-ls");
    sh.scrollTop = 0;
  }

  /* ── 📅 きょうの かんさつ(30日。日付で 決まる。「できた!」を おすと その日に 印 → つづけて できたら 🔥)──
     tools/inu/observe.json。きろくは 人ごとに flick-inu-kansatsu[-p<id>](日の 通し番号の 配列。土台の dayIndex / streakOf を 使う)
     ⭐ 犬が いない 子むけ(nodog)が 半分。切れても 責めない */
  const OB = D.observe || [];
  function observeOf(day){ return OB.length ? OB[((day % OB.length) + OB.length) % OB.length] : null; }
  function obDays(){ try{ const a = JSON.parse(recGet(pkey("flick-inu-kansatsu")) || "[]"); return new Set(Array.isArray(a) ? a : []); }catch(e){ return new Set(); } }
  function observeDone(){ return typeof dayIndex === "function" && obDays().has(dayIndex(Date.now())); }
  function markObserve(){ const s = obDays(); s.add(dayIndex(Date.now())); recSet(pkey("flick-inu-kansatsu"), JSON.stringify([...s].sort((a, b) => a - b))); }
  function openObserve(){ sheet("ai-ob"); drawObserve(); }
  function drawObserve(){
    const sh = document.getElementById("ai-ob"), today = dayIndex(Date.now()), P = observeOf(today), done = observeDone();
    const st = typeof streakOf === "function" ? streakOf(obDays()) : { days:0, best:0 };
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📅 きょうの かんさつ</h2>' +
      '<p class="ai-qlead">犬の 気持ちが わかる 人は、毎日 少しずつ 犬を よく 見て いるよ。1日 1つ、3分の かんさつ。</p>';
    if(P) h += '<div class="ai-prcard' + (done ? " done" : "") + '"><p class="ai-prpw">🔍 きょうの かんさつ' + (P.kind ? ": " + esc(P.kind) : "") + (P.nodog ? ' <span class="ai-tag new">🐾 犬が いなくても できる</span>' : "") + '</p><p class="ai-prtx">' + esc(P.text) + '</p>' +
      (done ? '<p class="ai-prok">✅ きょうは できたね!</p>' : '<button type="button" class="ai-btn ai-wide ai-go" data-ai-obdone="1">✅ できた!</button>') + '</div>';
    h += '<p class="ai-prst">' + (st.days ? '🔥 つづけて <b>' + st.days + '</b>日' : 'きょう できたら 1日目') + (st.best > 1 ? '<small>いちばん ながく つづいたのは ' + st.best + '日</small>' : "") + '</p>';
    h += '<details class="ai-diag"><summary class="ai-dh">🗓 30日ぶんの メニューを 見る <small>あしたは 何かな?</small></summary><ol class="ai-prall">' +
      Array.from({ length:30 }, (_, i) => { const x = observeOf(today + i); return x ? '<li' + (i === 0 ? ' class="now"' : "") + '>' + (i === 0 ? "きょう " : i === 1 ? "あした " : "") + (x.nodog ? "🐾 " : "🐶 ") + esc(x.text) + '</li>' : ""; }).join("") + '</ol></details>' +
      '<p class="ai-note">かんさつは ゲームの 外で やろうね。知らない 犬には さわらず、はなれた ところから 見よう。🐾 は 犬が いなくても できる かんさつ(散歩中の 犬・動画・図鑑)だよ。</p>';
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-ob");
  }

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-say],[data-ai-lt],[data-ai-lans],[data-ai-ls],[data-ai-lstep],[data-ai-obdone],.ai-node");
    if(!t) return;
    if(t.dataset.aiSay){ const q = BY.get(t.dataset.aiSay); if(q) enSay(q.ei); return; }
    if(t.dataset.aiTerm) return detail(t.dataset.aiTerm);
    if(t.dataset.aiLt !== undefined){ ltCur = t.dataset.aiLt || null; ltPick = null; drawLetter(); const sh = document.getElementById("ai-lt"); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiLans !== undefined){ if(ltPick !== null) return; ltPick = +t.dataset.aiLans; const L = LTBY[ltCur]; if(L) markLetter(L.id, true); drawLetter(); home(mode); return; }
    if(t.dataset.aiLs !== undefined){ lsCur = t.dataset.aiLs || null; lsStep = 0; return drawLesson(); }
    if(t.dataset.aiLstep !== undefined){ lsStep = Math.max(0, +t.dataset.aiLstep); return drawLesson(); }
    if(t.dataset.aiObdone){ markObserve(); drawObserve(); home(mode); return; }
    if(t.dataset.aiBack){ trail.pop(); const id = trail[trail.length - 1]; if(id){ trail.pop(); detail(id); } return; }
    if(t.dataset.aiFav){ toggleFav(t.dataset.aiFav); trail.pop(); detail(t.dataset.aiFav); if(document.getElementById("ai-zk") && !document.getElementById("ai-zk").classList.contains("hidden")) drawZukan(); home(mode); return; }
    if(t.dataset.aiMore){ zf.shown += 180; return drawZukan(); }
    if(t.dataset.aiAns) return answerQuiz(+t.dataset.aiAns);
    if(t.dataset.aiQstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startQuiz(); }  // 登録なしの 体験が おわったら クイズも 止める(2026-09-30)
    if(t.dataset.aiQnext){ quiz.i++; quiz.picked = null; const sh = document.getElementById("ai-qz"); drawQuiz(); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiOpen){
      const o = t.dataset.aiOpen;
      if(o === "quiz" && typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; }  // 図鑑・お気に入り・手紙・レッスンは 読むだけなので そのまま
      if(o === "zukan") return openZukan({});
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
      if(o === "letter") return openLetter();
      if(o === "lesson") return openLesson();
      if(o === "observe") return openObserve();
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

  /* ── 見た目(この ページだけ。夕やけの 公園の ような あたたかい 色。明るく、こわく しない) ── */
  const css = `
.map-card{display:none}
.ai-panel{background:linear-gradient(160deg,#fff4e6 0%,#fff9db 55%,#e6fcf5 100%);border:1px solid #ffd8a8;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#d9480f;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#e8590c,#f59f00,#12b886);border-radius:99px}
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
.ai-dtabs button.on{background:#e8590c;border-color:#e8590c;color:#fff}
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
.ai-learn .ai-ko{color:#c2255c;font-weight:700}.ai-kob b{background:#c2255c!important}.ai-skb b{background:#e8590c!important}.ai-btb b{background:#e67700!important}.ai-outb b{background:#868e96!important}
.ai-hi{background:#fff4e6;border-color:#ffc078}
.ai-kmb b{background:#f08c00!important}.ai-kgb b{background:#1c7ed6!important}.ai-kg-iitsutae b{background:#868e96!important}.ai-kg-furui b{background:#ae3ec9!important}.ai-kg-kenkyuchu b{background:#0ca678!important}
.ai-brb b{background:#d6336c!important}.ai-dob b{background:#2f9e44!important}
.ai-brd{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.ai-brd span{font-size:12px;font-weight:800;background:#fff0f6;border:1px solid #fcc2d7;color:#a61e4d;border-radius:99px;padding:2px 9px}
.ai-one{margin-top:10px}
.ai-rcard.ok{background:#ebfbee;border-color:#8ce99a}
.ai-letter{background:#fff9db;border:1.5px dashed #fcc419;border-radius:16px;padding:10px 12px;margin:6px 0}.ai-lt-sign{margin:0;font-size:15px;line-height:1.9;font-weight:700;color:#5c3d00}
.ai-bubble{display:flex;gap:10px;align-items:flex-start;margin:10px 0}.ai-bubble span{font-size:38px;line-height:1}.ai-bubble p{position:relative;margin:4px 0 0;background:#fff;border:2px solid #ffc078;border-radius:16px;padding:8px 12px;font-size:16px;font-weight:800;line-height:1.7;color:#7a3500}
.ai-bubble p::before{content:"";position:absolute;left:-10px;top:12px;border:8px solid transparent;border-right-color:#ffc078;border-left:0}
.ai-ladder{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:4px}.ai-ladder li{display:flex;gap:8px;align-items:center;font-size:13px;font-weight:800;padding:6px 10px;border-radius:12px;background:hsl(calc(45 - var(--k) * 8) 100% calc(94% - var(--k) * 3%));color:#5c3d00}.ai-ladder span{font-size:18px}
.ai-consent{background:#fff9db;border:1px solid #ffe066;border-radius:12px;padding:6px 10px;font-size:13px;font-weight:700;color:#7a5b00;margin:8px 0}
.ai-rlist{display:grid;gap:8px}.ai-rcard{display:grid;grid-template-columns:44px 1fr;align-items:center;gap:2px 10px;text-align:left;padding:10px;border-radius:14px;border:1.5px solid #ffd8a8;background:#f8f6ff;color:#1e1b4b;font:inherit;cursor:pointer}
.ai-ric{grid-row:span 2;font-size:28px;text-align:center}.ai-rcard b{font-size:15px}.ai-rcard small{color:#64748b;font-size:12px}
.ai-rhead{font-weight:900;font-size:17px;margin:4px 0 6px}.ai-rhead small{display:block;font-size:12px;color:#64748b;font-weight:700}
.ai-rdots{display:flex;gap:6px;justify-content:center;margin:8px 0}.ai-rdots i{width:10px;height:10px;border-radius:99px;background:#e2e8f0}.ai-rdots i.on{background:#ffa94d}.ai-rdots i.now{background:#e8590c;transform:scale(1.25)}
.ai-rstep{background:#fff;border:1.5px solid #ffd8a8;border-radius:16px;padding:10px 12px;animation:aiIn .3s ease-out}.ai-rt-t{font-weight:900;font-size:16px;margin:0 0 6px;color:#c2410c}
.ai-say-b{background:#f3f0ff;border-radius:12px;padding:8px 10px;font-size:15px;line-height:1.8;font-weight:700;margin:6px 0}
.ai-rnav{display:grid;grid-template-columns:1fr 2fr;gap:8px;margin-top:10px}.ai-rnav .ai-btn:disabled{opacity:.4}
.ai-prcard{background:#fff;border:2px solid #ffa94d;border-radius:18px;padding:12px;text-align:center}.ai-prcard.done{border-color:#69db7c;background:#ebfbee}
.ai-prpw{margin:0;font-weight:800;color:#c2410c}.ai-prtx{font-size:18px;font-weight:900;line-height:1.7;margin:8px 0}.ai-prok{font-weight:900;color:#2b8a3e;margin:8px 0 0}
.ai-prst{text-align:center;font-weight:800;margin:12px 0}.ai-prst b{font-size:26px;color:#e8590c}.ai-prst small{display:block;color:#64748b;font-size:12px}
.ai-prall{margin:6px 0 0;padding-left:1.6em;font-size:13px;line-height:1.8}.ai-prall li.now{font-weight:900;color:#c2410c}
.ai-nenpyo{list-style:none;margin:6px 0 0;padding:0 0 0 10px;border-left:3px solid #ffa94d}.ai-nenpyo li{margin:0 0 8px;font-size:13px;line-height:1.6}.ai-nenpyo b{display:block;color:#c2410c}
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
.ai-zsum{text-align:center;margin:4px 0 8px}.ai-zsum b{font-size:22px;color:#d9480f}
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
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#e8590c}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない

  return { kind:"inuterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
