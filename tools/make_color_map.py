#!/usr/bin/env python3
"""カラフルな地図(トップの絵と そろえた 明るい色)を作る。

    python3 tools/make_color_map.py world <world.svg(BlankMap-Equirectangular)> <出力.svg>
    python3 tools/make_color_map.py japan <ne_10m_admin_1_states_provinces.shp> <出力.svg>   # 同じフォルダに ne_10m_land.shp も置く

そのあと ブラウザで 3倍に描いて 1080px に縮める(scratchpad の render.mjs)。
切りかた(viewBox・南西諸島のわく)は モノクロ版(make_japan_map.py / world-map-mono)と 同じなので、ピンの位置は 変えなくてよい。
"""
import re
import sys

STYLE = '''
<defs>
 <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SEA1}"/><stop offset="1" stop-color="{SEA0}"/></linearGradient>
 <linearGradient id="tn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{NB0}"/><stop offset="1" stop-color="{NB1}"/></linearGradient>
 {TONEDEFS}
 <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".42"/><stop offset=".58" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
 <filter id="shade" x="-5%" y="-5%" width="110%" height="110%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="{S2}" result="b"/><feOffset in="b" dx="0" dy="{S}" result="o"/>
  <feFlood flood-color="#0b3f8a" flood-opacity=".35"/><feComposite in2="o" operator="in" result="sh"/>
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


# トップの絵(hero.webp)の 字と同じ あかるい キャンディ色(けいくん 2026-09-24「さわやかな青ベースで カラフルに」)。上→下で 少し こくなる
TONES = [("#ff6b6b", "#ff2f4f"), ("#ffd23f", "#ff9f1c"), ("#8ae234", "#2fb84a"), ("#4d9dff", "#1e5fff"), ("#c58bff", "#8a3cff"),
         ("#ffa63b", "#ff6b2b"), ("#ff7fc8", "#ff2f8e"), ("#5ee6d6", "#12b3a8"), ("#b9f26b", "#6ccf2e")]
SEA = ("#4fb8ff", "#c9efff")  # さわやかな 空色(下が こい・上が うすい)
NEIGHBOR = ("#eaf6ff", "#cfe6ff")  # 日本の となりの国(色を付けない)


def wrap(paths, vb, W, H, extra=""):
    x0, y0, vw, vh = vb
    k = vw / 360
    tonedefs = "".join(f'<linearGradient id="t{i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>' for i, (a, b) in enumerate(TONES))
    style = (STYLE.replace("{S2}", f"{0.9*k:.3f}").replace("{S}", f"{0.45*k:.3f}").replace("{F}", f"{0.55/k:.3f}").replace("{F2}", f"{0.4/k:.3f}")
             .replace("{SEA0}", SEA[0]).replace("{SEA1}", SEA[1]).replace("{NB0}", NEIGHBOR[0]).replace("{NB1}", NEIGHBOR[1]).replace("{TONEDEFS}", tonedefs))
    box = f'x="{x0}" y="{y0}" width="{vw}" height="{vh}"'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="{x0} {y0} {vw} {vh}" preserveAspectRatio="none">
{style}
<rect {box} fill="url(#sea)"/>
<rect {box} fill="url(#gloss)" opacity=".5"/>
<g transform="translate(0,{1.0*k:.3f})" fill="#1a63c9" stroke="#1a63c9" stroke-width="{0.5*k:.3f}" stroke-linejoin="round" opacity=".6">{paths}</g>
<g filter="url(#shade)"><g fill="url(#t0)" stroke="#ffffff" stroke-width="{0.3*k:.3f}" stroke-opacity=".9" stroke-linejoin="round">{paths}</g></g>
<g fill="url(#gloss)">{paths}</g>
{extra}
<rect {box} filter="url(#glit1)" opacity=".9"/>
<rect {box} filter="url(#glit2)" opacity=".7"/>
</svg>'''


# 大きな国の色は 決めておく(けいくん 2026-09-24「右上に赤が多くて怖い → 北海道と同じ色(むらさき)に」)。番号は TONES の並び
BIG = {"RUS": 4, "CHN": 7, "USA": 2, "CAN": 1, "BRA": 5, "AUS": 8, "IND": 6, "KAZ": 1, "MNG": 6, "GRL": 6, "ARG": 3, "DZA": 3,
       "SAU": 0, "IRN": 2, "MEX": 0, "IDN": 5, "LBY": 7, "SDN": 3, "COD": 4, "ZAF": 6, "PER": 8, "COL": 1, "EGY": 8, "TUR": 2,
       "UKR": 6, "FRA": 3, "ESP": 6, "DEU": 1, "SWE": 6, "NOR": 8, "FIN": 3, "POL": 5, "ITA": 2, "GBR": 6, "JPN": 6, "MDG": 4,
       "TCD": 1, "NER": 4, "MLI": 8, "MRT": 0, "AGO": 3, "NAM": 6, "BWA": 8, "ETH": 4, "TZA": 1, "KEN": 5, "MOZ": 7, "ZMB": 3,
       "PAK": 5, "AFG": 8, "MMR": 1, "THA": 7, "VNM": 3, "MYS": 1, "PNG": 6, "NZL": 8, "CHL": 7, "BOL": 5, "VEN": 2, "ISL": 6,
       "NGA": 7, "ETH": 4, "SOM": 0, "CAF": 8, "CMR": 5, "GAB": 1, "MAR": 6, "TUN": 2, "IRQ": 3, "SYR": 5, "YEM": 7, "OMN": 6,
       "UZB": 3, "TKM": 5, "PRY": 2, "URY": 4, "ECU": 4, "GUY": 6, "ROU": 2, "BGR": 0, "GRC": 5, "HUN": 8, "AUT": 6, "CHE": 0,
       "PRT": 1, "IRL": 8, "BLR": 5, "LTU": 2, "LVA": 6, "EST": 4, "NPL": 0, "BGD": 5, "LKA": 8, "PHL": 1, "KOR": 3, "PRK": 5}


