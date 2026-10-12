import { Link } from 'react-router';
import { Callout, PageHeader, Toc } from '../components/ui';
import { SITE } from '../site';

const SECTIONS = [
  { id: 'install', label: '1. Install from Microsoft Store' },
  { id: 'kubectl', label: '2. Install kubectl' },
  { id: 'kubeconfig', label: '3. Select a kubeconfig' },
  { id: 'discovery', label: '4. Discover namespaces and services' },
  { id: 'rows', label: '5. Create a port-forward row' },
  { id: 'connect', label: '6. Connect and disconnect' },
  { id: 'multiple', label: '7. Manage multiple sessions' },
  { id: 'profiles', label: '8. Save and switch profiles' },
  { id: 'export', label: '9. Export profiles' },
  { id: 'import', label: '10. Import profiles' },
  { id: 'troubleshooting', label: '11. Troubleshoot connection errors' },
  { id: 'storage', label: '12. Profile storage and uninstalling' },
];

export default function Guide() {
  return (
    <>
      <PageHeader
        eyebrow="User Guide"
        title="Using Kube Port Forward Manager"
        intro={<p>From installation to managing many port forwards, backing up profiles and fixing common errors.</p>}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[16rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start"><Toc items={SECTIONS} /></div>
        <article className="prose-doc min-w-0 max-w-3xl">
          <h2 id="install">1. Install from Microsoft Store</h2>
          <p>
            {SITE.storeAvailable ? (
              <>Open the <a href={SITE.storeUrl}>Microsoft Store listing</a> and select <strong>Get</strong> or <strong>Install</strong>.</>
            ) : (
              <>The app is <strong>coming soon</strong> to the Microsoft Store (Store ID <code>{SITE.storeId}</code>). Once it is published, open the <a href={SITE.storeUrl}>Microsoft Store listing</a> and select <strong>Get</strong> or <strong>Install</strong>.</>
            )}
          </p>
          <p>The app installs for your Windows user account and does not need administrator rights. It runs on Windows 10 (version 1809 or later) and Windows 11, x64.</p>

          <h2 id="kubectl">2. Install kubectl</h2>
          <p>The app uses the <code>kubectl</code> you already have and does not include it. Install it with one of these, then make sure <code>kubectl</code> is on your <code>PATH</code>:</p>
          <ul>
            <li>Rancher Desktop or Docker Desktop, which both add kubectl;</li>
            <li><code>winget install Kubernetes.kubectl</code>;</li>
            <li>the <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/" rel="noopener">official kubectl installation guide for Windows</a>.</li>
          </ul>
          <p>Check it in a new terminal with <code>kubectl version --client</code>. If the app cannot find kubectl, it shows <em>&ldquo;kubectl was not found. Install kubectl or add kubectl.exe to PATH.&rdquo;</em> Restart the app after installing.</p>

          <h2 id="kubeconfig">3. Select a kubeconfig</h2>
          <p>Create a profile first with <strong>+ New</strong>. Then click <strong>Browse…</strong> next to <em>Kubeconfig</em> and choose your kubeconfig file, or paste its path. The app validates it and shows the kubectl version and the current context. Click <strong>↻</strong> to reload after you change the file or sign in again.</p>
          <p>The app only <strong>reads</strong> kubeconfig files. It never modifies, copies or uploads them.</p>

          <h2 id="discovery">4. Discover namespaces and services</h2>
          <ul>
            <li>After the kubeconfig is validated, namespaces are loaded into the <em>Namespace</em> list. If your account is not allowed to list namespaces, they are derived from the services you can see.</li>
            <li>Choosing a namespace loads its services into each row&apos;s <em>Service</em> list.</li>
            <li>You can always type a namespace or service name yourself.</li>
            <li>A saved namespace is never changed automatically. If it is not found in the cluster, the app warns you instead.</li>
          </ul>

          <h2 id="rows">5. Create a port-forward row</h2>
          <ol>
            <li>Click <strong>+ Add Port Forward</strong>.</li>
            <li>Choose the <em>Service</em>.</li>
            <li>Enter the <em>Local</em> port on your computer and the <em>Remote</em> port of the service.</li>
          </ol>
          <p>Ports must be between 1 and 65535, and local ports cannot repeat within a profile. Click <strong>Save</strong> to keep the row in the profile.</p>

          <h2 id="connect">6. Connect and disconnect</h2>
          <ul>
            <li><strong>Connect</strong> on a row starts <code>kubectl port-forward</code> for it. The status turns <em>Connected</em> once kubectl reports that it is forwarding, and a timer shows how long it has been up.</li>
            <li><strong>Disconnect</strong> stops that row&apos;s kubectl process.</li>
            <li>From the row menu (<strong>⋯</strong>) you can copy the endpoint (<code>127.0.0.1:&lt;port&gt;</code>), copy the equivalent kubectl command, or open <code>http://</code> or <code>https://127.0.0.1:&lt;port&gt;</code> in your browser. The browser only opens when you click.</li>
          </ul>

          <h2 id="multiple">7. Manage multiple sessions</h2>
          <ul>
            <li><strong>Connect All</strong> connects every row that is not connected yet; <strong>Disconnect All</strong> stops them all.</li>
            <li>Rows are independent: a failure in one row does not affect the others. Use <strong>Retry</strong> on a failed row after fixing the cause.</li>
            <li>The status summary shows how many rows are connected, connecting or failed.</li>
            <li>Closing the app disconnects everything and stops every kubectl process it started.</li>
          </ul>

          <h2 id="profiles">8. Save and switch profiles</h2>
          <ul>
            <li>Use the <em>Profile</em> list to switch between profiles, for example one per cluster or environment.</li>
            <li><strong>Save</strong> stores the current settings; <strong>Rename</strong> and <strong>Delete</strong> manage profiles. Deleting a profile never deletes its kubeconfig file.</li>
            <li>A <em>● Unsaved changes</em> marker appears when you edit. You are asked to save or discard before switching or closing.</li>
            <li>Disconnect all rows before switching or deleting a profile. Saving while connected is allowed and does not restart anything.</li>
          </ul>

          <h2 id="export">9. Export profiles</h2>
          <ol>
            <li>Click <strong>Backup ▾ → Export Profiles…</strong>.</li>
            <li>If the current profile has unsaved changes, choose <strong>Save and Export</strong>, <strong>Export Saved Version</strong> or <strong>Cancel</strong>.</li>
            <li>Read the security note, choose a location and save. The suggested name is <code>KubePortForwardManager-Backup-YYYYMMDD-HHMMSS.json</code>.</li>
          </ol>
          <Callout tone="warning" title="What a backup contains">
            A backup contains configuration references only: profile names, kubeconfig <strong>file paths</strong>, namespaces, request timeouts, service names and ports. It does <strong>not</strong> contain your kubeconfig file, tokens or other credentials. Backup files are <strong>not encrypted</strong>. Because they can still reveal infrastructure details, store them in a private location.
          </Callout>
          <p>Export is allowed while port forwards are connected and does not interrupt them.</p>

          <h2 id="import">10. Import profiles</h2>
          <ol>
            <li>Disconnect all port forwards. Import is unavailable while a connection is active.</li>
            <li>Click <strong>Backup ▾ → Import Profiles…</strong> and choose a backup file. The whole file is validated first; nothing changes if it is invalid.</li>
            <li>Review the preview. For profiles that match an existing one (same profile or same name), choose <strong>Skip existing profiles</strong> (default) or <strong>Import as copies</strong>, which creates names such as <em>Audit (Imported)</em>.</li>
            <li>Click <strong>Import</strong>. Existing profiles are never overwritten.</li>
          </ol>
          <p>Imported profiles are not selected and do not connect. Open each one and confirm its kubeconfig with <strong>↻</strong> or <strong>Browse…</strong> before connecting, because the path may not exist on this computer.</p>

          <h2 id="troubleshooting">11. Troubleshoot connection errors</h2>
          <p>When a row fails, click <strong>Details…</strong> for the explanation and kubectl&apos;s original output. Common cases:</p>
          <table>
            <thead><tr><th scope="col">Message</th><th scope="col">What to do</th></tr></thead>
            <tbody>
              <tr><td>Local Port Occupied</td><td>Choose another local port, or close the program that uses it.</td></tr>
              <tr><td>kubectl Not Found</td><td>Install kubectl, add it to PATH and restart the app.</td></tr>
              <tr><td>Kubeconfig Not Found / Invalid Kubeconfig</td><td>Select an existing, valid kubeconfig.</td></tr>
              <tr><td>Authentication Failed</td><td>Sign in again (for example with your cloud CLI), then refresh and retry.</td></tr>
              <tr><td>Permission Denied</td><td>Ask your cluster administrator for port-forward permissions (RBAC).</td></tr>
              <tr><td>Cluster Unreachable</td><td>Check your network or VPN connection.</td></tr>
              <tr><td>Namespace / Service Not Found</td><td>Select an existing namespace or service.</td></tr>
              <tr><td>Connection Lost</td><td>The kubectl process ended. Click <strong>Retry</strong>.</td></tr>
            </tbody>
          </table>
          <p>More help: <Link to="/support/">Support</Link> and <Link to="/faq/">FAQ</Link>.</p>

          <h2 id="storage">12. Profile storage and uninstalling</h2>
          <p>The <em>Profile storage:</em> line under the profile selector shows the file the app actually uses. <strong>Backup ▾ → Open Profile Storage Folder</strong> opens its folder.</p>
          <ul>
            <li>On a fresh Microsoft Store (MSIX) installation, Windows may keep the app&apos;s profiles in package-managed storage (<code>%LOCALAPPDATA%\Packages\…\LocalCache</code>). <strong>Windows removes that storage when you uninstall the app.</strong></li>
            <li>If an earlier non-Store version of the app was used on the computer, the Store version shares <code>%LOCALAPPDATA%\KubePortForwardManager\profiles.json</code>, which is kept on uninstall.</li>
          </ul>
          <Callout title="Export before uninstalling">
            Before uninstalling or reinstalling, use <strong>Backup ▾ → Export Profiles…</strong> and keep the file outside the app, for example in Documents. After reinstalling, use <strong>Import Profiles…</strong>.
          </Callout>
        </article>
      </div>
    </>
  );
}
