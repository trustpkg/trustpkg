import { BasePaddingProps } from "@/responsive/responsiveStyleProps.types";
import { pxToRem } from "@/utils/pxToRem";
import React from "react";
import { Base } from "../Base/Base";
import styles from "./PageLayout.module.scss";
import { colors } from "@/theme/generated/colors.generated";

const defaultPadding = {
  default: pxToRem(16),
  md: pxToRem(32)
}

export interface PageLayoutComponentProps extends React.PropsWithChildren {
  NavigationSlot?: React.ReactNode;
  WrapperSlot?: React.ComponentType<React.PropsWithChildren>;
  contentContainerPadding?: BasePaddingProps['padding']
  isListVariant?: boolean;
}

export function PageLayoutRootComponent(props: PageLayoutComponentProps) {
  const {
    children,
    NavigationSlot,
    WrapperSlot = React.Fragment,
    contentContainerPadding = defaultPadding,
    isListVariant = false,
  } = props;

  return (
    <WrapperSlot>
      <div className={styles.pageLayout}>
        <div className={styles.pageLayout_menuContainer}>
          <div className={styles.pageLayout_menuInnerContainer}>
            {NavigationSlot}
          </div>
        </div>

        <Base
          as="div"
          display="flex"
          justifyContent="center"
          width="100%"
          flex="1 0 auto"
          padding={contentContainerPadding}
          backgroundColor={isListVariant ? colors.background.surface.primary : colors.background.surface.secondary}
        >
          <div className={styles.pageLayout_contentInnerContainer}>
            {children}
          </div>
        </Base>

        <div className={styles.pageLayout_footerContainer}>
          <footer className={styles.pageLayout_footerInnerContainer}>
            <Base as="p" fontSize={pxToRem(12)} opacity={0.9}>
              © 2026 trustpkg.dev. All rights reserved.
            </Base>
          </footer>
        </div>
      </div>
    </WrapperSlot>
  );
}
