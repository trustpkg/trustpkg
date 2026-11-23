import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./NavigationListLink.module.scss";

interface NavigationListLinkProps extends ComponentProps<typeof Link> {
  active?: boolean;
}

export function NavigationListLink(props: NavigationListLinkProps) {
  const { active = false, className, "aria-current": ariaCurrent, ...linkProps } = props;

  return (
    <Link
      {...linkProps}
      className={clsx(styles.navigationListLink, className, {
        [styles.navigationListLink__active]: active,
      })}
      aria-current={active ? "page" : ariaCurrent}
    />
  );
}
