"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ChevronDownIcon from "@/assets/chevronDown.svg";
import ExternalLinkIcon from "@/assets/externalLink.svg";
import { SEVERITY_COLOR, SEVERITY_LABEL, SEVERITY_ORDER } from "../severityCard/severityCard.constants";
import { CopyButton } from "./CopyButton.client";
import {
  ALL_SEVERITIES,
  DEFAULT_SORT,
  PAGE_SIZE,
  SORT_LABEL,
  VULN_PAGE_PARAM,
  VULN_SEVERITY_PARAM,
  VULN_SORT_PARAM,
  pageSchema,
  severityFilterSchema,
  sortSchema,
} from "./VulnerabilitiesTable.constants";
import { VulnerabilitiesTableClientProps, VulnerabilityRow } from "./VulnerabilitiesTable.types";
import { getPageWindow, sortRows } from "./VulnerabilitiesTable.utils";
import styles from "./VulnerabilitiesTable.module.scss";

function SeverityText(props: { severity: VulnerabilityRow["severity"] }) {
  const { severity } = props;

  return (
    <span className={styles.vulnerabilitiesTable_severity} style={{ color: severity ? SEVERITY_COLOR[severity] : undefined }}>
      {severity ? SEVERITY_LABEL[severity] : "Unknown"}
    </span>
  );
}

const COLLAPSED_VERSIONS = 2;

function VersionList(props: { versions: readonly string[]; limit?: number }) {
  const { versions, limit = versions.length } = props;
  const hidden = versions.length - limit;

  return (
    <ul className={styles.vulnerabilitiesTable_versionList} aria-label="Affected versions">
      {versions.slice(0, limit).map((range) => (
        <li key={range}>
          <code className={styles.vulnerabilitiesTable_versions}>{range}</code>
        </li>
      ))}
      {hidden > 0 && <li className={styles.vulnerabilitiesTable_versionsMore}>+{hidden} more</li>}
    </ul>
  );
}

function SourceLink(props: { row: VulnerabilityRow }) {
  const { row } = props;

  return (
    <a className={styles.vulnerabilitiesTable_source} href={row.url} target="_blank" rel="noopener noreferrer">
      {row.source}
      <ExternalLinkIcon aria-hidden="true" />
      <span className={styles.vulnerabilitiesTable_srOnly}> (opens in a new tab)</span>
    </a>
  );
}

function IdCell(props: { id: string }) {
  return (
    <span className={styles.vulnerabilitiesTable_id}>
      <span>{props.id}</span>
      <CopyButton value={props.id} />
    </span>
  );
}

