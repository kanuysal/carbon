import requests
import os

BASE_URL = "https://activetheory.net"
LOCAL_ROOT = "d:/minadesign/elements/portfoy/hakkimizda/assets/fonts"
HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://activetheory.net/"
}

fonts = [
    "NBArchitektStd-Regular.png",
    "NBArchitektStd-Bold.png",
    "NBArchitektStd-Light.png"
]

os.makedirs(LOCAL_ROOT, exist_ok=True)

for f in fonts:
    url = f"{BASE_URL}/assets/fonts/{f}"
    local_path = os.path.join(LOCAL_ROOT, f)
    print(f"Downloading {url}...")
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code == 200:
        with open(local_path, "wb") as file:
            file.write(resp.content)
        print(f"Saved to {local_path} ({len(resp.content)} bytes)")
    else:
        print(f"Failed to download {f}: {resp.status_code}")
