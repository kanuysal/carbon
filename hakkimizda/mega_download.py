import os
import requests
import re
import json

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
base_url = 'https://activetheory.net'
uil_path = os.path.join(base_dir, 'assets', 'data', 'uil.1746999829739.json')
app_path = os.path.join(base_dir, 'assets', 'js', 'app.1746999829739.js')

# Extract all potential paths from UIL and App JS
paths_found = set()

def extract_from_file(path):
    if not os.path.exists(path): return
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    # Broad regex for assets/... paths
    matches = re.findall(r'assets/[a-zA-Z0-9_\-\./?=&]+', content)
    for m in matches:
        paths_found.add(m)

extract_from_file(uil_path)
extract_from_file(app_path)

# Also explicitly look for things mentioned in logs
extra = [
    'assets/images/tree_room/STRUCTURE___PBR_Normal.ktx2',
    'assets/images/tree_room/WALLS_CEILING___PBR_Normal.ktx2',
    'assets/images/tree_room/ROCKY_SOIL___PBR_Normal.ktx2',
    'assets/images/tree_room/CABLES___PBR_Normal.ktx2',
    'assets/images/tree_room/PILLARS___PBR_Normal.ktx2',
    'assets/images/pbr/damaged_road_basecolor.png',
    'assets/images/pbr/corsica_beach-diffuse-RGBM.png',
    'assets/images/pbr/corsica_beach-specular-RGBM.png'
]
for e in extra: paths_found.add(e)

# Clean and process paths
clean_targets = set()
for p in paths_found:
    # URL might have query params
    full_target = p
    base_target = p.split('?')[0].split('\\')[0].strip('/').strip()
    
    # Check if it has -compressedKtx2 in query
    is_ktx2_param = 'compressedKtx2' in p
    
    if '.' in os.path.basename(base_target):
        clean_targets.add(base_target)
        if is_ktx2_param:
            # Add .ktx2 version if not already there
            # Mapping: STRUCTURE___PBR_Normal.jpg -> STRUCTURE___PBR_Normal.ktx2
            ktx2_name = base_target.rsplit('.', 1)[0] + '.ktx2'
            clean_targets.add(ktx2_name)
            # Also add the hyphen version from user logs
            clean_targets.add(base_target + '-compressedKtx2')

def download_checked(rel_path):
    local_path = os.path.join(base_dir, rel_path.replace('/', os.sep))
    url = f"{base_url}/{rel_path}"
    
    # Skip if already exists and is "real" (not HTML)
    if os.path.exists(local_path):
        if os.path.getsize(local_path) > 7000: # Heuristic: HTMl is usually < 6000
            # Check if it's really HTML
            with open(local_path, 'rb') as f:
                head = f.read(100)
                if b'<!DOCTYPE html>' not in head and b'<html>' not in head:
                    return
        os.remove(local_path)

    dir_name = os.path.dirname(local_path)
    if not os.path.exists(dir_name): os.makedirs(dir_name, exist_ok=True)

    print(f"Downloading {rel_path}...")
    try:
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            ctype = r.headers.get('Content-Type', '')
            if 'text/html' in ctype or b'<!DOCTYPE html>' in r.content[:200]:
                print(f"  Skipped (HTML content)")
            else:
                with open(local_path, 'wb') as f:
                    f.write(r.content)
                print(f"  Saved ({len(r.content)} bytes)")
        else:
            # Try alternate extension if ktx2
            if rel_path.endswith('.ktx2') and r.status_code == 404:
                # Try .png.ktx2
                alt_path = rel_path.replace('.ktx2', '.png.ktx2')
                print(f"  404. Trying alternate: {alt_path}")
                # ... recursive call or just handle here ...
    except Exception as e:
        print(f"  Error: {e}")

# Process targets
sorted_targets = sorted(list(clean_targets))
print(f"Found {len(sorted_targets)} unique targets to check.")

for t in sorted_targets:
    download_checked(t)

print("Mega-Download Complete.")
