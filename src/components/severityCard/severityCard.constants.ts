import { colors } from "@/theme/generated/colors.generated";

export const SEVERITY = {
  CRITICAL: "CRITICAL",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  MODERATE: "MODERATE",
  LOW: "LOW",
} as const;

export const SEVERITY_LABEL = {
  [SEVERITY.CRITICAL]: "Critical",
  [SEVERITY.HIGH]: "High",
  [SEVERITY.MEDIUM]: "Medium",
  [SEVERITY.MODERATE]: "Moderate",
  [SEVERITY.LOW]: "Low",
} as const;

export const SEVERITY_ORDER = [
  SEVERITY.CRITICAL,
  SEVERITY.HIGH,
  SEVERITY.MEDIUM,
  SEVERITY.MODERATE,
  SEVERITY.LOW,
] as const;

export const SEVERITY_COLOR = {
  [SEVERITY.CRITICAL]: `color-mix(in srgb, ${colors.text.error} 70%, black)`,
  [SEVERITY.HIGH]: colors.text.error,
  [SEVERITY.MEDIUM]: colors.text.warning,
  [SEVERITY.MODERATE]: `color-mix(in srgb, ${colors.text.warning} 55%, yellow)`,
  [SEVERITY.LOW]: colors.text.success,
} as const;
