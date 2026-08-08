import styles from "./not-found.module.scss";
import { Base } from "@/components/Base/Base";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <PageLayout NavigationSlot={<Navigation />}>
      <PageLayout.Overview.MainColumn>
        <PageLayout.Overview.CommonSection className={styles.notFound}>
          <Base
            as="h1"
            position={{
              default: "static",
              lg: "absolute",
            }}
            top={pxToRem(35)}
            left="50%"
            transform={{
              default: "none",
              lg: "translateX(-50%)",
            }}
            color={colors.text.accent}
            fontSize={{
              default: pxToRem(32),
              md: pxToRem(48),
            }}
            fontWeight={700}
          >
            404 - Page Not Found
          </Base>

          <Button.AsNextLink
            href="/"
            position={{
              default: "static",
              lg: "absolute",
            }}
            top={pxToRem(110)}
            left="50%"
            transform={{
              default: "none",
              lg: "translateX(-50%)",
            }}
          >
            Go back to home
          </Button.AsNextLink>

          <Image
            className={styles.notFound_image}
            src="/Error.png"
            width={1536}
            height={1024}
            priority
            alt="404 - Page Not Found"
          />
        </PageLayout.Overview.CommonSection>
      </PageLayout.Overview.MainColumn>
    </PageLayout>
  );
}
