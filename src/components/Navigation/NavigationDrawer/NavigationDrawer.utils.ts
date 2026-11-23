import type { MouseEvent } from "react";

export function isNavigationClick(event: MouseEvent<HTMLElement>): boolean {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  return event.target instanceof Element && Boolean(event.target.closest("a[href]"));
}
