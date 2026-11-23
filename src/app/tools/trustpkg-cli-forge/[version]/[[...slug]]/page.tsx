import { CliForgeDocs } from "@/app/tools/trustpkg-cli-forge/[version]/[[...slug]]/(components)/CliForgeDocs/CliForgeDocs";
import { mdxComponents } from "@/components/MdxContent";
import { cliForgeSource, cliForgeVersions } from "@/lib/cliForgeDocs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return cliForgeSource.generateParams().flatMap(({ slug = [] }) => {
    const [version, ...rest] = slug;
    return version ? [{ version, slug: rest }] : [];
  });
}

interface CliForgePageProps {
  params: Promise<{ version: string; slug?: string[] }>;
};

export async function generateMetadata(props: CliForgePageProps): Promise<Metadata> {
  const { version, slug = [] } = await props.params;

  const page = cliForgeSource.getPage([version, ...slug]);

  return {
    title: page ? `${page.data.title} | Trustpkg CLI Forge` : "Trustpkg CLI Forge documentation",
    description: page?.data.description,
  };
}

export default async function CliForgePage(props: CliForgePageProps) {
  const { version: versionSlug, slug = [] } = await props.params;

  const version = cliForgeVersions.find((item) => item.version === versionSlug);
  const page = cliForgeSource.getPage([versionSlug, ...slug]);

  if (!page || !version) {
    notFound();
  }

  const root = cliForgeSource.getPageTree().children.find(
    (node) => node.type === "folder" && node.name === version.tag,
  );

  if (!root || root.type !== "folder") {
    throw new Error(`Missing documentation tree for ${version.tag}`);
  }

  const MDX = page.data.body;

  return (
    <CliForgeDocs
      nodes={root.index ? [root.index, ...root.children] : root.children}
      current={page.url}
      version={version.version}
      versions={cliForgeVersions}
      toc={page.data.toc}
    >
      <MDX components={mdxComponents} />
    </CliForgeDocs>
  );
}
