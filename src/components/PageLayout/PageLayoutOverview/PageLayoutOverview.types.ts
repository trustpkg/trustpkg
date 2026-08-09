import type { ValueOf } from "@/types/valueOf";
import {
  PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_BORDER_VARIANT,
  PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT,
} from "./PageLayoutOverview.constants";

export interface PageLayoutOverviewProps extends React.PropsWithChildren {}

export interface PageLayoutOverviewMainColumnProps
  extends React.PropsWithChildren {}

export interface PageLayoutOverviewSideColumnProps
  extends React.PropsWithChildren {}

interface GoToContentButtonConfig {
  href: string;
  shouldRender: boolean;
}

export interface PageLayoutOverviewHeroProps extends React.PropsWithChildren {
  goToContentButtonConfig?: GoToContentButtonConfig;
}

export interface PageLayoutOverviewCommonSectionProps
  extends React.PropsWithChildren {
  borderVariant?: ValueOf<
    typeof PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_BORDER_VARIANT
  >;
  id?: React.HTMLAttributes<HTMLElement>["id"];
  paddingVariant?: ValueOf<
    typeof PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT
  >;
  className?: string;
}
