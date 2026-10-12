import type { ReactNode } from 'react';
import { ArrowRight, Info, ShieldAlert, Store } from 'lucide-react';
import { SITE, storeCtaLabel } from '../site';

/** Original app mark: rounded square with two opposite arrows (port forwarding). */
export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="kpfm-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#kpfm-mark)" />
      <g fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 23h32M41 16l7 7-7 7" />
        <path d="M48 41H16M23 34l-7 7 7 7" />
      </g>
    </svg>
  );
}

export function StoreButton({ size = 'md', className = '' }: { size?: 'md' | 'lg'; className?: string }) {
  const sizing = size === 'lg' ? 'px-6 py-3.5 text-base' : 'px-4 py-2 text-sm';
  return (
    <a
      href={SITE.storeUrl}
      className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-teal-400 font-semibold text-ink-950 no-underline shadow-lg shadow-accent-500/20 transition hover:brightness-110 ${sizing} ${className}`}
      rel="noopener"
    >
      <Store className="h-5 w-5" aria-hidden="true" />
      {storeCtaLabel()}
      {!SITE.storeAvailable && <span className="sr-only"> (Microsoft Store listing, Store ID {SITE.storeId})</span>}
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-850/60 px-6 py-3.5 text-base font-semibold text-mist-100 no-underline transition hover:border-accent-400 hover:text-white"
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: ReactNode }) {
  return (
    <header className="border-b border-ink-800 bg-gradient-to-b from-ink-900 to-ink-950">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <p className="text-sm font-semibold tracking-wide text-teal-300 uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <div className="mt-5 max-w-3xl text-lg leading-8 text-mist-300">{intro}</div>
      </div>
    </header>
  );
}

export function Callout({ tone = 'info', title, children }: { tone?: 'info' | 'warning'; title: string; children: ReactNode }) {
  const Icon = tone === 'warning' ? ShieldAlert : Info;
  const colors = tone === 'warning' ? 'border-amber-400/40 bg-amber-400/5' : 'border-accent-400/40 bg-accent-500/5';
  const iconColor = tone === 'warning' ? 'text-amber-300' : 'text-accent-400';
  return (
    <aside className={`my-6 flex gap-3 rounded-xl border p-4 ${colors}`} aria-label={title}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} aria-hidden="true" />
      <div className="text-sm leading-6">
        <p className="font-semibold text-mist-100">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </aside>
  );
}

/** A real application screenshot. Demo data is labelled as such. */
export function Screenshot({
  src,
  alt,
  caption,
  width = 1440,
  height = 900,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl shadow-black/40">
      <img
        src={`${import.meta.env.BASE_URL}${src}`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="block h-auto w-full"
      />
      <figcaption className="border-t border-ink-800 px-4 py-2.5 text-xs text-mist-400">{caption}</figcaption>
    </figure>
  );
}

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="rounded-xl border border-ink-800 bg-ink-900/60 p-5 text-sm">
      <p className="font-semibold text-mist-100">On this page</p>
      <ol className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a className="text-mist-400 no-underline hover:text-teal-300" href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
