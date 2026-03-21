import os
import re

html_files = [
    r'd:\minadesign\elements\portfoy\index.html',
    r'd:\minadesign\elements\portfoy\about\index.html',
    r'd:\minadesign\elements\portfoy\Network\index.html'
]

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Stronger Font Override for Slogans
    # Targeting the data-item and heading classes with very high specificity
    # We use internal style tag for highest priority after external CSS
    final_style = """
    <style id="final-override">
      /* Slogans and Headings */
      body .h1, body .h2, body ._128, body ._90, body ._72, 
      body [data-item], body .section-title, body .slogan {
        font-family: 'Cormorant Garamond', serif !important;
        font-weight: 300 !important;
      }
      /* Contact Panel Fixes */
      .nav_cta, .nav_cta * {
        color: white !important;
      }
      .nav_cta .nav-mail a {
        background: transparent !important;
        text-decoration: underline !important;
      }
    </style>
    """
    if 'id="final-override"' not in html:
        html = html.replace('</head>', f'    {final_style}\n  </head>')

    # 2. Fix the "İletişim" link structure
    # My previous script might have nested a div inside the link.
    # Revert nesting: <div class="nav_link ...">İletişim</div>
    # Ensure it's just the text or a span that doesn't break JS
    html = re.sub(r'class=\"nav_link[^\"]*\">.*?İletişim.*?</', r'class="nav_link font-gellery">İletişim</', html)
    html = re.sub(r'class=\"nav_link[^\"]*\">.*?Hakkımızda.*?</', r'class="nav_link font-gellery">Hakkımızda</', html)

    # 3. Ensure "İletişime Geçin" (contact panel title) is visible
    html = html.replace('>İletişime Geçin<', ' class="font-gellery" style="color: white !important;">İletişime Geçin<')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

print("Final style overrides applied. Ready for Git push.")
