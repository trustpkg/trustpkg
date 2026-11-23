import CodeBlock from "@/components/CodeBlock";
import DocumentationNextPage from "@/components/DocumentationNextPage";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./MdxContent.module.scss";
import { getNextPageLink } from "./MdxContent.utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  as: HeadingTag;
}

export function MdxHeading(props: HeadingProps) {
  const { as: Heading, className, ...rest } = props;

  return (
    <Heading
      {...rest}
      className={clsx(styles.mdxContent_block, styles.mdxContent_heading, className, {
        [styles.mdxContent_heading__h1]: Heading === "h1",
        [styles.mdxContent_heading__h2]: Heading === "h2",
        [styles.mdxContent_heading__h3]: Heading === "h3",
      })}
    />
  );
}

export function MdxParagraph(props: ComponentPropsWithoutRef<"p">) {
  const nextPage = getNextPageLink(props.children, MdxLink);

  if (nextPage) {
    return (
      <p {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_nextPage, props.className)}>
        <DocumentationNextPage {...nextPage} />
      </p>
    );
  }

  return <p {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_paragraph, props.className)} />;
}

export function MdxLink(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} className={clsx(styles.mdxContent_link, props.className)} />;
}

export function MdxUnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return <ul {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_list, props.className)} />;
}

export function MdxOrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return <ol {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_list, props.className)} />;
}

export function MdxBlockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_blockquote, props.className)} />;
}

export function MdxCode(props: ComponentPropsWithoutRef<"code">) {
  const isBlockCode = props.className?.split(/\s+/).some((name) => name.startsWith("language-"));

  return (
    <code
      {...props}
      className={clsx(props.className, {
        [styles.mdxContent_inlineCode]: !isBlockCode,
      })}
    />
  );
}

export function MdxCodeToken(props: ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={clsx(styles.mdxContent_codeToken, props.className)} />;
}

export function MdxCodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  return <CodeBlock {...props} containerClassName={styles.mdxContent_block} />;
}

export function MdxDivider(props: ComponentPropsWithoutRef<"hr">) {
  return <hr {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_divider, props.className)} />;
}

export function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return <table {...props} className={clsx(styles.mdxContent_block, styles.mdxContent_table, props.className)} />;
}

export function MdxTableHeading(props: ComponentPropsWithoutRef<"th">) {
  return <th {...props} className={clsx(styles.mdxContent_tableCell, props.className)} />;
}

export function MdxTableCell(props: ComponentPropsWithoutRef<"td">) {
  return <td {...props} className={clsx(styles.mdxContent_tableCell, props.className)} />;
}
