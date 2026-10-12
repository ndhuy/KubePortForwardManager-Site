# Validation — Phase W1 (2026-10-12)

## Automated (CI and local)

| Check | Result |
|---|---|
| Lint (ESLint) | Pass |
| Typecheck (`tsc --noEmit`) | Pass |
| Tests (Vitest) | **32 / 32 passed** |
| Production build | Pass: 7 routes + 404 prerendered |
| `check-dist` | Pass: 8 HTML files, 179 internal links and assets resolved; SEO tags, one `h1`, image `alt` |
| GitHub Actions run | Pass: build, then deploy to the `github-pages` environment |

What the tests cover:

- **Routes:** every route has one `h1`, the footer disclaimer and a Store link; unknown paths render
  404; no hash routes; every internal link resolves.
- **Store messaging:** the official Store URL and ID; "Coming soon" before release.
- **Content:** screenshots labelled as demo data; no absolute or paid-tier claims.
- **Privacy:** the policy separates local data, kubectl communication and publisher data.
- **Support:** warnings about sensitive information.
- **FAQ, guide and changelog:** the FAQ has 10 questions; the guide covers backups (not
  credentials, not encrypted, export before uninstalling); the changelog marks 1.0.0 as upcoming.
- **Navigation:** the mobile menu (`aria-expanded`, Escape); the skip link.
- **SEO tags:** title, description, canonical and Open Graph on every page; 404 is `noindex`.

## Live site (https://ndhuy.github.io/KubePortForwardManager-Site/)

Checked without authentication.

| Check | Result |
|---|---|
| `/`, `/features/`, `/guide/`, `/faq/`, `/support/`, `/privacy/`, `/changelog/` opened directly | 200, each with its own title and canonical URL |
| Path without trailing slash (e.g. `/privacy`) | 301 to `/privacy/` |
| Unknown path (`/does-not-exist/`, `/guide/nope/deeper`) | 404 with the site's "Page not found" page (`noindex`) |
| `sitemap.xml`, `robots.txt`, `og-image.png`, `favicon.svg`, screenshots | 200 |
| Microsoft Store link | `https://apps.microsoft.com/detail/9NT5MP72TXR7`, labelled "Coming soon" because the listing is not public yet (HTTP 410 when checked) |
| `scripts/visual-check.mjs` | **30 / 30 passed**: 7 routes × 4 viewports (1920×1080, 1366×768, 768×1024, 375×812), no horizontal overflow, no console or hydration errors, mobile menu open and close, keyboard focus on the skip link with a visible outline |

## Lighthouse 13.5 on the live site

Mobile form factor with simulated throttling. Scores are measurements at one point in time, not
guarantees.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | 98 | 100 | 100 | 100 | 2.06 s | 0 | 6 ms |
| Privacy | 100 | 100 | 100 | 100 | 1.35 s | 0 | 0 ms |
| Support | 100 | 100 | 100 | 100 | 1.36 s | 0 | 0 ms |
| Features | 100 | 100 | 100 | 100 | 1.38 s | 0 | 0 ms |

## Screenshots

`docs/screenshots/` contains the home page at four viewports, the open mobile menu, and the
Features, Guide, FAQ, Privacy, Support and Changelog pages.
