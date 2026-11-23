import React from "react";

export function useSearchResultsKeyboard(searchId: string) {
  const onResultsKeyDown = React.useCallback(function onResultsKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      document.getElementById(searchId)?.focus();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]"));
    const index = links.findIndex((link) => link === document.activeElement);

    if (index < 0) {
      return;
    }

    event.preventDefault();
    const nextIndex = index + (event.key === "ArrowDown" ? 1 : -1);

    if (nextIndex < 0) {
      document.getElementById(searchId)?.focus();
    } else {
      links[nextIndex]?.focus();
    }
  }, [searchId]);

  return { onResultsKeyDown };
}
