import { PageHeader, Toc } from '../components/ui';
import { SITE } from '../site';

/** Last time the policy text was changed. Update together with the text. */
export const PRIVACY_LAST_UPDATED = '2026-10-12';   // contact email added the same day

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'local-data', label: 'Data stored on your computer' },
  { id: 'kubectl', label: 'kubectl and your clusters' },
  { id: 'publisher', label: 'Data received by the publisher' },
  { id: 'microsoft', label: 'Microsoft Store and Windows' },
  { id: 'website', label: 'This website' },
  { id: 'retention', label: 'Retention and deletion' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
];

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        intro={
          <p>
            For the {SITE.productName} Windows application and this website. Publisher: {SITE.publisher}. Last updated:{' '}
            <time dateTime={PRIVACY_LAST_UPDATED}>{PRIVACY_LAST_UPDATED}</time>.
          </p>
        }
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[16rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start"><Toc items={SECTIONS} /></div>
        <article className="prose-doc min-w-0 max-w-3xl">
          <h2 id="summary">Summary</h2>
          <ul>
            <li>The app stores your configuration <strong>only on your computer</strong>.</li>
            <li>It contains <strong>no analytics, telemetry, advertising or user accounts</strong>, and it does <strong>not send data to the publisher</strong>.</li>
            <li>Network connections to Kubernetes clusters are made by <strong>kubectl</strong>, the tool you install and configure yourself, to the clusters <em>you</em> configure.</li>
          </ul>

          <h2 id="local-data">1. Data processed and stored locally by the app</h2>
          <p>The app saves the following in a local file (<code>profiles.json</code>) in your Windows user profile:</p>
          <ul>
            <li><strong>Connection profiles:</strong> profile names and request timeouts.</li>
            <li><strong>Kubeconfig file path references:</strong> the location of each kubeconfig you select. The app reads the kubeconfig only to run kubectl. It does not copy, modify or upload it, and does not store its contents.</li>
            <li><strong>Namespace and service names</strong> you select or type.</li>
            <li><strong>Local and remote port numbers</strong> for each port forward.</li>
          </ul>
          <p><strong>Application logs</strong> (kubectl output and app messages) are kept <strong>in memory only</strong> while the app runs, up to the latest 5,000 entries. They are not written to disk unless you copy them yourself. Known secret formats, such as tokens, passwords and certificate data, are redacted before display; redaction cannot recognise every possible secret.</p>
          <p><strong>Exported backup files</strong> are created only when you choose <em>Export Profiles</em>, at the location you pick. They contain the profile information listed above, but no kubeconfig contents or credentials. They are <strong>not encrypted</strong>, and the app never uploads them.</p>
          <p>To check whether a local port is free before starting a port forward, the app briefly listens on that port on the loopback address (<code>127.0.0.1</code>). This check stays on your computer.</p>

          <h2 id="kubectl">2. Communication initiated by kubectl with Kubernetes infrastructure</h2>
          <p>The app starts the <code>kubectl</code> program installed on your computer to discover namespaces and services and to run <code>kubectl port-forward</code>.</p>
          <ul>
            <li>kubectl connects to the Kubernetes API servers defined in your kubeconfig, using your credentials and any credential plugins you configured (for example, a cloud provider CLI).</li>
            <li>Forwarded ports listen on your computer only (<code>127.0.0.1</code> and <code>::1</code>).</li>
            <li>This communication is between your computer and infrastructure you choose. It is governed by your organisation and your cluster or cloud provider, not by the publisher.</li>
          </ul>
          <p>When you choose <em>Open http(s)://127.0.0.1:&lt;port&gt;</em>, your default browser opens that local address. The browser&apos;s own privacy policy applies.</p>

          <h2 id="publisher">3. Data collected by the publisher</h2>
          <p>The app contains no analytics or telemetry code, and it does not transmit your profiles, logs, kubeconfig paths, cluster information or any other data to the publisher. The publisher does not operate any server that the app contacts.</p>
          <p>If you contact the publisher by email or by opening a GitHub issue, the publisher receives what you choose to send, such as your email address and message, and uses it only to answer you. GitHub&apos;s privacy statement applies to GitHub.</p>

          <h2 id="microsoft">Microsoft Store and Windows</h2>
          <p>
            If you install the app from the Microsoft Store, Microsoft handles the download, installation and updates under the{' '}
            <a href="https://privacy.microsoft.com/privacystatement" rel="noopener">Microsoft Privacy Statement</a>. Depending on your Windows
            diagnostic data settings, Microsoft may provide the publisher with aggregated reports through Partner Center, such as acquisition
            counts and crash or reliability statistics. The publisher does not receive your profiles or configuration this way.
          </p>

          <h2 id="website">This website</h2>
          <p>
            This website is a static site hosted on GitHub Pages. It uses no cookies, no analytics, no tracking scripts and no third-party
            fonts. As the hosting provider, GitHub may process technical data such as IP addresses to deliver and secure the site; see the{' '}
            <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub General Privacy Statement</a>.
          </p>

          <h2 id="retention">Retention and deletion</h2>
          <ul>
            <li>Profiles remain on your computer until you delete them in the app or delete <code>profiles.json</code>. The app shows the file location under <em>Profile storage</em>.</li>
            <li>Uninstalling a Microsoft Store installation removes the app&apos;s package storage. Profiles kept in <code>%LOCALAPPDATA%\KubePortForwardManager</code> by an earlier non-Store installation remain until you delete that folder.</li>
            <li>Logs are discarded when the app closes.</li>
            <li>Backup files remain wherever you saved them until you delete them.</li>
          </ul>

          <h2 id="children">Children</h2>
          <p>The app is a developer tool and is not directed at children.</p>

          <h2 id="changes">Changes to this policy</h2>
          <p>If this policy changes, the updated version will be published on this page with a new &ldquo;Last updated&rdquo; date.</p>

          <h2 id="contact">Contact</h2>
          <p>
            Publisher: {SITE.publisher}. For questions or requests about this policy, email{' '}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
          <p>
            You can also open a public issue at <a href={SITE.issuesUrl}>{SITE.issuesUrl.replace('https://', '')}</a>. Issues are public,
            so do not include personal or sensitive information there.
          </p>
        </article>
      </div>
    </>
  );
}
