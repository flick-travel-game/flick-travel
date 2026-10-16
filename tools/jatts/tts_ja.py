#!/usr/bin/env python3
"""フリックシリーズの 🔊(答えた あとに ふりがなを 読む)を 人に 近い 声に する(Google Cloud Text-to-Speech)。
いまは 見本だけ(けいくん 2026-10-16「2」= 韓国語と 同じ 音声ファイルの 案。まず 声を えらんでもらう)。

  GOOGLE_TTS_KEY=... python3 tools/jatts/tts_ja.py --samples ja-JP-Chirp3-HD-Leda,ja-JP-Chirp3-HD-Puck

- 見本は tools/jatts/voice-samples/<声>.mp3
- ⚠️ 鍵は 環境変数だけから 読む。ファイルにも 画面にも 出さない(GitHub の Secrets に 入れてある)
"""
import argparse, base64, json, os, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
API = "https://texttospeech.googleapis.com/v1/"
# ⚠️ ひらがなだけを 読ませると 抑揚が 平らに なって カタコトに 聞こえる(けいくん 2026-10-16「カタコトに喋るのやめて」)。
# 漢字・カタカナの 形を 読ませ、読みは SSML の yomigana で 決める(読みまちがいも 防ぐ)
SAMPLE_SSML = ('<speak><phoneme alphabet="yomigana" ph="はなび">花火</phoneme>。<break time="400ms"/>'
               'ティラノサウルス。<break time="400ms"/>'
               '<phoneme alphabet="yomigana" ph="いっせきにちょう">一石二鳥</phoneme>。<break time="400ms"/>'
               '<phoneme alphabet="yomigana" ph="こうごうせい">光合成</phoneme>。</speak>')
SAMPLE_PLAIN = "花火。 ティラノサウルス。 一石二鳥。 光合成。"


def call(path, body=None, key=""):
    req = urllib.request.Request(API + path + ("&" if "?" in path else "?") + "key=" + key,
                                 data=None if body is None else json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--samples", default="", help="この 声たちで 見本を 作る(カンマ区切り。空 = Chirp3-HD ぜんぶ)")
    a = ap.parse_args()
    key = os.environ.get("GOOGLE_TTS_KEY", "").strip()
    if not key:
        sys.exit("GOOGLE_TTS_KEY が ありません")
    voices = call("voices?languageCode=ja-JP", key=key).get("voices", [])
    names = {v["name"]: v.get("ssmlGender", "") for v in voices}
    print("日本語の 声:", ", ".join(sorted(names)))
    want = [v.strip() for v in a.samples.split(",") if v.strip()] or sorted(n for n in names if "Chirp3-HD" in n)
    d = os.path.join(ROOT, "tools", "jatts", "voice-samples"); os.makedirs(d, exist_ok=True)
    for spec in want:
        name, _, pitch = spec.partition("@")
        if name not in names:
            print("ない 声:", name); continue
        cfg = {"audioEncoding": "MP3"}
        if pitch: cfg["pitch"] = float(pitch)
        # Chirp3-HD は SSML の phoneme が 使えないことが あるので ふつうの 文で
        inp = {"text": SAMPLE_PLAIN} if "Chirp" in name else {"ssml": SAMPLE_SSML}
        try:
            r = call("text:synthesize", {"input": inp, "voice": {"languageCode": "ja-JP", "name": name}, "audioConfig": cfg}, key)
        except Exception as e:
            print("作れない:", spec, e); continue
        fn = "v2-" + spec.replace("ja-JP-", "").replace("@", "_p") + "_" + (names[name] or "x").lower()[:1] + ".mp3"
        open(os.path.join(d, fn), "wb").write(base64.b64decode(r["audioContent"]))
        print("見本:", fn)


if __name__ == "__main__":
    main()
