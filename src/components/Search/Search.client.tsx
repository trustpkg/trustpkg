"use client";

import ArrowRightIcon from "@/assets/ArrowRight.svg";
import GlassIcon from "@/assets/glass.svg";
import NpmIcon from "@/assets/npm.svg";
import CloseIcon from "@/assets/x.svg";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { Dialog, Portal, Progress } from "@ark-ui/react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Base } from "../Base/Base";
import { IconButton } from "../Button";
import Hidden from "../Hidden";
import { useSearch } from "./hooks/useSearch";
import { SearchContext } from "./Search.context";
import styles from "./Search.module.scss";


export function SearchTrigger() {
  const { setIsDialogWithSearchOpen } = React.useContext(SearchContext);

  React.useEffect(
    function handleKeyboard() {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
          event.key === "/"
        ) {
          event.preventDefault();

          setIsDialogWithSearchOpen?.(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [setIsDialogWithSearchOpen],
  );

  return (
    <Base as="div" className={styles.search_trigger}>
      <Base
        as="button"
        type="button"
        className={styles.search_triggerButton}
        onClick={() => setIsDialogWithSearchOpen?.(true)}
      >
        <GlassIcon className={styles.search_triggerIcon} />
        Search...
      </Base>
      <div className={styles.search_triggerShortcutsContainer}>
        <Base as="span" className={styles.search_triggerShortcut}>
          <Hidden>type</Hidden> Ctrl + K
        </Base>{" "}
        <Hidden>or</Hidden>
        <Base as="span" className={styles.search_triggerShortcut}>
          <Hidden>type</Hidden> /
        </Base>
        <Hidden>to open search</Hidden>
      </div>
    </Base>
  );
}

export function SearchDialog() {
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

  const selectDocument = (documentName: string) => {
    router.push(`/packages/${encodeURIComponent(documentName)}`);
    setIsDialogWithSearchOpen?.(false);
  };

  const handleInputKeyDown = (
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
      selectDocument(documents[activeResultIndex].name);
    }
  };

  return (
    <Dialog.Root
      open={isDialogWithSearchOpen}
      onOpenChange={({ open }) => {
        if (!open) {
          handleClearSearch();
        }

        setIsDialogWithSearchOpen?.(open);
      }}
    >
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop className={styles.search_backdrop} />
          <Dialog.Content className={styles.search_dialog}>
            <div className={styles.search_dialogActions}>
              <div className={styles.search_dialogActionsSearch}>
                {isPending ? (
                  <Progress.Root
                    className={styles.search_spinner}
                    defaultValue={null}
                  >
                    <div className={styles.search_spinnerCircleContainer}>
                      <Progress.Circle
                        className={styles.search_spinnerCircle}
                        style={
                          {
                            "--size": "24px",
                            "--thickness": "4px",
                          } as React.CSSProperties
                        }
                      >
                        <Progress.CircleTrack
                          className={styles.search_spinnerCircleTrack}
                        />
                        <Progress.CircleRange
                          className={styles.search_spinnerCircleRange}
                        />
                      </Progress.Circle>
                      <Progress.ValueText
                        className={styles.search_spinnerValueText}
                      />
                    </div>
                  </Progress.Root>
                ) : (
                  <GlassIcon
                    className={styles.search_dialogSearchIcon}
                    onClick={() => inputRef.current?.focus()}
                  />
                )}

                <input
                  className={styles.search_dialogSearchInput}
                  ref={inputRef}
                  id="search"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={(event) => {
                    setActiveResultIndex(-1);
                    handleInputChange(event);
                  }}
                  onKeyDown={handleInputKeyDown}
                  spellCheck="false"
                  role="combobox"
                  aria-controls="search-results"
                  aria-expanded={documents.length > 0}
                  aria-activedescendant={
                    activeResultIndex >= 0
                      ? `search-result-${activeResultIndex}`
                      : undefined
                  }
                />

                <Hidden>
                  <label htmlFor="search">Search packages</label>
                </Hidden>
              </div>

              {!isDefaultView && (
                <Base
                  as="div"
                  className={styles.search_dialogActionsEnter}
                  data-active={activeResultIndex >= 0}
                >
                  <Hidden>Press Enter to choose the active result</Hidden>
                  <kbd aria-hidden="true">Enter</kbd>
                </Base>
              )}

              <div className={styles.search_dialogActionsEscape}>
                <Base as="p" className={styles.search_dialogActionsEsc}>
                  <Hidden>Press</Hidden> Esc <Hidden>to close</Hidden>
                </Base>

                <Dialog.CloseTrigger asChild>
                  <IconButton.AsButton
                    type="button"
                    label={`Close search dialog`}
                  >
                    <CloseIcon />
                  </IconButton.AsButton>
                </Dialog.CloseTrigger>
              </div>
            </div>
            <div className={styles.search_dialogContent}>
              {(isPending || isDefaultView || isNotFound) && (
                <Base
                  as="p"
                  alignSelf="center"
                  color={colors.text.accent}
                  fontSize={pxToRem(24)}
                  fontWeight={600}
                >
                  {(isNotFound && !isDefaultView) ? "Not found" : "Find your package"}
                </Base>
              )}

              {(!!documents.length && !isPending && !isDefaultView) && (
                <ul id="search-results" className={styles.search_resultsList}>
                  {documents.map((document, index) => {
                    return (
                      <li
                        id={`search-result-${index}`}
                        key={document.name}
                        className={clsx(styles.search_resultsItem, {
                          [styles.search_resultsItem__isActive]:
                            activeResultIndex === index,
                        })}
                        role="option"
                        aria-selected={activeResultIndex === index}
                        tabIndex={0}
                        onClick={() => selectDocument(document.name)}
                        onMouseEnter={() => setActiveResultIndex(index)}
                        onMouseMove={() => setActiveResultIndex(index)}
                        onFocus={() => setActiveResultIndex(index)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            selectDocument(document.name);
                          }
                        }}
                      >
                        {document.ecosystem === "npm" && (
                          <Base width={pxToRem(24)} height={pxToRem(24)}>
                            <NpmIcon fill={colors.text.primary} />
                          </Base>
                        )}

                        {document.name}

                        <Base asChild width={pxToRem(24)} height={pxToRem(24)} marginLeft="auto" className={clsx(styles.search_resultsIcon)}>
                          <ArrowRightIcon />
                        </Base>
                      </li>
                    )
                  })}
                </ul>)}

              {(isPending || isDefaultView) && <Image
                className={styles.search_dialogContentImage}
                src="/before-searching.png"
                alt=""
                width={1536}
                height={1024}
              />}

              {(isNotFound && !isDefaultView) && <Image
                className={styles.search_dialogContentImage}
                src="/no-result.png"
                alt=""
                width={1536}
                height={1024}
              />}
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
