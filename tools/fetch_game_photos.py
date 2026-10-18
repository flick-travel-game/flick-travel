#!/usr/bin/env python3
"""物が 写る ことばの ゲームに 写真を 付ける(けいくん 2026-10-18「写真使えるやつは すべて写真と Wikipedia の説明リンクつきに」→「物が写るゲームだけ」)。

やりかたは tools/fetch_series_photos.py(宇宙・からだ・理科)と まったく 同じ。ちがうのは ことばの 出どころだけ:
  data/<ゲーム>.json の ことば × tools/wiki-titles.json(tools/wiki_links.py が 作った Wikipedia の 題名)
写真の key は「<ゲーム>.<ことばid>」(ゲームが ちがうと 同じ id の ことばが あるため)。
  ファイルは photo-<ゲーム>.<ことばid>.jpg、情報は photos.js。画面は index.html の pic() が GAME.id + "." + q.art で 引く
⚠️ 写真を 取ったら かならず ならべて 目で 見る。合わない ものは NO_GAME_PHOTO に 書いて 外す(もう一度 走らせても 取りなおさない)
⚠️ ことばだけの ゲーム(心理学・弁護士・漢字・英会話 など)は しない(けいくん 2026-10-18「物が写るゲームだけ」)

使いかた(flick-travel/ で):  python3 tools/fetch_game_photos.py [ゲーム ...]
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import fetch_series_photos as S  # noqa: E402

ROOT = S.ROOT
GAMES = ["hanaya", "noka", "jui", "chef", "patissier", "daiku", "soccer", "basket", "baseball", "boxing", "eiga"]
NO_GAME_PHOTO = set()  # "<ゲーム>.<ことばid>"(写真が ことばと 合わない もの。目で 見て 足す)


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    games = [g for g in GAMES if not only or g in only]
    cache = json.loads((ROOT / "tools" / "wiki-titles.json").read_text(encoding="utf-8"))
    S.SERIES.clear()
    for g in games:
        for t in json.loads((ROOT / "data" / f"{g}.json").read_text(encoding="utf-8"))["terms"]:
            title = cache.get(t["name"])
            if title:
                S.SERIES[f"{g}.{t['id']}"] = (title, t["name"], g)
    S.NO_PHOTO |= NO_GAME_PHOTO
    print(len(S.SERIES), "語に Wikipedia の 記事", flush=True)
    sys.argv = sys.argv[:1] + [a for a in sys.argv[1:] if a.startswith("--")]
    S.main()


if __name__ == "__main__":
    main()
