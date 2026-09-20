# North Shore Custom Rifles — Website

Single-page marketing site for North Shore Custom Rifles, a Louisiana gunsmith building PRS, NRL Hunter, PRS22 and NRL22 competition rifles plus hunting and .22 precision rifles. Static HTML/CSS/JS — no build step — deployed to Azure Static Web Apps.

## Local development

```bash
npx serve .
```

(Opening `index.html` via `file://` won't load assets correctly — use a local server.)

## Editing

- Copy lives in `index.html`; colors/fonts are CSS variables at the top of `css/style.css` (`--accent` is the rifle-chassis green).
- Logo: `assets/images/logo.jpg`.
- Facebook: https://www.facebook.com/NScustomrifles — Instagram: https://www.instagram.com/northshorecustomrifles/

## Deployment

GitHub Actions (`.github/workflows/azure-static-web-apps.yml`) deploys to Azure Static Web Apps. Pushes to `main` deploy to production; pull requests get a preview environment that is torn down when the PR closes. Requires the `AZURE_STATIC_WEB_APPS_API_TOKEN` repo secret.
