import NavigationListLink from "@/components/NavigationListLink";
import clsx from "clsx";
import type { Node } from "fumadocs-core/page-tree";
import styles from "./DocumentationNavigation.module.scss";

interface DocumentationNavigationProps {
  nodes: Node[];
  current: string;
}

function NavigationGroup(props: DocumentationNavigationProps & { nested?: boolean }) {
  const { nodes, current, nested = false } = props;

  const firstGroupIndex = nodes.findIndex((node) => node.type !== "page");

  return (
    <ul className={clsx(styles.documentationNavigation, {
      [styles.documentationNavigation__nested]: nested,
    })}>
      {nodes.map((node, index) => {
        const separated = !nested && index > 0 && index !== firstGroupIndex;

        if (node.type === "separator") {
          return (
            <li
              className={clsx(styles.documentationNavigation_separator, {
                [styles.documentationNavigation_separator__separated]: separated,
                [styles.documentationNavigation_separator__nested]: nested,
              })}
              key={`separator-${index}`}
            >
              {node.name}
            </li>
          );
        }

        if (node.type === "page") {
          return (
            <li key={node.url}>
              <NavigationListLink href={node.url} active={node.url === current}>
                {node.name}
              </NavigationListLink>
            </li>
          );
        }

        return (
          <li
            key={node.$id ?? `folder-${index}`}
            className={clsx(styles.documentationNavigation_folder, {
              [styles.documentationNavigation_folder__separated]: separated,
            })}
          >
            <span className={clsx(styles.documentationNavigation_folderTitle, {
              [styles.documentationNavigation_folderTitle__nested]: nested,
            })}>
              {node.name}
            </span>

            <NavigationGroup
              nodes={node.index ? [node.index, ...node.children] : node.children}
              current={current}
              nested
            />
          </li>
        );
      })}
    </ul>
  );
}

export function DocumentationNavigation(props: DocumentationNavigationProps) {
  return <NavigationGroup {...props} />;
}
