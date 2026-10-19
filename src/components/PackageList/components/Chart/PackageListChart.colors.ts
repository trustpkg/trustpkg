import type { CanvasBarChartColors } from "../../../CanvasBarChart/CanvasBarChart";
import { colors } from "@/theme/generated/colors.generated";

export const PACKAGE_LIST_CHART_COLORS = {
  bar: colors.background.button.primary,
  axis: colors.text.primary,
  label: colors.text.primary,
  cursor: colors.background.overlay,
  tooltipBackground: colors.background.secondary,
  tooltipBorder: colors.border.primary,
  tooltipShadow: colors.background.surface.primary,
  tooltipLabel: colors.text.accent,
  tooltipText: colors.text.primary,
} satisfies CanvasBarChartColors;
