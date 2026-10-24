import {
  PageLayoutBlogArticleBreadcrumbs,
  PageLayoutBlogArticleCallout,
  PageLayoutBlogArticleCategories,
  PageLayoutBlogArticleCover,
  PageLayoutBlogArticleHeader,
  PageLayoutBlogArticleMainContent,
  PageLayoutBlogArticleRelatedArticle,
  PageLayoutBlogArticleRelatedArticles,
  PageLayoutBlogArticleSearchSlot,
  PageLayoutBlogArticleSection,
  PageLayoutBlogArticleSideColumn,
  PageLayoutBlogArticleTableOfContents,
} from "./components";
import { PageLayoutBlogArticleRoot } from "./PageLayoutBlogArticle";

interface PageLayoutBlogArticleSubcomponents {
  Breadcrumbs: typeof PageLayoutBlogArticleBreadcrumbs;
  Header: typeof PageLayoutBlogArticleHeader;
  TableOfContents: typeof PageLayoutBlogArticleTableOfContents;
  MainContent: typeof PageLayoutBlogArticleMainContent;
  Cover: typeof PageLayoutBlogArticleCover;
  Section: typeof PageLayoutBlogArticleSection;
  SideColumn: typeof PageLayoutBlogArticleSideColumn;
  SearchSlot: typeof PageLayoutBlogArticleSearchSlot;
  Categories: typeof PageLayoutBlogArticleCategories;
  RelatedArticles: typeof PageLayoutBlogArticleRelatedArticles;
  RelatedArticle: typeof PageLayoutBlogArticleRelatedArticle;
  Callout: typeof PageLayoutBlogArticleCallout;
}

const PageLayoutBlogArticle =
  PageLayoutBlogArticleRoot as typeof PageLayoutBlogArticleRoot &
    PageLayoutBlogArticleSubcomponents;

PageLayoutBlogArticle.Breadcrumbs = PageLayoutBlogArticleBreadcrumbs;
PageLayoutBlogArticle.Header = PageLayoutBlogArticleHeader;
PageLayoutBlogArticle.TableOfContents = PageLayoutBlogArticleTableOfContents;
PageLayoutBlogArticle.MainContent = PageLayoutBlogArticleMainContent;
PageLayoutBlogArticle.Cover = PageLayoutBlogArticleCover;
PageLayoutBlogArticle.Section = PageLayoutBlogArticleSection;
PageLayoutBlogArticle.SideColumn = PageLayoutBlogArticleSideColumn;
PageLayoutBlogArticle.SearchSlot = PageLayoutBlogArticleSearchSlot;
PageLayoutBlogArticle.Categories = PageLayoutBlogArticleCategories;
PageLayoutBlogArticle.RelatedArticles = PageLayoutBlogArticleRelatedArticles;
PageLayoutBlogArticle.RelatedArticle = PageLayoutBlogArticleRelatedArticle;
PageLayoutBlogArticle.Callout = PageLayoutBlogArticleCallout;

export default PageLayoutBlogArticle;
