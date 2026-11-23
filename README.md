# Trustpkg

Trustpkg is a frontend application for checking package trust and security data.

Right now the app is focused on npm packages and is planned to show information such as:

- how often a package had vulnerabilities
- general package security overview
- package trust-related insights

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Sass / SCSS
- Zod
- ESLint

## Features

- frontend app built with App Router
- generated theme system
- theme API with cookie-based persistence
- type-safe payload validation

## Getting Started

Install dependencies:

```bash
pnpm install
```

### CLI Forge documentation

`pnpm dev`, `pnpm build`, and `pnpm typecheck` fetch documentation from the tags
of published, stable [CLI Forge releases](https://github.com/trustpkg/trustpkg-cli-forge/releases).
Only releases containing a `docs` directory are included. The generated
documentation and search index are built locally and are not fetched at runtime.
Network or GitHub API errors fail the build; set `GITHUB_TOKEN` if API rate
limits require authentication. Generated content is ignored by Git.

The documentation is available at `/tools/trustpkg-cli-forge/`. The base URL
redirects to the latest release. Each release also has a versioned URL such as
`/tools/trustpkg-cli-forge/v1-0-1/`.

The CLI Forge MDX renderer uses shared article and code block components from
`src/components`. Code blocks retain syntax highlighting and offer a copy
button unless the block specifies `noCopy`.
