import Image from "next/image";
import styles from "./Navigation.module.scss";
import { ChooseTheme } from "@/theme/components/ChooseTheme/ChooseTheme.client";
import Link from "next/link";
import { getTheme } from "@/api/getTheme";
import React from "react";

const logoSrcByTheme = {
  light: "/trustpkg-coin.png",
  dark: "/trustpkg-coin-light.png",
};

export async function NavigationRoot() {
  const theme = await getTheme();

  return (
    <nav className={styles.navigation}>
      <Link href="/">
        <React.Suspense>
          <div className={styles.navigation_logoContainer}>
            <Image
              src={logoSrcByTheme[theme]}
              alt="trustpkg logo"
              width={40}
              height={40}
            />
          </div>
        </React.Suspense>
      </Link>

      <ChooseTheme />
    </nav>
  );
}
