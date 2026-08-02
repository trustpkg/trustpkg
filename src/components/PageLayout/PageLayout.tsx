import React from "react";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps extends React.PropsWithChildren {
  NavigationSlot?: React.ReactNode;
}

export function PageLayoutRoot(props: PageLayoutProps) {
  const { children, NavigationSlot } = props;

  return (
    <div className={styles.pageLayout}>
      {NavigationSlot}
      {children}
    </div>
  );
}
