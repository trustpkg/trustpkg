import { ApiClient, isApiClientError } from "@/utils/api"
import { components, operations } from "./api.types"
import type { ListPackagesParameters } from "./parameters"

type PackagesListParams = operations['listPackages']['parameters']['query']
type PackagesResponse = components['schemas']['packagesApi.ListResponse']
type PackagesError = {
    code: string
    message: string
    issues?: unknown
}

const ONE_DAY_IN_SECONDS = 60 * 60 * 24 
const LIMIT_PARAMETER_VALUE = 9

export const packagesRevalidateTags = {
    all: "packagesList",
    query: (params: PackagesListParams): string => {
        const resolvedParams = !!params ? Object.values(params).map((value) => !!value ? String(value) : "undefined").sort() : ["without-params"]

        return `packagesList:${resolvedParams.join(":")}`
    }
}


export async function getPackagesFetch(params: ListPackagesParameters): Promise<PackagesResponse | null> {
    try {
        const searchParams = new URLSearchParams()

        Object.entries(params ?? {}).forEach(([key, value]) => {
            if (value !== undefined && key !== "limit") {
                searchParams.set(key, String(value))
            }

            if (key === "limit") {
                searchParams.set(key, String(LIMIT_PARAMETER_VALUE))
            }
        })

        searchParams.set("includeVulnerabilities", "true")

        const queryString = searchParams.toString()
        const packagesUrl = queryString ? `/api/packages/list?${queryString}` : '/api/packages/list'
        const apiClient = new ApiClient(process.env.NEXT_PUBLIC_BE_URL ?? '')

        const response = await apiClient.get<PackagesResponse, PackagesError>(packagesUrl,
            {
                tags: [packagesRevalidateTags.all, packagesRevalidateTags.query({...params, limit: LIMIT_PARAMETER_VALUE})],
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