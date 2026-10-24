import { Severity } from "../severityCard/severityCard.types";

export interface SeverityDistributionChartItem {
  severity: Severity;
  count: number;
}

export interface SeverityDistributionChartProps {
  items: readonly SeverityDistributionChartItem[];
  title?: string;
  periodLabel?: string;
}
