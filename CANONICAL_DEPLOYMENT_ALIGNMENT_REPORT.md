# Canonical deployment alignment report

A canonicalization pass to make `https://demos.philbap.com` the unambiguous public root for the demo gallery, while preserving direct inspectability of any legacy or alternate deployment that points at this repo. No redesign; no UI change beyond the back-link copy.

## Repo / project linkage

- **Repo:** `github.com/blackenedtender/backofhouseos-demos`
- **Branch:** `main`
- **Vercel project:** `philbap-boh-demo-studio` (`.vercel/project.json` → `prj_t5WFtZx8tWBIqJXHnL7dgqK87c0m`)
- **Canonical root:** `https://demos.philbap.com`

## Domains and URLs found

| URL / domain | Referenced in | Current purpose | Should redirect to canonical? | Standalone inspectable? | Surfaces canonical nav? |
|---|---|---|---|---|---|
| `demos.philbap.com/` | root [vercel.json](vercel.json), [README.md](README.md), [DESIGN_NOTES.md](DESIGN_NOTES.md) | Canonical Demo Gallery | — (is canonical) | yes | n/a |
| `demos.philbap.com/{slug}/` (e.g. `/revenuedeskos/`) | rewrites in root vercel.json | Canonical short URL per room | — (is canonical) | yes | n/a |
| `demos.philbap.com/demos/{room}-demo/` | direct folder path | Underlying folder URL on the canonical project | **yes — now 308s** to `/{slug}/` | n/a (redirected) | n/a |
| `philbap.com` (apex) | not in this repo | Untracked — no landing page | **external** | n/a | external TODO |
| `revenue-desk-demo.vercel.app` | DESIGN_NOTES, README | Legacy standalone of revenue-desk-demo folder | no (kept inspectable) | yes | yes — visible canonical back-link |
| `archiveos-demo.vercel.app` | DESIGN_NOTES, README | Legacy standalone of archiveos-demo folder | no | yes | yes |
| `church-os-demo.vercel.app` | DESIGN_NOTES, README | Legacy standalone of church-os-demo folder | no | yes | yes |
| `inventory-os-demo-flax.vercel.app` | DESIGN_NOTES, README | Legacy standalone of inventory-os-demo folder | no | yes | yes |
| `runneros-showcase.vercel.app` | DESIGN_NOTES, README | Different Vercel project, unrelated content | **external** | external | external TODO |
| `runneros.vercel.app` | DESIGN_NOTES, README | Different Vercel project, unrelated content | external | external | external TODO |
| `cookbookos-showcase.vercel.app` | DESIGN_NOTES, README | Different Vercel project, unrelated content | external | external | external TODO |
| `manillaos.vercel.app` | DESIGN_NOTES, README | Different Vercel project, unrelated content | external | external | external TODO |

## Canonical root

`https://demos.philbap.com`

## Redirects added (in [vercel.json](vercel.json))

Added 12 308-permanent redirects so that anyone landing on the underlying folder path is canonicalized to the short URL. The browser address bar always settles on the canonical form.

```
/demos/revenue-desk-demo[/*]  ->  /revenuedeskos[/*]
/demos/archiveos-demo[/*]     ->  /archiveos[/*]
/demos/church-os-demo[/*]     ->  /churchos[/*]
/demos/inventory-os-demo[/*]  ->  /inventoryos[/*]
/demos/runneros-demo[/*]      ->  /runneros[/*]
/demos/cookbook-os-demo[/*]   ->  /cookbookos[/*]
```

Existing rewrites in the opposite direction are unchanged — `/revenuedeskos/*` still rewrites to `/demos/revenue-desk-demo/*` internally, so file serving keeps working from the actual folder while the URL bar shows the canonical form.

These redirects only affect the canonical Vercel project (`philbap-boh-demo-studio`). Legacy standalone projects deploy from inside a single room folder and never see this `vercel.json`.

## Canonical tags added

Every public HTML in this repo now carries a `rel="canonical"` pointing at the canonical short URL, plus matching `og:url`, `og:title`, `og:description`, `og:type`, `og:image`, `og:site_name`, and `twitter:card` / `twitter:title` / `twitter:description` / `twitter:image` meta. Fifteen unique pages:

```
/                                        -> https://demos.philbap.com/
/revenuedeskos/                          -> https://demos.philbap.com/revenuedeskos/
/archiveos/                              -> https://demos.philbap.com/archiveos/
/churchos/                               -> https://demos.philbap.com/churchos/
/churchos/archive                        -> https://demos.philbap.com/churchos/archive
/churchos/builder                        -> https://demos.philbap.com/churchos/builder
/churchos/people                         -> https://demos.philbap.com/churchos/people
/churchos/postmaster                     -> https://demos.philbap.com/churchos/postmaster
/churchos/program                        -> https://demos.philbap.com/churchos/program
/churchos/review                         -> https://demos.philbap.com/churchos/review
/churchos/service-planner                -> https://demos.philbap.com/churchos/service-planner
/churchos/worship-planner                -> https://demos.philbap.com/churchos/worship-planner
/inventoryos/                            -> https://demos.philbap.com/inventoryos/
/runneros/                               -> https://demos.philbap.com/runneros/
/cookbookos/                             -> https://demos.philbap.com/cookbookos/
```

The same canonical URLs are used on legacy standalone deploys (`revenue-desk-demo.vercel.app`, etc.) because each legacy project serves the same room HTML. A search-engine crawler on either deploy sees one consistent canonical signal pointing at `demos.philbap.com`.

