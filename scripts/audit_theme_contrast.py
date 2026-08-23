#!/usr/bin/env python3
"""
Theme Contrast Auditor for Milewska Design Website.
Audits color contrast ratios across Light and Dark themes to ensure WCAG AA compliance.
"""

import json
import subprocess
import sys
import os
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
RUNNER_JS = SCRIPTS_DIR / "audit_runner.js"
NODE_PATH = "/home/mariusz/.npm/_npx/e41f203b7505f1fb/node_modules"

def run_playwright_audit(url="http://localhost:3000"):
    env = os.environ.copy()
    env["NODE_PATH"] = NODE_PATH

    try:
        proc = subprocess.run(
            ["node", str(RUNNER_JS), url],
            capture_output=True,
            text=True,
            env=env,
            check=True
        )
        return json.loads(proc.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Błąd podczas uruchamiania audytu: {e}")
        if e.stderr:
            print("STDERR:", e.stderr)
        sys.exit(1)

def print_audit_report(data):
    print("\n" + "=" * 75)
    print(" 🎨 RAPORT AUDYTU KONTRASTU MOTYWÓW (WCAG AA)")
    print("=" * 75)

    all_passed = True

    for theme_name, issues in [("☀️ Motyw Jasny (Light Mode)", data["light"]), ("🌙 Motyw Ciemny (Dark Mode)", data["dark"])]:
        print(f"\n{theme_name}:")
        critical_issues = [i for i in issues if not i["passed"]]
        warnings = [i for i in issues if i["passed"] and i["ratio"] < 4.5]

        if not critical_issues and not warnings:
            print("  ✅ Wszystkie zbadane elementy spełniają normę WCAG AA (kontrast >= 4.5:1)!")
        else:
            if critical_issues:
                all_passed = False
                print(f"  ❌ Znaleziono {len(critical_issues)} elementów niespełniających kryterium:")
                for i in critical_issues[:8]:
                    print(f"     • <{i['tag']} class='{i['className']}'> \"{i['text']}\" ➔ Kontrast: {i['ratio']}:1 (Wymagane: {i['minRequired']}:1)")
            if warnings:
                print(f"  ⚠️  Znaleziono {len(warnings)} elementów o dopuszczalnym, lecz niskim kontraście (3.0-4.5:1).")

    print("\n" + "=" * 75)
    if all_passed:
        print("🎉 STATUS AUDYTU: ZDANY (Pełna zgodność z normami WCAG AA)")
    else:
        print("⚠️  STATUS AUDYTU: WYMAGA UWAGI (Wykryto elementy o zbyt niskim kontraście)")
    print("=" * 75 + "\n")

def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
    data = run_playwright_audit(url)
    print_audit_report(data)

if __name__ == "__main__":
    main()
