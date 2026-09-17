"use client";

import { colors } from "@/theme/generated/colors.generated";
import { CanvasBarChart } from "../CanvasBarChart/CanvasBarChart";
import {
  PACKAGE_LIST_CHART_AXIS_PADDING,
  PACKAGE_LIST_CHART_MARGIN,
  PACKAGE_LIST_CHART_WIDTH,
} from "./PackageList.utils";

interface PackageListChartProps {
  packageName: string;
  chartData: {
    vulnerabilitiesOccurrences: number;
    month: string;
  }[];
}

export function PackageListChart(props: PackageListChartProps) {
  const { packageName, chartData } = props;
  const data = chartData.map(({ month, vulnerabilitiesOccurrences }) => ({
    label: month,
    value: vulnerabilitiesOccurrences,
  }));
  const chartId = `package-list-item-${packageName}-chart`;

  return (
    <CanvasBarChart.Root
      data={data}
      width={PACKAGE_LIST_CHART_WIDTH}
      height={80}
      colors={{
        bar: colors.background.button.primary,
        axis: colors.text.primary,
        label: colors.text.primary,
        cursor: colors.background.overlay,
        tooltipBackground: colors.background.secondary,
        tooltipBorder: colors.border.primary,
        tooltipShadow: colors.background.surface.primary,
        tooltipLabel: colors.text.accent,
        tooltipText: colors.text.primary,
      }}
      geometryOptions={{
        horizontalInset:
          PACKAGE_LIST_CHART_MARGIN + PACKAGE_LIST_CHART_AXIS_PADDING,
        axisY: 55,
        top: PACKAGE_LIST_CHART_MARGIN,
      }}
      ariaLabel={`Vulnerability occurrences trend for ${packageName}`}
      accessibleDataId={`${chartId}-data`}
    >
      <CanvasBarChart.Canvas />
      <CanvasBarChart.Tooltip />
      <CanvasBarChart.AccessibleData />
    </CanvasBarChart.Root>
  );
}
