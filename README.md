# Nextgen — AI Video Editor (MVP)

This repository is an MVP scaffold for a browser-based video editor using React + Vite + Tailwind + ffmpeg.wasm.

Features in this scaffold:
- Landing page + simple Editor
- Upload, trim, and download a trimmed clip using ffmpeg.wasm
- Tailwind-based responsive UI

Getting started:
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open `http://localhost:5173` and click Open Editor

Notes & next steps:
- ffmpeg.wasm runs in the browser and is CPU/memory intensive. For larger workloads, add server-side processing and background jobs.
- Monetization ideas: freemium (watermark removal, higher export quality), subscriptions, paid filters.
- Internationalization: UI is English-ready. Add i18n library (react-intl / i18next) later.
