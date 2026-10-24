import PageLayout from "@/components/PageLayout";
import { notFound } from "next/navigation";
import {
  BLOG_ARTICLE_BY_SLUG,
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
} from "../blog.data";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(BLOG_ARTICLE_BY_SLUG).map((slug) => ({ slug }));
}

export async function generateMetadata(props: BlogArticlePageProps) {
  const { slug } = await props.params;
  const article = BLOG_ARTICLE_BY_SLUG[slug];

  if (!article) {
    return { title: "Article not found | trustpkg.dev" };
  }

  return {
    title: `${article.title} | trustpkg.dev`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage(props: BlogArticlePageProps) {
  const { slug } = await props.params;
  const article = BLOG_ARTICLE_BY_SLUG[slug];

  if (!article) {
    notFound();
  }

  const tableOfContents = article.sections.map(({ id, title }) => ({
    id,
    title,
  }));
  const relatedArticles = BLOG_ARTICLES.filter(
    (relatedArticle) => relatedArticle.slug !== article.slug,
  );

  return (
    <PageLayout>
      <PageLayout.BlogArticle>
        <PageLayout.BlogArticle.Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: article.category, href: "/blog" },
            { label: article.title },
          ]}
        />

        <PageLayout.BlogArticle.Header
          category={article.category}
          date={article.date}
          readingTime={article.readingTime}
          title={article.title}
          excerpt={article.excerpt}
          author={article.author}
          authorTitle={article.authorTitle}
        />

        <PageLayout.BlogArticle.TableOfContents
          items={tableOfContents}
          activeItem={tableOfContents[0]?.id}
        />

        <PageLayout.BlogArticle.MainContent>
          <PageLayout.BlogArticle.Cover
            src={article.imageSrc}
            alt={article.imageAlt}
          />
          {article.sections.map((section) => (
            <PageLayout.BlogArticle.Section
              key={section.id}
              id={section.id}
              title={section.title}
            >
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {section.callout && (
                <PageLayout.BlogArticle.Callout>
                  {section.callout}
                </PageLayout.BlogArticle.Callout>
              )}
            </PageLayout.BlogArticle.Section>
          ))}
        </PageLayout.BlogArticle.MainContent>

        <PageLayout.BlogArticle.SideColumn>
          <PageLayout.BlogArticle.SearchSlot />
          <PageLayout.BlogArticle.Categories
            categories={BLOG_CATEGORIES}
            activeCategory={article.category}
          />
          {relatedArticles.length > 0 && (
            <PageLayout.BlogArticle.RelatedArticles>
              {relatedArticles.map((relatedArticle) => (
                <PageLayout.BlogArticle.RelatedArticle
                  key={relatedArticle.slug}
                  href={`/blog/${relatedArticle.slug}`}
                  imageSrc={relatedArticle.imageSrc}
                  imageAlt={relatedArticle.imageAlt}
                  category={relatedArticle.category}
                  title={relatedArticle.title}
                  date={relatedArticle.date}
                  readingTime={relatedArticle.readingTime}
                />
              ))}
            </PageLayout.BlogArticle.RelatedArticles>
          )}
        </PageLayout.BlogArticle.SideColumn>
      </PageLayout.BlogArticle>
    </PageLayout>
  );
}
