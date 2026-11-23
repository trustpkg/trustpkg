import { z } from "zod";

const REPOSITORY = "trustpkg/trustpkg-cli-forge";
const API_URL = `https://api.github.com/repos/${REPOSITORY}`;
const RELEASES_PAGE_SIZE = 100;
const FIRST_PAGE = 1;
const COMMIT_SHA_PATTERN = /^[a-f0-9]{40}$/;

const releaseSchema = z.object({
  tag_name: z.string(),
  draft: z.boolean(),
  prerelease: z.boolean(),
});

const treeEntrySchema = z.object({
  path: z.string(),
  type: z.string(),
  mode: z.string().optional(),
});

export type Release = z.infer<typeof releaseSchema>;
export type TreeEntry = z.infer<typeof treeEntrySchema>;

async function getJson(url: string): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "trustpkg-docs-build",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}): ${url}`);
  }

  return response.json();
}

async function fetchReleasesPage(
  fetchPage: (url: string) => Promise<unknown>,
  page: number,
): Promise<Release[]> {
  const url = `${API_URL}/releases?per_page=${RELEASES_PAGE_SIZE}&page=${page}`;
  const parsed = z.array(releaseSchema).safeParse(await fetchPage(url));

  if (!parsed.success) {
    throw new Error("Invalid GitHub releases response", { cause: parsed.error });
  }

  const stableReleases = parsed.data.filter((item) => !item.draft && !item.prerelease);

  if (parsed.data.length < RELEASES_PAGE_SIZE) {
    return stableReleases;
  }

  const remainingReleases = await fetchReleasesPage(fetchPage, page + 1);
  
  return [...stableReleases, ...remainingReleases];
}

export async function releases(fetchPage: (url: string) => Promise<unknown> = getJson): Promise<Release[]> {
  return fetchReleasesPage(fetchPage, FIRST_PAGE);
}

export async function getDocumentationTree(tag: string): Promise<{ sha: string; entries: TreeEntry[] }> {
  const commit = await getJson(`${API_URL}/commits/${encodeURIComponent(tag)}`);
  const parsedCommit = z.object({ sha: z.string().regex(COMMIT_SHA_PATTERN) }).safeParse(commit);

  if (!parsedCommit.success) {
    throw new Error(`Invalid commit for ${tag}`, { cause: parsedCommit.error });
  }

  const { sha } = parsedCommit.data;
  const tree = await getJson(`${API_URL}/git/trees/${sha}?recursive=1`);
  const parsedTree = z.object({
    truncated: z.boolean(),
    tree: z.array(treeEntrySchema),
  }).safeParse(tree);

  if (!parsedTree.success || parsedTree.data.truncated) {
    throw new Error(`Incomplete Git tree for ${tag}`);
  }

  return { sha, entries: parsedTree.data.tree };
}

export async function downloadDocumentationFile(tag: string, sha: string, entry: TreeEntry): Promise<Response> {
  const rawPath = entry.path.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`https://raw.githubusercontent.com/${REPOSITORY}/${sha}/${rawPath}`);

  if (!response.ok) {
    throw new Error(`Failed to download ${tag}/${entry.path}: ${response.status}`);
  }

  return response;
}
