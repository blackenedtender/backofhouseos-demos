# BackOfHouseOS Demo Studio

Public-safe operating index for BackOfHouseOS proof surfaces.

The repo includes a root Demo Studio homepage that acts as the TCO /
BackOfHouseOS public command layer. It lets visitors inspect module proof
records before entering public-safe demo rooms, without changing private
boundaries or turning the rooms into live systems.

These demos show the shape of the systems without exposing private runtime data.

## Systems Referenced By The Index

- RevenueDeskOS
- ArchiveOS
- ChurchOS
- InventoryOS
- RunnerOS
- CookbookOS
- ManillaOS
- CanonOS
- JobRadarOS
- MediaOS

## Demo List

| System | Folder | Status | Vercel preset |
|---|---|---|---|
| RevenueDeskOS | `demos/revenue-desk-demo` | public-safe sample demo | Other |
| ArchiveOS | `demos/archiveos-demo` | public-safe sample demo | Other |
| ChurchOS | `demos/church-os-demo` | sanitized static demo | Other |
| InventoryOS | `demos/inventory-os-demo` | public-safe sample demo | Other |
| RunnerOS | `demos/runneros-demo` | public-safe sample demo | Other |
| CookbookOS | `demos/cookbook-os-demo` | archive/concept demo | Other |
| ManillaOS | no public route in this repo | implementation held | n/a |
| CanonOS | no public route in this repo | implementation held | n/a |
| JobRadarOS | no public route in this repo | implementation held | n/a |
| MediaOS | no public route in this repo | implementation held | n/a |

## Privacy Rules

- Do not add private data.
- Do not add real databases.
- Do not add local drive paths.
- Do not add member, customer, employer, or personal data.
- Do not add secrets or environment files.
- Do not add raw exports, staging folders, thumbnails, or source archives.
- Use sample data only.

Every demo must clearly state:

```text
This demo uses sample data. Real systems may run locally/private.
```

## Deployment Model

- The root Demo Studio should deploy only to the existing canonical Vercel
  project for `demos.philbap.com`.
- Do not create new Vercel projects for the root studio.
- Individual folders under `demos/` may have their own existing public projects,
  but should not be deployed from this root pass unless explicitly requested.
- Pushes to `main` may not auto-promote the canonical studio; verify the linked
  Vercel project before production deploy.

## Archive Handoff

- Brand assets are tracked in `BRAND_ASSET_MANIFEST.md`.
- Notion update instructions are tracked in `CHATGPT_NOTION_UPDATE_INSTRUCTIONS.md`.
- Do not add Notion links until the Vercel URL is public, reviewed, and confirmed sample-data only.

## Vercel Safety

Before deploying the root studio, inspect `.vercel/project.json` and confirm it
points to the intended existing project. Do not create a new project, change DNS,
or deploy operator files.

## Local Preview

From the repo root or any demo folder:

```powershell
python -m http.server 4170
```

Then open:

```text
http://localhost:4170
```

Use a different port if one is already in use.

## GitHub Setup

See `GIT_PUSH_COMMANDS.md`.
