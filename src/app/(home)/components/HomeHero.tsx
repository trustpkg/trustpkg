import { Base } from "@/components/Base/Base";
import PageLayout from "@/components/PageLayout";
import Search from "@/components/Search";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";

export function HomeHero() {
  return (
    <PageLayout.Overview.Hero
      goToContentButtonConfig={{
        shouldRender: true,
        href: "#first-section",
      }}
    >
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
          4 322 512
        </Base>{" "}
        packages
      </Base>

      <Search>
        <Search.Trigger />
        <Search.Dialog />
      </Search>
    </PageLayout.Overview.Hero>
  );
}
