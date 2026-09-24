#!/usr/bin/env python3
"""日本一周マップ(world-map-mono.jpg と同じ モノクロのペン画風)の SVG を作る。

もとのデータは Natural Earth 1:10m の land(パブリックドメイン)。
    https://naciscdn.org/naturalearth/10m/physical/ne_10m_land.zip
を ほどいた ne_10m_land.shp を 引数にわたす。

    pip install pyshp
    python3 tools/make_japan_map.py <ne_10m_land.shp> <出力.svg>

そのあと ブラウザで 3倍(3240px幅)に描いて 1080px に縮め、japan-map-mono.jpg にする(scripts は README を見る)。

地図の 決めごと(index.html の JAPAN_MAP と 同じ数字にすること):
- 本土: 東経128.5〜146.5度 / 北緯29.8〜46度。横は cos(37°)≒0.8 で ちぢめる(北の地図が 横にのびないように)
- 南西諸島(沖縄・石垣)は 左上の わくの中(東経122.5〜129.5 / 北緯24〜27.5)。同じ縮尺
"""
import sys

import shapefile

LON0, LON1, LAT0, LAT1 = 128.5, 146.5, 29.8, 46.0   # 本土
ILON0, ILON1, ILAT0, ILAT1 = 122.5, 129.5, 24.0, 27.5  # 南西諸島の わく
K = 25.0          # 1度 = 25単位(たて)。横は K*0.8
KX = K * 0.8
W, H = (LON1 - LON0) * KX, (LAT1 - LAT0) * K   # 360 x 405
IX, IY = 6.0, 6.0  # わくの左上
IW, IH = (ILON1 - ILON0) * KX, (ILAT1 - ILAT0) * K


def main_xy(lon, lat):
    return (lon - LON0) * KX, (LAT1 - lat) * K


def inset_xy(lon, lat):
    return IX + (lon - ILON0) * KX, IY + (ILAT1 - lat) * K


def paths(sf, box, xy):
    lon0, lon1, lat0, lat1 = box
    out = []
    for sh in sf.iterShapes():
        parts = list(sh.parts) + [len(sh.points)]
        for i in range(len(parts) - 1):
            pts = sh.points[parts[i]:parts[i + 1]]
            if not any(lon0 - 1 <= x <= lon1 + 1 and lat0 - 1 <= y <= lat1 + 1 for x, y in pts):
                continue
            d = "M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in (xy(x, y) for x, y in pts)) + "Z"
            out.append(f'<path d="{d}"/>')
    return "\n".join(out)


def main():
    shp, out = sys.argv[1], sys.argv[2]
    sf = shapefile.Reader(shp)
    land = paths(sf, (LON0, LON1, LAT0, LAT1), main_xy)
    inset = paths(sf, (ILON0, ILON1, ILAT0, ILAT1), inset_xy)
    # 南西諸島の わくの外に はみ出さないように 切る
    clip = f'<clipPath id="ic"><rect x="{IX}" y="{IY}" width="{IW:.2f}" height="{IH:.2f}"/></clipPath>'
    mainclip = f'<clipPath id="mc"><rect x="0" y="0" width="{W:.2f}" height="{H:.2f}"/></clipPath>'
    grid = []
    for lat in range(30, 46, 5):
        y = main_xy(0, lat)[1]
        grid.append(f'<line x1="0" y1="{y:.1f}" x2="{W:.1f}" y2="{y:.1f}" stroke="#8a8a8a" stroke-width="0.16" stroke-dasharray="0.6 1.4"/>')
    for lon in range(130, 146, 5):
        x = main_xy(lon, 0)[0]
        grid.append(f'<line x1="{x:.1f}" y1="0" x2="{x:.1f}" y2="{H:.1f}" stroke="#8a8a8a" stroke-width="0.16" stroke-dasharray="0.6 1.4"/>')
    defs = open(__file__.replace("make_japan_map.py", "map-defs.svgfrag"), encoding="utf-8").read()
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="{1080*H/W:.0f}" viewBox="0 0 {W:.2f} {H:.2f}" preserveAspectRatio="none">
<style>.land path{{fill:#000;stroke:none}}</style>
<defs>
{defs}
{clip}{mainclip}
<mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="{W:.2f}" height="{H:.2f}"><g filter="url(#landmask)"><g class="land" clip-path="url(#mc)">{land}</g></g></mask>
<mask id="mi" maskUnits="userSpaceOnUse" x="0" y="0" width="{W:.2f}" height="{H:.2f}"><g filter="url(#landmask)"><g class="land" clip-path="url(#ic)">{inset}</g></g></mask>
</defs>
<rect x="0" y="0" width="{W:.2f}" height="{H:.2f}" fill="#efede7"/>
<rect x="0" y="0" width="{W:.2f}" height="{H:.2f}" filter="url(#paper)"/>
<g opacity=".7">{"".join(grid)}</g>
<g mask="url(#m)"><rect x="0" y="0" width="{W:.2f}" height="{H:.2f}" fill="#faf9f6"/><rect x="0" y="0" width="{W:.2f}" height="{H:.2f}" fill="url(#hatch)" opacity=".55"/></g>
<g filter="url(#coast)"><g class="land" clip-path="url(#mc)">{land}</g></g>
<rect x="{IX}" y="{IY}" width="{IW:.2f}" height="{IH:.2f}" fill="#efede7"/>
<rect x="{IX}" y="{IY}" width="{IW:.2f}" height="{IH:.2f}" filter="url(#paper)"/>
<g mask="url(#mi)"><rect x="0" y="0" width="{W:.2f}" height="{H:.2f}" fill="#faf9f6"/><rect x="0" y="0" width="{W:.2f}" height="{H:.2f}" fill="url(#hatch)" opacity=".55"/></g>
<g filter="url(#coast)"><g class="land" clip-path="url(#ic)">{inset}</g></g>
<rect x="{IX}" y="{IY}" width="{IW:.2f}" height="{IH:.2f}" fill="none" stroke="#1f1f1f" stroke-width="0.5"/>
<rect x="1.3" y="1.3" width="{W-2.6:.2f}" height="{H-2.6:.2f}" fill="none" stroke="#1f1f1f" stroke-width="0.6"/>
<rect x="2.3" y="2.3" width="{W-4.6:.2f}" height="{H-4.6:.2f}" fill="none" stroke="#1f1f1f" stroke-width="0.2"/>
</svg>'''
    open(out, "w", encoding="utf-8").write(svg)
    print(f"{out}: {W:.0f}x{H:.0f} 単位 / 本土 {land.count('<path')} 島 / 南西諸島 {inset.count('<path')} 島")


if __name__ == "__main__":
    main()
