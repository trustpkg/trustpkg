export function getPaginationHref(paginationPath: string, page: number) {
  const [pathAndQuery, hash = ""] = paginationPath.split("#", 2);
  const queryStart = pathAndQuery.indexOf("?");
  const pathname =
    queryStart === -1
      ? pathAndQuery
      : pathAndQuery.slice(0, queryStart);
  const query =
    queryStart === -1 ? "" : pathAndQuery.slice(queryStart + 1);
  const searchParams = new URLSearchParams(query);

  searchParams.set("page", String(page));

  const search = searchParams.toString();

  return `${pathname || "/"}${search ? `?${search}` : ""}${
    hash ? `#${hash}` : ""
  }`;
}
