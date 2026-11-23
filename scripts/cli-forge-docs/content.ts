import { z } from "zod";

const STABLE_TAG_PATTERN = /^v\d+\.\d+\.\d+$/;
const UNVERSIONED_DOCS_LINK_PATTERN = /(["'(])\/tools\/trustpkg-cli-forge\/(?!v\d+-\d+-\d+(?:\/|["')]))/g;
const navigationGroupSchema = z.object({ group: z.string(), pages: z.array(z.string()) });

export function versionForTag(tag: string): string {
  if (!STABLE_TAG_PATTERN.test(tag)) {
    throw new Error(`Unsupported stable release tag: ${tag}`);
  }

  return tag.replaceAll(".", "-");
}

export function normalizeMeta(input: unknown): Record<string, unknown> {
  const meta = z.record(z.string(), z.unknown()).parse(input);

  if (!Array.isArray(meta.pages)) {
    return meta;
  }

  const pages: string[] = [];

  for (const item of meta.pages) {
    if (typeof item === "string") {
      pages.push(item);
      
      continue;
    }

    const group = navigationGroupSchema.safeParse(item);

    if (!group.success) {
      throw new Error("Unsupported documentation navigation group");
    }

    pages.push(`---${group.data.group}---`, ...group.data.pages);
  }

  return { ...meta, pages };
}

export function rewriteLinks(content: string, version: string): string {
  return content.replace(
    UNVERSIONED_DOCS_LINK_PATTERN,
    `$1/tools/trustpkg-cli-forge/${version}/`,
  );
}
