#!/usr/bin/env python3
"""フリック韓国語の 🔊 を 人に 近い 声の 音声ファイルに する(Google Cloud Text-to-Speech)。

  GOOGLE_TTS_KEY=... python3 tools/kankoku/tts_audio.py [--limit N] [--only krhan]

- 読むのは data/korean.json の text(ハングル)と「안녕하세요」(🔊 の 切りかえで 鳴らす)
- できた 音は kankoku/audio/<字の しるし>.mp3、一覧は kankoku/audio/map.json(字 → ファイル名)
- もう ある 音は 作らない(何回 走らせても 足すだけ)。声を 変えたら --redo
- ⚠️ 鍵は 環境変数だけから 読む。ファイルにも 画面にも 出さない(GitHub の Secrets に 入れてある)
"""
import argparse, base64, hashlib, json, os, sys, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "kankoku", "audio")
MAP = os.path.join(OUT, "map.json")
API = "https://texttospeech.googleapis.com/v1/"
# 人に 近い 順。はじめに 使える ものを えらぶ(Chirp3 HD がいちばん 自然)
VOICES = ["ko-KR-Chirp3-HD-Kore", "ko-KR-Chirp3-HD-Leda", "ko-KR-Neural2-A", "ko-KR-Wavenet-A"]
EXTRA = ["안녕하세요"]


def call(path, body=None, key=""):
    req = urllib.request.Request(API + path + ("&" if "?" in path else "?") + "key=" + key,
                                 data=None if body is None else json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def mark(text):
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:12]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="作る 数の 上限(0 = ぜんぶ)")
    ap.add_argument("--only", default="", help="この 旅だけ(例: krhan)")
    ap.add_argument("--redo", action="store_true", help="ある 音も 作りなおす")
    a = ap.parse_args()
    key = os.environ.get("GOOGLE_TTS_KEY", "").strip()
    if not key:
        sys.exit("GOOGLE_TTS_KEY が ありません")

    names = {v["name"] for v in call("voices?languageCode=ko-KR", key=key).get("voices", [])}
    voice = next((v for v in VOICES if v in names), None)
    if not voice:
        sys.exit("韓国語の 声が 見つかりません: " + ", ".join(sorted(names)[:20]))
    print("声:", voice)

    items = json.load(open(os.path.join(ROOT, "data", "korean.json"), encoding="utf-8"))["list"]
    texts = []
    for x in items:
        if a.only and x.get("journey") != a.only:
            continue
        if x["text"] not in texts:
            texts.append(x["text"])
    if not a.only:
        texts += [t for t in EXTRA if t not in texts]

    os.makedirs(OUT, exist_ok=True)
    m = json.load(open(MAP, encoding="utf-8")) if os.path.exists(MAP) else {}
    made = 0
    for t in texts:
        f = mark(t) + ".mp3"
        if not a.redo and m.get(t) == f and os.path.exists(os.path.join(OUT, f)):
            continue
        if a.limit and made >= a.limit:
            break
        body = {"input": {"text": t}, "voice": {"languageCode": "ko-KR", "name": voice},
                "audioConfig": {"audioEncoding": "MP3"}}
        for tries in range(4):
            try:
                r = call("text:synthesize", body, key)
                break
            except urllib.error.HTTPError as e:
                if e.code in (429, 500, 503) and tries < 3:
                    time.sleep(2 ** (tries + 1)); continue
                sys.exit("作れませんでした(%d): %s" % (e.code, t))
        open(os.path.join(OUT, f), "wb").write(base64.b64decode(r["audioContent"]))
        m[t] = f
        made += 1
        if made % 50 == 0:
            print(made, "こ")
    json.dump(dict(sorted(m.items(), key=lambda kv: kv[1])), open(MAP, "w", encoding="utf-8"),
              ensure_ascii=False, indent=0)
    print("作った:", made, "/ ぜんぶ:", len(m))


if __name__ == "__main__":
    main()
