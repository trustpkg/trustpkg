import {
  PACKAGE_STATUS_BADGE_STATUS,
  type PackageStatusBadgeStatus,
  type PackageStatusBadgeTooltip,
} from "@/components/PackageStatusBadge/StatusBadge.types";
import type { components } from "@/api/api.types";
import { createElement } from "react";
import type { PackageListItemProps } from "../../PackageList.types";
import { getLastMonths } from "../../PackageList.utils";

type PackageListDocument =
  components["schemas"]["packagesApi.PackageListDocument"];
type PackageCurrentStatus =
  components["schemas"]["packagesApi.PackageCurrentStatus"];
type PackageVulnerability = components["schemas"]["packagesApi.Vulnerability"];

const PREVIOUS_MONTH_LOOKBACK_DAYS = 7;

interface PackageStatusResult {
  status: PackageStatusBadgeStatus;
  severity?: string;
  statusTooltip?: PackageStatusBadgeTooltip;
}

interface VulnerabilityCandidate {
  sourceKey: string;
  vulnerability: PackageVulnerability;
}

function hasValue(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function uniqueValues(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(hasValue)));
}

function uniqueNonZeroValues(values: Array<string | undefined>) {
  return uniqueValues(values).filter((value) => value.trim() !== "0");
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getRelevantMonthKeys(referenceDate: Date) {
  const currentMonth = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    1,
  );
  const monthKeys = [getMonthKey(currentMonth)];

  if (referenceDate.getDate() <= PREVIOUS_MONTH_LOOKBACK_DAYS) {
    monthKeys.push(
      getMonthKey(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
      ),
    );
  }

  return monthKeys;
}

function getMonthKeyFromRecordKey(recordKey: string) {
  const match = /^(\d{4})-(\d{2})(?:-\d{2})?/.exec(recordKey);

  if (!match || Number(match[2]) < 1 || Number(match[2]) > 12) {
    return undefined;
  }

  return `${match[1]}-${match[2]}`;
}

function getDateValue(value: string | undefined) {
  if (!hasValue(value)) {
    return undefined;
  }

  const dateValue = Date.parse(value);
  return Number.isNaN(dateValue) ? undefined : dateValue;
}

function getRecordKeyDateValue(recordKey: string) {
  const recordDateValue = getDateValue(recordKey);

  if (recordDateValue !== undefined) {
    return recordDateValue;
  }

  const monthKey = getMonthKeyFromRecordKey(recordKey);

  if (!monthKey) {
    return 0;
  }

  return getDateValue(`${monthKey}-01T00:00:00Z`) ?? 0;
}

function getVulnerabilityDateValue(vulnerability: PackageVulnerability) {
  return (
    getDateValue(vulnerability.published_at) ??
    getDateValue(vulnerability.modified_at) ??
    0
  );
}

function getRecentVulnerabilities(
  document: PackageListDocument,
  relevantMonthKeys: string[],
): VulnerabilityCandidate[] {
  const relevantMonths = new Set(relevantMonthKeys);

  return Object.entries(document.vulnerabilities ?? {}).flatMap(
    ([sourceKey, vulnerabilities]) => {
      const monthKey = getMonthKeyFromRecordKey(sourceKey);

      if (!monthKey || !relevantMonths.has(monthKey)) {
        return [];
      }

      return vulnerabilities.map((vulnerability) => ({
        sourceKey,
        vulnerability,
      }));
    },
  );
}

function getLatestVulnerability(candidates: VulnerabilityCandidate[]) {
  return [...candidates].sort((left, right) => {
    const sourceDateDifference =
      getRecordKeyDateValue(right.sourceKey) -
      getRecordKeyDateValue(left.sourceKey);

    if (sourceDateDifference !== 0) {
      return sourceDateDifference;
    }

    return (
      getVulnerabilityDateValue(right.vulnerability) -
      getVulnerabilityDateValue(left.vulnerability)
    );
  })[0];
}

function hasRecentVulnerabilitiesCount(
  document: PackageListDocument,
  relevantMonthKeys: string[],
) {
  const relevantMonths = new Set(relevantMonthKeys);

  return Object.entries(document.vulnerability_counts ?? {}).some(
    ([sourceKey, count]) => {
      const monthKey = getMonthKeyFromRecordKey(sourceKey);
      return !!monthKey && relevantMonths.has(monthKey) && Number(count) > 0;
    },
  );
}

function matchesCurrentStatus(
  vulnerability: PackageVulnerability,
  currentStatus: PackageCurrentStatus,
) {
  return (
    (hasValue(vulnerability.osv_id) &&
      vulnerability.osv_id === currentStatus.osv_id) ||
    (hasValue(vulnerability.cve_id) &&
      vulnerability.cve_id === currentStatus.cve_id)
  );
}

function getStatusForVulnerability(
  vulnerability: PackageVulnerability,
  currentStatuses: PackageCurrentStatus[],
) {
  return currentStatuses.find((currentStatus) =>
    matchesCurrentStatus(vulnerability, currentStatus),
  );
}

