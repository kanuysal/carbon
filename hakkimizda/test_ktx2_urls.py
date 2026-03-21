import requests

urls = [
    "https://activetheory.net/assets/images/tree_room/STRUCTURE___PBR_Normal.jpg.ktx2",
    "https://activetheory.net/assets/images/tree_room/STRUCTURE___PBR_Normal.ktx2",
    "https://activetheory.net/assets/images/tree_room/STRUCTURE___PBR_Normal.jpg-compressedKtx2",
    "https://activetheory.net/assets/images/tree_room/STRUCTURE___PBR_Normal.jpg?1746999829739-compressedKtx2" # Original with query
]

for url in urls:
    try:
        r = requests.head(url, timeout=5)
        print(f"{url} -> {r.status_code}")
    except:
        print(f"{url} -> FAILED")
