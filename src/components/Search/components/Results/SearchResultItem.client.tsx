"use client";

import ArrowRightIcon from "@/assets/ArrowRight.svg";
import NpmIcon from "@/assets/npm.svg";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import clsx from "clsx";
import Link from "next/link";
import { Base } from "../../../Base/Base";
import type { SearchDocument } from "../../hooks/useSearchDialogController";
import styles from "../../Search.module.scss";

interface SearchResultItemProps {
  document: SearchDocument;
  id: string;
  isActive: boolean;
  onActive: () => void;
  onSelect: (documentName: string) => void;
}

export function SearchResultItem(props: SearchResultItemProps) {
  const { document, id, isActive, onActive, onSelect } = props;

  return (
    <Link
      id={id}
      href={`/packages/${document.slug}`}
      className={clsx(styles.search_resultsItem, {
        [styles.search_resultsItem__isActive]: isActive,
      })}
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(document.name)}
      onMouseEnter={onActive}
      onMouseMove={onActive}
      onFocus={onActive}
    >
      {document.ecosystem === "npm" && (
        <Base width={pxToRem(24)} height={pxToRem(24)}>
          <NpmIcon fill={colors.text.primary} />
        </Base>
      )}

      {document.name}

      <Base
        asChild
        width={pxToRem(24)}
        height={pxToRem(24)}
        marginLeft="auto"
        className={styles.search_resultsIcon}
      >
        <ArrowRightIcon />
      </Base>
    </Link>
  );
}
