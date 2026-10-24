"use client";

import GlassIcon from "@/assets/glass.svg";
import { Base } from "../../../Base/Base";
import Hidden from "../../../Hidden";
import React from "react";
import { SearchContext } from "../../Search.context";
import styles from "../../Search.module.scss";

export function SearchTrigger() {
  const { setIsDialogWithSearchOpen } = React.useContext(SearchContext);

  React.useEffect(
    function handleKeyboard() {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
          event.key === "/"
        ) {
          event.preventDefault();
          setIsDialogWithSearchOpen?.(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [setIsDialogWithSearchOpen],
  );

  return (
    <Base as="div" className={styles.search_trigger}>
      <Base
        as="button"
        type="button"
        className={styles.search_triggerButton}
        onClick={() => setIsDialogWithSearchOpen?.(true)}
      >
        <GlassIcon className={styles.search_triggerIcon} />
        Search...
      </Base>
      <div className={styles.search_triggerShortcutsContainer}>
        <Base as="span" className={styles.search_triggerShortcut}>
          <Hidden>type</Hidden> Ctrl + K
        </Base>{" "}
        <Hidden>or</Hidden>
        <Base as="span" className={styles.search_triggerShortcut}>
          <Hidden>type</Hidden> /
        </Base>
        <Hidden>to open search</Hidden>
      </div>
    </Base>
  );
}
