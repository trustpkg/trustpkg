import { Base } from "@/components/Base/Base"
import Breadcrumbs from "@/components/Breadcrumbs"
import PageLayout from "@/components/PageLayout"
import Search from "@/components/Search"
import { colors } from "@/theme/generated/colors.generated"
import { normalizeSearchParams } from "@/utils/normalizeSearchParams"
import { pxToRem } from "@/utils/pxToRem"
import { SearchParams } from "next/dist/server/request/search-params"
import { notFound } from "next/navigation"
import z from "zod"
import { ListPackagesParametersSchema } from "@/api/parameters"
import { normalizePopularity } from "@/utils/normalizePopularity"
import { NavigationPackageList } from "../../components/NavigationPackageList/NavigationPackageList"
import { getPackageDetailsFetch } from "@/api/getPackageDetailsFetch"
import { SEVERITY } from "@/components/severityCard"
import type { Severity } from "@/components/severityCard"
import { VulnerabilitiesGroup, monthsSchema, MONTHS_PARAM } from "@/components/VulnerabilitiesGroup"
import { VulnerabilitiesTable } from "@/components/VulnerabilitiesTable"
import type { RawVulnerability } from "@/components/VulnerabilitiesTable"
import { Button } from "@/components/Button"
import UturnLefIcon from '@/assets/uturnLeft.svg'

interface PackagePageProps {
    params: Promise<{
        name: string
        ecosystem: string
    }>
    searchParams: Promise<SearchParams>;
}

const paramsSchema = z.object({
    name: z.string().min(1),
    ecosystem: z.enum(['npm']),
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
    const rawQueryParams = await props.searchParams;

    const result = paramsSchema.safeParse(params)
    const queryParams = normalizeSearchParams(rawQueryParams, ["page", "limit"]);

    const resolvedQueryParams = ListPackagesParametersSchema.safeParse(queryParams);

    if (!result.success) {
        return notFound()
    }

    if (!resolvedQueryParams.success) {
        throw new Error(
            "Invalid query parameters." + JSON.stringify(resolvedQueryParams.error),
        );
    }

    const { name, ecosystem } = result.data

    const pathName = `/packages/${ecosystem}/${name}`

    const rawMonths = rawQueryParams[MONTHS_PARAM]
    const requestedMonths = Array.isArray(rawMonths) ? rawMonths[0] : rawMonths
    const months = monthsSchema.parse(requestedMonths ?? 'all')

    const packageDetails = await getPackageDetailsFetch({
        name,
        body: {
            ecosystem,
            vulnerabilityMonths: months,
            includeVulnerabilities: true,
            includeDescription: true,
            includeReferences: true,
            includeWithdrawn: true,
            withCurrentStatus: true,
            withSummary: true,
        }
    })

    if (packageDetails?.status === 404) {
        return notFound()
    }

    if (packageDetails?.status !== 200 || !packageDetails.document) {
        throw new Error("Failed to load package details")
    }

    const packageDocument = packageDetails.document

    const countsBySeverity = (packageDocument.summary as { by_severity?: Record<string, number> } | undefined)?.by_severity ?? {}
    const vulnerabilitiesByMonth = (packageDocument.vulnerabilities ?? {}) as Record<string, RawVulnerability[]>
    const affectedVersionsBySeverity: Record<string, number> = {}

    Object.values(vulnerabilitiesByMonth).flat().forEach((vulnerability) => {
        const key = vulnerability.severity?.toUpperCase() ?? ''
        affectedVersionsBySeverity[key] = (affectedVersionsBySeverity[key] ?? 0) + (vulnerability.affected?.length ?? 0)
    })

    const severities = Object.values(SEVERITY) as Severity[]

    const trend = Object.entries(vulnerabilitiesByMonth)
        .filter(([month]) => /^\d{4}-\d{2}$/.test(month))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, vulnerabilities]) => {
            const counts: Partial<Record<Severity, number>> = {}

            vulnerabilities.forEach((vulnerability) => {
                const key = vulnerability.severity?.toUpperCase() as Severity | undefined

                if (key && key in SEVERITY) {
                    counts[key] = (counts[key] ?? 0) + 1
                }
            })

            return { month, counts }
        })

    return (
        <PageLayout>
            <PageLayout.List>
                <PageLayout.List.SideMenu>
                    <Search>
                        <Search.Trigger />

                        <Search.Dialog />
                    </Search>

                    <NavigationPackageList
                        params={props.params}
                        queryParams={resolvedQueryParams.data}
                    />
                </PageLayout.List.SideMenu>

                <PageLayout.List.Details BreadcrumbsSlot={<Breadcrumbs pathName={pathName} />}>
                    <PageLayout.List.Details.Section
                        as="div"
                        display={{
                            default: 'flex',
                            lg: 'none'
                        }}
                    >
                        <Button.AsNextLink
                            href='/packages'
                            EndIconSlot={<UturnLefIcon />}
                            variant='outlined'
                        >
                            Go to packages list
                        </Button.AsNextLink>
                    </PageLayout.List.Details.Section>

                    <PageLayout.List.Details.Hero>
                        <Base
                            as="h1"
                            fontSize={{
                                default: pxToRem(28),
                                md: pxToRem(32)
                            }}
                            color={colors.text.accent}
                        >{name}</Base>

                        <Base
                            as="div"
                            display='flex'
                            alignItems='center'
                            gap={pxToRem(16)}
                            width='100%'
                        >
                            <Base as="p" fontSize={pxToRem(16)}>
                                Ecosystem: <strong>{ecosystem}</strong>
                            </Base>

                            <Base
                                as="span"
                                width={pxToRem(4)}
                                height={pxToRem(4)}
                                borderRadius="50%"
                                background={colors.text.tertiary}
                                opacity={0.8}
                            />

                            <Base as="p" fontSize={pxToRem(16)}>
                                Downloads: <strong>{normalizePopularity(packageDocument.popularity ?? 0)}</strong>
                            </Base>
                        </Base>
                    </PageLayout.List.Details.Hero>

                    <Base
                        width="100%"
                        height={pxToRem(1)}
                        background={colors.border.primary}
                    />

                    <VulnerabilitiesGroup
                        months={months}
                        trend={trend}
                        items={severities.map((severity) => ({
                            severity,
                            count: countsBySeverity[severity] ?? 0,
                            affectedVersions: affectedVersionsBySeverity[severity] ?? 0,
                        }))}
                    />

                    <VulnerabilitiesTable
                        packageName={name}
                        vulnerabilities={vulnerabilitiesByMonth}
                    />
                </PageLayout.List.Details>
            </PageLayout.List>
        </PageLayout>
    )
}