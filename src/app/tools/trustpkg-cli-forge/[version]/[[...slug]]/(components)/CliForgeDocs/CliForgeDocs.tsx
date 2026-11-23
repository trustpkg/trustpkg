import DocumentationNavigation from "@/components/DocumentationNavigation";
import DocumentationTableOfContents from "@/components/DocumentationTableOfContents";
import MdxContent from "@/components/MdxContent";
import PageLayout from "@/components/PageLayout";
import type { Node } from "fumadocs-core/page-tree";
import type { TOCItemType } from "fumadocs-core/toc";
import type { ReactNode } from "react";
import { CliForgeControls } from "./CliForgeControls";
import type { CliForgeVersion } from "./CliForgeDocs.types";

interface CliForgeDocsProps {
  children: ReactNode;
  nodes: Node[];
  current: string;
  version: string;
  versions: CliForgeVersion[];
  toc: TOCItemType[];
}

export function CliForgeDocs(props: CliForgeDocsProps) {
  const {
    children,
    nodes,
    current,
    version,
    versions,
    toc,
  } = props;

  return (
    <PageLayout>
      <PageLayout.List>
        <PageLayout.List.SideMenu>
          <DocumentationNavigation nodes={nodes} current={current} />
        </PageLayout.List.SideMenu>

        <PageLayout.List.Details>
          <CliForgeControls versions={versions} version={version} />

          <DocumentationTableOfContents items={toc} />

          <MdxContent>{children}</MdxContent>
        </PageLayout.List.Details>
      </PageLayout.List>
    </PageLayout>
  );
}
