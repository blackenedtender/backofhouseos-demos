# Church OS Public-Safe Demo

This folder contains a sanitized static demo surface for Church OS.

This demo uses sample data. Real systems may run locally/private.

It is not the private local Church OS runtime. It does not include a live database, secrets, uploaded documents, real member data, source archives, provider credentials, or private church records.

## What It Shows

- Public records intake.
- Intake -> staff routing -> review -> approval.
- Service planning.
- Worship planning.
- Program and bulletin-style outputs.
- People/member surface using synthetic data.
- Archive/reference concepts.
- Role-safe demo surfaces.

## Sample Data Notice

This demo uses synthetic demo data only.

## Run Locally

From this folder:

```powershell
python -m http.server 4177
```

Then open:

```text
http://localhost:4177
```

## Deploy To Vercel

No build step is required.

- Framework Preset: `Other`
- Build command: blank
- Output directory: blank / project root

## Screenshot Checklist

- Home.
- Public intake.
- Review queue.
- Service planner.
- Worship planner.
- People page.
- Program page.
- Archive/reference page.

## Public Safety Rules

- Use synthetic data only.
- Do not add real member data.
- Do not add phone numbers, addresses, birthdays, consent records, pastoral notes, or private church operations data.
- Do not add runtime DB output.
- Do not add source archives or uploaded documents.
