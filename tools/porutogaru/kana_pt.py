#!/usr/bin/env python3
"""ポルトガル語の つづり → 読みの ひらがな(ブラジルの 読み)。**ここ 1か所の 表だけで 作る**(読みを 手で 書かない)
フリックスペイン語の kana_es.py を 写して ブラジルの 読みかたに した(けいくん 2026-11-06「進めて」= まとめ docs/フリックポルトガル語-はじめかた.md の とおり)

決まり(ブラジルの 読み):
  ・母音 a e i o u → あ え い お う。アクセント記号(á â à é ê í ó ô ú)は 読みに 関係しない。のばす 音(ー)は 書かない
  ・⭐ 語の おわりの、記号の ない e / es → い / いす、o / os → う / うす(obrigado → おぶりがどぅ・leite → れいち)
    記号が ある(você・avô・café)なら そのまま え / お
  ・⭐ ti / di → ち / ぢ。語の おわりの te / de も ち / ぢ(noite → のいち・cidade → しだぢ・de → ぢ)
  ・⭐ 語の おわりの l と 子音の 前の l → う(Brasil → ぶらじう・alto → あうとぅ)
  ・⭐ 語の はじめの r と rr → は行(Rio → ひう・carro → かふ)。母音の あいだの r → ら行。子音の 前・語の おわりの r → る
  ・lh → りゃ行・nh → にゃ行・ch → しゃ行・j と ge gi → じゃ行・ç と ce ci → さ行・x → しゃ行(ちがう 語は pron で)
  ・s: 語の はじめ・ss・子音の あと → さ行、母音の あいだ → ざ行、おわり → す。z → ざ行(おわりは す)
  ・que qui → け き / gue gui → げ ぎ / qua → くあ / gua → ぐあ
  ・鼻に ぬける 音: ão → あうん・ãe → あいん・õe → おいん・ã → あん・母音 + m / n(子音の 前・おわり)→ ん
    語の おわりの em → えいん(bem → べいん)・am → あうん(falam → ふぁらうん)
  ・語の はじめの es / ex + 子音 → いす(estou → いすとう・escola → いすこら)
  ・母音の つかない 子音: b ぶ / c く / d ぢ / f ふ / g ぐ / k く / p ぴ / t ち / v ぶ(ブラジルでは 子音の あとに 小さな「い」が 入る)。
    ただし r と l が つづく(br pr tr cl …)ときは ぶ ぷ と く …
  ・読みが つづりと ちがう 語(x が くす・ず・す / 外来語 / desculpa の ような 弱い e)は src の pron に「読みどおりの ポルトガル語の つづり」を 書く
    (例: táxi → "táksi"、exemplo → "ezemplo"、desculpa → "disculpa")
    python3 tools/porutogaru/kana_pt.py "Bom dia!" obrigado "Tudo bem?"   # ためす"""
import re, sys, unicodedata

VOW = "aeiou"
ROW = {
    "": "あえいおう", "k": "かけきこく", "s": "させしそす", "z": "ざぜじぞず",
    "t": ["た", "て", "ち", "と", "とぅ"], "d": ["だ", "で", "ぢ", "ど", "どぅ"],
    "n": "なねにのぬ", "h": "はへひほふ", "m": "まめみもむ", "r": "られりろる", "y": ["や", "いぇ", "い", "よ", "ゆ"], "w": ["わ", "うぇ", "うぃ", "うぉ", "う"],
    "g": "がげぎごぐ", "b": "ばべびぼぶ", "p": "ぱぺぴぽぷ", "f": ["ふぁ", "ふぇ", "ふぃ", "ふぉ", "ふ"], "v": ["ば", "べ", "び", "ぼ", "ぶ"],
    "sh": ["しゃ", "しぇ", "し", "しょ", "しゅ"], "j": ["じゃ", "じぇ", "じ", "じょ", "じゅ"], "ly": ["りゃ", "りぇ", "り", "りょ", "りゅ"], "ny": ["にゃ", "にぇ", "に", "にょ", "にゅ"],
}
ROW = {k: dict(zip(VOW, list(v) if isinstance(v, str) else v)) for k, v in ROW.items()}
# 母音の つかない 子音(つぎに r・l が つづく とき)
CODA_CL = {"b": "ぶ", "c": "く", "d": "ど", "f": "ふ", "g": "ぐ", "k": "く", "p": "ぷ", "t": "と", "v": "ぶ"}
# 母音の つかない 子音(ほかの とき)
CODA = {"b": "ぶ", "c": "く", "d": "ぢ", "f": "ふ", "g": "ぐ", "k": "く", "p": "ぴ", "t": "ち", "v": "ぶ", "j": "じ", "q": "く",
        "x": "す", "z": "す", "s": "す", "r": "る", "l": "う", "m": "ん", "n": "ん", "h": "", "w": "う", "y": "い"}
