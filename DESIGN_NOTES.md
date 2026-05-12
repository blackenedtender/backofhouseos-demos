# Demo Studio Design Notes

## Quality bar

This homepage should feel genuinely designed, not merely functional. The standard is premium, restrained, intentional, atmospheric, mobile-polished, recruiter-legible, visually memorable, not gimmicky, and not generic. If a section reads like a template, it needs more discipline. If a card reads like a card, it should behave more like a system node. If motion feels decorative, it should be reduced or removed.

Taste standard: quiet enough to feel serious, distinct enough to be remembered, and clear enough that a hiring manager understands the work.

## What changed

- Reworked the root homepage from a module showcase into a BOH public command ingress.
- Tightened the first screen around an already-running node: status, ingress, telemetry, and selected actions.
- Reduced explanatory copy and moved detail into compact system-room readouts.
- Reframed demo links as inspection routes instead of portfolio cards.
- Kept implementation detail in a safe held state where no public-safe implementation page exists.
- Added CSS-only environmental texture, restrained load settling, and subtle hover/focus acknowledgement.
- Added node activation behavior: small lift, stronger border, quiet status marker pulse, and inspect-link underline draw.
- Replaced generic active labels with grounded BOH status states for the rooms that exist in this repo.
- Tightened mobile behavior so the command layer remains readable at small widths instead of feeling like a compressed desktop.
- Added `prefers-reduced-motion` handling for all motion.

## Why it reads more like a command layer

The page now opens with an operational state instead of a marketing pitch. The visitor enters through a public node, sees that the registry is verified, sees private systems sealed, and then chooses a system room to inspect. The interface is intentionally quiet: low-contrast borders, grid texture, short labels, and spacious panels carry the atmosphere without fake terminal behavior or invented capabilities.

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

ManillaOS, CanonOS, JobRadarOS, and MediaOS are not shown as system nodes in this repo because no matching public room exists here.

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
- No custom domain or Vercel project settings were changed in this design pass.

Do not ship until the homepage feels like a polished public command interface, not a themed portfolio page.
