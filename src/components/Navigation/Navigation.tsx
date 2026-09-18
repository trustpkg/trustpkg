import { getTheme } from "@/api/getTheme";
import GithubIcon from "@/assets/github.svg";
import { ChooseTheme } from "@/theme/components/ChooseTheme/ChooseTheme.client";
import { primaryTheme } from "@/theme/generated/themes.generated.const";
import type { CurrentTheme } from "@/theme/generated/themes.generated.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconButton } from "../Button";
import styles from "./Navigation.module.scss";
import type { NavigationItem } from "./Navigation.types";
import { NavigationDrawer } from "./NavigationDrawer/NavigationDrawer";
import { navigationDefaultConfig } from "./Navigation.utils";
import { DesktopNavigation } from "./DesktopNavigation/DesktopNavigation";

const logoSrcByTheme = {
  light: "/trustpkg-coin.png",
  dark: "/trustpkg-coin-light.png",
};

interface NavigationRootProps {
  config?: NavigationItem[];
}

interface NavigationViewProps {
  config: NavigationItem[];
  theme: CurrentTheme;
  isLogoLoading?: boolean;
}

function NavigationView(props: NavigationViewProps) {
  const { config, theme, isLogoLoading = false } = props;

  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.navigation_logoLink}>
        <div className={styles.navigation_logoContainer}>
          {isLogoLoading ? (
            <span className={styles.navigation_logoSkeleton} aria-hidden="true" />
          ) : (
            <Image
              data-theme={theme}
              className={styles.navigation_logoImage}
              src={logoSrcByTheme[theme]}
              alt=""
              width={36}
              height={36}
            />
          )}
        </div>

        <span className={styles.navigation_logoText}>
          trustpkg
          <span className={styles.navigation_logoTextSuffix}>.dev</span>
        </span>
      </Link>

      <DesktopNavigation config={config} />

      <ul className={styles.navigation_actions}>
        <li className={styles.navigation_actionsItem}>
          <IconButton.AsAnchor
            href="https://github.com/trustpkg"
            target="_blank"
            rel="noopener noreferrer"
            label="View Github"
          >
            <GithubIcon />
          </IconButton.AsAnchor>
        </li>

        <li className={styles.navigation_actionsItem}>
          <ChooseTheme />
        </li>

        <li className={styles.navigation_actionsItem}>
          <NavigationDrawer
            logoSrc={logoSrcByTheme[theme]}
            theme={theme}
            config={config}
          />
        </li>
      </ul>
    </nav>
  );
}

async function NavigationContent(props: NavigationRootProps) {
  const { config = navigationDefaultConfig } = props;
  const theme = await getTheme();

  return <NavigationView config={config} theme={theme} />;
}

export function NavigationRoot(props: NavigationRootProps) {
  const { config = navigationDefaultConfig } = props;

  return (
    <React.Suspense
      fallback={
        <NavigationView
          config={config}
          theme={primaryTheme}
          isLogoLoading
        />
      }
    >
      <NavigationContent config={config} />
    </React.Suspense>
  );
}
