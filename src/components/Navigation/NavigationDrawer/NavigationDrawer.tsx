"use client";

import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import MenuIcon from "@/assets/menu.svg";
import { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { Drawer } from "@ark-ui/react";
import { IconButton } from "../../Button";
import type { NavigationItem } from "../Navigation.types";
import { NavigationDrawerPanel } from "./NavigationDrawerPanel";
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

      <NavigationDrawerPanel>
        <NavigationDrawerHeader logoSrc={logoSrc} theme={theme} />
        <NavigationDrawerItems config={config} />
      </NavigationDrawerPanel>
    </Drawer.Root>
  );
}
