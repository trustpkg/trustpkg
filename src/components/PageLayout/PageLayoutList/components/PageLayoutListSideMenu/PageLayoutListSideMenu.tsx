import React from "react";
import styles from './PageLayoutListSideMenu.module.scss'

interface PageLayoutListSideMenuProps extends React.PropsWithChildren { }

export function PageLayoutListSideMenu(props: PageLayoutListSideMenuProps) {
    const { children } = props

    return (
        <nav className={styles.pageLayoutSideMenu}>
            <div className={styles.pageLayoutSideMenu_content}>
                {children}
            </div>
        </nav>
    )
}