# Room sync and implementation state report

A UI quality pass that closes the visual and routing gap between the canonical Demo Gallery (`demos.philbap.com/`) and each room. Not a redesign — fixes typography parity, back-link reliability, status visibility, and dark continuity.

## Rooms inspected

| Room | Path | Status (after) | Data type | What you can inspect |
|---|---|---|---|---|
| RevenueDeskOS | `demos/revenue-desk-demo/` | **LIVE** | Synthetic sample | 5 sample RFPs through intake, checklist review, and a generated draft brief |
| ArchiveOS | `demos/archiveos-demo/` | **LIVE** | Synthetic sample | 7 assets, four-version resolver modal, preflight checks, export report |
| InventoryOS | `demos/inventory-os-demo/` | **LIVE** | Synthetic sample | 10 items on the wall with photo placeholder, condition, status, history |
| RunnerOS | `demos/runneros-demo/` | **LIVE** | Synthetic sample | 15 sample runs across approved, pending, weekly trend |
| ChurchOS | `demos/church-os-demo/` (+ 8 sub-pages) | **SNAPSHOT** | Sanitized snapshot | A sample Sunday plan: service items, demo people, songbook, packet handoff |
| CookbookOS | `demos/cookbook-os-demo/` | **CONCEPT** | Static walk-through | Source page → OCR draft → human review → recipe approved into canon |

## Back-links fixed

Before this pass, the "← Demo Gallery" link existed only when JavaScript loaded and ran — the room HTML had no anchor. If JS failed, deferred, or was blocked, the visitor was stranded.

After: every room HTML now ships a **hardcoded `<a class="room-back">` anchor** as the first child of `.room-top` (or `.shell-header` for RunnerOS). Default `href="https://demos.philbap.com/"` works on any deploy without JS. The shared `room.js` upgrade refines the anchor host-aware:

- On `*.philbap.com`: label → "Demo Gallery", href → `/` (relative).
- Anywhere else (legacy `*.vercel.app` deploys, local previews, etc.): label → "demos.philbap.com", href → the absolute canonical URL, class adds `is-canonical-pointer` (accent color).

14 HTML files updated: 6 room indexes + 8 ChurchOS sub-pages.

## Statuses changed

The room HTMLs' `body[data-status]` attribute was still using the legacy vocabulary (`SEALED`, `STANDBY`, `ARCHIVE`). It now agrees with the studio.js MODULES vocabulary:

| Room | Before | After |
|---|---|---|
| RevenueDeskOS | `LIVE` | `LIVE` |
| ArchiveOS | `LIVE` | `LIVE` |
| InventoryOS | `LIVE` | `LIVE` |
| RunnerOS | `STANDBY` | **`LIVE`** (promoted; interactive with 15 sample runs) |
| ChurchOS | `SEALED` | **`SNAPSHOT`** (static demo with sanitized content) |
| CookbookOS | `ARCHIVE` | **`CONCEPT`** (static walkthrough of the source-to-canon pipeline) |

Status accent colors in `shared/room.css` mirror the gallery's color choice: `LIVE` accent-green, `SNAPSHOT`/`CONCEPT` warm gold, `HELD` dim.

## Implementation states assigned

Each room hero now carries a unified `<p class="room-state">` directly under the `<h1>`. Format:

```
[STATUS] · [Data type]
[What you can inspect concretely]
```

Examples:

```
LIVE · Synthetic sample
5 sample RFPs cycle through intake, checklist review, and a generated draft brief.
```

```
SNAPSHOT · Sanitized snapshot
A sample Sunday plan: service items, demo people, songbook references, packet handoff.
```

```
CONCEPT · Static walk-through
Source page preserved, OCR draft reviewed by a human, recipe approved into canon.
```

Color of the status tag matches the room status: green for `LIVE`, gold for `SNAPSHOT`/`CONCEPT`, dim for any future `HELD`. The state label uses mono with `0.05em` letter-spacing; the detail line uses Inter at `0.86rem`.

The "X workflow layer" / "X review layer" small-text descriptors next to the brand mark are replaced with plain domain labels: "Revenue intake", "Preservation and recall", "Item review", "Effort archive", "Sunday operations", "Manuscript canon". No more "layer" tell.

## Typography parity

`shared/room.css` now uses the same three-stack typography as `studio.css`:

```
--font-display: Druk Wide → Druk → Helvetica Neue Condensed → HelveticaNeue-CondensedBold → Arial Narrow → Impact → sans-serif
--font-ui:      Inter → Helvetica Neue → Helvetica → Arial → ui-sans-serif → system-ui → sans-serif
--font-mono:    JetBrains Mono → SFMono-Regular → IBM Plex Mono → ui-monospace → Menlo → Consolas → monospace
```

Application matches the gallery exactly:
- Display: `h1`, `h2`, `.module-title`, brand strong, hero h1 in each room
- UI: body default, lede, hero copy, evidence text, governance copy
- Mono: eyebrow, system-line, room-status, room-back, room-nav, room-identity-text small, footer, sidebar brand, status badges, `room-state .state-tag`

