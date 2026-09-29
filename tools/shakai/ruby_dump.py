"""説明に 付く ふりがなを 旅ごとに 見る(確かめる 助手むけ)。書きこみは しない
    python3 tools/shakai/ruby_dump.py kenpo"""
import json, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "tools/kabu"))
from companies_js import rubifier
rub = rubifier()
for t in json.loads((HERE / f"terms-{sys.argv[1]}.json").read_text(encoding="utf-8")):
    h = rub(t["description"])
    rs = re.findall(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>", h)
    print(t["id"], " ".join(f"{a}({b})" for a, b in rs))
