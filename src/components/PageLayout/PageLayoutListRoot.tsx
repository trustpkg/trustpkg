import { pxToRem } from "@/utils/pxToRem";
import Navigation from "../Navigation";
import { PageLayoutComponentProps, PageLayoutRootComponent } from "./PageLayoutBase";

export function PageLayoutListRoot(props: PageLayoutComponentProps) {
    const { children } = props;

    return (
        <PageLayoutRootComponent
            NavigationSlot={
                <Navigation
                />
            }
            contentContainerPadding={{
                default: pxToRem(16),
                md: pxToRem(16),
                lg: `0 ${pxToRem(32)}`
            }}
            isListVariant={true}
        >
            {children}
        </PageLayoutRootComponent>
    )
}