import type { components } from "@/api/api.types";
import type { PackageListItemProps } from "../../PackageList.types";
import { getLastMonths } from "../../PackageList.utils";

type PackageListDocument =
  components["schemas"]["packagesApi.PackageListDocument"];

export function toPackageListItem(
  document: PackageListDocument,
): PackageListItemProps {
  const vulnerabilityCounts = document.vulnerability_counts ?? {};

  return {
    packageName: document.name ?? "",
    href: `/packages/${document.slug}`,
    status: "unknown",
    vulnerabilitiesOccurrences: String(
      Object.values(vulnerabilityCounts).reduce(
        (sum, value) => sum + Number(value ?? 0),
        0,
      ),
    ),
    vulnerabilityCounts,
  };
}

export function getPackageChartData(
  vulnerabilityCounts: Record<string, number>,
) {
  return getLastMonths(6).map(({ key, label }) => ({
    month: label,
    vulnerabilitiesOccurrences: vulnerabilityCounts[key] ?? 0,
  }));
}
