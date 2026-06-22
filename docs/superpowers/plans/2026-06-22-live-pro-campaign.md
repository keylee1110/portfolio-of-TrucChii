# Live Pro Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Product Launch Campaign project with a responsive five-section LIVE PRO CAMPAIGN case study whose media remains placeholder-only and whose four phone frames link to the supplied TikTok videos.

**Architecture:** Use `project-live-pro.html` as the Project 03 route and keep page-local markup and styles so unrelated project pages remain isolated. Update the project listings and extend the existing Node regression suite to lock the title, section order, media, and external destinations.

**Tech Stack:** Vanilla HTML5, CSS3, Node.js built-in test runner, existing Python minifier.

---

### Task 1: Lock the new project contract in regression tests

**Files:**
- Modify: `tests/site.test.mjs`

- [ ] **Step 1: Update the project registry title**

Replace `['project-launch.html', 'Product Launch Campaign']` with:

```js
['project-launch.html', 'LIVE PRO CAMPAIGN']
```

- [ ] **Step 2: Add the failing case-study test**

```js
test('LIVE PRO CAMPAIGN follows the approved five-section placeholder story', () => {
  const html = read('project-launch.html');
  const orderedSections = [
    'data-section="campaign-overview"',
    'data-section="research-strategy"',
    'data-section="campaign-results"',
    'data-section="creator-rewards"',
    'data-section="recognition-videos"',
  ];
  let previous = -1;
  for (const marker of orderedSections) {
    const current = html.indexOf(marker);
    assert.ok(current > previous, `${marker} is missing or out of order`);
    previous = current;
  }
  assert.equal((html.match(/data-media-placeholder/g) || []).length, 11);
  assert.equal((html.match(/class="live-pro-phone-link"/g) || []).length, 4);
  for (const id of ['7550218638649789714', '7575815911777635592', '7576529267064950036', '7587673281524780308']) {
    assert.match(html, new RegExp(`tiktoklive_vietnam/video/${id}`));
  }
  assert.doesNotMatch(html, /<img\b/i);
});
```

- [ ] **Step 3: Run the tests and verify the intended failure**

Run: `npm test`

Expected: the project title assertion and the new LIVE PRO section test fail because the old page is still present.

### Task 2: Rebuild the project detail page

**Files:**
- Modify: `project-live-pro.html`

- [ ] **Step 1: Replace metadata and page identity**

Use `LIVE PRO CAMPAIGN - ElysLu` for title and Open Graph title, describe the recurring TikTok LIVE creator growth campaign, and remove the old campaign image metadata.

- [ ] **Step 2: Add isolated page-local visual primitives**

Define `.live-pro-page`, `.live-pro-hero`, `.live-pro-metrics`, `.live-pro-placeholder`, `.live-pro-research`, `.live-pro-results-grid`, `.live-pro-rewards`, `.live-pro-phones`, `.live-pro-phone`, and `.live-pro-phone-link` styles. Use solid black, white, subtle borders, editorial serif headings, and a faint red-violet section wash. At `max-width: 768px`, stack split layouts and use a horizontally scrollable phone row with scroll snap.

- [ ] **Step 3: Build the five ordered sections**

Create exactly these section markers:

```html
<section data-section="campaign-overview">...</section>
<section data-section="research-strategy">...</section>
<section data-section="campaign-results">...</section>
<section data-section="creator-rewards">...</section>
<section data-section="recognition-videos">...</section>
```

Use eleven elements bearing `data-media-placeholder`: overview hero (1), research visual (1), four result visuals (4), reward visual (1), and four phone screens (4). All visible media surfaces must be CSS placeholders and the page must contain no `<img>` element.

- [ ] **Step 4: Add four accessible linked phone frames**

Each phone uses this complete interaction pattern with its corresponding URL:

```html
<article class="live-pro-phone">
  <a class="live-pro-phone-link" href="TIKTOK_URL" target="_blank" rel="noopener noreferrer" aria-label="Watch creator recognition video 1 on TikTok">
    <span class="live-pro-phone-notch" aria-hidden="true"></span>
    <span class="live-pro-phone-screen" data-media-placeholder>
      <span class="live-pro-play" aria-hidden="true"></span>
      <span class="live-pro-placeholder-label">VIDEO PLACEHOLDER 01</span>
    </span>
  </a>
</article>
```

- [ ] **Step 5: Preserve project navigation and shared behavior**

Keep the existing header, mobile drawer, previous/next project buttons, footer, and `app.js?v=20260621` script reference.

### Task 3: Rename Project 2 in project listings

**Files:**
- Modify: `index.html`
- Modify: `work.html`

- [ ] **Step 1: Update the homepage project card**

Replace Product Launch Campaign labels and alt text with `LIVE PRO CAMPAIGN`, and update the short description to creator growth, recurring LIVE campaign mechanics, and revenue optimization.

- [ ] **Step 2: Update the Work archive entry**

Use heading `LIVE PRO CAMPAIGN`, alt text `LIVE PRO CAMPAIGN placeholder thumbnail`, and discipline line `Creator Growth / Campaign Strategy`.

### Task 4: Verify and build production assets

**Files:**
- Verify: `project-live-pro.html`
- Verify: `index.html`
- Verify: `work.html`
- Verify: `tests/site.test.mjs`

- [ ] **Step 1: Run regression tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Rebuild generated assets**

Run: `npm run minify`

Expected: the minifier completes successfully without changing page-local CSS.

- [ ] **Step 3: Run regression tests after the build**

Run: `npm test`

Expected: all tests pass with generated production files present.

- [ ] **Step 4: Inspect the final diff**

Run: `git diff -- project-live-pro.html index.html work.html tests/site.test.mjs`

Expected: only the LIVE PRO page, two listing labels, and focused regression coverage have changed; unrelated working-tree files are absent.
