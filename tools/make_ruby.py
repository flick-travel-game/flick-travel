#!/usr/bin/env python3
"""名所の解説(SPOTS の d)に ふりがな(ruby)を付けて、index.html の RUBY に書きこむ。

- 読みは Sudachi(形態素解析)で出す。まちがえやすい語は FIX で直す
- 漢字をふくむ語にだけ ふりがなを付ける。送りがな(建てる の「てる」)には付けない

使いかた(flick-travel/ で):
    pip install sudachipy sudachidict_core
    python3 tools/make_ruby.py            # index.html を書きかえる
    python3 tools/make_ruby.py --check    # 読みの一覧を出すだけ(目で確かめる用)
"""
import html
import json
import re
import sys
from pathlib import Path

from sudachipy import dictionary, tokenizer

ROOT = Path(__file__).resolve().parent.parent
KANJI = re.compile(r"[一-鿿々〆ヶ]")

# Sudachi が まちがえる / 文の中の意味とちがう読み(見出し語 → よみ)
FIX = {
    "日本": "にほん",
    "日本一": "にほんいち",
    "妃": "きさき",
    "鐘楼": "しょうろう",
    "埋もれ": "うもれ",
    "風車": "ふうしゃ",
    "清": "しん",
    "閑": "しずか",
    "富士山": "ふじさん",
    "数百": "すうひゃく",
    "都": "みやこ",
    "金": "きん",
    "高山": "たかやま",
    "高野山": "こうやさん",
    "台北": "たいぺい",
    "夜市": "よいち",
    "金山": "きんざん",
    "阿蘇山": "あそさん",
    "餃子": "ぎょうざ",
    "郷": "ごう",
    "言う": "いう",
    "西日本": "にしにほん",
    "辛い": "からい",
    "千夜": "せんや",
    "造山": "ぞうざん",
    "高原": "こうげん",
    "大平原": "だいへいげん",
    "仙岳": "ぜんだけ",  # 雲仙岳 が 雲+仙岳 に分かれる
    "神渡り": "みわたり",
    "石鎚山": "いしづちさん",
    "仏国": "ぶっこく",
    "拙": "せっ",
    "憂い": "うれい",
    "大極": "だいごく",
    "何": "なに",  # 何も/何を(「何人」「何時」は 1語なので ひびかない)
    "忘る": "わする",
    "灯火": "ともしび",
    "木鶏": "もっけい",
    "四十九": "しじゅうく",
    "七生": "しちしょう",
}
# その名所の文の中でだけ 読みを変えるもの((名所のキー, 見出し語) → よみ)
SPOT_FIX = {
    ("versailles", "鏡"): "かがみ",
    ("versailles", "間"): "ま",
    ("venice", "都"): "みやこ",
    ("kiyomizu", "清水"): "きよみず",
    ("cologne", "本"): "ほん",
    ("milan", "本"): "ほん",
    ("teotihuacan", "月"): "つき",
    ("takayama", "高山"): "たかやま",
    ("takayama", "祭"): "まつり",
    ("amanohashidate", "股"): "また",
    ("yoshino", "下"): "しも",
    ("yoshino", "中"): "なか",
    ("yoshino", "上"): "かみ",
    ("akashi", "島"): "しま",
    ("nachi", "三重"): "さんじゅう",
    ("chusonji", "金色"): "こんじき",
    ("tegalalang", "方"): "かた",
    ("santiago", "中"): "じゅう",
    ("giantscauseway", "六"): "ろっ",
    ("twelveapostles", "数"): "かず",
    ("pamukkale", "綿"): "わた",
    ("akiyoshidai", "秋芳"): "あきよし",
    ("kurashiki", "米"): "こめ",
    ("yufuin", "由布"): "ゆふ",
    ("hyogo", "島"): "しま",
    ("awaji", "島"): "しま",
    ("setonaikai", "島"): "しま",
    ("yemen", "港"): "みなと",
    ("tsukushiplain", "米"): "こめ",
    ("naganobasin", "平"): "だいら",
    ("iwatesan", "片"): "かた",
    ("qufu", "孔"): "こう",
    ("enryakuji", "母"): "ぼ",
    # 偉人の 名言(2026-09-25)
    ("masako", "深い"): "ふかい",
    ("rikyu", "離"): "はな",
    ("rikyu", "本"): "もと",
    ("hideyoshi", "露"): "つゆ",
    ("masamune", "仁"): "じん",
    ("ryoma", "申"): "もうし",
    ("ryoma", "候"): "そうろう",
    ("yukawa", "一日"): "いちにち",
    ("komachi", "身世"): "みよ",
    ("michizane", "東風"): "こち",
    ("kuranosuke", "捨"): "す",
    ("mitsukuni", "種"): "たね",
    ("issai", "少"): "しょう",
    ("nakamura", "一"): "いっ",
    ("togo", "一"): "いっ",
    ("akutagawa", "一"): "ひと",
    ("akutagawa", "箱"): "はこ",
    ("ogai", "小"): "ちい",
    ("nakamaro", "天"): "あま",
    ("laozi", "一"): "いっ",
    ("laozi", "歩"): "ぽ",
    ("armstrong", "一"): "いっ",
    ("armstrong", "歩"): "ぽ",
    ("descartes", "我"): "われ",
    ("zhugeliang", "後"): "のち",
    ("carroll", "行っ"): "いっ",
}
# Sudachi は「階段(ガート)」を 1語にしてしまうので、かっこで 切ってから 読む
SPLIT = re.compile(r"([()（）「」])")
DIGITS = re.compile(r"^[0-9０-９.,]+")


