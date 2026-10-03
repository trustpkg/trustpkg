import Breadcrumbs from "@/components/Breadcrumbs"
import Navigation from "@/components/Navigation"
import PageLayout from "@/components/PageLayout"
import { pxToRem } from "@/utils/pxToRem"
import { notFound } from "next/navigation"
import z from "zod"

interface PackagePageProps {
    params: Promise<{
        name: string
        ecosystem: string
    }>
}

const paramsSchema = z.object({
    name: z.string().min(1),
    ecosystem: z.enum(['npm'])
})

export async function generateMetadata(props: PackagePageProps) {
    const params = await props.params
    const result = paramsSchema.safeParse(params)

    if (!result.success) {
        return notFound()
    }

    const { name, ecosystem } = result.data

    return {
        title: `${name} | ${ecosystem} | trustpkg.dev`,
        description: "Check package vulnerabilities trends"
    }
}

export default async function PackagePage(props: PackagePageProps) {
    const params = await props.params
    const result = paramsSchema.safeParse(params)

    if (!result.success) {
        return notFound()
    }

    const { name, ecosystem } = result.data

    const pathName = `/packages/${ecosystem}/${name}`

    return (
        <PageLayout
            NavigationSlot={<Navigation />}
            contentContainerPadding={{
                default: pxToRem(16),
                md: pxToRem(32),
                lg: `0 ${pxToRem(32)}`
            }}
        >
            <PageLayout.List>
                <PageLayout.List.SideMenu />

                <PageLayout.List.Details BreadcrumbsSlot={<Breadcrumbs pathName={pathName} />}>
                    <PageLayout.List.Details.Hero>
                        {name} - {ecosystem}
                    </PageLayout.List.Details.Hero>
                </PageLayout.List.Details>
            </PageLayout.List>
        </PageLayout>
    )
}