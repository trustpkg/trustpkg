"use client";

import React from "react";

const RESET_DELAY = 3000;

export function useCopyButton(getValue: () => string) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle");

  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(function cleanupCopyStatusTimer() {
    return () => clearTimeout(timeout.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getValue());

      setStatus("copied");
    } catch (error) {
      console.error("Failed to copy:", error);
      
      setStatus("error");
    }

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), RESET_DELAY);
  }

  return { status, handleCopy };
}
