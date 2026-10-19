import { Severity } from "../severityCard/severityCard.types";

export interface VulnerabilityRow {
  id: string;
  severity: Severity | null;
  summary: string;
  description: string;
  /** Affected ranges, one entry per range, e.g. `>= 1.0.0, < 1.1.12`. */
  versions: string[];
  /** ISO date (`YYYY-MM-DD`) or empty string when unknown. */
  publishedAt: string;
  source: "OSV" | "GitHub";
  url: string;
  cve: string;
  cvss: number | null;
}

export interface RawVulnerability {
  osv_id?: string;
  cve_id?: string;
  severity?: string;
  summary?: string;
  description?: string;
  published_at?: string;
  cvss_score?: number;
  affected?: {
    introduced_version?: string;
    fixed_version?: string;
    last_affected_version?: string;
  }[];
}

export interface VulnerabilitiesTableProps {
  /** Vulnerabilities grouped by month, as returned by the package details API. */
  vulnerabilities: Record<string, RawVulnerability[]>;
  packageName: string;
}

export interface VulnerabilitiesTableClientProps {
  rows: readonly VulnerabilityRow[];
  packageName: string;
}
