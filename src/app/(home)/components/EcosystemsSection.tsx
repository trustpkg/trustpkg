import { Base } from "@/components/Base/Base";
import Ecosystems from "@/components/Ecosystems";
import PageLayout from "@/components/PageLayout";
import { pxToRem } from "@/utils/pxToRem";

export function EcosystemsSection() {
  return (
    <PageLayout.Overview.CommonSection
      borderVariant="outline"
      paddingVariant="small"
    >
      <Base as="h2" fontSize={pxToRem(24)} fontWeight={700}>
        Ecosystems
      </Base>

      <Ecosystems>
        <Ecosystems.Item ecosystemName="npm" />
        <Ecosystems.Item ecosystemName="go" isAvailableAlready={false} />
        <Ecosystems.Item ecosystemName="PyPi" isAvailableAlready={false} />
        <Ecosystems.Item ecosystemName="Docker" isAvailableAlready={false} />
      </Ecosystems>
    </PageLayout.Overview.CommonSection>
  );
}
