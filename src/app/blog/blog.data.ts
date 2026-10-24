export interface BlogArticleSummary {
  slug: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BlogArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  callout?: string;
}

export interface BlogArticleContent extends BlogArticleSummary {
  authorTitle: string;
  sections: BlogArticleSection[];
}

export const BLOG_CATEGORIES = [
  { name: "Package security", count: 1 },
  { name: "Secure development", count: 1 },
];

export const UNDERSTANDING_PACKAGE_SECURITY: BlogArticleContent = {
  slug: "understanding-package-security",
  category: "Package security",
  date: "Oct 20, 2026",
  readingTime: "8 min read",
  title: "Understanding Package Security",
  excerpt:
    "A package with no reported vulnerabilities is not automatically safer than one with several. Learn how to read vulnerability history, frequency, severity, and the signals behind the numbers.",
  author: "Tymoteusz Głuch",
  authorTitle: "Developer & Researcher",
  imageSrc: "/blog-1.png",
  imageAlt: "TrustPkg security illustration",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        "Open source packages make modern development faster and more productive, but every dependency also becomes part of the software we ship. A vulnerability count can help us understand that risk, but it is only one piece of evidence—not a score that tells us whether a package is safe.",
        "A package with zero known vulnerabilities may simply be new, rarely used, or less closely examined. Another package may have several disclosed issues because it has a long history, a large user base, and researchers actively looking at it. The important questions are what was found, which versions were affected, how quickly maintainers responded, and whether the version you use is still exposed.",
      ],
    },
    {
      id: "what-counts-measure",
      title: "What does a vulnerability count measure?",
      paragraphs: [
        "A vulnerability is a documented weakness that can affect the confidentiality, integrity, or availability of software. A package report may list advisories, affected version ranges, severity ratings, references, and fixed versions. These records describe known and reported issues; they do not enumerate every weakness that might exist in the code.",
        "Counts can refer to different things. One advisory may affect dozens of package releases, while several advisories may all affect the same release. Some dashboards count advisories, others count affected versions or findings over a selected time period. Before comparing two packages, make sure you are comparing the same measure and time window.",
      ],
      points: [
        "Advisories count distinct reported security issues.",
        "Affected versions show how much of a package's release history is impacted.",
        "A current status tells you whether the version you install is known to be affected.",
      ],
    },
    {
      id: "zero-is-not-proof",
      title: "Why zero known vulnerabilities is not proof of safety",
      paragraphs: [
        "“No known vulnerabilities” means no matching issue is currently present in the data source for the package and versions being checked. It does not mean that the source code has been proven secure. A package can have no reports because nobody has tested it deeply, because it has few users, because it is very new, or because a weakness has not yet been disclosed.",
        "This is why a clean history can be less informative than it first appears. A small, obscure package with no reports offers little evidence about how it behaves under scrutiny. A widely used package with several responsibly disclosed and promptly fixed issues may offer more evidence about its maintenance and response process.",
      ],
      callout:
        "A disclosed vulnerability is evidence that a weakness was found. The absence of a disclosure is not evidence that no weakness exists.",
    },
    {
      id: "scrutiny-signal",
      title: "When vulnerability reports can be a sign of scrutiny",
      paragraphs: [
        "A vulnerability report is a negative finding about a particular weakness, but the process that surfaces it can also reveal positive signals. Active maintainers, external security researchers, coordinated disclosure, timely releases, and clear advisories suggest that someone is paying attention and that problems can become visible and actionable.",
        "Large npm packages are often examined by many people: maintainers, users, independent researchers, and automated dependency scanners. In a project with good security practices, reports can lead to a fix, a patched release, and guidance for affected users. That history is more useful than simply seeing a non-zero number.",
        "There is an important distinction between ecosystem tooling and source-code auditing. Tools such as `npm audit` compare the dependency tree with published advisory data; they do not perform a full static analysis of every package's source code. Separate SAST tools and CI checks may inspect source code in a project, but their presence and coverage depend on how that project is configured.",
      ],
    },
    {
      id: "frequency-and-context",
      title: "Read frequency and trend in context",
      paragraphs: [
        "Frequency helps explain how often issues have been reported, but totals alone can be misleading. Older packages have had more time to accumulate advisories. Popular packages receive more attention and may therefore have more issues discovered. A useful comparison considers the package's age, release cadence, adoption, affected-version range, and the time taken to publish fixes.",
        "Look at the trend as well as the total. Are reports clustered around one old release and followed by a patch? Are new issues appearing repeatedly in recent versions? Do maintainers publish updates and communicate clearly? A rising count without context does not answer these questions, while a timeline can show whether the project is improving or falling behind.",
      ],
      points: [
        "Compare similar packages over the same time period.",
        "Check whether advisories affect current releases or only old versions.",
        "Look for a fix, a clear upgrade path, and evidence of ongoing maintenance.",
      ],
    },
    {
      id: "critical-findings",
      title: "Why multiple critical findings deserve attention",
      paragraphs: [
        "Several high- or critical-severity findings in current versions are a serious warning, especially when fixes are unavailable or maintainers have not responded. Critical issues can expose systems to remote code execution, credential theft, data access, or service disruption. In that situation, the number is not just a sign of project visibility: it may represent substantial, unresolved risk.",
        "Severity is still not the whole story. Check whether the vulnerable functionality is used by your application, whether the affected code is reachable, what privileges it has, whether a mitigation exists, and how exploitable the issue is in your environment. A critical advisory in an unreachable optional feature may require a different response from a remotely exploitable issue in a component used on every request.",
      ],
      callout:
        "Many reported issues can indicate active scrutiny; many unresolved critical issues in the version you use indicate risk. Evaluate both the discovery process and the current exposure.",
    },
    {
      id: "npm-example",
      title: "A practical example from the npm ecosystem",
      paragraphs: [
        "Imagine comparing Package A, which has no advisories, with Package B, which has five. Package A was published recently, has few users, and has no documented security process. Package B is mature, has a large community, and its five advisories affect old versions; each has a published fix and a clear upgrade path. The raw count makes Package A look safer, but it does not tell us that its code has received comparable scrutiny.",
        "Now change the facts: Package B's current release still contains multiple critical vulnerabilities, the fixes are overdue, and maintainers are unresponsive. That changes the decision. Package A's lack of reports still does not prove safety, but Package B now presents concrete known exposure that should be mitigated or avoided.",
        "This is the practical value of combining vulnerability data with version status, release activity, issue response, and the role the package plays in your application.",
      ],
    },
    {
      id: "selection-checklist",
      title: "How to choose and review a package",
      paragraphs: [
        "A package decision should combine security data with the normal engineering checks you would apply to any dependency. Use the following questions as a starting point rather than treating any single metric as a pass/fail score:",
      ],
      points: [
        "Is the package actively maintained, with recent releases and clear ownership?",
        "Do advisories affect the exact version you plan to use, and is a patched version available?",
        "How quickly do maintainers acknowledge reports and publish fixes?",
        "Does the dependency have more permissions or access than its purpose requires?",
        "Can you replace it with a well-maintained alternative or reduce how much of it you use?",
        "Are lockfiles, automated advisory checks, and update reviews part of your workflow?",
      ],
    },
    {
      id: "key-takeaways",
      title: "Key takeaways",
      paragraphs: [
        "Vulnerability history is a useful signal, not a verdict. Zero findings can mean low visibility as easily as it can mean a strong record. A package with reported and promptly fixed issues may be better understood and better maintained than one that has never been examined—but reports of unresolved critical flaws are a concrete reason to act.",
        "Compare like with like, inspect affected versions and trends, and weigh the response process alongside the count. The goal is not to find a package with a perfect-looking number; it is to understand what is known, what remains uncertain, and whether the risk is acceptable for your use.",
      ],
    },
  ],
};

