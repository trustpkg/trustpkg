import React from "react";
import styles from "./PageLayoutBlogArticle.module.scss";

export interface PageLayoutBlogArticleProps extends React.PropsWithChildren {}

export function PageLayoutBlogArticleRoot(
  props: PageLayoutBlogArticleProps,
) {
  return <div className={styles.blogArticle}>{props.children}</div>;
}
