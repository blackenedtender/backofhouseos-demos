# Brand Asset Manifest

This repo uses public demo-safe Creative Origin logo assets.

## Included Assets

| File | Use |
| --- | --- |
| `assets/tco-logo-color.png` | Source color logo copied from the Creative Origin branding archive |
| `assets/tco-logo-web.png` | Compact web logo copied from the Creative Origin branding archive |
| `assets/tco-logo-black.png` | Derived black PNG for light surfaces |
| `assets/tco-logo-white.png` | Derived white PNG for dark surfaces |

## Rules

- Use PNG logo assets in demos.
- Do not reference private drive paths in public demo code.
- Do not include PSD working files in this repo.
- Keep source design files in the private branding archive.

## Vercel Folder Deploy Rule

Each demo folder also contains its own `assets/` copy of the logo files. This is intentional. Vercel projects use each demo folder as the Root Directory, so demo pages must reference local paths such as `assets/tco-logo-web.png` instead of repo-root paths.
