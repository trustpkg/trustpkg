import { ValueOf } from "@/types/valueOf";
import React from "react";
import { PACKAGE_STATUS_BADGE_STATUS } from "../PackageStatusBadge/StatusBadge.types";

interface PaginationProps {
  count: number;
  currentPage?: number;
  pageSize?: number;
  siblingCount?: number;
  paginationPath?: string;
}

export interface PackageListRootProps
  extends React.PropsWithChildren,
    PackageListFooterProps {}

export interface PackageListItemProps {
  packageName: string;
  IsAlternating?: boolean;
  href: string;
  status: ValueOf<typeof PACKAGE_STATUS_BADGE_STATUS>;
  vulnerabilitiesOccurrences: string;
  vulnerabilityCounts: Record<string, number>;
}

export interface PackageListItemRenderContext {
  index: number;
  isAlternating: boolean;
}

export interface PackageListItemsProps {
  items: PackageListItemProps[];
  children: (
    item: PackageListItemProps,
    context: PackageListItemRenderContext,
  ) => React.ReactNode;
}

export type PackageListFooterProps = PaginationProps;