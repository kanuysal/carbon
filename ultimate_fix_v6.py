import os
import re

js_path = r"assets/js/app.1746999829739.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Correct any double/incorrect mailto found in my previous thought
js = js.replace('support@mailto:support@minadesign.eu', 'support@minadesign.eu')
js = js.replace('https://carbon.mailto:support@minadesign.eu', 'mailto:support@minadesign.eu')
js = js.replace('https://mailto:support@minadesign.eu', 'mailto:support@minadesign.eu')
js = js.replace('mailto:mailto:support@minadesign.eu', 'mailto:support@minadesign.eu')

# 2. Set 'ANASAYFA' link to '/site'
# Search for window.location.href replacements.
js = js.replace("window.location.href = 'biz.html';", "window.location.href = '/site';")
js = js.replace("window.location.href = 'site.html';", "window.location.href = '/site';")

# 3. Fix 'WEB SITELERI' filter (Currently returning empty as not many items are tagged "Website")
# Setting the tag to null usually shows all or ignores the filter.
js = js.replace('"-> web siteleri", "Website"', '"-> web siteleri", null')

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("Double mailto cleaned. ANASAYFA -> /site. WEB SITELERI -> null.")
