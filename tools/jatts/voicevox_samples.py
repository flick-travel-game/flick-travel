#!/usr/bin/env python3
"""声優さんの ような 声(VOICEVOX)の 見本を 作る(けいくん 2026-10-17「もっと声優さんみたいな可愛い声にならないかな？」)。
GitHub Actions の ja-voicevox で、VOICEVOX ENGINE(docker)を その場で 立てて 動かす。鍵は 要らない。
  python3 tools/jatts/voicevox_samples.py "ずんだもん,四国めたん,…"
- 見本は tools/jatts/voicevox-samples/<キャラ>_<スタイル>.mp3
- ⚠️ キャラクターごとに 利用規約が ある(ゲームに 使う 前に 1人ずつ 読む。クレジット表記「VOICEVOX:◯◯」が 要る)
"""
import json, os, subprocess, sys, urllib.parse, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
API = "http://127.0.0.1:50021/"
TEXT = "花火。ティラノサウルス。一石二鳥。光合成。"


def get(path):
    with urllib.request.urlopen(API + path, timeout=60) as r: return json.load(r)


def post(path, body=None, raw=False):
    req = urllib.request.Request(API + path, data=None if body is None else json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=120) as r: return r.read() if raw else json.load(r)


def main():
    want = [w.strip() for w in (sys.argv[1] if len(sys.argv) > 1 else "").split(",") if w.strip()]
    d = os.path.join(ROOT, "tools", "jatts", "voicevox-samples"); os.makedirs(d, exist_ok=True)
    speakers = get("speakers")
    print("キャラ:", ", ".join(s["name"] for s in speakers))
    for s in speakers:
        if want and s["name"] not in want: continue
        styles = s["styles"][:2]  # ノーマル と もう1つ(あまあま など)
        for st in styles:
          try:
            q = post("audio_query?" + urllib.parse.urlencode({"text": TEXT, "speaker": st["id"]}))
            wav = post("synthesis?" + urllib.parse.urlencode({"speaker": st["id"]}), q, raw=True)
            safe = lambda x: x.replace("/", "-").replace(" ", "")
            base = os.path.join(d, f"{safe(s['name'])}_{safe(st['name'])}")
            open(base + ".wav", "wb").write(wav)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", base + ".wav", "-b:a", "64k", base + ".mp3"], check=True)
            os.remove(base + ".wav")
            print("見本:", s["name"], st["name"])
          except Exception as e:
            print("しくじり:", s["name"], st["name"], e)


if __name__ == "__main__":
    main()
