# Live Pro Campaign Project Detail

## Scope

Replace the current Product Launch Campaign project with a new project named **LIVE PRO CAMPAIGN**. Update the project title anywhere the second project is presented, including the home page, work archive, metadata, and detail page.

## Visual Direction

The detail page follows the five supplied reference images in order while retaining the portfolio's existing Swiss-brutalist navigation, footer, typography, responsive behavior, and interaction patterns. Live Fest and Community Live are the implementation references for shared page structure, metric presentation, phone frames, spacing, and mobile behavior.

All campaign imagery remains a visible neutral placeholder. No supplied reference screenshot is used as production artwork.

## Page Sections

1. **Project introduction and performance**
   - Title: LIVE PRO CAMPAIGN.
   - Project metadata follows the structure shown in section 1.
   - The performance metric row reuses the visual system from Live Fest.
   - Campaign overview text appears below the metrics with a large placeholder visual.

2. **Research and strategy**
   - A two-column composition matching section 2.
   - Left column contains the Data-Driven Research, Behavioral Analysis, and Strategy & Gameplay Design narrative.
   - Right column is a large media placeholder.

3. **Campaign results**
   - A dark results section matching section 3.
   - Four result cards are arranged in an offset two-column composition on desktop and a single column on small screens.
   - Every result card uses a placeholder visual.

4. **Exclusive creator rewards**
   - Heading and explanatory copy follow section 4.
   - The reward showcase is represented by one wide placeholder.

5. **Creator recognition videos**
   - Heading and explanatory copy follow section 5.
   - Four phone frames reuse the established Live Fest/Community Live phone treatment.
   - Each frame contains a placeholder and links to its corresponding TikTok URL in the order supplied by the user.
   - External links open in a new tab and include safe rel attributes.

## Responsive Behavior

- Desktop preserves the wide editorial compositions from the references.
- Tablet reduces heading and media scale without changing section order.
- Mobile stacks all split layouts and result cards; phone frames become a horizontal snap row or a compact two-column grid depending on the existing project-page pattern.
- Text remains readable and links retain accessible focus styles and touch targets.

## Implementation Boundaries

- Primary page: `project-launch.html`.
- Shared source styles are added only to `style.src.css` when reusable styles cannot satisfy the references.
- Generated assets `style.css` and `app.js` are rebuilt through the existing minification command rather than edited directly.
- Existing project pages and unrelated user changes remain untouched.

## Verification

- Run the existing minification command.
- Run the automated regression suite.
- Verify the page at desktop and mobile widths.
- Confirm all four TikTok destinations, title replacements, navigation, and next-project links.