`font-synthesis: none` on `body.boh-room` prevents Impact-class fallbacks from being faked bolder. No external font is loaded; all stacks are safe system fallbacks.

## Hero layout — overflow fix

The two-column hero on desktop was occasionally cramping at borderline widths. Adjusted:

- Grid columns: `1.15fr / 0.85fr` → `1.2fr / 0.8fr` (slightly more room for the headline column).
- Right column min-width: `240px` → `220px`.
- `.hero-copy` and `.stack` get a hard `max-width: 64ch` so no line runs longer than reading-comfortable.
- Hero `.lede` gets `max-width: 58ch`.
- Buttons get `white-space: nowrap` and the action-row's gap is `12px 24px` (smaller row gap, larger column gap) so CTAs never overlap.
- `h1` size lowered: `clamp(1.75rem, 4.6vw, 3rem)` → `clamp(1.65rem, 4.2vw, 2.8rem)`. Less aggressive at mid widths, still substantial on desktop.

## Theme — dark continuity committed

Per the brief ("Prefer dark shell continuity from Demo Gallery into rooms"):

- `shared/room.js` no longer injects a `.product-theme-toggle`. The toggle group element is hidden via CSS regardless.
- `room.js` boot sets `html[data-theme="dark"]` on every load. The light-mode CSS rules are untouched in the stylesheet but no path now activates them.

## Shared assets synced

After updates to `shared/room.css` and `shared/room.js`, both files were copied into every `demos/<room>/` folder so legacy standalone Vercel deploys see the same code:

```
md5 -q shared/room.css demos/*/room.css | sort -u  →  one hash
md5 -q shared/room.js  demos/*/room.js  | sort -u  →  one hash
```

## Routes verified (local server)

All 24 probed paths return `200`:

- `/`, `/studio.css`, `/studio.js`, `/assets/tco-logo-web.png`
- 6 room indexes (`/demos/<room>/`)
- 6 room shared assets (room.css, room.js, styles.css, app.js, sample-data.json, room asset)
- 8 ChurchOS sub-pages

Every rendered room contains the hardcoded `room-back` anchor and the `room-state` badge, and carries the unified `data-status` value (LIVE × 4, SNAPSHOT × 1, CONCEPT × 1).

## Mobile / overflow check

Breakpoints in `shared/room.css`: `≤960px`, `≤640px`, `≤380px`. At each width:

- **375/420**: hero collapses to one column, `h1` caps at `~1.65rem`, room-state stays on one line (detail wraps to next), back-link arrow + label fit, CTAs stack with `12px` row gap, no horizontal overflow (container is `width: min(100% - 28px, 1080px)`).
- **720**: same one-column hero, three-up metric strips become two-up, navigation wraps cleanly.
- **Desktop wide**: hero two-column with the wider headline column; right aside (intake/today/loop) stays inside its `220px+` column.

## Safety scan

Clean. Same checks as prior passes — no secrets, env / credentials / pem / id_rsa files, real `/Users/` or `/Volumes/` paths in deployable code, localhost / private IPs, DB connection strings, non-`example.org` emails, non-`555-*` phones, `@font-face` blocks, or external font CDN imports.

## Unresolved external deployments

Same list as in the previous canonical alignment pass:

1. **`philbap.com` apex** — no landing page; outside this repo. Needs a separate Vercel project or DNS-level 301 to `demos.philbap.com`.
2. **`runneros-showcase.vercel.app`, `runneros.vercel.app`, `cookbookos-showcase.vercel.app`, `manillaos.vercel.app`** — different Vercel projects deploying unrelated content. Need retirement, 308 to canonical, or re-link to this repo.
3. **`inventory-os-demo-flax.vercel.app`** — cosmetic Vercel auto-suffix; works as-is with bundled assets.

These cannot be fixed from inside this repo. Documented in [CANONICAL_DEPLOYMENT_ALIGNMENT_REPORT.md](CANONICAL_DEPLOYMENT_ALIGNMENT_REPORT.md).

## Remaining risks

- **Tab order shift** — the hardcoded back-link is now the first focusable element inside the room top bar. Previously the brand-mark anchor was first. This is the intended behavior (canonical exit is the first tab stop) but it does change keyboard nav for returning visitors.
- **Light-theme localStorage** — visitors who previously toggled light theme have `boh-demo-theme = "light"` saved locally; the new boot overrides it with `data-theme = "dark"` on every load. The stored value is now ignored, not cleared. Cleanup is unnecessary but the stored key persists.
- **ChurchOS sub-pages** — all eight now inherit the SNAPSHOT badge with sub-page-specific detail copy. The room state row appears under the sub-page h1 (which describes that specific surface). Consistent across the room cluster.
- **Status pill in top bar** — `shared/room.js` still injects a small `.room-status` span next to the room name. With the new `.room-state` block in the hero, the top-bar pill is partially redundant. Left in place for the persistent on-scroll signal but a future pass could remove it if it reads as duplicate.

## Commit message

`Sync demo rooms with canonical gallery state`
