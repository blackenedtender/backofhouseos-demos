# BackOfHouseOS Public Demos

Public-safe demo surfaces for the BackOfHouseOS product family.

These demos show the shape of the systems without exposing private runtime data.

## Systems

- Inventory OS
- RunnerOS
- ArchiveOS
- Church OS
- Revenue Desk
- Cookbook OS

## Demo List

| System | Folder | Status | Vercel preset |
|---|---|---|---|
| Inventory OS | `demos/inventory-os-demo` | public-safe sample demo | Other |
| RunnerOS | `demos/runneros-demo` | public-safe sample demo | Other |
| ArchiveOS | `demos/archiveos-demo` | public-safe sample demo | Other |
| Church OS | `demos/church-os-demo` | sanitized static demo | Other |
| Revenue Desk | `demos/revenue-desk-demo` | public-safe sample demo | Other |
| Cookbook OS | `demos/cookbook-os-demo` | future concept | Other |

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

- GitHub repo connected to Vercel.
- Each folder under `demos/` can be imported as its own Vercel project.
- Set Vercel Root Directory to the matching demo folder.
- Pushes to `main` trigger deployment after initial Vercel setup.

## Vercel Setup Steps

1. Push this repo to GitHub.
2. In Vercel, create a new project.
3. Import the GitHub repo.
4. Set Root Directory to one demo folder, for example `demos/inventory-os-demo`.
5. Use Framework Preset `Other`.
6. Leave Build Command blank unless a demo status file says otherwise.
7. Leave Output Directory as `.` for static demos.
8. Deploy.
9. Repeat for each demo folder.
10. Add confirmed public URLs to Notion only after safety review.

## Local Preview

From any demo folder:

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
