# ArchiveOS Public-Safe Demo

This folder is a sanitized static demo surface for ArchiveOS.

This demo uses sample data. Real systems may run locally/private.

It is not the real local ArchiveOS app. It does not include the local database, real files, real thumbnails, real drives, real local paths, logs, private previews, or source archive content.

## What It Shows

- Scan messy sources.
- Search what you remember.
- See representative asset cards.
- Review version clusters.
- Add approved assets to a content set.
- Run safety/preflight checks.
- Export approved copies.
- Keep originals untouched.

## Files

- `index.html` - static demo page.
- `styles.css` - demo styling.
- `app.js` - lightweight client-side interactions.
- `sample-data.json` - synthetic sample data only.
- `vercel.json` - optional static deployment config.

## Run Locally

From this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

Opening `index.html` directly may not load `sample-data.json` in some browsers, so a local static server is recommended.

## Deploy To Vercel Later

No build step is required.

Option 1: Vercel dashboard

- Import or upload this folder as a project.
- Framework Preset: `Other`.
- Build command: leave blank.
- Output directory: leave blank / project root.

Option 2: Vercel CLI later

From this folder:

```powershell
vercel
vercel --prod
```

Do not deploy until the demo is visually reviewed.

## Screenshot Checklist

- Home / "What do you want to do?"
- Visual memory board / recall grid.
- Representative asset card showing versions.
- Resolve Versions modal.
- Content set / publishing queue.
- Jobs/process monitor.
- Export report mock.
- Mobile home and board views.

## Public Safety Rules

- Use fake/sample data only.
- Do not add real local paths.
- Do not add real filenames.
- Do not add real archive thumbnails.
- Do not add raw DB exports.
- Do not add private documents, personal photos, drive names, logs, or source material.
- Keep the demo honest: this is a static public demo of the product loop, not the private local runtime.
