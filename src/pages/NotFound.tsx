import { Link } from 'react-router';
import { ROUTES } from '../routes';
import { SITE } from '../site';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-teal-300 uppercase">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-lg">The page you were looking for does not exist. Try one of these instead:</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {ROUTES.map((r) => (
          <li key={r.path}>
            {r.path === '/' ? (
              <a href={`${SITE.basePath}/`} className="inline-block rounded-xl border border-ink-700 bg-ink-900 px-4 py-2 text-mist-100 no-underline hover:border-accent-400">
                {r.label}
              </a>
            ) : (
              <Link to={r.path} className="inline-block rounded-xl border border-ink-700 bg-ink-900 px-4 py-2 text-mist-100 no-underline hover:border-accent-400">
                {r.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
