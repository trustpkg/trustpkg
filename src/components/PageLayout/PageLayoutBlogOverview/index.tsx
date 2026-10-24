import {
  PageLayoutBlogOverviewArticleCard,
  PageLayoutBlogOverviewArticleGrid,
  PageLayoutBlogOverviewCategories,
  PageLayoutBlogOverviewFeaturedArticle,
  PageLayoutBlogOverviewHeader,
  PageLayoutBlogOverviewMainColumn,
  PageLayoutBlogOverviewPagination,
  PageLayoutBlogOverviewSearchSlot,
  PageLayoutBlogOverviewSectionHeading,
  PageLayoutBlogOverviewSideColumn,
  PageLayoutBlogOverviewSortTabs,
} from "./components";
import { PageLayoutBlogOverviewRoot } from "./PageLayoutBlogOverview";

interface PageLayoutBlogOverviewSubcomponents {
  Header: typeof PageLayoutBlogOverviewHeader;
  MainColumn: typeof PageLayoutBlogOverviewMainColumn;
  SideColumn: typeof PageLayoutBlogOverviewSideColumn;
  SearchSlot: typeof PageLayoutBlogOverviewSearchSlot;
  FeaturedArticle: typeof PageLayoutBlogOverviewFeaturedArticle;
  SectionHeading: typeof PageLayoutBlogOverviewSectionHeading;
  ArticleGrid: typeof PageLayoutBlogOverviewArticleGrid;
  ArticleCard: typeof PageLayoutBlogOverviewArticleCard;
  Categories: typeof PageLayoutBlogOverviewCategories;
  SortTabs: typeof PageLayoutBlogOverviewSortTabs;
  Pagination: typeof PageLayoutBlogOverviewPagination;
}

const PageLayoutBlogOverview =
  PageLayoutBlogOverviewRoot as typeof PageLayoutBlogOverviewRoot &
    PageLayoutBlogOverviewSubcomponents;

PageLayoutBlogOverview.Header = PageLayoutBlogOverviewHeader;
PageLayoutBlogOverview.MainColumn = PageLayoutBlogOverviewMainColumn;
PageLayoutBlogOverview.SideColumn = PageLayoutBlogOverviewSideColumn;
PageLayoutBlogOverview.SearchSlot = PageLayoutBlogOverviewSearchSlot;
PageLayoutBlogOverview.FeaturedArticle = PageLayoutBlogOverviewFeaturedArticle;
PageLayoutBlogOverview.SectionHeading = PageLayoutBlogOverviewSectionHeading;
PageLayoutBlogOverview.ArticleGrid = PageLayoutBlogOverviewArticleGrid;
PageLayoutBlogOverview.ArticleCard = PageLayoutBlogOverviewArticleCard;
PageLayoutBlogOverview.Categories = PageLayoutBlogOverviewCategories;
PageLayoutBlogOverview.SortTabs = PageLayoutBlogOverviewSortTabs;
PageLayoutBlogOverview.Pagination = PageLayoutBlogOverviewPagination;

export default PageLayoutBlogOverview;
