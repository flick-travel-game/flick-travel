#!/usr/bin/env python3
"""カラフルな地図(トップの絵と そろえた 明るい色)を作る。

    python3 tools/make_color_map.py world <world.svg(BlankMap-Equirectangular)> <出力.svg>
    python3 tools/make_color_map.py japan <ne_10m_land.shp> <出力.svg>

そのあと ブラウザで 3倍に描いて 1080px に縮める(scratchpad の render.mjs)。
切りかた(viewBox・南西諸島のわく)は モノクロ版(make_japan_map.py / world-map-mono)と 同じなので、ピンの位置は 変えなくてよい。
"""
import re
import sys

STYLE = '''
<defs>
 <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SEA1}"/><stop offset="1" stop-color="{SEA0}"/></linearGradient>
 {TONEDEFS}
 <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".42"/><stop offset=".58" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
 <filter id="shade" x="-5%" y="-5%" width="110%" height="110%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="{S2}" result="b"/><feOffset in="b" dx="0" dy="{S}" result="o"/>
  <feFlood flood-color="#001a4d" flood-opacity=".45"/><feComposite in2="o" operator="in" result="sh"/>
  <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge>
 </filter>
 <!-- ボタンと同じ キラキラ(docs/ボタンの色.md の feTurbulence)。3倍で描くので 粒は 少し大きめに -->
 <filter id="glit1" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="{F}" numOctaves="1" seed="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  10 0 0 0 -7.3"/></filter>
 <filter id="glit2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="{F2}" numOctaves="1" seed="11" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  12 0 0 0 -9.1"/></filter>
</defs>
'''

# かざりの 部品(絵に寄せる。けいくん 2026-09-24「もっと絵に寄せて」)。位置は 海の上に 手で置く
def cloud(x, y, k):
    c = "".join(f'<circle cx="{x+dx*k:.2f}" cy="{y+dy*k:.2f}" r="{r*k:.2f}"/>' for dx, dy, r in [(0,0,3.2),(3.4,-1.2,3.8),(7,0,3),(3.5,1.4,3.4),(-2.6,1.2,2.4),(9.4,1.2,2.2)])
    return f'<g fill="#ffffff" opacity=".96">{c}</g><g fill="#dff0ff" opacity=".8"><ellipse cx="{x+3.5*k:.2f}" cy="{y+3.6*k:.2f}" rx="{7.2*k:.2f}" ry="{1.4*k:.2f}"/></g>'


def balloon(x, y, k, c1, c2):
    return (f'<g><line x1="{x-1.6*k:.2f}" y1="{y+3.6*k:.2f}" x2="{x-1.0*k:.2f}" y2="{y+6.2*k:.2f}" stroke="#7a4a1e" stroke-width="{0.25*k:.2f}"/>'
            f'<line x1="{x+1.6*k:.2f}" y1="{y+3.6*k:.2f}" x2="{x+1.0*k:.2f}" y2="{y+6.2*k:.2f}" stroke="#7a4a1e" stroke-width="{0.25*k:.2f}"/>'
            f'<ellipse cx="{x:.2f}" cy="{y:.2f}" rx="{3.4*k:.2f}" ry="{4*k:.2f}" fill="{c1}"/>'
            f'<path d="M{x-1.4*k:.2f} {y-3.7*k:.2f} Q{x:.2f} {y+4.5*k:.2f} {x+1.4*k:.2f} {y-3.7*k:.2f} Z" fill="{c2}" opacity=".9"/>'
            f'<ellipse cx="{x-1.2*k:.2f}" cy="{y-1.6*k:.2f}" rx="{1.1*k:.2f}" ry="{1.6*k:.2f}" fill="#fff" opacity=".45"/>'
            f'<rect x="{x-1.1*k:.2f}" y="{y+6*k:.2f}" width="{2.2*k:.2f}" height="{1.5*k:.2f}" rx="{0.3*k:.2f}" fill="#b87333"/></g>')


def boat(x, y, k):
    return (f'<g><path d="M{x-3.2*k:.2f} {y:.2f} L{x+3.2*k:.2f} {y:.2f} L{x+2.2*k:.2f} {y+1.6*k:.2f} L{x-2.4*k:.2f} {y+1.6*k:.2f} Z" fill="#e0552b"/>'
            f'<path d="M{x:.2f} {y-0.4*k:.2f} L{x:.2f} {y-5.6*k:.2f} L{x+3.4*k:.2f} {y-0.4*k:.2f} Z" fill="#ffffff"/>'
            f'<path d="M{x-0.5*k:.2f} {y-0.4*k:.2f} L{x-0.5*k:.2f} {y-4.6*k:.2f} L{x-2.8*k:.2f} {y-0.4*k:.2f} Z" fill="#ffe9a8"/></g>')


