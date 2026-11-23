import type { SearchResult, SearchResultRecord } from "fumadocs-core/search/client";

export interface CliForgeSearchResultGroup {
  page: SearchResultRecord;
  matches: SearchResultRecord[];
}

export function groupSearchResults(items: SearchResult["items"]): CliForgeSearchResultGroup[] {
  const groups: CliForgeSearchResultGroup[] = [];

  for (const item of items) {
    const records = item.type === "table" ? item.rows : [item];

    for (const record of records) {
      if (record.type === "page") {
        groups.push({ page: record, matches: [] });
      } else if (groups.length > 0) {
        groups[groups.length - 1].matches.push(record);
      }
    }
  }

  return groups;
}
