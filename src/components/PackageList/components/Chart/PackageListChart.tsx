"use client";

import { CanvasBarChart } from "../../../CanvasBarChart/CanvasBarChart";
import { PACKAGE_LIST_CHART_COLORS } from "./PackageListChart.colors";
import {
  PACKAGE_LIST_CHART_AXIS_PADDING,
  PACKAGE_LIST_CHART_MARGIN,
  PACKAGE_LIST_CHART_WIDTH,
} from "../../PackageList.utils";

export interface PackageListChartProps {
  packageName: string;
  chartData: {
    vulnerabilitiesOccurrences: number;
    month: string;
  }[];
}

export { PACKAGE_LIST_CHART_COLORS };

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
      colors={PACKAGE_LIST_CHART_COLORS}
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
