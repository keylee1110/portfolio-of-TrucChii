# ElysLu Portfolio - Codebase Map & Context

This document serves as the structural guide and context map for AI agents working on the ElysLu Digital Marketing Portfolio. Always consult this file before making modifications to ensure system integrity.

## 🛠️ Tech Stack & Architecture
- **Core**: Vanilla HTML5, Vanilla JavaScript, Vanilla CSS3.
- **Styling**: Modern Swiss-Brutalist design system, custom CSS variables, and fluid typography.
- **Build System**: Python-based minifier script for CSS and JS assets.
- **Testing**: Node.js automated regression test suite using ESM modules.

---

## 📁 File Structure & Directory Inventory

```
D:/Khoa Lee/IT/For babi/
├── .agents/                 # AI behaviors, workflows, and persistent memory
├── .scripts/
│   ├── minify.py            # Minifies source CSS and JS files
│   └── compress_images.py   # Compresses project assets
├── assets/                  # Brand photoshoots, local fonts, and icons
├── public/                  # Static assets and project thumbnails
├── tests/
│   └── site.test.mjs        # Automated browser/logic regression tests
├── index.html               # Main portfolio landing page
├── work.html                # Work archive list page
├── project-*.html           # Individual project detail sub-pages
├── style.src.css            # Source CSS file (EDIT THIS FILE for styles)
├── style.css                # Minified production CSS (Auto-generated)
├── app.src.js               # Source JS logic (EDIT THIS FILE for scripts)
├── app.js                   # Minified production JS (Auto-generated)
└── package.json             # NPM scripts and project metadata
```

---

## 🔄 File Dependencies & Compilation Workflow

```mermaid
graph TD
    style.src.css[style.src.css] -->|python .scripts/minify.py| style.css[style.css]
    app.src.js[app.src.js] -->|python .scripts/minify.py| app.js[app.js]
    index.html -->|Loads| style.css
    index.html -->|Loads| app.js
```

### ⚠️ Critical Development Rules:
1. **Never edit `style.css` or `app.js` directly**: These are production files compiled by the minifier. Always apply styling changes to [style.src.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.src.css) and script changes to [app.src.js](file:///D:/Khoa%20Lee/IT/For%20babi/app.src.js).
2. **Run Minification**: After making any source edits, run `npm run minify` to rebuild production assets.
3. **Run Regression Tests**: After rebuilding, always run `npm run test` to verify no layout order, project links, or branding criteria are broken.
4. **Branding Integrity**: Ensure the canonical brand name remains **ElysLu** across all metadata, headers, downloads, and pages.

---

## ⚙️ Key Component Configurations

### 1. ScrollStack (Featured Projects Section)
- **Container**: `.scroll-stack-container` (Desktop spacing: `gap: 410px`).
- **Cards**: `.project-card-wrapper` (Sticky top position: `top: 56px` to sit flush under the scrolled sticky nav).
- **JS Parameters** (in `app.src.js` -> `initProjectsScrollStack`):
  - `stackPositionOffset = 56` (matches scrolled navbar height)
  - `itemStackDistance = 0` (stacked directly on top of each other)
  - `baseScale = 0.75` (scale down factor)
  - `itemScale = 0.03` (scale increment)

### 2. Massive Wordmark Ticker
- **Text Class**: `.massive-name` (Desktop sizing: `clamp(8rem, 34vw, 48rem)` with centered overflow `margin: 0 -100%`).
- **Container Class**: `.massive-name-container` (Desktop spacing: `padding-bottom: 100px` to shift the CTA button downwards).
