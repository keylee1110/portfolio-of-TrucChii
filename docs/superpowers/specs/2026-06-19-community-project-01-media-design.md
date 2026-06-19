# Community Project 01 Media Completion

## Scope

Complete the remaining media placeholders on `project-community-01.html` while preserving the existing Community Fest visual system and static HTML/CSS/JavaScript stack.

## Promotional Video Phones

- Replace the four promotional video placeholders with the existing LIVE FEST phone-card pattern.
- Each phone shows a locally stored TikTok thumbnail, a centered play affordance, and a descriptive link.
- Clicking a phone opens its matching TikTok video in a new tab.
- The implementation must not use TikTok iframes in these four phone cards.
- Source videos, in order:
  1. `7518232367668972807`
  2. `7518005984829213959`
  3. `7517989704755711239`
  4. `7517993704393674002`

## Campaign Asset

- Replace the three small campaign asset placeholders with one large media block.
- Use `ref/project 2/assest placehplder.png` as the source image and copy it into `assets/` with a stable project-specific filename.
- Preserve the full image without distortion or horizontal cropping.

## Scrollable Campaign Page Phone

- Use `ref/project 2/Campaign Page Placeholder.png` as the long landing-page image.
- Render it as an `<img>` inside the existing phone chassis, not as a CSS background.
- The screen is independently vertically scrollable with `overflow-y: auto` and `overscroll-behavior: contain`.
- Hide or minimize the scrollbar while retaining mouse-wheel, keyboard, and touch scrolling.
- Keep the dynamic island, dark chassis, rounded screen, border, and shadow consistent with the other phones.
- Add a visible `Scroll inside` cue with a subtle vertical arrow animation.
- Emphasize the cue on hover/focus and reduce or disable decorative motion under `prefers-reduced-motion: reduce`.
- Prevent wheel input over the phone from scrolling the outer page, including at the top and bottom boundaries.

## Responsive Behavior

- Desktop retains the current two-column revenue layout.
- Mobile stacks the scrollable phone above the campaign asset and dashboards.
- Phone content must not overflow horizontally.
- TikTok cards retain the existing four-column/two-column responsive grid.

## Failure Handling

- TikTok thumbnails are downloaded locally so expiring remote URLs cannot break the page.
- Explicit image dimensions prevent layout shift.
- Existing dark media surfaces remain the visual fallback if an image fails to decode.

## Verification

- Assert all new local assets and all four TikTok URLs exist in the HTML.
- Confirm there are four linked promotional phone cards.
- Confirm the three campaign asset cards are replaced by one image.
- Confirm the campaign phone screen scrolls independently and exposes the scroll cue.
- Test desktop and mobile layouts, local asset loading, horizontal overflow, console health, and external-link behavior.
