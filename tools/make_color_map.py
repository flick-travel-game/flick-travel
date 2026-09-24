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
 <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#7fd4ff"/><stop offset=".55" stop-color="#4fb6f7"/><stop offset="1" stop-color="#2f8fe6"/>
 </linearGradient>
 <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#fff3a0"/><stop offset=".45" stop-color="#b8f07a"/><stop offset="1" stop-color="#5ec95a"/>
 </linearGradient>
 <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity="0"/>
 </linearGradient>
 <filter id="soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="{S}"/></filter>
 <filter id="shade" x="-5%" y="-5%" width="110%" height="110%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="{S2}" result="b"/>
  <feOffset in="b" dx="0" dy="{S}" result="o"/>
  <feFlood flood-color="#1b6bb3" flood-opacity=".45"/><feComposite in2="o" operator="in" result="sh"/>
  <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge>
 </filter>
 <filter id="sparkle" x="-20%" y="-20%" width="140%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency="{F}" numOctaves="1" seed="5" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 9 -7.4"/>
 </filter>
</defs>
'''

STARS = [(0.08, 0.12, 1.6), (0.22, 0.78, 1.1), (0.41, 0.2, 1.0), (0.62, 0.86, 1.4), (0.87, 0.18, 1.2), (0.94, 0.62, 0.9), (0.35, 0.55, 0.8), (0.75, 0.42, 1.0)]


def star(cx, cy, r):
    pts = []
    for i in range(8):
        rr = r if i % 2 == 0 else r * 0.38
        import math
        a = math.pi / 4 * i - math.pi / 2
        pts.append(f"{cx + rr * math.cos(a):.2f},{cy + rr * math.sin(a):.2f}")
    return f'<polygon points="{" ".join(pts)}" fill="#fff8b0" opacity=".9"/>'


def wrap(paths, vb, W, H, extra=""):
    x0, y0, vw, vh = vb
    k = vw / 360  # 単位の大きさ(世界=1度, 日本=1/25度)
    style = STYLE.replace("{S2}", f"{0.9*k:.3f}").replace("{S}", f"{0.45*k:.3f}").replace("{F}", f"{0.06/k:.3f}")
    stars = "".join(star(x0 + vw * fx, y0 + vh * fy, r * k * 1.6) for fx, fy, r in STARS)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="{x0} {y0} {vw} {vh}" preserveAspectRatio="none">
{style}
<rect x="{x0}" y="{y0}" width="{vw}" height="{vh}" fill="url(#sea)"/>
<rect x="{x0}" y="{y0}" width="{vw}" height="{vh}" filter="url(#sparkle)" opacity=".7"/>
<g filter="url(#shade)"><g fill="url(#land)" stroke="#2f9c4a" stroke-width="{0.35*k:.3f}" stroke-linejoin="round">{paths}</g></g>
<g fill="url(#gloss)" opacity=".9">{paths}</g>
{extra}
{stars}
<rect x="{x0}" y="{y0}" width="{vw}" height="{vh}" fill="url(#gloss)" opacity=".5"/>
</svg>'''


CANDY = ["#ff9bc7", "#ffb36b", "#ffe66b", "#a6ef7a", "#7be0d4", "#8fc9ff", "#c6a6ff", "#ff8f8f"]


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
        return f'<path fill="{CANDY[(n[0] * 5) % len(CANDY)]}" '
    paths = re.sub(r'<path ', color, paths)
    svg = wrap(paths, (0, 6, 360, 144), 1080, 432)
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
             f'<rect {box} fill="url(#sea)" stroke="#ffffff" stroke-width="{0.6*k*25:.2f}" opacity=".97"/>'
             f'<g clip-path="url(#ic)"><g filter="url(#shade)"><g fill="url(#land)" stroke="#2f9c4a" stroke-width="{0.35:.2f}" stroke-linejoin="round">{inset}</g></g>'
             f'<g fill="url(#gloss)" opacity=".9">{inset}</g></g>'
             f'<rect {box} fill="none" stroke="#ffffff" stroke-width="1.2"/>')
    main = f'<clipPath id="mc"><rect x="0" y="0" width="{J.W:.2f}" height="{J.H:.2f}"/></clipPath><g clip-path="url(#mc)">{land}</g>'
    svg = wrap(main, (0, 0, J.W, J.H), 1080, round(1080 * J.H / J.W), extra)
    open(out, "w", encoding="utf-8").write(svg)


if __name__ == "__main__":
    kind, src, out = sys.argv[1:4]
    (world if kind == "world" else japan)(src, out)
    print(out)
