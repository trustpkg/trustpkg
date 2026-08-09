import { pxToRem } from "@/utils/pxToRem";
import { Base } from "../Base/Base";
import {
  PACKAGE_STATUS_BADGE_STATUS,
  PackageStatusBadgeProps,
} from "./StatusBadge.types";
import { colors } from "@/theme/generated/colors.generated";
import { ValueOf } from "@/types/valueOf";
import { Tooltip } from "@ark-ui/react";
import InfoIcon from "@/assets/info.svg";
import styles from "./StatusBadge.module.scss";

export function PackageStatusBadge(props: PackageStatusBadgeProps) {
  const { status, tooltip } = props;

  const colorByStatus: Record<
    ValueOf<typeof PACKAGE_STATUS_BADGE_STATUS>,
    string
  > = {
    [PACKAGE_STATUS_BADGE_STATUS.NO_VULNERABILITIES]: colors.text.success,
    [PACKAGE_STATUS_BADGE_STATUS.VULNERABLE]: colors.text.error,
    [PACKAGE_STATUS_BADGE_STATUS.UNKNOWN]: colors.text.warning,
    [PACKAGE_STATUS_BADGE_STATUS.RECENTLY_VULNERABLE]: colors.text.warning,
  };

  const textByStatus: Record<
    ValueOf<typeof PACKAGE_STATUS_BADGE_STATUS>,
    string
  > = {
    [PACKAGE_STATUS_BADGE_STATUS.NO_VULNERABILITIES]: "No Vulnerabilities",
    [PACKAGE_STATUS_BADGE_STATUS.VULNERABLE]: "Vulnerable",
    [PACKAGE_STATUS_BADGE_STATUS.UNKNOWN]: "Unknown",
    [PACKAGE_STATUS_BADGE_STATUS.RECENTLY_VULNERABLE]: "Recently Vulnerable",
  };

  return (
    <div className={styles.statusBadge}>
      <Base
        as="span"
        width="fit-content"
        borderRadius={pxToRem(8)}
        backgroundColor={colors.background.surface.primary}
      >
        <Base
          as="span"
          display="flex"
          alignItems="center"
          gap={pxToRem(4)}
          width="fit-content"
          padding={`0 ${pxToRem(16)}`}
          color={colorByStatus[status]}
          borderRadius={pxToRem(8)}
          backgroundColor={`${colorByStatus[status]}1A`}
          border={`${pxToRem(2)} solid ${colorByStatus[status]}`}
          fontSize={pxToRem(14)}
          textTransform="uppercase"
          fontWeight={700}
          whiteSpace="nowrap"
        >
          {textByStatus[status]}{" "}
          {status === PACKAGE_STATUS_BADGE_STATUS.VULNERABLE && (
            <span className={styles.pulse} />
          )}
        </Base>
      </Base>

      {tooltip && (
        <Tooltip.Root openDelay={100} closeDelay={100}>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              className={styles.tooltip}
              aria-label={`show details`}
            >
              <InfoIcon className={styles.tooltip_icon} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Positioner className={styles.tooltip_positioner}>
            <Tooltip.Content className={styles.tooltip_content}>
              <Base as="p" fontSize={pxToRem(14)}>
                {tooltip.title}
              </Base>
              {tooltip.description && (
                <Base as="p" fontSize={pxToRem(12)}>
                  {tooltip.description}
                </Base>
              )}
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      )}
    </div>
  );
}
