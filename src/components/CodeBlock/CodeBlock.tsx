import clsx from "clsx";
import { isValidElement, type ComponentPropsWithoutRef } from "react";
import { CodeBlockCopy } from "./CodeBlockCopy.client";
import styles from "./CodeBlock.module.scss";

interface CodeBlockProps extends ComponentPropsWithoutRef<"pre"> {
  allowCopy?: string;
  containerClassName?: string;
}

function getLanguage(children: CodeBlockProps["children"]) {
  if (!isValidElement<{ className?: string }>(children)) {
    return undefined;
  }

  return children.props.className
    ?.split(/\s+/)
    .find((name) => name.startsWith("language-"))
    ?.slice("language-".length);
}

export function CodeBlock(props: CodeBlockProps) {
  const { children, className, allowCopy, containerClassName, ...preProps } = props;

  const language = getLanguage(children);

  return (
    <div className={clsx(styles.codeBlock, containerClassName)} data-code-block>
      <div className={styles.codeBlock_header}>
        <span>{language && language !== "plaintext" ? language : "Code"}</span>

        {allowCopy !== "false" && <CodeBlockCopy />}
      </div>

      <pre
        {...preProps}
        className={clsx(styles.codeBlock_content, className)}
        data-code-block-content
      >
        {children}
      </pre>
    </div>
  );
}
