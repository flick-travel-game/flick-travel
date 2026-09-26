#!/usr/bin/env python3
"""data/companies.json → kabu/companies.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が kabu/ を 作るときに 呼ぶ。手で 直さない
    python3 tools/kabu/companies_js.py"""
import html, json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
REQ = ("id", "name", "reading", "country", "countryCode", "region", "sector", "description", "course", "fameRank")

def rubifier():
    sys.path.insert(0, str(ROOT / "tools"))
    import make_ruby as M
    from sudachipy import dictionary, tokenizer
    tok = dictionary.Dictionary().create(); mode = tokenizer.Tokenizer.SplitMode.C
    def rub(text):
        parts, prev = [], ""
        for w in (w for seg in M.SPLIT.split(text) for w in (tok.tokenize(seg, mode) if not M.SPLIT.fullmatch(seg) else [seg])):
            if isinstance(w, str): parts.append(html.escape(w)); prev = w; continue
            s = w.surface(); r = M.FIX.get(s) or M.hira(w.reading_form())
            num = M.DIGITS.match(s)
            if num:
                rest = s[num.end():]; rr = "".join(M.hira(x.reading_form()) for x in tok.tokenize(rest, mode)) if rest else ""
                parts.append(html.escape(num.group()) + M.ruby_word(rest, rr))
            elif s == "日" and M.DIGITS.search(prev[-1:]): parts.append(s)
            else: parts.append(M.ruby_word(s, r))
            prev = s
        return "".join(parts)
    return rub

def check(d):
    """companies.json の 形を 確かめる(まちがいが あれば 止める)"""
    ids = set(); secs = {s["id"] for s in d["meta"]["sectors"]}; courses = [c["name"] for c in d["meta"]["courses"]]
    for c in d["companies"]:
        for k in REQ: assert c.get(k) not in (None, ""), (c.get("id"), k)
        assert c["id"] not in ids, ("id がかぶる", c["id"]); ids.add(c["id"])
        assert re.fullmatch(r"[ぁ-ゖー]+", c["reading"]), (c["id"], c["reading"])
        assert c["sector"] in secs, (c["id"], c["sector"])
        assert c["course"] in courses, (c["id"], c["course"])
        assert c["region"] in d["meta"]["regions"], (c["id"], c["region"])
        assert re.fullmatch(r"[A-Z]{2}", c["countryCode"]), c["id"]

def main():
    d = json.loads((ROOT / "data/companies.json").read_text(encoding="utf-8"))
    check(d)
    rub = rubifier(); courses = [c["name"] for c in d["meta"]["courses"]]
    out = []
    for c in d["companies"]:
        o = dict(id=c["id"], n=c["name"], r=c["reading"], cc=c["countryCode"], co=c["country"], rg=c["region"], s=c["sector"],
                 d=c["description"], cs=courses.index(c["course"]), f=c["fameRank"])
        for k, s in (("nameJa", "j"), ("industry", "in"), ("detail", "dl"), ("ticker", "t"), ("exchange", "x"), ("icon", "e"), ("url", "u"), ("wiki", "w"), ("marketCapText", "mc")):
            if c.get(k): o[s] = c[k]
        if c.get("adr"): o["adr"] = 1
        if c.get("index"): o["ix"] = "・".join(c["index"])
        o["rb"] = rub(c["description"])
        out.append(o)
    js = dict(asOf=d["meta"]["asOf"], note=d["meta"]["note"], sectors=d["meta"]["sectors"], list=out)
    (ROOT / "kabu/companies.js").write_text("/* data/companies.json から tools/kabu/companies_js.py が 作る。手で 直さない */\nconst COMPANIES = " +
                                            json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("kabu/companies.js", len(out), "社", (ROOT / "kabu/companies.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
