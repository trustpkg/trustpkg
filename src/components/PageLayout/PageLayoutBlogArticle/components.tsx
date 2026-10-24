import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./PageLayoutBlogArticle.module.scss";

interface ChildrenProps extends React.PropsWithChildren {}

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

interface TableOfContentsProps {
  items: { id: string; title: string }[];
  activeItem?: string;
}

interface ArticleHeaderProps {
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
  authorTitle: string;
}

interface CoverProps {
  src: string;
  alt: string;
}

interface SectionProps extends ChildrenProps {
  id: string;
  title: string;
}

interface CategoriesProps {
  categories: { name: string; count: number }[];
  activeCategory?: string;
}

interface RelatedArticleProps {
  href?: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  date: string;
  readingTime: string;
}

export function PageLayoutBlogArticleBreadcrumbs(props: BreadcrumbsProps) {
  const { items } = props;

  return (
    <nav className={styles.blogArticle_breadcrumbs} aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map(({ label, href }) => (
        <span key={label} className={styles.blogArticle_breadcrumbItem}>
          <span aria-hidden="true">›</span>
          {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageLayoutBlogArticleHeader(props: ArticleHeaderProps) {
  const { category, date, readingTime, title, excerpt, author, authorTitle } =
    props;

  return (
    <header className={styles.blogArticle_header}>
      <div className={styles.blogArticle_meta}>
        <span className={styles.blogArticle_category}>{category}</span>
        <span>{date}</span>
        <span>{readingTime}</span>
      </div>
      <h1 className={styles.blogArticle_title}>{title}</h1>
      <p className={styles.blogArticle_excerpt}>{excerpt}</p>
      <div className={styles.blogArticle_author}>
        <Image
          src="/trustpkg-coin.png"
          alt=""
          width={40}
          height={40}
          className={styles.blogArticle_authorAvatar}
        />
        <span>
          <strong>{author}</strong>
          <span>{authorTitle}</span>
        </span>
      </div>
    </header>
  );
}

export function PageLayoutBlogArticleTableOfContents(
  props: TableOfContentsProps,
) {
  const { items, activeItem } = props;

  return (
    <nav className={styles.blogArticle_tableOfContents} aria-label="On this page">
      <h2>On this page</h2>
      <ol>
        {items.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={
                id === activeItem ? styles.blogArticle_tocActive : undefined
              }
            >
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageLayoutBlogArticleMainContent(props: ChildrenProps) {
  return <div className={styles.blogArticle_main}>{props.children}</div>;
}

export function PageLayoutBlogArticleCover(props: CoverProps) {
  const { src, alt } = props;

  return (
    <figure className={styles.blogArticle_cover}>
      <Image src={src} alt={alt} width={1200} height={520} priority />
    </figure>
  );
}

export function PageLayoutBlogArticleSection(props: SectionProps) {
  const { children, id, title } = props;

  return (
    <section className={styles.blogArticle_section} id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function PageLayoutBlogArticleSideColumn(props: ChildrenProps) {
  return <aside className={styles.blogArticle_sidebar}>{props.children}</aside>;
}

export function PageLayoutBlogArticleSearchSlot(props: ChildrenProps) {
  return <div className={styles.blogArticle_searchSlot}>{props.children}</div>;
}

export function PageLayoutBlogArticleCategories(props: CategoriesProps) {
  const { categories, activeCategory } = props;

  return (
    <section className={styles.blogArticle_panel}>
      <h2>Categories</h2>
      <ul className={styles.blogArticle_categoryList}>
        {categories.map(({ name, count }) => (
          <li key={name}>
            <span
              className={
                name === activeCategory
                  ? styles.blogArticle_categoryActive
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

export function PageLayoutBlogArticleRelatedArticles(props: ChildrenProps) {
  return (
    <section className={styles.blogArticle_panel}>
      <h2>Related articles</h2>
      <div className={styles.blogArticle_relatedList}>{props.children}</div>
    </section>
  );
}

export function PageLayoutBlogArticleRelatedArticle(
  props: RelatedArticleProps,
) {
  const { href, imageSrc, imageAlt, category, title, date, readingTime } = props;
  const content = (
    <>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={120}
        height={80}
        className={styles.blogArticle_relatedImage}
      />
      <span className={styles.blogArticle_relatedContent}>
        <span className={styles.blogArticle_relatedCategory}>{category}</span>
        <strong>{title}</strong>
        <span className={styles.blogArticle_relatedMeta}>
          {date} · {readingTime}
        </span>
      </span>
    </>
  );

  return (
    <div className={styles.blogArticle_relatedArticle}>
      {href ? <Link href={href}>{content}</Link> : content}
    </div>
  );
}

export function PageLayoutBlogArticleCallout(props: ChildrenProps) {
  return <aside className={styles.blogArticle_callout}>{props.children}</aside>;
}
