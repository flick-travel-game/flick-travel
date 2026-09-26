/* 英会話フリック旅行: 英単語と 日常英会話を フリックで 打ち写して 旅する。(けいくん 2026-09-26)
   ─ 土台の index.html(世界フリック旅行)の 差しこみ口(PLUG)に「英語の 旅」を 足す ファイル。eikaiwa/ の ページだけが 読む ─
   ことばは data/english.json → tools/build_games.py が eikaiwa/english.js(EN_WORDS)に する。**ことばを 足す・直すのは data/english.json だけ**
   ・旅: 🌱 入門 / 📘 初級 / 🧭 中級 / 🌐 上級 の 英単語 + 💬 日常英会話(場面ごと)。+ 🏆 マスター(ぜんぶ)・🔁 ふくしゅう・💪 苦手克服
   ・1回は かならず 10問。入門の 英単語は 新しい ことば 10問、ほかは 新しい ことば + ふくしゅう で 10問
   ・打つのは 英字だけ。大文字・小文字は 区別しない。空白・' , . ? ! - は 打たなくても すすむ(norm)
   ・こたえると 次の 問題の 上に 意味(と 返事の 例)が 出る。🔊 で 発音(ブラウザの 読み上げ。サーバーも お金も 要らない)
   ⚠️ 英検・TOEIC の めやすは 出さない(けいくん 2026-09-26「勉強してる感が強くなるので表記しない方がいい」)
   ⚠️ 株式(kabu/kabu.js)・AI(ai/ai.js)と 同じ 差しこみ口を 使う。ほかの ゲームには EIKAIWA が 無いので 何も 変わらない */
