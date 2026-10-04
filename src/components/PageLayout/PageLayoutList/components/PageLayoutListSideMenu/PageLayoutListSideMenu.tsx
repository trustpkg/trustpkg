import React from "react";
import styles from './PageLayoutListSideMenu.module.scss'
import { PageLayoutListSideMenuDrawer } from "./PageLayoutListSideMenuDrawer/PageLayoutListSideMenuDrawer.client";
import { CurrentTheme } from "@/theme/generated/themes.generated.types";

const logoSrcByTheme = {
    light: "/trustpkg-coin.png",
    dark: "/trustpkg-coin-light.png",
};

interface PageLayoutListSideMenuProps extends React.PropsWithChildren {
    theme: CurrentTheme;

}

export function PageLayoutListSideMenu(props: PageLayoutListSideMenuProps) {
    const { children, theme } = props

    return (
        <>
            <nav className={styles.pageLayoutSideMenu}>
                <div className={styles.pageLayoutSideMenu_content}>
                    {children}
                </div>

            </nav>

            <PageLayoutListSideMenuDrawer logoSrc={logoSrcByTheme[theme]} theme={theme} />
        </>
    )
}