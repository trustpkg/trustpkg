import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeMeta, rewriteLinks, versionForTag } from "./content";
import { downloadDocumentationFile, getDocumentationTree, releases } from "./github";
import type { Release, TreeEntry } from "./github";

const GENERATED_DIR = path.resolve(".generated/cli-forge");
const ASSETS_DIR = path.resolve("public/generated/cli-forge");
const VERSIONS_FILE = path.resolve(".generated/cli-forge-versions.json");
const DOCS_DIR = "docs";
const DOCS_PREFIX = `${DOCS_DIR}/`;
const OVERVIEW_FILE = "overview.mdx";
const INDEX_FILE = "index.mdx";
const META_FILE = "meta.json";
const REGULAR_FILE_MODE = "100644";
const JSON_INDENT = 2;
const CONTENT_FILE_PATTERN = /\.(mdx?|json)$/;

interface PreparedVersion {
  tag: string;
  version: string;
}

async function writeDocumentationFile(entry: TreeEntry, tag: string, version: string, sha: string) {
  if (entry.type !== "blob" || entry.mode !== REGULAR_FILE_MODE) {
    throw new Error(`Unsupported file in ${tag}: ${entry.path}`);
  }

  const relative = entry.path.slice(DOCS_PREFIX.length);
  if (!relative || relative.split("/").some((part) => !part || part === "." || part === "..")) {
    throw new Error(`Invalid documentation path in ${tag}: ${entry.path}`);
  }

  const response = await downloadDocumentationFile(tag, sha, entry);
  const isContent = CONTENT_FILE_PATTERN.test(relative);
  const targetRelative = relative === OVERVIEW_FILE ? INDEX_FILE : relative;
  const target = path.join(isContent ? GENERATED_DIR : ASSETS_DIR, version, targetRelative);

  await mkdir(path.dirname(target), { recursive: true });

  if (relative.endsWith(".mdx") || relative.endsWith(".md")) {
    await writeFile(target, rewriteLinks(await response.text(), version));
  } else if (path.basename(relative) === META_FILE) {
    await writeFile(target, `${JSON.stringify(normalizeMeta(await response.json()), null, JSON_INDENT)}\n`);
  } else {
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
  }
}

async function prepareVersion(release: Release): Promise<PreparedVersion | null> {
  const tag = release.tag_name;
  const version = versionForTag(tag);
  const { sha, entries } = await getDocumentationTree(tag);

  if (!entries.some((entry) => entry.path === DOCS_DIR && entry.type === "tree")) {
    console.warn(`Skipping ${tag}: docs directory is absent`);
    return null;
  }

  const files = entries.filter((entry) => entry.path.startsWith(DOCS_PREFIX) && entry.type !== "tree");
  if (!files.some((entry) => entry.path === `${DOCS_PREFIX}${OVERVIEW_FILE}`)) {
    throw new Error(`Missing docs/overview.mdx in ${tag}`);
  }

  await Promise.all(files.map((entry) => writeDocumentationFile(entry, tag, version, sha)));
  await writeFile(path.join(GENERATED_DIR, version, META_FILE), JSON.stringify({
    title: tag,
    root: "version",
    pages: ["index", "..."],
  }, null, JSON_INDENT));

  return { tag, version };
}

export async function prepareCliForgeDocs() {
  const allReleases = await releases();
  const versions = new Set<string>();

  for (const release of allReleases) {
    const version = versionForTag(release.tag_name);
    if (versions.has(version)) {
      throw new Error(`Duplicate version slug: ${version}`);
    }
    versions.add(version);
  }

  await rm(GENERATED_DIR, { recursive: true, force: true });
  await rm(ASSETS_DIR, { recursive: true, force: true });
  await mkdir(GENERATED_DIR, { recursive: true });

  const prepared: PreparedVersion[] = [];

  for (const release of allReleases) {
    const result = await prepareVersion(release);
    if (result) {
      prepared.push(result);
    }
  }

  await writeFile(VERSIONS_FILE, `${JSON.stringify(prepared, null, JSON_INDENT)}\n`);
  
  console.log(`Prepared ${prepared.length} CLI Forge documentation version(s)`);
}
