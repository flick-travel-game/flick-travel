  /* ── 図(SVG を コードで 描く。AIの 絵は 使わない)。ことばの figure = "図:部分" の 部分を 色と 📍で 目立たせる ──
     ⚠️ 図の 数字・角度・形は 正しく 描く(ちがう 図は 数学では いちばん まずい)。
     図を 足すときは tools/sugaku/PROMPT.md の「図の 一覧」にも 足す(terms_js.py が 一覧で 確かめる)。
     ここは tools/sugaku/fig.js。tools/sugaku/make_sugaku_js.py が sugaku/sugaku.js に 入れる */
  const FIG_NAME = { numline:"数直線", frac:"分数", venn:"ベン図", tri:"三角形", isos:"二等辺三角形", equi:"正三角形", right:"直角三角形", para:"平行四辺形",
    trap:"台形", rhomb:"ひし形", circle:"円", sector:"おうぎ形", prism:"直方体", cyl:"円柱", cone:"円錐", sphere:"球", parallel:"平行線と角", similar:"相似",
    sym:"対称", area2:"展開の面積図", coord:"座標", prop:"比例のグラフ", inv:"反比例のグラフ", linear:"一次関数", parabola:"放物線", expo:"指数と対数",
    unit:"単位円", wave:"三角関数の波", hist:"ヒストグラム", box:"箱ひげ図", scatter:"散布図", normal:"正規分布", tree:"樹形図", vector:"ベクトル",
    seq:"等差数列", tangent:"接線と微分", integral:"定積分", limit:"極限", cplane:"複素数平面", ellipse:"楕円", hyperbola:"双曲線", circleq:"円の方程式", region:"領域" };
  const FIG_ICON = { numline:"📏", frac:"🍕", venn:"⭕", tri:"🔺", isos:"🔺", equi:"🔺", right:"📐", para:"▱", trap:"⏢", rhomb:"🔷", circle:"⚪", sector:"🍰",
    prism:"📦", cyl:"🥫", cone:"🍦", sphere:"🌐", parallel:"🛤️", similar:"🔍", sym:"🦋", area2:"🟩", coord:"➕", prop:"📈", inv:"📉", linear:"📈", parabola:"⛲",
    expo:"🚀", unit:"🧭", wave:"🌊", hist:"📊", box:"📦", scatter:"🌌", normal:"🔔", tree:"🌳", vector:"➡️", seq:"🪜", tangent:"🎿", integral:"🟦", limit:"🎯",
    cplane:"🌀", ellipse:"🥚", hyperbola:"🪃", circleq:"🎯", region:"🗺️" };
  let figN = 0;
  function figSvg(spec, o){
    o = o || {};
    const [key, part] = String(spec).split(":"), ON = "#e8590c", BASE = "#475569", FB = "#e7ecff", FO = "#ffd8a8", uid = "fg" + (++figN);
    const f = x => (+x).toFixed(1);
    const on = p => part === p || (Array.isArray(p) && p.includes(part));
    const ln = (x1, y1, x2, y2, hl, dash, w) => '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (w || (hl ? 3.2 : 1.6)) + '"' + (dash ? ' stroke-dasharray="4 3"' : "") + ' stroke-linecap="round"/>';
    const pg = (pts, hl, fill, dash) => '<polygon points="' + pts.map(p => f(p[0]) + "," + f(p[1])).join(" ") + '" fill="' + (fill || "none") + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (hl ? 3 : 1.6) + '" stroke-linejoin="round"' + (dash ? ' stroke-dasharray="4 3"' : "") + '/>';
    const dt = (x, y, hl, r) => '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + (r || (hl ? 4 : 3)) + '" fill="' + (hl ? ON : BASE) + '"/>';
    const tx = (x, y, s, hl, size, anchor) => '<text x="' + f(x) + '" y="' + f(y) + '" font-size="' + (size || 11) + '" font-weight="800" text-anchor="' + (anchor || "middle") + '" fill="' + (hl ? ON : "#334155") + '" paint-order="stroke" stroke="#fff" stroke-width="3">' + esc(s) + '</text>';
    const P = (cx, cy, r, a) => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
    // 角の しるし(中心 cx,cy・半径 r・数学の 向きで a0 → a1 度。左まわり)
    const ang = (cx, cy, r, a0, a1, hl, fillIt) => { const p0 = P(cx, cy, r, a0), p1 = P(cx, cy, r, a1), lg = (a1 - a0) > 180 ? 1 : 0;
      return '<path d="' + (fillIt ? "M" + f(cx) + " " + f(cy) + " L" : "M") + f(p0[0]) + " " + f(p0[1]) + " A" + r + " " + r + " 0 " + lg + " 0 " + f(p1[0]) + " " + f(p1[1]) + (fillIt ? " Z" : "") + '" fill="' + (fillIt ? (hl ? FO : FB) : "none") + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (hl ? 2.4 : 1.3) + '"/>'; };
    const rt = (x, y, dx1, dy1, dx2, dy2, hl) => { const s = 9; return '<polyline points="' + f(x + dx1 * s) + "," + f(y + dy1 * s) + " " + f(x + dx1 * s + dx2 * s) + "," + f(y + dy1 * s + dy2 * s) + " " + f(x + dx2 * s) + "," + f(y + dy2 * s) + '" fill="none" stroke="' + (hl ? ON : BASE) + '" stroke-width="1.4"/>'; };
    const tick = (x1, y1, x2, y2, n, hl) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L * 5, ny = (x2 - x1) / L * 5, ux = (x2 - x1) / L * 3, uy = (y2 - y1) / L * 3;
      let s = ""; for(let i = 0; i < n; i++){ const o2 = (i - (n - 1) / 2); s += ln(mx + ux * o2 - nx, my + uy * o2 - ny, mx + ux * o2 + nx, my + uy * o2 + ny, hl, false, 1.6); } return s; };
    // グラフ: 原点 ox,oy・1目もり k px
    const axes = (ox, oy, lab) => { lab = lab || ["x", "y"]; return '<defs><marker id="' + uid + 'a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>' +
      '<line x1="6" y1="' + oy + '" x2="194" y2="' + oy + '" stroke="#94a3b8" stroke-width="1.3" marker-end="url(#' + uid + 'a)"/><line x1="' + ox + '" y1="134" x2="' + ox + '" y2="6" stroke="#94a3b8" stroke-width="1.3" marker-end="url(#' + uid + 'a)"/>' +
      tx(190, oy + 13, lab[0], false, 10) + tx(ox + 9, 13, lab[1], false, 10) + tx(ox - 7, oy + 12, "O", false, 10); };
    const plot = (fn, ox, oy, k, x0, x1, hl, dash, n) => { n = n || 90; let d = "", pen = false;
      for(let i = 0; i <= n; i++){ const x = x0 + (x1 - x0) * i / n, y = fn(x), X = ox + k * x, Y = oy - k * y;
        if(!isFinite(Y) || Y < -2 || Y > 142){ pen = false; continue; } d += (pen ? " L" : " M") + f(X) + " " + f(Y); pen = true; }
      return '<path d="' + d + '" fill="none" stroke="' + (hl ? ON : "#3b5bdb") + '" stroke-width="' + (hl ? 3 : 2.2) + '"' + (dash ? ' stroke-dasharray="4 3"' : "") + '/>'; };
    let s = "", at = {};
    switch(key){
      case "numline": {
        s += ln(8, 80, 192, 80);
        for(let k = -4; k <= 4; k++) s += ln(100 + 20 * k, 75, 100 + 20 * k, 85) + tx(100 + 20 * k, 99, k < 0 ? "−" + (-k) : String(k), k === 0 && on("zero"), 10);
        if(on("pos")) s += ln(100, 80, 190, 80, true) + tx(150, 66, "正の数", true);
        if(on("neg")) s += ln(10, 80, 100, 80, true) + tx(50, 66, "負の数", true);
        if(on("abs")) s += '<path d="M40 74 Q70 44 100 74" fill="none" stroke="' + ON + '" stroke-width="2.4"/>' + dt(40, 80, true) + tx(70, 48, "|−3| = 3", true) + tx(70, 124, "0 からの きょり", true, 10);
        if(on("point")) s += dt(150, 80, true) + tx(150, 66, "A(2.5)", true);
        at = { zero:[100, 80], pos:[160, 80], neg:[40, 80], abs:[70, 58], point:[150, 80] }; break;
      }
      case "frac": {
        const cx = 100, cy = 68, r = 52;
        for(let i = 0; i < 4; i++){ const a0 = 90 - 90 * i, a1 = a0 - 90, p0 = P(cx, cy, r, a0), p1 = P(cx, cy, r, a1);
          s += '<path d="M' + cx + " " + cy + " L" + f(p0[0]) + " " + f(p0[1]) + " A" + r + " " + r + " 0 0 1 " + f(p1[0]) + " " + f(p1[1]) + ' Z" fill="' + (i < 3 ? (on("part") ? FO : FB) : "#fff") + '" stroke="' + BASE + '" stroke-width="1.6"/>'; }
        s += tx(172, 60, "3", on("part"), 16) + ln(162, 66, 182, 66, on("part"), false, 2) + tx(172, 84, "4", false, 16);
        at = { part:[80, 70] }; break;
      }
      case "venn": {
        const A = [78, 72], B = [122, 72], r = 42;
        s += '<defs><clipPath id="' + uid + 'A"><circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '"/></clipPath><mask id="' + uid + 'm"><rect x="0" y="0" width="200" height="140" fill="#fff"/><circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '" fill="#000"/></mask></defs>';
        if(on("comp")) s += '<rect x="8" y="10" width="184" height="124" fill="' + FO + '" mask="url(#' + uid + 'm)"/>';
        if(on("a") || on("or")) s += '<circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '" fill="' + FO + '"/>';
        if(on("b") || on("or")) s += '<circle cx="' + B[0] + '" cy="' + B[1] + '" r="' + r + '" fill="' + FO + '"/>';
        if(on("and")) s += '<circle cx="' + B[0] + '" cy="' + B[1] + '" r="' + r + '" fill="' + FO + '" clip-path="url(#' + uid + 'A)"/>';
        s += '<rect x="8" y="10" width="184" height="124" fill="none" stroke="' + BASE + '" stroke-width="1.6"/>' + tx(20, 26, "U", on("comp"), 12, "start") +
          '<circle cx="' + A[0] + '" cy="' + A[1] + '" r="' + r + '" fill="none" stroke="' + (on("a") ? ON : BASE) + '" stroke-width="2"/><circle cx="' + B[0] + '" cy="' + B[1] + '" r="' + r + '" fill="none" stroke="' + (on("b") ? ON : BASE) + '" stroke-width="2"/>' +
          tx(58, 76, "A", on("a")) + tx(142, 76, "B", on("b"));
        at = { a:[58, 64], b:[142, 64], and:[100, 72], or:[100, 34], comp:[176, 124] }; break;
      }
      case "tri": {
        const A = [100, 20], B = [30, 120], C = [170, 120];
        if(on("ext")) s += ln(170, 120, 196, 120, false, true) + ang(170, 120, 16, 0, 125, true, true);
        if(on("angle")) s += ang(30, 120, 18, 0, 55, true, true);
        s += pg([A, B, C], false, FB) + (on("side") ? ln(30, 120, 170, 120, true) : "");
        if(on("height")) s += ln(100, 20, 100, 120, true, true) + rt(100, 120, 0, -1, 1, 0, true) + tx(112, 80, "h", true, 12);
        s += dt(A[0], A[1], on("vertex")) + tx(100, 13, "A", on("vertex")) + tx(22, 132, "B") + tx(178, 132, "C");
        at = { vertex:[100, 20], side:[130, 120], angle:[48, 110], height:[100, 70], ext:[186, 106] }; break;
      }
      case "isos": {
        const A = [100, 18], B = [50, 120], C = [150, 120];
        if(on("base")) s += ang(50, 120, 18, 0, 63.9, true, true) + ang(150, 120, 18, 116.1, 180, true, true);
        s += pg([A, B, C], false, FB) + (on("equal") ? ln(100, 18, 50, 120, true) + ln(100, 18, 150, 120, true) : "") + tick(100, 18, 50, 120, 1, on("equal")) + tick(100, 18, 150, 120, 1, on("equal")) +
          tx(100, 12, "A") + tx(42, 132, "B") + tx(158, 132, "C");
        at = { equal:[75, 69], base:[62, 112] }; break;
      }
      case "equi": {
        const A = [100, 22], B = [45, 117.3], C = [155, 117.3];
        s += pg([A, B, C], on("all"), FB) + tick(100, 22, 45, 117.3, 1, on("all")) + tick(100, 22, 155, 117.3, 1, on("all")) + tick(45, 117.3, 155, 117.3, 1, on("all")) +
          ang(45, 117.3, 16, 0, 60, on("all"), true) + ang(155, 117.3, 16, 120, 180, on("all"), true) + ang(100, 22, 16, 240, 300, on("all"), true) +
          tx(72, 112, "60°", on("all"), 9) + tx(128, 112, "60°", on("all"), 9);
        at = { all:[100, 70] }; break;
      }
      case "right": {
        const C = [40, 120], B = [170, 120], A = [40, 32];
        if(on("theta")) s += ang(170, 120, 26, 145.9, 180, true, true);
        s += pg([A, B, C], false, FB) + rt(40, 120, 1, 0, 0, -1, on("right"));
        if(on("hyp")) s += ln(40, 32, 170, 120, true);
        if(on("leg")) s += ln(40, 120, 170, 120, true) + ln(40, 120, 40, 32, true);
        s += tx(105, 134, "a", on("leg")) + tx(28, 80, "b", on("leg")) + tx(112, 68, "c", on("hyp"), 13) + tx(144, 114, "θ", on("theta"), 12) +
          tx(34, 26, "A") + tx(178, 130, "B") + tx(32, 132, "C");
        at = { hyp:[105, 76], right:[46, 114], leg:[105, 120], theta:[150, 114] }; break;
      }
      case "para": {
        const A = [30, 112], B = [135, 112], Cc = [170, 32], Dd = [65, 32];
        s += pg([A, B, Cc, Dd], false, FB);
        if(on("opp")) s += ln(30, 112, 135, 112, true) + ln(65, 32, 170, 32, true) + tick(30, 112, 135, 112, 1, true) + tick(65, 32, 170, 32, 1, true);
        if(on("diag")) s += ln(30, 112, 170, 32, true, true) + ln(135, 112, 65, 32, true, true) + dt(100, 72, true);
        s += tx(24, 126, "A") + tx(141, 126, "B") + tx(176, 28, "C") + tx(59, 28, "D");
        at = { opp:[118, 32], diag:[100, 72] }; break;
      }
      case "trap": {
        s += pg([[20, 115], [180, 115], [140, 35], [60, 35]], false, FB);
        if(on("top")) s += ln(60, 35, 140, 35, true) + tx(100, 27, "上底", true);
        else s += tx(100, 27, "上底");
        s += tx(100, 131, "下底");
        if(on("height")) s += ln(60, 35, 60, 115, true, true) + rt(60, 115, 0, -1, 1, 0, true) + tx(70, 80, "高さ", true, 10, "start");
        at = { top:[100, 35], height:[60, 76] }; break;
      }
      case "rhomb": {
        s += pg([[100, 14], [168, 70], [100, 126], [32, 70]], false, FB) + tick(100, 14, 168, 70, 1) + tick(168, 70, 100, 126, 1) + tick(100, 126, 32, 70, 1) + tick(32, 70, 100, 14, 1);
        s += ln(100, 14, 100, 126, on("diag"), true) + ln(32, 70, 168, 70, on("diag"), true) + rt(100, 70, 1, 0, 0, -1, on("diag"));
        at = { diag:[100, 70] }; break;
      }
      case "circle": {
        const cx = 100, cy = 72, r = 52, T = a => P(cx, cy, r, a);
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/>';
        if(on("radius")) s += ln(cx, cy, cx + r, cy, true) + tx(126, 66, "r", true, 12);
        if(on("diameter")) s += ln(cx - r, cy, cx + r, cy, true) + tx(100, 66, "直径", true, 10);
        if(on("chord") || on("arc")){ const p = T(150), q = T(30); s += ln(p[0], p[1], q[0], q[1], on("chord"));
          if(on("arc")) s += '<path d="M' + f(p[0]) + " " + f(p[1]) + " A" + r + " " + r + " 0 0 1 " + f(q[0]) + " " + f(q[1]) + '" fill="none" stroke="' + ON + '" stroke-width="4"/>';
          at.chord = [100, 46]; at.arc = [100, 20]; }
        if(on("tangent")){ const t = T(270); s += ln(cx, cy, t[0], t[1], false, true) + ln(30, t[1], 170, t[1], true) + rt(t[0], t[1], 1, 0, 0, -1, true) + dt(t[0], t[1], true); at.tangent = [150, t[1]]; }
        if(on("central") || on("inscribed")){ const a = T(210), b = T(330), p = T(90);
          s += ln(a[0], a[1], b[0], b[1], false, true);
          if(on("central")) s += ln(cx, cy, a[0], a[1], true) + ln(cx, cy, b[0], b[1], true) + ang(cx, cy, 14, 210, 330, true, true) + tx(100, 104, "2x", true, 10);
          else s += ln(cx, cy, a[0], a[1], false, true) + ln(cx, cy, b[0], b[1], false, true) + tx(100, 104, "2x", false, 10);
          s += ln(p[0], p[1], a[0], a[1], on("inscribed")) + ln(p[0], p[1], b[0], b[1], on("inscribed")) + ang(p[0], p[1], 16, 240, 300, on("inscribed"), true) + tx(100, 48, "x", on("inscribed"), 10);
          s += dt(a[0], a[1]) + dt(b[0], b[1]) + dt(p[0], p[1]); at.central = [100, 88]; at.inscribed = [100, 30]; }
        s += dt(cx, cy, on("center")) + tx(cx - 8, cy + 14, "O", on("center"));
        at.center = [cx, cy]; at.radius = [126, cy]; at.diameter = [70, cy]; break;
      }
      case "sector": {
        const cx = 50, cy = 115, r = 95, q = P(cx, cy, r, 60);
        s += '<path d="M' + cx + " " + cy + " L" + (cx + r) + " " + cy + " A" + r + " " + r + " 0 0 0 " + f(q[0]) + " " + f(q[1]) + ' Z" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/>';
        if(on("arc")) s += '<path d="M' + (cx + r) + " " + cy + " A" + r + " " + r + " 0 0 0 " + f(q[0]) + " " + f(q[1]) + '" fill="none" stroke="' + ON + '" stroke-width="4"/>' + tx(150, 50, "弧", true, 12);
        s += ang(cx, cy, 20, 0, 60, on("angle"), true) + tx(80, 108, "中心角", on("angle"), 9, "start") + tx(95, 130, "r");
        at = { arc:[132, 62], angle:[62, 104] }; break;
      }
      case "prism": {
        const F = [[30, 55], [125, 55], [125, 122], [30, 122]], d = [40, -32];
        const Bk = F.map(p => [p[0] + d[0], p[1] + d[1]]);
        s += ln(Bk[3][0], Bk[3][1], Bk[0][0], Bk[0][1], false, true) + ln(Bk[3][0], Bk[3][1], Bk[2][0], Bk[2][1], false, true) + ln(F[3][0], F[3][1], Bk[3][0], Bk[3][1], false, true);
        s += pg(F, on("face"), on("face") ? FO : FB) + pg([F[0], F[1], Bk[1], Bk[0]], false, "#f1f5ff") + pg([F[1], F[2], Bk[2], Bk[1]], false, "#dbe4ff");
        if(on("edge")) s += ln(F[0][0], F[0][1], F[1][0], F[1][1], true);
        s += dt(Bk[1][0], Bk[1][1], on("vertex"));
        at = { face:[78, 90], edge:[78, 55], vertex:Bk[1] }; break;
      }
      case "cyl": {
        const rx = 50, ry = 12;
        if(on("side")) s += '<rect x="50" y="28" width="100" height="86" fill="' + FO + '"/>';
        s += ln(50, 28, 50, 114) + ln(150, 28, 150, 114) +
          '<ellipse cx="100" cy="28" rx="' + rx + '" ry="' + ry + '" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<path d="M50 114 A' + rx + " " + ry + ' 0 0 0 150 114" fill="none" stroke="' + (on("base") ? ON : BASE) + '" stroke-width="' + (on("base") ? 3 : 1.6) + '"/>' +
          '<path d="M50 114 A' + rx + " " + ry + ' 0 0 1 150 114" fill="none" stroke="' + (on("base") ? ON : BASE) + '" stroke-width="1.4" stroke-dasharray="4 3"/>';
        if(on("base")) s += '<ellipse cx="100" cy="114" rx="' + rx + '" ry="' + ry + '" fill="' + FO + '" opacity=".6"/>' + tx(100, 138, "底面", true, 10);
        at = { base:[100, 114], side:[100, 72] }; break;
      }
      case "cone": {
        const A = [100, 16];
        s += '<path d="M40 116 A60 14 0 0 1 160 116" fill="none" stroke="' + BASE + '" stroke-width="1.4" stroke-dasharray="4 3"/>' +
          '<path d="M40 116 A60 14 0 0 0 160 116" fill="none" stroke="' + BASE + '" stroke-width="1.6"/>' + ln(100, 16, 40, 116) + ln(100, 16, 160, 116, on("slant"));
        if(on("slant")) s += tx(146, 64, "母線", true, 10);
        if(on("height")) s += ln(100, 16, 100, 116, true, true) + rt(100, 116, 0, -1, 1, 0, true) + tx(110, 78, "h", true, 12);
        s += dt(A[0], A[1], on("apex"));
        at = { apex:A, slant:[132, 66], height:[100, 70] }; break;
      }
      case "sphere": {
        s += '<circle cx="100" cy="70" r="54" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.6"/><ellipse cx="100" cy="70" rx="54" ry="13" fill="none" stroke="' + BASE + '" stroke-width="1.2" stroke-dasharray="4 3"/>' +
          dt(100, 70) + ln(100, 70, 154, 70, on("r")) + tx(127, 64, "r", on("r"), 12);
        at = { r:[127, 70] }; break;
      }
      case "parallel": {
        // 平行な 2本(y=45, y=100)と ななめの 線。ななめの 向きは 56.3°
        const up = 56.3, X1 = 116.7, X2 = 80;
        s += ln(8, 45, 192, 45) + ln(8, 100, 192, 100) + ln(60, 130, 140, 10) + tx(186, 40, "ℓ", false, 11) + tx(186, 95, "m", false, 11);
        const mk = (x, y, a0, a1, hl) => ang(x, y, 15, a0, a1, hl, true);
        if(on("corresp")) s += mk(X1, 45, 0, up, true) + mk(X2, 100, 0, up, true);
        if(on("alt")) s += mk(X1, 45, 180, 180 + up, true) + mk(X2, 100, 0, up, true);
        if(on("vert")) s += mk(X2, 100, 0, up, true) + mk(X2, 100, 180, 180 + up, true);
        s += '<text x="30" y="58" font-size="9" fill="#64748b">ℓ // m</text>';
        at = { corresp:[X1 + 10, 36], alt:[X1 - 10, 54], vert:[X2 - 9, 110] }; break;
      }
      case "similar": {
        s += pg([[18, 120], [68, 120], [33, 85]], on("ratio"), FB) + pg([[88, 120], [188, 120], [118, 50]], on("ratio"), FB) +
          tx(43, 134, "1", on("ratio")) + tx(138, 134, "2", on("ratio")) + tx(100, 30, "相似比 1 : 2", on("ratio"), 11);
        at = { ratio:[138, 90] }; break;
      }
      case "sym": {
        s += pg([[55, 22], [92, 52], [80, 118], [30, 118], [18, 52]], false, FB) + ln(55, 12, 55, 130, on("line"), true) + tx(55, 10, "対称の軸", on("line"), 9);
        s += pg([[118, 104], [168, 104], [188, 40], [138, 40]], false, FB) + dt(153, 72, on("point")) + tx(153, 130, "対称の中心", on("point"), 9);
        at = { line:[55, 70], point:[153, 72] }; break;
      }
      case "area2": {
        // (a+b)² = a² + 2ab + b²(a = 70px, b = 40px)
        const X = 45, Y = 15, a = 70, b = 40;
        s += '<rect x="' + X + '" y="' + Y + '" width="' + a + '" height="' + a + '" fill="' + (on("a2") ? FO : FB) + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<rect x="' + (X + a) + '" y="' + Y + '" width="' + b + '" height="' + a + '" fill="' + (on("ab") ? FO : "#f1f5ff") + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<rect x="' + X + '" y="' + (Y + a) + '" width="' + a + '" height="' + b + '" fill="' + (on("ab") ? FO : "#f1f5ff") + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          '<rect x="' + (X + a) + '" y="' + (Y + a) + '" width="' + b + '" height="' + b + '" fill="' + (on("b2") ? FO : "#dbe4ff") + '" stroke="' + BASE + '" stroke-width="1.6"/>' +
          tx(X + a / 2, Y + a / 2 + 4, "a²", on("a2"), 13) + tx(X + a + b / 2, Y + a / 2 + 4, "ab", on("ab"), 11) + tx(X + a / 2, Y + a + b / 2 + 4, "ab", on("ab"), 11) + tx(X + a + b / 2, Y + a + b / 2 + 4, "b²", on("b2"), 12) +
          tx(X - 8, Y + a / 2 + 4, "a", false, 11) + tx(X - 8, Y + a + b / 2 + 4, "b", false, 11) + tx(X + a / 2, 138, "a", false, 11) + tx(X + a + b / 2, 138, "b", false, 11);
        at = { a2:[X + a / 2, Y + a / 2], ab:[X + a + b / 2, Y + a / 2], b2:[X + a + b / 2, Y + a + b / 2] }; break;
      }
      case "coord": {
        if(on("quad")) s += '<rect x="100" y="8" width="90" height="62" fill="' + FO + '"/>';
        s += axes(100, 70) + tx(150, 40, "第1象限", on("quad"), 10) + tx(50, 40, "第2象限", false, 10) + tx(50, 108, "第3象限", false, 10) + tx(150, 108, "第4象限", false, 10);
        if(on("x")) s += ln(8, 70, 190, 70, true);
        if(on("y")) s += ln(100, 132, 100, 10, true);
        s += dt(140, 50) + tx(146, 60, "(2, 1)", false, 9, "start");
        at = { origin:[100, 70], x:[170, 70], y:[100, 24], quad:[150, 40] };
        if(on("origin")) s += dt(100, 70, true); break;
      }
      case "prop": {
        s += axes(100, 72) + plot(x => 0.8 * x, 100, 72, 20, -5, 5, on("line")) + tx(160, 34, "y = ax", on("line"), 11);
        at = { line:[140, 40] }; break;
      }
      case "inv": {
        s += axes(100, 72);
        if(on("asym")) s += ln(8, 72, 190, 72, true) + ln(100, 134, 100, 8, true);
        s += plot(x => 2 / x, 100, 72, 20, 0.2, 4.6, on("curve")) + plot(x => 2 / x, 100, 72, 20, -4.6, -0.2, on("curve")) + tx(158, 50, "y = a/x", on("curve"), 11);
        at = { curve:[130, 50], asym:[180, 72] }; break;
      }
      case "linear": {
        const ox = 70, oy = 100, k = 20, fn = x => 0.5 * x + 1;
        s += axes(ox, oy) + plot(fn, ox, oy, k, -3, 6, false);
        if(on("slope")) s += ln(ox + k * 2, oy - k * 2, ox + k * 4, oy - k * 2, true, true) + ln(ox + k * 4, oy - k * 2, ox + k * 4, oy - k * 3, true, true) + tx(ox + k * 3, oy - k * 2 + 13, "+2", true, 10) + tx(ox + k * 4 + 12, oy - k * 2.5 + 4, "+1", true, 10);
        s += dt(ox, oy - k, on("intercept")) + tx(ox - 16, oy - k + 4, "b", on("intercept"), 11) + tx(160, 38, "y = ax + b", false, 10);
        at = { slope:[ox + k * 3, oy - k * 2.5], intercept:[ox, oy - k] }; break;
      }
      case "parabola": {
        const down = on("down"), ox = 80, oy = down ? 100 : 90, k = 16;
        s += axes(ox, oy);
        if(down){ s += plot(x => -0.5 * x * x + 3, ox, oy, k, -4, 4, true) + tx(150, 30, "a < 0", true, 11); at = { down:[ox, oy - 3 * k] }; }
        else {
          const vx = 1.5, vy = -2, fn = x => 0.5 * (x - vx) * (x - vx) + vy;
          if(on("axis")) s += ln(ox + k * vx, 8, ox + k * vx, 134, true, true) + tx(ox + k * vx + 6, 20, "軸", true, 10, "start");
          s += plot(fn, ox, oy, k, -3, 6, on("up")) + dt(ox + k * vx, oy - k * vy, on("vertex")) + tx(ox + k * vx, oy - k * vy + 15, "頂点", on("vertex"), 10) + (on("up") ? tx(160, 30, "a > 0", true, 11) : "");
          at = { up:[ox + k * 5, oy - k * fn(5)], vertex:[ox + k * vx, oy - k * vy], axis:[ox + k * vx, 44] };
        }
        break;
      }
      case "expo": {
        const ox = 70, oy = 100, k = 20;
        s += axes(ox, oy) + plot(x => x, ox, oy, k, -3, 6, false, true) + plot(x => Math.pow(2, x), ox, oy, k, -3.4, 2.4, on("exp")) + plot(x => Math.log2(x), ox, oy, k, 0.06, 6, on("log")) +
          tx(ox + k * 2.1 - 16, 20, "y = 2ˣ", on("exp"), 10) + tx(186, oy - k * 2.6, "y = log₂x", on("log"), 9, "end") + dt(ox, oy - k, false) + dt(ox + k, oy, false);
        at = { exp:[ox + k * 1.6, oy - k * 3], log:[ox + k * 4, oy - k * 2] }; break;
      }
      case "unit": {
        const cx = 90, cy = 76, R = 52, th = 50, p = P(cx, cy, R, th), c = Math.cos(th * Math.PI / 180), sn = Math.sin(th * Math.PI / 180);
        s += '<line x1="20" y1="' + cy + '" x2="168" y2="' + cy + '" stroke="#94a3b8"/><line x1="' + cx + '" y1="136" x2="' + cx + '" y2="10" stroke="#94a3b8"/>' +
          '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + BASE + '" stroke-width="1.6"/>' + ln(cx, cy, p[0], p[1]);
        if(on("tan")){ const tn = Math.tan(th * Math.PI / 180); s += ln(cx + R, cy + 60, cx + R, 4, false, true) + ln(cx, cy, cx + R, cy - R * tn, false, true) + ln(cx + R, cy, cx + R, cy - R * tn, true) + tx(cx + R + 6, cy - R * tn / 2, "tan θ", true, 10, "start"); }
        if(on("rad")) s += '<path d="M' + (cx + R) + " " + cy + " A" + R + " " + R + " 0 0 0 " + f(p[0]) + " " + f(p[1]) + '" fill="none" stroke="' + ON + '" stroke-width="4"/>' + tx(cx + R + 4, cy - 30, "弧の長さ = θ", true, 9, "start");
        s += ln(cx + R * c, cy, p[0], p[1], on("sin"), !on("sin")) + ln(cx, cy, cx + R * c, cy, on("cos"), !on("cos")) + ang(cx, cy, 14, 0, th, on("angle"), true) +
          dt(p[0], p[1]) + tx(p[0] + 4, p[1] - 6, "P(cos θ, sin θ)", false, 9, "start") + tx(cx + 20, cy - 4, "θ", on("angle"), 10) +
          (on("sin") ? tx(cx + R * c + 6, cy - R * sn / 2, "sin θ", true, 10, "start") : "") + (on("cos") ? tx(cx + R * c / 2, cy + 14, "cos θ", true, 10) : "") + tx(cx + R + 2, cy + 12, "1", false, 9);
        at = { angle:[cx + 18, cy - 8], sin:[cx + R * c, cy - R * sn / 2], cos:[cx + R * c / 2, cy], tan:[cx + R, cy - R * Math.tan(th * Math.PI / 180) / 2], rad:[cx + R * Math.cos(Math.PI * 25 / 180), cy - R * Math.sin(Math.PI * 25 / 180)] }; break;
      }
      case "wave": {
        const ox = 16, oy = 72, kx = 168 / (2 * Math.PI), A = 44;
        s += '<line x1="8" y1="' + oy + '" x2="194" y2="' + oy + '" stroke="#94a3b8"/><line x1="' + ox + '" y1="134" x2="' + ox + '" y2="8" stroke="#94a3b8"/>';
        let d = ""; for(let i = 0; i <= 120; i++){ const x = 2 * Math.PI * i / 120; d += (i ? " L" : "M") + f(ox + kx * x) + " " + f(oy - A * Math.sin(x)); }
        s += '<path d="' + d + '" fill="none" stroke="#3b5bdb" stroke-width="2.4"/>' + tx(ox + kx * Math.PI, oy + 12, "π", false, 10) + tx(ox + kx * 2 * Math.PI - 4, oy + 12, "2π", false, 10) + tx(60, 18, "y = sin x", false, 10);
        if(on("period")) s += ln(ox, 128, ox + kx * 2 * Math.PI, 128, true) + ln(ox, 122, ox, 134, true) + ln(ox + kx * 2 * Math.PI, 122, ox + kx * 2 * Math.PI, 134, true) + tx(100, 124, "周期 2π", true, 10);
        if(on("amp")) s += ln(ox + kx * Math.PI / 2, oy, ox + kx * Math.PI / 2, oy - A, true) + tx(ox + kx * Math.PI / 2 + 6, oy - A / 2, "振幅 1", true, 10, "start");
        at = { period:[100, 128], amp:[ox + kx * Math.PI / 2, oy - A / 2] }; break;
      }
      case "hist": {
        const H = [2, 5, 9, 7, 4, 1], w = 26, x0 = 22, base = 122, k = 11;
        s += ln(12, base, 192, base) + ln(x0, base, x0, 10);
        H.forEach((h, i) => { const hl = (on("mode") && i === 2) || (on("bar") && i === 3);
          s += '<rect x="' + (x0 + i * w) + '" y="' + (base - h * k) + '" width="' + w + '" height="' + (h * k) + '" fill="' + (hl ? FO : FB) + '" stroke="' + (hl ? ON : BASE) + '" stroke-width="' + (hl ? 2.4 : 1.3) + '"/>'; });
        if(on("mode")) s += tx(x0 + 2.5 * w, base - 9 * k - 5, "最頻値", true, 10);
        if(on("bar")) s += tx(x0 + 3.5 * w, base - 7 * k - 5, "度数 7", true, 10);
        if(on("class")) s += ln(x0 + 1 * w, 132, x0 + 2 * w, 132, true) + ln(x0 + w, 127, x0 + w, 137, true) + ln(x0 + 2 * w, 127, x0 + 2 * w, 137, true) + tx(x0 + 1.5 * w, 130, "階級", true, 9) + '<rect x="' + (x0 + w) + '" y="' + (base - 5 * k) + '" width="' + w + '" height="' + (5 * k) + '" fill="' + FO + '" stroke="' + ON + '" stroke-width="2.4"/>';
        at = { bar:[x0 + 3.5 * w, base - 7 * k], mode:[x0 + 2.5 * w, base - 9 * k], class:[x0 + 1.5 * w, base - 5 * k] }; break;
      }
      case "box": {
        const X = { min:25, q1:65, med:95, q3:128, max:175 }, y0 = 48, y1 = 92, ym = 70;
        s += ln(15, 118, 185, 118, false, false, 1);
        for(let v = 0; v <= 10; v++) s += ln(25 + v * 15, 115, 25 + v * 15, 121, false, false, 1);
        s += ln(X.min, ym, X.q1, ym) + ln(X.q3, ym, X.max, ym) + '<rect x="' + X.q1 + '" y="' + y0 + '" width="' + (X.q3 - X.q1) + '" height="' + (y1 - y0) + '" fill="' + (on("iqr") ? FO : FB) + '" stroke="' + BASE + '" stroke-width="1.6"/>';
        for(const k2 of ["min", "q1", "med", "q3", "max"]){ const hl = on(k2), top = k2 === "min" || k2 === "max" ? ym - 10 : y0, bot = k2 === "min" || k2 === "max" ? ym + 10 : y1; s += ln(X[k2], top, X[k2], bot, hl); }
        const lb = { min:"最小値", q1:"第1四分位数", med:"中央値", q3:"第3四分位数", max:"最大値" };
        for(const k2 in lb) if(on(k2)) s += tx(X[k2], y0 - 10, lb[k2], true, 10);
        if(on("iqr")) s += ln(X.q1, 104, X.q3, 104, true) + tx((X.q1 + X.q3) / 2, 136, "四分位範囲", true, 10);
        at = { min:[X.min, ym], q1:[X.q1, y0], med:[X.med, y0], q3:[X.q3, y0], max:[X.max, ym], iqr:[(X.q1 + X.q3) / 2, ym] }; break;
      }
      case "scatter": {
        const PTS = { pos:[[1,1.4],[1.6,1.2],[2,2.4],[2.6,2.1],[3.1,3.3],[3.5,2.9],[4,4.2],[4.4,3.7],[5,4.9],[5.4,5.5],[6,5.4],[6.5,6.6],[3.8,3.2],[2.3,1.6]],
          neg:[[1,6.2],[1.5,5.4],[2,5.8],[2.6,4.6],[3,4.9],[3.4,3.8],[4,4.1],[4.5,3],[5,3.3],[5.5,2.1],[6,2.4],[6.5,1.3],[3.8,3.1],[2.2,5]],
          none:[[1,3.1],[1.4,5.8],[2,1.6],[2.5,4.4],[3,6.1],[3.3,2.4],[3.9,4.8],[4.4,1.3],[4.8,5.6],[5.3,3.2],[5.8,1.9],[6.3,4.9],[2.8,3.5],[4.2,3.9]] };
        const kind = PTS[part] ? part : "pos";
        s += axes(22, 124) + PTS[kind].map(p => dt(22 + p[0] * 24, 124 - p[1] * 17, true, 3.4)).join("") +
          tx(120, 20, { pos:"正の相関", neg:"負の相関", none:"相関なし" }[kind], true, 11);
        at = { pos:[120, 30], neg:[120, 30], none:[120, 30] }; break;
      }
      case "normal": {
        const ox = 100, oy = 118, kx = 26, ky = 95, fn = x => Math.exp(-x * x / 2);
        if(on("sd")){ let d = "M" + f(ox - kx) + " " + oy; for(let i = 0; i <= 40; i++){ const x = -1 + 2 * i / 40; d += " L" + f(ox + kx * x) + " " + f(oy - ky * fn(x)); } s += '<path d="' + d + " L" + f(ox + kx) + " " + oy + ' Z" fill="' + FO + '"/>' + tx(ox, oy - 18, "約68%", true, 10); }
        s += ln(8, oy, 192, oy, false, false, 1.2);
        let d = ""; for(let i = 0; i <= 100; i++){ const x = -3.5 + 7 * i / 100; d += (i ? " L" : "M") + f(ox + kx * x) + " " + f(oy - ky * fn(x)); }
        s += '<path d="' + d + '" fill="none" stroke="#3b5bdb" stroke-width="2.4"/>' + ln(ox, oy, ox, oy - ky, on("mean"), true) + tx(ox, oy + 13, "m", on("mean"), 11) +
          tx(ox - kx, oy + 13, "m−σ", on("sd"), 9) + tx(ox + kx, oy + 13, "m+σ", on("sd"), 9);
        at = { mean:[ox, oy - ky], sd:[ox + kx, oy - ky * fn(1)] }; break;
      }
      case "tree": {
        const root = [20, 70], L1 = [[80, 28], [80, 70], [80, 112]], nm = ["A", "B", "C"];
        L1.forEach((p, i) => { s += ln(root[0], root[1], p[0], p[1], on("branch") && i === 0) + tx(p[0] + 8, p[1] + 4, nm[i], on("branch") && i === 0, 11, "start");
          [-12, 12].forEach((dy, j) => { const q = [150, p[1] + dy]; s += ln(p[0] + 18, p[1], q[0], q[1], on("branch") && i === 0 && j === 0) + tx(q[0] + 6, q[1] + 4, nm.filter((_, k) => k !== i)[j], on("branch") && i === 0 && j === 0, 10, "start"); }); });
        s += dt(root[0], root[1]) + tx(100, 138, "3 × 2 = 6 とおり", false, 10);
        at = { branch:[120, 22] }; break;
      }
      case "vector": {
        const O = [30, 112], A = [118, 88], B = [62, 36], S2 = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
        s += '<defs><marker id="' + uid + 'v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>';
        const ar = (p, q, hl) => '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="' + (hl ? ON : "#3b5bdb") + '" stroke-width="' + (hl ? 3 : 2.2) + '" marker-end="url(#' + uid + 'v)"/>';
        if(on("sum")) s += ln(A[0], A[1], S2[0], S2[1], false, true) + ln(B[0], B[1], S2[0], S2[1], false, true) + ar(O, S2, true) + tx(S2[0] + 4, S2[1] - 2, "a + b", true, 10, "start");
        if(on("dot")) s += ang(O[0], O[1], 22, 15.3, 67.2, true, true) + tx(O[0] + 30, O[1] - 12, "θ", true, 11) + tx(100, 134, "a・b = |a||b| cos θ", true, 10);
        s += ar(O, A, on("a")) + ar(O, B, false) + tx(A[0] + 6, A[1] + 4, "a", on("a"), 12, "start") + tx(B[0] - 10, B[1], "b", false, 12) + dt(O[0], O[1]) + tx(O[0] - 6, O[1] + 14, "O", false, 10);
        at = { a:[(O[0] + A[0]) / 2, (O[1] + A[1]) / 2], sum:[(O[0] + S2[0]) / 2, (O[1] + S2[1]) / 2], dot:[O[0] + 22, O[1] - 12] }; break;
      }
      case "seq": {
        const v = [2, 5, 8, 11, 14], k = 7.5, base = 122;
        s += ln(12, base, 192, base);
        v.forEach((x, i) => { s += '<rect x="' + (22 + i * 34) + '" y="' + (base - x * k) + '" width="26" height="' + (x * k) + '" fill="' + FB + '" stroke="' + BASE + '" stroke-width="1.3"/>' + tx(35 + i * 34, base - x * k - 4, String(x), false, 10);
          if(i && on("diff")) s += '<rect x="' + (22 + i * 34) + '" y="' + (base - x * k) + '" width="26" height="' + (3 * k) + '" fill="' + FO + '" stroke="' + ON + '" stroke-width="2"/>'; });
        if(on("diff")) s += tx(100, 16, "公差 +3 ずつ", true, 11);
        at = { diff:[35 + 3 * 34, base - 11 * k + 10] }; break;
      }
      case "tangent": {
        const ox = 26, oy = 124, k = 18, fn = x => x * x / 10, a = 4;
        s += axes(ox, oy) + plot(fn, ox, oy, k, -0.5, 8.4, false) + plot(x => 0.8 * (x - a) + fn(a), ox, oy, k, 1.2, 8, on("line")) + dt(ox + k * a, oy - k * fn(a), on("point")) +
          tx(ox + k * a - 4, oy - k * fn(a) + 16, "(a, f(a))", on("point"), 9) + (on("line") ? tx(160, 30, "傾き f′(a)", true, 10) : "");
        at = { point:[ox + k * a, oy - k * fn(a)], line:[ox + k * 6.5, oy - k * (0.8 * 2.5 + fn(a))] }; break;
      }
      case "integral": {
        const ox = 26, oy = 124, k = 18, fn = x => x * x / 10 + 0.6, a = 2, b = 6;
        let d = "M" + f(ox + k * a) + " " + oy; for(let i = 0; i <= 40; i++){ const x = a + (b - a) * i / 40; d += " L" + f(ox + k * x) + " " + f(oy - k * fn(x)); }
        s += axes(ox, oy) + '<path d="' + d + " L" + f(ox + k * b) + " " + oy + ' Z" fill="' + (on("area") ? FO : FB) + '" stroke="' + (on("area") ? ON : BASE) + '" stroke-width="1.4"/>' + plot(fn, ox, oy, k, -0.3, 8.4, false) +
          tx(ox + k * a, oy + 12, "a", false, 10) + tx(ox + k * b, oy + 12, "b", false, 10) + tx(ox + k * 4, oy - 14, "S", on("area"), 12);
        at = { area:[ox + k * 4, oy - 26] }; break;
      }
      case "limit": {
        const ox = 20, oy = 124, k = 20, fn = x => 4 - 3 / (x + 1);
        s += axes(ox, oy) + ln(ox, oy - k * 4, 192, oy - k * 4, on("approach"), true) + plot(fn, ox, oy, k, 0, 8.5, false) + tx(ox - 6, oy - k * 4 + 4, "α", on("approach"), 11, "end") +
          tx(150, oy - k * 4 + 20, "x → ∞ で α に 近づく", on("approach"), 9);
        at = { approach:[170, oy - k * 4] }; break;
      }
      case "cplane": {
        const ox = 60, oy = 76, k = 22, z = [3, 2];
        s += axes(ox, oy, ["実軸", "虚軸"]);
        if(on("re")) s += ln(8, oy, 190, oy, true);
        if(on("im")) s += ln(ox, 132, ox, 10, true);
        s += ln(ox + k * z[0], oy, ox + k * z[0], oy - k * z[1], false, true) + ln(ox, oy - k * z[1], ox + k * z[0], oy - k * z[1], false, true) +
          ln(ox, oy, ox + k * z[0], oy - k * z[1], on("abs")) + dt(ox + k * z[0], oy - k * z[1], on("z")) + tx(ox + k * z[0] + 6, oy - k * z[1] - 4, "z = 3 + 2i", on("z"), 10, "start") +
          (on("abs") ? tx(ox + k * 1.2, oy - k * 1.4, "|z|", true, 11) : "");
        if(on("conj")) s += ln(ox + k * z[0], oy, ox + k * z[0], oy + k * z[1], false, true) + dt(ox + k * z[0], oy + k * z[1], true) + tx(ox + k * z[0] + 6, oy + k * z[1] + 4, "z̄ = 3 − 2i", true, 10, "start");
        at = { re:[170, oy], im:[ox, 22], z:[ox + k * z[0], oy - k * z[1]], abs:[ox + k * 1.5, oy - k], conj:[ox + k * z[0], oy + k * z[1]] }; break;
      }
      case "ellipse": {
        const cx = 100, cy = 72, a = 76, b = 46, c = Math.sqrt(a * a - b * b);
        s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + a + '" ry="' + b + '" fill="' + FB + '" stroke="#3b5bdb" stroke-width="2.2"/>' + ln(cx - a, cy, cx + a, cy, on("major"), !on("major")) + ln(cx, cy - b, cx, cy + b, false, true) +
          dt(cx - c, cy, on("focus")) + dt(cx + c, cy, on("focus")) + tx(cx - c, cy + 14, "F′", on("focus"), 10) + tx(cx + c, cy + 14, "F", on("focus"), 10) + (on("major") ? tx(cx + 24, cy - 6, "長軸", true, 10) : "");
        at = { focus:[cx + c, cy], major:[cx - 40, cy] }; break;
      }
      case "hyperbola": {
        const cx = 100, cy = 70, a = 30, b = 26, c = Math.sqrt(a * a + b * b);
        s += '<line x1="8" y1="' + cy + '" x2="192" y2="' + cy + '" stroke="#94a3b8"/><line x1="' + cx + '" y1="134" x2="' + cx + '" y2="6" stroke="#94a3b8"/>';
        s += ln(cx - 70, cy + 70 * b / a, cx + 70, cy - 70 * b / a, on("asym"), true) + ln(cx - 70, cy - 70 * b / a, cx + 70, cy + 70 * b / a, on("asym"), true);
        for(const sg of [1, -1]){ let d = ""; for(let i = 0; i <= 60; i++){ const t = -1.75 + 3.5 * i / 60, X = cx + sg * a * Math.cosh(t), Y = cy - b * Math.sinh(t); d += (i ? " L" : "M") + f(X) + " " + f(Y); } s += '<path d="' + d + '" fill="none" stroke="#3b5bdb" stroke-width="2.4"/>'; }
        s += dt(cx - c, cy, on("focus")) + dt(cx + c, cy, on("focus")) + tx(cx + c, cy + 14, "F", on("focus"), 10) + tx(cx - c, cy + 14, "F′", on("focus"), 10) + (on("asym") ? tx(172, 18, "漸近線", true, 10) : "");
        at = { focus:[cx + c, cy], asym:[cx + 55, cy - 55 * b / a] }; break;
      }
      case "circleq": {
        const ox = 40, oy = 118, k = 20, C = [3.5, 2.6], r = 2;
        s += axes(ox, oy) + '<circle cx="' + f(ox + k * C[0]) + '" cy="' + f(oy - k * C[1]) + '" r="' + (k * r) + '" fill="' + FB + '" stroke="#3b5bdb" stroke-width="2.4"/>' +
          ln(ox + k * C[0], oy - k * C[1], ox + k * (C[0] + r), oy - k * C[1], false, true) + tx(ox + k * (C[0] + 1), oy - k * C[1] - 5, "r", false, 11) +
          dt(ox + k * C[0], oy - k * C[1], on("center")) + tx(ox + k * C[0], oy - k * C[1] + 16, "(a, b)", on("center"), 10) + tx(150, 132, "(x−a)² + (y−b)² = r²", false, 9);
        at = { center:[ox + k * C[0], oy - k * C[1]] }; break;
      }
      case "region": {
        const ox = 80, oy = 90, k = 18, fn = x => 0.5 * x + 1;
        let d = "M" + f(ox + k * -4.4) + " " + f(oy - k * fn(-4.4)); d += " L" + f(ox + k * 6) + " " + f(oy - k * fn(6)) + " L" + f(ox + k * 6) + " 4 L" + f(ox + k * -4.4) + " 4 Z";
        s += '<path d="' + d + '" fill="' + (on("area") ? FO : FB) + '" opacity=".8"/>' + axes(ox, oy) + plot(fn, ox, oy, k, -4.4, 6, false, true) + tx(60, 26, "y > ax + b", on("area"), 11) + tx(150, 128, "境界線は ふくまない", false, 8);
        at = { area:[60, 36] }; break;
      }
      default: return "";
    }
    const a = at[part];
    const pin = a && !o.noPin ? '<text x="' + f(a[0] + 1) + '" y="' + f(a[1] + 1) + '" text-anchor="middle" font-size="' + (o.small ? 20 : 18) + '" class="ai-pinbob">📍</text>' : "";
    return '<svg class="ai-svg sg-fig' + (o.small ? " sm" : "") + '" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc((FIG_NAME[key] || "") + " の 図") + '">' + s + pin + '</svg>';
  }
