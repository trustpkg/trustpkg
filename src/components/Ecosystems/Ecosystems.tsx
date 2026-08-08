"use client";

import NpmIcon from "@/assets/npm.svg";
import GoIcon from "@/assets/go.svg";
import PypiIcon from "@/assets/pypi.svg";
import DockerIcon from "@/assets/docker.svg";
import styles from "./Ecosystems.module.scss";
import Hidden from "../Hidden";
import clsx from "clsx";
import { Base } from "../Base/Base";
import { pxToRem } from "@/utils/pxToRem";
import { Tooltip } from "@ark-ui/react";
import InfoIcon from "@/assets/info.svg";
import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import { colors } from "@/theme/generated/colors.generated";

interface EcosystemsRootProps extends React.PropsWithChildren {}

export function EcosystemsRoot(props: EcosystemsRootProps) {
  const { children } = props;

  const shouldRenderDisclaimer = useResponsiveProp({
    default: true,
    xl: false,
  });

  return (
    <>
      <ul className={styles.ecosystems}>{children}</ul>

      {shouldRenderDisclaimer && (
        <Base as="p" fontSize={pxToRem(10)} color={colors.text.info}>
          Disclaimer: TrustPkg is an independent project and is not affiliated
          with or endorsed by the owners of the respective above package
          ecosystems.
        </Base>
      )}
    </>
  );
}

interface BaseItemComponentProps extends React.PropsWithChildren {
  isAvailableAlready: boolean;
  packageName?: string;
}

function BaseItemComponent(props: BaseItemComponentProps) {
  const { children, isAvailableAlready, packageName } = props;

  const shouldShowTooltip = useResponsiveProp({ default: false, xl: true });

  return (
    <li className={clsx(styles.ecosystems_item)}>
      {!isAvailableAlready && <div className={styles.ecosystems_filter} />}

      {children}

      {!isAvailableAlready && (
        <Base
          as="p"
          fontSize={pxToRem(12)}
          position={"absolute"}
          bottom={pxToRem(8)}
        >
          Not available yet
        </Base>
      )}

      {shouldShowTooltip && (
        <Tooltip.Root openDelay={100} closeDelay={100}>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              className={styles.ecosystems_tooltipTrigger}
              aria-label={`Show legal note for ${packageName}`}
            >
              <InfoIcon className={styles.ecosystems_tooltipTriggerIcon} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Positioner className={styles.ecosystems_tooltipPositioner}>
            <Tooltip.Content className={styles.ecosystems_tooltipContent}>
              <Base as="p" fontSize={pxToRem(12)}>
                {`TrustPkg is an independent project and is not affiliated with or endorsed by the owners of ${packageName}. ${packageName} and its logo are trademarks of their respective owners`}
              </Base>
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      )}
    </li>
  );
}

interface EcosystemsItemProps {
  ecosystemName: "npm" | "go" | "PyPi" | "Docker";
  isAvailableAlready?: boolean;
}

export function EcosystemsItem(props: EcosystemsItemProps) {
  const { ecosystemName, isAvailableAlready = true } = props;

  switch (ecosystemName) {
    case "npm":
      return (
        <BaseItemComponent
          isAvailableAlready={isAvailableAlready}
          packageName="npm"
        >
          <NpmIcon className={styles.ecosystems_itemNpm} />

          <Hidden>npm package manager</Hidden>
        </BaseItemComponent>
      );
    case "go":
      return (
        <BaseItemComponent
          isAvailableAlready={isAvailableAlready}
          packageName="go"
        >
          <GoIcon className={styles.ecosystems_itemGo} />

          <Hidden>Golang based packages</Hidden>
        </BaseItemComponent>
      );
    case "PyPi":
      return (
        <BaseItemComponent
          isAvailableAlready={isAvailableAlready}
          packageName="PyPi"
        >
          <PypiIcon className={styles.ecosystems_itemPypi} />

          <Hidden>Python Package Index</Hidden>
        </BaseItemComponent>
      );

    case "Docker":
      return (
        <BaseItemComponent
          isAvailableAlready={isAvailableAlready}
          packageName="Docker"
        >
          <DockerIcon className={styles.ecosystems_itemDocker} />

          <Hidden>Docker</Hidden>
        </BaseItemComponent>
      );
    default:
      return null;
  }
}
