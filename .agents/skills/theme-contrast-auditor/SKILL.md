---
name: theme-contrast-auditor
description: Automatyczny audyt kontrastu kolorystycznego (WCAG AA 4.5:1) w trybie jasnym i ciemnym przy użyciu silnika Playwright dla projektu Milewska Design Website.
---

# Skill: Theme Contrast Auditor

Użyj tego skilla, aby zweryfikować dostępność i czytelność elementów interfejsu w obu motywach (**Light Mode** i **Dark Mode**) zgodnie ze standardami **WCAG AA** (wymagany kontrast tekstu min. 4.5:1 dla tekstu standardowego oraz 3.0:1 dla nagłówków/dużych elementów).

---

## 🛠️ Procedura Użycia

### 1. Uruchomienie Audytu Playwright:
Upewnij się, że kontener Docker lub serwer deweloperski działa na `http://localhost:3000`, a następnie uruchom:

```bash
python3 scripts/audit_theme_contrast.py [url]
```

Domyślny adres: `http://localhost:3000`.

---

## 🔍 Co weryfikuje skrypt:
1. Uruchamia headless Chromium poprzez Playwright.
2. Odpytuje stronę w trybie **Light Mode** (`data-theme="light"`):
   * Oblicza względną luminancję tekstu i efektywnego tła dla wszystkich nagłówków, akapitów, linków, etykiet, przycisków i kontrolek formularza.
   * Porównuje wyliczony współczynnik z normą WCAG AA.
3. Przełącza motyw na **Dark Mode** (`data-theme="dark"`) i powtarza ewaluację.
4. Generuje szczegółowy raport w konsoli ze wskazaniem dokładnych selektorów CSS, treści elementów oraz wartości kontrastu wymagających poprawy.
