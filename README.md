# Kube Port Forward Manager — website

Official website for **Kube Port Forward Manager**, a Windows desktop app for managing multiple
`kubectl port-forward` sessions.

- Live site: https://ndhuy.github.io/KubePortForwardManager-Site/
- Privacy Policy: https://ndhuy.github.io/KubePortForwardManager-Site/privacy/
- Support: https://ndhuy.github.io/KubePortForwardManager-Site/support/
- Microsoft Store: https://apps.microsoft.com/detail/9NT5MP72TXR7 (Store ID `9NT5MP72TXR7`)

This repository contains **only the website**, not the desktop application's source code. Bug
reports and feature requests for the app are welcome in
[Issues](https://github.com/ndhuy/KubePortForwardManager-Site/issues). Never post kubeconfig
contents, tokens, passwords or private cluster endpoints.

## Stack

React · TypeScript · Vite · Tailwind CSS · Lucide icons, hosted as a static site on GitHub Pages.
There is no backend, no cookies, no analytics and no third-party scripts or fonts.

Every route is **prerendered to static HTML**:

- `dist/<route>/index.html` for each route;
- `404.html`, `sitemap.xml` and `robots.txt`.

Pages therefore work when opened directly or refreshed on GitHub Pages, without hash routing.
React hydrates the prerendered HTML in the browser.

| Path | Purpose |
|---|---|
| `src/site.ts` | Product facts and URLs, including `storeAvailable` |
| `src/routes.ts` | Routes and their title / description |
| `src/pages/*` | Page content |
| `src/entry-server.tsx`, `scripts/prerender.mjs` | Static HTML generation |
| `scripts/check-dist.mjs` | Post-build checks: links, assets, SEO tags, one `h1`, image alt |
| `scripts/visual-check.mjs` | Optional local check: 4 viewports, overflow, console errors, mobile menu, keyboard focus, screenshots |
| `.github/workflows/deploy.yml` | Lint, typecheck, test, build, deploy to GitHub Pages |

## Development

Requires Node.js 22 or later.

```bash
npm ci
npm run dev          # http://localhost:5173/KubePortForwardManager-Site/
npm run lint
npm run typecheck
npm test
npm run build        # client + SSR build, prerender, dist checks
npm run preview      # http://localhost:4173/KubePortForwardManager-Site/
node scripts/visual-check.mjs   # with preview running; needs Chrome or Edge (CHROME_PATH)
```

## Deployment

Each push to `main` runs `.github/workflows/deploy.yml`: install, lint, typecheck, test, build,
then deploy `dist/` to GitHub Pages through the `github-pages` environment. Pull requests run the
same checks without deploying.

One-time repository setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## When the app is published on the Microsoft Store

In `src/site.ts`, set `storeAvailable: true`. The call to action changes from "Coming soon to
Microsoft Store" to "Get it on Microsoft Store", and the changelog marks 1.0.0 as released. Add the
release date to `src/pages/Changelog.tsx`, then push.

## Content rules

- Describe only implemented app behaviour.
- Never invent contact details, dates or legal information.
- Screenshots are real app screenshots with demo data, labelled as such.
- Use no third-party logos.

Kube Port Forward Manager is an independent application and is not affiliated with, endorsed by,
or sponsored by Microsoft, the Linux Foundation, or the Cloud Native Computing Foundation.