def plane(x, y, k):
    return (f'<g transform="translate({x:.2f},{y:.2f}) rotate(-20)"><path d="M0 0 L{-7*k:.2f} {-2.6*k:.2f} L{-5*k:.2f} 0 L{-7*k:.2f} {2.2*k:.2f} Z" fill="#ffffff" stroke="#9fc6ee" stroke-width="{0.2*k:.2f}"/>'
            f'<path d="M0 0 L{-5*k:.2f} 0 L{-6*k:.2f} {1.1*k:.2f} Z" fill="#cfe4fb"/></g>')


def sun(x, y, k):
    rays = "".join(f'<line x1="{x:.2f}" y1="{y:.2f}" x2="{x+9*k*__import__("math").cos(a):.2f}" y2="{y+9*k*__import__("math").sin(a):.2f}" stroke="#fff3a8" stroke-width="{0.6*k:.2f}" opacity=".85"/>' for a in [i*3.14159/6 for i in range(12)])
    return f'<g>{rays}<circle cx="{x:.2f}" cy="{y:.2f}" r="{5.2*k:.2f}" fill="#fff3a8"/><circle cx="{x:.2f}" cy="{y:.2f}" r="{3.6*k:.2f}" fill="#ffe36b"/></g>'


def sakura(x, y, k):
    import math
    pet = "".join(f'<ellipse cx="{x+1.5*k*math.cos(a):.2f}" cy="{y+1.5*k*math.sin(a):.2f}" rx="{1.3*k:.2f}" ry="{0.9*k:.2f}" transform="rotate({a*180/math.pi:.1f} {x+1.5*k*math.cos(a):.2f} {y+1.5*k*math.sin(a):.2f})" fill="#ffb3d9"/>' for a in [i*2*math.pi/5 for i in range(5)])
    return f'<g opacity=".95">{pet}<circle cx="{x:.2f}" cy="{y:.2f}" r="{0.7*k:.2f}" fill="#ffe3f1"/></g>'


STARS = [(0.08, 0.12, 1.6), (0.22, 0.78, 1.1), (0.41, 0.2, 1.0), (0.62, 0.86, 1.4), (0.87, 0.18, 1.2), (0.94, 0.62, 0.9), (0.35, 0.55, 0.8), (0.75, 0.42, 1.0)]


def star(cx, cy, r):
    pts = []
    for i in range(8):
        rr = r if i % 2 == 0 else r * 0.38
        import math
        a = math.pi / 4 * i - math.pi / 2
        pts.append(f"{cx + rr * math.cos(a):.2f},{cy + rr * math.sin(a):.2f}")
    return f'<polygon points="{" ".join(pts)}" fill="#fff8b0" opacity=".9"/>'


# ⚠️ ボタンと 同じ色(index.html の TONE と COLORS.level。docs/ボタンの色.md)。左上→右下の グラデーション
TONES = [("#f20077", "#ff4da3"), ("#e0202e", "#ff5c66"), ("#f25c00", "#ff8a33"), ("#00b33c", "#00d948"), ("#006b57", "#12a889"),
         ("#0077b3", "#33aaee"), ("#3324db", "#6a5cff"), ("#8a2be0", "#bb55ff"), ("#eb14b5", "#ff6fd8")]
SEA = ("#1d6bff", "#649aff")  # 世界の旅の ボタンの青


