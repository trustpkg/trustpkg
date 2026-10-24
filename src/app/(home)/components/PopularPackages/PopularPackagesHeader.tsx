import ArrowRightIcon from "@/assets/ArrowRight.svg";
import { Base } from "@/components/Base/Base";
import { Button } from "@/components/Button";
import { pxToRem } from "@/utils/pxToRem";

export function PopularPackagesHeader() {
  return (
    <Base
      as="header"
      display="flex"
      justifyContent="space-between"
      gap={pxToRem(16)}
    >
      <Base as="h2" fontSize={pxToRem(24)} fontWeight={700}>
        Popular packages
      </Base>

      <Button.AsNextLink
        href="/packages"
        EndIconSlot={<ArrowRightIcon />}
        variant="outlined"
        prefetch
      >
        View all packages
      </Button.AsNextLink>
    </Base>
  );
}
