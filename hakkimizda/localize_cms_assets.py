import os
import requests
import json
import re

base_dir = r'd:\minadesign\elements\portfoy\hakkimizda'
cms_dir = os.path.join(base_dir, 'assets', 'cms')
media_dir = os.path.join(base_dir, 'assets', 'media')

if not os.path.exists(media_dir):
    os.makedirs(media_dir)

def download_file(url, local_path):
    if os.path.exists(local_path):
        return True
    print(f"Downloading {url}...")
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
        else:
            print(f"  Error: {response.status_code}")
            return False
    except Exception as e:
        print(f"  Exception: {e}")
        return False

# Files to process
cms_files = [f for f in os.listdir(cms_dir) if f.endswith('.json')]

for cms_file in cms_files:
    file_path = os.path.join(cms_dir, cms_file)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all storage.googleapis.com URLs
    urls = re.findall(r'https://storage\.googleapis\.com/[a-zA-Z0-9\-\._~%!\$&\'\(\)\*\+,;=:@/]+', content)
    
    unique_urls = set(urls)
    print(f"Processing {cms_file}: Found {len(unique_urls)} URLs.")
    
    replacements = {}
    for url in unique_urls:
        # Extract filename (handle %20 etc)
        from urllib.parse import unquote
        filename = unquote(url.split('/')[-1])
        # Clean filename for Windows
        clean_filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
        local_rel_path = f"assets/media/{clean_filename}"
        local_abs_path = os.path.join(base_dir, local_rel_path.replace('/', os.sep))
        
        if download_file(url, local_abs_path):
            # We must replace the EXACT url string in the JSON
            # Note: JSON content might have escaped slashes like \/
            # and the regex might have picked up the URL differently.
            # But usually it's plain string.
            replacements[url] = local_rel_path
    
    # Apply replacements
    new_content = content
    for old_url, new_rel in replacements.items():
        new_content = new_content.replace(old_url, new_rel)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("CMS asset localization complete.")
