import type { UseSearchReturn } from "fumadocs-core/search/client";
import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import styles from "./CliForgeSearchResults.module.scss";
import { CliForgeSearchResultContent } from "./CliForgeSearchResultContent";
import { useSearchResultsKeyboard } from "./CliForgeSearchResults.hooks";
import { groupSearchResults } from "./CliForgeSearchResults.utils";

type CliForgeSearchResultsProps = Pick<UseSearchReturn, "data" | "error" | "isLoading"> & {
  id: string;
  searchId: string;
  ref: Ref<HTMLDivElement>;
};

function SearchResultsContent(props: Pick<CliForgeSearchResultsProps, "data" | "error" | "isLoading">) {
  const { data, error, isLoading } = props;

  if (isLoading) {
    return (
      <p className={styles.cliForgeSearchResults_status} role="status">
        <span className={styles.cliForgeSearchResults_spinner} aria-hidden="true" />
        Searching documentation...
      </p>
    );
  }

  if (error) {
    return (
      <p className={styles.cliForgeSearchResults_status} role="alert">
        Search failed. Reload the page and try again.
      </p>
    );
  }

  if (!data) {
    return null;
  }

  const groups = groupSearchResults(data.items);

  if (groups.length === 0) {
    return (
      <div className={styles.cliForgeSearchResults_empty} role="status">
        <Image className={styles.cliForgeSearchResults_emptyImage} src="/no-result.png" width={160} height={107} alt="" />

        <div>
          <p className={styles.cliForgeSearchResults_emptyTitle}>No results found</p>

          <p>Try a different search term.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.cliForgeSearchResults_header} role="status">
        <span>Search results</span>

        <span>{groups.length} {groups.length === 1 ? "page" : "pages"}</span>
      </div>

      <ul className={styles.cliForgeSearchResults_list}>
        {groups.map(({ page, matches }) => (
          <li className={styles.cliForgeSearchResults_group} key={page.id}>
            <Link className={styles.cliForgeSearchResults_page} href={page.url}>
              <CliForgeSearchResultContent item={page} query={data.query} />
            </Link>

            <ul className={styles.cliForgeSearchResults_matches}>
              {matches.map((match) => (
                <li key={match.id}>
                  <Link className={styles.cliForgeSearchResults_match} href={match.url}>
                    <CliForgeSearchResultContent item={match} query={data.query} />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export function CliForgeSearchResults(props: CliForgeSearchResultsProps) {
  const { data, error, isLoading, id, searchId, ref } = props;

  const { onResultsKeyDown } = useSearchResultsKeyboard(searchId);

  return (
    <div
      id={id}
      ref={ref}
      className={styles.cliForgeSearchResults}
      onKeyDown={onResultsKeyDown}
      aria-busy={isLoading}
    >
      <SearchResultsContent data={data} error={error} isLoading={isLoading} />
    </div>
  );
}
