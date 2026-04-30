# ChatGPT Notion Update Instructions

Purpose: update the Notion portfolio only after the public demos have been deployed and reviewed.

Do not use these instructions to deploy. Do not link local paths, localhost, raw folders, private apps, ngrok test URLs, raw databases, or unreviewed Vercel previews.

## Required Inputs

Before updating Notion, collect the confirmed public Vercel URLs:

| System | Vercel URL | Status |
| --- | --- | --- |
| Inventory OS | MISSING - ADD AFTER DEPLOYMENT | sample-data demo |
| RunnerOS | MISSING - ADD AFTER DEPLOYMENT | sample-data demo |
| ArchiveOS | MISSING - ADD AFTER DEPLOYMENT | sample-data demo |
| Church OS | MISSING - ADD AFTER DEPLOYMENT | sanitized static demo |
| Revenue Desk | MISSING - ADD AFTER DEPLOYMENT | sanitized sample-data demo |
| Cookbook OS | MISSING - ADD AFTER DEPLOYMENT | future concept |

## Safety Rules

- Only link confirmed public `.vercel.app` production URLs or approved custom domains.
- Do not link localhost, ngrok, private Render apps, raw GitHub folders, raw DB files, local drive paths, or Vercel preview URLs that have not been reviewed.
- Every linked demo must use sample data only.
- Revenue Desk must not mention private employer/internal company context.
- Church OS must not contain real member data.
- ArchiveOS must not expose real filenames, thumbnails, databases, exports, or local paths.
- RunnerOS must not contain real health/GPS data.
- Inventory OS must not contain real private inventory records.

## Target Notion Pages

- Archive OS
- Church OS
- Inventory OS
- RunnerOS
- Revenue Desk
- Cookbook OS
- Working Systems / Product Bench
- Vercel Demo Readiness
- System Demo Matrix

## Update Block To Add

Add this section to each matching system page only when the URL is confirmed:

```markdown
## Demo / Links

- Public demo: [URL]
- Demo type: public-safe sample-data demo
- Status: Public-safe demo. Real system may run locally/private.
- Notes: This demo shows the shape of the workflow without exposing private runtime data.
```

For Cookbook OS, use:

```markdown
## Demo / Links

- Public demo: [URL]
- Demo type: future concept / sample-data placeholder
- Status: Public-safe concept demo. No production status is claimed.
- Notes: This page is a future module lane, not a live system claim.
```

## System Matrix Copy

Use this wording in the System Demo Matrix:

| System | Public Demo | Demo Type | Public Safety |
| --- | --- | --- | --- |
| Inventory OS | [URL] | sample-data demo | no private inventory data |
| RunnerOS | [URL] | sample-data demo | no real health/GPS data |
| ArchiveOS | [URL] | sample-data demo | no real archive files or local paths |
| Church OS | [URL] | sanitized static demo | no real member data |
| Revenue Desk | [URL] | sanitized sample-data demo | no employer/internal references |
| Cookbook OS | [URL] | future concept | no real recipe/household data |

## ChatGPT Prompt

Use this prompt with Notion access enabled:

```text
Update my Notion portfolio pages with confirmed public BackOfHouseOS demo links.

Rules:
- Use only the confirmed public URLs I provide below.
- Do not infer or add missing URLs.
- Do not link localhost, ngrok, raw folders, private Render apps, raw DBs, or unreviewed preview URLs.
- Add a "Demo / Links" section to each matching page.
- Use the wording from CHATGPT_NOTION_UPDATE_INSTRUCTIONS.md.
- If a page match is ambiguous, skip it and report the ambiguity.

Confirmed URLs:
- Inventory OS: [paste URL]
- RunnerOS: [paste URL]
- ArchiveOS: [paste URL]
- Church OS: [paste URL]
- Revenue Desk: [paste URL]
- Cookbook OS: [paste URL]

Target Notion pages:
- Archive OS
- Church OS
- Inventory OS
- RunnerOS
- Revenue Desk
- Cookbook OS
- Working Systems / Product Bench
- Vercel Demo Readiness
- System Demo Matrix
```

## Final Check

After Notion is updated, verify:

- Each URL opens publicly.
- Each demo clearly says it uses sample data.
- No private local path appears on any public page.
- Revenue Desk remains TCO / BackOfHouseOS-owned and public-safe.
- The System Demo Matrix matches the individual system pages.
