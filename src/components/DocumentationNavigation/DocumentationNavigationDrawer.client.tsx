"use client";

import BookIcon from "@/assets/book.svg";
import CloseIcon from "@/assets/x.svg";
import { IconButton } from "@/components/Button";
import { NavigationDrawerPanel } from "@/components/Navigation/NavigationDrawer/NavigationDrawerPanel";
import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import { Drawer } from "@ark-ui/react";
import type { DrawerOpenChangeDetails } from "@ark-ui/react";
import React from "react";
import styles from "./DocumentationNavigationDrawer.module.scss";

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
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (event.target instanceof Element && event.target.closest("a[href]")) {
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
        <header className={styles.documentationDrawer_header}>
          <Drawer.Title className={styles.documentationDrawer_title}>
            Documentation
          </Drawer.Title>

          <Drawer.CloseTrigger asChild>
            <IconButton.AsButton type="button" label="Close documentation navigation">
              <CloseIcon aria-hidden="true" />
            </IconButton.AsButton>
          </Drawer.CloseTrigger>
        </header>

        <nav
          className={styles.documentationDrawer_navigation}
          aria-label="Documentation navigation"
          onClick={handleNavigationClick}
        >
          {children}
        </nav>
      </NavigationDrawerPanel>
    </Drawer.Root>
  );
}
