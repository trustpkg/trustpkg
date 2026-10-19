import { Severity } from "../severityCard/severityCard.types";

export interface SeverityAreaChartPoint {
  /** Month in `YYYY-MM` format. */
  month: string;
  counts: Partial<Record<Severity, number>>;
}

export interface SeverityAreaChartProps {
  data: readonly SeverityAreaChartPoint[];
  /**
   * Controlled filter, applies to the desktop chart only (the mobile list always shows every severity).
   * Defaults to all severities.
   */
  visibleSeverities?: readonly Severity[];
  title?: string;
}

export interface SeverityAreaLayer {
  severity: Severity;
  path: string;
  line: string;
}

export interface SeverityAreaColumn {
  label: string;
  x: number;
  total: number;
  rows: { severity: Severity; count: number }[];
}

export interface SeverityAreaGeometry {
  layers: SeverityAreaLayer[];
  columns: SeverityAreaColumn[];
  yTicks: { value: number; y: number }[];
  xTicks: { label: string; x: number }[];
}
