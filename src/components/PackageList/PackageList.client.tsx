"use client";

import { colors } from "@/theme/generated/colors.generated";
import { clsx } from "clsx";
import dynamic from "next/dynamic";
import React from "react";
import { Base } from "../Base/Base";
import { Button } from "../Button";
import EcosystemBadge from "../EcosystemBadge";
import Hidden from "../Hidden";
import { PackageStatusBadge } from "../PackageStatusBadge/StatusBadge";
import Spinner from "../Spinner";
import styles from "./PackageList.module.scss";
import { PackageListItemProps } from "./PackageList.types";
import {
  getChartTickPositions,
  getLastMonths,
} from "./PackageList.utils";

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
            key={`tick-${index}`}
            className={styles.chartSkeleton_tick}
            style={{ left }}
          />
        ))}

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

export function PackageListFooter() {
  return (
    <div className={styles.packageListPagination}>
      <div className={styles.packageListPagination_spinner}>
        <Spinner isLoading={false} />
      </div>
    </div>
  )
}