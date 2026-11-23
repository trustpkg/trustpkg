"use client";

import CheckIcon from "@/assets/check.svg";
import ChevronDownIcon from "@/assets/chevronDown.svg";
import { createListCollection, Select } from "@ark-ui/react";
import type { SelectValueChangeDetails } from "@ark-ui/react";
import { useRouter } from "next/navigation";
import styles from "./CliForgeControls.module.scss";
import selectStyles from "./CliForgeVersionSelect.module.scss";
import type { CliForgeVersion } from "./CliForgeDocs.types";

interface CliForgeVersionSelectProps {
  versions: CliForgeVersion[];
  version: string;
}

export function CliForgeVersionSelect(props: CliForgeVersionSelectProps) {
  const { versions, version } = props;

  const router = useRouter();

  const collection = createListCollection({
    items: versions.map((item) => ({ label: item.tag, value: item.version })),
  });

  function handleVersionChange({ value }: SelectValueChangeDetails) {
    const nextVersion = value[0];

    if (nextVersion && nextVersion !== version) {
      router.push(`/tools/trustpkg-cli-forge/${nextVersion}/`);
    }
  }

  return (
    <Select.Root
      className={styles.cliForgeControls_field}
      collection={collection}
      value={[version]}
      onValueChange={handleVersionChange}
      positioning={{ sameWidth: true }}
    >
      <Select.Label className={styles.cliForgeControls_label}>
        Documentation version
      </Select.Label>

      <Select.Control>
        <Select.Trigger className={`${styles.cliForgeControls_input} ${selectStyles.cliForgeVersionSelect_trigger}`}>
          <Select.ValueText />

          <Select.Indicator className={selectStyles.cliForgeVersionSelect_indicator}>
            <ChevronDownIcon aria-hidden="true" />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>

      <Select.Positioner className={selectStyles.cliForgeVersionSelect_positioner}>
        <Select.Content className={selectStyles.cliForgeVersionSelect_content}>
          {collection.items.map((item) => (
            <Select.Item className={selectStyles.cliForgeVersionSelect_item} item={item} key={item.value}>
              <Select.ItemText>{item.label}</Select.ItemText>

              <Select.ItemIndicator className={selectStyles.cliForgeVersionSelect_check}>
                <CheckIcon aria-hidden="true" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
