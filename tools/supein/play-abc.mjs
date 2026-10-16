// フリックスペイン語を ABC の 打ちかたで 全 ステージ 通す(1問おきに 記号つき / 記号なしで 打つ)。python3 -m http.server 8765 を 起こしてから: node tools/supein/play-abc.mjs (W=320 も)
import { createRequire } from 'module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
const b = await chromium.launch(); const W = +(process.env.W || 390);
const p = await b.newPage({ viewport: { width: W, height: 844 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/, r => r.abort());
await p.addInitScript(() => { try { localStorage.setItem('flick-es-input', 'abc'); } catch (e) {} });
await p.goto('http://localhost:8765/supein/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(800);
const res = await p.evaluate(async () => {
  const out = { ok: 0, fails: [], flashes: 0 }; const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (const m of Object.keys(LEVELS)) for (let lv = 0; lv < LEVELS[m].length; lv++) {
    start(m, lv); locked = false; running = true; qStart = performance.now();
    const ans = document.getElementById('ans'); let g = 0, stuck = null;
    while (running && g++ < 50 && idx < qs.length) {
      const before = idx, text = qs[idx].t, plainMode = (idx % 2 === 1);
      const src = plainMode ? qs[idx].er : text;
      for (const ch of src) { ans.value += ch; ans.dispatchEvent(new Event('input'));
        if (ans.classList.contains('bad')) { stuck = 'bad at ' + ans.value + ' / ' + text; break; } if (idx !== before) break; }
      if (stuck) break; if (idx === before && running) { stuck = 'not advanced ' + text; break; }
      out.flashes = document.querySelectorAll('.es-acc').length > 0 ? out.flashes + 1 : out.flashes;
    }
    running = false; if (stuck) out.fails.push(m + ' L' + (lv + 1) + ': ' + stuck); else out.ok++;
    await sleep(0);
  }
  return out;
});
console.log(JSON.stringify({ errs, ok: res.ok, flashes: res.flashes, fails: res.fails.slice(0, 10), nf: res.fails.length }));
await b.close();
