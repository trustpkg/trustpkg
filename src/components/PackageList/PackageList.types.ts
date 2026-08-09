import React from "react";
import { PACKAGE_STATUS_BADGE_STATUS } from "../PackageStatusBadge/StatusBadge.types";
import { ValueOf } from "@/types/valueOf";

export interface PackageListRootProps extends React.PropsWithChildren {}

export interface PackageListItemProps {
  packageName: string;
  IsAlternating?: boolean;
  href: string;
  status: ValueOf<typeof PACKAGE_STATUS_BADGE_STATUS>;
  vulnerabilitiesOccurrences: string;
}
