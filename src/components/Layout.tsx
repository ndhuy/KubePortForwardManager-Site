import { useEffect, useId, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Code, Menu, X } from 'lucide-react';
import { NAV_ITEMS, absoluteUrl, metaFor } from '../routes';
import { SITE } from '../site';
import { Logo, StoreButton } from './ui';

function Header() {
  const location = useLocation();
  const menuId = useId();
  // The mobile menu belongs to the page it was opened on, so it closes itself after navigation.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === location.pathname;
  const setOpen = (value: boolean) => setOpenedOn(value ? location.pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenedOn(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium no-underline transition ${isActive ? 'text-white' : 'text-mist-300 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        {/* Plain link: the router would drop the trailing slash of the base path for "/". */}
        <a href={`${SITE.basePath}/`} className="flex items-center gap-2.5 text-mist-100 no-underline" aria-label={`${SITE.productName} home`}>
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">{SITE.productName}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <a href={SITE.repoUrl} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-mist-300 no-underline hover:text-white" rel="noopener">
            <Code className="h-4 w-4" aria-hidden="true" />
            GitHub<span className="sr-only"> (website repository)</span>
          </a>
          <StoreButton className="ml-2" />
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-mist-100 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <nav id={menuId} aria-label="Mobile" hidden={!open} className="border-t border-ink-800 px-5 pb-5 lg:hidden">
        <ul className="flex flex-col gap-1 pt-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={({ isActive }) => `block rounded-lg px-3 py-2.5 no-underline ${isActive ? 'bg-ink-800 text-white' : 'text-mist-300'}`}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a href={SITE.repoUrl} className="block rounded-lg px-3 py-2.5 text-mist-300 no-underline" rel="noopener">
              GitHub (website repository)
            </a>
          </li>
        </ul>
        <StoreButton className="mt-3 w-full justify-center" />
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-800 bg-ink-900/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-mist-100">
            <Logo className="h-7 w-7" />
            <span className="font-semibold">{SITE.productName}</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-mist-400">
            A Windows desktop app for managing multiple <code>kubectl port-forward</code> sessions. Published by {SITE.publisher}.
          </p>
        </div>
        <nav aria-label="Product">
          <p className="text-sm font-semibold text-mist-100">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-mist-400 no-underline hover:text-teal-300" to="/features/">Features</Link></li>
            <li><Link className="text-mist-400 no-underline hover:text-teal-300" to="/guide/">User Guide</Link></li>
            <li><Link className="text-mist-400 no-underline hover:text-teal-300" to="/changelog/">Release Notes</Link></li>
            <li><a className="text-mist-400 no-underline hover:text-teal-300" href={SITE.storeUrl} rel="noopener">Microsoft Store listing</a></li>
          </ul>
        </nav>
        <nav aria-label="Help and legal">
          <p className="text-sm font-semibold text-mist-100">Help &amp; legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-mist-400 no-underline hover:text-teal-300" to="/support/">Support</Link></li>
            <li><Link className="text-mist-400 no-underline hover:text-teal-300" to="/faq/">FAQ</Link></li>
            <li><Link className="text-mist-400 no-underline hover:text-teal-300" to="/privacy/">Privacy Policy</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink-800">
        <div className="mx-auto max-w-6xl space-y-2 px-5 py-6 text-xs leading-5 text-mist-400">
          <p>{SITE.disclaimer}</p>
          <p>{SITE.trademarkNote}</p>
          <p>© {SITE.publisher}. Microsoft Store ID {SITE.storeId}.</p>
        </div>
      </div>
    </footer>
  );
}

/** Keeps title, description and canonical in sync during client-side navigation. */
function useDocumentMeta() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const relative = pathname.startsWith(SITE.basePath) ? pathname.slice(SITE.basePath.length) || '/' : pathname;
    const meta = metaFor(relative);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', absoluteUrl(meta.path));
  }, [pathname]);
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function Layout({ children }: { children: ReactNode }) {
  useDocumentMeta();
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
