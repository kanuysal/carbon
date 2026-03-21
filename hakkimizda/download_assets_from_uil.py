import os
import requests
import re
import json

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
base_url = 'https://activetheory.net'
uil_json_path = os.path.join(base_dir, 'assets', 'data', 'uil.1746999829739.json')

if not os.path.exists(uil_json_path):
    print(f"File not found: {uil_json_path}")
    exit(1)

with open(uil_json_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all occurrences of assets/... paths
# We look for anything that starts with "assets/" and ends with one of the common extensions or characters like " or ?
# Or just use a broad regex and then filter
paths = re.findall(r'assets/[^"\',]+', content)

# Clean up paths (remove trailing quotes, spaces, etc.)
clean_paths = set()
for p in paths:
    # Remove everything after ? if present in path (we can add it back if needed, but usually not)
    # Actually, keep it for downloading if it helps, but for local saving, remove it.
    p = p.split('?')[0]
    p = p.strip('\\') # Handle escaped slashes if any
    clean_paths.add(p)

# Also look for paths inside escaped JSON strings
# Actually, the regex above should catch most things even in escaped JSON.

files_to_download = sorted(list(clean_paths))
print(f"Found {len(files_to_download)} potential assets.")

def download_file(url, local_path):
    dir_name = os.path.dirname(local_path)
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    
    if os.path.exists(local_path):
        # Skip if already exists
        return

    print(f"Downloading {url}...")
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"  Saved.")
        else:
            print(f"  Error: {response.status_code}")
    except Exception as e:
        print(f"  Exception: {e}")

processed = 0
for f in files_to_download:
    url = f"{base_url}/{f}"
    local_path = os.path.join(base_dir, f.replace('/', os.sep))
    download_file(url, local_path)
    processed += 1
    if processed % 50 == 0:
        print(f"Processed {processed}/{len(files_to_download)}...")

print("Scan and download complete.")
