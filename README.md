# calculatr

A small React PWA with premade calculations. Pick a calculation, enter values, tap **Calculate**.

## Run locally

```sh
npm install
npm run dev        # dev server, also reachable from your phone on the same Wi-Fi
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Add a calculation

Add an entry to [`src/calculations.js`](src/calculations.js) — it shows up on the home screen automatically.

## Install on iPhone

1. Deploy `dist/` to any static HTTPS host (Netlify, Vercel, Cloudflare Pages, GitHub Pages…).
2. Open the URL in **Safari** → Share → **Add to Home Screen**.

HTTPS is required for offline support (service worker). Opening the dev server over your
LAN (`http://<your-mac-ip>:5173`) works for trying it out, but won't work offline.

## Icons

Regenerate with `npm run icons` (edit colors in `scripts/make-icons.js`).
