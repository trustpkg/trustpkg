"use client";

import React from "react";

import ClockIcon from "@/assets/clock.svg";
import { Base } from "@/components/Base/Base";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import styles from '../..//NavigationPackageList.module.scss';
import { useRecentPackages } from "./LastVisitedPackages.hooks";
import { LastVisitedPackagesProps } from "./LastVisitedPackages.types";
import { formatTimeAgo } from "./LastVisitedPackages.utils";

export function LastVisitedPackages(props: LastVisitedPackagesProps) {
    const { fallback, ...rest } = props

    const { recentPages } = useRecentPackages(rest)

    const isHydrated = React.useSyncExternalStore(
        () => () => { },
        () => true,
        () => false,
    )

    if (!isHydrated) {
        return fallback
    }

    if (recentPages.length === 0) {
        return <p className={styles.navigationPackageList_link}>No visited packages yet</p>
    }

    return (
        <ul className={styles.navigationPackageList_list}>
            {recentPages.map((item) => (
                <li key={item.url}>
                    <a href={item.url} className={styles.navigationPackageList_link}>
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
                                <ClockIcon />
                            </Base>

                            <span>
                                {formatTimeAgo(new Date(item.date ?? ''))}
                            </span>
                        </Base>
                    </a>
                </li>
            ))}
        </ul>
    );
}