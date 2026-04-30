# RunnerOS Public-Safe Demo

This folder is a sanitized static demo surface for RunnerOS.

This demo uses sample data. Real systems may run locally/private.

It is not the real local RunnerOS app. It does not include real health data, GPS route data, personal records, raw imports, SQLite databases, private names, or source exports.

## What It Shows

- Dashboard totals from approved sample runs.
- Recent run, longest run, pending review, and approved record counts.
- Weekly training trend.
- Imports that wait for review before becoming truth.
- Approved runs list.
- Review queue for pending imported runs.
- Approved run detail for a fake Brooklyn Half race.

## Files

- `index.html` - static demo page.
- `styles.css` - demo styling.
- `app.js` - lightweight client-side interactions.
- `sample-runs.json` - synthetic run data only.
- `vercel.json` - optional static deployment config.

## Run Locally

From this folder:

```powershell
python -m http.server 4174
```

Then open:

```text
http://localhost:4174
```

Opening `index.html` directly may not load `sample-runs.json` in some browsers, so a local static server is recommended.

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

- Dashboard hero.
- Total miles / longest run / pending review / approved records.
- Weekly trend.
- Imports screen.
- Runs grid.
- Review queue.
- Approved Brooklyn Half detail.
- Mobile dashboard and runs grid.

## Public Safety Rules

- Use fake/sample run data only.
- Do not add real health export data.
- Do not add GPS route traces.
- Do not add private names.
- Do not add raw imports.
- Do not add SQLite databases.
- Do not add local file paths.
- Keep the demo honest: this is a static public demo of the RunnerOS workflow, not the private local runtime.