def world(src, out):
    s = open(src, encoding="utf-8").read()
    # BlankMap-Equirectangular: <g class="country XXX"> ごとに <path>。国の記号(XXX)で 色を決める
    body = s[s.index('<g id="positioner"'):s.rindex("</svg>")]
    body = re.sub(r"<style.*?</style>", "", body, flags=re.S)
    inner = body.split(">", 1)[1].rsplit("</g>", 1)[0]
    out_parts = []
    def repl(m):
        code, paths = m.group(1), m.group(2)
        if code in BIG:
            t = BIG[code]
        else:
            t = (sum(ord(c) for c in code) * 7) % len(TONES)
            if len(paths) > 20000 and t == 0:
                t = 8  # 大きな国は 赤にしない
        return re.sub(r"<path ", f'<path fill="url(#t{t})" ', paths)
    inner = re.sub(r'<g[^>]*class="country ([A-Z]+)"[^>]*>(.*?)</g>', repl, inner, flags=re.S)
    inner = re.sub(r"<g[^>]*>|</g>", "", inner)
    paths = '<g transform="translate(180, 90) scale(1, -1)">' + inner + "</g>"
    deco = ""  # かざりは 無し(けいくん 2026-09-24「やっぱり絵は無い方がいい」)
    svg = wrap(paths, (0, 6, 360, 144), 1080, 432, deco)
    open(out, "w", encoding="utf-8").write(svg)


def japan(shp, out):
    """shp = ne_10m_admin_1_states_provinces.shp(都道府県)。同じフォルダの ne_10m_land.shp(となりの国)も読む"""
    import shapefile
    sys.path.insert(0, __file__.rsplit("/", 1)[0])
    import make_japan_map as J
    land = shapefile.Reader(shp.replace("ne_10m_admin_1_states_provinces", "ne_10m_land"))
    adm = shapefile.Reader(shp)
    fields = [f[0] for f in adm.fields[1:]]
    ia, iname = fields.index("adm0_a3"), fields.index("name")
    prefs = [(sr.record[iname], sr.shape) for sr in adm.iterShapeRecords() if sr.record[ia] == "JPN"]
    print(f"都道府県 {len(prefs)}")

    def pref_paths(box, xy):
        out = []
        for i, (name, sh) in enumerate(prefs):
            parts = list(sh.parts) + [len(sh.points)]
            d = ""
            for j in range(len(parts) - 1):
                pts = sh.points[parts[j]:parts[j + 1]]
                if not any(box[0] - 1 <= x <= box[1] + 1 and box[2] - 1 <= y <= box[3] + 1 for x, y in pts):
                    continue
                d += "M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in (xy(x, y) for x, y in pts)) + "Z"
            if d:
                out.append(f'<path fill="url(#t{(i * 4) % len(TONES)})" d="{d}"><title>{name}</title></path>')
        return "\n".join(out)

    def neighbor_paths(box, xy):
        return J.paths(land, box, xy).replace("<path ", '<path fill="url(#tn)" ')

    main_box, inset_box = (J.LON0, J.LON1, J.LAT0, J.LAT1), (J.ILON0, J.ILON1, J.ILAT0, J.ILAT1)
    main = neighbor_paths(main_box, J.main_xy) + pref_paths(main_box, J.main_xy)
    inset = pref_paths(inset_box, J.inset_xy)
    box = f'x="{J.IX}" y="{J.IY}" width="{J.IW:.2f}" height="{J.IH:.2f}"'
    extra = (f'<clipPath id="ic"><rect {box}/></clipPath>'
             f'<rect {box} fill="url(#sea)" stroke="#ffffff" stroke-width="0.6" opacity=".97"/>'
             f'<g clip-path="url(#ic)"><g filter="url(#shade)"><g stroke="#ffffff" stroke-width="0.3" stroke-opacity=".9" stroke-linejoin="round">{inset}</g></g>'
             f'<g fill="url(#gloss)" opacity=".9">{inset}</g></g>'
             f'<rect {box} fill="none" stroke="#ffffff" stroke-width="1.2"/>')
    mainp = f'<clipPath id="mc"><rect x="0" y="0" width="{J.W:.2f}" height="{J.H:.2f}"/></clipPath><g clip-path="url(#mc)">{main}</g>'
    svg = wrap(mainp, (0, 0, J.W, J.H), 1080, round(1080 * J.H / J.W), extra)
    open(out, "w", encoding="utf-8").write(svg)


if __name__ == "__main__":
    kind, src, out = sys.argv[1:4]
    (world if kind == "world" else japan)(src, out)
    print(out)
