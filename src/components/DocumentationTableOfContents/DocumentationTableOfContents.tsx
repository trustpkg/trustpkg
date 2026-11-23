import type { TOCItemType } from "fumadocs-core/toc";
import styles from "./DocumentationTableOfContents.module.scss";

interface DocumentationTableOfContentsProps {
  items: TOCItemType[];
}

export function DocumentationTableOfContents(props: DocumentationTableOfContentsProps) {
  const { items } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.documentationToc} aria-label="On this page">
      <strong className={styles.documentationToc_title}>On this page</strong>
      <ul className={styles.documentationToc_list}>
        {items.map((item) => (
          <li
            key={item.url}
            className={styles.documentationToc_item}
            style={{ marginInlineStart: `${Math.max(0, item.depth - 2) * 0.75}rem` }}
          >
            <a className={styles.documentationToc_link} href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
