import Navigation from "@/components/Navigation";
import PageLayout from "@/components/PageLayout";
import { Base } from "@/components/Base/Base";
import { pxToRem } from "@/utils/pxToRem";
import { colors } from "@/theme/generated/colors.generated";
import Ecosystems from "@/components/Ecosystems";
import { Button } from "@/components/Button";
import ArrowRightIcon from "@/assets/ArrowRight.svg";
import { Hidden } from "@/components/Hidden/Hidden";
import Search from "@/components/Search";
import PackageList from "@/components/PackageList";

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

          <PageLayout.Overview.CommonSection
            borderVariant="none"
            paddingVariant="small"
            id="first-section"
          >
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

            <PackageList>
              <PackageList.Item
                packageName="React"
                href="/packages/react"
                status="no-vulnerabilities"
                vulnerabilitiesOccurrences="45"
              />
              <PackageList.Item
                packageName="Vue"
                href="/packages/vue"
                status="no-vulnerabilities"
                vulnerabilitiesOccurrences="30"
              />
              <PackageList.Item
                packageName="Angular"
                href="/packages/angular"
                status="recently-vulnerable"
                vulnerabilitiesOccurrences="12"
              />
              <PackageList.Item
                packageName="Svelte"
                href="/packages/svelte"
                status="no-vulnerabilities"
                vulnerabilitiesOccurrences="5"
              />
              <PackageList.Item
                packageName="Ember"
                href="/packages/ember"
                status="unknown"
                vulnerabilitiesOccurrences="8"
              />
              <PackageList.Item
                packageName="Backbone"
                href="/packages/backbone"
                status="vulnerable"
                vulnerabilitiesOccurrences="0"
              />
              <PackageList.Item
                packageName="Preact"
                href="/packages/preact"
                status="unknown"
                vulnerabilitiesOccurrences="unknown"
              />
            </PackageList>
          </PageLayout.Overview.CommonSection>
        </PageLayout.Overview.MainColumn>

        <PageLayout.Overview.SideColumn>
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
              <Ecosystems.Item
                ecosystemName="PyPi"
                isAvailableAlready={false}
              />
              <Ecosystems.Item
                ecosystemName="Docker"
                isAvailableAlready={false}
              />
            </Ecosystems>
          </PageLayout.Overview.CommonSection>

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

            <Base
              as="section"
              display="flex"
              flexDirection="column"
              gap={pxToRem(8)}
            >
              <Base as="h3" fontSize={pxToRem(18)} fontWeight={700}>
                Do Frequent Vulnerabilities Mean a Package Is Unsafe?
              </Base>

              <Base as="p" fontSize={pxToRem(12)}>
                Projects with frequent vulnerabilities aren't necessarily
                insecure. An active security process and fast fixes can be signs
                of a healthy, well-maintained package.
              </Base>
            </Base>

            <Base
              as="span"
              width="100%"
              height={pxToRem(1)}
              background={colors.border.primary}
            />

            <Base
              as="section"
              display="flex"
              flexDirection="column"
              gap={pxToRem(8)}
            >
              <Base as="h3" fontSize={pxToRem(18)} fontWeight={700}>
                Is a Zero-Vulnerability History Always Better?
              </Base>

              <Base as="p" fontSize={pxToRem(12)}>
                Not always. A package with no reported vulnerabilities may
                simply have received less scrutiny. Publicly disclosed and
                quickly fixed issues can indicate a mature security process.
              </Base>
            </Base>

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
        </PageLayout.Overview.SideColumn>
      </PageLayout.Overview>
    </PageLayout>
  );
}
