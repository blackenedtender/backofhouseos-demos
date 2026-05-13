# Public demo credibility pass

A pass to align the public demo gallery's language and structure with what is actually inspectable. The site previously implied a larger operating system than the demos demonstrate. This pass replaces the inflated framing with plain, specific copy, and downgrades demo statuses where the room does not currently support a stronger claim.

## Files changed

- [index.html](index.html) — full rewrite of the root copy and structure. The hero is plainer ("Small tools for messy work."); the brand subtitle is "Demo gallery" rather than "operating index." Added a visible honesty notice, a short "What this is" section, a "What to inspect first" featured-trio listing, and grouped the full demo list into Working / Snapshots / Held. Removed the governance theatre section.
- [studio.js](studio.js) — rewrote the `MODULES` data with plainer stage descriptions, a `group` field per module, and revised statuses. Renamed two stage labels in the shared loop: `Ingest → Capture`, `Authority → Approve`. The module list is now rendered into three grouped containers (live / snapshot / held) rather than one flat list. The held state CTA copy moved from "Implementation held" to "No public room yet."
- [studio.css](studio.css) — added styles for the new sections (`.notice`, `.what-section`, `.featured-section`, `.featured-list`, `.featured-item`, `.module-group`, `.group-label`) and added status colors for `SNAPSHOT`, `CONCEPT`, and `HELD`. Mobile breakpoints adjusted so the featured trio and the honesty notice read cleanly at 375/420/720.
- [PUBLIC_DEMO_CREDIBILITY_PASS.md](PUBLIC_DEMO_CREDIBILITY_PASS.md) — this file.

No other files changed. Room HTML, room CSS, room JS, and bundled assets were not touched.

## Copy changed

- Title: "BackOfHouseOS — The Creative Origin" → "Demo Gallery — The Creative Origin".
- Brand subtitle: "BackOfHouseOS" → "Demo gallery".
- Hero system line: "An operating system for messy work." → "A public demo gallery from The Creative Origin."
- Hero h1: "Messy input becomes governed proof." → "Small tools for messy work."
- Hero copy: dropped operating-system framing. New copy explicitly states some rooms are working examples, some sanitized snapshots, and some held.
- Hero CTAs: "Run a module" → "See the demos"; "Governance note" → "What this is".
- Loop label: "BackOfHouseOS operating loop" → "Shared workflow pattern".
- Loop stages: `Ingest → Capture`, `Authority → Approve` in both the spine and the evidence trail. Other five labels unchanged.
- Per-module stage descriptions trimmed of "governed", "canonical", "stays sealed" framing where the same idea reads cleaner as "private" or "not exposed here."
- Boundary section now reads as a plain factual statement instead of as a system claim.
- Footer: "BackOfHouseOS" → "Public demo gallery".
- Preview link copy: "Enter room" → "Open demo"; "Implementation held" → "No public room yet".

The full "governance" section (Candidate → Review → Canon flow + paragraph) was removed. The same idea is still implied by the loop + per-module `AI drafts / Human signs / Stays private` lines in the preview panel.

## Statuses changed

| Module | Before | After | Reason |
|---|---|---|---|
| RevenueDeskOS | LIVE | LIVE | Interactive, 5 synthetic RFPs visible, intake + review + draft + audit. Holds up. |
| ArchiveOS | LIVE | LIVE | Interactive, 7 sample assets, modal resolves a 4-version conflict, export report counts. Holds up. |
| InventoryOS | LIVE | LIVE | Interactive, 10 synthetic items, intake + detail + history visible. Holds up. |
| ChurchOS | SEALED | SNAPSHOT | Static demo. The Sunday content is present and inspectable but no live interactions. SNAPSHOT is more accurate than SEALED (which implied a sealed live system). |
| RunnerOS | STANDBY | LIVE | Interactive, 15 sample runs, review queue, run detail. The room is more populated than STANDBY suggested. |
| CookbookOS | ARCHIVE | CONCEPT | The page walks through the source-to-canon concept with a small sample, but does not implement a workflow. CONCEPT is more honest than ARCHIVE. |
| ManillaOS | REVIEW | HELD | No public room route; the index entry intentionally does not link. HELD is plainer than REVIEW. |
| CanonOS | SEALED | HELD | No public room route. |
| JobRadarOS | SEALED | HELD | No public room route. |
| MediaOS | STANDBY | HELD | No public room route. |

