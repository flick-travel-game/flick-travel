/* 株式フリック旅行: 世界の会社・株式企業を おぼえる コース(けいくん 2026-09-26)
   ─ 土台の index.html(世界フリック旅行)に「会社の コース」を 足す ファイル。kabu/ の ページだけが 読む ─
   データは data/companies.json → tools/build_games.py が kabu/companies.js(COMPANIES)に する。**会社を 足す・直すのは data/companies.json だけ**
   ・コース(つみあげ): 入門 100 → 初級 300 → 中級 600 → 上級 1,000 → マスター 約2,400
   ・1回は かならず 10問。入門は 新しい会社 10問、初級〜上級は 新しい会社 7問 + ふくしゅう 3問
   ・ふくしゅうは「まちがえた」「時間がかかった」「ひさしぶり」の 会社を 先に(その人の きろくで えらぶ)
   ・マスターは 地域別(5)・業種別(14)に 分けて あそぶ
   ・出会った 会社は 企業図鑑に のこる(まだの会社は ？？？)
   ⚠️ 投資を すすめる ことばは 書かない。会社・国・業種を 知るための もの */
const KABU = (() => {
  const D = COMPANIES;
  const COURSES = [
    { m:"kbeg", name:"入門", icon:"🌱", total:100, color:"blue", perStage:10, rev:0, lead:"だれでも 知っている 会社から" },
    { m:"kele", name:"初級", icon:"📘", total:300, color:"green", perStage:7, rev:3, lead:"聞いたことが ある 会社・投資で よく見る 会社" },
    { m:"kmid", name:"中級", icon:"🧭", total:600, color:"orange", perStage:7, rev:3, lead:"世界各国を 代表する 会社" },
    { m:"kadv", name:"上級", icon:"🌐", total:1000, color:"purple", perStage:7, rev:3, lead:"世界経済で 大切な 会社" },
  ];
  const COURSE_OF = ["kbeg", "kele", "kmid", "kadv", "master"];
  const REGIONS = [
    { m:"kmjp", name:"日本", icon:"🗾" }, { m:"kmus", name:"アメリカ", icon:"🇺🇸" }, { m:"kmeu", name:"ヨーロッパ", icon:"🇪🇺" },
    { m:"kmap", name:"アジア・太平洋", icon:"🌏" }, { m:"kmot", name:"その他", icon:"🌎" },
  ];
  const SECTORS = D.sectors.map(s => Object.assign({ m:"kms" + s.id }, s));
  const TITLES = [
    [10, "🌱", "会社を 知りはじめた！"], [30, "🔎", "会社たんけん隊"], [50, "👀", "企業ウォッチャー"], [100, "🎓", "世界の会社 入門クリア"],
    [200, "📰", "ニュースの会社が わかる人"], [300, "📘", "企業博士・初級"], [450, "🗺️", "世界の会社 ものしり"], [600, "🧭", "世界経済たんけん家"],
    [800, "💼", "マーケットの 案内人"], [1000, "🌐", "グローバル企業博士"], [1500, "📈", "世界市場の 達人"], [2000, "🌟", "企業図鑑 コレクター"],
  ];
  const ROUNDS = 10;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const flagOf = cc => cc && cc.length === 2 ? String.fromCodePoint(...[...cc].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)) : "🏳️";
  const secOf = id => D.sectors.find(s => s.id === id) || { id, name:id, icon:"🏢" };
  const fmt = n => n.toLocaleString("ja-JP");

  /* ── 会社 → 問題(土台の SPOTS と 同じ形: n 名前 / r よみ / art キー / c 国 / d 説明 / e 絵文字) ── */
  const ALL = D.list.map(o => {
    const sec = secOf(o.s);
    return Object.assign({}, o, { art:o.id, k:"company", n:o.n, r:o.r, e:o.e || sec.icon, d:o.rb || esc(o.d), d0:o.d,
      c:flagOf(o.cc) + " " + o.co + " ・ " + sec.name, flag:flagOf(o.cc), sec });
  });
  const BY = new Map(ALL.map(q => [q.art, q]));
  const TOTAL = ALL.length;
  const byFame = (a, b) => a.f - b.f;
  const courseList = i => ALL.filter(q => q.cs === i).sort(byFame);

  /* ── ステージを 組む ── */
  function cost(s){ let c = 0; for(const ch of s){ c += 1; if(/[がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔ]/.test(ch)) c += .5; if(/[ぁぃぅぇぉっゃゅょゎ]/.test(ch)) c += .5; if(ch === "ー") c += .3; } return c; }
  const levels = {}, pools = {}, stageInfo = {}, maps = {}, colors = {};
  let introduced = [], lvOffset = 0;
  COURSES.forEach((C, ci) => {
    const news = courseList(ci);
    const S = C.rev ? Math.ceil(news.length / C.perStage) : Math.ceil(news.length / ROUNDS);
    const lv = [], info = [];
    let p = 0;
    for(let k = 0; k < S; k++){
      const nNew = Math.floor(news.length / S) + (k < news.length % S ? 1 : 0);
      const fresh = news.slice(p, p + nNew); p += nNew;
      const nRev = ROUNDS - fresh.length;
      // ふくしゅうの きまった 候補(まだ その人の きろくが 無いとき): 少し前・だいぶ前・ずっと前 に 出た 会社
      const L = introduced.length, def = [];
      for(const back of [5, 18, 45, 90, 150, 260, 400, 600, 800]){
        if(def.length >= nRev) break;
        const q = introduced[Math.max(0, L - back)];
        if(q && !def.includes(q)) def.push(q);
      }
      for(let j = 0; def.length < nRev && j < L; j++) if(!def.includes(introduced[j])) def.push(introduced[j]);
      info.push({ fresh, def, before:L });
      lv.push(arrange(fresh, def));
      introduced = introduced.concat(fresh);
    }
    levels[C.m] = lv; stageInfo[C.m] = { stages:info, offset:lvOffset };
    lvOffset += S;
    pools[C.m] = introduced.slice();
    colors[C.m] = C.color;
    maps[C.m] = { icon:C.icon, name:C.name + "コース", cardName:C.name, title:"", word:"企業図鑑", thing:"会社", unit:"社", doneWord:"出会った会社", miss:"まだ出会っていない会社",
                  lvTitle:C.icon + " " + C.name + "　ステージを えらぶ",
                  card:(m, done) => '<small>' + fmt(pools[m].length) + '社・' + levels[m].length + 'ステージ</small><small>出会った ' + fmt(done) + '社</small>' };
  });
  /* 新しい会社を かんたんな順に ならべ、ふくしゅうを 3・6・9問めに はさむ */
  function arrange(fresh, rev){
    const a = fresh.slice().sort((x, y) => cost(x.r) - cost(y.r));
    const slots = [2, 5, 8, 1, 4, 7, 9, 3, 6, 0];
    const out = a.slice();
    rev.forEach((q, i) => out.splice(Math.min(slots[i], out.length), 0, q));
    return out.slice(0, ROUNDS);
  }
  /* マスター: 地域別・業種別(ぜんぶの 会社。知名度の 高い順に 10社ずつ) */
  function chunks(list){
    const s = list.slice().sort(byFame), out = [];
    for(let i = 0; i + ROUNDS <= s.length; i += ROUNDS) out.push(s.slice(i, i + ROUNDS).sort((x, y) => cost(x.r) - cost(y.r)));
    const rest = s.length % ROUNDS;
    if(rest && s.length > ROUNDS) out.push(s.slice(-rest - (ROUNDS - rest)).sort((x, y) => cost(x.r) - cost(y.r)));
    if(s.length && s.length < ROUNDS) out.push(s.concat(ALL.filter(q => !s.includes(q)).sort(byFame).slice(0, ROUNDS - s.length)));
    return out;
  }
  const masterCard = (m, done) => '<small>' + fmt(TOTAL) + '社・地域別 / 業種別</small><small>出会った ' + fmt(discovered().size) + '社</small>';
  for(const R of REGIONS){
    const list = ALL.filter(q => q.rg === R.name);
    pools[R.m] = list; levels[R.m] = chunks(list); colors[R.m] = "#e0202e";
    maps[R.m] = { icon:"🏆", name:"マスター・" + R.name, cardName:"マスター", group:"master", word:"企業図鑑", unit:"社", doneWord:"出会った会社", thing:"会社",
                  lvTitle:"🏆 マスター・" + R.icon + " " + R.name + "　" + fmt(list.length) + "社", card:masterCard };
  }
  for(const S of SECTORS){
    const list = ALL.filter(q => q.s === S.id);
    pools[S.m] = list; levels[S.m] = chunks(list); colors[S.m] = "#e0202e";
    maps[S.m] = { icon:"🏆", name:"マスター・" + S.name, cardName:"マスター", group:"master", word:"企業図鑑", unit:"社", doneWord:"出会った会社", thing:"会社",
                  lvTitle:"🏆 マスター・" + S.icon + " " + S.name + "　" + fmt(list.length) + "社", card:masterCard };
  }
  /* ふくしゅう(その人の きろくから 毎回 えらぶ 10問) */
  pools.kfuku = ALL; levels.kfuku = [courseList(0).slice(0, ROUNDS)]; colors.kfuku = "pink";
  maps.kfuku = { icon:"🔁", name:"ふくしゅう", cardName:"ふくしゅう", word:"企業図鑑", unit:"社", doneWord:"出会った会社", thing:"会社",
                 lvTitle:"🔁 ふくしゅう　にがてな会社を もう一度",
                 card:() => { const w = weakCount(); return '<small>毎回 ちがう 10社</small><small>' + (discovered().size < ROUNDS ? 'まず コースで 10社 出会おう' : 'にがて ' + w + '社') + '</small>'; } };
  const MODES_ALL = COURSES.map(C => C.m).concat(["kfuku"], REGIONS.map(R => R.m), SECTORS.map(S => S.m));
  const MASTER = new Set(REGIONS.map(R => R.m).concat(SECTORS.map(S => S.m)));

  /* ── きろく(人ごと。土台の recGet / recSet = つないでいない人は とじると 消える 決まりに そろえる) ──
     flick-kabu[-p<id>] = { 会社id: [見た回数, まちがいの合計, さいごに まちがえたか(0/1), 1文字あたりの 秒, さいごに 見た 時刻(ms)] } */
  function logKey(){ const p = curProfile(); return "flick-kabu" + (p ? "-p" + p.id : ""); }
  let memo = null;
  function log(){
    const k = logKey();
    if(memo && memo.k === k) return memo.v;
    let v = {}; try{ v = JSON.parse(recGet(k) || "{}") || {}; }catch(e){ v = {}; }
    memo = { k, v }; return v;
  }
  function save(v){ recSet(logKey(), JSON.stringify(v)); memo = { k:logKey(), v }; }
  function discovered(){ const L = log(); return new Set(Object.keys(L).filter(id => BY.has(id))); }
  function discoveredIn(m){ const d = discovered(), s = new Set(); for(const q of (pools[m] || [])) if(d.has(q.art)) s.add(q.art); return s; }
  function weakCount(){ const L = log(); return Object.keys(L).filter(id => BY.has(id) && L[id][2]).length; }
  function answered(q, secs, miss){
    if(!q || !BY.has(q.art)) return;
    const L = log(), e = L[q.art] || [0, 0, 0, 0, 0];
    const per = secs / Math.max(1, q.r.length);
    L[q.art] = [e[0] + 1, e[1] + miss, miss > 0 ? 1 : 0, e[0] ? +(e[3] * .6 + per * .4).toFixed(3) : +per.toFixed(3), Date.now()];
    save(L);
  }
  /* ふくしゅうの 点数: まちがえた > 時間がかかった > ひさしぶり > まだ 少ししか 見ていない */
  function reviewPick(cands, n, avoid){
    const L = log(), per = cands.map(q => (L[q.art] || [])[3]).filter(Boolean).sort((a, b) => a - b);
    const med = per.length ? per[Math.floor(per.length / 2)] : .5, now = Date.now();
    return cands.filter(q => !avoid.has(q.art)).map(q => {
      const e = L[q.art];
      const s = 3 * e[2] + 1.5 * Math.min(1, e[1] / Math.max(1, e[0])) + 2 * Math.max(0, e[3] / med - 1)
              + Math.min(2, (now - e[4]) / 864e5 / 5) + 1 / e[0] + Math.random() * .6;
      return { q, s };
    }).sort((a, b) => b.s - a.s).slice(0, n).map(x => x.q);
  }
  let pre = null, revSet = new Set();  // この回の 前に 出会っていた 会社 / この回の ふくしゅうの 会社
  function makeQs(m, lv){
    pre = discovered(); revSet = new Set();
    if(m === "kfuku"){
      const cands = ALL.filter(q => pre.has(q.art));
      let qs = reviewPick(cands, ROUNDS, new Set());
      qs.forEach(q => revSet.add(q.art));
      if(qs.length < ROUNDS) qs = qs.concat(courseList(0).filter(q => !qs.includes(q)).slice(0, ROUNDS - qs.length));
      return qs.sort((x, y) => cost(x.r) - cost(y.r));
    }
    const si = stageInfo[m] && stageInfo[m].stages[lv];
    if(!si || !si.def.length) return levels[m][lv].slice();
    const avoid = new Set(si.fresh.map(q => q.art));
    const cands = [];
    for(const C of COURSES){ for(const info of stageInfo[C.m].stages){ if(C.m === m && info === si) break; info.fresh.forEach(q => { if(pre.has(q.art)) cands.push(q); }); } if(C.m === m) break; }
    let rev = reviewPick(cands, si.def.length, avoid);
    for(const q of si.def){ if(rev.length >= si.def.length) break; if(!rev.includes(q) && !avoid.has(q.art)) rev.push(q); }
    rev.forEach(q => revSet.add(q.art));
    return arrange(si.fresh, rev);
  }
  function titleOf(n){ let t = null; for(const T of TITLES) if(n >= T[0]) t = T; if(n >= TOTAL) t = [TOTAL, "🏆", "世界企業マスター"]; return t; }
  function nextTitle(n){ for(const T of TITLES) if(n < T[0]) return T; return n < TOTAL ? [TOTAL, "🏆", "世界企業マスター"] : null; }
  let last = null;
  function finished(r, qs){
    const now = discovered(), before = pre || new Set();
    const fresh = qs.filter(q => !before.has(q.art) && now.has(q.art)).map(q => q.art);
    const earned = TITLES.concat([[TOTAL, "🏆", "世界企業マスター"]]).filter(T => before.size < T[0] && now.size >= T[0]);
    return { fresh, rev:[...revSet], total:now.size, earned };
  }
  function resultMsg(r){
    last = r.kabu || null;
    const k = r.kabu || { fresh:[], total:discovered().size, earned:[] };
    let h = "🆕 あたらしく 出会った会社 +" + k.fresh.length + "社<br><small>世界の会社 " + fmt(k.total) + " / " + fmt(TOTAL) + "社 発見</small>";
    for(const T of k.earned) h += '<span class="kb-earn">' + T[1] + " 称号ゲット！「" + esc(T[2]) + "」</span>";
    return h;
  }

  /* ── 問題の カード: 会社名 + ひとつ前の 会社の「ひとこと」(こたえたら 出る。テンポを 止めない) ── */
  function card(q, prev){
    let h = "";
    if(prev) h += '<div class="kb-learn" role="status"><b>✅ ' + esc(prev.n) + '</b><span>' + prev.flag + " " + esc(prev.co) + " ・ " + esc(prev.sec.name) + '</span><p>' + esc(prev.d0 || "") + '</p></div>';
    else h += '<div class="kb-learn kb-hint">こたえると、その会社の 国・業種・ひとことが 出るよ</div>';
    const tag = revSet.has(q.art) ? '<span class="kb-tag rev">🔁 ふくしゅう</span>' : (pre && !pre.has(q.art) ? '<span class="kb-tag new">🆕 はじめまして</span>' : "");
    h += '<div class="kb-q"><span class="kb-ic">' + q.e + '</span><div><p class="spot">' + esc(q.n) + '</p>' + tag + '</div></div>';
    return h;
  }
  /* ── 結果・図鑑の くわしい 情報 ── */
  function info(q){
    const tag = last && last.fresh.includes(q.art) ? '<span class="kb-tag new">🆕 はじめて 出会った</span>' : last && last.rev.includes(q.art) ? '<span class="kb-tag rev">🔁 ふくしゅう</span>' : "";
    let h = '<div class="kb-info">' + tag;
    if(q.dl) h += '<p class="kb-more">' + esc(q.dl) + '</p>';
    h += '<dl class="kb-dl"><dt>国</dt><dd>' + q.flag + " " + esc(q.co) + (q.co === q.rg ? "" : '(' + esc(q.rg) + ')') + '</dd><dt>業種</dt><dd>' + q.sec.icon + " " + esc(q.sec.name) + (q.in && q.in !== q.sec.name ? "・" + esc(q.in) : "") + '</dd>';
    if(q.t) h += '<dt>ティッカー</dt><dd>' + esc(q.t) + (q.x ? '(' + esc(q.x) + (q.adr ? "・ADR" : "") + ')' : "") + '</dd>';
    if(q.ix) h += '<dt>指数</dt><dd>' + esc(q.ix) + '</dd>';
    if(q.mc) h += '<dt>時価総額</dt><dd>' + esc(q.mc) + '<small>(' + esc(D.asOf) + '時点)</small></dd>';
    h += '</dl>';
    if(q.u) h += '<a class="gmap" href="' + esc(q.u) + '" target="_blank" rel="noopener noreferrer">🏢 公式サイトを見る</a>';
    h += '<a class="gmap" href="https://ja.wikipedia.org/' + (q.w ? "wiki/" + encodeURIComponent(q.w) : "w/index.php?search=" + encodeURIComponent(q.co === "日本" ? q.n : (q.j || q.n))) + '" target="_blank" rel="noopener noreferrer">📖 Wikipedia' + (q.w ? " で くわしく" : " で さがす") + '</a>';
    return h + '</div>';
  }

  /* ── ホーム: 集めた会社・称号・マスターの えらぶ列 ── */
  let masterCur = null;
  function masterNow(){ if(!masterCur){ try{ masterCur = localStorage.getItem("flick-kabu-master"); }catch(e){} } return MASTER.has(masterCur) ? masterCur : "kmjp"; }
  function cardModes(cur){
    if(MASTER.has(cur)){ masterCur = cur; try{ localStorage.setItem("flick-kabu-master", cur); }catch(e){} }
    return COURSES.map(C => C.m).concat([masterNow(), "kfuku"]);
  }
  function home(m){
    const d = discovered(), n = d.size, t = titleOf(n), nx = nextTitle(n);
    const reg = REGIONS.map(R => { const all = pools[R.m], got = all.filter(q => d.has(q.art)).length;
      return '<li><span class="rn">' + R.icon + " " + R.name + (got >= all.length ? " 🏅" : "") + '</span><span class="rc"><b>' + fmt(got) + '</b> / ' + fmt(all.length) + '社</span><i style="--w:' + (got / all.length * 100).toFixed(1) + '%"></i></li>'; }).join("");
    $("#kabu-panel").innerHTML = '<section class="kb-panel">' +
      '<p class="kb-total">🌏 世界の会社 <b>' + fmt(n) + '</b> / ' + fmt(TOTAL) + '社 発見</p><div class="kb-bar" style="--w:' + (n / TOTAL * 100).toFixed(1) + '%"></div>' +
      '<ul class="kb-reg">' + reg + '</ul>' +
      '<p class="kb-title">' + (t ? t[1] + " いまの称号「<b>" + esc(t[2]) + "</b>」" : "🎒 さいしょの 称号まで あと " + (10 - n) + "社") +
      (nx && t ? '<small>つぎ「' + esc(nx[2]) + '」まで あと ' + fmt(nx[0] - n) + '社</small>' : "") + '</p>' +
      '<div class="kb-btns"><button type="button" class="kb-btn" id="kb-zukan">📖 企業図鑑</button><button type="button" class="kb-btn" id="kb-fuku">🔁 ふくしゅう' + (weakCount() ? "(にがて " + weakCount() + "社)" : "") + '</button></div>' +
      '<p class="kb-note">' + esc(D.note) + '</p></section>';
    $("#kb-zukan").onclick = () => openZukan();
    $("#kb-fuku").onclick = () => { setMode("kfuku"); const x = $("#lv-title"); if(x) x.scrollIntoView({ behavior:"smooth", block:"start" }); };
    // マスターの 地域・業種
    const chips = $("#kabu-chips");
    if(MASTER.has(m)){
      const b = (x, label) => '<button type="button" data-m="' + x + '"' + (x === m ? ' class="on"' : "") + '>' + label + '</button>';
      chips.innerHTML = '<div class="kb-chips"><p>地域で えらぶ</p><div>' + REGIONS.map(R => b(R.m, R.icon + " " + R.name)).join("") + '</div>' +
        '<p>業種で えらぶ</p><div>' + SECTORS.map(S => b(S.m, S.icon + " " + S.name)).join("") + '</div>' +
        '<p class="kb-goal">🏆 目標: ' + fmt(TOTAL) + '社 ぜんぶと 出会って「世界企業マスター」</p></div>';
      chips.querySelectorAll("button").forEach(x => x.addEventListener("click", () => setMode(x.dataset.m)));
    }else chips.innerHTML = COURSES.some(C => C.m === m) ? '<p class="kb-lead">' + esc(COURSES.find(C => C.m === m).lead) + '。1回 10問。' + (m === "kbeg" ? "" : "新しい会社 7問 + ふくしゅう 3問。") + '</p>' : "";
  }
  function lvInfo(m, i){
    if(m === "kfuku") return { name:"🔁 ふくしゅう", sub:"にがて・ひさしぶりの 10社", short:"ふくしゅう" };
    const si = stageInfo[m];
    if(si){ const s = si.stages[i], g = si.offset + i + 1;
      return { name:"Lv." + g, sub:s.def.length ? "🆕" + s.fresh.length + "社 + 🔁" + s.def.length + "社" : "🆕 " + s.fresh.length + "社", short:"Lv." + g }; }
    return { name:"ステージ" + (i + 1), sub:"10社", short:"マスター" + (i + 1) };
  }

  /* ── 企業図鑑 ── */
  let zf = { reg:"", sec:"", cs:"" , shown:120 };
  function openZukan(){
    let sh = document.getElementById("kb-zk");
    if(!sh){ sh = document.createElement("div"); sh.id = "kb-zk"; sh.className = "prof-sheet kb-zk"; document.body.appendChild(sh);
      sh.addEventListener("click", e => { if(e.target === sh) closeZukan(); }); }
    zf.shown = 120; drawZukan(); sh.classList.remove("hidden"); document.body.classList.add("kb-lock");
  }
  function closeZukan(){ const sh = document.getElementById("kb-zk"); if(sh) sh.classList.add("hidden"); const z = document.getElementById("kb-zd"); if(z){ z.innerHTML = ""; z.classList.remove("on"); } document.body.classList.remove("kb-lock"); }
  function drawZukan(){
    const sh = document.getElementById("kb-zk"), d = discovered();
    const list = ALL.filter(q => (!zf.reg || q.rg === zf.reg) && (!zf.sec || q.s === zf.sec) && (zf.cs === "" || q.cs === +zf.cs)).sort(byFame);
    const got = list.filter(q => d.has(q.art)).length;
    const opt = (v, label, cur) => '<option value="' + v + '"' + (String(cur) === String(v) ? " selected" : "") + '>' + label + '</option>';
    sh.innerHTML = '<div class="prof-box kb-zbox"><button type="button" class="kb-x" aria-label="とじる">×</button><h2>📖 企業図鑑</h2>' +
      '<p class="kb-zsum"><b>' + fmt(got) + '</b> / ' + fmt(list.length) + '社 発見</p>' +
      '<div class="kb-zf"><select id="kb-zreg">' + opt("", "🌏 地域", zf.reg) + REGIONS.map(R => opt(R.name, R.icon + " " + R.name, zf.reg)).join("") + '</select>' +
      '<select id="kb-zsec">' + opt("", "🏭 業種", zf.sec) + SECTORS.map(S => opt(S.id, S.icon + " " + S.name, zf.sec)).join("") + '</select>' +
      '<select id="kb-zcs">' + opt("", "📚 コース", zf.cs) + ["入門", "初級", "中級", "上級", "マスター"].map((x, i) => opt(i, x, zf.cs)).join("") + '</select></div>' +
      '<div class="kb-grid">' + list.slice(0, zf.shown).map(q => d.has(q.art)
        ? '<button type="button" class="kb-tile on" data-id="' + esc(q.art) + '"><span>' + q.flag + '</span><b>' + esc(q.n) + '</b><small>' + q.sec.icon + " " + esc(q.sec.name) + '</small></button>'
        : '<button type="button" class="kb-tile" data-id="' + esc(q.art) + '"><span>❔</span><b>？？？</b><small>' + ["入門", "初級", "中級", "上級", "マスター"][q.cs] + '</small></button>').join("") + '</div>' +
      (list.length > zf.shown ? '<button type="button" class="kb-btn kb-more-btn">もっと 見る(あと ' + fmt(list.length - zf.shown) + '社)</button>' : "") +
      '<p class="kb-note">' + esc(D.note) + '</p></div>';
    sh.querySelector(".kb-x").onclick = closeZukan;
    sh.querySelector("#kb-zreg").onchange = e => { zf.reg = e.target.value; zf.shown = 120; drawZukan(); };
    sh.querySelector("#kb-zsec").onchange = e => { zf.sec = e.target.value; zf.shown = 120; drawZukan(); };
    sh.querySelector("#kb-zcs").onchange = e => { zf.cs = e.target.value; zf.shown = 120; drawZukan(); };
    const more = sh.querySelector(".kb-more-btn"); if(more) more.onclick = () => { zf.shown += 240; drawZukan(); };
    sh.querySelectorAll(".kb-tile").forEach(b => b.onclick = () => detail(b.dataset.id));
  }
  function detail(id){
    const q = BY.get(id), e = log()[id];
    let box = document.getElementById("kb-zd");
    if(!box){ box = document.createElement("div"); box.id = "kb-zd"; document.body.appendChild(box); }
    if(!q) return;
    const where = q.cs < 4 ? COURSES[q.cs].name + "コース(" + lvWhere(q) + ")" : "マスター(" + q.rg + " / " + q.sec.name + ")";
    box.innerHTML = '<div class="kb-card">' + (e
      ? '<button type="button" class="kb-x" aria-label="とじる">×</button><p class="kb-cn"><span class="kb-ic">' + q.e + '</span><ruby>' + esc(q.n) + '<rt>' + esc(q.r) + '</rt></ruby></p>' +
        (q.j && q.j !== q.n ? '<p class="kb-j">' + esc(q.j) + '</p>' : "") + '<p class="kb-d">' + q.d + '</p>' + info(q) +
        '<p class="kb-st">出会った回数 ' + e[0] + '回' + (e[1] ? '・まちがい ' + e[1] + '回' : "") + '</p>'
      : '<button type="button" class="kb-x" aria-label="とじる">×</button><p class="kb-cn"><span class="kb-ic">❔</span>？？？</p><p class="kb-d">まだ 出会っていない 会社です。<b>' + esc(where) + '</b>で 出会えるよ。</p>') + '</div>';
    box.classList.add("on");
    box.querySelector(".kb-x").onclick = () => { box.innerHTML = ""; box.classList.remove("on"); };
  }
  function lvWhere(q){ const m = COURSES[q.cs].m, si = stageInfo[m]; const i = si.stages.findIndex(s => s.fresh.includes(q)); return i < 0 ? "" : "Lv." + (si.offset + i + 1); }

  /* ── 見た目(この ページだけ) ── */
  const css = `
.map-card{display:none}
.kb-panel{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:14px 16px;margin:0 0 18px}
.kb-total{margin:0;font-weight:900;font-size:17px}.kb-total b{font-size:26px;color:#0f6fa8;font-variant-numeric:tabular-nums}
.kb-bar,.kb-reg i{display:block;height:8px;border-radius:99px;background:var(--soft);overflow:hidden;margin:6px 0 10px;position:relative}
.kb-bar::after,.kb-reg i::after{content:"";position:absolute;inset:0;width:var(--w);background:linear-gradient(90deg,#0f6fa8,#22c55e);border-radius:99px}
.kb-reg{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:4px 14px}
.kb-reg li{display:grid;grid-template-columns:1fr auto;font-size:12.5px;align-items:baseline;gap:4px}.kb-reg .rn{white-space:nowrap}.kb-reg i{grid-column:1/-1;height:5px;margin:2px 0 4px}
.kb-reg .rc{font-variant-numeric:tabular-nums;color:var(--muted)}.kb-reg .rc b{color:var(--ink)}
.kb-title{margin:8px 0 10px;font-size:14px}.kb-title small{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.kb-btns{display:flex;gap:8px}.kb-btn{flex:1;padding:11px 8px;border-radius:14px;border:1.5px solid var(--line);background:var(--soft);color:var(--ink);font:inherit;font-weight:800;font-size:14px}
.kb-note{font-size:11px;color:var(--muted);line-height:1.6;margin:10px 0 0}
.kb-lead{color:var(--muted);font-size:13px;margin:-6px 0 12px;line-height:1.7}
.kb-chips p{margin:0 0 6px;font-size:13px;font-weight:800;color:var(--muted)}.kb-chips div{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}
.kb-chips button{padding:7px 11px;border-radius:999px;border:1.5px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-size:13px;font-weight:700}
.kb-chips button.on{background:#e0202e;border-color:#e0202e;color:#fff}.kb-chips .kb-goal{color:#e0202e;margin-bottom:12px}
.kb-learn{background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;border-radius:10px;padding:6px 10px;margin:0 0 8px;font-size:13px;line-height:1.5;animation:kbIn .35s ease-out}
.kb-learn b{margin-right:6px}.kb-learn p{margin:2px 0 0;color:#047857;font-size:12.5px}.kb-learn.kb-hint{background:var(--soft);border-color:var(--line);color:var(--muted)}
@keyframes kbIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.kb-q{display:flex;gap:12px;align-items:center;margin:0 0 10px}.kb-q .spot{font-size:clamp(22px,7vw,30px);line-height:1.2;word-break:break-word}
.kb-ic{font-size:38px;width:58px;height:58px;display:grid;place-items:center;background:linear-gradient(135deg,#c9efff,#4fb8ff);border-radius:14px;flex:none}
.kb-tag{display:inline-block;margin-top:4px;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:99px}.kb-tag.new{background:#fef3c7;color:#92400e}.kb-tag.rev{background:#fce7f3;color:#9d174d}
.kb-info{margin-top:8px}.kb-info .kb-tag{margin:0 0 6px}.kb-more{font-size:13px;color:var(--muted);line-height:1.7;margin:4px 0}
.kb-dl{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;margin:8px 0 2px;font-size:13px}.kb-dl dt{color:var(--muted);font-weight:700}.kb-dl dd{margin:0}.kb-dl small{color:var(--muted);margin-left:4px}
.intro p{line-height:2}.pins-msg small{display:block;font-weight:700;color:var(--muted);font-size:13px}
.kb-earn{display:block;margin-top:8px;font-size:16px;color:#b45309;animation:kbIn .5s ease-out}
.kb-zk .kb-zbox{max-width:560px;position:relative}.kb-x{position:absolute;right:10px;top:8px;border:0;background:none;font-size:26px;color:var(--muted);line-height:1}
.kb-zsum{text-align:center;margin:4px 0 10px}.kb-zsum b{font-size:22px;color:#0f6fa8}
.kb-zf{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:0 0 10px}.kb-zf select{font:inherit;font-size:12.5px;padding:8px 4px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#334155;min-width:0}
.kb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:6px}
.kb-tile{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:12px;border:1.5px dashed #cbd5e1;background:#f8fafc;color:#94a3b8;font:inherit;min-height:74px}
.kb-tile span{font-size:20px}.kb-tile b{font-size:12px;line-height:1.3;word-break:break-word;text-align:center}.kb-tile small{font-size:10.5px}
.kb-tile.on{border-style:solid;border-color:#bae6fd;background:#f0f9ff;color:#0f172a}.kb-tile.on small{color:#475569}
.kb-more-btn{width:100%;margin-top:10px;flex:none}
#kb-zd{position:fixed;left:0;right:0;bottom:0;z-index:60;max-height:72vh;overflow-y:auto;padding:0 10px calc(10px + env(safe-area-inset-bottom));display:none}
#kb-zd.on{display:block;animation:kbUp .25s ease-out}@keyframes kbUp{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}
#kb-zd .kb-card{max-width:540px;margin:0 auto;box-shadow:0 -10px 30px -8px rgba(0,0,0,.35);background:#f0f9ff}
.kb-card{position:relative;margin-top:12px;border:1.5px solid #bae6fd;background:#f0f9ff;border-radius:16px;padding:12px 14px;color:#0f172a}
.kb-cn{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:900;margin:0}.kb-cn .kb-ic{width:46px;height:46px;font-size:28px}.kb-cn rt{font-size:.5em;color:#475569}
.kb-j{margin:4px 0 0;color:#475569;font-size:13px}.kb-d{margin:8px 0 0;font-size:14px;line-height:2}.kb-st{font-size:12px;color:#475569;margin:8px 0 0}
.kb-card .gmap{margin-top:8px;margin-right:6px}
body.kb-lock{overflow:hidden}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const hb = document.getElementById("home-btn"); if(hb) hb.textContent = "コースに もどる";

  return { kind:"company", modes:MODES_ALL, pools, levels, maps, colors, owns:m => MODES_ALL.includes(m), discoveredIn, makeQs, answered, finished, resultMsg,
           card, info, home, lvInfo, cardModes, byArt:id => BY.get(id), noRank:(m, lv) => m === "kfuku" || lv >= 60, openZukan };
})();
