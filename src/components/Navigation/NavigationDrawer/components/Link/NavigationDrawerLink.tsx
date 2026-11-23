import { Base } from "@/components/Base/Base";
import NavigationListLink from "@/components/NavigationListLink";
import { usePathname } from "next/navigation";
import type { NavigationLinkItem } from "../../../Navigation.types";
import styles from "../../NavigationDrawer.module.scss";

interface NavigationDrawerLinkProps {
  item: NavigationLinkItem;
}

export function NavigationDrawerLink(props: NavigationDrawerLinkProps) {
  const { item } = props;
  const {
    label,
    href,
    isExternal,
    shouldOpenInNewTab,
    StartIconSlot,
    EndIconSlot,
  } = item;
  const pathname = usePathname();
  const isActive = !isExternal && pathname === href;
  const linkProps = isExternal && shouldOpenInNewTab
    ? {
      target: "_blank" as const,
      rel: "noopener noreferrer",
    }
    : {};

  return (
    <NavigationListLink
      href={href}
      active={isActive}
      prefetch={!isExternal}
      {...linkProps}
    >
      <span className={styles.drawer_linkLabel}>
        {StartIconSlot && (
          <Base asChild as="svg" className={styles.drawer_linkIcon}>{StartIconSlot}</Base>
        )}
        {label}
      </span>
      {EndIconSlot && (
        <Base asChild as="svg" className={styles.drawer_linkIcon}>{EndIconSlot}</Base>
      )}
    </NavigationListLink>
  );
}
