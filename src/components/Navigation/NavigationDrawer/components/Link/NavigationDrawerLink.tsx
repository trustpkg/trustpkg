import { Link } from "../../../../Button";
import type { NavigationLinkItem } from "../../../Navigation.types";

interface NavigationDrawerLinkProps {
  item: NavigationLinkItem;
  className?: string;
}

export function NavigationDrawerLink(props: NavigationDrawerLinkProps) {
  const { item, className } = props;
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
      target: "_blank" as const,
      rel: "noopener noreferrer",
    }
    : {};

  if (isExternal) {
    return (
      <Link.AsAnchor
        className={className}
        href={href}
        {...linkProps}
        StartIconSlot={StartIconSlot}
        EndIconSlot={EndIconSlot}
      >
        {label}
      </Link.AsAnchor>
    );
  }

  return (
    <Link.AsNextLink
      className={className}
      href={href}
      StartIconSlot={StartIconSlot}
      EndIconSlot={EndIconSlot}
      prefetch
    >
      {label}
    </Link.AsNextLink>
  );
}
