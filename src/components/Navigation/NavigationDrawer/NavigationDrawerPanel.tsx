"use client";

import { Drawer, Portal } from "@ark-ui/react";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import styles from "./NavigationDrawer.module.scss";

interface NavigationDrawerPanelProps extends PropsWithChildren {
  side?: "left" | "right";
}

export function NavigationDrawerPanel(props: NavigationDrawerPanelProps) {
  const { children, side = "right" } = props;

  return (
    <Portal>
      <Drawer.Backdrop className={styles.drawer_backdrop} />
      <Drawer.Positioner className={clsx(styles.drawer, {
        [styles.drawer__left]: side === "left",
      })}>
        <Drawer.Content className={clsx(styles.drawer_content, {
          [styles.drawer_content__left]: side === "left",
        })}>
          {children}
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}
