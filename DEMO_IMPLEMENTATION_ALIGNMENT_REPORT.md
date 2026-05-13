# Demo Implementation Alignment Report

Date: 2026-05-12

Authority filter: `CANON/BOH_AUTHORITY_BASELINE.md`.

## Rooms Inspected

- Demo Gallery root
- RevenueDeskOS
- ArchiveOS
- InventoryOS
- RunnerOS
- ChurchOS
- ChurchOS subpages: Service Planner, Worship Planner, Review, People, Program, Postmaster, Archive, Builder
- CookbookOS

## UI Issues Fixed

- Added a consistent implementation-state strip to public room shells.
- Added a matching implementation-state strip to the gallery preview.
- Tightened mobile room navigation spacing for the ChurchOS multi-page room.
- Fixed canonical room asset loading for clean routes such as `/revenuedeskos`, `/archiveos`, `/inventoryos`, `/runneros`, `/churchos`, and `/cookbookos`.
- Removed local development URLs from public demo READMEs.
- Kept root room pages from depending on trailing slashes for shell CSS, shell JS, room-specific CSS, room-specific JS, and sample JSON.

## Room Coherence Fixes

- Standardized public room state fields around:
  - Room
  - Data
  - Interaction
  - Inspect
- Standardized data labels to:
  - Synthetic sample
  - Sanitized snapshot
  - Concept walkthrough
  - No public data
- Root gallery module previews now show what is inspectable before a visitor opens a room.
- Public rooms retain a persistent Demo Gallery link; non-canonical deploys point to `https://demos.philbap.com/`.

## Status Changes

- RunnerOS changed from `LIVE` to `SNAPSHOT` in the gallery and room shell.
- CookbookOS retained `CONCEPT`, with data language changed from "Static walk-through" to `Concept walkthrough`.
- Live room labels remain limited to RevenueDeskOS, ArchiveOS, and InventoryOS.
- Held/candidate rooms remain visible only as held gallery entries with no public room link.

## Implementation-State Changes

- RevenueDeskOS: Room yes; Data Synthetic sample; Interaction interactive; Inspect sample RFP records, draft brief, review queue.
- ArchiveOS: Room yes; Data Synthetic sample; Interaction interactive; Inspect sample asset board, version resolver, export report.
- InventoryOS: Room yes; Data Synthetic sample; Interaction interactive; Inspect sample item wall, filters, item history.
- RunnerOS: Room yes; Data Synthetic sample; Interaction interactive; Inspect sample runs, import queue, approved run detail.
- ChurchOS: Room yes; Data Sanitized snapshot; Interaction static; Inspect sanitized Sunday operations pages or page-specific sanitized samples.
- CookbookOS: Room yes; Data Concept walkthrough; Interaction static; Inspect source-to-canon recipe walkthrough.

## Shared Asset Sync Confirmation

- `shared/room.js` matches all bundled room copies.
- `shared/room.css` matches all bundled room copies.
- Verified with `cmp` across RevenueDeskOS, ArchiveOS, InventoryOS, RunnerOS, ChurchOS, and CookbookOS room folders.

## Routes Verified

Local Vercel dev verified `200` for:

- `/`
- `/revenuedeskos`
- `/archiveos`
- `/inventoryos`
- `/runneros`
- `/churchos`
- `/cookbookos`
- `/churchos/service-planner`
- `/churchos/worship-planner`
- `/churchos/review`
- `/churchos/people`
- `/churchos/program`
- `/churchos/postmaster`
- `/churchos/archive`
- `/churchos/builder`

Redirected legacy paths verified with one redirect and final `200`:

- `/demos/revenue-desk-demo`
- `/demos/archiveos-demo`
- `/demos/inventory-os-demo`
- `/demos/runneros-demo`
- `/demos/church-os-demo`
- `/demos/cookbook-os-demo`
- `/revenue-desk-demo`
- `/archiveos-demo`
- `/inventory-os-demo`
- `/runneros-demo`
- `/church-os-demo`
- `/cookbook-os-demo`
- `/cookbookos_showcase`

Canonical room assets verified `200` through route prefixes:

- `/revenuedeskos/*`
- `/archiveos/*`
- `/inventoryos/*`
- `/runneros/*`
- `/churchos/*`
- `/cookbookos/*`

## Validation Notes

- `node --check` passed for gallery, shared room shell, room copies, and room app scripts.
- `git diff --check` passed.
- Viewport checks passed for desktop, 720px, 420px, and 375px on root, main rooms, and sampled ChurchOS subpages: no horizontal overflow and implementation strips present.
- Full route pass confirmed all main rooms and ChurchOS subpages return `200`.
- Code scan found no local hostnames, machine paths, file URLs, external font imports, API keys, secrets, tokens, or environment-variable reads in public demo files.
- Network calls remain limited to same-origin sample JSON fetches.
- Reduced-motion support remains present in `studio.css`, `shared/room.css`, and synced room CSS copies; gallery JS still branches on `prefers-reduced-motion`.

## Remaining Weak Proof Areas

- ChurchOS subpages are still mostly static sanitized pages; they are honest snapshots, not deep interactive rooms.
- CookbookOS remains a concept walkthrough, not an inspectable live workflow.
- RunnerOS now reads as snapshot, but its interactivity can still feel close to a live room because the sample run grid is usable.

## Remaining Trust Risks

- The word `LIVE` can still be read as production by a hurried visitor. Current copy says synthetic public demo data, but this should stay under watch.
- Public room pages rely on static sample JSON; if future data grows, sample boundaries need another pass.
- Standalone legacy deployments may still have older deployment state until redeployed.

## Next Recommended Implementation Pass

- Improve RevenueDeskOS proof depth without changing claims: clearer selected-record state, visible sample-only persistence boundary, and one stronger review-to-brief progression.
- Give ChurchOS a smaller page navigation surface on mobile if future pages are added.
- Re-run live production route checks after deployment propagation.
