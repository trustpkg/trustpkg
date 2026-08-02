import Image from "next/image";
import styles from "./Navigation.module.scss";
import { ChooseTheme } from "@/theme/components/ChooseTheme/ChooseTheme.client";
import Link from "next/link";
import { getTheme } from "@/api/getTheme";
import React from "react";

const logoSrcByTheme = {
  light: "/trustpkg-coin.png",
  dark: "/trustpkg-coin-light.png",
  adam: "/trustpkg-coin-light.png",
};

export async function NavigationRoot() {
  const theme = await getTheme();

  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.navigation_logoLink}>
        <React.Suspense fallback={<span>loading theme ....</span>}>
          <div className={styles.navigation_logoContainer}>
            <Image
              data-theme={theme}
              className={styles.navigation_logoImage}
              src={logoSrcByTheme[theme]}
              alt=""
              width={32}
              height={32}
            />
          </div>

          <span className={styles.navigation_logoText}>
            trustpkg
            <span className={styles.navigation_logoTextSuffix}>.dev</span>
          </span>
        </React.Suspense>
      </Link>

      <ChooseTheme />
    </nav>
  );
}
