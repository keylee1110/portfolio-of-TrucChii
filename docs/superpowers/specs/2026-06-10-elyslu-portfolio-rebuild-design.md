# ElysLu Portfolio Rebuild Design

## Goal

Rebuild the existing portfolio into a clean, maintainable static website while
preserving its current content and case studies. The Framer exports are visual
and motion references only; they are not production source code.

The canonical brand name is **ElysLu**. All remaining `TrucLu` names, domains,
email placeholders, metadata, download names, and visible copy will be
normalized to ElysLu.

## Architecture

Keep the project dependency-light and deployable as a static Vercel site:

```text
/
|-- index.html
|-- work.html
|-- project-awareness.html
|-- project-launch.html
|-- project-ugc.html
|-- project-placeholder-04.html
|-- project-placeholder-05.html
|-- assets/
|   |-- images/
|   `-- fonts/
|-- css/
|   |-- tokens.css
|   |-- base.css
|   |-- components.css
|   |-- home.css
|   |-- project.css
|   `-- responsive.css
|-- js/
|   |-- main.js
|   |-- navigation.js
|   |-- motion.js
|   `-- portfolio.js
`-- vercel.json
```

HTML remains semantic and directly editable. CSS is split by responsibility.
JavaScript modules initialize independently and must fail safely when a page
does not contain their target elements.

## Visual Direction

Use the Framer reference's monochrome editorial language:

- Black background, white typography, restrained gray borders.
- Large display typography and asymmetric project composition.
- Sharp rectangular surfaces with selective rounded media.
- Generous spacing and strong typographic hierarchy.
- Existing campaign imagery and portfolio content remain the primary assets.

The result should feel authored for ElysLu rather than copied from the Palmer
template. Framer-specific badges, links, names, and generated markup are not
carried over.

## Homepage

The homepage retains these content groups:

1. Sticky navigation and mobile menu.
2. Editorial hero with ElysLu wordmark.
3. Positioning/about section.
4. Skills and tools.
5. Five featured project cards.
6. Results and campaign details.
7. Archive, testimonials, and contact footer.

Long sections may be visually simplified, but no meaningful portfolio content
or case-study link will be removed.

The homepage does not include a Services section. Service-related content from
the Framer reference is intentionally excluded.

## Work Index

`work.html` is the complete project archive and mirrors the purpose of the
Framer reference's `/work` route without copying its generated implementation.

It contains:

- An editorial page introduction.
- All five projects in a responsive asymmetric grid.
- Project number, title, category, year, image, and short summary.
- Direct links to the five case-study pages.
- Shared ElysLu navigation, page transition, and footer.

The homepage and Work page use the same project card markup and styling so
future edits remain consistent.

## Featured Project Interaction

Exactly five project cards appear on both the homepage and Work page. Each card
uses explicit visual layers:

- Base image with subtle scale and contrast shift.
- Optional foreground layer for depth where a suitable transparent asset
  exists.
- Horizontal category rails such as `Branding`, `Campaign`, and `Strategy`.
- A masked `View Project` action.
- Project number, title, category, and year outside the media frame.

Desktop uses pointer hover and focus timelines. Touch devices use the composed
resting state plus scroll reveal, so no content depends on hover.

## Motion

GSAP and ScrollTrigger are used only for coordinated motion:

- Intro wordmark timeline.
- Hero text reveal.
- Project card layer timelines.
- Section reveal/stagger.
- Page enter and exit transitions.

CSS handles simple hover states and reduced-motion fallback. If GSAP fails to
load, content remains visible and navigation remains functional. Motion only
animates transform, opacity, and clipping where practical.

`prefers-reduced-motion: reduce` disables non-essential movement and removes
transition delays.

## Case Studies

Five case-study pages share:

- Consistent ElysLu navigation and footer.
- Shared project-page typography and spacing.
- Project hero, metadata, challenge, approach, execution, and results.
- Previous/next project navigation.
- The same page transition system as the homepage.

The first three case studies retain their existing content and imagery unless
duplicated or clearly placeholder text.

Project 04 and Project 05 use visibly editable placeholder content. They must:

- Be labeled `Project 04` and `Project 05` in source comments and metadata.
- Avoid invented client names, testimonials, campaign metrics, or claims.
- Use headings such as `Replace with project title` and copy that explicitly
  tells the editor what information belongs there.
- Reuse local portfolio imagery temporarily, with comments marking each image
  for replacement.
- Participate in the same previous/next project navigation loop.

## Content And Brand Rules

- Canonical display name: `ElysLu`.
- Canonical filename prefix for downloads: `ElysLu_`.
- Canonical storage prefix: `elyslu_`.
- Canonical placeholder domain: `elyslumarketing.com`.
- Canonical placeholder contact: `hello@elyslumarketing.com`.
- Copyright year: `2026`.
- No `TrucLu`, Framer template branding, dummy email, or template CTA remains
  in production pages.

## Accessibility

- Semantic landmarks and one clear `h1` per page.
- Keyboard-visible focus states.
- Buttons for controls and links for navigation.
- Mobile menu exposes `aria-expanded` and closes on Escape.
- Project hover content is also available to keyboard and touch users.
- Decorative images use empty alt text; informative images use concise alt
  text.
- Contrast and touch targets meet common WCAG AA expectations.

## Performance

- Production pages do not depend on Framer CDN assets.
- Remove references to missing local fonts.
- Use local project images with explicit dimensions where possible.
- Defer JavaScript and avoid blocking animation initialization.
- Keep GSAP as the only animation dependency.
- The site remains deployable without a build command.

## Verification

Automated checks will cover:

- No stale `TrucLu` or template branding in production files.
- No Services section in `index.html` or `work.html`.
- Exactly five featured project links on the homepage.
- Exactly five project entries on the Work page.
- Exactly five reachable case-study pages.
- Every local HTML asset reference resolves.
- Every internal page link resolves.
- Required landmarks, titles, and project links exist.
- JavaScript files parse successfully.
- The local server returns the homepage, Work page, and all five case-study
  pages successfully.

Browser verification will cover desktop and mobile layouts, keyboard
navigation, project interactions, reduced motion, page transitions, and console
errors. If browser automation is unavailable, that limitation will be reported
explicitly with the remaining manual checks.

## Out Of Scope

- CMS integration.
- React or framework migration.
- Contact-form backend.
- Recreating Framer source code.
- Inventing final client contact details or social profiles beyond consistent
  placeholders.
