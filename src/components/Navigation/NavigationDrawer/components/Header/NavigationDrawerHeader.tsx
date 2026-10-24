import XIcon from "@/assets/x.svg";
import { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { Drawer } from "@ark-ui/react";
import { clsx } from "clsx";
import Image from "next/image";
import NextLink from "next/link";
import { IconButton } from "../../../../Button";
import styles from "../../NavigationDrawer.module.scss";

interface NavigationDrawerHeaderProps {
  logoSrc: string;
  theme: CurrentTheme;
}

export function NavigationDrawerHeader(props: NavigationDrawerHeaderProps) {
  const { logoSrc, theme } = props;

  return (
    <div className={styles.drawer_headerContainer}>
      <header className={styles.drawer_header}>
        <NextLink href="/" className={styles.drawer_logoLink}>
          <div className={styles.drawer_logoContainer}>
            <Image
              className={clsx(styles.drawer_logoImage)}
              data-theme={theme}
              src={logoSrc}
              alt=""
              width={36}
              height={36}
            />
          </div>

          <span className={styles.drawer_logoText}>
            trustpkg
            <span className={styles.drawer_logoTextSuffix}>.dev</span>
          </span>
        </NextLink>

        <Drawer.CloseTrigger asChild>
          <Drawer.Trigger asChild>
            <IconButton.AsButton label="Close Menu">
              <XIcon />
            </IconButton.AsButton>
          </Drawer.Trigger>
        </Drawer.CloseTrigger>
      </header>
    </div>
  );
}
