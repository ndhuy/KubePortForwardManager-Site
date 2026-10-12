// Post-build checks on dist/: every internal link and asset resolves to a file, every page has
// the expected SEO tags, and no hash routes are used.
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const BASE = '/KubePortForwardManager-Site/';
const SITE_URL = 'https://ndhuy.github.io/KubePortForwardManager-Site';
const EXPECTED = ['index.html', 'features/index.html', 'guide/index.html', 'faq/index.html', 'support/index.html', 'privacy/index.html', 'changelog/index.html', '404.html', 'sitemap.xml', 'robots.txt'];

const problems = [];
const walk = async (dir) => (await readdir(dir, { withFileTypes: true })).flatMap((e) => (e.isDirectory() ? [] : [join(dir, e.name)])).concat(
  ...(await Promise.all((await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => walk(join(dir, e.name))))),
);

for (const file of EXPECTED) if (!existsSync(join(dist, file))) problems.push(`missing ${file}`);

const htmlFiles = (await walk(dist)).filter((f) => f.endsWith('.html'));
const resolveTarget = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean.startsWith(BASE)) return null;
  const rel = clean.slice(BASE.length);
  const candidates = rel === '' || rel.endsWith('/') ? [join(dist, rel, 'index.html')] : [join(dist, rel), join(dist, rel, 'index.html')];
  return candidates.some((c) => existsSync(c)) ? true : clean;
};

let links = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const name = relative(dist, file).replaceAll('\\', '/');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:)/.test(url)) continue;
    links++;
    if (url.includes('#/')) problems.push(`${name}: hash route ${url}`);
    if (!url.startsWith(BASE)) { problems.push(`${name}: link outside base path ${url}`); continue; }
    const missing = resolveTarget(url);
    if (missing !== true) problems.push(`${name}: broken internal link ${url}`);
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${id}"`)) problems.push(`${name}: in-page anchor #${id} has no target`);
  }
  const isNotFound = name === '404.html';
  if (!/<title>[^<]{10,}<\/title>/.test(html)) problems.push(`${name}: missing title`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) problems.push(`${name}: missing description`);
  if (!html.includes('property="og:image"')) problems.push(`${name}: missing og:image`);
  if (!isNotFound && !html.includes(`<link rel="canonical" href="${SITE_URL}/`)) problems.push(`${name}: missing canonical`);
  if (isNotFound && !html.includes('noindex')) problems.push('404.html: should be noindex');
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) problems.push(`${name}: expected exactly one <h1>`);
  if (!html.includes('<html lang="en">')) problems.push(`${name}: missing lang`);
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]+"/.test(img)) problems.push(`${name}: image without alt`);
}

if (problems.length) {
  console.error(`dist check FAILED (${problems.length}):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`dist check passed: ${htmlFiles.length} HTML files, ${links} internal links/assets resolved.`);
