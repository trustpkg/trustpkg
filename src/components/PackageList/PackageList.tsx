import { ScrollArea } from "@ark-ui/react";
import { clsx } from "clsx";
import React from "react";
import Hidden from "../Hidden";
import styles from "./PackageList.module.scss";
import type {
  PackageListItemProps,
  PackageListRootProps,
} from "./PackageList.types";
import Spinner from "../Spinner";
import { PackageListFooter } from "./PackageList.client";

export function PackageListRoot(props: PackageListRootProps) {
  const { children } = props;

  return (
    <div className={styles.packageList}>
      <ScrollArea.Root className={styles.packageList_scrollWrapper}>
        <ScrollArea.Viewport className={styles.packageList_viewport}>
          <ScrollArea.Content className={styles.packageList_content}>
            <table className={styles.packageList_table}>
              <thead className={styles.packageList_head}>
                <tr className={styles.packageList_headRow}>
                  <th className={styles.packageList_headCell}>Package</th>
                  <th className={styles.packageList_headCell}>Ecosystem</th>
                  <th className={styles.packageList_headCell}>
                    12 months vulnerabilities trend
                  </th>
                  <th className={styles.packageList_headCell}>Total (12M)</th>
                  <th className={styles.packageList_headCell}>
                    Status
                  </th>
                  <th
                    className={clsx(
                      styles.packageList_headCell,
                      styles.packageList_headCell__hidden,
                    )}
                  >
                    <Hidden>link to package details</Hidden>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.packageList_body}>
                {React.Children.map(children, (child, index) =>
                  React.isValidElement(child)
                    ? React.cloneElement(child, {
                      IsAlternating: index % 2 === 1,
                    } as unknown as React.ReactElement<PackageListItemProps>)
                    : child,
                )}

              </tbody>
            </table>
          </ScrollArea.Content >
        </ScrollArea.Viewport >
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root >

      <div className={styles.packageList_footer}>
        <PackageListFooter />
      </div>
    </div>
  );
}
