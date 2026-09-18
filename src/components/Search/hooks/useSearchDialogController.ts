"use client";

import type { components } from "@/api/api.types";
import { normalizedPackage } from "@/utils/normalizePackage";
import { useRouter } from "next/navigation";
import React from "react";
import { SearchContext } from "../Search.context";
import { useSearch } from "./useSearch";

export type SearchDocument =
  components["schemas"]["packagesApi.SearchDocument"];

export interface SearchDialogController {
  isOpen: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isPending: boolean;
  documents: SearchDocument[];
  isDefaultView: boolean;
  isNotFound: boolean;
  activeResultIndex: number;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onActiveResultChange: (index: number) => void;
  onSelectDocument: (documentName: string) => void;
}

export function useSearchDialogController(): SearchDialogController {
  const router = useRouter();
  const { isDialogWithSearchOpen, setIsDialogWithSearchOpen } =
    React.useContext(SearchContext);
  const {
    inputRef,
    isPending,
    handleClearSearch,
    handleInputChange,
    documents,
    isDefaultView,
    isNotFound,
  } = useSearch();
  const [activeResultIndex, setActiveResultIndex] = React.useState(-1);

  const onSelectDocument = (documentName: string) => {
    router.push(`/packages/${normalizedPackage(encodeURIComponent(documentName))}`);
    setIsDialogWithSearchOpen?.(false);
  };

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (documents.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResultIndex((currentIndex) =>
        currentIndex >= documents.length - 1 ? 0 : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResultIndex((currentIndex) =>
        currentIndex <= 0 ? documents.length - 1 : currentIndex - 1,
      );
    }

    if (event.key === "Enter" && activeResultIndex >= 0) {
      event.preventDefault();
      onSelectDocument(documents[activeResultIndex].name);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveResultIndex(-1);
    handleInputChange(event);
  };

  const onOpenChange = ({ open }: { open: boolean }) => {
    if (!open) {
      handleClearSearch();
      setActiveResultIndex(-1);
    }

    setIsDialogWithSearchOpen?.(open);
  };

  return {
    isOpen: isDialogWithSearchOpen,
    onOpenChange,
    inputRef,
    isPending,
    documents,
    isDefaultView,
    isNotFound,
    activeResultIndex,
    onInputChange,
    onInputKeyDown,
    onActiveResultChange: setActiveResultIndex,
    onSelectDocument,
  };
}