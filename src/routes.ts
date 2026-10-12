import { SITE } from './site';

export interface RouteMeta {
  /** Router path, with trailing slash (GitHub Pages serves folder/index.html). */
  path: string;
  /** Navigation label. */
  label: string;
  title: string;
  description: string;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    label: 'Home',
    title: `${SITE.productName} — kubectl port-forward GUI for Windows`,
    description:
      'Manage multiple kubectl port-forward sessions from one Windows desktop app. Save profiles, monitor connections, read clear diagnostics and retry without juggling terminal windows.',
  },
  {
    path: '/features/',
    label: 'Features',
    title: `Features — ${SITE.productName}`,
    description:
      'Independent port-forward sessions, saved profiles, backup and restore, live connection status, log filtering, error diagnostics, safe process cleanup and localhost-only binding.',
  },
  {
    path: '/guide/',
    label: 'User Guide',
    title: `User Guide — ${SITE.productName}`,
    description:
      'How to install, select a kubeconfig, discover services, forward ports, manage profiles, export and import backups, and troubleshoot kubectl port forwarding on Windows.',
  },
  {
    path: '/faq/',
    label: 'FAQ',
    title: `FAQ — ${SITE.productName}`,
    description:
      'Answers about kubectl requirements, multiple clusters and services, credentials, profile backups, uninstalling, namespace discovery and administrator rights.',
  },
  {
    path: '/support/',
    label: 'Support',
    title: `Support — ${SITE.productName}`,
    description:
      'Getting started, troubleshooting common kubectl port-forward errors, profile backup and restore, and how to report bugs or request features.',
  },
  {
    path: '/privacy/',
    label: 'Privacy',
    title: `Privacy Policy — ${SITE.productName}`,
    description:
      'What Kube Port Forward Manager stores on your computer, how kubectl communicates with your clusters, and what the publisher does and does not collect.',
  },
  {
    path: '/changelog/',
    label: 'Changelog',
    title: `Release Notes — ${SITE.productName}`,
    description: 'Release history of Kube Port Forward Manager, starting with version 1.0.0.',
  },
];

export const NOT_FOUND: RouteMeta = {
  path: '/404/',
  label: 'Not found',
  title: `Page not found — ${SITE.productName}`,
  description: 'This page does not exist. Find features, the user guide, FAQ, support and the privacy policy for Kube Port Forward Manager.',
};

export const NAV_ITEMS = ['/features/', '/guide/', '/faq/', '/support/'].map(
  (path) => ROUTES.find((r) => r.path === path)!,
);

export function metaFor(pathname: string): RouteMeta {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return ROUTES.find((r) => r.path === normalized) ?? NOT_FOUND;
}

export const absoluteUrl = (path: string) => `${SITE.siteUrl}${path}`;