The current status vocabulary on the homepage is now: `LIVE`, `SNAPSHOT`, `CONCEPT`, `HELD`. The older `SEALED / STANDBY / ARCHIVE / REVIEW` labels are no longer assigned, though their CSS is retained for backward compatibility in case any room HTML still references them.

## Rooms downgraded or promoted

- **Downgraded:** ChurchOS (SEALED → SNAPSHOT), CookbookOS (ARCHIVE → CONCEPT), ManillaOS / CanonOS / JobRadarOS / MediaOS (varied → HELD). Each downgrade reflects what the room actually shows today.
- **Promoted:** RunnerOS (STANDBY → LIVE). The room is interactive and populated with 15 sample runs.

Featured trio on the homepage is RevenueDeskOS, ArchiveOS, InventoryOS — the three live, interactive, most-inspectable rooms.

## Seeded examples

No new data files were added in this pass. All demo rooms already had `sample-data.json` files with synthetic content:

- RevenueDeskOS: 5 opportunities, metrics, 5 governance items.
- ArchiveOS: 7 assets, 4 jobs, export report.
- InventoryOS: 10 items, intake mock.
- RunnerOS: 15 runs.
- ChurchOS: 3 people, 3 review queue items, 3 service items, 3 songs.
- CookbookOS: 1 sample recipe, concept content.

All data is synthetic. No private records, customer data, employer data, or live system data was added or referenced.

## Safety notes

- No private paths, secrets, or credentials added.
- No external fonts, libraries, APIs, tracking, or network calls added. The typography stack from the previous pass (Druk display / Inter UI / JetBrains mono with safe fallbacks) is preserved.
- No DNS changes, no Vercel project changes, no domain settings touched.
- The canonical Vercel project remains `philbap-boh-demo-studio` per `.vercel/project.json`.
- No new analytics or third-party scripts introduced.

## Remaining credibility risks

1. **CookbookOS is a static walk-through.** Labeled CONCEPT. A reader who clicks through expects to see a manuscript-to-canon pipeline; they will see a coherent demo page describing the pattern, with one sample recipe and a fixed three-item review list. The label warns this; the link is honest.
2. **ChurchOS is a snapshot.** Labeled SNAPSHOT. The Sunday content is full and content-rich but does not respond to interaction. The label warns this.
3. **Four modules (ManillaOS, CanonOS, JobRadarOS, MediaOS) have no public room.** Labeled HELD. They appear in the index for completeness but the preview panel explicitly says "No public room yet" and offers no link.
4. **Legacy standalone Vercel URLs** (e.g. `inventory-os-demo-flax.vercel.app`, `archiveos-demo.vercel.app`, `revenue-desk-demo.vercel.app`, `church-os-demo.vercel.app`) deploy from each room folder as their own root. Two previous passes bundled CSS/JS into each room folder so these URLs render styled, but they are different Vercel projects and not under direct control from this repo. If any of those projects gets unlinked from this repo, the standalone URL would freeze on whatever build it last received.
5. **`runneros-showcase.vercel.app`, `cookbookos-showcase.vercel.app`, `manillaos.vercel.app`** are separate Vercel projects deploying different content from outside this repo. Their pages do not match this gallery. Migration is a follow-up.
6. **The animated loop spine** still uses seven stages (Capture / Preserve / Structure / Review / Approve / Surface / Receipt). That is more granular than the plain four-step pattern in the "What this is" copy (capture / structure / review / surface). The loop adds Preserve, Approve, and Receipt as visible refinements of the four. If a visitor finds the seven labels too systemic, a future pass can collapse to four.

## Next recommended commit

1. **One-line landing page for the root domain `philbap.com`.** This repo is the Vercel project for `demos.philbap.com` only. The apex `philbap.com` currently has nothing pointing at it (or whatever points there is unrelated). A small static page that links to `https://demos.philbap.com/` would close the credibility loop: a visitor who types `philbap.com` lands somewhere designed, with a clear pointer into the gallery. This is a separate deploy / Vercel project / DNS task and should not be done from inside this repo.

2. **Decide what to do with `runneros-showcase.vercel.app`, `cookbookos-showcase.vercel.app`, and `manillaos.vercel.app`.** These are different Vercel projects with stale or unrelated content. Either retire those domains, redirect them to the canonical demo gallery, or rebuild them to match. Not a code change in this repo.

3. **Optional: collapse the loop to four stages.** Capture → Structure → Review → Surface. Matches the plain-language pattern exactly. Costs the granularity of Preserve / Approve / Receipt as visible stages. Worth doing if the seven-stage row starts to read as systemic again.
