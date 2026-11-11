# フリック社労士: 書く 係への 共通の おねがい(2026-11-11)

- 作業場所 /home/user/flick-travel。**コミット・push は しない**。自分の 旅の ファイルだけ 書く(ほかの 旅の ファイルは さわらない。ほかの 係が 同時に 書いて いる)
- さきに 読む: `PROMPT.md`(ことばの 決まり)・`MARU.md`・`NUM.md`・`SENTAKU.md`・自分の 旅の facts(下の 表)。見本: 労働基準法 `terms-roki.json` / `maru-roki.json` / `num-roki.json` / `sentaku-roki.json`(形を まねる。文は 写さない)
- facts: roki・anei = `facts-A.md`(anei は A-2)/ rosai・koyo・choshu = `facts-B.md` / kenpo・kosei・kokunen = `facts-C.md` + `nendo.json`(年度の 数字)/ roichi・shaichi = `facts-D.md`
- facts に 無い 事実は e-Gov 法令API v2(`https://laws.e-gov.go.jp/api/2/law_data/<法令ID>?law_full_text_format=json`。curl で 取れる)で 条文を 読んで 確かめてから。**記憶で 書かない**。判例・通達で 答えが 分かれる ものは 作らない
- 年度で 変わる 数字(年金額・保険料・保険料率・最低賃金・法定雇用率 など)は「令和8年度」を 文に 書く
- ⚠️ **読みは 10の 旅で かぶらない**。法律ごとに ある 語(被保険者・時効・保険料・不服申立て・審査請求・適用事業所・任意加入・標準報酬 など)は **name に 法律名を つける**(「健保の時効」「厚年の被保険者」「国年の任意加入被保険者」)。迷ったら つける
- 「死」の 字は 使わない(説明・問題は「亡くなった とき」)。法令の 語の「死亡一時金」「死亡した日」は よい(`terms_js.py` の `BAN_WORD_OK`)。こわく しない・だれかを わるく 言わない・実在の 会社・人・事件を 書かない・過去問の 文を 写さない
- 自分の 旅の ぶんだけ 確かめる: `python3 tools/sharoshi/mkmeta.py && python3 tools/sharoshi/terms_js.py --check`(ことば。⚠️ ほかの 旅と 読みが かぶる ❌ が 出たら、自分の 語の name / reading を 法律名つきに 変えて よけて)/ `python3 tools/sharoshi/maru_check.py <旅>`(問題)
- 終わったら 短く 報告: 数・段 / dv の 数・e-Gov で 新しく 確かめた 事実
