import { PageHeader } from '../components/ui';
import { SITE } from '../site';

const RELEASES = [
  {
    version: '1.0.0',
    status: SITE.storeAvailable ? 'Released' : 'Upcoming',
    note: SITE.storeAvailable ? null : 'Not yet published on the Microsoft Store. The release date will be added when it is available.',
    groups: [
      {
        title: 'Port forwarding',
        items: [
          'Multiple simultaneous kubectl port-forward sessions, one independent process per row',
          'Connect, Disconnect and Retry per row; Connect All and Disconnect All',
          'Live status per row with connection duration, and an overall summary',
          'Localhost-only forwarding (127.0.0.1 and ::1)',
          'Cleanup of every kubectl process the app started, including processes started by kubectl shims',
          'Copy endpoint, copy the equivalent kubectl command, and open http(s)://127.0.0.1:<port> on request',
        ],
      },
      {
        title: 'Profiles',
        items: [
          'Profiles with kubeconfig path, namespace, request timeout and port-forward rows',
          'Namespace and service discovery, with a fallback when namespaces cannot be listed',
          'Unsaved-change tracking and safe switching',
          'Export and import profile backups, with a preview and conflict handling (skip or import as copies)',
          'Display of the actual profile storage location, and a shortcut to open its folder',
        ],
      },
      {
        title: 'Diagnostics',
        items: [
          'Plain-language error explanations with the original kubectl output',
          'Live log with service and severity filters, copy and clear',
          'Redaction of known secret formats in logs',
        ],
      },
    ],
  },
];

export default function Changelog() {
  return (
    <>
      <PageHeader eyebrow="Release notes" title="Changelog" intro={<p>What changed in each version of {SITE.productName}.</p>} />
      <div className="mx-auto max-w-3xl space-y-10 px-5 py-12">
        {RELEASES.map((release) => (
          <section key={release.version} aria-labelledby={`v-${release.version}`} className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id={`v-${release.version}`} className="text-2xl font-semibold">Version {release.version}</h2>
              <span className="rounded-full border border-teal-300/40 bg-teal-300/10 px-3 py-0.5 text-xs font-semibold text-teal-300">{release.status}</span>
            </div>
            {release.note && <p className="mt-2 text-sm text-mist-400">{release.note}</p>}
            <p className="mt-4">First release.</p>
            {release.groups.map((group) => (
              <div key={group.title} className="mt-6">
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-6 text-[15px] leading-7">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
