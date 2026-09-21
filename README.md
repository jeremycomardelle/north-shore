# North Shore Custom Rifles — Website

Single-page marketing site for North Shore Custom Rifles, a Louisiana gunsmith building PRS, NRL Hunter, PRS22 and NRL22 competition rifles plus hunting and rimfire precision rifles. Static HTML/CSS/JS — no build step — deployed to Azure Static Web Apps.

## Local development

```bash
npx serve .
```

(Opening `index.html` via `file://` won't load assets correctly — use a local server.)

## Editing

- Copy lives in `index.html`; colors/fonts are CSS variables at the top of `css/style.css` (`--accent` is the rifle-chassis green).
- Logo: `assets/images/logo2.jpg`.
- Facebook: https://www.facebook.com/NScustomrifles — Instagram: https://www.instagram.com/northshorecustomrifles/

## Adding photos

Photo sections are built from folders. Drop a photo in the right folder and it shows up:

| Folder | Section |
|---|---|
| `assets/images/action/` | Action shots |
| `assets/images/builds/` | Completed builds |
| `assets/images/machine/` | Machine work |
| `assets/images/specialty/` | Specialty (bolt knobs, trimmer holders) |
| `assets/images/leaderboard/` | On the leaderboard |

Then run `node scripts/build-gallery.js` (it rewrites `js/gallery-data.js`; deploys also run it) and refresh. Use .jpg/.png/.webp, ideally ~1600px wide (the script warns about files over 1 MB; convert iPhone .heic to .jpg first). An optional `captions.json` in a folder adds captions, alt text or `"rotate": 180`; see the comment at the top of the script. Photos that aren't in a section (range banner, About photo) live in `assets/images/site/`.

## Deployment

GitHub Actions (`.github/workflows/azure-static-web-apps.yml`) deploys to Azure Static Web Apps. Pushes to `main` deploy to production; pull requests get a preview environment that is torn down when the PR closes. Requires the `AZURE_STATIC_WEB_APPS_API_TOKEN` repo secret.
