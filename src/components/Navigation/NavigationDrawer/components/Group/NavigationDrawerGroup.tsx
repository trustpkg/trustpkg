import groupStyles from "@/components/NavigationListGroup/NavigationListGroup.module.scss";
import type { NavigationLinkGroup } from "../../../Navigation.types";
import { NavigationDrawerLink } from "../Link/NavigationDrawerLink";

interface NavigationDrawerGroupProps {
  item: NavigationLinkGroup;
}

export function NavigationDrawerGroup(props: NavigationDrawerGroupProps) {
  const { item } = props;
  const { title, items } = item;

  return (
    <li>
      <span className={groupStyles.navigationListGroup_title}>{title}</span>
      <ul className={groupStyles.navigationListGroup_items}>
        {items.map((subItem) => (
          <li key={subItem.label}>
            <NavigationDrawerLink item={subItem} />
          </li>
        ))}
      </ul>
    </li>
  );
}