def wrap(paths, vb, W, H, extra=""):
    x0, y0, vw, vh = vb
    k = vw / 360
    tonedefs = "".join(f'<linearGradient id="t{i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>' for i, (a, b) in enumerate(TONES))
    style = (STYLE.replace("{S2}", f"{0.9*k:.3f}").replace("{S}", f"{0.45*k:.3f}").replace("{F}", f"{0.55/k:.3f}").replace("{F2}", f"{0.4/k:.3f}")
             .replace("{SEA0}", SEA[0]).replace("{SEA1}", SEA[1]).replace("{TONEDEFS}", tonedefs))
    box = f'x="{x0}" y="{y0}" width="{vw}" height="{vh}"'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="{x0} {y0} {vw} {vh}" preserveAspectRatio="none">
{style}
<rect {box} fill="url(#sea)"/>
<rect {box} fill="url(#gloss)" opacity=".5"/>
<g transform="translate(0,{1.0*k:.3f})" fill="#0b2a7a" stroke="#0b2a7a" stroke-width="{0.5*k:.3f}" stroke-linejoin="round" opacity=".75">{paths}</g>
<g filter="url(#shade)"><g fill="url(#t0)" stroke="#ffffff" stroke-width="{0.3*k:.3f}" stroke-opacity=".7" stroke-linejoin="round">{paths}</g></g>
<g fill="url(#gloss)">{paths}</g>
{extra}
<rect {box} filter="url(#glit1)" opacity=".9"/>
<rect {box} filter="url(#glit2)" opacity=".7"/>
</svg>'''


def world(src, out):
    s = open(src, encoding="utf-8").read()
    # BlankMap-Equirectangular: <g id="positioner" transform="translate(180, 90) scale(1, -1)"> の中に 国ごとの <path>
    body = s[s.index('<g id="positioner"'):s.rindex("</svg>")]
    body = re.sub(r"<style.*?</style>", "", body, flags=re.S)
    paths = '<g transform="translate(180, 90) scale(1, -1)">' + re.sub(r'class="[^"]*"', "", body.split(">", 1)[1]).rsplit("</g>", 1)[0] + "</g>"
    paths = re.sub(r'<g[^>]*>|</g>', lambda m: m.group(0) if 'transform' in m.group(0) or m.group(0) == '</g>' else '<g>', paths)
    n = [0]
    def color(m):
        n[0] += 1
        return f'<path fill="url(#t{(n[0] * 4) % len(TONES)})" '
    paths = re.sub(r'<path ', color, paths)
    deco = ""  # かざりは 無し(けいくん 2026-09-24「やっぱり絵は無い方がいい」)
    _unused = (sun(16, 136, 1) + cloud(40, 60, 1.2) + cloud(120, 24, 1) + cloud(310, 130, 1.1) + cloud(230, 132, .9) + cloud(345, 26, .8)
            + balloon(66, 92, 1, "#ff7eb6", "#ffe066") + balloon(300, 104, 1, "#7ecbff", "#ffffff") + balloon(155, 128, .9, "#ffb36b", "#ff5e8a")
            + boat(150, 96, 1) + boat(250, 118, .9) + boat(52, 128, .8) + plane(200, 140, 1) + plane(330, 60, .9))
    svg = wrap(paths, (0, 6, 360, 144), 1080, 432, deco)
    open(out, "w", encoding="utf-8").write(svg)


def japan(shp, out):
    import shapefile
    sys.path.insert(0, __file__.rsplit("/", 1)[0])
    import make_japan_map as J
    sf = shapefile.Reader(shp)
    land = J.paths(sf, (J.LON0, J.LON1, J.LAT0, J.LAT1), J.main_xy)
    inset = J.paths(sf, (J.ILON0, J.ILON1, J.ILAT0, J.ILAT1), J.inset_xy)
    k = 1 / 25
    box = f'x="{J.IX}" y="{J.IY}" width="{J.IW:.2f}" height="{J.IH:.2f}"'
    extra = (f'<clipPath id="ic"><rect {box}/></clipPath>'
             f'<rect {box} fill="url(#sea)" stroke="#ffffff" stroke-width="0.6" opacity=".97"/>'
             f'<g clip-path="url(#ic)"><g filter="url(#shade)"><g fill="url(#t0)" stroke="#ffffff" stroke-width="0.3" stroke-opacity=".7" stroke-linejoin="round">{inset}</g></g>'
             f'<g fill="url(#gloss)" opacity=".9">{inset}</g></g>'
             f'<rect {box} fill="none" stroke="#ffffff" stroke-width="1.2"/>')
    d = 1  # 日本の絵は 1単位が 世界の 1/25 なので、かざりは 単位で書けば 同じ見た目
    main = f'<clipPath id="mc"><rect x="0" y="0" width="{J.W:.2f}" height="{J.H:.2f}"/></clipPath><g clip-path="url(#mc)">{land}</g>'
    svg = wrap(main, (0, 0, J.W, J.H), 1080, round(1080 * J.H / J.W), extra)
    open(out, "w", encoding="utf-8").write(svg)


if __name__ == "__main__":
    kind, src, out = sys.argv[1:4]
    (world if kind == "world" else japan)(src, out)
    print(out)
