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
    
    # 1. Broad MANTIS -> CARBON replacement (excluding URLs if possible, but the user said replace all)
    # We should be careful about _astro hashes but usually they don't contain MANTIS
    html = html.replace('MANTIS WORKS', 'CARBON')
    html = html.replace('MANTIS', 'CARBON')
    html = html.replace('Mantis', 'CARBON')
    
    # 2. Fix the header contact panel
    # The mail link looks like this (based on my previous edits):
    # <div class="_15 sm_17 relative z-1 nav-mail"><a style="text-decoration: underline;" href="mailto:support@minadesign.eu">support@minadesign.eu</a></div>
    # We want text to be "MAIL" and color white.
    
    # Find the nav contact section
    # Search for the mail addresses and replace with white MAIL links
    # Nav mail
    html = re.sub(
        r'(<div class=\"_15 sm_17 [^>]*nav-mail\">)<a style=\"text-decoration: underline;\" href=\"mailto:support@minadesign.eu\">support@minadesign.eu</a>',
        r'\1<a style="text-decoration: underline; color: white;" href="mailto:support@minadesign.eu">MAIL</a>',
        html
    )
    # The duplicate absolute one
    html = re.sub(
        r'(<div class=\"_15 sm_17 [^>]*nav-mail absolute[^>]*\">)<a style=\"text-decoration: underline;\" href=\"mailto:support@minadesign.eu\">support@minadesign.eu</a>',
        r'\1<a style="text-decoration: underline; color: white;" href="mailto:support@minadesign.eu">MAIL</a>',
        html
    )
    
    # "İletişime geçin" should be white
    # Search for "İletişime geçin" and wrap in a style or add class
    html = html.replace('>İletişime Geçin<', ' style="color: white;">İletişime Geçin<')
    html = html.replace('>Hadi konuşalım<', ' style="color: white;">İletişime Geçin<') # in case some are left
    
    # 3. Footer Copyright
    html = html.replace('© COPYRIGHT 2026 CARBON', '© COPYRIGHT 2026 CARBON') # Already handled by broad replace but making sure

    # 4. Git Push - I will do this in the terminal
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

print("Text replacements and contact panel fixes applied.")
