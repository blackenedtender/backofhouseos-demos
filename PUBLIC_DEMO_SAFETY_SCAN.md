# Public Demo Safety Scan

Scan date: 2026-04-30

Latest re-scan: 2026-04-30 after Inventory Notebook skin, Creative Origin logo asset update, Revenue Desk quote card, and Notion handoff instructions.

Scope: `E:\backofhouseos-demos`, excluding local `.git` internals.

## Terms Scanned

- WBD
- Warner
- Bleacher
- B/R
- BR
- TNT
- Integrated Strategy
- internal draft
- `C:\Users`
- `E:\`
- archive.db
- church_os.sqlite
- sqlite3
- .env

## File Artifact Scan

No database or environment files were found in the public demo payload.

Checked for:

- `*.db`
- `*.sqlite`
- `*.sqlite3`
- `.env`
- `*.env`

Result: none found.

## Hits Found

| File | Line | Hit | Assessment |
|---|---:|---|---|
| `.gitignore` | 3 | `.env` | Safe. This is an exclusion rule preventing secrets from entering the repo. |
| `.gitignore` | 4 | `.env.*` | Safe. This is an exclusion rule preventing secrets from entering the repo. |
| `.gitignore` | 7 | `*.sqlite3` | Safe. This is an exclusion rule preventing runtime database files from entering the repo. |
| `GIT_PUSH_COMMANDS.md` | 6 | `cd E:\backofhouseos-demos` | Safe as requested setup documentation. Not demo data and not used by any deployed page. |
| `GIT_PUSH_COMMANDS.md` | 17 | `C:\Users\philb` | Safe as requested recovery warning. Not demo data and not used by any deployed page. |

## Demo Payload Findings

- No WBD references found.
- No Warner references found.
- No Bleacher references found.
- No B/R references found.
- No case-sensitive standalone BR references found.
- No case-sensitive standalone TNT references found.
- No Integrated Strategy references found.
- No internal draft references found.
- No runtime database files found.
- No environment files found.
- No local drive paths found inside demo application files.
- No private branding source paths are referenced by deployed demo files.
- Public demo logos load from `assets/` PNG files.

## Final Status

PASS with documented setup-document exceptions.

The demo folders are public-safe sample/sanitized demo surfaces. The only scan hits are in safety infrastructure files: `.gitignore` and `GIT_PUSH_COMMANDS.md`.

Before making the repo public, keep the setup command file if operational convenience matters. If a zero-local-path public repo is required, remove or rewrite `GIT_PUSH_COMMANDS.md` after initial GitHub setup.
