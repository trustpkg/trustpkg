"use client";

import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import { useCallback, useRef, useState } from "react";
import { NavigationItem, NavigationLinkItem } from "../Navigation.types";
import styles from "./DesktopNavigation.module.scss";
import { HoverCard } from "@ark-ui/react";
import { Link } from "@/components/Button";
import { Base } from "@/components/Base/Base";
import { pxToRem } from "@/utils/pxToRem";
import { colors } from "@/theme/generated/colors.generated";

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
    ),
  ).filter(
    (element) => !element.hasAttribute("disabled") && element.tabIndex >= 0,
  );
}

function focusInContent(content: HTMLElement, direction: "next" | "previous") {
  const focusableElements = getFocusableElements(content);

  if (!focusableElements.length) {
    return;
  }

  const activeElement = document.activeElement;
  const currentIndex = focusableElements.findIndex(
    (element) => element === activeElement,
  );

  if (currentIndex === -1) {
    const targetElement =
      direction === "next"
        ? focusableElements[0]
        : focusableElements[focusableElements.length - 1];
    targetElement?.focus();

    return;
  }

  const nextIndex =
    direction === "next"
      ? (currentIndex + 1) % focusableElements.length
      : (currentIndex - 1 + focusableElements.length) %
        focusableElements.length;

  focusableElements[nextIndex]?.focus();
}

interface DesktopNavigationGroupItemProps {
  title: string;
  items: NavigationLinkItem[];
  shouldDisplayDivider: boolean;
}

function DesktopNavigationGroupItem(props: DesktopNavigationGroupItemProps) {
  const { title, items, shouldDisplayDivider } = props;
  const [isOpen, setIsOpen] = useState(false);
  const triggerElementRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const shouldIgnoreNextCloseRef = useRef(false);

  const focusContentAfterOpen = useCallback(
    (direction: "next" | "previous") => {
      const content = contentRef.current;

      if (!content) {
        shouldIgnoreNextCloseRef.current = false;
        return;
      }

      const tryFocus = (attempt = 0) => {
        if (content.hidden) {
          if (attempt > 20) {
            shouldIgnoreNextCloseRef.current = false;
            return;
          }

          requestAnimationFrame(() => tryFocus(attempt + 1));
          return;
        }

        focusInContent(content, direction);
        shouldIgnoreNextCloseRef.current = false;
      };

      requestAnimationFrame(() => tryFocus());
    },
    [],
  );

  return (
    <li className={styles.desktopNavigation_item} key={title}>
      <HoverCard.Root
        open={isOpen}
        onOpenChange={(details) => {
          if (!details.open && shouldIgnoreNextCloseRef.current) {
            return;
          }

          if (
            !details.open &&
            contentRef.current?.contains(document.activeElement)
          ) {
            return;
          }

          setIsOpen(details.open);
        }}
        openDelay={0}
      >
        <HoverCard.Trigger asChild>
          <Link.AsButton
            onFocus={(event) => {
              triggerElementRef.current = event.currentTarget;
            }}
            onKeyDown={(event) => {
              triggerElementRef.current = event.currentTarget;

              if (event.key === "ArrowDown") {
                event.preventDefault();
                shouldIgnoreNextCloseRef.current = true;
                setIsOpen(true);
                focusContentAfterOpen("next");
              }

              if (event.key === "ArrowUp") {
                event.preventDefault();
                shouldIgnoreNextCloseRef.current = true;
                setIsOpen(true);
                focusContentAfterOpen("previous");
              }
            }}
          >
            {title}
          </Link.AsButton>
        </HoverCard.Trigger>

        <HoverCard.Positioner>
          <HoverCard.Content
            ref={contentRef}
            onFocusCapture={() => {
              setIsOpen(true);
            }}
            onBlurCapture={(event) => {
              const nextFocusedElement = event.relatedTarget as Node | null;

              if (
                nextFocusedElement &&
                (event.currentTarget.contains(nextFocusedElement) ||
                  triggerElementRef.current === nextFocusedElement)
              ) {
                return;
              }

              setIsOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusInContent(event.currentTarget, "next");
              }

              if (event.key === "ArrowUp") {
                event.preventDefault();
                focusInContent(event.currentTarget, "previous");
              }

              if (event.key === "Escape") {
                event.preventDefault();
                setIsOpen(false);
                triggerElementRef.current?.focus();
              }
            }}
          >
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>

            <ul className={styles.desktopNavigation_hoverCardContentList}>
              {items.map((subItem) => {
                const {
                  label,
                  href,
                  shouldOpenInNewTab,
                  isExternal,
                  StartIconSlot,
                  EndIconSlot,
                } = subItem;

                return (
                  <li
                    key={label}
                    className={styles.desktopNavigation_hoverCardContentItem}
                  >
                    {isExternal ? (
                      <Link.AsAnchor
                        className={styles.desktopNavigation_hoverCardLink}
                        href={href}
                        target={shouldOpenInNewTab ? "_blank" : undefined}
                        StartIconSlot={StartIconSlot}
                        EndIconSlot={EndIconSlot}
                        rel={
                          shouldOpenInNewTab ? "noopener noreferrer" : undefined
                        }
                      >
                        {label}
                      </Link.AsAnchor>
                    ) : (
                      <Link.AsNextLink
                        className={styles.desktopNavigation_hoverCardLink}
                        href={href}
                        StartIconSlot={StartIconSlot}
                        EndIconSlot={EndIconSlot}
                      >
                        {label}
                      </Link.AsNextLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.Root>

      {shouldDisplayDivider && (
        <Base
          as="span"
          width={pxToRem(2)}
          height={pxToRem(24)}
          display="block"
          background={colors.border.primary}
        />
      )}
    </li>
  );
}

interface DesktopNavigationProps {
  config: NavigationItem[];
}

export function DesktopNavigation(props: DesktopNavigationProps) {
  const { config } = props;

  const shouldDisplayDesktopNavigation = useResponsiveProp({
    default: false,
    lg: true,
  });

  if (!shouldDisplayDesktopNavigation) {
    return null;
  }

  return (
    <ul className={styles.desktopNavigation}>
      {config.map((item, index, array) => {
        if ("items" in item) {
          const { items, title } = item;

          return (
            <DesktopNavigationGroupItem
              key={title}
              title={title}
              items={items}
              shouldDisplayDivider={index < array.length - 1}
            />
          );
        } else {
          const {
            label,
            href,
            shouldOpenInNewTab,
            isExternal,
            StartIconSlot,
            EndIconSlot,
          } = item;

          return (
            <li className={styles.desktopNavigation_item} key={label}>
              {isExternal ? (
                <Link.AsAnchor
                  href={href}
                  target={shouldOpenInNewTab ? "_blank" : undefined}
                  rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
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
                >
                  {label}
                </Link.AsNextLink>
              )}
            </li>
          );
        }
      })}
    </ul>
  );
}
