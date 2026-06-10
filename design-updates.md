# Design Updates Plan

This plan outlines the UI/UX changes requested for the portfolio site.

## Task Breakdown

### 1. Increase "ElysLu" Logo Size & Position
- **Action**: In [style.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.css), increase `.massive-name` font-size to `clamp(8rem, 24vw, 24rem)` (desktop) and `clamp(4.5rem, 20vw, 10rem)` (mobile/tablet) to span almost the entire screen width.
- **Status**: Completed.

### 2. Embed YouTube Shorts & Crop to Square
- **Action**: In [index.html](file:///D:/Khoa%20Lee/IT/For%20babi/index.html), replace `img` inside `.hero-card` with an `iframe` embedding `https://www.youtube.com/embed/2f5aXx50wIQ`.
- **Action**: In [style.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.css), update `.hero-card` to `aspect-ratio: 1 / 1; height: auto;` and crop iframe.
- **Status**: Completed.

### 3. Dynamic Intro Scale Computation
- **Action**: In [app.js](file:///D:/Khoa%20Lee/IT/For%20babi/app.js), calculate `targetFontSize` using computedStyle, and remove unused `initCertificationMarquee`.
- **Status**: Completed.

### 4. Re-style Certification Section as List
- **Action**: In [index.html](file:///D:/Khoa%20Lee/IT/For%20babi/index.html), convert marquee to vertical list rows with an animation tag.
- **Action**: In [style.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.css), style `.cert-list` and `.cert-row`.
- **Status**: Completed.

### 5. Featured Projects Title Marquee & Speed/Casing Adjustments
- **Action**: In [index.html](file:///D:/Khoa%20Lee/IT/For%20babi/index.html), wrap the single line title in a marquee, and push description below.
- **Action**: In [style.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.css), add marquee animation `projectsMarqueeScroll` at `36s` (slow speed) and set `.projects-display-title` to `text-transform: none` (Title Case).
- **Status**: Pending speed and casing updates.

### 6. Add Giant "2026" Footer Number
- **Action**: In [index.html](file:///D:/Khoa%20Lee/IT/For%20babi/index.html), add `.giant-year-container`.
- **Action**: In [style.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.css), style `.giant-year` as solid display text.
- **Status**: Completed.

### 7. Remove Stats Section Below About Me
- **Action**: In [index.html](file:///D:/Khoa%20Lee/IT/For%20babi/index.html), delete the entire `.stats-row` container located below the About Me section.
- **Status**: Pending.

### 8. Tools Section Reveal & Hover Animations
- **Action**: In [index.html](file:///D:/Khoa%20Lee/IT/For%20babi/index.html), add `reveal-fade-up` class to `.tools-full-header` and `.tool-category-row` wrappers.
- **Action**: In [style.css](file:///D:/Khoa%20Lee/IT/For%20babi/style.css), add staggering `transition-delay` rules for `.tools-right-col > .reveal-fade-up`.
- **Action**: Add GPU-accelerated transition and hover animation for `.tool-icon-box` (`translateY` and `scale`) and `.tool-icon-label` (color change).
- **Status**: Pending.
