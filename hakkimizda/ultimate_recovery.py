import os
import requests
import json
import re
import shutil

BASE_URL = "https://activetheory.net"
LOCAL_ROOT = "d:/minadesign/elements/portfoy/hakkimizda"
UIL_FILE = os.path.join(LOCAL_ROOT, "assets/data/uil.1746999829739.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://activetheory.net/",
    "Accept": "*/*"
}

def is_html(content):
    return b"<!DOCTYPE html>" in content[:200] or b"<html>" in content[:200] or b"<head>" in content[:200]

def aggressive_download(rel_path, save_as):
    # Try multiple URL variants for this relative path
    # Example: assets/images/pbr/woodplanks_normal.png-compressedKtx2
    
    # 1. Base Variants
    clean_p = rel_path.split('?')[0]
    
    variants = []
    variants.append(clean_p) # Exact
    
    if "-compressedKtx2" in clean_p:
        core = clean_p.replace("-compressedKtx2", "")
        variants.append(core) # woodplanks_normal.png
        # Try swapping extension to .ktx2
        base_core = core.rsplit('.', 1)[0]
        variants.append(base_core + ".ktx2") # woodplanks_normal.ktx2
        variants.append(core + ".ktx2")      # woodplanks_normal.png.ktx2
    
    # Also if it's a .bin, try .bin
    if clean_p.endswith(".bin"):
        variants.append(clean_p)
    
    # Also try adding -compressedKtx2 if not present but we want ktx2
    if ".png" in clean_p or ".jpg" in clean_p:
         variants.append(clean_p + "-compressedKtx2")

    for v in list(set(variants)):
        url = BASE_URL + "/" + v
        try:
            resp = requests.get(url, headers=HEADERS, timeout=10)
            if resp.status_code == 200:
                content = resp.content
                if not is_html(content):
                    local_target = os.path.join(LOCAL_ROOT, save_as)
                    os.makedirs(os.path.dirname(local_target), exist_ok=True)
                    with open(local_target, "wb") as f:
                        f.write(content)
                    print(f"Aggressive Success: {url} -> {save_as} ({len(content)} bytes)")
                    return True
        except:
            pass
    return False

def run_ultimate():
    # 1. Extract all paths from uil.json (this covers the 3D scene)
    with open(UIL_FILE, "r") as f:
        data = f.read()
    
    all_paths = re.findall(r'assets/[\w\./\-\?%&_=]+', data)
    targets = list(set(all_paths))
    print(f"Extracted {len(targets)} targets from uil.json")
    
    for t in targets:
        clean_t = t.split('?')[0]
        # Skip directories
        if clean_t.endswith("/") or os.path.isdir(os.path.join(LOCAL_ROOT, clean_t)):
             continue
             
        local_path = os.path.join(LOCAL_ROOT, clean_t)
        
        # Check if already exists and is valid
        if os.path.exists(local_path):
             with open(local_path, "rb") as f:
                  if not is_html(f.read(200)):
                       continue
        
        print(f"Trying target: {t}")
        aggressive_download(t, clean_t)

    # 2. Cleanup specifically for the user's report
    # Recursively find any remaining HTML files in assets
    print("Final HTML sweep...")
    for root, dirs, files in os.walk(os.path.join(LOCAL_ROOT, "assets")):
        for file in files:
            p = os.path.join(root, file)
            try:
                if os.path.getsize(p) < 10000:
                    with open(p, "rb") as f:
                        if is_html(f.read(200)):
                            print(f"Residual HTML found: {file}. Retrying...")
                            aggressive_download(os.path.relpath(p, LOCAL_ROOT).replace("\\", "/"), os.path.relpath(p, LOCAL_ROOT))
            except:
                pass

if __name__ == "__main__":
    run_ultimate()
