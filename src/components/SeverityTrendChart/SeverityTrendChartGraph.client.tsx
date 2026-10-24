"use client";

import React from "react";
import { SEVERITY_COLOR, SEVERITY_LABEL } from "../severityCard/severityCard.constants";
import { SeverityTrendGeometry } from "./SeverityTrendChart.types";
import { CHART_HEIGHT, CHART_WIDTH, PADDING } from "./SeverityTrendChart.utils";
import styles from "./SeverityTrendChart.module.scss";

interface SeverityTrendChartGraphProps {
  geometry: SeverityTrendGeometry;
  animationKey: string;
}

export function SeverityTrendChartGraph(props: SeverityTrendChartGraphProps) {
  const { geometry, animationKey } = props;
  const { layers, columns, yTicks, xTicks } = geometry;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handlePointerMove = (event: React.PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * (CHART_WIDTH - PADDING.left - PADDING.right) + PADDING.left;
    const nearest = columns.reduce(
      (best, column, index) => (Math.abs(column.x - x) < Math.abs(columns[best].x - x) ? index : best),
      0,
    );

    setActiveIndex(nearest);
  };

  const activeColumn = activeIndex === null ? null : columns[activeIndex];
  const activeLeft = activeColumn ? (activeColumn.x / CHART_WIDTH) * 100 : 0;

  return (
    <div className={styles.severityTrendChart_graph}>
      <svg
        className={styles.severityTrendChart_svg}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        aria-hidden="true"
        focusable="false"
      >
        {yTicks.map((tick) => (
          <g key={tick.value}>
            <line className={styles.severityTrendChart_grid} x1={PADDING.left} x2={CHART_WIDTH - PADDING.right} y1={tick.y} y2={tick.y} />
            <text className={styles.severityTrendChart_tick} x={PADDING.left - 8} y={tick.y} textAnchor="end" dominantBaseline="middle">
              {Math.round(tick.value)}
            </text>
          </g>
        ))}

        {xTicks.map((tick) => (
          <text key={tick.label} className={styles.severityTrendChart_tick} x={tick.x} y={CHART_HEIGHT - 8} textAnchor="middle">
            {tick.label}
          </text>
        ))}

        <g key={animationKey} className={styles.severityTrendChart_layers}>
          {layers.map((layer) => (
            <path key={layer.severity} d={layer.path} fill={SEVERITY_COLOR[layer.severity]} fillOpacity={0.55} stroke={SEVERITY_COLOR[layer.severity]} strokeWidth={1.5} />
          ))}
        </g>

        {activeColumn && (
          <line className={styles.severityTrendChart_cursor} x1={activeColumn.x} x2={activeColumn.x} y1={PADDING.top} y2={CHART_HEIGHT - PADDING.bottom} />
        )}

        <rect
          x={PADDING.left}
          y={PADDING.top}
          width={CHART_WIDTH - PADDING.left - PADDING.right}
          height={CHART_HEIGHT - PADDING.top - PADDING.bottom}
          fill="transparent"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setActiveIndex(null)}
        />
      </svg>

      {activeColumn && (
        <div
          className={styles.severityTrendChart_tooltip}
          data-flip={activeLeft > 60}
          style={{ left: `${activeLeft}%` }}
          aria-hidden="true"
        >
          <strong>{activeColumn.label}</strong>

          <ul className={styles.severityTrendChart_tooltipList}>
            {activeColumn.rows.map((row) => (
              <li key={row.severity}>
                <span className={styles.severityTrendChart_marker} style={{ backgroundColor: SEVERITY_COLOR[row.severity] }} />
                <span>{SEVERITY_LABEL[row.severity]}</span>
                <span>{row.count}</span>
              </li>
            ))}
          </ul>

          <div className={styles.severityTrendChart_tooltipTotal}>
            <span>Total</span>
            <span>{activeColumn.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
