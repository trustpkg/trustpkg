import { clsx } from "clsx";
import React from "react";
import Hidden from "../Hidden";
import { PackageListFooter } from "./components/Pagination/PackageListPagination.client";
import styles from "./PackageList.module.scss";
import type {
  PackageListItemsProps,
  PackageListRootProps,
} from "./PackageList.types";

export function PackageListRoot(props: PackageListRootProps) {
  const {
    children,
    count,
    currentPage,
    pageSize,
    siblingCount,
    paginationPath,
  } = props;

  return (
    <div className={styles.packageList}>
      <div className={styles.packageList_scrollWrapper}>
        <table className={styles.packageList_table}>
          <thead className={styles.packageList_head}>
            <tr className={styles.packageList_headRow}>
              <th className={styles.packageList_headCell}>Package</th>
              <th className={styles.packageList_headCell}>Ecosystem</th>
              <th className={styles.packageList_headCell}>
                6 months vulnerabilities trend
              </th>
              <th className={styles.packageList_headCell}>Total (6M)</th>
              <th className={styles.packageList_headCell}>
                Status (last 30 days)
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
          <tbody className={styles.packageList_body}>{children}</tbody>
        </table>
      </div>

      <div className={styles.packageList_footer}>
        <PackageListFooter
          count={count}
          currentPage={currentPage}
          pageSize={pageSize}
          siblingCount={siblingCount}
          paginationPath={paginationPath}
        />
      </div>
    </div>
  );
}

export function PackageListItems(props: PackageListItemsProps) {
  const { items, children } = props;

  return items.map((item, index) =>
    children(item, {
      index,
      isAlternating: index % 2 === 1,
    }),
  );
}
