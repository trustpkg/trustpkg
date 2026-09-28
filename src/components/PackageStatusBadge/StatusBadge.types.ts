import { ValueOf } from "@/types/valueOf";
import type { ReactNode } from "react";

export const PACKAGE_STATUS_BADGE_STATUS = {
  NO_VULNERABILITIES: "no-vulnerabilities",
  VULNERABLE: "vulnerable",
  UNKNOWN: "unknown",
  VULNERABILITY_WITH_FIXES: "vulnerability-with-fixes",
} as const;

export type PackageStatusBadgeStatus = ValueOf<
  typeof PACKAGE_STATUS_BADGE_STATUS
>;
export interface PackageStatusBadgeTooltip {
  title: ReactNode;
  description?: ReactNode;
}

export interface PackageStatusBadgeProps {
  status: ValueOf<typeof PACKAGE_STATUS_BADGE_STATUS>;
  tooltip?: PackageStatusBadgeTooltip;
}
