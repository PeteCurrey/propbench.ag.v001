#!/usr/bin/env python3
"""
Download woff2 font files from Google Fonts for next/font/local.
Saves to src/app/fonts/ — one file per (family, weight) for the latin subset.
"""
import re
import urllib.request
import urllib.error
import os
import sys

OUT_DIR = "src/app/fonts"
os.makedirs(OUT_DIR, exist_ok=True)

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)

# Fetch CSS for all three families
CSS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Syne:wght@600;800"
    "&family=DM+Sans:opsz,wght@9..40,400;9..40,500"
    "&family=DM+Mono:wght@400;500"
    "&display=swap"
)

print(f"Fetching Google Fonts CSS from:\n  {CSS_URL}\n")
req = urllib.request.Request(CSS_URL, headers={"User-Agent": USER_AGENT})
try:
    css = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
except urllib.error.URLError as e:
    print(f"ERROR: Could not fetch CSS: {e}")
    sys.exit(1)

# Parse @font-face blocks — keep last occurrence per (family, weight)
# (Google Fonts orders: latin-ext, latin last, so last = latin subset)
blocks = re.findall(r"@font-face\s*\{[^}]+\}", css, re.DOTALL)

# { "FamilyName-weight": (url, filename) }
downloads: dict[str, tuple[str, str]] = {}

for block in blocks:
    fam_m = re.search(r"font-family:\s*['\"]?([^;'\"]+)['\"]?", block)
    wgt_m = re.search(r"font-weight:\s*(\S+)", block)
    url_m = re.search(r"url\(([^)]+)\)\s*format\(['\"]woff2['\"]\)", block)

    if not (fam_m and wgt_m and url_m):
        continue

    family = fam_m.group(1).strip()
    weight = wgt_m.group(1).strip()
    font_url = url_m.group(1).strip()

    # Build a clean filename: e.g. syne-600.woff2, dm-sans-400.woff2
    slug = family.lower().replace(" ", "-")
    filename = f"{slug}-{weight}.woff2"
    key = f"{slug}-{weight}"
    downloads[key] = (font_url, filename)

if not downloads:
    print("ERROR: No woff2 URLs found in CSS response.")
    print("--- CSS response ---")
    print(css[:2000])
    sys.exit(1)

print(f"Found {len(downloads)} font file(s) to download:\n")
errors = 0
for key, (url, filename) in sorted(downloads.items()):
    dest = os.path.join(OUT_DIR, filename)
    try:
        data = urllib.request.urlopen(url, timeout=30).read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"  ✓  {filename:35s} ({len(data):,} bytes)")
    except Exception as e:
        print(f"  ✗  {filename:35s} FAILED: {e}")
        errors += 1

print()
if errors:
    print(f"ERROR: {errors} download(s) failed.")
    sys.exit(1)
else:
    print("All fonts downloaded successfully.")
