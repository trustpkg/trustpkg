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
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnPackage,
        )}
      >
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
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnEcosystem,
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__ecosystem,
          )}
        />
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnChart,
        )}
      >
        <PackageListChartSkeleton />
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnTotal,
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__total,
          )}
        />
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnStatus,
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            styles.packageList_skeletonBlock,
            styles.packageList_skeletonBlock__status,
          )}
        />
      </td>
      <td
        aria-hidden="true"
        className={styles.packageList_columnLink}
      />
    </tr>
  );
}

export function PackageListItem(props: PackageListItemProps) {
  const {
    packageName,
    IsAlternating,
    href,
    status,
    severity,
    statusTooltip,
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
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnPackage,
        )}
      >
        <Base as="span" color={colors.text.accent} fontWeight={700} overflowWrap="anywhere">
          {packageName}
        </Base>
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnEcosystem,
        )}
      >
        <EcosystemBadge ecosystemName="npm" />
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnChart,
        )}
      >
        <PackageListChartSlot packageName={packageName} chartData={chartData} />
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnTotal,
        )}
      >
        <Base as="span" fontWeight={700}>
          {vulnerabilitiesOccurrences}
        </Base>
      </td>
      <td
        className={clsx(
          styles.packageList_cell,
          styles.packageList_columnStatus,
        )}
      >
        <PackageStatusBadge
          status={status}
          severity={severity}
          tooltip={statusTooltip}
        />
      </td>
      <td className={styles.packageList_columnLink}>
        <Hidden>
          <Button.AsNextLink href={href} prefetch>
            view {packageName} details
          </Button.AsNextLink>
        </Hidden>
      </td>
    </PackageListRow>
  );
}
