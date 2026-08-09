import { ValueOf } from "@/types/valueOf";

export const PACKAGE_STATUS_BADGE_STATUS = {
  NO_VULNERABILITIES: "no-vulnerabilities",
  VULNERABLE: "vulnerable",
  UNKNOWN: "unknown",
  RECENTLY_VULNERABLE: "recently-vulnerable",
} as const;

export type PackageStatusBadgeStatus = ValueOf<
  typeof PACKAGE_STATUS_BADGE_STATUS
>;
interface PackageStatusBadgeTooltip {
  title: string;
  description?: string;
}

export interface PackageStatusBadgeProps {
  status: ValueOf<typeof PACKAGE_STATUS_BADGE_STATUS>;
  tooltip?: PackageStatusBadgeTooltip;
}
