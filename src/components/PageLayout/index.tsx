import { PageLayoutRoot } from "./PageLayout";
import PageLayoutList from "./PageLayoutList";
import PageLayoutOverview from "./PageLayoutOverview";
import PageLayoutBlogArticle from "./PageLayoutBlogArticle";
import PageLayoutBlogOverview from "./PageLayoutBlogOverview";

interface PageLayoutSubcomponents {
  Overview: typeof PageLayoutOverview;
  List: typeof PageLayoutList;
  BlogOverview: typeof PageLayoutBlogOverview;
  BlogArticle: typeof PageLayoutBlogArticle;
}

const PageLayout = PageLayoutRoot as typeof PageLayoutRoot &
  PageLayoutSubcomponents;

PageLayout.Overview = PageLayoutOverview;
PageLayout.List = PageLayoutList;
PageLayout.BlogOverview = PageLayoutBlogOverview;
PageLayout.BlogArticle = PageLayoutBlogArticle;

export default PageLayout;
