# Revenue Desk Public-Safe Demo

Revenue Desk is a BackOfHouseOS / TCO demo product for governed revenue workflows.

Revenue Desk helps revenue, sales strategy, proposal, and GTM teams turn scattered opportunity inputs into structured intake records, reviewed briefs, and reusable workflow history.

This demo uses sample data. Real systems may run locally/private.

## Sample Data Notice

This demo uses sample data. It does not contain private, client, employer, or production information.

## What The Demo Shows

- Dashboard metrics for incoming RFPs, cycle time, checklist pass rate, reuse rate, and pending reviews.
- Opportunity intake mock with required fields.
- Review queue with missing fields, approvals, owners, and checklist scores.
- Deal record with structured opportunity summary, source inputs, extracted fields, generated team brief, and status timeline.
- Scoreboard for adoption, cycle-time target, checklist pass rate, reuse rate, and response velocity.
- Governance and safety posture: read-only source posture, human review required, audit log, no autonomous submission, and sample data only.

## Core Workflow

RFP intake -> structured record -> checklist review -> generated team brief -> approval -> reusable opportunity history.

## What Is Mocked

- File upload/dropzone.
- Deal records.
- Checklist scoring.
- Generated team brief summaries.
- Reuse candidate matching.
- Scoreboard metrics.
- Audit/status timeline.

## What It Proves

Revenue Desk proves the BackOfHouseOS pattern in an enterprise revenue workflow context:

messy input -> preserved source -> structured record -> review -> authority -> recall -> action

In this domain, the messy input is an RFP or opportunity request. The trusted record is a reviewed revenue workflow brief.

## Files

- `index.html` - static demo page.
- `styles.css` - demo styling.
- `app.js` - lightweight client-side interactions.
- `sample-data.json` - synthetic opportunity data only.
- `vercel.json` - optional static deployment config.
- `PUBLIC_REVENUE_DESK_COPY.md` - portfolio-safe copy block.

## Run Locally

From this folder:

```powershell
python -m http.server 4176
```

Then open:

```text
http://localhost:4176
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

- Dashboard hero and metric cards.
- Intake mock and required field checklist.
- Review queue.
- Deal record.
- Scoreboard.
- Governance / Safety section.
- Why it fits BackOfHouseOS section.
- Mobile dashboard and review queue.

## Public Safety Rules

- Use sample data only.
- Do not add private, client, employer, or production information.
- Do not add private databases.
- Do not add secrets.
- Do not add local file paths.
- Do not add actual people, client, team, company, channel, pipeline, or production identifiers.
- 