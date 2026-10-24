"use client";

import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import MenuIcon from "@/assets/menu.svg";
import { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { Drawer, Portal } from "@ark-ui/react";
import { IconButton } from "../../Button";
import type { NavigationItem } from "../Navigation.types";
import styles from "./NavigationDrawer.module.scss";
import { NavigationDrawerHeader } from "./components/Header/NavigationDrawerHeader";
import { NavigationDrawerItems } from "./components/Items/NavigationDrawerItems";

interface NavigationDrawerProps {
  logoSrc: string;
  theme: CurrentTheme;
  config: NavigationItem[];
}

export function NavigationDrawer(props: NavigationDrawerProps) {
  const { logoSrc, theme, config } = props;

  const shouldDisplayDrawer = useResponsiveProp({
    default: true,
    lg: false,
  });

  if (!shouldDisplayDrawer) {
    return null;
  }

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton.AsButton label="Open Menu">
          <MenuIcon />
        </IconButton.AsButton>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop className={styles.drawer_backdrop} />
        <Drawer.Positioner className={styles.drawer}>
          <Drawer.Content className={styles.drawer_content}>
            <NavigationDrawerHeader logoSrc={logoSrc} theme={theme} />
            <NavigationDrawerItems config={config} />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
