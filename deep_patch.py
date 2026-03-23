import os
import re

root = r"d:\minadesign\elements\portfoy"
os.chdir(root)

js_path = r"assets/js/app.1746999829739.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Navigation Redirection Fix
# We force 'anasayfa'/'contact' to go to /site.html
# and 'projeler'/'work' to go to /index.html
# We match the specific structure found in previous steps.

# Current faulty block potentially looks like:
# if (link == 'anasayfa' || link == 'contact') { window.location.href = 'mailto:support@minadesign.eu'; return; }
# We'll replace it with the correct routing.

redirect_pattern = re.compile(r"if\s*\(link\s*==\s*\'anasayfa\'.*?\}", re.DOTALL)
new_redirect = """if (link == 'anasayfa' || link == 'contact') {
            window.location.href = '/site.html';
            return;
        }
        if (link == 'projeler' || link == 'work') {
            window.location.href = '/index.html';
            return;
        }"""

js = redirect_pattern.sub(new_redirect, js)

# 2. Filter Logic Fix
# Change 'tag && CMSData.filter(...)' to always call filter, ensuring null/empty tag shows all.
js = js.replace("tag && (await defer(), CMSData.filter(tag.toLowerCase()))", 
                "(await defer(), CMSData.filter(tag ? tag.toLowerCase() : ''))")

# 3. Ne aramıştınız? -> KATEGORI SECIN (again, to be absolute)
js = js.replace("Ne aramıştınız?", "KATEGORI SECIN")

# 4. Header Labels (In case he reverted them)
# Force text: "PROJELER" for 'work' ref and "ANASAYFA" for 'contact' ref
# Searching for the NavUI children block
nav_pattern = re.compile(r'children:\s*\[\s*\{\s*text:\s*\".*?\",\s*_type:\s*\"NavUIItem\",\s*refName:\s*\"work\".*?\}\s*,\s*\{\s*text:\s*\".*?\",\s*_type:\s*\"NavUIItem\",\s*refName:\s*\"contact\".*?\}', re.DOTALL)
new_nav = '''children: [
            { text: "PROJELER", _type: "NavUIItem", refName: "work", children: [] },
            { text: "ANASAYFA", _type: "NavUIItem", refName: "contact", children: [] }'''

js = nav_pattern.sub(new_nav, js)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("Redirection, Filter, and Labels deep-patched successfully.")
