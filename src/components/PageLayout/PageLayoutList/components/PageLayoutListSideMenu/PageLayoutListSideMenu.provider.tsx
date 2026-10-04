'use client'

import React from "react"

interface PageLayoutListSideMenuContextType {
    isOpen?: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageLayoutListSideMenuContext = React.createContext<PageLayoutListSideMenuContextType>({ isOpen: false })

interface PageLayoutListSideMenuProviderProps extends React.PropsWithChildren { }

export function PageLayoutListSideMenuProvider(props: PageLayoutListSideMenuProviderProps) {
    const { children } = props

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <PageLayoutListSideMenuContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </PageLayoutListSideMenuContext.Provider>
    )
}