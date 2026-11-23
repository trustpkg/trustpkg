import XIcon from "@/assets/x.svg";
import { Drawer } from "@ark-ui/react";
import { IconButton } from "../../../../Button";
import styles from "../../NavigationDrawer.module.scss";

interface NavigationDrawerHeaderProps {
  title: string;
  closeLabel: string;
}

export function NavigationDrawerHeader(props: NavigationDrawerHeaderProps) {
  const { title, closeLabel } = props;

  return (
    <header className={styles.drawer_header}>
      <Drawer.Title className={styles.drawer_title}>{title}</Drawer.Title>
      <Drawer.CloseTrigger asChild>
        <IconButton.AsButton type="button" label={closeLabel}>
          <XIcon aria-hidden="true" />
        </IconButton.AsButton>
      </Drawer.CloseTrigger>
    </header>
  );
}