def hira(s):
    return "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in s)


def ruby_word(surface, reading):
    """送りがなを外して <ruby>漢字<rt>よみ</rt></ruby> にする"""
    if not KANJI.search(surface) or not reading or surface == reading:
        return html.escape(surface)
    # 前と後ろの ひらがなを そろえて外す(建てられ/たてられ → 建 + てられ)
    head = tail = ""
    s, r = surface, reading
    while s and r and not KANJI.match(s[-1]) and s[-1] == r[-1]:
        tail = s[-1] + tail
        s, r = s[:-1], r[:-1]
    while s and r and not KANJI.match(s[0]) and s[0] == r[0]:
        head += s[0]
        s, r = s[1:], r[1:]
    if not s or not r:
        return html.escape(surface)
    return f"{html.escape(head)}<ruby>{html.escape(s)}<rt>{html.escape(r)}</rt></ruby>{html.escape(tail)}"


def main():
    check = "--check" in sys.argv
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    tok = dictionary.Dictionary().create()
    mode = tokenizer.Tokenizer.SplitMode.C
    out = {}
    def rubify(key, desc, plain):
        parts = []
        prev = ""
        for w in (w for seg in SPLIT.split(desc) for w in (tok.tokenize(seg, mode) if not SPLIT.fullmatch(seg) else [seg])):
            if isinstance(w, str):
                parts.append(html.escape(w)); prev = w
                continue
            s = w.surface()
            r = SPOT_FIX.get((key, s)) or FIX.get(s) or hira(w.reading_form())
            if s == "本" and prev.endswith("万"):
                r = "ぼん"  # 700万本(ななひゃくまんぼん)
            if s == "色" and DIGITS.search(prev[-1:]):
                r = "いろ"  # 7色(なないろ)
            num = DIGITS.match(s)
            if num:
                # 「230万」の数字には ふりがなを付けない(万 だけに付ける)
                rest = s[num.end():]
                rr = "".join(hira(x.reading_form()) for x in tok.tokenize(rest, mode)) if rest else ""
                parts.append(html.escape(num.group()) + ruby_word(rest, rr))
                if KANJI.search(rest):
                    plain.append(f"{rest}({rr})")
            elif s == "日" and DIGITS.search(prev[-1:]):
                parts.append(s)  # 「6日」の 日 は 読みが かわる(むいか)ので 付けない
            else:
                parts.append(ruby_word(s, r))
                if KANJI.search(s):
                    plain.append(f"{s}({r})")
            prev = s
        return "".join(parts)

    PAT = r'\{n:"([^"]*)", c:"[^"]*", r:"[^"]*", art:"(\w+)", (?:k:"name", e:"[^"]*", )?(?:k:"person", s:"([^"]*)", sd:"([^"]*)", b:"[^"]*", )?(?:f:1, )?d:"([^"]*)"\}'
    for m in re.finditer(PAT, page):
        name, key, quote, qdesc, desc = m.groups()
        plain = []
        out[key] = rubify(key, desc, plain)
        if quote is not None:
            out[key + "|s"] = rubify(key, quote, plain)
            out[key + "|sd"] = rubify(key, qdesc, plain)
        if check:
            print(f"{name}: {' '.join(plain)}")
    if check:
        return
    body = json.dumps(out, ensure_ascii=False, indent=1)
    new = f"/* 解説のふりがな(tools/make_ruby.py が作る) RUBY-START */\nconst RUBY = {body};\n/* RUBY-END */"
    page, n = re.subn(r"/\* 解説のふりがな.*?RUBY-START \*/.*?/\* RUBY-END \*/", lambda _: new, page, flags=re.S)
    assert n == 1
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print(f"{len(out)}か所に ふりがなを付けた")


if __name__ == "__main__":
    main()
