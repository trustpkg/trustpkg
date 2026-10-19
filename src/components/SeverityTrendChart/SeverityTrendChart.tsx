import React from "react";
import { Base } from "@/components/Base/Base";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { SEVERITY_COLOR, SEVERITY_LABEL, SEVERITY_ORDER } from "../severityCard/severityCard.constants";
import { SeverityTrendChartProps } from "./SeverityTrendChart.types";
import { formatMonth, getPointTotal, getSeverityTrendGeometry } from "./SeverityTrendChart.utils";
import { SeverityTrendChartGraph } from "./SeverityTrendChartGraph.client";
import styles from "./SeverityTrendChart.module.scss";

export function SeverityTrendChart(props: SeverityTrendChartProps) {
  const { data, visibleSeverities = SEVERITY_ORDER, title = "Monthly breakdown" } = props;

  const shownSeverities = SEVERITY_ORDER.filter((severity) => visibleSeverities.includes(severity));
  const geometry = getSeverityTrendGeometry(data, shownSeverities);
  const rows = [...data].reverse();

  return (
    <section className={styles.severityTrendChart} aria-labelledby="severity-trend-title">
      <Base as="h2" id="severity-trend-title" fontSize={pxToRem(18)} fontWeight={700} color={colors.text.primary}>
        {title}
      </Base>

      {data.length > 1 && (
        <div className={styles.severityTrendChart_desktop}>
          <ul className={styles.severityTrendChart_legend} aria-hidden="true">
            {shownSeverities.map((severity) => (
              <li key={severity}>
                <span className={styles.severityTrendChart_marker} style={{ backgroundColor: SEVERITY_COLOR[severity] }} />
                {SEVERITY_LABEL[severity]}
              </li>
            ))}
          </ul>

          <SeverityTrendChartGraph geometry={geometry} animationKey={shownSeverities.join("-")} />
        </div>
      )}

      <ul className={styles.severityTrendChart_list}>
        {rows.map((point, index) => {
          const total = getPointTotal(point);

          return (
            <li key={point.month} className={styles.severityTrendChart_row} style={{ "--index": index } as React.CSSProperties}>
              <div className={styles.severityTrendChart_rowHeader}>
                <time dateTime={point.month}>{formatMonth(point.month)}</time>
                <strong>{total}<span className={styles.severityTrendChart_srOnly}> vulnerabilities</span></strong>
              </div>

              <div className={styles.severityTrendChart_bar} aria-hidden="true">
                {SEVERITY_ORDER.map((severity) => {
                  const count = point.counts[severity] ?? 0;

                  return count > 0 ? (
                    <span key={severity} style={{ flexGrow: count, backgroundColor: SEVERITY_COLOR[severity] }} />
                  ) : null;
                })}
              </div>

              <ul className={styles.severityTrendChart_counts}>
                {SEVERITY_ORDER.map((severity) => (
                  <li key={severity} style={{ color: SEVERITY_COLOR[severity] }}>
                    <span className={styles.severityTrendChart_srOnly}>{SEVERITY_LABEL[severity]}: </span>
                    {point.counts[severity] ?? 0}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
