"use client";

import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import MenuIcon from "@/assets/menu.svg";
import { Drawer } from "@ark-ui/react";
import type { DrawerOpenChangeDetails } from "@ark-ui/react";
import { useState } from "react";
import { IconButton } from "../../Button";
import type { NavigationItem } from "../Navigation.types";
import { NavigationDrawerPanel } from "./NavigationDrawerPanel";
import { NavigationDrawerHeader } from "./components/Header/NavigationDrawerHeader";
import { NavigationDrawerItems } from "./components/Items/NavigationDrawerItems";

interface NavigationDrawerProps {
  config: NavigationItem[];
}

export function NavigationDrawer(props: NavigationDrawerProps) {
  const { config } = props;
  const [isOpen, setIsOpen] = useState(false);

  const shouldDisplayDrawer = useResponsiveProp({
    default: true,
    lg: false,
  });

  function handleOpenChange({ open }: DrawerOpenChangeDetails) {
    setIsOpen(open);
  }

  function handleNavigate() {
    setIsOpen(false);
  }

  if (!shouldDisplayDrawer) {
    return null;
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Drawer.Trigger asChild>
        <IconButton.AsButton label="Open Menu">
          <MenuIcon />
        </IconButton.AsButton>
      </Drawer.Trigger>

      <NavigationDrawerPanel>
        <NavigationDrawerHeader title="Main navigation" closeLabel="Close menu" />
        <NavigationDrawerItems config={config} onNavigate={handleNavigate} />
      </NavigationDrawerPanel>
    </Drawer.Root>
  );
}
