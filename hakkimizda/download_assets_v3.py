import os
import requests
import re

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
base_url = 'https://activetheory.net'
storage_url = 'https://storage.googleapis.com/activetheory-v6.appspot.com'
uil_json_path = os.path.join(base_dir, 'assets', 'data', 'uil.1746999829739.json')

with open(uil_json_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all assets
paths = re.findall(r'assets/[^"\',]+', content)

clean_paths = set()
for p in paths:
    # If it contains compressedKtx2, we need the .ktx2 version
    is_ktx2 = 'compressedKtx2' in p
    
    # Path without query
    p_base = p.split('?')[0].split('\\')[0].strip('/').strip()
    
    if '.' in os.path.basename(p_base):
        clean_paths.add(p_base)
        if is_ktx2:
            # Usually it's filename.png.ktx2 or filename.ktx2
            # According to subagent: assets/images/tree_room/ROCKY_SOIL___CyclesBake_COMBINED.ktx2
            # Wait, let's try both or just .ktx2
            ktx2_path = p_base.rsplit('.', 1)[0] + '.ktx2'
            clean_paths.add(ktx2_path)

# Add manually found missing files from subagent report
extra_files = [
    'assets/music/Downtown Binary - Other Worlds.mp3',
    'assets/video/reel.mp4'
]
for ef in extra_files:
    clean_paths.add(ef)

# Also add the prometheus video from storage
# https://storage.googleapis.com/activetheory-v6.appspot.com/media/prometheus%20(720p).mp4
storage_files = [
    ('media/prometheus (720p).mp4', f'{storage_url}/media/prometheus%20(720p).mp4', 'assets/media/prometheus_720p.mp4')
]

files_to_download = sorted(list(clean_paths))
print(f"Found {len(files_to_download)} potential assets (including ktx2).")

def download_file(url, local_path):
    dir_name = os.path.dirname(local_path)
    if os.path.isfile(dir_name): os.remove(dir_name)
    if not os.path.exists(dir_name): os.makedirs(dir_name, exist_ok=True)
    if os.path.exists(local_path): return

    print(f"Downloading {url}...")
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"  Saved.")
        else:
            # If ktx2 fails, maybe it's .png.ktx2 or something
            print(f"  Error: {response.status_code}")
    except Exception as e:
        print(f"  Exception: {e}")

for f in files_to_download:
    url = f"{base_url}/{f}"
    local_path = os.path.join(base_dir, f.replace('/', os.sep))
    download_file(url, local_path)

for name, url, local_rel in storage_files:
    local_path = os.path.join(base_dir, local_rel.replace('/', os.sep))
    download_file(url, local_path)

print("Download v3 complete.")
