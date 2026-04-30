# Inventory OS Public-Safe Demo

This folder is a sanitized static demo surface for Inventory OS.

This demo uses sample data. Real systems may run locally/private.

It is not the real local inventory app. It does not include real user inventory, production databases, secrets, private item photos, personal information, or source exports.

## Status

Vercel-ready static demo / sample data only.

## Existing Demo Audit

An existing Inventory demo/static surface was found in the MediaOS_Notes module:

- `inventory_demo`
- `inventory_demo/dist`
- `inventory_demo/package.json`
- `inventory_app.py`
- `inventory_app_data.json`
- inventory boundary and demo policy documents

That existing surface has a deployable shape, but it also contains local build artifacts, `node_modules`, AppleDouble metadata files, and image-source uncertainty from vintage/eBay demo asset references. For a clean public portfolio demo, this package uses a separate sanitized static surface with synthetic records only.

## What It Shows

- Dashboard stats.
- Item wall.
- Item detail.
- Upload/intake mock.
- Status/history view.

## Files

- `index.html` - static demo page.
- `styles.css` - demo styling.
- `app.js` - lightweight client-side interactions.
- `sample-inventory.json` - synthetic item data only.
- `vercel.json` - optional static deployment config.

## Run Locally

From this folder:

```powershell
python -m http.server 4175
```

Then open:

```text
http://localhost:4175
```

Opening `index.html` directly may not load `sample-inventory.json` in some browsers, so a local static server is recommended.

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

- Dashboard stats.
- Item wall.
- Item detail.
- Upload/intake mock.
- Status/history view.
- Category filter.
- Mobile dashboard and item wall.

## Public Safety Rules

- Use fake/sample item data only.
- Do not add real item photos.
- Do not add real user inventory.
- Do not add production databases.
- Do not add secrets.
- Do not add personal information.
- Do not add local file paths.
- Keep the demo honest: this is a static public demo of the Inventory OS workflow, not the private local runtime.
