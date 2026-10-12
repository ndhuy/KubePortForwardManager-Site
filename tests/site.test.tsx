import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { App } from '../src/App';
import { headTags } from '../src/head';
import { NOT_FOUND, ROUTES, metaFor } from '../src/routes';
import { SITE, storeCtaLabel } from '../src/site';

const BASE = SITE.basePath;

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[`${BASE}${path}`]} basename={BASE}>
      <App />
    </MemoryRouter>,
  );
}

describe('routes', () => {
  it.each(ROUTES.map((r) => r.path))('%s renders exactly one h1, the footer disclaimer and the Store link', (path) => {
    renderAt(path);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText(SITE.disclaimer)).toBeInTheDocument();
    const storeLinks = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === SITE.storeUrl);
    expect(storeLinks.length).toBeGreaterThan(0);
  });

  it('unknown paths render the 404 page', () => {
    renderAt('/does-not-exist/');
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
  });

  it('every internal link points to a known route (with trailing slash) or an in-page anchor', () => {
    const known = new Set(ROUTES.map((r) => `${BASE}${r.path}`));
    for (const route of ROUTES) {
      const { unmount, container } = renderAt(route.path);
      for (const a of container.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href')!;
        if (/^(https?:|mailto:)/.test(href) || href.startsWith('#')) continue;
        expect(href.includes('#/'), `${route.path}: hash route ${href}`).toBe(false);
        const [page] = href.split('#');
        expect(known.has(page!), `${route.path}: ${href}`).toBe(true);
      }
      unmount();
    }
  });
});

describe('Microsoft Store messaging', () => {
  it('uses the official Store URL and ID', () => {
    expect(SITE.storeUrl).toBe('https://apps.microsoft.com/detail/9NT5MP72TXR7');
    expect(SITE.storeId).toBe('9NT5MP72TXR7');
    expect(SITE.publisher).toBe('HuyNguyenVN');
  });

  it('does not claim public availability before release', () => {
    expect(SITE.storeAvailable).toBe(false);
    renderAt('/');
    expect(screen.getAllByText(storeCtaLabel()).length).toBeGreaterThan(0);
    expect(document.body.textContent).toContain('Coming soon to Microsoft Store');
    expect(document.body.textContent).not.toMatch(/Get it on Microsoft Store|available now|download now/i);
  });

  it('switches wording when the listing goes live', () => {
    expect(storeCtaLabel(true)).toBe('Get it on Microsoft Store');
  });

  it('labels screenshots honestly', () => {
    renderAt('/');
    const figures = screen.getAllByRole('figure');
    for (const f of figures) expect(within(f).getByText(/Actual app screenshot with demo data/)).toBeInTheDocument();
    for (const img of screen.getAllByRole('img')) expect(img).toHaveAttribute('alt');
  });
});

describe('home page content', () => {
  it('has the required headline, sections and requirements', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kubernetes Port Forwarding, Simplified.');
    for (const feature of [
      'Multiple simultaneous sessions', 'Saved connection profiles', 'Connect All / Disconnect All', 'Live connection status',
      'Logs and diagnostics', 'Retry failed connections', 'Profile backup and restore', 'Localhost-only forwarding',
    ]) expect(screen.getByRole('heading', { name: feature })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How it works' })).toBeInTheDocument();
    for (const who of ['Kubernetes Developers', 'DevOps Engineers', 'QA / Automation Engineers', 'Platform Engineers', 'SREs'])
      expect(screen.getByText(who)).toBeInTheDocument();
    expect(document.body.textContent).toContain('kubectl installed separately');
    expect(document.body.textContent).toContain('does not include Kubernetes credentials');
  });

  it('never makes absolute or paid-tier claims', () => {
    for (const route of ROUTES) {
      const { unmount } = renderAt(route.path);
      const text = document.body.textContent ?? '';
      expect(text, route.path).not.toMatch(/100% secure|guaranteed|zero failures|premium tier|subscription plan|\$\d/i);
      unmount();
    }
  });
});

