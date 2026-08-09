import { colors } from "@/theme/generated/colors.generated";
import { Base } from "../Base/Base";
import { pxToRem } from "@/utils/pxToRem";

type AvailableEcosystem = "npm" | "go" | "PyPi" | "Docker";

interface EcosystemBadgeProps {
  ecosystemName: AvailableEcosystem;
}

export function EcosystemBadgeRoot(props: EcosystemBadgeProps) {
  const { ecosystemName } = props;

  const colorByEcosystem: Record<AvailableEcosystem, string> = {
    npm: "#CB3837",
    go: "#00ADD8",
    PyPi: "#F3D03E",
    Docker: "#2496ED",
  };

  return (
    <Base
      as="span"
      width="fit-content"
      borderRadius={pxToRem(8)}
      backgroundColor={colors.background.surface.primary}
    >
      <Base
        as="span"
        width="fit-content"
        padding={`0 ${pxToRem(16)}`}
        color={colorByEcosystem[ecosystemName]}
        borderRadius={pxToRem(8)}
        backgroundColor={`${colorByEcosystem[ecosystemName]}1A`}
        border={`${pxToRem(2)} solid ${colorByEcosystem[ecosystemName]}`}
        fontSize={pxToRem(14)}
        textTransform="uppercase"
        fontWeight={700}
      >
        {ecosystemName}
      </Base>
    </Base>
  );
}
