  /* ── 🧮 計算問題(けいくん 2026-09-27「受験に必要な計算は入れた方がいいと思う」)──
     ・算数 → 高校受験 → 大学受験で よく 出る 形の 計算を、数字を 毎回 かえて 出す(**問題も 答えも プログラムが 作る**。過去問は 写さない)
     ・4択。まちがいの 3つは「よく ある まちがい」から 作る(符号の まちがい・約分 わすれ・2乗 わすれ・公式の とりちがえ など)
     ・答えた あとに とき方(式と 途中の 計算)を 出す
     ・⚠️ 「かずとも」の 単純計算(たし算〜わり算の タイム)とは かぶらない。ここは 考えかた・公式を 使う 計算
     ・1つの 問題 = { g:なかま, lv:"算数"/"高校受験"/"大学受験", q:問題文, a:答えの 字, w:[まちがいの 字…], ex:[とき方…] }
     ここは tools/sugaku/calc.js。tools/sugaku/make_sugaku_js.py が sugaku/sugaku.js に 入れる */
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const rnz = (a, b) => { let x = 0; while(!x) x = ri(a, b); return x; };
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; };
  const M = n => n < 0 ? "−" + (-n) : String(n);  // 負の数は 数学の −
  const PM = n => n < 0 ? "(" + M(n) + ")" : String(n);  // 負の数だけ かっこ
  const fr = (n, d) => { if(d < 0){ n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; return d === 1 ? M(n) : (n < 0 ? "−" : "") + Math.abs(n) + "/" + d; };
  const frac = (n, d) => fr(n, d);
  // √n を かんたんに: [外, 中](√72 → [6, 2])
  const sqs = n => { let o = 1, i = n; for(let k = 2; k * k <= i; k++) while(i % (k * k) === 0){ i /= k * k; o *= k; } return [o, i]; };
  const rt = n => { const [o, i] = sqs(n); return i === 1 ? String(o) : (o === 1 ? "" : o) + "√" + i; };
  const SUP = { 2:"²", 3:"³" };
  // 多項式(係数を 大きい 次数から)を x の 式に: [1,5,6] → x²+5x+6
  function poly(cs, v){
    v = v || "x"; const n = cs.length - 1; let s = "";
    cs.forEach((c, i) => { const p = n - i; if(!c) return;
      const sg = c < 0 ? "−" : (s ? "+" : ""), a = Math.abs(c), body = p === 0 ? String(a) : (a === 1 ? "" : a) + v + (p > 1 ? SUP[p] || "^" + p : "");
      s += sg + body; });
    return s || "0";
  }
  const lin = (a, b) => poly([a, b]);  // ax+b
  const fac = r => "(x" + (r < 0 ? "+" + (-r) : "−" + r) + ")";  // 解 r → (x−r)
  const nf = (x, d) => Number(x.toFixed(d)).toLocaleString("ja-JP", { maximumFractionDigits:d });
  const CALC_G = [["kazu", "🔢 数と計算"], ["shiki", "✏️ 式と方程式"], ["kansu", "📈 関数"], ["zukei", "🔺 図形"], ["data", "🎲 確率・データ"], ["koko", "♾️ 高校数学"]];
  const CALC_LV = [["算数", "🔰 算数"], ["高校受験", "🏫 高校受験"], ["大学受験", "🎓 大学受験"]];
  const CALC = [
    /* ─── 算数 ─── */
    () => { let b = ri(2, 9), d = ri(2, 9); while(d === b) d = ri(2, 9); const a = ri(1, b - 1), c = ri(1, d - 1);
      return { g:"kazu", lv:"算数", q:a + "/" + b + " + " + c + "/" + d + " = ？", a:frac(a * d + c * b, b * d),
        w:[frac(a + c, b + d), frac(a * c, b * d), frac(a * d + c * b, b + d), frac(a + c, b * d)],
        ex:["分母を そろえる(通分): 分母 " + b + " と " + d + " の 公倍数に する", a + "/" + b + " + " + c + "/" + d + " = " + (a * d) + "/" + (b * d) + " + " + (c * b) + "/" + (b * d) + " = " + (a * d + c * b) + "/" + (b * d), "約分して " + frac(a * d + c * b, b * d), "⚠️ 分子どうし・分母どうしを たすのは まちがい"] }; },
    () => { const b = ri(2, 9), a = ri(1, b - 1), d = ri(2, 9), c = ri(1, d - 1); if(a * d === b * c) return null;
      return { g:"kazu", lv:"算数", q:a + "/" + b + " ÷ " + c + "/" + d + " = ？", a:frac(a * d, b * c),
        w:[frac(a * c, b * d), frac(b * c, a * d), frac(a * d + 1, b * c), frac(a + d, b + c)],
        ex:["わる 分数は ひっくり返して かける", a + "/" + b + " × " + d + "/" + c + " = " + (a * d) + "/" + (b * c), "約分して " + frac(a * d, b * c)] }; },
    () => { const A = pk([800, 1200, 1500, 2000, 2400, 3000, 4500]), x = pk([10, 15, 20, 25, 30, 40]), ans = A * (100 - x) / 100;
      return { g:"kazu", lv:"算数", q:"定価 " + A.toLocaleString() + "円の 品物が " + x + "% 引き。売り値は 何円？", a:ans.toLocaleString() + "円",
        w:[(A * x / 100).toLocaleString() + "円", (A - x).toLocaleString() + "円", (A * (100 + x) / 100).toLocaleString() + "円"],
        ex:[x + "% 引き = 定価の (100 − " + x + ")% = " + (100 - x) + "%", A.toLocaleString() + " × " + (100 - x) / 100 + " = " + ans.toLocaleString() + "円", "⚠️ " + A.toLocaleString() + " × " + x / 100 + " は「引かれる 金額」"] }; },
    () => { const v = pk([4, 5, 6, 12, 15, 20, 30, 40, 45, 60]), m = pk([15, 20, 30, 40, 45, 90, 120]), d = v * m / 60;
      if(d !== Math.round(d * 10) / 10) return null;
      return { g:"kazu", lv:"算数", q:"時速 " + v + "km で " + m + "分 進むと、道のりは 何km？", a:nf(d, 1) + "km",
        w:[nf(v * m, 0) + "km", nf(v / m * 60, 1) + "km", nf(d * 2, 1) + "km", nf(m / v, 1) + "km"],
        ex:["道のり = 速さ × 時間", m + "分 = " + m + "/60 時間 = " + nf(m / 60, 2) + "時間", v + " × " + nf(m / 60, 2) + " = " + nf(d, 1) + "km", "⚠️ 分を 時間に なおして かける"] }; },
    () => { const g = pk([2, 3, 4, 6]), a = g * pk([2, 3, 5, 7]), b0 = g * pk([3, 4, 5, 7, 9]), b = a === b0 ? b0 + g : b0, l = a * b / gcd(a, b);
      return { g:"kazu", lv:"算数", q:a + " と " + b + " の 最小公倍数は？", a:String(l), w:[String(a * b), String(gcd(a, b)), String(l * 2), String(l / 2 | 0)],
        ex:["最大公約数は " + gcd(a, b), "最小公倍数 = " + a + " × " + b + " ÷ 最大公約数 = " + (a * b) + " ÷ " + gcd(a, b) + " = " + l, "⚠️ かけ算しただけ(" + a * b + ")は 公倍数だが いちばん 小さくない"] }; },
    () => { const g = pk([4, 6, 8, 9, 12, 14, 15]), p = pk([2, 3, 5]), q = pk([3, 4, 5, 7].filter(x => gcd(x, p) === 1)), a = g * p, b = g * q;
      return { g:"kazu", lv:"算数", q:a + " と " + b + " の 最大公約数は？", a:String(g), w:[String(a * b / g), String(g * 2), String(Math.min(a, b)), String(g / 2 | 0 || g + 1)],
        ex:[a + " = " + g + " × " + p + "、" + b + " = " + g + " × " + q, "共通する いちばん 大きい 約数は " + g] }; },
    () => { const r = pk([3, 4, 5, 6, 8, 10]), S = 3.14 * r * r;
      return { g:"zukei", lv:"算数", q:"半径 " + r + "cm の 円の 面積は？(円周率は 3.14)", a:nf(S, 2) + "cm²",
        w:[nf(2 * 3.14 * r, 2) + "cm²", nf(3.14 * 4 * r * r, 2) + "cm²", nf(3.14 * r, 2) + "cm²"],
        ex:["円の 面積 = 半径 × 半径 × 円周率", r + " × " + r + " × 3.14 = " + nf(S, 2) + "cm²", "⚠️ 直径 × 3.14 は 円周の 長さ"] }; },
    () => { const a = ri(2, 9), b = ri(2, 9), k = ri(2, 7); if(a === b) return null;
      return { g:"kazu", lv:"算数", q:a + " : " + b + " = " + a * k + " : □　□に 入る 数は？", a:String(b * k), w:[String(b + a * k - a), String(a * k * b), String(b * k + b), String(a * k - a + b + 1)],
        ex:["左は 右の " + k + "倍(" + a + " × " + k + " = " + a * k + ")", "□ = " + b + " × " + k + " = " + b * k] }; },
    () => { const xs = Array.from({ length:5 }, () => ri(3, 12)), s = xs.reduce((a, b) => a + b, 0);
      if(s % 5) xs[0] += 5 - s % 5; const t = xs.reduce((a, b) => a + b, 0);
      return { g:"data", lv:"算数", q:"5回の テストの 点数 " + xs.join("・") + " 点。平均は 何点？", a:t / 5 + "点", w:[t / 5 + 1 + "点", t + "点", (t / 5 - 1) + "点", (t / 4).toFixed(1).replace(/\.0$/, "") + "点"],
        ex:["平均 = 合計 ÷ 個数", xs.join(" + ") + " = " + t, t + " ÷ 5 = " + t / 5 + "点"] }; },
    () => { const a = ri(3, 9), b = ri(3, 9), c = ri(2, 8);
      return { g:"zukei", lv:"算数", q:"たて " + a + "cm・横 " + b + "cm・高さ " + c + "cm の 直方体の 体積は？", a:a * b * c + "cm³", w:[a * b + b * c + c * a + "cm³", 2 * (a * b + b * c + c * a) + "cm³", a + b + c + "cm³", a * b * c * 2 + "cm³"],
        ex:["直方体の 体積 = たて × 横 × 高さ", a + " × " + b + " × " + c + " = " + a * b * c + "cm³"] }; },
    /* ─── 高校受験 ─── */
    () => { const a = rnz(-9, 9), b = rnz(2, 6), d = rnz(-5, 5), c = d * rnz(-4, 4), v = a * b - c / d;
      return { g:"kazu", lv:"高校受験", q:PM(a) + " × " + b + " − " + PM(c) + " ÷ " + PM(d) + " = ？", a:M(v), w:[M(a * b + c / d), M(-v), M((a * b - c) / d), M(a * b - c * d)].filter(x => x !== M(v)),
        ex:["かけ算・わり算を 先に", PM(a) + " × " + b + " = " + M(a * b), PM(c) + " ÷ " + PM(d) + " = " + M(c / d), M(a * b) + " − " + PM(c / d) + " = " + M(v)] }; },
    () => { const x = rnz(-6, 8), a = rnz(2, 7), c = rnz(-4, 5), b = ri(-9, 9); if(a === c) return null; const d = a * x + b - c * x;
      return { g:"shiki", lv:"高校受験", q:"方程式 " + lin(a, b) + " = " + lin(c, d) + " を 解くと？", a:"x = " + M(x), w:["x = " + M(-x), "x = " + frac(d + b, a - c), "x = " + frac(d - b, a + c), "x = " + M(x + 1)],
        ex:["x の 項を 左、数を 右へ 移項(符号が かわる)", (a - c) + "x = " + M(d) + " − " + PM(b) + " = " + M(d - b), "x = " + M(d - b) + " ÷ " + PM(a - c) + " = " + M(x)] }; },
    () => { const x = rnz(-5, 6), y = rnz(-5, 6), a = rnz(1, 4), b = rnz(-4, 4), c = rnz(1, 4), d = rnz(-4, 4); if(a * d - b * c === 0) return null;
      const e = a * x + b * y, f2 = c * x + d * y, sol = "x = " + M(x) + "、y = " + M(y);
      return { g:"shiki", lv:"高校受験", q:"連立方程式 " + poly([a, 0]) + (b < 0 ? "−" : "+") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "y = " + M(e) + "、" + poly([c, 0]) + (d < 0 ? "−" : "+") + (Math.abs(d) === 1 ? "" : Math.abs(d)) + "y = " + M(f2) + " の 解は？",
        a:sol, w:["x = " + M(y) + "、y = " + M(x), "x = " + M(-x) + "、y = " + M(y), "x = " + M(x) + "、y = " + M(-y), "x = " + M(x + 1) + "、y = " + M(y - 1)],
        ex:["どちらかの 文字の 係数を そろえて 消す(加減法)か、代入する(代入法)", "x = " + M(x) + " を 1つめの 式に 入れると y = " + M(y) + " に なる", "2つの 式の 両方に 入れて 成り立つか 確かめよう"] }; },
    () => { const a = rnz(-7, 7), b = rnz(-7, 7);
      return { g:"shiki", lv:"高校受験", q:"(x" + (a < 0 ? "−" + (-a) : "+" + a) + ")(x" + (b < 0 ? "−" + (-b) : "+" + b) + ") を 展開すると？", a:poly([1, a + b, a * b]),
        w:[poly([1, a * b, a + b]), poly([1, a + b, -a * b]), poly([1, -(a + b), a * b]), poly([1, 0, a * b])],
        ex:["(x + a)(x + b) = x² + (a + b)x + ab", "a + b = " + M(a + b) + "、ab = " + M(a * b), "→ " + poly([1, a + b, a * b])] }; },
    () => { const r = rnz(-7, 7), s2 = rnz(-7, 7); if(r === s2 || r === -s2) return null;
      const ans = fac(r) + fac(s2);
      return { g:"shiki", lv:"高校受験", q:poly([1, -(r + s2), r * s2]) + " を 因数分解すると？", a:ans, w:[fac(-r) + fac(-s2), fac(r) + fac(-s2), fac(-r) + fac(s2), fac(r * s2 > 0 ? r + s2 : r - s2) + fac(1)].filter(x => x !== ans),
        ex:["たして " + M(-(r + s2)) + "、かけて " + M(r * s2) + " に なる 2つの 数を さがす", "→ " + M(-r) + " と " + M(-s2), ans] }; },
    () => { const r = rnz(-8, 8), s2 = rnz(-8, 8); if(r === s2) return null;
      const lo = Math.min(r, s2), hi = Math.max(r, s2);
      return { g:"shiki", lv:"高校受験", q:"二次方程式 " + poly([1, -(r + s2), r * s2]) + " = 0 の 解は？", a:"x = " + M(lo) + "、" + M(hi),
        w:["x = " + M(-hi) + "、" + M(-lo), "x = " + M(lo) + "、" + M(-hi), "x = " + M(-lo) + "、" + M(hi), "x = " + M(r + s2) + "、" + M(r * s2)].filter(x => x !== "x = " + M(lo) + "、" + M(hi)),
        ex:["左の 式を 因数分解する: " + fac(r) + fac(s2) + " = 0", "かけて 0 だから どちらかが 0", "x = " + M(lo) + "、" + M(hi)] }; },
    () => { const p = rnz(-4, 4), q = pk([-6, -5, -3, -2, -1, 1, 2, 3, 5, 6, 7]); const D = p * p - q; if(D <= 0 || Math.sqrt(D) % 1 === 0) return null;
      // x² + 2px + q = 0 → x = −p ± √(p² − q)
      const hd = M(-p), ans = "x = " + (p ? hd : "") + "±" + rt(D);
      return { g:"shiki", lv:"高校受験", q:"二次方程式 " + poly([1, 2 * p, q]) + " = 0 の 解は？(解の公式)", a:ans,
        w:["x = " + (p ? M(p) : "") + "±" + rt(D), "x = " + (p ? hd : "") + "±" + rt(p * p + q), "x = " + (p ? hd : "") + "±" + rt(4 * D), "x = " + (p ? M(-2 * p) : "") + "±" + rt(D)].filter(x => x !== ans),
        ex:["解の公式 x = (−b ± √(b² − 4ac)) / 2a に a = 1、b = " + M(2 * p) + "、c = " + M(q), "b² − 4ac = " + (4 * p * p) + " − (" + M(4 * q) + ") = " + 4 * D, "x = (" + M(-2 * p) + " ± " + rt(4 * D) + ") / 2 = " + ans.slice(4)] }; },
    () => { const [o, i] = [pk([2, 3, 4, 5, 6]), pk([2, 3, 5, 6, 7])], n = o * o * i;
      return { g:"kazu", lv:"高校受験", q:"√" + n + " を a√b の 形に すると？", a:rt(n), w:[(o * 2) + "√" + i, o + "√" + (i * 2), (o * o) + "√" + i, i + "√" + o].filter(x => x !== rt(n)),
        ex:[n + " = " + (o * o) + " × " + i + " = " + o + "² × " + i, "√(" + o + "² × " + i + ") = " + rt(n), "⚠️ 2乗の 形の ものだけ √ の 外へ 出せる"] }; },
    () => { const x1 = rnz(-4, 2), x2 = x1 + rnz(1, 4), a = rnz(-3, 3), b = ri(-6, 6), y1 = a * x1 + b, y2 = a * x2 + b;
      return { g:"kansu", lv:"高校受験", q:"2点 (" + M(x1) + ", " + M(y1) + ")、(" + M(x2) + ", " + M(y2) + ") を 通る 直線の 式は？", a:"y = " + lin(a, b),
        w:["y = " + lin(-a, b), "y = " + lin(a, -b), "y = " + lin(b || 1, a), "y = " + lin(a, b + a), "y = " + lin(2 * a, b), "y = " + lin(a, b - 1)].filter(x => x !== "y = " + lin(a, b)),
        ex:["傾き = y の 増加量 ÷ x の 増加量 = (" + M(y2) + " − " + M(y1) + ") ÷ (" + M(x2) + " − " + M(x1) + ") = " + M(a), "y = " + M(a) + "x + b に (" + M(x1) + ", " + M(y1) + ") を 入れて b = " + M(b), "y = " + lin(a, b)] }; },
    () => { const a = rnz(-3, 3), p = ri(-3, 3), q = p + ri(1, 4), rate = a * (p + q);
      return { g:"kansu", lv:"高校受験", q:"関数 y = " + poly([a, 0, 0]) + " で、x が " + M(p) + " から " + M(q) + " まで 増加するときの 変化の割合は？", a:M(rate),
        w:[M(a * (q - p)), M(-rate), M(a * p * q), M(rate + a)].filter(x => x !== M(rate)),
        ex:["変化の割合 = y の 増加量 ÷ x の 増加量", "y は " + M(a * p * p) + " → " + M(a * q * q) + "(増加量 " + M(a * (q * q - p * p)) + ")", M(a * (q * q - p * p)) + " ÷ " + (q - p) + " = " + M(rate), "(y = ax² なら a × (p + q) で 出せる)"] }; },
    () => { const T = pk([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25], [9, 12, 15]]), k = pk([1, 1, 2]);
      const [a, b, c] = T.map(x => x * k);
      if(Math.random() < .5) return { g:"zukei", lv:"高校受験", q:"直角を はさむ 2辺が " + a + "cm・" + b + "cm の 直角三角形。斜辺の 長さは？", a:c + "cm", w:[a + b + "cm", rt(a * a + b * b + 2 * a * b) + "cm", c + k + "cm", rt(Math.abs(b * b - a * a)) + "cm"].filter(x => x !== c + "cm"),
        ex:["三平方の定理 a² + b² = c²", a + "² + " + b + "² = " + (a * a) + " + " + (b * b) + " = " + c * c, "c = √" + c * c + " = " + c + "cm"] };
      const u = ri(2, 7), v = ri(u + 1, 9), h2 = u * u + v * v;
      return { g:"zukei", lv:"高校受験", q:"直角を はさむ 2辺が " + u + "cm・" + v + "cm の 直角三角形。斜辺の 長さは？", a:rt(h2) + "cm", w:[(u + v) + "cm", rt(v * v - u * u) + "cm", rt(2 * h2) + "cm", rt(u * v) + "cm"].filter(x => x !== rt(h2) + "cm"),
        ex:["三平方の定理 a² + b² = c²", u + "² + " + v + "² = " + h2, "c = √" + h2 + " = " + rt(h2) + "cm"] }; },
    () => { const m = ri(1, 4), n = ri(m + 1, 6); if(gcd(m, n) !== 1) return null; const vol = Math.random() < .4;
      const A = vol ? m ** 3 + " : " + n ** 3 : m * m + " : " + n * n;
      return { g:"zukei", lv:"高校受験", q:"相似比が " + m + " : " + n + " の 2つの " + (vol ? "立体の 体積の比" : "図形の 面積の比") + "は？", a:A,
        w:[m + " : " + n, vol ? m * m + " : " + n * n : m ** 3 + " : " + n ** 3, (m + 1) + " : " + (n + 1), 2 * m + " : " + n].filter(x => x !== A),
        ex:["相似比が m : n なら", "面積比は m² : n²、体積比は m³ : n³", "→ " + A] }; },
    () => { const c = pk([60, 70, 80, 84, 96, 100, 110, 120, 130, 140, 150, 160]);
      return { g:"zukei", lv:"高校受験", q:"円の 中心角が " + c + "° の とき、同じ 弧に 対する 円周角は？", a:c / 2 + "°", w:[c + "°", c * 2 + "°", 180 - c + "°", 180 - c / 2 + "°"].filter(x => x !== c / 2 + "°"),
        ex:["円周角 = 同じ 弧に 対する 中心角の 半分", c + " ÷ 2 = " + c / 2 + "°"] }; },
    () => { const k = ri(3, 11), n = 6 - Math.abs(7 - k);
      return { g:"data", lv:"高校受験", q:"2つの さいころを 投げて、目の 和が " + k + " に なる 確率は？", a:frac(n, 36), w:[frac(n, 12), frac(n, 11), frac(1, k), frac(n + 1, 36), frac(n, 18)].filter(x => x !== frac(n, 36)),
        ex:["目の 出かたは 6 × 6 = 36 とおり", "和が " + k + " に なるのは " + n + " とおり", n + "/36 = " + frac(n, 36)] }; },
    () => { const n = ri(5, 12);
      return { g:"zukei", lv:"高校受験", q:n + "角形の 内角の 和は？", a:180 * (n - 2) + "°", w:[180 * n + "°", 180 * (n - 1) + "°", 360 + "°", 180 * (n - 3) + "°"].filter(x => x !== 180 * (n - 2) + "°"),
        ex:["n角形の 内角の 和 = 180° × (n − 2)", "180 × (" + n + " − 2) = " + 180 * (n - 2) + "°", "(1つの 頂点から 対角線を ひくと 三角形が n − 2 個 できる)"] }; },
    () => { const r = pk([3, 4, 6, 8, 9, 10, 12]), a = pk([30, 45, 60, 90, 120, 135, 150]), S = r * r * a / 360;
      const pis = x => { const n0 = Math.round(x * 360), g = gcd(n0, 360), n = n0 / g, d = 360 / g; return (n === 1 ? "" : n) + "π" + (d === 1 ? "" : "/" + d); };
      return { g:"zukei", lv:"高校受験", q:"半径 " + r + "cm、中心角 " + a + "° の おうぎ形の 面積は？", a:pis(S) + "cm²", w:[pis(2 * r * a / 360) + "cm²", pis(r * r) + "cm²", pis(S * 2) + "cm²", pis(r * a / 360) + "cm²"].filter(x => x !== pis(S) + "cm²"),
        ex:["おうぎ形の 面積 = πr² × 中心角/360", "π × " + r + "² × " + a + "/360 = " + pis(S) + "cm²", "⚠️ 2πr × 中心角/360 は 弧の 長さ"] }; },
    () => { const xs = Array.from({ length:8 }, () => ri(1, 20)).sort((a, b) => a - b), md = (a, b) => (a + b) / 2;
      const q1 = md(xs[1], xs[2]), q3 = md(xs[5], xs[6]), R = q3 - q1, S2 = x => String(x);
      if(R <= 0) return null;
      return { g:"data", lv:"高校受験", q:"データ " + xs.join("・") + "(8個)の 四分位範囲は？", a:S2(R), w:[S2(xs[7] - xs[0]), S2(md(xs[3], xs[4])), S2(xs[6] - xs[1]), S2(R + 1)].filter(x => x !== S2(R)),
        ex:["小さい 順に 前半 4個・後半 4個に 分ける", "第1四分位数 = 前半の 中央値 = (" + xs[1] + " + " + xs[2] + ")/2 = " + q1, "第3四分位数 = 後半の 中央値 = (" + xs[5] + " + " + xs[6] + ")/2 = " + q3, "四分位範囲 = " + q3 + " − " + q1 + " = " + R] }; },
    /* ─── 大学受験 ─── */
    () => { const p = rnz(-5, 5), q = ri(-6, 6), b = -2 * p, c = p * p + q;
      return { g:"kansu", lv:"大学受験", q:"放物線 y = " + poly([1, b, c]) + " の 頂点の 座標は？", a:"(" + M(p) + ", " + M(q) + ")",
        w:["(" + M(-p) + ", " + M(q) + ")", "(" + M(p) + ", " + M(c) + ")", "(" + M(b) + ", " + M(q) + ")", "(" + M(-p) + ", " + M(-q) + ")"].filter(x => x !== "(" + M(p) + ", " + M(q) + ")"),
        ex:["平方完成: y = (x " + (p < 0 ? "+ " + (-p) : "− " + p) + ")² " + (q < 0 ? "− " + (-q) : "+ " + q), "頂点は (" + M(p) + ", " + M(q) + ")", "⚠️ かっこの 中の 符号と 頂点の x 座標は 逆"] }; },
    () => { const b = ri(-8, 8), c = ri(-8, 10), D = b * b - 4 * c, ans = D > 0 ? "2個" : D === 0 ? "1個(重解)" : "0個";
      return { g:"shiki", lv:"大学受験", q:"二次方程式 " + poly([1, b, c]) + " = 0 の 異なる 実数解の 個数は？", a:ans, w:["2個", "1個(重解)", "0個", "3個"].filter(x => x !== ans),
        ex:["判別式 D = b² − 4ac", "D = " + M(b) + "² − 4 × 1 × " + (c < 0 ? "(" + M(c) + ")" : c) + " = " + M(D), "D > 0 → 2個 / D = 0 → 1個 / D < 0 → 0個(実数解なし)", "→ " + ans] }; },
    () => { const T = [[30, "1/2", "√3/2", "1/√3"], [45, "1/√2", "1/√2", "1"], [60, "√3/2", "1/2", "√3"], [120, "√3/2", "−1/2", "−√3"], [135, "1/√2", "−1/√2", "−1"], [150, "1/2", "−√3/2", "−1/√3"]];
      const t = pk(T), k = pk([1, 2, 3]), fn = ["sin", "cos", "tan"][k - 1], ans = t[k], vals = ["1/2", "√3/2", "1/√2", "−1/2", "−√3/2", "√3", "1/√3", "1", "−1"];
      return { g:"zukei", lv:"大学受験", q:fn + " " + t[0] + "° の 値は？", a:ans, w:vals.filter(x => x !== ans).sort(() => Math.random() - .5),
        ex:[t[0] + "° の 三角比: sin = " + t[1] + "、cos = " + t[2] + "、tan = " + t[3], "90° より 大きい 角は cos・tan が 負に なる(単位円の 左がわ)"] }; },
    () => { const b = ri(2, 8), c = ri(2, 8), A = pk([60, 120]), a2 = b * b + c * c - (A === 60 ? 1 : -1) * b * c;
      return { g:"zukei", lv:"大学受験", q:"△ABC で b = " + b + "、c = " + c + "、A = " + A + "°。a の 長さは？", a:rt(a2), w:[rt(b * b + c * c), rt(b * b + c * c - (A === 60 ? -1 : 1) * b * c), rt(b * b + c * c - 2 * b * c), String(b + c)].filter(x => x !== rt(a2)),
        ex:["余弦定理 a² = b² + c² − 2bc cos A", "cos " + A + "° = " + (A === 60 ? "1/2" : "−1/2"), "a² = " + b * b + " + " + c * c + (A === 60 ? " − " : " + ") + b * c + " = " + a2, "a = " + rt(a2)] }; },
    () => { const n = ri(5, 9), r = ri(2, Math.min(4, n - 1)); let P = 1; for(let i = 0; i < r; i++) P *= n - i; let F = 1; for(let i = 2; i <= r; i++) F *= i; const C = P / F;
      if(Math.random() < .5) return { g:"data", lv:"大学受験", q:n + "人から " + r + "人 えらんで 1列に 並べる 並べかたは 何とおり？", a:P + "とおり", w:[C + "とおり", n ** r + "とおり", n * r + "とおり", P / n * (n - 1) + "とおり"].filter(x => x !== P + "とおり"),
        ex:["順番が ある → 順列 " + n + "P" + r, Array.from({ length:r }, (_, i) => n - i).join(" × ") + " = " + P + "とおり"] };
      return { g:"data", lv:"大学受験", q:n + "人から " + r + "人の 係を えらぶ えらびかたは 何とおり？(順番なし)", a:C + "とおり", w:[P + "とおり", n ** r + "とおり", n * r + "とおり", C * 2 + "とおり"].filter(x => x !== C + "とおり"),
        ex:["順番が ない → 組合せ " + n + "C" + r + " = " + n + "P" + r + " ÷ " + r + "!", P + " ÷ " + F + " = " + C + "とおり"] }; },
    () => { const a = pk([2, 3, 5]), k = ri(2, a === 2 ? 7 : 4), n = a ** k;
      return { g:"kansu", lv:"大学受験", q:"log" + ["", "", "₂", "₃", "", "₅"][a] + " " + n + " の 値は？", a:String(k), w:[String(n / a), String(k + 1), String(n), String(k * a)].filter(x => x !== String(k)),
        ex:[a + " を 何乗すれば " + n + " に なるか", a + "^" + k + " = " + n + " だから " + k] }; },
    () => { const [b, e] = pk([[8, "2/3"], [27, "2/3"], [16, "3/4"], [32, "3/5"], [4, "3/2"], [9, "3/2"], [25, "3/2"], [64, "2/3"]]), [p, q] = e.split("/").map(Number);
      const root = Math.round(b ** (1 / q)), v = root ** p;
      return { g:"kansu", lv:"大学受験", q:b + " の " + e + " 乗の 値は？", a:String(v), w:[nf(b * p / q, 2), String(root), String(Math.round(b ** (q / p) * 100) / 100), String(v * root)].filter(x => x !== String(v)),
        ex:[b + "^(" + e + ") = (" + q + "乗根 " + b + ")^" + p, q + "乗根 " + b + " = " + root, root + "^" + p + " = " + v] }; },
    () => { const a = ri(-5, 9), d = rnz(-4, 6), n = ri(8, 20), an = a + (n - 1) * d, S = n * (a + an) / 2;
      if(Math.random() < .5) return { g:"koko", lv:"大学受験", q:"初項 " + M(a) + "、公差 " + M(d) + " の 等差数列の 第" + n + "項は？", a:M(an), w:[M(a + n * d), M(a * d * n), M(an - d * 2), M(S)].filter(x => x !== M(an)),
        ex:["一般項 aₙ = a + (n − 1)d", M(a) + " + (" + n + " − 1) × " + (d < 0 ? "(" + M(d) + ")" : d) + " = " + M(an)] };
      return { g:"koko", lv:"大学受験", q:"初項 " + M(a) + "、公差 " + M(d) + " の 等差数列の 初項から 第" + n + "項までの 和は？", a:M(S), w:[M(an), M(n * (a + an)), M(S + d * n), M(n * a + n * n * d / 2)].filter(x => x !== M(S)),
        ex:["第" + n + "項 = " + M(an), "和 = 項数 × (初項 + 末項) ÷ 2", n + " × (" + M(a) + " + " + M(an) + ") ÷ 2 = " + M(S)] }; },
    () => { const a = ri(1, 5), r = pk([2, 3, -2]), n = ri(4, 7), S = a * (r ** n - 1) / (r - 1);
      return { g:"koko", lv:"大学受験", q:"初項 " + a + "、公比 " + M(r) + " の 等比数列の 初項から 第" + n + "項までの 和は？", a:M(S), w:[M(a * r ** (n - 1)), M(a * (r ** (n + 1) - 1) / (r - 1)), M(a * r ** n), M(-S)].filter(x => x !== M(S)),
        ex:["和 = a(rⁿ − 1)/(r − 1)", a + " × (" + (r < 0 ? "(" + M(r) + ")" : r) + "^" + n + " − 1) ÷ (" + M(r) + " − 1)", "= " + M(S)] }; },
    () => { const a = rnz(-3, 3), b = ri(-5, 5), c = ri(-6, 6), k = rnz(-3, 3), v = 3 * a * k * k + 2 * b * k + c;
      return { g:"koko", lv:"大学受験", q:"f(x) = " + poly([a, b, c, 0]) + " の とき、f′(" + M(k) + ") は？", a:M(v), w:[M(a * k ** 3 + b * k * k + c * k), M(3 * a * k * k + b * k + c), M(a * k * k + b * k + c), M(-v)].filter(x => x !== M(v)),
        ex:["(xⁿ)′ = nxⁿ⁻¹ で 項ごとに 微分", "f′(x) = " + poly([3 * a, 2 * b, c]), "f′(" + M(k) + ") = " + M(v)] }; },
    () => { const p = ri(0, 2), q = p + ri(1, 3), a = pk([1, 3]), b = ri(0, 4), F = x => a * x ** 3 / 3 + b * x, v = F(q) - F(p);
      const show = x => { const n = Math.round(x * 3); return frac(n, 3); };
      return { g:"koko", lv:"大学受験", q:"定積分 ∫[" + p + "→" + q + "] (" + poly([a, 0, b]) + ") dx は？", a:show(v), w:[show(a * (q * q - p * p) + b * (q - p)), show(F(q)), show(a * (q ** 3 - p ** 3) + b * (q - p)), show(v + 1)].filter(x => x !== show(v)),
        ex:["原始関数 F(x) = " + (a === 1 ? "" : a + "") + "x³/3" + (b ? " + " + b + "x" : ""), "F(" + q + ") − F(" + p + ") = " + show(F(q)) + " − " + show(F(p)), "= " + show(v)] }; },
    () => { const a1 = rnz(-4, 5), a2 = rnz(-4, 5), b1 = rnz(-4, 5), b2 = rnz(-4, 5), d = a1 * b1 + a2 * b2;
      return { g:"koko", lv:"大学受験", q:"ベクトル a = (" + M(a1) + ", " + M(a2) + ")、b = (" + M(b1) + ", " + M(b2) + ") の 内積 a・b は？", a:M(d), w:[M(a1 * b2 + a2 * b1), M(a1 * b1 - a2 * b2), M(d + 1), "(" + M(a1 * b1) + ", " + M(a2 * b2) + ")"].filter(x => x !== M(d)),
        ex:["a・b = a₁b₁ + a₂b₂", PM(a1) + " × " + PM(b1) + " + " + PM(a2) + " × " + PM(b2) + " = " + M(d), "(内積は ベクトルではなく 1つの 数)"] }; },
    () => { const a = rnz(-4, 4), b = rnz(-4, 4), c = rnz(-4, 4), d = rnz(-4, 4), re = a * c - b * d, im = a * d + b * c;
      const cz = (x, y) => (x ? M(x) : "") + (y ? (y < 0 ? "−" : x ? "+" : "") + (Math.abs(y) === 1 ? "" : Math.abs(y)) + "i" : "") || "0";
      return { g:"kazu", lv:"大学受験", q:"(" + cz(a, b) + ")(" + cz(c, d) + ") を 計算すると？", a:cz(re, im), w:[cz(a * c + b * d, im), cz(re, a * d - b * c), cz(a * c, b * d), cz(-re, im)].filter(x => x !== cz(re, im)),
        ex:["ふつうに 展開して i² = −1 に する", "実部: " + M(a * c) + " − " + PM(b * d) + " = " + M(re), "虚部: " + M(a * d) + " + " + PM(b * c) + " = " + M(im), "→ " + cz(re, im)] }; },
    () => { const a = rnz(-3, 3), b = ri(-5, 5), c = ri(-6, 6), k = rnz(-3, 3), v = a * k ** 3 + b * k + c;
      return { g:"shiki", lv:"大学受験", q:"整式 P(x) = " + poly([a, 0, b, c]) + " を x " + (k < 0 ? "+ " + (-k) : "− " + k) + " で 割った 余りは？", a:M(v), w:[M(a * (-k) ** 3 + b * (-k) + c), M(c), M(v + k), M(a + b + c)].filter(x => x !== M(v)),
        ex:["剰余の定理: x − k で 割った 余りは P(k)", "k = " + M(k) + " を 入れる", "P(" + M(k) + ") = " + M(v)] }; },
    () => { const m = pk([1, 2, 3, 4, 5, 6]), k = m * m;
      return { g:"shiki", lv:"大学受験", q:"x > 0 の とき、x + " + k + "/x の 最小値は？", a:String(2 * m), w:[String(m), String(k), String(2 * k), String(m + 1)].filter(x => x !== String(2 * m)),
        ex:["相加平均 ≧ 相乗平均: x + " + k + "/x ≧ 2√(x × " + k + "/x) = 2√" + k + " = " + 2 * m, "等号は x = " + k + "/x、つまり x = " + m + " の とき", "最小値 " + 2 * m] }; },
    () => { const xs = Array.from({ length:5 }, () => ri(1, 9)), s = xs.reduce((a, b) => a + b, 0); if(s % 5) return null;
      const mu = s / 5, V = xs.reduce((a, x) => a + (x - mu) ** 2, 0) / 5, show = x => nf(x, 2);
      return { g:"data", lv:"大学受験", q:"データ " + xs.join("・") + " の 分散は？", a:show(V), w:[show(Math.sqrt(V)), show(V * 5 / 4), show(xs.reduce((a, x) => a + Math.abs(x - mu), 0) / 5), show(V + 1)].filter(x => x !== show(V)),
        ex:["平均 = " + s + " ÷ 5 = " + mu, "偏差の 2乗: " + xs.map(x => "(" + M(x - mu) + ")²").join(" + ") + " = " + nf(V * 5, 2), "分散 = " + nf(V * 5, 2) + " ÷ 5 = " + show(V), "(標準偏差は その √ = " + show(Math.sqrt(V)) + ")"] }; },
  ];
  const BADC = /NaN|undefined|Infinity|√0(?!\d)|√-|√−|null/;
  // まちがいが 3つ そろわない ときの 予備: 答えの 数を 少し ずらす(16 → 15・17・32)
  function nearWrongs(t){
    const m = String(t).match(/^(.*?)(−?)(\d+(?:\.\d+)?)(.*)$/); if(!m) return [];
    const v = (m[2] ? -1 : 1) * parseFloat(m[3]);
    return [v + 1, v - 1, v * 2, v + 2, -v, v + 3].map(x => m[1] + M(+x.toFixed(2)) + m[4]);
  }
  /* 4つの 答え(正しい 答え + まちがい 3つ)。同じ 字の まちがいは 1つに する */
  function calcMake(gen){
    for(let k = 0; k < 40; k++){
      const P = gen(); if(!P || BADC.test(P.q + P.a)) continue;
      const seen = new Set([P.a]), ch = [{ t:P.a, ok:true }];
      for(const x of P.w.concat(nearWrongs(P.a))){
        if(ch.length >= 4) break;
        if(!x || BADC.test(x) || seen.has(x)) continue;
        seen.add(x); ch.push({ t:x, ok:false });
      }
      if(ch.length < 4) continue;
      P.ch = shuffle(ch); P.A = P.a; return P;
    }
    return null;
  }
  function calcInfo(gen){ for(let k = 0; k < 40; k++){ const P = gen(); if(P) return P; } return { g:"", lv:"" }; }
  const CALC_META = CALC.map(calcInfo).map(P => ({ g:P.g, lv:P.lv }));

