"use client";

import React from "react";
import { SEVERITY_COLOR, SEVERITY_LABEL } from "../severityCard/severityCard.constants";
import { SeverityAreaGeometry } from "./SeverityAreaChart.types";
import { CHART_HEIGHT, CHART_WIDTH, PADDING } from "./SeverityAreaChart.utils";
import styles from "./SeverityAreaChart.module.scss";

interface SeverityAreaChartGraphProps {
  geometry: SeverityAreaGeometry;
  animationKey: string;
  label: string;
}

const INNER_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;

export function SeverityAreaChartGraph(props: SeverityAreaChartGraphProps) {
  const { geometry, animationKey, label } = props;
  const { layers, columns, yTicks, xTicks } = geometry;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * CHART_WIDTH;
    const ratio = Math.min(1, Math.max(0, (x - PADDING.left) / INNER_WIDTH));

    setActiveIndex(Math.round(ratio * (columns.length - 1)));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = columns.length - 1;
    const next: Record<string, number> = {
      ArrowRight: Math.min(last, (activeIndex ?? -1) + 1),
      ArrowLeft: Math.max(0, (activeIndex ?? 1) - 1),
      Home: 0,
      End: last,
    };

    if (event.key in next) {
      event.preventDefault();
      setActiveIndex(next[event.key]);
    } else if (event.key === "Escape") {
      setActiveIndex(null);
    }
  };

  const active = activeIndex === null ? null : columns[activeIndex];
  const left = active ? (active.x / CHART_WIDTH) * 100 : 0;

  return (
    <div
      className={styles.severityAreaChart_graph}
      role="group"
      tabIndex={0}
      aria-label={`${label}. Use left and right arrow keys to inspect months.`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActiveIndex(null)}
      onKeyDown={handleKeyDown}
      onBlur={() => setActiveIndex(null)}
    >
      <svg className={styles.severityAreaChart_svg} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} aria-hidden="true" focusable="false">
        {yTicks.map((tick) => (
          <g key={tick.value}>
            <line className={styles.severityAreaChart_grid} x1={PADDING.left} x2={CHART_WIDTH - PADDING.right} y1={tick.y} y2={tick.y} />
            <text className={styles.severityAreaChart_tick} x={PADDING.left - 8} y={tick.y} textAnchor="end" dominantBaseline="middle">
              {Math.round(tick.value)}
            </text>
          </g>
        ))}

        {xTicks.map((tick) => (
          <text key={tick.label} className={styles.severityAreaChart_tick} x={tick.x} y={CHART_HEIGHT - 8} textAnchor="middle">
            {tick.label}
          </text>
        ))}

        <g key={animationKey} className={styles.severityAreaChart_layers}>
          {layers.map((layer) => (
            <g key={layer.severity}>
              <path d={layer.path} fill={SEVERITY_COLOR[layer.severity]} fillOpacity={0.5} />
              <path d={layer.line} fill="none" stroke={SEVERITY_COLOR[layer.severity]} strokeWidth={1.5} />
            </g>
          ))}
        </g>

        {active && (
          <line className={styles.severityAreaChart_cursor} x1={active.x} x2={active.x} y1={PADDING.top} y2={CHART_HEIGHT - PADDING.bottom} />
        )}
      </svg>

      {active && (
        <div className={styles.severityAreaChart_tooltip} data-flip={left > 60} style={{ left: `${left}%` }} role="status">
          <strong>{active.label}</strong>

          <ul className={styles.severityAreaChart_tooltipList}>
            {active.rows.map((row) => (
              <li key={row.severity}>
                <span className={styles.severityAreaChart_marker} style={{ backgroundColor: SEVERITY_COLOR[row.severity] }} aria-hidden="true" />
                <span>{SEVERITY_LABEL[row.severity]}</span>
                <span>{row.count}</span>
              </li>
            ))}
          </ul>

          <div className={styles.severityAreaChart_tooltipTotal}>
            <span>Total</span>
            <span>{active.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
