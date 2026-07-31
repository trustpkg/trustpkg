import { PageLayoutOverview } from "./PageLayoutOverview/PageLayoutOverview";
import { PageLayoutList } from "./PageLayoutList/PageLayoutList";
import { PageLayoutRoot } from "./PageLayout";

interface PageLayoutSubcomponents {
  Overview: typeof PageLayoutOverview;
  List: typeof PageLayoutList;
}

const PageLayout = PageLayoutRoot as typeof PageLayoutRoot &
  PageLayoutSubcomponents;

PageLayout.Overview = PageLayoutOverview;
PageLayout.List = PageLayoutList;

export default PageLayout;
