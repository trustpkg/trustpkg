import { SearchPackagesParametersSchema } from "@/api/parameters"
import { notFound } from "next/navigation"

interface PackagePageProps {
    params: Promise<{
        name: string
    }>
}

const normalizedPackageOrNotFound = (name: string) => {
    const result = SearchPackagesParametersSchema.shape.query.safeParse(name)

    console.log({
        name,
        result,
        resultSuccess: result.success
    })

    if (!result.success) {
        return notFound()
    }

    return result.data
}

export async function generateMetadata(props: PackagePageProps) {
    const { name } = await props.params

    const result = normalizedPackageOrNotFound(name)

    return {
        title: result,
        description: "Check package vulnerabilities trends"
    }
}

export default async function PackagePage(props: PackagePageProps) {
    const { name } = await props.params

    const result = normalizedPackageOrNotFound(name)

    return (
        <div>
            <h1>{result}</h1>
        </div>
    )
}