"use client";

import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { Bar, BarChart, Tooltip, XAxis } from "recharts";

interface PackageListChartProps {
  packageName: string;
  chartData: {
    vulnerabilitiesOccurrences: number;
    month: string;
  }[];
}

export function PackageListChart(props: PackageListChartProps) {
  const { packageName, chartData } = props;

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
        bottom: 5,
        left: 5,
        right: 5,
        top: 5,
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
      width={500}
    >
      <Bar
        dataKey="vulnerabilitiesOccurrences"
        name="Vulnerabilities occurrences"
        fill={colors.background.button.primary}
        radius={4}
        strokeWidth={4}
      />
      <XAxis dataKey="month" stroke={colors.text.primary} />
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
