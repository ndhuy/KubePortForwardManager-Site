// Writes one static HTML file per route (dist/<route>/index.html), dist/404.html,
// sitemap.xml and robots.txt, so every URL works on GitHub Pages when opened directly.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');

const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the prerender placeholders.');
}

const { render, ROUTES, SITE, absoluteUrl } = await import(pathToFileURL(ssrEntry).href);

const page = ({ html, head }) =>
  template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

for (const route of ROUTES) {
  const file = join(dist, ...route.path.split('/').filter(Boolean), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(render(route.path)));
  console.log(`prerendered ${route.path} -> ${file.slice(root.length + 1)}`);
}

await writeFile(join(dist, '404.html'), page(render('/404/', { notFound: true })));
console.log('prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.map((r) => `  <url><loc>${absoluteUrl(r.path)}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.siteUrl}/sitemap.xml\n`);
await writeFile(join(dist, '.nojekyll'), '');
await rm(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('wrote sitemap.xml, robots.txt, .nojekyll');