ACC = set("áàâãéêíóôõúü")


def strip_acc(s):
    """á ã ç … → a a c …(ゲームの ABC で くらべる 形)"""
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def word(w):
    w = unicodedata.normalize("NFC", w.lower())
    raw = w
    if not w: return ""
    # 語の おわりの 弱い e / o(記号なし)→ i / u
    m = re.search(r"([eo])(s?)$", raw)
    s = list(strip_acc(raw.replace("ç", "\0")).replace("\0", "ç"))
    if m and not any(c in ACC for c in raw[m.start():]):
        prev = raw[m.start() - 1] if m.start() > 0 else ""
        q_u = raw[max(0, m.start() - 2):m.start()] in ("qu", "gu")
        # 直前が a e o(-ao -eo …)の ときは 弱く しない。i u の あと(rio → ひう・sério)と qu / gu は 弱く する
        if prev not in "aeoáéóâêôãõ" or q_u or prev == "":
            s[m.start()] = "i" if m.group(1) == "e" else "u"
    s = "".join(s)
    nas = [False] * len(s)  # ã õ の 位置
    for i, ch in enumerate(raw):
        if i < len(nas) and ch in "ãõ": nas[i] = True
    out = []; i = 0; n = len(s)
    def V(k): return s[k] if 0 <= k < n and s[k] in VOW else ""
    while i < n:
        c = s[i]; nx = s[i + 1] if i + 1 < n else ""; nx2 = s[i + 2] if i + 2 < n else ""
        if c in VOW:
            # 語の はじめの es / ex + 子音 → いす
            if i == 0 and c == "e" and nx in "sx" and nx2 and nx2 not in VOW and not (nx == "s" and nx2 == "s"):
                out.append("いす"); i += 2; continue
            # 鼻に ぬける 音
            if nas[i]:
                if c == "a" and nx == "o": out.append("あうん"); i += 2; continue
                if c == "a" and nx == "e": out.append("あいん"); i += 2; continue
                if c == "o" and nx == "e": out.append("おいん"); i += 2; continue
                out.append(ROW[""][c] + "ん"); i += 1; continue
            if nx and nx in "mn" and (not nx2 or nx2 not in VOW + "h"):
                if nx == "m" and not nx2 and c == "e": out.append("えいん"); i += 2; continue
                if nx == "m" and not nx2 and c == "a": out.append("あうん"); i += 2; continue
                if nx in "mn" and nx2 == "s" and i + 3 == n and c == "e": out.append("えいんす"); i += 3; continue
                out.append(ROW[""][c] + "ん"); i += 2; continue
            out.append(ROW[""][c]); i += 1; continue
        # 2字の 子音
        if c == "c" and nx == "h":
            if V(i + 2): out.append(ROW["sh"][nx2]); i += 3
            else: out.append("し"); i += 2
            continue
        if c == "l" and nx == "h":
            if V(i + 2): out.append(ROW["ly"][nx2]); i += 3
            else: out.append("り"); i += 2
            continue
        if c == "n" and nx == "h":
            if V(i + 2): out.append(ROW["ny"][nx2]); i += 3
            else: out.append("に"); i += 2
            continue
        if c == "r" and nx == "r":
            if V(i + 2): out.append(ROW["h"][nx2]); i += 3
            else: out.append("る"); i += 2
            continue
        if c == "s" and nx == "s":
            if V(i + 2): out.append(ROW["s"][nx2]); i += 3
            else: out.append("す"); i += 2
            continue
        if c == "q" and nx == "u":
            if nx2 in "ei" and nx2: out.append(ROW["k"][nx2]); i += 3; continue
            if V(i + 2): out.append("く" + ROW[""][nx2]); i += 3; continue
        if c == "g" and nx == "u" and nx2 and nx2 in "ei" and raw[i + 1] != "ü": out.append(ROW["g"][nx2]); i += 3; continue
        # 1字の 子音 + 母音
        if V(i + 1):
            v = nx
            if c == "c": row = "s" if v in "ei" else "k"
            elif c == "ç": row = "s"
            elif c == "g": row = "j" if v in "ei" else "g"
            elif c == "j": row = "j"
            elif c == "x": row = "sh"
            elif c == "z": row = "z"
            elif c == "s":
                pv = s[i - 1] if i > 0 else ""
                row = "z" if pv and pv in VOW else "s"
            elif c == "r":
                pv = s[i - 1] if i > 0 else ""
                row = "h" if (i == 0 or pv in "nls") else "r"
            elif c == "l": row = "r"
            elif c == "h": row = ""
            else: row = {"b": "b", "d": "d", "f": "f", "k": "k", "m": "m", "n": "n", "p": "p", "t": "t", "v": "v", "w": "w", "y": "y"}.get(c)
            if row is not None:
                # 鼻に ぬける 母音(ã õ)が つづく とき
                if nas[i + 1]:
                    if v == "a" and i + 2 < n and s[i + 2] == "o": out.append(ROW[row][v] + "うん"); i += 3; continue
                    if v == "a" and i + 2 < n and s[i + 2] == "e": out.append(ROW[row][v] + "いん"); i += 3; continue
                    if v == "o" and i + 2 < n and s[i + 2] == "e": out.append(ROW[row][v] + "いん"); i += 3; continue
                    out.append(ROW[row][v] + "ん"); i += 2; continue
                out.append(ROW[row][v]); i += 1
                # つぎの 母音の 処理は 上の 母音の 道に まかせたいので、ここで 母音を 1字 すすめて 鼻音だけ 見る
                c2 = s[i]; n1 = s[i + 1] if i + 1 < n else ""; n2 = s[i + 2] if i + 2 < n else ""
                if n1 and n1 in "mn" and (not n2 or n2 not in VOW + "h"):
                    if n1 == "m" and not n2 and c2 == "e": out[-1] += "いん"; i += 2; continue
                    if n1 == "m" and not n2 and c2 == "a": out[-1] += "うん"; i += 2; continue
                    if n2 == "s" and i + 3 == n and c2 == "e": out[-1] += "いんす"; i += 3; continue
                    out[-1] += "ん"; i += 2; continue
                i += 1; continue
        # 母音の つかない 子音
        if c == "ç": out.append("す"); i += 1; continue
        if nx and nx in "rl" and c in CODA_CL: out.append(CODA_CL[c]); i += 1; continue
        out.append(CODA.get(c, "")); i += 1
    return "".join(out)


def kana(text):
    """文 → ひらがな(ことばの あいだは 空白。記号は 消す。ハイフンで つながる 語は 1つに)"""
    words = re.findall(r"[A-Za-zÀ-ÿ]+", text.replace("-", ""))
    return " ".join(word(w) for w in words)


if __name__ == "__main__":
    for a in sys.argv[1:]: print(a, "→", kana(a))
