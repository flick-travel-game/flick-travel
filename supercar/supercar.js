/* フリックスーパーカー: スーパーカー・ハイパーカーの ことばを、フリックで 打って おぼえる。(けいくん 2026-10-21「すべてのスーパーカー、ハイパーカーを 知っている 専門家レベルになるために必要な知識をフリック形式の問題にしてください」)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「スーパーカーの 旅」を 足す ファイル。supercar/ の ページだけが 読む ─
   ことばは tools/supercar/meta.json + tools/supercar/terms-*.json → tools/supercar/terms_js.py が data/supercar.json と supercar/terms.js(SUPERCAR_TERMS)に する。
   **ことばを 足す・直すのは tools/supercar/terms-<旅>.json だけ**
   ・もとは フリックキャビンアテンダント(cabin/cabin.js)を 写して 作った。国の 札は フリックワールドサッカー(soccer/soccer.js)から。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 9つ(国ごとの メーカーが 柱): 🏎 スーパーカーのきほん / ⚙️ しくみと技術 / 🇮🇹 イタリア / 🇩🇪 ドイツ / 🇬🇧 イギリス / 🌍 世界 / 🇯🇵 日本 / 🚀 ハイパーカーと記録 / 🏆 伝説の名車と人。+ 🏆 マスター
   ・レベルは 入門 → 中級 → 上級。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・こたえると ことばの 説明・つながる ことば が 出る。国・メーカー(字だけ。ロゴは 出さない)・発表した 年の 札。本当の つづりは 🔊 で 聞ける。しくみ図は コードで 描く
   ・🧩 4択クイズ(説明 ↔ ことば・この 車を 作った メーカーは?・この 国の メーカーは?)・📷 写真クイズ(写真を 見て 車名を 当てる)・🧮 計算問題(馬力・速さ・パワーウェイトレシオ・排気量・回転数・電気の 車。数字は 毎回 かわる)
   ⚠️ ことばを おぼえる ゲーム。値段・事故・公道の スピードは 入れない。最高速や 加速は テストコースや サーキットの 話 */
