/* フリック漢字: 常用漢字(高校卒業 程度)から 約6000字の いちばん むずかしい 漢字まで(読み・書き取り・部首・送りがな・熟語の 組み立て・四字熟語・対義語 類義語・同音 同訓 誤字)を、フリックと 指の 書き取りで おぼえる。(けいくん 2026-10-16)
   ─ 土台の index.html の 差しこみ口(PLUG)に「漢字の 旅」を 足す ファイル。kanken/ の ページだけが 読む ─
   ことばは tools/kanken/meta.json + tools/kanken/terms-*.json → tools/kanken/terms_js.py が data/kanken.json と kanken/terms.js(KANKEN_TERMS)に する。
   **ことばを 足す・直すのは tools/kanken/terms-<旅>.json だけ**
   ・もとは フリック国語(kokugo/kokugo.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 8つ + 🏆 マスター。むずかしさは 常用 → 表外(約3000字)→ 最難関(約6000字)。1回は かならず 10問。どの ステージも いつも 同じ 10語 = スピード記録勝負
   ・⭐ 書き取り(kaki)と 同音・同訓・誤字(doon)は **指で 書く**(けいくん 2026-10-16「はじめから C」= 機械が 自動で ◯×)。
     字の 形は kanken/strokes.js(KanjiVG・CC BY-SA 3.0)。**1画 書くたびに 書き順どおりの その 1画と くらべる**(タイピングの 1字ずつの 判定と 同じ)。
     合えば お手本の 線に きれいに なる。ちがえば 赤く 消えて まちがい 1回。2回 つづけて まちがえると つぎの 1画が うすく 見える(ヒント)
   ・最難関の 読み・四字熟語・対義語・送りがな・熟語の 型は **答えを かくす**(国語と 同じ hide)
   ・🏆 マスターは 打つ 6つの 旅だけを まぜる(書く 旅を まぜると スマホの キーボードが 出たり 消えたり するため)
   ⚠️ 漢字の 検定を 行う 団体とは 関係ない。むずかしさは めやす */
