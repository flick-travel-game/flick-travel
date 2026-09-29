import { createRequire } from 'module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
const VAR = process.env.VAR || 'ime';
const games = process.argv.slice(2).length ? process.argv.slice(2) : ['', 'rekishi/', 'uchu/', 'karada/', 'kabu/', 'ai/', 'eikaiwa/', 'rika/', 'seibi/', 'patissier/', 'kokugo/', 'sugaku/', 'hoiku/', 'kango/', 'gamedev/', 'biyo/', 'kyoryu/'];
const b = await chromium.launch();
const report = [];
for (const g of games) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, r => r.abort());
  await p.goto('http://localhost:8765/' + g, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(800);
  const res = await p.evaluate(async (VAR) => {
    const out = { modes: {}, fails: [] };
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    // 途中の 字(濁点・半濁点・小さい字の 切りかえ)を 通る 打ちかた
    const steps = ch => {
      const d = ch.normalize('NFD');
      if (d.length === 2 && (d[1] === '゙' || d[1] === '゚')) {
        const b0 = d[0];
        if (VAR === 'nfd') return [b0, b0 + d[1]];
        if (VAR === 'spacing') return [b0, b0 + (d[1] === '\u3099' ? '\u309B' : '\u309C')];
        return d[1] === '゙' ? [b0, ch] : [b0, (b0 + '゙').normalize('NFC'), ch];
      }
      const smallMap = { 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'っ': 'つ', 'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お', 'ゎ': 'わ' };
      if (smallMap[ch]) return [smallMap[ch], ch];
      return [ch];
    };
    for (const m of Object.keys(LEVELS)) {
      const nLv = LEVELS[m].length; let ok = 0;
      for (let lv = 0; lv < nLv; lv++) {
        try {
          start(m, lv);
        } catch (e) { out.fails.push(`${m} L${lv + 1}: start ${e.message}`); break; }
        locked = false; running = true; qStart = performance.now();
        const ans = document.getElementById('ans');
        let guard = 0, stuck = null;
        while (running && guard++ < 200 && idx < qs.length) {
          const before = idx, t = target;
          if (!t) { stuck = 'target empty'; break; }
          let typed = '';
          if (VAR === 'commit') ans.dispatchEvent(new Event('compositionstart'));
          for (const ch of t) {
            const st = steps(ch);
            for (let k = 0; k < st.length; k++) {
              ans.value = ans.value.slice(0, ans.value.length - (k ? st[k - 1].length : 0)) + st[k];
              ans.dispatchEvent(new Event('input'));
              if (idx !== before || !running) break;
              if (ans.classList.contains('bad')) { stuck = `err at "${typed}${st[k]}" target "${t}"`; break; }
            }
            if (stuck || idx !== before || !running) break;
            typed += ch;
          }
          if (VAR === 'commit') { ans.dispatchEvent(new Event('compositionend')); await sleep(1); }
          if (stuck) break;
          if (idx === before && running) { stuck = `not advanced after "${t}"`; break; }
        }
        running = false; try { cancelAnimationFrame(raf); } catch (e) { }
        if (stuck) out.fails.push(`${m} L${lv + 1} Q${idx + 1}: ${stuck}`); else ok++;
        await sleep(0);
      }
      out.modes[m] = `${ok}/${nLv}`;
    }
    return out;
  }, VAR);
  report.push({ game: g || '(world)', errs: [...new Set(errs)].slice(0, 5), ...res });
  console.log(JSON.stringify({ game: g || '(world)', errs: [...new Set(errs)].slice(0, 5), modes: res.modes, fails: res.fails.slice(0, 15), nfails: res.fails.length }));
  await p.close();
}
await b.close();
