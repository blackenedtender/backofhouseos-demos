# Demo Studio Design Notes

## Quality bar

Premium, restrained, intentional, mobile-polished, recruiter-legible, visually memorable, not gimmicky, not generic. Typography and pacing carry the work; chrome recedes. Quiet enough to feel serious, distinct enough to be remembered, clear enough that a hiring manager understands the work.

## Final visual system

- One operating-index palette (dark default, polished paper light) shared by the root studio and every room. Defined in [studio.css](studio.css) and [shared/room.css](shared/room.css).
- Per-room **accent only** — single `--accent` variable scoped by `body[data-room="…"]`. No themed UI gimmicks. Domain feeling is expressed through accent + shape rhythm + section pacing, not illustration.
- Headings are weight 500 / no uppercase / minimal letter-spacing. Body labels are weight 400. Pills, badges, and "operating language" are typographic, not framed.
- Surfaces are hairline-only: 1px borders, `border-radius: 0` almost everywhere, no shadows, no glassy blobs.
- Buttons are underline text-actions. Primary differs only in accent color + always-visible underline.
- Hero hierarchy: small eyebrow → restrained h1 (clamp(2.1rem, 5.8vw, 4.4rem) on root, slightly smaller in rooms) → lede → 2 quiet CTAs.

## Per-room domain accents

| Room | Accent | Feeling |
|---|---|---|
| RevenueDeskOS | deep controlled green | bid intake, governed revenue work |
| ArchiveOS | muted gray-green | vault, version review, recall |
| ChurchOS | warm cream | sealed community stewardship |
| InventoryOS | neutral gray | inspection bench, listing readiness |
| RunnerOS | soft blue-green | quiet effort archive |
| CookbookOS | parchment | manuscript-to-canon workbench |

Light-mode each accent darkens for legibility.

## CSS / asset strategy (final)

Authoring source remains [shared/room.css](shared/room.css) and [shared/room.js](shared/room.js). Each `demos/<room>/` folder carries its own copy of `room.css` + `room.js` (synced from `shared/`). Each room HTML references **local-relative paths only**: `room.css`, `room.js`, `assets/tco-logo-web.png`. No room HTML reaches outside its folder.

**Why bundled instead of one shared file:**

Legacy standalone Vercel projects (e.g. `revenue-desk-demo.vercel.app`, `inventory-os-demo-flax.vercel.app`) deploy with the room folder as their project root. From inside that root they cannot resolve `../../shared/room.css` — Vercel won't serve files above the project root, and a browser normalizes `../../` back to the URL root. Bundling makes each room self-sufficient on **both** canonical and legacy deployments without changing any Vercel project settings.

**Re-syncing after edits:** edit `shared/room.css` (the authoring source), then copy to each room:

```
for d in demos/*; do cp shared/room.css "$d/room.css" && cp shared/room.js "$d/room.js"; done
```

## Legacy URL strategy

| URL | Status | Behavior |
|---|---|---|
| demos.philbap.com/ | canonical | Root Demo Studio (this repo) |
| demos.philbap.com/{room}os/ | canonical | Vercel rewrites to `/demos/<room>-demo/` |
| revenue-desk-demo.vercel.app | legacy standalone | Serves the same room HTML, now with bundled CSS/JS so it renders styled |
| archiveos-demo.vercel.app | legacy standalone | Same |
| church-os-demo.vercel.app | legacy standalone | Same |
| inventory-os-demo-flax.vercel.app | legacy standalone | Same |
| runneros-showcase.vercel.app | unrelated project | Outside this repo; not affected by these changes |
| runneros.vercel.app | unrelated project | Outside this repo |
| cookbookos-showcase.vercel.app | unrelated project | Outside this repo |
| manillaos.vercel.app | unrelated project | Outside this repo |

The legacy `*-demo.vercel.app` URLs receive the bundled assets automatically once this branch deploys. The `*-showcase` / `manillaos` URLs are different Vercel projects and need to be migrated or retired separately. They are not currently broken — they serve their own static pages — but their content is unrelated to this repo.

## Vercel rewrites

`vercel.json` rewrites short URLs to the actual folder paths so both styles work:

- `/revenuedeskos[/*]` → `/demos/revenue-desk-demo[/*]`
- `/archiveos[/*]` → `/demos/archiveos-demo[/*]`
- `/churchos[/*]` → `/demos/church-os-demo[/*]`
- `/inventoryos[/*]` → `/demos/inventory-os-demo[/*]`
- `/runneros[/*]` → `/demos/runneros-demo[/*]`
- `/cookbookos[/*]` → `/demos/cookbook-os-demo[/*]`

Root studio "Enter room" links and `data-route` attributes now point at the short URLs. The longer `/demos/<room>/` paths continue to work for direct links and as the deployable folder location.

## Smart "Back to Studio" link

`shared/room.js` detects the host. On `*.philbap.com` it links to `/`; on any other host (legacy `*.vercel.app`) it links to `https://demos.philbap.com/`. Standalone deploys still funnel visitors back to canonical.

## Mobile decisions

- Top identity bar collapses to stacked column at <= 640px with 10px gap. Back-link label hides under 380px (arrow chip remains tappable).
- Hero h1 caps at `clamp(1.7rem, 7vw, 2.2rem)` mobile. Lede stays one line of comfortable reading.
- All multi-column grids (metrics, proof-loop, status-strip, split, columns, deal-record, detail) collapse to single column at <= 640px. Gaps reduce to 18px vertical.
- Buttons remain underline text-actions on mobile — no full-width filled blobs. No iOS bottom-bar collisions.
- Modal padding shrinks at <640px; backdrop padding 16px so the modal can fit on small screens.
- `prefers-reduced-motion` disables settle and pulse animations site-wide.

## Held issues

- ManillaOS, CanonOS, JobRadarOS, MediaOS remain held records on the studio — no public room route in this repo. Their entries on the index intentionally do not link.
- The `*-showcase` and `manillaos.vercel.app` URLs are different Vercel projects and outside this repo. Migrating them is a follow-up task: either point those domains at the canonical project or rebuild their content here.
- No live telemetry, APIs, auth, analytics, or database-backed surfaces are added in any room.
- Design tests under [design-tests/](design-tests/) remain archived; not linked from production.
- No DNS or Vercel project settings were changed in this pass. The canonical project remains `philbap-boh-demo-studio`.
