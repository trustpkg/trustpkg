import { colors } from "@/theme/generated/colors.generated";
import { clsx } from "clsx";
import { Base } from "../../../Base/Base";
import { Button } from "../../../Button";
import EcosystemBadge from "../../../EcosystemBadge";
import Hidden from "../../../Hidden";
import { PackageStatusBadge } from "../../../PackageStatusBadge/StatusBadge";
import styles from "../../PackageList.module.scss";
import { PackageListChartSkeleton } from "../Chart/PackageListChartSkeleton";
import { PackageListChartSlot } from "../Chart/PackageListChartSlot.client";
import { getPackageChartData } from "./PackageListItem.utils";
import { PackageListRow } from "./PackageListRow.client";
import type { PackageListItemProps } from "../../PackageList.types";

export function PackageListItemSkeleton(
  props: Pick<PackageListItemProps, "IsAlternating"> = {},
) {
  const { IsAlternating } = props;

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
        <PackageListChartSkeleton />
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
  const chartData = getPackageChartData(vulnerabilityCounts);

  return (
    <PackageListRow
      className={clsx(styles.packageList_row, {
        [styles.packageList_row__alternating]: IsAlternating,
      })}
    >
      <td className={styles.packageList_cell}>
        <Base as="span" color={colors.text.accent} fontWeight={700} overflowWrap="anywhere">
          {packageName}
        </Base>
      </td>
      <td className={styles.packageList_cell}>
        <EcosystemBadge ecosystemName="npm" />
      </td>
      <td className={styles.packageList_cell}>
        <PackageListChartSlot packageName={packageName} chartData={chartData} />
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
          <Button.AsNextLink href={href} prefetch>
            view {packageName} details
          </Button.AsNextLink>
        </Hidden>
      </td>
    </PackageListRow>
  );
}
