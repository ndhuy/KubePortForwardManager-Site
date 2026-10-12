import type { ReactNode } from 'react';
import { Activity, ArchiveRestore, Layers, Lock, Save, ScrollText, ShieldCheck, Stethoscope, Workflow } from 'lucide-react';
import { PageHeader, Screenshot } from '../components/ui';

function Feature({ id, icon: Icon, title, children }: { id: string; icon: typeof Layers; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 rounded-2xl border border-ink-800 bg-ink-900/50 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-ink-800 p-2.5"><Icon className="h-5 w-5 text-teal-300" aria-hidden="true" /></span>
        <h2 id={`${id}-h`} className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="prose-doc mt-2 text-[15px]">{children}</div>
    </section>
  );
}

export default function Features() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Built for everyday kubectl port forwarding"
        intro={<p>A Windows desktop interface around the <code>kubectl port-forward</code> you already use: organised, observable and careful with your machine.</p>}
      />
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-12">
        <Feature id="sessions" icon={Layers} title="Independent port-forward sessions">
          <p>Every row is its own <code>kubectl port-forward</code> process. If one service fails to start, loses its pod or its port is busy, the other rows keep running.</p>
        </Feature>
        <Feature id="services" icon={Workflow} title="Multiple services at once">
          <ul>
            <li>Add as many rows as you need. Each row has a service, a local port and a remote port.</li>
            <li>Connect, disconnect or retry each row on its own, or use <strong>Connect All</strong> and <strong>Disconnect All</strong>.</li>
            <li>Connect All starts at most four sessions at a time, so large profiles connect in batches.</li>
          </ul>
        </Feature>
        <Feature id="profiles" icon={Save} title="Profile management">
          <ul>
            <li>A profile stores a kubeconfig path, a namespace, a request timeout and its port-forward rows.</li>
            <li>Create, save, rename, delete and switch profiles.</li>
            <li>Unsaved changes are marked, and you are asked before they are lost.</li>
            <li>Saving never restarts running connections. Switching profiles requires disconnecting first.</li>
          </ul>
        </Feature>
        <Feature id="backup" icon={ArchiveRestore} title="Backup and restore">
          <ul>
            <li><strong>Export</strong> writes all saved profiles to one JSON file.</li>
            <li><strong>Import</strong> validates the whole file first and shows a preview. Conflicts are skipped (default) or imported as renamed copies, and existing profiles are never overwritten.</li>
            <li>Backups contain configuration only: kubeconfig <em>paths</em>, namespaces, service names and ports. They never contain kubeconfig contents or credentials, and they are not encrypted.</li>
          </ul>
        </Feature>
        <Feature id="status" icon={Activity} title="Connection state monitoring">
          <p>Each row shows Disconnected, Connecting, Connected (with a running duration), Disconnecting or Error. A summary such as <em>3 Connected · 1 Error · 4 Total</em> keeps the overall picture visible. Nothing connects automatically when the app starts.</p>
        </Feature>
        <Feature id="logs" icon={ScrollText} title="Log filtering">
          <ul>
            <li>A live log of kubectl output and app messages, filterable by service and severity.</li>
            <li>Copy selected or visible lines, or clear the log. It keeps the latest 5,000 entries.</li>
            <li>Known secret formats, such as tokens, passwords and certificate data, are redacted before display. Redaction cannot recognise every possible secret.</li>
          </ul>
        </Feature>
        <Feature id="diagnostics" icon={Stethoscope} title="Error diagnostics">
          <p>Common failures are explained in plain language with a suggested next step, while kubectl&apos;s original output stays available under <em>Details</em>:</p>
          <ul>
            <li>local port in use, or kubectl not found;</li>
            <li>missing or invalid kubeconfig;</li>
            <li>authentication or authorization problems;</li>
            <li>unreachable cluster, or missing namespace or service;</li>
            <li>startup timeout, or a lost connection.</li>
          </ul>
        </Feature>
        <Feature id="cleanup" icon={ShieldCheck} title="Safe process cleanup">
          <p>The app keeps track of the kubectl processes it starts, including child processes created by kubectl shims, and stops them when you disconnect or close the app. Windows ends them as well if the app crashes. Other kubectl processes on your computer are never touched.</p>
        </Feature>
        <Feature id="localhost" icon={Lock} title="Localhost binding">
          <p>Port forwards are started with <code>--address=localhost</code>, so they listen on <code>127.0.0.1</code> and <code>::1</code> only. The app does not change firewall rules or network settings, and it never modifies your kubeconfig files.</p>
        </Feature>
        <div className="grid gap-6 pt-6 lg:grid-cols-2">
          <Screenshot src="screenshots/error-details.png" alt="Error details dialog explaining that local port 8082 is already being used, with the original technical message" caption="Actual app screenshot with demo data: error details." />
          <Screenshot src="screenshots/logs-filtered.png" alt="Log panel filtered to the orders-api service" caption="Actual app screenshot with demo data: log filtered to one service." />
        </div>
      </div>
    </>
  );
}
