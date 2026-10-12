import { absoluteUrl, type RouteMeta } from './routes';
import { SITE } from './site';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Static <head> tags for one prerendered page. */
export function headTags(meta: RouteMeta, options: { noindex?: boolean } = {}): string {
  const url = absoluteUrl(meta.path);
  const image = `${SITE.siteUrl}/og-image.png`;
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    options.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(SITE.productName)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(`${SITE.productName}: Kubernetes port forwarding, simplified`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  if (meta.path === '/') {
    // Only facts: no price, rating or availability claims.
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE.productName,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows 10, Windows 11',
      description: meta.description,
      url,
      publisher: { '@type': 'Organization', name: SITE.publisher },
      softwareVersion: SITE.version,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}
