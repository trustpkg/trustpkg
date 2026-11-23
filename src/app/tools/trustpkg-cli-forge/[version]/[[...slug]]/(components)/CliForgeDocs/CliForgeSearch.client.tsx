"use client";

import { useStaticSearch } from "fumadocs-core/search/client";
import { useId, useRef, type KeyboardEvent } from "react";
import styles from "./CliForgeControls.module.scss";
import { CliForgeSearchResults } from "./CliForgeSearchResults";

export function CliForgeSearch(props: { version: string }) {
  const searchId = useId();
  const resultsId = useId();

  const resultsRef = useRef<HTMLDivElement>(null);

  const { search, onSearchChange, data, error, isLoading } = useStaticSearch({
    from: "/api/cli-forge-search",
    tag: props.version,
  });

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && search) {
      event.preventDefault();
      onSearchChange("");
      return;
    }

    if (event.key !== "ArrowDown") {
      return;
    }

    const firstResult = resultsRef.current?.querySelector<HTMLAnchorElement>("a[href]");
    if (!firstResult) {
      return;
    }

    event.preventDefault();
    firstResult.focus();
  }

  return (
    <div className={`${styles.cliForgeControls_field} ${styles.cliForgeControls_search}`}>
      <label className={styles.cliForgeControls_label} htmlFor={searchId}>
        Search documentation
      </label>

      <input
        id={searchId}
        className={styles.cliForgeControls_input}
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        aria-controls={search ? resultsId : undefined}
        autoComplete="off"
        placeholder="Search this version"
      />

      {search && (
        <CliForgeSearchResults
          id={resultsId}
          ref={resultsRef}
          searchId={searchId}
          data={data}
          error={error}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
