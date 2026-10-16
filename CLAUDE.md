# CLAUDE.md — Milewska Design Website (PWA Portfolio)

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview
Portfolio PWA (Progressive Web App) for interior designer Kasia Milewska (`milewskadesign.github.io`).
- **Tech Stack:** Vanilla HTML5, modern CSS3 (glassmorphic styling, custom properties), Vanilla JavaScript (ES6+), Service Worker (`service-worker.js`), Web App Manifest (`manifest.json`).
- **Target Hosting:** GitHub Pages (production at `https://milewskadesign.github.io`).
- **Local Dev Server:** Docker Compose (`docker-compose.yml`) or lightweight static file server (e.g. `npx serve .`).

## Development & Testing Commands
```bash
# Run local dev container via Docker
docker compose up -d

# Check security headers, assets or minification
bash scripts/bump_cache.sh  # Update PWA service worker cache version
```

## Architectural Guidelines
1. **Zero Framework Overhead:** Do not introduce React, Vue, or heavy node build frameworks unless requested. Keep it lightweight, fast-loading, and mobile-first.
2. **PWA Standards:** Any new assets or script changes require bumping the cache name/version in `service-worker.js` so clients receive updates immediately.
3. **Accessibility & SEO:** Maintain semantic HTML, image `alt` tags, WebP formats with fallback, and high color contrast.