export const PRACTICAL_CODE_SECURITY: BlogArticleContent = {
  slug: "practical-code-security",
  category: "Secure development",
  date: "Oct 24, 2026",
  readingTime: "10 min read",
  title: "Practical Security Practices for Your Codebase",
  excerpt:
    "A practical security baseline for any codebase: audit and update dependencies, add automated analysis, and protect every input and server-side action.",
  author: "Tymoteusz Głuch",
  authorTitle: "Developer & Researcher",
  imageSrc: "/blog-2.png",
  imageAlt: "Dependency audits, SAST checks, CI, and package updates",
  sections: [
    {
      id: "start-with-basics",
      title: "Start with the security basics",
      paragraphs: [
        "Good application security is not one scanner or a final checklist before release. It is a set of small practices applied continuously: know what code and dependencies you ship, validate data at trust boundaries, restrict access, and make it easy to notice and fix problems.",
        "Start with the controls that reduce common, preventable risks. Keep dependencies current, protect secrets, validate input on the server, enforce authorization for every sensitive operation, and run automated checks in CI. More advanced tools are useful, but they work best when these fundamentals are already in place.",
      ],
      points: [
        "Automate dependency and source-code checks.",
        "Validate untrusted data where it enters the server.",
        "Check authorization for every action and resource.",
        "Keep secrets out of client bundles, logs, and repositories.",
      ],
    },
    {
      id: "dependency-hygiene",
      title: "Audit dependencies and update them regularly",
      paragraphs: [
        "Third-party packages are part of your application's attack surface. Run your package manager's vulnerability audit regularly and whenever dependencies change. For npm, `npm audit` compares the dependency tree with published security advisories. It is useful for identifying known affected versions, but it does not inspect your application source code and cannot prove that a package is safe.",
        "Use a lockfile and install reproducibly in CI so that local and production builds use the reviewed dependency graph. Schedule routine updates—weekly or monthly is a useful starting point—and enable automated update pull requests where practical. Review changelogs, test the upgrade, and merge security fixes promptly rather than allowing a large backlog to accumulate.",
        "Do not blindly apply forceful upgrades. A command such as `npm audit fix --force` can introduce breaking major-version changes. Understand which dependency is affected, whether a patched version exists, and what behavior changes before accepting an upgrade. Remove unused packages and prefer well-maintained dependencies with a clear release and security-response history.",
      ],
      points: [
        "Run audits in CI and review new findings instead of relying on a one-time scan.",
        "Update direct and transitive dependencies in small, tested batches.",
        "Commit the lockfile and use reproducible installs for deployments.",
        "Prioritize reachable, exploitable, and high-severity issues, while tracking accepted exceptions.",
      ],
    },
    {
      id: "automated-analysis",
      title: "Add SAST and secret scanning to CI",
      paragraphs: [
        "Static application security testing (SAST) analyzes source code for risky patterns without running the application. It can catch issues such as unsafe data flows, injection risks, or insecure API usage early in a pull request. Add a scanner that matches your language and framework, run it automatically, and make important findings visible to the team.",
        "SAST complements, rather than replaces, dependency auditing, code review, tests, and runtime protections. Scanners can produce false positives and can miss context-specific bugs. Start by fixing high-confidence findings, document any accepted exceptions, and tune noisy rules so that developers continue to pay attention to the results.",
        "Add secret scanning as well. It can detect accidentally committed credentials before they spread. If a real secret is exposed, deleting the line is not enough: revoke or rotate the credential, review how it could have been used, and remove it from repository history when appropriate.",
      ],
    },
    {
      id: "validate-input",
      title: "Treat every input as untrusted",
      paragraphs: [
        "Input validation is essential even when the user interacts through your own frontend. Browser-side checks improve the experience, but they are under the caller's control and can be bypassed. A request can be sent directly to an endpoint or server action, so validate types, formats, sizes, and allowed values again on the server before using the data.",
        "Prefer schemas and allow-lists over trying to remove a few suspicious characters. Set length and range limits, reject unexpected fields when practical, and normalize values consistently. Validation answers whether input has the expected shape; safe output encoding and parameterized queries are still needed to prevent cross-site scripting and injection.",
        "Avoid building SQL, shell commands, file paths, or HTML by concatenating raw user input. Use parameterized database queries and framework escaping, and do not pass user-controlled strings to a shell. Apply limits to uploads and expensive operations so that malformed or oversized input cannot exhaust memory, CPU, or storage.",
      ],
      callout:
        "Client-side validation is for usability. Server-side validation and authorization are the security boundary.",
    },
    {
      id: "server-actions",
      title: "Secure server actions and API endpoints",
      paragraphs: [
        "A server action is still a server entry point, even if it is called from a form or button in your frontend. Do not assume that hiding a button or checking a value in a React component protects the operation. A caller may submit a crafted request without using the page at all.",
        "For each action, validate its arguments on the server, authenticate the caller, and check that the caller is authorized to perform that exact operation on that exact record. Authentication answers who the caller is; authorization answers whether they may change this resource. Enforce ownership and role checks before reading or modifying protected data, and default to denying access when a check is missing.",
        "Also consider rate limits, replay or duplicate submissions, and the cost of the requested work. Use the framework's supported request protections, but do not treat them as a replacement for authorization. Return only the data the caller is allowed to see, and avoid exposing internal errors or secrets in responses.",
      ],
      points: [
        "Validate server-action and API input even if the same form validates it in the browser.",
        "Check authentication and resource-level authorization inside the server-side operation.",
        "Apply rate limits or quotas to expensive or sensitive actions.",
      ],
    },
    {
      id: "protect-data-and-secrets",
      title: "Protect access, data, and secrets",
      paragraphs: [
        "Use least privilege throughout the application. Give users, services, database accounts, and CI jobs only the permissions they need. Check access for each sensitive operation instead of trusting an earlier page load, and prefer explicit deny-by-default rules.",
        "Keep credentials on the server and out of source control. In Next.js, variables prefixed with `NEXT_PUBLIC_` are intended to be exposed to the browser, so never use that prefix for private keys or tokens. Store secrets in an approved secret manager or protected deployment settings, restrict who can read them, rotate them when exposed, and make sure logs do not print them.",
        "Use secure session settings and transport protections appropriate to your framework, including HTTPS and secure, HTTP-only cookies for session identifiers. Encrypt sensitive data where required, and collect only what the application needs. Security logs should help investigate important actions without copying passwords, tokens, or unnecessary personal data.",
      ],
    },
    {
      id: "secure-ci-and-releases",
      title: "Make the delivery pipeline part of the defense",
      paragraphs: [
        "A secure development workflow should make safe changes easy to merge and risky changes harder to ship unnoticed. Protect the default branch, require review for sensitive code, run tests and security checks before merging, and keep deployment credentials separate from ordinary build jobs.",
        "Limit CI token permissions and avoid exposing secrets to untrusted pull-request code. Pin or review third-party CI actions, protect release credentials, and make sure a failed critical security check is visible to maintainers. A pipeline is itself privileged infrastructure, so apply the same least-privilege and update practices to it as to the application.",
      ],
      points: [
        "Require tests and security checks before deployment.",
        "Give CI jobs only the permissions they need.",
        "Do not expose production secrets to untrusted pull requests.",
        "Keep a clear process for triaging findings and releasing urgent fixes.",
      ],
    },
    {
      id: "keep-improving",
      title: "Build a routine your team can sustain",
      paragraphs: [
        "Security improves when it is part of ordinary engineering work. Assign ownership for dependency updates, review scanner findings regularly, and agree on how quickly the team responds to critical issues. Add tests for security bugs that have been fixed so the same mistake is less likely to return.",
        "No checklist eliminates every risk, and no tool can certify an application as secure. A practical baseline—audits and regular package updates, SAST and secret scanning, server-side validation, authorization checks, least privilege, and a protected delivery pipeline—reduces common weaknesses and makes remaining problems easier to discover and address.",
      ],
    },
  ],
};

export const BLOG_ARTICLES: BlogArticleSummary[] = [
  UNDERSTANDING_PACKAGE_SECURITY,
  PRACTICAL_CODE_SECURITY,
];

export const BLOG_ARTICLE_BY_SLUG: Record<string, BlogArticleContent> = {
  [UNDERSTANDING_PACKAGE_SECURITY.slug]: UNDERSTANDING_PACKAGE_SECURITY,
  [PRACTICAL_CODE_SECURITY.slug]: PRACTICAL_CODE_SECURITY,
};
