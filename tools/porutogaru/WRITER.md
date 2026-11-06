# 書く 係への おねがい(フリックポルトガル語)

1. まず `tools/porutogaru/PROMPT.md`(決まり)と `tools/porutogaru/meta.json`(分類・場面)を 読む
2. 手本: `tools/supein/src/<同じ 旅の スペイン語の id>.json`(項目の 形・説明の 長さ・note の 書きかた)
3. `tools/porutogaru/plan.json` の 自分の 旅(キー)の 一覧を **1つも 足さず・減らさず・順番を 変えず** 全部の 項目に ふくらませる。
   text は plan の まま(まちがいに 気づいたら 直してよいが、ほかの 旅と かぶらないこと)。group は category(単語・発音・文法・ネイティブ)または scene(日常会話)に 入れる。difficulty も plan の まま
4. 書いたら `tools/porutogaru/src/<旅>.json` に JSON 配列で 保存(id と journey は 書かない。ゲームが つける)
5. **読みを かならず 見る**: `python3 -c "import sys;sys.path.insert(0,'tools/porutogaru');import json;from kana_pt import kana;[print(t['text'],'→',kana(t.get('pron') or t['text'])) for t in json.load(open('tools/porutogaru/src/<旅>.json'))]"`
   ブラジルの 読みと ずれる 語(x を くす・ず・す と 読む / 外来語 / 弱い e が い に なる desculpa など)は pron(読みどおりの ポルトガル語の つづり)を 足す
6. 形を 確かめる: `python3 tools/porutogaru/porutogaru_js.py --check`(ほかの 旅の まちがいは 気にしない。自分の 旅の ❌ を 0 に する)
7. ⚠️ git の commit / push は しない
