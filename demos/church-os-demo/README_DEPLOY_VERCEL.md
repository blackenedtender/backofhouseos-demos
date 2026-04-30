# Church OS Vercel Static Demo

This directory is a sanitized static showcase for Church OS. It is not the Flask runtime and it is not a data export.

## Safety Rules

- No live database.
- No secrets or environment files.
- No live email.
- No real church data.
- No source archive export.
- No uploaded document files.
- No provider credentials.
- Only synthetic Grace Fellowship Demo Church fixtures, example.org addresses, and 555-0100 style phone numbers.

## What This Demo Shows

- Intake -> review -> approval -> role access.
- Service events -> worship packet -> digital program -> physical bulletin projection helper.
- Postmaster as a communication trail concept.
- Archive records as reference-only.
- Songbook canon as a shared boundary separate from local Sunday use.
- Workspace cuts for runtime, demo, and builder views.
- Role-safe surfaces for public, worship, secretary, pastor, and admin views.

## Deploy To Vercel

From the governed project root:

```bash
cd church_os_vercel_demo
vercel deploy
vercel deploy --prod
```

The demo has no install step and no build step. Vercel can serve the files directly.

## Regenerate Or Update The Demo

1. Edit the static pages and `demo-data.json` by hand using only synthetic content.
2. Keep every email under `example.org`.
3. Keep every phone in the 555-0100 style range.
4. Run the safety scan from the governed project root:

```bash
.venv/bin/python scripts/check_demo_safety.py
```

If the scanner fails, fix the static demo content before deploying.
