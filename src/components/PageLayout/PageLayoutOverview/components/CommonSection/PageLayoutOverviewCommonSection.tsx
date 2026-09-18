import clsx from "clsx";
import styles from "../../PageLayoutOverview.module.scss";
import {
  PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_BORDER_VARIANT,
  PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT,
} from "../../PageLayoutOverview.constants";
import type { PageLayoutOverviewCommonSectionProps } from "../../PageLayoutOverview.types";

export function PageLayoutOverviewCommonSection(
  props: PageLayoutOverviewCommonSectionProps,
) {
  const {
    children,
    borderVariant,
    id,
    paddingVariant = PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT.MEDIUM,
    className,
  } = props;

  return (
    <section
      className={clsx(
        styles.pageOverview_commonSection,
        {
          [styles.pageOverview_commonSection__outline]:
            borderVariant ===
            PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_BORDER_VARIANT.OUTLINE,
          [styles.pageOverview_commonSection__smallPadding]:
            paddingVariant ===
            PAGE_LAYOUT_OVERVIEW_COMMON_SECTION_PADDING_VARIANT.SMALL,
        },
        className,
      )}
      id={id}
    >
      {children}
    </section>
  );
}
