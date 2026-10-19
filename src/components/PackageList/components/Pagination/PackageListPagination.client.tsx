"use client";

import { Pagination, usePagination } from "@ark-ui/react";
import Link from "next/link";
import React from "react";
import Spinner from "../../../Spinner";
import styles from "../../PackageList.module.scss";
import { getPaginationHref } from "./PackageListPagination.utils";
import { PackageListPaginationPageLink } from "./PackageListPaginationPageLink.client";
import type { PackageListFooterProps } from "../../PackageList.types";
import { useResponsiveProp } from "@/responsive/hooks/useResponsive";

export function PackageListFooter(props: PackageListFooterProps) {
  const {
    count,
    currentPage = 1,
    pageSize = 1,
    siblingCount = 2,
    paginationPath = "/",
  } = props;
  const [pendingPage, setPendingPage] = React.useState<number | null>(null);

  const getHref = (page: number) => getPaginationHref(paginationPath, page);

  const isSpinnerVisible = useResponsiveProp({
    default: false,
    md: true,
  });
  const responsiveSiblingCount = useResponsiveProp({
    default: 0,
    lg: siblingCount,
  });
  const isCompactPagination = useResponsiveProp({
    default: true,
    md: false,
  });

  const pagination = usePagination({
    type: "link",
    count,
    page: currentPage,
    pageSize,
    siblingCount: responsiveSiblingCount,
    getPageUrl: ({ page }) => getHref(page),
  });

  const isNavigating = pendingPage !== null && pendingPage !== currentPage;
  const isPreviousDisabled = isNavigating || pagination.previousPage === null;
  const isNextDisabled = isNavigating || pagination.nextPage === null;

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
    isDisabled: boolean,
  ) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    setPendingPage(page);
  };

  return (
    <div className={styles.packageListPagination}>
      <div className={styles.packageListPagination_spinner}>
        {isSpinnerVisible && (
          <div className={styles.packageListPagination_spinnerIcon}>
            <Spinner isLoading={isNavigating} />
          </div>
        )}

        <nav
          className={styles.packageListPagination_navigation}
          aria-label="Package list pagination"
        >
          <Pagination.RootProvider value={pagination}>
            <Pagination.PrevTrigger asChild>
              <Link
                className={styles.packageListPagination_control}
                href={getHref(pagination.previousPage ?? pagination.page)}
                prefetch
                aria-disabled={isPreviousDisabled}
                tabIndex={isPreviousDisabled ? -1 : undefined}
                onClick={(event) =>
                  handleNavigation(
                    event,
                    pagination.previousPage ?? pagination.page,
                    isPreviousDisabled,
                  )
                }
              >
                Previous
              </Link>
            </Pagination.PrevTrigger>

            <Pagination.Context>
              {(pagination) => {
                const pageValues = pagination.pages.flatMap((page) =>
                  page.type === "page" ? [page.value] : [],
                );
                const lastPage = pageValues[pageValues.length - 1] ?? 1;
                const firstCompactPage = Math.max(
                  1,
                  Math.min(pagination.page - 1, lastPage - 2),
                );
                const compactPageValues = new Set(
                  Array.from(
                    { length: Math.min(3, lastPage) },
                    (_, index) => firstCompactPage + index,
                  ),
                );
                const pages = isCompactPagination
                  ? pagination.pages.filter(
                      (page) =>
                        page.type === "page" &&
                        compactPageValues.has(page.value),
                    )
                  : pagination.pages;

                return pages.map((page, index) =>
                  page.type === "page" ? (
                    <PackageListPaginationPageLink
                      key={index}
                      page={page}
                      currentPage={pagination.page}
                      pendingPage={pendingPage}
                      getHref={getHref}
                      onNavigate={handleNavigation}
                    />
                  ) : (
                    <Pagination.Ellipsis
                      key={index}
                      index={index}
                      className={styles.packageListPagination_ellipsis}
                    >
                      &#8230;
                    </Pagination.Ellipsis>
                  ),
                );
              }}
            </Pagination.Context>

            <Pagination.NextTrigger asChild>
              <Link
                className={styles.packageListPagination_control}
                href={getHref(pagination.nextPage ?? pagination.page)}
                prefetch
                aria-disabled={isNextDisabled}
                tabIndex={isNextDisabled ? -1 : undefined}
                onClick={(event) =>
                  handleNavigation(
                    event,
                    pagination.nextPage ?? pagination.page,
                    isNextDisabled,
                  )
                }
              >
                Next
              </Link>
            </Pagination.NextTrigger>
          </Pagination.RootProvider>
        </nav>
      </div>
    </div>
  );
}
