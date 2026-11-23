import ArrowRight from "@/assets/ArrowRight.svg";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./DocumentationNextPage.module.scss";

export function DocumentationNextPage(props: ComponentPropsWithoutRef<"a">) {
  const { children, className, ...linkProps } = props;

  return (
    <a {...linkProps} className={clsx(styles.documentationNextPage, className)}>
      <span className={styles.documentationNextPage_label}>
        Next Page
        <ArrowRight className={styles.documentationNextPage_icon} aria-hidden="true" />
      </span>
      <span className={styles.documentationNextPage_title}>{children}</span>
    </a>
  );
}
