"use client";

import React from "react";
import {
  drawCanvasChart,
  resolveCanvasColors,
  type CanvasBarChartDataPoint,
} from "../../../CanvasBarChart/CanvasBarChart";
import Hidden from "../../../Hidden";
import styles from "../../PackageList.module.scss";
import { PACKAGE_LIST_CHART_COLORS } from "./PackageListChart.colors";
import type { PackageListChartProps } from "./PackageListChart";

const COMPACT_CHART_HEIGHT = 56;
const COMPACT_CHART_GEOMETRY = {
  horizontalInset: 4,
  axisY: 45,
  top: 4,
};

export function PackageListCompactChart(props: PackageListChartProps) {
  const { packageName, chartData } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = React.useState(0);

  const data = React.useMemo<CanvasBarChartDataPoint[]>(
    () =>
      chartData.map(({ month, vulnerabilitiesOccurrences }) => ({
        label: month,
        value: vulnerabilitiesOccurrences,
      })),
    [chartData],
  );
  const chartId = `package-list-item-${encodeURIComponent(packageName)}-compact-chart`;
  const accessibleDataId = `${chartId}-data`;

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const updateWidth = () => {
      setWidth(Math.max(1, Math.floor(root.getBoundingClientRect().width)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || width <= 0) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(width * devicePixelRatio));
    canvas.height = Math.round(COMPACT_CHART_HEIGHT * devicePixelRatio);

    let animationFrame = 0;
    const animationStart = performance.now();
    const animationDuration = 520;
    const staggerDuration = 180;
    const progressRef = { current: data.map(() => 0) };

    const draw = (progress: readonly number[]) => {
      drawCanvasChart(
        canvas,
        data,
        width,
        COMPACT_CHART_HEIGHT,
        resolveCanvasColors(canvas, PACKAGE_LIST_CHART_COLORS),
        COMPACT_CHART_GEOMETRY,
        null,
        progress,
        false,
      );
    };

    const drawFrame = (timestamp: number) => {
      const elapsed = timestamp - animationStart;
      const progress = data.map((_, index) => {
        const delay =
          data.length > 1
            ? (index / (data.length - 1)) * staggerDuration
            : 0;
        const linearProgress = Math.min(
          1,
          Math.max(0, (elapsed - delay) / animationDuration),
        );

        return 1 - (1 - linearProgress) ** 3;
      });

      progressRef.current = progress;
      draw(progress);

      if (progress.some((value) => value < 1)) {
        animationFrame = requestAnimationFrame(drawFrame);
      }
    };

    animationFrame = requestAnimationFrame(drawFrame);

    const themeObserver = new MutationObserver(() => {
      draw(progressRef.current);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      themeObserver.disconnect();
    };
  }, [data, width]);

  return (
    <div ref={rootRef} className={styles.packageList_compactChart}>
      <canvas
        ref={canvasRef}
        className={styles.packageList_compactChart_canvas}
        width={Math.max(1, width)}
        height={COMPACT_CHART_HEIGHT}
        role="img"
        aria-label={`Vulnerability occurrences trend for ${packageName}`}
        aria-describedby={accessibleDataId}
        onClick={(event) => event.stopPropagation()}
      />

      <Hidden>
        <span id={accessibleDataId}>
          {data
            .map(({ label, value }) => `${label}: ${value}`)
            .join(", ")}
        </span>
      </Hidden>
    </div>
  );
}
