"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { PackageListChartProps } from "./PackageListChart";
import { PackageListCompactChart } from "./PackageListCompactChart.client";
import { PackageListChartSkeleton } from "./PackageListChartSkeleton";

const PackageChart = dynamic(
  () => import("./PackageListChart").then((module) => module.PackageListChart),
  {
    ssr: false,
    loading: () => <PackageListChartSkeleton />,
  },
);

const COMPACT_CHART_MEDIA_QUERY = "(max-width: 1024px)";

function subscribeToCompactChart(callback: () => void) {
  const mediaQuery = window.matchMedia(COMPACT_CHART_MEDIA_QUERY);

  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getIsCompactChart() {
  return window.matchMedia(COMPACT_CHART_MEDIA_QUERY).matches;
}

function getServerIsCompactChart() {
  return false;
}

function subscribeToHydration() {
  return () => {};
}

function getIsHydrated() {
  return true;
}

function getServerIsHydrated() {
  return false;
}

export function PackageListChartSlot(props: PackageListChartProps) {
  const isCompactChart = React.useSyncExternalStore(
    subscribeToCompactChart,
    getIsCompactChart,
    getServerIsCompactChart,
  );
  const isHydrated = React.useSyncExternalStore(
    subscribeToHydration,
    getIsHydrated,
    getServerIsHydrated,
  );

  if (!isHydrated) {
    return <PackageListChartSkeleton />;
  }

  return isCompactChart ? (
    <PackageListCompactChart {...props} />
  ) : (
    <PackageChart {...props} />
  );
}
