import { ApiClient, isApiClientError } from "@/utils/api"
import type {
    GetPackageData,
    PackagesApiPackageDetailRequest,
    PackagesApiPackageDetailResponse,
} from "./generated"

type PackageDetailsRequest = PackagesApiPackageDetailRequest
type PackageDetailsResponse = PackagesApiPackageDetailResponse
type PackageDetailsPath = GetPackageData['path']
type PackageDetailsError = {
    code: string
    message: string
    issues?: unknown
}

const HALF_HOUR_IN_SECONDS = 60 * 30

export const packageDetailsRevalidateTags = {
    all: "packageDetails",
    package: (ecosystem: string, name: string): string => `packageDetails:${ecosystem}:${name}`
}

interface GetPackageDetailsFetchParams {
    name: PackageDetailsPath['name']
    body: PackageDetailsRequest
}

export async function getPackageDetailsFetch(params: GetPackageDetailsFetchParams): Promise<PackageDetailsResponse | null> {
    const { name, body } = params

    try {
        const encodedName = name.split('/').map(encodeURIComponent).join('/')
        const apiClient = new ApiClient(process.env.NEXT_PUBLIC_BE_URL ?? '')

        return await apiClient.post<PackageDetailsRequest, PackageDetailsResponse, PackageDetailsError>(
            `/api/packages/${encodedName}`,
            body,
            {
                tags: [packageDetailsRevalidateTags.all, packageDetailsRevalidateTags.package(body.ecosystem ?? 'npm', name)],
                revalidate: HALF_HOUR_IN_SECONDS
            }
        )
    } catch (error) {
        if (isApiClientError<PackageDetailsError>(error)) {
            console.warn(`Package details request failed with status ${error.status}`, error.body)
        } else {
            console.warn(error)
        }

        return null
    }
}
