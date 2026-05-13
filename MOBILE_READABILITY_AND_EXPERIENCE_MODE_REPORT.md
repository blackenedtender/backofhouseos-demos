# Mobile readability + experience-mode report

Date: 2026-05-12
Canonical URL: `https://demos.philbap.com`
Scope: root gallery + every public room + ChurchOS sub-pages.
No new modules, no new governance docs, no architecture change.

## Mobile readability audit (Phase 1)

At 720 / 420 / 375px the gallery and rooms were inspectable but heavy. Identified density:

| Surface | Issue |
|---|---|
| Root hero | h1 + lede paragraph + 2 CTAs visible; lede wraps to 3 lines at 375px. |
| Notice block | Useful but a full bordered block above the fold. |
| What-section | Eyebrow + h2 + full paragraph; restates the workflow pattern that's shown immediately below. |
| Loop spine | 7 vertical rows on mobile, ~200px tall before any content. |
| Featured-section | Heading paragraph + 3 items × ~4 lines each — significant scroll. |
| Modules section heading | Heading paragraph repeats "watch the row…" idea. |
| Module list | 10 entries × `rank/status/title/purpose/implementation` = 4–5 visible lines per entry, ~1400px total. |
| Boundary section | One paragraph; fine but stacks behind everything else. |
| Room hero (e.g. RevenueDeskOS) | h1 + room-state badge + detail line + lede + 2 CTAs + intake-card aside, all stacked. Implementation `<dl>` adds 4 more rows. |
| ChurchOS sub-pages | Long copy plus 9-link nav per page. |

Visitors had to read too much before acting, especially on phones.

## Experience-mode selector (Phases 2–3)

Added a lightweight first-visit overlay (`<aside class="mode-overlay">`) in `index.html`, with 3 options:

| Option | Behavior |
|---|---|
| **Quick tour** (default) | Concise summaries. Hides What-section, modules-section heading paragraph, per-module implementation strip, governance-mini block in preview. |
| **Operator mode** | Full workflow context. Everything that Quick hides is restored. Module implementation strips and governance-mini visible. |
| **Just show me stuff** | Minimal text. Hides notice, what-section, loop spine, module purpose + implementation, featured-item paragraphs, evidence trail, boundary section. Compact hero (no lede). Rooms also hide implementation `<dl>`, room-state detail line, room hero lede, and on mobile the hero aside card. |

Implementation details:

- Choice stored in `localStorage` under `boh-demo-mode`. Valid values: `quick`, `operator`, `show`.
- `studio.js` reads/writes the key, applies a body class (`mode-quick` / `mode-operator` / `mode-show`), and exposes a `mode-switch` button in the footer that re-opens the modal.
- `shared/room.js` reads the same key on every room load and applies the matching body class. No modal in rooms — the modal lives only on the gallery (one decision point).
- Modal is dismissible: click a choice, click "Skip — use quick tour", click outside the sheet, or press Escape. Any dismiss persists `quick` as the explicit choice so the modal does not reappear.
- No backend, no network calls, no analytics. Pure CSS density modes driven by one localStorage key.
- `prefers-reduced-motion` is respected: the modal still appears on first visit (the user needs the choice) but auto-open is suppressed; the transition reduces to 0.001ms via the existing reduced-motion block.

## Mobile compression (Phase 4)

`studio.css` and `shared/room.css` both gained `@media (max-width: 720px)` and `@media (max-width: 420px)` rules in addition to existing breakpoints:

### Root gallery
- Hero padding tightened from `8px 0 28px` to `4px 0 10px`.
- Hero copy reduced to `0.94rem` with `line-height: 1.55`.
- Hero actions: gap reduced to `14px`, top margin `18px`.
- Notice: padding `12px 14px`, paragraph `0.88rem`.
- What-section: padding `36px 0 0`, smaller paragraph (and hidden by default in Quick).
- Featured-section: padding `40px 0 8px`, heading paragraph `0.9rem`.
- Module entries: padding `14px 0`, `min-height: auto`, purpose `0.88rem`.
- Loop spine: margin `22px 0 32px`, padding `14px 0 4px`.
- Boundary section: top margin `28px`, paragraph `0.88rem`.
- Mode overlay: padding `14px`, sheet padding `24px 20px 18px`, choice padding `12px 14px`.
- Footer wraps so the mode switcher gets its own line.

### Rooms (`body.boh-room`)
- Hero padding: `clamp(24px, 4vw, 36px) 0 clamp(18px, 3vw, 26px)`.
- Hero `h1` bottom margin reduced to `8px`; lede `0.96rem`.
- `.room-state` gap tightened; detail line breaks to next row at full width.
- `.implementation-state` margin-top trimmed to `14px`.
- `.action-row` / `.hero-actions` use `gap: 10px 22px; margin-top: 12px`.
- Section headings margin `28px 0 10px`.
- Footer margin-top `36px`.

## Sections collapsed by mode

| Section | Operator | Quick | Show |
|---|---|---|---|
| Hero h1 | ✓ | ✓ | ✓ (smaller) |
| Hero lede / copy | ✓ | ✓ | hidden |
| Hero CTAs | ✓ | ✓ | ✓ |
| Notice | ✓ | ✓ | hidden |
| What-section | ✓ | hidden | hidden |
| Loop spine | ✓ | ✓ | hidden |
| Featured items full paragraphs | ✓ | ✓ | hidden |
| Module-entry purpose | ✓ | ✓ | hidden |
| Module-entry implementation strip | ✓ | hidden | hidden |
| Preview evidence trail | ✓ | ✓ | hidden |
| Preview governance-mini | ✓ | hidden | hidden |
| Boundary section | ✓ | ✓ | hidden |
| Room implementation `<dl>` | ✓ | ✓ | hidden |
| Room hero lede | ✓ | ✓ | hidden |
| Room hero aside (mobile) | ✓ | ✓ | hidden |

