# BackOfHouseOS Demo Studio

Public-safe operating index for BackOfHouseOS proof surfaces.

The root [Demo Studio](index.html) is the canonical entry point. From it, visitors inspect each module's proof record and enter the public-safe room. Private records, runtime systems, and sources stay sealed.

## Canonical domain

`https://demos.philbap.com/` — linked to the Vercel project **`philbap-boh-demo-studio`** (see `.vercel/project.json`). Pushes to `main` build that project.

## Room URLs

Short canonical URLs (preferred for linking) and the underlying folder path are equivalent thanks to Vercel rewrites in [vercel.json](vercel.json).

| Room | Short URL | Folder |
|---|---|---|
| RevenueDeskOS | `/revenuedeskos/` | `demos/revenue-desk-demo/` |
| ArchiveOS | `/archiveos/` | `demos/archiveos-demo/` |
| ChurchOS | `/churchos/` | `demos/church-os-demo/` |
| InventoryOS | `/inventoryos/` | `demos/inventory-os-demo/` |
| RunnerOS | `/runneros/` | `demos/runneros-demo/` |
| CookbookOS | `/cookbookos/` | `demos/cookbook-os-demo/` |

ManillaOS, CanonOS, JobRadarOS, and MediaOS appear on the index as held records — no public room route exists in this repo yet.

## CSS / asset bundling

Each `demos/<room>/` is self-contained. Every room HTML references local files only — `room.css`, `room.js`, `assets/tco-logo-web.png` — so the room works on **both** the canonical deploy and any legacy standalone Vercel deployment whose project root is the room folder.

Authoring source lives at [shared/room.css](shared/room.css) and [shared/room.js](shared/room.js). When you edit either, re-sync into every room:

```bash
for d in demos/*; do
  cp shared/room.css "$d/room.css"
  cp shared/room.js  "$d/room.js"
done
```

## Legacy standalone Vercel projects

Older preview deployments are still wired to this repo for some rooms:

- `revenue-desk-demo.vercel.app`
- `archiveos-demo.vercel.app`
- `church-os-demo.vercel.app`
- `inventory-os-demo-flax.vercel.app`

These projects deploy the room folder as their own root. Until this pass they rendered unstyled because the room HTML reached for `../../shared/room.css`, which Vercel cannot serve from outside the project root. Bundling fixes that — the same files now serve cleanly from both canonical and standalone.

The smart back-link in `room.js` detects the host: on `*.philbap.com` it links to `/`; everywhere else it points to `https://demos.philbap.com/`. Standalone deploys still funnel visitors back to canonical.

Other legacy URLs (`runneros-showcase.vercel.app`, `cookbookos-showcase.vercel.app`, `manillaos.vercel.app`) are different Vercel projects and outside this repo. They are not currently broken but their content is unrelated; migration is a follow-up task.

## Privacy rules

- Sample data only. Real systems may run locally or private.
- No private databases, drive paths, member or customer records, employer/client material, secrets, env files, raw exports, staging folders, or source archives.

## Local preview

From the repo root:

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/` for the studio, or any of the room paths above.

Each room folder is also independently servable:

```bash
cd demos/inventory-os-demo
python3 -m http.server 8765
```

That mirrors what a legacy standalone Vercel project sees.

## Vercel safety

Before deploying, inspect `.vercel/project.json` and confirm it still points at `philbap-boh-demo-studio`. Do not create a new Vercel project, change DNS, or deploy any operator files in this repo.

## Documentation

- Visual system, mobile decisions, held issues: [DESIGN_NOTES.md](DESIGN_NOTES.md)
- Brand assets: [BRAND_ASSET_MANIFEST.md](BRAND_ASSET_MANIFEST.md)
- Notion update instructions: [CHATGPT_NOTION_UPDATE_INSTRUCTIONS.md](CHATGPT_NOTION_UPDATE_INSTRUCTIONS.md)
- Demo safety scan history: [PUBLIC_DEMO_SAFETY_SCAN.md](PUBLIC_DEMO_SAFETY_SCAN.md)
