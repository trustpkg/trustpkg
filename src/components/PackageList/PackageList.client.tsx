"use client";

import { colors } from "@/theme/generated/colors.generated";
import { clsx } from "clsx";
import React from "react";
import { Base } from "../Base/Base";
import { Button } from "../Button";
import EcosystemBadge from "../EcosystemBadge";
import Hidden from "../Hidden";
import { PackageStatusBadge } from "../PackageStatusBadge/StatusBadge";
import styles from "./PackageList.module.scss";
import { PackageListItemProps } from "./PackageList.types";
import { pxToRem } from "@/utils/pxToRem";
import dynamic from "next/dynamic";

const chartPositions = Array.from({ length: 12 }, (_, index) => {
  return `${(index / 11) * 100}%`;
});

const PackageChart = dynamic(
  () => import("./PackageListChart").then((module) => module.PackageListChart),
  {
    ssr: false,
    loading: () => (
      <div className={styles.chartSkeleton}>
        <div className={styles.chartSkeleton_axis} />

        <div className={styles.chartSkeleton_content}>
          {chartPositions.map((left, index) => (
            <span
              key={`tick-${index}`}
              className={styles.chartSkeleton_tick}
              style={{ left }}
            />
          ))}

          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, index) => (
            <span
              key={month}
              className={styles.chartSkeleton_month}
              style={{ left: chartPositions[index] }}
            >
              {month}
            </span>
          ))}
        </div>
      </div>
    ),
  },
);

export function PackageListItem(props: PackageListItemProps) {
  const {
    packageName,
    IsAlternating,
    href,
    status,
    vulnerabilitiesOccurrences,
  } = props;

  const rowLinkRef = React.useRef<HTMLAnchorElement>(null);
  const cellRef = React.useRef<HTMLTableCellElement>(null);

  const chartData = [
    {
      vulnerabilitiesOccurrences: 0,
      month: "Jan",
    },
    { vulnerabilitiesOccurrences: 0, month: "Feb" },
    { vulnerabilitiesOccurrences: 5, month: "Mar" },
    { vulnerabilitiesOccurrences: 0, month: "Apr" },
    { vulnerabilitiesOccurrences: 3, month: "May" },
    { vulnerabilitiesOccurrences: 0, month: "Jun" },
    { vulnerabilitiesOccurrences: 0, month: "Jul" },
    { vulnerabilitiesOccurrences: 7, month: "Aug" },
    { vulnerabilitiesOccurrences: 0, month: "Sep" },
    { vulnerabilitiesOccurrences: 0, month: "Oct" },
    { vulnerabilitiesOccurrences: 0, month: "Nov" },
    { vulnerabilitiesOccurrences: 0, month: "Dec" },
  ];

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
