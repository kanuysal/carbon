import os
import re

html_files = [
    r'd:\minadesign\elements\portfoy\index.html',
    r'd:\minadesign\elements\portfoy\about\index.html',
    r'd:\minadesign\elements\portfoy\Network\index.html'
]

# We will use "Cormorant Garamond" as an elegant, slim serif alternative to "Gellery"
# Unless the user provides the specific font file, this is the best high-end match.
font_link = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet">'

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Add the font link in the head
    if 'fonts.googleapis.com' not in html:
        html = html.replace('</head>', f'    {font_link}\n  </head>')
    
    # 2. Add an inline style to define the GELLERY font-family (using Cormorant as fallback/replica)
    gellery_style = """
    <style>
      .font-gellery {
        font-family: 'Cormorant Garamond', serif !important;
        font-weight: 300;
        text-transform: lowercase; /* Matches the 'hislere dokunuyoruz' style */
      }
      .nav_link, .footer_link, .h1, .h2, [data-item] {
        font-family: 'Cormorant Garamond', serif !important;
      }
      /* Ensure slogans in sections are also Gellery */
      .section-title, .slogan {
        font-family: 'Cormorant Garamond', serif !important;
      }
      /* Fix the contact panel text colors as requested */
      .nav-mail a, .iletisime-gecin-text {
        color: white !important;
      }
    </style>
    """
    if '.font-gellery' not in html:
        html = html.replace('</head>', f'    {gellery_style}\n  </head>')

    # 3. Specifically target slogans and header links
    # Header links: Hakkımızda, İletişim
    html = html.replace('>Hakkımızda<', ' class="font-gellery">Hakkımızda<')
    html = html.replace('>İletişim<', ' class="font-gellery">İletişim<')
    
    # Contact text "İletişime Geçin" (which I previously made white)
    html = html.replace(' style="color: white;">İletişime Geçin<', ' class="font-gellery iletisime-gecin-text" style="color: white;">İletişime Geçin<')
    
    # 4. Final "MAIL" replacement (comprehensive)
    # Ensure support@minadesign.eu text is changed to MAIL in all nav-mail divs
    # This was already partly done, but let's be absolute.
    html = re.sub(r'>support@minadesign\.eu<', '>MAIL<', html)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

print("GELLERY font (via Cormorant Garamond) applied to headers and slogans.")