const KANKEN = (() => {
  const D = KANKEN_TERMS, SK = typeof KANKEN_STROKES === "object" ? KANKEN_STROKES : {};
  const ROUNDS = 10;
  const RANK_READY = true;  // かずともの FLICK_MODES に knyomi / knkaki / knbushu / knokuri / knjukugo / knyoji / kntaigi / kndoon / knmas を 足す(speed-king)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { yomi:"knyomi", kaki:"knkaki", bushu:"knbushu", okuri:"knokuri", jukugo:"knjukugo", yoji:"knyoji", taigi:"kntaigi", doon:"kndoon" };
  const WRITE = new Set(["kaki", "doon"]);  // 指で 書く 旅
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    const w = WRITE.has(o.j);
    return Object.assign({}, o, { art:o.id, k:"kanjiterm", w, hide:!w && o.dv === 3 && o.j !== "bushu", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
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
    maps[m] = { icon:J.icon, name:J.name, cardName:J.name, title:"", word:"漢字図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば", miss:"まだ 出会っていない ことば",
                lvTitle:J.icon + " " + J.name + "　旅を すすめる",
                card:(mm, done) => '<small>' + terms.length + '語・' + lv.length + 'ステージ</small><small>出会った ' + done + '語</small>' };
  }
  /* マスター: 9つの 旅を まぜて ぜんぶ(きまった ならび。どの ステージも いつも 同じ 10語 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.filter(q => !q.w).sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.knmas = lv; pools.knmas = ALL.filter(q => !q.w); colors.knmas = "#c92a2a";
    maps.knmas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"漢字図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　打つ 6つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + mix.length + '語・' + lv.length + 'ステージ</small><small>常用漢字から 最難関まで</small>' };
  }
  const MODES_ALL = ["knyomi", "knkaki", "knbushu", "knokuri", "knjukugo", "knyoji", "kntaigi", "kndoon", "knmas"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-kanken[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-kanken-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-kanken");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-kanken"), JSON.stringify(v)); memo = { k:pkey("flick-kanken"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-kanken-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-kanken-fav"), JSON.stringify(a)); return i < 0; }
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
    if(q.w) return "\u0000";  // 書く 問題は 打っても 進まない(マスに 書く)
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
      h += '<div class="ai-learn" role="status"><b>✅ ' + esc(prev.n) + '</b><span>' + prev.jr.icon + " " + esc(prev.jr.name) + '</span><p>' + esc(prev.ds) + '</p>' +
           (rel.length ? '<p class="ai-rel">🔗 つながる ことば: ' + rel.map(x => esc(x.n)).join("・") + '</p>' : "") + '</div>';
    }else h += '<div class="ai-learn ai-hint">こたえると、その ことばの 意味と、つながる ことばが 出るよ</div>';
    const tag = pre && !pre.has(q.art) ? '<span class="ai-tag new">🆕 はじめまして</span>' : "";
    const hid = q.hide ? '<small class="ai-alt">🙈 答えを 思い出して 打とう。まちがえると その 1字だけ 見えるよ</small>' : "";
    if(q.w){  // ✍️ 指で 書く: 例文(書く ところに 色)と 書く マス
      const what = q.kd === "goji" ? "赤い 字は まちがい。正しい 字を 書こう" : "色の ついた カタカナを 漢字 1字で 書こう";
      h += '<div class="kk-wq"><p class="kk-st">' + mark(q.st, q.kd === "goji") + '</p>' + tag +
           '<small class="ai-cat">' + esc(q.c) + '</small><small class="ai-alt">✍️ ' + what + '(書き順どおりに)</small></div>' +
           '<div class="kk-pad" data-kk="' + esc(q.art) + '"><canvas></canvas><div class="kk-side"><b class="kk-cnt"></b>' +
           '<span class="kk-btns"><button type="button" class="kk-hint">💡 ヒント</button><button type="button" class="kk-ans">👀 答え</button></span></div></div>';
      return h;
    }
    let big = esc(q.n), sub = "";
    if(q.j === "bushu") sub = '<small class="ai-alt">🧩 部首の 名前を 打とう</small>';
    else if(q.j === "okuri"){ big = esc(q.kj) + '<span class="kk-blank">＿</span>'; sub = '<small class="kk-sub">' + mark(q.st) + '</small><small class="ai-alt">✏️ 送りがなを 打とう</small>'; }
    else if(q.j === "jukugo") sub = '<small class="ai-alt">🔗 組み立ての 型を 打とう(はんたい / にたいみ / しゅうしょく / もくてき / うちけし)</small>';
    else if(q.j === "taigi"){ big = esc(q.pr) + ' <span class="kk-rel">' + (q.rl === "対" ? "⇔" : "≒") + '</span> ？'; sub = '<small class="ai-alt">' + (q.rl === "対" ? "⇔ 反対の 意味の 熟語" : "≒ 似た 意味の 熟語") + 'の 読みを 打とう</small>'; }
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot">' + big + '</p>' + tag + '<small class="ai-cat">' + esc(q.c) + '</small>' + sub + hid + '</div></div>';
    return h;
  }
  /* 例文の【 】を 色つきに(誤字は 赤い 字) */
  function mark(s, wrong){ return esc(s || "").replace(/【(.*?)】/, (_, x) => '<span class="kk-mk' + (wrong ? " ng" : "") + '">' + x + '</span>'); }
  /* 打つ 字の 見せかた。ふだんは 土台と 同じ。答えを かくす 語は 打った ところまで だけ 見せて、のこりは ？。まちがえた ところだけ 正しい 字を 見せる(ヒント)。
     書く 問題は 打つ 字を 出さない(マスを 用意する) */
  function tgtHtml(q, n, err){
    writing(q.w);
    if(q.w){ setTimeout(() => PAD.mount(q), 0); return '<span class="kk-tgt">✍️ 書き順どおりに 1画ずつ</span>'; }
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
    if(q.st) h += '<p class="ai-ex"><b>例文</b>' + mark(q.st, q.kd === "goji") + (q.kd === "goji" ? ' → <b class="kk-ok">' + esc(q.kj) + '</b>' : '') + '</p>';
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.bu) h += '<p class="ai-small">🧩 部首: <span class="kk-bu">' + esc(q.bu) + '</span></p>';
    if(q.pr) h += '<p class="ai-small">' + esc(q.pr) + (q.rl === "対" ? " ⇔ " : " ≒ ") + esc(q.n) + '(' + (q.rl === "対" ? "対義語" : "類義語") + ')</p>';
    if(q.kj && SK[q.kj]) h += '<p class="ai-small">🖌 「' + esc(q.kj) + '」の 書き順(' + SK[q.kj].length + '画)</p>' + orderSvg(q.kj);
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
    if(JOURNEY_OF[m] && JBY[JOURNEY_OF[m]].diagram) diagCur = JBY[JOURNEY_OF[m]].diagram;
    if(!diagCur) diagCur = DIAGS[0];
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 漢字図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<details class="ai-diag"><summary class="ai-dh">🔗 熟語の 組み立て 5つの 型を ひらく <small>「熟語の構成」で 覚えた 熟語が 型ごとに たまるよ。型を おすと 中身が 出るよ</small></summary><div class="ai-dtabs">' +
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
    }else chips.innerHTML = '<p class="ai-lead">打つ 6つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。</p>';
  }
  function lvInfo(m, i){
    if(m === "knmas") return { name:"マスター" + (i + 1), sub:"打つ 6つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    const hid = s.set.some(q => q.hide), wr = J.id === "kaki" || J.id === "doon";
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name + (hid ? " 🙈" : wr ? " ✍️" : ""), sub:S.icon + " " + S.name + "・10" + (wr ? "字・指で 書く" : "語") + (hid ? "・答えを かくす" : ""), short:"Lv." + (i + 1) };
  }

  /* ── 国語図鑑(検索・旅・分類・むずかしさ・お気に入りで しぼれる) ── */
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
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 漢字図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: 部首・さんずい)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
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
      if((o === "quiz" || o === "calc") && typeof canPlay === "function" && !canPlay()){ showTrialEnd(); return; }  // 図鑑・お気に入りは 読むだけなので そのまま
      if(o === "zukan") return openZukan({});
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
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

  /* ── ✍️ 書き取りの マス(けいくん 2026-10-16「はじめから C」= 機械が 自動で ◯×) ──
     ・字の 形は KanjiVG(kanken/strokes.js。109×109 の 座標。1画ごとに 線(d)と 線の 上の 16点)
     ・**1画 書くたびに、書き順どおりの つぎの 1画と くらべる**(タイピングの 1字ずつの 判定と 同じ 考え):
       ①場所(線の まん中の ずれ) ②形(まん中を そろえて 16点を 1つずつ くらべる。逆向きに 書くと 大きく ずれる) ③長さ ④向き
       2画 合格した あとは、書いた 人の 字の 大きさ・場所の くせ(小さめ・右より)を 合わせてから くらべる
     ・合えば その 1画が お手本の きれいな 線に なる。ちがえば 赤く 出て 消える(まちがい 1回)
     ・2回 つづけて まちがえると、つぎの 1画が うすく 見える(💡 ヒントを おしても 見える。まちがい 1回)
     ・⚠️ 書いた 線は どこにも 送らない(ぜんぶ スマホの 中) */
  const PAD = (() => {
    const U = 109, N = 16;
    let el = null, cv = null, ctx = null, q = null, S = [], k = 0, miss = 0, hint = false, acc = [], done = false, pts = null, red = null;
    let show = false, showT = 0, showAt = 0, raf = 0;  // 👀 答え(全画を うすく + 書き順の 番号。1画ずつ のびる)
    const STEP = 450;  // 1画 ぶんの 時間(図鑑の 書き順アニメと 同じ)
    const P = s => { const a = []; for(let i = 0; i < s.length; i += 2) a.push([s[i], s[i + 1]]); return a; };
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const lenOf = p => { let L = 0; for(let i = 1; i < p.length; i++) L += dist(p[i - 1], p[i]); return L; };
    const mid = p => { let x = 0, y = 0; for(const a of p){ x += a[0]; y += a[1]; } return [x / p.length, y / p.length]; };
    function resample(p){
      if(p.length < 2) return Array.from({ length:N }, () => p[0]);
      const L = lenOf(p) || 1e-6, out = [p[0]]; let acc0 = 0, i = 1;
      for(let s = 1; s < N - 1; s++){
        const want = L * s / (N - 1);
        while(i < p.length - 1 && acc0 + dist(p[i - 1], p[i]) < want){ acc0 += dist(p[i - 1], p[i]); i++; }
        const d = dist(p[i - 1], p[i]) || 1e-6, t = (want - acc0) / d;
        out.push([p[i - 1][0] + (p[i][0] - p[i - 1][0]) * t, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * t]);
      }
      out.push(p[p.length - 1]); return out;
    }
    /* 書いた 人の くせ(大きさ・場所)を 合わせる: 合格した 画の 点の あつまりを お手本に 重ねる */
    function fit(){
      if(acc.length < 2) return a => a;
      const us = [].concat(...acc.map(x => x.u)), ts = [].concat(...acc.map(x => x.t));
      const cu = mid(us), ct = mid(ts);
      const su = us.reduce((s, a) => s + dist(a, cu), 0) / us.length, st = ts.reduce((s, a) => s + dist(a, ct), 0) / ts.length;
      const sc = su > 3 && st > 3 ? Math.min(1.8, Math.max(.55, st / su)) : 1;
      return a => [ct[0] + (a[0] - cu[0]) * sc, ct[1] + (a[1] - cu[1]) * sc];
    }
    function judge(raw){
      const T = P(S[k][1]), u = resample(raw), U2 = u.map(fit());
      const lt = lenOf(T), lu = lenOf(U2), cT = mid(T), cU = mid(U2);
      const tolPos = (acc.length >= 2 ? 15 : 22) + Math.min(8, lt / 10);
      if(dist(cT, cU) > tolPos) return false;
      if(lt < 12) return lu < 40;  // 点(、)は 場所だけ
      if(lu < lt * .35 || lu > lt * 2.6 + 10) return false;
      let sh = 0; for(let i = 0; i < N; i++) sh += dist([U2[i][0] - cU[0], U2[i][1] - cU[1]], [T[i][0] - cT[0], T[i][1] - cT[1]]);
      if(sh / N > Math.max(7, lt * .24)) return false;
      // 曲がりかた: 線を 4つに 分けて、それぞれの 向きを くらべる(横 → 折れて 下 と 横だけ を 見分ける。卩 と 十 など)
      for(let a = 0; a < 4; a++){
        const i0 = Math.round(a * (N - 1) / 4), i1 = Math.round((a + 1) * (N - 1) / 4);
        const tx = T[i1][0] - T[i0][0], ty = T[i1][1] - T[i0][1], ux = U2[i1][0] - U2[i0][0], uy = U2[i1][1] - U2[i0][1];
        const nT = Math.hypot(tx, ty), nU = Math.hypot(ux, uy);
        if(nT > lt / 8 && nT > 4 && nU > 1.5 && (tx * ux + ty * uy) / (nT * nU) < .25) return false;
      }
      const vt = [T[N - 1][0] - T[0][0], T[N - 1][1] - T[0][1]], vu = [U2[N - 1][0] - U2[0][0], U2[N - 1][1] - U2[0][1]];
      const nt = Math.hypot(...vt), nu = Math.hypot(...vu);
      if(nt > 15 && nu > 4 && (vt[0] * vu[0] + vt[1] * vu[1]) / (nt * nu) < .2) return false;  // 向きが ちがう
      acc.push({ u, t:T }); return true;
    }
    function draw(){
      if(!ctx) return;
      const W = cv.width;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, W); ctx.setTransform(W / U, 0, 0, W / U, 0, 0);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = "#f3b6b6"; ctx.lineWidth = .7; ctx.setLineDash([2.5, 2.5]); ctx.beginPath(); ctx.moveTo(U / 2, 4); ctx.lineTo(U / 2, U - 4); ctx.moveTo(4, U / 2); ctx.lineTo(U - 4, U / 2); ctx.stroke(); ctx.setLineDash([]);
      if(show){
        for(let i = 0; i < S.length; i++){
          const f = Math.max(0, Math.min(1, showT - i)); if(f <= 0) break;
          const p = S[i][1], L = lenOf(P(p)) + 2;
          ctx.strokeStyle = "rgba(201,42,42,.28)"; ctx.lineWidth = 5;
          if(f < 1){ ctx.setLineDash([L * f, L + 10]); }
          ctx.stroke(new Path2D(S[i][0])); ctx.setLineDash([]);
          ctx.fillStyle = "#c92a2a"; ctx.font = "800 7px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(String(i + 1), p[0] - 4, p[1] - 4);
        }
      }
      if(hint && k < S.length){
        ctx.strokeStyle = "rgba(201,42,42,.3)"; ctx.lineWidth = 6; ctx.stroke(new Path2D(S[k][0]));
        const p = S[k][1]; ctx.fillStyle = "rgba(201,42,42,.55)"; ctx.beginPath(); ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = done ? "#2f9e44" : "#1e1b4b"; ctx.lineWidth = 4.4;
      for(let i = 0; i < k; i++) ctx.stroke(new Path2D(S[i][0]));
      for(const [line, color] of [[pts, "#1e1b4b"], [red, "#e03131"]]) if(line && line.length){
        ctx.strokeStyle = color; ctx.lineWidth = 4.4; ctx.beginPath(); ctx.moveTo(line[0][0], line[0][1]);
        for(const a of line.slice(1)) ctx.lineTo(a[0], a[1]); if(line.length === 1) ctx.lineTo(line[0][0] + .1, line[0][1]); ctx.stroke();
      }
      const c = el && el.querySelector(".kk-cnt"); if(c) c.textContent = k + " / " + S.length + "画";
    }
    function play(){
      cancelAnimationFrame(raf); show = true; showAt = performance.now(); showT = 0;
      const mine = q;
      const tick = now => {
        if(q !== mine) return;
        showT = (now - showAt) / STEP; draw();
        if(showT < S.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    const live = () => q && !done && typeof running !== "undefined" && running && !locked && typeof qs !== "undefined" && qs[idx] === q;
    function xy(e){ const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * U, (e.clientY - r.top) / r.height * U]; }
    function down(e){ if(!live()) return; e.preventDefault(); try{ cv.setPointerCapture(e.pointerId); }catch(x){} red = null; pts = [xy(e)]; draw(); }
    function move(e){
      if(!pts) return; e.preventDefault();
      for(const ev of (e.getCoalescedEvents ? e.getCoalescedEvents() : [e])) pts.push(xy(ev));
      draw();
    }
    function up(e){
      if(!pts) return; e.preventDefault();
      const raw = pts; pts = null;
      if(!live()){ draw(); return; }
      if(judge(raw)){
        k++; miss = 0; hint = false;
        if(k >= S.length){ done = true; el.classList.add("ok"); draw(); setTimeout(() => { if(qs[idx] === q) next(); }, 160); return; }
      }else{
        miss++; qMiss++; red = raw; if(miss >= 2) hint = true;
        if(navigator.vibrate) try{ navigator.vibrate(25); }catch(x){}
        setTimeout(() => { red = null; draw(); }, 380);
      }
      draw();
    }
    function mount(qq){
      const box = document.querySelector('.kk-pad[data-kk="' + qq.art + '"]');
      if(!box || box.dataset.on) return;
      box.dataset.on = "1"; el = box; q = qq; S = SK[qq.kj] || []; k = 0; miss = 0; hint = false; acc = []; done = false; pts = null; red = null;
      cancelAnimationFrame(raf); show = false; showT = 0;
      cv = box.querySelector("canvas"); ctx = cv.getContext("2d");
      const card = document.getElementById("card"), w = (card ? card.clientWidth : 300) - 34;
      const vh = (window.visualViewport ? visualViewport.height : innerHeight);
      const size = Math.max(180, Math.min(340, w, vh * .48));
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      cv.style.width = cv.style.height = size + "px"; cv.width = cv.height = Math.round(size * dpr);
      cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move);
      cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
      box.querySelector(".kk-hint").addEventListener("pointerdown", e => { e.preventDefault(); if(!live() || hint) return; hint = true; qMiss++; draw(); });
      // 👀 答え: その 字の 全画を うすく 出して 書き順の 番号を ふる(1画ずつ のびる)。見たら まちがい 1回(1回だけ)。上から なぞって 書けば 進める
      box.querySelector(".kk-ans").addEventListener("pointerdown", e => { e.preventDefault(); if(!live() || !S.length) return; if(!show) qMiss++; play(); });
      if(!S.length){ el.querySelector(".kk-cnt").textContent = "形の データが ありません"; }
      draw();
      if(card) card.scrollTop = card.scrollHeight;
    }
    return { mount };
  })();
  /* 書くとき キーボードを 出さない(入力欄を かくす)。打つ 問題に もどったら 出す */
  function writing(on){ document.body.classList.toggle("kk-writing", !!on); if(on && typeof ans === "object" && ans) ans.blur(); }
  if(typeof ans === "object" && ans) ans.addEventListener("focus", () => { if(document.body.classList.contains("kk-writing")) ans.blur(); });
  /* 図鑑・結果の 書き順(1画ずつ 線が のびる。おすと もう一度) */
  function orderSvg(ch){
    const S = SK[ch] || [];
    return '<svg class="kk-order" viewBox="0 0 109 109" role="img" aria-label="' + esc(ch) + 'の 書き順"><path d="M54.5 4V105M4 54.5H105" class="kk-og"/>' +
      S.map((s, i) => '<path d="' + s[0] + '" pathLength="1" class="kk-o" style="animation-delay:' + (i * .45).toFixed(2) + 's"/>').join("") +
      S.map((s, i) => '<text x="' + (s[1][0] - 3).toFixed(1) + '" y="' + (s[1][1] - 2).toFixed(1) + '" class="kk-on" style="animation-delay:' + (i * .45).toFixed(2) + 's">' + (i + 1) + '</text>').join("") + '</svg>';
  }
  document.addEventListener("click", e => { const sv = e.target.closest && e.target.closest(".kk-order"); if(sv){ const c = sv.cloneNode(true); sv.replaceWith(c); } });

  /* ── 見た目(この ページだけ。和紙と 藍の ように 明るく やさしく。むずかしそうに しない) ── */
  const css = `
.map-card{display:none}
.ai-panel{background:linear-gradient(160deg,#edf2ff 0%,#fff9db 55%,#ebfbee 100%);border:1px solid #bac8ff;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#3b5bdb;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#3b5bdb,#2f9e44,#f08c00);border-radius:99px}
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
body.kk-writing #game .field{display:none}
.kk-wq{margin:0 0 6px}.kk-st{font-size:clamp(19px,5.6vw,25px);font-weight:800;line-height:1.55;margin:0;word-break:break-word}
.kk-mk{color:#c92a2a;background:#fff0f0;border-bottom:3px solid #c92a2a;padding:0 3px;border-radius:5px}.kk-mk.ng{color:#fff;background:#e03131;border-color:#c92a2a}
.kk-pad{display:flex;flex-direction:column;gap:6px;align-items:center;margin:0 0 4px;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.kk-pad canvas{display:block;touch-action:none;background:#fffdf7;border:2.5px solid #c92a2a;border-radius:12px;box-shadow:0 3px 10px -4px rgba(201,42,42,.4)}
.kk-pad.ok canvas{border-color:#2f9e44;box-shadow:0 0 0 4px #d3f9d8}
.kk-side{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;max-width:340px}
.kk-cnt{font-size:13px;text-align:center;font-variant-numeric:tabular-nums;color:#1e1b4b}
.kk-btns{display:flex;gap:6px}
.kk-hint,.kk-ans{padding:7px 14px;border-radius:12px;border:1.5px solid #fcc2d7;background:#fff;color:#a61e4d;font:inherit;font-size:12.5px;font-weight:800}
.kk-tgt{font-size:13px;color:var(--muted);font-weight:700}
.kk-blank{color:#c92a2a;margin-left:2px}.kk-sub{display:block;font-size:15px;margin-top:4px;font-weight:700;color:var(--ink)}.kk-rel{color:#1098ad}
.kk-bu{font-size:22px;font-weight:900;color:#2f9e44}.kk-ok{color:#2f9e44;font-size:16px}
.kk-order{display:block;width:150px;height:150px;margin:4px 0 6px;background:#fffdf7;border:1.5px solid #fcc2d7;border-radius:12px;cursor:pointer}
.kk-og{stroke:#f3b6b6;stroke-width:.6;stroke-dasharray:2 2;fill:none}
.kk-o{fill:none;stroke:#1e1b4b;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:kkDraw .42s ease-out forwards}
.kk-on{font-size:7px;font-weight:800;fill:#c92a2a;opacity:0;animation:kkNum .2s forwards}
@keyframes kkDraw{to{stroke-dashoffset:0}}@keyframes kkNum{to{opacity:1}}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"kanjiterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget, tgtHtml,
           noRank:(m, lv) => !RANK_READY || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
