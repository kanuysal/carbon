import os
import requests
import re
import shutil

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
base_url = 'https://activetheory.net'
uil_json_path = os.path.join(base_dir, 'assets', 'data', 'uil.1746999829739.json')

if not os.path.exists(uil_json_path):
    print(f"File not found: {uil_json_path}")
    exit(1)

with open(uil_json_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Filter paths. We want things like .png, .jpg, .json, .bin, .vs, .mp4
# Avoid directory names
paths = re.findall(r'assets/[^"\',]+', content)

clean_paths = set()
for p in paths:
    # Clean up
    p = p.split('?')[0].split('\\')[0].strip('/').strip()
    # Basic check for file vs directory: must have a dot for extension?
    # Or just skip known directory fields like 'assets/geometry'
    if '.' in os.path.basename(p):
        clean_paths.add(p)

files_to_download = sorted(list(clean_paths))
print(f"Found {len(files_to_download)} potential assets.")

def download_file(url, local_path):
    dir_name = os.path.dirname(local_path)
    
    # If dir_name exists as a file, remove it
    if os.path.isfile(dir_name):
        os.remove(dir_name)

    if not os.path.exists(dir_name):
        os.makedirs(dir_name, exist_ok=True)
    
    if os.path.exists(local_path):
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
