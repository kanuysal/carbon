import requests
url = 'https://activetheory.net/assets/images/tree_room/STRUCTURE___PBR_Normal.ktx2'
try:
    r = requests.get(url, timeout=10)
    print(f"Status: {r.status_code}")
    print(f"Content-Type: {r.headers.get('Content-Type')}")
    print(f"Content Length: {len(r.content)}")
    if b'KTX 20' in r.content[:50]:
        print("REAL KTX2 FOUND!")
    else:
        print(f"Snippet: {r.content[:50]}")
except Exception as e:
    print(f"Error: {e}")
