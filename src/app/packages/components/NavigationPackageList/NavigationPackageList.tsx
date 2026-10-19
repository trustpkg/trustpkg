import { ListPackagesParameters } from '@/api/parameters'
import React from 'react'
import styles from './NavigationPackageList.module.scss'
import { getPackagesFetch } from '@/api/getPackagesFetch'
import { normalizePopularity } from '@/utils/normalizePopularity'
import { LastVisitedPackages } from './components/LastVisitedPackages/LastVisitedPackages.client'
import { Base } from '@/components/Base/Base'
import { pxToRem } from '@/utils/pxToRem'
import { colors } from '@/theme/generated/colors.generated'
import DownloadIcon from '@/assets/download.svg'
import Link from 'next/link'

const PACKAGE_LIST_LIMIT = 40

interface NavigationPackageListProps {
    queryParams: ListPackagesParameters
    params: Promise<{
        ecosystem?: string
        name?: string
    }>
}

interface SkeletonProps {
    count?: number
}

function Skeleton(props: SkeletonProps) {
    const { count = PACKAGE_LIST_LIMIT } = props

    return (
        <ul className={styles.navigationPackageList_list}>
            {Array.from({ length: count }).map((_, index) => (
                <li key={index} className={styles.navigationPackageList_skeletonItem}>
                    <div className={styles.navigationPackageList_skeletonName} />
                    <div className={styles.navigationPackageList_skeletonPopularity} />
                </li>
            ))}
        </ul>
    )
}

export async function NavigationPackageList(props: NavigationPackageListProps) {
    const { queryParams } = props
    const { ecosystem = 'npm', name } = await props.params

    const packagesList = await getPackagesFetch({
        queryParams: queryParams,
        options: {
            limit: PACKAGE_LIST_LIMIT
        }
    });

    if (packagesList?.status !== 200) {
        throw new Error(
            "Something gone wrong"
        )
    }

    return (
        <div className={styles.navigationPackageList}>
            <section className={styles.navigationPackageList_section}>
                <Base
                    as='h2'
                    fontSize={pxToRem(18)}
                    color={colors.text.tertiary}
                >
                    Popular Packages ({ecosystem})
                </Base>

                <React.Suspense fallback={<Skeleton />}>
                    <ul className={styles.navigationPackageList_list}>
                        {packagesList.documents?.map((item) => {

                            const Component: React.ElementType = item.name === name ? 'span' : Link

                            const propsByComponent = item.name === name
                                ? {
                                    className: styles.navigationPackageList_currentPackage
                                }
                                : {
                                    href: `/packages/${ecosystem}/${item.slug}`,
                                    className: styles.navigationPackageList_link,
                                    prefetch: true,
                                }

                            return (
                                <li key={item.id}>
                                    <Component {...propsByComponent}>
                                        <span>
                                            {item.name}
                                        </span>

                                        <Base
                                            as='span'
                                            display='flex'
                                            alignItems='center'
                                            gap={pxToRem(4)}
                                            color={colors.text.tertiary}
                                            whiteSpace='nowrap'
                                        >
                                            <Base
                                                as='svg'
                                                asChild
                                                width={pxToRem(18)}
                                                height={pxToRem(18)}
                                            >
                                                <DownloadIcon />
                                            </Base>

                                            <span>
                                                {normalizePopularity(item.popularity)}
                                            </span>
                                        </Base>
                                    </Component>
                                </li>
                            )
                        })}
                    </ul>
                </React.Suspense>
            </section>

            <Base
                as='span'
                display='block'
                width="100%"
                height={pxToRem(1)}
                background={colors.border.primary}
            />

            <section className={styles.navigationPackageList_section}>
                <Base
                    as='h2'
                    fontSize={pxToRem(18)}
                    color={colors.text.tertiary}
                >
                    Last Visited Packages
                </Base>

                <LastVisitedPackages
                    fallback={<Skeleton count={8} />}
                    name={name}
                    ecosystem={name ? ecosystem : undefined}
                    url={`/packages/${ecosystem}/${name}`}
                />
            </section>
        </div>
    )
}