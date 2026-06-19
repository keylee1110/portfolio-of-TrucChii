# Community Project 01 Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the remaining Community Project 01 placeholders with four linked TikTok phone covers, one campaign asset, and one independently scrollable campaign-page phone.

**Architecture:** Keep the static single-page implementation in `project-community-01.html` and reuse its existing phone chassis. Store all source images locally under `assets/`; use CSS for phone presentation and scroll guidance, with a minimal scroll listener for cue state.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Node.js test runner, TikTok oEmbed thumbnail endpoint.

---

## File Structure

- Modify `project-community-01.html`: phone links, campaign asset, scrollable phone markup, styling, and scroll-cue behavior.
- Modify `tests/site.test.mjs`: structural coverage for the four links and newly populated campaign media.
- Create `assets/community-project-01-video-{01..04}.jpg`: stable local TikTok covers.
- Create `assets/community-project-01-campaign-asset.png`: merged campaign asset source.
- Create `assets/community-project-01-campaign-page.png`: long campaign landing-page source.

### Task 1: Add failing structural coverage

**Files:**
- Modify: `tests/site.test.mjs:186`

- [ ] **Step 1: Extend the Community Project 01 test**

Add assertions for the exact video IDs, local thumbnails, scrollable phone hook, campaign images, and removal of the three asset labels:

```js
for (const id of [
  '7518232367668972807',
  '7518005984829213959',
  '7517989704755711239',
  '7517993704393674002',
]) {
  assert.match(html, new RegExp(`tiktoklive_vietnam/video/${id}`));
}
assert.equal((html.match(/class="tiktok-phone-link"/g) || []).length, 4);
assert.equal((html.match(/community-project-01-video-0[1-4]\.jpg/g) || []).length, 4);
assert.match(html, /assets\/community-project-01-campaign-asset\.png/);
assert.match(html, /assets\/community-project-01-campaign-page\.png/);
assert.match(html, /data-scrollable-phone/);
assert.match(html, /overscroll-behavior:\s*contain/);
assert.doesNotMatch(html, />Asset 0[1-3]</);
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run:

```powershell
node --test --test-name-pattern="Community Project 01" tests/site.test.mjs
```

Expected: FAIL because the four links, local covers, campaign asset, and scrollable phone are not present.

### Task 2: Add stable local media assets

**Files:**
- Create: `assets/community-project-01-video-01.jpg`
- Create: `assets/community-project-01-video-02.jpg`
- Create: `assets/community-project-01-video-03.jpg`
- Create: `assets/community-project-01-video-04.jpg`
- Create: `assets/community-project-01-campaign-asset.png`
- Create: `assets/community-project-01-campaign-page.png`

- [ ] **Step 1: Download the four official TikTok oEmbed covers**

Run:

```powershell
$ids = @('7518232367668972807','7518005984829213959','7517989704755711239','7517993704393674002')
for ($index = 0; $index -lt $ids.Count; $index++) {
  $videoUrl = "https://www.tiktok.com/@tiktoklive_vietnam/video/$($ids[$index])"
  $oembedUrl = "https://www.tiktok.com/oembed?url=$([uri]::EscapeDataString($videoUrl))"
  $data = Invoke-RestMethod -Uri $oembedUrl
  $number = ($index + 1).ToString('00')
  Invoke-WebRequest -Uri $data.thumbnail_url -OutFile "assets/community-project-01-video-$number.jpg"
}
```

Expected: four non-empty JPEG files with 9:16 TikTok covers.

- [ ] **Step 2: Copy the supplied campaign sources into stable asset paths**

Run:

```powershell
Copy-Item -LiteralPath 'ref/project 2/assest placehplder.png' -Destination 'assets/community-project-01-campaign-asset.png'
Copy-Item -LiteralPath 'ref/project 2/Campaign Page Placeholder.png' -Destination 'assets/community-project-01-campaign-page.png'
```

Expected: both local PNG assets exist and are non-empty.

### Task 3: Populate the four promotional phone cards

**Files:**
- Modify: `project-community-01.html:322-385`
- Modify: `project-community-01.html:677-706`

- [ ] **Step 1: Add the LIVE FEST cover and play styles**

Insert after `.phone-screen`:

```css
.tiktok-phone-link {
    position: absolute;
    inset: 0;
    display: block;
    overflow: hidden;
    border-radius: inherit;
}

.tiktok-phone-cover {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease;
}

.tiktok-phone-link:hover .tiktok-phone-cover,
.tiktok-phone-link:focus-visible .tiktok-phone-cover {
    transform: scale(1.035);
    filter: brightness(0.82);
}

.tiktok-phone-link:focus-visible {
    outline: 2px solid #fff;
    outline-offset: -5px;
}

.tiktok-phone-play {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 48px;
    height: 48px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.72);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    transform: translate(-50%, -50%);
}

