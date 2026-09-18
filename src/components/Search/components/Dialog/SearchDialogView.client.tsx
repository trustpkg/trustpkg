"use client";

import CloseIcon from "@/assets/x.svg";
import GlassIcon from "@/assets/glass.svg";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";
import { Dialog, Portal, Progress } from "@ark-ui/react";
import Image from "next/image";
import React from "react";
import { Base } from "../../../Base/Base";
import { IconButton } from "../../../Button";
import Hidden from "../../../Hidden";
import { SearchResultItem } from "../Results/SearchResultItem.client";
import { SearchResults } from "../Results/SearchResults";
import type { SearchDialogController } from "../../hooks/useSearchDialogController";
import styles from "../../Search.module.scss";

export function SearchDialogView(props: SearchDialogController) {
  const {
    isOpen,
    onOpenChange,
    inputRef,
    isPending,
    documents,
    isDefaultView,
    isNotFound,
    activeResultIndex,
    onInputChange,
    onInputKeyDown,
    onActiveResultChange,
    onSelectDocument,
  } = props;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
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
                  onChange={onInputChange}
                  onKeyDown={onInputKeyDown}
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
                  <IconButton.AsButton type="button" label="Close search dialog">
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
                  {isNotFound && !isDefaultView
                    ? "Not found"
                    : "Find your package"}
                </Base>
              )}

              {!!documents.length && !isPending && !isDefaultView && (
                <SearchResults
                  documents={documents}
                  activeResultIndex={activeResultIndex}
                  onActiveResultChange={onActiveResultChange}
                >
                  {(document, _index, context) => (
                    <SearchResultItem
                      document={document}
                      id={context.id}
                      isActive={context.isActive}
                      onActive={context.onActive}
                      onSelect={onSelectDocument}
                    />
                  )}
                </SearchResults>
              )}

              {(isPending || isDefaultView) && (
                <Image
                  className={styles.search_dialogContentImage}
                  src="/before-searching.png"
                  alt=""
                  width={1536}
                  height={1024}
                  priority
                />
              )}

              {isNotFound && !isDefaultView && (
                <Image
                  className={styles.search_dialogContentImage}
                  src="/no-result.png"
                  alt=""
                  width={1536}
                  height={1024}
                  priority
                />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
