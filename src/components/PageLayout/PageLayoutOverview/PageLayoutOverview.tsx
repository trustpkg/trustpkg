import ChevronDoubleDownIcon from "@/assets/chevronDoubleDown.svg";
import { IconButton } from "@/components/Button";
import { pxToRem } from "@/utils/pxToRem";
import clsx from "clsx";
import Image from "next/image";
import { Base } from "../../Base/Base";
import {
  PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_BORDER_VARIANT,
  PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT,
} from "./PageLayoutOverview.constants";
import styles from "./PageLayoutOverview.module.scss";
import type {
  PageLayoutOverviewCommonSectionProps,
  PageLayoutOverviewHeroProps,
  PageLayoutOverviewMainColumnProps,
  PageLayoutOverviewProps,
  PageLayoutOverviewSideColumnProps,
} from "./PageLayoutOverview.types";

export function PageLayoutOverviewRoot(props: PageLayoutOverviewProps) {
  const { children } = props;

  return <div className={styles.pageOverview}>{children}</div>;
}

export function PageLayoutOverviewMainColumn(
  props: PageLayoutOverviewMainColumnProps,
) {
  const { children } = props;

  return <div className={styles.pageOverview_mainColumn}>{children}</div>;
}

export function PageLayoutOverviewSideColumn(
  props: PageLayoutOverviewSideColumnProps,
) {
  const { children } = props;

  return <div className={styles.pageOverview_sideColumn}>{children}</div>;
}

export async function PageLayoutOverviewHero(
  props: PageLayoutOverviewHeroProps,
) {
  const {
    children,
    goToContentButtonConfig = {
      shouldRender: false,
      href: "#",
    },
  } = props;

  return (
    <header className={styles.pageOverview_hero}>
      {goToContentButtonConfig.shouldRender && (
        <IconButton.AsAnchor
          href={goToContentButtonConfig.href}
          label="Scroll down to content"
          position="absolute"
          display={{
            default: "flex",
            sm: "none",
          }}
          size="medium"
          variant='outlined'
          left={"50%"}
          top={`min(calc(100dvh - ${pxToRem(60)}), ${pxToRem(600)})`}
          transform={"translateX(-50%)"}
          zIndex={101}
        >
          <ChevronDoubleDownIcon />
        </IconButton.AsAnchor>
      )}

      <div className={styles.pageOverview_heroContent}>{children}</div>

      <div className={styles.pageOverview_container}>
        {Array.from({ length: 3 }, (_, index) => (
          <Base
            key={index}
            as="span"
            className={styles.pageOverview_containerSkeleton}
            transform={`rotate(${index * 120 + 20}deg) translateY(${pxToRem(4)})`}
          >
            <span className={styles.pageOverview_containerBullet} />
          </Base>
        ))}

        <div className={styles.pageOverview_innerContainer}>
          {Array.from({ length: 2 }, (_, index) => (
            <Base
              key={index}
              as="span"
              className={styles.pageOverview_innerContainerSkeleton}
              transform={`rotate(${index * 200 + 40}deg) translateY(${pxToRem(4)})`}
            >
              <span className={styles.pageOverview_innerContainerBullet} />
            </Base>
          ))}

          <div className={styles.pageOverview_innerSecondContainer}>
            {Array.from({ length: 2 }, (_, index) => (
              <Base
                key={index}
                as="span"
                className={styles.pageOverview_innerSecondContainerSkeleton}
                transform={`rotate(${index * 200 - 20}deg) translateY(${pxToRem(4)})`}
              >
                <span
                  className={styles.pageOverview_innerSecondContainerBullet}
                />
              </Base>
            ))}

            <Image
              className={styles.pageOverview_heroImage}
              width={300}
              height={300}
              src="/trustpkg-coin.png"
              priority
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export function PageLayoutOverviewCommonSection(
  props: PageLayoutOverviewCommonSectionProps,
) {
  const {
    children,
    borderVariant,
    id,
    paddingVariant = PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT.MEDIUM,
    className,
  } = props;

  return (
    <section
      className={clsx(
        styles.pageOverview_commonSection,
        {
          [styles.pageOverview_commonSection__outline]:
            borderVariant ===
            PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_BORDER_VARIANT.OUTLINE,
          [styles.pageOverview_commonSection__smallPadding]:
            paddingVariant ===
            PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT.SMALL,
        },
        className,
      )}
      id={id}
    >
      {children}
    </section>
  );
}
