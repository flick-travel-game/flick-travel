/* 整備フリック旅行: バイク・クルマの 部品と しくみを、フリックで 打って おぼえる。(けいくん 2026-09-26)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「整備の 旅」を 足す ファイル。seibi/ の ページだけが 読む ─
   ことばは tools/seibi/meta.json + tools/seibi/terms-*.json → tools/seibi/terms_js.py が data/seibi.json と seibi/terms.js(SEIBI_TERMS)に する。
   **ことばを 足す・直すのは tools/seibi/terms-<旅>.json だけ**
   ・もとは AIフリック旅行(ai/ai.js)を 写して 作った。見た目の class 名(ai-…)は そのまま(この ページだけの CSS)
   ・旅は 6つ: 🔥 エンジン / 🛞 シャシ / 🛑 ブレーキ / ⚡ 電装・EV / 🏍 バイク / 🔧 工具・点検・法令。+ 🏆 マスター・🔁 ふくしゅう・💪 苦手克服
   ・レベルは 入門 → 3級めやす → 2級めやす(1級は あとで)。1回は かならず 10問。入門は 新しい 部品 10問、3級からは 新しい 7問 + ふくしゅう 3問
   ・こたえると 部品の 説明・つながる 部品・しくみ図の どこに あるか(📍)が 出る。しくみ図は コードで 描く(AIの 絵は 部品の 位置が ずれるため)
   ⚠️ 部品の 名前と しくみを おぼえる ゲーム。整備の やりかたは のせない */
