import Image from "next/image";
import React from "react";
import styles from "./PageLayoutOverview.module.scss";
import { Base } from "../../Base/Base";
import { pxToRem } from "@/utils/pxToRem";
import { Combobox } from "@ark-ui/react";

interface PageLayoutOverviewProps extends React.PropsWithChildren {}

export function PageLayoutOverviewRoot(props: PageLayoutOverviewProps) {
  const { children } = props;

  return <div className={styles.pageOverview}>{children}</div>;
}

interface PageLayoutOverviewHeroProps extends React.PropsWithChildren {}

export function PageLayoutOverviewMainColumn(
  props: PageLayoutOverviewHeroProps,
) {
  const { children } = props;

  return <div className={styles.pageOverview_mainColumn}>{children}</div>;
}

interface PageLayoutOverviewSideColumnProps extends React.PropsWithChildren {}

export function PageLayoutOverviewSideColumn(
  props: PageLayoutOverviewSideColumnProps,
) {
  const { children } = props;

  return <div className={styles.pageOverview_sideColumn}>{children}</div>;
}

interface PageLayoutOverviewHeroProps extends React.PropsWithChildren {}

export async function PageLayoutOverviewHero(
  props: PageLayoutOverviewHeroProps,
) {
  const { children } = props;

  return (
    <header className={styles.pageOverview_hero}>
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
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
}
