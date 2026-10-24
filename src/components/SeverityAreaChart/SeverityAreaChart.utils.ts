import { SEVERITY_ORDER } from "../severityCard/severityCard.constants";
import { Severity } from "../severityCard/severityCard.types";
import { SeverityAreaChartPoint, SeverityAreaGeometry } from "./SeverityAreaChart.types";

export const CHART_WIDTH = 800;
export const CHART_HEIGHT = 300;
export const PADDING = { top: 16, right: 24, bottom: 32, left: 40 } as const;
const MAX_X_TICKS = 8;
const Y_TICK_COUNT = 4;

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export function formatMonth(month: string): string {
  const [year, monthIndex] = month.split("-").map(Number);

  return monthFormatter.format(new Date(Date.UTC(year, monthIndex - 1, 1)));
}

export function getTotal(counts: SeverityAreaChartPoint["counts"], severities: readonly Severity[] = SEVERITY_ORDER) {
  return severities.reduce((sum, severity) => sum + (counts[severity] ?? 0), 0);
}

function getNiceMax(value: number): number {
  if (value <= 4) {
    return 4;
  }

  const rough = value / Y_TICK_COUNT;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 5, 10].map((multiplier) => multiplier * magnitude).find((candidate) => candidate >= rough) ?? rough;

  return step * Y_TICK_COUNT;
}

type Point = readonly [number, number];

function curve(points: readonly Point[]): string {
  return points
    .map(([x, y], index) => {
      if (index === 0) {
        return `M${x},${y}`;
      }

      const [previousX, previousY] = points[index - 1];
      const middle = (previousX + x) / 2;

      return `C${middle},${previousY} ${middle},${y} ${x},${y}`;
    })
    .join("");
}

export function getGeometry(
  data: readonly SeverityAreaChartPoint[],
  visibleSeverities: readonly Severity[],
): SeverityAreaGeometry {
  const stack = SEVERITY_ORDER.filter((severity) => visibleSeverities.includes(severity));
  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const baseline = PADDING.top + innerHeight;

  const totals = data.map((point) => getTotal(point.counts, stack));
  const maximum = getNiceMax(Math.max(0, ...totals));

  const getX = (index: number) =>
    data.length === 1 ? PADDING.left + innerWidth / 2 : PADDING.left + (innerWidth * index) / (data.length - 1);
  const getY = (value: number) => baseline - (value / maximum) * innerHeight;

  const cumulative = data.map(() => 0);

  const layers = stack.map((severity) => {
    const lower = data.map((_, index) => [getX(index), getY(cumulative[index])] as Point);

    data.forEach((point, index) => {
      cumulative[index] += point.counts[severity] ?? 0;
    });

    const upper = data.map((_, index) => [getX(index), getY(cumulative[index])] as Point);
    const line = curve(upper);
    const back = curve([...lower].reverse()).replace(/^M[^C]*/, "");
    const [lastX, lastY] = lower[lower.length - 1];

    return { severity, line, path: `${line}L${lastX},${lastY}${back}Z` };
  });

  const tickStep = Math.ceil(data.length / MAX_X_TICKS);
  const columns = data.map((point, index) => ({
    label: formatMonth(point.month),
    x: getX(index),
    total: totals[index],
    rows: stack.map((severity) => ({ severity, count: point.counts[severity] ?? 0 })),
  }));

  return {
    layers,
    columns,
    yTicks: Array.from({ length: Y_TICK_COUNT + 1 }, (_, index) => {
      const value = (maximum / Y_TICK_COUNT) * index;

      return { value, y: getY(value) };
    }),
    xTicks: columns.filter((_, index) => index % tickStep === 0).map(({ label, x }) => ({ label, x })),
  };
}
