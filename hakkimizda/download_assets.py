import os
import requests

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
base_url = 'https://activetheory.net'
cache = '1746999829739'

files_to_download = [
    f'assets/js/app.{cache}.js',
    f'assets/js/modules.{cache}.js',
    f'assets/data/uil.{cache}.json',
    'assets/js/hydra/hydra-thread.js',
    'assets/shaders/compiled.vs',
    'assets/fonts/NBArchitektStd-Regular-export/NBArchitektStd-Regular.woff2',
    'assets/fonts/NBArchitektStd-Light-export/NBArchitektStd-Light.woff2',
    'assets/fonts/NBArchitektStd-Bold-export/NBArchitektStd-Bold.woff2',
    'assets/meta/apple-touch-icon.png',
    'assets/meta/favicon-32x32.png',
    'assets/meta/favicon-16x16.png',
    'assets/meta/manifest.json',
    'assets/meta/safari-pinned-tab.svg',
    'favicon.ico',
    'unsupported.html'
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

for f in files_to_download:
    url = f"{base_url}/{f}"
    local_path = os.path.join(base_dir, f.replace('/', os.sep))
    download_file(url, local_path)

print("Download complete.")
