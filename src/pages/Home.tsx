import {
  Activity,
  ArchiveRestore,
  Boxes,
  Layers,
  Lock,
  Monitor,
  Power,
  RotateCcw,
  Save,
  ScrollText,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router';
import { SITE } from '../site';
import { Screenshot, SecondaryButton, StoreButton } from '../components/ui';

const FEATURES = [
  { icon: Layers, title: 'Multiple simultaneous sessions', text: 'Forward several services at once. Each row runs its own kubectl process, so one failure never stops the others.' },
  { icon: Save, title: 'Saved connection profiles', text: 'Keep a kubeconfig, namespace, request timeout and any number of services together, and switch between profiles.' },
  { icon: Power, title: 'Connect All / Disconnect All', text: 'Start or stop every port forward in a profile with one click, or control each row on its own.' },
  { icon: Activity, title: 'Live connection status', text: 'See Connecting, Connected, Disconnecting or Error per row, how long each connection has been up, and a summary.' },
  { icon: ScrollText, title: 'Logs and diagnostics', text: 'Filter the live log by service and severity. Failures are explained in plain language, with kubectl’s original output one click away.' },
  { icon: RotateCcw, title: 'Retry failed connections', text: 'When a port is busy or a connection drops, fix the cause and retry just that row.' },
  { icon: ArchiveRestore, title: 'Profile backup and restore', text: 'Export all profiles to one JSON file and import them later, with a preview and safe conflict handling.' },
  { icon: Lock, title: 'Localhost-only forwarding', text: 'Forwarded ports listen on 127.0.0.1 and ::1 only, so other machines on your network cannot reach them.' },
];

const STEPS = [
  { title: 'Select a kubeconfig', text: 'Browse to the kubeconfig you already use. The app checks it and shows the kubectl version and context.' },
  { title: 'Choose namespace and service', text: 'Namespaces and services are discovered from your cluster, or you can type them in.' },
  { title: 'Configure ports', text: 'Set the local port on your machine and the remote port of the service.' },
  { title: 'Connect', text: 'Connect one row or all of them. Each becomes Connected when kubectl reports it is forwarding.' },
  { title: 'Monitor and manage', text: 'Watch status and logs, copy the endpoint, open it in your browser, retry or disconnect.' },
];

const AUDIENCES = ['Kubernetes Developers', 'DevOps Engineers', 'QA / Automation Engineers', 'Platform Engineers', 'SREs'];

const REQUIREMENTS = [
  'Windows 10 (version 1809 or later) or Windows 11, x64',
  'kubectl installed separately and available on PATH',
  'A valid kubeconfig for your cluster',
  'Kubernetes permissions to port-forward to the target services',
  'Network access to the target Kubernetes cluster (for example, VPN)',
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_70%_-10%,rgba(59,130,246,0.28),transparent),radial-gradient(40rem_24rem_at_10%_10%,rgba(45,212,191,0.14),transparent)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 lg:grid-cols-[1fr_1.15fr] lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1 text-xs font-medium text-mist-300">
              <Monitor className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
              Windows 10 / 11 · x64 desktop app
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Kubernetes Port Forwarding,{' '}
              <span className="bg-gradient-to-r from-accent-400 to-teal-300 bg-clip-text text-transparent">Simplified.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8">
              Manage multiple kubectl port-forward sessions from one clean Windows desktop interface. Save configurations, monitor
              connections, and reconnect without juggling terminal windows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <StoreButton size="lg" />
              <SecondaryButton href={`${SITE.basePath}/features/`}>Explore Features</SecondaryButton>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-mist-400">
              <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
              Requires kubectl, installed separately, and access to a Kubernetes cluster. No credentials are included.
            </p>
          </div>
          <Screenshot
            src="screenshots/connected.png"
            alt="Kube Port Forward Manager window with four services forwarded and connected, showing status, duration and logs"
            caption="Actual app screenshot with demo data."
            priority
          />
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-5 py-16">
        <h2 id="features-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need for day-to-day port forwarding
        </h2>
        <p className="mt-4 max-w-2xl text-lg">A focused tool that does one job well, with no account, no cloud service and no telemetry.</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5 transition hover:border-ink-600">
              <Icon className="h-6 w-6 text-teal-300" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link to="/features/" className="font-semibold text-accent-400 hover:text-teal-300">See all features in detail</Link>
        </p>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="border-y border-ink-800 bg-ink-900/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 id="how-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-ink-800 bg-ink-950/70 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-teal-400 text-sm font-bold text-ink-950" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Screenshot
              src="screenshots/diagnostic.png"
              alt="A row in Error state with the explanation 'Local Port Occupied — local port 8082 is already being used'"
              caption="Actual app screenshot with demo data: a clear explanation when a local port is busy."
            />
            <Screenshot
              src="screenshots/backup-menu.png"
              alt="The Backup menu with Export Profiles, Import Profiles and Open Profile Storage Folder"
              caption="Actual app screenshot with demo data: profile backup and restore."
              width={1583}
              height={900}
            />
          </div>
        </div>
      </section>

      {/* Audience + requirements */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2">
        <div aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="text-3xl font-semibold tracking-tight">Who it is for</h2>
          <p className="mt-4">Anyone who regularly reaches services inside a cluster from a Windows workstation.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {AUDIENCES.map((a) => (
              <li key={a} className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-4 py-2 text-sm text-mist-100">
                <Boxes className="h-4 w-4 text-teal-300" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div aria-labelledby="req-heading" className="rounded-2xl border border-ink-800 bg-ink-900/60 p-6">
          <h2 id="req-heading" className="text-3xl font-semibold tracking-tight">Requirements</h2>
          <ul className="mt-5 space-y-3">
            {REQUIREMENTS.map((r) => (
              <li key={r} className="flex gap-3 text-sm leading-6">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-mist-400">The application does not include Kubernetes credentials or kubectl.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl border border-ink-700 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Stop juggling terminal windows</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            {SITE.storeAvailable
              ? 'Install Kube Port Forward Manager from the Microsoft Store.'
              : 'Kube Port Forward Manager is coming soon to the Microsoft Store.'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <StoreButton size="lg" />
            <SecondaryButton href={`${SITE.basePath}/guide/`}>Read the User Guide</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
