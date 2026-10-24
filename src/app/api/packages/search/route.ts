import {
  SearchPackagesParametersSchema,
  type SearchPackagesParameters,
} from "@/api/parameters";
import type { PackagesApiSearchResponse } from "@/api/generated";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getSearchQuery(request: NextRequest): SearchPackagesParameters {
  const searchParams = request.nextUrl.searchParams;
  const rawLimit = searchParams.get("limit");

  const parsedQuery = SearchPackagesParametersSchema.safeParse({
    query: searchParams.get("query") ?? undefined,
    limit: rawLimit === null ? undefined : Number(rawLimit),
  });

  if (!parsedQuery.success) {
    throw new Error("Invalid package search parameters.");
  }

  return parsedQuery.data;
}

export async function GET(request: NextRequest) {
  const backendUrl = process.env.BE_URL;

  if (!backendUrl) {
    return NextResponse.json(
      {
        code: "BACKEND_URL_MISSING",
        message: "Backend URL is not configured.",
      },
      { status: 500 },
    );
  }

  let query: SearchPackagesParameters;

  try {
    query = getSearchQuery(request);
  } catch {
    return NextResponse.json(
      {
        code: "INVALID_QUERY",
        message: "Invalid package search parameters.",
      },
      { status: 400 },
    );
  }

  try {
    const url = new URL("/api/packages/search", backendUrl);
    url.searchParams.set("query", query.query);
    url.searchParams.set("limit", String(query.limit));

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const body = (await response.json()) as PackagesApiSearchResponse;

    return NextResponse.json<PackagesApiSearchResponse>(body, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        code: "PACKAGE_SEARCH_FAILED",
        message: "Failed to search packages.",
        issues: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
