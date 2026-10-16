#!/usr/bin/env python3
"""スペイン語の つづり → 読みの ひらがな。**ここ 1か所の 表だけで 作る**(読みを 手で 書かない)
けいくん決定 2026-10-16「ひらがなで問題を出してひらがなで打つようにする」(フリック韓国語と 同じ 考えかた)

スペイン語は つづりどおりに 読む ことばなので、表で ほぼ 決まる。決まり:
  ・母音 a e i o u → あ え い お う(アクセント記号は 読みに 関係しない。のばす 音も ない)
  ・h は 読まない(hola → おら)。j と ge / gi は は行(jugo → ふご、gente → へんて)
  ・ce ci と z は さ行(cena → せな、zapato → さぱと。中南米の 読みかた。スペインでは 舌を はさむ 音)
  ・que qui → け き / gue gui → げ ぎ / güe güi → ぐえ ぐい
  ・ll と y(母音の 前)は や行(llamo → やも、yo → よ。ye → いぇ)。ことばの おわりの y と「y(そして)」は い
  ・ñ は にゃ行(niño → ににょ)。ch は ちゃ行。rr は ら行(巻き舌は 🔊 で 聞く)
  ・f → ふぁ行、v → ば行(b と 同じ 音)、ti → てぃ・tu → とぅ・di → でぃ・du → どぅ
  ・母音の つかない 子音: b ぶ / c く / d ど / f ふ / g ぐ / j ふ / l る / m ん / n ん / p ぷ / r る / s す / t と / x くす / z す
  ・x は 母音の 前で くさ行(taxi → たくし)。México・mexicano・Oaxaca の x は は行(下の SPECIAL)
  ・読みが つづりと ちがう ことば(外来語 など)は src の pron に「読みどおりの スペイン語の つづり」を 書く(例: pizza → pitsa)
    python3 tools/supein/kana_es.py "¿Cómo estás?" niño gracias   # ためす"""
import re, sys, unicodedata

SPECIAL = {"méxico": "méjico", "mexicano": "mejicano", "mexicana": "mejicana", "mexicanos": "mejicanos", "mexicanas": "mejicanas", "oaxaca": "oajaca", "texas": "tejas"}
VOW = "aeiou"
I = {v: k for k, v in enumerate(VOW)}
# 行(a e i o u の 順)
ROW = {
    "": "あえいおう", "k": "かけきこく", "s": "させしそす", "t": ["た", "て", "てぃ", "と", "とぅ"], "d": ["だ", "で", "でぃ", "ど", "どぅ"],
    "n": "なねにのぬ", "h": "はへひほふ", "m": "まめみもむ", "y": ["や", "いぇ", "い", "よ", "ゆ"], "r": "られりろる", "w": ["わ", "うぇ", "うぃ", "うぉ", "う"],
    "g": "がげぎごぐ", "b": "ばべびぼぶ", "p": "ぱぺぴぽぷ", "f": ["ふぁ", "ふぇ", "ふぃ", "ふぉ", "ふ"], "ch": ["ちゃ", "ちぇ", "ち", "ちょ", "ちゅ"], "ny": ["にゃ", "にぇ", "に", "にょ", "にゅ"],
}
ROW = {k: dict(zip(VOW, list(v) if isinstance(v, str) else v)) for k, v in ROW.items()}
CODA = {"b": "ぶ", "c": "く", "d": "ど", "f": "ふ", "g": "ぐ", "j": "ふ", "k": "く", "l": "る", "m": "ん", "n": "ん", "p": "ぷ", "r": "る", "s": "す",
        "t": "と", "v": "ぶ", "x": "くす", "z": "す", "h": "", "y": "い", "w": "う", "q": "く", "ñ": "に"}


def strip_acc(s):
    """á é í ó ú ü → a e i o u(ñ は のこす)"""
    out = []
    for ch in s:
        if ch in "ñÑ": out.append(ch); continue
        d = unicodedata.normalize("NFD", ch)
        out.append("".join(c for c in d if unicodedata.category(c) != "Mn"))
    return "".join(out)


def word(w):
    w = w.lower()
    w = SPECIAL.get(w, w)
    raw = w
    s = strip_acc(w)
    uml = {i for i, ch in enumerate(raw) if ch == "ü"}
    out = []; i = 0; n = len(s)
    if s == "y": return "い"
    while i < n:
        c = s[i]; nx = s[i + 1] if i + 1 < n else ""; nx2 = s[i + 2] if i + 2 < n else ""
        if c in VOW: out.append(ROW[""][c]); i += 1; continue
        if c == "h": i += 1; continue
        # 2字の 子音
        if c == "c" and nx == "h":
            if nx2 in VOW: out.append(ROW["ch"][nx2]); i += 3
            else: out.append("ち"); i += 2
            continue
        if c == "l" and nx == "l":
            if nx2 in VOW: out.append(ROW["y"][nx2]); i += 3
            else: out.append("る"); i += 2
            continue
        if c == "r" and nx == "r": i += 1; continue  # rr は r 1つと 同じ 字
        if c == "q" and nx == "u" and nx2 in "ei": out.append(ROW["k"][nx2]); i += 3; continue
        if c == "g" and nx == "u" and nx2 in "ei" and (i + 1) not in uml: out.append(ROW["g"][nx2]); i += 3; continue
        # 1字の 子音 + 母音
        row = {"b": "b", "v": "b", "d": "d", "f": "f", "k": "k", "l": "r", "r": "r", "m": "m", "n": "n", "ñ": "ny", "p": "p", "s": "s", "z": "s", "t": "t", "j": "h", "w": "w"}.get(c)
        if c == "c": row = "s" if nx in "ei" and nx else "k"
        if c == "g": row = "h" if nx in "ei" and nx else "g"
        if c == "y": row = "y"
        if c == "x" and nx in VOW and nx:
            out.append("く"); out.append(ROW["s"][nx]); i += 2; continue
        if row is not None and nx and nx in VOW:
            out.append(ROW[row][nx]); i += 2; continue
        out.append(CODA.get(c, "")); i += 1
    return "".join(out)


def kana(text):
    """文 → ひらがな(ことばの あいだは 空白。記号は 消す)"""
    words = re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", text)
    return " ".join(word(w) for w in words)


if __name__ == "__main__":
    for a in sys.argv[1:]: print(a, "→", kana(a))
