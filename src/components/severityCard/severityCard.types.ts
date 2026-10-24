import { ValueOf } from "@/types/valueOf";
import { SEVERITY } from "./severityCard.constants";

export type Severity = ValueOf<typeof SEVERITY>;

export interface SeverityCardProps {
  severity: Severity;
  count: number;
  affectedVersions: number;
}

export interface SeverityCardGroupProps {
  items: readonly SeverityCardProps[];
}