describe('privacy policy', () => {
  it('distinguishes local data, kubectl communication and publisher data', () => {
    renderAt('/privacy/');
    const text = document.body.textContent ?? '';
    for (const expected of [
      'Data processed and stored locally by the app',
      'Communication initiated by kubectl with Kubernetes infrastructure',
      'Data collected by the publisher',
      'Kubeconfig file path references',
      'Namespace and service names',
      'Local and remote port numbers',
      'Application logs',
      'Exported backup files',
      'not encrypted',
      'no analytics, telemetry',
      'Retention and deletion',
      SITE.publisher,
    ]) expect(text, expected).toContain(expected);
    // kubectl does communicate with clusters: the policy must not deny all network activity.
    expect(text).not.toMatch(/never makes (any )?network/i);
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href') === SITE.issuesUrl)).toBe(true);
  });

  it('gives the publisher contact email (provided by the publisher)', () => {
    expect(SITE.contactEmail).toBe('huynd1709@gmail.com');
    for (const path of ['/privacy/', '/support/']) {
      const { unmount } = renderAt(path);
      const mailto = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === `mailto:${SITE.contactEmail}`);
      expect(mailto.length, path).toBeGreaterThanOrEqual(2);   // page body + footer
      unmount();
    }
  });
});

describe('support and FAQ', () => {
  it('support covers the required topics and warns about sensitive data', () => {
    renderAt('/support/');
    for (const heading of ['kubectl not found', 'Kubeconfig errors', 'Kubernetes RBAC restrictions', 'Local port already in use', 'Profile backup and restore', 'Report a bug or request a feature'])
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    const warning = screen.getByRole('complementary', { name: 'Never post sensitive information' });
    for (const item of ['kubeconfig contents', 'access tokens', 'passwords', 'private cluster endpoints']) expect(warning).toHaveTextContent(item);
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href')?.startsWith(SITE.issuesUrl))).toBe(true);
  });

  it('FAQ answers the ten required questions', () => {
    renderAt('/faq/');
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(10);
    expect(screen.getByText('Is this an official Kubernetes or Microsoft product?')).toBeInTheDocument();
  });

  it('guide explains backups are not credentials and not encrypted, and to export before uninstalling', () => {
    renderAt('/guide/');
    const text = document.body.textContent ?? '';
    expect(text).toContain('does not contain your kubeconfig file');
    expect(text).toContain('not encrypted');
    expect(text).toContain('Export before uninstalling');
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(12);
  });

  it('changelog marks 1.0.0 as upcoming without a release date', () => {
    renderAt('/changelog/');
    expect(screen.getByRole('heading', { name: 'Version 1.0.0' })).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/Released on|\b20\d\d-\d\d-\d\d\b/);
  });
});

describe('navigation', () => {
  it('mobile menu opens, exposes state, and closes with Escape', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('has a skip link to the main content', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
  });
});

describe('SEO metadata', () => {
  it.each(ROUTES)('$path has title, description, canonical and Open Graph tags', (route) => {
    const head = headTags(route);
    expect(head).toContain(`<title>${route.title.replace(/&/g, '&amp;')}</title>`);
    expect(head).toContain(`<link rel="canonical" href="${SITE.siteUrl}${route.path}" />`);
    expect(head).toContain('property="og:image"');
    expect(route.description.length).toBeGreaterThan(50);
    expect(route.description.length).toBeLessThanOrEqual(200);
  });

  it('404 is noindex and has no canonical', () => {
    const head = headTags(NOT_FOUND, { noindex: true });
    expect(head).toContain('noindex');
    expect(head).not.toContain('canonical');
  });

  it('titles are unique', () => {
    expect(new Set(ROUTES.map((r) => r.title)).size).toBe(ROUTES.length);
  });

  it('metaFor tolerates a missing trailing slash', () => {
    expect(metaFor('/privacy').path).toBe('/privacy/');
    expect(metaFor('/nope/')).toBe(NOT_FOUND);
  });
});
