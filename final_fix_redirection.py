import os
import re

js_path = r"assets/js/app.1746999829739.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update Navigation link for contact (ANASAYFA) to '/site'
# From window.location.href = 'biz.html'; to '/site' 
# (Addressing both possible patterns from previous patches)
js = js.replace("window.location.href = 'biz.html';", "window.location.href = '/site';")
js = js.replace("window.location.href = 'site.html';", "window.location.href = '/site';")

# Correct the double mailto issue
js = js.replace("mailto:support@mailto:support@minadesign.eu", "mailto:support@minadesign.eu")
js = js.replace("mailto:mailto:support@minadesign.eu", "mailto:support@minadesign.eu")

# 2. Update Filter for "WEB SITELERI" to show ALL
# Change tag "Website" to null
js = js.replace('"-> web siteleri", "Website"', '"-> web siteleri", null')

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("Final adjustments done: ANASAYFA -> /site, WEB SITELERI -> null (All).")
