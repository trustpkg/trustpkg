import { PageLayoutListRootProps } from "./PageLayoutList.types";
import styles from "./PageLayoutList.module.scss";

export function PageLayoutListRoot(props: PageLayoutListRootProps) {
  const { children } = props

  return <div className={styles.pageList}>{children}</div>;
}
