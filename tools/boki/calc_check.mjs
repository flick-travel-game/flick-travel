// フリック日商簿記 calc.js の 検査: 各 generator を N 回 まわす
import fs from "fs";
const file = process.argv[2] || new URL("./calc.js", import.meta.url).pathname;  // node tools/boki/calc_check.mjs [calc.js] [回数] [--show]
const N = +(process.argv[3] || 3000);
const text = fs.readFileSync(file, "utf8");
const { CALC, CALC_G, CALC_LV } = new Function(text + "; return {CALC, CALC_G, CALC_LV};")();
const G = new Set(CALC_G.map(x => x[0])), LV = new Set(CALC_LV.map(x => x[0]));
const BAD = /NaN|undefined|Infinity|null|\[object/;
const nums = s => (String(s).replace(/,/g, "").match(/\d+(?:\.\d+)?/g) || []).map(Number);
const key = s => String(s).replace(/\s+/g, "");
const numKey = s => nums(s).join("|");
let fail = 0; const per = {}, tally = {};
CALC.forEach((gen, i) => {
  let nulls = 0, made = 0, errs = []; const sampleQ = new Set();
  for(let t = 0; t < N; t++){
    let P = null, k = 0;
    for(; k < 50; k++){ P = gen(); if(P) break; nulls++; }
    if(!P){ errs.push("50回 null"); continue; }
    made++;
    const e = [];
    if(!G.has(P.g)) e.push("bad g " + P.g);
    if(!LV.has(P.lv)) e.push("bad lv " + P.lv);
    if(typeof P.q !== "string" || !P.q.trim()) e.push("empty q");
    if(typeof P.a !== "string" || !P.a.trim()) e.push("empty a");
    if(!Array.isArray(P.w) || !Array.isArray(P.ex) || !P.ex.length) e.push("w/ex not array");
    const all = [P.q, P.a, ...(P.w || []), ...(P.ex || [])].join("\n");
    if(BAD.test(all)) e.push("BAD token: " + all.match(BAD)[0]);
    const an = nums(P.a); if(!an.length || an.some(x => !Number.isFinite(x))) e.push("a has no finite number: " + P.a);
    const ws = [...new Set((P.w || []).map(key))].filter(x => x !== key(P.a));
    if(ws.length < 3) e.push("wrong<3: " + JSON.stringify(P.w));
    const wNum = new Set((P.w || []).map(numKey));
    if(wNum.has(numKey(P.a))) e.push("w numerically equals a: " + P.a + " / " + JSON.stringify(P.w));
    if(/円/.test(P.a) && /\.\d/.test(P.a)) e.push("non-integer yen: " + P.a);
    if(e.length) errs.push(e.join("; ") + "  Q=" + P.q.slice(0, 60));
    if(sampleQ.size < 2) sampleQ.add(P);
    if(t === 0){ tally[P.lv] = tally[P.lv] || {}; tally[P.lv][P.g] = (tally[P.lv][P.g] || 0) + 1; per[i] = P; }
  }
  const nullRate = nulls / (made + nulls);
  if(nullRate > 0.5) errs.push("null rate " + (nullRate * 100).toFixed(1) + "%");
  if(errs.length){ fail++; console.log("✗ #" + i, errs.length, "errors; e.g.", [...new Set(errs)].slice(0, 3)); }
});
console.log("generators:", CALC.length, " runs each:", N);
for(const [lv] of CALC_LV){ const t = tally[lv] || {}; console.log(lv, Object.values(t).reduce((a, b) => a + b, 0), JSON.stringify(t)); }
console.log(fail ? "FAIL: " + fail + " generators" : "ALL PASS");
if(process.argv.includes("--show")) for(const i in per){ const P = per[i]; console.log("\n#" + i, P.lv, P.g, "\n Q:", P.q, "\n A:", P.a, "\n W:", P.w.join(" / "), "\n EX:", P.ex.join(" | ")); }
process.exit(fail ? 1 : 0);
