"use client";

import React from "react";
import { ToggleGroup } from "@ark-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SeverityCardGroup } from "../severityCard/severityCardGroup";
import { SeverityDistributionChart } from "../SeverityDistributionChart";
import { SeverityAreaChart } from "../SeverityAreaChart";
import { DEFAULT_MONTHS, MONTHS_PARAM, MONTHS_PRESETS, monthsNumberSchema } from "./VulnerabilitiesGroup.constants";
import { VulnerabilitiesGroupProps } from "./VulnerabilitiesGroup.types";
import styles from "./VulnerabilitiesGroup.module.scss";

export function VulnerabilitiesGroup(props: VulnerabilitiesGroupProps) {
  const { items, trend, months } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const [selectedMonths, setSelectedMonths] = React.useOptimistic(months);
  const [draft, setDraft] = React.useState<string | null>(null);

  const isCustom = !(MONTHS_PRESETS as readonly string[]).includes(selectedMonths);
  const inputValue = draft ?? (isCustom ? selectedMonths : "");
  const isInputInvalid = draft !== null && draft !== "" && !monthsNumberSchema.safeParse(draft).success;
  const periodLabel = selectedMonths === DEFAULT_MONTHS ? "all time" : `last ${selectedMonths} ${selectedMonths === "1" ? "month" : "months"}`;

  const applyMonths = (nextMonths: string) => {
    if (nextMonths === selectedMonths) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextMonths === DEFAULT_MONTHS) {
      nextParams.delete(MONTHS_PARAM);
    } else {
      nextParams.set(MONTHS_PARAM, nextMonths);
    }

    const query = nextParams.toString();

    startTransition(() => {
      setSelectedMonths(nextMonths);
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const handleToggleChange = (details: { value: string[] }) => {
    const [nextMonths] = details.value;

    if (!nextMonths) {
      return;
    }

    setDraft(null);
    applyMonths(nextMonths);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 2);
    const parsed = monthsNumberSchema.safeParse(digits);

    setDraft(digits);

    if (parsed.success) {
      applyMonths(String(parsed.data));
    }
  };

  return (
    <div className={styles.vulnerabilitiesGroup}>
      <fieldset className={styles.vulnerabilitiesGroup_filter}>
        <legend className={styles.vulnerabilitiesGroup_label}>Vulnerabilities from the last (months)</legend>

        <ToggleGroup.Root
          className={styles.vulnerabilitiesGroup_toggleGroup}
          value={isCustom ? [] : [selectedMonths]}
          onValueChange={handleToggleChange}
          deselectable={false}
        >
          {MONTHS_PRESETS.map((option) => (
            <ToggleGroup.Item key={option} value={option} className={styles.vulnerabilitiesGroup_toggle}>
              {option === DEFAULT_MONTHS ? "All" : option}
            </ToggleGroup.Item>
          ))}

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1-12"
            aria-label="Custom number of months (1-12)"
            aria-invalid={isInputInvalid}
            className={styles.vulnerabilitiesGroup_input}
            data-active={isCustom}
            value={inputValue}
            onChange={handleInputChange}
          />
        </ToggleGroup.Root>
      </fieldset>

      <div className={styles.vulnerabilitiesGroup_content} aria-busy={isPending} data-pending={isPending}>
        <SeverityCardGroup items={items} />

        <div className={styles.vulnerabilitiesGroup_charts}>
          <SeverityDistributionChart items={items} periodLabel={periodLabel} />

          <SeverityAreaChart data={trend} />
        </div>
      </div>
    </div>
  );
}
