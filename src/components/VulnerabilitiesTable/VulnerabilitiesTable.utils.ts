import { SEVERITY, SEVERITY_ORDER } from "../severityCard/severityCard.constants";
import { Severity } from "../severityCard/severityCard.types";
import { SORT } from "./VulnerabilitiesTable.constants";
import { RawVulnerability, VulnerabilityRow } from "./VulnerabilitiesTable.types";

const DESCRIPTION_LIMIT = 600;
const NO_LOWER_BOUND = new Set(["", "0"]);

function getSeverity(value?: string): Severity | null {
  const key = value?.toUpperCase();

  return key && key in SEVERITY ? (key as Severity) : null;
}

function getVersions(affected: RawVulnerability["affected"]): string[] {
  const ranges = (affected ?? []).map(({ introduced_version = "", fixed_version, last_affected_version }) => {
    const parts = [
      NO_LOWER_BOUND.has(introduced_version) ? null : `>= ${introduced_version}`,
      fixed_version ? `< ${fixed_version}` : last_affected_version ? `<= ${last_affected_version}` : null,
    ].filter(Boolean);

    return parts.length ? parts.join(", ") : "all";
  });

  const unique = [...new Set(ranges)];

  return unique.length ? unique : ["unknown"];
}

function getSource(id: string): Pick<VulnerabilityRow, "source" | "url"> {
  return id.startsWith("GHSA-")
    ? { source: "GitHub", url: `https://github.com/advisories/${encodeURIComponent(id)}` }
    : { source: "OSV", url: `https://osv.dev/vulnerability/${encodeURIComponent(id)}` };
}

export function toRows(vulnerabilities: Record<string, RawVulnerability[]>): VulnerabilityRow[] {
  return Object.values(vulnerabilities)
    .flat()
    .flatMap((vulnerability) => {
      const id = vulnerability.osv_id || vulnerability.cve_id;

      if (!id) {
        return [];
      }

      return {
        id,
        severity: getSeverity(vulnerability.severity),
        summary: vulnerability.summary?.trim() || "No summary available",
        description: (vulnerability.description ?? "").trim().slice(0, DESCRIPTION_LIMIT),
        versions: getVersions(vulnerability.affected),
        publishedAt: vulnerability.published_at?.slice(0, 10) ?? "",
        cve: vulnerability.cve_id ?? "",
        cvss: vulnerability.cvss_score ?? null,
        ...getSource(id),
      };
    });
}

const severityRank = (severity: Severity | null) => (severity ? SEVERITY_ORDER.indexOf(severity) : SEVERITY_ORDER.length);

export function sortRows(rows: readonly VulnerabilityRow[], sort: string): VulnerabilityRow[] {
  const byDate = (a: VulnerabilityRow, b: VulnerabilityRow) => b.publishedAt.localeCompare(a.publishedAt);

  return [...rows].sort((a, b) => {
    switch (sort) {
      case SORT.DATE_ASC:
        return -byDate(a, b);
      case SORT.SEVERITY_DESC:
        return severityRank(a.severity) - severityRank(b.severity) || byDate(a, b);
      case SORT.SEVERITY_ASC:
        return severityRank(b.severity) - severityRank(a.severity) || byDate(a, b);
      default:
        return byDate(a, b);
    }
  });
}

export function getPageWindow(page: number, totalPages: number, size = 5): number[] {
  const start = Math.max(1, Math.min(page - Math.floor(size / 2), totalPages - size + 1));

  return Array.from({ length: Math.min(size, totalPages) }, (_, index) => start + index);
}
