# Screenshots – Interactive Resume

This is a Vite + React + Tailwind project configured for easy embedding in Notion and for simple deployment to GitHub Pages, Netlify, or Vercel.

## Development

```bash
cd Screenshots
npm ci
npm run dev
# open http://localhost:5173
```

## Build & Preview

```bash
cd Screenshots
npm run build
npm run preview
```

## Deploy Options

### GitHub Pages
- Repo contains a GitHub Actions workflow at `.github/workflows/deploy.yml`.
- Steps:
  1. Push to GitHub (main/master).
  2. Enable Pages in Repo Settings -> Pages -> Source: GitHub Actions.
  3. After action completes, a page URL is provided.

### Netlify
- This repo includes a `netlify.toml` at the project root.
- Config:
  - Base: `Screenshots`
  - Publish: `Screenshots/dist`
  - Build: `npm ci && npm run build`
- Connect repo to Netlify or drag-and-drop `Screenshots/dist` to deploy.

### Vercel
- This repo includes `vercel.json` at the project root.
- Set Root Directory to `Screenshots` in the Vercel project settings (handled in file).
- Build Command: `npm ci && npm run build`
- Output Directory: `dist`

## Notion Embed
- Once deployed, copy the public URL and use `/embed` in Notion to embed it.
- The Vite `base` is set to `./` for relative assets so it works in subpaths and iframes.
