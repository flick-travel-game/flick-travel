# 確かめる 係への おねがい(フリックポルトガル語)

あなたは **書いた 係とは 別の 人**。ネイティブの ブラジル人の 先生の 目で、指示された 旅の **1問ずつ** 見て 直す。
決まりは `tools/porutogaru/PROMPT.md`。ファイルは `tools/porutogaru/src/<旅>.json`。

## 見る こと(1問ずつ)
1. **ポルトガル語として 正しいか・自然か**(ブラジルで いま ふつうに 言うか。直訳っぽく ないか)。アクセント記号と ç が 正しいか(1990年の 取り決めの あと: ideia・voo・ü なし)
2. **性と 数の 一致・活用・冠詞と 前置詞の くっつき**(text と example と reply)
3. **意味(meaning)と 訳(exampleJa / replyJa)が 合っているか**。日本語が やさしく 正しいか(語の あいだに 半角スペースを 入れない)
4. **style と who**: 年上・先生・お年よりへの ていねいな 文は o senhor / a senhora。obrigado / obrigada が 言う人と 合うか
5. **region**: ブラジルだけ / ポルトガルだけの 言いかたに BR / PT。どちらが 正しい とは 書いていないか。note の 事実が 正しいか
6. ⭐ **読みの ひらがな**: `python3 -c "import sys,json;sys.path.insert(0,'tools/porutogaru');from kana_pt import kana;[print(t['id'],t['text'],'→',kana(t.get('pron') or t['text'])) for t in json.load(open('tools/porutogaru/src/<旅>.json'))]"`
   ブラジルの 発音と 大きく ずれる 語は pron(読みどおりの ポルトガル語の つづり)を 足す / 直す。
   ⚠️ x(くす・ず・す)・外来語・qu / gu の u を 読む 語(cinquenta → "cincuenta"、frequente → "frecuente"、tranquilo → "tranculo" の ように)・
   弱い 語頭の des / de(desculpa → "disculpa")。表で ほぼ よい 語に pron を 足さない
7. **子どもに よいか**: お酒・恋愛・こわい・悪口・政治・貧しさ・実在の 人や 店や 商品・**国に よって 下品に なる 語**が 無いか(迷ったら 別の 語に)

## 直しかた
- その ファイルを 直接 直す(id と journey と text の 順番は 変えない。text を 直すときは ほかの 旅と かぶらないこと)
- 直したら `python3 tools/porutogaru/porutogaru_js.py --check` で ❌ が 0
- ⚠️ git の commit / push は しない
- 報告は 200語以内: 直した 数・大きな 直しの 例 5つまで・迷った ところ
