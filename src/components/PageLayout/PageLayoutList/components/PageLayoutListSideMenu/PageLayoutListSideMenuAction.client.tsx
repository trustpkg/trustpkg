'use client'

import React from "react"
import { PageLayoutListSideMenuContext } from "./PageLayoutListSideMenu.provider"
import { Button, IconButton } from "@/components/Button"
import GlassIcon from "@/assets/glass.svg";
import { useResponsiveProp } from "@/responsive/hooks/useResponsive";


export function PageLayoutListSideMenuAction() {
    const { isOpen, setIsOpen } = React.useContext(PageLayoutListSideMenuContext)

    const isIconButton = useResponsiveProp({
        default: true,
        sm: false
    })

    const handleActionClick = () => {
        setIsOpen?.((prev) => !prev)
    }

    if (isIconButton) {
        return (
            <IconButton.AsButton
                label={isOpen ? "Close search menu" : "Open search menu"}
                onClick={handleActionClick}
                variant="filled"
            >
                <GlassIcon />
            </IconButton.AsButton>
        )
    }

    return (
        <Button.AsButton
            onClick={handleActionClick}
            display={{
                default: 'flex',
                lg: 'none !important'
            }}
            size="small"
            StartIconSlot={<GlassIcon />}
        >
            search
        </Button.AsButton>
    )
}