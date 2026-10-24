import PageLayout from "@/components/PageLayout";
import {
  BLOG_CATEGORIES,
  PRACTICAL_CODE_SECURITY,
  UNDERSTANDING_PACKAGE_SECURITY,
} from "./blog.data";

export const metadata = {
  title: "Blog | trustpkg.dev",
  description:
    "Insights about package security, vulnerability trends, and the open source ecosystem.",
};

export default function BlogOverviewPage() {
  return (
    <PageLayout>
      <PageLayout.BlogOverview>
        <PageLayout.BlogOverview.Header
          title="TrustPkg Blog"
          description="Insights about package security, vulnerability trends, and the open source ecosystem."
        />

        <PageLayout.BlogOverview.MainColumn>
          <PageLayout.BlogOverview.FeaturedArticle
            href={`/blog/${UNDERSTANDING_PACKAGE_SECURITY.slug}`}
            imageSrc={UNDERSTANDING_PACKAGE_SECURITY.imageSrc}
            imageAlt={UNDERSTANDING_PACKAGE_SECURITY.imageAlt}
            category={UNDERSTANDING_PACKAGE_SECURITY.category}
            date={UNDERSTANDING_PACKAGE_SECURITY.date}
            readingTime={UNDERSTANDING_PACKAGE_SECURITY.readingTime}
            title={UNDERSTANDING_PACKAGE_SECURITY.title}
            excerpt={UNDERSTANDING_PACKAGE_SECURITY.excerpt}
            author={UNDERSTANDING_PACKAGE_SECURITY.author}
          />
          <PageLayout.BlogOverview.SectionHeading>
            <h2>More articles</h2>
          </PageLayout.BlogOverview.SectionHeading>
          <PageLayout.BlogOverview.ArticleCard
            href={`/blog/${PRACTICAL_CODE_SECURITY.slug}`}
            imageSrc={PRACTICAL_CODE_SECURITY.imageSrc}
            imageAlt={PRACTICAL_CODE_SECURITY.imageAlt}
            category={PRACTICAL_CODE_SECURITY.category}
            date={PRACTICAL_CODE_SECURITY.date}
            readingTime={PRACTICAL_CODE_SECURITY.readingTime}
            title={PRACTICAL_CODE_SECURITY.title}
            excerpt={PRACTICAL_CODE_SECURITY.excerpt}
            author={PRACTICAL_CODE_SECURITY.author}
          />
        </PageLayout.BlogOverview.MainColumn>

        <PageLayout.BlogOverview.SideColumn>
          <PageLayout.BlogOverview.SearchSlot />
          <PageLayout.BlogOverview.Categories
            categories={BLOG_CATEGORIES}
            activeCategory="Package security"
          />
        </PageLayout.BlogOverview.SideColumn>
      </PageLayout.BlogOverview>
    </PageLayout>
  );
}