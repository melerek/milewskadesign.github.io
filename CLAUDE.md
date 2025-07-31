# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Pages repository for `milewskadesign.github.io` - a design portfolio website. The repository is currently empty and ready for initial setup.

## Repository Type

This is a GitHub Pages site repository that will be automatically deployed from the `main` branch to `https://milewskadesign.github.io`.

## Development Setup

Since this is a new repository, the development setup will depend on the chosen technology stack. Common options for GitHub Pages include:

### Static Site Options
- **Plain HTML/CSS/JS**: No build process required, files served directly
- **Jekyll**: Ruby-based static site generator (GitHub Pages native support)
- **React/Next.js**: Requires build process and GitHub Actions for deployment
- **Vue/Nuxt**: Requires build process and GitHub Actions for deployment
- **Gatsby**: React-based static site generator

### Common Commands (will vary based on chosen stack)

For Jekyll sites:
```bash
bundle install          # Install dependencies
bundle exec jekyll serve # Run development server
bundle exec jekyll build # Build for production
```

For Node.js-based sites:
```bash
npm install             # Install dependencies  
npm run dev            # Run development server
npm run build          # Build for production
npm run lint           # Run linting
```

## GitHub Pages Deployment

- **Automatic deployment**: Pushes to `main` branch trigger automatic deployment
- **Custom domains**: Configure in repository settings if using custom domain
- **HTTPS**: Automatically enabled for `.github.io` domains

## File Structure Considerations

- `index.html` or `index.md` will serve as the homepage
- `_config.yml` required for Jekyll sites
- `404.html` for custom 404 page
- `CNAME` file if using custom domain
- `robots.txt` and `sitemap.xml` recommended for SEO

## Design Portfolio Specific Notes

As a design portfolio site, consider:
- Responsive design for mobile/tablet viewing
- Image optimization for web performance
- Portfolio gallery/grid layouts
- Contact forms (may require external service)
- SEO optimization for designer discovery