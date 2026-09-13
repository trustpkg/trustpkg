'use client';

import styles from "./error.module.scss";
import { Base } from "@/components/Base/Base";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { Button } from "@/components/Button";

export default function Error() {
    return (
        <PageLayout>
            <PageLayout.Overview.MainColumn>
                <PageLayout.Overview.CommonSection className={styles.error}>
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
                        500 - Something went wrong
                    </Base>

                    <Button.AsNextLink
                        href={{ pathname: "/" }}
                        replace
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
                        className={styles.error_image}
                        src="/404.png"
                        width={1536}
                        height={1024}
                        priority
                        alt="500 - Something went wrong"
                    />
                </PageLayout.Overview.CommonSection>
            </PageLayout.Overview.MainColumn>
        </PageLayout>
    );
}
