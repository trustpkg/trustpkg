import { Base } from "@/components/Base/Base";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import ShieldIcon from "@/assets/shield.svg";
import { SEVERITY, SEVERITY_LABEL } from "./severityCard.constants";
import { Severity, SeverityCardProps } from "./severityCard.types";

const colorBySeverity: Record<Severity, string> = {
  [SEVERITY.CRITICAL]: colors.text.error,
  [SEVERITY.HIGH]: colors.text.error,
  [SEVERITY.MEDIUM]: colors.text.warning,
  [SEVERITY.MODERATE]: colors.text.warning,
  [SEVERITY.LOW]: colors.text.info,
};

export function SeverityCard(props: SeverityCardProps) {
  const { severity, count, affectedVersions } = props;
  const color = colorBySeverity[severity];

  return (
    <Base
      as="div"
      display="flex"
      alignItems="center"
      gap={{ default: pxToRem(8), sm: pxToRem(16) }}
      width="100%"
      padding={{ default: pxToRem(12), sm: pxToRem(16) }}
      color={color}
      borderRadius={pxToRem(8)}
      backgroundColor={colors.background.surface.primary}
      border={`${pxToRem(1)} solid ${colors.border.primary}`}
      borderLeft={`${pxToRem(4)} solid ${color}`}
    >
      <Base as="svg" asChild flexShrink={0} width={{ default: pxToRem(24), sm: pxToRem(32) }} height={{ default: pxToRem(24), sm: pxToRem(32) }}>
        <ShieldIcon aria-hidden="true" />
      </Base>

      <Base as="div" display="flex" flexDirection="column" minWidth={0}>
        <Base as="span" fontSize={pxToRem(28)} fontWeight={700} color={colors.text.primary}>
          {count}
        </Base>

        <Base as="span" fontSize={pxToRem(16)} fontWeight={600}>
          {SEVERITY_LABEL[severity]}
        </Base>

        <Base as="span" fontSize={pxToRem(12)} color={colors.text.tertiary}>
          Affects {affectedVersions} {affectedVersions === 1 ? "version" : "versions"}
        </Base>
      </Base>
    </Base>
  );
}