const SUPERCAR = (() => {
  const D = SUPERCAR_TERMS;
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に hckihon … hcmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { kihon:"hckihon", gijutsu:"hcgijutsu", italia:"hcitalia", doitsu:"hcdoitsu", igirisu:"hcigirisu", sekai:"hcsekai", nihon:"hcnihon", hyper:"hchyper", densetsu:"hcdensetsu" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"supercarterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
    levels.hcmas = lv; pools.hcmas = ALL; colors.hcmas = "#e0202e";
    maps.hcmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"ことば図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　9つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  const MODES_ALL = ["hckihon", "hcgijutsu", "hcitalia", "hcdoitsu", "hcigirisu", "hcsekai", "hcnihon", "hchyper", "hcdensetsu", "hcmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-supercar[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-supercar-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-supercar");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-supercar"), JSON.stringify(v)); memo = { k:pkey("flick-supercar"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-supercar-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-supercar-fav"), JSON.stringify(a)); return i < 0; }
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
  const BG = {};  // うしろに うすく 描く 形は 使わない(⚠️ 実在の 車の 形を 図で 写さない。図は しくみだけ)
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

  /* ── 国・メーカー・年の 札(サッカーの 国旗の 札を 写した。メーカーは 字だけ = ロゴ・エンブレムは 出さない) ── */
  const CO_ICON = { "イタリア":"🇮🇹", "ドイツ":"🇩🇪", "イギリス":"🇬🇧", "フランス":"🇫🇷", "スウェーデン":"🇸🇪", "クロアチア":"🇭🇷", "オランダ":"🇳🇱", "デンマーク":"🇩🇰",
    "アメリカ":"🇺🇸", "日本":"🇯🇵", "オーストリア":"🇦🇹", "スイス":"🇨🇭", "スペイン":"🇪🇸", "ベルギー":"🇧🇪", "モナコ":"🇲🇨", "ニュージーランド":"🇳🇿", "アルゼンチン":"🇦🇷", "チェコ":"🇨🇿", "メキシコ":"🇲🇽", "ペルー":"🇵🇪", "オーストラリア":"🇦🇺", "中国":"🇨🇳", "韓国":"🇰🇷", "レバノン":"🇱🇧", "南アフリカ":"🇿🇦", "モロッコ":"🇲🇦", "世界":"🌍" };
  function countryTag(q){ return q.co ? '<span class="ai-tag ws-co">' + q.co.split("・").map(a => (CO_ICON[a] || "🌍") + " " + esc(a)).join("・") + '</span>' : ""; }
  function makerTag(q){ return (q.mk ? '<span class="ai-tag sc-mk">🏭 ' + esc(q.mk) + '</span>' : "") + (q.y ? '<span class="ai-tag sc-y">📅 ' + q.y + '年 発表</span>' : ""); }
  /* 写真(tools/fetch_game_photos.py が 取った もの。key は「supercar.<ことばid>」)。📷 写真クイズで 使う */
  const PH = typeof PHOTOS === "object" && PHOTOS ? PHOTOS : {};
  const photoOfTerm = q => PH["supercar." + q.art] || null;
  const assets = () => typeof GAME === "object" && GAME.assets ? GAME.assets : "";

  /* ── 🔊 本当の つづりで 聞く(Countach / Chiron など。おすと 英語の 声で 読む。土台の 日本語の よみあげ(jaSay)は 答えた あとに ふりがなを 読む まま) ── */
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
    }else h += '<div class="ai-learn ai-hint">こたえると、その ことばの 意味と、つながる ことばが 出るよ</div>';
    const tag = pre && !pre.has(q.art) ? '<span class="ai-tag new">🆕 はじめまして</span>' : "";
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot">' + esc(q.n) + '</p>' + tag + '<small class="ai-cat">' + esc(q.c) + '</small>' + countryTag(q) + makerTag(q) +
         (q.al ? '<small class="ai-alt">読みかたは どれでも OK: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</small>' : "") + '</div></div>';
    return h;
  }
  /* ── 結果・図鑑の くわしい 情報: たとえば / つながる ことば / しくみ図の 📍 ── */
  function info(q, inZukan){
    const tag = inZukan ? "" : last && last.fresh.includes(q.art) ? '<span class="ai-tag new">🆕 はじめて 出会った</span>' : "";
    const d = discovered(), p = nodeOf(q);
    let h = '<div class="ai-info">' + tag;
    if(q.co || q.mk || q.y) h += '<p class="ai-small">' + countryTag(q) + makerTag(q) + '</p>';
    if(q.ei) h += '<p class="ai-small ai-ei">🔤 つづり: <b lang="en">' + esc(q.ei) + '</b>' + (EN_TTS ? ' <button type="button" class="ai-say" data-ai-say="' + esc(q.art) + '" aria-label="つづりの 音を 聞く">🔊 聞く</button>' : "") + '</p>';
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
      '<button type="button" class="ai-btn" data-ai-open="photo">📷 写真クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="calc">🧮 計算問題</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🗺 しくみ図を ひらく <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></details>' +
      (D.source ? '<details class="ai-diag ai-saiyo"><summary class="ai-dh">📏 数字の 出どころ を ひらく <small>馬力・年などを 確かめた ところと 日</small></summary><p class="ai-small">' + esc(D.source).replace(/\n/g, "<br>") + '</p></details>' : "") +
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
    if(m === "hcmas") return { name:"マスター" + (i + 1), sub:"9つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・10語", short:"Lv." + (i + 1) };
  }

  /* ── ことば図鑑(検索・旅・分類・むずかしさ・お気に入りで しぼれる) ── */
  let zf = { q:"", j:"", c:"", dv:"", co:"", mk:"", fav:false, shown:90 };
  const normQ = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/\s/g, "");
  function sheet(id){
    let sh = document.getElementById(id);
    if(!sh){ sh = document.createElement("div"); sh.id = id; sh.className = "prof-sheet ai-sheet"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeSheet(id); }); }
    sh.classList.remove("hidden"); document.body.classList.add("ai-lock"); return sh;
  }
  function closeSheet(id){ const sh = document.getElementById(id); if(sh) sh.classList.add("hidden"); if(!document.querySelector(".ai-sheet:not(.hidden)")) document.body.classList.remove("ai-lock"); }
  function openZukan(pre2){ if(pre2) Object.assign(zf, { q:"", j:"", c:"", dv:"", co:"", mk:"", fav:false }, pre2); zf.shown = 90; sheet("ai-zk"); drawZukan(); }
  function drawZukan(){
    const sh = document.getElementById("ai-zk"), d = discovered(), fv = new Set(favs()), qq = normQ(zf.q);
    const list = ALL.filter(q => (!zf.j || q.j === zf.j) && (!zf.c || q.c === zf.c) && (!zf.dv || q.dv === +zf.dv) && (!zf.fav || fv.has(q.art)) &&
      (!zf.co || (q.co || "").split("・").includes(zf.co)) && (!zf.mk || q.mk === zf.mk) &&
      (!qq || [q.n, q.r].concat(q.al || [], [q.ds]).some(x => normQ(x).includes(qq))));
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    const cats = [...new Set(ALL.filter(q => !zf.j || q.j === zf.j).map(q => q.c))];
    const cos = Object.keys(CO_ICON).filter(a => ALL.some(q => (q.co || "").split("・").includes(a)));
    const mks = [...new Set(ALL.filter(q => q.mk && (!zf.co || (q.co || "").split("・").includes(zf.co))).map(q => q.mk))].sort((a, b) => a.localeCompare(b, "ja"));
    const scroll = sh.scrollTop, focused = document.activeElement && document.activeElement.id === "ai-zq";
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 ことば図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: カウンタック)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-zf sc-zf2"><select id="ai-zco">' + opt("", "🌍 国", zf.co) + cos.map(a => opt(a, (CO_ICON[a] || "🌍") + " " + a, zf.co)).join("") + '</select>' +
      '<select id="ai-zmk">' + opt("", "🏭 メーカー", zf.mk) + mks.map(a => opt(a, a, zf.mk)).join("") + '</select></div>' +
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
    sh.querySelector("#ai-zco").onchange = e => { zf.co = e.target.value; zf.mk = ""; zf.shown = 90; drawZukan(); };
    sh.querySelector("#ai-zmk").onchange = e => { zf.mk = e.target.value; zf.shown = 90; drawZukan(); };
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

  /* ── 4択クイズ(けいくん 2026-09-26「すべてお願いします」)。「えらぶ 問題」の 練習 ──
     ⭐ スーパーカーは 2つの 形を 足した(はじめかたの「いちばん 合う」): ③ この 車を 作った メーカーは?(車の 名前から メーカー名を 外して 出す) ④ ◯◯の メーカーは どれ?(国 → メーカー)
     ・問題は この ゲームの 説明文から 作る(過去問・問題集は 使わない)。2つの 形を まぜる:
       ① 説明 → どの ことば?  ② ことば → 正しい 説明は どれ?
     ・まちがいの 3つは 同じ 旅・同じ 分類から えらぶ(にた もの どうしで 考える 練習)。答えの 名前は 説明の 中で ◯◯ に かくす
     ・はんい: 出会った ことば / むずかしさごと(入門・採用めやす・訓練めやす)/ ぜんぶ。旅でも しぼれる
     ・出会った ことばを まちがえたら 図鑑の「まちがい」の 回数に 入る */
  let quiz = null, qset = { r:"seen", j:"" };
  const QN = 10;
  const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const k = Math.floor(Math.random() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; } return a; };
  const hide = (text, q) => { let t = String(text); for(const w of [q.n].concat(q.n.includes("(") ? [q.n.replace(/\(.*$/, "")] : [], [carName(q)])) if(w.length >= 2) t = t.split(w).join("◯◯"); return t; };  // 車は メーカー名を 外した 名前も かくす
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
  /* メーカーの 問題: 車(field 車・maker あり)は「作った メーカーは?」、メーカー(field メーカー・国 1つ)は「◯◯の メーカーは?」。どちらも 3回に 1回くらい */
  const MAKERS = [...new Set(ALL.filter(q => q.mk).map(q => q.mk))];
  const MAKER_TERM = new Map(ALL.filter(q => q.f === "メーカー" && q.mk).map(q => [q.mk, q]));
  const MAKER_CO = new Map(); for(const q of ALL) if(q.mk && q.co && !MAKER_CO.has(q.mk)) MAKER_CO.set(q.mk, q.co);
  const carName = q => { let n = q.n; if(q.mk){ for(const w of [q.mk + "・", q.mk + " ", q.mk]) if(n.startsWith(w) && n.length > w.length){ n = n.slice(w.length); break; } } return n.trim(); };
  function quizItem(q, i){
    if(i % 3 === 2 && q.f === "車" && q.mk && MAKERS.length >= 4){
      const others = shuffle(MAKERS.filter(m => m !== q.mk)).slice(0, 3);
      return { q, type:2, ch:shuffle([q.mk].concat(others)) };
    }
    if(i % 3 === 2 && q.f === "メーカー" && q.mk && q.co && !q.co.includes("・") && q.co !== "世界"){
      const others = shuffle(MAKERS.filter(m => { const c = MAKER_CO.get(m) || ""; return m !== q.mk && c && !c.split("・").includes(q.co); })).slice(0, 3);
      if(others.length === 3) return { q, type:3, ch:shuffle([q.mk].concat(others)) };
    }
    return { q, type:i % 2, ch:shuffle([q].concat(wrongs(q, 3))) };
  }
  function openQuiz(){ quiz = null; sheet("ai-qz"); drawQuiz(); }
  function startQuiz(){
    const pool = quizPool();
    if(pool.length < 4){ drawQuiz("もんだいに できる ことばが 足りないよ(" + pool.length + "語)。はんいを 広げてね"); return; }
    quiz = { list:shuffle(pool).slice(0, QN).map((q, i) => quizItem(q, i)), i:0, ok:0, picked:null, miss:[] };
    drawQuiz();
  }
  function drawQuiz(msg){
    const sh = document.getElementById("ai-qz"), Q = quiz;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>🧩 4択クイズ</h2>';
    if(!Q){
      const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
      const n = quizPool().length;
      h += '<p class="ai-qlead">4つの 中から 1つ えらんでね。説明から ことばを 当てる・この 車を 作った メーカーを 当てる・国の メーカーを 当てる 問題が まざるよ。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset"><select id="ai-qr">' + opt("seen", "出会った ことば", qset.r) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, qset.r)).join("") + opt("all", "ぜんぶ", qset.r) + '</select>' +
        '<select id="ai-qj">' + opt("", "🧭 ぜんぶの 旅", qset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, qset.j)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">この はんいの ことば: ' + n + '語</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">はじめる</button>' +
        '<p class="ai-note">問題は この ゲームの 説明から 作っています。実在の メーカーとは 関係ありません。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた ことば(おすと 説明が 読めるよ)</p><div class="ai-chips">' + Q.miss.map(q => chip(q)).join("") + '</div>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qstart="1">もう一度(同じ はんい)</button><button type="button" class="ai-btn ai-wide" data-ai-open="quiz">はんいを えらびなおす</button>';
    }else{
      const it = Q.list[Q.i], done = Q.picked !== null;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '　<span>' + it.q.jr.icon + " " + esc(it.q.jr.name) + " ・ " + LVN[it.q.dv].icon + " " + esc(LVN[it.q.dv].name) + '</span></p>';
      const right = it.type >= 2 ? it.q.mk : it.q;
      h += it.type === 0 ? '<p class="ai-qq">「' + esc(hide(it.q.ds, it.q)) + '」<br>これは どの ことば？</p>'
        : it.type === 1 ? '<p class="ai-qq">「<b>' + esc(it.q.n) + '</b>」の 説明として 正しいのは どれ？</p>'
        : it.type === 2 ? '<p class="ai-qq">' + it.q.e + ' 「<b>' + esc(carName(it.q)) + '</b>」を 作った メーカーは どれ？</p>'
        : '<p class="ai-qq">' + (CO_ICON[it.q.co] || "🌍") + ' <b>' + esc(it.q.co) + '</b>の メーカーは どれ？</p>';
      h += '<div class="ai-qch' + (it.type === 1 ? " long" : "") + '">' + it.ch.map((x, k) => {
        const cls = done ? (x === right ? " ok" : k === Q.picked ? " ng" : "") : "";
        const label = it.type >= 2 ? x + (it.type === 3 && MAKER_CO.get(x) && done ? "(" + MAKER_CO.get(x) + ")" : "") : it.type === 0 ? x.n : hide(x.ds, x);
        return '<button type="button" class="ai-btn' + cls + '" data-ai-ans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(label) + '</button>';
      }).join("") + '</div>';
      if(done && it.type >= 2){
        const ok = it.ch[Q.picked] === right;
        h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は " + "ABCD"[it.ch.indexOf(right)] + "「" + esc(right) + "」") + '</b>' +
             '<p>' + esc(it.q.n) + ' … ' + esc(it.q.ds) + '</p></div>' +
             '<button type="button" class="ai-btn ai-wide ai-go" data-ai-qnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
      }else if(done){
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
    const ok = it.ch[k] === (it.type >= 2 ? it.q.mk : it.q);
    if(ok) Q.ok++;
    else {
      Q.miss.push(it.q);
      const L = log(), e = L[it.q.art];  // 出会った ことばだけ 図鑑の まちがいの 回数に 足す(まだの ことばは 図鑑に 出さない)
      if(e){ L[it.q.art] = [e[0], e[1] + 1, 1, e[3], Date.now(), e[5]]; save(L); }
    }
    drawQuiz();
  }

  /* ── 🧮 計算問題(フリックスーパーカー。はじめかたの 表「馬力の 単位・速さの 単位・パワーウェイトレシオ・排気量・回転数・電気の 車」)──
     ・数字を 毎回 かえて 出す(**問題も 答えも プログラムが 作る**)。⚠️ **実在の 車の 本当の 数字で 問題を 作らない**(出どころで ちがうので 答えが ぶれる)。数字は きりの よい 練習用
     ・まちがいの 3つは「よく ある まちがい」から 作る(かけると 割るを 逆に する・単位を わすれる など)
     ・答えた あとに 式と 途中の 計算を 出す。⚠️ 速さの 問題は テストコース・サーキットの 話に する(公道の 話に しない)
     ・1つの 問題 = { g:なかま, lv:"入門"/"中級"/"上級", q:問題文, a:答え, d:小数の けた, u:単位, w:[まちがい…], ex:[とき方…], fmt:(なくてよい)表示の しかた } */
  const ri = (a, b, st) => { st = st || 1; return a + st * Math.floor(Math.random() * (Math.floor((b - a) / st) + 1)); };
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const nf = (x, d) => Number(x.toFixed(d)).toLocaleString("ja-JP", { maximumFractionDigits:d, minimumFractionDigits:0 });
  const CALC_G = [["uma", "⚡ 馬力の 単位"], ["hayasa", "🏁 速さの 単位"], ["pwr", "⚖️ パワーウェイトレシオ"], ["haiki", "🔧 排気量"], ["kaiten", "🌀 回転数"], ["ev", "🔋 電気の 車"]];
  const CALC = [
    /* ⚡ 馬力の 単位(1PS ≒ 0.735kW・1hp ≒ 0.746kW) */
    () => { const ps = ri(3, 10) * 100, a = ps * 0.735;
      return { g:"uma", lv:"入門", q:ps + "PS(馬力)は 何kW(キロワット)？(1PS ≒ 0.735kW と する)", a, d:0, u:"kW",
        w:[ps / 0.735, ps * 7.35, ps * 0.0735], ex:["PS → kW は 0.735 を かける", "= " + ps + " × 0.735 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " kW"] }; },
    () => { const kw = ri(2, 8) * 100, a = kw / 0.735;
      return { g:"uma", lv:"中級", q:"電気の モーターの 力が " + kw + "kW。PS(馬力)に すると およそ 何PS？(1PS ≒ 0.735kW と する)", a, d:0, u:"PS",
        w:[kw * 0.735, kw * 13.6, kw + 73.5], ex:["kW → PS は 0.735 で 割る", "= " + kw + " ÷ 0.735 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " PS", "⚠️ かけると 逆に なる"] }; },
    () => { const hp = ri(4, 10) * 100, a = hp * 0.746 / 0.735;
      return { g:"uma", lv:"上級", q:"アメリカや イギリスで 使う 馬力 hp で " + hp + "hp。日本の 馬力 PS に すると およそ 何PS？(1hp ≒ 0.746kW・1PS ≒ 0.735kW と する)", a, d:0, u:"PS",
        w:[hp * 0.735, hp * 0.746, hp * 0.735 / 0.746], ex:["hp → kW: " + hp + " × 0.746 = " + nf(hp * 0.746, 1) + " kW", "kW → PS: " + nf(hp * 0.746, 1) + " ÷ 0.735 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " PS", "⭐ 1hp は 1PS より 少しだけ 大きい"] }; },
    /* 🏁 速さの 単位(時速 → 秒速・km/h ↔ mph。1マイル ≒ 1.609km) */
    () => { const kmh = ri(2, 10) * 36, a = kmh / 3.6;
      return { g:"hayasa", lv:"入門", q:"テストコースで 時速 " + kmh + "km。1秒に 何m 進む？(秒速)", a, d:0, u:"m",
        w:[kmh * 3.6, kmh / 36, kmh / 60], ex:["時速 → 秒速 は 3.6 で 割る(1時間 = 3,600秒・1km = 1,000m)", "= " + kmh + " ÷ 3.6 = " + nf(a, 0) + " m"] }; },
    () => { const mph = ri(5, 25) * 10, a = mph * 1.609;
      return { g:"hayasa", lv:"入門", q:"イギリスの サーキットの 看板は マイル毎時(mph)。時速 " + mph + "マイルは 時速 何km？(1マイル ≒ 1.609km と する)", a, d:0, u:"km",
        w:[mph / 1.609, mph * 16.09, mph + 1.609], ex:["マイル → km は 1.609 を かける", "= " + mph + " × 1.609 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " km"] }; },
    () => { const kmh = ri(10, 40) * 10, a = kmh / 1.609;
      return { g:"hayasa", lv:"中級", q:"テストコースで 時速 " + kmh + "km。マイル毎時(mph)に すると およそ 時速 何マイル？(1マイル ≒ 1.609km と する)", a, d:0, u:"マイル",
        w:[kmh * 1.609, kmh / 16.09, kmh - 16.09], ex:["km → マイル は 1.609 で 割る", "= " + kmh + " ÷ 1.609 = " + nf(a, 1) + " ≒ " + nf(a, 0) + " マイル"] }; },
    () => { const lap = pk([3.6, 4.5, 5.4, 5.8]), v = pk([120, 144, 180]), a = lap / v * 3600;
      return { g:"hayasa", lv:"上級", q:"1周 " + lap + "km の サーキットを 平均 時速 " + v + "km で 1周。かかる 時間は 何秒？", a, d:0, u:"秒",
        w:[lap / v * 60, v / lap * 60, lap * v], ex:["時間 = きょり ÷ 速さ = " + lap + " ÷ " + v + " = " + nf(lap / v, 4) + " 時間", "× 3,600 で 秒に = " + nf(a, 0) + " 秒(" + Math.floor(a / 60) + "分" + Math.round(a % 60) + "秒)"] }; },
    /* ⚖️ パワーウェイトレシオ(重さ ÷ 馬力。小さいほど 軽快) */
    () => { const kg = ri(12, 18) * 100, ps = pk([300, 400, 500, 600, 800]), a = kg / ps;
      return { g:"pwr", lv:"中級", q:"重さ " + nf(kg, 0) + "kg・" + ps + "PS の 車。1馬力 あたり 何kg？(パワーウェイトレシオ)", a, d:2, u:"kg",
        w:[ps / kg, kg / ps * 10, kg / ps / 10], ex:["パワーウェイトレシオ = 重さ ÷ 馬力", "= " + nf(kg, 0) + " ÷ " + ps + " = " + nf(a, 2) + " kg", "⭐ 小さいほど 1馬力で うごかす 重さが 少ない = 軽快"] }; },
    () => { const kg = ri(10, 16) * 100, r = pk([2, 2.5, 4, 5]), a = kg / r;
      return { g:"pwr", lv:"上級", q:"重さ " + nf(kg, 0) + "kg の 車で、パワーウェイトレシオを 1馬力 あたり " + r + "kg に したい。何PS いる？", a, d:0, u:"PS",
        w:[kg * r, kg / r / 10, kg / r * 2], ex:["馬力 = 重さ ÷ パワーウェイトレシオ", "= " + nf(kg, 0) + " ÷ " + r + " = " + nf(a, 0) + " PS"] }; },
    () => { const kg = ri(12, 20) * 100, ps = pk([400, 500, 600, 800, 1000]), a = ps / (kg / 1000);
      return { g:"pwr", lv:"中級", q:"重さ " + nf(kg, 0) + "kg・" + ps + "PS の 車。重さ 1トン(1,000kg)あたり 何PS？", a, d:0, u:"PS",
        w:[kg / ps, ps * kg / 1000, ps / kg], ex:[nf(kg, 0) + "kg = " + nf(kg / 1000, 1) + " トン", "= " + ps + " ÷ " + nf(kg / 1000, 1) + " = " + nf(a, 0) + " PS", "⭐ こちらは 大きいほど 軽快"] }; },
    /* 🔧 排気量(1気筒ぶん × 気筒の 数。1L = 1,000cc) */
    () => { const cc = pk([300, 400, 500, 600]), cyl = pk([4, 6, 8, 10, 12]), a = cc * cyl / 1000;
      return { g:"haiki", lv:"入門", q:"1気筒(シリンダー 1本)ぶんが " + cc + "cc の " + cyl + "気筒エンジン。ぜんぶで 何L？", a, d:1, u:"L",
        w:[cc * cyl / 100, (cc + cyl) / 100, cc / cyl], ex:["ぜんぶ = 1気筒ぶん × 気筒の 数 = " + cc + " × " + cyl + " = " + nf(cc * cyl, 0) + " cc", "1,000cc = 1L なので " + nf(a, 1) + " L"] }; },
    () => { const L = pk([3.0, 3.9, 4.0, 5.2, 6.5, 8.0]), a = L * 1000;
      return { g:"haiki", lv:"入門", q:"排気量 " + L.toFixed(1) + "L の エンジン。cc(シーシー)で いうと 何cc？", a, d:0, u:"cc",
        w:[L * 100, L * 10000, L * 1000 / 12], ex:["1L = 1,000cc", "= " + L.toFixed(1) + " × 1,000 = " + nf(a, 0) + " cc"] }; },
    () => { const p = pk([[4.0, 8], [6.0, 12], [6.5, 12], [8.0, 16], [5.2, 10], [3.9, 8]]), a = p[0] * 1000 / p[1];
      return { g:"haiki", lv:"中級", q:"排気量 " + p[0].toFixed(1) + "L の " + p[1] + "気筒エンジン。1気筒ぶんは 何cc？", a, d:0, u:"cc",
        w:[p[0] * 1000 * p[1], p[0] / p[1] * 100, p[0] * 100 / p[1]], ex:[p[0].toFixed(1) + "L = " + nf(p[0] * 1000, 0) + " cc", "1気筒ぶん = " + nf(p[0] * 1000, 0) + " ÷ " + p[1] + " = " + nf(a, 0) + " cc"] }; },
    /* 🌀 回転数(rpm = 1分間に 何回転) */
    () => { const rpm = ri(6, 10) * 1000 + pk([0, 500]), a = rpm / 60;
      return { g:"kaiten", lv:"中級", q:"エンジンが 毎分 " + nf(rpm, 0) + "回転(rpm)。1秒に 何回転？", a, d:1, u:"回転",
        w:[rpm * 60, rpm / 6, rpm / 600], ex:["1分 = 60秒 なので 60で 割る", "= " + nf(rpm, 0) + " ÷ 60 = " + nf(a, 1) + " 回転"] }; },
    () => { const rps = ri(100, 150, 10), a = rps * 60;
      return { g:"kaiten", lv:"上級", q:"エンジンが 1秒に " + rps + "回転。毎分 何回転(rpm)？", a, d:0, u:"rpm",
        w:[rps / 60, rps * 6, rps * 600], ex:["1分 = 60秒 なので 60を かける", "= " + rps + " × 60 = " + nf(a, 0) + " rpm"] }; },
    /* 🔋 電気の 車(電池の 量 kWh ÷ 充電の 力 kW = 時間) */
    () => { const kwh = pk([60, 80, 100, 120]), kw = pk([20, 40, 50]), a = kwh / kw;
      return { g:"ev", lv:"中級", q:"電池の 量が " + kwh + "kWh の 電気の 車。空から " + kw + "kW で 充電すると、いっぱいまで 何時間？(練習の ため 一定の 力で 入ると する)", a, d:1, u:"時間",
        w:[kwh * kw / 100, kw / kwh * 10, kwh / kw * 60], ex:["時間 = 電池の 量 ÷ 充電の 力", "= " + kwh + " ÷ " + kw + " = " + nf(a, 1) + " 時間"] }; },
    () => { const kwh = pk([80, 100, 120]), kw = pk([100, 150, 200]), a = kwh * 0.6 / kw * 60;
      return { g:"ev", lv:"上級", q:"電池の 量が " + kwh + "kWh。20% から 80% まで " + kw + "kW で 充電すると 何分？(練習の ため 一定の 力で 入ると する)", a, d:0, u:"分",
        w:[kwh / kw * 60, kwh * 0.8 / kw * 60, kwh * 0.6 / kw], ex:["入れる 量 = " + kwh + " × (80% − 20%) = " + nf(kwh * 0.6, 0) + " kWh", "時間 = " + nf(kwh * 0.6, 0) + " ÷ " + kw + " = " + nf(kwh * 0.6 / kw, 2) + " 時間", "× 60 = " + nf(a, 0) + " 分"] }; },
    () => { const kwh = pk([60, 80, 100]), e = pk([4, 5, 6]), a = kwh * e;
      return { g:"ev", lv:"入門", q:"電池の 量が " + kwh + "kWh。1kWh で " + e + "km 走れる 車は、いっぱいで 何km 走れる？", a, d:0, u:"km",
        w:[kwh / e, kwh + e, kwh * e * 10], ex:["きょり = 電池の 量 × 1kWh あたりの きょり", "= " + kwh + " × " + e + " = " + nf(a, 0) + " km"] }; },
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
      h += '<p class="ai-qlead">スーパーカーの 数字を 読む ための 計算(馬力の 単位・速さの 単位・パワーウェイトレシオ・排気量・回転数・電気の 車)だよ。数字は 毎回 かわるので、何回でも 新しい 問題に なるよ。答えた あとに とき方が 出るよ。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset" style="grid-template-columns:1fr"><select id="ai-cg"><option value="">🧮 ぜんぶの なかま</option>' +
        CALC_G.map(([v, l]) => '<option value="' + v + '"' + (cset.g === v ? " selected" : "") + '>' + esc(l) + '</option>').join("") + '</select></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">はじめる</button>' +
        '<p class="ai-note">ゲームの 練習問題です。数字は 練習用の きりの よい もので、実在の 車の 数字では ありません。速さの 問題は テストコースや サーキットの 話です。道路では 交通ルールを 守りましょう。</p>';
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

  /* ── 📷 写真クイズ(けいくん 2026-10-21「約1,000語+写真クイズあり」)。写真を 見て 車名を 当てる ──
     ・写真が ある 車(field 車)だけ 出す。まちがいの 3つは 同じ 旅 → 同じ 国 → ほかの 車 の 順(にた もの どうしで 見分ける 練習)
     ・答えの 名前は「メーカー名 + 車名」の まま(メーカーも 当てる)。写真の 下に 撮った 人と ライセンスを かならず 出す */
  let pquiz = null, pset = { j:"" };
  /* 写真クイズに 出さない 車: 型の ぜんぶを まとめた 名前(911 は 991 も 992 も 911)・同じ 写真を 使う 語。答えが 2つ ある 問題に なるため */
  const PHOTO_SKIP = new Set(["de-911", "jp-gtr", "jp-nismo", "gb-bondcar", "jp-r26b"]);
  const photoCars = () => ALL.filter(q => q.f === "車" && photoOfTerm(q) && !PHOTO_SKIP.has(q.art) && (!pset.j || q.j === pset.j));
  function pwrongs(q){
    const src = (photoOfTerm(q) || {}).src;
    const cars = ALL.filter(x => x !== q && x.f === "車" && x.n !== q.n && !PHOTO_SKIP.has(x.art) && (!photoOfTerm(x) || photoOfTerm(x).src !== src));  // 同じ 写真の 車は まちがいに しない
    const out = [];
    for(const g of [shuffle(cars.filter(x => x.j === q.j && x.mk === q.mk)), shuffle(cars.filter(x => x.j === q.j && x.mk !== q.mk)), shuffle(cars.filter(x => x.j !== q.j))])
      for(const x of g){ if(out.length >= 3) break; if(!out.some(y => y.n === x.n)) out.push(x); }
    return out;
  }
  function openPhoto(){ pquiz = null; sheet("ai-pq"); drawPhoto(); }
  function startPhoto(){
    const pool = photoCars();
    if(pool.length < 4){ drawPhoto("写真の ある 車が 足りないよ(" + pool.length + "台)。旅を 「ぜんぶ」に してね"); return; }
    pquiz = { list:shuffle(pool).slice(0, QN).map(q => ({ q, ch:shuffle([q].concat(pwrongs(q))) })), i:0, ok:0, picked:null, miss:[] };
    drawPhoto();
  }
  function drawPhoto(msg){
    const sh = document.getElementById("ai-pq"), Q = pquiz;
    let h = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📷 写真クイズ</h2>';
    if(!Q){
      const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
      h += '<p class="ai-qlead">写真を 見て、どの 車か 4つの 中から えらんでね。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset" style="grid-template-columns:1fr"><select id="ai-pj">' + opt("", "🧭 ぜんぶの 旅", pset.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, pset.j)).join("") + '</select></div>' +
        '<p class="ai-small ai-muted">写真の ある 車: ' + photoCars().length + '台</p>' + (msg ? '<p class="ai-empty">' + esc(msg) + '</p>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-pstart="1">はじめる</button>' +
        '<p class="ai-note">写真は Wikimedia Commons の ものです(撮った 人と ライセンスを 写真の 下に 出しています)。年式や 版で 形が ちがう ことが あります。実在の メーカーとは 関係ありません。</p>';
    }else if(Q.i >= Q.list.length){
      h += '<p class="ai-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p>' +
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた 車(おすと 説明が 読めるよ)</p><div class="ai-chips">' + Q.miss.map(q => chip(q)).join("") + '</div>' : "") +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-pstart="1">もう一度</button><button type="button" class="ai-btn ai-wide" data-ai-open="photo">旅を えらびなおす</button>';
    }else{
      const it = Q.list[Q.i], done = Q.picked !== null, ph = photoOfTerm(it.q), src = assets() + ph.src;
      h += '<p class="ai-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '</p>' +
        '<figure class="sc-ph"><img src="' + esc(src) + '" alt="この 車は どれ？" loading="eager"><figcaption>' + (typeof creditOf === "function" ? creditOf(ph) : esc(ph.author || "")) + '</figcaption></figure>' +
        '<p class="ai-qq">この 車は どれ？</p><div class="ai-qch">' + it.ch.map((x, k) => {
          const cls = done ? (x === it.q ? " ok" : k === Q.picked ? " ng" : "") : "";
          return '<button type="button" class="ai-btn' + cls + '" data-ai-pans="' + k + '"' + (done ? " disabled" : "") + '><b>' + "ABCD"[k] + '</b>' + esc(x.n) + '</button>';
        }).join("") + '</div>';
      if(done){
        const ok = it.ch[Q.picked] === it.q;
        h += '<div class="ai-qfb2 ' + (ok ? "ok" : "ng") + '"><b>' + (ok ? "⭕ 正解！" : "❌ 正解は " + "ABCD"[it.ch.indexOf(it.q)] + "「" + esc(it.q.n) + "」") + '</b><p>' + esc(it.q.ds) + '</p></div>' +
             '<button type="button" class="ai-btn ai-wide ai-go" data-ai-pnext="1">' + (Q.i + 1 < Q.list.length ? "つぎへ" : "けっかを 見る") + '</button>';
      }
    }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".ai-x").onclick = () => closeSheet("ai-pq");
    const j = sh.querySelector("#ai-pj"); if(j) j.onchange = e => { pset.j = e.target.value; drawPhoto(); };
  }
  function answerPhoto(k){
    const Q = pquiz, it = Q && Q.list[Q.i]; if(!it || Q.picked !== null) return;
    Q.picked = k;
    if(it.ch[k] === it.q) Q.ok++;
    else { Q.miss.push(it.q); const L = log(), e = L[it.q.art]; if(e){ L[it.q.art] = [e[0], e[1] + 1, 1, e[3], Date.now(), e[5]]; save(L); } }
    drawPhoto();
  }

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-cstart],[data-ai-cnext],[data-ai-cans],[data-ai-say],[data-ai-pstart],[data-ai-pnext],[data-ai-pans],.ai-node");
    if(!t) return;
    if(t.dataset.aiSay){ const q = BY.get(t.dataset.aiSay); if(q) enSay(q.ei); return; }
    if(t.dataset.aiTerm) return detail(t.dataset.aiTerm);
    if(t.dataset.aiBack){ trail.pop(); const id = trail[trail.length - 1]; if(id){ trail.pop(); detail(id); } return; }
    if(t.dataset.aiFav){ toggleFav(t.dataset.aiFav); trail.pop(); detail(t.dataset.aiFav); if(document.getElementById("ai-zk") && !document.getElementById("ai-zk").classList.contains("hidden")) drawZukan(); home(mode); return; }
    if(t.dataset.aiMore){ zf.shown += 180; return drawZukan(); }
    if(t.dataset.aiAns) return answerQuiz(+t.dataset.aiAns);
    if(t.dataset.aiQstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startQuiz(); }  // 登録なしの 体験が おわったら クイズも 止める(2026-09-30)
    if(t.dataset.aiCans) return answerCalc(+t.dataset.aiCans);
    if(t.dataset.aiCstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startCalc(); }
    if(t.dataset.aiPans) return answerPhoto(+t.dataset.aiPans);
    if(t.dataset.aiPstart){ if(typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; } return startPhoto(); }
    if(t.dataset.aiPnext){ pquiz.i++; pquiz.picked = null; drawPhoto(); const sh = document.getElementById("ai-pq"); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiCnext){ calc.i++; calc.picked = null; drawCalc(); const sh = document.getElementById("ai-cq"); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiQnext){ quiz.i++; quiz.picked = null; const sh = document.getElementById("ai-qz"); drawQuiz(); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiOpen){
      const o = t.dataset.aiOpen;
      if((o === "quiz" || o === "calc" || o === "photo") && typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; }  // 図鑑・お気に入りは 読むだけなので そのまま
      if(o === "zukan") return openZukan({});
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
      if(o === "calc") return openCalc();
      if(o === "photo") return openPhoto();
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

  /* ── 見た目(この ページだけ。赤い スーパーカーの 色。明るく、むずかしそうに しない) ── */
  const css = `
.map-card{display:none}
.ai-panel{background:linear-gradient(160deg,#fff5f5 0%,#f8fafc 55%,#fff4e6 100%);border:1px solid #ffc9c9;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#e03131;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#e03131,#f08c00,#c92a2a);border-radius:99px}
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
.ai-dtabs button.on{background:#e03131;border-color:#e03131;color:#fff}
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
.ai-ic{font-size:36px;width:58px;height:58px;display:grid;place-items:center;background:linear-gradient(135deg,#e0e7ff,#a5f3fc);border-radius:16px;flex:none}
.ai-cat,.ai-alt{display:block;font-size:11.5px;color:var(--muted);margin-top:3px}.ai-alt{color:#0369a1;font-weight:700}
.ai-tag{display:inline-block;margin-top:4px;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:99px}.ai-tag.new{background:#fef3c7;color:#92400e}
.ai-tag.ws-co{background:#e7f5ff;color:#1864ab;margin-left:4px}.ai-tag.sc-mk{background:#fff0f0;color:#c92a2a;margin-left:4px}.ai-tag.sc-y{background:#f3f0ff;color:#5f3dc4;margin-left:4px}.ai-info .ai-tag{margin:0 4px 0 0}
.sc-zf2{grid-template-columns:1fr 1fr}
.sc-ph{margin:6px 0 10px;background:#0f172a;border-radius:14px;overflow:hidden}.sc-ph img{display:block;width:100%;max-height:52vh;object-fit:contain;background:#0f172a}
.sc-ph figcaption{font-size:10px;line-height:1.5;color:#cbd5e1;padding:4px 8px;background:#0f172a}.sc-ph figcaption a{color:#e2e8f0}
.ai-info{margin-top:8px}.ai-info .ai-tag{margin:0 0 6px}
.ai-ex{font-size:13.5px;line-height:2;margin:6px 0;background:#f0f9ff;border-radius:10px;padding:6px 10px;color:#0c4a6e}.ai-ex b{display:inline-block;font-size:11.5px;background:#0ea5e9;color:#fff;border-radius:99px;padding:0 8px;margin-right:6px;line-height:1.8}
.ai-small{font-size:12.5px;font-weight:800;margin:8px 0 2px;color:#334155}.ai-muted{color:#64748b;font-weight:600}
.ai-mini{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:4px;max-width:360px}
.pins-msg .ai-r1{display:block}.pins-msg small{display:block;font-weight:700;color:var(--muted);font-size:13px}
.ai-earn{display:block;margin-top:8px;font-size:16px;color:#b45309;animation:aiIn .5s ease-out}
.ai-today{display:block;margin-top:10px;background:#fff;border:1px solid #e0e7ff;border-radius:14px;padding:8px 10px;text-align:left}.ai-today b{display:block;font-size:14px;color:#312e81}.ai-today .ai-chips{display:flex}
.ai-sheet .ai-zbox{max-width:560px;position:relative}.ai-x{position:absolute;right:10px;top:8px;border:0;background:none;font-size:26px;color:#64748b;line-height:1;cursor:pointer}
.ai-zsum{text-align:center;margin:4px 0 8px}.ai-zsum b{font-size:22px;color:#e03131}
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
.ai-qlead{font-size:13.5px;line-height:1.8;margin:4px 0 10px}.ai-qset{grid-template-columns:1fr 1fr}.ai-go{background:#e03131;border-color:#e03131;color:#fff}
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#e03131}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"supercarterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
