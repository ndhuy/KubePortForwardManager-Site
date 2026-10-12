import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { headTags } from './head';
import { NOT_FOUND, ROUTES, absoluteUrl } from './routes';
import { SITE } from './site';

export { ROUTES, NOT_FOUND, SITE, absoluteUrl };

/** Renders one route to HTML for static prerendering. */
export function render(path: string, options: { notFound?: boolean } = {}) {
  const location = `${SITE.basePath}${options.notFound ? '/__not-found__/' : path}`;
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={location} basename={SITE.basePath}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const meta = options.notFound ? NOT_FOUND : ROUTES.find((r) => r.path === path)!;
  return { html, head: headTags(meta, { noindex: options.notFound }) };
}