const SEIBI = (() => {
  const D = SEIBI_TERMS;
  const ROUNDS = 10, REV = 3;
  const RANK_READY = true;  // かずともの FLICK_MODES に sengine / schassis / sbrake / selec / sbike / stool / smas を 足した(speed-king #175・2026-09-26)。false に すると ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const MODE_OF = { engine:"sengine", chassis:"schassis", brake:"sbrake", elec:"selec", bike:"sbike", tool:"stool" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j];
    return Object.assign({}, o, { art:o.id, k:"seibiterm", n:o.n, r:o.r, e:o.e, d:o.rb, ord:i, jr:j,
      c:j.icon + " " + j.name + " ・ " + o.c + " ・ " + LVN[o.dv].icon + " " + LVN[o.dv].name });
  });
  const BY = new Map(ALL.map(q => [q.art, q]));
  const TOTAL = ALL.length;
  function cost(s){ let c = 0; for(const ch of s){ c += 1; if(/[がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔ]/.test(ch)) c += .5; if(/[ぁぃぅぇぉっゃゅょゎ]/.test(ch)) c += .5; if(ch === "ー") c += .3; } return c; }
  const easy = (a, b) => cost(a.r) - cost(b.r);

  /* ── 旅の ステージを 組む(旅ごとに: 入門は 10語ずつ、初級からは 7語 + ふくしゅう 3語) ── */
  const levels = {}, pools = {}, stageInfo = {}, maps = {}, colors = {};
  for(const J of JR){
    const m = MODE_OF[J.id], terms = ALL.filter(q => q.j === J.id);
    const lv = [], info = [];
    let introduced = [];
    for(const L of D.levels){
      const news = terms.filter(q => q.dv === L.difficulty);  // data の ならび順 = 有名な順(先に 書いた ことばが 先に 出る)
      if(!news.length) continue;
      const per = L.difficulty === 1 ? ROUNDS : ROUNDS - REV;
      const S = Math.ceil(news.length / per);
      let p = 0;
      for(let k = 0; k < S; k++){
        const nNew = Math.floor(news.length / S) + (k < news.length % S ? 1 : 0);
        const fresh = news.slice(p, p + nNew); p += nNew;
        const nRev = ROUNDS - fresh.length, L0 = introduced.length, def = [];
        for(const back of [4, 12, 25, 45, 70, 100]){  // きろくが まだ 無い人の ふくしゅう: 少し前・だいぶ前・ずっと前
          if(def.length >= nRev) break;
          const q = introduced[Math.max(0, L0 - back)];
          if(q && !def.includes(q)) def.push(q);
        }
        for(let x = 0; def.length < nRev && x < L0; x++) if(!def.includes(introduced[x])) def.push(introduced[x]);
        info.push({ fresh, def, dv:L.difficulty });
        lv.push(arrange(fresh, def));
        introduced = introduced.concat(fresh);
      }
    }
    info.forEach((s, k) => { s.stop = Math.min(J.stops.length - 1, Math.floor(k * J.stops.length / info.length)); });
    levels[m] = lv; stageInfo[m] = info; pools[m] = terms; colors[m] = J.color;
    maps[m] = { icon:J.icon, name:J.name, cardName:J.name, title:"", word:"部品図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば", miss:"まだ 出会っていない ことば",
                lvTitle:J.icon + " " + J.name + "　旅を すすめる",
                card:(mm, done) => '<small>' + terms.length + '語・' + lv.length + 'ステージ</small><small>出会った ' + done + '語</small>' };
  }
  function arrange(fresh, rev){
    const out = fresh.slice().sort(easy);
    const slots = [2, 5, 8, 1, 4, 7, 9, 3, 6, 0];
    rev.forEach((q, i) => out.splice(Math.min(slots[i], out.length), 0, q));
    return out.slice(0, ROUNDS);
  }
  /* マスター: 6つの 旅を まぜて ぜんぶ(きまった ならび。どの ステージも いつも 同じ 10語 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.slice().sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.smas = lv; pools.smas = ALL; colors.smas = "#e0202e";
    maps.smas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"部品図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　6つの 旅を まぜて ぜんぶ",
                  card:() => '<small>' + TOTAL + '語・' + lv.length + 'ステージ</small><small>専門用語まで はば広く</small>' };
  }
  /* ふくしゅう / 苦手克服(その人の きろくから 毎回 えらぶ 10問) */
  const starter = () => ALL.filter(q => q.dv === 1).slice(0, ROUNDS);
  for(const [m, icon, name, color, sub] of [["sfuku", "🔁", "ふくしゅう", "pink", "毎回 ちがう 10語"], ["sweak", "💪", "苦手克服", "orange", "苦手ことばを 10語"]]){
    levels[m] = [starter()]; pools[m] = ALL; colors[m] = color;
    maps[m] = { icon, name, cardName:name, word:"部品図鑑", thing:"ことば", unit:"語", doneWord:"出会った ことば",
                lvTitle:icon + " " + name + "　" + (m === "sfuku" ? "ひさしぶり・時間がかかった ことばを もう一度" : "まちがえた ことばだけ 10問"),
                card:() => '<small>' + sub + '</small><small>' + (m === "sweak" ? "苦手 " + weakList().length + "語" : discovered().size < ROUNDS ? "まず 旅で 10語 出会おう" : "出会った " + discovered().size + "語") + '</small>' };
  }
  const MODES_ALL = ["sengine", "schassis", "sbrake", "selec", "sbike", "stool", "smas", "sfuku", "sweak"];

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-seibi[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-seibi-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-seibi");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-seibi"), JSON.stringify(v)); memo = { k:pkey("flick-seibi"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-seibi-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-seibi-fav"), JSON.stringify(a)); return i < 0; }
  function discovered(){ const L = log(); return new Set(Object.keys(L).filter(id => BY.has(id))); }
  function discoveredIn(m){ const d = discovered(), s = new Set(); for(const q of (pools[m] || [])) if(d.has(q.art)) s.add(q.art); return s; }
  /* 苦手ことば: さいごに まちがえた / 何度も まちがえている(見た回数の 4割 以上) */
  function weakScore(e){ return e ? 3 * e[2] + (e[1] >= 2 && e[1] / e[0] >= .4 ? 2 : 0) + Math.min(1.5, e[1] / Math.max(1, e[0]) * 2) : 0; }
  function weakList(){ const L = log(); return ALL.filter(q => L[q.art] && (L[q.art][2] || (L[q.art][1] >= 2 && L[q.art][1] / L[q.art][0] >= .4))).sort((a, b) => weakScore(L[b.art]) - weakScore(L[a.art])); }
  const dayOf = t => { const d = new Date(t); return d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate(); };
  function todayWords(){ const L = log(), td = dayOf(Date.now()); return ALL.filter(q => L[q.art] && L[q.art][5] && dayOf(L[q.art][5]) === td).sort((a, b) => log()[a.art][5] - log()[b.art][5]); }
  let runMiss = {};  // この回に まちがえた ことば
  function answered(q, secs, miss){
    if(!q || !BY.has(q.art)) return;
    const L = log(), e = L[q.art] || [0, 0, 0, 0, 0, Date.now()];
    const per = secs / Math.max(1, q.r.length);
    L[q.art] = [e[0] + 1, e[1] + miss, miss > 0 ? 1 : 0, e[0] ? +(e[3] * .6 + per * .4).toFixed(3) : +per.toFixed(3), Date.now(), e[5] || Date.now()];
    if(miss > 0) runMiss[q.art] = 1;
    save(L);
  }
  /* ふくしゅうの 点数: まちがえた > 何度も まちがえた > 時間がかかった > ひさしぶり > まだ 少ししか 見ていない */
  function reviewPick(cands, n, avoid){
    const L = log(), per = cands.map(q => (L[q.art] || [])[3]).filter(Boolean).sort((a, b) => a - b);
    const med = per.length ? per[Math.floor(per.length / 2)] : .5, now = Date.now();
    return cands.filter(q => !avoid.has(q.art) && L[q.art]).map(q => {
      const e = L[q.art];
      const s = 3 * e[2] + 1.5 * Math.min(1, e[1] / Math.max(1, e[0])) + 2 * Math.max(0, e[3] / med - 1)
              + Math.min(2, (now - e[4]) / 864e5 / 3) + 1 / e[0] + Math.random() * .6;
      return { q, s };
    }).sort((a, b) => b.s - a.s).slice(0, n).map(x => x.q);
  }
  let pre = null, revSet = new Set(), weakSet = new Set();
  function makeQs(m, lv){
    pre = discovered(); revSet = new Set(); runMiss = {};
    weakSet = new Set(weakList().map(q => q.art));
    const pad = (qs, from) => { for(const q of from){ if(qs.length >= ROUNDS) break; if(!qs.includes(q)) qs.push(q); } return qs; };
    if(m === "sfuku" || m === "sweak"){
      const seen = ALL.filter(q => pre.has(q.art));
      let qs = m === "sweak" ? weakList().slice(0, ROUNDS) : [];
      qs = qs.concat(reviewPick(seen, ROUNDS - qs.length, new Set(qs.map(q => q.art))));
      qs.forEach(q => revSet.add(q.art));
      return pad(qs, starter().concat(ALL)).sort(easy);
    }
    const info = stageInfo[m] && stageInfo[m][lv];
    if(!info || !info.def.length) return levels[m][lv].slice();
    const avoid = new Set(info.fresh.map(q => q.art)), cands = [];
    for(const s of stageInfo[m]){ if(s === info) break; s.fresh.forEach(q => { if(pre.has(q.art)) cands.push(q); }); }
    const rev = reviewPick(cands, info.def.length, avoid);
    for(const q of info.def){ if(rev.length >= info.def.length) break; if(!rev.includes(q) && !avoid.has(q.art)) rev.push(q); }
    rev.forEach(q => revSet.add(q.art));
    return arrange(info.fresh, rev);
  }
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
  let last = null, lastMissed = [];
  function finished(r, qs){
    const now = discovered(), before = pre || new Set();
    const fresh = qs.filter(q => !before.has(q.art) && now.has(q.art)).map(q => q.art);
    const earned = titles().concat([[TOTAL].concat(D.allTitle)]).filter(T => before.size < T[0] && now.size >= T[0]);
    const missed = qs.filter(q => runMiss[q.art]).map(q => q.art);
    return { fresh, rev:[...revSet], total:now.size, earned, missed };
  }
  function chip(q, cls){ return '<button type="button" class="ai-chip' + (cls ? " " + cls : "") + '" data-ai-term="' + esc(q.art) + '">' + q.e + " " + esc(q.n) + '</button>'; }
  function resultMsg(r){
    last = r.kabu || null;
    const k = r.kabu || { fresh:[], total:discovered().size, earned:[], missed:[] };
    lastMissed = (k.missed || []).map(id => BY.get(id)).filter(Boolean);
    let h = "";
    if(r.retry){
      const n = r.arts.length, ok = n - (k.missed || []).length;
      h += '<span class="ai-r1">🔁 もう一度 おしまい！ まちがえずに 打てた ことば ' + ok + ' / ' + n + '</span>';
    }else h += '<span class="ai-r1">🆕 あたらしく 出会った ことば +' + k.fresh.length + '語</span>';
    h += '<small>ぜんぶで ' + fmt(k.total) + ' / ' + fmt(TOTAL) + '語 発見</small>';
    for(const T of k.earned) h += '<span class="ai-earn">' + T[1] + " 称号ゲット！「" + esc(T[2]) + "」</span>";
    const td = todayWords();
    if(td.length) h += '<span class="ai-today"><b>📅 今日 覚えた ことば ' + td.length + '語</b><span class="ai-chips">' + td.map(q => chip(q, k.fresh.includes(q.art) ? "new" : "")).join("") + '</span></span>';
    if(lastMissed.length && !r.retry) h += '<button type="button" class="ai-retry" data-ai-retry="1">🔁 まちがえた ' + lastMissed.length + '語だけ もう一度 挑戦</button><small>やらなくても 大丈夫。苦手ことばに のこって、あとで ふくしゅうに 出るよ</small>';
    return h;
  }

  /* ── しくみ図(SVG を コードで 描く。AIの 絵は 使わない = 字と 📍の 場所が ずれないため) ──
     counts = 場所ごとの 出会った 数 / pin = 📍を 立てる 場所 */
  const BW = 104, BH = 58;
  const DIAGS = Object.keys(D.diagrams);  // 車の 図は 3つの 旅(シャシ・ブレーキ・電装)で 使うので、タブは 図ごとに 1つ
  /* うしろに うすく 描く 形(クルマ・バイクの よこ顔)。部品の 箱の 位置とは 合わせない(めやすの 絵) */
  const BG = {
    car:'<g opacity=".09" fill="none" stroke="#0f172a" stroke-width="10" stroke-linejoin="round"><path d="M18 250 L22 190 Q30 160 70 150 L120 140 Q150 90 200 80 L270 80 Q310 85 330 140 L345 170 L345 250 Z"/><circle cx="90" cy="265" r="42"/><circle cx="280" cy="265" r="42"/></g>',
    bike:'<g opacity=".09" fill="none" stroke="#0f172a" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"><circle cx="75" cy="265" r="58"/><circle cx="290" cy="265" r="58"/><path d="M75 265 L115 95 L95 60 M115 95 L240 120 L290 265 M150 200 L240 120 M150 200 L290 265 M150 200 L115 95"/></g>'
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
           (rel.length ? '<p class="ai-rel">🔗 つながる ことば: ' + rel.map(x => esc(x.n)).join("・") + '</p>' : "") + '</div>';
    }else h += '<div class="ai-learn ai-hint">こたえると、その ことばの 意味と、つながる ことばが 出るよ</div>';
    const tag = weakSet.has(q.art) ? '<span class="ai-tag weak">💪 苦手ことば</span>' : revSet.has(q.art) ? '<span class="ai-tag rev">🔁 ふくしゅう</span>' : (pre && !pre.has(q.art) ? '<span class="ai-tag new">🆕 はじめまして</span>' : "");
    h += '<div class="ai-q"><span class="ai-ic">' + q.e + '</span><div><p class="spot">' + esc(q.n) + '</p>' + tag + '<small class="ai-cat">' + esc(q.c) + '</small>' +
         (q.al ? '<small class="ai-alt">読みかたは どれでも OK: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</small>' : "") + '</div></div>';
    return h;
  }
  /* ── 結果・図鑑の くわしい 情報: たとえば / つながる ことば / しくみ図の 📍 ── */
  function info(q, inZukan){
    const tag = inZukan ? "" : last && last.fresh.includes(q.art) ? '<span class="ai-tag new">🆕 はじめて 出会った</span>' : last && last.rev.includes(q.art) ? '<span class="ai-tag rev">🔁 ふくしゅう</span>' : "";
    const d = discovered(), p = nodeOf(q);
    let h = '<div class="ai-info">' + tag;
    if(q.ex) h += '<p class="ai-ex"><b>たとえば</b>' + q.exrb + '</p>';
    if(q.al) h += '<p class="ai-small">読みかた: ' + [q.r].concat(q.al).map(esc).join(" / ") + '</p>';
    const rel = (q.rel || []).map(id => BY.get(id)).filter(Boolean);
    if(rel.length) h += '<p class="ai-small">🔗 つながる ことば</p><div class="ai-chips">' + rel.map(x => d.has(x.art) ? chip(x) : '<button type="button" class="ai-chip lock" data-ai-term="' + esc(x.art) + '">❔ ？？？</button>').join("") + '</div>';
    h += '<p class="ai-small">📍 ' + esc(nodeLabel(q)) + ' に あるよ</p><div class="ai-mini">' + diagramSvg(p.key, { pin:p.node, small:true }) + '</div>';
    if(q.ty === "service") h += '<p class="ai-small ai-muted">🏢 サービス・会社の 名前です。中身や 名前が 変わることが あります' + (q.asOf ? "(" + esc(q.asOf) + "時点)" : "(" + esc(D.asOf) + "時点の 説明)") + '</p>';
    else if(q.asOf) h += '<p class="ai-small ai-muted">' + esc(q.asOf) + '時点の 説明です</p>';
    return h + '</div>';
  }

  /* ── ホーム: 見つけた ことば・称号・しくみ図・旅マップ ── */
  let diagCur = null;
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n), wk = weakList().length, td = todayWords().length, fv = favs().length;
    const jr = JR.map(J => { const all = pools[MODE_OF[J.id]], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + J.icon + " " + J.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + got + '</b> / ' + all.length + '</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%;--c:' + J.color + '"></i></li>'; }).join("");
    if(JOURNEY_OF[m]) diagCur = JBY[JOURNEY_OF[m]].diagram;
    if(!diagCur) diagCur = "car";
    $("#kabu-panel").innerHTML = '<section class="ai-panel">' +
      '<p class="ai-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '語 発見</p><div class="ai-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="ai-jr">' + jr + '</ul>' +
      '<p class="ai-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "語") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + '語</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + '語</small>' : "") + '</p>' +
      '<div class="ai-btns"><button type="button" class="ai-btn" data-ai-open="zukan">📖 部品図鑑</button>' +
      '<button type="button" class="ai-btn" data-ai-open="weak">💪 苦手ことば' + (wk ? "(" + wk + ")" : "") + '</button>' +
      '<button type="button" class="ai-btn" data-ai-open="quiz">🧩 4択クイズ</button>' +
      '<button type="button" class="ai-btn" data-ai-open="calc">🧮 計算問題</button>' +
      '<button type="button" class="ai-btn" data-ai-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      '<div class="ai-diag"><p class="ai-dh">🗺 しくみ図 <small>覚えた ことばが 📍に なるよ。場所を おすと 中身が 出るよ</small></p><div class="ai-dtabs">' +
      DIAGS.map(k => '<button type="button" data-ai-diag="' + k + '"' + (k === diagCur ? ' class="on"' : "") + '>' + D.diagrams[k].icon + " " + esc(D.diagrams[k].name) + '</button>').join("") +
      '</div><div class="ai-dbox">' + diagramSvg(diagCur, { counts:countsFor(diagCur) }) + '</div><div class="ai-dlist" id="ai-dlist"></div></div>' +
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
        '<p class="ai-lead">' + esc(J.lead) + '。1回 10問。入門は 新しい ことば 10問、3級からは 新しい ことば 7問 + ふくしゅう 3問。</p>';
    }else chips.innerHTML = '<p class="ai-lead">' + (m === "smas" ? "6つの 旅の ことばを ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10語。" :
      m === "sweak" ? "まちがえた ことばが 自動で 苦手ことばに なるよ。まちがえずに 打てたら 苦手から はずれるよ。" : "まちがえた・時間が かかった・ひさしぶりの ことばを 先に 出すよ。") + '</p>';
  }
  function lvInfo(m, i){
    if(m === "sfuku") return { name:"🔁 ふくしゅう", sub:"ひさしぶり・にがての 10語", short:"ふくしゅう" };
    if(m === "sweak") return { name:"💪 苦手克服", sub:"まちがえた ことば 10語", short:"苦手克服" };
    if(m === "smas") return { name:"マスター" + (i + 1), sub:"6つの 旅から 10語", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = J.stops[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + L.icon + L.name, sub:S.icon + " " + S.name + "・🆕" + s.fresh.length + (s.def.length ? " + 🔁" + s.def.length : ""), short:"Lv." + (i + 1) };
  }

  /* ── 部品図鑑(検索・旅・分類・むずかしさ・お気に入り・苦手で しぼれる) ── */
  let zf = { q:"", j:"", c:"", dv:"", fav:false, weak:false, shown:90 };
  const normQ = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/\s/g, "");
  function sheet(id){
    let sh = document.getElementById(id);
    if(!sh){ sh = document.createElement("div"); sh.id = id; sh.className = "prof-sheet ai-sheet"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeSheet(id); }); }
    sh.classList.remove("hidden"); document.body.classList.add("ai-lock"); return sh;
  }
  function closeSheet(id){ const sh = document.getElementById(id); if(sh) sh.classList.add("hidden"); if(!document.querySelector(".ai-sheet:not(.hidden)")) document.body.classList.remove("ai-lock"); }
  function openZukan(pre2){ if(pre2) Object.assign(zf, { q:"", j:"", c:"", dv:"", fav:false, weak:false }, pre2); zf.shown = 90; sheet("ai-zk"); drawZukan(); }
  function drawZukan(){
    const sh = document.getElementById("ai-zk"), d = discovered(), fv = new Set(favs()), wk = new Set(weakList().map(q => q.art)), qq = normQ(zf.q);
    const list = ALL.filter(q => (!zf.j || q.j === zf.j) && (!zf.c || q.c === zf.c) && (!zf.dv || q.dv === +zf.dv) && (!zf.fav || fv.has(q.art)) && (!zf.weak || wk.has(q.art)) &&
      (!qq || [q.n, q.r].concat(q.al || [], [q.ds]).some(x => normQ(x).includes(qq))));
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    const cats = [...new Set(ALL.filter(q => !zf.j || q.j === zf.j).map(q => q.c))];
    const scroll = sh.scrollTop, focused = document.activeElement && document.activeElement.id === "ai-zq";
    sh.innerHTML = '<div class="prof-box ai-zbox"><button type="button" class="ai-x" aria-label="とじる">×</button><h2>📖 部品図鑑</h2>' +
      '<p class="ai-zsum"><b>' + got + '</b> / ' + list.length + '語 発見</p>' +
      '<input type="search" id="ai-zq" class="ai-search" placeholder="🔍 さがす(例: ピストン)" value="' + esc(zf.q) + '" autocomplete="off" enterkeyhint="search">' +
      '<div class="ai-zf"><select id="ai-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name.replace("シャシ(足まわり)", "シャシ").replace("工具・点検・法令", "工具・点検"), zf.j)).join("") + '</select>' +
      '<select id="ai-zc">' + opt("", "🏷 分類", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="ai-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="ai-ztog"><button type="button" data-t="fav"' + (zf.fav ? ' class="on"' : "") + '>⭐ お気に入り</button><button type="button" data-t="weak"' + (zf.weak ? ' class="on"' : "") + '>💪 苦手ことば</button></div>' +
      (zf.fav && list.length ? '<button type="button" class="ai-btn ai-wide" data-ai-practice="fav">⭐ お気に入りを 練習する(' + Math.min(ROUNDS, list.length) + '問)</button>' : "") +
      (zf.weak && list.length ? '<button type="button" class="ai-btn ai-wide" data-ai-practice="weak">💪 苦手克服を はじめる</button>' : "") +
      (list.length ? "" : '<p class="ai-empty">' + (zf.fav ? "⭐ まだ お気に入りが ないよ。ことばの ページの ☆ を おすと 入るよ" : zf.weak ? "💪 いまは 苦手ことばが ないよ。すごい！" : "見つからなかったよ") + '</p>') +
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
        '<p class="ai-st">出会った回数 ' + e[0] + '回' + (e[1] ? '・まちがい ' + e[1] + '回' : "") + (weakList().includes(q) ? "・💪 苦手ことば" : "") + '</p>'
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
     ・はんい: 出会った ことば / 級ごと(入門・3級・2級・1級)/ ぜんぶ。旅でも しぼれる
     ・出会った ことばを まちがえたら 苦手ことばに 入る(💪 苦手克服で もう一度 出る) */
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
        (Q.miss.length ? '<p class="ai-small">🔁 まちがえた ことば(おすと 説明が 読めるよ)</p><div class="ai-chips">' + Q.miss.map(q => chip(q)).join("") + '</div>' +
          (Q.miss.some(q => discovered().has(q.art)) ? '<p class="ai-small ai-muted">出会った ことばは 💪 苦手ことばに 入れたよ</p>' : "") : "") +
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
      const L = log(), e = L[it.q.art];  // 出会った ことばだけ 苦手に する(まだの ことばは 図鑑に 出さない)
      if(e){ L[it.q.art] = [e[0], e[1] + 1, 1, e[3], Date.now(), e[5]]; save(L); }
    }
    drawQuiz();
  }

  /* ── 🧮 計算問題(けいくん 2026-09-26「計算問題は追加出来る？」→「1」= 4択)──
     ・整備士の 試験で よく 出る 形の 計算を、数字を 毎回 かえて 出す(**問題も 答えも プログラムが 作る**。過去問は 写さない)
     ・まちがいの 3つは「よく ある まちがい」から 作る(÷4 わすれ・2乗 わすれ・単位の なおし わすれ・逆に 割る など)
     ・答えた あとに 式と 途中の 計算を 出す。円周率は 3.14
     ・1つの 問題 = { g:なかま, lv:"3級"/"2級", q:問題文, a:答え, d:小数の けた, u:単位, w:[まちがい…], ex:[とき方…] } */
  const PI = 3.14;
  const ri = (a, b, st) => { st = st || 1; return a + st * Math.floor(Math.random() * (Math.floor((b - a) / st) + 1)); };
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const nf = (x, d) => Number(x.toFixed(d)).toLocaleString("ja-JP", { maximumFractionDigits:d, minimumFractionDigits:0 });
  const CALC_G = [["engine", "🔥 エンジン"], ["gear", "⚙️ 歯車・速さ"], ["force", "🔧 ちから・出力"], ["brake", "🛑 ブレーキ"], ["elec", "⚡ 電気"], ["measure", "📏 はかる"]];
  const CALC = [
    () => { const B = pk([72, 75, 78, 80, 82, 84, 86, 88, 90]), S = ri(70, 94, 2), n = pk([3, 4, 6]), v1 = PI / 4 * B * B * S / 1000, t = v1 * n;
      return { g:"engine", lv:"3級", q:"ボア(シリンダーの 内径)" + B + "mm、ストローク " + S + "mm の " + n + "気筒 エンジン。総排気量は およそ いくつ？", a:t, d:0, u:"cm³",
        w:[v1, PI * B * B * S / 1000 * n, PI / 4 * B * B * S * n / 100],
        ex:["1気筒の 行程容積 = π/4 × ボア² × ストローク", "= 3.14 ÷ 4 × " + B + "² × " + S + " = " + nf(v1 * 1000, 0) + " mm³ = " + nf(v1, 1) + " cm³(mm³ を ÷1000 で cm³ に)", "総排気量 = " + nf(v1, 1) + " × " + n + "気筒 = " + nf(t, 0) + " cm³"] }; },
    () => { const e = pk([8, 9, 10, 10.5, 11, 12]), Vc = pk([40, 44, 46, 50, 52, 56, 60]), Vs = (e - 1) * Vc;
      return { g:"engine", lv:"3級", q:"1気筒の 行程容積 " + nf(Vs, 0) + " cm³、燃焼室容積 " + Vc + " cm³ の エンジン。圧縮比は いくつ？", a:e, d:1, u:"",
        w:[Vs / Vc, e + 1, (Vs + Vc) / Vs],
        ex:["圧縮比 = (行程容積 + 燃焼室容積)÷ 燃焼室容積", "= (" + nf(Vs, 0) + " + " + Vc + ")÷ " + Vc + " = " + nf(e, 1), "⚠️ 行程容積 ÷ 燃焼室容積 だけだと 1 小さく なる"] }; },
    () => { const Vs = pk([400, 450, 500, 540]), e = pk([9, 10, 11]), Vc = Vs / (e - 1);
      return { g:"engine", lv:"2級", q:"1気筒の 行程容積 " + Vs + " cm³、圧縮比 " + e + " の エンジン。燃焼室容積は およそ いくつ？", a:Vc, d:1, u:"cm³",
        w:[Vs / e, Vs / (e + 1), Vs * (e - 1) / 10],
        ex:["圧縮比 = (行程容積 + 燃焼室容積)÷ 燃焼室容積 なので", "燃焼室容積 = 行程容積 ÷(圧縮比 − 1)", "= " + Vs + " ÷(" + e + " − 1)= " + nf(Vc, 1) + " cm³"] }; },
    () => { const a1 = ri(14, 20), b1 = ri(28, 44), a2 = ri(14, 20), b2 = ri(30, 48), r = b1 / a1 * b2 / a2;
      return { g:"gear", lv:"3級", q:"歯車A(歯数 " + a1 + ")が 歯車B(歯数 " + b1 + ")を 回し、Bと 同じ 軸の 歯車C(歯数 " + a2 + ")が 歯車D(歯数 " + b2 + ")を 回す。AからDまでの 減速比は？", a:r, d:2, u:"",
        w:[a1 / b1 * a2 / b2, b1 / a1 + b2 / a2, (b1 + b2) / (a1 + a2)],
        ex:["減速比 = 回される 歯車の 歯数 ÷ 回す 歯車の 歯数(段ごとに かける)", "= (" + b1 + " ÷ " + a1 + ")×(" + b2 + " ÷ " + a2 + ")", "= " + nf(b1 / a1, 3) + " × " + nf(b2 / a2, 3) + " = " + nf(r, 2)] }; },
    () => { const g = pk([3.5, 2.1, 1.4, 1.0, 0.8]), f = pk([3.9, 4.1, 4.3]), N = ri(1800, 3600, 200), o = N / (g * f);
      return { g:"gear", lv:"2級", q:"エンジン回転 " + N + " rpm、変速比 " + g + "、最終減速比 " + f + "。ドライブシャフト(タイヤ)の 回転数は およそ いくつ？", a:o, d:0, u:"rpm",
        w:[N / g, N / (g + f), N / f * g],
        ex:["総減速比 = 変速比 × 最終減速比 = " + g + " × " + f + " = " + nf(g * f, 2), "タイヤの 回転数 = エンジン回転 ÷ 総減速比", "= " + N + " ÷ " + nf(g * f, 2) + " = " + nf(o, 0) + " rpm"] }; },
    () => { const N = ri(2000, 4000, 500), g = pk([0.8, 1.0, 1.2]), f = pk([3.8, 4.0, 4.2]), C = pk([1.8, 1.9, 2.0]), v = N / (g * f) * C * 60 / 1000;
      return { g:"gear", lv:"2級", q:"エンジン回転 " + N + " rpm、変速比 " + g + "、最終減速比 " + f + "、タイヤが 1回転で 進む きょり " + C + " m。車の 速さは およそ いくつ？", a:v, d:1, u:"km/h",
        w:[v / 60, v * f, N / g * C / 1000],
        ex:["タイヤの 回転数 = " + N + " ÷(" + g + " × " + f + ")= " + nf(N / (g * f), 1) + " 回/分", "1分で 進む きょり = " + nf(N / (g * f), 1) + " × " + C + " = " + nf(N / (g * f) * C, 0) + " m", "1時間(60分)で → × 60 ÷ 1000 = " + nf(v, 1) + " km/h"] }; },
    () => { const F = ri(100, 500, 50), L = ri(20, 50, 5), T = F * L / 100;
      return { g:"force", lv:"3級", q:"長さ " + L + " cm の レンチの 先に " + F + " N の ちからを かけた。ボルトに かかる トルクは いくつ？", a:T, d:1, u:"N・m",
        w:[F * L, F / (L / 100), F * L / 1000],
        ex:["トルク = ちから × 腕の 長さ(m)", L + " cm = " + nf(L / 100, 2) + " m", "= " + F + " × " + nf(L / 100, 2) + " = " + nf(T, 1) + " N・m"] }; },
    () => { const T = ri(120, 300, 10), N = ri(2000, 6000, 500), P = 2 * PI * N * T / 60 / 1000;
      return { g:"force", lv:"2級", q:"エンジン回転 " + N + " rpm で トルク " + T + " N・m。この ときの 出力は およそ いくつ？", a:P, d:1, u:"kW",
        w:[N * T / 60 / 1000, 2 * PI * N * T / 1000, 2 * PI * N * T / 60 / 100],
        ex:["出力(W) = 2π × 1秒の 回転数 × トルク", "1秒の 回転数 = " + N + " ÷ 60 = " + nf(N / 60, 2), "= 2 × 3.14 × " + nf(N / 60, 2) + " × " + T + " = " + nf(P * 1000, 0) + " W = " + nf(P, 1) + " kW"] }; },
    () => { const Dm = 20, Dw = pk([30, 40, 50, 60]), F = ri(500, 1500, 100), k = (Dw / Dm) ** 2, W = F * k;
      return { g:"brake", lv:"2級", q:"マスターシリンダーの ピストン 直径 " + Dm + " mm に " + F + " N の ちからが かかった。直径 " + Dw + " mm の ホイールシリンダーの ピストンが 押す ちからは？", a:W, d:0, u:"N",
        w:[F * Dw / Dm, F / k, F],
        ex:["パスカルの 原理: 液の 圧力は どこも 同じ → ちからは ピストンの 面積に 比例", "面積は 直径の 2乗に 比例 → (" + Dw + " ÷ " + Dm + ")² = " + nf(k, 2) + " 倍", "= " + F + " × " + nf(k, 2) + " = " + nf(W, 0) + " N"] }; },
    () => { const F = ri(100, 300, 20), L1 = ri(25, 36), L2 = ri(5, 8), O = F * L1 / L2;
      return { g:"brake", lv:"3級", q:"支点から ペダルを 踏む 所まで " + L1 + " cm、支点から プッシュロッドまで " + L2 + " cm。ペダルを " + F + " N で 踏むと、プッシュロッドを 押す ちからは？", a:O, d:0, u:"N",
        w:[F * L2 / L1, F * (L1 + L2) / L2, F * L1 / L2 / 2],
        ex:["てこの 原理: ちから × 支点からの きょり が つりあう", "押す ちから = " + F + " × " + L1 + " ÷ " + L2, "= " + nf(O, 0) + " N(" + nf(L1 / L2, 2) + " 倍)"] }; },
    () => { const v1 = pk([40, 50, 60]), d1 = ri(12, 30), k = pk([1.5, 2, 3]), d2 = d1 * k * k;
      return { g:"brake", lv:"2級", q:"時速 " + v1 + " km の とき 制動距離が " + d1 + " m の 車。同じ ブレーキの ききで 時速 " + nf(v1 * k, 0) + " km だと 制動距離は およそ？", a:d2, d:1, u:"m",
        w:[d1 * k, d1 * k * k * k, d1 * (k + 1)],
        ex:["制動距離は 速さの 2乗に 比例", "速さは " + k + " 倍 → 制動距離は " + k + "² = " + nf(k * k, 2) + " 倍", "= " + d1 + " × " + nf(k * k, 2) + " = " + nf(d2, 1) + " m"] }; },
    () => { const V = pk([12, 24]), P = pk(V === 12 ? [21, 27, 36, 48, 55, 60, 72] : [48, 60, 72, 96, 120]), I = P / V;
      return { g:"elec", lv:"3級", q:V + " V で " + P + " W の ランプを 点けると、流れる 電流は およそ いくつ？", a:I, d:2, u:"A",
        w:[P * V, V / P, P - V],
        ex:["電力(W)= 電圧(V)× 電流(A)なので", "電流 = 電力 ÷ 電圧 = " + P + " ÷ " + V + " = " + nf(I, 2) + " A"] }; },
    () => { const [R1, R2] = pk([[2, 2], [3, 6], [4, 4], [6, 12], [10, 15], [4, 12], [6, 3], [12, 12]]), par = Math.random() < .7, R = par ? R1 * R2 / (R1 + R2) : R1 + R2;
      return { g:"elec", lv:"3級", q:R1 + " Ω と " + R2 + " Ω の 抵抗を " + (par ? "並列" : "直列") + "に つないだ。合成抵抗は いくつ？", a:R, d:2, u:"Ω",
        w:par ? [R1 + R2, (R1 + R2) / 2, R1 * R2] : [R1 * R2 / (R1 + R2), (R1 + R2) / 2, R1 * R2],
        ex:par ? ["並列: 合成抵抗 = (R1 × R2)÷(R1 + R2)", "= (" + R1 + " × " + R2 + ")÷(" + R1 + " + " + R2 + ")= " + nf(R, 2) + " Ω", "並列に すると どちらの 抵抗よりも 小さく なる"] : ["直列: 合成抵抗 = R1 + R2", "= " + R1 + " + " + R2 + " = " + R + " Ω"] }; },
    () => { const R = pk([2, 3, 4, 6, 8, 12, 24]), V = 12, I = V / R;
      return { g:"elec", lv:"3級", q:"12 V の 電源に " + R + " Ω の 負荷を つないだ。流れる 電流は？", a:I, d:2, u:"A",
        w:[V * R, R / V, V - R],
        ex:["電流 = 電圧 ÷ 抵抗", "= 12 ÷ " + R + " = " + nf(I, 2) + " A"] }; },
    () => { const Ah = pk([36, 40, 48, 52, 60]), I = pk([2, 3, 4, 5, 6]), h = Ah / I;
      return { g:"elec", lv:"3級", q:"容量 " + Ah + " Ah の バッテリーで " + I + " A の 電流を 流しつづけると、およそ 何時間 もつ？(計算の 上で)", a:h, d:1, u:"時間",
        w:[Ah * I, I / Ah, Ah - I],
        ex:["容量(Ah)= 電流(A)× 時間(h)なので", "時間 = " + Ah + " ÷ " + I + " = " + nf(h, 1) + " 時間", "⚠️ 本当は 温度や 電池の 状態で 短く なる"] }; },
    () => { const m = ri(10, 60), k = ri(1, 19), v = m + k * 0.05;
      return { g:"measure", lv:"3級", q:"最小読み取り 0.05 mm の ノギス。バーニヤの 0 が 本尺の " + m + " mm を 少し こえた 所に あり、バーニヤの " + k + " 本目の 線が 本尺の 線と ぴったり 重なった。読みは？", a:v, d:2, u:"mm",
        w:[m + k * 0.1, m + k * 0.01, m + k * 0.02],
        ex:["読み = 本尺の 読み + 重なった 線の 番号 × 最小読み取り", "= " + m + " + " + k + " × 0.05", "= " + nf(v, 2) + " mm"] }; },
    () => { const m = ri(5, 24), h = Math.random() < .5 ? 0.5 : 0, t = ri(1, 49), v = m + h + t * 0.01;
      return { g:"measure", lv:"3級", q:"マイクロメーター。スリーブで " + m + " mm の 目盛が 見え、その 先の 0.5 mm の 線は " + (h ? "見えている" : "まだ 見えない") + "。シンブルの 目盛は " + t + "。読みは？", a:v, d:2, u:"mm",
        w:[h ? m + t * 0.01 : m + 0.5 + t * 0.01, m + h + t * 0.1, m + h + t * 0.001],
        ex:["読み = スリーブの 読み(0.5 mm の 線も 見る)+ シンブル × 0.01", "= " + m + (h ? " + 0.5" : "") + " + " + t + " × 0.01", "= " + nf(v, 2) + " mm"] }; },
  ];
  /* 4つの 答え(正しい 答え + まちがい 3つ)。同じ 表示に なった まちがいは べつの 数に かえる */
  function calcMake(gen){
    const P = gen(), show = x => nf(x, P.d) + (P.u ? " " + P.u : ""), A = show(P.a), seen = new Set([A]), ch = [{ t:A, ok:true }];
    for(const x of P.w.concat([P.a * 1.5, P.a * 0.5, P.a * 2, P.a * 0.8, P.a * 1.25])){
      if(ch.length >= 4) break;
      if(!isFinite(x) || x <= 0) continue;
      const s = show(x); if(seen.has(s)) continue;
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
      h += '<p class="ai-qlead">整備士の 試験に よく 出る 形の 計算だよ。数字は 毎回 かわるので、何回でも 新しい 問題に なるよ。答えた あとに とき方が 出るよ。' + QN + '問。</p>' +
        '<div class="ai-zf ai-qset" style="grid-template-columns:1fr"><select id="ai-cg"><option value="">🧮 ぜんぶの なかま</option>' +
        CALC_G.map(([v, l]) => '<option value="' + v + '"' + (cset.g === v ? " selected" : "") + '>' + esc(l) + '</option>').join("") + '</select></div>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">はじめる</button>' +
        '<p class="ai-note">円周率は 3.14 で 計算します。問題は この ゲームが 作った もので、本物の 試験の 問題では ありません。電卓を 使っても OK。</p>';
    }else if(C.i >= C.list.length){
      h += '<p class="ai-qres">' + C.ok + ' / ' + C.list.length + ' 問 正解！' + (C.ok === C.list.length ? " 🎉" : "") + '</p>' +
        '<button type="button" class="ai-btn ai-wide ai-go" data-ai-cstart="1">もう一度(新しい 数字で)</button><button type="button" class="ai-btn ai-wide" data-ai-open="calc">なかまを えらびなおす</button>';
    }else{
      const P = C.list[C.i], done = C.picked !== null;
      h += '<p class="ai-qn">' + (C.i + 1) + ' / ' + C.list.length + '　<span>' + esc(GN[P.g]) + ' ・ ' + esc(P.lv) + 'めやす</span></p><p class="ai-qq">' + esc(P.q) + '</p>' +
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
    const t = e.target.closest && e.target.closest("[data-ai-term],[data-ai-open],[data-ai-diag],[data-ai-retry],[data-ai-fav],[data-ai-back],[data-ai-more],[data-ai-practice],[data-ai-ans],[data-ai-qstart],[data-ai-qnext],[data-ai-cstart],[data-ai-cnext],[data-ai-cans],.ai-node");
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
    if(t.dataset.aiQnext){ quiz.i++; quiz.picked = null; const sh = document.getElementById("ai-qz"); drawQuiz(); if(sh) sh.scrollTop = 0; return; }
    if(t.dataset.aiOpen){
      const o = t.dataset.aiOpen;
      if(o === "zukan") return openZukan({});
      if(o === "weak") return openZukan({ weak:true });
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
      if(o === "calc") return openCalc();
    }
    if(t.dataset.aiPractice){
      const list = t.dataset.aiPractice === "fav" ? favs().map(id => BY.get(id)) : null;
      ["ai-zk", "ai-zdt"].forEach(closeSheet);
      if(list){ pre = discovered(); revSet = new Set(list.map(q => q.art)); weakSet = new Set(); runMiss = {}; start(mode, level, list.slice(0, ROUNDS).sort(easy)); }
      else { setMode("sweak"); start("sweak", 0); }
      return;
    }
    if(t.dataset.aiRetry){
      if(!lastMissed.length) return;
      pre = discovered(); revSet = new Set(); weakSet = new Set(lastMissed.map(q => q.art)); runMiss = {};
      return start(mode, level, lastMissed.slice());
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
.ai-panel{background:linear-gradient(160deg,#fff7ed 0%,#f1f5f9 55%,#eff6ff 100%);border:1px solid #fed7aa;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#1e1b4b}
.ai-total{margin:0;font-weight:900;font-size:16px}.ai-total b{font-size:28px;color:#d9480f;font-variant-numeric:tabular-nums}
.ai-bar,.ai-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.ai-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#d9480f,#e67700,#1971c2);border-radius:99px}
.ai-jr i::after{content:"";position:absolute;inset:0;width:var(--w);background:var(--c);border-radius:99px}
.ai-jr{list-style:none;margin:0;padding:0;display:grid;gap:2px}
.ai-jr li{display:grid;grid-template-columns:1fr auto;font-size:13px;align-items:baseline;gap:4px}.ai-jr .rn{font-weight:800}.ai-jr i{grid-column:1/-1;height:6px;margin:2px 0 5px}
.ai-jr .rc{font-variant-numeric:tabular-nums;color:#64748b}.ai-jr .rc b{color:#1e1b4b}
.ai-title{margin:8px 0 10px;font-size:14px}.ai-title small{display:block;color:#64748b;font-size:12px;margin-top:2px}
.ai-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ai-btn{padding:11px 8px;border-radius:14px;border:1.5px solid #c7d2fe;background:#fff;color:#1e1b4b;font:inherit;font-weight:800;font-size:14px;cursor:pointer}
.ai-btn:active{transform:translateY(1px)}.ai-wide{width:100%;margin-top:10px}
.ai-diag{margin-top:14px;background:#fff;border:1px solid #e0e7ff;border-radius:16px;padding:10px}
.ai-dh{margin:0 0 6px;font-weight:900;font-size:14px}.ai-dh small{display:block;font-weight:600;color:#64748b;font-size:11.5px}
.ai-dtabs{display:flex;gap:6px;overflow-x:auto;margin:0 0 8px;padding-bottom:2px}
.ai-dtabs button{flex:none;padding:6px 10px;border-radius:99px;border:1.5px solid #e2e8f0;background:#f8fafc;color:#334155;font:inherit;font-size:12px;font-weight:800}
.ai-dtabs button.on{background:#d9480f;border-color:#d9480f;color:#fff}
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
.ai-tag{display:inline-block;margin-top:4px;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:99px}.ai-tag.new{background:#fef3c7;color:#92400e}.ai-tag.rev{background:#fce7f3;color:#9d174d}.ai-tag.weak{background:#ffedd5;color:#9a3412}
.ai-info{margin-top:8px}.ai-info .ai-tag{margin:0 0 6px}
.ai-ex{font-size:13.5px;line-height:2;margin:6px 0;background:#f0f9ff;border-radius:10px;padding:6px 10px;color:#0c4a6e}.ai-ex b{display:inline-block;font-size:11.5px;background:#0ea5e9;color:#fff;border-radius:99px;padding:0 8px;margin-right:6px;line-height:1.8}
.ai-small{font-size:12.5px;font-weight:800;margin:8px 0 2px;color:#334155}.ai-muted{color:#64748b;font-weight:600}
.ai-mini{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:4px;max-width:360px}
.pins-msg .ai-r1{display:block}.pins-msg small{display:block;font-weight:700;color:var(--muted);font-size:13px}
.ai-earn{display:block;margin-top:8px;font-size:16px;color:#b45309;animation:aiIn .5s ease-out}
.ai-today{display:block;margin-top:10px;background:#fff;border:1px solid #e0e7ff;border-radius:14px;padding:8px 10px;text-align:left}.ai-today b{display:block;font-size:14px;color:#312e81}.ai-today .ai-chips{display:flex}
.ai-retry{display:block;width:100%;margin:10px 0 2px;padding:12px;border-radius:14px;border:0;background:linear-gradient(90deg,#d9480f,#1971c2);color:#fff;font:inherit;font-weight:900;font-size:15px;cursor:pointer}
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
.ai-qlead{font-size:13.5px;line-height:1.8;margin:4px 0 10px}.ai-qset{grid-template-columns:1fr 1fr}.ai-go{background:#d9480f;border-color:#d9480f;color:#fff}
.ai-qn span{font-size:11px}.ai-qch .ai-btn b{display:inline-block;min-width:1.4em;color:#d9480f}.ai-qch.long .ai-btn{font-size:13px;font-weight:600;line-height:1.6}
.ai-qch .ai-btn:disabled{opacity:1;color:#1e1b4b}.ai-qch .ai-btn.ok b,.ai-qch .ai-btn.ng b{color:inherit}
.ai-qfb2{margin:10px 0 0;border-radius:12px;padding:8px 10px;font-size:13px;line-height:1.7}.ai-qfb2.ok{background:#dcfce7}.ai-qfb2.ng{background:#fee2e2}.ai-qfb2 p{margin:4px 0 0}.ai-cex{margin:6px 0 0;padding-left:1.4em}.ai-cex li{margin:2px 0}.ai-btns .ai-btn:last-child:nth-child(odd){grid-column:1/-1}
.ai-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.ai-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.ai-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  // noRank: ふくしゅう・苦手克服(毎回 ちがう 10問)と レベル61より 上(かずともの 表は 1〜60)は 送らない
  return { kind:"seibiterm", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), retarget,
           noRank:(m, lv) => !RANK_READY || m === "sfuku" || m === "sweak" || lv >= 60, noBoard:!RANK_READY, openZukan, diagramSvg };
})();
