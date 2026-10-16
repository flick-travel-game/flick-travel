// 書き取りの マスを Playwright で 試す(指の かわりに マウスで お手本の 線を なぞる)。
//   python3 -m http.server 8765 &  →  node tools/kanken/kaki-test.mjs [幅=390]
// ・書く 旅(knkaki / kndoon)の ぜんぶの ステージを、お手本どおり(少し ずらして 小さめ)に 書いて 進めるか
// ・逆向きに 書いた 1画は まちがいに なるか / 2回 まちがえると ヒントが 出るか
// ・書いている あいだ 画面が 動かないか(スクロール位置)/ 入力欄(キーボード)が かくれるか
import { createRequire } from 'module'; const { chromium } = createRequire('/opt/node22/lib/node_modules/')('playwright');
const W = +(process.argv[2] || 390);
const MODES = (process.argv[3] || 'knkaki,kndoon').split(',');  // 1つの 旅だけ: node … 390 kndoon
const [FROM, TO] = (process.argv[4] || '1-9999').split('-').map(Number);  // ステージを しぼる: node … 390 knkaki 1-60(書き取りは 220 ステージ あるので 分けて 走らせる)
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: 760 }, hasTouch: false });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/, r => r.abort());
await p.goto('http://localhost:8765/kanken/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(700);
const out = [];
async function drawStroke(pts, opt = {}) {
  const box = await p.locator('.kk-pad canvas').boundingBox();
  const sc = opt.scale || 1, ox = opt.ox || 0, oy = opt.oy || 0;
  let a = [];
  for (let i = 0; i < pts.length; i += 2) a.push([pts[i], pts[i + 1]]);
  if (opt.reverse) a.reverse();
  a = a.map(([x, y]) => [box.x + ((54.5 + (x - 54.5) * sc) + ox) / 109 * box.width, box.y + ((54.5 + (y - 54.5) * sc) + oy) / 109 * box.height]);
  await p.mouse.move(a[0][0], a[0][1]); await p.mouse.down();
  for (const [x, y] of a.slice(1)) await p.mouse.move(x, y, { steps: 2 });
  await p.mouse.up();
}
for (const m of MODES) {
  const nLv = await p.evaluate(m => LEVELS[m].length, m);
  for (let lv = FROM - 1; lv < Math.min(nLv, TO); lv++) {
    await p.evaluate(([m, lv]) => start(m, lv), [m, lv]);
    await p.waitForTimeout(2300);
    for (let i = 0; i < 10; i++) {
      await p.waitForSelector('.kk-pad canvas', { timeout: 3000 });
      await p.waitForFunction(() => KANKEN_STROKES[qs[idx].kj] && document.querySelector('.kk-pad[data-on]'), null, { timeout: 8000 });  // 書き順の データは あとから 読む
      await p.waitForTimeout(60);
      const st = await p.evaluate(() => ({ kj: qs[idx].kj, S: KANKEN_STROKES[qs[idx].kj].map(s => s[1]), field: getComputedStyle(document.querySelector('#game .field')).display, sy: scrollY, idx }));
      if (st.field !== 'none') out.push(`${m} Lv${lv + 1} ${st.kj}: 入力欄が 出ている`);
      if (lv === 0 && i === 0) {  // まちがい → ヒント
        await drawStroke(st.S[0].length > 4 && Math.hypot(st.S[0][0] - st.S[0][30], st.S[0][1] - st.S[0][31]) > 15 ? st.S[0] : st.S[0], { reverse: true, oy: 25 });
        await drawStroke(st.S[0], { reverse: true, oy: 25 });
        const r = await p.evaluate(() => ({ miss: qMiss, cnt: document.querySelector('.kk-cnt').textContent }));
        out.push(`まちがい 2回 → qMiss=${r.miss} / ${r.cnt}`);
      }
      // 小さめ・右下に ずらして 書く(くせの 合わせかたを 試す)
      const opt = lv % 2 ? { scale: .82, ox: 5, oy: 4 } : {};
      for (const s of st.S) await drawStroke(s, opt);
      await p.waitForTimeout(260);
      const now = await p.evaluate(() => ({ idx, res: !document.querySelector('#result').classList.contains('hidden'), sy: scrollY }));
      if (!now.res && now.idx === st.idx) { out.push(`❌ ${m} Lv${lv + 1} ${i + 1}問め「${st.kj}」(${st.S.length}画)が 合格に ならない: ` + await p.evaluate(() => document.querySelector('.kk-cnt').textContent)); await p.evaluate(() => next()); }
      if (now.sy !== st.sy) out.push(`${m} 画面が 動いた ${st.sy}→${now.sy}`);
      if (now.res) break;
    }
    await p.waitForTimeout(200);
    console.log(`${m} Lv${lv + 1} おわり`);
    if (lv === 0) await p.screenshot({ path: `/tmp/claude-0/kk-${m}-${W}.png` });
  }
  out.push(`${m}: ${nLv} ステージ 通した`); console.log(out.splice(0).join('\n'));
}
await p.evaluate(() => start('knkaki', 0)); await p.waitForTimeout(2400); await p.screenshot({ path: `/tmp/claude-0/kk-pad-${W}.png` });
console.log(out.join('\n')); console.log('pageerror:', errs.length ? errs : 'なし');
await b.close();
