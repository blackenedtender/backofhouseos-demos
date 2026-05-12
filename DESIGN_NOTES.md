# Demo Studio Design Notes

## Quality bar

This homepage should feel genuinely designed, not merely functional. The standard is premium, restrained, intentional, atmospheric, mobile-polished, recruiter-legible, visually memorable, not gimmicky, and not generic. If a section reads like a template, it needs more discipline. If a card reads like a card, it should behave more like a system node. If motion feels decorative, it should be reduced or removed.

Taste standard: quiet enough to feel serious, distinct enough to be remembered, and clear enough that a hiring manager understands the work.

## What changed (latest pass)

- Unified individual demo rooms with the Demo Studio operating index.
- Replaced the old `shared/demo-shell.css` and per-room `theme.css`/`theme.js` duplicates (six copies each) with a single canonical shared layer: [`shared/room.css`](shared/room.css) and [`shared/room.js`](shared/room.js).
- Each room HTML now sets `class="boh-room"`, `data-room="<key>"`, and `data-status="<state>"` on `<body>`, links the shared room stylesheet, and loads the shared bootstrap script.
- Rebuilt every room shell: compact top identity bar (TCO mark, module name, descriptor, status pill, back-link injected by the shared script), simplified room nav, restrained hero, structured operational sections.
- Stripped the per-room `styles.css` files down to room-specific layout only (item walls, run cards, service rows, evidence pairs, etc.). The parent visual language now lives entirely in the shared layer.
- Migrated all eight ChurchOS sub-pages off the sidebar layout into the unified top-bar shell.

## What changed (Demo Studio root, prior pass)

- Rebuilt the root homepage around a synthesis of the design tests: Direction C atmosphere, Direction A usability, and Direction B editorial structure.
- Reframed the studio as an operating index with interactive proof previews instead of a flat module showcase.
- Added a guided inspection path that updates the proof preview before the visitor enters a room.

## Individual room design system

### Shared room shell (`shared/room.css`)

- Operating-index palette mirrors the studio: dark default with a polished paper light mode.
- Compact 64px top identity bar containing brand mark, module name + descriptor, status pill, simplified room nav. The "Demo Studio" back link is injected by `shared/room.js` from any room.
- Hero strip uses restrained typography (h1 caps at ~3.6rem desktop, ~2.4rem mobile) rather than huge marketing blobs.
- Metric strips, proof loops, and flow steps render as gridded operational records with thin dividers (1px gap on a `--line` background) instead of rounded card grids with heavy shadows.
- Panels share the same flat border / panel surface; the only blob-feeling surfaces are the small intake/today/loop cards on the hero, which carry a 1px accent stripe and a subtle accent-soft gradient.
- Pills, badges, and tags share a single shape (rounded text on transparent with a 1px border).
- Modals are operating dialogs (1px border, no glassy blob), keyboard-dismissible, and respect the same surface palette.

### Room accent strategy

Per-room accents are scoped via `body[data-room="<key>"]` and override `--accent`, `--accent-soft`, and `--accent-strong`. Light mode tweaks darken each accent for legibility. Domain feeling is expressed through accent + shape rhythm, not gimmick illustrations.

- RevenueDeskOS: deep controlled green; row records + proof loop emphasis (revenue command surface).
- ArchiveOS: muted gray-green; vault loop, modal review, asset board (preservation custody).
- ChurchOS: warm sealed cream/green; service rows with left accent stripe, role-aware panels (protected community ops).
- InventoryOS: neutral utility gray; item wall with placeholder swatches, history strip, listing-readiness language (inspection bench).
- RunnerOS: soft blue-green; weekly trend, run cards, review queue, detail strip (quiet athletic archive).
- CookbookOS: parchment / archival tone; manuscript proof loop, source-to-canon evidence pairs (archival workbench).

### Mobile cleanup

- Top identity bar collapses to a stacked column at <= 640px with the nav wrapping under the brand. The "Demo Studio" back-link label is hidden under 380px so only the arrow chip remains tappable.
- Hero grids collapse to a single column under 960px. Metric strips collapse from four columns to two columns at 960px and one column at 640px.
- Item walls, run grids, opportunity grids, and asset boards reflow to single column under 640px. Modal padding shrinks at <640px.
- Buttons span full width on mobile so CTAs stay tappable above the iOS bottom bar.
- ChurchOS service rows collapse cleanly to a single column with the timestamp stacked above the title rather than squeezed left.
- `prefers-reduced-motion` continues to disable all settle and pulse animations.

## Status mapping in this repo

- RevenueDeskOS: LIVE.
- ArchiveOS: LIVE.
- InventoryOS: LIVE.
- ChurchOS: SEALED.
- RunnerOS: STANDBY.
- CookbookOS: ARCHIVE.
- ManillaOS: REVIEW (held).
- CanonOS: SEALED (held).
- JobRadarOS: SEALED (held).
- MediaOS: STANDBY (held).

ManillaOS, CanonOS, JobRadarOS, and MediaOS are shown as held records on the Demo Studio because no matching public room route exists in this repo.

## Status meanings

- LIVE: public-safe room is available and strong enough to inspect.
- STANDBY: room exists, but the public proof surface is secondary or less mature.
- SEALED: private/internal system; public surface is intentionally limited.
- REVIEW: candidate/proof requires human review before authority.
- ARCHIVE: historical proof or preserved evidence surface.

## CSS architecture

```
/studio.css                  Demo Studio root operating index
/studio.js                   Demo Studio interactions
/shared/room.css             Individual room design system (shared by all rooms)
/shared/room.js              Room bootstrap (back link, status pill, theme toggle)
/demos/<room>/index.html     Room markup, links shared room.css + per-room styles.css
/demos/<room>/styles.css     Room-specific layout only (item-wall, run-card, etc.)
/demos/<room>/app.js         Room-specific interactions (unchanged in this pass)
```

Previously each room maintained its own duplicated `theme.css` and `theme.js` copy of `shared/demo-shell.*`. Those copies are removed; the shared layer is now the only source.

## Intentionally held for a later pass

- Public-safe implementation pages remain held until each system has a reviewed page.
- ManillaOS, CanonOS, JobRadarOS, and MediaOS have no public room route and remain held on the studio.
- No live telemetry, APIs, auth, analytics, or database-backed surfaces were added.
- The design tests remain archived under `design-tests/` and are not linked from the production homepage.
- No custom domain or Vercel project settings should be changed as part of design iteration.
- CookbookOS room is intentionally framed as an archival workbench concept with sample evidence; no real OCR or scan upload is implemented.

Do not ship until each room feels like a polished public command surface, not a themed portfolio page.
