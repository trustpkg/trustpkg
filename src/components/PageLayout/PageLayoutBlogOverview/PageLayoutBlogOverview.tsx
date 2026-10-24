import React from "react";
import styles from "./PageLayoutBlogOverview.module.scss";

export interface PageLayoutBlogOverviewProps extends React.PropsWithChildren {}

export function PageLayoutBlogOverviewRoot(
  props: PageLayoutBlogOverviewProps,
) {
  return <div className={styles.blogOverview}>{props.children}</div>;
}
