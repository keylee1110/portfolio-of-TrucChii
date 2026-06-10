# ElysLu Selective Portfolio Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the lower half of the existing ElysLu portfolio with eight layered projects, a sticky Work index, five editable project placeholders, selective section restyling, and a six-item Certification marquee.

**Architecture:** Preserve the existing static HTML/CSS/JavaScript architecture. Lock the Hero, About, and Skills & Tools markup with regression hashes; make scoped additions below those sections; keep interactions progressively enhanced and accessible.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, static Vercel hosting.

---

### Task 1: Regression Contract And Checklist

**Files:**
- Create: `task.md`
- Create: `tests/site.test.mjs`

- [ ] Record all implementation tasks and live statuses in `task.md`.
- [ ] Add tests for locked section hashes, eight homepage projects, removed Results, Work page inventory, eight detail pages, six certifications, ElysLu branding, local assets, and JavaScript parsing.
- [ ] Run `node --test tests/site.test.mjs` and confirm failures describe missing new behavior.

### Task 2: Featured Projects And Work Index

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `app.js`
- Create: `work.html`

- [ ] Replace the three-card campaign grid with exactly eight layered cards.
- [ ] Add base image, foreground layer, sliding rails, View action, title, number, category, and `See All Works`.
- [ ] Build the approved sticky two-column Work page with the same eight projects.
- [ ] Add desktop hover/focus behavior and complete mobile resting states.
- [ ] Run the structural tests until project and Work assertions pass.

### Task 3: Five Editable Project Placeholders

**Files:**
- Modify: `project-awareness.html`
- Modify: `project-launch.html`
- Modify: `project-ugc.html`
- Create: `project-placeholder-04.html`
- Create: `project-placeholder-05.html`
- Create: `project-placeholder-06.html`
- Create: `project-placeholder-07.html`
- Create: `project-placeholder-08.html`

- [ ] Normalize ElysLu metadata and navigation on the existing three pages.
- [ ] Create five explicit placeholder case studies without invented claims.
- [ ] Connect all eight pages through previous/next project navigation.
- [ ] Run link, placeholder, and branding tests.

### Task 4: Lower Homepage Sections

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] Remove Results.
- [ ] Preserve and restyle Case Study, Expertise, Archive, Testimonials, Practice, and Contact.
- [ ] Rename References to Testimonials while retaining testimonial content.
- [ ] Add Certification after Practice and before Contact with six editable marquee items.
- [ ] Run section-order and certification tests.

### Task 5: Interactions, Brand Cleanup, And Responsive Behavior

**Files:**
- Modify: `app.js`
- Modify: `style.css`
- Modify: production HTML files

- [ ] Add project pointer/focus interaction without hiding content on touch.
- [ ] Add Certification pause/emphasis and reduced-motion behavior.
- [ ] Normalize every remaining TrucLu string and contact/download reference to ElysLu.
- [ ] Verify sticky Work behavior, responsive layouts, focus states, and no horizontal page overflow.

### Task 6: Full Verification

**Files:**
- Update: `task.md`

- [ ] Run `node --test tests/site.test.mjs`.
- [ ] Run `node --check app.js`.
- [ ] Start a local static server and request all ten production pages.
- [ ] Inspect homepage and Work page in desktop and mobile browser sizes.
- [ ] Check browser console, keyboard navigation, reduced motion, and project links.
- [ ] Mark `task.md` complete only after all verification evidence is fresh.
