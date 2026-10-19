import { BaseDisplayProps, BaseFlexProps, BaseGridProps, BaseSpacingProps } from "@/responsive/responsiveStyleProps.types";
import React from "react";

export interface PageLayoutListDetailsRootProps extends React.PropsWithChildren {
    BreadcrumbsSlot?: React.ReactNode
}

interface PageLayoutListDetailsHeroStylesProps extends Pick<BaseDisplayProps, 'display'>, BaseFlexProps, BaseSpacingProps {}

export interface PageLayoutListDetailsHeroProps extends React.PropsWithChildren, PageLayoutListDetailsHeroStylesProps { }

interface PageLayoutListDetailsSectionStylesProps extends Pick<BaseDisplayProps, 'display'>, BaseFlexProps, BaseGridProps, BaseSpacingProps {}

export interface PageLayoutListDetailsSectionProps extends React.PropsWithChildren, PageLayoutListDetailsSectionStylesProps {
    as: React.ElementType
}
