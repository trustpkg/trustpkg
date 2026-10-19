import React from "react";
import { Base } from "@/components/Base/Base";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { SEVERITY_COLOR, SEVERITY_LABEL } from "../severityCard/severityCard.constants";
import { Severity } from "../severityCard/severityCard.types";
import { SeverityDistributionChartProps } from "./SeverityDistributionChart.types";
import styles from "./SeverityDistributionChart.module.scss";

const CHART_SIZE = 120;
const STROKE_WIDTH = 22;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;

const colorBySeverity = SEVERITY_COLOR;

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

export function SeverityDistributionChart(props: SeverityDistributionChartProps) {
  const { items, title = "Severity distribution", periodLabel } = props;
  const titleId = React.useId();

  const total = items.reduce((sum, item) => sum + Math.max(0, item.count), 0);

  const segments = items.reduce<{ offset: number; entries: { severity: Severity; count: number; percentage: number; offset: number }[] }>(
    (accumulator, item) => {
      const count = Math.max(0, item.count);
      const percentage = total ? (count / total) * 100 : 0;

      accumulator.entries.push({ severity: item.severity, count, percentage, offset: accumulator.offset });
      accumulator.offset += percentage;

      return accumulator;
    },
    { offset: 0, entries: [] },
  ).entries;

  return (
    <figure className={styles.severityDistributionChart} aria-labelledby={titleId}>
      <Base as="figcaption" id={titleId} fontSize={pxToRem(18)} fontWeight={700} color={colors.text.primary}>
        {title}{periodLabel ? ` (${periodLabel})` : ""}
      </Base>

      <div className={styles.severityDistributionChart_content}>
        <div className={styles.severityDistributionChart_chart}>
          <svg
            className={styles.severityDistributionChart_svg}
            viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={colors.border.primary}
              strokeWidth={STROKE_WIDTH}
            />

            {segments
              .filter((segment) => segment.count > 0)
              .map((segment) => (
                <circle
                  key={segment.severity}
                  cx={CHART_SIZE / 2}
                  cy={CHART_SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={colorBySeverity[segment.severity]}
                  strokeWidth={STROKE_WIDTH}
                  pathLength={100}
                  strokeDasharray={`${segment.percentage} ${100 - segment.percentage}`}
                  strokeDashoffset={-segment.offset}
                  transform={`rotate(-90 ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}
                />
              ))}
          </svg>

          <div className={styles.severityDistributionChart_total}>
            <Base as="span" fontSize={pxToRem(24)} fontWeight={700} color={colors.text.primary}>
              {total}
            </Base>

            <Base as="span" fontSize={pxToRem(12)} color={colors.text.tertiary}>
              {total === 1 ? "vulnerability" : "vulnerabilities"}
            </Base>
          </div>
        </div>

        <ul className={styles.severityDistributionChart_legend} aria-label="Vulnerabilities by severity">
          {segments.map((segment) => (
            <li key={segment.severity} className={styles.severityDistributionChart_legendItem}>
              <span
                className={styles.severityDistributionChart_marker}
                style={{ backgroundColor: colorBySeverity[segment.severity] }}
                aria-hidden="true"
              />

              <Base as="span" color={colors.text.primary}>
                {SEVERITY_LABEL[segment.severity]}
              </Base>

              <Base as="span" color={colors.text.tertiary} whiteSpace="nowrap">
                {segment.count} ({formatPercentage(segment.percentage)})
              </Base>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
