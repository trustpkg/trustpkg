"use client";

import { Pagination } from "@ark-ui/react";
import Link from "next/link";
import type React from "react";
import styles from "../../PackageList.module.scss";

interface PaginationPageLinkProps {
  page: {
    type: "page";
    value: number;
  };
  currentPage: number;
  pendingPage: number | null;
  getHref: (page: number) => string;
  onNavigate: (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
    isDisabled: boolean,
  ) => void;
}

export function PackageListPaginationPageLink(
  props: PaginationPageLinkProps,
) {
  const { page, currentPage, pendingPage, getHref, onNavigate } = props;
  const isDisabled =
    page.value === currentPage ||
    (pendingPage !== null && pendingPage !== currentPage);

  return (
    <Pagination.Item
      {...page}
      asChild
      className={styles.packageListPagination_item}
    >
      <Link
        href={getHref(page.value)}
        prefetch
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={(event) => onNavigate(event, page.value, isDisabled)}
      >
        {page.value}
      </Link>
    </Pagination.Item>
  );
}