const EIKAIWA = (() => {
  const D = EN_WORDS;
  const ROUNDS = 10, REV = 3;
  const RANK_READY = true;  // かずともの FLICK_MODES に ew1 ew2 ew3 ew4 etalk emas を 足したら true。false だと ランキングを 出さない・送らない
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => n.toLocaleString("ja-JP");
  const JR = D.journeys, JBY = Object.fromEntries(JR.map(j => [j.id, j]));
  const LVN = Object.fromEntries(D.levels.map(l => [l.difficulty, l]));
  const SC = D.scenes, SCBY = Object.fromEntries(SC.map(s => [s.id, s]));
  const MODE_OF = { w1:"ew1", w2:"ew2", w3:"ew3", w4:"ew4", talk:"etalk" };
  const JOURNEY_OF = Object.fromEntries(Object.entries(MODE_OF).map(([j, m]) => [m, j]));

  /* ── 打つ 字: 小文字の 英字と 数字だけ(tools/eikaiwa/english_js.py の typed と 同じ) ── */
  const norm = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");

  /* ── ことば → 問題(土台の SPOTS と 同じ形: n 名前 / r 打つ字 / art キー / c 小見出し / d 説明 / e 絵文字) ── */
  const ALL = D.list.map((o, i) => {
    const j = JBY[o.j], L = LVN[o.dv];
    const sub = o.k === "word" ? o.pos + " ・ " + o.c : SCBY[o.sc].icon + " " + o.c;
    return Object.assign({}, o, { art:o.id, k:"english", kind:o.k, n:o.t, ord:i, jr:j,
      d:(o.k === "word" ? '<span class="en-pos">' + esc(o.pos) + '</span>' : "") + o.mrb,
      c:j.icon + " " + j.name + " ・ " + sub + " ・ " + L.icon + " " + L.name });
  });
  const BY = new Map(ALL.map(q => [q.art, q]));
  const TOTAL = ALL.length;
  const easy = (a, b) => a.r.length - b.r.length;

  /* ── 旅の ステージを 組む ──
     英単語: 入門の 旅は 10語ずつ。ほかは 新しい 7語 + ふくしゅう 3語(前の 旅の ことばも ふくしゅうに 出る)
     日常英会話: 場面ごとに 立ち寄る。さいしょの 場面は 10文ずつ、そのあとは 新しい 文 + ふくしゅう */
  const levels = {}, pools = {}, stageInfo = {}, maps = {}, colors = {};
  let introduced = [];  // これまでの 旅で 出た ことば(きろくが まだ 無い人の ふくしゅうの 候補)。英単語と 英会話で 分ける
  const introBy = {};
  function defaults(n, avoid){
    const def = [], L0 = introduced.length;
    for(const back of [4, 12, 25, 45, 70, 100]){  // 少し前・だいぶ前・ずっと前
      if(def.length >= n) break;
      const q = introduced[Math.max(0, L0 - back)];
      if(q && !def.includes(q) && !avoid.has(q)) def.push(q);
    }
    for(let x = L0 - 1; def.length < n && x >= 0; x--) if(!def.includes(introduced[x]) && !avoid.has(introduced[x])) def.push(introduced[x]);
    return def;
  }
  function chunk(news, per, info, lv, stopOf){
    const S = Math.ceil(news.length / per);
    let p = 0;
    for(let k = 0; k < S; k++){
      const nNew = Math.floor(news.length / S) + (k < news.length % S ? 1 : 0);
      const fresh = news.slice(p, p + nNew); p += nNew;
      const def = defaults(ROUNDS - fresh.length, new Set(fresh));
      info.push({ fresh, def, dv:fresh[0].dv, stop:stopOf ? stopOf(k, S) : 0 });
      lv.push(arrange(fresh, def));
      introduced = introduced.concat(fresh);
    }
  }
  for(const J of JR){
    const m = MODE_OF[J.id], terms = ALL.filter(q => q.j === J.id);
    const lv = [], info = [];
    introduced = introBy[J.kind] || [];
    if(J.kind === "phrase"){
      SC.forEach((S, si) => {
        const news = terms.filter(q => q.sc === S.id).sort((a, b) => a.dv - b.dv || a.ord - b.ord);
        if(news.length) chunk(news, si === 0 && !introduced.length ? ROUNDS : ROUNDS - REV - 1, info, lv, () => si);
      });
    }else{
      const per = J.first ? ROUNDS : ROUNDS - REV;
      chunk(terms, per, info, lv, null);
      info.forEach((s, k) => { s.stop = Math.min(J.stops.length - 1, Math.floor(k * J.stops.length / info.length)); });
    }
    introBy[J.kind] = introduced;
    levels[m] = lv; stageInfo[m] = info; pools[m] = terms; colors[m] = J.color;
    maps[m] = { icon:J.icon, name:J.name, cardName:J.name, title:"", word:"英単語帳", thing:"ことば", unit:J.kind === "phrase" ? "文" : "語", doneWord:"出会った ことば", miss:"まだ 出会っていない ことば",
                lvTitle:J.icon + " " + J.name + "　旅を すすめる",
                card:(mm, done) => '<small>' + terms.length + (J.kind === "phrase" ? "文" : "語") + '・' + lv.length + 'ステージ</small><small>出会った ' + done + '</small>' };
  }
  function arrange(fresh, rev){
    const out = fresh.slice().sort(easy);
    const slots = [2, 5, 8, 1, 4, 7, 9, 3, 6, 0];
    rev.forEach((q, i) => out.splice(Math.min(slots[i], out.length), 0, q));
    return out.slice(0, ROUNDS);
  }
  /* マスター: ぜんぶ まぜて(きまった ならび。どの ステージも いつも 同じ 10問 = タイムを くらべられる) */
  {
    const h = s => { let x = 7; for(const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return x; };
    const mix = ALL.slice().sort((a, b) => a.dv - b.dv || h(a.art) - h(b.art));
    const lv = [];
    for(let i = 0; i + ROUNDS <= mix.length; i += ROUNDS) lv.push(mix.slice(i, i + ROUNDS).sort(easy));
    const rest = mix.length % ROUNDS;
    if(rest) lv.push(mix.slice(-rest - (ROUNDS - rest)).sort(easy));
    levels.emas = lv; pools.emas = ALL; colors.emas = "#e0202e";
    maps.emas = { icon:"🏆", name:"マスター", cardName:"マスター", word:"英単語帳", thing:"ことば", unit:"こ", doneWord:"出会った ことば",
                  lvTitle:"🏆 マスター　英単語と 英会話を まぜて ぜんぶ",
                  card:() => '<small>' + fmt(TOTAL) + 'こ・' + lv.length + 'ステージ</small><small>単語も 会話も はば広く</small>' };
  }
  /* ふくしゅう / 苦手克服(その人の きろくから 毎回 えらぶ 10問) */
  const starter = () => ALL.filter(q => q.j === JR[0].id).slice(0, ROUNDS);
  for(const [m, icon, name, color, sub] of [["efuku", "🔁", "ふくしゅう", "pink", "毎回 ちがう 10問"], ["eweak", "💪", "苦手克服", "orange", "苦手ことばを 10問"]]){
    levels[m] = [starter()]; pools[m] = ALL; colors[m] = color;
    maps[m] = { icon, name, cardName:name, word:"英単語帳", thing:"ことば", unit:"こ", doneWord:"出会った ことば",
                lvTitle:icon + " " + name + "　" + (m === "efuku" ? "ひさしぶり・時間がかかった ことばを もう一度" : "まちがえた ことばだけ 10問"),
                card:() => '<small>' + sub + '</small><small>' + (m === "eweak" ? "苦手 " + weakList().length + "こ" : discovered().size < ROUNDS ? "まず 旅で 10こ 出会おう" : "出会った " + discovered().size + "こ") + '</small>' };
  }
  const MODES_ALL = ["ew1", "etalk", "ew2", "ew3", "ew4", "emas", "efuku", "eweak"];

  /* ── 🔊 発音(ブラウザに 入っている 読み上げ。音が 出ない 端末でも あそべる) ──
     ⚠️ iPhone は タップの 中で 1回 鳴らすまで 音が 出ない → 旅を はじめる ボタンの ところで 音なしで 1回 鳴らしておく(unlock) */
  const TTS = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function";
  let voice = null, unlocked = false;
  function pickVoice(){
    try{
      const vs = speechSynthesis.getVoices(), us = vs.filter(v => /^en[-_]US/i.test(v.lang));
      voice = us.find(v => /Samantha|Google US English|Aria|Jenny/i.test(v.name)) || us[0] || vs.find(v => /^en/i.test(v.lang)) || null;
    }catch(e){ voice = null; }
  }
  if(TTS){ pickVoice(); try{ speechSynthesis.addEventListener("voiceschanged", pickVoice); }catch(e){} }
  function say(text, slow){
    if(!TTS || !text) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; if(voice) u.voice = voice; u.rate = slow ? .7 : .92;
      speechSynthesis.speak(u);
    }catch(e){}
  }
  function unlock(){ if(!TTS || unlocked) return; try{ const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); unlocked = true; }catch(e){} }
  const AUTO_KEY = "flick-en-say";
  function autoSay(){ try{ return localStorage.getItem(AUTO_KEY) !== "0"; }catch(e){ return true; } }
  function setAutoSay(on){ try{ localStorage.setItem(AUTO_KEY, on ? "1" : "0"); }catch(e){} }
  const sayBtn = (text, label) => TTS ? '<button type="button" class="en-say" data-en-say="' + esc(text) + '" aria-label="' + esc(label || "発音を 聞く") + '">🔊</button>' : "";

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-en[-p<id>] = { ことばid: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms), はじめて 出会った 時刻(ms)] }
     flick-en-fav[-p<id>] = [お気に入りの id] */
  const pkey = base => { const p = curProfile(); return base + (p ? "-p" + p.id : ""); };
  let memo = null;
  function log(){
    const k = pkey("flick-en");
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(pkey("flick-en"), JSON.stringify(v)); memo = { k:pkey("flick-en"), v }; }
  function favs(){ try{ const a = JSON.parse(recGet(pkey("flick-en-fav")) || "[]"); return Array.isArray(a) ? a.filter(id => BY.has(id)) : []; }catch(e){ return []; } }
  function toggleFav(id){ const a = favs(), i = a.indexOf(id); if(i < 0) a.push(id); else a.splice(i, 1); recSet(pkey("flick-en-fav"), JSON.stringify(a)); return i < 0; }
  function discovered(){ const L = log(); return new Set(Object.keys(L).filter(id => BY.has(id))); }
  function discoveredIn(m){ const d = discovered(), s = new Set(); for(const q of (pools[m] || [])) if(d.has(q.art)) s.add(q.art); return s; }
  function weakScore(e){ return e ? 3 * e[2] + (e[1] >= 2 && e[1] / e[0] >= .4 ? 2 : 0) + Math.min(1.5, e[1] / Math.max(1, e[0]) * 2) : 0; }
  function weakList(){ const L = log(); return ALL.filter(q => L[q.art] && (L[q.art][2] || (L[q.art][1] >= 2 && L[q.art][1] / L[q.art][0] >= .4))).sort((a, b) => weakScore(L[b.art]) - weakScore(L[a.art])); }
  const dayOf = t => { const d = new Date(t); return d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate(); };
  function todayWords(){ const L = log(), td = dayOf(Date.now()); return ALL.filter(q => L[q.art] && L[q.art][5] && dayOf(L[q.art][5]) === td).sort((a, b) => log()[a.art][5] - log()[b.art][5]); }
  let runMiss = {};
  function answered(q, secs, miss){
    if(!q || !BY.has(q.art)) return;
    if(autoSay()) say(q.t);  // 打ち終わったら その 英語を 読みあげる(🔊 の 切りかえは トップの パネル)
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
    unlock();  // 旅を はじめる タップの 中 = iPhone で 音を 出せるように しておく
    pre = discovered(); revSet = new Set(); runMiss = {};
    weakSet = new Set(weakList().map(q => q.art));
    const pad = (qs, from) => { for(const q of from){ if(qs.length >= ROUNDS) break; if(!qs.includes(q)) qs.push(q); } return qs; };
    if(m === "efuku" || m === "eweak"){
      const seen = ALL.filter(q => pre.has(q.art));
      let qs = m === "eweak" ? weakList().slice(0, ROUNDS) : [];
      qs = qs.concat(reviewPick(seen, ROUNDS - qs.length, new Set(qs.map(q => q.art))));
      qs.forEach(q => revSet.add(q.art));
      return pad(qs, starter().concat(ALL)).sort(easy);
    }
    const info = stageInfo[m] && stageInfo[m][lv];
    if(!info || !info.def.length) return levels[m][lv].slice();
    /* ふくしゅうの 候補: この 旅の 前の ステージ + 前の 旅(やさしい ほう)で 出会った ことば */
    const avoid = new Set(info.fresh.map(q => q.art)), cands = [], J = JBY[JOURNEY_OF[m]];
    for(const jj of JR){
      if(jj === J) break;
      if(jj.kind === J.kind) for(const s of stageInfo[MODE_OF[jj.id]]) s.fresh.forEach(q => { if(pre.has(q.art)) cands.push(q); });
    }
    for(const s of stageInfo[m]){ if(s === info) break; s.fresh.forEach(q => { if(pre.has(q.art)) cands.push(q); }); }
    const rev = reviewPick(cands, info.def.length, avoid);
    for(const q of info.def){ if(rev.length >= info.def.length) break; if(!rev.includes(q) && !avoid.has(q.art)) rev.push(q); }
    rev.forEach(q => revSet.add(q.art));
    return arrange(info.fresh, rev);
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
  function chip(q, cls){ return '<button type="button" class="en-chip' + (cls ? " " + cls : "") + '" data-en-term="' + esc(q.art) + '">' + esc(q.n) + '</button>'; }
  function resultMsg(r){
    last = r.kabu || null;
    const k = r.kabu || { fresh:[], total:discovered().size, earned:[], missed:[] };
    lastMissed = (k.missed || []).map(id => BY.get(id)).filter(Boolean);
    let h = "";
    if(r.retry){
      const n = r.arts.length, ok = n - (k.missed || []).length;
      h += '<span class="en-r1">🔁 もう一度 おしまい！ まちがえずに 打てた ことば ' + ok + ' / ' + n + '</span>';
    }else h += '<span class="en-r1">🆕 あたらしく 出会った ことば +' + k.fresh.length + '</span>';
    h += '<small>ぜんぶで ' + fmt(k.total) + ' / ' + fmt(TOTAL) + ' 発見</small>';
    for(const T of k.earned) h += '<span class="en-earn">' + T[1] + " 称号ゲット！「" + esc(T[2]) + "」</span>";
    const td = todayWords();
    if(td.length) h += '<span class="en-today"><b>📅 今日 覚えた ことば ' + td.length + '</b><span class="en-chips">' + td.map(q => chip(q, k.fresh.includes(q.art) ? "new" : "")).join("") + '</span></span>';
    if(lastMissed.length && !r.retry) h += '<button type="button" class="en-retry" data-en-retry="1">🔁 まちがえた ' + lastMissed.length + 'こだけ もう一度 挑戦</button><small>やらなくても 大丈夫。苦手ことばに のこって、あとで ふくしゅうに 出るよ</small>';
    return h;
  }

  /* ── 問題の カード: ことば + ひとつ前の ことばの 意味(こたえたら 出る。テンポを 止めない) ── */
  function card(q, prev){
    let h = "";
    if(prev){
      h += '<div class="en-learn" role="status"><p class="en-lh"><b lang="en">' + esc(prev.t) + '</b>' + sayBtn(prev.t) + '</p><p>' + prev.mrb + '</p>' +
           (prev.rp ? '<p class="en-rp">💬 <span lang="en">' + esc(prev.rp) + '</span></p>' : "") + '</div>';
    }else h += '<div class="en-learn en-hint">こたえると、意味が 出るよ。' + (TTS ? "🔊 で 発音も 聞けるよ" : "") + '</div>';
    const tag = weakSet.has(q.art) ? '<span class="en-tag weak">💪 苦手ことば</span>' : revSet.has(q.art) ? '<span class="en-tag rev">🔁 ふくしゅう</span>' : (pre && !pre.has(q.art) ? '<span class="en-tag new">🆕 はじめまして</span>' : "");
    const sub = q.kind === "word" ? esc(q.pos) : SCBY[q.sc].icon + " " + esc(SCBY[q.sc].name);
    h += '<div class="en-q"><span class="en-ic">' + q.e + '</span><div class="en-qb">' + tag + '<small class="en-cat">' + sub + '</small></div>' +
         (TTS ? '<button type="button" class="en-say big" data-en-say="' + esc(q.t) + '" aria-label="発音を 聞く">🔊 きく</button>' : "") + '</div>';
    return h;
  }
  /* 打つ 英文: 空白・記号も そのまま 見せる。色が かわるのは 打つ 字(英字・数字)だけ */
  function tgtHtml(q, n, err){
    let h = "", p = 0;
    for(const ch of q.t){
      const typedCh = norm(ch).length > 0;
      if(typedCh){
        h += '<span class="' + (p < n ? "d" : p === n ? (err ? "x" : "n") : "c") + '">' + esc(ch) + '</span>'; p++;
      }else h += '<span class="' + (p > 0 && p <= n ? "d" : "c") + ' en-sk">' + (ch === " " ? " " : esc(ch)) + '</span>';
    }
    return '<span lang="en" class="en-tgt">' + h + '</span>';
  }
  function nameHtml(q){ return '<span lang="en" class="en-nm">' + esc(q.t) + '</span>'; }
  /* ── 結果・図鑑の くわしい 情報: 例文 / 返事の 例 / ひとこと ── */
  function info(q, inZukan){
    const tag = inZukan ? "" : last && last.fresh.includes(q.art) ? '<span class="en-tag new">🆕 はじめて 出会った</span>' : last && last.rev.includes(q.art) ? '<span class="en-tag rev">🔁 ふくしゅう</span>' : "";
    let h = '<div class="en-info">' + tag + (inZukan ? "" : '<p class="en-sayline">' + sayBtn(q.t) + (TTS ? '<button type="button" class="en-say slow" data-en-say="' + esc(q.t) + '" data-en-slow="1" aria-label="ゆっくり 聞く">🐢 ゆっくり</button>' : "") + '</p>');
    if(q.ex) h += '<p class="en-ex"><b>例文</b><span lang="en">' + esc(q.ex) + '</span>' + sayBtn(q.ex, "例文を 聞く") + (q.exrb ? '<br><small>' + q.exrb + '</small>' : "") + '</p>';
    if(q.rp) h += '<p class="en-ex rp"><b>返事の 例</b><span lang="en">' + esc(q.rp) + '</span>' + sayBtn(q.rp, "返事を 聞く") + (q.rprb ? '<br><small>' + q.rprb + '</small>' : "") + '</p>';
    if(q.tp) h += '<p class="en-small">💡 ' + q.tprb + '</p>';
    return h + '</div>';
  }

  /* ── ホーム: 見つけた ことば・称号・旅ごとの 数・🔊 の 切りかえ ── */
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n), wk = weakList().length, td = todayWords().length, fv = favs().length;
    const jr = JR.map(J => { const all = pools[MODE_OF[J.id]], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + J.icon + " " + J.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + got + '</b> / ' + all.length + '</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%;--c:' + J.color + '"></i></li>'; }).join("");
    $("#kabu-panel").innerHTML = '<section class="en-panel">' +
      '<p class="en-total">🧭 合計 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + ' 発見</p><div class="en-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="en-jr">' + jr + '</ul>' +
      '<p class="en-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "こ") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + (nx[0] - n) + 'こ</small>' : "") + (td ? '<small>📅 きょう 覚えた ことば ' + td + 'こ</small>' : "") + '</p>' +
      '<div class="en-btns"><button type="button" class="en-btn" data-en-open="zukan">📖 英単語帳</button>' +
      '<button type="button" class="en-btn" data-en-open="weak">💪 苦手ことば' + (wk ? "(" + wk + ")" : "") + '</button>' +
      '<button type="button" class="en-btn" data-en-open="quiz">🧩 ミニクイズ</button>' +
      '<button type="button" class="en-btn" data-en-open="fav">⭐ お気に入り' + (fv ? "(" + fv + ")" : "") + '</button></div>' +
      (TTS ? '<button type="button" class="en-auto' + (autoSay() ? " on" : "") + '" data-en-auto="1" aria-pressed="' + autoSay() + '">🔊 打ったら 英語を 読みあげる：<b>' + (autoSay() ? "ON" : "OFF") + '</b></button>' : "") +
      '<p class="en-kb">⌨️ iPhone は 日本語キーボードの「<b>ABC</b>」で フリックすると 英語が 打てるよ。大文字・小文字は どちらでも OK。空白や「\' , . ? !」は 打たなくても すすむよ。</p>' +
      '<p class="en-note">' + esc(D.note) + '</p></section>';
    const chips = $("#kabu-chips");
    if(JOURNEY_OF[m]){
      const J = JBY[JOURNEY_OF[m]], info = stageInfo[m];
      const stops = J.kind === "phrase" ? SC : J.stops;
      const stopDone = stops.map((_, i) => info.filter(s => s.stop === i).every(s => s.fresh.every(q => d.has(q.art))));
      const cur = stopDone.indexOf(false);
      chips.innerHTML = '<div class="en-route" style="--c:' + J.color + '"><span class="st">🚩 START</span>' +
        stops.map((S, i) => '<span class="ar">→</span><span class="st' + (stopDone[i] ? " done" : i === cur ? " now" : "") + '">' + S.icon + " " + esc(S.name) + (stopDone[i] ? " ✅" : i === cur ? '<em>いまここ</em>' : "") + '</span>').join("") +
        '<span class="ar">→</span><span class="st goal' + (cur < 0 ? " done" : "") + '">🏆 ' + esc(J.goal) + '</span></div>' +
        '<p class="en-lead">' + esc(J.lead) + '。1回 10問。' + (J.first ? "新しい ことば 10問。" : "新しい ことばに ふくしゅうが まざるよ。") + '</p>';
    }else chips.innerHTML = '<p class="en-lead">' + (m === "emas" ? "英単語と 日常英会話を ぜんぶ まぜて 出すよ。どの ステージも いつも 同じ 10問。" :
      m === "eweak" ? "まちがえた ことばが 自動で 苦手ことばに なるよ。まちがえずに 打てたら 苦手から はずれるよ。" : "まちがえた・時間が かかった・ひさしぶりの ことばを 先に 出すよ。") + '</p>';
  }
  function lvInfo(m, i){
    if(m === "efuku") return { name:"🔁 ふくしゅう", sub:"ひさしぶり・にがての 10問", short:"ふくしゅう" };
    if(m === "eweak") return { name:"💪 苦手克服", sub:"まちがえた ことば 10問", short:"苦手克服" };
    if(m === "emas") return { name:"マスター" + (i + 1), sub:"ぜんぶの 旅から 10問", short:"マスター" + (i + 1) };
    const s = stageInfo[m][i], J = JBY[JOURNEY_OF[m]], S = (J.kind === "phrase" ? SC : J.stops)[s.stop], L = LVN[s.dv];
    return { name:"Lv." + (i + 1) + " " + (J.kind === "phrase" ? S.icon + S.name : L.icon + L.name), sub:(J.kind === "phrase" ? L.icon + L.name : S.icon + " " + S.name) + "・🆕" + s.fresh.length + (s.def.length ? " + 🔁" + s.def.length : ""), short:"Lv." + (i + 1) };
  }

  /* ── 英単語帳(検索・旅・分類・むずかしさ・お気に入り・苦手で しぼれる) ── */
  let zf = { q:"", j:"", c:"", dv:"", fav:false, weak:false, shown:90 };
  const normQ = s => String(s || "").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/[\s'’.,?!-]/g, "");
  function sheet(id){
    let sh = document.getElementById(id);
    if(!sh){ sh = document.createElement("div"); sh.id = id; sh.className = "prof-sheet en-sheet"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeSheet(id); }); }
    sh.classList.remove("hidden"); document.body.classList.add("en-lock"); return sh;
  }
  function closeSheet(id){ const sh = document.getElementById(id); if(sh) sh.classList.add("hidden"); if(!document.querySelector(".en-sheet:not(.hidden)")) document.body.classList.remove("en-lock"); }
  function openZukan(pre2){ if(pre2) Object.assign(zf, { q:"", j:"", c:"", dv:"", fav:false, weak:false }, pre2); zf.shown = 90; sheet("en-zk"); drawZukan(); }
  const catOf = q => q.kind === "word" ? q.c : SCBY[q.sc].name;
  function drawZukan(){
    const sh = document.getElementById("en-zk"), d = discovered(), fv = new Set(favs()), wk = new Set(weakList().map(q => q.art)), qq = normQ(zf.q);
    const list = ALL.filter(q => (!zf.j || q.j === zf.j) && (!zf.c || catOf(q) === zf.c) && (!zf.dv || q.dv === +zf.dv) && (!zf.fav || fv.has(q.art)) && (!zf.weak || wk.has(q.art)) &&
      (!qq || [q.t, q.m].some(x => normQ(x).includes(qq))));
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + esc(label) + '</option>';
    const cats = [...new Set(ALL.filter(q => !zf.j || q.j === zf.j).map(catOf))];
    const scroll = sh.scrollTop, focused = document.activeElement && document.activeElement.id === "en-zq";
    sh.innerHTML = '<div class="prof-box en-zbox"><button type="button" class="en-x" aria-label="とじる">×</button><h2>📖 英単語帳</h2>' +
      '<p class="en-zsum"><b>' + got + '</b> / ' + list.length + ' 発見</p>' +
      '<input type="search" id="en-zq" class="en-search" placeholder="🔍 さがす(英語でも 日本語でも)" value="' + esc(zf.q) + '" autocomplete="off" autocapitalize="off" enterkeyhint="search">' +
      '<div class="en-zf"><select id="en-zj">' + opt("", "🧭 旅", zf.j) + JR.map(J => opt(J.id, J.icon + " " + J.name, zf.j)).join("") + '</select>' +
      '<select id="en-zc">' + opt("", "🏷 分類・場面", zf.c) + cats.map(c => opt(c, c, zf.c)).join("") + '</select>' +
      '<select id="en-zd">' + opt("", "📶 むずかしさ", zf.dv) + D.levels.map(L => opt(L.difficulty, L.icon + " " + L.name, zf.dv)).join("") + '</select></div>' +
      '<div class="en-ztog"><button type="button" data-t="fav"' + (zf.fav ? ' class="on"' : "") + '>⭐ お気に入り</button><button type="button" data-t="weak"' + (zf.weak ? ' class="on"' : "") + '>💪 苦手ことば</button></div>' +
      (zf.fav && list.length ? '<button type="button" class="en-btn en-wide" data-en-practice="fav">⭐ お気に入りを 練習する(' + Math.min(ROUNDS, list.length) + '問)</button>' : "") +
      (zf.weak && list.length ? '<button type="button" class="en-btn en-wide" data-en-practice="weak">💪 苦手克服を はじめる</button>' : "") +
      (list.length ? "" : '<p class="en-empty">' + (zf.fav ? "⭐ まだ お気に入りが ないよ。ことばの ページの ☆ を おすと 入るよ" : zf.weak ? "💪 いまは 苦手ことばが ないよ。すごい！" : "見つからなかったよ") + '</p>') +
      '<div class="en-grid">' + list.slice(0, zf.shown).map(q => d.has(q.art)
        ? '<button type="button" class="en-tile on" data-en-term="' + esc(q.art) + '"><span>' + q.e + '</span><b lang="en">' + esc(q.t) + '</b><small>' + esc(q.m) + (fv.has(q.art) ? " ⭐" : "") + '</small></button>'
        : '<button type="button" class="en-tile" data-en-term="' + esc(q.art) + '"><span>❔</span><b>？？？</b><small>' + q.jr.icon + " " + LVN[q.dv].name + '</small></button>').join("") + '</div>' +
      (list.length > zf.shown ? '<button type="button" class="en-btn en-wide" data-en-more="1">もっと 見る(あと ' + (list.length - zf.shown) + ')</button>' : "") +
      '<p class="en-note">' + esc(D.note) + '</p></div>';
    sh.scrollTop = scroll;
    const qi = sh.querySelector("#en-zq");
    if(focused){ qi.focus(); qi.setSelectionRange(qi.value.length, qi.value.length); }
    qi.addEventListener("input", e => { zf.q = e.target.value; zf.shown = 90; drawZukan(); });
    sh.querySelector("#en-zj").onchange = e => { zf.j = e.target.value; zf.c = ""; zf.shown = 90; drawZukan(); };
    sh.querySelector("#en-zc").onchange = e => { zf.c = e.target.value; zf.shown = 90; drawZukan(); };
    sh.querySelector("#en-zd").onchange = e => { zf.dv = e.target.value; zf.shown = 90; drawZukan(); };
    sh.querySelectorAll(".en-ztog button").forEach(b => b.onclick = () => { zf[b.dataset.t] = !zf[b.dataset.t]; zf.shown = 90; drawZukan(); });
    sh.querySelector(".en-x").onclick = () => closeSheet("en-zk");
  }
  function detail(id){
    const q = BY.get(id); if(!q) return;
    const e = log()[id], box = sheet("en-zdt"), fav = favs().includes(id);
    box.innerHTML = '<div class="en-card"><button type="button" class="en-x" aria-label="とじる">×</button>' + (e
      ? '<p class="en-cn"><span class="en-ic">' + q.e + '</span><span lang="en">' + esc(q.t) + '</span>' + sayBtn(q.t) +
        '<button type="button" class="en-fav' + (fav ? " on" : "") + '" data-en-fav="' + esc(id) + '" aria-label="お気に入り">' + (fav ? "⭐" : "☆") + '</button></p>' +
        '<p class="en-meta">' + esc(q.c) + '</p><p class="en-d">' + q.d + '</p>' + info(q, true) +
        '<p class="en-st">出会った回数 ' + e[0] + '回' + (e[1] ? '・まちがい ' + e[1] + '回' : "") + (weakList().includes(q) ? "・💪 苦手ことば" : "") + '</p>'
      : '<p class="en-cn"><span class="en-ic">❔</span>？？？</p><p class="en-d">まだ 出会っていない ことばです。<b>' + esc(whereOf(q)) + '</b>で 出会えるよ。</p><p class="en-small">' + q.jr.icon + " " + esc(q.jr.name) + " ・ " + esc(catOf(q)) + '</p>') + '</div>';
    box.querySelector(".en-x").onclick = () => closeSheet("en-zdt");
    const c = box.querySelector(".en-card"); if(c) c.scrollTop = 0;
  }
  function whereOf(q){
    const m = MODE_OF[q.j], i = stageInfo[m].findIndex(s => s.fresh.includes(q));
    return JBY[q.j].name + "の Lv." + (i + 1);
  }

  /* ── ミニクイズ(日本語の 意味を 見て 英語を えらぶ。出会った ことばから 5問) ── */
  let quiz = null;
  function openQuiz(){
    const d = ALL.filter(q => discovered().has(q.art)), sh = sheet("en-qz");
    if(d.length < 10){ sh.innerHTML = '<div class="prof-box en-zbox"><button type="button" class="en-x" aria-label="とじる">×</button><h2>🧩 ミニクイズ</h2><p class="en-empty">ことばに 10こ 出会うと あそべるよ(いま ' + d.length + 'こ)</p></div>'; sh.querySelector(".en-x").onclick = () => closeSheet("en-qz"); return; }
    const pick = d.slice().sort(() => Math.random() - .5).slice(0, 5);
    quiz = { list:pick.map(q => { const same = d.filter(x => x !== q && x.kind === q.kind && x.m !== q.m), other = d.filter(x => x !== q && x.m !== q.m);
      const wrong = (same.length >= 2 ? same : other).slice().sort(() => Math.random() - .5).slice(0, 2);
      return { q, ch:[q].concat(wrong).sort(() => Math.random() - .5) }; }), i:0, ok:0 };
    drawQuiz();
  }
  function drawQuiz(){
    const sh = document.getElementById("en-qz"), Q = quiz;
    let h = '<div class="prof-box en-zbox"><button type="button" class="en-x" aria-label="とじる">×</button><h2>🧩 ミニクイズ</h2>';
    if(Q.i >= Q.list.length) h += '<p class="en-qres">' + Q.ok + ' / ' + Q.list.length + ' 問 正解！' + (Q.ok === Q.list.length ? " 🎉" : "") + '</p><button type="button" class="en-btn en-wide" data-en-open="quiz">もう一度</button>';
    else { const it = Q.list[Q.i];
      h += '<p class="en-qn">' + (Q.i + 1) + ' / ' + Q.list.length + '</p><p class="en-qq">「' + it.q.mrb + '」<br>英語で 言うと どれ？</p><div class="en-qch">' +
        it.ch.map((x, k) => '<button type="button" class="en-btn" data-en-ans="' + k + '">' + "ABC"[k] + '　<span lang="en">' + esc(x.t) + '</span></button>').join("") + '</div><p class="en-qfb" id="en-qfb"></p>'; }
    sh.innerHTML = h + '</div>';
    sh.querySelector(".en-x").onclick = () => closeSheet("en-qz");
  }
  function answerQuiz(k){
    const Q = quiz, it = Q.list[Q.i]; if(!it || Q.lock) return;
    const ok = it.ch[k] === it.q; if(ok) Q.ok++;
    Q.lock = true;
    say(it.q.t);
    const sh = document.getElementById("en-qz");
    sh.querySelectorAll("[data-en-ans]").forEach((b, j) => { b.disabled = true; if(it.ch[j] === it.q) b.classList.add("ok"); else if(j === k) b.classList.add("ng"); });
    sh.querySelector("#en-qfb").textContent = ok ? "⭕ 正解！" : "❌ 正解は「" + it.q.t + "」";
    setTimeout(() => { Q.i++; Q.lock = false; drawQuiz(); }, ok ? 900 : 1600);
  }

  /* ── おす・えらぶ(まとめて 受ける。結果画面や シートの 中身は 何度も 書きかわるため) ── */
  // 🔊 を おしても 入力欄から 手が はなれない(キーボードが 閉じない)ように
  document.addEventListener("mousedown", e => { if(e.target.closest && e.target.closest("[data-en-say]") && document.body.classList.contains("playing")) e.preventDefault(); });
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-en-say],[data-en-term],[data-en-open],[data-en-auto],[data-en-retry],[data-en-fav],[data-en-more],[data-en-practice],[data-en-ans]");
    if(!t) return;
    if(t.dataset.enSay){ e.stopPropagation(); say(t.dataset.enSay, !!t.dataset.enSlow); if(document.body.classList.contains("playing")) ans.focus(); return; }
    if(t.dataset.enTerm) return detail(t.dataset.enTerm);
    if(t.dataset.enAuto){ setAutoSay(!autoSay()); if(autoSay()){ unlock(); say("Hello!"); } home(mode); return; }
    if(t.dataset.enFav){ toggleFav(t.dataset.enFav); detail(t.dataset.enFav); if(document.getElementById("en-zk") && !document.getElementById("en-zk").classList.contains("hidden")) drawZukan(); home(mode); return; }
    if(t.dataset.enMore){ zf.shown += 180; return drawZukan(); }
    if(t.dataset.enAns) return answerQuiz(+t.dataset.enAns);
    if(t.dataset.enOpen){
      const o = t.dataset.enOpen;
      if(o === "zukan") return openZukan({});
      if(o === "weak") return openZukan({ weak:true });
      if(o === "fav") return openZukan({ fav:true });
      if(o === "quiz") return openQuiz();
    }
    if(t.dataset.enPractice){
      const list = t.dataset.enPractice === "fav" ? favs().map(id => BY.get(id)) : null;
      ["en-zk", "en-zdt"].forEach(closeSheet);
      if(list){ unlock(); pre = discovered(); revSet = new Set(list.map(q => q.art)); weakSet = new Set(); runMiss = {}; start(mode, level, list.slice(0, ROUNDS).sort(easy)); }
      else { setMode("eweak"); start("eweak", 0); }
      return;
    }
    if(t.dataset.enRetry){
      if(!lastMissed.length) return;
      unlock(); pre = discovered(); revSet = new Set(); weakSet = new Set(lastMissed.map(q => q.art)); runMiss = {};
      return start(mode, level, lastMissed.slice());
    }
  });

  /* ── 見た目(この ページだけ。明るく、旅の ように。勉強っぽく しない) ── */
  const css = `
.map-card{display:none}
.target{word-break:normal;overflow-wrap:anywhere;font-size:clamp(20px,6vw,26px);letter-spacing:.01em;line-height:1.55}
.target .en-sk{border:0}
.en-panel{background:linear-gradient(160deg,#ecfdf5 0%,#eff6ff 55%,#fff7ed 100%);border:1px solid #bbf7d0;border-radius:20px;padding:14px 14px 12px;margin:0 0 18px;color:#052e2b}
.en-total{margin:0;font-weight:900;font-size:16px}.en-total b{font-size:28px;color:#0e8f6e;font-variant-numeric:tabular-nums}
.en-bar,.en-jr i{display:block;height:9px;border-radius:99px;background:#e2e8f0;overflow:hidden;margin:6px 0 10px;position:relative}
.en-bar::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#16a34a,#0b6fb8,#e11d48);border-radius:99px}
.en-jr i::after{content:"";position:absolute;inset:0;width:var(--w);background:var(--c);border-radius:99px}
.en-jr{list-style:none;margin:0;padding:0;display:grid;gap:2px}
.en-jr li{display:grid;grid-template-columns:1fr auto;font-size:13px;align-items:baseline;gap:4px}.en-jr .rn{font-weight:800}.en-jr i{grid-column:1/-1;height:6px;margin:2px 0 5px}
.en-jr .rc{font-variant-numeric:tabular-nums;color:#64748b}.en-jr .rc b{color:#052e2b}
.en-title{margin:8px 0 10px;font-size:14px}.en-title small{display:block;color:#64748b;font-size:12px;margin-top:2px}
.en-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.en-btn{padding:11px 8px;border-radius:14px;border:1.5px solid #a7f3d0;background:#fff;color:#052e2b;font:inherit;font-weight:800;font-size:14px;cursor:pointer}
.en-btn:active{transform:translateY(1px)}.en-wide{width:100%;margin-top:10px}
.en-auto{display:block;width:100%;margin:10px 0 0;padding:10px;border-radius:14px;border:1.5px dashed #94a3b8;background:#fff;color:#334155;font:inherit;font-size:13.5px;font-weight:800;cursor:pointer}
.en-auto.on{border-style:solid;border-color:#0e8f6e;color:#065f46;background:#f0fdf4}
.en-kb{font-size:12px;color:#475569;line-height:1.7;margin:10px 0 0;background:#fff;border-radius:12px;padding:8px 10px}
.en-note{font-size:11px;color:#64748b;line-height:1.6;margin:10px 0 0}
.en-lead{color:var(--muted);font-size:13px;margin:0 0 12px;line-height:1.7}
.en-route{display:flex;flex-wrap:wrap;align-items:center;gap:4px 2px;margin:-4px 0 8px;font-size:12.5px;font-weight:800}
.en-route .st{padding:4px 9px;border-radius:99px;background:var(--soft);border:1.5px solid var(--line);color:var(--muted);white-space:nowrap}
.en-route .st.done{background:#ecfdf5;border-color:#6ee7b7;color:#065f46}.en-route .st.now{background:var(--c);border-color:var(--c);color:#fff}
.en-route .st em{font-style:normal;margin-left:4px;font-size:10.5px;background:#fff;color:var(--c);border-radius:99px;padding:1px 6px}
.en-route .st.goal{border-color:#fcd34d;color:#b45309}.en-route .ar{color:#94a3b8}
.en-learn{background:#f0fdf4;border:1px solid #bbf7d0;color:#052e2b;border-radius:12px;padding:6px 10px;margin:0 0 8px;font-size:13px;line-height:1.5;animation:enIn .35s ease-out}
.en-learn p{margin:0}.en-learn .en-lh{display:flex;align-items:center;gap:6px;font-size:15px}.en-learn .en-lh b{word-break:break-word}.en-learn .en-rp{color:#0369a1;font-size:12.5px;margin-top:2px}
.en-learn.en-hint{background:var(--soft);border-color:var(--line);color:var(--muted)}
@keyframes enIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.en-q{display:flex;gap:10px;align-items:center;margin:0 0 8px}
.en-ic{font-size:30px;width:50px;height:50px;display:grid;place-items:center;background:linear-gradient(135deg,#d1fae5,#dbeafe);border-radius:14px;flex:none}
.en-qb{flex:1;min-width:0}.en-cat{display:block;font-size:12px;color:var(--muted);margin-top:3px}
.en-say{border:1.5px solid #a7f3d0;background:#fff;border-radius:99px;font:inherit;font-size:15px;line-height:1;padding:5px 8px;cursor:pointer;flex:none;color:#065f46;font-weight:800}
.en-say.big{padding:9px 12px;font-size:14px;background:#ecfdf5}.en-say.slow{font-size:13px}
.en-tag{display:inline-block;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:99px}.en-tag.new{background:#fef3c7;color:#92400e}.en-tag.rev{background:#fce7f3;color:#9d174d}.en-tag.weak{background:#ffedd5;color:#9a3412}
.en-nm{font-size:1.05em;word-break:break-word}
.en-pos{display:inline-block;font-size:11px;font-weight:800;background:#e0f2fe;color:#075985;border-radius:99px;padding:0 7px;margin-right:6px;vertical-align:1px}
.en-info{margin-top:6px}.en-info .en-tag{margin:0 0 6px}.en-sayline{display:flex;gap:6px;margin:4px 0}
.en-ex{font-size:14px;line-height:1.7;margin:6px 0;background:#f0f9ff;border-radius:10px;padding:6px 10px;color:#0c4a6e}.en-ex b{display:inline-block;font-size:11px;background:#0ea5e9;color:#fff;border-radius:99px;padding:0 8px;margin-right:6px;line-height:1.8}
.en-ex .en-say{margin-left:6px;padding:3px 7px;font-size:13px}.en-ex small{font-size:12.5px;line-height:2;color:#334155}
.en-ex.rp{background:#fff7ed;color:#7c2d12}.en-ex.rp b{background:#f97316}
.en-small{font-size:12.5px;font-weight:700;margin:8px 0 2px;color:#334155;line-height:1.9}
.pins-msg .en-r1{display:block}.pins-msg small{display:block;font-weight:700;color:var(--muted);font-size:13px}
.en-earn{display:block;margin-top:8px;font-size:16px;color:#b45309;animation:enIn .5s ease-out}
.en-today{display:block;margin-top:10px;background:#fff;border:1px solid #bbf7d0;border-radius:14px;padding:8px 10px;text-align:left}.en-today b{display:block;font-size:14px;color:#065f46}
.en-chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0}
.en-chip{padding:5px 10px;border-radius:99px;border:1.5px solid #a7f3d0;background:#ecfdf5;color:#065f46;font:inherit;font-size:12.5px;font-weight:800;cursor:pointer}
.en-chip.new{background:#fef3c7;border-color:#fcd34d;color:#92400e}
.en-retry{display:block;width:100%;margin:10px 0 2px;padding:12px;border-radius:14px;border:0;background:linear-gradient(90deg,#0e8f6e,#0b6fb8);color:#fff;font:inherit;font-weight:900;font-size:15px;cursor:pointer}
.en-sheet .en-zbox{max-width:560px;position:relative}.en-x{position:absolute;right:10px;top:8px;border:0;background:none;font-size:26px;color:#64748b;line-height:1;cursor:pointer}
.en-zsum{text-align:center;margin:4px 0 8px}.en-zsum b{font-size:22px;color:#0e8f6e}
.en-search{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;border-radius:12px;border:1.5px solid #a7f3d0;margin:0 0 8px;background:#fff;color:#052e2b}
.en-zf{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:0 0 8px}.en-zf select{font:inherit;font-size:12.5px;padding:8px 4px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#334155;min-width:0}
.en-ztog{display:flex;gap:6px;margin:0 0 8px}.en-ztog button{flex:1;padding:7px;border-radius:99px;border:1.5px solid #e2e8f0;background:#fff;color:#334155;font:inherit;font-size:12.5px;font-weight:800}
.en-ztog button.on{background:#f59e0b;border-color:#f59e0b;color:#fff}
.en-empty{text-align:center;color:#64748b;font-size:13px;margin:14px 0}
.en-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:6px;margin-top:8px}
.en-tile{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:12px;border:1.5px dashed #cbd5e1;background:#f8fafc;color:#94a3b8;font:inherit;min-height:74px;cursor:pointer}
.en-tile span{font-size:20px}.en-tile b{font-size:12.5px;line-height:1.3;word-break:break-word;text-align:center}.en-tile small{font-size:10.5px;text-align:center;line-height:1.35}
.en-tile.on{border-style:solid;border-color:#a7f3d0;background:#f0fdf4;color:#052e2b}.en-tile.on small{color:#475569}
#en-zdt:not(.hidden){display:flex;align-items:flex-end;padding:20px 10px calc(10px + env(safe-area-inset-bottom))}#en-zdt .en-card{max-width:540px;width:100%;margin:0 auto;max-height:84vh;overflow-y:auto;box-shadow:0 -10px 30px -8px rgba(0,0,0,.35)}
.en-card{position:relative;border:1.5px solid #a7f3d0;background:#fff;border-radius:18px;padding:14px 14px 16px;color:#0f172a;box-sizing:border-box}
.en-cn{display:flex;align-items:center;gap:10px;font-size:21px;font-weight:900;margin:0;padding-right:28px;word-break:break-word}.en-cn .en-ic{width:46px;height:46px;font-size:26px}
.en-fav{margin-left:auto;border:0;background:none;font-size:24px;cursor:pointer;color:#f59e0b}
.en-meta{margin:6px 0 0;color:#475569;font-size:12px}.en-d{margin:8px 0 0;font-size:15px;line-height:2.05}.en-st{font-size:12px;color:#475569;margin:10px 0 0}
.en-qn{margin:0;color:#64748b;font-size:12px;text-align:center}.en-qq{font-size:15px;line-height:2;font-weight:700;margin:6px 0 12px}
.en-qch{display:grid;gap:8px}.en-qch .en-btn{text-align:left}.en-qch .ok{background:#dcfce7;border-color:#22c55e}.en-qch .ng{background:#fee2e2;border-color:#ef4444}
.en-qfb{min-height:1.6em;text-align:center;font-weight:900;margin:10px 0 0}.en-qres{text-align:center;font-size:22px;font-weight:900;margin:14px 0}
body.en-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "旅マップに もどる";

  return { kind:"english", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes:() => MODES_ALL, byArt:id => BY.get(id), norm, tgtHtml, nameHtml, say,
           noRank:(m, lv) => !RANK_READY || m === "efuku" || m === "eweak" || lv >= 60, noBoard:!RANK_READY, openZukan };
})();
