---
name: pwa-cache-bumper
description: Automatyczne podbijanie wersji Service Workera (CACHE_NAME) oraz parametrów cache-busting dla plików styles.css i script.js w index.html przy każdej modyfikacji kodu frontendowego.
---

# Skill: PWA Cache Bumper

Użyj tego skilla za każdym razem, gdy wprowadzasz zmiany w plikach `styles.css`, `script.js` lub innych zasobach statycznych projektu **Milewska Design Website**, aby zapobiec serwowaniu nieaktualnych wersji z pamięci podręcznej przeglądarki użytkownika.

---

## 🛠️ Procedura Użycia

### 1. Uruchomienie Automatycznego Bumpera:
W katalogu projektu uruchom dedykowany skrypt:

```bash
python3 scripts/bump_cache.py [patch|minor|major|<wersja>]
```

* **Domyślnie (`patch`):** Podbija najniższą wersję (np. `2.5.0` ➔ `2.5.1`).
* **`minor`:** Podbija wersję po dodaniu nowych modułów/sekcji (np. `2.5.0` ➔ `2.6.0`).
* **`major`:** Podbija wersję przy gruntownym redesignie (np. `2.5.0` ➔ `3.0.0`).
* **Jawna wersja:** Można podać konkretny numer, np. `2.5.5`.

---

## 🔍 Co wykonuje skrypt:
1. Odczytuje bieżącą stałą `CACHE_NAME` z `service-worker.js`.
2. Aktualizuje `service-worker.js` do nowej wersji (`milewska-design-vX.Y.Z`).
3. Aktualizuje wszystkie wystąpienia `styles.css?v=X.Y.Z` oraz `script.js?v=X.Y.Z` w pliku `index.html`.
4. Wypisuje potwierdzenie z listą zmodyfikowanych plików.
