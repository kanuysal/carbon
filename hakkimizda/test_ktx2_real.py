import requests

url = "https://activetheory.net/assets/images/tree_room/STRUCTURE___PBR_Normal.ktx2"
r = requests.get(url, stream=True)
print(f"Status: {r.status_code}")
print(f"Content-Type: {r.headers.get('Content-Type')}")
print(f"Snippet (hex): {r.content[:20].hex()}")
