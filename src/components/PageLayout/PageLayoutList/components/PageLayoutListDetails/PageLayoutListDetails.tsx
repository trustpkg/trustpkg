import React from "react";
import styles from './PageLayoutListDetails.module.scss'

interface PageLayoutListDetailsRootProps extends React.PropsWithChildren {
    BreadcrumbsSlot?: React.ReactNode
}

export function PageLayoutListDetailsRoot(props: PageLayoutListDetailsRootProps) {
    const { children, BreadcrumbsSlot } = props

    return (
        <div className={styles.pageLayoutDetails}>
            <div className={styles.pageLayoutDetails_contentWrapper}>
                {Boolean(BreadcrumbsSlot) && (
                    <div className={styles.pageLayoutDetails_breadcrumbsWrapper}>
                        {BreadcrumbsSlot}
                    </div>
                )}

                <div className={styles.pageLayoutDetails_content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

interface PageLayoutListDetailsHeroProps extends React.PropsWithChildren { }

export function PageLayoutListDetailsHero(props: PageLayoutListDetailsHeroProps) {
    const { children } = props

    return <header className={styles.pageLayoutDetails_hero}>{children}</header>
}