import type {
  PageLayoutOverviewMainColumnProps,
  PageLayoutOverviewSideColumnProps,
} from "../../PageLayoutOverview.types";
import styles from "../../PageLayoutOverview.module.scss";

export function PageLayoutOverviewMainColumn(
  props: PageLayoutOverviewMainColumnProps,
) {
  const { children } = props;

  return <div className={styles.pageOverview_mainColumn}>{children}</div>;
}

export function PageLayoutOverviewSideColumn(
  props: PageLayoutOverviewSideColumnProps,
) {
  const { children } = props;

  return <div className={styles.pageOverview_sideColumn}>{children}</div>;
}
