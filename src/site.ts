/** Single source of truth for product facts and public URLs. */
export const SITE = {
  productName: 'Kube Port Forward Manager',
  publisher: 'HuyNguyenVN',
  storeId: '9NT5MP72TXR7',
  storeUrl: 'https://apps.microsoft.com/detail/9NT5MP72TXR7',
  /**
   * The Microsoft Store listing is not public yet (the URL returned HTTP 410 when this site was
   * built). Set to true once the listing is live: CTAs then read "Get it on Microsoft Store".
   */
  storeAvailable: false,
  version: '1.0.0',
  siteUrl: 'https://ndhuy.github.io/KubePortForwardManager-Site',
  basePath: '/KubePortForwardManager-Site',
  repoUrl: 'https://github.com/ndhuy/KubePortForwardManager-Site',
  issuesUrl: 'https://github.com/ndhuy/KubePortForwardManager-Site/issues',
  newIssueUrl: 'https://github.com/ndhuy/KubePortForwardManager-Site/issues/new',
  /** Publisher contact for privacy questions and private support requests (provided by the publisher). */
  contactEmail: 'huynd1709@gmail.com',
  disclaimer:
    'Kube Port Forward Manager is an independent application and is not affiliated with, endorsed by, or sponsored by Microsoft, the Linux Foundation, or the Cloud Native Computing Foundation.',
  trademarkNote:
    'Kubernetes is a registered trademark of the Linux Foundation. Microsoft, Windows and Microsoft Store are trademarks of the Microsoft group of companies.',
} as const;

export const storeCtaLabel = (available: boolean = SITE.storeAvailable) =>
  available ? 'Get it on Microsoft Store' : 'Coming soon to Microsoft Store';