export function VulnerabilitiesTableClient(props: VulnerabilitiesTableClientProps) {
  const { rows, packageName } = props;
  const searchParams = useSearchParams();
  const titleId = React.useId();

  const availableSeverities = React.useMemo(
    () => SEVERITY_ORDER.filter((option) => rows.some((row) => row.severity === option)),
    [rows],
  );
  const requestedSeverity = severityFilterSchema.parse(searchParams.get(VULN_SEVERITY_PARAM) ?? ALL_SEVERITIES);
  // A severity from the URL that has no vulnerabilities falls back to "all".
  const severity = availableSeverities.includes(requestedSeverity as never) ? requestedSeverity : ALL_SEVERITIES;
  const sort = sortSchema.parse(searchParams.get(VULN_SORT_PARAM) ?? DEFAULT_SORT);
  const requestedPage = pageSchema.parse(searchParams.get(VULN_PAGE_PARAM) ?? 1);

  const filtered = React.useMemo(
    () => sortRows(severity === ALL_SEVERITIES ? rows : rows.filter((row) => row.severity === severity), sort),
    [rows, severity, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const firstIndex = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(firstIndex, firstIndex + PAGE_SIZE);

  // History API only: the data is already on the client, so no server round trip is needed.
  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(window.location.search);

    Object.entries(changes).forEach(([key, value]) => (value === null ? next.delete(key) : next.set(key, value)));

    const query = next.toString();

    window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
  };

  const handleSeverityChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    updateParams({
      [VULN_SEVERITY_PARAM]: event.target.value === ALL_SEVERITIES ? null : event.target.value,
      [VULN_PAGE_PARAM]: null,
    });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    updateParams({
      [VULN_SORT_PARAM]: event.target.value === DEFAULT_SORT ? null : event.target.value,
      [VULN_PAGE_PARAM]: null,
    });

  const goToPage = (nextPage: number) => updateParams({ [VULN_PAGE_PARAM]: nextPage === 1 ? null : String(nextPage) });

  return (
    <section className={styles.vulnerabilitiesTable} aria-labelledby={titleId}>
      <header className={styles.vulnerabilitiesTable_header}>
        <div>
          <h2 id={titleId} className={styles.vulnerabilitiesTable_title}>
            Vulnerabilities <span>({rows.length})</span>
          </h2>

          <p className={styles.vulnerabilitiesTable_subtitle}>
            Known vulnerabilities affecting <strong>{packageName}</strong>, based on data from OSV.
          </p>
        </div>

        <div className={styles.vulnerabilitiesTable_controls}>
          <label className={styles.vulnerabilitiesTable_field}>
            <span className={styles.vulnerabilitiesTable_srOnly}>Filter by severity</span>
            <select value={severity} onChange={handleSeverityChange}>
              <option value={ALL_SEVERITIES}>All severities</option>
              {availableSeverities.map((option) => (
                <option key={option} value={option}>
                  {SEVERITY_LABEL[option]}
                </option>
              ))}
            </select>
            <ChevronDownIcon aria-hidden="true" />
          </label>

          <label className={styles.vulnerabilitiesTable_field}>
            <span className={styles.vulnerabilitiesTable_srOnly}>Sort by</span>
            <select value={sort} onChange={handleSortChange}>
              {Object.entries(SORT_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  Sort by: {label}
                </option>
              ))}
            </select>
            <ChevronDownIcon aria-hidden="true" />
          </label>
        </div>
      </header>

      {visible.length === 0 ? (
        <p className={styles.vulnerabilitiesTable_empty} role="status">
          {rows.length === 0 ? "No known vulnerabilities for this period." : "No vulnerabilities match the selected severity."}
        </p>
      ) : (
        <>
          <div className={styles.vulnerabilitiesTable_tableWrapper}>
            <table className={styles.vulnerabilitiesTable_table}>
              <caption className={styles.vulnerabilitiesTable_srOnly}>Vulnerabilities affecting {packageName}</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Severity</th>
                  <th scope="col">Summary</th>
                  <th scope="col">Affected versions</th>
                  <th scope="col">Published</th>
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row, index) => (
                  <tr key={row.id} style={{ "--index": index } as React.CSSProperties}>
                    <td>
                      <IdCell id={row.id} />
                    </td>
                    <td>
                      <SeverityText severity={row.severity} />
                    </td>
                    <td>
                      <span className={styles.vulnerabilitiesTable_summary}>{row.summary}</span>
                      {row.description && <span className={styles.vulnerabilitiesTable_description}>{row.description}</span>}
                    </td>
                    <td>
                      <VersionList versions={row.versions} />
                    </td>
                    <td>
                      <time dateTime={row.publishedAt}>{row.publishedAt || "—"}</time>
                    </td>
                    <td>
                      <SourceLink row={row} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className={styles.vulnerabilitiesTable_list}>
            {visible.map((row, index) => (
              <li key={row.id} style={{ "--index": index } as React.CSSProperties}>
                <details className={styles.vulnerabilitiesTable_card}>
                  <summary>
                    <div className={styles.vulnerabilitiesTable_cardMain}>
                      <div className={styles.vulnerabilitiesTable_cardHeader}>
                        <IdCell id={row.id} />
                        <SeverityText severity={row.severity} />
                      </div>

                      <span className={styles.vulnerabilitiesTable_cardSummary}>{row.summary}</span>

                      <VersionList versions={row.versions} limit={COLLAPSED_VERSIONS} />

                      <div className={styles.vulnerabilitiesTable_cardMeta}>
                        <time dateTime={row.publishedAt}>{row.publishedAt || "—"}</time>
                        <SourceLink row={row} />
                      </div>
                    </div>

                    <ChevronDownIcon className={styles.vulnerabilitiesTable_chevron} aria-hidden="true" />
                  </summary>

                  <div className={styles.vulnerabilitiesTable_cardDetails}>
                    {row.versions.length > COLLAPSED_VERSIONS && (
                      <div>
                        <strong>Affected versions:</strong>
                        <VersionList versions={row.versions} />
                      </div>
                    )}
                    {row.description && <p>{row.description}</p>}
                    {row.cve && (
                      <p>
                        <strong>CVE:</strong> {row.cve}
                      </p>
                    )}
                    {row.cvss !== null && (
                      <p>
                        <strong>CVSS:</strong> {row.cvss}
                      </p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </>
      )}

      <footer className={styles.vulnerabilitiesTable_footer}>
        <p role="status">
          {filtered.length === 0
            ? "Showing 0 vulnerabilities"
            : `Showing ${firstIndex + 1}-${firstIndex + visible.length} of ${filtered.length} vulnerabilities`}
        </p>

        {totalPages > 1 && (
          <nav aria-label="Vulnerabilities pagination">
            <ul className={styles.vulnerabilitiesTable_pagination}>
              <li>
                <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => goToPage(page - 1)}>
                  ‹
                </button>
              </li>

              {getPageWindow(page, totalPages).map((value) => (
                <li key={value}>
                  <button
                    type="button"
                    aria-label={`Page ${value}`}
                    aria-current={value === page ? "page" : undefined}
                    onClick={() => goToPage(value)}
                  >
                    {value}
                  </button>
                </li>
              ))}

              <li>
                <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => goToPage(page + 1)}>
                  ›
                </button>
              </li>
            </ul>
          </nav>
        )}
      </footer>
    </section>
  );
}
