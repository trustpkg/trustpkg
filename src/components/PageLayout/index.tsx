import { PageLayoutRoot } from "./PageLayout";
import { PageLayoutList } from "./PageLayoutList/PageLayoutList";
import PageLayoutOverview from "./PageLayoutOverview";

interface PageLayoutSubcomponents {
  Overview: typeof PageLayoutOverview;
  List: typeof PageLayoutList;
}

const PageLayout = PageLayoutRoot as typeof PageLayoutRoot &
  PageLayoutSubcomponents;

PageLayout.Overview = PageLayoutOverview;
PageLayout.List = PageLayoutList;

export default PageLayout;
