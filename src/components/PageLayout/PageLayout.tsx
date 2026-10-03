import { BasePaddingProps } from "@/responsive/responsiveStyleProps.types";
import { pxToRem } from "@/utils/pxToRem";
import React from "react";
import { Base } from "../Base/Base";
import styles from "./PageLayout.module.scss";
import { PageLayoutListRoot } from "./PageLayoutList/PageLayoutList";
import { colors } from "@/theme/generated/colors.generated";

const defaultPadding = {
  default: pxToRem(16),
  md: pxToRem(32)
}

interface PageLayoutProps extends React.PropsWithChildren {
  NavigationSlot?: React.ReactNode;
  contentContainerPadding?: BasePaddingProps['padding']
}

export function PageLayoutRoot(props: PageLayoutProps) {
  const {
    children,
    NavigationSlot,
    contentContainerPadding = defaultPadding
  } = props;

  const isListVariant = React.Children
    .toArray(children)
    .some(
      (child) =>
        React.isValidElement(child) && child.type === PageLayoutListRoot
    );

  return (
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
  );
}

export function PageLayoutHero() { }
