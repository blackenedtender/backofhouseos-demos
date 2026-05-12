# Demo Studio Design Notes

## Quality bar

This homepage should feel genuinely designed, not merely functional. The standard is premium, restrained, intentional, atmospheric, mobile-polished, recruiter-legible, visually memorable, not gimmicky, and not generic. If a section reads like a template, it needs more discipline. If a card reads like a card, it should behave more like a system node. If motion feels decorative, it should be reduced or removed.

Taste standard: quiet enough to feel serious, distinct enough to be remembered, and clear enough that a hiring manager understands the work.

## What changed

- Rebuilt the root homepage around a synthesis of the design tests: Direction C atmosphere, Direction A usability, and Direction B editorial structure.
- Reframed the studio as an operating index with interactive proof previews instead of a flat module showcase.
- Added a guided inspection path that updates the proof preview before the visitor enters a room.
- Added keyboard/focus-driven module inspection so hover is not required.
- Expanded the index to include the real module names that matter to the BackOfHouseOS surface, with held states where this repo has no public room route.
- Reduced dashboard clutter and removed equal-weight status widgets in favor of typography, pacing, and one quiet status line.
- Kept the public/private boundary visible without repeating it as dashboard noise.
- Preserved route integrity: existing room routes link; missing implementation routes are held non-links.
- Kept mobile discipline, comfortable tap targets, and `prefers-reduced-motion` handling.

## Why it reads more like a command layer

The page now opens as an editorial operating index rather than a marketing pitch. The visitor can inspect a module record, see what the public room proves, see what remains sealed, and then enter the real demo route. The interface is intentionally quiet: restrained dark atmosphere, sparse dividers, strong pacing, and a single proof preview carry the experience without fake terminal behavior or invented capabilities.

## Status meanings

- LIVE: public-safe room is available and strong enough to inspect.
- STANDBY: room exists, but the public proof surface is secondary or less mature.
- SEALED: private/internal system; public surface is intentionally limited.
- REVIEW: candidate/proof requires human review before authority.
- ARCHIVE: historical proof or preserved evidence surface.

## Status mapping in this repo

- RevenueDeskOS: LIVE.
- ArchiveOS: LIVE.
- InventoryOS: LIVE.
- ChurchOS: SEALED.
- RunnerOS: STANDBY.
- CookbookOS: ARCHIVE.
- ManillaOS: REVIEW.
- CanonOS: SEALED.
- JobRadarOS: SEALED.
- MediaOS: STANDBY.

ManillaOS, CanonOS, JobRadarOS, and MediaOS are shown as held records because no matching public room route exists in this repo.

## Mobile discipline

- The root shell is expected to remain readable at 375px, 390px, 430px, 768px, and desktop widths.
- Node rooms stack into a single column on small screens.
- Status, telemetry, and readout language wraps instead of forcing horizontal scroll.
- Tap targets use comfortable heights for navigation, command actions, and node actions.
- Mobile disables the load-settle animation and live-node pulse so the atmosphere does not compete with legibility.
- Desktop texture is simplified through larger grid spacing on small screens.

## Intentionally held for a later pass

- Public-safe implementation pages remain held until each system has a reviewed page.
- The individual demo rooms were not redesigned in this pass.
- REVIEW status is documented but not currently assigned to a visible room in this repo.
- No live telemetry, APIs, auth, analytics, or database-backed surfaces were added.
- The design tests remain archived under `design-tests/` and are not linked from the production homepage.
- No custom domain or Vercel project settings should be changed as part of design iteration.

Do not ship until the homepage feels like a polished public command interface, not a themed portfolio page.