.tiktok-phone-play::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 53%;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 11px solid #fff;
    transform: translate(-35%, -50%);
}
```

- [ ] **Step 2: Replace the four labels with linked covers**

Use this structure for slots 01–04, changing the ID, filename, label, width, and height to the downloaded thumbnail dimensions:

```html
<div class="phone-card">
    <div class="phone-chassis">
        <div class="phone-notch"></div>
        <div class="phone-screen">
            <a class="tiktok-phone-link"
                href="https://www.tiktok.com/@tiktoklive_vietnam/video/7518232367668972807?is_from_webapp=1&amp;sender_device=pc"
                target="_blank" rel="noopener noreferrer"
                aria-label="Watch Community Fest promotional video 01 on TikTok">
                <img class="tiktok-phone-cover" src="assets/community-project-01-video-01.jpg"
                    alt="" width="720" height="1280" decoding="async">
                <span class="tiktok-phone-play" aria-hidden="true"></span>
            </a>
        </div>
    </div>
</div>
```

- [ ] **Step 3: Run the focused test**

Run:

```powershell
node --test --test-name-pattern="Community Project 01" tests/site.test.mjs
```

Expected: video URL and thumbnail assertions pass; campaign media assertions still fail.

### Task 4: Build the large campaign asset and scrollable phone

**Files:**
- Modify: `project-community-01.html:447-488`
- Modify: `project-community-01.html:740-757`
- Modify: `project-community-01.html:790-815`

- [ ] **Step 1: Replace campaign asset grid styles and add scroll phone styles**

```css
.campaign-assets {
    display: block;
}

.campaign-asset {
    width: 100%;
    min-height: 0;
    aspect-ratio: auto;
    transform: none;
}

.campaign-asset .media-image {
    height: auto;
    object-fit: contain;
}

.scrollable-phone-screen {
    position: relative;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scrollbar-width: none;
    touch-action: pan-y;
}

.scrollable-phone-screen::-webkit-scrollbar {
    display: none;
}

.campaign-page-image {
    display: block;
    width: 100%;
    height: auto;
    user-select: none;
}

.phone-scroll-cue {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 3;
    display: grid;
    justify-items: center;
    gap: 5px;
    padding: 9px 11px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.76);
    color: #fff;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    pointer-events: none;
    transition: opacity 250ms ease, transform 250ms ease;
}

.phone-scroll-cue::after {
    content: '↓';
    animation: phone-scroll-hint 1.25s ease-in-out infinite;
}

.revenue-phone.is-scrolled .phone-scroll-cue {
    opacity: 0;
    transform: translateY(8px);
}

@keyframes phone-scroll-hint {
    0%, 100% { transform: translateY(-2px); opacity: 0.55; }
    50% { transform: translateY(3px); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
    .phone-scroll-cue::after { animation: none; }
}
```

- [ ] **Step 2: Replace the campaign phone placeholder**

```html
<div class="revenue-phone phone-card" data-scrollable-phone-frame>
    <div class="phone-chassis">
        <div class="phone-notch"></div>
        <div class="phone-screen scrollable-phone-screen" data-scrollable-phone tabindex="0"
            aria-label="Scrollable Community Fest campaign page preview">
            <img class="campaign-page-image" src="assets/community-project-01-campaign-page.png"
                alt="Community Fest campaign landing page" decoding="async" draggable="false">
        </div>
        <span class="phone-scroll-cue" aria-hidden="true">Scroll inside</span>
    </div>
</div>
```

- [ ] **Step 3: Replace three asset placeholders with one image**

```html
<div class="campaign-assets">
    <div class="media-placeholder campaign-asset has-media">
        <img class="media-image" src="assets/community-project-01-campaign-asset.png"
            alt="Community Fest campaign creative assets" decoding="async">
    </div>
</div>
```

- [ ] **Step 4: Add scroll-cue state behavior before `app.js`**

```js
const scrollablePhone = document.querySelector('[data-scrollable-phone]');
const scrollablePhoneFrame = document.querySelector('[data-scrollable-phone-frame]');
if (scrollablePhone && scrollablePhoneFrame) {
    scrollablePhone.addEventListener('scroll', () => {
        scrollablePhoneFrame.classList.toggle('is-scrolled', scrollablePhone.scrollTop > 16);
    }, { passive: true });
}
```

- [ ] **Step 5: Run focused tests**

Run:

```powershell
node --test --test-name-pattern="Community Project 01|all local HTML" tests/site.test.mjs
```

Expected: PASS.

### Task 5: Browser QA and final verification

**Files:**
- Verify: `project-community-01.html`

- [ ] **Step 1: Verify desktop at 1440×900**

Open `http://127.0.0.1:4173/project-community-01.html?verify=1`, confirm all six new assets decode, the four phones remain aligned, the campaign asset is one block, and no horizontal overflow occurs.

- [ ] **Step 2: Exercise campaign phone scrolling**

Focus the element `[data-scrollable-phone]`, scroll it, and verify `scrollTop` increases while the outer document scroll position does not change. Confirm the `is-scrolled` class hides the cue.

- [ ] **Step 3: Verify mobile at 390×844**

Confirm the promotional phones form two columns, revenue content stacks, the campaign page is touch-scrollable, and the document has no horizontal overflow.

- [ ] **Step 4: Run final checks**

```powershell
node --test --test-name-pattern="Community Project 01|all local HTML" tests/site.test.mjs
git diff --check
```

Expected: focused tests pass and `git diff --check` reports no errors.
