import requests

url = "https://activetheory.net/assets/geometry/cube.json?1746999829739"
r = requests.get(url)
print(f"Status: {r.status_code}")
print(f"Content-Type: {r.headers.get('Content-Type')}")
print(f"Snippet: {r.text[:100]}")
