import { z } from "zod";
import { SEVERITY } from "../severityCard/severityCard.constants";

// Namespaced keys so they never collide with `page`, `limit` (package list) or `months` (vulnerabilities filter).
export const VULN_PAGE_PARAM = "vulnPage";
export const VULN_SEVERITY_PARAM = "vulnSeverity";
export const VULN_SORT_PARAM = "vulnSort";

export const PAGE_SIZE = 10;

export const ALL_SEVERITIES = "all";

export const SORT = {
  DATE_DESC: "date-desc",
  DATE_ASC: "date-asc",
  SEVERITY_DESC: "severity-desc",
  SEVERITY_ASC: "severity-asc",
} as const;

export const DEFAULT_SORT = SORT.DATE_DESC;

export const SORT_LABEL = {
  [SORT.DATE_DESC]: "Date (newest)",
  [SORT.DATE_ASC]: "Date (oldest)",
  [SORT.SEVERITY_DESC]: "Severity (highest)",
  [SORT.SEVERITY_ASC]: "Severity (lowest)",
} as const;

export const pageSchema = z.coerce.number().int().min(1).catch(1);
export const severityFilterSchema = z
  .union([z.literal(ALL_SEVERITIES), z.enum(Object.values(SEVERITY) as [string, ...string[]])])
  .catch(ALL_SEVERITIES);
export const sortSchema = z.enum(Object.values(SORT) as [string, ...string[]]).catch(DEFAULT_SORT);
