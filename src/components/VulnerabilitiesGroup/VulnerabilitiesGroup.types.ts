import { SeverityAreaChartPoint } from "../SeverityAreaChart";
import { SeverityCardProps } from "../severityCard/severityCard.types";

export interface VulnerabilitiesGroupProps {
  items: readonly SeverityCardProps[];
  trend: readonly SeverityAreaChartPoint[];
  months: string;
}
