"use client";

import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { Bar, BarChart, Tooltip, XAxis } from "recharts";
import {
  getChartTickIndexes,
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
  const chartTicks = getChartTickIndexes(chartData.length).map(
    (index) => chartData[index].month,
  );

  return (
    <BarChart
      accessibilityLayer
      barCategoryGap="8%"
      barGap={4}
      data={chartData}
      height={80}
      id={`package-list-item-${packageName}-chart`}
      layout="horizontal"
      margin={{
        bottom: PACKAGE_LIST_CHART_MARGIN,
        left: PACKAGE_LIST_CHART_MARGIN,
        right: PACKAGE_LIST_CHART_MARGIN,
        top: PACKAGE_LIST_CHART_MARGIN,
      }}
      syncId={packageName}
      syncMethod="index"
      throttleDelay="raf"
      throttledEvents={[
        "mousemove",
        "touchmove",
        "pointermove",
        "scroll",
        "wheel",
      ]}
      width={PACKAGE_LIST_CHART_WIDTH}
    >
      <Bar
        dataKey="vulnerabilitiesOccurrences"
        name="Vulnerabilities occurrences"
        fill={colors.background.button.primary}
        radius={4}
        strokeWidth={4}
      />
      <XAxis
        dataKey="month"
        ticks={chartTicks}
        interval={0}
        padding={{
          left: PACKAGE_LIST_CHART_AXIS_PADDING,
          right: PACKAGE_LIST_CHART_AXIS_PADDING,
        }}
        stroke={colors.text.primary}
      />
      <Tooltip
        contentStyle={{
          padding: pxToRem(8),
          border: `${pxToRem(1)} solid ${colors.border.primary}`,
          borderRadius: pxToRem(8),
          background: colors.background.secondary,
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(8)} ${colors.background.surface.primary}`,
        }}
        itemStyle={{ color: colors.text.primary }}
        labelStyle={{ color: colors.text.accent }}
        wrapperStyle={{ zIndex: 1000 }}
        cursor={{ fill: colors.background.overlay }}
        offset={{ y: -80, x: 10 }}
        allowEscapeViewBox={{ x: true, y: true }}
      />
    </BarChart>
  );
}
