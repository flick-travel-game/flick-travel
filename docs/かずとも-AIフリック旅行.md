# かずとも(speed-king)側に 要る 変更 — AIフリック旅行(けいくんの 確認待ち)

⚠️ **まだ 何も 変えていない**。お金・規約・受けつける 旅の 一覧に かかわるので、けいくんの OK を もらってから 取りこむ。
それまで AIフリック旅行は ランキングに 送らず、画面にも 出さない(`ai/ai.js` の `RANK_READY = false`)。あそびには 何も ひびかない。

## 1. `src/lib/flick.ts` の `FLICK_MODES` に 4つ 足す(SQL は 要らない)
| 旅ID | 名前 | レベル数 |
|---|---|---|
| `aiw` | AIのことば | 16 |
| `aweb` | Webサービスのしくみ | 16 |
| `aops` | サービス運営 | 13 |
| `amas` | マスター(ぜんぶ) | 32 |

- `afuku`(ふくしゅう)・`aweak`(苦手克服)は **毎回 ちがう 10問**なので 送らない(株式の kfuku と 同じ)
- レベルは どれも 60 より 下(表の check `1〜60` の 中)

## 2. `FLICK_LINK_TARGETS`(`/flick-link?to=`)に `ai` を 足す
- 足したら こちらの `index.html` の `LINK_URL` の 一覧(`["rekishi","uchu","karada"]`)にも `ai` を 足す

## 3. 規約・特商法・プライバシー・/about の「フリック旅行シリーズ(…)」
- `src/lib/flick-url.ts` の `FLICK_SERIES_GAMES` に「AIフリック旅行」を 足す(料金は かずともと 同じ 480円/月 で ぜんぶ、の 決まりのまま)

## 4. ぜんぶ 入ったら
- `ai/ai.js` の `RANK_READY` を `true` → `python3 tools/build_games.py` は 要らない(ai.js は そのまま 使われる)
