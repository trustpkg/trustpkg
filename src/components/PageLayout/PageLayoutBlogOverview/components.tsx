import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./PageLayoutBlogOverview.module.scss";

interface ChildrenProps extends React.PropsWithChildren {}

interface BlogOverviewHeaderProps extends ChildrenProps {
  title: string;
  description: string;
}

interface FeaturedArticleProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
}

interface ArticleCardProps {
  href?: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
}

interface CategoriesProps {
  categories: { name: string; count: number }[];
  activeCategory?: string;
}

interface LabelListProps {
  items: string[];
  activeItem?: string;
}

interface PaginationProps {
  pageCount: number;
  currentPage?: number;
}

export function PageLayoutBlogOverviewHeader(props: BlogOverviewHeaderProps) {
  const { children, title, description } = props;

  return (
    <header className={styles.blogOverview_header}>
      <div>
        <h1 className={styles.blogOverview_title}>{title}</h1>
        <p className={styles.blogOverview_description}>{description}</p>
      </div>
      {children}
    </header>
  );
}

export function PageLayoutBlogOverviewMainColumn(props: ChildrenProps) {
  return <main className={styles.blogOverview_main}>{props.children}</main>;
}

export function PageLayoutBlogOverviewSideColumn(props: ChildrenProps) {
  return <aside className={styles.blogOverview_sidebar}>{props.children}</aside>;
}

export function PageLayoutBlogOverviewSearchSlot(props: ChildrenProps) {
  return <div className={styles.blogOverview_searchSlot}>{props.children}</div>;
}

export function PageLayoutBlogOverviewFeaturedArticle(
  props: FeaturedArticleProps,
) {
  const {
    href,
    imageSrc,
    imageAlt,
    category,
    date,
    readingTime,
    title,
    excerpt,
    author,
  } = props;

  return (
    <article className={styles.blogOverview_featured}>
      <Link href={href} className={styles.blogOverview_featuredImageLink}>
        <Image
          className={styles.blogOverview_featuredImage}
          src={imageSrc}
          alt={imageAlt}
          width={900}
          height={520}
          priority
        />
      </Link>
      <div className={styles.blogOverview_featuredContent}>
        <div className={styles.blogOverview_articleMeta}>
          <span className={styles.blogOverview_category}>{category}</span>
          <span>{date}</span>
          <span>{readingTime}</span>
        </div>
        <h2 className={styles.blogOverview_featuredTitle}>
          <Link href={href}>{title}</Link>
        </h2>
        <p className={styles.blogOverview_excerpt}>{excerpt}</p>
        <div className={styles.blogOverview_featuredFooter}>
          <span className={styles.blogOverview_author}>{author}</span>
          <Link href={href} className={styles.blogOverview_readLink}>
            Read article <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PageLayoutBlogOverviewSectionHeading(props: ChildrenProps) {
  return <div className={styles.blogOverview_sectionHeading}>{props.children}</div>;
}

export function PageLayoutBlogOverviewArticleGrid(props: ChildrenProps) {
  return <div className={styles.blogOverview_articleGrid}>{props.children}</div>;
}

export function PageLayoutBlogOverviewArticleCard(props: ArticleCardProps) {
  const {
    href,
    imageSrc,
    imageAlt,
    category,
    date,
    readingTime,
    title,
    excerpt,
    author,
  } = props;
  const content = (
    <>
      <Image
        className={styles.blogOverview_cardImage}
        src={imageSrc}
        alt={imageAlt}
        width={480}
        height={280}
      />
      <div className={styles.blogOverview_cardContent}>
        <div className={styles.blogOverview_articleMeta}>
          <span className={styles.blogOverview_category}>{category}</span>
          <span>{date}</span>
          <span>{readingTime}</span>
        </div>
        <h3 className={styles.blogOverview_cardTitle}>{title}</h3>
        <p className={styles.blogOverview_cardExcerpt}>{excerpt}</p>
        <div className={styles.blogOverview_cardFooter}>
          <span className={styles.blogOverview_author}>{author}</span>
          {href ? (
            <span className={styles.blogOverview_readLink}>
              Read article <span aria-hidden="true">→</span>
            </span>
          ) : (
            <span className={styles.blogOverview_comingSoon}>Coming soon</span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <article className={styles.blogOverview_articleCard}>
      {href ? (
        <Link href={href} className={styles.blogOverview_cardLink}>
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}

export function PageLayoutBlogOverviewCategories(props: CategoriesProps) {
  const { categories, activeCategory } = props;

  return (
    <section className={styles.blogOverview_panel}>
      <h2 className={styles.blogOverview_panelTitle}>Categories</h2>
      <ul className={styles.blogOverview_categoryList}>
        {categories.map(({ name, count }) => (
          <li key={name}>
            <span
              className={
                name === activeCategory
                  ? styles.blogOverview_categoryActive
                  : undefined
              }
            >
              <span>{name}</span>
              <span>{count}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PageLayoutBlogOverviewSortTabs(props: LabelListProps) {
  const { items, activeItem } = props;

  return (
    <div className={styles.blogOverview_sortTabs} aria-label="Article order">
      {items.map((item) => (
        <span
          key={item}
          className={
            item === activeItem ? styles.blogOverview_sortActive : undefined
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function PageLayoutBlogOverviewPagination(props: PaginationProps) {
  const { pageCount, currentPage = 1 } = props;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className={styles.blogOverview_pagination} aria-label="Article pages">
      <span className={styles.blogOverview_pageDisabled}>Previous</span>
      {pages.map((page) => (
        <span
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage ? styles.blogOverview_pageActive : undefined
          }
        >
          {page}
        </span>
      ))}
      <span>Next</span>
    </nav>
  );
}
