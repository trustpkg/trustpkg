import { ApiClient, isApiClientError } from "@/utils/api"
import type { ListPackagesData, PackagesApiListResponse } from "./generated"
import type { ListPackagesParameters } from "./parameters"

type PackagesListParams = ListPackagesData['query']
type PackagesResponse = PackagesApiListResponse
type PackagesError = {
    code: string
    message: string
    issues?: unknown
}

const ONE_DAY_IN_SECONDS = 60 * 60 * 24 
const INCLUDE_VULNERABILITIES_VALUE = "true"
const ONLY_WITH_VULNERABILITIES_VALUE = "true"
const VULNERABILITY_MONTHS_VALUE = "6"
const WITH_CURRENT_STATUS_VALUE = "true"
const DEFAULT_LIMIT = 9

export const packagesRevalidateTags = {
    all: "packagesList",
    query: (params: PackagesListParams): string => {
        const resolvedParams = !!params ? Object.values(params).map((value) => !!value ? String(value) : "undefined").sort() : ["without-params"]

        return `packagesList:${resolvedParams.join(":")}`
    }
}

interface Options {
    limit?: number
}


interface GetPackagesFetchParams {
    queryParams: ListPackagesParameters,
    options?: Options
}

const defaultOptions = {
    limit: DEFAULT_LIMIT
}

export async function getPackagesFetch(params: GetPackagesFetchParams): Promise<PackagesResponse | null> {
    const { queryParams, options = defaultOptions  } = params
    const { limit } = options 
    
    const omittedVulnerabilities = ["includeVulnerabilities", "onlyWithVulnerabilities", "vulnerabilityMonths", "withCurrentStatus"]

    try {
        const searchParams = new URLSearchParams()

        Object
            .entries(queryParams ?? {})
            .forEach(
                ([key, value]) => {
                    if (value !== undefined && !omittedVulnerabilities.includes(key)) {
                        searchParams.set(key, String(value))
                    }
                }
            )

        searchParams.set("includeVulnerabilities", INCLUDE_VULNERABILITIES_VALUE)
        searchParams.set("onlyWithVulnerabilities", ONLY_WITH_VULNERABILITIES_VALUE)
        searchParams.set("vulnerabilityMonths", VULNERABILITY_MONTHS_VALUE)
        searchParams.set("withCurrentStatus", WITH_CURRENT_STATUS_VALUE)
        searchParams.set("limit", `${limit ?? DEFAULT_LIMIT}`)

        const queryString = searchParams.toString()
        const packagesUrl = queryString ? `/api/packages/list?${queryString}` : '/api/packages/list'
        const apiClient = new ApiClient(process.env.NEXT_PUBLIC_BE_URL ?? '')

        const response = await apiClient.get<PackagesResponse, PackagesError>(packagesUrl,
            {
                tags: [packagesRevalidateTags.all, packagesRevalidateTags.query({ ...queryParams, limit })],
                revalidate: ONE_DAY_IN_SECONDS
            }
        )

        return response
    } catch (error) {
        if (isApiClientError<PackagesError>(error)) {
            console.warn(`Package request failed with status ${error.status}`, error.body)
        } else {
            console.warn(error)
        }

        return null
    }
}