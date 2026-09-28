import { createRequire } from 'module';
const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
const games = process.argv.slice(2).length ? process.argv.slice(2)
  : ['', 'rekishi/', 'uchu/', 'karada/', 'kabu/', 'ai/', 'eikaiwa/', 'rika/', 'seibi/', 'patissier/', 'kokugo/', 'sugaku/', 'hoiku/'];
const W = +(process.env.W || 390), H = +(process.env.H || 844);
const b = await chromium.launch();

for (const g of games) {
  const page = await b.newPage({ viewport: { width: W, height: H } });
  const errs = new Set();
  page.on('pageerror', e => errs.add('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') { const t = m.text(); if (!/net::|Failed to load resource|ERR_/.test(t)) errs.add('CONSOLE: ' + t.slice(0, 160)); } });
  await page.route(/^https?:\/\/(?!localhost)/, r => r.abort());
  await page.goto('http://localhost:8765/' + g, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);

  const problems = await page.evaluate(async () => {
    const out = [];
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const check = (label) => {
      const ow = document.documentElement.scrollWidth - innerWidth;
      if (ow > 0) out.push(`${label}: よこに はみ出し ${ow}px`);
      const seen = new Set();
      for (const i of document.images) {
        if (i.complete && !i.naturalWidth && i.currentSrc && i.currentSrc.includes(location.host)) {
          const s = i.getAttribute('src'); if (!seen.has(s)) { seen.add(s); out.push(`${label}: 絵が 出ない ${s}`); }
        }
      }
      for (const el of document.querySelectorAll('section:not(.hidden) *')) {
        if (el.children.length || !vis(el)) continue;
        const t = (el.textContent || '').trim();
        if (t && /undefined|NaN|\[object Object\]/.test(t)) { const k = label + t.slice(0, 40); if (!seen.has(k)) { seen.add(k); out.push(`${label}: へんな 字 "${t.slice(0, 60)}"`); } }
      }
      // buttons taller than 0 but text overflowing their box
      for (const el of document.querySelectorAll('section:not(.hidden) button')) {
        if (!vis(el)) continue;
        if (el.scrollWidth - el.clientWidth > 8) out.push(`${label}: ボタンの 字が はみ出し "${(el.textContent || '').trim().slice(0, 24)}"`);
      }
    };
    const home = () => { try { show('home'); } catch (e) { } };

    check('ホーム');
    // すべての 見えている ボタンを 押す(ホームから)
    const labels = [...document.querySelectorAll('section:not(.hidden) button')].filter(vis)
      .map(e => (e.textContent || '').trim().slice(0, 30));
    for (let i = 0; i < labels.length; i++) {
      home(); await sleep(60);
      const list = [...document.querySelectorAll('section:not(.hidden) button')].filter(vis);
      const el = list[i]; if (!el) continue;
      const label = (el.textContent || '').trim().slice(0, 24) || '(名前なし)';
      const beforeVisible = [...document.querySelectorAll('section')].filter(s => !s.classList.contains('hidden')).map(s => s.id).join(',');
      try { el.click(); } catch (e) { out.push(`ホーム→${label}: エラー ${String(e.message).slice(0, 60)}`); continue; }
      await sleep(320);
      check('ホーム→' + label);
      const after = [...document.querySelectorAll('section')].filter(s => !s.classList.contains('hidden')).map(s => s.id).join(',');
      // 画面が かわったのに 出口の ボタンが 1つも 無い = 行き止まり
      if (after !== beforeVisible) {
        const outBtns = [...document.querySelectorAll('section:not(.hidden) button')].filter(vis)
          .filter(x => /もどる|とじる|×|✕|やめる|ホーム|閉じ/.test(x.textContent || ''));
        if (!outBtns.length && after !== 'game') out.push(`ホーム→${label}: もどる ボタンが ない(${after})`);
      }
      // 開いた ところの 中の ボタンも 1つずつ 押して エラーだけ 見る
      const inner = [...document.querySelectorAll('section:not(.hidden) button')].filter(vis).slice(0, 12);
      for (const ib of inner) { try { ib.click(); } catch (e) { out.push(`${label} の 中の "${(ib.textContent || '').trim().slice(0, 16)}": エラー`); } await sleep(40); }
    }
    home(); await sleep(100);

    // 1レベルずつ 最後まで あそんで 結果を みる
    for (const m of Object.keys(LEVELS)) {
      const play = async (lv) => {
        start(m, lv); locked = false; running = true; qStart = performance.now();
        const a = document.getElementById('ans');
        let guard = 0;
        while (running && idx < qs.length && guard++ < 60) {
          const before = idx; a.value = target; a.dispatchEvent(new Event('input'));
          if (idx === before) return 'すすまない';
        }
        return running ? 'おわらない' : null;
      };
      const e1 = await play(0); if (e1) out.push(`${m} Lv.1: ${e1}`);
      await sleep(150);
      const t = ((document.getElementById('r-time') || {}).textContent || '').trim();
      if (!/^\d+\.\d\d$/.test(t)) out.push(`${m}: 結果の 時間が へん "${t}"`);
      check(`${m} の 結果`);
      // やめた あと もう一度
      start(m, 0); locked = false; running = true; document.getElementById('quit').click();
      const e2 = await play(0); if (e2) out.push(`${m}: やめた あと ${e2}`);
      await sleep(80);
      home();
    }
    return out;
  }).catch(e => ['evaluate error ' + String(e.message).slice(0, 200)]);

  const uniq = [...new Set(problems)];
  console.log(JSON.stringify({ game: g || '(world)', w: W, errs: [...errs].slice(0, 6), n: uniq.length, problems: uniq.slice(0, 30) }));
  await page.close();
}
await b.close();
