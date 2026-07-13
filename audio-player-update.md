# Audio Player Update

## Goal
Add continuous background music with a circular play/pause control across the portfolio and improve the Santa's Wish List swag copy readability.

## Tasks
- [x] Add regression checks for the shared player and Santa copy size.
- [x] Inject a looping audio element and accessible circular toggle from `app.src.js`.
- [x] Add responsive player styling and reduced-motion behavior in `style.src.css`.
- [x] Increase `.santa-swag-copy` with a restrained fluid type scale.
- [x] Rebuild minified assets, run tests, and verify the rendered interaction.

## Done When
- [x] Music loops, play/pause state is clear, and the control works by keyboard and pointer.
- [x] State and playback position survive internal page navigation where browser storage is available.
- [x] The Santa swag paragraph is visibly larger without disrupting the layout.

## Notes
Browsers may block autoplay with sound before the first user interaction; the player must handle that state honestly instead of pretending audio is playing.
