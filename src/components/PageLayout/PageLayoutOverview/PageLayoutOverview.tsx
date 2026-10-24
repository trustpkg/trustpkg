import styles from "./PageLayoutOverview.module.scss";
import type { PageLayoutOverviewProps } from "./PageLayoutOverview.types";

export function PageLayoutOverviewRoot(props: PageLayoutOverviewProps) {
  const { children } = props;

  return <div className={styles.pageOverview}>{children}</div>;
}
