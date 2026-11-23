import type { NavigationItem } from "../../../Navigation.types";
import type { MouseEvent } from "react";
import { isNavigationClick } from "../../NavigationDrawer.utils";
import styles from "../../NavigationDrawer.module.scss";
import { NavigationDrawerGroup } from "../Group/NavigationDrawerGroup";
import { NavigationDrawerLink } from "../Link/NavigationDrawerLink";

interface NavigationDrawerItemsProps {
  config: NavigationItem[];
  onNavigate: () => void;
}

export function NavigationDrawerItems(props: NavigationDrawerItemsProps) {
  const { config, onNavigate } = props;

  function handleNavigationClick(event: MouseEvent<HTMLElement>) {
    if (isNavigationClick(event)) {
      onNavigate();
    }
  }

  return (
    <nav
      className={styles.drawer_navigation}
      aria-label="Main navigation"
      onClick={handleNavigationClick}
    >
      <ul className={styles.drawer_navigationList}>
        {config.map((item) => {
          if ("items" in item) {
            return <NavigationDrawerGroup key={item.title} item={item} />;
          }

          return (
            <li key={item.label}>
              <NavigationDrawerLink item={item} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
