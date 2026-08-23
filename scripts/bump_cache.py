#!/usr/bin/env python3
"""
PWA Cache Bumper for Milewska Design Website.
Automatically increments CACHE_NAME in service-worker.js and updates asset query params in index.html.
"""

import sys
import re
import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SW_FILE = PROJECT_ROOT / "service-worker.js"
INDEX_FILE = PROJECT_ROOT / "index.html"

def get_current_version(sw_content: str) -> str:
    match = re.search(r"const\s+CACHE_NAME\s*=\s*['\"]milewska-design-v(\d+\.\d+\.\d+)['\"];", sw_content)
    if match:
        return match.group(1)
    raise ValueError("Nie znaleziono definicji CACHE_NAME w service-worker.js")

def bump_semver(version_str: str, bump_type: str = "patch") -> str:
    major, minor, patch = map(int, version_str.split("."))
    if bump_type == "major":
        return f"{major + 1}.0.0"
    elif bump_type == "minor":
        return f"{major}.{minor + 1}.0"
    elif bump_type == "patch":
        return f"{major}.{minor}.{patch + 1}"
    elif re.match(r"^\d+\.\d+\.\d+$", bump_type):
        return bump_type
    else:
        raise ValueError(f"Nieprawidłowy typ bumpowania: {bump_type} (dozwolone: major, minor, patch, lub np. 2.6.0)")

def update_files(new_version: str):
    if not SW_FILE.exists() or not INDEX_FILE.exists():
        print(f"Błąd: Pliki {SW_FILE} lub {INDEX_FILE} nie istnieją.")
        sys.exit(1)

    # 1. Update service-worker.js
    sw_text = SW_FILE.read_text(encoding="utf-8")
    old_version = get_current_version(sw_text)
    
    new_sw_text = re.sub(
        r"const\s+CACHE_NAME\s*=\s*['\"]milewska-design-v\d+\.\d+\.\d+['\"];",
        f"const CACHE_NAME = 'milewska-design-v{new_version}';",
        sw_text
    )
    SW_FILE.write_text(new_sw_text, encoding="utf-8")

    # 2. Update index.html
    index_text = INDEX_FILE.read_text(encoding="utf-8")
    
    # Replace styles.css?v=...
    new_index_text = re.sub(
        r"styles\.css\?v=\d+\.\d+\.\d+",
        f"styles.css?v={new_version}",
        index_text
    )
    # Replace script.js?v=...
    new_index_text = re.sub(
        r"script\.js\?v=\d+\.\d+\.\d+",
        f"script.js?v={new_version}",
        new_index_text
    )
    INDEX_FILE.write_text(new_index_text, encoding="utf-8")

    print(f"✅ Pomyślnie zaktualizowano wersję cache: v{old_version} ➔ v{new_version}")
    print(f"   • Zmodyfikowano: {SW_FILE.name}")
    print(f"   • Zmodyfikowano: {INDEX_FILE.name} (styles.css?v={new_version}, script.js?v={new_version})")

def main():
    bump_type = sys.argv[1] if len(sys.argv) > 1 else "patch"
    try:
        sw_text = SW_FILE.read_text(encoding="utf-8")
        current_v = get_current_version(sw_text)
        new_v = bump_semver(current_v, bump_type)
        update_files(new_v)
    except Exception as e:
        print(f"❌ Wystąpił błąd: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
