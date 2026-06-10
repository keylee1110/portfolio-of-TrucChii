# ElysLu Selective Portfolio Upgrade Design

## Goal

Upgrade the lower half of the existing ElysLu portfolio using the two Framer
exports as visual and motion references without rebuilding the working site.

The current Hero, About, and Skills & Tools sections are locked and must retain
their existing HTML structure, styling, content, and behavior.

## Technical Direction

Continue with the existing static implementation:

- `index.html`
- `style.css`
- `app.js`
- Static project detail pages

Do not migrate to React, introduce a build system, or split the current CSS and
JavaScript into a new architecture. New styles and interactions should be
scoped so they do not change the three locked sections.

The Framer exports are references only. Generated Framer markup, template
branding, pricing, services, FAQ, blog, and unrelated template content must not
be copied into production.

## Brand And Content Rules

- The only canonical brand name is `ElysLu`.
- Replace remaining `TrucLu` text in production HTML and JavaScript, including
  testimonials, alt text, contact details, and generated download content.
- Preserve existing portfolio copy and campaign metrics unless a section is an
  explicitly marked project or certification placeholder.
- Do not invent clients, campaign results, testimonials, certifications, dates,
  or issuing organizations.

## Homepage Structure

The final homepage order is:

1. Hero, unchanged.
2. About, unchanged.
3. Skills & Tools, unchanged.
4. Featured Projects.
5. Case Study.
6. Expertise.
7. Archive.
8. Testimonials.
9. Practice.
10. Certification.
11. Contact.

Remove the current Results section completely.

## Featured Projects

The homepage contains exactly eight featured projects in an asymmetric
editorial grid inspired by the Framer Work section.

Each card contains:

- Base image with a subtle scale and contrast shift.
- Optional foreground image layer for depth.
- Sliding category rails such as Branding, Campaign, and Strategy.
- A masked or revealed View action.
- Project title and project number below the media.
- A link to the corresponding case-study page.

Desktop pointer hover and keyboard focus expose the layered interaction. Touch
layouts show a complete resting composition and must not require hover to
discover the title, link, or category.

A `See All Works` control links to `work.html`.

## Project Inventory

There are exactly eight project entries:

- Projects 01-03 use the existing case-study pages and preserve their content.
- Projects 04-08 use five new placeholder case-study pages.

Placeholder pages must clearly mark editable titles, summaries, metadata,
images, and metrics. They must not contain invented business claims. All eight
cards remain reachable from both the homepage and Work page.

## Work Page

`work.html` contains exactly the same eight projects as the homepage.

Desktop uses a two-column sticky split:

- Left column: `All Works`, a short ElysLu portfolio description, and a scroll
  prompt.
- Right column: a vertically scrolling list of eight projects.
- Each project row contains a thumbnail, project name, project number, and an
  optional short category label.
- The left column is sticky only within the project-list section. After Project
  08, the entire section leaves the viewport normally and does not overlap the
  footer.

Mobile uses one column. The heading and description appear above the project
list, and sticky positioning is disabled.

## Existing Lower Sections

Case Study, Expertise, Archive, Testimonials, Practice, and Contact retain their
existing content and are restyled selectively to match the editorial rhythm of
the Framer reference.

Restyling may change layout, spacing, typography, borders, image treatment, and
motion. It must not replace the current meaning, metrics, work history, or
testimonial copy.

Expertise remains part of the site. Practice remains named `Practice`; it must
not be renamed to Experience.

## Certification

Add Certification after Practice and before Contact.

The section contains six horizontally moving items inspired by the Awards
marquee in the Framer reference. Each item supports editable fields for:

- Certification name.
- Issuing organization.
- Year.

Initial content must be clearly labeled placeholders until real certification
details are supplied.

The marquee loops smoothly. Hovering or focusing an item pauses the marquee and
emphasizes that item. No floating certificate preview is included. Mobile users
can swipe horizontally. `prefers-reduced-motion: reduce` disables automatic
movement while preserving access to all six items.

## Motion

Use the current JavaScript and CSS architecture. Add only the behavior needed
for:

- Project-card layered hover and focus states.
- Section entrance reveals where they improve hierarchy.
- Certification marquee pause and emphasis behavior.
- Existing page transitions on new internal pages when compatible.

Animations should use transforms and opacity where practical. Failure of
JavaScript must leave all content visible and links usable.

## Accessibility

- Every project card is keyboard reachable.
- Hover-only information is also available through focus and touch layouts.
- Focus states remain visible against the black background.
- Images use informative alt text or empty alt text when decorative.
- Reduced-motion users receive static project content and a non-animated
  Certification list.
- Sticky Work-page content must not obscure the project list or footer.
- Each page has one primary `h1` and semantic landmarks.

## Responsive Behavior

- Preserve the current responsive behavior of Hero, About, and Skills & Tools.
- Collapse the asymmetric homepage grid into a clear single-column project
  sequence on small screens.
- Convert `work.html` from sticky split to a normal one-column document.
- Keep project controls and Certification items usable at touch sizes.
- Avoid horizontal page overflow; only the Certification track may scroll
  horizontally.

## Verification

Automated and manual checks must confirm:

- Hero, About, and Skills & Tools retain their original markup contracts.
- The Results section no longer exists.
- The homepage contains exactly eight featured project links.
- `work.html` contains exactly eight matching project entries.
- All eight case-study pages are reachable.
- Projects 04-08 contain explicit editable placeholders and no invented claims.
- Production files contain no `TrucLu` branding.
- There are exactly six Certification items.
- All local assets and internal links resolve.
- JavaScript parses without errors.
- Desktop hover, keyboard focus, mobile layout, sticky Work behavior, and
  reduced-motion behavior work as specified.

## Out Of Scope

- React or framework migration.
- Full-site rebuild.
- CMS integration.
- Contact-form backend.
- Copying generated Framer source.
- Framer Pricing, Services, FAQ, or Blog sections.
- Reworking Hero, About, or Skills & Tools.
- Inventing final content for placeholder projects or certifications.
