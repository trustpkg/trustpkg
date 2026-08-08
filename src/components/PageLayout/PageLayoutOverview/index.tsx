import {
  PageLayoutOverviewCommonSection,
  PageLayoutOverviewHero,
  PageLayoutOverviewMainColumn,
  PageLayoutOverviewRoot,
  PageLayoutOverviewSideColumn,
} from "./PageLayoutOverview";

interface PageLayoutOverviewComponent {
  Hero: typeof PageLayoutOverviewHero;
  SideColumn: typeof PageLayoutOverviewSideColumn;
  MainColumn: typeof PageLayoutOverviewMainColumn;
  CommonSection: typeof PageLayoutOverviewCommonSection;
}

const PageLayoutOverview =
  PageLayoutOverviewRoot as typeof PageLayoutOverviewRoot &
    PageLayoutOverviewComponent;

PageLayoutOverview.Hero = PageLayoutOverviewHero;
PageLayoutOverview.SideColumn = PageLayoutOverviewSideColumn;
PageLayoutOverview.MainColumn = PageLayoutOverviewMainColumn;
PageLayoutOverview.CommonSection = PageLayoutOverviewCommonSection;

export default PageLayoutOverview;
