"use client";

import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import MenuIcon from "@/assets/menu.svg";
import XIcon from "@/assets/x.svg";
import { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { Accordion, Drawer, Portal } from "@ark-ui/react";
import { clsx } from "clsx";
import Image from "next/image";
import NextLink from "next/link";
import ChevronDownIcon from "@/assets/chevronDown.svg";
import { IconButton, Link } from "../../Button";
import type { NavigationItem } from "../Navigation.types";
import styles from "./NavigationDrawer.module.scss";

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

            <ul className={styles.drawer_navigationList}>
              {config.map((item) => {
                if ("items" in item) {
                  const { title, items } = item;

                  return (
                    <li
                      key={title}
                      className={styles.drawer_navigationListItem}
                    >
                      <Accordion.Root collapsible>
                        <Accordion.Item
                          value={title}
                          className={styles.drawer_accordionItem}
                        >
                          <Accordion.ItemTrigger
                            asChild
                            className={styles.drawer_accordionTrigger}
                          >
                            <button
                              type="button"
                              className={styles.drawer_accordionTriggerButton}
                            >
                              <span>{title}</span>

                              <Accordion.ItemIndicator
                                className={styles.drawer_accordionIndicator}
                              >
                                <ChevronDownIcon />
                              </Accordion.ItemIndicator>
                            </button>
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent
                            className={styles.drawer_accordionContent}
                          >
                            <div
                              className={styles.drawer_accordionContentInner}
                            >
                              <ul className={styles.drawer_subList}>
                                {items.map((subItem) => {
                                  const {
                                    label,
                                    href,
                                    isExternal,
                                    shouldOpenInNewTab,
                                    StartIconSlot,
                                    EndIconSlot,
                                  } = subItem;

                                  const linkProps = shouldOpenInNewTab
                                    ? {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                      }
                                    : {};

                                  return (
                                    <li
                                      key={label}
                                      className={styles.drawer_subListItem}
                                    >
                                      {isExternal ? (
                                        <Link.AsAnchor
                                          href={href}
                                          {...linkProps}
                                          StartIconSlot={StartIconSlot}
                                          EndIconSlot={EndIconSlot}
                                        >
                                          {label}
                                        </Link.AsAnchor>
                                      ) : (
                                        <Link.AsNextLink
                                          href={href}
                                          StartIconSlot={StartIconSlot}
                                          EndIconSlot={EndIconSlot}
                                          prefetch
                                        >
                                          {label}
                                        </Link.AsNextLink>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      </Accordion.Root>
                    </li>
                  );
                } else {
                  const {
                    label,
                    href,
                    isExternal,
                    shouldOpenInNewTab,
                    StartIconSlot,
                    EndIconSlot,
                  } = item;
                  const linkProps = shouldOpenInNewTab
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {};

                  return (
                    <li
                      key={label}
                      className={styles.drawer_navigationListLinkWrapper}
                    >
                      {isExternal ? (
                        <Link.AsAnchor
                          className={styles.drawer_navigationListLink}
                          href={href}
                          {...linkProps}
                          StartIconSlot={StartIconSlot}
                          EndIconSlot={EndIconSlot}
                        >
                          {label}
                        </Link.AsAnchor>
                      ) : (
                        <Link.AsNextLink
                          className={styles.drawer_navigationListLink}
                          href={href}
                          StartIconSlot={StartIconSlot}
                          EndIconSlot={EndIconSlot}
                          prefetch
                        >
                          {label}
                        </Link.AsNextLink>
                      )}
                    </li>
                  );
                }
              })}
            </ul>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
