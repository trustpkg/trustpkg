import Navigation from "../Navigation";
import { PageLayoutRootComponent, PageLayoutComponentProps } from "./PageLayoutBase";
import { PageLayoutListSideMenuAction, PageLayoutListSideMenuProvider } from "./PageLayoutList";
import { pxToRem } from "@/utils/pxToRem";

export function PageLayoutListRoot(props: PageLayoutComponentProps) {
    const { children } = props;

    return (
        <PageLayoutRootComponent
            NavigationSlot={
                <Navigation
                    ActionSlot={<PageLayoutListSideMenuAction />}
                />
            }
            WrapperSlot={PageLayoutListSideMenuProvider}
            contentContainerPadding={{
                default: pxToRem(16),
                md: pxToRem(32),
                lg: `0 ${pxToRem(32)}`
            }}
            isListVariant={true}
        >
            {children}
        </PageLayoutRootComponent>
    )
}