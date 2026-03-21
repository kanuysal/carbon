import os
import requests

BASE_URL = "https://activetheory.net"
LOCAL_ROOT = "d:/minadesign/elements/portfoy/hakkimizda"
HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://activetheory.net/"
}

# 1. KTX2 Fixes from User Logs
ktx2_targets = [
    "assets/images/pbr/cracked_ice_basecolor.ktx2",
    "assets/images/tree_room/CABLES___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/ROCKY_SOIL___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/ROCK_L___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/ROCK_R___PBR_Normal.ktx2",
    "assets/images/tree_room/ROCK_L___PBR_Normal.ktx2",
    "assets/images/tree_room/PILLARS___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/STRUCTURE___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/WALLS_CEILING___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/SAND___PBR_Normal.ktx2",
    "assets/images/tree_room/SAND___PBR_AT_MRO.ktx2",
    "assets/images/tree_room/ROCK_R___PBR_AT_MRO.ktx2"
]

def download_and_copy_variants(rel_path):
    url = f"{BASE_URL}/{rel_path}"
    local_path = os.path.join(LOCAL_ROOT, rel_path)
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    print(f"Downloading {url}...")
    r = requests.get(url, headers=HEADERS)
    if r.status_code == 200:
        with open(local_path, "wb") as f:
            f.write(r.content)
        # Create -compressedKtx2 variants
        variants = []
        variants.append(rel_path.replace(".ktx2", ".jpg-compressedKtx2"))
        variants.append(rel_path.replace(".ktx2", ".png-compressedKtx2"))
        for v in variants:
            v_path = os.path.join(LOCAL_ROOT, v)
            import shutil
            shutil.copy2(local_path, v_path)
            print(f"  Mapped to {v}")
    else:
        print(f" Failed: {r.status_code}")

def particle_fix():
    print("Fixing particles/bins...")
    import shutil
    src = os.path.join(LOCAL_ROOT, "assets/geometry/particles")
    dst = os.path.join(LOCAL_ROOT, "assets/geometry")
    if os.path.exists(src):
        for f in os.listdir(src):
            if f.endswith(".bin"):
                shutil.copy2(os.path.join(src, f), os.path.join(dst, f))
                print(f"  Moved {f} to assets/geometry/")

if __name__ == "__main__":
    for t in ktx2_targets:
        download_and_copy_variants(t)
    particle_fix()
