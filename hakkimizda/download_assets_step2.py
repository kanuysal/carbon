import os
import requests

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
base_url = 'https://activetheory.net'
storage_url = 'https://storage.googleapis.com/activetheory-v6.appspot.com'

files_to_download = [
    # Videos
    'assets/video/reel.mp4',
    
    # Font JSONs (Three.js format)
    'assets/fonts/NBArchitektStd-Regular.json',
    'assets/fonts/NBArchitektStd-Light.json',
    'assets/fonts/NBArchitektStd-Bold.json',
    
    # Libs (Draco & Basis)
    'assets/js/lib/_draco/draco_wasm_wrapper.js',
    'assets/js/lib/_draco/draco_decoder.wasm',
    'assets/js/lib/basis_transcoder.js',
    'assets/js/lib/basis_transcoder.wasm',
    
    # CMS JSONs (from storage.googleapis.com)
    ('cms/metadata-dev.json', f'{storage_url}/cms/metadata-dev.json', 'assets/cms/metadata-dev.json'),
    ('cms/contact-dev.json', f'{storage_url}/cms/contact-dev.json', 'assets/cms/contact-dev.json'),
    ('cms/projects-dev.json', f'{storage_url}/cms/projects-dev.json', 'assets/cms/projects-dev.json')
]

def download_file(url, local_path):
    print(f"Downloading {url}...")
    dir_name = os.path.dirname(local_path)
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    
    try:
        response = requests.get(url, stream=True, timeout=30)
        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"  Saved to {local_path}")
        else:
            print(f"  Error: {response.status_code}")
    except Exception as e:
        print(f"  Exception: {e}")

for item in files_to_download:
    if isinstance(item, tuple):
        name, url, local_rel_path = item
        local_path = os.path.join(base_dir, local_rel_path.replace('/', os.sep))
    else:
        url = f"{base_url}/{item}"
        local_path = os.path.join(base_dir, item.replace('/', os.sep))
    download_file(url, local_path)

# Update index.html to use local CMS path
index_path = os.path.join(base_dir, 'index.html')
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Set _CMS_ to local assets folder
    content = content.replace('window._CMS_="%CMS%";', 'window._CMS_="assets/cms/";')
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated index.html with local CMS path.")

print("Step 2 download complete.")
