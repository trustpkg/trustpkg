"use client";

import dynamic from "next/dynamic";
import type { PackageListChartProps } from "./PackageListChart";
import { PackageListChartSkeleton } from "./PackageListChartSkeleton";

const PackageChart = dynamic(
  () => import("./PackageListChart").then((module) => module.PackageListChart),
  {
    ssr: false,
    loading: () => <PackageListChartSkeleton />,
  },
);

export function PackageListChartSlot(props: PackageListChartProps) {
  return <PackageChart {...props} />;
}
