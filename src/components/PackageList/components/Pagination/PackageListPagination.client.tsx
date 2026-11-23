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
  const pagesRef = React.useRef<HTMLDivElement>(null);

  const getHref = (page: number) => getPaginationHref(paginationPath, page);

  const isSpinnerVisible = useResponsiveProp({
    default: false,
    md: true,
  });
  const pagination = usePagination({
    type: "link",
    count,
    page: currentPage,
    pageSize,
    siblingCount,
    getPageUrl: ({ page }) => getHref(page),
  });

  const isNavigating = pendingPage !== null && pendingPage !== currentPage;
  const isPreviousDisabled = isNavigating || pagination.previousPage === null;
  const isNextDisabled = isNavigating || pagination.nextPage === null;

  React.useEffect(
    function revealCurrentPage() {
      const container = pagesRef.current;
      const selected = container?.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );

      if (!container || !selected) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      container.scrollLeft +=
        selectedRect.left -
        containerRect.left -
        (containerRect.width - selectedRect.width) / 2;
    },
    [currentPage, count, pageSize, siblingCount],
  );

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

        <Pagination.RootProvider
          value={pagination}
          className={styles.packageListPagination_navigation}
          aria-label="Package list pagination"
        >
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

          <div className={styles.packageListPagination_pages} ref={pagesRef}>
            {pagination.pages.map((page, index) =>
              page.type === "page" ? (
                <PackageListPaginationPageLink
                  key={page.value}
                  page={page}
                  currentPage={pagination.page}
                  pendingPage={pendingPage}
                  getHref={getHref}
                  onNavigate={handleNavigation}
                />
              ) : (
                <Pagination.Ellipsis
                  key={`ellipsis-${index}`}
                  index={index}
                  className={styles.packageListPagination_ellipsis}
                >
                  &#8230;
                </Pagination.Ellipsis>
              ),
            )}
          </div>

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
      </div>
    </div>
  );
}
