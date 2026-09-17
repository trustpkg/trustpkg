"use client";

import { colors } from "@/theme/generated/colors.generated";
import { clsx } from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { Base } from "../Base/Base";
import { Button } from "../Button";
import EcosystemBadge from "../EcosystemBadge";
import Hidden from "../Hidden";
import { PackageStatusBadge } from "../PackageStatusBadge/StatusBadge";
import Spinner from "../Spinner";
import styles from "./PackageList.module.scss";
import { PackageListFooterProps, PackageListItemProps } from "./PackageList.types";
import {
  getChartTickPositions,
  getLastMonths,
} from "./PackageList.utils";
import { Pagination, usePagination } from "@ark-ui/react";

const chartMonths = getLastMonths(6);
const chartPositions = getChartTickPositions(chartMonths.length).map(
  (position) => `${position}%`,
);

function PackageChartSkeleton() {
  return (
    <div className={styles.chartSkeleton} aria-hidden="true">
      <div className={styles.chartSkeleton_axis} />

      <div className={styles.chartSkeleton_content}>
        {chartPositions.map((left, index) => (
          <span
            key={`label-${index}`}
            className={styles.chartSkeleton_month}
            style={{ left }}
          >
            {chartMonths[index].label}
          </span>
        ))}
      </div>
    </div>
  );
}

const PackageChart = dynamic(
  () => import("./PackageListChart").then((module) => module.PackageListChart),
  {
    ssr: false,
    loading: () => <PackageChartSkeleton />,
  },
);

export function PackageListItemSkeleton({
  IsAlternating,
}: Pick<PackageListItemProps, "IsAlternating"> = {}) {
  return (
    <tr
      aria-busy="true"
      className={clsx(styles.packageList_row, {
        [styles.packageList_row__alternating]: IsAlternating,
      })}
    >
      <td className={styles.packageList_cell}>
        <Hidden>
          <span role="status">Loading package data</span>
        </Hidden>
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__package,
          )}
        />
      </td>
      <td className={styles.packageList_cell}>
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__ecosystem,
          )}
        />
      </td>
      <td className={styles.packageList_cell}>
        <PackageChartSkeleton />
      </td>
      <td className={styles.packageList_cell}>
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__total,
          )}
        />
      </td>
      <td className={styles.packageList_cell}>
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__status,
          )}
        />
      </td>
      <td aria-hidden="true" />
    </tr>
  );
}

export function PackageListItem(props: PackageListItemProps) {
  const {
    packageName,
    IsAlternating,
    href,
    status,
    vulnerabilitiesOccurrences,
    vulnerabilityCounts,
  } = props;

  const rowLinkRef = React.useRef<HTMLAnchorElement>(null);
  const cellRef = React.useRef<HTMLTableCellElement>(null);

  const chartData = getLastMonths(6).map(({ key, label }) => ({
    month: label,
    vulnerabilitiesOccurrences: vulnerabilityCounts[key] ?? 0,
  }));

  return (
    <tr
      className={clsx(styles.packageList_row, {
        [styles.packageList_row__alternating]: IsAlternating,
      })}
      onClick={() => {
        if (rowLinkRef.current && cellRef.current) {
          if (cellRef.current.contains(document.activeElement)) {
            return;
          }

          rowLinkRef.current.click();
        }
      }}
    >
      <td className={styles.packageList_cell}>
        <Base as="span" color={colors.text.accent} fontWeight={700}>
          {packageName}
        </Base>
      </td>
      <td className={styles.packageList_cell}>
        <EcosystemBadge ecosystemName="npm" />
      </td>
      <td className={styles.packageList_cell} ref={cellRef}>
        <PackageChart packageName={packageName} chartData={chartData} />
      </td>
      <td className={styles.packageList_cell}>
        <Base as="span" fontWeight={700}>
          {vulnerabilitiesOccurrences}
        </Base>
      </td>
      <td className={styles.packageList_cell}>
        <PackageStatusBadge
          status={status}
          tooltip={{
            title: "high vulnerability >=2.11.3",
            description: "test test test test",
          }}
        />
      </td>
      <td>
        <Hidden>
          <Button.AsNextLink href={href} prefetch ref={rowLinkRef}>
            view {packageName} details
          </Button.AsNextLink>
        </Hidden>
      </td>
    </tr>
  );
}

interface PaginationPageLinkProps {
  page: {
    type: "page";
    value: number;
  };
  currentPage: number;
  pendingPage: number | null;
  getHref: (page: number) => string;
  onNavigate: (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
    isDisabled: boolean,
  ) => void;
}

function PaginationPageLink(props: PaginationPageLinkProps) {
  const { page, currentPage, pendingPage, getHref, onNavigate } = props;
  const isDisabled =
    page.value === currentPage ||
    (pendingPage !== null && pendingPage !== currentPage);

  return (
    <Pagination.Item
      {...page}
      asChild
      className={styles.packageListPagination_item}
    >
      <Link
        href={getHref(page.value)}
        prefetch
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={(event) => onNavigate(event, page.value, isDisabled)}
      >
        {page.value}
      </Link>
    </Pagination.Item>
  );
}

export function PackageListFooter(props: PackageListFooterProps) {
  const {
    count,
    currentPage = 1,
    pageSize = 1,
    siblingCount = 2,
    paginationPath = "/",
  } = props;
  const [pendingPage, setPendingPage] = React.useState<number | null>(null);

  const getPaginationHref = (page: number) => {
    const [pathAndQuery, hash = ""] = paginationPath.split("#", 2);
    const queryStart = pathAndQuery.indexOf("?");
    const pathname = queryStart === -1
      ? pathAndQuery
      : pathAndQuery.slice(0, queryStart);
    const query = queryStart === -1
      ? ""
      : pathAndQuery.slice(queryStart + 1);
    const searchParams = new URLSearchParams(query);

    searchParams.set("page", String(page));

    const search = searchParams.toString();

    return `${pathname || "/"}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
  };


  const pagination = usePagination({
    type: 'link',
    count,
    page: currentPage,
    pageSize,
    siblingCount,
    getPageUrl: ({ page }) => getPaginationHref(page),
  })

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
        <Spinner isLoading={isNavigating} />
        <nav
          className={styles.packageListPagination_navigation}
          aria-label="Package list pagination"
        >
          <Pagination.RootProvider value={pagination}>
            <Pagination.PrevTrigger asChild>
              <Link
                className={styles.packageListPagination_control}
                href={getPaginationHref(pagination.previousPage ?? pagination.page)}
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
              {(pagination) =>
                pagination.pages.map((page, index) =>
                  page.type === 'page' ? (
                    <PaginationPageLink
                      key={index}
                      page={page}
                      currentPage={pagination.page}
                      pendingPage={pendingPage}
                      getHref={getPaginationHref}
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
                )
              }
            </Pagination.Context>
            <Pagination.NextTrigger asChild>
              <Link
                className={styles.packageListPagination_control}
                href={getPaginationHref(pagination.nextPage ?? pagination.page)}
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
  )
}