"use client";

import CheckIcon from "@/assets/check.svg";
import CopyIcon from "@/assets/copy.svg";
import Hidden from "@/components/Hidden";
import clsx from "clsx";
import styles from "./CopyButton.module.scss";
import { useCopyButton } from "./useCopyButton";

interface CopyButtonProps {
  getValue: () => string;
  label: string;
  errorMessage?: string;
}

export function CopyButton(props: CopyButtonProps) {
  const { getValue, label, errorMessage = "Copy failed. Select and copy the text manually." } = props;

  const { status, handleCopy } = useCopyButton(getValue);

  return (
    <span className={styles.copyButton}>
      <button
        type="button"
        className={styles.copyButton_button}
        onClick={handleCopy}
        aria-label={status === "copied" ? "Copied" : label}
      >
        {status === "copied" ? (
          <CheckIcon
            className={clsx(styles.copyButton_icon, styles.copyButton_icon__success)}
            aria-hidden="true"
          />
        ) : (
          <CopyIcon className={styles.copyButton_icon} aria-hidden="true" />
        )}

        {status === "copied" ? "Copied" : "Copy"}
      </button>

      <span
        className={clsx(styles.copyButton_status, {
          [styles.copyButton_status__error]: status === "error",
        })}
        role="status"
      >
        {status === "copied" && <Hidden>Copied</Hidden>}

        {status === "error" && errorMessage}
      </span>
    </span>
  );
}
