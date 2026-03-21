import os
import requests
import re

BASE_URL = "https://activetheory.net"
LOCAL_ROOT = "d:/minadesign/elements/portfoy/hakkimizda"
HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://activetheory.net/"
}

def is_html(content):
    return b"<!DOCTYPE html>" in content[:200] or b"<html>" in content[:200]

def try_download(rel_path):
    # Try multiple variants
    clean = rel_path.replace("\\", "/").split('?')[0]
    
    variants = [clean]
    
    # 1. ktx2 variants
    if "-compressedKtx2" in clean:
        core = clean.replace("-compressedKtx2", "")
        base = core.rsplit('.', 1)[0]
        variants.append(base + ".ktx2")
        variants.append(core + ".ktx2")
    
    # 2. .bin variants
    if clean.endswith(".json"):
        variants.append(clean.replace(".json", ".bin"))
        
    for v in list(set(variants)):
        url = BASE_URL + "/" + v
        try:
            r = requests.get(url, headers=HEADERS, timeout=10)
            if r.status_code == 200 and not is_html(r.content):
                local_path = os.path.join(LOCAL_ROOT, rel_path)
                os.makedirs(os.path.dirname(local_path), exist_ok=True)
                with open(local_path, "wb") as f:
                    f.write(r.content)
                print(f"FIXED: {rel_path} using {v}")
                return True
        except:
            pass
    return False

def sweep():
    print("Starting deep HTML sweep...")
    for root, dirs, files in os.walk(os.path.join(LOCAL_ROOT, "assets")):
        for file in files:
            path = os.path.join(root, file)
            size = os.path.getsize(path)
            # HTML pages are usually 5952, but sometimes 790 or similar errors
            if size < 15000:
                try:
                    with open(path, "rb") as f:
                        if is_html(f.read(200)):
                            rel = os.path.relpath(path, LOCAL_ROOT)
                            print(f"Detected HTML: {rel}")
                            if not try_download(rel):
                                print(f"Failed to find alternative for {rel}")
                except:
                    pass

if __name__ == "__main__":
    sweep()
