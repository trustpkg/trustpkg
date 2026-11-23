"use client";

import BookIcon from "@/assets/book.svg";
import { IconButton } from "@/components/Button";
import { NavigationDrawerPanel } from "@/components/Navigation/NavigationDrawer/NavigationDrawerPanel";
import { isNavigationClick } from "@/components/Navigation/NavigationDrawer/NavigationDrawer.utils";
import { NavigationDrawerHeader } from "@/components/Navigation/NavigationDrawer/components/Header/NavigationDrawerHeader";
import styles from "@/components/Navigation/NavigationDrawer/NavigationDrawer.module.scss";
import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import { Drawer } from "@ark-ui/react";
import type { DrawerOpenChangeDetails } from "@ark-ui/react";
import React from "react";

interface DocumentationNavigationDrawerProps {
  children: React.ReactNode;
}

export function DocumentationNavigationDrawer(props: DocumentationNavigationDrawerProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useResponsiveProp({ default: true, lg: false });

  function handleOpenChange({ open }: DrawerOpenChangeDetails) {
    setIsOpen(open);
  }

  function handleNavigationClick(event: React.MouseEvent<HTMLElement>) {
    if (isNavigationClick(event)) {
      setIsOpen(false);
    }
  }

  if (!isMobile) {
    return null;
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Drawer.Trigger asChild>
        <IconButton.AsButton type="button" label="Open documentation navigation" variant='filled' size='medium'>
          <BookIcon aria-hidden="true" />
        </IconButton.AsButton>
      </Drawer.Trigger>

      <NavigationDrawerPanel side="left">
        <NavigationDrawerHeader
          title="Documentation"
          closeLabel="Close documentation navigation"
        />

        <nav
          className={styles.drawer_navigation}
          aria-label="Documentation navigation"
          onClick={handleNavigationClick}
        >
          {children}
        </nav>
      </NavigationDrawerPanel>
    </Drawer.Root>
  );
}
