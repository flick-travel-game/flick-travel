#!/usr/bin/env python3
"""フリックITパスポート(けいくん 2026-11-11)。tools/itpass/meta.json + tools/itpass/terms-<旅>.json → data/itpass.json(1か所に まとめた もの)と itpass/terms.js(ゲームが 読む 形。説明に ふりがな)
tools/build_games.py が itpass/ を 作るときに 呼ぶ。data/itpass.json と itpass/terms.js は 手で 直さない(ことばは terms-<旅>.json を 直す)
    python3 tools/itpass/terms_js.py          # 形を 確かめてから 作る(まちがいが あれば 止まる)
    python3 tools/itpass/terms_js.py --check  # 確かめるだけ
決まりは tools/itpass/PROMPT.md。もとは tools/eisei/terms_js.py(衛生管理者)"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
REQ = ("id", "name", "reading", "journey", "category", "difficulty", "type", "emoji", "mapNode", "field", "description")
KANA = re.compile(r"[ぁ-ゖー]+")
# ⚠️ 名前・説明に 出さない ことば(災害を こわく しない・変わる 数字・民間の 名前)。見つけたら 止める(けいくん 2026-10-31)
BAN = ["死亡", "死者", "死ぬ", "死な", "死ん", "遺体", "犠牲", "惨", "自殺", "殺", "こわい", "怖い", "恐ろし", "暴力",
       "合格率", "合格点は", "必ず受か", "抜け道", "ばれない", "ブラック企業", "ハッキングの やりかた", "パスワードを 破る", "破りかた", "乗っ取りかた"]
# ⚠️ 2026年に 変わった 決まり。古い 答えは name に しない。説明の「前は ◯◯でした」の 1文だけ 書いて よい
OLD_NAMES = []
OLD_OK = re.compile(r"(もとは|まえは|前は|以前は|かつては|これまでは|それまでは|むかしは|変わり|かわり|なくなり|廃止|改め|改正|引き下げ)")
BAN_OK = {}  # "id": ["字"](どうしても 要る ときだけ)
# 法律の ことばの 中に たまたま 入る 字(相殺の「殺」・半血の「血」)。この ことばを 外してから BAN を 見る
BAN_WORD_OK = ["相殺"]  # ことばの 中に たまたま 入る 字
def ban_text(txt):
    for w in BAN_WORD_OK: txt = txt.replace(w, "")
    return txt
RB_FIX = {
    "1<ruby>人<rt>ひと</rt></ruby>": "<ruby>1人<rt>ひとり</rt></ruby>",
    "2<ruby>人<rt>ひと</rt></ruby>": "<ruby>2人<rt>ふたり</rt></ruby>",
}
for _f in sorted(HERE.glob("rbfix-*.json")): RB_FIX.update(json.loads(_f.read_text(encoding="utf-8")))
# 📘 分野 = シラバス(Ver.6.5)の 中分類 23こ。📝 分野の 札(ruleset)は 中分類で 決まる(まちがえると 模擬試験の 分野の 数が くずれる)
FIELD_RS = {"企業活動": "ストラテジ系", "法務": "ストラテジ系", "経営戦略マネジメント": "ストラテジ系", "技術戦略マネジメント": "ストラテジ系", "ビジネスインダストリ": "ストラテジ系",
            "システム戦略": "ストラテジ系", "システム企画": "ストラテジ系",
            "システム開発技術": "マネジメント系", "ソフトウェア開発管理技術": "マネジメント系", "プロジェクトマネジメント": "マネジメント系", "サービスマネジメント": "マネジメント系", "システム監査": "マネジメント系",
            "基礎理論": "テクノロジ系", "アルゴリズムとプログラミング": "テクノロジ系", "コンピュータ構成要素": "テクノロジ系", "システム構成要素": "テクノロジ系", "ソフトウェア": "テクノロジ系",
            "ハードウェア": "テクノロジ系", "情報デザイン": "テクノロジ系", "情報メディア": "テクノロジ系", "データベース": "テクノロジ系", "ネットワーク": "テクノロジ系", "セキュリティ": "テクノロジ系"}
FIELDS = set(FIELD_RS)
RULESETS = {"ストラテジ系", "マネジメント系", "テクノロジ系"}
# 旅ごとに 使える 中分類(シラバスの 場所)
JOURNEY_FIELDS = {"keiei": {"企業活動"}, "homu": {"法務"}, "senryaku": {"経営戦略マネジメント", "技術戦略マネジメント", "ビジネスインダストリ"},
                  "shisutemu": {"システム戦略", "システム企画"}, "kaihatsu": {"システム開発技術", "ソフトウェア開発管理技術", "プロジェクトマネジメント"},
                  "service": {"サービスマネジメント", "システム監査"}, "kiso": {"基礎理論", "アルゴリズムとプログラミング"},
                  "konpyuta": {"コンピュータ構成要素", "システム構成要素", "ソフトウェア", "ハードウェア", "情報デザイン", "情報メディア"},
                  "nettowaku": {"データベース", "ネットワーク"}, "sekyuriti": {"セキュリティ"}}
LONG_READ = 10  # 10字を こえる 読みは 旅ごとに 10語まで(打つのが 大変)

def load():
    d = {"meta": json.loads((HERE / "meta.json").read_text(encoding="utf-8")), "terms": []}
    for J in d["meta"]["journeys"]:
        f = HERE / f"terms-{J['id']}.json"
        if f.exists(): d["terms"] += json.loads(f.read_text(encoding="utf-8"))
    return d

def check(d):
    m = d["meta"]; errs = []; warn = []
    js = {j["id"]: j for j in m["journeys"]}
    nodes = {f"{k}:{n['id']}" for k, g in m["diagrams"].items() for n in g["nodes"]}
    dvs = {L["difficulty"] for L in m["levels"]}
    ids = {}; readings = {}; per = {}
    for t in d["terms"]:
        tid = t.get("id")
        for k in REQ:
            if t.get(k) in (None, ""): errs.append(f"{tid}: {k} が 空")
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", str(tid)): errs.append(f"{tid}: id は 英小文字・数字・- だけ")
        if tid in ids: errs.append(f"{tid}: id が かぶる")
        ids[tid] = t
        for r in [t.get("reading", "")] + list(t.get("acceptedReadings") or []):
            if not KANA.fullmatch(r or ""): errs.append(f"{tid}: 読み「{r}」は ひらがなと ー だけ")
        if (t.get("acceptedReadings") or [t.get("reading")])[0] != t.get("reading"): errs.append(f"{tid}: acceptedReadings の 先頭は reading")
        if t.get("journey") not in js: errs.append(f"{tid}: journey「{t.get('journey')}」が ない")
        if t.get("difficulty") not in dvs: errs.append(f"{tid}: difficulty は {sorted(dvs)}")
        if t.get("type") != "concept": errs.append(f"{tid}: type は concept")
        if t.get("mapNode") not in nodes: errs.append(f"{tid}: mapNode「{t.get('mapNode')}」が しくみ図に ない")
        if len(t.get("description", "")) > 130: warn.append(f"{tid}: 説明が 長い({len(t['description'])}字)")
        if t.get("field") not in FIELDS: errs.append(f"{tid}: field「{t.get('field')}」は {sorted(FIELDS)} の どれか")
        if t.get("formula") and len(t["formula"]) > 40: warn.append(f"{tid}: 公式が 長い")
        txt = ban_text(" / ".join([t.get("name", ""), t.get("description", ""), t.get("example", ""), t.get("kotoba", "")]))
        for w in BAN:
            if w in BAN_OK.get(tid, []): continue
            if w in txt:
                if w in OLD_NAMES and w not in t.get("name", "") and OLD_OK.search(t.get("description", "")): continue
                errs.append(f"{tid}: 「{w}」は 使わない")
        if t.get("field") in FIELD_RS and t.get("ruleset") != FIELD_RS[t["field"]]: errs.append(f"{tid}: 分野「{t['field']}」の 札は {FIELD_RS[t['field']]}(いまは {t.get('ruleset')})")
        if t.get("journey") in JOURNEY_FIELDS and t.get("field") not in JOURNEY_FIELDS[t["journey"]]: errs.append(f"{tid}: 旅 {t['journey']} の 分野は {sorted(JOURNEY_FIELDS[t['journey']])}")
        if len(t.get("reading", "")) > LONG_READ: per.setdefault(("long", t.get("journey")), 0); per[("long", t.get("journey"))] += 1
        if t.get("ruleset") and t["ruleset"] not in RULESETS: errs.append(f"{tid}: ruleset「{t['ruleset']}」は {sorted(RULESETS)} の どれか")
        if not t.get("ruleset"): errs.append(f"{tid}: 科目の 札(ruleset)が 無い")
        for r in [t.get("reading")] + list(t.get("acceptedReadings") or []):
            readings.setdefault(r, []).append(tid)
        per.setdefault((t.get("journey"), t.get("difficulty")), 0); per[(t.get("journey"), t.get("difficulty"))] += 1
    for t in d["terms"]:
        rel = t.get("relatedTerms") or []
        if not 1 <= len(rel) <= 3: errs.append(f"{t['id']}: relatedTerms は 1〜3個")
        for r in rel:
            if r not in ids: errs.append(f"{t['id']}: つながる ことば「{r}」が ない")
            if r == t["id"]: errs.append(f"{t['id']}: 自分を つないでいる")
    for r, v in readings.items():
        if len(set(v)) > 1: errs.append(f"読み「{r}」が かぶる: {v}")
    for (a, j), n in list(per.items()):
        if a == "long":
            if n > LONG_READ: errs.append(f"{j}: 10字を こえる 読みが {n}語(10語まで)")
            del per[(a, j)]
    for J in d["meta"]["journeys"]:
        n = sum(v for (j, dv), v in per.items() if j == J["id"])
        if n and n != 100: warn.append(f"{J['id']}: {n}語(100語に)")
    if len(d["terms"]) % 10: errs.append(f"ぜんぶで {len(d['terms'])}語。10の 倍数に そろえる")
    for w in warn: print("⚠️", w)
    if errs:
        for e in errs: print("❌", e)
        sys.exit("ITパスポートの ことばに まちがいが " + str(len(errs)) + " こ あります")
    return per

def main():
    d = load()
    per = check(d)
    print(" ".join(f"{j}{dv}:{n}" for (j, dv), n in sorted(per.items())))
    if "--check" in sys.argv:
        print("ITパスポートの ことば OK", len(d["terms"]), "語"); return
    (ROOT / "data/itpass.json").write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    from companies_js import rubifier
    rub0 = rubifier()
    def rub(text):
        h = rub0(text)
        for a, b in RB_FIX.items(): h = h.replace(a, b)
        return h
    out = []
    for t in d["terms"]:
        o = dict(id=t["id"], n=t["name"], r=t["reading"], j=t["journey"], c=t["category"], dv=t["difficulty"], ty=t["type"],
                 e=t["emoji"], mp=t["mapNode"], rel=t["relatedTerms"], ds=t["description"], rb=rub(t["description"]))
        alts = [a for a in (t.get("acceptedReadings") or []) if a != t["reading"]]
        if alts: o["al"] = alts
        if t.get("example"): o["ex"] = t["example"]; o["exrb"] = rub(t["example"])
        if t.get("ruleset"): o["rs"] = t["ruleset"]  # 📝 分野の 札(ストラテジ系 / マネジメント系 / テクノロジ系)
        if t.get("formula"): o["fm"] = t["formula"]  # 🧮 公式の 見本(公式を 打つ 語だけ。等幅で 出す)
        o["f"] = t["field"]
        out.append(o)
    m = d["meta"]
    js = dict(asOf=m["asOf"], note=m["note"], journeys=m["journeys"], levels=m["levels"], titles=m["titles"], allTitle=m["allTitle"],
              diagrams=m["diagrams"], missions=[], list=out, mock=m.get("mock"), mockNote=m.get("mockNote", ""))
    # ⭕❌ 一問一答・🔢 数字クイズ(決まりは MARU.md / NUM.md。確かめは maru_check.py)
    tids = {t["id"] for t in d["terms"]}
    maru = []
    for J in m["journeys"]:
        f = HERE / f"maru-{J['id']}.json"
        if f.exists():
            for x in json.loads(f.read_text(encoding="utf-8")):
                o = dict(id=x["id"], j=J["id"], q=x["q"], a=bool(x["a"]), w=x["why"], dv=x["dv"], rs=x["rs"])
                if x.get("law"): o["lw"] = x["law"]
                if x.get("term") in tids: o["t"] = x["term"]
                maru.append(o)
    js["maru"] = maru
    js["num"] = []  # 🔢 数字クイズは 旅ごとの num-<旅>.json(id は 旅の 中で n001〜。ゲームでは「<旅>-n001」)
    for J in m["journeys"]:
        f = HERE / f"num-{J['id']}.json"
        if f.exists():
            js["num"] += [dict(id=J["id"] + "-" + x["id"], j=J["id"], rs=x["rs"], q=x["q"], a=x["a"], o=x["opts"], w=x["why"], lw=x.get("law", "")) for x in json.loads(f.read_text(encoding="utf-8"))]
    js["shimon"] = []  # 📝 本番形式の 4択(shimon-<旅>.json。決まりは SHIMON.md。確かめは shimon_check.py)
    for J in m["journeys"]:
        f = HERE / f"shimon-{J['id']}.json"
        if f.exists():
            for x in json.loads(f.read_text(encoding="utf-8")):
                o = dict(id=x["id"], j=J["id"], rs=x["rs"], q=x["q"], a=x["a"], o=x["opts"], w=x["why"], lw=x.get("law", ""), dv=x["dv"])
                if x.get("term") in tids: o["t"] = x["term"]
                if x.get("k"): o["k"] = x["k"]
                if x.get("code"): o["cd"] = x["code"]
                js["shimon"].append(o)
    (ROOT / "itpass").mkdir(exist_ok=True)
    (ROOT / "itpass/terms.js").write_text("/* tools/itpass/terms-*.json から tools/itpass/terms_js.py が 作る。手で 直さない */\nconst ITPASS_TERMS = " +
                                         json.dumps(js, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("itpass/terms.js", len(out), "語", len(js["maru"]), "問", len(js["num"]), "数字", len(js["shimon"]), "本番形式", (ROOT / "itpass/terms.js").stat().st_size // 1024, "KB")

if __name__ == "__main__":
    main()
