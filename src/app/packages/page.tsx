import { ListPackagesParametersSchema } from "@/api/parameters"
import { Base } from "@/components/Base/Base"
import Breadcrumbs from "@/components/Breadcrumbs"
import PageLayout from "@/components/PageLayout"
import Search from "@/components/Search"
import { colors } from "@/theme/generated/colors.generated"
import { normalizeSearchParams } from "@/utils/normalizeSearchParams"
import { pxToRem } from "@/utils/pxToRem"
import { SearchParams } from "next/dist/server/request/search-params"
import Image from "next/image"
import { NavigationPackageList } from "./components/NavigationPackageList/NavigationPackageList"
import styles from './page.module.scss'

interface PackageListPageProps {
    searchParams: Promise<SearchParams>;
}

export const metadata = {
    title: `packages list | trustpkg.dev`,
    description: "package list page"
}

export default async function PackageListPage(props: PackageListPageProps) {
    const rawQueryParams = await props.searchParams;

    const queryParams = normalizeSearchParams(rawQueryParams, ["page", "limit"]);

    const resolvedQueryParams = ListPackagesParametersSchema.safeParse(queryParams);

    if (!resolvedQueryParams.success) {
        throw new Error(
            "Invalid query parameters." + JSON.stringify(resolvedQueryParams.error),
        );
    }

    const pathName = `/packages`

    return (
        <PageLayout>
            <PageLayout.List>
                <PageLayout.List.SideMenu>
                    <Search>
                        <Search.Trigger />

                        <Search.Dialog />
                    </Search>

                    <NavigationPackageList
                        params={Promise.resolve({})}
                        queryParams={resolvedQueryParams.data}
                    />
                </PageLayout.List.SideMenu>

                <PageLayout.List.Details BreadcrumbsSlot={<Breadcrumbs pathName={pathName} />}>
                    <PageLayout.List.Details.Hero
                        display={{
                            default: 'none',
                            lg: 'flex'
                        }}
                        alignItems="center"
                    >
                        <Base
                            as="h1"
                            fontSize={pxToRem(40)}
                            color={colors.text.accent}
                        >
                            You not selected any package yet.
                        </Base>

                        <Base
                            as="p"
                            fontSize={pxToRem(20)}
                        >
                            Please select a package from the list to see its details.
                        </Base>

                        <Image
                            className={styles.image}
                            priority
                            src="/not-selected.png"
                            width={1536}
                            height={1024}
                            alt=""
                        />
                    </PageLayout.List.Details.Hero>

                    <PageLayout.List.Details.Hero
                        display={{
                            default: 'flex',
                            lg: 'none'
                        }}
                        alignItems="center"
                    >
                        <Base
                            as="h1"
                            fontSize={pxToRem(36)}
                            color={colors.text.accent}
                        >
                            Find your package
                        </Base>

                        <Search>
                            <Search.Trigger />

                            <Search.Dialog />
                        </Search>

                        <NavigationPackageList
                            params={Promise.resolve({})}
                            queryParams={resolvedQueryParams.data}
                        />
                    </PageLayout.List.Details.Hero>
                </PageLayout.List.Details>
            </PageLayout.List>
        </PageLayout>
    )
}