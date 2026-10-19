import { Severity } from "../severityCard/severityCard.types";

export interface SeverityTrendPoint {
  /** Month in `YYYY-MM` format, same keys as `vulnerability_counts` from the API. */
  month: string;
  counts: Partial<Record<Severity, number>>;
}

export interface SeverityTrendChartProps {
  data: readonly SeverityTrendPoint[];
  /** Applies to the desktop chart only; the mobile list always shows every severity. */
  visibleSeverities?: readonly Severity[];
  title?: string;
}

export interface SeverityTrendLayer {
  severity: Severity;
  path: string;
}

export interface SeverityTrendTooltipRow {
  severity: Severity;
  count: number;
}

export interface SeverityTrendColumn {
  label: string;
  x: number;
  total: number;
  rows: SeverityTrendTooltipRow[];
}

export interface SeverityTrendGeometry {
  layers: SeverityTrendLayer[];
  columns: SeverityTrendColumn[];
  yTicks: { value: number; y: number }[];
  xTicks: { label: string; x: number }[];
}