function getFixedVersions(
  vulnerability: PackageVulnerability,
  currentStatus: PackageCurrentStatus,
) {
  return uniqueValues([
    ...(currentStatus.fixed_versions ?? []),
    ...(currentStatus.affected ?? []).map(
      (affectedPackage) => affectedPackage.fixed_version,
    ),
    ...(vulnerability.affected ?? []).map(
      (affectedPackage) => affectedPackage.fixed_version,
    ),
  ]);
}

function getVulnerableVersionDetails(
  vulnerability: PackageVulnerability,
  currentStatus: PackageCurrentStatus,
) {
  const affectedPackages = [
    ...(currentStatus.affected ?? []),
    ...(vulnerability.affected ?? []),
  ];

  return {
    introducedVersions: uniqueNonZeroValues(
      affectedPackages.map((affectedPackage) => affectedPackage.introduced_version),
    ),
    lastAffectedVersions: uniqueValues(
      affectedPackages.map(
        (affectedPackage) => affectedPackage.last_affected_version,
      ),
    ),
  };
}

function getVulnerabilitySeverity(
  vulnerability: PackageVulnerability,
  currentStatus: PackageCurrentStatus,
) {
  return hasValue(currentStatus.severity)
    ? currentStatus.severity
    : vulnerability.severity;
}

function getStatusTooltip(
  vulnerability: PackageVulnerability,
  currentStatus: PackageCurrentStatus,
  fixedVersions: string[],
): PackageStatusBadgeTooltip {
  const severity = getVulnerabilitySeverity(vulnerability, currentStatus);
  const vulnerableVersionDetails = getVulnerableVersionDetails(
    vulnerability,
    currentStatus,
  );
  const details: Array<[string, string]> = [
    ["Severity", hasValue(severity) ? severity : "Unknown"],
  ];

  if (vulnerableVersionDetails.introducedVersions.length > 0) {
    details.push([
      "Vulnerable since",
      vulnerableVersionDetails.introducedVersions.join(", "),
    ]);
  }

  if (vulnerableVersionDetails.lastAffectedVersions.length > 0) {
    details.push([
      "Last affected version",
      vulnerableVersionDetails.lastAffectedVersions.join(", "),
    ]);
  }

  details.push([
    "Fixed version",
    fixedVersions.length > 0 ? fixedVersions.join(", ") : "Not available",
  ]);

  return {
    title: "Vulnerability details",
    description: createElement(
      "div",
      null,
      details.map(([label, value]) =>
        createElement(
          "div",
          { key: label },
          createElement("strong", null, `${label}: `),
          value,
        ),
      ),
    ),
  };
}

export function getPackageStatus(
  document: PackageListDocument,
  referenceDate = new Date(),
): PackageStatusResult {
  if (Number.isNaN(referenceDate.getTime())) {
    return { status: PACKAGE_STATUS_BADGE_STATUS.UNKNOWN };
  }

  const relevantMonthKeys = getRelevantMonthKeys(referenceDate);
  const latestVulnerability = getLatestVulnerability(
    getRecentVulnerabilities(document, relevantMonthKeys),
  );

  if (!latestVulnerability) {
    if (hasRecentVulnerabilitiesCount(document, relevantMonthKeys)) {
      return { status: PACKAGE_STATUS_BADGE_STATUS.UNKNOWN };
    }

    if (
      document.vulnerabilities === undefined &&
      document.vulnerability_counts === undefined
    ) {
      return { status: PACKAGE_STATUS_BADGE_STATUS.UNKNOWN };
    }

    return { status: PACKAGE_STATUS_BADGE_STATUS.NO_VULNERABILITIES };
  }

  const currentStatus = getStatusForVulnerability(
    latestVulnerability.vulnerability,
    document.current_statuses ?? [],
  );

  if (!currentStatus) {
    return { status: PACKAGE_STATUS_BADGE_STATUS.UNKNOWN };
  }

  const fixedVersions = getFixedVersions(
    latestVulnerability.vulnerability,
    currentStatus,
  );

  if (fixedVersions.length === 0) {
    return {
      status: PACKAGE_STATUS_BADGE_STATUS.VULNERABLE,
      severity: getVulnerabilitySeverity(
        latestVulnerability.vulnerability,
        currentStatus,
      ),
      statusTooltip: getStatusTooltip(
        latestVulnerability.vulnerability,
        currentStatus,
        fixedVersions,
      ),
    };
  }

  return {
    status: PACKAGE_STATUS_BADGE_STATUS.VULNERABILITY_WITH_FIXES,
    severity: getVulnerabilitySeverity(
      latestVulnerability.vulnerability,
      currentStatus,
    ),
    statusTooltip: getStatusTooltip(
      latestVulnerability.vulnerability,
      currentStatus,
      fixedVersions,
    ),
  };
}

export function toPackageListItem(
  document: PackageListDocument,
): PackageListItemProps {
  const vulnerabilityCounts = document.vulnerability_counts ?? {};
  const packageStatus = getPackageStatus(document);

  return {
    packageName: document.name ?? "",
    href: `/packages/${document.ecosystem}/${document.slug}`,
    status: packageStatus.status,
    severity: packageStatus.severity,
    statusTooltip: packageStatus.statusTooltip,
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
