"use client";

import React from "react";
import CopyIcon from "@/assets/copy.svg";
import CheckIcon from "@/assets/check.svg";
import styles from "./VulnerabilitiesTable.module.scss";

const RESET_DELAY = 1500;

export function CopyButton(props: { value: string }) {
  const { value } = props;
  const [copied, setCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(timeout.current), []);

  const handleClick = async (event: React.MouseEvent) => {
    // The button may live inside a <summary>; do not toggle the disclosure.
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), RESET_DELAY);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className={styles.vulnerabilitiesTable_copy} onClick={handleClick} data-copied={copied}>
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
      <span className={styles.vulnerabilitiesTable_srOnly} aria-live="polite">
        {copied ? "Copied" : `Copy ${value}`}
      </span>
    </button>
  );
}
