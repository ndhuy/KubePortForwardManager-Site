import { Bug, Lightbulb } from 'lucide-react';
import { Link } from 'react-router';
import { Callout, PageHeader, Toc } from '../components/ui';
import { SITE } from '../site';

const SECTIONS = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'kubectl-not-found', label: 'kubectl not found' },
  { id: 'kubeconfig', label: 'Kubeconfig errors' },
  { id: 'rbac', label: 'Kubernetes RBAC restrictions' },
  { id: 'port-in-use', label: 'Local port already in use' },
  { id: 'other-errors', label: 'Other connection errors' },
  { id: 'backup', label: 'Profile backup and restore' },
  { id: 'report', label: 'Report a bug or request a feature' },
];

export default function Support() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Get help with Kube Port Forward Manager"
        intro={<p>Most problems are solved by the app&apos;s own diagnostics. Click <strong>Details…</strong> on a failed row to see the explanation and kubectl&apos;s original output.</p>}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[16rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start"><Toc items={SECTIONS} /></div>
        <article className="prose-doc min-w-0 max-w-3xl">
          <h2 id="getting-started">Getting started</h2>
          <ol>
            <li>Install kubectl and make sure <code>kubectl version --client</code> works in a terminal.</li>
            <li>Start the app, create a profile with <strong>+ New</strong>, and select your kubeconfig with <strong>Browse…</strong>.</li>
            <li>Choose a namespace, add port-forward rows, and click <strong>Connect</strong>.</li>
          </ol>
          <p>The <Link to="/guide/">User Guide</Link> covers each step.</p>

          <h2 id="troubleshooting">Troubleshooting</h2>
          <p>Check the log panel and set the <em>Level</em> filter to <strong>ERROR</strong> to see what failed. The message under a failed row names the problem; <strong>Details…</strong> shows the full kubectl output. After fixing the cause, click <strong>Retry</strong>.</p>

          <h3 id="kubectl-not-found">kubectl not found</h3>
          <p>The app shows <em>&ldquo;kubectl was not found. Install kubectl or add kubectl.exe to PATH.&rdquo;</em> Install kubectl (Rancher Desktop, Docker Desktop or <code>winget install Kubernetes.kubectl</code>), open a new terminal to confirm <code>kubectl version --client</code> works, then restart the app.</p>

          <h3 id="kubeconfig">Kubeconfig errors</h3>
          <ul>
            <li><strong>Kubeconfig Not Found:</strong> the file path does not exist. Click <strong>Browse…</strong> and choose the file.</li>
            <li><strong>Invalid Kubeconfig:</strong> the file cannot be loaded. Check it with <code>kubectl config view --kubeconfig &lt;file&gt;</code>.</li>
            <li><strong>Authentication Failed:</strong> your credentials or token expired. Sign in again (for example with your cloud provider&apos;s CLI), click <strong>↻</strong>, then <strong>Retry</strong>.</li>
          </ul>

          <h3 id="rbac">Kubernetes RBAC restrictions</h3>
          <p><strong>Permission Denied</strong> means your account is not allowed to do something, such as port-forward or list resources, in that namespace. Ask your cluster administrator for the required permissions. If you cannot list namespaces, the app derives them from the services you can see, and you can type a namespace yourself.</p>

          <h3 id="port-in-use">Local port already in use</h3>
          <p><strong>Local Port Occupied</strong> means another program, or another row, uses that local port. Choose a different local port, or find the program with <code>Get-NetTCPConnection -LocalPort &lt;port&gt; -State Listen</code> in PowerShell. The app never stops other programs.</p>

          <h3 id="other-errors">Other connection errors</h3>
          <ul>
            <li><strong>Cluster Unreachable:</strong> check your network or VPN connection and the cluster address.</li>
            <li><strong>Namespace Not Found / Service Not Found:</strong> select an existing namespace or service.</li>
            <li><strong>Port Forward Failed:</strong> check the remote port and that the service has running pods.</li>
            <li><strong>Startup Timeout / Connection Lost:</strong> check connectivity, then click <strong>Retry</strong>.</li>
          </ul>

          <h2 id="backup">Profile backup and restore</h2>
          <ul>
            <li><strong>Export:</strong> <strong>Backup ▾ → Export Profiles…</strong> saves all saved profiles to one JSON file.</li>
            <li><strong>Import:</strong> <strong>Backup ▾ → Import Profiles…</strong> restores them, after you disconnect all port forwards.</li>
            <li><strong>Profiles disappeared after reinstalling?</strong> On a fresh Microsoft Store installation, Windows deletes the app&apos;s package storage on uninstall. Import a backup you exported earlier.</li>
            <li><strong>Where are my profiles?</strong> See the <em>Profile storage:</em> line under the profile selector, or <strong>Open Profile Storage Folder</strong>.</li>
          </ul>
          <p>Details: <Link to="/guide/#export">Export</Link>, <Link to="/guide/#import">Import</Link>, <Link to="/guide/#storage">Profile storage</Link>.</p>

          <h2 id="report">Report a bug or request a feature</h2>
          <p>Issues are tracked publicly on GitHub in the website repository, which hosts this site only.</p>
          <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
            <a href={SITE.newIssueUrl} rel="noopener" className="flex items-start gap-3 rounded-xl border border-ink-700 bg-ink-900 p-4 text-mist-100 no-underline hover:border-accent-400">
              <Bug className="mt-0.5 h-5 w-5 text-teal-300" aria-hidden="true" />
              <span><span className="block font-semibold">Report a bug</span><span className="text-sm text-mist-400">Open a new GitHub issue</span></span>
            </a>
            <a href={SITE.newIssueUrl} rel="noopener" className="flex items-start gap-3 rounded-xl border border-ink-700 bg-ink-900 p-4 text-mist-100 no-underline hover:border-accent-400">
              <Lightbulb className="mt-0.5 h-5 w-5 text-teal-300" aria-hidden="true" />
              <span><span className="block font-semibold">Request a feature</span><span className="text-sm text-mist-400">Describe what you need</span></span>
            </a>
          </div>
          <p>Please include the app version, your Windows version, the steps to reproduce, and the error message shown in the app. You can browse <a href={SITE.issuesUrl}>existing issues</a> first.</p>
          <Callout tone="warning" title="Never post sensitive information">
            Issues are public. Do <strong>not</strong> post kubeconfig contents, access tokens, passwords, certificates, private cluster endpoints or unreviewed application logs. Replace real cluster, namespace and service names if they are confidential. The app redacts known secret formats in its logs, but it cannot recognise everything, so review copied text before sharing it.
          </Callout>
        </article>
      </div>
    </>
  );
}
