import {
  PageLayoutOverviewRoot,
  PageLayoutOverviewHero,
  PageLayoutOverviewSideColumn,
  PageLayoutOverviewMainColumn,
} from "./PageLayoutOverview";

interface PageLayoutOverviewComponent {
  Hero: typeof PageLayoutOverviewHero;
  SideColumn: typeof PageLayoutOverviewSideColumn;
  MainColumn: typeof PageLayoutOverviewMainColumn;
}

const PageLayoutOverview =
  PageLayoutOverviewRoot as typeof PageLayoutOverviewRoot &
    PageLayoutOverviewComponent;

PageLayoutOverview.Hero = PageLayoutOverviewHero;
PageLayoutOverview.SideColumn = PageLayoutOverviewSideColumn;
PageLayoutOverview.MainColumn = PageLayoutOverviewMainColumn;

export default PageLayoutOverview;
