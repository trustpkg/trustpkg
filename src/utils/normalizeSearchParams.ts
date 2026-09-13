export type SearchParams = Record<string, string | string[] | undefined>;

export type NormalizedSearchParams = Record<string, string | number | undefined>;

export function normalizeSearchParams(
  searchParams: SearchParams,
  numericKeys: readonly string[] = [],
): NormalizedSearchParams {
  return Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => {
      const normalizedValue = Array.isArray(value) ? value[0] : value;

      return [
        key,
        numericKeys.includes(key) && normalizedValue !== undefined
          ? Number(normalizedValue)
          : normalizedValue,
      ];
    }),
  );
}
