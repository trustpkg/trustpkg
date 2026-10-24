import type { NavigationItem } from "../../../Navigation.types";
import styles from "../../NavigationDrawer.module.scss";
import { NavigationDrawerGroup } from "../Group/NavigationDrawerGroup";
import { NavigationDrawerLink } from "../Link/NavigationDrawerLink";

interface NavigationDrawerItemsProps {
  config: NavigationItem[];
}

export function NavigationDrawerItems(props: NavigationDrawerItemsProps) {
  const { config } = props;

  return (
    <ul className={styles.drawer_navigationList}>
      {config.map((item) => {
        if ("items" in item) {
          return <NavigationDrawerGroup key={item.title} item={item} />;
        }

        return (
          <li
            key={item.label}
            className={styles.drawer_navigationListLinkWrapper}
          >
            <NavigationDrawerLink
              item={item}
              className={styles.drawer_navigationListLink}
            />
          </li>
        );
      })}
    </ul>
  );
}
