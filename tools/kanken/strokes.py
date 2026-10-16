#!/usr/bin/env python3
"""書き取り(kaki・doon)で 書く 字の 形を KanjiVG から 取り出して kanken/strokes.js に する。
    python3 tools/kanken/strokes.py            # KanjiVG の ありかは 環境変数 KANJIVG(なければ /home/user/kanjivg/kanjivg/kanji)
KanjiVG は 一度 手元に 取ってくる:
    GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/KanjiVG/kanjivg /home/user/kanjivg/kanjivg
⚠️ KanjiVG(© Ulrich Apel / https://kanjivg.tagaini.net)は CC BY-SA 3.0。kanken/strokes.js も 同じ ライセンスで 出す(あたまに 書く)。
⚠️ **使う 字だけ**を 取り出す(ぜんぶ 入れると 数十MB に なる)。KanjiVG に 無い 字は 止める(ことばの ほうを 直す)
形: KANKEN_STROKES = { "挑": [[d(SVG の 線), [x0,y0,x1,y1,…](線の 上の 16点。0〜109)], …(書き順)] }"""
import json, os, re, sys, math
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
NPTS = 16

def kvg_dir():
    p = Path(os.environ.get("KANJIVG") or "/home/user/kanjivg/kanjivg/kanji")
    return p if p.is_dir() else None

TOK = re.compile(r"[MmCcSsLlHhVvZz]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?")

def bez(p0, p1, p2, p3, n=24):
    out = []
    for i in range(1, n + 1):
        t = i / n; u = 1 - t
        out.append((u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0], u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]))
    return out

def flatten(d):
    """SVG の path(KanjiVG で 使う M C c S s L l H V)を 細かい 点の 列に"""
    toks = TOK.findall(d); i = 0; cmd = None; cur = (0.0, 0.0); start = cur; last_c2 = None; pts = []
    def num():
        nonlocal i; v = float(toks[i]); i += 1; return v
    while i < len(toks):
        if re.fullmatch(r"[A-Za-z]", toks[i]): cmd = toks[i]; i += 1
        if cmd in "Zz": cur = start; pts.append(cur); continue
        rel = cmd.islower(); C = cmd.upper()
        ox, oy = cur if rel else (0.0, 0.0)
        if C == "M":
            cur = (num() + ox, num() + oy); start = cur; pts.append(cur); last_c2 = None; cmd = "l" if rel else "L"
        elif C == "L":
            cur = (num() + ox, num() + oy); pts.append(cur); last_c2 = None
        elif C == "H":
            cur = (num() + ox, cur[1]); pts.append(cur); last_c2 = None
        elif C == "V":
            cur = (cur[0], num() + (cur[1] if rel else 0)); pts.append(cur); last_c2 = None
        elif C == "C":
            c1 = (num() + ox, num() + oy); c2 = (num() + ox, num() + oy); e = (num() + ox, num() + oy)
            pts += bez(cur, c1, c2, e); last_c2 = c2; cur = e
        elif C == "S":
            c1 = (2 * cur[0] - last_c2[0], 2 * cur[1] - last_c2[1]) if last_c2 else cur
            c2 = (num() + ox, num() + oy); e = (num() + ox, num() + oy)
            pts += bez(cur, c1, c2, e); last_c2 = c2; cur = e
        else:
            raise ValueError("知らない 命令 " + cmd)
    return pts

def resample(pts, n=NPTS):
    seg = [math.dist(pts[k], pts[k + 1]) for k in range(len(pts) - 1)]
    L = sum(seg) or 1e-9; out = [pts[0]]; acc = 0.0; k = 0
    for s in range(1, n - 1):
        want = L * s / (n - 1)
        while k < len(seg) - 1 and acc + seg[k] < want: acc += seg[k]; k += 1
        t = (want - acc) / (seg[k] or 1e-9); a, b = pts[k], pts[k + 1]
        out.append((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t))
    out.append(pts[-1]); return out

def strokes_of(ch, base):
    svg = (base / f"{ord(ch):05x}.svg").read_text(encoding="utf-8")
    ds = re.findall(r'<path[^>]*\sid="kvg:[0-9a-f]+-s(\d+)"[^>]*\sd="([^"]+)"', svg)
    ds = [d for _, d in sorted(ds, key=lambda x: int(x[0]))]
    out = []
    for d in ds:
        p = resample(flatten(d))
        out.append([d, [round(v, 1) for xy in p for v in xy]])
    return out

def main():
    base = kvg_dir()
    if not base: sys.exit("KanjiVG が 見つからない(環境変数 KANJIVG に kanji フォルダを 入れる)")
    chars = []
    for j in ("kaki", "doon"):
        f = HERE / f"terms-{j}.json"
        if f.exists():
            for t in json.loads(f.read_text(encoding="utf-8")):
                if t.get("kanji") and t["kanji"] not in chars: chars.append(t["kanji"])
    data, miss = {}, []
    for ch in chars:
        if (base / f"{ord(ch):05x}.svg").exists(): data[ch] = strokes_of(ch, base)
        else: miss.append(ch)
    if miss: sys.exit("KanjiVG に 形が ない 字: " + "".join(miss))
    head = ("/* 書き取りの 字の 形(書き順つき)。tools/kanken/strokes.py が KanjiVG から 作る。手で 直さない。\n"
            "   字の 形の データ: KanjiVG © Ulrich Apel(https://kanjivg.tagaini.net)。CC BY-SA 3.0(https://creativecommons.org/licenses/by-sa/3.0/)。\n"
            "   この ファイルも CC BY-SA 3.0 で 出します(線の 上の 点を 足した)。 */\n")
    (ROOT / "kanken").mkdir(exist_ok=True)
    (ROOT / "kanken/strokes.js").write_text(head + "const KANKEN_STROKES = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kanken/strokes.js", len(data), "字", (ROOT / "kanken/strokes.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
