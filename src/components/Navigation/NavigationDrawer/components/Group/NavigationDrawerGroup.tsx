import ChevronDownIcon from "@/assets/chevronDown.svg";
import { Accordion } from "@ark-ui/react";
import type { NavigationLinkGroup } from "../../../Navigation.types";
import styles from "../../NavigationDrawer.module.scss";
import { NavigationDrawerLink } from "../Link/NavigationDrawerLink";

interface NavigationDrawerGroupProps {
  item: NavigationLinkGroup;
}

export function NavigationDrawerGroup(props: NavigationDrawerGroupProps) {
  const { item } = props;
  const { title, items } = item;

  return (
    <li className={styles.drawer_navigationListItem}>
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
          <Accordion.ItemContent className={styles.drawer_accordionContent}>
            <div className={styles.drawer_accordionContentInner}>
              <ul className={styles.drawer_subList}>
                {items.map((subItem) => (
                  <li key={subItem.label} className={styles.drawer_subListItem}>
                    <NavigationDrawerLink item={subItem} />
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </li>
  );
}
