import React from "react";
import styles from "./PageLayout.module.scss";
import { Base } from "../Base/Base";
import { pxToRem } from "@/utils/pxToRem";

interface PageLayoutProps extends React.PropsWithChildren {
  NavigationSlot?: React.ReactNode;
}

export function PageLayoutRoot(props: PageLayoutProps) {
  const { children, NavigationSlot } = props;

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageLayout_menuContainer}>
        <div className={styles.pageLayout_menuInnerContainer}>
          {NavigationSlot}
        </div>
      </div>

      <div className={styles.pageLayout_contentContainer}>
        <div className={styles.pageLayout_contentInnerContainer}>
          {children}
        </div>
      </div>

      <div className={styles.pageLayout_footerContainer}>
        <footer className={styles.pageLayout_footerInnerContainer}>
          <Base as="p" fontSize={pxToRem(12)} opacity={0.9}>
            © 2026 trustpkg.dev. All rights reserved.
          </Base>
        </footer>
      </div>
    </div>
  );
}