`og:image` is the absolute URL of `assets/tco-logo-web.png` on the canonical domain.

## Visible canonical nav on legacy deploys

[`shared/room.js`](shared/room.js) (and the six per-room bundled copies) detects the host and renders the persistent back-link differently:

- On `*.philbap.com`: label reads **Demo Gallery**; href is `/`.
- Anywhere else (any `*.vercel.app` or other host): label reads **demos.philbap.com**; href is `https://demos.philbap.com/`. The link picks up an `is-canonical-pointer` class which renders it in the accent color so the canonical URL is visibly exposed at the top of every legacy room.

Restrained — same hairline back-arrow chip the canonical site uses. Persistent — present on every room load. Visible — accent color and the URL itself as the label.

## Legacy deployments — still standalone, still inspectable

The legacy `*-demo.vercel.app` URLs continue to render the full room demos rather than hard-redirect, per the brief's "preserve standalone room inspectability." They now:

1. Serve the bundled room CSS / JS / assets from inside their own deploy root (from prior pass).
2. Render the canonical-pointer back-link at the top.
3. Carry a `rel="canonical"` HTML tag and `og:url` pointing at `demos.philbap.com`.

Together this means: a direct visit still works; a search-engine crawler will index the canonical URL; a casual visitor will see "demos.philbap.com" in the top bar.

## External tasks (outside this repo)

These remain unresolved and **cannot be fixed by editing this repo**:

1. **`philbap.com` apex domain.** No landing page currently routes the apex anywhere meaningful. The cleanest fix is a tiny separate Vercel project (or a redirect on whatever currently owns the DNS) that 301s `philbap.com` to `https://demos.philbap.com/`. Alternative: a single-page static site at the apex with a clear "Visit the demo gallery" link. This requires DNS and a separate Vercel project — out of scope for this repo.

2. **`runneros-showcase.vercel.app`, `runneros.vercel.app`, `cookbookos-showcase.vercel.app`, `manillaos.vercel.app`.** Each is a different Vercel project with content unrelated to this gallery. Three reasonable options:
   - **Retire the domains.** Disable the Vercel project; let the URL 404.
   - **Redirect from those projects.** Replace each project's deploy with a single `vercel.json` that 308-redirects `/(.*)` → `https://demos.philbap.com/`. Cheapest fix.
   - **Re-link to this repo.** Point the project at the corresponding folder in this repo as its root directory. The bundled CSS/JS/canonical tags would then work automatically. (For `manillaos.vercel.app` there is no folder — that domain would need either retirement or a placeholder.)

3. **`inventory-os-demo-flax.vercel.app` naming.** The `-flax` suffix is a Vercel auto-name. Consider replacing the project with `inventory-os-demo.vercel.app` or retiring it in favor of the canonical `demos.philbap.com/inventoryos/`. Cosmetic only — current URL still works and now carries canonical signals.

## Remaining ambiguity risks

- **`demos.philbap.com/demos/<folder>/` direct links** that were shared before this pass will now 308 to the canonical short URL. Old bookmarks continue to work but the URL bar updates. No content loss.
- **Legacy `*-demo.vercel.app` URLs** continue to serve full demos. If a hiring manager finds one of those URLs first, they will see canonical signals (back-link + meta) but the URL bar will still show the legacy host until they click through. Trade-off: standalone inspectability vs. URL-bar consistency. The brief explicitly chose inspectability.
- **`*-showcase` and `manillaos.vercel.app`** still exist and still serve unrelated content. Not a code risk in this repo but a perception risk — a visitor following an old link will land on something that does not match this gallery. Resolution requires touching those external projects.
- **HTTP `Link: rel="canonical"` header** is not set. The HTML `<link rel="canonical">` is enough for Google and most crawlers but a future hardening pass could add a `Link` HTTP header via per-page Vercel headers if a canonical signal is needed even when HTML is not parsed.

## Recommended final deployment structure

```
canonical:
  https://demos.philbap.com/                                  (root)
  https://demos.philbap.com/{slug}/                           (rewrites; redirects from /demos/...)
  https://demos.philbap.com/churchos/{sub}                    (ChurchOS sub-pages, cleanUrls)

apex:                                                          (external)
  https://philbap.com  -> 301 https://demos.philbap.com/      (separate project + DNS)

legacy preview projects:                                       (external where they exist)
  *-demo.vercel.app    -> serve same content, visible canonical nav, canonical meta
  *-showcase.vercel.app, manillaos.vercel.app -> retire or 308 to demos.philbap.com
```

## Validation summary

- All 30 local routes return 200 — root, studio assets, every room index, room CSS/JS/styles/app, every ChurchOS sub-page.
- Every public HTML carries a single `rel="canonical"` link tag pointing at the canonical short URL.
- Smart back-link renders correctly on both canonical and legacy hosts.
- No redirect loops: the new 308 from `/demos/<folder>/` to `/<slug>/` plus the existing rewrite from `/<slug>/` to `/demos/<folder>/` does not loop (rewrites are internal, redirects are external; 308 happens first).
- No localhost, private IPs, real `/Users/` or `/Volumes/` paths, secrets, env files, DB strings, non-example contacts, or external font imports introduced.
- Reduced-motion support and accessibility behaviors from prior passes are untouched.

## Commit

`Align public demo deployments to canonical demos.philbap.com root`
