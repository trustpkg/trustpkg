"use client";

import { Drawer, Portal } from "@ark-ui/react";
import React from "react";
import { PageLayoutListSideMenuContext } from "../PageLayoutListSideMenu.provider";
import { useResponsiveProp } from "@/responsive/hooks/useResponsive";
import styles from './PageLayoutListSideMenuDrawer.module.scss'
import { NavigationDrawerHeader } from "@/components/Navigation/NavigationDrawer/components/Header/NavigationDrawerHeader";
import { CurrentTheme } from "@/theme/generated/themes.generated.types";

interface PageLayoutListSideMenuDrawerProps {
    logoSrc: string;
    theme: CurrentTheme;
}


export function PageLayoutListSideMenuDrawer(props: PageLayoutListSideMenuDrawerProps) {
    const { logoSrc, theme } = props

    const { isOpen, setIsOpen } = React.useContext(PageLayoutListSideMenuContext)

    const shouldRender = useResponsiveProp({
        default: true,
        lg: false
    })

    if (!shouldRender) {
        return null
    }

    return (
        <Drawer.Root
            open={isOpen}
            onOpenChange={(details) => setIsOpen?.(details.open)}
        >
            <Portal>
                <Drawer.Backdrop className={styles.pageLayoutListSideMenuDrawer_backdrop} />
                <Drawer.Positioner className={styles.pageLayoutListSideMenuDrawer}>
                    <Drawer.Content className={styles.pageLayoutListSideMenuDrawer_content}>
                        <NavigationDrawerHeader logoSrc={logoSrc} theme={theme} />
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}
