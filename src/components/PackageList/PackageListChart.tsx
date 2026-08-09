"use client";

import { Line, XAxis, LineChart, Tooltip } from "recharts";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";

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
    <LineChart
      accessibilityLayer
      barCategoryGap="8%"
      barGap={4}
      data={chartData}
      height={100}
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
      <Line
        dataKey="vulnerabilitiesOccurrences"
        name="Vulnerabilities occurrences"
        stroke={colors.text.accent}
        type="monotone"
      />
      <XAxis dataKey="month" stroke={colors.text.primary} />
      <Tooltip
        trigger="click"
        contentStyle={{
          border: `${pxToRem(1)} solid ${colors.border.primary}`,
          borderRadius: pxToRem(8),
          background: colors.background.secondary,
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(8)} rgba(0, 0, 0, 0.1)`,
          padding: pxToRem(8),
        }}
        itemStyle={{ color: colors.text.primary }}
        labelStyle={{ color: colors.text.primary }}
        wrapperStyle={{ zIndex: 1000 }}
        cursor={{ fill: colors.background.secondary }}
        offset={{ y: -80, x: 10 }}
        allowEscapeViewBox={{ x: true, y: true }}
      />
    </LineChart>
  );
}
