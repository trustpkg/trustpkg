import type { PropsWithChildren } from "react";
import styles from "./MdxContent.module.scss";

export function MdxContent(props: PropsWithChildren) {
  return <article className={styles.mdxContent}>{props.children}</article>;
}
