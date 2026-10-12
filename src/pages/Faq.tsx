import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../components/ui';
import { SITE } from '../site';

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: 'Is Kube Port Forward Manager free?',
    a: (
      <>
        The price is shown on the <a href={SITE.storeUrl}>Microsoft Store listing</a>
        {SITE.storeAvailable ? '' : ' once the app is published'}. The app has no subscriptions, paid tiers or in-app purchases.
      </>
    ),
  },
  {
    q: 'Do I need kubectl installed?',
    a: (
      <>
        Yes. The app runs the <code>kubectl</code> installed on your computer and does not include it. kubectl must be on your PATH.
        See <Link to="/guide/#kubectl">installing kubectl</Link>.
      </>
    ),
  },
  {
    q: 'Does it work with multiple Kubernetes clusters?',
    a: (
      <>
        Yes, through profiles. Each profile points to one kubeconfig and uses that file&apos;s current context, so you can keep one profile
        per cluster or environment. The port forwards of one profile run at a time: disconnect before switching to another profile.
      </>
    ),
  },
  {
    q: 'Can I forward multiple services at once?',
    a: <>Yes. Add one row per service and connect them individually or with Connect All. Each row runs its own kubectl process.</>,
  },
  {
    q: 'Does the app store Kubernetes credentials?',
    a: (
      <>
        No. Profiles store the <em>path</em> to your kubeconfig, plus namespace, service names and ports. The app only reads kubeconfig files when
        it runs kubectl. It never copies them, and backups never include their contents. Credentials stay wherever your kubeconfig and
        credential plugins keep them.
      </>
    ),
  },
  {
    q: 'Can I export and import profiles?',
    a: (
      <>
        Yes. <strong>Backup ▾ → Export Profiles…</strong> writes all saved profiles to a JSON file. <strong>Import Profiles…</strong> restores them with a
        preview, and existing profiles are never overwritten. Backups are not encrypted, so store them securely.
        See <Link to="/guide/#export">exporting</Link> and <Link to="/guide/#import">importing</Link>.
      </>
    ),
  },
  {
    q: 'What happens when I uninstall the app?',
    a: (
      <>
        Windows removes the app. On a fresh Microsoft Store installation, profiles are usually kept in package-managed storage, which Windows
        also removes. <strong>Export your profiles before uninstalling.</strong> Your kubeconfig files are never touched.
        See <Link to="/guide/#storage">profile storage</Link>.
      </>
    ),
  },
  {
    q: 'Why does namespace discovery sometimes fail?',
    a: (
      <>
        Discovery runs kubectl against your cluster, so it fails for the same reasons kubectl does:
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>an expired login;</li>
          <li>no network or VPN connection;</li>
          <li>an invalid kubeconfig;</li>
          <li>missing permissions.</li>
        </ul>
        If your account cannot list namespaces, the app derives them from the services you can see, and you can always type a namespace.
        The error message explains what happened.
      </>
    ),
  },
  {
    q: 'Does the app require administrator privileges?',
    a: <>No. It installs per user from the Microsoft Store and runs as a standard user. It does not change firewall or network settings.</>,
  },
  {
    q: 'Is this an official Kubernetes or Microsoft product?',
    a: <>No. {SITE.disclaimer}</>,
  },
];

export default function Faq() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Frequently asked questions" intro={<p>Short answers about requirements, data, backups and behaviour.</p>} />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="divide-y divide-ink-800 rounded-2xl border border-ink-800 bg-ink-900/50">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-mist-100">
                <h2 className="text-base">{q}</h2>
                <span aria-hidden="true" className="text-teal-300 transition group-open:rotate-45">+</span>
              </summary>
              <div className="prose-doc mt-3 text-[15px] [&>p]:my-2">{a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm">
          Still stuck? See <Link className="text-accent-400 hover:text-teal-300" to="/support/">Support</Link>.
        </p>
      </div>
    </>
  );
}
