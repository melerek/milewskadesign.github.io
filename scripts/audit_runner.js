const { chromium } = require('playwright');
const fs = require('fs');

function auditFunction() {
    function parseRgb(colorStr) {
        if (!colorStr) return [0, 0, 0, 1];
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
            return [
                parseInt(match[1]),
                parseInt(match[2]),
                parseInt(match[3]),
                match[4] !== undefined ? parseFloat(match[4]) : 1.0
            ];
        }
        return [0, 0, 0, 1];
    }

    function getLuminance(r, g, b) {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrastRatio(rgb1, rgb2) {
        const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
        const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    function getEffectiveBg(el) {
        let cur = el;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        while (cur && cur !== document.documentElement) {
            if (cur.tagName === 'NAV' || (cur.classList && cur.classList.contains('navbar'))) {
                return isDark ? [20, 28, 27, 1] : [255, 255, 255, 1];
            }
            if (cur.classList) {
                if (cur.classList.contains('hero') || cur.classList.contains('hero-overlay') || cur.classList.contains('hero-content') || cur.classList.contains('portfolio-overlay')) {
                    return [28, 39, 38, 1];
                }
                if (cur.classList.contains('package-header') || cur.classList.contains('stage-header') || cur.classList.contains('popular-badge')) {
                    return [109, 84, 72, 1];
                }
            }
            const style = window.getComputedStyle(cur);
            const bg = style.backgroundColor;
            const [r, g, b, a] = parseRgb(bg);
            if (a > 0.1) {
                return [r, g, b, a];
            }
            cur = cur.parentElement;
        }
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        const [r, g, b, a] = parseRgb(bodyBg);
        return a > 0.1 ? [r, g, b, a] : [255, 255, 255, 1];
    }

    const selectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'a', 'span', 'label',
        'select', 'textarea', 'button', '.btn', '.nav-menu a',
        '.consent-label', '.card-val', '.card-label', '.custom-select'
    ];

    const results = [];
    const elements = document.querySelectorAll(selectors.join(','));

    elements.forEach(el => {
        if (!el.offsetParent && el.tagName !== 'BODY') return; // hidden
        if (el.closest('.skip-to-content') || el.closest('.fullscreen-menu') || el.closest('[aria-hidden="true"]') || el.classList.contains('carousel-dot')) return;

        const style = window.getComputedStyle(el);
        const text = (el.innerText || el.placeholder || el.value || el.getAttribute('aria-label') || '').trim();
        if (!text || text.length > 80) return;

        const textColor = parseRgb(style.color);
        const bgColor = getEffectiveBg(el);
        const ratio = getContrastRatio(textColor, bgColor);
        const fontSize = parseFloat(style.fontSize) || 16;
        const isBold = parseInt(style.fontWeight) >= 600 || style.fontWeight === 'bold';
        const isLargeText = fontSize >= 24 || (fontSize >= 18.5 && isBold);
        const minRatio = isLargeText ? 3.0 : 4.5;
        const passed = ratio >= minRatio;

        if (!passed || ratio < 4.5) {
            results.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className || '').toString().substring(0, 30),
                id: el.id || '',
                text: text.substring(0, 40).replace(/\s+/g, ' '),
                ratio: Math.round(ratio * 100) / 100,
                minRequired: minRatio,
                passed: passed,
                color: style.color,
                bg: `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`
            });
        }
    });

    return results;
}

(async () => {
    const url = process.argv[2] || 'http://localhost:3000';
    const chromePath = '/home/mariusz/.cache/ms-playwright/chromium-1237/chrome-linux64/chrome';

    const browser = await chromium.launch({
        headless: true,
        executablePath: chromePath,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '*, *::before, *::after, html, body { transition: none !important; animation: none !important; }' });

    // 1. Audit Light Mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(500);
    const lightResults = await page.evaluate(auditFunction);

    // 2. Audit Dark Mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(500);
    const darkResults = await page.evaluate(auditFunction);

    await browser.close();

    console.log(JSON.stringify({ light: lightResults, dark: darkResults }, null, 2));
})();
