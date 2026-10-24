import ArrowRightIcon from "@/assets/ArrowRight.svg";
import { Base } from "@/components/Base/Base";
import { Button } from "@/components/Button";
import { Hidden } from "@/components/Hidden/Hidden";
import PageLayout from "@/components/PageLayout";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { SecurityQuestion } from "./SecurityQuestion";

export function SecuritySection() {
  return (
    <PageLayout.Overview.CommonSection
      borderVariant="outline"
      paddingVariant="small"
    >
      <Base as="h2" fontSize={pxToRem(24)} fontWeight={700}>
        Understanding package security
      </Base>

      <Base
        as="span"
        width="100%"
        height={pxToRem(1)}
        background={colors.border.primary}
      />

      <SecurityQuestion title="Do Frequent Vulnerabilities Mean a Package Is Unsafe?">
        Projects with frequent vulnerabilities aren&apos;t necessarily insecure.
        An active security process and fast fixes can be signs of a
        healthy, well-maintained package.
      </SecurityQuestion>

      <Base
        as="span"
        width="100%"
        height={pxToRem(1)}
        background={colors.border.primary}
      />

      <SecurityQuestion title="Is a Zero-Vulnerability History Always Better?">
        Not always. A package with no reported vulnerabilities may simply have
        received less scrutiny. Publicly disclosed and quickly fixed issues can
        indicate a mature security process.
      </SecurityQuestion>

      <Button.AsNextLink
        href="/understanding-package-security"
        width="100%"
        variant="outlined"
        EndIconSlot={<ArrowRightIcon />}
        prefetch
      >
        Learn more
        <Hidden>about understanding package security</Hidden>
      </Button.AsNextLink>
    </PageLayout.Overview.CommonSection>
  );
}
