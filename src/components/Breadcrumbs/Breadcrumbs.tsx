import { resolvePathName } from "./Breadcrumbs.utils"
import React from "react"
import styles from './Breadcrumbs.module.scss'
import Link from "next/link"
import { Base } from "../Base/Base"
import { pxToRem } from "@/utils/pxToRem"
import clsx from "clsx"
import { colors } from "@/theme/generated/colors.generated"


interface BreadcrumbsRootProps {
    pathName?: string
}

export function BreadcrumbsRoot(props: BreadcrumbsRootProps) {
    const { pathName = "" } = props

    const resolvedPathname = resolvePathName(pathName)

    return (
        <nav className={styles.breadcrumbs}>
            <ul className={styles.breadcrumbs_list}>
                {resolvedPathname
                    .map((chunk, index, array) => {
                        const { label, isLabelVisible, Icon, isActive, href } = chunk

                        const isLast = index === array.length - 1

                        const iconProps: React.ComponentProps<typeof Base> = {
                            asChild: true,
                            as: 'svg',
                            width: pxToRem(24),
                            height: pxToRem(24),
                        }

                        if (isActive && !isLast) {
                            return (
                                <React.Fragment key={label}>
                                    <li className={styles.breadcrumbs_item}>
                                        <Link className={styles.breadcrumbs_link} href={href}>
                                            {Icon && (
                                                <Base {...iconProps} fill={colors.text.primary}>
                                                    <Icon />
                                                </Base>
                                            )}

                                            {isLabelVisible && (
                                                <Base
                                                    as='p'
                                                    fontSize={pxToRem(17)}
                                                    color={isLast ? colors.text.button.secondary : colors.text.primary}>
                                                    {label}
                                                </Base>
                                            )}
                                        </Link>
                                    </li>

                                    {!isLast && (
                                        <li className={styles.breadcrumbs_dotSeparator} role='none' />
                                    )}
                                </React.Fragment>
                            )
                        }

                        return (
                            <React.Fragment key={label}>
                                <li className={styles.breadcrumbs_item}>
                                    {Icon && (
                                        <Base {...iconProps} fill={isLast ? colors.background.button.primary : colors.text.primary}>
                                            <Icon />
                                        </Base>
                                    )}

                                    {isLabelVisible && (
                                        <Base
                                            as='p'
                                            fontSize={pxToRem(17)}
                                            color={isLast ? colors.background.button.primary : colors.text.primary}
                                        >
                                            {label}
                                        </Base>
                                    )}
                                </li>

                                {!isLast && (
                                    <li className={styles.breadcrumbs_dotSeparator} role='none' />
                                )}
                            </React.Fragment>
                        )
                    })}
            </ul>
        </nav>
    )
}