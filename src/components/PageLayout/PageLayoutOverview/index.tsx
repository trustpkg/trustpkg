import { PageLayoutOverviewCommonSection } from "./components/CommonSection/PageLayoutOverviewCommonSection";
import { PageLayoutOverviewHero } from "./components/Hero/PageLayoutOverviewHero";
import {
  PageLayoutOverviewMainColumn,
  PageLayoutOverviewSideColumn,
} from "./components/Columns/PageLayoutOverviewColumns";
import { PageLayoutOverviewRoot } from "./PageLayoutOverview";

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
