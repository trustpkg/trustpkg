"use client";

import CopyButton from "@/components/CopyButton";
import { useRef } from "react";

export function CodeBlockCopy() {
  const containerRef = useRef<HTMLSpanElement>(null);

  function getCode() {
    const code = containerRef.current
      ?.closest("[data-code-block]")
      ?.querySelector("[data-code-block-content]");

    if (!code || code.textContent === null) {
      throw new Error("Code block not found");
    }

    return code.textContent;
  }

  return (
    <span ref={containerRef}>
      <CopyButton
        getValue={getCode}
        label="Copy code"
        errorMessage="Copy failed. Select and copy the code manually."
      />
    </span>
  );
}