## UI polish (Phase 5)

- Mode overlay uses the same dark shell, hairline borders, Druk display title, Inter body, and JetBrains mono labels as the rest of the system. No new visual language.
- Mode switcher in the footer reads as `Mode: quick · change` in mono; the accent-colored mode word is the only call-out.
- No animation noise on the overlay beyond the existing 220ms ease.
- Reduced-motion media block honored: `@media (prefers-reduced-motion: reduce)` still disables animations and snaps loop spine state.
- Accessibility: overlay uses `role="dialog"` + `aria-modal="true"` + `aria-labelledby`; focuses the first option on open; Escape closes; outside-click closes.

## Validation (Phase 6)

- All 13 probed local routes return `200`, including bundled per-room `room.css` / `room.js` / `app.js` and ChurchOS sub-pages.
- `node --check` passes for `studio.js`, `shared/room.js`, all 6 bundled `room.js` copies, and all 4 `app.js` interactive scripts.
- `studio.css` carries 23 mode-CSS rules; `shared/room.css` carries 21. Each side has matching `@media (max-width: 720px)` + `@media (max-width: 420px)` blocks alongside the existing 960px / 640px / 380px breakpoints.
- Safety scan clean: no secrets, env / credential / pem files, real `/Users/` or `/Volumes/` paths, localhost / private IPs, DB strings, `@font-face` blocks, or external CDN imports. No new network calls.
- Reduced-motion `@media` block present in both `studio.css` and `shared/room.css`.
- Mode overlay markup (1 overlay, 3 choices, 1 dismiss + 1 backdrop-dismiss action, 1 footer switcher) verified in served HTML.
- Bundled per-room `room.css` and `room.js` hashes match `shared/room.css` and `shared/room.js` (single hash across all 7 copies of each).

## Remaining readability risks

1. **First-visit overlay can still feel like an interrupt.** Mitigation: auto-opens with a 320ms delay so the page renders first, the dismiss button is plain English, Escape and outside-click also close. The choice persists; subsequent visits never see the modal again.
2. **The mode is per-browser, not per-user.** Visitors using two browsers see the modal twice. Acceptable for a static demo gallery.
3. **In Show mode, the loop spine and trail vanish.** A visitor who liked the animated workflow row needs to switch to Quick or Operator. The footer switcher is intentionally visible to make that easy.
4. **Quick mode still hides the What-section** even though the section briefly explains the shared pattern. Operator mode shows it. A visitor who wants the explanation has one click via the footer switcher.
5. **ChurchOS sub-pages** inherit the mode but their nav row remains 9 links wide; wrapping handles 720/420/375 cleanly but the link list is the densest part of the room cluster. Documented as a snapshot constraint; not blocked.

## Routes verified

- `/`, `/studio.css`, `/studio.js`, `/assets/tco-logo-web.png` — 200
- `/demos/revenue-desk-demo/`, `/demos/archiveos-demo/`, `/demos/church-os-demo/`, `/demos/inventory-os-demo/`, `/demos/runneros-demo/`, `/demos/cookbook-os-demo/` — 200
- `/demos/revenue-desk-demo/room.css`, `room.js` — 200
- `/demos/church-os-demo/service-planner.html` (representative sub-page) — 200
- Production canonical routes (carried forward from prior pass): `/revenuedeskos`, `/archiveos`, `/churchos`, `/inventoryos`, `/runneros`, `/cookbookos` — all 200; trailing-slash variants 308 → canonical → 200; legacy `/demos/<old>/` paths 308 → canonical → 200. No redirect loops.

## Viewport verification summary

- **Desktop wide**: existing layout unchanged outside the new mode overlay and footer switcher. Switcher reads as one short line.
- **720px**: hero compresses (`4px 0 10px`), what-section and featured items trim, module entries to 14px padding, footer wraps so the switcher gets its own line.
- **420px**: h1 caps at `clamp(1.75rem, 9vw, 2.4rem)` (gallery) / `clamp(1.5rem, 9vw, 2.1rem)` (rooms); notice paragraph and room-state detail drop to `0.86–0.88rem`. Mode overlay sheet keeps `padding: 24px 20px 18px`.
- **375px**: container is `width: min(100% - 28px, 1080px)`. Mode-show fully hides explanatory blocks, leaving the heroic h1 + featured items title row + module list (status + title only). No horizontal overflow observed.

## Files changed

- `index.html` — added mode overlay markup + footer mode switcher.
- `studio.js` — added mode constants, persistence, overlay handlers, first-visit auto-open with reduced-motion guard.
- `studio.css` — appended overlay/mode/mobile-compression block (~190 lines).
- `shared/room.js` — added `applyReadingMode()` that mirrors the gallery's localStorage choice on every room load.
- `shared/room.css` — appended room-side mode + mobile-compression block (~60 lines).
- All 6 `demos/<room>/room.css` and `demos/<room>/room.js` — re-synced from `shared/` so legacy standalone Vercel deploys see the same code.
- `MOBILE_READABILITY_AND_EXPERIENCE_MODE_REPORT.md` — this report.

## Commit

`Add adaptive onboarding and mobile readability pass`
