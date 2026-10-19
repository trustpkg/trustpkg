import { Base } from "@/components/Base/Base";
import styles from './PageLayoutListDetails.module.scss';
import { PageLayoutListDetailsHeroProps, PageLayoutListDetailsRootProps, PageLayoutListDetailsSectionProps } from "./PageLayoutListDetails.types";
import { resolveProps } from "@/responsive/utils/resolveProps";
import { pxToRem } from "@/utils/pxToRem";



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


export function PageLayoutListDetailsHero(props: PageLayoutListDetailsHeroProps) {
    const { stylesProps, rest } = resolveProps(props)
    const { display = 'flex', gap = pxToRem(16), flexDirection = 'column', } = stylesProps
    const { children } = rest

    const restStylesProps = {
        display,
        gap,
        flexDirection
    }

    return (
        <Base
            {...stylesProps}
            {...restStylesProps}
            as="header"
        >
            {children}
        </Base>
    )
}

export function PageLayoutListDetailsSection(props: PageLayoutListDetailsSectionProps) {
    const { stylesProps, rest } = resolveProps(props)
    const { display = 'flex', gap = pxToRem(16), flexDirection = 'column', } = stylesProps
    const { as = 'section', children } = rest

    const restStylesProps = {
        display,
        gap,
        flexDirection
    }

    return (
        <Base
            {...stylesProps}
            {...restStylesProps}
            as={as}
        >
            {children}
        </Base>
    )
}