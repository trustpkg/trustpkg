import styles from "./CliForgeControls.module.scss";
import type { CliForgeVersion } from "./CliForgeDocs.types";
import { CliForgeSearch } from "./CliForgeSearch.client";
import { CliForgeVersionSelect } from "./CliForgeVersionSelect.client";

interface CliForgeControlsProps {
  versions: CliForgeVersion[];
  version: string;
}

export function CliForgeControls(props: CliForgeControlsProps) {
  return (
    <div className={styles.cliForgeControls}>
      <CliForgeVersionSelect versions={props.versions} version={props.version} />

      <CliForgeSearch version={props.version} />
    </div>
  );
}
