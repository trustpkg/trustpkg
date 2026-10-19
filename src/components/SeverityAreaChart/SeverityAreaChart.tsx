import React from "react";
import { SEVERITY_COLOR, SEVERITY_LABEL, SEVERITY_ORDER } from "../severityCard/severityCard.constants";
import { SeverityAreaChartProps } from "./SeverityAreaChart.types";
import { formatMonth, getGeometry, getTotal } from "./SeverityAreaChart.utils";
import { SeverityAreaChartGraph } from "./SeverityAreaChartGraph.client";
import styles from "./SeverityAreaChart.module.scss";

export function SeverityAreaChart(props: SeverityAreaChartProps) {
  const { data, visibleSeverities = SEVERITY_ORDER, title = "Monthly breakdown" } = props;

  const shown = SEVERITY_ORDER.filter((severity) => visibleSeverities.includes(severity));
  const rows = [...data].reverse();

  return (
    <section className={styles.severityAreaChart} aria-labelledby="severity-area-title">
      <h2 id="severity-area-title" className={styles.severityAreaChart_title}>
        {title}
      </h2>

      {data.length > 1 && shown.length > 0 && (
        <div className={styles.severityAreaChart_desktop}>
          <ul className={styles.severityAreaChart_legend} aria-label="Legend">
            {shown.map((severity) => (
              <li key={severity}>
                <span className={styles.severityAreaChart_marker} style={{ backgroundColor: SEVERITY_COLOR[severity] }} aria-hidden="true" />
                {SEVERITY_LABEL[severity]}
              </li>
            ))}
          </ul>

          <SeverityAreaChartGraph geometry={getGeometry(data, shown)} animationKey={shown.join("-")} label={title} />
        </div>
      )}

      <ul className={styles.severityAreaChart_list}>
        {rows.map((point, index) => (
          <li key={point.month} className={styles.severityAreaChart_row} style={{ "--index": index } as React.CSSProperties}>
            <div className={styles.severityAreaChart_rowHeader}>
              <time dateTime={point.month}>{formatMonth(point.month)}</time>
              <strong>
                {getTotal(point.counts)}
                <span className={styles.severityAreaChart_srOnly}> vulnerabilities</span>
              </strong>
            </div>

            <div className={styles.severityAreaChart_bar} aria-hidden="true">
              {SEVERITY_ORDER.map((severity) => {
                const count = point.counts[severity] ?? 0;

                return count > 0 ? <span key={severity} style={{ flexGrow: count, backgroundColor: SEVERITY_COLOR[severity] }} /> : null;
              })}
            </div>

            <ul className={styles.severityAreaChart_counts}>
              {SEVERITY_ORDER.map((severity) => (
                <li key={severity} style={{ color: SEVERITY_COLOR[severity] }}>
                  <span className={styles.severityAreaChart_srOnly}>{SEVERITY_LABEL[severity]}: </span>
                  {point.counts[severity] ?? 0}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
