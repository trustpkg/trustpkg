import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";
import type { NavigationItem } from "@/components/Navigation/Navigation.types";
import { Base } from "@/components/Base/Base";
import { pxToRem } from "@/utils/pxToRem";
import { colors } from "@/theme/generated/colors.generated";

export const metadata = {
  title: "Home | trustpkg.dev",
  description:
    "trustpkg.dev is a platform that provides vulnerability frequency, insight and comparison of packages. ",
};

export default function Home() {
  return (
    <PageLayout NavigationSlot={<Navigation />}>
      <PageLayout.Overview>
        <PageLayout.Overview.MainColumn>
          <PageLayout.Overview.Hero>
            <Base as="h1" fontSize={pxToRem(48)} fontWeight={700}>
              trustpkg.dev
            </Base>

            <Base
              as="p"
              fontSize={pxToRem(24)}
              fontWeight={400}
              textWrap="balance"
              maxInlineSize={pxToRem(300)}
            >
              Check vulnerabilities frequency from over{" "}
              <Base color={colors.text.accent} as="span">
                3 001 011
              </Base>{" "}
              packages
            </Base>
          </PageLayout.Overview.Hero>
        </PageLayout.Overview.MainColumn>

        <PageLayout.Overview.SideColumn></PageLayout.Overview.SideColumn>
      </PageLayout.Overview>
    </PageLayout>
  );
}
