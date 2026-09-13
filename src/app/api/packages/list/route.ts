import { NextRequest, NextResponse } from "next/server";
import {
    ListPackagesParametersSchema,
    type ListPackagesParameters,
} from "@/api/parameters";
import type { components } from "@/api/api.types";
import { hashString } from "@/utils/hashString";

const HALF_DAY_IN_SECONDS = 60 * 60 * 12;
const ALL_PACKAGES_REVALIDATION_TAG = "packages-list:all";
type ListPackagesResponse = components["schemas"]["packagesApi.ListResponse"];

function getListPackagesQuery(request: NextRequest): ListPackagesParameters {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const parsedQuery = ListPackagesParametersSchema.safeParse({
        page: page === null ? undefined : Number(page),
        limit: limit === null ? undefined : Number(limit),
        sortBy: searchParams.get("sortBy") ?? undefined,
        order: searchParams.get("order") ?? undefined,
        ecosystem: searchParams.get("ecosystem") ?? undefined,
    });

    if (!parsedQuery.success) {
        throw new Error("Invalid package list parameters.");
    }

    return parsedQuery.data;
}

export async function GET(request: NextRequest) {
    const backendUrl = process.env.NEXT_PUBLIC_BE_URL;

    if (!backendUrl) {
        return NextResponse.json(
            {
                code: "BACKEND_URL_MISSING",
                message: "Backend URL is not configured.",
            },
            { status: 500 },
        );
    }

    let query: ListPackagesParameters;

    try {
        query = getListPackagesQuery(request);
    } catch {
        return NextResponse.json(
            {
                code: "INVALID_QUERY",
                message: "Invalid package list parameters.",
            },
            { status: 400 },
        );
    }

    try {
        const url = new URL("/api/packages/list", backendUrl);
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
        const revalidationTag = `packages-list:${hashString(
            url.searchParams.toString(),
        )}`;

        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
            },
            next: {
                revalidate: HALF_DAY_IN_SECONDS,
                tags: [revalidationTag, ALL_PACKAGES_REVALIDATION_TAG],
            },
        });

        const body = (await response.json()) as ListPackagesResponse;

        return NextResponse.json<ListPackagesResponse>(body, {
            status: response.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                code: "PACKAGES_LIST_FAILED",
                message: "Failed to fetch packages.",
                issues: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 502 },
        );
    }
}