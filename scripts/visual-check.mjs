// Local validation against a running preview (npm run preview) or the live site:
// every route at four viewports - no horizontal overflow, no console errors (including React
// hydration errors), screenshots; mobile menu and keyboard focus checks.
// Usage: node scripts/visual-check.mjs [baseUrl] [outDir]
// Requires an installed Chrome/Edge (CHROME_PATH), uses puppeteer-core (no browser download).
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const base = process.argv[2] ?? 'http://localhost:4173/KubePortForwardManager-Site/';
const outDir = process.argv[3] ?? 'docs/screenshots';
const browserPath =
  process.env.CHROME_PATH ??
  ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome'].find((p) => existsSync(p));
if (!browserPath) throw new Error('No Chrome/Edge found; set CHROME_PATH.');
mkdirSync(outDir, { recursive: true });

const ROUTES = ['', 'features/', 'guide/', 'faq/', 'support/', 'privacy/', 'changelog/'];
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'mobile', width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];
const SHOTS = new Set(['home-desktop', 'home-laptop', 'home-tablet', 'home-mobile', 'features-laptop', 'guide-tablet', 'privacy-mobile', 'support-mobile', 'faq-laptop', 'changelog-desktop']);

const browser = await puppeteer.launch({ executablePath: browserPath, headless: true, args: ['--no-first-run', '--no-default-browser-check'] });
const failures = [];
let checks = 0;
try {
  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.setViewport(vp);
      const res = await page.goto(base + route, { waitUntil: 'networkidle0' });
      const name = `${route.replace('/', '') || 'home'}-${vp.name}`;
      const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, h1: document.querySelectorAll('h1').length }));
      checks++;
      if (![200, 304].includes(res?.status() ?? 0)) failures.push(`${name}: HTTP ${res?.status()}`);
      if (metrics.scrollWidth > metrics.innerWidth) failures.push(`${name}: horizontal overflow ${metrics.scrollWidth} > ${metrics.innerWidth}`);
      if (metrics.h1 !== 1) failures.push(`${name}: ${metrics.h1} h1 elements`);
      if (errors.length) failures.push(`${name}: console errors: ${errors.join(' | ')}`);
      if (SHOTS.has(name)) await page.screenshot({ path: join(outDir, `${name}.png`) });
      await page.close();
    }
  }

  // Mobile menu: opens with the button, lists the routes, closes with Escape.
  const page = await browser.newPage();
  await page.setViewport(VIEWPORTS[3]);
  await page.goto(base, { waitUntil: 'networkidle0' });
  await page.click('button[aria-label="Open menu"]');
  const opened = await page.$eval('nav[aria-label="Mobile"]', (n) => !n.hidden && n.getBoundingClientRect().height > 0);
  await page.screenshot({ path: join(outDir, 'home-mobile-menu-open.png') });
  await page.keyboard.press('Escape');
  const closed = await page.$eval('nav[aria-label="Mobile"]', (n) => n.hidden);
  checks++;
  if (!opened || !closed) failures.push(`mobile menu: opened=${opened} closedByEscape=${closed}`);

  // Keyboard: the first Tab reaches the skip link, and focused elements show an outline.
  await page.setViewport(VIEWPORTS[1]);
  await page.goto(base, { waitUntil: 'networkidle0' });
  await page.keyboard.press('Tab');
  const focus = await page.evaluate(() => ({ text: document.activeElement?.textContent?.trim(), outline: getComputedStyle(document.activeElement).outlineStyle }));
  checks++;
  if (focus.text !== 'Skip to content' || focus.outline === 'none') failures.push(`keyboard focus: ${JSON.stringify(focus)}`);
  await page.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`visual check FAILED (${failures.length}/${checks}):\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`visual check passed: ${checks} checks (${ROUTES.length} routes x ${VIEWPORTS.length} viewports, mobile menu, keyboard focus). Screenshots in ${outDir}.`);
