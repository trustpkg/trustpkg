import { useHighlightQuery } from "fumadocs-core/search/client";
import type { SearchResultRecord } from "fumadocs-core/search/client";
import { createElement, type ReactNode } from "react";
import styles from "./CliForgeSearchResults.module.scss";

type HastNode = SearchResultRecord["hastContent"]["children"][number];

const allowedTags = new Set([
  "p", "strong", "em", "del", "code", "pre", "br", "blockquote",
  "ul", "ol", "li", "table", "thead", "tbody", "tr", "th", "td",
]);

const markdownClasses = new Map([
  ["code", styles.cliForgeSearchResults_markdownCode],
  ["pre", styles.cliForgeSearchResults_markdownPre],
  ["ul", styles.cliForgeSearchResults_markdownList],
  ["ol", styles.cliForgeSearchResults_markdownList],
  ["th", styles.cliForgeSearchResults_markdownCell],
  ["td", styles.cliForgeSearchResults_markdownCell],
  ["table", styles.cliForgeSearchResults_markdownTable],
]);

function renderMarkdown(node: HastNode, key: number): ReactNode {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type !== "element") {
    return null;
  }

  const children = node.children.map((child, index) => renderMarkdown(child, index));

  return createElement(
    allowedTags.has(node.tagName) ? node.tagName : "span",
    { key, className: markdownClasses.get(node.tagName) },
    children,
  );
}

interface CliForgeSearchResultContentProps {
  item: SearchResultRecord;
  query: string;
}

export function CliForgeSearchResultContent(props: CliForgeSearchResultContentProps) {
  const { item, query } = props;

  const highlightRef = useHighlightQuery(query);

  return (
    <div ref={highlightRef} className={styles.cliForgeSearchResults_markdown}>
      {item.hastContent.children.map((node, index) => renderMarkdown(node, index))}
    </div>
  );
}
