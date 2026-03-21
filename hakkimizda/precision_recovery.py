import os
import requests
import json
import re

BASE_URL = "https://activetheory.net"
LOCAL_ROOT = "d:/minadesign/elements/portfoy/hakkimizda"
UIL_FILE = os.path.join(LOCAL_ROOT, "assets/data/uil.1746999829739.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://activetheory.net/",
    "Accept": "*/*"
}

def clean_broken_files():
    print("Cleaning broken HTML transition files...")
    for root, dirs, files in os.walk(os.path.join(LOCAL_ROOT, "assets")):
        for file in files:
            path = os.path.join(root, file)
            size = os.path.getsize(path)
            # HTML error pages are around 5952 or 790 bytes
            if 5900 <= size <= 6000 or 700 <= size <= 900:
                with open(path, "rb") as f:
                    chunk = f.read(100)
                    if b"<!DOCTYPE html>" in chunk or b"<html>" in chunk:
                        try:
                            print(f"Deleting broken file: {file} ({size} bytes)")
                            os.remove(path)
                        except:
                            print(f"Skipping delete of {file} due to lock")

def download_file(url, local_path):
    if os.path.isdir(local_path):
        return False
        
    if os.path.exists(local_path):
        try:
            with open(local_path, "rb") as f:
                if b"<!DOCTYPE html>" in f.read(100):
                    os.remove(local_path)
                else:
                    return True
        except:
            return True # Assume it's fine if we can't read it now

    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        if response.status_code == 200:
            content = response.content
            if b"<!DOCTYPE html>" in content[:100]:
                return False
            
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, "wb") as f:
                f.write(content)
            print(f"Successfully downloaded: {url} -> {len(content)} bytes")
            return True
        return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def recovery():
    clean_broken_files()

    with open(UIL_FILE, "r") as f:
        data = f.read()

    # Find all "assets/..." URLs
    paths = re.findall(r'assets/[\w\./\-\?%&_=]+', data)
    unique_paths = list(set(paths))
    print(f"Found {len(unique_paths)} unique asset paths in uil.json")

    for p in unique_paths:
        # Clean query string for local saving
        clean_p = p.split('?')[0]
        
        # Handle variants
        urls_to_try = []
        
        # 1. Exact path as in JSON
        urls_to_try.append((BASE_URL + "/" + p, clean_p))
        
        # 2. If it's a ktx2-looking path
        if "-compressedKtx2" in p:
            # Try without query string but with -compressedKtx2
            urls_to_try.append((BASE_URL + "/" + clean_p + "-compressedKtx2", clean_p + "-compressedKtx2"))
            # Try with just .ktx2
            ktx2_path = clean_p.rsplit('.', 1)[0] + ".ktx2"
            urls_to_try.append((BASE_URL + "/" + ktx2_path, ktx2_path))
            
        elif ".ktx2" in p:
            urls_to_try.append((BASE_URL + "/" + clean_p, clean_p))

        for url, local_rel_path in urls_to_try:
            local_path = os.path.join(LOCAL_ROOT, local_rel_path)
            if download_file(url, local_path):
                # If we downloaded a .ktx2 file but the engine wants -compressedKtx2, copy it
                if url.endswith(".ktx2") and "-compressedKtx2" in p:
                    target_copy = os.path.join(LOCAL_ROOT, p.split('?')[0])
                    if not os.path.exists(target_copy):
                        import shutil
                        shutil.copy2(local_path, target_copy)
                        print(f"Copied {local_rel_path} to {target_copy}")
                break

if __name__ == "__main__":
    recovery()
